import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import axios from "axios";

export default function Home(props) {
  const { products } = props;
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/product`);

  return {
    props: {
      products: data,
    },
  };
}
