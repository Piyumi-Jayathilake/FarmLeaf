import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import {createItem, getItems, deleteItem} from '../controllers/itemController.js';

const itemRouter = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'farmleaf',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });


itemRouter.post('/', upload.single('image'), createItem);
itemRouter.get('/', getItems);
itemRouter.delete('/:id', deleteItem);

export default itemRouter
