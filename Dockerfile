# node 버전
FROM node:18.17.0

# 작업 디렉토리
WORKDIR /usr/src/app

# package, package-lock 복사
COPY package*.json ./

# node_modules 설치
RUN npm install

# 앱에 소스 이미지 안으로 복사
COPY . .

#실행
CMD ["npm", "start"]