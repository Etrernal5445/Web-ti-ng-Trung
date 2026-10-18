/* ===== LUYỆN TẬP: Viết chữ & Trắc nghiệm, lấy từ trong kho theo cấp độ ===== */

const ltTrangThai = {
  capDo: docCaiDat("lt-cap-do", "hsk1"),
  bai: "",
  cheDo: docCaiDat("lt-che-do", "write"),
  huong: "viet-han",   // viet-han: nghĩa → chữ Hán; han-viet: chữ Hán → nghĩa
  daKhoiTaoQuiz: false
};

function nguonLuyenTap() {
  return KHO.tuVung.filter(t =>
    (ltTrangThai.capDo === "tat-ca" || t.capDo === ltTrangThai.capDo) &&
    (!ltTrangThai.bai || String(t.bai) === String(ltTrangThai.bai)));
}

function khoiTaoLuyenTap() {
  if (ltTrangThai.capDo !== "tat-ca" && !danhSachCapDo().includes(ltTrangThai.capDo)) ltTrangThai.capDo = "tat-ca";
  veChipLuyenTap();
  document.getElementById("lt-bai").addEventListener("change", e => {
    ltTrangThai.bai = e.target.value;
    doiPhamViLuyenTap();
  });

  document.querySelectorAll("#sub-mode-switch .mode-btn").forEach(nut => {
    nut.addEventListener("click", () => chonCheDo(nut.dataset.submode));
  });
  document.querySelectorAll("#quiz-huong .chip").forEach(nut => {
    nut.addEventListener("click", () => {
      ltTrangThai.huong = nut.dataset.huong;
      document.querySelectorAll("#quiz-huong .chip").forEach(n => n.classList.toggle("active", n === nut));
      taiCauHoi();
    });
  });
}

function veChipLuyenTap() {
  veChipCapDo(document.getElementById("lt-cap-do"), ltTrangThai.capDo,
    demTheo(KHO.tuVung, "capDo"), capDo => {
      ltTrangThai.capDo = capDo;
      ltTrangThai.bai = "";
      luuCaiDat("lt-cap-do", capDo);
      veChipLuyenTap();
      doiPhamViLuyenTap();
    });

  // chọn bài: chỉ hiện khi đã chọn 1 cấp độ có đánh số bài
  const chonBai = document.getElementById("lt-bai");
  const dsBai = [...new Set(KHO.tuVung
    .filter(t => t.capDo === ltTrangThai.capDo && t.bai).map(t => t.bai))].sort((a, b) => a - b);
  chonBai.hidden = ltTrangThai.capDo === "tat-ca" || !dsBai.length;
  chonBai.innerHTML = `<option value="">Tất cả bài</option>` +
    dsBai.map(b => `<option value="${b}">Bài ${b}</option>`).join("");
  chonBai.value = ltTrangThai.bai;
}

/** Đổi cấp độ / bài: làm mới cả 3 chế độ */
function doiPhamViLuyenTap() {
  vietDaXong = 0;
  document.getElementById("progress-count").innerText = 0;
  document.getElementById("progress-fill").style.width = "0%";
  if (daKhoiTaoViet) tuTiepTheo();
  if (ltTrangThai.daKhoiTaoQuiz) { quizDiem = 0; quizTong = 0; capNhatDiem(); taiCauHoi(); }
  if (ngheTrangThai.daKhoiTao) { datLaiDiemNghe(); taiCauNghe(); }
}

function chonCheDo(cheDo) {
  ltTrangThai.cheDo = cheDo;
  document.getElementById("write-mode").hidden = cheDo !== "write";
  document.getElementById("quiz-mode").hidden = cheDo !== "quiz";
  document.getElementById("listen-mode").hidden = cheDo !== "listen";
  luuCaiDat("lt-che-do", cheDo);
  document.querySelectorAll("#sub-mode-switch .mode-btn").forEach(n =>
    n.classList.toggle("sub-active", n.dataset.submode === cheDo));
  if (cheDo === "quiz" && !ltTrangThai.daKhoiTaoQuiz) {
    ltTrangThai.daKhoiTaoQuiz = true;
    taiCauHoi();
  }
  if (cheDo === "write") batDauViet();
  if (cheDo === "listen") khoiTaoNghe();
  if (cheDo !== "listen" && "speechSynthesis" in window) speechSynthesis.cancel();
}

/* ---------- Viết chữ ---------- */
let butVietLT = [];
let tuDangViet = null;
let vietDaXong = 0;
let daKhoiTaoViet = false;

function nguonViet() {
  // chỉ lấy từ toàn chữ Hán (bỏ từ có ký tự khác)
  return nguonLuyenTap().filter(t => [...t.hanzi].every(laChuHan));
}

function batDauViet() {
  if (daKhoiTaoViet) return;
  daKhoiTaoViet = true;
  tuTiepTheo();
}

function taiTuViet() {
  const wrapper = document.getElementById("canvas-wrapper");
  const msg = document.getElementById("effect-message");
  if (typeof HanziWriter === "undefined") {
    wrapper.innerHTML = '<p class="cdn-error">Không thể tải thư viện viết chữ (HanziWriter). Vui lòng kiểm tra kết nối mạng và tải lại trang.</p>';
    document.querySelector("#write-mode .actions").style.display = "none";
    return;
  }
  const t = tuDangViet;
  document.getElementById("viet-word").innerText = t.nghia;
  document.getElementById("progress-total").innerText = nguonViet().length;
  msg.innerText = "Bắt đầu viết chữ đầu tiên...";
  msg.style.color = "var(--text-muted)";

  wrapper.innerHTML = "";
  butVietLT = [];
  const chu = [...t.hanzi];
  const kichThuoc = tinhKichThuocO(chu.length);
  chu.forEach((c, i) => {
    const cot = document.createElement("div");
    cot.className = "char-column";
    const o = document.createElement("div");
    o.id = `char-${i}`;
    o.className = "char-box" + (i > 0 ? " locked" : "");
    o.style.width = o.style.height = kichThuoc + "px";
    const py = document.createElement("div");
    py.id = `pinyin-${i}`;
    py.className = "pinyin-display";
    py.innerText = t.amTiet.length === chu.length ? t.amTiet[i] : (i === chu.length - 1 ? t.pinyin : "");
    cot.appendChild(o);
    cot.appendChild(py);
    wrapper.appendChild(cot);
    butVietLT.push(HanziWriter.create(o.id, c, {
      // khung vẽ đúng bằng phần bên trong ô (trừ viền 3px mỗi bên) để chữ luôn nằm giữa
      width: kichThuoc - 6, height: kichThuoc - 6, padding: Math.round(kichThuoc * 0.06),
      showCharacter: false, showOutline: false,
      strokeAnimationSpeed: 2, delayBetweenStrokes: 50
    }));
  });
  vietChu(0);
}

/**
 * Tính cỡ ô viết theo bề rộng màn hình: 1 chữ thì ô to nhất có thể,
 * nhiều chữ thì chia hàng (điện thoại tối đa 2 ô/hàng).
 */
function tinhKichThuocO(soChu) {
  const rong = document.getElementById("canvas-wrapper").clientWidth || 300;
  const khoangCach = 15;
  const toiDaMoiHang = rong < 520 ? 1 : 4;   // điện thoại: mỗi chữ một ô to, viết lần lượt từ trên xuống
  const soCot = Math.min(soChu, toiDaMoiHang);
  const vua = Math.floor((rong - khoangCach * (soCot - 1)) / soCot);
  const tran = soChu === 1 || soCot === 1 ? 340 : 280;
  return Math.max(120, Math.min(vua, tran));
}

// Xoay màn hình / đổi cỡ cửa sổ: vẽ lại ô viết cho vừa
let _rongCu = 0, _henDoiCo;
window.addEventListener("resize", () => {
  clearTimeout(_henDoiCo);
  _henDoiCo = setTimeout(() => {
    const w = document.getElementById("canvas-wrapper").clientWidth;
    if (!tuDangViet || document.getElementById("write-mode").hidden || Math.abs(w - _rongCu) < 20) return;
    _rongCu = w;
    taiTuViet();
  }, 250);
});

function vietChu(i) {
  if (i >= butVietLT.length) {
    const msg = document.getElementById("effect-message");
    msg.style.color = "var(--accent-green)";
    msg.innerHTML = `✓ Chính xác — ${esc(tuDangViet.hanzi)} ${nutLoa(tuDangViet.hanzi)}`;
    phatAm(tuDangViet.hanzi);
    vietDaXong++;
    const tong = nguonViet().length;
    document.getElementById("progress-count").innerText = vietDaXong;
    const pct = ((vietDaXong % tong) / tong) * 100;
    document.getElementById("progress-fill").style.width = (pct === 0 ? 100 : pct) + "%";
    return;
  }
  const o = document.getElementById(`char-${i}`);
  o.classList.remove("locked");
  // ô tiếp theo nằm bên dưới (điện thoại) thì cuộn tới cho dễ viết
  if (i > 0 && o.getBoundingClientRect().top > document.getElementById(`char-${i - 1}`).getBoundingClientRect().bottom - 5) {
    o.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  butVietLT[i].quiz({
    onCorrectStroke() { o.classList.add("correct-stroke"); setTimeout(() => o.classList.remove("correct-stroke"), 200); },
    onMistake() { o.classList.add("mistake"); setTimeout(() => o.classList.remove("mistake"), 350); },
    onComplete() {
      o.classList.add("char-complete");
      document.getElementById(`pinyin-${i}`).classList.add("pinyin-show");
      vietChu(i + 1);
    }
  });
}

function dungGoiY() {
  const msg = document.getElementById("effect-message");
  msg.innerText = "Muốn giỏi bớt dùng";
  msg.style.color = "var(--accent-purple)";
  butVietLT.forEach(b => { b.cancelQuiz(); b.animateCharacter(); });
  setTimeout(() => {
    msg.innerText = "Hãy viết lại nào!";
    msg.style.color = "var(--text-muted)";
    taiTuViet();
  }, 3500);
}

function tuTiepTheo() {
  const ds = nguonViet();
  if (!ds.length) {
    document.getElementById("canvas-wrapper").innerHTML = `<div class="empty">Không có từ nào để luyện viết trong phạm vi này.</div>`;
    return;
  }
  let moi;
  do { moi = ds[Math.floor(Math.random() * ds.length)]; }
  while (ds.length > 1 && tuDangViet && moi.id === tuDangViet.id);
  tuDangViet = moi;
  taiTuViet();
}

/* ---------- Trắc nghiệm ---------- */
let quizDiem = 0, quizTong = 0, quizDaTraLoi = false;

function capNhatDiem() {
  document.getElementById("quiz-score").innerText = quizDiem;
  document.getElementById("quiz-total").innerText = quizTong;
}

function taiCauHoi() {
  const ds = nguonLuyenTap();
  if (ds.length < 4) {
    document.getElementById("quiz-options").innerHTML = `<div class="empty">Bài này có ít hơn 4 từ, hãy chọn phạm vi rộng hơn.</div>`;
    return;
  }
  quizDaTraLoi = false;
  document.getElementById("quiz-message").innerText = "";

  const dung = ds[Math.floor(Math.random() * ds.length)];
  // đáp án nhiễu: ưu tiên cùng loại từ để khó hơn, không trùng nghĩa
  const cungLoai = xaoTron(ds.filter(t => t.id !== dung.id && t.nghia !== dung.nghia && t.loaiTu === dung.loaiTu));
  const khac = xaoTron(ds.filter(t => t.id !== dung.id && t.nghia !== dung.nghia && t.loaiTu !== dung.loaiTu));
  const nhieu = [...cungLoai.slice(0, 2), ...khac].slice(0, 3);
  const dapAn = xaoTron([dung, ...nhieu]);

  const vietHan = ltTrangThai.huong === "viet-han";
  document.getElementById("quiz-de").innerText = vietHan ? "Từ nào có nghĩa là:" : "Từ này có nghĩa là gì?";
  const cauHoi = document.getElementById("quiz-question");
  cauHoi.className = vietHan ? "" : "q-hanzi";
  cauHoi.innerHTML = vietHan ? esc(dung.nghia) : `${esc(dung.hanzi)}`;
  if (!vietHan) phatAm(dung.hanzi);

  const khung = document.getElementById("quiz-options");
  khung.innerHTML = "";
  dapAn.forEach(da => {
    const nut = document.createElement("button");
    nut.className = "quiz-option" + (vietHan ? "" : " quiz-option-text");
    nut.dataset.id = da.id;
    nut.innerHTML = vietHan
      ? `<span class="quiz-hanzi">${esc(da.hanzi)}</span><span class="quiz-pinyin">${esc(da.pinyin)}</span>`
      : `<span class="quiz-meaning">${esc(da.nghia)}</span>`;
    nut.onclick = () => chonDapAn(da, dung, nut);
    khung.appendChild(nut);
  });
}

function chonDapAn(chon, dung, nut) {
  if (quizDaTraLoi) return;
  quizDaTraLoi = true;
  quizTong++;
  document.querySelectorAll("#quiz-options .quiz-option").forEach(b => {
    b.disabled = true;
    if (b.dataset.id === dung.id) b.classList.add("correct");
  });
  const msg = document.getElementById("quiz-message");
  if (chon.id === dung.id) {
    quizDiem++;
    msg.innerHTML = `✓ Chính xác! ${esc(dung.hanzi)} (${esc(dung.pinyin)}) ${nutLoa(dung.hanzi)}`;
    msg.style.color = "var(--accent-green)";
  } else {
    nut.classList.add("wrong");
    msg.innerHTML = `✗ Sai rồi! Đáp án đúng: ${esc(dung.hanzi)} (${esc(dung.pinyin)}) – ${esc(dung.nghia)} ${nutLoa(dung.hanzi)}`;
    msg.style.color = "var(--accent-red)";
  }
  capNhatDiem();
}

function cauHoiTiepTheo() { taiCauHoi(); }
