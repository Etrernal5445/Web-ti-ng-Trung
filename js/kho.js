/*
 * KHO DỮ LIỆU CHUNG
 * File này phải được nạp TRƯỚC các file trong thư mục data/.
 * Mọi chế độ (Kho từ vựng, Ngữ pháp, Luyện tập) đều đọc dữ liệu từ KHO.
 */
const KHO = {
  tuVung: [],   // tất cả từ vựng, mọi cấp độ
  nguPhap: [],  // tất cả bài ngữ pháp, mọi cấp độ
  meo: {},      // mẹo ghi nhớ theo cấp độ: { hsk1: [[chủ điểm, từ khóa, ghi nhớ], ...] }
  loi: []       // lỗi dữ liệu phát hiện khi nạp (in ra console)
};

// Tên hiển thị của các cấp độ. Cấp độ mới (ví dụ "hsk3") tự hiện tên viết hoa.
const CAP_DO = {
  "hsk1": "HSK1",
  "hsk2": "HSK2",
  "mo-rong": "Mở rộng"
};

function tenCapDo(capDo) {
  return CAP_DO[capDo] || capDo.toUpperCase();
}

function laChuHan(kyTu) {
  return /[㐀-鿿豈-﫿]/.test(kyTu);
}

/** Thêm một danh sách từ vựng vào kho. Gọi từ các file data/tu-vung/*.js */
function themTuVung(capDo, danhSach) {
  danhSach.forEach((tu, i) => {
    const hanzi = (tu.hanzi || "").trim();
    const amTiet = (tu.pinyin || "").trim().split(/\s+/).filter(Boolean);
    const viTri = `${capDo} #${i + 1} (${hanzi || "?"})`;

    if (!hanzi || !tu.nghia) {
      KHO.loi.push(`${viTri}: thiếu hanzi hoặc nghia`);
      return;
    }
    const soChu = [...hanzi].filter(laChuHan).length;
    if (soChu !== amTiet.length) {
      KHO.loi.push(`${viTri}: có ${soChu} chữ Hán nhưng ${amTiet.length} âm tiết pinyin`);
    }

    KHO.tuVung.push({
      id: `${capDo}:${hanzi}`,
      capDo,
      hanzi,
      amTiet,                      // ["duì", "bu", "qǐ"]
      pinyin: noiPinyin(amTiet),   // "duì bu qǐ"
      hanViet: tu.hanViet || "",
      nghia: tu.nghia,
      loaiTu: tu.loaiTu || "",
      bai: tu.bai || null,
      chuDe: tu.chuDe || [],
      ghiChu: tu.ghiChu || "",
      // chuỗi đã chuẩn hóa để tìm kiếm nhanh
      _pinyin: chuanHoa(amTiet.join("")).replace(/[\s']/g, ""),
      _nghia: chuanHoa(tu.nghia),
      _hanViet: chuanHoa(tu.hanViet || "")
    });
  });
}

/** Thêm ngữ pháp của một cấp độ. Gọi từ các file data/ngu-phap/*.js */
function themNguPhap(capDo, danhSachBai, meo) {
  danhSachBai.forEach(bai => {
    KHO.nguPhap.push({
      id: `${capDo}:bai${bai.bai}`,
      capDo,
      bai: bai.bai,
      tieuDe: bai.tieuDe,
      diem: (bai.diem || []).map((d, i) => ({
        id: `${capDo}:bai${bai.bai}:${i + 1}`,
        ten: d.ten,
        cauTruc: d.cauTruc || "",
        giaiThich: d.giaiThich || "",
        viDu: d.viDu || []
      }))
    });
  });
  if (meo && meo.length) KHO.meo[capDo] = meo;
}

/** Ghép âm tiết thành chuỗi hiển thị; âm "r" (儿化) dính vào âm trước: "nǎ r" → "nǎr" */
function noiPinyin(amTiet) {
  return amTiet.reduce((s, a) => {
    if (a === "r" && s) return s + "r";
    return s ? s + " " + a : a;
  }, "");
}

/** Bỏ dấu (cả dấu tiếng Việt lẫn dấu thanh pinyin), chữ thường, để so khớp tìm kiếm */
function chuanHoa(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")   // ü tự thành u sau khi bỏ dấu
    .trim();
}

/** Danh sách cấp độ đang có trong kho, theo thứ tự xuất hiện */
function danhSachCapDo() {
  const ds = [];
  KHO.tuVung.forEach(t => { if (!ds.includes(t.capDo)) ds.push(t.capDo); });
  KHO.nguPhap.forEach(b => { if (!ds.includes(b.capDo)) ds.push(b.capDo); });
  return ds;
}

/**
 * Tìm từ vựng. Trả về danh sách đã sắp xếp theo độ khớp.
 * Gõ được: chữ Hán, pinyin có hoặc không dấu ("nihao", "nǐ hǎo"), nghĩa tiếng Việt, Hán Việt.
 */
function timTuVung(tuKhoa, danhSach) {
  const q = (tuKhoa || "").trim();
  if (!q) return danhSach;

  const qChuan = chuanHoa(q);
  const qPinyin = qChuan.replace(/[\s']/g, "").replace(/v/g, "u"); // gõ "nv" = "nǚ"
  const coChuHan = [...q].some(laChuHan);

  const ketQua = [];
  danhSach.forEach(t => {
    let diem = 0;
    if (coChuHan) {
      if (t.hanzi === q) diem = 100;
      else if (t.hanzi.includes(q)) diem = 60;
      else if ([...q].some(c => t.hanzi.includes(c))) diem = 20;
    } else {
      if (t._pinyin === qPinyin) diem = 90;
      else if (qPinyin && t._pinyin.startsWith(qPinyin)) diem = 70;
      if (t._hanViet === qChuan) diem = Math.max(diem, 85);
      if (khopTu(t._nghia, qChuan)) diem = Math.max(diem, 80);
      else if (t._nghia.includes(qChuan)) diem = Math.max(diem, 50);
      if (t._hanViet.includes(qChuan)) diem = Math.max(diem, 45);
      if (qPinyin.length >= 3 && t._pinyin.includes(qPinyin)) diem = Math.max(diem, 30);
    }
    if (diem > 0) ketQua.push({ t, diem });
  });

  return ketQua
    .sort((a, b) => b.diem - a.diem || a.t.hanzi.length - b.t.hanzi.length)
    .map(k => k.t);
}

/** Nghĩa có chứa nguyên cụm từ (không phải một phần của từ khác) */
function khopTu(nghia, q) {
  return nghia.split(/[,;()/…]+/).some(phan => phan.trim() === q);
}
