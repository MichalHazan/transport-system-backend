import mongoose, { Schema, Document } from "mongoose";

export interface ISupplierQuote extends Document {
  supplierId: string;
  rideRequestId: string;
  price: number;
  approved: boolean;
}

const SupplierQuoteSchema: Schema = new Schema(
  {
    supplierId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rideRequestId: { type: Schema.Types.ObjectId, ref: "RideRequest", required: true },
    price: { type: Number, required: true },
    approved: { type: Boolean, default: false },
    canceled: { type: Boolean, default: false },

  },
  { timestamps: true }
);

export default mongoose.model<ISupplierQuote>("SupplierQuote", SupplierQuoteSchema);
