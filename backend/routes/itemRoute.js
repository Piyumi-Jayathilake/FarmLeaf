import express from 'express';
import multer from 'multer';
import {createItem, getItems, deleteItem} from '../contollers/itemController.js';

const itemRouter = express.Router()

//MULTER FUNC
const storage = multer.diskStorage({
    destination:  (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => {
        const sanitized = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
        cb(null, `${Date.now()}-${sanitized}`);
    }
})
const upload = multer({storage});

itemRouter.post('/', upload.single('image'), createItem);
itemRouter.get('/', getItems);
itemRouter.delete('/:id', deleteItem);

export default itemRouter
