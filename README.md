# Aplikasi Keluhan Penyewa Kontrakan
Aplikasi keluhan penyewa kontrakan adalah aplikasi berbasis web untuk mengadukan keluhan terkait fasilitas yang berkendala pada kontrakan atau apartement dll yang statusnya sewa, tujuannya untuk mempermudah penyewa properti mengadukan kendala secara langsung melalui aplikasi web yang disediakan.

![logo](https://i.imgur.com/ZbBJNUO.png)

## Features
##### Role Admin
- Memonitoring jumlah keluhan masuk, keluhan belum diproses, keluhan diproses, keluhan selesai, keluhan selesai menunggu konfirmasi penyewa, keluhan belum selesai.
- Membuat, mengubah, dan mengapus user akses.
- Membuat, mengubah, dan mengapus daftar kontrakan.
- Membuat, mengubah, dan mengapus daftar kendala yang biasa dikeluhkan pelanggan.
- Menanggapi keluhan penyewa.
- Mencetak laporan kaluhan termasuk biaya perbaikan, dan cara penanganan.

##### Role Penyewa
- Memonitoring jumlah keluhan penyewa, keluhan belum diproses, keluhan diproses, keluhan selesai, keluhan selesai menunggu konfirmasi penyewa, dan keluhan belum selesai.
- Mengajukan keluhan dengan cara upload gambar, video dan deskripsi.
- Membatalkan keluhan telah selesai apabila masalah yang dikeluhkan belum terselesaikan atau mengkonfirmasi keluhan telah selesai apabila keluhan sudah selesai.

## Tech
Aplikasi keluhan penyewa kontrakan dibangun dengan :

- [Node.js](https://nodejs.org/en/) - Node.js adalah platform runtime JavaScript yang dibangun di atas engine JavaScript V8 milik Google.
- [Express](https://expressjs.com/) - Express adalah sebuah framework web untuk Node.js yang dirancang untuk memudahkan pengembangan aplikasi web dengan menyediakan banyak fitur dan fungsionalitas, termasuk pengolahan permintaan HTTP, routing, manajemen sesi, dan banyak lagi.
- [ReactJS](https://reactjs.org/) - ReactJS adalah sebuah library JavaScript yang dikembangkan oleh Facebook untuk membangun antarmuka pengguna (user interface/UI) pada aplikasi web yang interaktif dan dinamis. 
- [MongoDB](https://www.mongodb.com/) - MongoDB adalah sebuah basis data NoSQL (non-relational) yang menggunakan dokumen (document) sebagai unit datanya. 
- [Bootstrap](https://getbootstrap.com/) - Bootstrap adalah sebuah framework front-end yang digunakan untuk mempercepat proses pengembangan aplikasi web.

## Installation

Untuk penginstalan silahkan clone atau donwload [Aplikasi-keluhan-pelanggan-MERN](https://github.com/loethfii/Aplikasi-keluhan-pelanggan-MERN) pastikan pada komputer sudah terinstall [Node.js].

#### Instalasi front end
```sh
cd frontend
npm install
npm start
```

#### Instalasi back end
```sh
cd backend
npm install
npm start 
```
koneksikan database mongodb pada 
```
backend/app.js
```
`const uri = "mongodb://127.0.0.1:27017/your-database-mongodb";`

Ganti value pada variable `uri` dengan nama database mu
cnt :
`const uri = "mongodb://127.0.0.1:27017/e_complain_kontrakan"`



## Tampilan
Berikut contoh beberapa tampilan dari website [Aplikasi-keluhan-pelanggan-MERN](https://github.com/loethfii/Aplikasi-keluhan-pelanggan-MERN)
### Front End Pada Role Admin
##### Info halaman depan
![logo](https://i.imgur.com/ZbBJNUO.png)
##### Kelola Users (CRUD)
![logo](https://i.imgur.com/i2jPlAu.png)
##### Kelola kontrakan (CRUD)
![logo](https://i.imgur.com/gpj6fC8.png)
##### Kelola kendala yang sering terjadi (CRUD)
![logo](https://i.imgur.com/rtbF70K.png)
##### Kelola pengajuan keluhan dari users
![logo](https://i.imgur.com/ofN8yg1.png)
##### Biaya perbaikan dan cara penanganan (Sortir, Print)
![logo](https://i.imgur.com/zn6HV5b.png)


### Front End Pada Role Users
##### Info halaman depan
![logo](https://i.imgur.com/LVzXr1X.png)
##### Pengajuan keluhan (Create)
![logo](https://i.imgur.com/JCBRD1p.png)

## Daftar API
Untuk mengetahui lebih lanjut daftar API
silahkan buka :
```
cd backend/testRequest
```
Untuk testing api bisa menggunakan 
[Postman](https://www.postman.com/) atau [Insomnia](https://insomnia.rest/)

## Kredit

Dibuat Oleh Arif Luthfi Romadhoni

[Klik Untuk Melihat Linkedin Saya](https://www.linkedin.com/in/arif-luthfi-romadhoni-a48149204/)


   
