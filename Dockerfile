FROM node:14.15.0

WORKDIR /app

COPY package*.json /app/

# Re-installe bcrypt to prevent OS comtability isseus
RUN npm uninstall bcrypt
RUN npm install bcrypt@5.0.1

RUN npm install --force

COPY . /app/

EXPOSE 8100

CMD ["npm", "start"]
