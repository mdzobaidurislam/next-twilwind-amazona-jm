import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Store);
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
    toast.success(" Product added to the cart");
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} legacyBehavior>
        <a>
          <Image
            width="100"
            height="100"
            layout="responsive"
            alt={product.name}
            src={product.image}
          />
        </a>
      </Link>
      <div className="flex flex-col justify-center p-5">
        <Link href={`/product/${product.slug}`} legacyBehavior>
          <a>
            <h2 className="text-lg ">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2"> {product.brand} </p>
        <p> ${product.price} </p>
        <button
          onClick={addToCartHandler}
          type="button"
          className="primary-button hover:bg-amber-400 active:bg-amber-500"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
