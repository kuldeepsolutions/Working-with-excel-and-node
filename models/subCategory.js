const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);