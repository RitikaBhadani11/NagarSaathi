const express = require("express");
const { check } = require("express-validator");
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintsByWard,
  updateComplaintStatus,
  deleteComplaint,
  createPublicComplaint,
  uploadImage,
} = require("../controllers/complaintController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public complaint route
router.post(
  "/public",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("ward", "Ward number is required").not().isEmpty(),
  ],
  createPublicComplaint
);

// Authenticated complaint routes
router.post(
  "/",
  protect,
  uploadImage,
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
  ],
  createComplaint
);

router.get("/my", protect, getMyComplaints);
router.get("/", protect, authorize("admin"), getAllComplaints);
router.put("/:id", protect, authorize("admin", "wardAdmin"), updateComplaintStatus);
router.delete("/:id", protect, deleteComplaint);
router.get("/ward/:wardNumber", protect, getComplaintsByWard);

module.exports = router;