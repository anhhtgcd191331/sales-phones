import mongoose from "mongoose";

const Message = mongoose.Schema(
  {
    idConversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
    },
    sender: {
      type: String,
      ref: "user",
    },
    message: {
      type: String,
    },
    createAt: {
      type: Number,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", Message);
