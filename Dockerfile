FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/cheekydavy/ping-md.git /root/ping-md
WORKDIR /root/ping-md/

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["pm2-runtime", "Ibrahim.js"]