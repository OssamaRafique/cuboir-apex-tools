import * as React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AllProductsTable from "../components/all-products-table";
import Link from "next/link";

const AllProducts = async () => {
  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              All Products
            </h1>
            <Link href="/add-product">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 mt-4"
              >
                Add Product
              </button>
            </Link>
          </div>
        </header>
        <main className="mt-5 px-5">
          <AllProductsTable />
        </main>
      </div>
    </>
  );
};

export default withPageAuthRequired(AllProducts);
