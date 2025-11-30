import mongoose, { Schema, Document } from "mongoose";

export interface IRideRequest extends Document {
  clientId: string;
  tripType: string;
  origin: string;
  destinations: string[];
  seats: number;
  departureTime: string;  // ⬅ חדש
  status: string;
}

const RideRequestSchema: Schema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    tripType: { type: String, required: true },

    origin: { type: String, required: true },

    destinations: {
      type: [String],
      required: true,
      validate: [(arr: string[]) => arr.length > 0, "Destination required"],
    },

    seats: { type: Number, required: true },

    departureTime: { type: String, required: true }, // ⬅ חובה

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRideRequest>("RideRequest", RideRequestSchema);
