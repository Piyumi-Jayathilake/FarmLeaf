import Order from "../modals/orderModal.js";
import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//CREATE ORDER
export const createOrder = async(req, res)=>{
    try {
    const {
        fristName, lastName, phone, email, address, city, zipCode, paymentMethod, subtotal, tax, total, items
    } = req.body;
    if(!items || !Array.isArray(items) || items.length === 0){
        return res.status(400).json({success:false, message:"Invalid or Cart is empty"});
    }
    const orderItems = items.map(({item, name, price, imageUrl, quantity}) => {
        const base = item || {};
        return {
           item:{
            name: base.name || name || 'Unknown',
            price: Number(base.price ?? price) || 0,
            imageUrl: base.imageUrl || imageUrl || '' 
        },
        quantity: Number(quantity) || 0
    }
});
//SHIPPING COST
const shippingCost = 0;
let newOrder;
if(paymentMethod === 'online'){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: orderItems.map(o =>({
            price_data:{
                currency: 'lkr',
                product_data:{
                    name: o.item.name},
                unit_amount: Math.round(o.item.price * 100)
            },
            quantity: o.quantity
        })),
        customer_email: email,
        success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
        metadata:{
            fristName,
            lastName,
            email,
            phone}
        
    });
    newOrder = new Order({
        user: req.user.id,
        fristName,
        lastName, 
        phone,
        email,
        address,
        city,
        zipCode,
        paymentMethod,
        subtotal,
        tax,
        total,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        paymentStatus: 'pending'
    });
    await newOrder.save();
    return res.status(201).json({order: newOrder, checkoutUrl: session.url})}

    //COD ORDER
    newOrder = new Order({
        user: req.user.id,
        fristName,
        lastName, 
        phone,
        email,
        address,
        city,
        zipCode,
        paymentMethod,
        subtotal,
        tax,
        total,
        shipping: shippingCost,
        items: orderItems,
        paymentIntentId: null,
        sessionId: null,
        paymentStatus: 'succeeded'
    });
    await newOrder.save();
    return res.status(201).json({order: newOrder, checkoutUrl: null});

}


catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Server Error',error: error.message });
}
};
//PAYMENT CONFIRMATION
export const confirmPayment = async(req, res)=>{
   try{
     const {session_id} = req.query;
     if(!session_id){
        return res.status(400).json({success:false, message:"Session ID is required"});
     }
     const session = await stripe.checkout.sessions.retrieve(session_id);
     if(session.payment_status === 'paid'){
        const order = await Order.findOneAndUpdate({sessionId: session_id}, {paymentStatus: 'succeeded'}, {new:true});
        if(!order){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        return res.status(200).json({success:true, order})
     }
    }catch (error) {
        console.error('Confirm Payment Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
//GET USER ORDERS
export const getOrders = async(req, res)=>{
    try {
        const filter = {user: req.user.id};
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
            fristName: o.fristName,
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
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true}
        );
        res.json({success:true, order: updated});
    } catch (error) {
        console.error('Update Order Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}