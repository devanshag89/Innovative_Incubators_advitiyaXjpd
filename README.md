# **Innovative Incubators 💡 Advitiya x JPD Hub**  
## **Talent Module for JPD Hub : ShowcaseX**  

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
- Admin receives real-time notifications via email for new registrations.  
- Admin can approve/reject profiles via an intuitive dashboard.  

---

### 2. **Talent Profile Dashboard**  
- Only the approved talents can access their dashboard.  
- Profile details include:  
  - Profile Photo  
  - Name  
  - Skills and Expertise  
  - Brief Personal Description  
- It includes a section to add their post, videos aur certifications to showcase their talents.
- It also includes a section to see hire requests.

---

### 3. **Client Dashboard**  
- Clients can browse approved talent profiles without registration.  
- To send a hire request, clients must register or log in.  
**Hire Request Form:**  
  - Client Information  
  - Selected Talent  
- Admin is notified of hire requests.  

---

### 4. **Admin Notifications**  
- Real-time email integration for notifications:
  - Otp varification for registered email by client or talents.
  - New talent registrations.  
  - Hire requests from clients.  
- Notifications include all relevant details for efficient action.  

---


## 🚀 **Getting Started**  

### **1. Prerequisites**  

**MERN Technology Stack with Tailwind CSS** 🌐
This project leverages the MERN stack (MongoDB, Express.js, React.js, Node.js) combined with Tailwind CSS, providing a robust, modern, and scalable solution for web development.

*Frontend:*

* React.js: Build interactive and dynamic user interfaces.
* Vite: Superfast build tool for optimized performance.
* Tailwind CSS: Utility-first CSS framework for custom, responsive designs.
* Framer Motion: Add animations and transitions for a smooth user experience.
* React Router: Simplify routing and navigation across pages.
* Axios: Manage API requests effortlessly.
* Chart.js & react-chartjs-2: Create stunning and interactive data visualizations.
* React Icons: Access a comprehensive library of icons.
* React Scroll & Intersection Observer: Implement scrolling effects and lazy loading for an immersive UI.
  
*Backend:*

* Node.js: Efficient server-side runtime for scalable applications.
* Express.js: Lightweight framework for building robust APIs.
* MongoDB with Mongoose: Schema-based NoSQL database for data management.
* JWT (JSON Web Tokens): Ensure secure, stateless authentication.
* Nodemailer: Enable email notifications and alerts.
* Multer & Cloudinary: Manage file uploads and integrate cloud storage.
* Validator: Secure the app with robust input validation.
  
*Development Tools:*

* Nodemon: Automatic server restarts for efficient development.
* PostCSS & Autoprefixer: Ensure CSS compatibility across all browsers.

### **2. File Structure**

*Frontend*
The frontend folder contains the client-side application built using React.js.

* public/: Stores static files, including index.html, which serves as the entry point for the React app.
* src/: Contains the source code for the React application.
* Admin/: Holds components and pages related to the admin panel.
* Client/: Contains components and pages for client-side user functionality.
* contexts/: Includes React Context files for managing global state.
* Home/: Contains the main homepage components and related files.
* Talent/: Stores files and components related to talent management.
* App.jsx: The root component rendering browser routes and views.
* main.jsx: Entry point for the React app that renders App.jsx.
* index.css: Global CSS file for styling.
* package.json: Lists dependencies and scripts for the frontend.
* .gitignore: Specifies files to ignore in version control.

*Backend*
The backend folder contains the server-side logic and API implementation.

* AuthMiddlewares/: Contains middleware functions for authentication and authorization.
* config/: Holds configuration files, such as database connection URIs and environment variables.
* controllers/: Includes callback functions used by routes for handling requests and responses.
* models/: Contains data models and schemas for MongoDB using Mongoose.
* routes/: Defines HTTP paths and associates them with corresponding controller functions.
* utils/: Utility files or helper functions for reusable logic.
* index.js: Entry point for the server. Initializes the application and sets up routing.
* package.json: Specifies backend dependencies and scripts for server operation.
* .env: Contains sensitive environment variables.
* .gitignore: Defines files and folders to exclude from version control.


###  **3. Installation**  

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-repo/talent-module.git  
   cd talent-module  

2. **Install dependencies:**  
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
   
3. **Set up environment variables in a .env file**
   ```bash
   PORT=4000
   CLOUDINARY_CLOUD_NAME=dhicut2yg
   CLOUDINARY_API_KEY=481536193739991
   CLOUDINARY_API_SECRET=_s3l6zPUe46eLZocypXSkopJN6g
   JWT_SECRET=4e35bcd0af5d1cfeba67859a7c73e3206c88e21759251df4fa7b998f1ec9bde67c2347b90a36f325882758df17986b32
   EMAIL=akshayyadav5862@gmail.com
   EMAIL_PASSWORD=rtze ulnb gzzm psxo
   ADMIN_PHONE_NUMBER=6394330610
   ADMIN_EMAIL=suppports2345@gmail.com
   MONGO_URI=mongodb://localhost:27017/talentsphere
   ```

---


4. **Start the Development Servers**
    ```bash
    cd frontend
    npm run dev
    cd ../backend
    npm start
    ```


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


##  📸**Glimpse of our website**
![image](https://github.com/user-attachments/assets/d093ad8e-98a7-4815-aacb-db2c656f75ae)
![image](https://github.com/user-attachments/assets/d67c76c6-8e9b-47bf-904c-511e2daddbf7)
![image](https://github.com/user-attachments/assets/1a5127da-0d21-41e2-a9a2-eb49b814ef57)



     
    
    




    



## 🛡️ **Security and Scalability**

* All sensitive data is encrypted and stored securely.
* Designed with scalability in mind to handle a growing user base and additional features in the future.

## 🔁 **Work Flow Diagram**

 ![image](https://github.com/user-attachments/assets/cfe6d2fc-0ff0-4a33-b075-a72b25fe0810)

 ## **Future Scope**
 * In-App Chat and Notifications
   Enable real-time messaging between talents and clients for smoother communication.

 * Advanced Talent Recommendations
   Implement a recommendation engine to suggest relevant talents to clients based on their preferences and previous searches.

 * Ratings and Reviews
   Enable clients to leave reviews and rate talents after a hiring session.
   Ratings are visible on the talent's profile to enhance credibility.




























  

  
