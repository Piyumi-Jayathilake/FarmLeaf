import Order from "../modals/orderModal.js";
import 'dotenv/config';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

//CREATE ORDER
export const createOrder = async(req, res)=>{
    try {
       

        const LKR_TO_USD = Number(process.env.LKR_TO_USD) || 0.0033;

    const {
        firstName, lastName, phone, email, address, city, zipCode, paymentMethod, subtotal, tax, total, items
    } = req.body;
    const normalizedPaymentMethod = String(paymentMethod || '').toLowerCase();
    
    if(!req.user?._id){
        return res.status(401).json({success:false, message:"Unauthorized"});
    }
    if(!firstName || !lastName || !phone || !email || !address || !city || !zipCode) {
        return res.status(400).json({success:false, message:"All delivery details are required"});
    }
    
    if(!items || !Array.isArray(items) || items.length === 0){
        return res.status(400).json({success:false, message:"Cart is empty"});
    }
    
    if(!normalizedPaymentMethod || !['online', 'cod'].includes(normalizedPaymentMethod)) {
        return res.status(400).json({success:false, message:"Invalid payment method"});
    }
    
    const orderItems = items.map(({item, name, price, imageUrl, quantity}) => {
        const base = item || {};
        const normalizedQuantity = Math.max(1, Number(quantity) || 0);
        return {
           item:{
            name: base.name || name || 'Unknown',
            price: Number(base.price ?? price) || 0,
            imageUrl: base.imageUrl || imageUrl || '' 
        },
        quantity: normalizedQuantity
    }
});

    if (orderItems.some(i => i.item.price <= 0)) {
        return res.status(400).json({ success: false, message: "Invalid item price" });
    }

    const computedSubtotal = orderItems.reduce((sum, i) => sum + (Number(i.item.price) || 0) * (Number(i.quantity) || 0), 0);
    const safeSubtotal = Number.isFinite(Number(subtotal)) ? Number(subtotal) : computedSubtotal;
    const safeTax = Number.isFinite(Number(tax)) ? Number(tax) : 0;
    const safeTotal = Number.isFinite(Number(total)) ? Number(total) : safeSubtotal + safeTax;

//SHIPPING COST
const shippingCost = 0;
let newOrder;

if(normalizedPaymentMethod === 'online'){
    // Stripe online payment
    if(!stripe) {
        return res.status(400).json({success:false, message:"Online payment is not configured"});
    }
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
    line_items: orderItems.map(o => {
    const priceInUSD = Math.max(
    50, 
    Math.round(Number(o.item.price) * LKR_TO_USD * 100)
);


    return {
        price_data: {
            currency: 'usd',
            product_data: {
                name: o.item.name
            },
            unit_amount: priceInUSD
        },
        quantity: o.quantity
    };
}),
customer_email: email,
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout?payment_status=cancel`,
        metadata:{
            firstName,
            lastName,
            email,
            phone}
    });
    
    newOrder = new Order({
        user: req.user._id,
        firstName,
        lastName, 
        phone,
        email,
        address,
        city,
        zipCode,
        paymentMethod: 'online',
        subtotal: safeSubtotal,
        tax: safeTax,
        total: safeTotal,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        paymentStatus: 'pending'
    });
    
    await newOrder.save();
    return res.status(201).json({success: true, order: newOrder, checkoutUrl: session.url});
}

// COD (Cash on Delivery) - Order succeeds immediately
newOrder = new Order({
    user: req.user._id,
    firstName,
    lastName, 
    phone,
    email,
    address,
    city,
    zipCode,
    paymentMethod: 'cod',
    subtotal: safeSubtotal,
    tax: safeTax,
    total: safeTotal,
    shipping: shippingCost,
    items: orderItems,
    paymentIntentId: null,
    sessionId: null,
    paymentStatus: 'completed'
});

await newOrder.save();
return res.status(201).json({success: true, order: newOrder, checkoutUrl: null});

}

catch (error) {
    console.error('Create Order Error:', error);
    if (error.type === 'StripeInvalidRequestError') {
        return res.status(400).json({ success: false, message: 'Stripe error: ' + error.message });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message });
    }
    if (error.name === 'MongoError' || error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Database error: ' + error.message });
    }
    res.status(500).json({ success: false, message: error.message || 'Failed to create order' });
}
};
//PAYMENT CONFIRMATION
export const confirmPayment = async(req, res)=>{
   try{
    // Accept sessionId from either query params or request body
    const session_id = req.query.session_id || req.query.sessionId || req.body.sessionId || req.body.session_id;
     
     if(!session_id){
        return res.status(400).json({success:false, message:"Session ID is required"});
     }
     
     if(!stripe){
        return res.status(400).json({success:false, message:"Stripe is not configured"});
     }
     
     const session = await stripe.checkout.sessions.retrieve(session_id);
     
     if(session.payment_status === 'paid'){
        const order = await Order.findOneAndUpdate(
            {sessionId: session_id}, 
            {paymentStatus: 'completed'}, 
            {new:true}
        );
        
        if(!order){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        
        return res.status(200).json({success:true, order});
     } else {
        return res.status(400).json({success:false, message:"Payment not completed. Status: " + session.payment_status});
     }
    }catch (error) {
        console.error('Confirm Payment Error:', error.message);
        res.status(500).json({ success: false, message: error.message || 'Payment confirmation failed' });
    }
};
//GET USER ORDERS
export const getOrders = async(req, res)=>{
    try {
        const filter = {user: req.user._id};
        const orders = await Order.find(filter).sort({createdAt: -1}).lean();

        // format order items without mutating originals
        const formatted = orders.map(o => ({
            ...o,
            items: o.items.map(i => ({
                _id: i._id,
                item: i.item,
                quantity: i.quantity
            })),
            createdAt: o.createdAt,
            paymentStatus: o.paymentStatus
        }));
        res.json({success:true, orders: formatted});
    } catch (error) {
        console.error('Get Orders Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//ADMIN ROUTE - GET ALL ORDERS
export const getAllOrders = async(req, res)=>{
    try {
        const raw = await Order.find({}).sort({createdAt: -1}).lean();
        const formatted = raw.map(o =>({
            _id: o._id,
            user: o.user,
            firstName: o.firstName,
            lastName: o.lastName,
            email: o.email,
            phone: o.phone,
            address: o.address ?? o.shippingAddress?.address ?? '',
            city: o.city ?? o.shippingAddress?.city ?? '',
            zipCode: o.zipCode ?? o.shippingAddress?.zipCode ?? '',
            paymentMethod: o.paymentMethod,
            paymentStatus: o.paymentStatus,
            status: o.status,
            createdAt: o.createdAt,

            items: o.items.map(i =>({
                _id: i._id,
                item: i.item,
                quantity: i.quantity
            }))
        }));
        res.json({success:true, orders: formatted})
    } catch (error) {
        console.error('Get All Orders Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
//UPDATE ORDER STATUS WITHOUT TOKEN FOR ADMIN
export const updateAnyOrder = async(req, res)=>{
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true}
        );
        if(!updated){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        res.json({success:true, order: updated});
    } catch (error) {
        console.error('Update Any Order Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//GET ORDER BY ID
export const getOrderById = async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        if(!order.user.equals(req.user._id)){
            return res.status(403).json({success:false, message:"Unauthorized"});
        }
        if(req.query.email && order.email !== req.query.email){
            return res.status(403).json({success:false, message:"Unauthorized"});
        }
        res.json({success:true, order});
    } catch (error) {
        console.error('Get Order By ID Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
//UPDATE BY ID
export const updateOrder = async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        if(!order.user.equals(req.user._id)){
            return res.status(403).json({success:false, message:"Unauthorized"});
        }
        if(req.body.email && order.email !== req.body.email){
            return res.status(403).json({success:false, message:"Unauthorized"});
        }

        if((order.status === 'delivered' || order.status === 'shipped') && req.body.status === 'cancelled'){
            return res.status(400).json({success:false, message:"Shipped or delivered orders cannot be cancelled"});
        }
        
        // Auto-complete payment for COD orders when delivered
        const updateData = {...req.body};
        if(req.body.status === 'delivered' && order.paymentMethod === 'cod'){
            updateData.paymentStatus = 'done';
        }
        
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new:true, runValidators:true}
        );
        res.json({success:true, order: updated});
    } catch (error) {
        console.error('Update Order Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}