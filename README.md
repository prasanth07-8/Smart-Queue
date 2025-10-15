 Smart Queueing System

In many rural hospitals and clinics, patients still wait in long queues to get their token or meet a doctor.
Due to limited staff and no digital tracking, both patients and doctors lose valuable time.

The Smart Queueing System aims to digitize and automate this process — helping hospitals manage patients efficiently and giving rural people access to faster healthcare service without standing in line for hours.

Project Overview

The Smart Queueing System is a web-based healthcare management platform designed for hospitals and clinics in rural and semi-urban areas.

It allows:

🧑Admins/Doctors to manage patient tokens, upload medical documents, and handle patient flow.

👩‍💻Patients to register, get their token number online, track queue position, and download their medical records anytime.

Key Features
👨‍⚕️ For Doctors / Admin

Add, manage, and delete patient tokens manually.

View active and completed queues in real-time.

Upload medical certificates, prescriptions, and tablet information for each patient.

Automatically notify patients when their token time is near.

Mark tokens as Attended, Missed, or Expired.

View queue analytics and manage departments (e.g., General, Dental, ENT).

For Patients

Register online and get an instant token number.

View live queue updates and estimated waiting time.

Get alert notifications (e.g., 10 minutes before their token).

Access their Medical History in their profile — including:

 Doctor-issued Medical Certificates

 Tablet/Prescription Information

Download all medical documents (PDF format) anytime from their dashboard.

⚙️ Core System Features

Secure login with user roles (Admin / Patient).

MongoDB integration for real-time data storage.

RESTful APIs using Node.js & Express.js.

Responsive React frontend with context-based authentication.

Automated token cleanup after expiry.

Integrated file upload and download system (for certificates & prescriptions).

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Axios, CSS3
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ORM)
File Uploads	Multer / GridFS
Security	Bcrypt.js for password hashing
Notifications	Twilio API / Email Alerts (optional)
Hosting (Future)	AWS EC2 / Vercel / Render
🩺 New Feature: Medical Certificate & Tablet Info
📤 For Doctors

After attending a patient, the doctor can upload a PDF or image file containing:

Medical certificate or diagnosis report

Prescribed tablets, dosage, and duration

📥 For Patients

When they log in, they can go to their Profile → Medical History.

All uploaded files appear as downloadable links with:

Date

Doctor’s name

Token number

The patient can click Download to save their certificate or prescription locally.

📊 System Flow

Registration:
Patients register and receive a token.

Queue Management (Admin Side):
Admin manages tokens, marks patients attended or missed.

Document Upload:
Doctor uploads medical certificates and prescription files for attended patients.

Medical History Access:
Patients can log in later and download their uploaded certificates and tablet details.

Real-Time Notifications:
SMS or email alerts notify the patient before their turn and after upload of documents.