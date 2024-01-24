const HomePage = ({ products }) => (
  <ul>
    {
      products.map(({ id, title }) => <li key={id}>{title}</li>)
    }
  </ul>
);

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }]
    }
  };
}

export default HomePage;
