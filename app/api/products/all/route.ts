import type { NextRequest } from "next/server";
import productModel from "cuboir/app/models/product.model";
import dbConnect from "cuboir/app/lib/dbConnect";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  await dbConnect();

  try {
    const products = await productModel.find({}).populate("listed_by").lean();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error fetching products", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});
