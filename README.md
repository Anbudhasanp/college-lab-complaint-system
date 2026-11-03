# College Lab Complaint System

A React and Vite frontend for the LabCare college lab equipment complaint system.
The current app is a frontend demo: complaint and login data are kept in browser
memory and are not connected to a backend.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`.

## Run with Docker

Build the production image from the project directory:

```sh
docker build -t college-lab-complaint-system .
```

Start the container and serve the frontend on port 8080:

```sh
docker run --rm -p 8080:80 college-lab-complaint-system
```

Open <http://localhost:8080>. The `/health` endpoint can be used to check
whether Nginx is serving the app.

The Docker image uses a multi-stage build: Node.js compiles the Vite app, and
Nginx serves the generated static files with SPA route fallback.
