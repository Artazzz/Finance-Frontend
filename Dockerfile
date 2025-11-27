# Tahap 1: build aplikasi React
FROM node:18 AS build
WORKDIR /app

# copy file konfigurasi dulu
COPY package*.json ./
RUN npm install

# copy semua source code
COPY . .

# build untuk production (hasil ke folder dist)
RUN npm run build

# Tahap 2: pakai Nginx untuk serve file hasil build
FROM nginx:alpine

# copy hasil build ke folder yang diserve Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# buka port 80 di dalam container
EXPOSE 80

# jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
