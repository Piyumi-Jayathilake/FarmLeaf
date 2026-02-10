import React, { useEffect, useState} from 'react'
import { FiArrowLeft, FiCheckCircle, FiClock ,FiMap, FiTruck, FiUser, FiBox } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelingId, setCancelingId] = useState(null);

    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    useEffect(() => {
        let isMounted = true;
        const fetchOrders = async () => {
                        try {
                                if (!token) {
                                        if (isMounted) {
                                            setError('Please log in to view your orders.');
                                            setLoading(false);
                                        }
                                        return;
                                }
                                const response = await axios.get('https://farmleaf-backend.onrender.com/api/orders',{
                                        headers: {
                                                Authorization: `Bearer ${token}`
                                }
                        })
                                                        const formattedOrders = (response.data.orders || []).map(order => ({
          ...order,
          items: order.items?.map(entry => ({
            _id: entry._id,
                        item: {
                            ...(entry.item || {}),
                            imageUrl: entry.item?.imageUrl || ''
                        },
            quantity: entry.quantity
          })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          paymentStatus: order.paymentStatus?.toLowerCase() || 'pending'
        }));

                if (isMounted) {
                    setOrders(formattedOrders);
                    setError(null);
                }

            } catch (err) {
                console.error('Error fetching orders:', err);
                if (isMounted) {
                    setError(err.response?.data?.message || 'Failed to load orders. Please try again later.');
                }
            }
            finally{
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    } , [token]);

    const statusStyles = {
    processing: {
        color: 'text-amber-400',
        bg: 'bg-amber-900/20',
        icon: <FiClock className="text-lg" />,
        label: 'Processing'
    },
    shipped: {
        color: 'text-blue-400',
        bg: 'bg-blue-900/20',
        icon: <FiTruck className="text-lg" />,
        label: 'Shipped'
    },
    delivered: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Delivered'
    },
    cancelled: {
        color: 'text-red-400',
        bg: 'bg-red-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Cancelled'
    },
    pending: {
        color: 'text-yellow-400',
        bg: 'bg-yellow-900/20',
        icon: <FiClock className="text-lg" />,
        label: 'Payment Pending'
    },
    succeeded: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Completed'
    },
    done: {
        color: 'text-green-400',
        bg: 'bg-green-900/20',
        icon: <FiCheckCircle className="text-lg" />,
        label: 'Done'
    }
};

const handleCancelOrder = async (orderId) => {
    if (!token || !orderId) return;
    setCancelingId(orderId);
    try {
        await axios.put(`https://farmleaf-backend.onrender.com/api/orders/${orderId}`,
            { status: 'cancelled' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(prev => prev.map(o => (
            o._id === orderId ? { ...o, status: 'cancelled' } : o
        )));
    } catch (err) {
        console.error('Cancel order error:', err);
        setError(err.response?.data?.message || 'Failed to cancel order. Please try again.');
    } finally {
        setCancelingId(null);
    }
};

const getPaymentMethodDetails = (method) => {
    const normalized = (method || '').toLowerCase();
    switch (normalized) {
        case 'cod':
            return {
                label: 'COD',
                class: 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50'
            };
        case 'card':
            return {
                label: 'Credit/Debit Card',
                class: 'bg-blue-600/30 text-blue-300 border-blue-500/50'
            };
        case 'upi':
            return {
                label: 'UPI Payment',
                class: 'bg-purple-600/30 text-purple-300 border-purple-500/50'
            };
        default:
            return {
                label: 'Online',
                class: 'bg-green-600/30 text-green-400 border-green-500/50'
            };
    }
};
//error
if(error) return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b2226]  via-[#133215] to-[#065302] text-[#d6f6c4]
    text-xl gap-4'>
        <p>{error}</p>
        <button 
        onClick={() => window.location.reload()}
        className='flex items-center gap-2 text-green-100 hover:text-green-300 font-bold'>
            <FiArrowLeft className='text-xl'/> 
            <span className='font-bold'>Try Again</span>
        </button>
       </div>
    )

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#1b2226]  via-[#133215] to-[#065302] text-[#d6f6c4]
    py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4'>
                <Link to='/' className='flex items-center gap-2 text-green-100 hover:text-green-300 font-bold'>
                <FiArrowLeft className='text-xl sm:text-2xl'/>
                <span className='font-bold text-sm sm:text-base'>Back to Home</span>
                </Link>
                <div className='flex items-center gap-4'>
                    <span className='text-green-500 text-sm'>
                        {user?.email}
                    </span>
                </div>
            </div>
            <div className='bg-[#1b2226] backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8
            shadow-2xl border-2 border-green-700'>
                <h1 className='text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent italic'>
                    Order History 
                </h1>
                <div className='space-y-4 md:hidden'>
                    {orders.map((order) => {
                        const totalItems = order.items.reduce((sum, entry) => sum + (entry.quantity || 0), 0);
                        const totalPrice = order.total ?? order.items.reduce(
                            (sum, entry) => sum + ((entry.item?.price || 0) * (entry.quantity || 0)),
                            0
                        );
                        const paymentMethod = getPaymentMethodDetails(order.paymentMethod);
                        const status = statusStyles[order.status] || statusStyles.processing;
                        return (
                            <div key={order._id} className='bg-green-900/10 border border-green-700 rounded-2xl p-4 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-green-100 text-sm font-mono'>#{order._id?.slice(-8)}</span>
                                    <span className={`px-3 py-1 rounded-lg ${status.bg} ${status.color} text-sm flex items-center gap-2`}>
                                        {status.icon}
                                        {status.label}
                                    </span>
                                </div>
                                <div className='text-green-100 text-sm'>
                                    {order.firstName} {order.lastName} · {order.phone}
                                </div>
                                <div className='text-green-100 text-sm'>
                                    {order.address}, {order.city} - {order.zipCode}
                                </div>
                                <div className='space-y-2'>
                                    {order.items.map((entry, index) => (
                                        <div key={`${order._id}-m-${index}`} className='flex items-center gap-3 p-2 bg-green-900/20 rounded-lg'>
                                            <img
                                                src={entry.item?.imageUrl?.startsWith('http')
                                                    ? entry.item.imageUrl
                                                    : `https://farmleaf-backend.onrender.com${entry.item?.imageUrl || ''}`}
                                                alt={entry.item?.name || 'Item'}
                                                className="w-10 h-10 object-cover rounded-lg"/>
                                            <div className='flex-1'>
                                                <span className='text-green-100 text-sm block'>
                                                    {entry.item?.name || 'Unknown'}
                                                </span>
                                                <div className='flex items-center gap-2 text-xs text-green-300'>
                                                    <span>Rs {entry.item?.price || 0}</span>
                                                    <span className='mx-1'>&middot;</span>
                                                    <span>x{entry.quantity || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex items-center justify-between text-sm'>
                                    <div className='flex items-center gap-2 text-green-300'>
                                        <FiBox className='text-lg text-green-400'/>
                                        <span>{totalItems} items</span>
                                    </div>
                                    <span className='text-green-300'>Rs {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className={`${paymentMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
                                        {paymentMethod.label}
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    {order.status !== 'cancelled' && order.status !== 'delivered' && order.status !== 'shipped' && (
                                        <button
                                            onClick={() => handleCancelOrder(order._id)}
                                            disabled={cancelingId === order._id}
                                            className='px-3 py-2 rounded-lg text-sm bg-red-600/20 text-red-300 border border-red-500/50 hover:bg-red-600/40 disabled:opacity-60'
                                        >
                                            {cancelingId === order._id ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='overflow-x-auto -mx-4 sm:mx-0 hidden md:block'>
                    <div className='inline-block min-w-full align-middle'>
                        <div className='overflow-hidden'>
                    <table className='min-w-full w-full'>
                        <thead className='bg-white/10 hidden md:table-header-group'>
                            <tr>
                                <th className="p-3 md:p-4 text-left text-amber-100 text-sm md:text-base">Order ID</th>
                                <th className="p-3 md:p-4 text-left text-amber-100 text-sm md:text-base">Customer</th>
                                <th className="p-4 text-left text-amber-100">Address</th>
                                <th className="p-4 text-left text-amber-100">Items</th>
                                <th className="p-4 text-left text-amber-100">Total Items</th>
                                <th className="p-4 text-left text-amber-100">Price</th>
                                <th className="p-4 text-left text-amber-100">Payment</th>
                                <th className="p-4 text-left text-amber-100">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                           { 
                           orders.map((order) => {
                            const totalItems = order.items.reduce((sum, entry) => sum + (entry.quantity || 0), 0);
                            const totalPrice = order.total ?? order.items.reduce(
                                (sum, entry) => sum + ((entry.item?.price || 0) * (entry.quantity || 0)),
                                0
                            );
                            const paymentMethod = getPaymentMethodDetails(order.paymentMethod);
                            const status = statusStyles[order.status] || statusStyles.processing;
                            return(
                                <tr key={order._id} className='border-b border-green-700 hover:bg-green-800/50
                                transition-colors group'>
                                    <td className='p-4 text-green-100 font-mnono text-sm'>
                                        #{order._id?.slice(-8)}
                                        </td >
                                        <td className='p-4'>
                                            <div className=' flex items-center gap-2'>
                                                <FiUser className='text-lg text-amber-100'/>
                                                <div>
                                                    <p className='text-green-100'>
                                                        {order.firstName} {order.lastName}
                                                    </p>
                                                    <p className='text-sm text-green-400'>
                                                        {order.phone}
                                                    </p>
                                                </div>
                                            </div>

                                        </td>

                                         <td className='p-4'>
                                            <div className=' flex items-center gap-2'>
                                                <FiMap className='text-lg text-amber-400'/>
                                                <div className='text-green-100 text-sm max-w-[200px]'>
                                                    {order.address}, {order.city} - {order.zipCode}
                                                   
                                                </div>
                                            </div>

                                        </td>

                                        <td className='p-4'>
                                            <div className='space-y-2'>
                                                {order.items.map((entry, index) => (
                                                    <div key={`${order._id}-${index}`}
                                                    className='flex items-center gap-3 p-2 bg-green-900/20 rounded-lg'>
                                                        <img
                                                        src={entry.item?.imageUrl?.startsWith('http')
                                                            ? entry.item.imageUrl
                                                            : `https://farmleaf-backend.onrender.com${entry.item?.imageUrl || ''}`}
                                                        alt={entry.item?.name || 'Item'} 
                                                        className="w-10 h-10 object-cover rounded-lg"/>
                                                        <div className='flex-1'>
                                                            <span className='text-green-100 text-sm block'>
                                                                {entry.item?.name || 'Unknown'}
                                                            </span>
                                                            <div className='flex items-center gap-2 text-xs text-green-400'>
                                                                <span>Rs {entry.item?.price || 0}</span>
                                                                <span className='mx-1'>&middot;</span>
                                                                <span>x{entry.quantity || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <FiBox className='text-lg text-green-100'/>
                                                <span className='text-green-100 font-mono text-lg'>
                                                    {totalItems}
                                                </span>
                                            </div>

                                        </td>
                                        <td className='p-4 text-green-100  text-lg'>
                                            Rs {totalPrice.toFixed(2)}

                                        </td>

                                        <td className='p-4'>
                                            <div className='flex flex-col gap-2'>
                                                <div className={`${paymentMethod.class} px-3 py-1.5 rounded-lg
                                                    border text-sm`}>
                                                    {paymentMethod.label}
                                                    </div>
                                            </div>
                                        </td>
                                        <td className='p-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center gap-2'>
                                                    <span className={`${status.color} text-xl`}>
                                                        {status.icon}
                                                    </span>
                                                    <span className={` px-4 py-2 rounded-lg ${status.bg} ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                {order.status !== 'cancelled' && order.status !== 'delivered' && order.status !== 'shipped' && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        disabled={cancelingId === order._id}
                                                        className='px-3 py-2 rounded-lg text-sm bg-red-600/20 text-red-300 border border-red-500/50 hover:bg-red-600/40 disabled:opacity-60'
                                                    >
                                                        {cancelingId === order._id ? 'Cancelling...' : 'Cancel'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                    
                                </tr>
                            )
                        }
                        )} 

                        </tbody>
                    </table>
                        </div>
                    </div>
                </div>
                {orders.length === 0 && !loading && (
                    <div className='text-center py-12 text-green-100 text-xl'>
                        You have no orders yet.
                    </div>)}
            </div>
        </div>
    </div>
  )
}

export default MyOrder
