const Input = ({ className, value, onChange, placeholder }: any) => (
    <input
        className={className}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default Input;
