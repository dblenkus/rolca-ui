FROM node:12-alpine as base

FROM base as installer
WORKDIR /node
# Copy "postcss.config.js" to prevent error when Vutify doesn't find it.
COPY package*.json postcss.config.js ./
RUN npm install --no-progress
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node/app
COPY . .

FROM installer as builder
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=builder /node/app/dist /usr/share/nginx/html
