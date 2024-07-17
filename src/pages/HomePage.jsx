import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TodoPopup from '../components/TodoPopup';
import List from '../components/TodoList.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkJWT = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check', {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log('Usuário autenticado');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        navigate('/');
      }
    };

    checkJWT();
  }, [navigate]);

  const handleAddTodo = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/todo/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Novo todo adicionado:', response.data);
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao adicionar novo todo:', error);
    }
  };

  return (
    <>
    <div className="p-8">
      <Header onAddTodo={() => setShowPopup(true)} />
      {showPopup && <TodoPopup onClose={() => setShowPopup(false)} onAddTodo={handleAddTodo} />}
      <List />
    </div>
    <ToastContainer position='top-center'/>
    </>

  );
};

export default HomePage;
