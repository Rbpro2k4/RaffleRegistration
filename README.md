# Raffle Registration

This project is a full-stack raffle registration system using React (frontend), Netlify Functions (backend), and MongoDB Atlas (database).

## Features

- Users can register for a raffle by submitting a code, name, email, and phone number.
- Codes are validated against a MongoDB collection (`codes`).
- Successful registrations are stored in the `registrations` collection.
- Used codes are moved to a `used_codes` collection to prevent reuse.
- Frontend and backend are deployed with Netlify.

## Project Structure

- `frontend-react/` — React frontend app
- `netlify/functions/` — Netlify serverless backend functions
- `.env` — Environment variables (not committed to git)
- `.gitignore` — Ignores `node_modules`, `.env`, and other files

## Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/Rbpro2k4/RaffleRegistration.git
   cd RaffleRegistration
   ```

2. **Install backend dependencies:**
   ```
   npm install
   ```

3. **Install frontend dependencies:**
   ```
   cd frontend-react
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=your-mongodb-atlas-connection-string
     ```

5. **Deploy to Netlify:**
   - Connect your repo to Netlify and set the `MONGODB_URI` environment variable in the Netlify dashboard.

## Usage

- Visit the deployed site.
- Enter a valid code, name, email, and phone number.
- Click "Good Luck!" to register.
- You will see a message indicating if registration was successful.

## License

MIT
