const mongoose = require("mongoose");
const { populate } = require("../models/category");
const ObjectId = mongoose.Types.ObjectId;
// get all collections from database
exports.getAllCollections = async () => {
  try {
    console.log("I am here");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    return collections;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// get all documents from a collection
exports.getAllDocuments = async (collectionName) => {
  try {
    const collection = await mongoose.connection.db.collection(collectionName);

    const documents = await collection
      .find(
        {},
        {
          projection: {
            _id: 0,
            __v: 0,

          },
          _id: 0,
          __v: 0,
        },
        {
          sort: {
            _id: -1,
          },
        }
      ).toArray();

      // console.log(documents);
   console.log("==================================================================================================")
    for (const [key, value] of Object.entries(documents[0])) {
      if (value instanceof ObjectId) {
        console.log(key, value);
        data = await collection.find(
          {},
          {
            projection: {
              _id: 0,
              __v: 0,
             
            },
            _id: 0,
            __v: 0,
          },
          {
            sort: {
              _id: -1,
            },
          },
        )
      }
    }
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
