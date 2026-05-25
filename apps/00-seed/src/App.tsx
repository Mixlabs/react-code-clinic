import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [data1, setData1] = useState<any[]>([]);
    const [temp, setTemp] = useState<any>('');
    const [flag, setFlag] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<any>(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/api/movies?search=${temp}`)
            .then((res: any) => res.json())
            .then((json: any) => {
                setData1(json);
                setIsLoading(false);
            })
            .catch((e: any) => {
                console.log(e);
                setIsLoading(false);
            });
    }, [temp]);

    const x1 = (id: any) => {
        const m: any = data1.find((item: any) => item.id === id);
        fetch(`http://localhost:3000/api/movies/${id}/favorite`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isFavorite: !m.isFavorite }),
        }).then(() => {
            fetch(`http://localhost:3000/api/movies?search=${temp}`)
                .then((r: any) => r.json())
                .then((json: any) => setData1(json));
        });
    };

    return (
        <div className="app">
            <header className="header">
                <div className="logo">
                    <span className="fake">Fake</span>
                    <span className="flix">Flix</span>
                </div>

                <input
                    className="search"
                    type="text"
                    placeholder="Buscar película..."
                    value={temp}
                    onChange={(e: any) => setTemp(e.target.value)}
                />

                <div className="tabs">
                    <button
                        className={!flag ? 'tab active' : 'tab'}
                        onClick={() => setFlag(false)}
                    >
                        Catálogo General
                    </button>
                    <button
                        className={flag ? 'tab active' : 'tab'}
                        onClick={() => setFlag(true)}
                    >
                        Mis Favoritos
                    </button>
                </div>
            </header>

            {isLoading && <div className="loading">Cargando...</div>}

            {!flag
                ? (
                    <div className="grid">
                        {data1.map((item: any) => (
                            <div key={item.id} className="card">
                                <img src={item.imageUrl} alt={item.title} />
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <button
                                        className={item.isFavorite ? 'heart active' : 'heart'}
                                        onClick={() => x1(item.id)}
                                    >
                                        {item.isFavorite ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : (
                    <div className="grid">
                        {data1.filter((item: any) => item.isFavorite).map((item: any) => (
                            <div key={item.id} className="card">
                                <img src={item.imageUrl} alt={item.title} />
                                <div className="card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <button
                                        className={item.isFavorite ? 'heart active' : 'heart'}
                                        onClick={() => x1(item.id)}
                                    >
                                        {item.isFavorite ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {data1.filter((item: any) => item.isFavorite).length === 0 && (
                            <div className="empty">
                                <p>No tienes películas favoritas todavía.</p>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default App;
