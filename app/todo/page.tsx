"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getTodos, addTodo, modifyTodo, removeTodo } from "../../core/services/todoService";
import { isAuthenticated } from '@/core/middlewares/isAuthenticated';

export default function TodosPage() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editTodo, setEditTodo] = useState<any>(null);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalTasks: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/sign-in');
    } if (!isAuthenticated()) {
      router.push('/sign-in');
    } else {
      setLoading(false);
    }
  }, [router]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      if (response.statusCode === 200) {
        setTodos(response.tasks);
        setPagination(response.pagination);
      } else {
        setError("Error al obtener la lista de tareas.");
      }
    } catch (error) {
      setError("Error al obtener la lista de tareas.");
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchTodos();
    }
  }, [loading]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const handleAddTodo = async () => {
    if (!newTitle || !newDescription) {
      setError("Debes completar ambos campos.");
      return;
    }

    try {
      const response = await addTodo(newTitle, newDescription);
      if (response.statusCode === 200) {
        setNewTitle("");
        setNewDescription("");
        fetchTodos();
      } else {
        setError("Error al agregar la tarea.");
      }
    } catch (error) {
      setError("Error al agregar la tarea.");
    }
  };

  const handleUpdateTodo = async (id: string) => {
    if (!editTodo?.title || !editTodo?.description) {
      setError("Debes completar ambos campos.");
      return;
    }

    try {
      const response = await modifyTodo(id, editTodo.title, editTodo.description);
      if (response.statusCode === 200) {
        setEditTodo(null);
        fetchTodos();
      } else {
        setError("Error al actualizar la tarea.");
      }
    } catch (error) {
      setError("Error al actualizar la tarea.");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await removeTodo(id);
      if (response.statusCode === 200) {
        fetchTodos();
      } else {
        setError("Error al eliminar la tarea.");
      }
    } catch (error) {
      setError("Error al eliminar la tarea.");
    }
  };

  const handleEditClick = (todo: any) => {
    setEditTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Tareas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={handleAddTodo}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar tarea
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Título</th>
            <th className="py-2">Descripción</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className="border-b">
              <td className="py-2 px-4">
                {editTodo?.id === todo.id ? (
                  <input
                    type="text"
                    value={editTodo?.title}
                    onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                    className="border p-2 rounded"
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td className="py-2 px-4">
                {editTodo?.id === todo.id ? (
                  <input
                    type="text"
                    value={editTodo.description}
                    onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                    className="border p-2 rounded"
                  />
                ) : (
                  todo.description
                )}
              </td>
              <td className="py-2 px-4">
                {editTodo?.id === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateTodo(todo.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          disabled={pagination.currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
        <button
          onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          disabled={pagination.currentPage === pagination.totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
