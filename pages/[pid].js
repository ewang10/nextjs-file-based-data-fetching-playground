import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = ({
    loadedProduct: {
        title,
        description
    }
}) => (
    <>
        <h1>{title}</h1>
        <p>{description}</p>
    </>
);

export async function getStaticProps(context) {
    const { params: { pid } } = context;
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const product = data.products.find(({ id }) => id === pid);

    return {
        props: {
            loadedProduct: product
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } }
        ],
        fallback: false
    };
}

export default ProductDetailPage;
