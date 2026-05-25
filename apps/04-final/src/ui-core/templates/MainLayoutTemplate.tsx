import { ReactNode } from 'react';

interface MainLayoutTemplateProps {
    header: ReactNode;
    children: ReactNode;
}

const MainLayoutTemplate = ({ header, children }: MainLayoutTemplateProps) => (
    <div className="app">
        {header}
        {children}
    </div>
);

export default MainLayoutTemplate;
