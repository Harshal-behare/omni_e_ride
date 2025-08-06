# Project: Omni E-Ride

## Project Overview

This project is a comprehensive web application for "Omni E-Ride," an electric vehicle company. It's built with Next.js 15 (using the App Router), TypeScript, and styled with Tailwind CSS. The application serves as a public-facing website, a CRM, and an e-commerce platform with multi-role dashboards for administrators, dealers, and customers. The backend is powered by Next.js API routes, with authentication likely handled by Supabase (given the presence of Supabase client libraries). The database schema suggests a robust system for managing users, products (models), dealers, orders, and more.

## Building and Running

This project uses `pnpm` as the package manager. To get the project running locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the Development Server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    pnpm build
    ```

4.  **Start the Production Server:**
    ```bash
    pnpm start
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling, with UI components from `shadcn/ui`. Custom styles are defined in `app/globals.css`.
*   **Components:** Reusable components are located in the `components` directory.
*   **Data Fetching:** Custom hooks in the `hooks` directory are used for data fetching, likely interacting with a Supabase backend.
*   **Authentication:** Authentication is managed through Supabase, with middleware configured in `middleware.ts` to handle sessions.
*   **Linting and Formatting:** The project is set up with ESLint for linting and likely Prettier for formatting (though not explicitly configured in `package.json` scripts, it's mentioned in the `README.md`).
