import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { cart } = state;
  const router = useRouter();
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = async () => {
    Cookies.remove("cart");
    dispatch({
      type: "CART_RESET",
    });
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    console.log(data);
    router.push(data.url);
  };
  return (
    <>
      <Head>
        <title>{title ? title + "-Amazona" : "Amazona"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center">
            <Link href="/" legacyBehavior>
              <a className="text-lg font-bold">Amazona</a>
            </Link>
            <div>
              <Link href="/cart" legacyBehavior>
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.isAdmin == "admin" ? "Admin" : "Normal"} ----
                    {session.user.demo} || {session.user.name} ||
                  </Menu.Button>
                  <Menu.Items className="dropdown_menu">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <DropdownLink
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            href="/profile"
                          >
                            Profile
                          </DropdownLink>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <DropdownLink
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            href="/order-history"
                          >
                            Order history
                          </DropdownLink>
                        )}
                      </Menu.Item>

                      {session.user.isAdmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <DropdownLink
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              href="/admin/dashboard"
                            >
                              Admin Dashboard
                            </DropdownLink>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            href="#"
                            onClick={logoutClickHandler}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" legacyBehavior>
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner ">
          <p>Copyright @ 2023 Amazona</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
