"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getTodos, addTodo, modifyTodo, removeTodo } from "../../core/services/todoService";
import { isAuthenticated } from '@/core/middlewares/isAuthenticated';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import TodoList from '../../components/organisms/TodoList';
import PaginationControls from '../../components/molecules/PaginationControls';

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
                <Button label="Cerrar Sesión" onClick={handleLogout} className="bg-red-500 text-white" />
            </div>

            <div className="flex mb-4">
                <Input
                    type="text"
                    placeholder="Título"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="mr-2"
                />
                <Input
                    type="text"
                    placeholder="Descripción"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="mr-2"
                />
                <Button label="Agregar tarea" onClick={handleAddTodo} className="bg-green-500 text-white" />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <TodoList
                todos={todos}
                editTodo={editTodo}
                handleEditClick={handleEditClick}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
                handleCancelEdit={handleCancelEdit}
                setEditTodo={setEditTodo}
            />

            <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPrevious={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                onNext={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
            />
        </div>
    );
}
