import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    picture:String,
    venue: String,

  },
  { timestamps: true }
);


const Event = mongoose.model("Event", eventSchema);

export default Event;