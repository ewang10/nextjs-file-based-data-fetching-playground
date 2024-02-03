import { useEffect, useState } from "react";
import useSWR from 'swr';

const LastSalesPage = () => {
    const [sales, setSales] = useState();

    const { data, error } = useSWR('https://nextjs-playground-d4f14-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (data) {
            const transformedData = [];

            for (const key in data) {
                const { username, volume } = data[key];

                transformedData.push({
                    id: key,
                    username,
                    volume
                });
            }

            setSales(transformedData);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load.</p>;
    }
    
    if (!data || !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {sales.map(({ id, username, volume }) => (
                <li key={id}>
                    {username} - {volume}
                </li>
            ))}
        </ul>
    );
};

export default LastSalesPage;
