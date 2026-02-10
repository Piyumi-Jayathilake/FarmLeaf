import React, {useState} from 'react'
import { styles } from '../assets/admindetails';
import { FiStar, FiUpload, FiHeart, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa6";

const AddItems = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      category: '',
      price: '',
      rating: 0,
      hearts: '',
      total: 0,
      featured: '',
      image: null,
      preview: ''
    });

  const [categories] = useState([
    'Fresh Veges', 'Leafy Greens', 'Fresh Fruits', 'Roots & Bulbs', 'Local Sri Lankan', 'Exotic & Imported', 'Herbs & Spices'
  ]);
  const[type] = useState([
    'Special Offer', 'Fresh Picks'
  ]);
  const [hoverRating, setHoverRating] = useState(0);
  const [notification, setNotification] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'featured' && value !== 'Fresh Picks') {
        return { ...prev, featured: value, category: '' };
      }
      return { ...prev, [name]: value };
    });
  };
  //Image Handling
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData(prev => ({
            ...prev,
            image: file,
            preview: URL.createObjectURL(file)
        }));
    }
  };
  const handleRating = rating => 
    setFormData(prev => ({ ...prev, rating }));
  
  const handleDeleteImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      preview: ''
    }));
    setShowDeleteModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
        setValidationError('Item name is required!');
        setTimeout(() => setValidationError(null), 3000);
        return;
    }
    if (!formData.description.trim()) {
        setValidationError('Description is required!');
        setTimeout(() => setValidationError(null), 3000);
        return;
    }
    if (formData.featured === 'Fresh Picks' && !formData.category.trim()) {
      setValidationError('Category is required!');
      setTimeout(() => setValidationError(null), 3000);
      return;
    }
    if (!formData.featured.trim()) {
        setValidationError('Featured type is required!');
        setTimeout(() => setValidationError(null), 3000);
        return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
        setValidationError('Valid price is required!');
        setTimeout(() => setValidationError(null), 3000);
        return;
    }
    if (!formData.image) {
        setValidationError('Image is required!');
        setTimeout(() => setValidationError(null), 3000);
        return;
    }
    
    try{
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if(key === 'preview') return;
            payload.append(key, value);
        });
        const res = await axios.post('https://farmleaf-backend.onrender.com/api/items',
            payload,
            {headers: {'Content-Type': 'multipart/form-data'}}
        );
        setNotification({ type: 'success', message: 'Item Added Successfully!' });
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          rating: 0,
          hearts: '',
          total: 0,
          featured: '',
          image: null,
          preview: ''
        })

    }
    catch(error){
        const errorMessage = error.response?.data?.message || 'Failed to add item';
        setNotification({ type: 'error', message: errorMessage });
        console.error('Error adding item:', error.response || error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
        {/* Small validation error notification */}
        {validationError && (
          <div className='fixed top-4 right-4 p-4 rounded-lg bg-red-500 text-white flex items-center gap-2 shadow-lg z-50 border-2 border-red-400 animate-bounce'>
            <FiX className='text-2xl'/>
            <span className='font-semibold'>{validationError}</span>
          </div>
        )}

        {/* Big center modal for success/failure */}
        {notification && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div className={`relative rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 ${
              notification.type === 'success' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'
            }`}>
              <button
                onClick={() => {
                  setNotification(null);
                  if (notification.type === 'success') {
                    setFormData({
                      name: '',
                      description: '',
                      category: '',
                      price: '',
                      rating: 0,
                      hearts: '',
                      total: 0,
                      featured: '',
                      image: null,
                      preview: ''
                    });
                  }
                }}
                className='absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all shadow-lg'
              >
                <FiX className='text-xl'/>
              </button>
              <div className='flex flex-col items-center gap-4 text-white'>
                {notification.type === 'success' ? <FiCheck className='text-6xl'/> : <FiX className='text-6xl'/>}
                <p className='font-bold text-2xl text-center'>{notification.message}</p>
              </div>
            </div>
          </div>
        )}
        <div className='max-w-4xl mx-auto'>
            <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Add New Item</h2>
                <form className='space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
                    <div className={styles.uploadWrapper}>
                        <div className='relative'>
                        <label className={styles.uploadLabel} htmlFor='item-image'>
                            {formData.preview ? (
                                <>
                                  <img src={formData.preview} alt="Preview" className={styles.previewImage}/>
                                  <button
                                    type='button'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowDeleteModal(true);
                                    }}
                                    className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-10 transition-all shadow-lg'
                                  >
                                    <FiX className='text-xl'/>
                                  </button>
                                </>
                            ) : (
                                <div className='text-center p-4'>
                                    <FiUpload className={styles.uploadIcon}/>
                                    <p className={styles.uploadText}>
                                        Click to Upload Item Images
                                        </p> 
                                    </div>
                            )}
                            <input type='file' 
                            id='item-image'
                            name='image'
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className='hidden'/>
                        </label>
                        </div>
                    </div>
                    
                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                      <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                        <div className='bg-[#263238] rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-red-500 shadow-2xl'>
                          <h3 className='text-xl sm:text-2xl font-bold text-amber-100 mb-4 text-center'>
                            Delete Image?
                          </h3>
                          <p className='text-amber-100/70 mb-6 text-center'>
                            Are you sure you want to delete the image?
                          </p>
                          <div className='flex gap-4 justify-center'>
                            <button
                              type='button'
                              onClick={handleDeleteImage}
                              className='px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all'
                            >
                              Yes
                            </button>
                            <button
                              type='button'
                              onClick={() => setShowDeleteModal(false)}
                              className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all'
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='space-y-4 sm:space-y-6'>
                        <div>
                            <label htmlFor='item-name' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                Item Name
                                </label>
                            <input 
                            id='item-name'
                            type='text' 
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className={styles.inputField}
                            placeholder='Enter item name'
                            autoComplete='off' />
                        </div>
                        <div>
                            <label htmlFor='item-description' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                Description
                                </label>
                            <textarea
                            id='item-description'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                            className={styles.textareaField + ' h-32 sm:h-40'}
                            placeholder='Enter item description'
                            autoComplete='off' />
                        </div>
                        <div className={styles.gridTwoCols}>
                          <div>
                            <label htmlFor='item-featured' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                              Featured Type
                              </label>
                            <select
                            id='item-featured'
                            name='featured'
                            value={formData.featured}
                            onChange={handleInputChange}
                            className={styles.selectField}>
                              <option value='' disabled className='bg-[#263238]'>Select featured type</option>
                              {type.map(ft => (
                                <option key={ft} value={ft} className='bg-[#263238]'>{ft}
                                </option>
                              ))}
                            </select>
                          </div>
                          {formData.featured === 'Fresh Picks' && (
                            <div>
                              <label htmlFor='item-category' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                Category
                                </label>
                              <select
                              id='item-category'
                              name='category'
                              value={formData.category}
                              onChange={handleInputChange}
                              className={styles.selectField}>
                                <option value='' disabled className='bg-[#263238]'>Select category</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat} className='bg-[#263238] text-'>{cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        <div className={styles.gridTwoCols}>
                            <div>
                                <label htmlFor='item-price' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                    Price (LKR)
                                    </label>
                                <div className={styles.relativeInput}>
                                    <div className={styles.rupeeIcon}>Rs</div>
                                    <input 
                                  id='item-price'
                                    type='text' 
                                    name='price'
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className={styles.inputField + ' pl-10 sm:pl-12'}
                                    placeholder='Enter item price'
                                    min='0'
                                  step='0.01'
                                  autoComplete='off' />
                                    </div>                
                            </div>
                        </div>
                        <div className={styles.gridTwoCols}>
                            <div>
                                <span className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                  Rating
                                </span>
                                <div className='flex space-x-2'>
                                    {[1,2,3,4,5].map(star => (
                                        <button key={star}
                                        type='button'
                                        onClick={() => handleRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className='text-2xl sm:text-3xl transition-transform hover:scale-110'>
                                            <FiStar className={
                                                star <= (hoverRating || formData.rating)
                                                ? 'text-amber-400 fill-current'
                                                : 'text-amber-700 fill-none'
                                            }/>
                                        </button>
                                    ))}
                                </div>
                            </div>  
                            <div>
                              <label htmlFor='item-hearts' className='block text-amber-200 mb-2 text-base sm:text-lg'>
                                Popularity
                                </label> 
                              <input
                                type="text"
                                id='item-hearts'
                                name="hearts"
                                value={formData.hearts || ''}
                                onChange={handleInputChange}
                                onWheel={(e) => e.currentTarget.blur()}
                                className={styles.inputField}
                                placeholder='Enter Likes'
                                min="0"
                                autoComplete='off' />
                          </div>
                    </div>
                    <button type='submit' className={styles.actionBtn}>
                        Add Item
                        </button>
                        </div>
                </form>
            </div>
        </div>
    </div>
  )
}
export default AddItems
