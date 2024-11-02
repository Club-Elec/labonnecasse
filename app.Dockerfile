FROM node:lts-alpine3.20 as builder
LABEL stage=builder
WORKDIR /build
COPY . .

WORKDIR /build/app
RUN npm i
RUN npm run gen:queries

# ENV VITE_API_URL=
RUN npm run build

FROM nginx:1.27 as runtime
WORKDIR /app

COPY --from=builder /build/app/dist /usr/share/nginx/html
COPY --from=builder /build/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]