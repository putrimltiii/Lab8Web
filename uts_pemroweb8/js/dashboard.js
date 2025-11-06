// dashboard.js — Logika Dashboard Toko Buku

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const greeting = document.getElementById("greeting");
  const userGreeting = document.getElementById("userGreeting");

  // Cek user login
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.nama) {
    userGreeting.textContent = `Halo, ${user.nama}!`;
  } else {
    userGreeting.textContent = "Halo, Pengguna!";
  }

  // Ucapan waktu
  const jam = new Date().getHours();
  if (jam < 10) greeting.textContent = "Selamat pagi 🌤️";
  else if (jam < 15) greeting.textContent = "Selamat siang ☀️";
  else if (jam < 18) greeting.textContent = "Selamat sore 🌇";
  else greeting.textContent = "Selamat malam 🌙";

  // Tombol logout
  logoutBtn.addEventListener("click", () => {
    if (confirm("Yakin ingin logout?")) {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    }
  });

  // Pastikan tombol History bisa diklik (backup)
  const historyLink = document.getElementById("historyLink");
  historyLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "history.html";
  });
});
