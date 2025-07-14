# Echo-Pay 

Echo-Pay is a full-stack digital wallet application built as a monorepo using Turborepo. It enables users to manage their funds, perform peer-to-peer (P2P) transfers, and view a detailed history of their transactions. The project simulates a real-world payment system with a user-facing application and a mock bank webhook service.

## Core Features

*   **User Authentication**: Secure sign-up and sign-in using phone number and password with NextAuth.js.
*   **Add Funds**: Users can add money to their wallet via simulated bank transfers. A "Demo Bank" option is available for instant balance updates without external redirects.
*   **P2P Transfers**: Seamlessly send money to other registered users on the platform. The system uses database transactions to ensure data integrity.
*   **Transaction History**: A comprehensive view of all transactions, categorized into money added, money sent, and money received.
*   **Account Dashboard**: A central dashboard displaying user account details, current balance, and navigation to all features.

## Tech Stack

*   **Framework**: Next.js
*   **Language**: TypeScript
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Styling**: Tailwind CSS
*   **Authentication**: NextAuth.js
*   **Monorepo Manager**: Turborepo
*   **Backend (Webhook)**: Express.js

## Project Architecture

This project is a monorepo managed by Turborepo, containing several independent apps and packages:

*   **`apps/user-app`**: The main user-facing Next.js application. It includes the dashboard, authentication, and all wallet functionalities.
*   **`apps/bank-webhook`**: An Express server that simulates webhook notifications from banks to process "add money" transactions.
*   **`packages/db`**: Contains the Prisma schema, migrations, database client, and seeding scripts.
*   **`packages/ui`**: A shared library of React components used across the `user-app`.
*   **`packages/eslint-config`** & **`packages/typescript-config`**: Shared configurations for linting and TypeScript to ensure code consistency.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

*   Node.js (v18 or later)
*   npm (v10 or later)
*   Docker (for running PostgreSQL)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kp-Singh09/Echo-Pay.git
    cd Echo-Pay
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**

    Run a PostgreSQL instance using Docker.
    ```bash
    docker run --name echo-pay-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
    ```

4.  **Configure Environment Variables:**

    There are two `.env.example` files that need to be copied and configured.

    *   In `packages/db/`, copy `.env.example` to `.env` and ensure the `DATABASE_URL` matches your PostgreSQL instance.
        ```
        # packages/db/.env
        DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
        ```

    *   In `apps/user-app/`, copy `.env.example` to `.env`.
        ```
        # apps/user-app/.env
        JWT_SECRET=a_secure_random_string_for_production
        NEXTAUTH_URL=http://localhost:3001
        ```

5.  **Run Database Migrations and Seeding:**

    Navigate to the database package and run the following commands to set up the schema and populate it with initial test data.
    ```bash
    cd packages/db
    npx prisma migrate dev
    npx prisma db seed
    cd ../..
    ```
    The seed script creates two users:
    *   Phone: `1111111111`, Password: `alice`
    *   Phone: `2222222222`, Password: `bob`

6.  **Run the Development Server:**

    From the root of the project, run the development command. Turborepo will start both the `user-app` and the `bank-webhook` server.
    ```bash
    npm run dev
    ```
    *   The user application will be available at `http://localhost:3001`.
    *   The bank webhook server will be running on `http://localhost:3004`.

### Usage

1.  Open your browser and navigate to `http://localhost:3001`.
2.  Click "Sign In" and use the credentials of the seeded user:
    *   **Phone Number**: `1111111111`
    *   **Password**: `alice`
3.  You will be redirected to the "Account-Info" page where you can see your balance and account details.
4.  Navigate to the "Transfer" tab to add money to your wallet. Use the "Demo Bank" for an instant update.
5.  Go to the "P2P Transfer" tab to send money to the other seeded user (`2222222222`).
6.  Check the "Transactions" tab to see a history of your activity.
