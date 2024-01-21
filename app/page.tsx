import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">
            Apex Team Tools
          </h2>
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Streamline Your Amazon Workflow
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Effortlessly manage and track your Amazon product listings.
          </p>
          <div className="mt-8">
            <a
              href="/api/auth/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
