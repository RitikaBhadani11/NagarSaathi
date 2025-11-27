# 🏙️ NagarSaathi – Smart Municipal Grievance Management Platform

<div align="center">

![NagarSaathi](https://img.shields.io/badge/NagarSaathi-Smart%20City-blue?style=for-the-badge&logo=google-maps)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8.15-green?style=for-the-badge&logo=mongodb)

**A Smart Municipal Grievance Reporting & Management System**

[![Watch Live Demo Video](https://img.shields.io/badge/🎥_Watch_Live_Demo_Video-Click_Here-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1g1aDnnvyBX3PHfez8ACSlev84zbkJJWH/view?usp=sharing)

</div>

---

## 📖 Introduction

**NagarSaathi** is a smart municipal grievance management platform that empowers citizens to seamlessly report civic issues like garbage, drainage, potholes, and streetlight failures. With real-time status tracking, data analytics, and ward-wise dashboards, it bridges the gap between the public and local authorities—ensuring faster resolution, improved transparency, and a cleaner, more responsive city.

### 🎯 Project Overview

- Citizen complaint reporting  
- Real-time status monitoring  
- Municipality dashboards  
- Ward-level management  
- QR-based complaint access  
- Complaint report downloads (Excel)  

---

## 🏗️ System Architecture

```mermaid
graph TD
    C[👥 Citizen] -->|Submit Complaints| F[⚛️ React Frontend]
    F -->|REST API| B[🟢 Node.js Backend]
    B -->|Database| D[(🗄️ MongoDB Atlas)]
    B -->|QR Services| Q[🔳 QR Generator/Scanner]
    B -->|Excel Export| X[📊 Report Export]
    A[🏛️ Admin] -->|Dashboards & Status Updates| F

```
## 📸 Project Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Complaints Page
![Complaints Page](screenshots/complaintsPage.png)

### Main Admin Dashboard
![Main Admin Dashboard](screenshots/mainAdminDashboard.png)

### Ward Admin Dashboard
![Ward Admin Dashboard](screenshots/wardAdminDashboard.png)

### QR Functionality
![QR Functionality](screenshots/QRFunctionality.png)

### Complaints Excel Sheet
![Complaints Excel Sheet](screenshots/ComplaintsExcelSheet.png)
