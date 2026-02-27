# How To Run

This is a full-stack minimal React + Node.js application that uses a local `DATABASE.json` file for storage instead of a traditional relational database.

## Local Development
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. The server will run on `http://localhost:5000`

## Running on a VPS (Virtual Private Server)
If you have a Linux VPS (e.g., Ubuntu on DigitalOcean, Linode, AWS), follow these steps:
1. SSH into your server: `ssh user@your_server_ip`
2. Install Node.js (v20+) and npm.
3. Clone your repository: `git clone <your_repo_url>`
4. Navigate into the project: `cd <your_project_directory>`
5. Install dependencies: `npm install`
6. Build the application: `npm run build`
7. Start the application in production mode: `NODE_ENV=production node dist/index.js`
*(Note: It is highly recommended to use a process manager like `pm2` to keep the app running in the background: `pm2 start dist/index.js`)*

## Running with Docker
You can easily containerize this application.
1. Create a `Dockerfile` in the root of your project:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]
```
2. Build the Docker image: `docker build -t python-learning-app .`
3. Run the Docker container: `docker run -d -p 5000:5000 -v $(pwd)/DATABASE.json:/app/DATABASE.json python-learning-app`
*(Notice the `-v` flag: it mounts your local `DATABASE.json` so changes persist outside the container).*

## Adding a Domain & HTTPS
1. Purchase a domain from a registrar (Namecheap, Cloudflare, GoDaddy).
2. Point the A Record of your domain to your VPS IP address.
3. On your VPS, install Nginx or Caddy.
4. Set up a reverse proxy in Nginx to forward traffic from port 80 to port 5000:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
5. Install `certbot` and run `sudo certbot --nginx -d yourdomain.com` to secure it with a free Let's Encrypt SSL certificate.
