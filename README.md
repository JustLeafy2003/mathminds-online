Certainly! Here's the integrated README.md with the additional instructions for handling the `nest-api` submodule:

```markdown
# Mathminds Online

## Project Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- Database system installed (MySQL).

### Getting Started
1. Clone the repository: `git clone https://github.com/JustLeafy2003/mathminds-online.git`
2. Navigate to the project directory: `cd mathminds-online`

### Submodule Initialization
```bash
# Initialize and update the submodule
git submodule init
git submodule update
```

### Installation
```bash
# Install dependencies
npm install
```

### Configuration
1. Copy the `.env.example` file to `.env`.
2. Configure environment variables in the `.env` file, including database connection details.

## API Endpoints and Usage

### Authentication
- **Register User:** `POST /api/register`
  - Parameters: `username`, `password`
  - Returns: Newly registered user details

- **Login User:** `POST /api/login`
  - Parameters: `username`, `password`
  - Returns: Authentication token

### Math Game API
- **Get Singleplayer Questions:** `GET /api/questions/singleplayer`
  - Returns: Array of questions for singleplayer mode.

- **Get Multiplayer Questions:** `GET /api/questions/multiplayer`
  - Returns: Array of questions for multiplayer mode.

- **Submit Singleplayer Score:** `POST /api/scores/singleplayer`
  - Parameters: `userId`, `score`
  - Returns: Updated user details.

- **Submit Multiplayer Score:** `POST /api/scores/multiplayer`
  - Parameters: `userId`, `opponentId`, `winnerId`
  - Returns: Updated user details.

## Database Schema Description

### Users Collection
- **Fields:**
  - `username` (String)
  - `password` (String)
  - `bio` (String)
  - `wins` (Number)
  - `losses` (Number)
  - `isAdmin` (Boolean)

### Questions Collection
- **Fields:**
  - `question` (String)
  - `answer` (String)

### Scores Collection
- **Fields:**
  - `userId` (ObjectId)
  - `opponentId` (ObjectId)
  - `winnerId` (ObjectId)
  - `score` (Number)

## Third-Party Libraries or Tools Used
- React (Frontend)
- Node.js (Backend)
- Express (Backend Framework)
- MySQL (Database)
- Redux (State Management)
- React Router (Routing)
- Axios (HTTP Requests)
- React Toastify (Toast Notifications)
- TensorFlow Blazeface (Face Recognition)

## Nest.js API Setup
```bash
# Navigate to the nest-api directory
cd nest-api
# Install Nest.js API dependencies
npm install
```

### Running the Nest.js API
```bash
# Start the Nest.js API
npm run start
```

## How to Run and Test the Application

### Running the Application
```bash
# Start the server
npm start
# Navigate to the frontend directory
cd client
# Start the frontend
npm start
```

### Testing
```bash
# Run backend tests
npm test
# Navigate to the frontend directory
cd client
# Run frontend tests
npm test
```
