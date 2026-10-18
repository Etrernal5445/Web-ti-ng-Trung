/* ===== NGỮ PHÁP: lọc theo cấp độ, tìm kiếm, mở từng bài ===== */

const npTrangThai = {
  capDo: docCaiDat("np-cap-do", "hsk1"),
  tim: ""
};

function khoiTaoNguPhap() {
  const ds = [...new Set(KHO.nguPhap.map(b => b.capDo))];
  if (!ds.includes(npTrangThai.capDo)) npTrangThai.capDo = ds[0] || "hsk1";

  let hen;
  document.getElementById("np-tim").addEventListener("input", e => {
    clearTimeout(hen);
    hen = setTimeout(() => { npTrangThai.tim = e.target.value; veNguPhap(); }, 150);
  });
  document.getElementById("np-ket-qua").addEventListener("click", e => {
    const dau = e.target.closest(".grammar-lesson-header");
    if (dau) dau.parentElement.classList.toggle("open");
  });
  veNguPhap();
}

function chonCapDoNguPhap(capDo) {
  npTrangThai.capDo = capDo;
  luuCaiDat("np-cap-do", capDo);
  veNguPhap();
}

function khopDiem(d, q) {
  if (!q) return true;
  const qc = chuanHoa(q);
  const chu = [d.ten, d.cauTruc, d.giaiThich, ...d.viDu.map(v => v.cn + " " + v.vi)].join(" ");
  return chu.includes(q) || chuanHoa(chu).includes(qc);
}

function veNguPhap() {
  veChipCapDo(document.getElementById("np-cap-do"), npTrangThai.capDo,
    demTheo(KHO.nguPhap, "capDo"), chonCapDoNguPhap, false);

  const q = npTrangThai.tim.trim();
  const dsBai = KHO.nguPhap
    .filter(b => b.capDo === npTrangThai.capDo)
    .map(b => ({ ...b, diem: b.diem.filter(d => khopDiem(d, q)) }))
    .filter(b => b.diem.length);

  const khung = document.getElementById("np-ket-qua");
  if (!dsBai.length) {
    khung.innerHTML = `<div class="empty">Không tìm thấy điểm ngữ pháp nào khớp "${esc(q)}".</div>`;
    return;
  }

  khung.innerHTML = dsBai.map((b, i) => `
    <div class="grammar-lesson ${q || i === 0 ? "open" : ""}" id="np-${esc(b.id)}">
      <button type="button" class="grammar-lesson-header">
        <span><span class="lesson-no">Bài ${b.bai}</span> ${esc(b.tieuDe)}</span>
        <span class="chevron">▶</span>
      </button>
      <div class="grammar-lesson-body">
        ${b.diem.map(d => `
          <div class="grammar-point" id="np-${esc(d.id)}">
            <div class="grammar-point-title">${esc(d.ten)}</div>
            ${d.cauTruc ? `<div class="grammar-formula">${esc(d.cauTruc)}</div>` : ""}
            ${d.giaiThich ? `<div class="grammar-point-desc">${esc(d.giaiThich)}</div>` : ""}
            ${d.viDu.map(v => `
              <div class="grammar-example">
                <div class="cn">${esc(v.cn)} ${nutLoa(v.cn)}</div>
                <div class="py">${esc(v.py)}</div>
                <div class="vi">${esc(v.vi)}</div>
              </div>`).join("")}
          </div>`).join("")}
      </div>
    </div>`).join("") + veMeo(q);
}

function veMeo(q) {
  const meo = KHO.meo[npTrangThai.capDo];
  if (!meo || q) return "";
  return `
    <h3 class="group-title">💡 Mẹo ghi nhớ nhanh</h3>
    <div class="table-wrap">
      <table class="grammar-tips">
        <tr><th>Chủ điểm</th><th>Từ khóa</th><th>Ghi nhớ</th></tr>
        ${meo.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}
      </table>
    </div>`;
}

/** Mở đúng điểm ngữ pháp (gọi từ cửa sổ chi tiết từ vựng) */
function moDiemNguPhap(diemId) {
  const capDo = diemId.split(":")[0];
  npTrangThai.capDo = capDo;
  npTrangThai.tim = "";
  document.getElementById("np-tim").value = "";
  location.hash = "#ngu-phap";
  veNguPhap();
  const diem = document.getElementById("np-" + diemId);
  if (!diem) return;
  diem.closest(".grammar-lesson").classList.add("open");
  diem.classList.add("highlight");
  setTimeout(() => diem.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  setTimeout(() => diem.classList.remove("highlight"), 2500);
}
