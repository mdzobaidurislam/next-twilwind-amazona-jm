import { useSession } from "next-auth/react";
import React from "react";
import Layout from "../../components/Layout";

export default function AdminScreen() {
  const { status, data: session } = useSession();

  return (
    <Layout title="Shopping cart">
      <h1>Admin</h1>
      <h1>
        {status === "loading" ? (
          "loading"
        ) : (
          <div>
            {session?.user.isAdmin == "admin" ? "Admin" : "Normal"} ----
            {session?.user.demo} || {session?.user.name} ||
          </div>
        )}
      </h1>
    </Layout>
  );
}

AdminScreen.auth = { adminOnly: true };
