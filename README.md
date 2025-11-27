# 🏙️ NagarSaathi – Smart Municipal Grievance Management Platform

<div align="center">

![NagarSaathi](https://img.shields.io/badge/NagarSaathi-Smart%20City-blue?style=for-the-badge&logo=google-maps)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8.15-green?style=for-the-badge&logo=mongodb)

**A Smart Municipal Grievance Reporting & Management System**

</div>

## 📖 Introduction

**NagarSaathi** is a web-based platform that enables citizens to report civic issues easily.  
Admins can track issue resolution with a detailed dashboard including analytics, ward management, QR support, and report exports.

### 🎯 Project Overview

- Citizen complaint registration  
- Real-time complaint tracking  
- Ward-wise admin dashboard  
- Analytics and insights  
- QR-based complaint scanning  
- Excel export for data reporting  

## 🏗️ System Architecture

```mermaid
graph TD
    C[👥 Citizen] -->|Submit Complaints| F[⚛️ React Frontend]
    F -->|REST API| B[🟢 Node.js Backend]
    B -->|Database| D[(🗄️ MongoDB Atlas)]
    B -->|QR Generation & Scan| Q[🔳 QR Service]
    B -->|Excel Export| X[📊 Export Service]
    A[🏛️ Admin] -->|Dashboards| F
