import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    title: String, 
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);


const Post = mongoose.model("Post", postSchema);

export default Post;