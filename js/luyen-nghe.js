/* ===== LUYỆN NGHE: Nghe chọn từ · Thanh điệu · Chép chính tả ===== */

const ngheTrangThai = {
  dang: docCaiDat("nghe-dang", "chon-tu"),     // chon-tu | thanh-dieu | chinh-ta
  chonTu: docCaiDat("nghe-chon-tu", "han"),     // han: chọn chữ Hán | nghia: chọn nghĩa
  thanhDieu: docCaiDat("nghe-thanh", "1"),      // "1" | "2" âm tiết
  chinhTa: docCaiDat("nghe-chinh-ta", "tu"),    // tu | cau
  cham: docCaiDat("nghe-cham", false),
  diem: 0, tong: 0, chuoi: 0,
  cau: null,           // câu hỏi hiện tại
  daTraLoi: false,
  daKhoiTao: false
};

/* ---------- Thanh điệu trong pinyin ---------- */
const DAU_THANH = {
  "ā":["a",1],"á":["a",2],"ǎ":["a",3],"à":["a",4],
  "ē":["e",1],"é":["e",2],"ě":["e",3],"è":["e",4],
  "ī":["i",1],"í":["i",2],"ǐ":["i",3],"ì":["i",4],
  "ō":["o",1],"ó":["o",2],"ǒ":["o",3],"ò":["o",4],
  "ū":["u",1],"ú":["u",2],"ǔ":["u",3],"ù":["u",4],
  "ǖ":["u",1],"ǘ":["u",2],"ǚ":["u",3],"ǜ":["u",4],"ü":["u",0]
};

/** Thanh của 1 âm tiết: 1–4, 0 = thanh nhẹ */
function thanhCua(amTiet) {
  for (const c of amTiet) if (DAU_THANH[c] && DAU_THANH[c][1]) return DAU_THANH[c][1];
  return 0;
}

/** Tách chuỗi pinyin (có dấu hoặc số thanh) thành { chu: "nihao", thanh: [3,3] } */
function phanTichPinyin(s) {
  let chu = "", thanh = [];
  for (const c of s.toLowerCase().normalize("NFC")) {
    if (DAU_THANH[c]) { chu += DAU_THANH[c][0]; if (DAU_THANH[c][1]) thanh.push(DAU_THANH[c][1]); }
    else if (c >= "1" && c <= "4") thanh.push(Number(c));
    else if (c === "v") chu += "u";
    else if (c >= "a" && c <= "z") chu += c;
    // bỏ qua dấu câu, khoảng trắng, số 0/5 (thanh nhẹ)
  }
  return { chu, thanh };
}

function chiChuHan(s) { return [...s].filter(laChuHan).join(""); }

/* Chữ đa âm hoặc biến điệu — đọc riêng dễ sai, bỏ khỏi bài thanh điệu */
const CHU_KHONG_DUNG = new Set([..."一不觉长还得着了过行好都地的便和为只乐重数发种教少差空正相当朝上么头子儿个们呢吗吧啊"]);

const TEN_THANH = {
  1: { ky: "ˉ", ten: "Thanh 1", mo: "ngang, cao đều" },
  2: { ky: "ˊ", ten: "Thanh 2", mo: "đi lên, gần dấu sắc" },
  3: { ky: "ˇ", ten: "Thanh 3", mo: "xuống rồi lên, gần dấu hỏi" },
  4: { ky: "ˋ", ten: "Thanh 4", mo: "rơi mạnh, dứt khoát" }
};

/* ---------- Nguồn câu hỏi ---------- */
function nguonNgheTu() { return nguonLuyenTap(); }

/** Các âm tiết đơn (chữ + pinyin) dùng cho bài thanh điệu 1 âm tiết */
function nguonAmTiet() {
  const daCo = new Set(), ds = [];
  nguonLuyenTap().forEach(t => {
    const chu = [...t.hanzi];
    if (chu.length !== t.amTiet.length) return;
    chu.forEach((c, i) => {
      const a = t.amTiet[i];
      if (!laChuHan(c) || CHU_KHONG_DUNG.has(c) || daCo.has(c) || thanhCua(a) === 0) return;
      // ưu tiên từ 1 chữ (nghĩa chính xác hơn)
      daCo.add(c);
      ds.push({ chu: c, amTiet: a, thanh: thanhCua(a), tu: chu.length === 1 ? t : null, tuGoc: t });
    });
  });
  return ds;
}

/** Từ 2 âm tiết cho bài thanh điệu 2 âm tiết (bỏ thanh nhẹ, bỏ cặp 3-3 vì biến điệu) */
function nguonHaiAmTiet() {
  return nguonLuyenTap().filter(t => {
    const chu = [...t.hanzi];
    if (chu.length !== 2 || t.amTiet.length !== 2 || !chu.every(laChuHan)) return false;
    if (chu.some(c => c === "一" || c === "不")) return false;
    const [a, b] = t.amTiet.map(thanhCua);
    return a && b && !(a === 3 && b === 3);
  });
}

/** Câu ví dụ trong ngữ pháp theo cấp độ / bài đang chọn */
function nguonCau() {
  const ds = [];
  KHO.nguPhap.forEach(b => {
    if (ltTrangThai.capDo !== "tat-ca" && b.capDo !== ltTrangThai.capDo) return;
    if (ltTrangThai.bai && String(b.bai) !== String(ltTrangThai.bai)) return;
    b.diem.forEach(d => d.viDu.forEach(v => {
      if (chiChuHan(v.cn).length >= 3 && /[ā-ǜ]/.test(v.py)) ds.push(v);
    }));
  });
  return ds;
}

function ngauNhien(ds) { return ds[Math.floor(Math.random() * ds.length)]; }

/* ---------- Khởi tạo ---------- */
function khoiTaoNghe() {
  if (ngheTrangThai.daKhoiTao) { taiCauNghe(); return; }
  ngheTrangThai.daKhoiTao = true;

  document.getElementById("nghe-dang").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    ngheTrangThai.dang = c.dataset.dang;
    luuCaiDat("nghe-dang", ngheTrangThai.dang);
    taiCauNghe();
  });
  document.getElementById("nghe-tuy-chon").addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    const khoa = { "chon-tu": "chonTu", "thanh-dieu": "thanhDieu", "chinh-ta": "chinhTa" }[ngheTrangThai.dang];
    const luu = { chonTu: "nghe-chon-tu", thanhDieu: "nghe-thanh", chinhTa: "nghe-chinh-ta" }[khoa];
    ngheTrangThai[khoa] = c.dataset.gt;
    luuCaiDat(luu, c.dataset.gt);
    taiCauNghe();
  });
  document.getElementById("nghe-phat").addEventListener("click", phatCauNghe);
  document.getElementById("nghe-cham").addEventListener("click", () => {
    ngheTrangThai.cham = !ngheTrangThai.cham;
    luuCaiDat("nghe-cham", ngheTrangThai.cham);
    capNhatNutCham();
    phatCauNghe();
  });
  document.getElementById("nghe-tiep").addEventListener("click", taiCauNghe);
  document.addEventListener("keydown", phimTatNghe);

  capNhatNutCham();
  kiemTraGiong();
  if ("speechSynthesis" in window) speechSynthesis.addEventListener?.("voiceschanged", kiemTraGiong);
  taiCauNghe();
}

function datLaiDiemNghe() {
  ngheTrangThai.diem = 0; ngheTrangThai.tong = 0; ngheTrangThai.chuoi = 0;
  capNhatDiemNghe();
}

function kiemTraGiong() {
  const co = "speechSynthesis" in window && speechSynthesis.getVoices().some(v => /^zh/i.test(v.lang));
  // getVoices có thể trả về rỗng lúc đầu, đợi một chút rồi mới cảnh báo
  setTimeout(() => {
    const coSau = "speechSynthesis" in window && speechSynthesis.getVoices().some(v => /^zh/i.test(v.lang));
    document.getElementById("nghe-canh-bao").hidden = co || coSau;
    if (!(co || coSau)) _daBaoThieuGiong = true; // đã có hộp cảnh báo, khỏi hiện thông báo nổi
  }, co ? 0 : 1200);
}

function capNhatNutCham() {
  document.getElementById("nghe-cham").classList.toggle("active", ngheTrangThai.cham);
}

function capNhatDiemNghe() {
  document.getElementById("nghe-diem").textContent = ngheTrangThai.diem;
  document.getElementById("nghe-tong").textContent = ngheTrangThai.tong;
  document.getElementById("nghe-chuoi").textContent = ngheTrangThai.chuoi;
}

function ghiKetQua(dung) {
  ngheTrangThai.tong++;
  if (dung) { ngheTrangThai.diem++; ngheTrangThai.chuoi++; }
  else ngheTrangThai.chuoi = 0;
  capNhatDiemNghe();
}

function phatCauNghe() {
  const c = ngheTrangThai.cau;
  if (!c) return;
  const nut = document.getElementById("nghe-phat");
  nut.classList.remove("playing"); void nut.offsetWidth; nut.classList.add("playing");
  phatAm(c.doc, ngheTrangThai.cham ? 0.5 : (c.tocDo || 0.8));
}

function veTuyChon(ds, dangChon) {
  document.getElementById("nghe-tuy-chon").innerHTML = ds.map(([gt, nhan]) =>
    `<button type="button" class="chip chip-sm ${gt === dangChon ? "active" : ""}" data-gt="${gt}">${nhan}</button>`).join("");
}

function thongBao(html, loai) {
  const el = document.getElementById("nghe-thong-bao");
  el.innerHTML = html;
  el.className = "listen-feedback" + (loai ? " " + loai : "");
}

/* ---------- Tạo câu hỏi ---------- */
function taiCauNghe() {
  if (!ngheTrangThai.daKhoiTao) return;
  ngheTrangThai.daTraLoi = false;
  document.querySelectorAll("#nghe-dang .chip").forEach(c =>
    c.classList.toggle("active", c.dataset.dang === ngheTrangThai.dang));
  thongBao("");

  const ham = { "chon-tu": cauChonTu, "thanh-dieu": cauThanhDieu, "chinh-ta": cauChinhTa }[ngheTrangThai.dang];
  const ok = ham();
  if (ok === false) {
    ngheTrangThai.cau = null;
    document.getElementById("nghe-noi-dung").innerHTML =
      `<div class="empty">Phạm vi đang chọn chưa đủ dữ liệu cho bài này. Hãy chọn thêm bài hoặc cấp độ khác.</div>`;
    return;
  }
  setTimeout(phatCauNghe, 250);
}

/* 1) Nghe chọn từ */
function cauChonTu() {
  veTuyChon([["han", "Chọn chữ Hán"], ["nghia", "Chọn nghĩa"]], ngheTrangThai.chonTu);
  const ds = nguonNgheTu();
  if (ds.length < 4) return false;
  const dung = ngauNhien(ds);
  const khongDau = dung._pinyin;

  // đáp án nhiễu: ưu tiên âm gần giống (cùng âm khác thanh, cùng âm đầu) để luyện tai
  const diemGiong = t => {
    if (t._pinyin === khongDau) return 3;
    if (t.amTiet.length === dung.amTiet.length && t._pinyin[0] === khongDau[0]) return 2;
    if (t.amTiet.length === dung.amTiet.length) return 1;
    return 0;
  };
  const ung = xaoTron(ds.filter(t => t.id !== dung.id && t.hanzi !== dung.hanzi && t.nghia !== dung.nghia))
    .sort((a, b) => diemGiong(b) - diemGiong(a));
  const dapAn = xaoTron([dung, ...ung.slice(0, 3)]);

  ngheTrangThai.cau = { loai: "chon-tu", doc: dung.hanzi, dung, dapAn };
  document.getElementById("nghe-goi-y").textContent =
    ngheTrangThai.chonTu === "han" ? "Nghe và chọn chữ Hán đúng" : "Nghe và chọn nghĩa đúng";

  document.getElementById("nghe-noi-dung").innerHTML = `<div class="quiz-options">` +
    dapAn.map((t, i) => `
      <button type="button" class="quiz-option ${ngheTrangThai.chonTu === "nghia" ? "quiz-option-text" : ""}" data-i="${i}">
        <span class="opt-key">${i + 1}</span>
        ${ngheTrangThai.chonTu === "han"
          ? `<span class="quiz-hanzi">${esc(t.hanzi)}</span><span class="quiz-pinyin reveal">${esc(t.pinyin)}</span>`
          : `<span class="quiz-meaning">${esc(t.nghia)}</span><span class="quiz-pinyin reveal">${esc(t.hanzi)} · ${esc(t.pinyin)}</span>`}
      </button>`).join("") + `</div>`;

  document.querySelectorAll("#nghe-noi-dung .quiz-option").forEach(n =>
    n.addEventListener("click", () => chonDapAnNghe(Number(n.dataset.i))));
}

function chonDapAnNghe(i) {
  const c = ngheTrangThai.cau;
  if (!c || c.loai !== "chon-tu" || ngheTrangThai.daTraLoi || !c.dapAn[i]) return;
  ngheTrangThai.daTraLoi = true;
  const dung = c.dapAn[i].id === c.dung.id;
  document.querySelectorAll("#nghe-noi-dung .quiz-option").forEach((n, j) => {
    n.disabled = true;
    n.classList.add("revealed");
    if (c.dapAn[j].id === c.dung.id) n.classList.add("correct");
    else if (j === i) n.classList.add("wrong");
  });
  ghiKetQua(dung);
  const t = c.dung;
  thongBao(`${dung ? "✓ Chính xác!" : "✗ Chưa đúng."} <span class="fb-word">${esc(t.hanzi)}</span> ${esc(t.pinyin)} — ${esc(t.nghia)} ${nutLoa(t.hanzi)}`,
    dung ? "ok" : "bad");
}

/* 2) Thanh điệu */
function cauThanhDieu() {
  veTuyChon([["1", "1 âm tiết"], ["2", "2 âm tiết"]], ngheTrangThai.thanhDieu);
  const nutThanh = (hang) => `<div class="tone-row" data-hang="${hang}">` +
    [1, 2, 3, 4].map(th => `
      <button type="button" class="tone-btn" data-thanh="${th}">
        <span class="tone-mark">${TEN_THANH[th].ky}</span>
        <span class="tone-name">${TEN_THANH[th].ten}</span>
        <span class="tone-desc">${TEN_THANH[th].mo}</span>
      </button>`).join("") + `</div>`;

  if (ngheTrangThai.thanhDieu === "1") {
    const ds = nguonAmTiet();
    if (ds.length < 2) return false;
    const a = ngauNhien(ds);
    ngheTrangThai.cau = { loai: "thanh-1", doc: a.chu, dapAnThanh: [a.thanh], chon: [], muc: a, tocDo: 0.7 };
    document.getElementById("nghe-goi-y").textContent = "Âm tiết này mang thanh mấy?";
    document.getElementById("nghe-noi-dung").innerHTML = nutThanh(0);
  } else {
    const ds = nguonHaiAmTiet();
    if (ds.length < 2) return false;
    const t = ngauNhien(ds);
    ngheTrangThai.cau = { loai: "thanh-2", doc: t.hanzi, dapAnThanh: t.amTiet.map(thanhCua), chon: [], muc: t, tocDo: 0.7 };
    document.getElementById("nghe-goi-y").textContent = "Chọn thanh của âm tiết thứ nhất, rồi âm tiết thứ hai";
    document.getElementById("nghe-noi-dung").innerHTML =
      `<p class="tone-label">Âm tiết 1</p>${nutThanh(0)}<p class="tone-label">Âm tiết 2</p>${nutThanh(1)}`;
  }
  document.querySelectorAll("#nghe-noi-dung .tone-btn").forEach(n =>
    n.addEventListener("click", () => chonThanh(Number(n.closest(".tone-row").dataset.hang), Number(n.dataset.thanh))));
}

function chonThanh(hang, thanh) {
  const c = ngheTrangThai.cau;
  if (!c || !c.loai.startsWith("thanh") || ngheTrangThai.daTraLoi) return;
  c.chon[hang] = thanh;
  const hangEl = document.querySelector(`#nghe-noi-dung .tone-row[data-hang="${hang}"]`);
  hangEl.querySelectorAll(".tone-btn").forEach(n => n.classList.toggle("picked", Number(n.dataset.thanh) === thanh));

  const can = c.dapAnThanh.length;
  if (c.chon.filter(Boolean).length < can) return;

  ngheTrangThai.daTraLoi = true;
  let dungHet = true;
  c.dapAnThanh.forEach((th, h) => {
    const row = document.querySelector(`#nghe-noi-dung .tone-row[data-hang="${h}"]`);
    row.querySelectorAll(".tone-btn").forEach(n => {
      n.disabled = true;
      const v = Number(n.dataset.thanh);
      if (v === th) n.classList.add("correct");
      else if (v === c.chon[h]) n.classList.add("wrong");
    });
    if (c.chon[h] !== th) dungHet = false;
  });
  ghiKetQua(dungHet);

  const m = c.muc;
  const tu = c.loai === "thanh-1" ? (m.tu || m.tuGoc) : m;
  const hien = c.loai === "thanh-1"
    ? `<span class="fb-word">${esc(m.chu)}</span> ${esc(m.amTiet)} (thanh ${m.thanh})` +
      (m.tu ? ` — ${esc(m.tu.nghia)}` : ` — có trong từ ${esc(tu.hanzi)} (${esc(tu.pinyin)}): ${esc(tu.nghia)}`)
    : `<span class="fb-word">${esc(m.hanzi)}</span> ${esc(m.pinyin)} (${c.dapAnThanh.join(" – ")}) — ${esc(m.nghia)}`;
  thongBao(`${dungHet ? "✓ Chính xác!" : "✗ Chưa đúng."} ${hien} ${nutLoa(c.doc)}`, dungHet ? "ok" : "bad");
}

/* 3) Chép chính tả */
function cauChinhTa() {
  veTuyChon([["tu", "Từ"], ["cau", "Câu"]], ngheTrangThai.chinhTa);
  let muc;
  if (ngheTrangThai.chinhTa === "tu") {
    const ds = nguonLuyenTap().filter(t => t.loaiTu !== "danh từ riêng");
    if (!ds.length) return false;
    const t = ngauNhien(ds);
    muc = { doc: t.hanzi, hanzi: t.hanzi, pinyin: t.pinyin, nghia: t.nghia };
  } else {
    const ds = nguonCau();
    if (!ds.length) return false;
    const v = ngauNhien(ds);
    muc = { doc: v.cn, hanzi: v.cn, pinyin: v.py, nghia: v.vi, tocDo: 0.75 };
  }
  ngheTrangThai.cau = { loai: "chinh-ta", ...muc };
  document.getElementById("nghe-goi-y").textContent =
    ngheTrangThai.chinhTa === "tu" ? "Nghe và gõ lại từ vừa nghe" : "Nghe và gõ lại cả câu";
  document.getElementById("nghe-noi-dung").innerHTML = `
    <div class="dictation">
      <input type="text" id="nghe-nhap" autocomplete="off" autocapitalize="off" spellcheck="false"
        placeholder="Gõ pinyin (nǐ hǎo hoặc ni3 hao3) hoặc chữ Hán">
      <div class="dictation-actions">
        <button type="button" class="btn-next" id="nghe-kiem-tra">Kiểm tra</button>
        <button type="button" class="chip" id="nghe-dap-an">Xem đáp án</button>
      </div>
      <p class="muted dictation-help">Gõ số 1–4 sau âm tiết để ghi thanh điệu (ma1 = mā). Thanh nhẹ không cần số.</p>
    </div>`;
  const o = document.getElementById("nghe-nhap");
  setTimeout(() => o.focus(), 50);
  o.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); ngheTrangThai.daTraLoi ? taiCauNghe() : kiemTraChinhTa(); }
  });
  document.getElementById("nghe-kiem-tra").onclick = kiemTraChinhTa;
  document.getElementById("nghe-dap-an").onclick = () => kiemTraChinhTa(true);
}

function kiemTraChinhTa(boCuoc) {
  const c = ngheTrangThai.cau;
  if (!c || c.loai !== "chinh-ta" || ngheTrangThai.daTraLoi) return;
  const nhap = document.getElementById("nghe-nhap").value.trim();
  if (!nhap && boCuoc !== true) { hienToast("Hãy gõ điều bạn nghe được, hoặc bấm Xem đáp án."); return; }

  let ketLuan, loai, dung = false;
  if (boCuoc === true) {
    ketLuan = "Đáp án:"; loai = "bad";
  } else if ([...nhap].some(laChuHan)) {
    dung = chiChuHan(nhap) === chiChuHan(c.hanzi);
    ketLuan = dung ? "✓ Chính xác!" : "✗ Chữ Hán chưa đúng.";
    loai = dung ? "ok" : "bad";
  } else {
    const a = phanTichPinyin(nhap), b = phanTichPinyin(c.pinyin);
    if (a.chu === b.chu && a.thanh.join() === b.thanh.join()) {
      dung = true; ketLuan = "✓ Chính xác cả âm lẫn thanh!"; loai = "ok";
    } else if (a.chu === b.chu && a.thanh.length === 0) {
      ketLuan = "◐ Đúng âm rồi! Thử ghi cả thanh điệu (số 1–4) nhé."; loai = "half";
    } else if (a.chu === b.chu) {
      ketLuan = "◐ Đúng âm nhưng sai thanh điệu."; loai = "half";
    } else {
      ketLuan = "✗ Chưa đúng."; loai = "bad";
    }
  }
  ngheTrangThai.daTraLoi = true;
  ghiKetQua(dung);
  document.getElementById("nghe-nhap").readOnly = true;
  document.getElementById("nghe-kiem-tra").disabled = true;
  document.getElementById("nghe-dap-an").disabled = true;
  thongBao(`${ketLuan}<div class="fb-answer"><span class="fb-word">${esc(c.hanzi)}</span> ${nutLoa(c.doc)}
    <div class="fb-py">${esc(c.pinyin)}</div><div class="fb-vi">${esc(c.nghia)}</div></div>`, loai);
}

/* ---------- Phím tắt ---------- */
function phimTatNghe(e) {
  if (document.getElementById("listen-mode").hidden || document.getElementById("view-luyen-tap").hidden) return;
  if (!document.getElementById("chi-tiet").hidden) return;
  const dangGo = e.target.tagName === "INPUT" || e.target.tagName === "SELECT";
  if (dangGo) return;
  if (e.key === " ") { e.preventDefault(); phatCauNghe(); return; }
  if (e.key === "Enter" && ngheTrangThai.daTraLoi) { e.preventDefault(); taiCauNghe(); return; }
  const so = Number(e.key);
  if (so >= 1 && so <= 4) {
    const c = ngheTrangThai.cau;
    if (!c) return;
    if (c.loai === "chon-tu") chonDapAnNghe(so - 1);
    else if (c.loai.startsWith("thanh")) {
      const hang = c.dapAnThanh.findIndex((_, h) => !c.chon[h]);
      if (hang >= 0) chonThanh(hang, so);
    }
  }
}
