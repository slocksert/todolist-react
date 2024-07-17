import React, { useState } from 'react';
import axios from 'axios';

const TodoPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    due: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/todo/create-todo', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      onClose();
      window.location.reload()
      console.log('Novo todo adicionado:', response.data);
    } catch (error) {
      console.error('Erro ao adicionar novo todo:', error);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Adicionar Nova Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Resumo
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="due" className="block text-sm font-medium text-gray-700">
              Data de Vencimento
            </label>
            <input
              type="date"
              id="due"
              name="due"
              value={formData.due}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoPopup;
