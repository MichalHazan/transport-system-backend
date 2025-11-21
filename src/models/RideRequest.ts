import mongoose, { Schema, Document } from "mongoose";

export interface IRideRequest extends Document {
  clientId: string;
  tripType: string; // חד פעמית / קבועה / עסקית...
  origin: string;
  destinations: string[];
  vehicleType: string;
  seats: number;
  status: string; // Pending / Quotes / Approved / Completed
}

const RideRequestSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tripType: { type: String, required: true },
    origin: { type: String, required: true },
    destinations: [String],
    vehicleType: String,
    seats: Number,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRideRequest>("RideRequest", RideRequestSchema);
