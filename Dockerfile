# Stage 1: Build app using Node
FROM node:20.19-bullseye AS builder

ARG workdir=.
LABEL description="Deploy Vite-based React app"

WORKDIR /app
COPY ${workdir}/ /app/

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Expose port 3000 for OpenShift or custom port usage
EXPOSE 3000

# Copy build output to nginx's public directory
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Replace default nginx config with custom one
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
