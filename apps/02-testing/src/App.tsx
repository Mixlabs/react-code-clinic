import { useState } from 'react';
import './App.css';
import { useMovies } from './movies/hooks/useMovies';
import { useFavorites } from './favorites/hooks/useFavorites';
import MainLayoutTemplate from './ui-core/templates/MainLayoutTemplate';
import Header from './ui-core/organisms/Header';
import CatalogPage from './movies/pages/CatalogPage';
import FavoritesPage from './favorites/pages/FavoritesPage';

const App = () => {
    const [temp, setTemp] = useState<any>('');
    const [flag, setFlag] = useState<any>(false);
    const { data1, setData1, isLoading } = useMovies(temp);
    const { x1 } = useFavorites(data1, setData1, temp);

    return (
        <MainLayoutTemplate
            header={
                <Header
                    temp={temp}
                    onSearch={(e: any) => setTemp(e.target.value)}
                    flag={flag}
                    onFlagChange={setFlag}
                />
            }
        >
            {isLoading && <div className="loading">Cargando...</div>}
            {!flag
                ? <CatalogPage data1={data1} onToggle={x1} />
                : <FavoritesPage data1={data1} onToggle={x1} />
            }
        </MainLayoutTemplate>
    );
};

export default App;
