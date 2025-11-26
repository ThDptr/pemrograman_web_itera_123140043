# Import library yang diperlukan
import sys

# Definisi warna menggunakan ANSI escape codes
RESET = "\033[0m"
WHITE = "\033[37m"
YELLOW = "\033[33m"  # Emas/Kuning terang
RED = "\033[31m"

# Data awal mahasiswa (minimal 5)
data_mahasiswa = [
    {'nama': 'Andi', 'NIM': '123456', 'nilai_uts': 80, 'nilai_uas': 85, 'nilai_tugas': 90},
    {'nama': 'Budi', 'NIM': '654321', 'nilai_uts': 70, 'nilai_uas': 75, 'nilai_tugas': 80},
    {'nama': 'Citra', 'NIM': '112233', 'nilai_uts': 90, 'nilai_uas': 95, 'nilai_tugas': 85},
    {'nama': 'Dewi', 'NIM': '445566', 'nilai_uts': 60, 'nilai_uas': 65, 'nilai_tugas': 70},
    {'nama': 'Eko', 'NIM': '778899', 'nilai_uts': 50, 'nilai_uas': 55, 'nilai_tugas': 60}
]

# Fungsi untuk menghitung nilai akhir
def hitung_nilai_akhir(uts, uas, tugas):
    """
    Menghitung nilai akhir berdasarkan bobot:
    30% UTS + 40% UAS + 30% Tugas
    """
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

# Fungsi untuk menentukan grade
def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir:
    A: >=80, B: >=70, C: >=60, D: >=50, E: <50
    """
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

# Fungsi untuk menampilkan data dalam format tabel
def tampilkan_data(data):
    """
    Menampilkan data mahasiswa dalam tabel rapi dengan warna.
    Header dalam warna emas, isi dalam putih.
    """
    if not data:
        print(f"{YELLOW}Tidak ada data mahasiswa.{RESET}")
        return

    # Hitung nilai akhir dan grade untuk setiap mahasiswa
    for mhs in data:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        mhs['nilai_akhir'] = nilai_akhir
        mhs['grade'] = grade

    # Header tabel dengan warna emas
    print(f"{YELLOW}{'Nama':<20}{'NIM':<10}{'UTS':<5}{'UAS':<5}{'Tugas':<5}{'Nilai Akhir':<12}{'Grade':<5}{RESET}")
    print(f"{YELLOW}{'-' * 62}{RESET}")

    # Isi tabel dengan warna putih, grade A dan E dengan warna khusus
    for mhs in data:
        grade_color = YELLOW if mhs['grade'] == 'A' else RED if mhs['grade'] == 'E' else WHITE
        print(f"{WHITE}{mhs['nama']:<20}{mhs['NIM']:<10}{mhs['nilai_uts']:<5}{mhs['nilai_uas']:<5}{mhs['nilai_tugas']:<5}{mhs['nilai_akhir']:<12.2f}{grade_color}{mhs['grade']:<5}{RESET}")

# Fungsi untuk mencari nilai ekstrem
def cari_nilai_ekstrem(data):
    """
    Menemukan dan menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah.
    """
    if not data:
        print(f"{YELLOW}Tidak ada data mahasiswa.{RESET}")
        return

    # Hitung nilai akhir untuk semua
    nilai_akhir_list = [(mhs['nama'], hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])) for mhs in data]

    # Cari max dan min
    max_mhs = max(nilai_akhir_list, key=lambda x: x[1])
    min_mhs = min(nilai_akhir_list, key=lambda x: x[1])

    print(f"{YELLOW}Mahasiswa dengan nilai tertinggi: {max_mhs[0]} ({max_mhs[1]:.2f}){RESET}")
    print(f"{YELLOW}Mahasiswa dengan nilai terendah: {min_mhs[0]} ({min_mhs[1]:.2f}){RESET}")

# Fungsi untuk menambah data mahasiswa baru
def tambah_data():
    """
    Menambahkan data mahasiswa baru dengan validasi input.
    """
    try:
        nama = input(f"{WHITE}Masukkan nama: {RESET}")
        nim = input(f"{WHITE}Masukkan NIM: {RESET}")
        uts = int(input(f"{WHITE}Masukkan nilai UTS (0-100): {RESET}"))
        uas = int(input(f"{WHITE}Masukkan nilai UAS (0-100): {RESET}"))
        tugas = int(input(f"{WHITE}Masukkan nilai Tugas (0-100): {RESET}"))

        if not (0 <= uts <= 100 and 0 <= uas <= 100 and 0 <= tugas <= 100):
            raise ValueError("Nilai harus antara 0-100.")

        data_mahasiswa.append({'nama': nama, 'NIM': nim, 'nilai_uts': uts, 'nilai_uas': uas, 'nilai_tugas': tugas})
        print(f"{YELLOW}Data berhasil ditambahkan!{RESET}")
    except ValueError:
        print(f"{RED}Input tidak valid! Pastikan input adalah angka yang benar.{RESET}")

# Fungsi untuk filter berdasarkan grade
def filter_grade(grade_target):
    """
    Menampilkan mahasiswa dengan grade tertentu.
    """
    filtered = [mhs for mhs in data_mahasiswa if tentukan_grade(hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])) == grade_target.upper()]
    tampilkan_data(filtered)

# Fungsi untuk hitung rata-rata nilai kelas
def hitung_rata_rata():
    """
    Menghitung dan menampilkan rata-rata nilai akhir kelas.
    """
    if not data_mahasiswa:
        print(f"{YELLOW}Tidak ada data mahasiswa.{RESET}")
        return

    total = sum(hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']) for mhs in data_mahasiswa)
    rata_rata = total / len(data_mahasiswa)
    print(f"{YELLOW}Rata-rata nilai kelas: {rata_rata:.2f}{RESET}")

# Fungsi utama untuk menu
def main_menu():
    while True:
        print(f"\n{YELLOW}Sistem Manajemen Nilai{RESET}")
        print(f"{WHITE}1. Tampilkan Semua Data{RESET}")
        print(f"{WHITE}2. Tambah Data Mahasiswa Baru{RESET}")
        print(f"{WHITE}3. Filter Mahasiswa Berdasarkan Grade{RESET}")
        print(f"{WHITE}4. Hitung Rata-Rata Nilai Kelas{RESET}")
        print(f"{WHITE}5. Cari Nilai Tertinggi/Terendah{RESET}")
        print(f"{WHITE}6. Keluar{RESET}")

        pilihan = input(f"{WHITE}Pilih menu (1-6): {RESET}")

        if pilihan == '1':
            tampilkan_data(data_mahasiswa)
        elif pilihan == '2':
            tambah_data()
        elif pilihan == '3':
            grade = input(f"{WHITE}Masukkan grade (A/B/C/D/E): {RESET}")
            filter_grade(grade)
        elif pilihan == '4':
            hitung_rata_rata()
        elif pilihan == '5':
            cari_nilai_ekstrem(data_mahasiswa)
        elif pilihan == '6':
            print(f"{YELLOW}Program dihentikan.{RESET}")
            sys.exit()
        else:
            print(f"{RED}Pilihan tidak valid!{RESET}")

# Jalankan program
if __name__ == "__main__":
    main_menu()