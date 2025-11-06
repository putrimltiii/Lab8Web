// stok.js
const katalogGrid = document.getElementById("katalogGrid");
const addBookBtn = document.getElementById("addBookBtn");

function renderKatalog() {
  katalogGrid.innerHTML = "";
  dataKatalogBuku.forEach(buku => {
    const card = document.createElement("div");
    card.className = "book-card soft";
    card.innerHTML = `
      <img src="${buku.img}" alt="${buku.judul}">
      <h4>${buku.judul}</h4>
      <p>Stok: ${buku.stok}</p>
      <p>Harga: Rp ${formatRupiah(buku.harga)}</p>
      <button class="btn ghost del" data-id="${buku.id}">Hapus</button>
    `;
    katalogGrid.appendChild(card);
  });
}

renderKatalog();

addBookBtn.addEventListener("click", () => {
  const judul = document.getElementById("newJudul").value.trim();
  const stok = Number(document.getElementById("newStok").value);
  const harga = Number(document.getElementById("newHarga").value);
  const img = document.getElementById("newImg").value.trim();

  if (!judul || !stok || !harga || !img) return showAlert("Isi semua data buku.");

  const newId = dataKatalogBuku.length ? Math.max(...dataKatalogBuku.map(x => x.id)) + 1 : 1;
  dataKatalogBuku.push({ id: newId, judul, stok, harga, img });
  localStorage.setItem("dataKatalogBuku", JSON.stringify(dataKatalogBuku));
  renderKatalog();

  document.getElementById("newJudul").value = "";
  document.getElementById("newStok").value = "";
  document.getElementById("newHarga").value = "";
  document.getElementById("newImg").value = "";
});

katalogGrid.addEventListener("click", e => {
  if (e.target.classList.contains("del")) {
    const id = Number(e.target.dataset.id);
    const idx = dataKatalogBuku.findIndex(x => x.id === id);
    if (idx > -1 && confirm("Hapus buku ini?")) {
      dataKatalogBuku.splice(idx, 1);
      localStorage.setItem("dataKatalogBuku", JSON.stringify(dataKatalogBuku));
      renderKatalog();
    }
  }
});
