// ==============================
// 📘 stok.js - Daftar Buku
// ==============================

// Elemen DOM
const daftarBukuContainer = document.getElementById("daftarBuku");
const formTambah = document.getElementById("formTambah");

// Tampilkan daftar buku
function renderDaftarBuku() {
  daftarBukuContainer.innerHTML = "";
  dataKatalogBuku.forEach((buku) => {
    const card = document.createElement("div");
    card.className = "card-buku";
    card.innerHTML = `
      <div class="buku-img"><img src="${buku.img}" alt="${buku.judul}"></div>
      <h3>${buku.judul}</h3>
      <p>Stok: ${buku.stok}</p>
      <p>Harga: Rp ${formatRupiah(buku.harga)}</p>
      <button class="btn hapus" data-id="${buku.id}">Hapus</button>
    `;
    daftarBukuContainer.appendChild(card);
  });

  // Tombol hapus
  document.querySelectorAll(".hapus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const index = dataKatalogBuku.findIndex(b => b.id === id);
      if (index !== -1) {
        dataKatalogBuku.splice(index, 1);
        saveDataKatalog();
        renderDaftarBuku();
      }
    });
  });
}

// Tambah buku baru
formTambah.addEventListener("submit", function (e) {
  e.preventDefault();

  const judul = document.getElementById("judul").value.trim();
  const stok = parseInt(document.getElementById("stok").value);
  const harga = parseInt(document.getElementById("harga").value);
  const img = document.getElementById("img").value.trim();

  if (!judul || isNaN(stok) || isNaN(harga) || !img) {
    showAlert("Mohon isi semua data dengan benar!");
    return;
  }

  const newBook = {
    id: Date.now(),
    judul,
    stok,
    harga,
    img
  };

  dataKatalogBuku.push(newBook);
  saveDataKatalog();
  renderDaftarBuku();
  formTambah.reset();
  showAlert("Buku baru berhasil ditambahkan!");
});

// Pertama kali load
renderDaftarBuku();
