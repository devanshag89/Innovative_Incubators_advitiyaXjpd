# **Innovative_Incubators_advitiyaXjpd**  
## **Talent Module for JPD Hub**  

---

## 📖 **Overview**  

This project is designed to develop a Talent Module for the JPD Hub platform, enabling talents to register and showcase their skills, with admin approval ensuring quality control. Clients can browse profiles and send hire requests via a seamless and scalable system. The solution includes real-time notifications and user-friendly interfaces for all users.  

---

## 🛠️ **Features**  

### 1. **Talent Registration & Admin Approval**  
**Talent Registration Form:**  
- Name  
- Contact Information (Email/Phone)  
- Skills and Expertise  
- Personal Description  
- Profile Photo Upload  

**Admin Review System:**  
- Profiles remain hidden from clients until approved by an admin.  
- Admin receives real-time notifications via email or WhatsApp for new registrations.  
- Admin can approve/reject profiles via an intuitive dashboard.  

---

### 2. **Talent Profile Dashboard**  
- Display only approved profiles to clients.  
- Profile details include:  
  - Profile Photo  
  - Name  
  - Skills and Expertise  
  - Brief Personal Description  
- User-friendly interface with search and filter options.  

---

### 3. **Client Dashboard**  
- Clients can browse talent profiles without registration.  
- To send a hire request, clients must register or log in.  
**Hire Request Form:**  
  - Client Information  
  - Selected Talent  
- Admin is notified of hire requests via WhatsApp.  

---

### 4. **Admin Notifications**  
- Real-time WhatsApp API integration for notifications:  
  - New talent registrations.  
  - Hire requests from clients.  
- Notifications include all relevant details for efficient action.  

---

## 🚀 **Getting Started**  

### **1. Prerequisites**  
- **Backend:** Node.js, Express.js  
- **Frontend:** React.js  
- **Database:** MongoDB  
- **Notifications:** Twilio or WhatsApp Business API for notifications  

---

### **2. Installation**  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-repo/talent-module.git  
   cd talent-module  

2. **Install dependencies:**  
   ```bash
   npm install
   
3. **Set up environment variables in a .env file**
   ```bash
  PORT=4000
  MONGO_URI=mongodb://localhost:27017/talentsphere
  CLOUDINARY_CLOUD_NAME=dhicut2yg
  CLOUDINARY_API_KEY=481536193739991
  CLOUDINARY_API_SECRET=_s3l6zPUe46eLZocypXSkopJN6g

## **3. Running the Application**

1. **Development Mode:**
   ```bash
   npm run dev

2. **Production Mode:**
  ```bash
   npm start


## 📋 **Usage** 

1. **Talent Registration**
* Access the registration page and fill out the form with the required details.
* Wait for admin approval before the profile becomes visible to clients.

2. **Admin Dashboard**
* Admins can log in to view and manage talent registrations.
* Approve/reject profiles and respond to hire requests from clients.
  
3. **Client Interaction**
* Clients can view approved profiles and send hire requests after logging in.
* Notifications are sent to the admin for further action.


## 🛡️ **Security and Scalability**

* All sensitive data is encrypted and stored securely.
* Designed with scalability in mind to handle a growing user base and additional features in the future.


























  

  
