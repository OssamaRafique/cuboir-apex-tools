"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IProduct } from "../models/product.model";
import { ListingStatus } from "../enums/listing-status.enum";
import { classNames } from "../utils";
import { toast } from "react-toastify";

const AllProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(`ASIN copied to clipboard`);
  };

  const columnDefs: ColDef<IProduct, any>[] = [
    {
      headerName: "Image",
      field: "product_info.main_image.link",
      cellRenderer: (params: ICellRendererParams) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: 40, height: 40 }}
        />
      ),
      floatingFilter: false,
      filter: false,
      width: 80,
    },
    {
      headerName: "Title",
      field: "product_info.title",
      cellRenderer: (params: ICellRendererParams) => (
        <a
          href={params.data.product_info.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.value}
        </a>
      ),
    },
    {
      headerName: "ASIN",
      field: "asin",
      width: 150,
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button
            onClick={() => copyToClipboard(params.value)}
            title="Copy ASIN"
          >
            <span>{params.value}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </button>
        </div>
      ),
    },
    {
      headerName: "Brand",
      field: "product_info.brand",
      cellRenderer: (params: ICellRendererParams) => (
        <a className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
          <span className="absolute flex flex-shrink-0 items-center justify-center">
            <span
              className={classNames(
                params.value === "Generic" ? "bg-green-500" : "bg-rose-500",
                "h-1.5 w-1.5 rounded-full"
              )}
              aria-hidden="true"
            />
          </span>
          <span className="ml-3.5 font-medium text-gray-900">
            {params.value}
          </span>
        </a>
      ),
      width: 130,
    },
    {
      headerName: "Rating",
      field: "product_info.rating",
      width: 120,
      cellRenderer: (params: ICellRendererParams<IProduct>) => {
        let ratingColor = "green";
        if (params.value < 4) {
          ratingColor = "orange";
        }
        if (params.value < 3.5) {
          ratingColor = "red";
        }
        return (
          <>
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400">
              {params.value}
            </span>
            <span>({params.data?.product_info.ratings_total})</span>
          </>
        );
      },
    },
    {
      headerName: "Price",
      field: "price",
      cellRenderer: (params: ICellRendererParams<IProduct>) =>
        `$${params.value.toFixed(2)}`,
      width: 100,
    },
    {
      headerName: "Last Month Sales",
      field: "last_month_sales",
      width: 150,
    },
    {
      headerName: "Average Monthly Sales",
      field: "average_monthly_sales",
      width: 150,
    },
    {
      headerName: "Listing Status",
      field: "listing_status",
      cellRenderer: (params: ICellRendererParams<IProduct>) => {
        let statusColor = "green";
        if (
          params.value === ListingStatus.Listable ||
          params.value === ListingStatus.Listable5885
        ) {
          statusColor = "green";
        } else if (params.value === ListingStatus.PendingCheck) {
          statusColor = "indigo";
        } else if (params.value === ListingStatus.InvoiceRequiredForApproval) {
          statusColor = "orange";
        } else {
          statusColor = "red";
        }
        return (
          <span
            className={classNames(
              statusColor === "green"
                ? "bg-green-100 text-green-800"
                : statusColor === "orange"
                ? "bg-orange-100 text-orange-800"
                : "bg-red-100 text-red-800",
              "text-xs font-medium px-2.5 py-0.5 rounded-full"
            )}
          >
            {params.value}
          </span>
        );
      },
      width: 190,
    },
    {
      headerName: "Listed By",
      field: "listed_by.name",
      cellRenderer: (params: ICellRendererParams<IProduct>) => (
        <div className="flex items-center gap-2">
          <img
            src={params.data?.listed_by.picture}
            alt={params.data?.listed_by.name}
            style={{ width: 32, borderRadius: "50%" }}
          />
          <span>{params.data?.listed_by.name}</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<IProduct[]>("/api/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        gridOptions={{
          defaultColDef: {
            sortable: true,
            resizable: true,
            filter: true,
            filterParams: {
              buttons: ["reset", "apply"],
            },
            floatingFilter: true,
          },
        }}
        rowData={products}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        animateRows={true}
      />
    </div>
  );
};

export default AllProductsTable;
