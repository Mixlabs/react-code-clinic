import { useEffect, useState } from 'react';

const useMovies = (temp: any) => {
    const [data1, setData1] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<any>(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/movies?search=${temp}`)
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

    return { data1, setData1, isLoading };
};

export { useMovies };
