# based image yang akan digunakan
FROM node:16.13

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/users

# untuk set ENV dalam aplikasi kita
ENV PORT=4001

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/users/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force



# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]
