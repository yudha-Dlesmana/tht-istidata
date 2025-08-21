# THT Rekrutmen I2S

## Deskripsi
Aplikasi ini adalah project rekrutmen yang dibangun menggunakan **Spring Boot, Java, dan Hibernate** dengan **PostgreSQL (Neon)** sebagai database.  
Frontend sederhana dibuat menggunakan **HTML, CSS, JavaScript (jQuery, Bootstrap)** yang dirender melalui folder `templates`.

## Tech Stack
- **Backend**: Spring Boot (Java), Hibernate, Spring Data JPA
- **Database**: PostgreSQL (Neon Cloud)
- **Frontend**: HTML, CSS, Bootstrap, jQuery
- **Build Tool**: Maven

## Prasyarat
Sebelum menjalankan aplikasi, pastikan:
- Java 21 atau lebih baru terinstall
- Maven terinstall
- Database PostgreSQL Neon sudah dibuat, dan konfigurasi `application.properties` sudah sesuai
- Browser modern (Chrome/Firefox/Edge)

## Cara Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/yudha-Dlesmana/tht-istidata.git
cd tht-istidata
```

### 2. Jalankan Aplikasi Backend
```bash
mvn spring-boot:run
```

### 3. Akses Frontend

Buka file src/main/resources/templates/index.html di browser untuk menggunakan aplikasi.
Pastikan backend Spring Boot sudah berjalan agar API bisa diakses.

### Struktur Proyek
```.
├── src
│   ├── main
│   │   ├── java/tht/rekrutmen/I2S/...   # Kode backend (Spring Boot, Hibernate)
│   │   ├── resources
│   │   │   ├── application.properties   # Konfigurasi database
│   │   │   ├── templates/index.html     # Frontend (HTML, Bootstrap, jQuery)
│   │   │   └── static/...               # Asset (CSS/JS)
├── pom.xml                              # Maven config
└── README.md
```

## API Endpoints

| Method | Endpoint                      | Deskripsi                        |
|--------|-------------------------------|----------------------------------|
| GET    | /api/person                   | Mengambil semua data person      |
| GET    | /api/person/{nik}             | Mengambil detail person berdasarkan **NIK** |
| GET    | /api/person/search?name=Rudi  | Mencari data person berdasarkan **nama** |
| POST   | /api/person                   | Menambahkan data person baru     |
| PUT    | /api/person/{nik}             | Memperbarui data person berdasarkan **NIK** |
| DELETE | /api/person/{nik}             | Menghapus data person berdasarkan **NIK** |

