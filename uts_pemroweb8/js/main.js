// ==============================
// 🌸 main.js - Fungsi Util Umum
// ==============================

// Tutup modal jika tombol close diklik
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-modal")) {
    document.querySelectorAll(".modal").forEach(m => (m.style.display = "none"));
  }
});

// 💰 Format Rupiah
function formatRupiah(num) {
  if (isNaN(num) || num === null) return "0";
  return Number(num).toLocaleString("id-ID");
}

// 🔔 Alert sederhana
function showAlert(msg) {
  alert(msg);
}

// 🔐 Cek status login
function isLoggedIn() {
  return !!localStorage.getItem("user");
}
