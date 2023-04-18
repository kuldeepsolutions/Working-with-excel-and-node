const Category = require("../models/category");
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    let category = await Category.findOne({ title });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    category = await new Category();
    category.name = name;
    category.description = description;
    await category.save();
    return res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
