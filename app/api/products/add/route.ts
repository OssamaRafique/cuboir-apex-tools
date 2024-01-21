import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";
import productModel from "cuboir/app/models/product.model";
import dbConnect from "cuboir/app/lib/dbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import userModel from "cuboir/app/models/user.model";

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  await dbConnect();

  const {
    asin,
    lastMonthSales,
    averageMonthlySales,
    listingStatus,
    trackSales,
  } = await request.json();
  const asinApiKey = process.env.ASIN_API_KEY;

  if (!asinApiKey) {
    return new Response(
      JSON.stringify({ message: "ASIN API Key is not configured." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const response = new NextResponse();
  const session = await getSession(request, response);

  if (!session) {
    return new Response(
      JSON.stringify({ message: "User not authenticated." }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { user } = session;
  const { sub, name, picture } = user;

  let userRecord = await userModel.findOne({ sub });
  if (!userRecord) {
    userRecord = new userModel({ sub, name, picture });
    await userRecord.save();
  }

  console.log("userRecord", userRecord.id);

  try {
    const apiResponse = await axios.get(`https://api.asindataapi.com/request`, {
      params: {
        api_key: asinApiKey,
        amazon_domain: "amazon.com",
        asin,
        type: "product",
      },
    });
    const productData = apiResponse.data.product;
    const newProduct = new productModel({
      asin,
      product_info: productData,
      last_month_sales: lastMonthSales,
      average_monthly_sales: averageMonthlySales,
      listing_status: listingStatus,
      track_sales: trackSales,
      price: productData.buybox_winner?.price?.value,
      listed_by: userRecord._id,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error adding product", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});
