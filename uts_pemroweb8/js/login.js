// login.js
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const openForgot = document.getElementById("openForgot");
const openRegister = document.getElementById("openRegister");
const modalForgot = document.getElementById("modalForgot");
const modalRegister = document.getElementById("modalRegister");
const togglePw = document.getElementById("togglePw");

togglePw?.addEventListener("click", () => {
  const pw = document.getElementById("password");
  pw.type = pw.type === "password" ? "text" : "password";
});

openForgot?.addEventListener("click", () => modalForgot.style.display = "flex");
openRegister?.addEventListener("click", () => modalRegister.style.display = "flex");

document.getElementById("sendReset")?.addEventListener("click", () => {
  const e = document.getElementById("forgotEmail").value.trim();
  if(!e) return showAlert("Masukkan email untuk reset.");
  showAlert("Link reset (simulasi) sudah dikirim ke " + e);
  modalForgot.style.display = "none";
});

// register
document.getElementById("registerBtn")?.addEventListener("click", () => {
  const nama = document.getElementById("regNama").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pw = document.getElementById("regPassword").value;
  if(!nama || !email || !pw) return showAlert("Isi semua data pendaftaran.");
  // simple store to dataUser + localStorage user daftar (simulasi)
  dataUser.push({ email, password: pw, nama });
  showAlert("Akun terdaftar (simulasi). Silakan login.");
  modalRegister.style.display = "none";
});

// form submit
loginForm?.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value;
  const user = dataUser.find(u => u.email === email && u.password === pw);
  if(user){
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    showAlert("Email atau password salah!");
  }
});
