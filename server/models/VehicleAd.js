import mongoose, { Schema } from "mongoose";

// Define the schema for a vehicle ad
const vehicleAdSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    mileage: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    variant: {
        type: String,
        required: true
    },
    condition: {
      type: String,
      enum: ['New', 'Used'],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    seller: {
      type: String,
      ref: 'User', 
      required: true
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    views: {
        type: Number,
        default: 0
    },

    images: [String] // Array of image URLs
  }, { timestamps: true }
);

const VehicleAd = mongoose.model("VehicleAd", vehicleAdSchema);

export default VehicleAd;
