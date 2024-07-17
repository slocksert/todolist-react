import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoPopup from './TodoUpdatePopup';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/todo/get', {
          withCredentials: true,
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
      }
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (uuid) => {
    try {
      await axios.delete(`http://localhost:8000/todo/delete/${uuid}`, { withCredentials: true });
      setTodos(todos.filter(todo => todo.uuid !== uuid));
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      toast.error('Erro ao excluir a tarefa');
    }
  };

  const updateTodo = async (uuid, updatedData) => {
    try {
      const response = await axios.patch(`http://localhost:8000/todo/update/${uuid}`, updatedData, {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
      });
      setTodos(todos.map(todo => (todo.uuid === uuid ? response.data : todo)));
      toast.success('Tarefa atualizada com sucesso');
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error.message);
      toast.error('Erro ao atualizar a tarefa');
    }
  };

  const toggleStatus = async (uuid, currentStatus) => {
    const newStatus = !currentStatus;
    await updateTodo(uuid, { status: newStatus });
    window.location.reload()
  };

  const openPopup = (todo) => {
    setCurrentTodo(todo);
    setIsPopupOpen(true);
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Minhas Tarefas</h2>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {todos.map((todo) => (
              <TodoItem
                key={todo.uuid}
                todo={todo}
                toggleStatus={toggleStatus}
                openPopup={openPopup}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}

        {isPopupOpen && (
          <TodoPopup
            currentTodo={currentTodo}
            setCurrentTodo={setCurrentTodo}
            updateTodo={updateTodo}
            setIsPopupOpen={setIsPopupOpen}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
