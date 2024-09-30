import { useEffect, useState } from 'react'

function useFetch(url = '') {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    setError({
                        status: response.status,
                        message: 'Failed to get data'
                    });
                    setLoading(false);
                } else {
                    const json = await response.json();
                    setData(json);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.message);
                setError(error);
                setLoading(false);
            }
        }
        getData();
    }, [url])

    return { data, error, loading }
}

export default useFetch