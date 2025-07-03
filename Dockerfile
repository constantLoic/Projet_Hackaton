# Étape 1 : Build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build || echo "Échec du build" && /bin/bash

# Étape 2 : Serveur
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
