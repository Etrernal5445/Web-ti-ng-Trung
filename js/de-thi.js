/* ===== LUYỆN ĐỀ: làm đề thi HSK theo từng phần, chấm điểm, xem lại ===== */

KHO.deThi = [];
/** Gọi từ các file data/de-thi/*.js */
function themDeThi(de) { KHO.deThi.push(de); }

const PHAN_DE = [
  { id: "n1", nhom: "nghe", ten: "Nghe · Phần 1", tu: 1, den: 10, hd: "Nghe một câu, chọn ✓ nếu câu nói khớp với tranh, ✗ nếu không khớp." },
  { id: "n2", nhom: "nghe", ten: "Nghe · Phần 2", tu: 11, den: 20, hd: "Nghe đoạn hội thoại, chọn tranh phù hợp." },
  { id: "n3", nhom: "nghe", ten: "Nghe · Phần 3", tu: 21, den: 30, hd: "Nghe hội thoại ngắn và câu hỏi, chọn đáp án đúng." },
  { id: "n4", nhom: "nghe", ten: "Nghe · Phần 4", tu: 31, den: 35, hd: "Nghe hội thoại dài hơn và câu hỏi, chọn đáp án đúng." },
  { id: "d1", nhom: "doc", ten: "Đọc · Phần 1", tu: 36, den: 40, hd: "Chọn tranh phù hợp với mỗi câu." },
  { id: "d2", nhom: "doc", ten: "Đọc · Phần 2", tu: 41, den: 45, hd: "Chọn từ thích hợp điền vào chỗ trống." },
  { id: "d3", nhom: "doc", ten: "Đọc · Phần 3", tu: 46, den: 50, hd: "Đọc đoạn văn, cho biết câu có dấu ★ đúng (✓) hay sai (✗)." },
  { id: "d4", nhom: "doc", ten: "Đọc · Phần 4", tu: 51, den: 60, hd: "Chọn câu trả lời hoặc câu nối tiếp phù hợp." }
];
const THOI_GIAN_THI = 50 * 60;   // nghe ~25 phút + 3 phút điền + đọc 22 phút
const DIEM_DAT = 120;

const dt = {
  de: null,          // đề đang làm
  cheDo: "thi",      // "thi" (thi thử) | "luyen" (luyện tập: xem đáp án ngay) | "xem" (xem lại sau khi nộp)
  traLoi: {},        // { số câu: đáp án đã chọn }
  danhDau: [],       // câu đánh dấu xem lại
  phan: 0,           // chỉ số phần đang xem
  conLai: THOI_GIAN_THI,
  hen: null,         // setInterval đồng hồ
  pinyin: docCaiDat("dt-pinyin", true),
  tuTheo: docCaiDat("dt-tu-theo", true),
  cuonLuc: 0,        // lần cuối người dùng tự cuộn
  cauNghe: 0         // câu nghe đang phát
};

/* ---------- Lưu trữ ---------- */
const khoaDangLam = id => `dethi:${id}:dang-lam`;
const khoaLichSu = id => `dethi:${id}:lich-su`;
function docLichSu(id) { return docCaiDat(khoaLichSu(id), []); }
function luuDangLam() {
  if (!dt.de || dt.cheDo === "xem") return;
  luuCaiDat(khoaDangLam(dt.de.id), {
    cheDo: dt.cheDo, traLoi: dt.traLoi, danhDau: dt.danhDau, phan: dt.phan, conLai: dt.conLai
  });
}
function xoaDangLam(id) { try { localStorage.removeItem("httq:" + khoaDangLam(id)); } catch (e) {} }

/* ---------- Tiện ích ---------- */
const cauTheoSo = so => dt.de.cau.find(c => c.so === so);
const phanCuaCau = so => PHAN_DE.findIndex(p => so >= p.tu && so <= p.den);
function dinhDangGio(giay) {
  giay = Math.max(0, Math.round(giay));
  const m = Math.floor(giay / 60), s = giay % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function pyHtml(py) { return py ? `<span class="dt-py">${esc(py)}</span>` : ""; }
/** Chữ Hán + pinyin (pinyin ẩn/hiện theo nút 拼音) */
function chuPy(t, py, lop = "") {
  return `<span class="dt-text ${lop}">${pyHtml(py)}<span class="dt-han">${esc(t).replace(/\n/g, "<br>")}</span></span>`;
}

function chamDiem(de, traLoi) {
  let nghe = 0, doc = 0;
  const theoPhan = PHAN_DE.map(() => ({ dung: 0, tong: 0 }));
  de.cau.forEach(c => {
    const p = phanCuaCau(c.so), dung = traLoi[c.so] === c.da;
    theoPhan[p].tong++;
    if (dung) { theoPhan[p].dung++; if (c.so <= 35) nghe++; else doc++; }
  });
  const diemNghe = Math.round(nghe / 35 * 100), diemDoc = Math.round(doc / 25 * 100);
  return { nghe, doc, diemNghe, diemDoc, tong: diemNghe + diemDoc, theoPhan };
}

/* =====================================================================
   DANH SÁCH ĐỀ
   ===================================================================== */
function khoiTaoDeThi() {
  document.getElementById("dt-ds").addEventListener("click", e => {
    const the = e.target.closest("[data-de]");
    if (the) moHopChonCheDo(the.dataset.de);
  });
  document.getElementById("dt-hop").addEventListener("click", e => {
    if (e.target.id === "dt-hop" || e.target.closest("[data-dong]")) { dongHop(); return; }
    const n = e.target.closest("[data-bat-dau]");
    if (n) { dongHop(); batDauDe(n.dataset.de, n.dataset.batDau); }
  });

  // thanh làm bài
  document.getElementById("dt-thoat").onclick = thoatDe;
  document.getElementById("dt-nop").onclick = () => dt.cheDo === "xem" ? veKetQua() : xacNhanNop();
  document.getElementById("dt-nut-py").onclick = () => {
    dt.pinyin = !dt.pinyin; luuCaiDat("dt-pinyin", dt.pinyin); capNhatPinyin();
  };
  document.getElementById("dt-truoc").onclick = () => chuyenPhan(dt.phan - 1);
  document.getElementById("dt-sau").onclick = () => chuyenPhan(dt.phan + 1);
  document.getElementById("dt-mo-bang").onclick = moBangCau;
  document.getElementById("dt-bang").addEventListener("click", e => {
    if (e.target.id === "dt-bang" || e.target.closest("[data-dong]")) { dongBang(); return; }
    const o = e.target.closest("[data-den]");
    if (o) { dongBang(); denCau(Number(o.dataset.den)); }
  });
  document.getElementById("dt-phan").addEventListener("click", e => {
    const c = e.target.closest("[data-phan]");
    if (c) chuyenPhan(Number(c.dataset.phan));
  });
  document.getElementById("dt-noi-dung").addEventListener("click", xuLyBamCau);
  document.getElementById("dt-ket-qua").addEventListener("click", e => {
    const n = e.target.closest("[data-hanh-dong]");
    if (!n) return;
    const hd = n.dataset.hanhDong;
    if (hd === "xem") batDauXemLai();
    if (hd === "lam-lai") batDauDe(dt.de.id, "thi-moi");
    if (hd === "luyen") batDauDe(dt.de.id, "luyen-moi");
    if (hd === "ds") thoatDe();
  });
  window.addEventListener("scroll", () => { dt.cuonLuc = Date.now(); }, { passive: true });
  khoiTaoTrinhPhat();
  veDanhSachDe();
}

function veDanhSachDe() {
  const khung = document.getElementById("dt-ds");
  if (!KHO.deThi.length) { khung.innerHTML = `<div class="empty">Chưa có đề nào.</div>`; return; }
  khung.innerHTML = KHO.deThi.map(de => {
    const ls = docLichSu(de.id);
    const dang = docCaiDat(khoaDangLam(de.id), null);
    const cao = ls.reduce((m, l) => Math.max(m, l.tong), -1);
    let trangThai = `<span class="dt-tt">Chưa làm</span>`;
    if (cao >= 0) trangThai = `<span class="dt-tt ${cao >= DIEM_DAT ? "dat" : "truot"}">Cao nhất ${cao}/200</span>`;
    const dangLam = dang ? `<span class="dt-dang">⏸ Đang làm ${Object.keys(dang.traLoi || {}).length}/60</span>` : "";
    return `
      <button type="button" class="dt-card" data-de="${esc(de.id)}">
        <span class="dt-card-so">${String(de.so).padStart(2, "0")}</span>
        <span class="dt-card-body">
          <span class="dt-card-ten">Đề ${String(de.so).padStart(2, "0")}</span>
          <span class="dt-card-ma">${esc(de.ma)} · ${ls.length} lần làm</span>
          ${trangThai}${dangLam}
        </span>
      </button>`;
  }).join("");
}

function moHopChonCheDo(id) {
  const de = KHO.deThi.find(d => d.id === id);
  const dang = docCaiDat(khoaDangLam(id), null);
  const ls = docLichSu(id).slice(-5).reverse();
  document.getElementById("dt-hop-noi-dung").innerHTML = `
    <h3>Đề ${String(de.so).padStart(2, "0")} <small>${esc(de.ma)}</small></h3>
    <p class="muted">60 câu · Nghe 35 câu, Đọc 25 câu · Đạt từ ${DIEM_DAT}/200 điểm</p>
    ${dang ? `<button type="button" class="dt-mode tiep" data-bat-dau="tiep" data-de="${esc(id)}">
        <b>▶ Làm tiếp</b><span>${dang.cheDo === "thi" ? "Thi thử" : "Luyện tập"} · đã làm ${Object.keys(dang.traLoi || {}).length}/60 câu${dang.cheDo === "thi" ? ` · còn ${dinhDangGio(dang.conLai)}` : ""}</span></button>` : ""}
    <button type="button" class="dt-mode" data-bat-dau="thi-moi" data-de="${esc(id)}">
      <b>⏱ Thi thử</b><span>Tính giờ ${THOI_GIAN_THI / 60} phút, nộp bài mới xem đáp án — giống thi thật.</span></button>
    <button type="button" class="dt-mode" data-bat-dau="luyen-moi" data-de="${esc(id)}">
      <b>🎯 Luyện tập</b><span>Không tính giờ, xem đáp án và lời thoại ngay sau mỗi câu, nghe lại từng câu.</span></button>
    ${ls.length ? `<div class="dt-lich-su"><h4>Lần làm gần đây</h4>${ls.map(l => `
      <div class="dt-ls-dong"><span>${new Date(l.ngay).toLocaleDateString("vi-VN")} · ${l.cheDo === "thi" ? "Thi thử" : "Luyện tập"}</span>
      <b class="${l.tong >= DIEM_DAT ? "dat" : "truot"}">${l.tong}/200</b></div>`).join("")}</div>` : ""}
    <button type="button" class="chip dt-hop-dong" data-dong>Đóng</button>`;
  document.getElementById("dt-hop").hidden = false;
}
function dongHop() { document.getElementById("dt-hop").hidden = true; }

/* =====================================================================
   LÀM BÀI
   ===================================================================== */
function batDauDe(id, kieu) {
  const de = KHO.deThi.find(d => d.id === id);
  if (!de) return;
  if (kieu !== "tiep" && docCaiDat(khoaDangLam(id), null) && !confirm("Bài đang làm dở của đề này sẽ bị xoá. Bắt đầu lại?")) return;
  dt.de = de;
  dt.cauNghe = 0;
  if (kieu === "tiep") {
    const s = docCaiDat(khoaDangLam(id), {});
    dt.cheDo = s.cheDo || "thi"; dt.traLoi = s.traLoi || {}; dt.danhDau = s.danhDau || [];
    dt.phan = s.phan || 0; dt.conLai = s.conLai ?? THOI_GIAN_THI;
  } else {
    dt.cheDo = kieu === "luyen-moi" ? "luyen" : "thi";
    dt.traLoi = {}; dt.danhDau = []; dt.phan = 0; dt.conLai = THOI_GIAN_THI;
  }
  moManLamBai();
  luuDangLam();
}

function batDauXemLai() {
  dt.cheDo = "xem"; dt.phan = 0;
  moManLamBai();
}

function moManLamBai() {
  document.body.classList.add("dang-lam-de");
  document.getElementById("dt-man-ds").hidden = true;
  document.getElementById("dt-ket-qua").hidden = true;
  document.getElementById("dt-man-bai").hidden = false;
  document.getElementById("dt-ten").textContent = `Đề ${String(dt.de.so).padStart(2, "0")}`;
  document.getElementById("dt-che-do").textContent =
    { thi: "Thi thử", luyen: "Luyện tập", xem: "Xem lại" }[dt.cheDo];
  document.getElementById("dt-nop").textContent = dt.cheDo === "xem" ? "Kết quả" : "Nộp bài";
  const audio = document.getElementById("dt-audio");
  if (audio.dataset.src !== dt.de.amThanh) {
    audio.src = dt.de.amThanh; audio.dataset.src = dt.de.amThanh;
  }
  capNhatPinyin();
  batDongHo();
  chuyenPhan(dt.phan, true);
}

/** Đo chiều cao thanh trên + thanh phần để các khối dính (sticky) xếp đúng chỗ */
function doViTriDinh() {
  const man = document.getElementById("dt-man-bai");
  if (man.hidden) return;
  const h1 = document.querySelector(".dt-thanh-tren").offsetHeight;
  const h2 = document.getElementById("dt-phan").offsetHeight;
  const tp = document.getElementById("dt-trinh-phat");
  const h3 = tp.hidden ? 0 : tp.offsetHeight + 12;
  man.style.setProperty("--dt-h1", h1 + "px");
  man.style.setProperty("--dt-h2", h2 + "px");
  man.style.setProperty("--dt-h3", h3 + "px");
}
window.addEventListener("resize", () => doViTriDinh());

function thoatDe() {
  dungDongHo();
  luuDangLam();
  const audio = document.getElementById("dt-audio");
  audio.pause();
  document.body.classList.remove("dang-lam-de");
  document.getElementById("dt-man-bai").hidden = true;
  document.getElementById("dt-ket-qua").hidden = true;
  document.getElementById("dt-man-ds").hidden = false;
  dt.de = null;
  veDanhSachDe();
  window.scrollTo(0, 0);
}

/* ---------- Đồng hồ ---------- */
function batDongHo() {
  dungDongHo();
  const el = document.getElementById("dt-gio");
  if (dt.cheDo !== "thi") { el.hidden = true; return; }
  el.hidden = false;
  const ve = () => {
    el.textContent = "⏱ " + dinhDangGio(dt.conLai);
    el.classList.toggle("sap-het", dt.conLai <= 300);
  };
  ve();
  dt.hen = setInterval(() => {
    if (document.hidden) return;
    dt.conLai--; ve();
    if (dt.conLai % 15 === 0) luuDangLam();
    if (dt.conLai <= 0) { dungDongHo(); hienToast("Hết giờ! Bài làm đã được nộp."); nopBai(); }
  }, 1000);
}
function dungDongHo() { clearInterval(dt.hen); dt.hen = null; }

/* ---------- Vẽ một phần ---------- */
function chuyenPhan(i, khongCuon) {
  if (i < 0 || i >= PHAN_DE.length) return;
  dt.phan = i;
  const p = PHAN_DE[i];
  document.getElementById("dt-phan").innerHTML = PHAN_DE.map((x, k) => {
    const daLam = dt.de.cau.filter(c => c.so >= x.tu && c.so <= x.den && dt.traLoi[c.so] != null).length;
    return `<button type="button" class="dt-tab ${k === i ? "active" : ""} ${x.nhom}" data-phan="${k}">
      ${x.nhom === "nghe" ? "🎧" : "📖"} ${k % 4 + 1}<small>${daLam}/${x.den - x.tu + 1}</small></button>`;
  }).join("");
  document.querySelector(`#dt-phan [data-phan="${i}"]`).scrollIntoView({ block: "nearest", inline: "center" });

  document.getElementById("dt-trinh-phat").hidden = p.nhom !== "nghe";
  document.getElementById("dt-truoc").disabled = i === 0;
  document.getElementById("dt-sau").textContent = i === PHAN_DE.length - 1
    ? (dt.cheDo === "xem" ? "Kết quả" : "Nộp bài") : "Tiếp ›";
  document.getElementById("dt-sau").onclick = i === PHAN_DE.length - 1
    ? () => (dt.cheDo === "xem" ? veKetQua() : xacNhanNop())
    : () => chuyenPhan(dt.phan + 1);

  const cau = dt.de.cau.filter(c => c.so >= p.tu && c.so <= p.den);
  let html = `<div class="dt-phan-dau"><h2>${p.ten}</h2><p>${p.hd}</p></div>`;
  let nhomDaVe = null;
  cau.forEach(c => {
    if (c.nhom && c.nhom !== nhomDaVe) { html += veNhomDe(c.nhom); nhomDaVe = c.nhom; }
    html += veCau(c);
  });
  document.getElementById("dt-noi-dung").innerHTML = html;
  capNhatBoDem();
  luuDangLam();
  doViTriDinh();
  if (!khongCuon) window.scrollTo({ top: 0 });
}

function veNhomDe(id) {
  const g = dt.de.nhom[id];
  const ten = id.startsWith("n") || id.startsWith("d") ? `Câu ${g.tu}–${g.den}` : "";
  if (g.loai === "anh") {
    return `<div class="dt-nhom" id="dt-nhom-${id}"><div class="dt-nhom-ten">${ten}</div><div class="dt-luoi-anh">` +
      Object.entries(g.lc).map(([k, src]) => `
        <figure class="dt-anh-lc ${k === g.vd ? "vd" : ""}">
          <span class="dt-nhan">${k}${k === g.vd ? " · VD" : ""}</span>
          <img src="${esc(src)}" alt="Tranh ${k}" loading="lazy">
        </figure>`).join("") + `</div></div>`;
  }
  if (g.loai === "tu") {
    return `<div class="dt-nhom dt-nhom-dinh" id="dt-nhom-${id}"><div class="dt-nhom-ten">${ten} · Chọn từ</div><div class="dt-tu-bank">` +
      Object.entries(g.lc).map(([k, o]) => `
        <span class="dt-tu ${k === g.vd ? "vd" : ""}"><b>${k}</b>${chuPy(o.t, o.py)}</span>`).join("") + `</div></div>`;
  }
  // loại "cau": các câu A–F để chọn
  return `<div class="dt-nhom" id="dt-nhom-${id}"><div class="dt-nhom-ten">${ten} · Các câu để chọn</div><div class="dt-cau-lc">` +
    Object.entries(g.lc).map(([k, o]) => `
      <div class="dt-cau-lc-dong ${k === g.vd ? "vd" : ""}"><b>${k}</b>${chuPy(o.t, o.py)}${k === g.vd ? `<em>VD</em>` : ""}</div>`).join("") +
    `</div></div>`;
}

function trangThaiNut(c, gt) {
  const chon = dt.traLoi[c.so] === gt;
  const lo = dt.cheDo === "xem" || (dt.cheDo === "luyen" && dt.traLoi[c.so] != null);
  let lop = chon ? "chon" : "";
  if (lo) {
    if (gt === c.da) lop += " dung";
    else if (chon) lop += " sai";
  }
  return { lop, khoa: lo };
}

function veCau(c) {
  const daTra = dt.traLoi[c.so] != null;
  const lo = dt.cheDo === "xem" || (dt.cheDo === "luyen" && daTra);
  const dung = dt.traLoi[c.so] === c.da;
  const coDanhDau = dt.danhDau.includes(c.so);
  let than = "", nut = "";

  const nutDS = () => ["√", "×"].map(v => {
    const s = trangThaiNut(c, v);
    return `<button type="button" class="dt-nut dt-ds ${s.lop}" data-so="${c.so}" data-gt="${v}" ${s.khoa ? "disabled" : ""}>
      ${v === "√" ? "✓ Đúng" : "✗ Sai"}</button>`;
  }).join("");
  // nút chọn trong nhóm: tranh nhỏ (nhóm tranh), chữ (nhóm từ), câu rút gọn (nhóm câu)
  const nutChu = (ds, g) => ds.map(k => {
    const s = trangThaiNut(c, k);
    let ruot = k;
    if (g.loai === "anh") ruot = `<img src="${esc(g.lc[k])}" alt="" loading="lazy"><b>${k}</b>`;
    else if (g.loai === "tu") ruot = `<b>${k}</b><span class="dt-han">${esc(g.lc[k].t)}</span>`;
    else ruot = `<b>${k}</b><span class="dt-han">${esc(g.lc[k].t)}</span>`;
    return `<button type="button" class="dt-nut dt-chu dt-chu-${g.loai} ${s.lop}" data-so="${c.so}" data-gt="${k}" ${s.khoa ? "disabled" : ""}>${ruot}</button>`;
  }).join("");

  if (c.kieu === "ds-anh") {
    than = `<img class="dt-anh-cau" src="${esc(c.anh)}" alt="Tranh câu ${c.so}" loading="lazy">`;
    nut = `<div class="dt-hang-nut hai">${nutDS()}</div>`;
  } else if (c.kieu === "abc") {
    nut = `<div class="dt-abc">` + c.lc.map((o, k) => {
      const L = "ABC"[k], s = trangThaiNut(c, L);
      return `<button type="button" class="dt-nut dt-abc-nut ${s.lop}" data-so="${c.so}" data-gt="${L}" ${s.khoa ? "disabled" : ""}>
        <b>${L}</b>${chuPy(o.t, o.py)}</button>`;
    }).join("") + `</div>`;
  } else if (c.kieu === "ds-cau") {
    than = `<div class="dt-doan">${chuPy(c.t, c.py)}</div><div class="dt-sao">★ ${chuPy(c.kd, c.kdPy)}</div>`;
    nut = `<div class="dt-hang-nut hai">${nutDS()}</div>`;
  } else if (c.nhom) {
    const g = dt.de.nhom[c.nhom];
    const ds = Object.keys(g.lc).filter(k => k !== g.vd);
    if (c.t) {
      let t = c.t;
      if (g.loai === "tu") {
        const chon = dt.traLoi[c.so];
        const dien = chon ? g.lc[chon].t : "＿＿";
        t = t.replace(/（\s*）|\(\s*\)/, `（${dien}）`);
      }
      than = `<div class="dt-doan">${chuPy(t, c.py)}</div>`;
    }
    nut = `<div class="dt-hang-nut chu chu-${g.loai}">${nutChu(ds, g)}</div>`;
  }

  // phần nghe: nút nghe lại + lời thoại khi đã có đáp án
  let them = "";
  if (c.so <= 35) {
    const nghe = dt.cheDo !== "thi" && c.moc != null
      ? `<button type="button" class="chip chip-sm dt-nghe-cau" data-nghe="${c.so}">▶ Nghe câu này</button>` : "";
    const lt = lo && c.lt
      ? `<details class="dt-lt" ${dt.cheDo === "luyen" ? "open" : ""}><summary>Lời thoại${dt.de.loiThoaiTuDong ? " (chép tự động)" : ""}</summary><div class="dt-han">${esc(c.lt).replace(/\n/g, "<br>")}</div></details>` : "";
    them = nghe || lt ? `<div class="dt-them">${nghe}${lt}</div>` : "";
  }
  const ketQua = lo
    ? `<div class="dt-kq ${dung ? "dung" : "sai"}">${dung ? "✓ Đúng" : daTra ? `✗ Sai — đáp án: <b>${hienDapAn(c, c.da)}</b>` : `Chưa làm — đáp án: <b>${hienDapAn(c, c.da)}</b>`}</div>` : "";

  return `
    <section class="dt-cau ${daTra ? "da-lam" : ""} ${coDanhDau ? "danh-dau" : ""} ${lo ? (dung ? "kq-dung" : "kq-sai") : ""}" id="dt-cau-${c.so}" data-cau="${c.so}">
      <header class="dt-cau-dau">
        <span class="dt-so">${c.so}</span>
        <button type="button" class="dt-co" data-co="${c.so}" title="Đánh dấu xem lại" aria-label="Đánh dấu xem lại">${coDanhDau ? "⚑" : "⚐"}</button>
      </header>
      ${than}${nut}${ketQua}${them}
    </section>`;
}

function hienDapAn(c, gt) {
  if (gt === "√") return "✓ Đúng";
  if (gt === "×") return "✗ Sai";
  if (c.kieu === "abc") return `${gt}. ${esc(c.lc["ABC".indexOf(gt)].t)}`;
  const g = c.nhom && dt.de.nhom[c.nhom];
  if (g && g.loai !== "anh") return `${gt}. ${esc(g.lc[gt].t)}`;
  return gt;
}

function xuLyBamCau(e) {
  const nghe = e.target.closest("[data-nghe]");
  if (nghe) { ngheCau(Number(nghe.dataset.nghe)); return; }
  const co = e.target.closest("[data-co]");
  if (co) {
    const so = Number(co.dataset.co);
    dt.danhDau = dt.danhDau.includes(so) ? dt.danhDau.filter(x => x !== so) : [...dt.danhDau, so];
    const the = document.getElementById("dt-cau-" + so);
    the.classList.toggle("danh-dau"); co.textContent = dt.danhDau.includes(so) ? "⚑" : "⚐";
    luuDangLam();
    return;
  }
  const nut = e.target.closest(".dt-nut");
  if (!nut || nut.disabled || dt.cheDo === "xem") return;
  const so = Number(nut.dataset.so), gt = nut.dataset.gt;
  if (dt.cheDo === "luyen" && dt.traLoi[so] != null) return;
  dt.traLoi[so] = dt.traLoi[so] === gt && dt.cheDo === "thi" ? undefined : gt;  // bấm lại để bỏ chọn (thi thử)
  if (dt.traLoi[so] === undefined) delete dt.traLoi[so];
  const c = cauTheoSo(so);
  const cu = document.getElementById("dt-cau-" + so);
  cu.outerHTML = veCau(c);
  capNhatBoDem();
  luuDangLam();
  if (dt.cheDo === "luyen") {
    if (navigator.vibrate) navigator.vibrate(dt.traLoi[so] === c.da ? 15 : [30, 40, 30]);
  }
}

function capNhatBoDem() {
  const n = Object.keys(dt.traLoi).length;
  document.getElementById("dt-mo-bang").innerHTML = `<b>${n}</b>/60 câu`;
  const p = PHAN_DE[dt.phan];
  const tab = document.querySelector(`#dt-phan [data-phan="${dt.phan}"] small`);
  if (tab) tab.textContent = `${dt.de.cau.filter(c => c.so >= p.tu && c.so <= p.den && dt.traLoi[c.so] != null).length}/${p.den - p.tu + 1}`;
}

function capNhatPinyin() {
  document.getElementById("dt-man-bai").classList.toggle("an-pinyin", !dt.pinyin);
  document.getElementById("dt-nut-py").classList.toggle("active", dt.pinyin);
}

function denCau(so) {
  const p = phanCuaCau(so);
  if (p !== dt.phan) chuyenPhan(p, true);
  const el = document.getElementById("dt-cau-" + so);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("nhay"); setTimeout(() => el.classList.remove("nhay"), 1200);
  }
}

/* ---------- Bảng câu hỏi ---------- */
function moBangCau() {
  const o = so => {
    const c = cauTheoSo(so);
    let lop = dt.traLoi[so] != null ? "da" : "";
    if (dt.cheDo === "xem" || (dt.cheDo === "luyen" && dt.traLoi[so] != null)) lop = dt.traLoi[so] === c.da ? "dung" : "sai";
    if (dt.danhDau.includes(so)) lop += " co";
    return `<button type="button" class="dt-o ${lop}" data-den="${so}">${so}</button>`;
  };
  document.getElementById("dt-bang-noi-dung").innerHTML = `
    <div class="dt-bang-dau"><h3>Bảng câu hỏi</h3><button type="button" class="icon-btn" data-dong>✕</button></div>
    <div class="dt-chu-thich"><span class="dt-o da"></span>Đã làm <span class="dt-o"></span>Chưa làm <span class="dt-o co"></span>Đánh dấu
      ${dt.cheDo !== "thi" ? `<span class="dt-o dung"></span>Đúng <span class="dt-o sai"></span>Sai` : ""}</div>` +
    PHAN_DE.map(p => `<h4>${p.ten}</h4><div class="dt-luoi-o">${Array.from({ length: p.den - p.tu + 1 }, (_, k) => o(p.tu + k)).join("")}</div>`).join("") +
    (dt.cheDo === "xem" ? "" : `<button type="button" class="btn-next dt-bang-nop" onclick="dongBang();xacNhanNop()">Nộp bài</button>`);
  document.getElementById("dt-bang").hidden = false;
}
function dongBang() { document.getElementById("dt-bang").hidden = true; }

/* ---------- Nộp bài & kết quả ---------- */
function xacNhanNop() {
  const thieu = 60 - Object.keys(dt.traLoi).length;
  const loi = thieu > 0 ? `Bạn còn ${thieu} câu chưa làm. Vẫn nộp bài?` : "Nộp bài và xem kết quả?";
  if (confirm(loi)) nopBai();
}

function nopBai() {
  dungDongHo();
  document.getElementById("dt-audio").pause();
  const kq = chamDiem(dt.de, dt.traLoi);
  const ls = docLichSu(dt.de.id);
  ls.push({
    ngay: Date.now(), cheDo: dt.cheDo, tong: kq.tong, diemNghe: kq.diemNghe, diemDoc: kq.diemDoc,
    thoiGian: dt.cheDo === "thi" ? THOI_GIAN_THI - dt.conLai : null, traLoi: dt.traLoi
  });
  luuCaiDat(khoaLichSu(dt.de.id), ls.slice(-20));
  xoaDangLam(dt.de.id);
  dt.cheDo = "xem";
  veKetQua();
}

function veKetQua() {
  const kq = chamDiem(dt.de, dt.traLoi);
  const ls = docLichSu(dt.de.id);
  const lan = ls[ls.length - 1];
  const dat = kq.tong >= DIEM_DAT;
  const pct = Math.round(kq.tong / 200 * 100);
  document.getElementById("dt-man-bai").hidden = true;
  const khung = document.getElementById("dt-ket-qua");
  khung.hidden = false;
  khung.innerHTML = `
    <div class="game-board dt-kq-the">
      <p class="muted">Đề ${String(dt.de.so).padStart(2, "0")} · ${esc(dt.de.ma)}</p>
      <div class="dt-vong ${dat ? "dat" : "truot"}" style="--pct:${pct}">
        <div><b>${kq.tong}</b><span>/200</span></div>
      </div>
      <p class="dt-kq-loi ${dat ? "dat" : "truot"}">${dat ? "🎉 Đạt! (từ 120 điểm)" : `Chưa đạt — cần thêm ${DIEM_DAT - kq.tong} điểm`}</p>
      <div class="dt-kq-hai">
        <div><span>🎧 Nghe</span><b>${kq.diemNghe}</b><small>${kq.nghe}/35 câu đúng</small></div>
        <div><span>📖 Đọc</span><b>${kq.diemDoc}</b><small>${kq.doc}/25 câu đúng</small></div>
      </div>
      ${lan && lan.thoiGian ? `<p class="muted">Thời gian làm: ${dinhDangGio(lan.thoiGian)}</p>` : ""}
      <div class="dt-kq-phan">
        ${PHAN_DE.map((p, i) => {
          const x = kq.theoPhan[i], tl = x.tong ? x.dung / x.tong : 0;
          return `<div class="dt-kq-dong"><span>${p.ten}</span>
            <div class="dt-thanh"><i style="width:${tl * 100}%"></i></div><b>${x.dung}/${x.tong}</b></div>`;
        }).join("")}
      </div>
      <div class="dt-kq-nut">
        <button type="button" class="btn-next" data-hanh-dong="xem">🔍 Xem lại bài làm</button>
        <button type="button" class="btn-skill" data-hanh-dong="lam-lai">↻ Thi lại</button>
        <button type="button" class="chip" data-hanh-dong="luyen">🎯 Luyện tập đề này</button>
        <button type="button" class="chip" data-hanh-dong="ds">← Danh sách đề</button>
      </div>
    </div>`;
  window.scrollTo(0, 0);
}

/* =====================================================================
   TRÌNH PHÁT FILE NGHE
   ===================================================================== */
function khoiTaoTrinhPhat() {
  const a = document.getElementById("dt-audio");
  const nut = document.getElementById("dt-play");
  const thanh = document.getElementById("dt-tua");
  const gio = document.getElementById("dt-tg");
  const tocDo = document.getElementById("dt-toc-do");
  let dangKeo = false;

  nut.onclick = () => (a.paused ? a.play() : a.pause());
  a.addEventListener("play", () => { nut.textContent = "⏸"; nut.classList.add("dang-phat"); });
  a.addEventListener("pause", () => { nut.textContent = "▶"; nut.classList.remove("dang-phat"); });
  a.addEventListener("loadedmetadata", () => { thanh.max = a.duration || 0; veGio(); });
  a.addEventListener("timeupdate", () => {
    if (!dangKeo) thanh.value = a.currentTime;
    veGio(); theoDoiCauNghe();
  });
  function veGio() { gio.textContent = `${dinhDangGio(a.currentTime)} / ${dinhDangGio(a.duration || 0)}`; }
  thanh.addEventListener("input", () => { dangKeo = true; gio.textContent = `${dinhDangGio(thanh.value)} / ${dinhDangGio(a.duration || 0)}`; });
  thanh.addEventListener("change", () => { a.currentTime = Number(thanh.value); dangKeo = false; });
  document.getElementById("dt-lui").onclick = () => { a.currentTime = Math.max(0, a.currentTime - 5); };
  const tocs = [1, 1.25, 0.75];
  tocDo.onclick = () => {
    const i = (tocs.indexOf(a.playbackRate) + 1) % tocs.length;
    a.playbackRate = tocs[i]; tocDo.textContent = tocs[i] + "×";
  };
  document.getElementById("dt-tu-theo").checked = dt.tuTheo;
  document.getElementById("dt-tu-theo").onchange = e => { dt.tuTheo = e.target.checked; luuCaiDat("dt-tu-theo", dt.tuTheo); };
}

/** Phát từ mốc thời gian của 1 câu nghe */
function ngheCau(so) {
  const c = cauTheoSo(so), a = document.getElementById("dt-audio");
  if (!c || c.moc == null) return;
  a.currentTime = Math.max(0, c.moc - 0.3);
  a.play();
}

/** Đang phát tới câu nào → tô sáng, tự chuyển phần/cuộn tới câu đó */
function theoDoiCauNghe() {
  if (!dt.de) return;
  const t = document.getElementById("dt-audio").currentTime;
  let hienTai = 0;
  dt.de.cau.forEach(c => { if (c.so <= 35 && c.moc != null && c.moc <= t + 0.2) hienTai = c.so; });
  if (hienTai === dt.cauNghe) return;
  document.querySelectorAll(".dt-cau.dang-nghe").forEach(x => x.classList.remove("dang-nghe"));
  dt.cauNghe = hienTai;
  document.getElementById("dt-cau-nghe").textContent = hienTai ? `Đang đọc câu ${hienTai}` : "Phần giới thiệu";
  if (!hienTai) return;
  const el = document.getElementById("dt-cau-" + hienTai);
  if (el) el.classList.add("dang-nghe");
  if (!dt.tuTheo || document.getElementById("dt-audio").paused) return;
  if (Date.now() - dt.cuonLuc < 4000 && el) return;   // người dùng vừa tự cuộn, không giành lại
  const p = phanCuaCau(hienTai);
  if (p !== dt.phan) chuyenPhan(p, true);
  const el2 = document.getElementById("dt-cau-" + hienTai);
  if (el2) {
    el2.classList.add("dang-nghe");
    el2.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => { dt.cuonLuc = 0; }, 900);   // cuộn do trang tự làm, không tính là người dùng cuộn
  }
}
