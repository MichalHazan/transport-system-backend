import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "Admin" | "Supplier" | "Client";
  phone?: string;
  company?: string;
  vehicles?: {
    type: string; // Bus / Minibus / Car
    seats: number;
    licensePlate: string;
  }[];
  documents?: {
    security: boolean;
    insurance: boolean;
    vehicleCheck: boolean;
  };
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Supplier", "Client"],
      required: true,
    },

    phone: { type: String }, // חדש

    // Supplier-only
    company: { type: String },
    vehicles: [
      {
        type: { type: String },
        seats: Number,
        licensePlate: String,
      },
    ],
    documents: {
      security: Boolean,
      insurance: Boolean,
      vehicleCheck: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
