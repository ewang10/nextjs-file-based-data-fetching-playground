import fs from 'fs/promises';
import path from 'path';

const HomePage = ({ products }) => (
  <ul>
    {
      products.map(({ id, title }) => <li key={id}>{title}</li>)
    }
  </ul>
);

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };
}

export default HomePage;
