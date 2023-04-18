const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require("../models/product");
const path = require("path");
const xlsx = require("xlsx");
const {
  addCategory,
  addSubCategory,
  addProduct
} = require("../global/dataChecker");

exports.fileUploader = async (req, res) => {
  var fileName = "";
  try {
    const filePath = path.join(
      __dirname,
      "../uploads/" + req.files[0].originalname
    );
    fileName = filePath;
    const readFile = await xlsx.read(filePath, { type: "file" });

    return res.status(200).json({
      message: "File Uploaded successfully",
      data: {
        fileName: fileName,
        sheets: readFile.SheetNames,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

exports.fileReader = async (req, res) => {
  try {
    const { fileName, sheetName } = req.body;
    const readFile = await xlsx.readFile(fileName, { type: "file" });
    const sheet = readFile.Sheets[sheetName];
    if (sheetName === "category" || sheetName === "Category") {
      // call category function
      const categoryData = xlsx.utils.sheet_to_json(sheet);
      const result = await addCategory(categoryData);
      return res.status(200).json({
        message: "Category Added successfully",
      });
    }
    if (
      sheetName === "subCategory" ||
      sheetName === "SubCategory" ||
      sheetName === "subcategory" ||
      sheetName === "Subcategory"
    ) {
      // call subCategory function
      const subCategoryData = xlsx.utils.sheet_to_json(sheet);
      const result = await addSubCategory(subCategoryData);
      return res.status(200).json({
        message: "SubCategory Added successfully",
      });
    }
    if (sheetName === "product" || sheetName === "Product") {
      // call product function
      const productData = xlsx.utils.sheet_to_json(sheet);
      const result = await addProduct(productData);
      return res.status(200).json({
        message: "Product Added successfully",
      });
    }
    return res.status(200).json({
      message: "No Sheet Selected",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

