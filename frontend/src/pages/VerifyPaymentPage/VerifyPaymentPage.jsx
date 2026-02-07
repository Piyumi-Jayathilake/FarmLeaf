import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import axios from 'axios';



const VerifyPaymentPage = () => {
  const {clearCart} = useCart();
  const {search} = useLocation();
  const navigate = useNavigate();
  const [statusMag, setStatusMag] = useState('Verifying payment, please wait...');

  //Token
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? {
        'Authorization': `Bearer ${token}`
    } : {}; 
     useEffect(() => {
    const params = new URLSearchParams(search);
    const success = params.get('success');
    const sessionId = params.get('session_id');
  
    if(success !== 'true' || !sessionId){
      if(success === 'false'){
        navigate('/checkout',{replace:true})
          return;
        }
        setStatusMag('Invalid payment verification parameters.');
        return;
      }
      //sripe succcc=true
      axios.get('http://localhost:4000/api/orders/confirm', {
        params: { sessionId },
        headers: authHeaders
      })
      .then(() => {
        clearCart();
        navigate('/myorder',{replace:true});
    })
      .catch((err) => {
        console.error('Payment verification error:', err);
        setStatusMag('Payment verification failed. Please contact support.');
        clearCart(false);
      })

  }, [search, navigate, authHeaders, clearCart]);


  return (
    <div className='min-h-screen items-center justify-center flex text-white'>
      <p>{statusMag}</p>
    </div>
  )
}

export default VerifyPaymentPage