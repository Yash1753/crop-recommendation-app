# ---- Build stage ----
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy dependencies and install
    COPY frontend/package.json frontend/package-lock.json* ./
    RUN npm ci --silent
    
    # Copy app source code
    COPY frontend/ .
    
    # Build for production
    RUN npm run build
    
    # ---- Nginx runtime stage ----
    FROM nginx:1.25-alpine AS runtime
    
    # Copy production build
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy custom Nginx config
    COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    