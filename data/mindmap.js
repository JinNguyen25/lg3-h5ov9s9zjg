/* Sơ đồ tư duy (viết theo quy tắc mind map của Tony Buzan và skill mindmap-markmap-viewer, MIT):
   - mỗi nút 1–3 từ, chi tiết đặt ở nút con; mỗi nhánh 3–6 nút con; một màu cho mỗi nhánh.
   Mỗi chương: s = một câu tóm cả chương; b = các nhánh, theo đúng thứ tự các mục trong window.THEORY[chương].
   Mỗi nhánh: k = tên nhánh, h = mẹo nhớ một dòng,
   c = các nút con [nhãn, [các ý ngắn], chỉ số ý trong THEORY để mở phần giải thích đầy đủ]. */
window.MINDMAP = {
1:{s:'Logistics = đúng hàng, đúng chỗ, đúng lúc.',
b:[
{k:'Định nghĩa',h:'Ba vòng lồng nhau: 物流 ⊂ ロジスティクス ⊂ SCM',c:[
 ['物流',['= 物的流通','輸送 + 保管 gộp lại'],0],
 ['ロジスティクス',['rộng hơn 物流','có cả 受発注','gốc: 兵站 (quân sự)'],1],
 ['SCM',['quản lý cả chuỗi','chứa Logistics'],2],
 ['Khoảng cách',['物流: thời gian, không gian','商流: sở hữu, thông tin'],3]]},
{k:'6 chức năng',h:'Chở – Cất – Bốc – Gói – Gia công – Tin',c:[
 ['Chính',['輸送','保管','荷役'],0],
 ['Hỗ trợ',['包装','流通加工'],0],
 ['情報',['nối tất cả'],0],
 ['包装 3 lớp',['個装 → 内装 → 外装'],1],
 ['ノード・リンク',['ノード = cứ điểm','リンク = tuyến','thêm kho: giao ↓, tồn ↑'],2]]},
{k:'6 lĩnh vực',h:'動脈 đưa hàng ĐI, 静脈 đưa hàng VỀ',c:[
 ['動脈',['調達','社内','販売 (配送)'],0],
 ['静脈',['返品 (phí ≈ ×3)','回収 (pallet, recall)','廃棄'],1],
 ['Rác thải',['一般 → 市町村','産業 → bên thải ra'],2],
 ['3R',['Reduce・Reuse・Recycle'],3]]},
{k:'Quản lý',h:'5R = đúng Hàng – Chỗ – Lúc – Điều kiện – Chi phí',c:[
 ['5R',['Product・Place・Time','Condition・Cost'],0],
 ['PDCA',['Plan → Do → Check → Action'],1],
 ['3 tầng',['戦略','運営 (4 mảng)','作業'],2],
 ['Kỳ hạn',['中長期・年次','月次・週次・日次'],3]]},
{k:'Phối hợp',h:'Đi một vòng công ty rồi ra ngoài',c:[
 ['生産',['VMI: NCC tự bổ sung'],0],
 ['営業',['EDI nhận đơn','khuyến mãi, rebate'],1],
 ['開発',['DFL: thiết kế dễ chở'],2],
 ['財務・IT',['tồn kho = tài sản','hệ thống thông tin'],3],
 ['Liên DN',['SCM・かんばん・ECR','共同化・3PL'],4]]},
{k:'Số liệu',h:'Nhớ "55 – 5 – 18": 55,4兆円 · 5,32% · 18,3兆円',c:[
 ['マクロ',['55.4兆円 (2023)','≈ 9,3% GDP','輸送 34.7 lớn nhất'],0],
 ['売上高比率',['5.32% (2025)','đỉnh 5.70% (2021)'],1],
 ['トラック業',['18.3兆円・6.3万社','201万人・99% DN nhỏ'],2],
 ['EC',['BtoC 14.7兆円・9.38%','BtoB 465兆円・40%'],3],
 ['Chia nhỏ',['保管 = 貯蔵 + 保管','加工 = 生産 + 販促'],4]]}
]},
2:{s:'Thiếu tài xế, giờ làm bị siết → bớt chờ, chuyển tàu, giữ người.',
b:[
{k:'Vấn đề 2024',h:'960 giờ; thiếu 14% rồi 34%',c:[
 ['Trần làm thêm',['年960時間','từ 4/2024'],0],
 ['Thiếu năng lực',['14% (2024)','34% (2030)'],1],
 ['Tài xế',['giờ dài, lương thấp','≤29 tuổi chỉ ~10%'],2]]},
{k:'Giờ ràng buộc',h:'拘束 "13 – 15": thường 13 giờ, tối đa 15',c:[
 ['拘束時間',['13h/ngày, max 15h','tính cả giờ chờ'],0],
 ['標準的な運賃',['công bố 2020','nâng thu nhập'],1],
 ['Bớt chờ',['中継輸送','予約システム','パレット化','ホワイト物流 (ngoài bài)'],2],
 ['Gマーク',['cho hãng vận tải','không phải chủ hàng'],2]]},
{k:'Môi trường',h:'Đường sắt sạch nhất, xe tải bẩn nhất',c:[
 ['CO2 vận tải',['≈ 1/5 cả nước','18.7% (bài chương 2)'],0],
 ['Mục tiêu',['cả nước −46% (2030)','vận tải −35%','CN 2050'],1],
 ['モーダルシフト',['xe → tàu hỏa, thuyền','鉄道 ít CO2 nhất'],2],
 ['グリーン物流',['共同配送','積載率↑・エコドライブ'],3]]},
{k:'An toàn',h:'Tai nạn ×4, phần lớn khi bốc dỡ',c:[
 ['Tai nạn',['×4 trung bình','ngã khi 荷役'],0],
 ['荷主勧告',['chủ hàng ép → 勧告','công bố tên'],1],
 ['買い物弱者',['~910万人','宅配・移動販売'],2],
 ['BCP',['chạy tiếp khi thiên tai','phân tán kho, NCC'],3]]},
{k:'Nhân lực',h:'Tuyển – Giữ – Cải thiện',c:[
 ['倉庫業',['≈ 1/6 xe tải','đang tăng'],0],
 ['パート',['giờ làm ngắn hơn','không theo tên gọi'],1],
 ['高年齢者',['đến 70 tuổi','努力義務'],2],
 ['特定技能',['+ 自動車運送業 (2024)'],3],
 ['3 trụ',['採用・定着・環境','+ ES'],4]]},
{k:'Số liệu',h:'Bằng lái 3,5 – 7,5 – 11 tấn ↔ 18 – 20 – 21 tuổi',c:[
 ['Tài xế',['求人倍率 2.11','2,104h/năm'],0],
 ['免許',['準中型 3.5t〜 (18)','中型 7.5t〜 (20)','大型 11t〜 (21)'],1],
 ['障害者雇用',['2.3 → 2.5 → 2.7%'],2],
 ['ISO26000',['không chứng nhận','7 nguyên tắc, 7 chủ đề'],3],
 ['労災',['~15,000人/năm','7割 khi 荷役'],4]]}
]},
3:{s:'Nhà nước điều tiết logistics bằng kế hoạch, thủ tục và luật.',
b:[
{k:'Đại cương 7',h:'Đời 7: Trơn tru – Tử tế – Dẻo dai',c:[
 ['簡素で滑らか',['DX, chuẩn hóa'],0],
 ['担い手にやさしい',['cải cách lao động'],0],
 ['強くてしなやか',['bền vững, chống chịu'],0],
 ['物流DX',['cơ giới hóa','số hóa'],1]]},
{k:'Thủ tục',h:'許可 gỡ cấm · 認可 cho hiệu lực · 登録 ghi sổ · 届出 báo',c:[
 ['許可',['gỡ lệnh cấm chung'],0],
 ['認可',['đồng ý mới có hiệu lực'],0],
 ['登録',['ghi vào sổ công'],0],
 ['届出',['chỉ cần báo'],0],
 ['Thang văn bản',['法律 (Quốc hội)','政令 (Nội các)','省令 (Bộ) → 告示'],1]]},
{k:'Lao động',h:'Bốn con số: 8 – 40 – 45 – 360',c:[
 ['労基法',['8h/ngày, 40h/tuần','nghỉ 45分 (>6h)','nghỉ 1h (>8h)'],2],
 ['36協定',['月45h','年360h'],0],
 ['Lái xe',['4h → nghỉ 30分','chia ≥10分'],3],
 ['派遣',['二重派遣: cấm','偽装請負: cấm'],4],
 ['下請法',['→ 取適法 (1/2026)','cấm 買いたたき','lãi chậm 14.6%'],1],
 ['物流特殊指定',['2004','theo vị thế, không vốn'],5]]},
{k:'An toàn',h:'300 xe · 90 km/h · 1 người/kho · 50 người',c:[
 ['運輸安全M',['2006','≥300両'],0],
 ['速度抑制',['8t / 5t','90km/h'],1],
 ['2024改正',['実運送体制管理簿','書面交付'],2],
 ['Kho・PCCC',['倉庫管理主任者 mỗi kho','防火管理者 ≥50人'],3]]},
{k:'Vận tải, kho',h:'Xe tải 許可 · Kho 登録 · Cước báo SAU',c:[
 ['トラック事業',['許可制','運賃: 事後届出','運行管理者/営業所'],0],
 ['利用運送',['第一種: 登録','第二種: 許可'],1],
 ['倉庫業',['登録制','nhận 寄託'],2],
 ['道交法',['準中型 18歳 (2017)','cấm 過積載'],3]]},
{k:'Môi trường',h:'Chủ hàng lớn phải có CLO',c:[
 ['物流効率化法',['特定事業者: kế hoạch','特定荷主: CLO'],0],
 ['省エネ法',['chỉ đơn vị 特定','không phải mọi hãng'],1],
 ['Luật khác',['NOx・PM法','廃棄物処理法','消防法'],2]]},
{k:'Các đời & số',h:'Đời 8: 強く・賢く・優しく・つながる',c:[
 ['第6次',['2017–2020','「強い物流」'],0],
 ['第8次',['2026–2030','強く・賢く・優しく・つながる'],1],
 ['車両制限令',['rộng 2.5m・dài 12m','cao 3.8m','20t・trục 10t'],2],
 ['Kho lạnh・nguy hiểm',['冷蔵 10区分','危険物 第4類'],3],
 ['CO2',['運輸 17.4%','xe 86.8%'],4]]}
]},
4:{s:'Dịch vụ là lời hứa với khách → đặt mức → đo → cải tiến.',
b:[
{k:'Bản chất',h:'Dịch vụ không miễn phí: chọn mức lời nhất',c:[
 ['無形財',['không chuyển sở hữu'],0],
 ['顧客サービス',['物流サービス là cốt lõi','nhanh, chính xác'],1],
 ['Trade-off',['dịch vụ ↑ → phí ↑','chọn mức có lãi'],2],
 ['Hiện trường',['tấm gương công ty'],3]]},
{k:'3 hạng mục',h:'Làm rõ → Đặt mức → Đo',c:[
 ['① 明確化',['ghi rõ dịch vụ'],0],
 ['② 設定',['đặt mức dịch vụ'],0],
 ['③ 指標',['quản lý bằng chỉ số'],0]]},
{k:'4 bước',h:'Nhìn người → nhìn mình → đặt mức → chấm',c:[
 ['① ベンチマーク',['đối thủ + mình','so sánh'],1],
 ['② 現状分析',['hiện trạng'],0],
 ['③ 水準設定',['tiền đề hệ thống','giờ chốt đơn, LT…'],2],
 ['④ 評価',['bằng con số'],3]]},
{k:'Chất lượng',h:'度数率 đếm LẦN · 強度率 đo NẶNG',c:[
 ['Hạng mục',['納期・正確性・品質','事故・印象・環境'],0],
 ['物流事故',['khái niệm rộng nhất'],1],
 ['度数率',['死傷者 ÷ 時間','×100万'],2],
 ['強度率',['損失日数 ÷ 時間','×1,000'],2]]},
{k:'QC 7 công cụ',h:'Pareto chọn · Xương cá tìm · 管理図 canh',c:[
 ['パレート図',['chọn trọng điểm','= ABC分析'],0],
 ['特性要因図',['xương cá','tìm nguyên nhân'],1],
 ['管理図',['UCL・CL・LCL','3σ'],2],
 ['散布図・ヒスト',['tương quan','phân bố'],3],
 ['Còn lại',['チェックシート','グラフ・層別'],4]]},
{k:'Sản xuất',h:'ETO → MTS: nhanh hơn, rẻ hơn, khó đổi hơn',c:[
 ['Dãy',['ETO・MTO・BTO','CTO・ATO・MTS'],0],
 ['Phía MTS',['LT ngắn','giá rẻ, khó đổi'],0],
 ['Histogram',['ふた山 → 層別','離れ小島 → bất thường'],1]]}
]},
5:{s:'Kho đặt ở đâu, trong kho chạy ra sao, thuê ai, xuất nhập khẩu.',
b:[
{k:'Mạng lưới',h:'Nhiều kho: giao rẻ, kho đắt',c:[
 ['Cấu trúc',['ノード + リンク'],0],
 ['Trade-off',['kho nhiều → giao ↓','kho, tồn ↑'],1],
 ['Loại kho',['DC: giữ hàng','TC: trung chuyển','PC: gia công'],2],
 ['Xu hướng',['配送型・đi thuê','lớn, ven cảng'],3],
 ['重心法',['tấn-km nhỏ nhất'],4],
 ['特積み',['600km → sáng mai','~1,000km → trong mai'],5]]},
{k:'Theo ngành',h:'Sản xuất gom · Bán buôn gom-chia · Bán lẻ về trung tâm',c:[
 ['メーカー',['gom tồn kho','hàng rẻ: SX gần'],0],
 ['卸',['集荷分散'],1],
 ['小売',['センター納品','一括物流'],2]]},
{k:'Trong kho',h:'Nhận – Kiểm – Cất – Giữ – Lấy – Đóng – Chia – Xuất',c:[
 ['Dòng hàng',['入荷 → 検品 → 格納','保管 → ピッキング','梱包 → 仕分け → 出荷'],0],
 ['ロケーション',['固定','フリー: cần hệ thống'],1],
 ['ABC tần suất',['xuất nhiều → gần cửa','tần suất ≠ lượng'],2],
 ['ピッキング',['摘み取り: theo đơn','種まき: gom rồi chia'],3]]},
{k:'Thuê ngoài',h:'3PL = đề xuất + trọn gói',c:[
 ['3PL',['đề xuất cải cách','nhận trọn gói'],0],
 ['物流子会社',['rõ chi phí','bài toán: 外販'],1],
 ['派遣',['二重派遣: cấm'],2]]},
{k:'Giao chung',h:'Ít xe hơn, đầy xe hơn',c:[
 ['共同配送',['積載率↑','台数↓・xanh'],0],
 ['Đổi lại',['bớt linh hoạt','chia phí khó'],0],
 ['拠点集約',['diện tích ↓','横持ち ↓'],1]]},
{k:'Ngoại thương',h:'FOB → +Freight (CFR) → +Insurance (CIF)',c:[
 ['Incoterms',['FOB: lên tàu','CFR: + cước','CIF: + bảo hiểm'],0],
 ['Rủi ro bên xuất',['前払 < L/C < D/P','< D/A < 後払'],1],
 ['D/P・D/A',['D/P: trả tiền','D/A: nhận hối phiếu'],2],
 ['B/L',['有価証券','指図式: 裏書'],3]]},
{k:'Thiết kế',h:'Cái gì – Bao nhiêu – Khi nào – Thế nào',c:[
 ['4 điều kiện',['荷姿・数量','時間・フロー'],0],
 ['Vùng lấy hàng',['ゴールデンゾーン','ストライクゾーン'],1],
 ['Năng suất',['人時生産性','lái chỉ ~54%'],2],
 ['共同配送',['9台 → 6台','荷役 18 → 12'],3],
 ['Incoterms',['đủ 11 quy tắc','DDP: bán lo cả thuế'],4]]}
]},
6:{s:'Tồn kho là tấm đệm: thiếu thì hết hàng, thừa thì tốn tiền.',
b:[
{k:'Mục đích',h:'Vừa đủ cho khách, vừa không thừa',c:[
 ['2 mục đích',['đủ cho khách','bớt phí giữ'],0],
 ['会計',['棚卸資産','流動資産'],1],
 ['サービス率',['= 1 − 品切れ率'],2],
 ['Vì sao có',['ロット・変動','安定・見越し・LT'],3]]},
{k:'Nhập – xuất',h:'Hôm nay = hôm qua + nhập − xuất',c:[
 ['当残',['前残 + 入 − 出'],0],
 ['情物一致',['sổ khớp hàng'],0],
 ['ロケーション',['cái gì・bao nhiêu・ở đâu'],1],
 ['先入れ先出し',['nhập trước xuất trước'],1]]},
{k:'Tồn an toàn',h:'k × σ × √t',c:[
 ['Phân phối',['chuẩn μ, σ','μ+2σ: 2.28%'],0],
 ['安全在庫',['k × σ × √t','thường k = 2'],1],
 ['平均・最大',['Q/2 + SS','Q + SS'],2],
 ['最適補充量',['√(2cD ÷ dp)'],3]]},
{k:'Bổ sung',h:'Bảng 2×2: KỲ × LƯỢNG',c:[
 ['定期定量',['chỉ có trên lý thuyết'],0],
 ['不定期定量',['発注点方式','hàng C'],1],
 ['定期不定量',['tính mỗi kỳ','tốn công'],2],
 ['不定期不定量',['từng lần','khuyến mãi'],3]]},
{k:'Phân tích',h:'Ngày tồn ⇄ vòng quay · ABC 70 – 90',c:[
 ['日数・回転率',['nghịch đảo nhau'],0],
 ['ABC',['A ≤70%','B ≤90%','C còn lại'],1],
 ['流動数曲線',['cách dọc = tồn','cách ngang = ngày'],2],
 ['在庫鮮度',['xếp theo ngày tồn'],3]]},
{k:'Kiểm kê',h:'Lệch thì sửa SỔ theo HÀNG',c:[
 ['帳簿・実地',['sửa theo hiện vật'],0],
 ['一斉棚卸',['dừng hết','cuối kỳ'],1],
 ['循環棚卸',['luân phiên','tuần, tháng'],2]]},
{k:'Ví dụ tính',h:'k = 1 · 2 · 3 → 15.87 · 2.28 · 0.13%',c:[
 ['Ví dụ',['SS ≈ 98','発注点 ≈ 440'],0],
 ['k và rủi ro',['1: 15.87%','2: 2.28%','3: 0.13%'],1],
 ['Tiến hóa',['発注点 → 定期','→ 連続補充'],2],
 ['平方根',['9 → 4 kho','tồn còn 2/3'],3]]}
]},
7:{s:'Chở bằng gì, quản xe ra sao, gói thế nào, gom thành đơn vị.',
b:[
{k:'Phương thức',h:'Xe tải tiện · Tàu hỏa sạch · Tàu biển rẻ · Máy bay nhanh',c:[
 ['Tiêu chí',['kinh tế・nhanh・đúng','an toàn・tiện・môi trường'],0],
 ['トラック',['door-to-door','~600km'],1],
 ['鉄道・船',['鉄道: CO2 ít nhất','船: rẻ nhất, chậm'],2],
 ['航空',['nhanh, đắt','ベリー / フレーター'],3]]},
{k:'Quản lý xe',h:'運行 cho xe kinh doanh · 安全運転 cho xe tự dùng',c:[
 ['3 mảng',['配車・運行','貨物追跡'],0],
 ['運行管理者',['xe kinh doanh','29両まで1人'],1],
 ['安全運転管理者',['xe tự dùng ≥5台','11人乗り: 1台'],2],
 ['傭車',['thuê xe hãng khác'],3]]},
{k:'Bao gói',h:'Số 1 là BẢO VỆ hàng',c:[
 ['Mục đích',['bảo vệ hàng'],0],
 ['2 loại',['工業: để chở','商業: để bán'],1],
 ['3 lớp',['個装・内装・外装'],2]]},
{k:'Unit load',h:'T11 = 1,1 × 1,1 m',c:[
 ['ユニットロード',['cơ giới hóa','một bộ suốt tuyến'],0],
 ['T11',['1,100 × 1,100mm'],1],
 ['ISO',['20・40ft','45ft: không đường thường'],2],
 ['JR',['12ft (5t) chủ yếu','31ft ≈ xe lớn'],3]]},
{k:'Pallet, container',h:'12ft: 5 tấn · ISO: 36 tấn',c:[
 ['平パレット',['> 80%'],0],
 ['JR',['12ft 5,000kg','31ft 13,800kg'],1],
 ['ISO',['20–45ft 36,000kg','10ft 10,160kg'],2],
 ['Khác',['Tank 30,000L','LD-3 1,587kg'],3]]}
]},
8:{s:'Chi phí logistics như tảng băng: thấy được, tính đúng, giảm khéo.',
b:[
{k:'Cách nhìn',h:'Kế toán tài chính không đủ → kế toán quản trị',c:[
 ['管理会計',['kế toán TC không đủ'],0],
 ['2 loại phí',['支払: dễ thấy','自家: khó thấy'],1],
 ['通産省方式',['機能・主体・変固'],2],
 ['輸送費',['> 50% tổng'],3],
 ['負担力',['tỉ lệ thấp = chịu được'],4]]},
{k:'Cước phí',h:'Cước xe báo SAU 30 ngày · Kho 3 kỳ/tháng',c:[
 ['運賃',['認可 → 届出','事後 30日'],0],
 ['3 kiểu cước',['貸切・積合せ','宅配便 (≤30kg)'],1],
 ['倉庫料金',['保管料 + 荷役料'],2],
 ['保管料',['3期制','従価 + 従量・級地'],3]]},
{k:'Cách tính',h:'Mua vào → 原価 · Bán ra → 販管費',c:[
 ['Hạch toán',['調達 → 売上原価','販売 → 販管費'],0],
 ['人件費',['+ phúc lợi','~1.2 lần lương'],1],
 ['社内金利',['vốn nằm trong tồn kho'],2],
 ['消費者包装',['không tính'],3]]},
{k:'Đánh đổi',h:'Người nhận hưởng, người gửi trả → dịch vụ thừa',c:[
 ['Trade-off',['dịch vụ ⇄ phí','vận chuyển ⇄ kho'],0],
 ['Công cụ',['予実・KPI','ベンチマーク・PDCA'],1],
 ['Luật',['独禁法','取適法'],2],
 ['メニュー価格',['giảm giá theo mức'],3],
 ['Giảm phí',['tồn rủi ro → ít kho','xe quay nhiều → rẻ'],4],
 ['容積換算',['xe 1㎥ = 280kg','bay 6,000cm³ = 1kg','biển 1t = 1.133㎥'],6]]},
{k:'Tảng băng, ABC',h:'ABC = số lần × thời gian × đơn giá',c:[
 ['氷山',['nổi: trả ngoài','chìm: ẩn trong phí'],0],
 ['Theo ngành',['窯業 9.29% cao','電気 2.11% thấp'],1],
 ['ABC',['回数 × 時間 × 単価'],2],
 ['保管料',['chỗ・thời gian・quản lý','荷役料 tính 2 lần'],3],
 ['IT',['phí ↓ + dịch vụ ↑','không phải trade-off'],4]]}
]},
9:{s:'Hệ thống thông tin: định nghĩa, phân loại, thiết kế, mã vạch.',
b:[
{k:'Định nghĩa',h:'Mục đích: khách hài lòng + hiệu quả',c:[
 ['JIS Z 0111',['định nghĩa chuẩn'],0],
 ['Mục đích',['顧客満足','効率化'],1],
 ['Đặc trưng',['nhiều cứ điểm, thiết bị','liên DN, sửa nhiều'],2]]},
{k:'Phân loại',h:'Lõi – Thông tin – Nghiệp vụ (kế hoạch / thực hiện)',c:[
 ['3 nhóm',['基幹・情報・業務'],0],
 ['計画系',['dự báo nhu cầu','kế hoạch SX, bán'],1],
 ['実行系',['受注・発注','WMS・TMS'],2]]},
{k:'Thiết kế',h:'Hai bước đầu quyết định Q·C·D',c:[
 ['5 bước',['戦略 → 企画 → 設計','テスト → 運用'],0],
 ['Thành công',['mục đích rõ, CIO','người dùng tham gia'],1],
 ['Cách làm',['ウォーターフォール','アジャイル'],2]]},
{k:'Mã vạch 1D',h:'JAN 13 · ITF 14 · GS1-128 có AI',c:[
 ['Ưu・nhược',['nhanh, ít sai, rẻ','ít tin, chiếm chỗ'],0],
 ['JAN',['13・8 số','Nhật: 45・49'],1],
 ['ITF',['14 số','cho thùng'],2],
 ['GS1-128',['AI: ngày, lô'],3]]},
{k:'Mã 2D, RFID',h:'QR nhiều tin · RFID không chạm',c:[
 ['QR',['nhiều tin, nhỏ','誤り訂正'],0],
 ['RFID',['sóng, không chạm','đọc nhiều một lúc','ghi lại được'],1],
 ['RFID khó',['giá','kim loại, nước'],1]]},
{k:'Tính mã vạch',h:'Chẵn × 3 + Lẻ → lấy 10 trừ hàng đơn vị',c:[
 ['Check digit',['JAN-13, đếm từ trái','chẵn×3 + lẻ','10 − đơn vị (0 → 0)'],0],
 ['AI',['01 GTIN・10 lô','11 ngày SX・17 hạn'],1],
 ['Nguồn gốc',['UPC: Mỹ','QR: Nhật'],2]]}
]},
10:{s:'Theo một đơn hàng: nhận đơn → đặt hàng → kho → giao.',
b:[
{k:'Nhận đơn',h:'Nhận → giữ hàng → xuất, hoặc chờ',c:[
 ['3 phần',['エントリー・出荷情報','オーダー管理'],0],
 ['Nhập đơn',['màn hình・OCR','EOS'],1],
 ['在庫引当',['có → xuất','không → 受注残'],2],
 ['Chỉ thị',['出荷・ピッキング・検品'],3]]},
{k:'Đặt hàng',h:'Ai đặt? Bên mua, bên bán (VMI) hay cùng nhau',c:[
 ['EOS',['đặt hàng online','bớt công, bớt sai'],0],
 ['Ai quyết',['発注側: EOS・CAO','受注側: VMI','協働'],1],
 ['ASN',['báo trước khi giao'],2]]},
{k:'WMS',h:'Sổ – Lấy/Chia – Quản việc',c:[
 ['3 phần',['受け払い','ピッキング・仕分け','作業管理'],0],
 ['入庫検品',['リスト・バーコード','自動'],1],
 ['Chỉ thị lấy',['リスト・シール','データ (digital)'],2],
 ['LMS',['tiến độ, năng suất'],3]]},
{k:'TMS',h:'Điều xe – Chạy xe – Theo dõi',c:[
 ['3 phần',['配車・運行','追跡'],0],
 ['配車計画',['xe đầy','đường ngắn'],1],
 ['求車求荷',['khớp xe trống – hàng'],2],
 ['運行管理',['車載端末・デジタコ','GPS'],3],
 ['Theo dõi',['トラッキング: theo trạm','トレーシング: liên tục'],4]]},
{k:'WMS và lõi',h:'Lõi lo TIỀN · WMS lo HÀNG',c:[
 ['基幹',['giá, công nợ','cập nhật theo ngày'],0],
 ['WMS',['vị trí, lô','cập nhật tức thì'],0],
 ['WMS gồm',['受け払い + ピッキング','+ 作業管理'],1]]}
]}
};
