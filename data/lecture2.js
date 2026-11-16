/* Bài giảng chi tiết chương 6–10 (xem quy ước ở đầu lecture.js). */
window.LECTURE = window.LECTURE || {};

window.LECTURE[6] = [
['Quản lý tồn kho phải cân bằng hai yêu cầu ngược nhau: có đủ hàng để bán và không giữ quá nhiều hàng.',[
 'Hai mục đích phải đạt cùng lúc: ① giữ đủ tồn kho cần cho dịch vụ khách hàng; ② duy trì mức tồn hợp lý để cắt bớt chi phí giữ hàng không cần thiết.',
 'Về kế toán, tồn kho là 棚卸資産 (hàng tồn kho), thuộc tài sản lưu động (流動資産) và được ghi trên bảng cân đối kế toán.',
 'Tỉ lệ phục vụ từ tồn kho (在庫サービス率) = 1 − tỉ lệ hết hàng (品切れ率). 100% là lý tưởng nhưng không đạt được, dù tăng tồn kho an toàn bao nhiêu đi nữa.',
 'Tồn kho tồn tại vì nhiều lý do: để gom thành lô (ロット), để đệm cho biến động nhu cầu (tồn kho an toàn), để sản xuất ổn định, để chuẩn bị trước cho mùa cao điểm (見越し), và vì hàng cần thời gian vận chuyển.'],
 'Hai mục đích phải đạt đồng thời, không bỏ mục đích nào.'],
['Quản lý nhập – giữ – xuất bắt đầu từ việc ghi chép đúng.',[
 'Tồn cuối ngày (当残) = tồn đầu ngày (前残) + lượng nhập − lượng xuất. Thông tin trên sổ và hàng thực tế phải luôn khớp nhau (情物一致).',
 'Quản lý vị trí trả lời ba câu hỏi: cái gì, bao nhiêu, ở đâu. Khi xuất hàng thường yêu cầu 先入れ先出し (nhập trước xuất trước).'],
 '当残 = 前残 + 入庫 − 出庫.'],
['Tồn kho an toàn là lượng hàng dự phòng cho những ngày bán nhiều hơn bình thường. Phần này dùng một chút thống kê.',[
 'Lượng xuất mỗi ngày được xem như tuân theo phân phối chuẩn với trung bình μ và độ lệch chuẩn σ. Xác suất vượt μ + σ là 15,9%; vượt μ + 2σ là 2,28%.',
 '安全在庫 (tồn kho an toàn) = k × σ × √t, trong đó k là hệ số an toàn, t là thời gian bổ sung hàng (lead time). Thường lấy k = 2, khi đó xác suất hết hàng là 2,28% và tỉ lệ phục vụ là 97,72%. Ví dụ: 2 × 18,4 × √7 ≈ 97.',
 'Tồn kho trung bình = lượng bổ sung ÷ 2 + tồn kho an toàn. Tồn kho tối đa = lượng bổ sung + tồn kho an toàn.',
 'Lượng bổ sung tối ưu = √(2cD ÷ dp), trong đó c là chi phí mỗi lần đặt hàng, D là nhu cầu năm, d là tỉ lệ chi phí giữ hàng, p là đơn giá. Ví dụ: √(2 × 2.000 × 10.000 ÷ (0,25 × 1.000)) = 400.'],
 'Lead time t nằm trong căn: t tăng gấp 4 thì tồn kho an toàn chỉ tăng gấp 2.'],
['Cách bổ sung hàng được chia theo hai câu hỏi: đặt hàng theo kỳ cố định hay không, và lượng đặt cố định hay không.',[
 '定期定量 (kỳ cố định, lượng cố định): có trên lý thuyết nhưng thực tế hầu như không dùng.',
 '不定期定量 (gồm 発注点方式 và 補充点方式): khi tồn kho xuống dưới điểm đặt hàng thì bổ sung một lượng cố định. Phù hợp với hàng nhóm C.',
 '定期不定量: đến kỳ thì tính lượng cần thiết và bổ sung đúng lượng đó. Chính xác hơn nhưng tốn công.',
 '不定期不定量 (bổ sung từng lần): đặt khi có nhu cầu cụ thể, ví dụ hàng cho các đợt khuyến mãi.'],
 '発注点方式 thuộc nhóm 不定期定量.'],
['Các công cụ phân tích giúp biết hàng nằm trong kho bao lâu và mặt hàng nào cần chú ý.',[
 'Số ngày tồn (在庫保有日数) = lượng tồn ÷ nhu cầu mỗi ngày. Vòng quay tồn kho (在庫回転率) = tổng nhu cầu năm ÷ lượng tồn. Hai chỉ số này là nghịch đảo của nhau.',
 'Phân tích ABC (Pareto): xếp mặt hàng theo tỉ trọng; phần lũy kế đến 70% là nhóm A, đến 90% là nhóm B, còn lại là nhóm C. Nhóm A được bổ sung thường xuyên và đặt gần cửa xuất; nhóm C dùng 不定期定量 và ưu tiên tiết kiệm chỗ.',
 '流動数曲線 (đường cong lũy kế): vẽ đường lũy kế nhập và đường lũy kế xuất trên cùng trục thời gian. Khoảng cách theo chiều dọc giữa hai đường là lượng tồn kho; khoảng cách theo chiều ngang là số ngày hàng nằm trong kho.',
 '在庫鮮度分析 (phân tích độ tươi của tồn kho): xếp hạng hàng theo thời gian tồn đọng và cố gắng tăng tỉ lệ hàng ở các hạng tốt. Hàng không xuất quá thời hạn thì phải xử lý hoặc hủy.'],
 'Số ngày tồn × vòng quay ≈ 365, vì hai chỉ số nghịch đảo nhau.'],
['Kiểm kê để chắc chắn rằng sổ sách khớp với hàng thật.',[
 'Có 帳簿棚卸 (kiểm kê trên sổ) và 実地棚卸 (đếm hàng thật). Khi có chênh lệch, nguyên tắc là sửa thông tin trên sổ theo hàng thật, sau đó tìm nguyên nhân.',
 '一斉棚卸 (kiểm kê đồng loạt): dừng nhập xuất và đếm toàn bộ mặt hàng cùng lúc. Chính xác nhưng làm gián đoạn dịch vụ, nên thường chỉ làm vào cuối kỳ.',
 '循環棚卸 (kiểm kê luân phiên): chia mặt hàng hoặc khu vực và kiểm lần lượt theo tuần, theo tháng. Ngoài ra có cách mỗi ngày chỉ kiểm những mặt hàng có phát sinh nhập xuất.'],
 'Lệch thì sửa SỔ theo HÀNG, không làm ngược lại.'],
['Các ví dụ tính toán trong bảng biểu. Nên tự tính lại một lần cho quen tay.',[
 'Với μ = 48,8, σ = 18,7, t = 7, k = 2: tồn kho an toàn ≈ 98, điểm đặt hàng ≈ 440, lượng bổ sung tối ưu ≈ 534 (làm tròn thành 540), tồn kho trung bình 368, số ngày tồn 7,54 ngày.',
 'Hệ số an toàn và xác suất hết hàng: k = 1 → 15,87%; k = 2 → 2,28%; k = 3 → 0,13%.',
 'Cách đặt hàng phát triển từ 発注点方式 → 定期発注方式 → 連続補充方式 (VMI, CRP, CPFR), trong đó thông tin bán hàng được chia sẻ để bổ sung liên tục.',
 'Quy luật căn bậc hai (平方根の法則): khi gom 9 cứ điểm còn 4, tồn kho còn √4 ÷ √9 = 2/3.'],
 'Điểm đặt hàng = nhu cầu trong lead time + tồn kho an toàn (48,8 × 7 + 98 ≈ 440).']
];

window.LECTURE[7] = [
['Mỗi phương tiện vận tải có điểm mạnh riêng; chọn phương tiện là cân nhắc giữa giá, tốc độ và môi trường.',[
 'Sáu tiêu chí so sánh: kinh tế, nhanh, chính xác, an toàn, tiện lợi và thân thiện môi trường.',
 'Xe tải đi được từ cửa đến cửa nên tiện lợi nhất, nhưng đắt khi chở nhiều, đi xa và thải nhiều CO2. Ở Nhật, mốc tham khảo: xe tải đến khoảng 600 km, đường sắt 600–1.000 km, tàu biển từ 1.000 km trở lên.',
 'Đường sắt rẻ khi chở nhiều ở cự ly trung – dài và thải CO2 ít nhất. Tàu biển rẻ nhất khi chở nhiều, đi xa nhưng chậm. Tàu RORO cho xe tự chạy lên xuống, không cần cẩu.',
 'Máy bay nhanh nhất nhưng đắt. Có hai cách chở: ベリー輸送 (chở dưới sàn máy bay chở khách) và フレーター (máy bay chuyên chở hàng).'],
 'Thải CO2 ít nhất: đường sắt. Rẻ nhất cho hàng nhiều, đi xa: tàu biển.'],
['Quản lý vận tải gồm ba mảng và gắn với hai chức danh phụ trách an toàn khác nhau.',[
 'Ba mảng: quản lý giao hàng và điều xe (配送・配車管理), quản lý vận hành và an toàn lái xe (運行管理・安全運転管理), và theo dõi hàng (貨物追跡管理). Có hai kiểu giao: ルート配送 (đi vòng qua nhiều điểm) và ピストン配送 (chạy qua lại giữa hai điểm).',
 '運行管理者 (người quản lý vận hành) dành cho xe kinh doanh vận tải: mỗi 営業所 có đến 29 xe chọn 1 người, sau đó cứ thêm 30 xe thì thêm 1 người. Người này phải thường trực tại 営業所; nếu có nhiều người thì chọn một 統括運行管理者.',
 '安全運転管理者 (người quản lý lái xe an toàn) dành cho cơ sở dùng xe tự dùng (không kinh doanh vận tải) từ 5 xe trở lên, hoặc từ 1 xe loại chở từ 11 người trở lên. Từ 12/2023 bắt buộc kiểm tra nồng độ cồn bằng máy.',
 '傭車 là thuê xe của công ty khác khi xe của mình không đủ.'],
 'Xe KINH DOANH → 運行管理者; xe TỰ DÙNG → 安全運転管理者.'],
['Bao gói không chỉ để đẹp: trong logistics, mục đích chính của nó là bảo vệ hàng.',[
 'Mục đích lớn nhất của bao gói là bảo vệ hàng bên trong. Ngoài ra bao gói còn giúp dễ xử lý, dễ bán, truyền đạt thông tin và chỉ dẫn cách xử lý hàng.',
 '工業包装 (bao gói công nghiệp) nhằm bảo vệ hàng và thuận tiện cho logistics; 商業包装 (bao gói thương mại) nhằm kích thích người mua. Còn 消費者包装 và 業務用包装 là cách chia theo người mua.',
 'Ba lớp: 個装, 内装, 外装. Với tủ lạnh, máy giặt, lớp 個装 đồng thời cũng là 外装.'],
 'Đề bẫy: "mục đích lớn nhất của bao gói là quảng cáo" – sai.'],
['Gom hàng thành một đơn vị chuẩn giúp cơ giới hóa việc bốc dỡ và vận chuyển xuyên suốt.',[
 'ユニットロードシステム gom hàng bằng pallet hoặc container thành một đơn vị, nhờ đó bốc dỡ bằng máy và vận chuyển xuyên suốt (一貫輸送). Nhược điểm: giảm tỉ lệ chất hàng, cần đầu tư thiết bị và tốn công quản lý pallet.',
 'Pallet chuẩn T11 có kích thước 1.100 × 1.100 mm, dùng cho vận chuyển pallet xuyên suốt (一貫パレチゼーション); ngoài ra còn loại 1.200 × 1.000 mm.',
 'Container đường biển quốc tế (ISO) chủ yếu là loại 20 ft và 40 ft. Loại 45 ft về nguyên tắc không được chạy trên đường công cộng trong nước.',
 'JR貨物 chủ yếu dùng container 12 ft (5 tấn). Loại 31 ft có dung tích gần bằng xe tải lớn nên phù hợp cho モーダルシフト.'],
 'T11 = 1,1 m × 1,1 m.'],
['Các thông số từ bảng biểu. Đề có thể hỏi về trọng lượng tối đa.',[
 'Pallet phẳng (平パレット) chiếm hơn 80%. Các bộ phận: lỗ cắm càng nâng (差込口), thanh đỡ (けた), ván mặt (デッキボード) và phần vát cạnh (面取り部).',
 'Container JR 12 ft: 18,7 m³, tải 5.000 kg. Container 31 ft: 48,0 m³, tải 13.800 kg.',
 'Container ISO (2020): loại 20–45 ft có tổng khối lượng tối đa 36.000 kg; loại 10 ft là 10.160 kg.',
 'Xe bồn (タンクローリー) tối đa 30.000 lít; xe kéo ba rơ-moóc (トリプルス) không được chạy trên đường công cộng; container hàng không LD-3 tối đa 1.587 kg.'],
 'Container 12 ft: 5 tấn; container ISO: 36 tấn.']
];

window.LECTURE[8] = [
['Chi phí logistics khó nhìn thấy trên báo cáo tài chính. Muốn quản lý được, trước hết phải biết cách nhìn ra nó.',[
 'Kế toán tài chính (財務会計) không đủ để nắm chi phí logistics; cần kế toán quản trị (管理会計). Lý do: chi phí logistics tự làm nằm rải rác trong lương, khấu hao, thuế…',
 '支払物流費 (chi phí trả cho bên ngoài) dễ nắm; 自家物流費 (chi phí tự làm) khó nắm.',
 'Phương pháp của Bộ Công thương cũ (通産省方式, sổ tay tính chi phí logistics năm 1992) phân loại chi phí theo chức năng, theo chủ thể và theo biến phí – định phí. JILS khảo sát hằng năm theo mô hình này.',
 'Phân theo chức năng thì chi phí vận chuyển lớn nhất, chiếm hơn một nửa. Tỉ lệ chi phí logistics trên doanh thu của toàn ngành khoảng 5% (JILS năm tài khóa 2025: 5,32%).',
 '物流コスト負担力 (sức chịu chi phí logistics): hàng có tỉ lệ chi phí logistics trên doanh thu thấp được gọi là "có sức chịu", ví dụ mỹ phẩm cao cấp; nước giải khát thì không.'],
 'Hàng giá trị cao, nhẹ thì chịu được chi phí logistics.'],
['Cước vận tải và phí kho có những quy tắc tính riêng cần thuộc.',[
 'Cước xe tải đã chuyển từ chế độ 認可 sang 届出, rồi từ báo trước sang báo sau (trong vòng 30 ngày sau khi đặt hoặc thay đổi).',
 'Ba kiểu cước: 貸切運賃 (thuê nguyên xe, tính theo khoảng cách hoặc theo thời gian), 積合せ運賃 (hàng ghép, tính theo trọng lượng × khoảng cách) và 宅配便運賃 (phân hạng theo tổng ba cạnh và trọng lượng, mỗi kiện đến 30 kg).',
 'Phí kho = phí bảo quản (保管料) + phí bốc dỡ (荷役料) + các phí khác. Từ năm 2002 chuyển sang chế độ báo sau.',
 '保管料 tính theo giá trị hàng (従価率) cộng theo lượng hàng (従量率), chia mỗi tháng thành 3 kỳ (ngày 1–10, 11–20, 21–cuối tháng) và theo hạng khu vực (級地). Gửi từ ngày 10 đến ngày 11 (chỉ 2 ngày) vẫn tính 2 kỳ.'],
 'Phí kho tính 3 kỳ mỗi tháng; gửi vắt qua 2 kỳ là tính 2 kỳ.'],
['Khi tính chi phí logistics, cần biết chi phí nằm ở đâu trên báo cáo và phải tính đủ các khoản.',[
 'Trên báo cáo kết quả kinh doanh, chi phí 調達物流 chủ yếu nằm trong giá vốn hàng bán (売上原価); chi phí 販売物流 chủ yếu nằm trong chi phí bán hàng và quản lý (販売費及び一般管理費).',
 'Chi phí nhân công phải tính cả bảo hiểm bắt buộc, phúc lợi, trợ cấp thôi việc…, không chỉ có lương; thường khoảng 1,2 lần lương danh nghĩa trở lên.',
 '社内金利 (lãi suất nội bộ) là chi phí của số vốn bị "giam" trong tồn kho và thiết bị. JILS tính lãi nội bộ của tồn kho vào chi phí bảo quản.',
 'Chi phí bao bì tiêu dùng (消費者包装, tức 商業包装) không được tính vào chi phí bao gói của logistics.'],
 'Khâu mua vào → 売上原価; khâu bán ra → 販管費.'],
['Giảm chi phí logistics luôn phải tính đến các quan hệ đánh đổi và dùng đúng công cụ quản lý.',[
 'Các quan hệ đánh đổi: dịch vụ ⇄ chi phí, vận chuyển ⇄ bảo quản, và giữa các khoản chi phí với nhau. Ví dụ giao gấp làm tỉ lệ chất hàng thấp nên chi phí tăng.',
 'Công cụ quản lý: so sánh kế hoạch với thực tế (予実管理), benchmark, KPI và PDCA. Chi phí logistics được gọi là "nguồn lợi nhuận thứ ba" (第三の利潤源), sau tăng doanh thu và giảm giá thành sản xuất.',
 'Khi giảm chi phí phải tuân thủ 独占禁止法 (quy định đặc biệt về logistics) và 取適法 (tên cũ 下請法): không ép giá, không từ chối thương lượng giá.',
 'Dịch vụ thừa xảy ra vì người hưởng (bên nhận hàng) khác người trả tiền (bên gửi hàng). Cách giải: メニュープライシング – giá thay đổi theo mức dịch vụ, ví dụ giảm giá khi đặt đủ 10 tấn.',
 'Rủi ro tồn kho càng cao thì số cứ điểm tối ưu càng ít. Với hàng mất giá nhanh như máy tính, TV, quần áo, "lãi tồn kho" có thể lên tới 100%/năm.',
 'Tăng số vòng chạy của xe tải thì định phí được chia cho nhiều chuyến hơn, nên chi phí mỗi chuyến giảm.',
 'Quy đổi thể tích sang trọng lượng: xe tải ghép tuyến 1 m³ = 280 kg; hàng không 6.000 cm³ = 1 kg; đường biển và kho 1 tấn = 1,133 m³.'],
 'Hàng mất giá nhanh → nên ít kho, gom tồn kho lại.'],
['Các ý từ bảng biểu giúp hình dung chi phí logistics và cách tính chi phí theo hoạt động.',[
 'Chi phí logistics giống tảng băng trôi (氷山): phần nổi là chi phí trả cho bên ngoài; phần chìm là chi phí logistics ẩn trong giá vốn và trong chi phí bán hàng, quản lý.',
 'Tỉ lệ chi phí logistics trên doanh thu trong ngành chế tạo: cao nhất là gốm sứ – đất đá (窯業・土石) 9,29%, thấp nhất là thiết bị điện 2,11%.',
 'Chi phí theo ABC (Activity-Based Costing) = số lần thực hiện × thời gian mỗi lần × đơn giá hoạt động.',
 'Phí bảo quản bù cho ba thứ: cung cấp không gian, gánh thời gian và quản lý hàng; tính theo 3 kỳ, theo giá trị cộng theo lượng. Phí bốc dỡ được tính 2 lần: khi nhập và khi xuất.',
 'Đầu tư hệ thống thông tin là ví dụ hiếm hoi khi chi phí giảm và dịch vụ tăng cùng lúc, tức không phải quan hệ đánh đổi.'],
 'ABC = số lần × thời gian × đơn giá.']
];

window.LECTURE[9] = [
['Hệ thống thông tin logistics là "hệ thần kinh" điều khiển dòng hàng.',[
 'Theo JIS Z 0111, hệ thống thông tin logistics là hệ thống thông tin lấy logistics làm đối tượng, bao gồm các lĩnh vực chức năng, lĩnh vực nghiệp vụ, quá trình quản lý và quan hệ giữa doanh nghiệp logistics với chủ hàng.',
 'Mục đích là vận hành trơn tru hệ thống logistics: vừa nâng mức hài lòng của khách, vừa nâng hiệu quả.',
 'Đặc trưng: liên lạc giữa nhiều cứ điểm, kết nối với nhiều loại thiết bị, dùng thông tin di động, liên lạc giữa các doanh nghiệp và phải bảo trì thường xuyên.'],
 'Mục đích gồm cả hai vế: khách hài lòng VÀ hiệu quả.'],
['Các hệ thống được chia theo vai trò: lõi, thông tin và nghiệp vụ.',[
 'Hệ thống thông tin gồm 基幹系 (hệ thống lõi), 情報系 (hệ thống thông tin quản trị) và 業務系 (hệ thống nghiệp vụ); 業務系 lại chia thành 計画系 (lập kế hoạch) và 実行系 (thực hiện).',
 '計画系 lo dự báo nhu cầu, kế hoạch sản xuất, kế hoạch bán hàng và kế hoạch phân bố tồn kho. ERP không có sẵn chức năng dự báo; đó là việc của SCP.',
 '実行系 lo xử lý đơn nhận, đơn đặt, quản lý kho (WMS) và quản lý vận tải (TMS). Hệ thống này thường được tách khỏi hệ thống lõi để việc bảo trì ít ảnh hưởng lẫn nhau.'],
 'Dự báo nhu cầu thuộc 計画系, không có sẵn trong ERP.'],
['Xây dựng hệ thống thông tin thành công phụ thuộc nhiều vào giai đoạn đầu và sự tham gia của người dùng.',[
 'Các bước: lập chiến lược → lên kế hoạch hệ thống → thiết kế và phát triển → kiểm thử → vận hành. Hai bước đầu quyết định chất lượng, chi phí và thời hạn (Q·C·D).',
 'Yếu tố thành công: mục đích rõ ràng, có bộ máy xây dựng (với người phụ trách CIO), dùng ICT phù hợp, và hiện trường logistics cùng người dùng tham gia. Khi xác định yêu cầu (要件定義) cần bộ phận logistics tham gia.',
 'Hai cách phát triển: ウォーターフォール型 (làm tuần tự từng giai đoạn) và アジャイル型 (làm theo vòng ngắn, sửa liên tục).'],
 'Người dùng (bộ phận logistics) phải tham gia xác định yêu cầu.'],
['Mã vạch một chiều (1次元シンボル) là công cụ nhận dạng tự động phổ biến nhất trong logistics.',[
 'Ưu điểm: đọc nhanh, tỉ lệ đọc sai cực thấp, rẻ và được chuẩn hóa toàn cầu. Nhược điểm: chứa ít thông tin và chiếm diện tích lớn.',
 'Mã JAN (GTIN-13 / GTIN-8) có loại chuẩn 13 số và loại rút gọn 8 số; mã nước của Nhật là 45 và 49. Cấu trúc: mã doanh nghiệp GS1 + mã mặt hàng + chữ số kiểm tra.',
 'ITF (mã sản phẩm bao gói tập hợp, GTIN-14) có 14 số, số đầu là chỉ số đóng gói (インジケータ). Mã này dùng cho thùng carton – đơn vị giao dịch giữa các doanh nghiệp.',
 'GS1-128 dùng AI (mã định danh ứng dụng) để biểu diễn thêm ngày sản xuất, số lô…, với ký hiệu theo chuẩn CODE128. Mã Codabar (NW-7) dùng trên phiếu gửi 宅配便.'],
 'JAN 13 số – ITF 14 số – mã nước Nhật 45/49.'],
['Khi cần nhiều thông tin hơn, hoặc cần đọc mà không phải nhìn thấy mã, ta dùng mã hai chiều hoặc RFID.',[
 'Mã hai chiều (2次元シンボル, như QR) chứa nhiều thông tin trong diện tích nhỏ và có chức năng sửa lỗi (誤り訂正).',
 'RFID dùng sóng vô tuyến: đọc không tiếp xúc, đọc nhiều thẻ cùng lúc và ghi lại được. Khó khăn là giá thành và ảnh hưởng của kim loại, chất lỏng. Ví dụ ứng dụng: quản lý container, かんばん điện tử, kiểm kê hàng may mặc.'],
 'RFID đọc một lúc nhiều thẻ, không cần chạm.'],
['Phần tính toán từ bảng biểu: chữ số kiểm tra và các mã AI.',[
 'Chữ số kiểm tra của JAN-13: với 12 số đầu đếm từ trái, lấy tổng các vị trí chẵn nhân 3, cộng tổng các vị trí lẻ, rồi lấy 10 trừ chữ số hàng đơn vị của kết quả (nếu hàng đơn vị là 0 thì chữ số kiểm tra là 0). Ví dụ: 456995111617 → 9.',
 'Một số AI: 01 GTIN, 10 số lô, 11 ngày sản xuất, 15 hạn dùng tốt nhất (賞味期限), 17 hạn sử dụng (有効期限), 21 số sê-ri.',
 'UPC là mã của Mỹ (UPC-A 12 số, UPC-E 8 số). Mã QR do Nhật (Denso) phát triển.'],
 'Tính thử: vị trí chẵn 5+9+5+1+6+7 = 33, nhân 3 được 99; vị trí lẻ 4+6+9+1+1+1 = 22; tổng 121 → 10 − 1 = 9.']
];

window.LECTURE[10] = [
['Hệ thống nhận đơn là điểm xuất phát của toàn bộ hệ thống thông tin logistics.',[
 'Gồm ba phần: nhập đơn (オーダーエントリー処理), xử lý thông tin xuất hàng (出荷情報処理) và quản lý đơn (オーダー管理).',
 'Ba cách nhập đơn: nhập trực tiếp trên màn hình, nhập qua phương tiện như OCR, và nhập trực tuyến (EOS).',
 '在庫引当 (giữ tồn kho cho đơn): nếu đủ hàng thì chuyển sang xử lý xuất hàng; nếu không thì chuyển sang quản lý đơn chờ (受注残, backorder).',
 'Xử lý thông tin xuất hàng phát ra các chỉ thị: xuất hàng, lấy hàng và kiểm hàng.'],
 'Không đủ hàng → đơn chuyển sang 受注残, không bị hủy.'],
['Hệ thống đặt hàng trả lời ba câu hỏi: ai đặt, đặt bằng cách nào và báo trước cho bên nhận ra sao.',[
 'EOS (Electronic Ordering System) là đặt hàng trực tuyến. Lợi ích: bên đặt giảm công và sai sót; bên nhận không phải nhập lại dữ liệu.',
 'Người quyết định đặt hàng có thể là bên đặt (EOS, CAO – đặt hàng tự động có máy tính hỗ trợ), bên nhận đơn (VMI) hoặc hai bên cùng quyết (コラボレーション).',
 'ASN (事前出荷通知, thông báo trước khi giao) giúp bên nhận kiểm hàng nhập nhanh hơn.'],
 'VMI: bên NHẬN đơn (nhà cung cấp) quyết định việc bổ sung.'],
['WMS (hệ thống quản lý kho) điều khiển mọi hoạt động trong kho, từ nhập đến xuất.',[
 'WMS gồm ba phần: xử lý nhập – xuất tồn (在庫受け払い処理), xử lý lấy hàng – phân loại (ピッキング・仕分け処理) và quản lý công việc (作業管理).',
 'Kiểm hàng nhập có ba cách: theo danh sách (リスト検品), bằng mã vạch (バーコード検品) và tự động. Nhãn thường dùng: nhãn SCM, ITF, JAN.',
 'Chỉ thị lấy hàng có ba cách: in danh sách (リスト方式), dán nhãn (シール方式) và dùng dữ liệu (データ方式: đèn số digital picking, xe đẩy có màn hình, chỉ dẫn bằng giọng nói…).',
 'Quản lý công việc (LMS) theo dõi tiến độ, kết quả, phân tích năng suất và hỗ trợ lập kế hoạch công việc (LSP).'],
 'Ba phần của WMS không có "xử lý khiếu nại".'],
['TMS (hệ thống quản lý vận tải) quản lý toàn bộ khâu vận chuyển, từ lập kế hoạch đến theo dõi hàng.',[
 'TMS gồm: lập kế hoạch giao hàng và điều xe, quản lý vận hành, và theo dõi hàng.',
 'Kế hoạch giao hàng và điều xe nhằm nâng tỉ lệ chất hàng và giảm tối đa thời gian chạy, quãng đường và số xe; có tính cả thời gian giao nhận và thời gian chờ.',
 '求車求荷システム ghép thông tin xe trống với thông tin hàng cần chở, theo ba kiểu: bảng tin (掲示板型), đấu giá (オークション型) và có người điều phối (オペレート型).',
 'Quản lý vận hành dùng thiết bị gắn trên xe (車載端末), đồng hồ ghi hành trình điện tử (デジタコ) và GPS; nhật ký lái xe được lập tự động. Ba khoản chi phí vận hành (運行3費): nhiên liệu – dầu nhớt, sửa chữa, lốp – săm.',
 'Theo dõi hàng có hai kiểu: トラッキング (ghi nhận tại từng điểm hàng đi qua) và トレーシング (theo dõi liên tục, theo thời gian thực).'],
 'トラッキング = theo từng trạm; トレーシング = liên tục.'],
['WMS và hệ thống lõi cùng quản lý tồn kho nhưng với mục đích khác nhau.',[
 'Hệ thống lõi (基幹システム) quản lý giá mua – bán, tồn kho toàn công ty, hóa đơn – tín dụng và cập nhật theo ngày. WMS quản lý kích thước kiện hàng, vị trí, số lô và cập nhật theo thời gian thực.',
 'WMS = xử lý nhập – xuất tồn + xử lý lấy hàng – phân loại + quản lý công việc.'],
 'Hệ thống lõi lo TIỀN, WMS lo HÀNG.']
];
