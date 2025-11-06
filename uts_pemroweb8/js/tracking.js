// tracking.js
const searchDo = document.getElementById("searchDo");
const doInput = document.getElementById("doNumber");
const trackingResult = document.getElementById("trackingResult");
const trName = document.getElementById("trName");
const trDetail = document.getElementById("trDetail");
const trEkspedisi = document.getElementById("trEkspedisi");
const trTanggal = document.getElementById("trTanggal");
const trPaket = document.getElementById("trPaket");
const trTotal = document.getElementById("trTotal");
const progressBar = document.getElementById("progressBar");

searchDo?.addEventListener("click", () => {
  const id = (doInput.value || "").trim();
  if(!id) return showAlert("Masukkan DO number.");
  // load pengiriman from localStorage fallback to dataPengiriman
  const stored = JSON.parse(localStorage.getItem("dataPengiriman") || "null");
  const arr = stored && stored.length ? stored : dataPengiriman;
  const r = arr.find(x => x.orderId === id);
  if(!r) return showAlert("Nomor DO tidak ditemukan.");
  trackingResult.classList.remove("hidden");
  trName.textContent = `${r.nama} — ${r.orderId}`;
  trDetail.textContent = `Status: ${r.status}`;
  trEkspedisi.textContent = r.ekspedisi;
  trTanggal.textContent = r.tanggal;
  trPaket.textContent = r.paket;
  trTotal.textContent = "Rp " + formatRupiah(r.total || 0);

  // simulate progress based on status
  let width = 10;
  if(r.status.toLowerCase().includes("menunggu")) width = 10;
  else if(r.status.toLowerCase().includes("pickup")) width = 35;
  else if(r.status.toLowerCase().includes("dalam")) width = 65;
  else if(r.status.toLowerCase().includes("selesai") || r.status.toLowerCase().includes("delivered")) width = 100;
  progressBar.style.width = width + "%";
});
