import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Koneksi ke PostgreSQL (database default 'postgres')
try:
    conn = psycopg2.connect(
        user="postgres",
        password="postgres",  # Ganti dengan password Anda
        host="localhost",
        port="5432",
        database="postgres"
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Cek apakah database sudah ada
    cursor.execute("SELECT 1 FROM pg_database WHERE datname='pyramid_mahasiswa'")
    exists = cursor.fetchone()
    
    if exists:
        print("Database 'pyramid_mahasiswa' sudah ada!")
    else:
        # Buat database
        cursor.execute("CREATE DATABASE pyramid_mahasiswa")
        print("Database 'pyramid_mahasiswa' berhasil dibuat!")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"Error: {e}")
    print("\nPastikan:")
    print("1. PostgreSQL service sudah running")
    print("2. Username dan password benar")
    print("3. Ubah password di script jika perlu")
