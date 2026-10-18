/* ===== KHO TỪ VỰNG: tìm kiếm, bộ lọc, danh sách / thẻ lật, chi tiết từ ===== */

const tvTrangThai = {
  capDo: docCaiDat("tv-cap-do", "tat-ca"),
  bai: "",
  chuDe: "",
  kieu: docCaiDat("tv-kieu", "danh-sach"),
  tim: "",
  ketQua: []          // danh sách đang hiển thị (dùng cho nút ‹ › trong chi tiết)
};

function khoiTaoTuVung() {
  if (tvTrangThai.capDo !== "tat-ca" && !danhSachCapDo().includes(tvTrangThai.capDo)) {
    tvTrangThai.capDo = "tat-ca";
  }

  let hen;
  document.getElementById("tv-tim").addEventListener("input", e => {
    clearTimeout(hen);
    hen = setTimeout(() => { tvTrangThai.tim = e.target.value; veTuVung(); }, 150);
  });
  document.getElementById("tv-bai").addEventListener("change", e => {
    tvTrangThai.bai = e.target.value; veTuVung();
  });
  document.getElementById("tv-chu-de").addEventListener("change", e => {
    tvTrangThai.chuDe = e.target.value; veTuVung();
  });
  document.querySelectorAll(".view-toggle button").forEach(nut => {
    nut.addEventListener("click", () => {
      tvTrangThai.kieu = nut.dataset.kieu;
      luuCaiDat("tv-kieu", tvTrangThai.kieu);
      veTuVung();
    });
  });

  document.getElementById("tv-ket-qua").addEventListener("click", e => {
    const the = e.target.closest(".word-card");
    if (the && !e.target.closest(".card-more")) { the.classList.toggle("flipped"); return; }
    const muc = e.target.closest("[data-id]");
    if (muc) moChiTiet(muc.dataset.id);
  });

  veBoLoc();
  veTuVung();
}

function chonCapDoTuVung(capDo) {
  tvTrangThai.capDo = capDo;
  tvTrangThai.bai = "";
  luuCaiDat("tv-cap-do", capDo);
  veBoLoc();
  veTuVung();
}

/** Vẽ chip cấp độ + danh sách bài, chủ đề tương ứng với cấp độ đang chọn */
function veBoLoc() {
  veChipCapDo(document.getElementById("tv-cap-do"), tvTrangThai.capDo,
    demTheo(KHO.tuVung, "capDo"), chonCapDoTuVung);

  const theoCap = KHO.tuVung.filter(t => tvTrangThai.capDo === "tat-ca" || t.capDo === tvTrangThai.capDo);

  // Bài: chỉ hiện khi chọn 1 cấp độ có đánh số bài
  const chonBai = document.getElementById("tv-bai");
  const dsBai = [...new Set(theoCap.filter(t => t.bai).map(t => t.bai))].sort((a, b) => a - b);
  chonBai.hidden = tvTrangThai.capDo === "tat-ca" || dsBai.length === 0;
  chonBai.innerHTML = `<option value="">Tất cả bài</option>` +
    dsBai.map(b => `<option value="${b}">Bài ${b}</option>`).join("");
  chonBai.value = tvTrangThai.bai;

  // Chủ đề
  const chonChuDe = document.getElementById("tv-chu-de");
  const dem = {};
  theoCap.forEach(t => t.chuDe.forEach(c => { dem[c] = (dem[c] || 0) + 1; }));
  const dsChuDe = Object.keys(dem).sort((a, b) => a.localeCompare(b, "vi"));
  if (tvTrangThai.chuDe && !dem[tvTrangThai.chuDe]) tvTrangThai.chuDe = "";
  chonChuDe.innerHTML = `<option value="">Tất cả chủ đề</option>` +
    dsChuDe.map(c => `<option value="${esc(c)}">${esc(c)} (${dem[c]})</option>`).join("");
  chonChuDe.value = tvTrangThai.chuDe;
}

function locTuVung() {
  const s = tvTrangThai;
  let ds = KHO.tuVung.filter(t =>
    (s.capDo === "tat-ca" || t.capDo === s.capDo) &&
    (!s.bai || String(t.bai) === String(s.bai)) &&
    (!s.chuDe || t.chuDe.includes(s.chuDe))
  );
  return timTuVung(s.tim, ds);
}

function veTuVung() {
  const ds = locTuVung();
  tvTrangThai.ketQua = ds;

  document.querySelectorAll(".view-toggle button").forEach(n =>
    n.classList.toggle("active", n.dataset.kieu === tvTrangThai.kieu));

  document.getElementById("tv-dem").textContent = ds.length
    ? `${ds.length} từ`
    : "";

  const khung = document.getElementById("tv-ket-qua");
  if (!ds.length) {
    khung.innerHTML = `<div class="empty">Không tìm thấy từ nào. Thử gõ không dấu, ví dụ "xiexie" hoặc "cam on".</div>`;
    return;
  }

  // Khi đang tìm kiếm: hiện theo độ khớp, không chia nhóm
  if (tvTrangThai.tim.trim()) {
    khung.innerHTML = veNhom(ds);
    return;
  }

  // Không tìm kiếm: chia nhóm theo cấp độ → bài
  const nhom = [];
  ds.forEach(t => {
    const ten = (tvTrangThai.capDo === "tat-ca" ? tenCapDo(t.capDo) + (t.bai ? " · " : "") : "") +
      (t.bai ? `Bài ${t.bai}` : (tvTrangThai.capDo === "tat-ca" ? "" : tenCapDo(t.capDo)));
    let cuoi = nhom[nhom.length - 1];
    if (!cuoi || cuoi.ten !== ten) nhom.push(cuoi = { ten, tu: [] });
    cuoi.tu.push(t);
  });
  khung.innerHTML = nhom.map(n =>
    `<h3 class="group-title">${esc(n.ten)} <span>${n.tu.length} từ</span></h3>` + veNhom(n.tu)
  ).join("");
}

function veNhom(ds) {
  if (tvTrangThai.kieu === "the") {
    return `<div class="vocab-grid">` + ds.map(t => `
      <div class="word-card">
        <div class="word-card-inner">
          <div class="word-card-front">${esc(t.hanzi)}</div>
          <div class="word-card-back">
            <div class="py">${esc(t.pinyin)}</div>
            <div class="vi">${esc(t.nghia)}</div>
            <button type="button" class="card-more" data-id="${esc(t.id)}">Chi tiết</button>
          </div>
        </div>
      </div>`).join("") + `</div>`;
  }
  return `<ul class="word-list">` + ds.map(t => `
    <li class="word-row" data-id="${esc(t.id)}" tabindex="0">
      <span class="wr-hanzi">${esc(t.hanzi)}</span>
      <span class="wr-main">
        <span class="wr-py">${esc(t.pinyin)}</span>
        <span class="wr-vi">${esc(t.nghia)}</span>
      </span>
      <span class="wr-side">
        ${t.hanViet ? `<span class="wr-hv">${esc(t.hanViet)}</span>` : ""}
        <span class="badge badge-${esc(t.capDo)}">${esc(tenCapDo(t.capDo))}</span>
      </span>
    </li>`).join("") + `</ul>`;
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.classList && e.target.classList.contains("word-row")) {
    moChiTiet(e.target.dataset.id);
  }
});

/* ===== Cửa sổ chi tiết ===== */
let ctDangMo = null;      // id từ đang xem
let ctDanhSach = [];      // danh sách để chuyển ‹ ›

function moChiTiet(id, danhSach) {
  ctDanhSach = danhSach || tvTrangThai.ketQua;
  if (!ctDanhSach.some(t => t.id === id)) ctDanhSach = KHO.tuVung;
  ctDangMo = id;
  veChiTiet();
  document.getElementById("chi-tiet").hidden = false;
  document.body.classList.add("no-scroll");
  document.getElementById("ct-dong").focus();
}

function dongChiTiet() {
  document.getElementById("chi-tiet").hidden = true;
  document.body.classList.remove("no-scroll");
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  ctDangMo = null;
}

function chuyenChiTiet(buoc) {
  const i = ctDanhSach.findIndex(t => t.id === ctDangMo);
  if (i < 0) return;
  const j = (i + buoc + ctDanhSach.length) % ctDanhSach.length;
  ctDangMo = ctDanhSach[j].id;
  veChiTiet();
}

function veChiTiet() {
  const t = KHO.tuVung.find(x => x.id === ctDangMo);
  if (!t) return;

  // Ví dụ lấy tự động từ phần ngữ pháp
  const viDu = [];
  KHO.nguPhap.forEach(bai => bai.diem.forEach(d => d.viDu.forEach(v => {
    if (v.cn.includes(t.hanzi) && viDu.length < 4) viDu.push({ ...v, diemId: d.id, ten: d.ten, capDo: bai.capDo, bai: bai.bai });
  })));

  // Từ khác có chung chữ Hán
  const chuCuaTu = [...t.hanzi].filter(laChuHan);
  const lienQuan = KHO.tuVung.filter(x => x.id !== t.id && chuCuaTu.some(c => x.hanzi.includes(c))).slice(0, 12);

  const nhanBai = t.bai ? ` · Bài ${t.bai}` : "";

  document.getElementById("ct-noi-dung").innerHTML = `
    <div class="ct-head">
      <div class="ct-hanzi" id="ct-hanzi">${esc(t.hanzi)}</div>
      <div class="ct-info">
        <div class="ct-py">${esc(t.pinyin)} ${nutLoa(t.hanzi)}</div>
        ${t.hanViet ? `<div class="ct-hv">Hán Việt: <strong>${esc(t.hanViet)}</strong></div>` : ""}
        <div class="ct-vi">${esc(t.nghia)}</div>
        <div class="ct-meta">
          <span class="badge badge-${esc(t.capDo)}">${esc(tenCapDo(t.capDo))}${esc(nhanBai)}</span>
          ${t.loaiTu ? `<span class="tag">${esc(t.loaiTu)}</span>` : ""}
          ${t.chuDe.filter(c => c !== t.loaiTu).map(c => `<button type="button" class="tag tag-link" data-chu-de="${esc(c)}">#${esc(c)}</button>`).join("")}
        </div>
      </div>
    </div>
    ${t.ghiChu ? `<p class="ct-note">💡 ${esc(t.ghiChu)}</p>` : ""}

    <section class="ct-section">
      <div class="ct-section-head">
        <h4>Thứ tự nét</h4>
        <button type="button" class="chip" id="ct-ve-lai">▶ Xem lại</button>
      </div>
      <div class="stroke-row" id="ct-net"></div>
    </section>

    ${viDu.length ? `
    <section class="ct-section">
      <h4>Ví dụ trong ngữ pháp</h4>
      ${viDu.map(v => `
        <div class="grammar-example">
          <div class="cn">${esc(v.cn)} ${nutLoa(v.cn)}</div>
          <div class="py">${esc(v.py)}</div>
          <div class="vi">${esc(v.vi)}</div>
          <a class="ex-link" href="#ngu-phap" data-diem="${esc(v.diemId)}">${esc(tenCapDo(v.capDo))} · Bài ${v.bai}: ${esc(v.ten)} →</a>
        </div>`).join("")}
    </section>` : ""}

    ${lienQuan.length ? `
    <section class="ct-section">
      <h4>Từ có chung chữ</h4>
      <div class="related">
        ${lienQuan.map(x => `<button type="button" class="related-item" data-id="${esc(x.id)}"><span>${esc(x.hanzi)}</span><small>${esc(x.nghia)}</small></button>`).join("")}
      </div>
    </section>` : ""}
  `;

  veThuTuNet(chuCuaTu);
}

function veThuTuNet(dsChu) {
  const khung = document.getElementById("ct-net");
  if (typeof HanziWriter === "undefined") {
    khung.innerHTML = `<p class="muted">Không tải được thư viện viết chữ (cần kết nối mạng).</p>`;
    document.getElementById("ct-ve-lai").hidden = true;
    return;
  }
  khung.innerHTML = "";
  const butViet = dsChu.map((c, i) => {
    const o = document.createElement("div");
    o.className = "stroke-box";
    o.id = `ct-net-${i}`;
    khung.appendChild(o);
    return HanziWriter.create(o.id, c, {
      width: 110, height: 110, padding: 6,
      showOutline: true,
      strokeColor: "#eceff1",
      outlineColor: "#3a4a52",
      strokeAnimationSpeed: 1.2,
      delayBetweenStrokes: 180,
      onLoadCharDataError: () => { o.textContent = c; o.classList.add("stroke-missing"); }
    });
  });
  const chay = async () => {
    for (const b of butViet) {
      b.hideCharacter();
    }
    for (const b of butViet) {
      if (ctDangMo === null) return;
      await new Promise(r => b.animateCharacter({ onComplete: r }));
    }
  };
  document.getElementById("ct-ve-lai").onclick = chay;
  chay();
}

function khoiTaoChiTiet() {
  const nen = document.getElementById("chi-tiet");
  nen.addEventListener("click", e => {
    if (e.target === nen) { dongChiTiet(); return; }
    const lq = e.target.closest(".related-item");
    if (lq) { ctDangMo = lq.dataset.id; if (!ctDanhSach.some(t => t.id === ctDangMo)) ctDanhSach = KHO.tuVung; veChiTiet(); return; }
    const cd = e.target.closest("[data-chu-de]");
    if (cd) {
      dongChiTiet();
      tvTrangThai.capDo = "tat-ca"; tvTrangThai.bai = ""; tvTrangThai.tim = "";
      tvTrangThai.chuDe = cd.dataset.chuDe;
      document.getElementById("tv-tim").value = "";
      location.hash = "#tu-vung";
      veBoLoc(); veTuVung();
      return;
    }
    const lk = e.target.closest(".ex-link");
    if (lk) { e.preventDefault(); dongChiTiet(); moDiemNguPhap(lk.dataset.diem); }
  });
  document.getElementById("ct-dong").onclick = dongChiTiet;
  document.getElementById("ct-truoc").onclick = () => chuyenChiTiet(-1);
  document.getElementById("ct-sau").onclick = () => chuyenChiTiet(1);
  document.addEventListener("keydown", e => {
    if (document.getElementById("chi-tiet").hidden) return;
    if (e.key === "Escape") dongChiTiet();
    if (e.key === "ArrowLeft") chuyenChiTiet(-1);
    if (e.key === "ArrowRight") chuyenChiTiet(1);
  });
}
