# Echo-Pay

Echo-Pay is a full-stack digital wallet application that allows users to manage their funds, perform peer-to-peer (P2P) transfers, and view a detailed history of their transactions. This project simulates essential features of a modern payment system, now as a streamlined single-app architecture using MongoDB.

## Core Features

- **User Authentication:** Secure sign-up and sign-in using phone number and password (NextAuth.js).
- **Add Funds:** Users can add money to their wallet with instant balance updates (demo mode, no external dependencies).
- **P2P Transfers:** Quickly send money to other registered users on the platform; database transactions provide data integrity.
- **Transaction History:** View a categorized list of all transactions (money added, sent, and received).
- **Account Dashboard:** A central dashboard provides an overview of account details, current balance, and navigation to all wallet features.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ORM/ODM:** Mongoose
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js

## Project Architecture

The current codebase follows a **single-app** architecture:

- **apps/echo-pay:** The main (and only) Next.js application containing all user-facing logic, authentication, and wallet functionalities.
- *No separate bank webhook server; all logic is managed within this one app.*

## Getting Started

Get the project running locally by following these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v10 or later)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local instance or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1. **Clone the repository:**
    ```
    git clone https://github.com/Kp-Singh09/echo-pay.git
    cd echo-pay
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Configure Environment Variables:**

   - Copy `.env.example` to `.env` in the root directory.
   - Set your MongoDB connection string:
     ```
     # .env
     MONGODB_URI="mongodb://localhost:27017/echopay"
     JWT_SECRET=a_secure_random_string_for_production
     NEXTAUTH_URL=http://localhost:3000
     ```

4. **Startup the local MongoDB server (if not using Atlas):**
    - Make sure MongoDB is running locally, e.g., via `mongod`.

5. **Run the Development Server:**
    ```
    npm run dev
    ```
    - The app will be running at [http://localhost:3000](http://localhost:3000).

### Usage

1. Open your browser and visit `http://localhost:3000`.
2. Click "Sign In" and register with your phone number and password, or use seeded test users (if implemented).
3. After authenticated login, you'll be redirected to the account dashboard.
4. Use the "Add Funds" tab to top up your wallet, or the "P2P Transfer" tab to send money to other users.
5. View your transaction history under the "Transactions" section.

## Notes

- All backend and wallet logic is now consolidated in a single Next.js app for simplicity.
- The database has changed from PostgreSQL/Prisma to **MongoDB + Mongoose** for data storage.
- The legacy bank-webhook and monorepo structure have been removed.

