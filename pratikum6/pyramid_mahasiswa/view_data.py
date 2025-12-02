import psycopg2
from psycopg2 import sql

# Koneksi ke database
try:
    conn = psycopg2.connect(
        database="pyramid_mahasiswa",
        user="postgres",
        password="ripaldy",
        host="localhost",
        port="5432"
    )
    
    cursor = conn.cursor()
    
    # Query semua data matakuliah
    cursor.execute("SELECT * FROM matakuliah ORDER BY id;")
    
    # Ambil hasil
    rows = cursor.fetchall()
    
    # Tampilkan header
    print("\n" + "="*80)
    print(f"{'ID':<5} {'Kode MK':<10} {'Nama Matakuliah':<30} {'SKS':<5} {'Semester':<10}")
    print("="*80)
    
    # Tampilkan data
    for row in rows:
        print(f"{row[0]:<5} {row[1]:<10} {row[2]:<30} {row[3]:<5} {row[4]:<10}")
    
    print("="*80)
    print(f"Total: {len(rows)} matakuliah\n")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"Error: {e}")
