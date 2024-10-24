interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({ label, onClick, disabled, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${className} px-4 py-2 rounded ${disabled ? 'opacity-50' : ''}`}
        >
            {label}
        </button>
    );
}
