import React, { useState, useEffect } from 'react';
import RegisterBox from '../components/RegisterBox';
import LoginBox from '../components/LoginBox';
import Logo from '../components/Logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const checkJWT = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check', {
          withCredentials: true,
        });
        if (response.status === 200) {
          window.location.href = '/home';
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      }
    };

    checkJWT();
  }, []);

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen gap-20">
        <Logo width={500} height={500}/>
        {showLogin ? 
          <LoginBox onRegisterClick={handleRegisterClick} />
        : 
          <RegisterBox onLoginClick={handleLoginClick} />
        }
        
      </div>
      <ToastContainer />
    </>
  );
};

export default AuthPage;
