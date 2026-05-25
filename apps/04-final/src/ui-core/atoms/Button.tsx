import { ReactNode } from 'react';

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children: ReactNode;
}

const Button = ({ className, onClick, children }: ButtonProps) => (
    <button type="button" className={className} onClick={onClick}>
        {children}
    </button>
);

export default Button;
