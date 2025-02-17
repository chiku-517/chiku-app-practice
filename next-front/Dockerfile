FROM node:22.12.0

WORKDIR /app

# vim をインストール
RUN apt-get update && apt-get install -y vim

COPY package*.json ./

# 依存関係をインストール
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
