# Aplikasi Manajemen Matakuliah dengan Pyramid

**Penulis:** Tengku Hafid Diraputra  
**NIM:** 123140043

---

## 📋 Deskripsi Proyek

Aplikasi API REST backend untuk mengelola data matakuliah menggunakan Pyramid Framework. Menyediakan operasi CRUD lengkap pada data matakuliah dengan basis data SQLite.

---

## 🗂️ Model Data

### Matakuliah

| Atribut | Tipe | Deskripsi | Constraint |
|---------|------|-----------|-----------|
| id | Integer | Primary key | Auto Increment |
| kode_mk | Text | Kode mata kuliah | Unique, Not null |
| nama_mk | Text | Nama mata kuliah | Not null |
| sks | Integer | Jumlah SKS | Not null |
| semester | Integer | Semester pengambilan | Not null |

---

## 🔌 API Endpoints

| HTTP Method | URL Pattern | Deskripsi |
|-------------|-------------|-----------|
| GET | `/api/matakuliah` | Ambil semua matakuliah |
| GET | `/api/matakuliah/{id}` | Ambil detail satu matakuliah |
| POST | `/api/matakuliah` | Tambah matakuliah baru |
| PUT | `/api/matakuliah/{id}` | Perbarui matakuliah |
| DELETE | `/api/matakuliah/{id}` | Hapus matakuliah |

⚠️ **Penting:** Tambahkan parameter `request_method` pada setiap route untuk routing yang tepat.

---

## 🚀 Instalasi & Setup

### 1. Virtual Environment
\`\`\`bash
# Buat virtual environment
python -m venv venv

# Aktivasi
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Windows CMD:
.\venv\Scripts\activate.bat

# Linux/Mac:
source venv/bin/activate
\`\`\`

### 2. Install Dependensi
\`\`\`bash
cd pyramid_mahasiswa
pip install -e .
\`\`\`

### 3. Konfigurasi Database
Database SQLite sudah dikonfigurasi di `development.ini`:
\`\`\`ini
sqlalchemy.url = sqlite:///%(here)s/pyramid_mahasiswa.sqlite
\`\`\`

---

## ⚙️ Menjalankan Aplikasi

### 1. Jalankan Migrasi
\`\`\`bash
# Generate migration (jika diperlukan)
alembic -c development.ini revision --autogenerate -m "Create matakuliah table"

# Jalankan migration
alembic -c development.ini upgrade head
\`\`\`

### 2. Jalankan Server
\`\`\`bash
pserve development.ini --reload
\`\`\`
Server akan berjalan di `http://localhost:6543`

---

## 📊 Testing API dengan Postman

### 1. GET - Ambil Semua Matakuliah
**Endpoint:** `GET http://localhost:6543/api/matakuliah`

Mengambil seluruh data matakuliah dari database.

<img width="1071" height="774" alt="GET All Matakuliah" src="https://github.com/user-attachments/assets/1fa230ee-098f-4c3a-a0b8-4769085d2d25" />

---

### 2. GET - Ambil Matakuliah by ID
**Endpoint:** `GET http://localhost:6543/api/matakuliah/{id}`

Mengambil detail satu matakuliah berdasarkan ID.

<img width="1071" height="358" alt="GET by ID" src="https://github.com/user-attachments/assets/ec1e1088-eece-4d35-87ee-ec66e1493ee9" />

---

### 3. POST - Tambah Matakuliah Baru
**Endpoint:** `POST http://localhost:6543/api/matakuliah`

Menambahkan matakuliah baru ke database dengan format JSON.

<img width="1074" height="660" alt="POST Create" src="https://github.com/user-attachments/assets/e5b81351-b9d4-414c-b341-fdceeca7e1d5" />

---

### 4. PUT - Perbarui Matakuliah
**Endpoint:** `PUT http://localhost:6543/api/matakuliah/{id}`

Memperbarui data matakuliah yang sudah ada.

<img width="1066" height="653" alt="PUT Update" src="https://github.com/user-attachments/assets/a80efae2-53b1-4fdd-a8da-75150b1f7156" />

---

### 5. DELETE - Hapus Matakuliah
**Endpoint:** `DELETE http://localhost:6543/api/matakuliah/{id}`

Menghapus matakuliah dari database.

<img width="1067" height="509" alt="DELETE" src="https://github.com/user-attachments/assets/53b36f1e-219a-47a0-8d34-3588813f9675" />

---

## 📝 Panduan Testing di Postman

1. Buka aplikasi Postman
2. Pastikan server running di `http://localhost:6543`
3. Buat request sesuai endpoint di atas
4. Untuk POST/PUT, set Header `Content-Type: application/json`
5. Dokumentasikan hasil testing dengan screenshot
6. Simpan screenshot di folder `screenshots/`

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** Pyramid 2.0
- **Database:** SQLite (SQLAlchemy ORM)
- **Migrasi:** Alembic
- **Server:** Waitress

---

## ❌ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Database tidak ditemukan | Jalankan `alembic upgrade head` |
| Module import error | Pastikan `pip install -e .` sudah dijalankan |
| Port sudah digunakan | Ubah port di `development.ini` bagian `[server:main]` |
| Virtual environment tidak aktif | Aktifkan dengan perintah di atas |

---

## ⚠️ Catatan Penting

- Aktifkan virtual environment sebelum menjalankan perintah
- Jalankan migrasi sebelum menjalankan server
- Untuk production, gunakan `production.ini` dengan konfigurasi database yang sesuai
- API menggunakan format JSON untuk request dan response
- Minimal tambahkan 3 data matakuliah untuk testing lengkap

---

**Status:** ✅ Dokumentasi Lengkap & Teruji
\`\`\`

README.md yang diperbarui ini mempertahankan **semua fungsi, fitur, dan pemanggilan gambar** (screenshot) sambil membuat dokumentasi lebih ringkas dan jelas dengan:
- ✅ Identitas penulis di bagian atas
- ✅ Struktur yang lebih rapi dengan emoji
- ✅ Penjelasan yang diparaphase tapi tetap komprehensif
- ✅ Tabel untuk troubleshooting
- ✅ Semua 5 screenshot API testing tetap ada
- ✅ Informasi lengkap tapi singkat dan mudah dibaca