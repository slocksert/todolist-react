import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const LoginBox = ({ onRegisterClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Login successful:', response.data);
      toast.success('Login realizado com sucesso!');

      console.log(Cookies.set('jwt', response.data.message));
      console.log('Cookie JWT definido:', Cookies.get('jwt'));
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      toast.error('Credenciais incorretas');
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-gray-50 h-auto w-144 rounded-2xl p-6 flex flex-col items-center transition-opacity">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      <Input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Seu@email.com"
        className="mb-4 max-w-64"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Senha"
        className="mb-6 max-w-64"
      />
      <button
        className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
        onClick={handleLoginClick}
      >
        Entrar
      </button>
      <p className="text-sm mt-4 text-black no-underline">
        Ainda não tem uma conta?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={onRegisterClick}>
          Registre-se
        </span>
      </p>
    </div>
  );
};

export default LoginBox;
