import mongoose, { Schema, Document } from "mongoose";

// Correct Location interface
interface Location {
  city: string;
  country: string;
  state: string;
}

// Correct Business interface
export interface IBusiness extends Document {
  businessName: string;
  location: Location;
  percentageOfDiscountOffered: number;
  email: string;
  username: string;
  password: string;
  businessLogo: string;
  createdAt: Date;
  updatedAt: Date;
}

// Correct location schema matching the interface
const locationSchema: Schema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
});

const businessSchema: Schema = new Schema(
  {
    businessName: { type: String, required: true },
    location: { type: locationSchema, required: true },
    percentageOfDiscountOffered: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessLogo: { type: String, default: "default-profile-pic.jpg" },
  },
  { timestamps: true }
);

const Business = mongoose.model<IBusiness>("Business", businessSchema);

export default Business;
