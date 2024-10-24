import Button from "../atoms/Button";

interface TodoActionsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
}

export default function TodoActions({ onEditClick, onDeleteClick }: TodoActionsProps) {
    return (
        <>
            <Button label="Editar" onClick={onEditClick} className="bg-yellow-500 text-white mr-2" />
            <Button label="Eliminar" onClick={onDeleteClick} className="bg-red-500 text-white" />
        </>
    );
}
