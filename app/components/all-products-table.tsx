"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IProduct } from "../models/product.model";
import { ListingStatus } from "../enums/listing-status.enum";

const AllProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

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
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
    },
    {
      headerName: "ASIN",
      field: "asin",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 150,
    },
    {
      headerName: "Brand",
      field: "product_info.brand",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 100,
    },
    {
      headerName: "Rating",
      field: "product_info.rating",
      width: 95,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
    },
    {
      headerName: "Total Reviews",
      field: "product_info.ratings_total",
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 150,
    },
    {
      headerName: "Price",
      field: "price",
      cellRenderer: (params: ICellRendererParams<IProduct>) =>
        `$${params.value.toFixed(2)}`,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 100,
    },
    {
      headerName: "Last Month Sales",
      field: "last_month_sales",
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 150,
    },
    {
      headerName: "Average Monthly Sales",
      field: "average_monthly_sales",
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 150,
    },
    {
      headerName: "Listing Status",
      field: "listing_status",
      filter: "agSetColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
      },
      width: 150,
    },
    {
      headerName: "Listed By",
      field: "listed_by.name",
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-2">
          <img
            src={params.data.listed_by.picture}
            alt={params.data.listed_by.name}
            style={{ width: 32, borderRadius: "50%" }}
          />
          <span>{params.data.listed_by.name}</span>
        </div>
      ),
      filter: "agTextColumnFilter",
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
        rowData={products}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        animateRows={true}
      />
    </div>
  );
};

export default AllProductsTable;
