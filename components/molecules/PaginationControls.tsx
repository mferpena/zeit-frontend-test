import Button from "../atoms/Button";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

export default function PaginationControls({ currentPage, totalPages, onPrevious, onNext }: PaginationControlsProps) {
    return (
        <div className="flex justify-between mt-4">
            <Button label="Anterior" onClick={onPrevious} disabled={currentPage === 1} className="bg-gray-500 text-white" />
            <span>Página {currentPage} de {totalPages}</span>
            <Button label="Siguiente" onClick={onNext} disabled={currentPage === totalPages} className="bg-gray-500 text-white" />
        </div>
    );
}
