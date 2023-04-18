const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require("../models/product");

const checkCategory = async (category, description) => {
  try {
    let check = await Category.findOne({ name: category });
    if (check) {
      return check._id;
    }
    const newCategory = new Category();
    newCategory.name = category;
    newCategory.description = description || "Not Available";
    await newCategory.save();
    return newCategory._id;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkSubCategory = async (subCategory, description, categoryId) => {
  try {
    let checkSubcategory = await SubCategory.findOne({
      title: subCategory,
      category: categoryId,
    });
    if (checkSubcategory) {
      return checkSubcategory._id;
    }
    const newSubCategory = new SubCategory();
    newSubCategory.title = subCategory;
    newSubCategory.description = description || "Not Available";
    newSubCategory.category = categoryId;
    await newSubCategory.save();
    return newSubCategory._id;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkProduct = async (
  product,
  description,
  categoryId,
  subCategoryId
) => {
  try {
    let checkProduct = await Product.findOne({
      name: product,
      category: categoryId,
      subCategory: subCategoryId,
    });
    if (checkProduct) {
      return checkProduct._id;
    }
    const newProduct = new Product();
    newProduct.name = product;
    newProduct.description = description;
    newProduct.category = categoryId;
    newProduct.subCategory = subCategoryId;
    await newProduct.save();
    return newProduct._id;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addCategory = async (categoryDataArr) => {
  try {
    for (let data = 0; data < categoryDataArr.length; data++) {
      let { title, description } = categoryDataArr[data];
      await checkCategory(title, description);
      console.log(data)
    }
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const addSubCategory = async (subCategoryDataArr) => {
  try {
    for (let data = 1; data < subCategoryDataArr.length; data++) {
      let { title, description, category } = subCategoryDataArr[data];
      let categoryId = await checkCategory(category);
      await checkSubCategory(title, description, categoryId);
    }
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const addProduct = async (productDataArr) => {
  try {
    console.log(productDataArr.length)
    for (let data = 0; data < productDataArr.length; data++) {
      console.log(data)
      let {
        name,
        description,
        category,
        subCategory,
        price,
        quantity,
      } = productDataArr[data];
      let categoryId = await checkCategory(category);
      let subCategoryId = await checkSubCategory(subCategory, categoryId);
      await checkProduct(
        name,
        description,
        categoryId,
        subCategoryId,
        price,
        quantity
      );
      
    
      
    }
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkCategory,
  checkSubCategory,
  checkProduct,
  addCategory,
  addSubCategory,
  addProduct,
};
