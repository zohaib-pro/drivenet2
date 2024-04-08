import mongoose from "mongoose";

const issueSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vehicleAdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleAd',
      required: true
    },
    details: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'processing', 'resolved'],
      default: 'new',
    }
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
