# 🏙 NagarSaathi – Smart Municipal Grievance Management Platform

<div align="center">

![NagarSaathi](https://img.shields.io/badge/NagarSaathi-Smart%20City-blue?style=for-the-badge&logo=google-maps)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8.15-green?style=for-the-badge&logo=mongodb)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-green?style=for-the-badge&logo=leaflet)

*A Smart Municipal Grievance Reporting & Management System*

[![Watch Live Demo Video](https://img.shields.io/badge/🎥_Watch_Live_Demo_Video-Click_Here-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1g1aDnnvyBX3PHfez8ACSlev84zbkJJWH/view?usp=sharing)

</div>

---

## 📖 Introduction

**NagarSaathi** (नगरसाथी - "City Companion") is a digital platform that enables citizens to report municipal issues easily while local authorities track and resolve complaints through dashboards and analytics. It bridges the communication gap between citizens and municipal corporations for faster grievance resolution.

### 🎯 Core Objectives
- **Empower Citizens**: Easy-to-use platform for reporting civic issues
- **Increase Transparency**: Real-time tracking of complaint status
- **Improve Efficiency**: Streamlined workflow for municipal authorities
- **Data-Driven Decisions**: Analytics for better urban management
- **Accountability**: QR-based tracking and reference system
- **Geospatial Intelligence**: Map-based visualization for better insights

---

## 🏗 System Architecture

```mermaid
graph TD
    C[👥 Citizen] -->|Submit Complaints| F[⚛ React Frontend]
    F -->|REST API| B[🟢 Node.js Backend]
    B -->|Database Operations| D[(🗄 MongoDB Atlas)]
    B -->|QR Generation| Q[🔳 QR Services]
    B -->|Report Generation| X[📊 Excel Export]
    B -->|Map Data & Geocoding| M[🗺 Leaflet Maps API]
    A[🏛 Admin] -->|Manage Complaints| F
    F -->|Interactive Maps| M
    M -->|Tile Server| T[🌍 OpenStreetMap]
    M -->|Geolocation| G[📍 Browser Geolocation]
    
    subgraph "Mapping Features"
        M1[📍 Location Picker]
        M2[🗺️ Complaint Visualization]
        M3[🔥 Heat Maps]
        M4[📌 Marker Clustering]
        M5[🏘️ Ward Boundaries]
    end
    
    F --> M1
    F --> M2
    F --> M3
    F --> M4
    F --> M5
    
    style M fill:#7ac943
    style F fill:#61dafb
    style B fill:#68a063
