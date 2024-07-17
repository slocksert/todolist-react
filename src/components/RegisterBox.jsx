/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import { toast } from 'react-toastify';

const RegisterBox = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Check passwords match on every input change
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordsMatch(formData.password === formData.confirmPassword || e.target.name === 'confirmPassword' && e.target.value === formData.password);
    }
  };

  const handleRegisterClick = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      toast.success('Registro realizado com sucesso!');

      setTimeout(() => {
        onLoginClick();
      }, 2000);

    } catch (error) {
      if (error.response.status === 400){
        toast.error('Email já cadastrado!');
      }
    }
  };

  return (
    <div className="bg-gray-50 h-auto w-144 rounded-2xl p-6 flex flex-col items-center transition-opacity">
      <h2 className="text-2xl font-bold mb-4 text-black">Registre-se</h2>
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Seu nome"
        className="mb-4 max-w-64"
      />
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
      <Input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirme sua senha"
        className="mb-6 max-w-64"
      />
      {!passwordsMatch && (
        <p className="text-sm text-red-500 mb-2">As senhas devem ser iguais.</p>
      )}
      <button
        className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
        onClick={handleRegisterClick}
      >
        Registrar
      </button>
      <p className="text-sm mt-4 text-black no-underline">
        Já tem uma conta?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>
          Logue aqui
        </span>
      </p>
    </div>
  );
};

export default RegisterBox;
