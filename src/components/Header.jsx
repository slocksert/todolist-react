import React, { useState } from 'react';
import TodoFormPopup from './TodoPopup';
import Logo from '../components/Logo';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ({ onNewTodo }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = async () => {
    Cookies.remove('jwt', { path: '' , domain: 'localhost', secure: true});
    navigate('/')
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Logo height={125} width={125} />
      <div className="flex items-center">
        <button
          onClick={togglePopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Adicionar Todo
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        {showPopup && <TodoFormPopup onClose={togglePopup} onNewTodo={onNewTodo} />}
      </div>
    </div>
  );
};

export default Header;
