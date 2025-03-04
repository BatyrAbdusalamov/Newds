FROM node:22
WORKDIR /app
COPY . .
COPY docker.env ./.env
RUN npm install
EXPOSE 4000
CMD npx sequelize-cli db:migrate --env test
ENTRYPOINT [ "npm", "run", "start" ]