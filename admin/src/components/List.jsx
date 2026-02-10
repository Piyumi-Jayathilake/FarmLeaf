import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FiStar, FiHeart, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { styles } from '../assets/admindetails'

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const fetchItems = async () => {
    try {
      const response = await axios.get('https://farmleaf-backend.onrender.com/api/items');
      setItems(response.data.items || []);
    } catch (error) { 
      console.error('Error fetching items:', error);
      setItems([]);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // Refresh items every 3 seconds to catch new additions
    const interval = setInterval(fetchItems, 3000);
    return () => clearInterval(interval);
  }, []);

//DLT
const handleDelete = async (itemId) => {
  try {
    await axios.delete(`https://farmleaf-backend.onrender.com/api/items/${itemId}`);
    setItems(prev => prev.filter(item => item._id !== itemId));
    setNotification({ type: 'success', message: 'Item Deleted Successfully!' });
    setTimeout(() => setNotification(null), 3000);
    console.log('Item deleted successfully, Item ID:', itemId);
  } catch (error) {
    setNotification({ type: 'error', message: 'Failed to delete item' });
    setTimeout(() => setNotification(null), 3000);
    console.error('Error deleting item:', error);
  }
  setShowDeleteModal(false);
  setItemToDelete(null);
};

const openDeleteModal = (itemId) => {
  setItemToDelete(itemId);
  setShowDeleteModal(true);
};

const closeDeleteModal = () => {
  setShowDeleteModal(false);
  setItemToDelete(null);
};

  const renderStars = (rating) => {
    const ratingNum = Number(rating) || 0;
    return [...Array(5)].map((_, index) => (
      <FiStar 
        className={`text-xl ${index < ratingNum ? 'text-amber-400 fill-current' : 'text-amber-400'}`}
        key={index}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302] flex items-center justify-center text-green-200 text-2xl">
        Loading Items...
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg text-white flex items-center gap-2 shadow-lg z-50 animate-pulse ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.type === 'success' ? <FiCheck className='text-2xl'/> : <FiX className='text-2xl'/>}
          <span className='font-semibold'>{notification.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-[#263238] rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-red-500 shadow-2xl'>
            <h3 className='text-xl sm:text-2xl font-bold text-amber-100 mb-4 text-center'>
              Delete Item
            </h3>
            <p className='text-amber-100/70 mb-6 text-center'>
              Are you sure you want to delete this item?
            </p>
            <div className='flex gap-4 justify-center'>
              <button
                onClick={() => handleDelete(itemToDelete)}
                className='px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all'
              >
                Yes
              </button>
              <button
                onClick={closeDeleteModal}
                className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='max-w-7xl mx-auto'>
        <div className={styles.cardContainer}>
          <h2 className={styles.title}>List Items</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Rating</th>
                  <th className={styles.th}>Hearts</th>
                  <th className={styles.thCenter}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className={styles.tr}>
                    <td className={styles.imgCell}>
                      <img src={item.imageUrl} alt={item.name} 
                      className={styles.img}/>
                    </td>
                    <td className={styles.nameCell}>
                      <div className='space-y-2'>
                      <p className={styles.nameText}>{item.name}</p>
                      <p className={styles.descText}>{item.description}</p> </div>
                    </td>
                    <td className={styles.categoryCell}>{item.category}</td>
                    <td className={styles.priceCell}>Rs {item.price}</td>
                    <td className={styles.ratingCell}>
                      <div className='flex gap-1 '>
                        {renderStars(item.rating)}</div>
                        </td>
                        <td className={styles.heartsCell}>
                      <div className={styles.heartsWrapper}>
                        <FiHeart className='text-xl'/>
                        <span>{item.hearts}</span>
                      </div>
                    </td>
                    <td className='p-4 text-center'>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => openDeleteModal(item._id)}>
                        <FiTrash2 className='text-2xl'/>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && (
            <div className={styles.emptyState}>
              No items found
              </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default List
