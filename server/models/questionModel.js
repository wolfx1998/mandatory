import mongoose from "mongoose";

const Schema = mongoose.Schema;
const questionModel = new Schema({
  slug: { type: String },
  title: { type: String },
  answers: [
    {
      slug: { type: String },
      title: { type: String },
      voteNumber: { type: Number }
    }
  ],
  solved: { type: Boolean }
});
export default mongoose.model("questions", questionModel);
