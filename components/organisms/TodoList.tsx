import Button from "../atoms/Button";
import Input from "../atoms/Input";
import TodoActions from "../molecules/TodoActions";

interface TodoListProps {
    todos: any[];
    editTodo: any;
    handleEditClick: (todo: any) => void;
    handleDeleteTodo: (id: string) => void;
    handleUpdateTodo: (id: string) => void;
    handleCancelEdit: () => void;
    setEditTodo: (todo: any) => void;
}

export default function TodoList({ todos, editTodo, handleEditClick, handleDeleteTodo, handleUpdateTodo, handleCancelEdit, setEditTodo }: TodoListProps) {
    return (
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
                                <Input
                                    type="text"
                                    placeholder="Título"
                                    value={editTodo?.title}
                                    onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                                />
                            ) : (
                                todo.title
                            )}
                        </td>
                        <td className="py-2 px-4">
                            {editTodo?.id === todo.id ? (
                                <Input
                                    type="text"
                                    placeholder="Descripción"
                                    value={editTodo?.description}
                                    onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                                />
                            ) : (
                                todo.description
                            )}
                        </td>
                        <td className="py-2 px-4">
                            {editTodo?.id === todo.id ? (
                                <>
                                    <Button label="Guardar" onClick={() => handleUpdateTodo(todo.id)} className="bg-blue-500 text-white mr-2" />
                                    <Button label="Cancelar" onClick={handleCancelEdit} className="bg-gray-500 text-white" />
                                </>
                            ) : (
                                <TodoActions onEditClick={() => handleEditClick(todo)} onDeleteClick={() => handleDeleteTodo(todo.id)} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
