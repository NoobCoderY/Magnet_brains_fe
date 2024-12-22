# FullStackTaskBoard

## Overview

FullStackTaskBoard is a task management application with a backend built using Node.js and Express, and a frontend built using Next.js and React.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started



### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd FullStackTaskBoardFrontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the necessary environment variables. You can use the `.env.local` file as a reference.

   ```sh
    NEXT_PUBLIC_API_URL=https://magnet-brains-be.onrender.com/api/v1
    ```

5. Start the frontend development server:

    ```sh
    npm run dev
    ```

    The frontend server will start on `http://localhost:3000`.

## Deployment

The application is deployed at the following links:

- Frontend: (https://magnet-brains-fe.vercel.app/)
- Backend: (https://magnet-brains-be.onrender.com)

## API Endpoints

### Backend

- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login a user
- `POST /api/v1/create` - Create a new task (requires authentication)
- `GET /api/v1/getalltodos` - Get all tasks (requires authentication)
- `GET /api/v1/getallcompletedtodos` - Get all completed tasks (requires authentication)
- `GET /api/v1/getallpendingtodos` - Get all pending tasks (requires authentication)
- `GET /api/v1/gettodo/:id` - Get a task by ID (requires authentication)
- `PUT /api/v1/updatetodo/:id` - Update a task by ID (requires authentication)
- `DELETE /api/v1/deletetodo/:id` - Delete a task by ID (requires authentication)
- `PUT /api/v1/updatetaskpriority/:id` - Update task priority by ID (requires authentication)

## License

This project is licensed under the MIT License.
