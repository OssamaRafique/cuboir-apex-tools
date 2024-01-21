// models/Product.ts
import mongoose, { Document, Schema } from "mongoose";
import { ReviewStatus } from "../enums/review-status.enum";
import { IUser } from "./user.model";

export interface VariantDimension {
  name: string;
  value: string;
}

export interface Variant {
  asin: string;
  title: string;
  is_current_product: boolean;
  link: string;
  dimensions: VariantDimension[];
  main_image: string;
  images: { variant: string; link: string }[];
  price: {
    symbol: string;
    value: number;
    currency: string;
    raw: string;
  };
}

export interface ProductCategory {
  name: string;
  link?: string;
  category_id?: string;
}

export interface IBuyBoxWinner {
  maximum_order_quantity: {
    value: number;
    hard_maximum: boolean;
  };
  new_offers_count: number;
  new_offers_from: {
    symbol: string;
    value: number;
    currency: string;
    raw: string;
  };
  is_prime: boolean;
  is_prime_exclusive_deal: boolean;
  is_amazon_fresh: boolean;
  condition: {
    is_new: boolean;
  };
  availability: {
    type: string;
    raw: string;
    dispatch_days: number;
    stock_level: number;
  };
  fulfillment: {
    type: string;
    standard_delivery: {
      date: string;
      name: string;
    };
    fastest_delivery: {
      date: string;
      name: string;
    };
    is_sold_by_amazon: boolean;
    is_fulfilled_by_amazon: boolean;
    is_fulfilled_by_third_party: boolean;
    is_sold_by_third_party: boolean;
    third_party_seller: {
      name: string;
      link: string;
      id: string;
    };
  };
  price: {
    symbol: string;
    value: number;
    currency: string;
    raw: string;
  };
  shipping: {
    raw: string;
  };
}

export interface IProductTracking {
  date: Date;
  quantity: number;
  offersRaw: any;
}

export interface IProductInfo {
  title: string;
  search_alias: {
    title: string;
    value: string;
  };
  keywords: string;
  keywords_list: string[];
  parent_asin: string;
  link: string;
  brand: string;
  variants: Variant[];
  variant_asins_flat: string;
  has_size_guide: boolean;
  categories: ProductCategory[];
  categories_flat: string;
  description: string;
  sub_title: {
    text: string;
    link: string;
  };
  marketplace_id: string;
  rating: number;
  ratings_total: number;
  main_image: {
    link: string;
  };
  images: { link: string; variant: string }[];
  images_count: number;
  images_flat: string;
  videos_flat: string;
  is_bundle: boolean;
  feature_bullets: string[];
  feature_bullets_count: number;
  feature_bullets_flat: string;
  important_information: {
    sections: { body: string }[];
  };
  buybox_winner: IBuyBoxWinner;
  specifications: { name: string; value: string }[];
  specifications_flat: string;
  bestsellers_rank: {
    category: string;
    rank: number;
    link: string;
  }[];
  bestsellers_rank_flat: string;
  manufacturer: string;
  weight: string;
  first_available: {
    raw: string;
    utc: Date;
  };
  dimensions: string;
  model_number: string;
}

export interface IProduct {
  asin: string;
  product_info: IProductInfo;
  last_month_sales: number;
  average_monthly_sales: number;
  price: number;
  listing_status: string;
  track_sales: boolean;
  review_status_hassnat: ReviewStatus;
  review_status_ossama: ReviewStatus;
  product_tracking: IProductTracking[];
  listed_by: IUser;
}

interface IProductDocument extends IProduct, Document {}

const ProductTrackingSchema: Schema<IProductTracking> = new Schema({
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  offersRaw: Schema.Types.Mixed,
});

const ProductSchema: Schema<IProductDocument> = new Schema(
  {
    asin: { type: String, required: true },
    product_info: Schema.Types.Mixed,
    last_month_sales: { type: Number, required: false },
    price: { type: Number, required: false },
    average_monthly_sales: { type: Number, required: false },
    listing_status: { type: String, required: true },
    track_sales: { type: Boolean, required: true },
    review_status_hassnat: { type: String, default: ReviewStatus.InReview },
    review_status_ossama: { type: String, default: ReviewStatus.InReview },
    listed_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product_tracking: [ProductTrackingSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
