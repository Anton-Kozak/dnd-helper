# Dockerfile

FROM node:22.12-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=builder /app/dist/dnd-helper/browser /usr/share/nginx/html

EXPOSE 80
