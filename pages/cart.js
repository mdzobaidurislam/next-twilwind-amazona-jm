import React, { useContext } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    // console.log(item);
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    if (item.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success(" Product update in the cart");
  };
  return (
    <Layout title="Shopping cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go shoping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="md:col-span-3 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-1">
                <th className="px-5 text-left">Item</th>
                <th className="px-5 text-right">Quantity</th>
                <th className="px-5 text-right">Price</th>
                <th className="px-5 text-center">Action</th>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link legacyBehavior href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("login?redirect=/shipping")}
                    className="primary-button w-full"
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
