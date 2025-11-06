// =============================
// 📚 DATA DUMMY - Sudah Benar
// =============================
const dataUser = [
  { email: "putri@gmail.com", password: "123456", nama: "Putri Melati Ramadhaniati" }
];

const dataPengiriman = [
  {
    orderId: "DO001",
    nama: "Putri",
    status: "Dalam Pengiriman",
    ekspedisi: "JNE",
    tanggal: "2025-11-05",
    paket: "Reguler",
    total: 155000
  }
];

const dataKatalogBuku = [
  { id: 1, judul: "Kepemimpinan", stok: 100, harga: 60000, img: "img/kepemimpinan.jpg" },
  { id: 2, judul: "Manajemen Keuangan", stok: 100, harga: 85000, img: "img/manajemen_keuangan.jpg" },
  { id: 3, judul: "Mikrobologi", stok: 5, harga: 78000, img: "img/mikrobiologi.jpg" },
  { id: 4, judul: "Paud Perkembangan", stok: 9, harga: 99000, img: "img/paud_perkembangan.jpg" },
  { id: 5, judul: "Pengantar Komunikasi", stok: 86, harga: 99000, img: "img/pengantar_komunikasi.jpg" }
];

// Simpan data katalog ke localStorage agar tidak hilang saat reload
function saveDataKatalog() {
  try {
    localStorage.setItem("dataKatalogBuku", JSON.stringify(dataKatalogBuku));
  } catch (e) {
    console.error("Gagal menyimpan data katalog:", e);
  }
}

function loadDataKatalog() {
  try {
    const raw = localStorage.getItem("dataKatalogBuku");
    if (raw) {
      const arr = JSON.parse(raw);
      dataKatalogBuku.length = 0;
      arr.forEach(i => dataKatalogBuku.push(i));
    } else {
      saveDataKatalog();
    }
  } catch (e) {
    console.error("Gagal memuat data katalog:", e);
  }
}

loadDataKatalog();
