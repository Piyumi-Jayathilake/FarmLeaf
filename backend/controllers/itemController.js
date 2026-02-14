import itemModal from "../modals/itemModal.js";

export const createItem = async (req, res) => {
    try {
        const { name, description, category, price, rating, hearts, featured } = req.body;
        const imageUrl = req.file ? req.file.path : '';
        const total = Number(price) * 1;
        const newItem = new itemModal({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            imageUrl,
            total,
            featured
        })
        const saved = await newItem.save();
        res.status(201).json({ success: true, item: saved });
    } 
    catch (error) { 
        console.error('Error creating item:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Item with this name already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Failed to create item', error: error.message });
    }
}   

//GET ALL ITEMS
export const getItems = async (req, res) => {
    try {
        const { featured } = req.query;
        const query = {};
        if (featured) {
            query.featured = featured;
        }
        const items = await itemModal.find(query).sort({ createdAt: -1 }); 
        const host = `https://${req.get('host')}`;

        const withFullUrl = items.map(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? host + i.imageUrl : '',

        }))
        res.json({ success: true, items: withFullUrl });
    } catch (error) {
        console.error('Get Items Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch items' });
    }
}

//DLT FUNC
export const deleteItem = async (req, res) => {
    try {
        const removed = await itemModal.findByIdAndDelete(req.params.id);
        if (!removed) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(204).end()
    } catch (error) {
        console.error('Delete Item Error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete item' });
    }
}
