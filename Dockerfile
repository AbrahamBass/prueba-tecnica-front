FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD sh -c "echo \"window.__env = { apiUrl: '$API_URL' }\" > src/assets/env.js && npm start -- --host=0.0.0.0 --port=4200"