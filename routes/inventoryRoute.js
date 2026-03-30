// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/account-validation")

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// Routes for add classification
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post("/add-classification", invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification))

// Routes for add inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post("/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData, utilities.handleErrors(invController.addInventory))

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

module.exports = router;
