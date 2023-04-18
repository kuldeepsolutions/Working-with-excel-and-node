const SubCategory = require("../models/subCategory");
const Category = require("../models/category");

exports.createSubCategory = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let subCategory = await SubCategory.findOne({ title });
    if (subCategory) {
      return res.status(400).json({ message: "SubCategory already exists" });
    }
    subCategory = new SubCategory();
    subCategory.title = title;
    subCategory.description = description;
    subCategory.category = category;
   

    await subCategory.save();
    return res
      .status(200)
      .json({ message: "SubCategory created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
