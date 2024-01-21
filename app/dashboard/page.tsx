import * as React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const DashboardPage = async () => {
  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Total Products Listed
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  45
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Approved Products
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  2
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Your Balance
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  $0.00
                </dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
    </>
  );
};

export default withPageAuthRequired(DashboardPage);
