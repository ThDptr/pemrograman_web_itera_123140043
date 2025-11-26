"""
Sistem Manajemen Perpustakaan Sederhana
Program ini mendemonstrasikan konsep OOP: Abstract Class, Inheritance, 
Encapsulation, Polymorphism, dan Property Decorator
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract Base Class untuk semua item perpustakaan.
    Menggunakan encapsulation dengan atribut protected (_).
    """
    
    def __init__(self, item_id, title):
        """
        Constructor untuk LibraryItem
        
        Args:
            item_id: ID unik item
            title: Judul item
        """
        self._item_id = item_id
        self._title = title
    
    @abstractmethod
    def display_details(self):
        """
        Metode abstrak yang harus diimplementasikan oleh subclass.
        Menampilkan detail lengkap dari item.
        """
        pass


class Book(LibraryItem):
    """
    Class Book yang mewarisi dari LibraryItem.
    Merepresentasikan buku dalam perpustakaan.
    """
    
    def __init__(self, item_id, title, author, isbn):
        """
        Constructor untuk Book
        
        Args:
            item_id: ID unik buku
            title: Judul buku
            author: Penulis buku
            isbn: Nomor ISBN buku
        """
        # Memanggil constructor parent class
        super().__init__(item_id, title)
        self._author = author
        self._isbn = isbn
    
    @property
    def title(self):
        """Getter untuk atribut title menggunakan property decorator"""
        return self._title
    
    @title.setter
    def title(self, new_title):
        """Setter untuk atribut title menggunakan property decorator"""
        if new_title and isinstance(new_title, str):
            self._title = new_title
        else:
            print("Judul harus berupa string yang valid!")
    
    def display_details(self):
        """
        Implementasi metode abstrak dari parent class.
        Menampilkan detail lengkap buku.
        """
        print("Tipe: Buku")
        print("ID: {}".format(self._item_id))
        print("Judul: {}".format(self._title))
        print("Penulis: {}".format(self._author))
        print("ISBN: {}".format(self._isbn))


class Magazine(LibraryItem):
    """
    Class Magazine yang mewarisi dari LibraryItem.
    Merepresentasikan majalah dalam perpustakaan.
    """
    
    def __init__(self, item_id, title, publisher, issue_number):
        """
        Constructor untuk Magazine
        
        Args:
            item_id: ID unik majalah
            title: Judul majalah
            publisher: Penerbit majalah
            issue_number: Nomor edisi majalah
        """
        # Memanggil constructor parent class
        super().__init__(item_id, title)
        self._publisher = publisher
        self._issue_number = issue_number
    
    def display_details(self):
        """
        Implementasi metode abstrak dari parent class.
        Menampilkan detail lengkap majalah.
        """
        print("Tipe: Majalah")
        print("ID: {}".format(self._item_id))
        print("Judul: {}".format(self._title))
        print("Penerbit: {}".format(self._publisher))
        print("Edisi: {}".format(self._issue_number))


class Library:
    """
    Class Library untuk mengelola koleksi item perpustakaan.
    Menggunakan encapsulation dengan atribut private (__).
    """
    
    def __init__(self):
        """Constructor untuk Library, menginisialisasi koleksi kosong"""
        # Atribut private
        self.__collection = []
    
    def add_item(self, item):
        """
        Menambahkan item baru ke dalam koleksi perpustakaan.
        
        Args:
            item: Objek turunan dari LibraryItem (Book atau Magazine)
        """
        if isinstance(item, LibraryItem):
            self.__collection.append(item)
            print("Item '{}' berhasil ditambahkan ke perpustakaan.".format(item._title))
        else:
            print("Error: Item harus merupakan turunan dari LibraryItem!")
    
    def list_all_items(self):
        """
        Menampilkan semua item dalam koleksi perpustakaan.
        Demonstrasi Polymorphism: memanggil display_details() dari objek berbeda.
        """
        print("\n" + "=" * 60)
        print("DAFTAR SEMUA ITEM DI PERPUSTAKAAN")
        print("=" * 60)
        
        if not self.__collection:
            print("Perpustakaan masih kosong.")
        else:
            for i, item in enumerate(self.__collection, 1):
                print("\nItem #{}:".format(i))
                # Polymorphism: memanggil metode yang sama pada objek berbeda
                item.display_details()
                print("-" * 60)
    
    def search_item(self, query):
        """
        Mencari item dalam koleksi berdasarkan ID atau Judul.
        
        Args:
            query: String pencarian (ID atau Judul)
        """
        print("\nMencari item dengan kata kunci: '{}'".format(query))
        print("-" * 60)
        
        found = False
        query_lower = str(query).lower()
        
        for item in self.__collection:
            # Pencarian case-insensitive pada ID dan Judul
            if (query_lower in str(item._item_id).lower() or 
                query_lower in item._title.lower()):
                item.display_details()
                found = True
                print("-" * 60)
        
        if not found:
            print("Item dengan kata kunci '{}' tidak ditemukan.".format(query))
            print("-" * 60)


# ==================== PROGRAM UTAMA ====================
if __name__ == "__main__":
    # Membuat instance Library
    perpustakaan = Library()
    
    print("\n" + "=" * 60)
    print("SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA")
    print("Praktikum Pemrograman Berorientasi Objek (OOP)")
    print("=" * 60)
    
    # Membuat objek-objek Book
    book1 = Book("B001", "Pemrograman Python untuk Pemula", "John Doe", "978-1234567890")
    book2 = Book("B002", "Data Structures and Algorithms", "Jane Smith", "978-0987654321")
    
    # Membuat objek-objek Magazine
    magazine1 = Magazine("M001", "InfoKomputer", "PT Media Teknologi", "Edisi 05/2024")
    magazine2 = Magazine("M002", "National Geographic Indonesia", "PT Gramedia", "Vol. 12 No. 3")
    
    # Menambahkan item ke perpustakaan
    print("\nMenambahkan item ke perpustakaan...")
    print("-" * 60)
    perpustakaan.add_item(book1)
    perpustakaan.add_item(book2)
    perpustakaan.add_item(magazine1)
    perpustakaan.add_item(magazine2)
    
    # Menampilkan semua item
    perpustakaan.list_all_items()
    
    # Demonstrasi Property Decorator
    print("\n" + "=" * 60)
    print("DEMONSTRASI PROPERTY DECORATOR")
    print("=" * 60)
    print("Judul buku sebelum diubah: {}".format(book1.title))
    book1.title = "Python Advanced Programming"
    print("Judul buku setelah diubah: {}".format(book1.title))
    
    # Melakukan pencarian
    print("\n" + "=" * 60)
    print("PENCARIAN ITEM")
    print("=" * 60)
    
    # Pencarian 1 - Berhasil (berdasarkan judul)
    perpustakaan.search_item("Python")
    
    # Pencarian 2 - Berhasil (berdasarkan ID)
    perpustakaan.search_item("M001")
    
    # Pencarian 3 - Gagal
    perpustakaan.search_item("Machine Learning")
    
    print("\n" + "=" * 60)
    print("Program selesai dijalankan.")
    print("=" * 60)