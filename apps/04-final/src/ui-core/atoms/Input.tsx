import { ChangeEvent } from 'react';

interface InputProps {
    className?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input = ({ className, value, onChange, placeholder }: InputProps) => (
    <input
        className={className}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default Input;
