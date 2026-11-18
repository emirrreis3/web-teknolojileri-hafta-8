import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, "capacity alanı zorunludur"],
      min: [1, "capacity en az 1 olmalıdır"]
    },
    date: {
      type: String,
      required: [true, "date alanı zorunludur"],
      trim: true
    },
    time: {
      type: String,
      required: [true, "time alanı zorunludur"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "location alanı zorunludur"],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
