const exportData = require('../global/exportData');
const router = require("express").Router();

router.get("/list-collections", exportData.listCollections);
router.post("/export-data", exportData.exportDataOfCollection);

module.exports = router;