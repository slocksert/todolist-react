import React from 'react';

const TodoUpdatePopup = ({ currentTodo, setCurrentTodo, updateTodo, setIsPopupOpen }) => {
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      summary: currentTodo.summary,
      due: currentTodo.due,
      description: currentTodo.description,
    };

    await updateTodo(currentTodo.uuid, updatedData);
    setIsPopupOpen(false);
    window.location.reload()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold">Editar Tarefa</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={currentTodo.summary}
            onChange={(e) => setCurrentTodo({ ...currentTodo, summary: e.target.value })}
            placeholder="Resumo"
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            value={currentTodo.description}
            onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
            placeholder="Descrição"
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="date"
            value={currentTodo.due.split('T')[0]}
            onChange={(e) => setCurrentTodo({ ...currentTodo, due: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Salvar</button>
          <button type="button" onClick={() => setIsPopupOpen(false)} className="ml-2 bg-red-500 text-white p-2 rounded">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default TodoUpdatePopup;
