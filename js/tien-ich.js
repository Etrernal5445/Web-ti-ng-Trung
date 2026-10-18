/* Các hàm dùng chung cho mọi chế độ */

/** Chống chèn HTML khi đưa dữ liệu vào trang */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function xaoTron(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Lưu/đọc thiết lập nhỏ (bộ lọc đang chọn…). Lỗi thì bỏ qua, trang vẫn chạy. */
function luuCaiDat(khoa, giaTri) {
  try { localStorage.setItem("httq:" + khoa, JSON.stringify(giaTri)); } catch (e) {}
}
function docCaiDat(khoa, macDinh) {
  try {
    const v = localStorage.getItem("httq:" + khoa);
    return v === null ? macDinh : JSON.parse(v);
  } catch (e) { return macDinh; }
}

let _toastHen;
function hienToast(noiDung) {
  const el = document.getElementById("toast");
  el.textContent = noiDung;
  el.hidden = false;
  clearTimeout(_toastHen);
  _toastHen = setTimeout(() => { el.hidden = true; }, 2600);
}

/* ===== Phát âm bằng giọng đọc có sẵn của trình duyệt ===== */
let _giongTrung = null;
let _daBaoThieuGiong = false;
function _timGiongTrung() {
  if (!("speechSynthesis" in window)) return null;
  const ds = speechSynthesis.getVoices();
  return ds.find(v => /zh[-_]CN/i.test(v.lang)) || ds.find(v => /^zh/i.test(v.lang)) || null;
}
if ("speechSynthesis" in window) {
  _giongTrung = _timGiongTrung();
  speechSynthesis.onvoiceschanged = () => { _giongTrung = _timGiongTrung(); };
}

function phatAm(vanBan, tocDo = 0.85) {
  if (!("speechSynthesis" in window)) {
    hienToast("Trình duyệt này không hỗ trợ phát âm.");
    return;
  }
  if (!_giongTrung) _giongTrung = _timGiongTrung();
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(vanBan);
  u.lang = "zh-CN";
  u.rate = tocDo;
  if (_giongTrung) u.voice = _giongTrung;
  else if (!_daBaoThieuGiong) {
    _daBaoThieuGiong = true;
    hienToast("Chưa thấy giọng đọc tiếng Trung — thử Edge/Chrome, hoặc cài thêm giọng Trung trong Windows.");
  }
  speechSynthesis.speak(u);
}

/** Nút loa nhỏ */
function nutLoa(vanBan, nhan = "Phát âm") {
  return `<button type="button" class="icon-btn speak-btn" data-doc="${esc(vanBan)}" title="${esc(nhan)}" aria-label="${esc(nhan)}">🔊</button>`;
}
document.addEventListener("click", e => {
  const nut = e.target.closest(".speak-btn");
  if (nut) {
    e.stopPropagation();
    phatAm(nut.dataset.doc);
  }
});

/**
 * Vẽ hàng chip chọn cấp độ.
 * demTheoCapDo: { hsk1: 170, ... } — cấp độ nào có số 0 sẽ bị ẩn.
 */
function veChipCapDo(khung, dangChon, demTheoCapDo, khiChon, coTatCa = true) {
  const tong = Object.values(demTheoCapDo).reduce((a, b) => a + b, 0);
  let html = "";
  if (coTatCa) {
    html += `<button type="button" class="chip ${dangChon === "tat-ca" ? "active" : ""}" data-cap="tat-ca">Tất cả <span class="chip-count">${tong}</span></button>`;
  }
  danhSachCapDo().forEach(c => {
    if (!demTheoCapDo[c]) return;
    html += `<button type="button" class="chip chip-${esc(c)} ${dangChon === c ? "active" : ""}" data-cap="${esc(c)}">${esc(tenCapDo(c))} <span class="chip-count">${demTheoCapDo[c]}</span></button>`;
  });
  khung.innerHTML = html;
  khung.onclick = e => {
    const chip = e.target.closest(".chip");
    if (chip) khiChon(chip.dataset.cap);
  };
}

function demTheo(danhSach, khoa) {
  const kq = {};
  danhSach.forEach(x => { kq[x[khoa]] = (kq[x[khoa]] || 0) + 1; });
  return kq;
}
