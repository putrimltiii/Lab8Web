// Ambil elemen
const selectBuku = document.getElementById("bookSelect");
const qtyInput = document.getElementById("qty");
const cartTable = document.getElementById("cartTable").querySelector("tbody");
const totalAmount = document.getElementById("totalAmount");
const addToCartBtn = document.getElementById("addToCart");
const placeOrderBtn = document.getElementById("placeOrder");

let keranjang = [];

loadDataKatalog();

// isi dropdown buku
function isiDropdownBuku() {
  selectBuku.innerHTML = "";
  dataKatalogBuku.forEach(buku => {
    const opt = document.createElement("option");
    opt.value = buku.id;
    opt.textContent = `${buku.judul} - Rp ${formatRupiah(buku.harga)}`;
    selectBuku.appendChild(opt);
  });
}
isiDropdownBuku();

// tambah ke keranjang
addToCartBtn.addEventListener("click", () => {
  const id = parseInt(selectBuku.value);
  const qty = parseInt(qtyInput.value);
  const buku = dataKatalogBuku.find(b => b.id === id);
  if (!buku) return alert("Pilih buku terlebih dahulu!");
  if (qty < 1) return alert("Jumlah tidak valid!");

  const subtotal = buku.harga * qty;
  keranjang.push({ judul: buku.judul, qty, harga: buku.harga, subtotal });
  renderKeranjang();
});

// render keranjang
function renderKeranjang() {
  cartTable.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, i) => {
    total += item.subtotal;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.judul}</td>
      <td>${item.qty}</td>
      <td>Rp ${formatRupiah(item.harga)}</td>
      <td>Rp ${formatRupiah(item.subtotal)}</td>
      <td><button class="btn danger" onclick="hapusItem(${i})">Hapus</button></td>
    `;
    cartTable.appendChild(tr);
  });

  totalAmount.textContent = formatRupiah(total);
}

// hapus item
function hapusItem(i) {
  keranjang.splice(i, 1);
  renderKeranjang();
}

// simpan pesanan
placeOrderBtn.addEventListener("click", () => {
  if (keranjang.length === 0) return alert("Keranjang masih kosong!");

  const nama = document.getElementById("custNama").value.trim();
  const alamat = document.getElementById("custAlamat").value.trim();
  const telp = document.getElementById("custTelp").value.trim();
  const metode = document.getElementById("payMethod").value;

  if (!nama || !alamat || !telp) return alert("Lengkapi data pemesan!");

  const total = keranjang.reduce((sum, i) => sum + i.subtotal, 0);
  const pesananBaru = {
    orderId: "TRX" + Date.now(),
    nama,
    alamat,
    telp,
    metode,
    tanggal: new Date().toLocaleDateString("id-ID"),
    total,
    item: keranjang,
    status: "Dalam Pengiriman"
  };

  const dataLama = JSON.parse(localStorage.getItem("dataPengiriman")) || [];
  dataLama.push(pesananBaru);
  localStorage.setItem("dataPengiriman", JSON.stringify(dataLama));

  alert("Pesanan berhasil disimpan! 🩷 Lihat di halaman History Transaksi.");
  keranjang = [];
  renderKeranjang();
  totalAmount.textContent = "0";
});
