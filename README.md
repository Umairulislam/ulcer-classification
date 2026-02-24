# 🧠 Ulcer Classification System

A modern frontend application for classifying ulcer images. The system consists of two main panels: **Admin** and **Doctor**. Admins manage users and patients, while doctors classify ulcer images and generate reports. Built with **Next.js**, **Material UI**, **Redux Toolkit**, and **Recharts**.

---

## 🎥 Demo

![Demo](/src/assets/images/gif.gif)

---

## 🏢 Project Highlights

### 📄 Admin Panel

- 📊 Access to a statistics dashboard with recent activity.
- 📅 Manage doctors (create, update, delete, activate/deactivate).
- 📅 Manage patients (create, update, delete).
- 🔄 Filter doctors by status (Active, Inactive, All).
- 🔄 Filter patients by doctor using a dropdown.
- 🔑 Update own profile and password.

### 💼 Doctor Panel

- 📊 Dashboard with latest statistics.
- 📄 View and classify patients.
- 📷 Upload ulcer images and auto-generate detailed reports.
- 🔹 Download and view classification reports.
- 🔑 Update personal profile and password.

---

## 💡 Features

- 📧 Password reset with OTP (for both admin and doctor).
- 💻 Fully responsive design.
- 🎉 Rich user experience using **MUI Toasts**.
- 🔢 Real-time form validations with **Yup**.
- 🧰 Central state management using **Redux Toolkit**.
- 🔐 Role-based route protection using middleware.
- 🔢 Pagination support in tables for better navigation.

---

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)  
![Material UI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)  
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)  
![Yup](https://img.shields.io/badge/Yup-29B6F6?style=for-the-badge&logo=javascript&logoColor=white)  
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)  
![Recharts](https://img.shields.io/badge/Recharts-FC4445?style=for-the-badge&logo=chart.js&logoColor=white)

---

## 👨‍💼 Author

Crafted with care by **Engr. Umair Ul Islam** ✨

```bash
eslint.config.mjs
jsconfig.json
next.config.mjs
package.json
postcss.config.mjs
README.md
tailwind.config.mjs
public/
src/
  middleware.js
  app/
    globals.css
    layout.js
    page.js
    (auth)/
      forget-password/
        page.jsx
      login/
        page.jsx
      reset-password/
        page.jsx
    (dashboard)/
      layout.js
      admin/
        dashboard/
          page.jsx
        doctors/
          page.jsx
          create/
            page.jsx
          update/
            [id]/
              page.jsx
        patients/
          page.jsx
          create/
            page.jsx
          update/
            [id]/
              page.jsx
        profile/
          [id]/
            update-password/
              page.jsx
            update-profile/
              page.jsx
      doctor/
        classification/
          page.jsx
        dashboard/
          page.jsx
        patients/
          page.jsx
          classify/
            [id]/
              page.jsx
        profile/
          [id]/
            update-password/
              page.jsx
            update-profile/
              page.jsx
  assets/
    icons/
      index.js
    images/
      index.js
  components/
    AlertDialog.jsx
    CustomButton.jsx
    DashboardCard.jsx
    index.js
    Loader.jsx
    NoRecordsFound.jsx
    StatusChip.jsx
    Toast.jsx
  helpers/
    apiManager.js
    clientCookis.js
    cookie.js
  hoc/
    AppProvider.js
  layouts/
    Header.jsx
    index.js
    Sidenav.jsx
  schemas/
    classificationSchema.js
    doctorSchema.js
    index.js
    loginSchema.js
    patientSchema.js
    resetSchema.js
    updatePassSchema.js
    updateProfileSchema.js
  store/
    store.js
    toastSlice.js
    userSlice.js
  styles/
    theme.js
  utils/
    utils.js
```
