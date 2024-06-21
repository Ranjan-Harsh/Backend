

## Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Ranjan-Harsh/Backend.git
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Server
```bash
npm start
```

### 5. Backend Endpoints
- `GET /ping` - Returns `true` to check if the server is running.
- `POST /submit` - Accepts a submission with the fields `name`, `email`, `phone`, `github_link`, and `stopwatch_time`.
- `GET /read` - Returns all submissions if no index is provided. If an index is provided (`/read?index=0`), returns the specific submission.

