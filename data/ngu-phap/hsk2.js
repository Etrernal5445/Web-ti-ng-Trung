/*
 * NGỮ PHÁP HSK2 — theo 15 bài của Giáo trình chuẩn HSK2 (HSK标准教程2).
 * Danh sách điểm ngữ pháp từng bài đối chiếu theo bảng thống kê của giáo trình;
 * phần giải thích và ví dụ được soạn lại bằng tiếng Việt.
 * Cấu trúc: xem chú thích đầu file hsk1.js.
 */
themNguPhap("hsk2", [
  {
    bai: 1, tieuDe: "九月去北京旅游最好。 (Tháng 9 đi Bắc Kinh du lịch là tốt nhất.)",
    diem: [
      {
        ten: "Động từ năng nguyện 要 (yào) – muốn",
        cauTruc: "Chủ ngữ + 要 + Động từ",
        giaiThich: "Diễn tả ý muốn, dự định làm gì (mạnh hơn 想). Phủ định thường dùng 不想, không nói 不要 với nghĩa này.",
        viDu: [
          { cn: "我要去北京旅游。", py: "Wǒ yào qù Běijīng lǚyóu.", vi: "Tôi muốn đi Bắc Kinh du lịch." }
        ]
      },
      {
        ten: "Phó từ chỉ mức độ 最 (zuì) – nhất",
        cauTruc: "最 + Tính từ / Động từ tâm lý",
        viDu: [
          { cn: "九月去北京旅游最好。", py: "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo.", vi: "Tháng 9 đi Bắc Kinh du lịch là tốt nhất." },
          { cn: "我最喜欢吃羊肉。", py: "Wǒ zuì xǐhuan chī yángròu.", vi: "Tôi thích ăn thịt dê nhất." }
        ]
      },
      {
        ten: "Số ước lượng với 几 và 多",
        cauTruc: "十几 / 几十 + Lượng từ;  Số tròn chục + 多 + Lượng từ",
        giaiThich: "十几 = mười mấy, 几十 = mấy chục, 二十多 = hơn hai mươi.",
        viDu: [
          { cn: "教室里有十几个学生。", py: "Jiàoshì li yǒu shí jǐ gè xuésheng.", vi: "Trong lớp có mười mấy học sinh." },
          { cn: "他二十多岁。", py: "Tā èrshí duō suì.", vi: "Anh ấy hơn hai mươi tuổi." }
        ]
      }
    ]
  },
  {
    bai: 2, tieuDe: "我每天六点起床。 (Mỗi ngày tôi thức dậy lúc 6 giờ.)",
    diem: [
      {
        ten: "Câu hỏi với 是不是",
        cauTruc: "…，是不是?  /  Chủ ngữ + 是不是 + Vị ngữ?",
        giaiThich: "Dùng khi người hỏi đã đoán trước câu trả lời và muốn xác nhận lại: \"có phải… không?\".",
        viDu: [
          { cn: "你生病了，是不是?", py: "Nǐ shēngbìng le, shì bu shì?", vi: "Bạn bị ốm rồi, phải không?" },
          { cn: "你是不是每天都跑步?", py: "Nǐ shì bu shì měi tiān dōu pǎobù?", vi: "Có phải ngày nào bạn cũng chạy bộ không?" }
        ]
      },
      {
        ten: "Đại từ 每 (měi) – mỗi",
        cauTruc: "每 + (Số từ) + Lượng từ + Danh từ (+ 都 …)",
        giaiThich: "Riêng 天, 年 có thể đứng ngay sau 每: 每天, 每年. Câu có 每 thường đi kèm 都.",
        viDu: [
          { cn: "我每天六点起床。", py: "Wǒ měi tiān liù diǎn qǐ chuáng.", vi: "Mỗi ngày tôi dậy lúc 6 giờ." },
          { cn: "每个人都很高兴。", py: "Měi gè rén dōu hěn gāoxìng.", vi: "Mọi người đều rất vui." }
        ]
      },
      {
        ten: "Đại từ nghi vấn 多 – hỏi mức độ",
        cauTruc: "Chủ ngữ + (有) 多 + 高/大/长/远…?",
        viDu: [
          { cn: "你有多高?", py: "Nǐ yǒu duō gāo?", vi: "Bạn cao bao nhiêu?" },
          { cn: "你每天跑步跑多长时间?", py: "Nǐ měi tiān pǎobù pǎo duō cháng shíjiān?", vi: "Mỗi ngày bạn chạy bộ bao lâu?" }
        ]
      }
    ]
  },
  {
    bai: 3, tieuDe: "左边那个红色的是我的。 (Cái màu đỏ bên trái là của tôi.)",
    diem: [
      {
        ten: "Cụm chữ 的",
        cauTruc: "Danh từ / Đại từ / Tính từ / Động từ + 的",
        giaiThich: "Cụm 的 dùng như một danh từ, thay cho vật đã nhắc đến: 红色的 = cái màu đỏ, 我的 = của tôi.",
        viDu: [
          { cn: "左边那个红色的是我的。", py: "Zuǒbian nàge hóngsè de shì wǒ de.", vi: "Cái màu đỏ bên trái là của tôi." },
          { cn: "这个杯子是新的。", py: "Zhège bēizi shì xīn de.", vi: "Cái cốc này là cái mới." }
        ]
      },
      {
        ten: "Động từ + 一下 – làm thử, làm một chút",
        cauTruc: "Động từ + 一下 (+ Tân ngữ)",
        giaiThich: "Làm nhẹ nhàng câu nói, mang nghĩa \"thử\", \"một chút\".",
        viDu: [
          { cn: "我介绍一下，这是我朋友。", py: "Wǒ jièshào yíxià, zhè shì wǒ péngyou.", vi: "Tôi giới thiệu một chút, đây là bạn tôi." }
        ]
      },
      {
        ten: "Phó từ ngữ khí 真 (zhēn) – thật là",
        cauTruc: "真 + Tính từ",
        giaiThich: "Dùng để cảm thán. Không dùng 真 + Tính từ làm định ngữ (không nói 真漂亮的衣服).",
        viDu: [
          { cn: "你的手表真漂亮!", py: "Nǐ de shǒubiǎo zhēn piàoliang!", vi: "Đồng hồ của bạn đẹp thật!" }
        ]
      }
    ]
  },
  {
    bai: 4, tieuDe: "这个工作是他帮我介绍的。 (Công việc này là anh ấy giúp tôi giới thiệu.)",
    diem: [
      {
        ten: "Câu 是……的 (2) – nhấn mạnh người thực hiện",
        cauTruc: "Chủ ngữ + 是 + Người thực hiện + Động từ + 的",
        giaiThich: "Mở rộng của 是……的 ở HSK1: ngoài thời gian, địa điểm, cách thức còn nhấn mạnh AI làm việc đó.",
        viDu: [
          { cn: "这个工作是他帮我介绍的。", py: "Zhège gōngzuò shì tā bāng wǒ jièshào de.", vi: "Công việc này là anh ấy giúp tôi giới thiệu." }
        ]
      },
      {
        ten: "……的时候 – khi…, lúc…",
        cauTruc: "Động từ / Cụm chủ-vị + 的时候，…",
        giaiThich: "Cụm 的时候 làm trạng ngữ chỉ thời gian, đứng đầu câu hoặc sau chủ ngữ.",
        viDu: [
          { cn: "我生日的时候，妈妈送了我一个手表。", py: "Wǒ shēngrì de shíhou, māma sòngle wǒ yí gè shǒubiǎo.", vi: "Lúc sinh nhật tôi, mẹ tặng tôi một chiếc đồng hồ." },
          { cn: "吃饭的时候别看手机。", py: "Chī fàn de shíhou bié kàn shǒujī.", vi: "Lúc ăn cơm đừng xem điện thoại." }
        ]
      },
      {
        ten: "Phó từ thời gian 已经 (yǐjīng) – đã",
        cauTruc: "Chủ ngữ + 已经 + Động từ/Tính từ + 了",
        viDu: [
          { cn: "我已经知道了。", py: "Wǒ yǐjīng zhīdao le.", vi: "Tôi đã biết rồi." },
          { cn: "他已经工作两年了。", py: "Tā yǐjīng gōngzuò liǎng nián le.", vi: "Anh ấy đã làm việc được hai năm rồi." }
        ]
      }
    ]
  },
  {
    bai: 5, tieuDe: "就买这件吧。 (Mua chiếc này đi.)",
    diem: [
      {
        ten: "Phó từ 就 (jiù) – nhấn mạnh, chốt lựa chọn",
        cauTruc: "就 + Động từ (+ 吧)",
        giaiThich: "Diễn tả quyết định dứt khoát hoặc khẳng định \"chính là\", \"ngay\".",
        viDu: [
          { cn: "就买这件吧。", py: "Jiù mǎi zhè jiàn ba.", vi: "Mua chiếc này đi." },
          { cn: "我家就在旁边。", py: "Wǒ jiā jiù zài pángbiān.", vi: "Nhà tôi ở ngay bên cạnh." }
        ]
      },
      {
        ten: "Phó từ ngữ khí 还 (hái) (1) – cũng được, tạm",
        cauTruc: "还 + Tính từ (还可以 / 还不错 / 还好)",
        giaiThich: "Đánh giá ở mức tạm được, chấp nhận được.",
        viDu: [
          { cn: "这件衣服还可以。", py: "Zhè jiàn yīfu hái kěyǐ.", vi: "Chiếc áo này cũng được." },
          { cn: "考试考得怎么样? —— 还不错。", py: "Kǎoshì kǎo de zěnmeyàng? —— Hái búcuò.", vi: "Thi thế nào? — Cũng khá ổn." }
        ]
      },
      {
        ten: "Phó từ chỉ mức độ 有点儿 (yǒudiǎnr) – hơi",
        cauTruc: "有点儿 + Tính từ / Động từ tâm lý",
        giaiThich: "Thường mang ý không hài lòng. Khác 一点儿 (đứng SAU tính từ: 便宜一点儿 = rẻ hơn chút).",
        viDu: [
          { cn: "这件衣服有点儿贵。", py: "Zhè jiàn yīfu yǒudiǎnr guì.", vi: "Chiếc áo này hơi đắt." }
        ]
      }
    ]
  },
  {
    bai: 6, tieuDe: "你怎么不吃了? (Sao bạn không ăn nữa?)",
    diem: [
      {
        ten: "Đại từ nghi vấn 怎么 (2) – sao, tại sao",
        cauTruc: "Chủ ngữ + 怎么 + (不/没) + Động từ?",
        giaiThich: "Hỏi nguyên nhân, thường kèm cảm giác ngạc nhiên. Khác 怎么 (1) ở HSK1 dùng hỏi cách thức.",
        viDu: [
          { cn: "你怎么不吃了?", py: "Nǐ zěnme bù chī le?", vi: "Sao bạn không ăn nữa?" },
          { cn: "他怎么还没来?", py: "Tā zěnme hái méi lái?", vi: "Sao anh ấy vẫn chưa đến?" }
        ]
      },
      {
        ten: "Lặp lượng từ – mỗi, tất cả",
        cauTruc: "Lượng từ lặp lại (个个, 天天, 件件…) + 都 …",
        giaiThich: "Mang nghĩa \"mỗi… đều\", \"tất cả không trừ cái nào\".",
        viDu: [
          { cn: "他天天都去游泳。", py: "Tā tiāntiān dōu qù yóuyǒng.", vi: "Ngày nào anh ấy cũng đi bơi." },
          { cn: "这些衣服件件都很漂亮。", py: "Zhèxiē yīfu jiànjiàn dōu hěn piàoliang.", vi: "Chỗ quần áo này chiếc nào cũng đẹp." }
        ]
      },
      {
        ten: "因为……，所以…… – vì… nên…",
        cauTruc: "因为 + Nguyên nhân，所以 + Kết quả",
        giaiThich: "Có thể chỉ dùng một trong hai từ.",
        viDu: [
          { cn: "因为下雨了，所以我没去打篮球。", py: "Yīnwèi xià yǔ le, suǒyǐ wǒ méi qù dǎ lánqiú.", vi: "Vì trời mưa nên tôi không đi chơi bóng rổ." }
        ]
      }
    ]
  },
  {
    bai: 7, tieuDe: "你家离公司远吗? (Nhà bạn có xa công ty không?)",
    diem: [
      {
        ten: "Phó từ ngữ khí 还 (hái) (2) – vẫn, còn",
        cauTruc: "Chủ ngữ + 还 + Động từ/Tính từ",
        giaiThich: "Trạng thái vẫn tiếp diễn, chưa thay đổi.",
        viDu: [
          { cn: "他还在睡觉。", py: "Tā hái zài shuì jiào.", vi: "Anh ấy vẫn đang ngủ." },
          { cn: "现在还早，我们再坐一下吧。", py: "Xiànzài hái zǎo, wǒmen zài zuò yíxià ba.", vi: "Bây giờ vẫn còn sớm, chúng ta ngồi thêm chút nữa đi." }
        ]
      },
      {
        ten: "Phó từ thời gian 就 (jiù) – sớm, nhanh, ngay",
        cauTruc: "Thời gian + 就 + Động từ (+ 了)",
        giaiThich: "Người nói cho rằng sự việc xảy ra sớm hoặc nhanh hơn dự kiến.",
        viDu: [
          { cn: "坐出租车十分钟就到了。", py: "Zuò chūzūchē shí fēnzhōng jiù dào le.", vi: "Đi taxi mười phút là tới." },
          { cn: "他早上六点就去公司了。", py: "Tā zǎoshang liù diǎn jiù qù gōngsī le.", vi: "Mới 6 giờ sáng anh ấy đã đi làm rồi." }
        ]
      },
      {
        ten: "Giới từ 离 (lí) – cách",
        cauTruc: "A + 离 + B + 远/近",
        viDu: [
          { cn: "你家离公司远吗?", py: "Nǐ jiā lí gōngsī yuǎn ma?", vi: "Nhà bạn có xa công ty không?" },
          { cn: "学校离这儿很近。", py: "Xuéxiào lí zhèr hěn jìn.", vi: "Trường học cách đây rất gần." }
        ]
      },
      {
        ten: "Trợ từ ngữ khí 呢 – nhấn mạnh, khẳng định",
        cauTruc: "… + 呢 (cuối câu trần thuật)",
        giaiThich: "Làm câu nói nhẹ nhàng, nhấn mạnh sự thật, hay đi với 还: 还早呢, 还远呢.",
        viDu: [
          { cn: "机场离这儿还远呢。", py: "Jīchǎng lí zhèr hái yuǎn ne.", vi: "Sân bay còn xa lắm." }
        ]
      }
    ]
  },
  {
    bai: 8, tieuDe: "让我想想再告诉你。 (Để tôi nghĩ đã rồi nói với bạn.)",
    diem: [
      {
        ten: "Câu hỏi ……，好吗?",
        cauTruc: "Đề nghị + ，好吗?",
        giaiThich: "Dùng để đưa ra đề nghị và hỏi ý kiến người nghe một cách lịch sự: \"…, được không?\".",
        viDu: [
          { cn: "我们明天再去，好吗?", py: "Wǒmen míngtiān zài qù, hǎo ma?", vi: "Mai chúng ta đi, được không?" }
        ]
      },
      {
        ten: "Phó từ 再 (zài) – rồi mới, lại (trong tương lai)",
        cauTruc: "Việc 1 + 再 + Việc 2",
        giaiThich: "再 dùng cho việc chưa xảy ra; việc đã lặp lại trong quá khứ dùng 又 (HSK3).",
        viDu: [
          { cn: "吃了饭再去吧。", py: "Chīle fàn zài qù ba.", vi: "Ăn cơm xong rồi hãy đi." },
          { cn: "请再说一次。", py: "Qǐng zài shuō yí cì.", vi: "Xin nói lại một lần nữa." }
        ]
      },
      {
        ten: "Câu kiêm ngữ với 让 (ràng) – để, bảo, cho phép",
        cauTruc: "A + 让 + B + Động từ",
        giaiThich: "B vừa là tân ngữ của 让 vừa là chủ ngữ của động từ phía sau.",
        viDu: [
          { cn: "让我想想再告诉你。", py: "Ràng wǒ xiǎngxiang zài gàosu nǐ.", vi: "Để tôi nghĩ đã rồi nói với bạn." },
          { cn: "医生让他多休息。", py: "Yīshēng ràng tā duō xiūxi.", vi: "Bác sĩ bảo anh ấy nghỉ ngơi nhiều." }
        ]
      },
      {
        ten: "Lặp động từ",
        cauTruc: "AA / A一A (động từ 1 âm tiết);  ABAB (động từ 2 âm tiết)",
        giaiThich: "Diễn tả hành động ngắn, mang tính thử, làm câu nói nhẹ nhàng hơn.",
        viDu: [
          { cn: "你看看这本书。", py: "Nǐ kànkan zhè běn shū.", vi: "Bạn xem thử quyển sách này." },
          { cn: "我们休息休息吧。", py: "Wǒmen xiūxi xiūxi ba.", vi: "Chúng ta nghỉ ngơi một chút đi." }
        ]
      }
    ]
  },
  {
    bai: 9, tieuDe: "题太多，我没做完。 (Đề nhiều quá, tôi làm không xong.)",
    diem: [
      {
        ten: "Bổ ngữ kết quả",
        cauTruc: "Động từ + 完/懂/见/错/到/好 (+ Tân ngữ)",
        giaiThich: "Phần sau động từ cho biết kết quả của hành động. Phủ định: 没 + Động từ + Bổ ngữ.",
        viDu: [
          { cn: "题太多，我没做完。", py: "Tí tài duō, wǒ méi zuò wán.", vi: "Đề nhiều quá, tôi làm không xong." },
          { cn: "你听懂了吗?", py: "Nǐ tīng dǒng le ma?", vi: "Bạn nghe hiểu chưa?" },
          { cn: "这个字我写错了。", py: "Zhège zì wǒ xiě cuò le.", vi: "Chữ này tôi viết sai rồi." }
        ]
      },
      {
        ten: "Giới từ 从 (cóng) – từ",
        cauTruc: "从 + Nơi chốn/Thời gian (+ 到 …) + Động từ",
        viDu: [
          { cn: "我从九点开始上班。", py: "Wǒ cóng jiǔ diǎn kāishǐ shàngbān.", vi: "Tôi bắt đầu làm việc từ 9 giờ." },
          { cn: "从这儿到机场要一个小时。", py: "Cóng zhèr dào jīchǎng yào yí gè xiǎoshí.", vi: "Từ đây đến sân bay mất một tiếng." }
        ]
      },
      {
        ten: "Số thứ tự với 第 (dì)",
        cauTruc: "第 + Số từ + (Lượng từ) + Danh từ",
        viDu: [
          { cn: "这是我第一次来中国。", py: "Zhè shì wǒ dì yī cì lái Zhōngguó.", vi: "Đây là lần đầu tiên tôi đến Trung Quốc." }
        ]
      }
    ]
  },
  {
    bai: 10, tieuDe: "别找了，手机在桌子上呢。 (Đừng tìm nữa, điện thoại ở trên bàn đấy.)",
    diem: [
      {
        ten: "Câu cầu khiến 不要……了 / 别……了 – đừng… nữa",
        cauTruc: "别/不要 + Động từ + 了",
        giaiThich: "Khuyên ngăn ai dừng việc đang làm.",
        viDu: [
          { cn: "别找了，手机在桌子上呢。", py: "Bié zhǎo le, shǒujī zài zhuōzi shang ne.", vi: "Đừng tìm nữa, điện thoại ở trên bàn đấy." },
          { cn: "不要看电视了。", py: "Búyào kàn diànshì le.", vi: "Đừng xem tivi nữa." }
        ]
      },
      {
        ten: "Giới từ 对 (duì) – đối với",
        cauTruc: "A + 对 + B + Tính từ/Động từ",
        viDu: [
          { cn: "运动对身体好。", py: "Yùndòng duì shēntǐ hǎo.", vi: "Vận động tốt cho sức khỏe." }
        ]
      }
    ]
  },
  {
    bai: 11, tieuDe: "他比我大三岁。 (Anh ấy lớn hơn tôi 3 tuổi.)",
    diem: [
      {
        ten: "Cụm động từ làm định ngữ",
        cauTruc: "Động từ (+ Tân ngữ) + 的 + Danh từ",
        giaiThich: "Cụm động từ đứng TRƯỚC danh từ để bổ nghĩa, nối bằng 的 (tiếng Việt đặt sau).",
        viDu: [
          { cn: "唱歌的那个女孩子是我妹妹。", py: "Chàng gē de nàge nǚ háizi shì wǒ mèimei.", vi: "Cô bé đang hát kia là em gái tôi." },
          { cn: "我昨天买的手机很便宜。", py: "Wǒ zuótiān mǎi de shǒujī hěn piányi.", vi: "Chiếc điện thoại tôi mua hôm qua rất rẻ." }
        ]
      },
      {
        ten: "Câu so sánh với 比 (1)",
        cauTruc: "A + 比 + B + Tính từ (+ Mức chênh lệch)",
        giaiThich: "Không dùng 很, 非常 trước tính từ trong câu 比. Phủ định: A 没有 B + Tính từ.",
        viDu: [
          { cn: "他比我大三岁。", py: "Tā bǐ wǒ dà sān suì.", vi: "Anh ấy lớn hơn tôi 3 tuổi." },
          { cn: "我没有他高。", py: "Wǒ méiyǒu tā gāo.", vi: "Tôi không cao bằng anh ấy." }
        ]
      },
      {
        ten: "Động từ năng nguyện 可能 (kěnéng) – có thể, có lẽ",
        cauTruc: "Chủ ngữ + 可能 + Động từ",
        viDu: [
          { cn: "明天可能会下雪。", py: "Míngtiān kěnéng huì xià xuě.", vi: "Ngày mai có thể sẽ có tuyết." }
        ]
      }
    ]
  },
  {
    bai: 12, tieuDe: "你穿得太少了。 (Bạn mặc ít quá.)",
    diem: [
      {
        ten: "Bổ ngữ trạng thái với 得 (de)",
        cauTruc: "Động từ + 得 + (很/太…) Tính từ;  (Động từ) + Tân ngữ + Động từ + 得 + Tính từ",
        giaiThich: "Đánh giá, mô tả hành động diễn ra thế nào. Nếu có tân ngữ thì lặp lại động từ (hoặc bỏ động từ đầu).",
        viDu: [
          { cn: "你穿得太少了。", py: "Nǐ chuān de tài shǎo le.", vi: "Bạn mặc ít quá." },
          { cn: "他汉语说得很好。", py: "Tā Hànyǔ shuō de hěn hǎo.", vi: "Anh ấy nói tiếng Trung rất giỏi." }
        ]
      },
      {
        ten: "Câu so sánh với 比 (2) – mức độ chênh lệch",
        cauTruc: "A + 比 + B + Tính từ + 一点儿 / 多了 / 得多;  A + Động từ + 得 + 比 B + Tính từ",
        giaiThich: "一点儿 = hơn một chút; 多了 / 得多 = hơn nhiều.",
        viDu: [
          { cn: "今天比昨天冷一点儿。", py: "Jīntiān bǐ zuótiān lěng yìdiǎnr.", vi: "Hôm nay lạnh hơn hôm qua một chút." },
          { cn: "这儿比北京热多了。", py: "Zhèr bǐ Běijīng rè duō le.", vi: "Ở đây nóng hơn Bắc Kinh nhiều." },
          { cn: "他跑得比我快。", py: "Tā pǎo de bǐ wǒ kuài.", vi: "Anh ấy chạy nhanh hơn tôi." }
        ]
      }
    ]
  },
  {
    bai: 13, tieuDe: "门开着呢。 (Cửa đang mở.)",
    diem: [
      {
        ten: "Trợ từ động thái 着 (zhe) – trạng thái tiếp diễn",
        cauTruc: "Động từ + 着 (+ 呢);  Phủ định: 没 + Động từ + 着",
        giaiThich: "Diễn tả trạng thái kéo dài (cửa đang mở, đang mặc áo…), khác 在 diễn tả hành động đang làm.",
        viDu: [
          { cn: "门开着呢。", py: "Mén kāizhe ne.", vi: "Cửa đang mở." },
          { cn: "她手里拿着一个铅笔。", py: "Tā shǒu li názhe yí gè qiānbǐ.", vi: "Cô ấy đang cầm một cây bút chì trong tay." }
        ]
      },
      {
        ten: "Câu hỏi tu từ 不是……吗?",
        cauTruc: "不是 + … + 吗?",
        giaiThich: "Dùng để khẳng định điều người nói cho là đúng: \"chẳng phải… sao?\".",
        viDu: [
          { cn: "你不是去旅游了吗?", py: "Nǐ bú shì qù lǚyóu le ma?", vi: "Chẳng phải bạn đi du lịch rồi sao?" }
        ]
      },
      {
        ten: "Giới từ 往 (wǎng) – về phía",
        cauTruc: "往 + Phương hướng + Động từ",
        viDu: [
          { cn: "往前走，就是宾馆。", py: "Wǎng qián zǒu, jiù shì bīnguǎn.", vi: "Đi thẳng về phía trước là tới khách sạn." },
          { cn: "到了路口往右边走。", py: "Dàole lùkǒu wǎng yòubian zǒu.", vi: "Đến ngã tư thì đi về bên phải." }
        ]
      }
    ]
  },
  {
    bai: 14, tieuDe: "你看过那个电影吗? (Bạn đã xem bộ phim đó chưa?)",
    diem: [
      {
        ten: "Trợ từ động thái 过 (guo) – đã từng",
        cauTruc: "Động từ + 过 (+ Tân ngữ);  Phủ định: 没 + Động từ + 过",
        giaiThich: "Diễn tả kinh nghiệm trong quá khứ.",
        viDu: [
          { cn: "你看过那个电影吗?", py: "Nǐ kànguo nàge diànyǐng ma?", vi: "Bạn đã xem bộ phim đó chưa?" },
          { cn: "我没去过北京。", py: "Wǒ méi qùguo Běijīng.", vi: "Tôi chưa từng đến Bắc Kinh." }
        ]
      },
      {
        ten: "虽然……，但是…… – tuy… nhưng…",
        cauTruc: "虽然 + A，但是 + B",
        giaiThich: "Khác tiếng Việt: thường dùng cả cặp.",
        viDu: [
          { cn: "虽然很累，但是我很高兴。", py: "Suīrán hěn lèi, dànshì wǒ hěn gāoxìng.", vi: "Tuy rất mệt nhưng tôi rất vui." }
        ]
      },
      {
        ten: "Bổ ngữ động lượng với 次 (cì) – lần",
        cauTruc: "Động từ + (过/了) + Số + 次 (+ Tân ngữ)",
        viDu: [
          { cn: "我去过两次中国。", py: "Wǒ qùguo liǎng cì Zhōngguó.", vi: "Tôi đã đến Trung Quốc hai lần." }
        ]
      }
    ]
  },
  {
    bai: 15, tieuDe: "新年就要到了。 (Năm mới sắp đến rồi.)",
    diem: [
      {
        ten: "要……了 / 快……了 / 就要……了 – sắp… rồi",
        cauTruc: "(快/就) 要 + Động từ/Tính từ + 了",
        giaiThich: "Diễn tả việc sắp xảy ra. 就要……了 có thể đi với thời gian cụ thể (明天就要考试了), còn 快……了 thì không.",
        viDu: [
          { cn: "新年就要到了。", py: "Xīnnián jiù yào dào le.", vi: "Năm mới sắp đến rồi." },
          { cn: "快下雨了，我们回家吧。", py: "Kuài xià yǔ le, wǒmen huí jiā ba.", vi: "Sắp mưa rồi, chúng ta về nhà thôi." },
          { cn: "明天就要考试了。", py: "Míngtiān jiù yào kǎoshì le.", vi: "Ngày mai là thi rồi." }
        ]
      },
      {
        ten: "都……了 – đã… rồi (nhấn mạnh)",
        cauTruc: "都 + Thời gian/Số lượng + 了",
        giaiThich: "Người nói cảm thấy thời gian đã muộn hoặc số lượng đã nhiều.",
        viDu: [
          { cn: "都十二点了，快睡觉吧。", py: "Dōu shí'èr diǎn le, kuài shuì jiào ba.", vi: "Đã 12 giờ rồi, mau ngủ đi." },
          { cn: "他都三十岁了。", py: "Tā dōu sānshí suì le.", vi: "Anh ấy đã 30 tuổi rồi." }
        ]
      }
    ]
  }
], [
  ["Đang làm / trạng thái", "在 / 正在 / 着", "在, 正在 = hành động đang diễn ra; 着 = trạng thái kéo dài (门开着)"],
  ["Kinh nghiệm / hoàn thành", "过 / 了", "过 = đã từng; 了 = đã xong (một lần cụ thể)"],
  ["Sắp xảy ra", "快…了 / 就要…了", "就要…了 đi được với thời gian cụ thể, 快…了 thì không"],
  ["Hơi / một chút", "有点儿 / 一点儿", "有点儿 + Tính từ (hơi…, không hài lòng); Tính từ + 一点儿 (…hơn chút)"],
  ["还", "还 (1) / 还 (2)", "还可以, 还不错 = cũng được; 还 + Động từ = vẫn còn"],
  ["Lại, nữa", "再 / 还", "再 = sẽ làm lại/tiếp (tương lai); 还 = vẫn còn"],
  ["So sánh", "比 / 没有", "A 比 B + Tính từ (không thêm 很); phủ định: A 没有 B + Tính từ"]
]);
