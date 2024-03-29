import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = ({ loadedProduct }) => {
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }
    
    const { title, description } = loadedProduct;

    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
};

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    const { params: { pid } } = context;
    const data = await getData();
    const product = data.products.find(({ id }) => id === pid);

    if (!product) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            loadedProduct: product
        }
    };
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(({ id }) => id);
    const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathsWithParams,
        fallback: true
    };
}

export default ProductDetailPage;
