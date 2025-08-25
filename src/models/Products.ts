import { ProductDocument, VariantsDocument } from "@/types/types";
import mongoose, { model, Model, Schema } from "mongoose";

export const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: false }, // ✅ SEO: image alt text
  },
  { _id: false }
);

const VariantsSchema = new Schema<VariantsDocument>({
  priceId: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  images: {
    type: [ImageSchema], // changed to object with url + alt
    required: true,
  },
});

const ProductSchema: Schema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // ✅ SEO: clean product URLs
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String, // ✅ SEO: detailed product description
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String],
      required: true,
    },
    images: {
      type: [ImageSchema], // changed to object with url + alt
      required: true,
    },
    variants: {
      type: [VariantsSchema],
      required: true,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    tags: {
      type: [String], // ✅ SEO keywords/tags
      default: [],
    },
    meta: {
      title: { type: String },
      keywords: { type: [String], default: [] },
      description: { type: String },
    },
  },
  { timestamps: true } // ✅ adds createdAt / updatedAt automatically
);

export const Product = (mongoose.models.Product ||
  model("Product", ProductSchema)) as Model<any>;
