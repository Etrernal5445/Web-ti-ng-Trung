/*
 * Kiểm tra dữ liệu (tùy chọn, cần cài Node.js):
 *     node tools/kiem-tra.js
 * Báo lỗi thiếu trường, số âm tiết pinyin không khớp số chữ Hán, từ bị trùng.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const goc = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(goc, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="((?:js\/kho|data\/)[^"]+)"/g)].map(m => m[1]);

const ctx = {};
vm.createContext(ctx);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(goc, f), "utf8") + "\n;globalThis.KHO = KHO;", ctx, { filename: f }));

const { KHO } = ctx;
const loi = [...KHO.loi];

const daThay = {};
KHO.tuVung.forEach(t => {
  if (daThay[t.hanzi]) loi.push(`Trùng từ ${t.hanzi}: ${daThay[t.hanzi]} và ${t.capDo}`);
  else daThay[t.hanzi] = t.capDo;
  if (!t.hanViet) loi.push(`${t.id}: chưa có Hán Việt`);
});

const dem = {};
KHO.tuVung.forEach(t => { dem[t.capDo] = (dem[t.capDo] || 0) + 1; });
console.log("Từ vựng:", dem, "— tổng", KHO.tuVung.length);
console.log("Ngữ pháp:", KHO.nguPhap.length, "bài,", KHO.nguPhap.reduce((s, b) => s + b.diem.length, 0), "điểm");

if (loi.length) {
  console.log(`\n⚠️  ${loi.length} vấn đề:`);
  loi.forEach(l => console.log(" - " + l));
  process.exitCode = 1;
} else {
  console.log("\n✓ Dữ liệu hợp lệ.");
}
