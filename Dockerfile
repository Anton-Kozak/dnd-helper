FROM node:18-apline AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

FROM nginx:1.23-apline
COPY --from=builder /app/dist/dnd-helper/ usr/share/nginx/html

EXPOSE 80