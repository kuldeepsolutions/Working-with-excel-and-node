const {getAllCollections,getAllDocuments} = require("./collections");

exports.listCollections = async (req, res) => {
    try {
        const allCollections = await getAllCollections();
        const collectionName = allCollections.map((collection) => {
            return collection.name;
        });

        return res.status(200).json({
        message: "Collections fetched successfully",
        data: collectionName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.exportDataOfCollection = async (req, res) => {
    try {
        const { collectionName } = req.body;
        const allDocuments = await getAllDocuments(collectionName);
        return res.status(200).json({
        message: "Data fetched successfully",
        data: allDocuments,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};