const Button = ({ className, onClick, children }: any) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

export default Button;
