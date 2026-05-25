const useFavorites = (data1: any[], setData1: any, temp: any) => {
    const x1 = (id: any) => {
        const m: any = data1.find((item: any) => item.id === id);
        fetch(`/api/movies/${id}/favorite`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isFavorite: !m.isFavorite }),
        }).then(() => {
            fetch(`/api/movies?search=${temp}`)
                .then((r: any) => r.json())
                .then((json: any) => setData1(json));
        });
    };

    return { x1 };
};

export { useFavorites };
