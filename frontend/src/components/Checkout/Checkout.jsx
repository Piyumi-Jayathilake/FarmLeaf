import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaLock } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../CartContext/CartContext';
import axios from 'axios';

const Checkout = () => {

    const {totalAmount, cartItems, clearCart} = useCart(); 
    const navigate = useNavigate();
    const location = useLocation();
     const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '',
        email: '', address: '', city: '',
        zipCode: '', paymentMethod: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //Token
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? {
        'Authorization': `Bearer ${token}`
    } : {};
    //Payment gateway
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('success');

    const sessionId = params.get('session_id');

    if(paymentStatus){
        setLoading(true);

        if(paymentStatus === 'true' && sessionId){

            axios.post('http://localhost:4000/api/orders/confirm',
                { sessionId },
                { headers: authHeaders })
                .then(({ data }) => {
                    clearCart();
                    navigate('/myorder',{state: {order: data.order}});

                })
                .catch((err) => {
                    console.error('Payment verification error:', err);
                    setError('Payment verification failed. Please contact support.');
                })
                .finally(() => 
                    setLoading(false));
    }
    else if(paymentStatus === 'cancel'){
        setError('Payment was cancelled or failed. Please contact support.');
        setLoading(false);
    }
  }
}, [location.search,clearCart,navigate,authHeaders]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!['online', 'cod'].includes(formData.paymentMethod)) {
            setLoading(false);
            setError('Please select a valid payment method.');
            return;
        }
    //price calculations
        const subtotal = Number(totalAmount.toFixed(2));
        const tax = Number((subtotal * 0.05).toFixed(2)); // 5% tax

        const payload = {
        ...formData,
        subtotal,
        tax,
        total: Number((subtotal + tax).toFixed(2)),
        items: cartItems.map(({ item, quantity }) => ({
            name: item?.name || 'Unknown',
            price: Number(item?.price) || 0,
            quantity: Math.max(1, Number(quantity) || 1),
            imageUrl: item?.imageUrl || ''
        }))
    };
        try {
            if(formData.paymentMethod === 'online'){
              

                const { data } = await axios.post(
                    'http://localhost:4000/api/orders',
                    payload,
                    { headers: authHeaders }
                );
                window.location.href =data.checkoutUrl;
            } else {
                const { data } = await axios.post(
                    'http://localhost:4000/api/orders',
                    payload,
                    { headers: authHeaders }
                );
                clearCart();
                navigate('/myorder',{state: {order: data.order}});
            }
        } catch (err) {
            console.error('Order submission error:', err);
            setError(err.response?.data?.message || 'Failed to submit order. Please try again.');
        } finally {
            setLoading(false);
        }

        
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302] text-amber-100
    py-8 sm:py-12 md:py-16 px-4 sm:px-6 font-[Playfair_Display] '>
        <div className='mx-auto max-w-4xl'>
            <Link className='flex items-center gap-2 text-green-100 mb-6 sm:mb-8 hover:text-green-400 transition-colors' to='/cart'>
            <FaArrowLeft className='text-lg sm:text-xl' /> <span className='text-sm sm:text-base'>Back to Cart</span>
            </Link>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 italic'>
                Checkout Page
            </h1>
            <form className='grid lg:grid-cols-2 gap-12' onSubmit={handleSubmit}>
                < div className = "bg-[#263238]/50 p-6 rounded-3xl space-y-6 shadow-2xl border-2 border-green-500 hover:border-green-400" >
                        <h2 className="text-2xl italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">Personal Information</h2>
                        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="City" name="city" value={formData.city} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                        <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200" />
                    </div >
                    {/* Payment details */}
                    <div className="bg-[#263238]/50 p-6 rounded-3xl space-y-6 border-2 border-green-500 hover:border-green-400">
                        <h2 className="text-2xl italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">Payment Details</h2>

                    {/*Order */}
                    <div className='space-y-4 mb-6'>
                        <h3 className='text-xl font-semibold text-amber-100'>Order Summary</h3>

                        {cartItems.map(({_id, item, quantity }) => (
                            <div key={_id} className='flex justify-between items-center bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200 p-3 rounded-lg p-3'>
                                <div className='flex-1'>
                                    <span className='text-amber-100'>{item.name}</span>
                                    <span className='ml-2 text-sm text-green-400'> x {quantity}</span>
                                </div>
                                <span className='text-amber-100'>
                                    Rs {(item.price * quantity).toFixed(2)}</span>
                                </div>
                                ))}
                    </div>
                    <PaymentSummary totalAmount={totalAmount} />
                    {/* Payment Method */}
                    <div>
                        <label className='block mb-2' htmlFor='paymentMethod'>Payment Method</label>
                        <select id='paymentMethod' name='paymentMethod' value={formData.paymentMethod} 
                        onChange={handleInputChange} required className='w-full py-3 px-4 rounded-xl bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent text-green-200'>
                            <option value="" disabled className='bg-[#263238]'>Select a method</option>
                            <option value="online" className='bg-[#263238]'>Credit Card (Online)</option>
                            <option value="cod" className='bg-[#263238]'>Cash on Delivery</option>
                        </select>
                    </div>
                    {error && <p className='text-red-500 mt-2'>{error}</p>}

                    <button type="submit" disabled={loading} className='w-full bg-gradient-to-r from-[#048b0b] to-[#04720b] hover:bg-gradient-to-l hover:from-[#048b0b] hover:to-[#04720b]
                    text-white font-semibold py-4 rounded-xl font-bold flex justify-center items-center'>
                        <FaLock className='mr-2' />
                        {loading ? 'Processing...' : 'Place Order'}

                    </button>
                        </div>
            </form>
        </div>
    </div>
  )
}
const Input = ({ label, name, type = 'text', value, onChange, className = '' }) => {
    const autocompleteMap = {
        firstName: 'given-name',
        lastName: 'family-name',
        phone: 'tel',
        email: 'email',
        address: 'street-address',
        city: 'address-level2',
        zipCode: 'postal-code'
    };
    return (
        <div>
        <label className="block mb-2" htmlFor={name}>{label}</label>
        <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className={`w-full py-2 px-4 rounded-xl bg-[#333030] text-amber-100 ${className}`}
            required
        />
        </div>
    );
};

    const PaymentSummary = ({ totalAmount }) => {
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    return (
    <div className='space-y-2'>
        <div className='flex justify-between'>
            <span>Subtotal:</span>
            <span>Rs {subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
            <span>Tax (5%):</span>
            <span>Rs {tax.toFixed(2)}</span>
        </div>
        <div className='flex justify-between font-bold border-t pt-2'>
            <span>Total:</span>
            <span>Rs {total.toFixed(2)}</span>
        </div>
    </div>
    )

    }



export default Checkout