import React from 'react';
import { FaRegCheckSquare, FaRegSquare, FaEdit, FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, toggleStatus, openPopup, deleteTodo }) => {
  return (
    <li className="py-2 flex items-start justify-between">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{todo.summary}</h3>
        <p className="text-sm text-gray-600">Status: {todo.status ? 'Concluído' : 'Pendente'}</p>
        <p className="text-sm text-gray-600">Descrição: {todo.description}</p>
        <p className="text-sm text-gray-600">Data de vencimento: {new Date(todo.due).toLocaleDateString('pt-BR')}</p>
      </div>
      <div className="flex space-x-2 items-center">
        <button onClick={() => toggleStatus(todo.uuid, todo.status)} title={todo.status ? "Desmarcar" : "Marcar como Concluído"}>
          {todo.status ? (
            <FaRegCheckSquare className="text-blue-500 hover:text-blue-700" />
          ) : (
            <FaRegSquare className="text-blue-500 hover:text-blue-700" />
          )}
        </button>
        <button onClick={() => openPopup(todo)} title="Atualizar">
          <FaEdit className="text-yellow-500 hover:text-yellow-700" />
        </button>
        <button onClick={() => deleteTodo(todo.uuid)} title="Excluir">
          <FaTrash className="text-red-500 hover:text-red-700" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
