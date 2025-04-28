import mongoose, { Schema, Document } from "mongoose";

// Define possible roles using a TypeScript enum
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  BUSINESS = 'business',
}

// Address sub-document type
interface Address {
  city: string;
  pinCode: string;
  state: string;
}

// User main interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  profilePicture: string;
  role: UserRole;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema: Schema = new Schema({
  city: { type: String },
  pinCode: { type: String },
  state: { type: String }
});

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    profilePicture: { type: String, default: 'default-profile-pic.jpg' },
    address: { type: addressSchema, required: true },
    
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
