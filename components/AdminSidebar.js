import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/admin/dashboard" legacyBehavior>
            <a className="font-bold">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link href="/admin/products" legacyBehavior>
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/users" legacyBehavior>
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}
