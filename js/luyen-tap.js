/* ===== LUYỆN TẬP: Viết chữ & Trắc nghiệm, lấy từ trong kho theo cấp độ ===== */

const ltTrangThai = {
  capDo: docCaiDat("lt-cap-do", "hsk1"),
  cheDo: "write",
  huong: "viet-han",   // viet-han: nghĩa → chữ Hán; han-viet: chữ Hán → nghĩa
  daKhoiTaoQuiz: false
};

function nguonLuyenTap() {
  return KHO.tuVung.filter(t => ltTrangThai.capDo === "tat-ca" || t.capDo === ltTrangThai.capDo);
}

function khoiTaoLuyenTap() {
  if (ltTrangThai.capDo !== "tat-ca" && !danhSachCapDo().includes(ltTrangThai.capDo)) ltTrangThai.capDo = "tat-ca";
  veChipLuyenTap();

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
      luuCaiDat("lt-cap-do", capDo);
      veChipLuyenTap();
      vietDaXong = 0;
      document.getElementById("progress-count").innerText = 0;
      document.getElementById("progress-fill").style.width = "0%";
      tuTiepTheo();
      if (ltTrangThai.daKhoiTaoQuiz) { quizDiem = 0; quizTong = 0; capNhatDiem(); taiCauHoi(); }
    });
}

function chonCheDo(cheDo) {
  ltTrangThai.cheDo = cheDo;
  document.getElementById("write-mode").hidden = cheDo !== "write";
  document.getElementById("quiz-mode").hidden = cheDo !== "quiz";
  document.querySelectorAll("#sub-mode-switch .mode-btn").forEach(n =>
    n.classList.toggle("sub-active", n.dataset.submode === cheDo));
  if (cheDo === "quiz" && !ltTrangThai.daKhoiTaoQuiz) {
    ltTrangThai.daKhoiTaoQuiz = true;
    taiCauHoi();
  }
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
  chu.forEach((c, i) => {
    const cot = document.createElement("div");
    cot.className = "char-column";
    const o = document.createElement("div");
    o.id = `char-${i}`;
    o.className = "char-box" + (i > 0 ? " locked" : "");
    const py = document.createElement("div");
    py.id = `pinyin-${i}`;
    py.className = "pinyin-display";
    py.innerText = t.amTiet.length === chu.length ? t.amTiet[i] : (i === chu.length - 1 ? t.pinyin : "");
    cot.appendChild(o);
    cot.appendChild(py);
    wrapper.appendChild(cot);
    butVietLT.push(HanziWriter.create(o.id, c, {
      width: 150, height: 150, padding: 10,
      showCharacter: false, showOutline: false,
      strokeAnimationSpeed: 2, delayBetweenStrokes: 50
    }));
  });
  vietChu(0);
}

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
  if (!ds.length) return;
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
  if (ds.length < 4) return;
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
