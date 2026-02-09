import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../../components/Login/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#048b0b]/30 p-4 font-[Playfair_Display]'>
      <div className='bg-[#263238] rounded-xl p-6 w-full max-w-[480px] relative border-4 border-[#048b0b]/30 shadow-[0_0_30px] shadow-[#048b0b]/90'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-[#4cf452] to-[#048b0b]
          bg-clip-text text-transparent mb-4 text-center font-[Playfair_Display]'>
          FarmLeaf
        </h2>
        <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
      </div>
    </div>
  );
};

export default LoginPage;
