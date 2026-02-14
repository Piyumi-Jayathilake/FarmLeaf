import itemModal from "../modals/itemModal.js";

export const createItem = async (req, res) => {
    try {
        const { name, description, category, price, rating, hearts, featured } = req.body;
        const imageUrl = req.file?.path || '';
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
    const items = await itemModal.find().sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch items' });
  }
};


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
