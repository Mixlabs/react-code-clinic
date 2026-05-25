interface IconProps {
    symbol: string;
    className?: string;
}

const Icon = ({ symbol, className }: IconProps) => (
    <span className={className}>{symbol}</span>
);

export default Icon;
