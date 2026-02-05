import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { cartItem as CartItem } from '../modals/cartModal.js';
import Item from '../modals/itemModal.js';

//GET CART ITEMS
export const getCart = asyncHandler(async (req, res) => {
    const items =  await CartItem.find({user: req.user._id}).populate('item');
    
    const formatted = items.map(ci => ({
        _id: ci._id.toString(),
        item: ci.item,
        quantity: ci.quantity
    }));
    res.json({success:true, cartItems: formatted});
})
//ADD TO CART
export const addToCart = asyncHandler(async (req, res) => {
    const {itemId} = req.body;
    const quantity = Number(req.body.quantity);
    if(!itemId || !Number.isFinite(quantity) ){
        res.status(400);
        throw new Error('Item ID and quantity are required and quantity must be a number')
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400);
        throw new Error('Invalid item ID')
    }
    const itemExists = await Item.findById(itemId);
    if (!itemExists) {
        res.status(404);
        throw new Error('Item not found')
    }
    let cartDoc = await CartItem.findOne({user: req.user._id, item: itemId})
    if(cartDoc){
        cartDoc.quantity = Math.max(1, cartDoc.quantity + quantity);
        if(cartDoc.quantity < 1){
            await cartDoc.deleteOne();
            return res.json({_id: cartDoc._id.toString(), item: cartDoc.item, quantity: 0})

        }
        await cartDoc.save();
        await cartDoc.populate('item');
        return res.status(200).json({
            _id: cartDoc._id.toString(),
             item: cartDoc.item, 
             quantity: cartDoc.quantity,
            })
    }
    cartDoc = await CartItem.create({
        user: req.user._id,
        item: itemId,
        quantity,})
    await cartDoc.populate('item');
    res.status(201).json({
        _id: cartDoc._id.toString(),
         item: cartDoc.item, 
         quantity: cartDoc.quantity,
        })
})

//UPDATE FUNC
export const updateCartItem = asyncHandler(async (req, res) => {
    const quantity = Number(req.body.quantity);
    if (!Number.isFinite(quantity)) {
        res.status(400);
        throw new Error('Quantity must be a number')
    }
    const cartDoc = await CartItem.findOne({_id: req.params.id, user: req.user._id})
    if(!cartDoc){
        res.status(404);
        throw new Error('Cart item not found')
    }
    cartDoc.quantity = Math.max(1, quantity);
    await cartDoc.save();
    await cartDoc.populate('item');
    res.json({
        _id: cartDoc._id.toString(),
         item: cartDoc.item, 
         quantity: cartDoc.quantity,
        })
})
//DLT FUNC
export const deleteCartItem = asyncHandler(async (req, res) => {
    const cartDoc = await CartItem.findOne({_id: req.params.id, user: req.user._id})
    if(!cartDoc){
        res.status(404);
        throw new Error('Cart item not found')
    }
    await cartDoc.deleteOne();
    res.json({_id: req.params.id})
})

//CLEAR CART
export const clearCart = asyncHandler(async (req, res) => {
    await CartItem.deleteMany({user: req.user._id});
    res.json({success:true, message:"Cart cleared"})
})  