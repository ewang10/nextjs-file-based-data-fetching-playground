import { useEffect, useState } from "react";
import useSWR from 'swr';

const FIREBASE_SALES_DB = 'https://nextjs-playground-d4f14-default-rtdb.firebaseio.com/sales.json';

const LastSalesPage = ({ initialSales }) => {
    const [sales, setSales] = useState(initialSales);

    const { data, error } = useSWR(FIREBASE_SALES_DB, (url) => fetch(url).then(res => res.json()));

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

    if (!data && !sales) {
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

export async function getStaticProps() {
    const response = await fetch(FIREBASE_SALES_DB);
    const data = await response.json();

    const transformedData = [];

    for (const key in data) {
        const { username, volume } = data[key];

        transformedData.push({
            id: key,
            username,
            volume
        });
    }

    return {
        props: {
            initialSales: transformedData
        },
        revalidate: false
    };
}

export default LastSalesPage;
