import { SessionProvider, useSession } from "next-auth/react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // console.log(Component.auth);
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
function Auth({ children, adminOnly }) {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user?.isAdmin) {
    router.push("/unauthorized?message=Admin login required");
  }
  return children;
}

export default MyApp;
