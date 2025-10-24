# Realtime Chat App (Express + Socket.IO)

## What you get
- A minimal real-time chat application using Node.js, Express and Socket.IO.
- Static frontend served from `public/`.
- Server in `server.js`.

## Run locally
1. Make sure Node.js (v14+) is installed.
2. In the project folder, install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open `http://localhost:3000` in multiple browser windows to test real-time chat.

## Notes
- This is a simple demo with no authentication or persistent storage.
- For production, consider HTTPS, CORS, scaling with adapters (Redis) for multi-instance, and sanitization.
