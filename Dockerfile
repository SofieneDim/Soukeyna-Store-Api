FROM node:14.15.0

LABEL build="docker build -t sk-api ."
LABEL run="docker rm -f sk-api && docker run -d --restart always -p 8001:8001 --name sk-api sk-api"

WORKDIR /app

COPY package*.json /app/

# Re-installe bcrypt to prevent OS comtability isseus
RUN npm uninstall bcrypt
RUN npm install bcrypt@5.0.1

RUN npm install --force

COPY . /app/

EXPOSE 8001

CMD ["npm", "start"]
