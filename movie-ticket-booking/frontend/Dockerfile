# Stage 1: Builder
FROM node:22 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: NGINX
FROM nginx:alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy build files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# # Stage 1: Builder
# FROM node:22 AS builder
#
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# RUN npm run build



# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
