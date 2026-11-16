/* Bài giảng chi tiết bằng tiếng Việt, viết lại từ bài giảng RKU 2026 (標準テキスト 第4版対応) và các bảng/hình.
   LECTURE[chương] = danh sách mục, theo đúng thứ tự window.THEORY[chương]:
   [đoạn mở đầu, [giải thích cho từng ý, theo đúng thứ tự ý trong THEORY], chú ý khi thi]
   Quy ước: thuật ngữ ghi tiếng Nhật trước, nghĩa tiếng Việt trong ngoặc ở lần nhắc đầu. Chương 1–5 ở file này, 6–10 ở lecture2.js. */
window.LECTURE = window.LECTURE || {};

window.LECTURE[1] = [
['Ba khái niệm 物流, ロジスティクス và SCM lồng vào nhau theo phạm vi tăng dần. Hiểu đúng ranh giới của từng khái niệm là nền móng cho cả môn học.',[
 '物流 là cách nói tắt của 物的流通 (Physical Distribution): dòng chảy của hàng hóa hữu hình. Hai hoạt động cốt lõi là 輸送 (vận chuyển), giúp hàng vượt khoảng cách không gian, và 保管 (bảo quản), giúp hàng vượt khoảng cách thời gian giữa lúc sản xuất và lúc tiêu dùng. 物流 gộp hai hoạt động này thành một khái niệm thống nhất.',
 'ロジスティクス rộng hơn 物流. Lấy 物流 làm trung tâm, nó còn bao gồm cả việc nhận và đặt hàng (受発注), với mục tiêu lập kế hoạch, thực hiện và quản lý sao cho vừa hiệu quả (ít lãng phí) vừa hữu hiệu (đạt mục tiêu dịch vụ). Logistics gắn liền với các khâu thu mua, sản xuất và bán hàng. Từ này có gốc quân sự, tức 兵站 (hậu cần cho quân đội).',
 'SCM (Supply Chain Management) quản lý toàn bộ chuỗi cung ứng, từ nguyên liệu, sản xuất, phân phối đến người tiêu dùng, vượt ra ngoài phạm vi một công ty. Theo định nghĩa của CSCMP, ロジスティクス là một bộ phận nằm trong SCM.',
 'Giữa sản xuất và tiêu dùng luôn có những "khoảng cách". 商流 (dòng giao dịch) xử lý khoảng cách về sở hữu (ai là chủ) và thông tin (ai cần gì); 物流 xử lý khoảng cách về thời gian (khi nào cần) và không gian (cần ở đâu). Đề thi hay tráo hai vế này cho nhau.'],
 'Thứ tự phạm vi: 物流 ⊂ ロジスティクス ⊂ SCM. Câu nói 物流 lấp khoảng cách sở hữu là sai.'],
['物流 được chia thành sáu chức năng. Biết chức năng nào là chính, chức năng nào là phụ sẽ giúp phân tích bất kỳ hoạt động logistics nào.',[
 'Sáu chức năng gồm 輸送 (vận chuyển), 保管 (bảo quản), 荷役 (bốc dỡ), 包装 (bao gói), 流通加工 (gia công trong lưu thông) và 情報 (thông tin). Ba chức năng đầu là chức năng chính vì trực tiếp di chuyển và lưu giữ hàng; 包装 và 流通加工 hỗ trợ cho chúng; còn 情報 xuyên suốt, kết nối và điều khiển tất cả.',
 '包装 có ba lớp, đi từ trong ra ngoài: 個装 bao từng sản phẩm, 内装 gom nhiều 個装 lại, 外装 là lớp ngoài cùng để chịu được vận chuyển. Có thể hình dung như búp bê Nga lồng vào nhau.',
 'Mạng lưới logistics được mô tả bằng ノード (cứ điểm như kho, trung tâm) và リンク (tuyến vận chuyển nối các cứ điểm). Tăng số kho thì kho gần khách hơn nên chi phí giao hàng giảm, nhưng chi phí giữ kho và tồn kho lại tăng. Đây là ví dụ điển hình của トレードオフ (đánh đổi).'],
 'Câu nhớ "Chở – Cất – Bốc – Gói – Gia công – Tin". Thứ tự bao gói từ trong ra: 個装 → 内装 → 外装.'],
['Sáu chức năng trả lời câu hỏi "物流 làm gì"; sáu lĩnh vực trả lời câu hỏi "物流 diễn ra ở khâu nào". Cách chia dựa trên hình ảnh mạch máu: chiều đi và chiều về.',[
 '動脈物流 (logistics động mạch) đưa hàng theo chiều xuôi: 調達物流 là mua nguyên liệu, hàng nhập vào; 社内物流 là di chuyển giữa các cơ sở trong công ty; 販売物流 là giao hàng cho khách. Riêng khâu vận chuyển trong 販売物流 được gọi là 配送.',
 '静脈物流 (logistics tĩnh mạch, còn gọi リバース・ロジスティクス) đưa hàng theo chiều ngược lại: 返品物流 là hàng bị trả lại, chi phí trên mỗi đơn vị khoảng gấp ba 販売物流 vì lô nhỏ và rời rạc; 回収物流 là thu hồi pallet, thùng luân chuyển (通い箱) hay sản phẩm lỗi (リコール); 廃棄物流 là vận chuyển chất thải.',
 'Trách nhiệm xử lý chất thải khác nhau theo loại: 一般廃棄物 (chất thải thông thường) do 市町村 (chính quyền địa phương) chịu trách nhiệm; 産業廃棄物 (chất thải công nghiệp) do chính doanh nghiệp thải ra (排出事業者) chịu trách nhiệm.',
 '3R là ba hướng giảm gánh nặng môi trường, theo thứ tự ưu tiên: Reduce (giảm phát sinh) → Reuse (dùng lại) → Recycle (tái chế thành tài nguyên).'],
 '返品 thuộc 静脈物流, không thuộc 動脈物流. Trong 3R, Reduce được ưu tiên trước, Recycle sau cùng.'],
['Phần này trả lời bốn câu hỏi: quản lý logistics nhằm đạt điều gì, theo chu trình nào, ở những tầng nào và theo khung thời gian nào.',[
 'Mục tiêu được tóm bằng 5R (5適): đúng hàng (Right Product), đúng nơi (Place), đúng lúc (Time), đúng điều kiện (Condition, ví dụ nhiệt độ, chất lượng) và đúng chi phí (Cost).',
 'Hoạt động quản lý chạy theo vòng PDCA: lập kế hoạch (Plan), thực hiện (Do), đánh giá (Check), cải tiến (Action), rồi lặp lại ở mức cao hơn.',
 'Có ba tầng quản lý: 戦略管理 (chiến lược, định hướng dài hạn), 運営管理 (vận hành, biến chiến lược thành kế hoạch cụ thể) và 作業管理 (quản lý công việc tại hiện trường). Tầng 運営管理 gồm bốn mảng: 需給管理 (cân đối cung cầu), システム管理 (quản lý hệ thống), 顧客サービス管理 (quản lý dịch vụ khách hàng) và 調達管理 (quản lý thu mua).',
 'Kế hoạch được lập theo nhiều kỳ: trung – dài hạn, hằng năm, hằng tháng, hằng tuần và hằng ngày; kỳ càng ngắn thì kế hoạch càng chi tiết.'],
 'Ba tầng là 戦略・運営・作業, không phải 調達・生産・販売.'],
['Logistics không làm việc một mình: nó phải phối hợp với gần như mọi phòng ban trong công ty và với cả các doanh nghiệp khác.',[
 'Với bộ phận sản xuất, logistics phối hợp ở vận chuyển, thu mua, tồn kho và hàng trả về. Một hình thức tiêu biểu là VMI (ベンダー管理在庫): nhà cung cấp được xem dữ liệu tồn kho của khách và tự chủ động bổ sung hàng.',
 'Với marketing và kinh doanh, logistics phối hợp ở hệ thống nhận đơn (như EDI), ở mức dịch vụ cam kết với khách và ở các đợt khuyến mãi (bán giảm giá, chiết khấu rebate). Muốn thay đổi mức dịch vụ với khách thì bộ phận kinh doanh phải bàn cùng logistics.',
 'Với bộ phận phát triển sản phẩm, có khái niệm DFL (Design for Logistics): ngay từ khi thiết kế sản phẩm và bao bì đã tính đến việc dễ chở, dễ cất, dễ bốc dỡ.',
 'Với bộ phận tài chính: tồn kho là tài sản, còn chi phí logistics và đầu tư thiết bị đều ảnh hưởng đến sổ sách; việc xử lý hàng tồn không bán được phải bàn với tài chính. Với bộ phận IT, logistics cần một hệ thống thông tin logistics.',
 'Giữa các doanh nghiệp, các hình thức hợp tác gồm SCM, phương thức かんばん, ECR (phản ứng hiệu quả theo người tiêu dùng), 物流共同化 (làm logistics chung) và 3PL (thuê ngoài trọn gói).'],
 'VMI nghĩa là bên BÁN (nhà cung cấp) quản lý và bổ sung tồn kho cho bên mua.'],
['Các con số dưới đây lấy từ bảng biểu trong bài giảng. Đề thi thường hỏi con số gần đúng, nên chỉ cần nhớ mức độ và năm.',[
 'マクロ物流コスト (tổng chi phí logistics cả nước) năm tài khóa 2023 là 55,4 nghìn tỷ yên, gồm vận chuyển 34,7, tồn kho 19,1 và quản lý 1,5. Con số này bằng khoảng 9,3% GDP; năm 2022 là 9,6%, mức cao nhất trong 20 năm.',
 '売上高物流コスト比率 (chi phí logistics trên doanh thu) theo khảo sát của JILS năm tài khóa 2025 là 5,32%; mức cao nhất trong 20 năm là 5,70% vào năm tài khóa 2021.',
 'Ngành vận tải xe tải có doanh thu khoảng 18,3 nghìn tỷ yên, khoảng 6,3 vạn công ty và 201 vạn người làm việc; 99% là doanh nghiệp vừa và nhỏ. Toàn ngành logistics chiếm khoảng 2% doanh thu và 3% lao động.',
 'Thương mại điện tử năm 2023: bán hàng hóa cho người tiêu dùng (物販系BtoC-EC) đạt 14,7 nghìn tỷ yên, tỉ lệ EC hóa 9,38%; giữa các doanh nghiệp (BtoB-EC) đạt 465 nghìn tỷ yên, tỉ lệ 40%. Số kiện 宅配便 tăng 17,8% trong 5 năm, tỉ lệ phải giao lại khoảng 11–12%.',
 'Một số chức năng còn được chia nhỏ hơn. 保管 gồm 貯蔵 (cất giữ dài hạn, kiểu dự trữ) và 保管 (cất giữ ngắn hạn, phục vụ lưu thông). 流通加工 gồm 生産加工 (gia công gần với sản xuất) và 販売促進加工 (gia công hỗ trợ bán hàng). 情報 gồm thông tin quản lý số lượng, chất lượng và vị trí.'],
 'Mẹo "55 – 5 – 18": 55,4 nghìn tỷ yên, 5,32%, 18,3 nghìn tỷ yên.']
];

window.LECTURE[2] = [
['"Vấn đề 2024" (物流の2024年問題) là cách gọi những khó khăn của ngành vận tải khi giờ làm thêm của tài xế xe tải bị giới hạn từ tháng 4/2024.',[
 'Từ tháng 4/2024, theo cải cách cách làm việc (働き方改革, áp dụng qua 労働基準法), giờ làm thêm của tài xế xe tải bị giới hạn tối đa 960 giờ mỗi năm.',
 'Theo ước tính của chính phủ, nếu không có biện pháp gì thì năng lực vận tải sẽ thiếu khoảng 14% vào năm tài khóa 2024 và khoảng 34% vào năm tài khóa 2030. Đây là con số hay được hỏi.',
 'Nguyên nhân sâu xa nằm ở điều kiện làm việc của tài xế: giờ làm dài hơn, lương thấp hơn trung bình các ngành và đội ngũ đang già đi; người từ 29 tuổi trở xuống chỉ khoảng 10%.'],
 'Hai cặp số: 960 giờ; thiếu 14% (2024) → 34% (2030).'],
['Để giảm tải cho tài xế, nhà nước vừa đặt chuẩn về thời gian ràng buộc, vừa can thiệp vào giá cước và khuyến khích cách vận hành mới.',[
 '改善基準告示 (thông báo về tiêu chuẩn cải thiện điều kiện làm việc của tài xế) dùng khái niệm 拘束時間 (thời gian ràng buộc): toàn bộ thời gian tài xế bị công việc ràng buộc, kể cả thời gian bốc dỡ (荷役) và thời gian chờ hàng (荷待ち・手待ち). Mỗi ngày nguyên tắc tối đa 13 giờ, có thể kéo dài đến 15 giờ.',
 'Năm 2020, nhà nước công bố 「標準的な運賃」 (mức cước chuẩn) theo 貨物自動車運送事業法, giúp hãng vận tải thương lượng giá hợp lý và nâng thu nhập cho tài xế.',
 'Các giải pháp thực tế gồm: 中継輸送 (chia chặng để tài xế về nhà trong ngày), giảm thời gian chờ bằng hệ thống đặt lịch bốc dỡ (予約システム), dùng pallet (パレット化) để bốc dỡ nhanh hơn, và phong trào ホワイト物流 (kiến thức ngoài bài giảng). Lưu ý: Gマーク là chứng nhận an toàn dành cho cơ sở của hãng vận tải, không dành cho chủ hàng.'],
 '拘束時間 tính cả giờ chờ hàng; nhớ "13 – 15".'],
['Logistics là nguồn phát thải CO2 lớn, nên vừa chịu áp lực giảm phát thải, vừa có nhiều cách để cải thiện.',[
 'Ngành vận tải (運輸部門) phát thải khoảng 1/5 lượng CO2 của Nhật (bài giảng chương này ghi 18,7%), trong đó xe chở hàng chiếm phần lớn.',
 'Mục tiêu quốc gia: đến năm tài khóa 2030 giảm 46% so với năm 2013, và đạt trung hòa carbon (カーボンニュートラル) vào năm 2050. Riêng ngành vận tải có mục tiêu giảm 35% đến năm 2030.',
 'モーダルシフト là chuyển hàng từ xe tải sang đường sắt hoặc tàu biển. Tính trên mỗi tấn-km, đường sắt phát thải ít nhất, tiếp theo là tàu biển.',
 'グリーン物流 gồm các biện pháp như giao hàng chung (共同配送), nâng tỉ lệ chất hàng (積載率), lái xe tiết kiệm nhiên liệu (エコドライブ) và dùng xe ít gây ô nhiễm. Khi nói về logistics và SDGs, trọng tâm cũng là グリーン物流.'],
 '46% là mục tiêu của cả nước; 35% là mục tiêu riêng của ngành vận tải.'],
['An toàn trong logistics gồm an toàn cho người lao động, trách nhiệm của chủ hàng, việc phục vụ người khó mua sắm và khả năng duy trì hoạt động khi có thiên tai.',[
 'Tỉ lệ tai nạn có thương vong trong vận tải hàng hóa đường bộ cao khoảng 4 lần trung bình các ngành; nhiều nhất là té ngã khi bốc dỡ (墜落・転落). Bộ Lao động đã ban hành hướng dẫn an toàn bốc dỡ, và thông tư phòng ngừa tai nạn bốc dỡ (荷役災害防止通達, 2015) yêu cầu cả chủ hàng cùng phối hợp.',
 '荷主勧告制度 (chế độ khuyến cáo chủ hàng): khi hãng vận tải vi phạm (chở quá tải, lái xe quá sức…) do chính chủ hàng yêu cầu, nhà nước sẽ khuyến cáo (勧告) chủ hàng và công bố tên chủ hàng đó. Chế độ này dựa trên 貨物自動車運送事業法.',
 '買い物弱者 là những người khó đi mua sắm hằng ngày (khoảng 910 vạn người), phần lớn là người cao tuổi ở vùng thưa dân. Các cách hỗ trợ: giao hàng tận nhà, bán hàng lưu động, cung cấp phương tiện đi lại và mở cửa hàng nhỏ gần nhà. Khó khăn là phụ thuộc trợ cấp và thiếu liên kết giữa nhà nước với tư nhân.',
 'BCP (事業継続計画, kế hoạch duy trì kinh doanh) là kế hoạch để vẫn duy trì được các nghiệp vụ quan trọng và phục hồi nhanh khi có thảm họa. Sau động đất năm 2011, nhiều công ty xem lại việc dồn kho vào một nơi, chuyển sang phân tán nhà cung cấp, kho và dùng nhiều tuyến vận chuyển.'],
 'Tai nạn xảy ra nhiều nhất khi BỐC DỠ, không phải khi lái. BCP sau năm 2011 là PHÂN TÁN, không phải tập trung thêm.'],
['Thiếu người là thách thức lớn nhất của ngành. Phần này nêu thực trạng và các quy định lao động liên quan.',[
 'Số người làm trong ngành kho chỉ khoảng 1/6 ngành vận tải xe tải nhưng đang tăng, vì vai trò của kho chuyển từ "giữ hàng" sang "lưu thông hàng", phát sinh nhiều công việc hơn.',
 'パートタイム労働者 được định nghĩa theo GIỜ làm: người có số giờ làm theo quy định mỗi tuần ngắn hơn lao động thông thường, bất kể được gọi là "パート" hay "アルバイト". Luật パートタイム・有期雇用労働法 yêu cầu 同一労働同一賃金 (cùng việc cùng lương), áp dụng cho doanh nghiệp lớn từ 4/2020 và doanh nghiệp vừa và nhỏ từ 4/2021.',
 'Luật 高年齢者雇用安定法 đặt nghĩa vụ NỖ LỰC (努力義務) tạo cơ hội làm việc đến 70 tuổi. Người từ 60 tuổi trở lên chiếm khoảng 1/4 số vụ tai nạn lao động phải nghỉ từ 4 ngày trở lên.',
 'Tư cách lưu trú 「特定技能」 được bổ sung ngành vận tải ô tô (自動車運送業) vào năm 2024. Lưu ý: bằng lái quốc tế không dùng được để lái xe kinh doanh vận tải.',
 'Ba trụ cột về nhân lực là: mở rộng tuyển dụng (採用), giữ người ở lại (定着) và cải thiện môi trường làm việc. Nâng mức hài lòng của nhân viên (ES) cũng rất quan trọng.'],
 'Làm việc đến 70 tuổi chỉ là 努力義務, không phải nghĩa vụ bắt buộc.'],
['Những con số từ bảng biểu giúp hình dung mức độ thiếu người và các quy định liên quan.',[
 'Tỉ lệ việc làm trên người tìm việc của tài xế là 2,11 lần (trung bình mọi nghề 1,13 lần). Giờ làm mỗi năm là 2.104 giờ, so với 1.718 giờ của trung bình các ngành. Thu nhập của tài xế xe lớn thấp hơn trung bình khoảng 5%, xe vừa và nhỏ thấp hơn khoảng 13%.',
 'Bằng lái chia theo tổng trọng lượng xe: 普通 dưới 3,5 tấn; 準中型 từ 3,5 đến dưới 7,5 tấn (từ 18 tuổi); 中型 từ 7,5 đến dưới 11 tấn (từ 20 tuổi, có 2 năm kinh nghiệm); 大型 từ 11 tấn trở lên (từ 21 tuổi, có 3 năm kinh nghiệm).',
 'Tỉ lệ tuyển dụng người khuyết tật theo luật tăng dần: 2,3% → 2,5% (từ 4/2024) → 2,7% (từ 7/2026).',
 'ISO26000 (2010) là hướng dẫn về trách nhiệm xã hội, KHÔNG phải tiêu chuẩn để cấp chứng nhận. Nó gồm 7 nguyên tắc và 7 chủ đề cốt lõi: quản trị tổ chức, nhân quyền, thực hành lao động, môi trường, thực hành kinh doanh công bằng, vấn đề người tiêu dùng, và cộng đồng.',
 'Tai nạn lao động trong vận tải hàng hóa đường bộ khoảng 15.000 người mỗi năm, tỉ lệ cao khoảng 4 lần trung bình; khoảng 70% xảy ra khi bốc dỡ, và 71% xảy ra tại nơi bốc dỡ không phải cơ sở của mình (ví dụ ở kho của khách hàng).'],
 'ISO26000 không cấp chứng nhận – đề hay bẫy chỗ này.']
];

window.LECTURE[3] = [
['総合物流施策大綱 (đại cương chính sách logistics tổng hợp) là văn bản định hướng chính sách logistics của chính phủ, ban hành theo từng giai đoạn vài năm.',[
 'Đại cương giai đoạn 2021–2025 (đời thứ 7) có ba trụ cột: ① 簡素で滑らかな物流 – logistics gọn và trơn tru nhờ DX và chuẩn hóa; ② 担い手にやさしい物流 – logistics tử tế với người lao động thông qua cải cách cách làm việc; ③ 強くてしなやかな物流 – logistics mạnh và dẻo dai, bền vững trước biến động và thiên tai.',
 '物流DX là chuẩn hóa hoạt động logistics bằng cơ giới hóa và số hóa. Đề cũ có thể hỏi đại cương giai đoạn 2017–2020, nên cần để ý năm của từng đời.'],
 'Thuộc ba cụm của đời 7 và năm của từng đời.'],
['Muốn làm đúng luật, trước hết phải phân biệt các loại thủ tục hành chính và thứ bậc của văn bản pháp luật.',[
 'Bốn loại thủ tục: 許可 là gỡ bỏ một lệnh cấm chung cho người đủ điều kiện; 認可 là cơ quan nhà nước đồng ý thì hành vi pháp lý của một người mới có hiệu lực; 登録 là ghi tên vào sổ đăng ký công; 届出 là chỉ cần thông báo cho cơ quan.',
 'Thứ bậc văn bản: 法律 (luật, do Quốc hội ban hành) → 政令 (lệnh, do Nội các ban hành) → 省令 hay 規則 (do các bộ ban hành) → 告示・通達 (thông báo, thông tư).'],
 'Gặp câu định nghĩa, nhớ: 認可 gắn với "có hiệu lực", 許可 gắn với "gỡ lệnh cấm".'],
['Nhóm luật này bảo vệ người lao động và các doanh nghiệp nhỏ nhận việc. Phần lớn là các con số cần thuộc.',[
 'Theo 労働基準法, muốn cho làm thêm giờ phải ký thỏa thuận 36協定 (theo điều 36 của luật). Trần làm thêm nguyên tắc là 45 giờ/tháng và 360 giờ/năm; nếu có điều khoản đặc biệt thì được vượt 45 giờ/tháng nhưng tối đa 6 tháng mỗi năm.',
 '下請法 (luật chống chậm thanh toán cho bên nhận thầu phụ) đặt ra 4 nghĩa vụ cho bên giao việc: giao văn bản, định ngày thanh toán trong vòng 60 ngày kể từ khi nhận, lưu hồ sơ và trả lãi khi chậm; đồng thời cấm ép giá (買いたたき), giảm tiền, từ chối nhận hàng, ép mua… Từ 1/2026 luật đổi tên thành 中小受託取引適正化法 (取適法), cấm thêm thanh toán bằng hối phiếu (手形払) và việc đơn phương định giá không thương lượng (thông tin ngoài bài giảng; bài giảng 2026 vẫn dùng tên 下請法).',
 'Giờ làm theo luật: 8 giờ/ngày và 40 giờ/tuần. Nghỉ giữa ca ít nhất 45 phút nếu làm quá 6 giờ, ít nhất 1 giờ nếu làm quá 8 giờ.',
 'Theo 改善基準告示, trong vòng 4 giờ lái liên tục (hoặc ngay sau đó) phải nghỉ tổng cộng ít nhất 30 phút; nếu chia nhỏ thì mỗi lần ít nhất 10 phút. Đây là 告示 nên không có chế tài hình sự.',
 'Theo 労働者派遣法, 二重派遣 (người được phái cử lại bị phái cử tiếp một lần nữa) là trái luật (職業安定法 điều 44, 労基法 điều 6). Nếu chủ hàng trực tiếp chỉ huy nhân viên của công ty nhận khoán thì thành 偽装請負 (khoán trá hình). Phái cử theo ngày (日雇派遣, hợp đồng dưới 30 ngày) về nguyên tắc bị cấm.',
 'Lãi chậm trả theo 下請法 là 14,6%/năm. 独占禁止法 có quy định đặc biệt cho logistics (物流特殊指定, 2004), xét theo vị thế ưu thế trong giao dịch chứ không theo vốn điều lệ. Bắt xe chờ lâu do lỗi bên giao việc mà không trả thêm tiền được xem là thay đổi nội dung bất hợp lý.'],
 'Bốn con số "8 – 40 – 45 – 360"; lãi chậm trả 14,6%.'],
['Những quy định này buộc doanh nghiệp vận tải và kho phải có người phụ trách an toàn và theo dõi chuỗi nhận khoán.',[
 '運輸安全マネジメント (quản lý an toàn vận tải, từ 2006) yêu cầu lãnh đạo cao nhất tham gia vòng PDCA về an toàn. Với vận tải xe tải, chế độ này bắt buộc với doanh nghiệp có từ 300 xe trở lên.',
 'Bộ hạn chế tốc độ (速度抑制装置) bắt buộc với xe tải lớn có tổng trọng lượng từ 8 tấn hoặc tải trọng tối đa từ 5 tấn, giới hạn ở 90 km/h (từ 2003). Từ 2024, tốc độ tối đa của xe tải lớn trên cao tốc được nâng từ 80 lên 90 km/h.',
 'Luật kinh doanh vận tải hàng hóa sửa đổi năm 2024 bắt buộc bên nhận thầu chính (元請) lập sổ quản lý hệ thống vận chuyển thực tế (実運送体制管理簿) và giao kết bằng văn bản. Mức "標準的な運賃" cũng được nâng khoảng 8% (3/2024).',
 'Theo 倉庫業法, mỗi kho phải chọn một 倉庫管理主任者 (người phụ trách quản lý kho). Theo 消防法, nơi có từ 50 người trở lên phải chọn 防火管理者 (người phụ trách phòng cháy).'],
 'Bốn con số: 300 xe, 8 tấn/5 tấn, 90 km/h, 50 người.'],
['Mỗi loại hình kinh doanh có một mức thủ tục khác nhau. Đây là phần rất hay ra đề.',[
 'Kinh doanh vận tải hàng hóa bằng xe tải thông thường (一般貨物自動車運送事業) phải xin 許可. Cước và phí chỉ cần 届出 sau khi áp dụng (事後届出). Mỗi 営業所 phải chọn một 運行管理者 (người quản lý vận hành).',
 '貨物利用運送事業 (vận tải bằng phương tiện của hãng khác): loại 1 (第一種) chỉ cần 登録; loại 2 (第二種) phải xin 許可, vì loại này kết hợp tàu biển, đường sắt hoặc hàng không với xe tải gom và giao hàng để làm trọn gói door-to-door.',
 'Kinh doanh kho (倉庫業) theo chế độ 登録: nhận hàng ký gửi (寄託) của người khác và bảo quản trong kho. トランクルーム là kho nhận ký gửi đồ đạc của người tiêu dùng.',
 'Theo 道路交通法, bằng 準中型 (từ 18 tuổi) được áp dụng từ 3/2017; việc chở quá tải (過積載) bị cấm.'],
 'Xe tải: 許可 · Kho: 登録 · 利用運送 loại 1: 登録, loại 2: 許可.'],
['Các luật về môi trường và hàng nguy hiểm thường chỉ đặt nghĩa vụ cho đơn vị có quy mô lớn (gọi là "特定").',[
 '物流効率化法 sửa đổi bắt buộc các 特定事業者 có quy mô từ một mức nhất định lập kế hoạch trung – dài hạn và báo cáo định kỳ; riêng 特定荷主 phải chọn người quản lý tổng thể logistics (物流統括管理者, CLO). Mốc áp dụng đầy đủ từ 4/2026 và ngưỡng 9 vạn tấn hàng/năm là thông tin ngoài bài giảng.',
 '省エネ法 (luật tiết kiệm năng lượng) yêu cầu 特定荷主 và 特定輸送事業者 lập kế hoạch và báo cáo định kỳ; chỉ những đơn vị quy mô lớn, không phải mọi hãng vận tải.',
 'Các luật khác: 自動車NOx・PM法 quy định loại xe được chạy trong khu vực đô thị; 廃棄物処理法 phân biệt chất thải thông thường và chất thải công nghiệp; theo 消防法, lưu trữ hàng nguy hiểm từ mức 指定数量 trở lên phải xin phép, còn lượng nhỏ (少量危険物) phải 届出.'],
 'Đề hay bẫy bằng cụm "mọi doanh nghiệp" – sai, chỉ đơn vị 特定.'],
['Phần này tổng hợp các đời đại cương và một số con số tra cứu xuất hiện trong bảng biểu.',[
 'Đời 6 (2017–2020) nhấn mạnh 「強い物流」. Đời 7 (2021–2025) có ba trụ cột: 簡素で滑らか, 担い手にやさしい, 強くてしなやか.',
 'Đời 8 (2026–2030) được xác định là giai đoạn cải cách tập trung hướng tới đổi mới logistics, với khẩu hiệu 「強く・賢く・優しく・つながる物流」: mạnh (chống chịu), thông minh (DX, chuẩn hóa), tử tế (GX, nhân lực) và kết nối (SCM).',
 '車両制限令 đặt giới hạn chung cho xe chạy trên đường: rộng 2,5 m, dài 12 m, cao 3,8 m, tổng trọng lượng 20 tấn, tải trục 10 tấn. Vượt các mức này phải xin 特殊車両通行許可.',
 'Kho lạnh được chia lại thành 10 cấp (từ C3 đến SF4) từ 1/2024. Hàng nguy hiểm nhóm 4 (危険物第4類) là chất lỏng dễ cháy (引火性液体).',
 'CO2 năm tài khóa 2021: ngành vận tải chiếm 17,4% tổng lượng, trong đó ô tô chiếm 86,8%.'],
 'Đời 8: 強く・賢く・優しく・つながる (2026–2030).']
];

window.LECTURE[4] = [
['Dịch vụ logistics là giá trị cộng thêm mà hoạt động logistics mang lại cho khách. Điều quan trọng là hiểu dịch vụ có giá, nên phải được chọn có cân nhắc.',[
 'Dịch vụ là tài sản vô hình (無形財): khi dùng 宅配便, người gửi trả tiền cho việc vận chuyển nhưng quyền sở hữu món hàng không chuyển sang hãng vận chuyển.',
 'Trong các dịch vụ khách hàng (顧客サービス), vốn gồm cả tư vấn, sửa chữa, bảo trì…, thì dịch vụ logistics đặc biệt quan trọng, với các yếu tố như nhanh và chính xác.',
 'Mức dịch vụ và chi phí logistics là quan hệ đánh đổi: dịch vụ không bao giờ "miễn phí". Cần chọn mức dịch vụ đem lại lợi nhuận cao nhất, chứ không phải mức dịch vụ cao nhất có thể.',
 'Hiện trường logistics được ví như tấm gương phản chiếu chất lượng hoạt động của cả công ty.'],
 'Đề hay đưa câu "dịch vụ càng cao càng tốt" – sai.'],
['Quản lý dịch vụ logistics xoay quanh ba việc, làm theo đúng thứ tự.',[
 '① Làm rõ dịch vụ đang cung cấp, ② đặt mức dịch vụ, ③ quản lý dịch vụ bằng chỉ số. Thực tế nhiều dịch vụ không được ghi rõ (do tập quán ngành, quan hệ lâu năm…), nên cần văn bản hóa thành điều kiện giao dịch.'],
 'Có những dịch vụ "ngầm" chưa ghi ra; bước ① là để làm lộ chúng.'],
['Bốn bước quản lý dịch vụ logistics đi từ nhìn ra ngoài đến nhìn vào trong, rồi mới đặt mức và đánh giá.',[
 'Thứ tự: ① ベンチマーキング (so sánh với đối thủ) → ② 現状分析 (phân tích hiện trạng) → ③ 物流サービス水準の設定 (đặt mức dịch vụ) → ④ 評価とフォローアップ (đánh giá và theo dõi). Thứ tự này hay bị hỏi.',
 'ベンチマーキング gồm điều tra đối thủ, điều tra thực trạng của chính mình rồi so sánh hai bên. Cách điều tra đối thủ: nhân viên kinh doanh hỏi khách hàng, dùng phiếu khảo sát hoặc thuê công ty điều tra.',
 'Mức dịch vụ logistics là điều kiện tiền đề để xây dựng hệ thống logistics. Ví dụ các hạng mục: giờ chốt nhận đơn, thời gian giao hàng, lô đặt hàng tối thiểu, giao theo giờ chỉ định, điều kiện trả hàng.',
 'Việc đánh giá phải dựa trên con số (định lượng) và đối chiếu với mức đã thỏa thuận.'],
 'ベンチマーキング luôn là bước ĐẦU TIÊN.'],
['Chất lượng logistics được đo bằng các chỉ tiêu cụ thể, trong đó nhóm tai nạn cần phân biệt kỹ.',[
 'Các hạng mục quản lý: giao đúng hạn, giao chính xác, chất lượng hàng, phòng ngừa sự cố, ấn tượng với khách và ứng xử với môi trường. Ví dụ: tỉ lệ giao đúng hạn (納期遵守率) = số lô xuất đúng hạn ÷ tổng số lô xuất.',
 '物流事故 (sự cố logistics) là khái niệm rộng nhất, bao gồm sự cố hàng hóa, tai nạn lao động và tai nạn giao thông.',
 '度数率 đo TẦN SUẤT tai nạn: số người thương vong ÷ tổng giờ làm × 1.000.000. 強度率 đo MỨC ĐỘ NẶNG: số ngày lao động bị mất ÷ tổng giờ làm × 1.000.'],
 'Đếm số lần → 度数率 (×100万); đo mức nặng → 強度率 (×1.000).'],
['Bảy công cụ QC (QC7つ道具) giúp nhìn dữ liệu chất lượng để tìm ra vấn đề và nguyên nhân.',[
 'パレート図: biểu đồ cột xếp từ lớn đến nhỏ kèm đường lũy kế, dùng để chọn ra vài vấn đề quan trọng nhất cần xử lý trước. Nguyên lý này cũng là cơ sở của phân tích ABC.',
 '特性要因図 (biểu đồ xương cá): sắp xếp mối quan hệ giữa kết quả (đầu cá) và các nguyên nhân (xương cá).',
 '管理図 (biểu đồ kiểm soát): theo dõi dữ liệu theo thời gian để xem quá trình có ổn định không, với đường giới hạn trên (UCL), đường trung tâm (CL) và đường giới hạn dưới (LCL). Giới hạn thường lấy bằng 3 lần độ lệch chuẩn.',
 '散布図 (biểu đồ phân tán) cho thấy mối tương quan giữa hai loại dữ liệu; ヒストグラム cho thấy sự phân bố của dữ liệu. Histogram hai đỉnh (ふた山型) cho thấy dữ liệu đang trộn từ hai nhóm, cần 層別.',
 'チェックシート để ghi chép không bỏ sót; グラフ để trực quan hóa; 層別 là chia dữ liệu thành các nhóm theo một tiêu chí (ca làm, máy, người…).'],
 'Muốn "chọn trọng điểm" → パレート図; muốn "tìm nguyên nhân" → 特性要因図.'],
['Cách sản xuất quyết định thời điểm bắt đầu làm hàng so với lúc nhận đơn, từ đó ảnh hưởng đến thời gian giao và tồn kho.',[
 'Các phương thức xếp từ "làm theo đơn" đến "làm sẵn": ETO (nhận đơn rồi mới thiết kế) → MTO (nhận đơn rồi mới sản xuất) → BTO → CTO → ATO (nhận đơn rồi lắp ráp) → MTS (sản xuất dự trù, làm sẵn để bán). Càng gần MTS thì thời gian giao càng ngắn, giá càng rẻ nhưng càng khó đổi quy cách theo ý khách. Điểm chuyển từ "làm theo dự báo" sang "làm theo đơn" gọi là デカップリングポイント.',
 'Các dạng histogram: thông thường (一般型), răng cưa (歯抜け型), lệch đuôi (裾引型), vách đứng (絶壁型), cao nguyên (高原型), hai đỉnh (ふた山型 → cần 層別) và đảo lẻ (離れ小島型 → có dữ liệu bất thường).'],
 'MTS làm sẵn trước khi có đơn, nên thời gian giao ngắn nhất.']
];

window.LECTURE[5] = [
['Mạng lưới logistics quyết định hàng đi qua những đâu. Câu hỏi trung tâm là: đặt bao nhiêu kho, loại gì và ở đâu.',[
 'Mạng lưới gồm ノード (結節点, điểm nút: kho, trung tâm, cảng) và リンク (tuyến vận chuyển). Các liên kết như đường sá, cảng phần lớn do khu vực công xây dựng.',
 'Càng nhiều trung tâm logistics thì chi phí giao hàng càng giảm (vì gần khách hơn), nhưng chi phí cơ sở và tồn kho càng tăng. Phải tìm số lượng cân bằng giữa hai chiều này.',
 'Ba loại cứ điểm: DC (在庫型) có giữ tồn kho; TC (通過型) không giữ tồn kho, chỉ phân loại và chuyển tải; PC (流通加工型) chuyên làm gia công.',
 'Xu hướng: từ kiểu dự trữ (備蓄型) sang kiểu giao hàng (配送型), từ sở hữu sang đi thuê (ví dụ quỹ 物流REIT), quy mô lớn hơn, và chuyển từ sâu trong nội địa ra gần cảng (臨海).',
 '重心法 (phương pháp trọng tâm) chọn vị trí kho sao cho tổng (khối lượng × khoảng cách), tức tổng tấn-km, là nhỏ nhất. Nhược điểm: chi phí thực tế không tỉ lệ thuận với khoảng cách, và còn phải tính nhu cầu tương lai, nguồn lao động.',
 '特積み (vận tải ghép hàng theo tuyến cố định): hàng xuất buổi chiều tối, trong vòng 600 km thì đến vào sáng hôm sau, từ 600 đến 1.000 km thì đến trong ngày hôm sau. Đây là ngành cần nhiều thiết bị, có lợi thế quy mô nên khó gia nhập (khoảng 300 hãng).'],
 'TC không giữ tồn kho. Nhiều kho thì giao rẻ hơn nhưng kho tốn hơn.'],
['Mỗi loại doanh nghiệp tổ chức logistics khác nhau, tùy vị trí của mình trong chuỗi cung ứng.',[
 'Nhà sản xuất gom tồn kho về ít cứ điểm trong phạm vi vẫn giữ được mức dịch vụ. Riêng hàng có "sức chịu chi phí" thấp như nước uống, đồ đông lạnh thì nên sản xuất gần nơi tiêu thụ.',
 'Nhà bán buôn gom hàng từ nhiều nhà sản xuất rồi chia cho nhiều nhà bán lẻ; vai trò này gọi là 集荷分散.',
 'Nhà bán lẻ chủ yếu nhận hàng qua trung tâm (センター納品). 一括物流 là đặt chung DC của nhà bán buôn và TC của nhà bán lẻ ở cùng một nơi. Chuỗi cửa hàng tiện lợi dùng trung tâm giao hàng chung, chia theo nhiệt độ bảo quản.'],
 '集荷分散 là vai trò của 卸 (nhà bán buôn).'],
['Trong kho, hàng đi theo một dòng cố định; năng suất kho phụ thuộc vào cách bố trí vị trí và cách lấy hàng.',[
 'Dòng công việc: nhận hàng (入荷) → kiểm hàng (検品) → cất vào vị trí (格納) → bảo quản (保管) → lấy hàng (ピッキング) → gia công (流通加工) → kiểm hàng → đóng gói (梱包) → phân loại (仕分け) → xuất hàng (出荷).',
 'Quản lý vị trí: 固定ロケーション – mỗi mặt hàng có chỗ cố định; フリーロケーション – cất vào bất kỳ chỗ trống nào, tận dụng diện tích tốt hơn nhưng bắt buộc phải có hệ thống thông tin để biết hàng đang ở đâu.',
 'Phân tích ABC theo tần suất xuất để bố trí lại kho: mặt hàng xuất nhiều lần đặt gần cửa xuất và ở độ cao dễ lấy. Lưu ý tần suất là số lần lấy hàng, khác với khối lượng xuất.',
 'Hai cách lấy hàng: 摘み取り方式 – đi lấy theo từng đơn; 種まき方式 – lấy gom tổng số lượng của nhiều đơn rồi chia ("gieo") ra từng đơn.'],
 'フリーロケーション bắt buộc có hệ thống thông tin.'],
['Doanh nghiệp có thể giao logistics cho bên ngoài ở nhiều mức độ khác nhau.',[
 '3PL là bên thứ ba thay mặt chủ hàng đề xuất cải cách logistics và nhận làm trọn gói các nghiệp vụ. Khác với việc chỉ nhận làm từng công đoạn riêng lẻ.',
 '物流子会社 (công ty con logistics) giúp chi phí logistics rõ ràng hơn và nâng tính chuyên môn; thách thức là mở rộng bán dịch vụ ra bên ngoài (外販), tiến tới trở thành 3PL.',
 'Khi thuê ngoài cũng phải tuân thủ luật lao động: 二重派遣 là trái luật (労働者派遣法, 職業安定法).'],
 '3PL nhấn mạnh hai chữ "đề xuất" và "trọn gói".'],
['Hợp tác với doanh nghiệp khác và gom bớt cứ điểm là hai cách tăng hiệu quả.',[
 '共同配送 (giao hàng chung) giúp nâng tỉ lệ chất hàng, giảm số xe và giảm tác động môi trường. Đổi lại sẽ mất một phần linh hoạt về dịch vụ, cần chuẩn hóa pallet và quy tắc, và việc chia chi phí khá phức tạp.',
 'Gom cứ điểm (拠点集約) giúp giảm diện tích kho và giảm vận chuyển qua lại giữa các cứ điểm (横持ち). Muốn giảm tồn kho thì phải đi kèm với việc xem lại kế hoạch cung cầu.'],
 'Lợi ích của giao hàng chung: 積載率 tăng, số xe giảm, tốt cho môi trường.'],
['Trong ngoại thương, điều kiện giao hàng phân chia chi phí và rủi ro vận chuyển; phương thức thanh toán phân chia rủi ro thu tiền.',[
 'インコタームズ2020 có 11 quy tắc; ba quy tắc tiêu biểu: FOB – người bán giao hàng lên tàu tại cảng đi; CFR – người bán trả thêm cước vận chuyển (Freight); CIF – người bán trả cả cước và bảo hiểm (Insurance).',
 'Các cách thanh toán: chuyển tiền (trả trước hoặc trả sau), L/C (thư tín dụng), D/P và D/A. Rủi ro của người xuất khẩu tăng dần theo thứ tự: trả trước < L/C < D/P < D/A < trả sau.',
 'D/P: người nhập khẩu phải trả tiền mới nhận được chứng từ để lấy hàng. D/A: người nhập khẩu chỉ cần chấp nhận hối phiếu là nhận được chứng từ. Thanh toán bằng chuyển tiền không cần B/L; hàng không dùng Air Waybill, không cần bản gốc.',
 '船荷証券 (B/L, vận đơn đường biển) là chứng khoán có giá, là chứng từ để đổi lấy hàng và có thể lưu thông. Loại 指図式 có thể chuyển nhượng (bán lại hàng) bằng ký hậu (裏書).'],
 'Thêm F (Freight) thành CFR, thêm I (Insurance) thành CIF.'],
['Phần này lấy từ các bảng, hình về thiết kế trung tâm logistics và các ví dụ minh họa.',[
 'Thiết kế trung tâm dựa trên 4 điều kiện: 荷姿 (hàng gì, hình dạng ra sao), 数量 (bao nhiêu), 作業タイムスケジュール (khi nào) và 作業・情報フロー (làm thế nào). Có thể thiết kế theo セカンドピーク法 hoặc Hi-AVE法.',
 'ゴールデンゾーン (vùng tối ưu) là độ cao dễ lấy hàng nhất; ストライクゾーン (vùng phù hợp) rộng hơn một chút. Hàng xuất nhiều nên đặt ở golden zone, không phải ở tầng thấp nhất.',
 '人時生産性 (năng suất theo giờ-người) = khối lượng công việc ÷ số giờ-người. Tài xế chỉ dành khoảng một nửa thời gian ràng buộc để lái: khi có thời gian chờ hàng thì lái khoảng 54%, không có chờ thì khoảng 65%.',
 'Ví dụ giao chung 3 chủ hàng × 3 khách: giao trực tiếp cần 9 xe và 18 lần bốc dỡ; giao chung chỉ cần 6 xe, 12 lần bốc dỡ và mỗi khách chỉ nhận 1 xe. Ba điều kiện cần thống nhất (3T): Temperature (nhiệt độ), Time (thời gian), Tolerance (mức chịu đựng của hàng).',
 'Đủ 11 quy tắc Incoterms 2020: nhóm dùng cho mọi phương thức vận tải gồm EXW, FCA, CPT, CIP, DAP, DPU, DDP; nhóm chỉ dùng cho đường biển gồm FAS, FOB, CFR, CIF. DDP là người bán lo cả thủ tục và thuế nhập khẩu.'],
 'Golden zone là tầm tay dễ lấy nhất, không phải tầng thấp nhất.']
];
