/*
 * TỪ VỰNG HSK1 — theo Giáo trình chuẩn HSK1 (15 bài).
 *
 * Mỗi từ gồm:
 *   hanzi   : chữ Hán
 *   pinyin  : phiên âm, MỖI ÂM TIẾT CÁCH NHAU 1 DẤU CÁCH, số âm tiết = số chữ Hán
 *             (âm "儿" cuốn lưỡi viết là "r", ví dụ 哪儿 = "nǎ r")
 *   hanViet : âm Hán Việt
 *   nghia   : nghĩa tiếng Việt
 *   loaiTu  : loại từ
 *   bai     : số bài trong giáo trình (để trống nếu không theo bài)
 *   chuDe   : danh sách chủ đề (dùng cho bộ lọc)
 *   ghiChu  : (tùy chọn) ghi chú thêm
 */
themTuVung("hsk1", [
  // Bài 1
  { hanzi: "你", pinyin: "nǐ", hanViet: "nhĩ", nghia: "anh, chị, bạn", loaiTu: "đại từ", bai: 1, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "好", pinyin: "hǎo", hanViet: "hảo", nghia: "khỏe, tốt", loaiTu: "tính từ", bai: 1, chuDe: ["chào hỏi"] },
  { hanzi: "您", pinyin: "nín", hanViet: "nâm", nghia: "ông, bà, ngài (lịch sự)", loaiTu: "đại từ", bai: 1, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "你们", pinyin: "nǐ men", hanViet: "nhĩ môn", nghia: "các anh, các chị, các bạn", loaiTu: "đại từ", bai: 1, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "对不起", pinyin: "duì bu qǐ", hanViet: "đối bất khởi", nghia: "xin lỗi", loaiTu: "động từ", bai: 1, chuDe: ["chào hỏi"] },
  { hanzi: "没关系", pinyin: "méi guān xi", hanViet: "một quan hệ", nghia: "không sao đâu", loaiTu: "cụm từ", bai: 1, chuDe: ["chào hỏi"] },

  // Bài 2
  { hanzi: "谢谢", pinyin: "xiè xie", hanViet: "tạ tạ", nghia: "cảm ơn", loaiTu: "động từ", bai: 2, chuDe: ["chào hỏi"] },
  { hanzi: "不", pinyin: "bù", hanViet: "bất", nghia: "không, đừng", loaiTu: "phó từ", bai: 2, chuDe: ["hư từ"] },
  { hanzi: "不客气", pinyin: "bú kè qi", hanViet: "bất khách khí", nghia: "đừng khách sáo", loaiTu: "cụm từ", bai: 2, chuDe: ["chào hỏi"] },
  { hanzi: "再见", pinyin: "zài jiàn", hanViet: "tái kiến", nghia: "tạm biệt", loaiTu: "động từ", bai: 2, chuDe: ["chào hỏi"] },

  // Bài 3
  { hanzi: "叫", pinyin: "jiào", hanViet: "khiếu", nghia: "gọi, tên (là)", loaiTu: "động từ", bai: 3, chuDe: ["giới thiệu"] },
  { hanzi: "什么", pinyin: "shén me", hanViet: "thập ma", nghia: "gì, cái gì", loaiTu: "đại từ", bai: 3, chuDe: ["từ để hỏi"] },
  { hanzi: "名字", pinyin: "míng zi", hanViet: "danh tự", nghia: "tên", loaiTu: "danh từ", bai: 3, chuDe: ["giới thiệu"] },
  { hanzi: "我", pinyin: "wǒ", hanViet: "ngã", nghia: "tôi, ta, mình", loaiTu: "đại từ", bai: 3, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "是", pinyin: "shì", hanViet: "thị", nghia: "là", loaiTu: "động từ", bai: 3, chuDe: ["giới thiệu"] },
  { hanzi: "老师", pinyin: "lǎo shī", hanViet: "lão sư", nghia: "thầy/cô giáo", loaiTu: "danh từ", bai: 3, chuDe: ["nghề nghiệp", "trường học"] },
  { hanzi: "吗", pinyin: "ma", hanViet: "ma", nghia: "(trợ từ nghi vấn, đặt cuối câu hỏi)", loaiTu: "trợ từ", bai: 3, chuDe: ["hư từ", "từ để hỏi"] },
  { hanzi: "学生", pinyin: "xué sheng", hanViet: "học sinh", nghia: "học sinh", loaiTu: "danh từ", bai: 3, chuDe: ["nghề nghiệp", "trường học"] },
  { hanzi: "人", pinyin: "rén", hanViet: "nhân", nghia: "người", loaiTu: "danh từ", bai: 3, chuDe: ["con người"] },
  { hanzi: "李月", pinyin: "Lǐ Yuè", hanViet: "Lý Nguyệt", nghia: "Lý Nguyệt (tên người)", loaiTu: "danh từ riêng", bai: 3, chuDe: ["tên riêng"] },
  { hanzi: "中国", pinyin: "Zhōng guó", hanViet: "Trung Quốc", nghia: "Trung Quốc", loaiTu: "danh từ riêng", bai: 3, chuDe: ["quốc gia"] },
  { hanzi: "美国", pinyin: "Měi guó", hanViet: "Mỹ Quốc", nghia: "nước Mỹ", loaiTu: "danh từ riêng", bai: 3, chuDe: ["quốc gia"] },

  // Bài 4
  { hanzi: "她", pinyin: "tā", hanViet: "tha", nghia: "cô ấy, bà ấy", loaiTu: "đại từ", bai: 4, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "谁", pinyin: "shéi", hanViet: "thùy", nghia: "ai", loaiTu: "đại từ", bai: 4, chuDe: ["từ để hỏi"] },
  { hanzi: "的", pinyin: "de", hanViet: "đích", nghia: "(trợ từ sở hữu) của", loaiTu: "trợ từ", bai: 4, chuDe: ["hư từ"] },
  { hanzi: "汉语", pinyin: "Hàn yǔ", hanViet: "Hán ngữ", nghia: "tiếng Trung Quốc", loaiTu: "danh từ", bai: 4, chuDe: ["ngôn ngữ"] },
  { hanzi: "哪", pinyin: "nǎ", hanViet: "na", nghia: "nào", loaiTu: "đại từ", bai: 4, chuDe: ["từ để hỏi"] },
  { hanzi: "国", pinyin: "guó", hanViet: "quốc", nghia: "quốc gia, đất nước", loaiTu: "danh từ", bai: 4, chuDe: ["quốc gia"] },
  { hanzi: "呢", pinyin: "ne", hanViet: "ni", nghia: "(trợ từ nghi vấn) còn… thì sao?", loaiTu: "trợ từ", bai: 4, chuDe: ["hư từ", "từ để hỏi"] },
  { hanzi: "他", pinyin: "tā", hanViet: "tha", nghia: "anh ấy, ông ấy", loaiTu: "đại từ", bai: 4, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "同学", pinyin: "tóng xué", hanViet: "đồng học", nghia: "bạn cùng lớp", loaiTu: "danh từ", bai: 4, chuDe: ["trường học", "con người"] },
  { hanzi: "朋友", pinyin: "péng you", hanViet: "bằng hữu", nghia: "bạn", loaiTu: "danh từ", bai: 4, chuDe: ["con người"] },

  // Bài 5
  { hanzi: "家", pinyin: "jiā", hanViet: "gia", nghia: "nhà, gia đình", loaiTu: "danh từ", bai: 5, chuDe: ["gia đình", "địa điểm"] },
  { hanzi: "有", pinyin: "yǒu", hanViet: "hữu", nghia: "có", loaiTu: "động từ", bai: 5, chuDe: ["động từ thường dùng"] },
  { hanzi: "口", pinyin: "kǒu", hanViet: "khẩu", nghia: "(lượng từ đếm người trong nhà); miệng", loaiTu: "lượng từ", bai: 5, chuDe: ["lượng từ", "gia đình"] },
  { hanzi: "女儿", pinyin: "nǚ ér", hanViet: "nữ nhi", nghia: "con gái", loaiTu: "danh từ", bai: 5, chuDe: ["gia đình"] },
  { hanzi: "几", pinyin: "jǐ", hanViet: "kỉ", nghia: "mấy", loaiTu: "đại từ", bai: 5, chuDe: ["từ để hỏi", "số đếm"] },
  { hanzi: "岁", pinyin: "suì", hanViet: "tuế", nghia: "tuổi", loaiTu: "lượng từ", bai: 5, chuDe: ["số đếm"] },
  { hanzi: "了", pinyin: "le", hanViet: "liễu", nghia: "(trợ từ chỉ sự thay đổi / hoàn thành)", loaiTu: "trợ từ", bai: 5, chuDe: ["hư từ"] },
  { hanzi: "今年", pinyin: "jīn nián", hanViet: "kim niên", nghia: "năm nay", loaiTu: "danh từ", bai: 5, chuDe: ["thời gian"] },
  { hanzi: "多", pinyin: "duō", hanViet: "đa", nghia: "bao (nhiêu); nhiều", loaiTu: "phó từ", bai: 5, chuDe: ["từ để hỏi"] },
  { hanzi: "大", pinyin: "dà", hanViet: "đại", nghia: "lớn, to", loaiTu: "tính từ", bai: 5, chuDe: ["tính từ thường dùng"] },

  // Bài 6
  { hanzi: "会", pinyin: "huì", hanViet: "hội", nghia: "biết (làm gì); sẽ", loaiTu: "động từ năng nguyện", bai: 6, chuDe: ["động từ năng nguyện"] },
  { hanzi: "说", pinyin: "shuō", hanViet: "thuyết", nghia: "nói", loaiTu: "động từ", bai: 6, chuDe: ["ngôn ngữ", "động từ thường dùng"] },
  { hanzi: "妈妈", pinyin: "mā ma", hanViet: "ma ma", nghia: "mẹ", loaiTu: "danh từ", bai: 6, chuDe: ["gia đình"] },
  { hanzi: "菜", pinyin: "cài", hanViet: "thái", nghia: "món ăn, thức ăn", loaiTu: "danh từ", bai: 6, chuDe: ["ăn uống"] },
  { hanzi: "很", pinyin: "hěn", hanViet: "ngận", nghia: "rất", loaiTu: "phó từ", bai: 6, chuDe: ["hư từ"] },
  { hanzi: "好吃", pinyin: "hǎo chī", hanViet: "hảo cật", nghia: "ngon", loaiTu: "tính từ", bai: 6, chuDe: ["ăn uống"] },
  { hanzi: "做", pinyin: "zuò", hanViet: "tố", nghia: "làm, nấu", loaiTu: "động từ", bai: 6, chuDe: ["động từ thường dùng"] },
  { hanzi: "写", pinyin: "xiě", hanViet: "tả", nghia: "viết", loaiTu: "động từ", bai: 6, chuDe: ["ngôn ngữ", "trường học"] },
  { hanzi: "汉字", pinyin: "Hàn zì", hanViet: "Hán tự", nghia: "chữ Hán", loaiTu: "danh từ", bai: 6, chuDe: ["ngôn ngữ"] },
  { hanzi: "字", pinyin: "zì", hanViet: "tự", nghia: "chữ", loaiTu: "danh từ", bai: 6, chuDe: ["ngôn ngữ"] },
  { hanzi: "怎么", pinyin: "zěn me", hanViet: "chẩm ma", nghia: "như thế nào, sao", loaiTu: "đại từ", bai: 6, chuDe: ["từ để hỏi"] },
  { hanzi: "读", pinyin: "dú", hanViet: "độc", nghia: "đọc", loaiTu: "động từ", bai: 6, chuDe: ["ngôn ngữ", "trường học"] },

  // Bài 7
  { hanzi: "请", pinyin: "qǐng", hanViet: "thỉnh", nghia: "mời, xin", loaiTu: "động từ", bai: 7, chuDe: ["chào hỏi"] },
  { hanzi: "问", pinyin: "wèn", hanViet: "vấn", nghia: "hỏi", loaiTu: "động từ", bai: 7, chuDe: ["động từ thường dùng"] },
  { hanzi: "今天", pinyin: "jīn tiān", hanViet: "kim thiên", nghia: "hôm nay", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "号", pinyin: "hào", hanViet: "hiệu", nghia: "ngày (trong tháng); số", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "月", pinyin: "yuè", hanViet: "nguyệt", nghia: "tháng", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "星期", pinyin: "xīng qī", hanViet: "tinh kỳ", nghia: "tuần, thứ", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "昨天", pinyin: "zuó tiān", hanViet: "tạc thiên", nghia: "hôm qua", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "明天", pinyin: "míng tiān", hanViet: "minh thiên", nghia: "ngày mai", loaiTu: "danh từ", bai: 7, chuDe: ["thời gian"] },
  { hanzi: "去", pinyin: "qù", hanViet: "khứ", nghia: "đi, đi đến", loaiTu: "động từ", bai: 7, chuDe: ["động từ thường dùng"] },
  { hanzi: "学校", pinyin: "xué xiào", hanViet: "học hiệu", nghia: "trường học", loaiTu: "danh từ", bai: 7, chuDe: ["trường học", "địa điểm"] },
  { hanzi: "看", pinyin: "kàn", hanViet: "khán", nghia: "nhìn, xem, đọc", loaiTu: "động từ", bai: 7, chuDe: ["động từ thường dùng"] },
  { hanzi: "书", pinyin: "shū", hanViet: "thư", nghia: "sách", loaiTu: "danh từ", bai: 7, chuDe: ["trường học", "đồ vật"] },

  // Bài 8
  { hanzi: "想", pinyin: "xiǎng", hanViet: "tưởng", nghia: "muốn; nghĩ, nhớ", loaiTu: "động từ năng nguyện", bai: 8, chuDe: ["động từ năng nguyện"] },
  { hanzi: "喝", pinyin: "hē", hanViet: "hát", nghia: "uống", loaiTu: "động từ", bai: 8, chuDe: ["ăn uống"] },
  { hanzi: "茶", pinyin: "chá", hanViet: "trà", nghia: "trà", loaiTu: "danh từ", bai: 8, chuDe: ["ăn uống"] },
  { hanzi: "吃", pinyin: "chī", hanViet: "cật", nghia: "ăn", loaiTu: "động từ", bai: 8, chuDe: ["ăn uống"] },
  { hanzi: "米饭", pinyin: "mǐ fàn", hanViet: "mễ phạn", nghia: "cơm", loaiTu: "danh từ", bai: 8, chuDe: ["ăn uống"] },
  { hanzi: "下午", pinyin: "xià wǔ", hanViet: "hạ ngọ", nghia: "buổi chiều", loaiTu: "danh từ", bai: 8, chuDe: ["thời gian"] },
  { hanzi: "商店", pinyin: "shāng diàn", hanViet: "thương điếm", nghia: "cửa hàng", loaiTu: "danh từ", bai: 8, chuDe: ["mua sắm", "địa điểm"] },
  { hanzi: "买", pinyin: "mǎi", hanViet: "mãi", nghia: "mua", loaiTu: "động từ", bai: 8, chuDe: ["mua sắm"] },
  { hanzi: "个", pinyin: "gè", hanViet: "cá", nghia: "cái, chiếc (lượng từ chung)", loaiTu: "lượng từ", bai: 8, chuDe: ["lượng từ"] },
  { hanzi: "杯子", pinyin: "bēi zi", hanViet: "bôi tử", nghia: "cốc, ly, tách", loaiTu: "danh từ", bai: 8, chuDe: ["đồ vật"] },
  { hanzi: "这", pinyin: "zhè", hanViet: "giá", nghia: "đây, này", loaiTu: "đại từ", bai: 8, chuDe: ["đại từ chỉ thị"] },
  { hanzi: "多少", pinyin: "duō shao", hanViet: "đa thiểu", nghia: "bao nhiêu", loaiTu: "đại từ", bai: 8, chuDe: ["từ để hỏi", "số đếm"] },
  { hanzi: "钱", pinyin: "qián", hanViet: "tiền", nghia: "tiền", loaiTu: "danh từ", bai: 8, chuDe: ["mua sắm"] },
  { hanzi: "块", pinyin: "kuài", hanViet: "khối", nghia: "đồng (đơn vị tiền)", loaiTu: "lượng từ", bai: 8, chuDe: ["mua sắm", "lượng từ"] },
  { hanzi: "那", pinyin: "nà", hanViet: "na", nghia: "kia, đó", loaiTu: "đại từ", bai: 8, chuDe: ["đại từ chỉ thị"] },

  // Bài 9
  { hanzi: "小", pinyin: "xiǎo", hanViet: "tiểu", nghia: "nhỏ, bé", loaiTu: "tính từ", bai: 9, chuDe: ["tính từ thường dùng"] },
  { hanzi: "猫", pinyin: "māo", hanViet: "miêu", nghia: "mèo", loaiTu: "danh từ", bai: 9, chuDe: ["động vật"] },
  { hanzi: "在", pinyin: "zài", hanViet: "tại", nghia: "ở, tại; đang", loaiTu: "động từ / giới từ", bai: 9, chuDe: ["phương hướng", "hư từ"] },
  { hanzi: "那儿", pinyin: "nà r", hanViet: "na nhi", nghia: "chỗ đó, ở đó", loaiTu: "đại từ", bai: 9, chuDe: ["đại từ chỉ thị", "phương hướng"] },
  { hanzi: "狗", pinyin: "gǒu", hanViet: "cẩu", nghia: "chó", loaiTu: "danh từ", bai: 9, chuDe: ["động vật"] },
  { hanzi: "椅子", pinyin: "yǐ zi", hanViet: "ỷ tử", nghia: "ghế dựa", loaiTu: "danh từ", bai: 9, chuDe: ["đồ vật"] },
  { hanzi: "下面", pinyin: "xià miàn", hanViet: "hạ diện", nghia: "bên dưới, phía dưới", loaiTu: "danh từ phương vị", bai: 9, chuDe: ["phương hướng"], ghiChu: "Có thể nói gọn là 下 (xià)." },
  { hanzi: "哪儿", pinyin: "nǎ r", hanViet: "na nhi", nghia: "chỗ nào, đâu", loaiTu: "đại từ", bai: 9, chuDe: ["từ để hỏi", "phương hướng"] },
  { hanzi: "工作", pinyin: "gōng zuò", hanViet: "công tác", nghia: "làm việc; công việc", loaiTu: "động từ / danh từ", bai: 9, chuDe: ["nghề nghiệp"] },
  { hanzi: "儿子", pinyin: "ér zi", hanViet: "nhi tử", nghia: "con trai", loaiTu: "danh từ", bai: 9, chuDe: ["gia đình"] },
  { hanzi: "医院", pinyin: "yī yuàn", hanViet: "y viện", nghia: "bệnh viện", loaiTu: "danh từ", bai: 9, chuDe: ["địa điểm"] },
  { hanzi: "医生", pinyin: "yī shēng", hanViet: "y sinh", nghia: "bác sĩ", loaiTu: "danh từ", bai: 9, chuDe: ["nghề nghiệp"] },
  { hanzi: "爸爸", pinyin: "bà ba", hanViet: "ba ba", nghia: "bố, cha", loaiTu: "danh từ", bai: 9, chuDe: ["gia đình"] },

  // Bài 10
  { hanzi: "桌子", pinyin: "zhuō zi", hanViet: "trác tử", nghia: "cái bàn", loaiTu: "danh từ", bai: 10, chuDe: ["đồ vật"] },
  { hanzi: "上", pinyin: "shàng", hanViet: "thượng", nghia: "trên, phía trên", loaiTu: "danh từ phương vị", bai: 10, chuDe: ["phương hướng"], ghiChu: "Khi đứng sau danh từ (桌子上) thường đọc nhẹ: shang." },
  { hanzi: "电脑", pinyin: "diàn nǎo", hanViet: "điện não", nghia: "máy vi tính", loaiTu: "danh từ", bai: 10, chuDe: ["đồ vật"] },
  { hanzi: "和", pinyin: "hé", hanViet: "hòa", nghia: "và", loaiTu: "liên từ", bai: 10, chuDe: ["hư từ"] },
  { hanzi: "本", pinyin: "běn", hanViet: "bản", nghia: "quyển, cuốn (lượng từ)", loaiTu: "lượng từ", bai: 10, chuDe: ["lượng từ"] },
  { hanzi: "里", pinyin: "lǐ", hanViet: "lí", nghia: "trong, bên trong", loaiTu: "danh từ phương vị", bai: 10, chuDe: ["phương hướng"] },
  { hanzi: "前面", pinyin: "qián miàn", hanViet: "tiền diện", nghia: "phía trước", loaiTu: "danh từ phương vị", bai: 10, chuDe: ["phương hướng"] },
  { hanzi: "后面", pinyin: "hòu miàn", hanViet: "hậu diện", nghia: "phía sau", loaiTu: "danh từ phương vị", bai: 10, chuDe: ["phương hướng"] },
  { hanzi: "这儿", pinyin: "zhè r", hanViet: "giá nhi", nghia: "chỗ này, ở đây", loaiTu: "đại từ", bai: 10, chuDe: ["đại từ chỉ thị", "phương hướng"] },
  { hanzi: "没有", pinyin: "méi yǒu", hanViet: "một hữu", nghia: "không có; chưa", loaiTu: "động từ / phó từ", bai: 10, chuDe: ["hư từ"], ghiChu: "Có thể nói gọn là 没 (méi)." },
  { hanzi: "能", pinyin: "néng", hanViet: "năng", nghia: "có thể, được phép", loaiTu: "động từ năng nguyện", bai: 10, chuDe: ["động từ năng nguyện"] },
  { hanzi: "坐", pinyin: "zuò", hanViet: "tọa", nghia: "ngồi; đi (xe, máy bay…)", loaiTu: "động từ", bai: 10, chuDe: ["động từ thường dùng", "giao thông"] },
  { hanzi: "王方", pinyin: "Wáng Fāng", hanViet: "Vương Phương", nghia: "Vương Phương (tên người)", loaiTu: "danh từ riêng", bai: 10, chuDe: ["tên riêng"] },
  { hanzi: "谢朋", pinyin: "Xiè Péng", hanViet: "Tạ Bằng", nghia: "Tạ Bằng (tên người)", loaiTu: "danh từ riêng", bai: 10, chuDe: ["tên riêng"] },

  // Bài 11
  { hanzi: "现在", pinyin: "xiàn zài", hanViet: "hiện tại", nghia: "bây giờ, hiện tại", loaiTu: "danh từ", bai: 11, chuDe: ["thời gian"] },
  { hanzi: "点", pinyin: "diǎn", hanViet: "điểm", nghia: "giờ", loaiTu: "lượng từ", bai: 11, chuDe: ["thời gian"] },
  { hanzi: "分", pinyin: "fēn", hanViet: "phân", nghia: "phút", loaiTu: "lượng từ", bai: 11, chuDe: ["thời gian"] },
  { hanzi: "中午", pinyin: "zhōng wǔ", hanViet: "trung ngọ", nghia: "buổi trưa", loaiTu: "danh từ", bai: 11, chuDe: ["thời gian"] },
  { hanzi: "吃饭", pinyin: "chī fàn", hanViet: "cật phạn", nghia: "ăn cơm", loaiTu: "động từ", bai: 11, chuDe: ["ăn uống"] },
  { hanzi: "时候", pinyin: "shí hou", hanViet: "thời hậu", nghia: "lúc, khi", loaiTu: "danh từ", bai: 11, chuDe: ["thời gian"] },
  { hanzi: "回", pinyin: "huí", hanViet: "hồi", nghia: "về, trở về", loaiTu: "động từ", bai: 11, chuDe: ["động từ thường dùng"] },
  { hanzi: "我们", pinyin: "wǒ men", hanViet: "ngã môn", nghia: "chúng tôi, chúng ta", loaiTu: "đại từ", bai: 11, chuDe: ["đại từ nhân xưng"] },
  { hanzi: "电影", pinyin: "diàn yǐng", hanViet: "điện ảnh", nghia: "phim", loaiTu: "danh từ", bai: 11, chuDe: ["giải trí"] },
  { hanzi: "住", pinyin: "zhù", hanViet: "trú", nghia: "ở, sống", loaiTu: "động từ", bai: 11, chuDe: ["động từ thường dùng"] },
  { hanzi: "前", pinyin: "qián", hanViet: "tiền", nghia: "trước", loaiTu: "danh từ phương vị", bai: 11, chuDe: ["thời gian", "phương hướng"] },
  { hanzi: "北京", pinyin: "Běi jīng", hanViet: "Bắc Kinh", nghia: "Bắc Kinh (thủ đô Trung Quốc)", loaiTu: "danh từ riêng", bai: 11, chuDe: ["tên riêng", "địa điểm"] },

  // Bài 12
  { hanzi: "天气", pinyin: "tiān qì", hanViet: "thiên khí", nghia: "thời tiết", loaiTu: "danh từ", bai: 12, chuDe: ["thời tiết"] },
  { hanzi: "怎么样", pinyin: "zěn me yàng", hanViet: "chẩm ma dạng", nghia: "thế nào", loaiTu: "đại từ", bai: 12, chuDe: ["từ để hỏi"] },
  { hanzi: "太", pinyin: "tài", hanViet: "thái", nghia: "quá, lắm", loaiTu: "phó từ", bai: 12, chuDe: ["hư từ"] },
  { hanzi: "热", pinyin: "rè", hanViet: "nhiệt", nghia: "nóng", loaiTu: "tính từ", bai: 12, chuDe: ["thời tiết"] },
  { hanzi: "冷", pinyin: "lěng", hanViet: "lãnh", nghia: "lạnh", loaiTu: "tính từ", bai: 12, chuDe: ["thời tiết"] },
  { hanzi: "下雨", pinyin: "xià yǔ", hanViet: "hạ vũ", nghia: "mưa (rơi)", loaiTu: "động từ", bai: 12, chuDe: ["thời tiết"] },
  { hanzi: "小姐", pinyin: "xiǎo jiě", hanViet: "tiểu thư", nghia: "cô (cách gọi phụ nữ trẻ)", loaiTu: "danh từ", bai: 12, chuDe: ["con người"] },
  { hanzi: "来", pinyin: "lái", hanViet: "lai", nghia: "đến, tới", loaiTu: "động từ", bai: 12, chuDe: ["động từ thường dùng"] },
  { hanzi: "身体", pinyin: "shēn tǐ", hanViet: "thân thể", nghia: "sức khỏe, cơ thể", loaiTu: "danh từ", bai: 12, chuDe: ["sức khỏe"] },
  { hanzi: "爱", pinyin: "ài", hanViet: "ái", nghia: "yêu, thích", loaiTu: "động từ", bai: 12, chuDe: ["cảm xúc"] },
  { hanzi: "些", pinyin: "xiē", hanViet: "ta", nghia: "một ít, một vài", loaiTu: "lượng từ", bai: 12, chuDe: ["lượng từ"] },
  { hanzi: "水果", pinyin: "shuǐ guǒ", hanViet: "thủy quả", nghia: "trái cây", loaiTu: "danh từ", bai: 12, chuDe: ["ăn uống"] },
  { hanzi: "水", pinyin: "shuǐ", hanViet: "thủy", nghia: "nước", loaiTu: "danh từ", bai: 12, chuDe: ["ăn uống"] },

  // Bài 13
  { hanzi: "喂", pinyin: "wèi", hanViet: "uy", nghia: "a lô, này", loaiTu: "thán từ", bai: 13, chuDe: ["chào hỏi"] },
  { hanzi: "也", pinyin: "yě", hanViet: "dã", nghia: "cũng", loaiTu: "phó từ", bai: 13, chuDe: ["hư từ"] },
  { hanzi: "学习", pinyin: "xué xí", hanViet: "học tập", nghia: "học, học tập", loaiTu: "động từ", bai: 13, chuDe: ["trường học"], ghiChu: "Có thể nói gọn là 学 (xué)." },
  { hanzi: "上午", pinyin: "shàng wǔ", hanViet: "thượng ngọ", nghia: "buổi sáng", loaiTu: "danh từ", bai: 13, chuDe: ["thời gian"] },
  { hanzi: "睡觉", pinyin: "shuì jiào", hanViet: "thụy giác", nghia: "ngủ", loaiTu: "động từ", bai: 13, chuDe: ["sinh hoạt"] },
  { hanzi: "电视", pinyin: "diàn shì", hanViet: "điện thị", nghia: "tivi", loaiTu: "danh từ", bai: 13, chuDe: ["giải trí", "đồ vật"] },
  { hanzi: "喜欢", pinyin: "xǐ huan", hanViet: "hỉ hoan", nghia: "thích", loaiTu: "động từ", bai: 13, chuDe: ["cảm xúc"] },
  { hanzi: "给", pinyin: "gěi", hanViet: "cấp", nghia: "cho, đưa; (gọi) cho ai", loaiTu: "động từ / giới từ", bai: 13, chuDe: ["động từ thường dùng"] },
  { hanzi: "打电话", pinyin: "dǎ diàn huà", hanViet: "đả điện thoại", nghia: "gọi điện thoại", loaiTu: "cụm động từ", bai: 13, chuDe: ["sinh hoạt"] },
  { hanzi: "吧", pinyin: "ba", hanViet: "ba", nghia: "(trợ từ đề nghị, phỏng đoán)", loaiTu: "trợ từ", bai: 13, chuDe: ["hư từ"] },
  { hanzi: "大卫", pinyin: "Dà wèi", hanViet: "Đại Vệ", nghia: "David (tên người)", loaiTu: "danh từ riêng", bai: 13, chuDe: ["tên riêng"] },

  // Bài 14
  { hanzi: "东西", pinyin: "dōng xi", hanViet: "đông tây", nghia: "đồ, đồ đạc", loaiTu: "danh từ", bai: 14, chuDe: ["mua sắm", "đồ vật"] },
  { hanzi: "一点儿", pinyin: "yì diǎn r", hanViet: "nhất điểm nhi", nghia: "một ít, một chút", loaiTu: "lượng từ", bai: 14, chuDe: ["lượng từ"] },
  { hanzi: "苹果", pinyin: "píng guǒ", hanViet: "bình quả", nghia: "quả táo", loaiTu: "danh từ", bai: 14, chuDe: ["ăn uống"] },
  { hanzi: "看见", pinyin: "kàn jiàn", hanViet: "khán kiến", nghia: "nhìn thấy", loaiTu: "động từ", bai: 14, chuDe: ["động từ thường dùng"] },
  { hanzi: "先生", pinyin: "xiān sheng", hanViet: "tiên sinh", nghia: "ông, ngài; chồng", loaiTu: "danh từ", bai: 14, chuDe: ["con người"] },
  { hanzi: "开", pinyin: "kāi", hanViet: "khai", nghia: "lái (xe); mở", loaiTu: "động từ", bai: 14, chuDe: ["giao thông"] },
  { hanzi: "车", pinyin: "chē", hanViet: "xa", nghia: "xe", loaiTu: "danh từ", bai: 14, chuDe: ["giao thông"] },
  { hanzi: "回来", pinyin: "huí lai", hanViet: "hồi lai", nghia: "quay về, trở lại", loaiTu: "động từ", bai: 14, chuDe: ["động từ thường dùng"] },
  { hanzi: "分钟", pinyin: "fēn zhōng", hanViet: "phân chung", nghia: "phút (khoảng thời gian)", loaiTu: "danh từ", bai: 14, chuDe: ["thời gian"] },
  { hanzi: "后", pinyin: "hòu", hanViet: "hậu", nghia: "sau", loaiTu: "danh từ phương vị", bai: 14, chuDe: ["thời gian", "phương hướng"] },
  { hanzi: "衣服", pinyin: "yī fu", hanViet: "y phục", nghia: "quần áo", loaiTu: "danh từ", bai: 14, chuDe: ["mua sắm"] },
  { hanzi: "漂亮", pinyin: "piào liang", hanViet: "phiêu lượng", nghia: "đẹp", loaiTu: "tính từ", bai: 14, chuDe: ["tính từ thường dùng"] },
  { hanzi: "啊", pinyin: "a", hanViet: "a", nghia: "(trợ từ nhấn mạnh cảm xúc)", loaiTu: "trợ từ", bai: 14, chuDe: ["hư từ"] },
  { hanzi: "少", pinyin: "shǎo", hanViet: "thiểu", nghia: "ít", loaiTu: "tính từ", bai: 14, chuDe: ["tính từ thường dùng"] },
  { hanzi: "不少", pinyin: "bù shǎo", hanViet: "bất thiểu", nghia: "nhiều, khá nhiều", loaiTu: "tính từ", bai: 14, chuDe: ["tính từ thường dùng"] },
  { hanzi: "这些", pinyin: "zhè xiē", hanViet: "giá ta", nghia: "những… này", loaiTu: "đại từ", bai: 14, chuDe: ["đại từ chỉ thị"] },
  { hanzi: "都", pinyin: "dōu", hanViet: "đô", nghia: "đều", loaiTu: "phó từ", bai: 14, chuDe: ["hư từ"] },
  { hanzi: "张", pinyin: "Zhāng", hanViet: "Trương", nghia: "Trương (họ người); tờ, tấm (lượng từ)", loaiTu: "danh từ riêng", bai: 14, chuDe: ["tên riêng"] },

  // Bài 15
  { hanzi: "认识", pinyin: "rèn shi", hanViet: "nhận thức", nghia: "quen, biết (ai)", loaiTu: "động từ", bai: 15, chuDe: ["giới thiệu"] },
  { hanzi: "年", pinyin: "nián", hanViet: "niên", nghia: "năm", loaiTu: "danh từ", bai: 15, chuDe: ["thời gian"] },
  { hanzi: "大学", pinyin: "dà xué", hanViet: "đại học", nghia: "đại học", loaiTu: "danh từ", bai: 15, chuDe: ["trường học", "địa điểm"] },
  { hanzi: "饭店", pinyin: "fàn diàn", hanViet: "phạn điếm", nghia: "khách sạn, nhà hàng", loaiTu: "danh từ", bai: 15, chuDe: ["địa điểm"] },
  { hanzi: "出租车", pinyin: "chū zū chē", hanViet: "xuất tô xa", nghia: "taxi", loaiTu: "danh từ", bai: 15, chuDe: ["giao thông"] },
  { hanzi: "一起", pinyin: "yì qǐ", hanViet: "nhất khởi", nghia: "cùng, cùng nhau", loaiTu: "phó từ", bai: 15, chuDe: ["hư từ"] },
  { hanzi: "高兴", pinyin: "gāo xìng", hanViet: "cao hứng", nghia: "vui, vui mừng", loaiTu: "tính từ", bai: 15, chuDe: ["cảm xúc"] },
  { hanzi: "听", pinyin: "tīng", hanViet: "thính", nghia: "nghe", loaiTu: "động từ", bai: 15, chuDe: ["động từ thường dùng"] },
  { hanzi: "飞机", pinyin: "fēi jī", hanViet: "phi cơ", nghia: "máy bay", loaiTu: "danh từ", bai: 15, chuDe: ["giao thông"] }
]);
