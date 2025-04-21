# Stage 1: Build app using Node
FROM node:20.19-bullseye as builder

LABEL description="Deploy Vite-based React app"

WORKDIR /app
COPY . /app/

# Install dependencies and build the app
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Create temp dirs and give proper permissions
RUN mkdir -p /tmp/nginx/client_temp && \
    chmod -R 777 /tmp/nginx

# Override default nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Set ENV vars for new temp dir
ENV NGINX_CLIENT_TEMP_PATH=/tmp/nginx/client_temp

# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
