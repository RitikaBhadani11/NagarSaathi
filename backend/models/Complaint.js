const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a complaint title"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  ward: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, "Please provide a complaint description"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
    enum: ["Garbage", "Potholes", "Drainage", "Streetlights", "Public Nuisance", "Water Supply", "Sewage", "Other"],
  },
  location: {
    type: String,
    required: [true, "Please provide location"],
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // Remove required: true for public complaints
  },
  
  // ✅ ADD THESE FIELDS FOR PUBLIC COMPLAINTS
  isPublic: {
    type: Boolean,
    default: false
  },
  submittedBy: {
    type: String, // Store name for public submissions
    default: ""
  },
  publicEmail: {
    type: String, // Optional: store email for public submissions
    default: ""
  },
  publicPhone: {
    type: String, // Optional: store phone for public submissions
    default: ""
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
  },
})

module.exports = mongoose.model("Complaint", complaintSchema)