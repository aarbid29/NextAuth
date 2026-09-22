# NextAuth

A full-stack user authentication system built with **Next.js 14**, **MongoDB**, and **JWT** — featuring signup, login, logout, and email verification.

## About

NextAuth is a Next.js application that implements a complete authentication flow from scratch. Users can sign up, log in, and verify their email address via a verification link. Passwords are hashed before being stored, and sessions are managed using JSON Web Tokens. It's built with the Next.js App Router, TypeScript, and Tailwind CSS for styling.

## Tech Stack

- **[Next.js 14](https://nextjs.org)** — App Router, React framework
- **TypeScript**
- **Tailwind CSS** — styling
- **MongoDB** + **Mongoose** — database and object modeling
- **bcryptjs** — password hashing
- **jsonwebtoken** — authentication tokens
- **Nodemailer** — sending verification emails (configured for Mailtrap in development)
- **Axios** — HTTP requests

## Features

- User signup with hashed passwords
- Login with JWT-based session tokens
- Logout
- Email verification flow
- MongoDB-backed user storage

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB instance (local or hosted, e.g. MongoDB Atlas)
- A Mailtrap account (or another SMTP provider) for sending verification emails in development

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aarbid29/NextAuth.git
   cd NextProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret
   domain=http://localhost:3000
   MAILTRAP_USER=your_mailtrap_user
   MAILTRAP_PASSWORD=your_mailtrap_password
   ```

   > ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the app for production
- `npm start` — start the production server
- `npm run lint` — run ESLint

## Project Structure

The project follows the standard Next.js App Router structure, with authentication logic (models, API routes, and helper functions) organized under `src/`.

