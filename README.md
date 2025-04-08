# Hooper

A full-stack web application built with React, Express, and PostgreSQL.

## Prerequisites

- Node.js (v16+)

## Setup

2. Install dependencies
   ```bash
   npm install
   ```
NOTE: THE PACKAGE.JSON MAY BE MISSING SOME DEPENDCIES. 
IF YOU ENCOUNTER ERRORS INSTALL DEPENDENCIES SUCH AS REACT-HELMET ON AN AD-HOC BASIS WITH: npm install package-name 


## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

This will run the application at http://localhost:5000 with hot reload enabled.


## Project Structure

- `/client` - React frontend code
  - `/src` - Source code for the frontend
- `/server` - Express backend code
- `/shared` - Shared code between frontend and backend
- `/components` - UI components
- `/migrations` - Database migration files
