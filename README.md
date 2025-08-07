# Finance Tracker Web App (Initial Single-User Version)
## Overview
This is the initial version of a full-stack financial tracker web application. It allows a single user to track their transactions and goals and view a dashboard with insights. This project was built to demonstrate proficiency in a traditional full-stack environment using React for the frontend and a Spring Boot REST API for the backend.

### Project Narrative: The Pivot
This version of the application was intentionally designed with a single, locally hosted database. The goal was to build a robust, user-centric backend that could be the foundation for a scalable product.

However, a key limitation of this architecture is that it is not designed for multi-user deployment. Every user's data is stored in the same database, and the backend is not hosted on a public server. This highlights a crucial technical decision point: for a live application, the backend would need to be re-architected to a more scalable solution.

This repository serves as a showcase of the initial development and the architectural considerations that led to a more scalable solution, which can be found here.

## Technologies Used
### Frontend
React: The core JavaScript library for building the user interface.

React Router: For handling navigation between different pages of the application.

Bootstrap with React-Bootstrap: For a clean, responsive, and professional UI layout.

Axios: For making API calls to the Spring Boot backend.

Recharts: For generating interactive data visualizations (bar and pie charts).

CSS: Custom styling for a cohesive design and visual flair.

### Backend
Spring Boot: The Java framework used to build the RESTful API.

Spring Data JPA: For simplified database access and ORM.

PostgreSQL: The relational database used to store all the application data.

## Video Demo
A video demo of this application's functionality can be viewed here:

[]

## How to Run Locally
To run this application, you need to have both the frontend and backend running.

1. Run the Spring Boot Backend

Navigate to your Spring Boot project's root directory in your terminal.

Ensure you have PostgreSQL running and configured with the correct credentials.

Run the following command:

```bash
mvn spring-boot:run
```

2. Run the React Frontend

In a separate terminal, navigate to the finance-tracker-frontend directory.

Install the dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173.
