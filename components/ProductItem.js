import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} legacyBehavior>
        <a>
          <img alt={product.name} src={product.image} />
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
