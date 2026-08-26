# APPROVED

# Western Uranus 12 Signs Ruleset Approved

Mã nhiệm vụ: `WA-P1-003`<br>
Ngày duyệt ruleset: 2026-08-03<br>
Trạng thái: `APPROVED - READY FOR IMPLEMENTATION`<br>
Ruleset ID: `western-uranus-sign-v1`<br>
Version: `1.0.0`<br>
Rule ID convention: `WESTERN-URANUS-<SIGN>-V1`

Tài liệu này là bản ruleset Sao Thiên Vương trong 12 cung đã đủ điều kiện triển khai vào interpretation engine. Nội dung chỉ được dùng cho **Uranus trong cung Hoàng đạo Tropical** và phải lấy vị trí Uranus từ `WesternAstrologyResult.bodies`; không tự tính lại, không suy diễn nhà, góc chiếu, transit, dự báo hoặc tổng hợp toàn lá số.

## Kết quả rà soát

- Ruleset có đủ 12 cung, mỗi cung có title, summary, strengths, challenges, developmentAdvice và ghi chú phạm vi.
- Tone phù hợp nguyên tắc diễn giải của Thiên Vận: không dọa sợ, không phán tuyệt đối, không xem khác biệt, nổi loạn hoặc bất ổn là mặc nhiên tốt hoặc xấu.
- Nội dung tập trung đúng biểu tượng Uranus: thức tỉnh, đổi mới, độc lập, phá vỡ khuôn mẫu, cải tiến hệ thống, bất ngờ và nhu cầu tự do khỏi cấu trúc đã lỗi thời.
- Mỗi cung thể hiện Uranus như một nguyên lý thế hệ hoặc xuyên cá nhân đi qua phong cách biểu đạt của cung; khi đọc cá nhân phải đặt trong bối cảnh toàn lá số, đặc biệt là nhà, góc chiếu và mức độ nổi bật của Uranus nếu các ruleset đó được triển khai sau.
- Không phát hiện mâu thuẫn trực tiếp với calculation architecture: ruleset chỉ cần `body = Uranus` và `sign` đã có sẵn trong typed result.

## Ghi chú học thuật và giới hạn dignity

- Ruleset này không dùng dignity, detriment, exaltation hoặc fall để xếp hạng Uranus trong từng cung.
- Một số trường phái hiện đại xem Uranus có liên hệ mạnh với Aquarius và đối vị với Leo; các giả thuyết exaltation/fall của Uranus không có đồng thuận đủ ổn định cho phạm vi task này.
- Vì WA-P1-003 chỉ khóa nội dung Uranus trong cung, các tranh luận trên được ghi như bối cảnh học thuật, không được chuyển thành kết luận tuyệt đối trong rule.
- Không còn lựa chọn học thuật bắt buộc nào cần chủ dự án quyết định trước khi chuyển WA-P1-003 sang READY.

## Giới hạn bắt buộc khi triển khai

- Không dùng rule này để kết luận toàn bộ tính cách hoặc giá trị của một người.
- Không biến Uranus thành nhãn cá nhân trực tiếp như "người nổi loạn" nếu không có bối cảnh toàn lá số hỗ trợ.
- Không dùng rule này để dự đoán biến cố, đổ vỡ, thiên tài, bất ổn, thay đổi nghề nghiệp, di cư, công nghệ hoặc khủng hoảng chắc chắn.
- Không trộn Uranus với Jupiter trong mở rộng/cơ hội, Saturn trong kỷ luật/giới hạn, Neptune trong tâm linh mơ hồ hoặc Pluto trong quyền lực/chuyển hóa sâu.
- Không mở rộng sang Uranus trong nhà, góc chiếu, transit, chu kỳ thế hệ hoặc tổng hợp toàn lá số nếu chưa có ruleset riêng.
- Evidence tối thiểu của mỗi rule: `body: "Uranus"` và `sign`.
- Evidence hiển thị trong UI khi tích hợp cần gom thêm longitude, degree, minute, rule ID và version từ kết quả calculation.

## Schema triển khai đề xuất

```ts
{
  ruleId: "WESTERN-URANUS-ARIES-V1";
  version: "1.0.0";
  title: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  developmentAdvice: string[];
  evidence: {
    body: "Uranus";
    sign: ZodiacSign;
  };
}
```

## Aries

- Rule ID: `WESTERN-URANUS-ARIES-V1`
- Title: Sao Thiên Vương Bạch Dương
- Summary: Uranus Bạch Dương thường biểu hiện nguyên lý đổi mới qua hành động tiên phong, quyền được bắt đầu khác đi và phản ứng nhanh trước những cấu trúc làm mất tự chủ. Ở cấp cá nhân, vị trí này nên được đọc như một cách lá số tiếp xúc với nhu cầu khai mở và độc lập, không phải kết luận rằng bạn luôn bốc đồng hoặc nổi loạn.
- Strengths:
  - Có khả năng nhận ra thời điểm cần hành động mới khi một mô thức đã trở nên trì trệ.
  - Dễ khơi dậy tinh thần thử nghiệm, can đảm và tự chủ trong những hoàn cảnh chưa có tiền lệ rõ.
- Challenges:
  - Có thể đồng nhất tự do với việc phải phản ứng ngay, khiến thay đổi thiếu bước kiểm chứng.
  - Dễ xem mọi giới hạn như sự cản trở, dù một số giới hạn có thể giúp sáng kiến đứng vững hơn.
- DevelopmentAdvice:
  - Biến xung lực đổi mới thành thử nghiệm nhỏ có tiêu chí rõ trước khi phá bỏ toàn bộ cấu trúc cũ.
  - Tập phân biệt hành động độc lập với phản ứng chống lại áp lực bên ngoài.

## Taurus

- Rule ID: `WESTERN-URANUS-TAURUS-V1`
- Title: Sao Thiên Vương Kim Ngưu
- Summary: Uranus Kim Ngưu thường đưa nguyên lý đổi mới vào giá trị, nguồn lực, sự ổn định và cách con người liên hệ với vật chất hoặc đời sống cảm quan. Khi đọc trong lá số cá nhân, vị trí này gợi ý vùng cần tái định nghĩa an toàn và giá trị, nhưng không tự nó dự báo mất ổn định hay thay đổi tài chính.
- Strengths:
  - Có khả năng cải tiến những hệ thống thực tế, nhất là khi một cách quản lý nguồn lực đã lỗi thời.
  - Dễ nhìn thấy giá trị mới trong điều đơn giản, bền vững hoặc ít được đánh giá đúng.
- Challenges:
  - Có thể dao động giữa bám chặt vào an toàn quen thuộc và phá vỡ đột ngột khi cảm thấy bị kìm giữ.
  - Dễ biến nhu cầu kiểm soát nguồn lực thành căng thẳng với những thay đổi vốn cần thời gian thích nghi.
- DevelopmentAdvice:
  - Thử đổi mới theo nhịp có thể hấp thụ được, để hệ thần kinh và đời sống thực tế có thời gian cập nhật.
  - Kiểm tra định kỳ xem điều đang giữ lại là giá trị thật hay chỉ là cảm giác quen thuộc.

## Gemini

- Rule ID: `WESTERN-URANUS-GEMINI-V1`
- Title: Sao Thiên Vương Song Tử
- Summary: Uranus Song Tử thường biểu hiện qua tư duy nhanh, ngôn ngữ mới, mạng lưới thông tin và cách phá vỡ lối hiểu cũ bằng câu hỏi sắc bén. Trong bối cảnh cá nhân, vị trí này nói về phong cách đổi mới trong học hỏi và kết nối ý tưởng, không phải bằng chứng rằng một người luôn bất ổn trong suy nghĩ.
- Strengths:
  - Có khả năng nhận ra liên kết bất ngờ giữa các dữ kiện, nhóm người hoặc hệ tri thức khác nhau.
  - Dễ thúc đẩy cách học, viết, nói hoặc truyền thông bớt khuôn mẫu và linh hoạt hơn.
- Challenges:
  - Có thể theo đuổi quá nhiều luồng kích thích trí tuệ, khiến hướng đổi mới bị phân tán.
  - Dễ dùng sự khác biệt trong quan điểm như cách gây sốc, thay vì làm rõ điều thật sự cần thay đổi.
- DevelopmentAdvice:
  - Chọn một vài câu hỏi cốt lõi để dẫn luồng thử nghiệm trí tuệ thay vì mở quá nhiều nhánh cùng lúc.
  - Gắn ý tưởng đột phá với dữ kiện, cấu trúc diễn đạt và khả năng người khác có thể hiểu được.

## Cancer

- Rule ID: `WESTERN-URANUS-CANCER-V1`
- Title: Sao Thiên Vương Cự Giải
- Summary: Uranus Cự Giải thường đưa đổi mới vào cảm giác thuộc về, gia đình, ký ức và cách tạo an toàn cảm xúc. Khi đọc cá nhân, vị trí này gợi ý nơi một người hoặc thế hệ có thể cần định nghĩa lại sự chăm sóc và gắn bó, nhưng không nên kết luận đơn giản là thiếu ổn định tình cảm.
- Strengths:
  - Có khả năng mở ra mô hình chăm sóc, gia đình hoặc cộng đồng linh hoạt hơn khuôn mẫu cũ.
  - Dễ nhận ra khi một kiểu bảo vệ quen thuộc không còn thật sự nuôi dưỡng sự sống bên trong.
- Challenges:
  - Có thể phản ứng bằng cách rút xa đột ngột khi cảm thấy nhu cầu tự do cảm xúc bị đe dọa.
  - Dễ phá vỡ mô thức thân thuộc trước khi kịp tạo một nền an toàn mới.
- DevelopmentAdvice:
  - Đổi mới trong quan hệ thân thiết bằng các thỏa thuận rõ, không chỉ bằng khoảng cách hoặc im lặng.
  - Tập xây cảm giác an toàn từ khả năng thích nghi, đồng thời tôn trọng nhu cầu gắn bó lành mạnh.

## Leo

- Rule ID: `WESTERN-URANUS-LEO-V1`
- Title: Sao Thiên Vương Sư Tử
- Summary: Uranus Sư Tử thường biểu hiện qua cách làm mới sáng tạo, lãnh đạo, biểu đạt cá nhân và quyền được tỏa sáng khác khuôn mẫu. Ở cấp cá nhân, rule này chỉ mô tả phong cách giải phóng năng lượng sáng tạo trong cung Sư Tử; mức độ nổi bật cần đọc cùng toàn lá số.
- Strengths:
  - Có khả năng khơi dậy hình thức sáng tạo, trình diễn hoặc dẫn dắt có dấu ấn riêng.
  - Dễ truyền cảm hứng cho người khác dám thể hiện điều độc đáo mà vẫn có sức sống thật.
- Challenges:
  - Có thể nhầm khác biệt với việc luôn phải gây ấn tượng hoặc đứng ngoài quy tắc chung.
  - Dễ phản ứng mạnh khi cảm thấy bản sắc sáng tạo bị kiểm soát, kể cả lúc phản hồi có ích.
- DevelopmentAdvice:
  - Rèn tự do sáng tạo thành thực hành đều đặn, để sự độc đáo có hình dạng và chất lượng.
  - Tập chia sẻ không gian tỏa sáng, vì đổi mới bền hơn khi nó mở đường cho nhiều người cùng sáng tạo.

## Virgo

- Rule ID: `WESTERN-URANUS-VIRGO-V1`
- Title: Sao Thiên Vương Xử Nữ
- Summary: Uranus Xử Nữ thường đưa đổi mới vào phương pháp, kỹ năng, lao động, quy trình và cách cải thiện đời sống hằng ngày. Khi đọc cá nhân, vị trí này cho thấy khuynh hướng cải tiến hệ thống nhỏ và thực tế, không phải kết luận về sức khỏe, bệnh lý hoặc năng suất của một người.
- Strengths:
  - Có khả năng phát hiện điểm lỗi trong hệ thống và nghĩ ra cách vận hành gọn, thông minh hơn.
  - Dễ biến tư duy cải tiến thành công cụ, quy trình hoặc kỹ năng phục vụ nhu cầu cụ thể.
- Challenges:
  - Có thể căng thẳng khi thực tế không thay đổi đủ nhanh so với hình dung về sự tối ưu.
  - Dễ phá cấu trúc cũ vì thấy nó kém hiệu quả, nhưng chưa dành đủ thời gian cho người dùng thích nghi.
- DevelopmentAdvice:
  - Kiểm chứng cải tiến bằng nhu cầu thật, không chỉ bằng cảm giác rằng một hệ thống nên hoàn hảo hơn.
  - Giữ nhịp thử nghiệm có tài liệu, phản hồi và khả năng bảo trì sau khi đổi mới.

## Libra

- Rule ID: `WESTERN-URANUS-LIBRA-V1`
- Title: Sao Thiên Vương Thiên Bình
- Summary: Uranus Thiên Bình thường biểu hiện qua việc làm mới quan hệ, thỏa thuận, công bằng, thẩm mỹ và cách nhiều phía cùng tồn tại. Trong lá số cá nhân, vị trí này cần được đọc như nhu cầu tự do trong mô hình liên kết, không phải kết luận rằng quan hệ chắc chắn bất ổn.
- Strengths:
  - Có khả năng nhận ra mô hình hợp tác mới khi cách giữ hòa khí cũ không còn công bằng.
  - Dễ đưa tư duy khách quan, cởi mở và cải tiến vào đối thoại hoặc thiết kế quan hệ.
- Challenges:
  - Có thể rời khỏi thỏa thuận quá nhanh khi cảm thấy mất tự do, trước khi thử thương lượng rõ ràng.
  - Dễ dùng lý tưởng bình đẳng như lý do để né phần cảm xúc phức tạp của quan hệ thật.
- DevelopmentAdvice:
  - Đặt tự do và cam kết vào cùng một cuộc đối thoại, với điều khoản cụ thể thay vì kỳ vọng ngầm.
  - Cho phép bất đồng được nói ra sớm để đổi mới quan hệ không phải diễn ra bằng đứt gãy.

## Scorpio

- Rule ID: `WESTERN-URANUS-SCORPIO-V1`
- Title: Sao Thiên Vương Bọ Cạp
- Summary: Uranus Bọ Cạp thường đưa nguyên lý thức tỉnh vào chiều sâu cảm xúc, quyền riêng tư, kiểm soát, thân mật và những vùng kinh nghiệm khó nói. Khi đọc cá nhân, vị trí này mô tả cách năng lượng đổi mới chạm vào tầng sâu của niềm tin và ranh giới, không tự nó dự báo khủng hoảng hay biến cố.
- Strengths:
  - Có khả năng nhìn xuyên qua mô thức kiểm soát cũ và mở ra cách tiếp cận trung thực hơn với điều phức tạp.
  - Dễ thúc đẩy sự đổi mới trong nghiên cứu sâu, chữa lành biểu tượng hoặc các chủ đề cần can đảm đối diện.
- Challenges:
  - Có thể bị hút vào cường độ, khiến thay đổi chỉ có vẻ thật khi nó đủ mạnh hoặc đủ cực đoan.
  - Dễ phá vỡ niềm tin vì sợ bị ràng buộc, dù một số ranh giới thân mật cần được xây từ từ.
- DevelopmentAdvice:
  - Dùng sự sắc bén để nhận diện mô thức, nhưng tạo lối ra có cấu trúc thay vì chỉ lật tung vấn đề.
  - Tập chia sẻ quyền lực, thông tin và cảm xúc theo mức độ an toàn có thể kiểm chứng.

## Sagittarius

- Rule ID: `WESTERN-URANUS-SAGITTARIUS-V1`
- Title: Sao Thiên Vương Nhân Mã
- Summary: Uranus Nhân Mã thường biểu hiện qua việc làm mới niềm tin, triết lý sống, giáo dục, du hành và cách con người mở rộng thế giới quan. Ở cấp cá nhân, vị trí này nói về nơi lá số tiếp xúc với tự do tư tưởng, không phải kết luận rằng một người luôn chống lại mọi niềm tin có sẵn.
- Strengths:
  - Có khả năng đặt câu hỏi lớn với hệ quan điểm cũ và mở đường cho cách học rộng hơn.
  - Dễ kết nối tinh thần khám phá với những ý tưởng tiến bộ, liên văn hóa hoặc vượt khỏi biên giới quen thuộc.
- Challenges:
  - Có thể biến tự do tư tưởng thành phản ứng chống giáo điều nhưng lại bám vào một giáo điều mới.
  - Dễ bỏ qua chi tiết thực tế vì muốn đi thẳng tới tầm nhìn lớn hoặc trải nghiệm mới.
- DevelopmentAdvice:
  - Kiểm chứng niềm tin bằng trải nghiệm, dữ kiện và khả năng sống nhất quán với điều mình cổ vũ.
  - Giữ sự mở rộng đi cùng trách nhiệm truyền đạt, để ý tưởng mới không trở thành khẩu hiệu thiếu nền.

## Capricorn

- Rule ID: `WESTERN-URANUS-CAPRICORN-V1`
- Title: Sao Thiên Vương Ma Kết
- Summary: Uranus Ma Kết thường đưa đổi mới vào cấu trúc, tổ chức, trách nhiệm, quyền lực chính thức và mô hình thành tựu. Khi đọc cá nhân, vị trí này gợi ý cách một người hoặc thế hệ đối diện nhu cầu cải cách hệ thống, nhưng không phải lời dự báo về địa vị, nghề nghiệp hay sự sụp đổ của cấu trúc.
- Strengths:
  - Có khả năng nhìn ra điểm cần cải tổ trong hệ thống cứng nhắc mà vẫn hiểu tầm quan trọng của cấu trúc.
  - Dễ biến ý tưởng mới thành mô hình vận hành, quy trình hoặc tiêu chuẩn có thể áp dụng.
- Challenges:
  - Có thể dao động giữa chống lại quyền lực và muốn kiểm soát thay đổi theo cách rất chặt.
  - Dễ phá một cấu trúc cũ trước khi thiết kế đủ phần chịu lực cho cấu trúc mới.
- DevelopmentAdvice:
  - Cải cách từng lớp: xác định điều cần giữ, điều cần bỏ và điều cần thử trong điều kiện có trách nhiệm.
  - Tập làm việc với hệ thống mà không đánh mất tư duy độc lập hoặc biến độc lập thành chống đối tự động.

## Aquarius

- Rule ID: `WESTERN-URANUS-AQUARIUS-V1`
- Title: Sao Thiên Vương Bảo Bình
- Summary: Uranus Bảo Bình thường biểu hiện rất rõ qua cộng đồng, công nghệ, tư duy hệ thống, lý tưởng tiến bộ và quyền được khác biệt. Dù nhiều trường phái hiện đại liên hệ Uranus với Aquarius, rule này vẫn không dùng vị trí này để kết luận mạnh-yếu tuyệt đối; ý nghĩa cá nhân cần đọc cùng toàn lá số.
- Strengths:
  - Có khả năng nhìn thấy mô hình xã hội, nhóm hoặc mạng lưới có thể vận hành theo cách tự do và thông minh hơn.
  - Dễ khơi dậy đổi mới bằng tư duy khách quan, tinh thần thử nghiệm và sự tôn trọng khác biệt.
- Challenges:
  - Có thể đặt ý tưởng hệ thống lên trước nhu cầu cụ thể của từng con người.
  - Dễ đồng nhất sự tiến bộ với việc luôn phải khác số đông, kể cả khi điều cần nhất là kết nối thực tế.
- DevelopmentAdvice:
  - Gắn lý tưởng cải tiến với trải nghiệm người dùng, phản hồi cộng đồng và trách nhiệm triển khai.
  - Giữ sự độc lập trí tuệ đi cùng khả năng lắng nghe, điều chỉnh và giải thích minh bạch.

## Pisces

- Rule ID: `WESTERN-URANUS-PISCES-V1`
- Title: Sao Thiên Vương Song Ngư
- Summary: Uranus Song Ngư thường đưa đổi mới vào tưởng tượng, lòng trắc ẩn, biểu tượng, tinh thần tập thể và những vùng ranh giới khó nắm bắt. Khi đọc cá nhân, vị trí này cho thấy cách trực giác hoặc cảm hứng có thể phá khuôn cũ, nhưng không nên biến thành kết luận về tâm linh, mơ hồ hoặc khả năng đặc biệt.
- Strengths:
  - Có khả năng mở ra hình thức sáng tạo, hỗ trợ hoặc cảm nhận tập thể vượt khỏi lối diễn đạt quen thuộc.
  - Dễ nhận ra khi một lý tưởng mềm cần hình thức mới để bao dung hơn và ít đóng khung hơn.
- Challenges:
  - Có thể để cảm hứng đổi mới trôi quá rộng, khiến ranh giới và bước thực hiện trở nên mờ.
  - Dễ nhầm sự tự do nội tâm với việc không cần kiểm chứng thực tế hoặc cam kết rõ.
- DevelopmentAdvice:
  - Chuyển trực giác đổi mới thành hành động nhỏ, có ranh giới, có thời điểm kiểm tra và có người phản hồi.
  - Giữ lòng mở với điều khác thường, đồng thời tôn trọng dữ kiện, giới hạn năng lượng và thực tế chung.

## Điều kiện READY cho tích hợp

Ruleset này đủ điều kiện chuyển `WA-P1-003` sang `READY` để tích hợp production với các ràng buộc:

- Bổ sung Uranus vào data module nhóm "social planets" theo cùng schema đang dùng cho Jupiter và Saturn.
- Adapter đọc `WesternAstrologyResult`, tìm Uranus theo `name`, không phụ thuộc thứ tự mảng và không tự tính lại vị trí hành tinh.
- Thêm tests cho 12 rules, unique ruleId, evidence, deterministic, non-mutating và lỗi khi thiếu Uranus.
- UI nhóm "Hành tinh xã hội" có thể render Jupiter, Saturn và Uranus, nhưng không hiển thị placeholder cho Neptune/Pluto khi chưa có ruleset.
- Chạy `npm test`, `npm run lint`, `npm run build` và browser smoke desktop/mobile trong task tích hợp production, không phải trong task khóa ruleset nội dung này.
