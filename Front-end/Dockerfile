FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ARG VITE_REACT_APP_BACKEND_BASEURL
ENV VITE_REACT_APP_BACKEND_BASEURL=${VITE_REACT_APP_BACKEND_BASEURL}

RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]