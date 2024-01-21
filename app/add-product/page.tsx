"use client";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SelectMenu } from "../components/select-menu";
import { ListingStatus } from "../enums/listing-status.enum";
import axios from "axios";
import { toast } from "react-toastify";
import { set } from "mongoose";
import Link from "next/link";

const AddProduct = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const listingStatusOptions = Object.entries(ListingStatus).map(
    ([, value]) => ({
      id: value,
      name: value,
    })
  );

  const formik = useFormik({
    initialValues: {
      asin: "",
      lastMonthSales: "",
      averageMonthlySales: "",
      listingStatus: "",
      trackSales: false,
    },
    validationSchema: Yup.object({
      asin: Yup.string()
        .required("ASIN is required")
        .matches(/^[A-Z0-9]{10}$/, "Invalid ASIN"),
      lastMonthSales: Yup.number()
        .nullable()
        .positive("Sales must be positive")
        .integer("Sales must be an integer"),
      averageMonthlySales: Yup.number()
        .nullable()
        .positive("Sales must be positive")
        .integer("Sales must be an integer"),
      listingStatus: Yup.string().required("Listing status is required"),
      trackSales: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/products/add", values);
        if (response.status === 201) {
          formik.setFieldValue("asin", "");
          toast.success("Product added successfully");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Product
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* ASIN Field */}
          <div className="mb-4">
            <label
              htmlFor="asin"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ASIN
            </label>
            <input
              id="asin"
              name="asin"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.asin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.asin && formik.errors.asin && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.asin}
              </p>
            )}
          </div>

          <div className="mb-4">
            <SelectMenu
              label="Listing Status"
              items={listingStatusOptions}
              field={formik.getFieldProps("listingStatus")}
              form={formik}
            />
            {formik.touched.listingStatus && formik.errors.listingStatus && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.listingStatus}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="trackSales"
                  name="trackSales"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.trackSales}
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="trackSales"
                  className="font-medium text-gray-700"
                >
                  Track Product Sales / Quantity
                </label>
              </div>
            </div>
          </div>

          {/* Last Month Sales Field */}
          <div className="mb-4">
            <label
              htmlFor="lastMonthSales"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last Month Sales
            </label>
            <input
              id="lastMonthSales"
              name="lastMonthSales"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastMonthSales}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.lastMonthSales && formik.errors.lastMonthSales && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.lastMonthSales}
              </p>
            )}
          </div>

          {/* Average Monthly Sales Field */}
          <div className="mb-6">
            <label
              htmlFor="averageMonthlySales"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Average Monthly Sales
            </label>
            <input
              id="averageMonthlySales"
              name="averageMonthlySales"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.averageMonthlySales}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.averageMonthlySales &&
              formik.errors.averageMonthlySales && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.averageMonthlySales}
                </p>
              )}
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ width: "150px" }}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-300 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="white"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Add Product"
              )}
            </button>
            <Link href="/all-products">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
