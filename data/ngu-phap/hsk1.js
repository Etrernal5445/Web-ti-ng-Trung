/*
 * NGỮ PHÁP HSK1 — theo Giáo trình chuẩn HSK1.
 *
 * Mỗi bài gồm:
 *   bai     : số bài
 *   tieuDe  : tên bài
 *   diem    : danh sách điểm ngữ pháp, mỗi điểm có
 *               ten       : tên điểm ngữ pháp
 *               cauTruc   : (tùy chọn) công thức cấu trúc
 *               giaiThich : (tùy chọn) giải thích
 *               viDu      : danh sách ví dụ { cn, py, vi }
 */
themNguPhap("hsk1", [
  {
    bai: 3, tieuDe: "你叫什么名字? (Bạn tên là gì?)",
    diem: [
      {
        ten: "Đại từ nghi vấn 什么 (shénme – cái gì, gì)",
        cauTruc: "… 什么 …?",
        giaiThich: "Dùng để hỏi về sự vật, tên gọi… Đặt 什么 đúng vào vị trí của thông tin cần hỏi, không đảo câu như tiếng Anh.",
        viDu: [
          { cn: "你叫什么名字?", py: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?" },
          { cn: "这是什么?", py: "Zhè shì shénme?", vi: "Đây là cái gì?" }
        ]
      },
      {
        ten: "Câu chữ 是 (shì – là)",
        cauTruc: "Chủ ngữ + (不) 是 + Danh từ",
        giaiThich: "Phủ định thì thêm 不 trước 是.",
        viDu: [
          { cn: "我是老师。", py: "Wǒ shì lǎoshī.", vi: "Tôi là giáo viên." },
          { cn: "我不是老师。", py: "Wǒ bú shì lǎoshī.", vi: "Tôi không phải là giáo viên." }
        ]
      },
      {
        ten: "Câu hỏi với 吗 (ma)",
        cauTruc: "Câu trần thuật + 吗?",
        giaiThich: "Thêm 吗 vào cuối câu trần thuật để biến thành câu hỏi có/không.",
        viDu: [
          { cn: "你是中国人吗?", py: "Nǐ shì Zhōngguó rén ma?", vi: "Bạn có phải là người Trung Quốc không?" }
        ]
      }
    ]
  },
  {
    bai: 4, tieuDe: "她是我的汉语老师。 (Cô ấy là giáo viên tiếng Trung của tôi.)",
    diem: [
      {
        ten: "Đại từ nghi vấn 谁 (shéi – ai) và 哪 (nǎ – nào)",
        giaiThich: "谁 hỏi về người; 哪 hỏi lựa chọn trong một nhóm (nước nào, người nào…).",
        viDu: [
          { cn: "她是谁?", py: "Tā shì shéi?", vi: "Cô ấy là ai?" },
          { cn: "你是哪国人?", py: "Nǐ shì nǎ guó rén?", vi: "Bạn là người nước nào?" }
        ]
      },
      {
        ten: "Trợ từ kết cấu 的 (de) – \"của\"",
        cauTruc: "Người/vật sở hữu + 的 + Danh từ",
        giaiThich: "Với quan hệ thân thiết (gia đình, bạn bè) có thể lược bỏ 的: 我妈妈, 我朋友.",
        viDu: [
          { cn: "我的汉语老师", py: "wǒ de Hànyǔ lǎoshī", vi: "giáo viên tiếng Trung của tôi" },
          { cn: "她的朋友", py: "tā de péngyou", vi: "bạn của cô ấy" }
        ]
      },
      {
        ten: "Trợ từ nghi vấn 呢 (1) – hỏi rút gọn",
        cauTruc: "A…, B 呢?",
        giaiThich: "Dựa vào câu trước để hỏi lại ngắn gọn, tương đương \"còn… thì sao?\".",
        viDu: [
          { cn: "我是老师，你呢?", py: "Wǒ shì lǎoshī, nǐ ne?", vi: "Tôi là giáo viên, còn bạn thì sao?" }
        ]
      }
    ]
  },
  {
    bai: 5, tieuDe: "她女儿今年二十岁。 (Con gái cô ấy năm nay 20 tuổi.)",
    diem: [
      {
        ten: "Đại từ nghi vấn 几 (jǐ – mấy)",
        cauTruc: "几 + Lượng từ + Danh từ?",
        giaiThich: "Hỏi số lượng nhỏ, thường dưới 10 (tuổi trẻ em, số người trong nhà, ngày, giờ…).",
        viDu: [
          { cn: "你女儿几岁?", py: "Nǐ nǚ'ér jǐ suì?", vi: "Con gái bạn mấy tuổi?" },
          { cn: "你家有几口人?", py: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà bạn có mấy người?" }
        ]
      },
      {
        ten: "Số đếm trong phạm vi 100",
        cauTruc: "Số chục + 十 + Số đơn vị",
        giaiThich: "二十 (èrshí) = 20, 二十一 (èrshíyī) = 21, 三十五 (sānshíwǔ) = 35, 一百 (yìbǎi) = 100.",
        viDu: [
          { cn: "她女儿今年二十岁。", py: "Tā nǚ'ér jīnnián èrshí suì.", vi: "Con gái cô ấy năm nay 20 tuổi." }
        ]
      },
      {
        ten: "了 thể hiện sự thay đổi",
        cauTruc: "… + 了 (cuối câu)",
        giaiThich: "Đặt cuối câu để nói về một trạng thái mới, đã thay đổi so với trước.",
        viDu: [
          { cn: "她今年二十岁了。", py: "Tā jīnnián èrshí suì le.", vi: "Năm nay cô ấy 20 tuổi rồi." }
        ]
      },
      {
        ten: "多 + 大 (duō dà) – hỏi tuổi người lớn",
        cauTruc: "Chủ ngữ + 多大 (了)?",
        giaiThich: "Hỏi tuổi trẻ em dùng 几岁, hỏi tuổi người lớn hoặc bạn bè cùng trang lứa dùng 多大.",
        viDu: [
          { cn: "她多大?", py: "Tā duō dà?", vi: "Cô ấy bao nhiêu tuổi?" }
        ]
      }
    ]
  },
  {
    bai: 6, tieuDe: "我会说汉语。 (Tôi biết nói tiếng Trung.)",
    diem: [
      {
        ten: "Động từ năng nguyện 会 (huì) (1) – biết (do học mà có)",
        cauTruc: "Chủ ngữ + (不) 会 + Động từ",
        giaiThich: "Diễn tả khả năng có được nhờ học tập, luyện tập. Phủ định: 不会.",
        viDu: [
          { cn: "我会说汉语。", py: "Wǒ huì shuō Hànyǔ.", vi: "Tôi biết nói tiếng Trung." },
          { cn: "我不会说汉语。", py: "Wǒ bú huì shuō Hànyǔ.", vi: "Tôi không biết nói tiếng Trung." }
        ]
      },
      {
        ten: "Câu vị ngữ tính từ",
        cauTruc: "Chủ ngữ + 很 + Tính từ",
        giaiThich: "Tính từ làm vị ngữ trực tiếp, KHÔNG dùng 是 trước tính từ. Thường thêm 很 cho câu tự nhiên (很 lúc này không nhất thiết mang nghĩa \"rất\").",
        viDu: [
          { cn: "她很好。", py: "Tā hěn hǎo.", vi: "Cô ấy khỏe/tốt." },
          { cn: "中国菜很好吃。", py: "Zhōngguó cài hěn hǎochī.", vi: "Món Trung Quốc rất ngon." }
        ]
      },
      {
        ten: "Đại từ nghi vấn 怎么 (1) – như thế nào (hỏi cách thức)",
        cauTruc: "怎么 + Động từ?",
        viDu: [
          { cn: "\"老师\"怎么说?", py: "\"Lǎoshī\" zěnme shuō?", vi: "\"Giáo viên\" nói thế nào?" },
          { cn: "这个字怎么写?", py: "Zhège zì zěnme xiě?", vi: "Chữ này viết thế nào?" }
        ]
      }
    ]
  },
  {
    bai: 7, tieuDe: "今天几号? (Hôm nay là ngày mấy?)",
    diem: [
      {
        ten: "Cách nói ngày tháng (1): 月 – 号/日 – 星期",
        cauTruc: "… 月 … 号, 星期 …",
        giaiThich: "Thứ Hai đến thứ Bảy là 星期一 … 星期六; Chủ nhật là 星期天 / 星期日.",
        viDu: [
          { cn: "今天九月十号。", py: "Jīntiān jiǔ yuè shí hào.", vi: "Hôm nay ngày 10 tháng 9." },
          { cn: "今天星期一。", py: "Jīntiān xīngqīyī.", vi: "Hôm nay thứ Hai." }
        ]
      },
      {
        ten: "Câu vị ngữ danh từ",
        cauTruc: "Chủ ngữ + Danh từ (ngày tháng, tuổi, giá cả…)",
        giaiThich: "Khi nói ngày tháng, tuổi, giá cả… danh từ có thể làm vị ngữ trực tiếp, không cần 是.",
        viDu: [
          { cn: "明天星期六。", py: "Míngtiān xīngqīliù.", vi: "Ngày mai thứ Bảy." }
        ]
      },
      {
        ten: "Câu liên động (1): 去 + địa điểm + làm gì",
        cauTruc: "Chủ ngữ + 去 + Địa điểm + Động từ (+ Tân ngữ)",
        giaiThich: "Một chủ ngữ có hai động từ liên tiếp, diễn tả \"đi đâu để làm gì\".",
        viDu: [
          { cn: "我去学校看书。", py: "Wǒ qù xuéxiào kàn shū.", vi: "Tôi đến trường đọc sách." }
        ]
      }
    ]
  },
  {
    bai: 8, tieuDe: "我想喝茶。 (Tôi muốn uống trà.)",
    diem: [
      {
        ten: "Động từ năng nguyện 想 (xiǎng) – muốn",
        cauTruc: "Chủ ngữ + (不) 想 + Động từ",
        viDu: [
          { cn: "我想喝茶。", py: "Wǒ xiǎng hē chá.", vi: "Tôi muốn uống trà." }
        ]
      },
      {
        ten: "Đại từ nghi vấn 多少 (duōshao) – bao nhiêu",
        giaiThich: "几 hỏi số nhỏ (thường < 10) và phải có lượng từ; 多少 hỏi số bất kỳ, có thể bỏ lượng từ.",
        viDu: [
          { cn: "多少钱?", py: "Duōshao qián?", vi: "Bao nhiêu tiền?" }
        ]
      },
      {
        ten: "Lượng từ 个 (gè) và 口 (kǒu)",
        cauTruc: "Số từ + Lượng từ + Danh từ",
        giaiThich: "个 là lượng từ chung, dùng cho nhiều danh từ; 口 dùng để đếm số người trong gia đình.",
        viDu: [
          { cn: "一个杯子", py: "yí gè bēizi", vi: "một cái cốc" },
          { cn: "我家有五口人。", py: "Wǒ jiā yǒu wǔ kǒu rén.", vi: "Nhà tôi có 5 người." }
        ]
      },
      {
        ten: "Cách nói số tiền",
        cauTruc: "Số + 块 (钱)",
        giaiThich: "块 là đơn vị tiền cơ bản trong khẩu ngữ (tương đương 元).",
        viDu: [
          { cn: "十块钱", py: "shí kuài qián", vi: "mười đồng" }
        ]
      }
    ]
  },
  {
    bai: 9, tieuDe: "你儿子在哪儿工作? (Con trai anh làm việc ở đâu?)",
    diem: [
      {
        ten: "Động từ 在 (zài) – ở, tại",
        cauTruc: "Người/vật + 在 + Địa điểm",
        viDu: [
          { cn: "他在医院。", py: "Tā zài yīyuàn.", vi: "Anh ấy ở bệnh viện." }
        ]
      },
      {
        ten: "Đại từ nghi vấn 哪儿 (nǎr) – ở đâu",
        viDu: [
          { cn: "你在哪儿工作?", py: "Nǐ zài nǎr gōngzuò?", vi: "Bạn làm việc ở đâu?" }
        ]
      },
      {
        ten: "Giới từ 在 – nơi diễn ra hành động",
        cauTruc: "Chủ ngữ + 在 + Địa điểm + Động từ",
        giaiThich: "Cụm 在 + địa điểm đứng TRƯỚC động từ (tiếng Việt thường đặt sau).",
        viDu: [
          { cn: "我在家看书。", py: "Wǒ zài jiā kàn shū.", vi: "Tôi đọc sách ở nhà." }
        ]
      },
      {
        ten: "Trợ từ nghi vấn 呢 (2) – hỏi \"…đâu rồi?\"",
        cauTruc: "Danh từ + 呢?",
        viDu: [
          { cn: "我的杯子呢?", py: "Wǒ de bēizi ne?", vi: "Cốc của tôi đâu rồi?" }
        ]
      }
    ]
  },
  {
    bai: 10, tieuDe: "我能坐这儿吗? (Tôi có thể ngồi đây được không?)",
    diem: [
      {
        ten: "Câu chữ 有 – diễn tả sự tồn tại",
        cauTruc: "Địa điểm + 有 + (Số lượng) + Danh từ",
        giaiThich: "Phủ định: 没有.",
        viDu: [
          { cn: "桌子上有一本书。", py: "Zhuōzi shang yǒu yì běn shū.", vi: "Trên bàn có một quyển sách." }
        ]
      },
      {
        ten: "Liên từ 和 (hé) – và",
        cauTruc: "Danh từ + 和 + Danh từ",
        giaiThich: "和 chỉ nối danh từ/đại từ, không dùng để nối hai câu.",
        viDu: [
          { cn: "我和你", py: "wǒ hé nǐ", vi: "tôi và bạn" }
        ]
      },
      {
        ten: "Động từ năng nguyện 能 (néng) – có thể, được phép",
        cauTruc: "Chủ ngữ + (不) 能 + Động từ",
        viDu: [
          { cn: "我能坐这儿吗?", py: "Wǒ néng zuò zhèr ma?", vi: "Tôi có thể ngồi đây được không?" }
        ]
      },
      {
        ten: "Câu cầu khiến với 请 (qǐng) – mời, xin",
        cauTruc: "请 + Động từ",
        viDu: [
          { cn: "请坐。", py: "Qǐng zuò.", vi: "Mời ngồi." }
        ]
      }
    ]
  },
  {
    bai: 11, tieuDe: "现在几点? (Bây giờ là mấy giờ?)",
    diem: [
      {
        ten: "Cách nói giờ, phút",
        cauTruc: "… 点 … 分",
        viDu: [
          { cn: "现在三点十分。", py: "Xiànzài sān diǎn shí fēn.", vi: "Bây giờ là 3 giờ 10 phút." }
        ]
      },
      {
        ten: "Từ chỉ thời gian làm trạng ngữ",
        cauTruc: "Chủ ngữ + Thời gian + Động từ  /  Thời gian + Chủ ngữ + Động từ",
        giaiThich: "Từ chỉ thời gian đặt trước động từ (hoặc đầu câu), khác tiếng Việt hay đặt cuối câu.",
        viDu: [
          { cn: "我们六点吃饭。", py: "Wǒmen liù diǎn chī fàn.", vi: "Chúng tôi ăn cơm lúc 6 giờ." }
        ]
      },
      {
        ten: "Danh từ 前 (qián) – trước",
        cauTruc: "Thời gian + 前",
        viDu: [
          { cn: "十二点前", py: "shí'èr diǎn qián", vi: "trước 12 giờ" }
        ]
      }
    ]
  },
  {
    bai: 12, tieuDe: "明天天气怎么样? (Ngày mai thời tiết thế nào?)",
    diem: [
      {
        ten: "Đại từ nghi vấn 怎么样 (zěnmeyàng) – thế nào",
        cauTruc: "Chủ ngữ + 怎么样?",
        viDu: [
          { cn: "明天天气怎么样?", py: "Míngtiān tiānqì zěnmeyàng?", vi: "Ngày mai thời tiết thế nào?" }
        ]
      },
      {
        ten: "Câu vị ngữ chủ-vị",
        cauTruc: "Chủ ngữ lớn + [Chủ ngữ nhỏ + Vị ngữ]",
        giaiThich: "Một cụm chủ-vị nhỏ làm vị ngữ cho cả câu.",
        viDu: [
          { cn: "他身体很好。", py: "Tā shēntǐ hěn hǎo.", vi: "Anh ấy sức khỏe rất tốt." }
        ]
      },
      {
        ten: "Phó từ chỉ mức độ 太 (tài) – quá",
        cauTruc: "太 + Tính từ + 了",
        viDu: [
          { cn: "太热了!", py: "Tài rè le!", vi: "Nóng quá!" }
        ]
      },
      {
        ten: "Động từ năng nguyện 会 (2) – dự đoán (sẽ)",
        cauTruc: "Chủ ngữ + 会 + Động từ",
        viDu: [
          { cn: "明天会下雨。", py: "Míngtiān huì xià yǔ.", vi: "Ngày mai sẽ mưa." }
        ]
      }
    ]
  },
  {
    bai: 13, tieuDe: "他在学做中国菜呢。 (Anh ấy đang học nấu món Trung Quốc.)",
    diem: [
      {
        ten: "Thán từ 喂 (wèi) – a lô, này",
        viDu: [
          { cn: "喂，你好!", py: "Wèi, nǐ hǎo!", vi: "A lô, xin chào!" }
        ]
      },
      {
        ten: "在……呢 – hành động đang diễn ra",
        cauTruc: "Chủ ngữ + 在 + Động từ (+ Tân ngữ) + 呢",
        viDu: [
          { cn: "他在学做中国菜呢。", py: "Tā zài xué zuò Zhōngguó cài ne.", vi: "Anh ấy đang học nấu món Trung Quốc." }
        ]
      },
      {
        ten: "Cách đọc số điện thoại",
        giaiThich: "Đọc từng chữ số riêng lẻ; số 1 đọc là yāo (không đọc yī) để tránh nhầm khi nói nhanh.",
        viDu: [
          { cn: "我的电话是 13910。", py: "Wǒ de diànhuà shì yāo sān jiǔ yāo líng.", vi: "Số điện thoại của tôi là 13910." }
        ]
      },
      {
        ten: "Trợ từ ngữ khí 吧 (ba) – đề nghị, phỏng đoán",
        cauTruc: "… + 吧",
        viDu: [
          { cn: "我们一起去吧。", py: "Wǒmen yìqǐ qù ba.", vi: "Chúng ta cùng đi nhé." }
        ]
      }
    ]
  },
  {
    bai: 14, tieuDe: "她买了不少衣服。 (Cô ấy đã mua nhiều quần áo.)",
    diem: [
      {
        ten: "了 – sự việc đã xảy ra, hoàn thành",
        cauTruc: "Chủ ngữ + Động từ + 了 + (Số lượng) + Tân ngữ",
        giaiThich: "Phủ định dùng 没 (有) + Động từ và bỏ 了.",
        viDu: [
          { cn: "她买了不少衣服。", py: "Tā mǎile bù shǎo yīfu.", vi: "Cô ấy đã mua khá nhiều quần áo." }
        ]
      },
      {
        ten: "Danh từ 后 (hòu) – sau",
        cauTruc: "Thời gian/Sự việc + 后",
        viDu: [
          { cn: "五分钟后", py: "wǔ fēnzhōng hòu", vi: "sau 5 phút" }
        ]
      },
      {
        ten: "Trợ từ ngữ khí 啊 (a) – nhấn mạnh cảm xúc",
        cauTruc: "… + 啊",
        viDu: [
          { cn: "是啊，太热了!", py: "Shì a, tài rè le!", vi: "Đúng vậy, nóng quá!" }
        ]
      },
      {
        ten: "Phó từ 都 (dōu) – đều",
        cauTruc: "Chủ ngữ (số nhiều) + 都 + Động từ/Tính từ",
        giaiThich: "都 đứng sau chủ ngữ, trước động từ.",
        viDu: [
          { cn: "我们都是学生。", py: "Wǒmen dōu shì xuésheng.", vi: "Chúng tôi đều là học sinh." }
        ]
      }
    ]
  },
  {
    bai: 15, tieuDe: "我是坐飞机来的。 (Tôi đến bằng máy bay.)",
    diem: [
      {
        ten: "Câu 是……的 – nhấn mạnh thời gian, địa điểm, cách thức",
        cauTruc: "Chủ ngữ + 是 + [Thời gian/Địa điểm/Cách thức] + Động từ + 的",
        giaiThich: "Dùng cho việc ĐÃ xảy ra, muốn nhấn mạnh thông tin đi kèm.",
        viDu: [
          { cn: "我是坐飞机来的。", py: "Wǒ shì zuò fēijī lái de.", vi: "Tôi đến bằng máy bay (nhấn mạnh phương tiện)." }
        ]
      },
      {
        ten: "Cách nói ngày tháng (2): năm – tháng – ngày – thứ",
        cauTruc: "… 年 … 月 … 号, 星期 …",
        giaiThich: "Thứ tự luôn từ lớn đến nhỏ: Năm → Tháng → Ngày → Thứ, ngược với tiếng Việt. Năm đọc từng chữ số.",
        viDu: [
          { cn: "二零二一年三月五号", py: "èr líng èr yī nián sān yuè wǔ hào", vi: "ngày 5 tháng 3 năm 2021" }
        ]
      }
    ]
  }
], [
  // Mẹo ghi nhớ nhanh: [chủ điểm, từ khóa, ghi nhớ]
  ["Khả năng", "会 / 能 / 想", "会 = biết làm (do học), 能 = có thể/được phép, 想 = muốn"],
  ["Hỏi số lượng", "几 / 多少", "几 = số nhỏ (< 10), 多少 = số bất kỳ"],
  ["Hỏi tuổi", "几岁 / 多大", "几岁 = trẻ em, 多大 = người lớn"],
  ["了", "了 (1) / 了 (2)", "Cuối câu = đổi trạng thái; sau động từ = hành động đã xong"],
  ["Trật tự thời gian", "年月日", "Luôn từ lớn đến nhỏ: Năm → Tháng → Ngày → Giờ (ngược tiếng Việt)"],
  ["Vị trí trạng ngữ thời gian, nơi chốn", "trước động từ", "Khác tiếng Việt (thường đặt cuối câu)"]
]);
