FROM node:20-alpine
WORKDIR /app
COPY . /app
RUN npm install --legacy-peer-deps && npm install react-scripts -g && npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
