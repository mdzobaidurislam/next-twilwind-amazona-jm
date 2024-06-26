import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
// import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;
  // const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { push } = useRouter();
  // const { slug } = query;
  // console.log(query);
  // console.log(push);
  // const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/" className="primary-button">
          Back to product
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              <span className="text-[orange] font-bold">{product.rating}</span>{" "}
              of {product.numReviews} reviews
            </li>
            <li>Description : {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const { data } = await axios.get(
    `${process.env.BASE_URL}/api/product/${slug}`
  );

  return {
    props: {
      product: data,
    },
  };
}
