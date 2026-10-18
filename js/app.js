/* ===== Điều hướng giữa 3 chế độ bằng địa chỉ #tu-vung, #ngu-phap, #luyen-tap ===== */

const CAC_CHE_DO = ["tu-vung", "ngu-phap", "luyen-tap"];

function chuyenCheDo() {
  let cheDo = location.hash.replace("#", "");
  if (!CAC_CHE_DO.includes(cheDo)) cheDo = "tu-vung";

  CAC_CHE_DO.forEach(c => {
    document.getElementById("view-" + c).hidden = c !== cheDo;
  });
  document.querySelectorAll("#top-mode-switch .mode-btn").forEach(a =>
    a.classList.toggle("active", a.dataset.mode === cheDo));

  if (cheDo === "luyen-tap") chonCheDo(ltTrangThai.cheDo);
  luuCaiDat("che-do", cheDo);
}

(function khoiDong() {
  if (KHO.loi.length) {
    console.warn("⚠️ Dữ liệu cần kiểm tra:\n" + KHO.loi.join("\n"));
  }
  const tongTu = KHO.tuVung.length;
  const tongNP = KHO.nguPhap.reduce((s, b) => s + b.diem.length, 0);
  document.getElementById("app-subtitle").textContent =
    `${tongTu} từ vựng · ${tongNP} điểm ngữ pháp · luyện viết & trắc nghiệm`;

  khoiTaoTuVung();
  khoiTaoChiTiet();
  khoiTaoNguPhap();
  khoiTaoLuyenTap();

  if (!location.hash) {
    const cu = docCaiDat("che-do", "tu-vung");
    history.replaceState(null, "", "#" + cu);
  }
  window.addEventListener("hashchange", chuyenCheDo);
  chuyenCheDo();
})();
