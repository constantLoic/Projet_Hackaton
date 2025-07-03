# Étape 1 : Build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build || echo "Échec du build" && /bin/bash

# Étape 2 : Serveur
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.confS
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
