import React, { useEffect } from 'react'
import axios from 'axios'
import { FiUser, FiBox } from 'react-icons/fi'
import { layoutClasses, tableClasses, statusStyles , paymentMethodDetails, iconMap} from '../assets/admindetails'

const Order = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       const token = localStorage.getItem('authToken');

const response = await axios.get(
  'https://farmleaf-backend.onrender.com/api/orders/getall',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

        const formatted = (response.data.orders || []).map(order => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone ?? '',
          items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
          createdAt: new Date(order.createdAt).toLocaleString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
        }));

        setOrders(formatted);
        setError(null);
      } 
      catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } 
      finally {
        setLoading(false);
      }
    };
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
  `https://farmleaf-backend.onrender.com/api/orders/getall/${orderId}`,
  { status: newStatus },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      
      const updated = response.data?.order;
      if (updated) {
        setOrders(prev => prev.map(o =>
           o._id === orderId ? { ...o, status: updated.status } : o
        ));
      } else {
        setOrders(prev => prev.map(o =>
           o._id === orderId ? { ...o, status: newStatus } : o
        ));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status.');
    }
  };
if (loading) return (
    <div className={layoutClasses.page + ' flex items-center justify-center'}>
      <div className='text-amber-100 text-2xl'>Loading orders...</div></div>
  );
  
  if (error) return (
    <div className={layoutClasses.page + ' flex items-center justify-center'}>
      <div className='text-red-500 text-2xl'>Error: {error}</div>
    </div>
  );
  return (
    <div className={layoutClasses.page}>
      <div className='mx-auto max-w-7xl'>
        <div className={layoutClasses.card}>
          <h2 className={layoutClasses.heading}>Order Management</h2>
          <div className={tableClasses.wrapper}>
            <table className={tableClasses.table}>
              <thead className={tableClasses.headerRow}>
                <tr>
                   {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
                      <th key={h} className={tableClasses.headerCell + (h === 'Total Items' ? ' text-center' : '')}>{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  // Sum up the quantities of all items in the order
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  // Use the precomputed total if available; otherwise calculate price × quantity for each item
                  const totalPrice =
                  order.total ??
                  order.items.reduce(
                    (sum, i) =>
                      sum + (Number(i.item?.price) || 0) * (Number(i.quantity) || 0),
                    0
                  );

                  // Look up the display details for the payment method (lowercased), defaulting if not found
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  // Pick the style for the order’s overall status, falling back to “processing” if unknown
                  const stat = statusStyles[order.status] || statusStyles.processing;

                  return (
                    <tr key={order._id} className={tableClasses.row}>
                      <td className={tableClasses.cellBase + ' font-mono text-sm text-amber-100'}>
                        #{order._id.slice(-8)}</td>
                      <td className={tableClasses.cellBase}>
                        <div className=' flex items-center gap-2'>
                          <FiUser className='text-amber-100' />
                          {/*USER DATA */}
                        <div>
                        <p className='text-amber-100'>
                          {order.user?.name || order.firstName + ' ' + order.lastName}</p>
                        <p className='text-sm text-green-400'>
                          {order.user?.phone || order.phone}</p>
                        <p className='text-sm text-green-400'>
                          {order.user?.email || order.email}</p>
                        </div>
                        </div>
                        </td>
                        {/*ADDRESS*/}
                      <td className={tableClasses.cellBase}>
                        <div className='text-amber-100/80 text-sm max-w-[200px]'>
                        {order.address}, {order.city} - {order.zipCode}
                        </div></td>
                        <td className={tableClasses.cellBase}>
                        <div className='space-y-1 max-h-52 overflow-auto'>
                          {order.items.map((itm, idx) => (
                            <div key={idx} className='flex items-center px-3 p-2 rounded-lg'>
                              <img
                                  src={itm.item?.imageUrl?.startsWith('http')
                                    ? itm.item.imageUrl
                                    : `https://farmleaf-backend.onrender.com${itm.item?.imageUrl || ''}`}
                                alt={itm.item?.name || 'Item'}
                                className='w-10 h-10 object-cover rounded-lg'
                              />
                              <div className='flex-1'>
                                <span className='text-amber-100 text-sm block truncate'>
                                  {itm.item?.name || 'Unknown'}
                                </span>
                                <div className='flex items-center gap-2 text-sx text-green-400'>
                                  <span>Rs {itm.item?.price || 0}</span>
                                  <span>x{itm.quantity}</span>
                                </div>
                            </div>

                        </div>
                          ))}
                          </div>
                      </td>
                      <td className={tableClasses.cellBase + ' text-center'}>
                        <div className='flex items-center justify-center gap-1'>
                          <FiBox className='text-green-100' />
                          <span className='text-green-100 text-lg'>{totalItems}</span>
                        </div>
                      </td>
                      <td className={tableClasses.cellBase + ' text-green-100 text-lg font-semibold'}>
                        Rs {totalPrice.toFixed(2)}</td>
                      <td className={tableClasses.cellBase}>
                        <div className='flex flex-col gap-2'>
                        <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
                          {payMethod.label}
                        </div>
                      </div>  
                      </td>
                      <td className={tableClasses.cellBase}>
                        <div className=' flex items-center gap-2 '>
                          <span className={`${stat.color} text-xl`}>
                            {iconMap[stat.icon]}
                          </span>
                          <select
                          id={`order-status-${order._id}`}
                          name='status'
                          value={order.status || 'processing'}
                          onChange={e =>
                            handleStatusChange(order._id, e.target.value)}
                            className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border
                              border-[#263238] text-sm cursor-pointer bg-[#263238]`}>
                                {['processing','shipped','delivered','cancelled'].map((key) =>(
                                  <option value={key} key={key} 
                                  className={`${statusStyles[key]?.bg || ''} ${statusStyles[key]?.color || ''}`}>
                                    {statusStyles[key]?.label || key}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </td>
                        </tr>
                  )

                })}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className=' text-center py-12 text-2xl text-green-100 '>
              No orders found
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order;
