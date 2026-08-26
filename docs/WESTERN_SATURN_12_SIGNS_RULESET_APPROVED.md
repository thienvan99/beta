# APPROVED

# Western Saturn 12 Signs Ruleset Approved

Mã nhiệm vụ: `WA-P1-002`<br>
Ngày duyệt ruleset: 2026-08-03<br>
Trạng thái: `APPROVED - READY FOR IMPLEMENTATION`<br>
Ruleset ID: `western-saturn-sign-v1`<br>
Version: `1.0.0`<br>
Rule ID convention: `WESTERN-SATURN-<SIGN>-V1`

Tài liệu này là bản ruleset Sao Thổ trong 12 cung đã đủ điều kiện triển khai vào interpretation engine. Nội dung chỉ được dùng cho **Saturn trong cung Hoàng đạo Tropical** và phải lấy vị trí Saturn từ `WesternAstrologyResult.bodies`; không tự tính lại, không suy diễn nhà, góc chiếu, transit hoặc tổng hợp toàn lá số.

## Kết quả rà soát

- Ruleset có đủ 12 cung, mỗi cung có title, summary, strengths, challenges, developmentAdvice và ghi chú phạm vi.
- Tone phù hợp nguyên tắc diễn giải của Thiên Vận: không dọa sợ, không phán tuyệt đối, không biến Saturn thành kết luận định mệnh về thất bại, trì hoãn hoặc mất mát.
- Nội dung tập trung đúng biểu tượng Saturn: cấu trúc, giới hạn, trách nhiệm, kỷ luật, tiêu chuẩn, năng lực chịu đựng thực tế và quá trình trưởng thành theo thời gian.
- Mỗi cung thể hiện Saturn qua cách một người thường xây dựng kiểm soát, học trách nhiệm, gặp bài học về ranh giới và phát triển năng lực bền vững.
- Không phát hiện mâu thuẫn trực tiếp với calculation architecture: ruleset chỉ cần `body = Saturn` và `sign` đã có sẵn trong typed result.

## Giới hạn bắt buộc khi triển khai

- Không dùng rule này để kết luận toàn bộ tính cách hoặc giá trị của một người.
- Không dùng rule này để dự đoán tai họa, bệnh lý, nghèo khó, cô độc, đổ vỡ, thất bại hoặc thành công chắc chắn.
- Không trộn Saturn với Jupiter trong mở rộng/cơ hội, Mercury trong giao tiếp, Venus trong tình cảm, Mars trong hành động, Uranus trong cải cách, Neptune trong tâm linh mơ hồ hoặc Pluto trong biến cố/quyền lực.
- Không mở rộng sang Saturn trong nhà, góc chiếu, transit, chu kỳ Saturn Return hoặc tổng hợp toàn lá số nếu chưa có ruleset riêng.
- Evidence tối thiểu của mỗi rule: `body: "Saturn"` và `sign`.
- Evidence hiển thị trong UI khi tích hợp cần gom thêm longitude, degree, minute, rule ID và version từ kết quả calculation.

## Schema triển khai đề xuất

```ts
{
  ruleId: "WESTERN-SATURN-ARIES-V1";
  version: "1.0.0";
  title: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  developmentAdvice: string[];
  evidence: {
    body: "Saturn";
    sign: ZodiacSign;
  };
}
```

## Aries

- Rule ID: `WESTERN-SATURN-ARIES-V1`
- Title: Sao Thổ Bạch Dương
- Summary: Saturn Bạch Dương thường học về trách nhiệm qua cách khởi đầu, tự khẳng định và sử dụng ý chí cá nhân. Bạn có xu hướng trưởng thành khi hành động không chỉ đến từ phản xạ nhanh, mà được đặt trong kỷ luật, tiêu chuẩn rõ và khả năng chịu trách nhiệm với bước đi đầu tiên.
- Strengths:
  - Có khả năng rèn sự can đảm thành năng lực hành động bền, nhất là khi mục tiêu đòi hỏi tự chủ.
  - Thường phát triển bản lĩnh qua việc tự kiểm chứng giới hạn thay vì chỉ chờ sự cho phép từ bên ngoài.
- Challenges:
  - Có thể do dự khi cần bắt đầu vì sợ sai, hoặc ngược lại cố tỏ ra mạnh để che cảm giác chưa chắc chắn.
  - Dễ xem việc phải chậm lại như một thất bại cá nhân, dù đó có thể là cách Saturn giúp hành động chắc hơn.
- DevelopmentAdvice:
  - Tập chia nhỏ quyết định thành bước thử có trách nhiệm, để sự chủ động được rèn bằng kinh nghiệm thật.
  - Phân biệt sức mạnh cá nhân với nhu cầu phải thắng ngay trong mọi tình huống.

## Taurus

- Rule ID: `WESTERN-SATURN-TAURUS-V1`
- Title: Sao Thổ Kim Ngưu
- Summary: Saturn Kim Ngưu thường học về trách nhiệm qua giá trị, nguồn lực, sự ổn định và khả năng xây dựng điều bền vững. Bạn có xu hướng trưởng thành khi biết dùng thời gian, kỹ năng và sự kiên trì để tạo nền tảng thật, thay vì chỉ tìm cảm giác an toàn từ điều quen thuộc.
- Strengths:
  - Có khả năng duy trì cam kết dài hạn và biến tiêu chuẩn thực tế thành kết quả có thể tin cậy.
  - Thường biết tôn trọng nhịp độ tự nhiên của sự phát triển, nhất là trong việc tích lũy kỹ năng hoặc nguồn lực.
- Challenges:
  - Có thể bám quá chặt vào an toàn, khiến thay đổi cần thiết trở nên khó tiếp nhận.
  - Dễ đánh giá bản thân qua mức độ ổn định vật chất hoặc năng suất hữu hình nhiều hơn mức cần thiết.
- DevelopmentAdvice:
  - Xây dựng cảm giác an toàn từ năng lực thích nghi, không chỉ từ việc giữ nguyên hoàn cảnh.
  - Kiểm tra định kỳ xem điều đang được bảo vệ là giá trị cốt lõi hay chỉ là nỗi sợ mất kiểm soát.

## Gemini

- Rule ID: `WESTERN-SATURN-GEMINI-V1`
- Title: Sao Thổ Song Tử
- Summary: Saturn Song Tử thường học về trách nhiệm qua tư duy, ngôn ngữ, học tập và cách xử lý thông tin. Bạn có xu hướng trưởng thành khi sự tò mò được đặt vào cấu trúc rõ, giúp lời nói, kiến thức và quan điểm trở nên chính xác, có trách nhiệm và có thể kiểm chứng.
- Strengths:
  - Có khả năng xây dựng tư duy mạch lạc, nhất là khi cần phân tích, viết, dạy hoặc giải thích điều phức tạp.
  - Thường phát triển sự đáng tin trong giao tiếp nhờ biết cân nhắc dữ kiện và hệ quả của lời nói.
- Challenges:
  - Có thể tự kiểm duyệt quá mức vì sợ nói sai, hoặc giữ im lặng dù đang có điều cần đóng góp.
  - Dễ biến việc học thành áp lực phải biết đủ mọi thứ trước khi được quyền lên tiếng.
- DevelopmentAdvice:
  - Rèn thói quen diễn đạt từng bước: nói rõ điều đã biết, điều chưa chắc và điều cần kiểm chứng thêm.
  - Cho phép mình học qua đối thoại, thay vì chỉ chờ đến khi cảm thấy hoàn toàn sẵn sàng.

## Cancer

- Rule ID: `WESTERN-SATURN-CANCER-V1`
- Title: Sao Thổ Cự Giải
- Summary: Saturn Cự Giải thường học về trách nhiệm qua cảm xúc, ký ức, sự chăm sóc và cảm giác thuộc về. Bạn có xu hướng trưởng thành khi biết tạo an toàn nội tâm, đặt ranh giới trong việc nâng đỡ người khác và không để quá khứ quyết định toàn bộ cách mình bảo vệ bản thân.
- Strengths:
  - Có khả năng xây dựng sự tin cậy qua lòng trung thành, sự chu đáo và trách nhiệm với những mối liên hệ thân thiết.
  - Thường phát triển chiều sâu cảm xúc khi học cách chăm sóc mà vẫn giữ được nền tảng riêng.
- Challenges:
  - Có thể thu mình khi cảm thấy không an toàn, khiến nhu cầu thật khó được người khác hiểu.
  - Dễ gánh trách nhiệm cảm xúc quá nhiều, nhất là với gia đình hoặc những người mình xem là thân thuộc.
- DevelopmentAdvice:
  - Tập gọi tên nhu cầu cảm xúc một cách cụ thể, thay vì chỉ chịu đựng hoặc chờ người khác tự nhận ra.
  - Xây ranh giới chăm sóc rõ ràng để sự gắn bó không trở thành nghĩa vụ âm thầm.

## Leo

- Rule ID: `WESTERN-SATURN-LEO-V1`
- Title: Sao Thổ Sư Tử
- Summary: Saturn Sư Tử thường học về trách nhiệm qua sáng tạo, lòng tự tin và quyền được thể hiện dấu ấn riêng. Bạn có xu hướng trưởng thành khi sự tỏa sáng không chỉ là khoảnh khắc được công nhận, mà trở thành một năng lực được rèn bằng kỷ luật, trung thực và sự tôn trọng giá trị sáng tạo của mình.
- Strengths:
  - Có khả năng biến tài năng hoặc cảm hứng cá nhân thành sản phẩm, vai trò hoặc đóng góp có cấu trúc.
  - Thường phát triển phong thái lãnh đạo chín chắn khi biết nâng đỡ người khác cùng thể hiện năng lực.
- Challenges:
  - Có thể ngại bộc lộ bản thân vì sợ bị đánh giá, hoặc đặt tiêu chuẩn quá cao cho mọi lần xuất hiện.
  - Dễ nhầm sự công nhận bên ngoài với quyền được sáng tạo và vui sống từ bên trong.
- DevelopmentAdvice:
  - Duy trì thực hành sáng tạo đều đặn, kể cả khi kết quả chưa được chú ý hoặc chưa hoàn hảo.
  - Học cách nhận phản hồi như chất liệu rèn nghề, không phải bản án về giá trị cá nhân.

## Virgo

- Rule ID: `WESTERN-SATURN-VIRGO-V1`
- Title: Sao Thổ Xử Nữ
- Summary: Saturn Xử Nữ thường học về trách nhiệm qua kỹ năng, quy trình, sức làm việc và khả năng cải thiện từng chi tiết. Bạn có xu hướng trưởng thành khi tiêu chuẩn cao được dùng để phục vụ điều hữu ích, thay vì trở thành áp lực phải kiểm soát mọi sai sót trước khi bắt đầu.
- Strengths:
  - Có khả năng xây dựng chuyên môn chắc bằng quan sát kỹ, thực hành đều và tinh thần sửa lỗi nghiêm túc.
  - Thường đáng tin trong những việc cần quy trình, phân tích và khả năng làm cho hệ thống vận hành tốt hơn.
- Challenges:
  - Có thể phóng đại lỗi nhỏ và làm nhẹ thành quả đã đạt được.
  - Dễ mắc kẹt trong tối ưu hóa, khiến năng lượng bị hao vào việc chỉnh sửa hơn là hoàn tất.
- DevelopmentAdvice:
  - Đặt tiêu chuẩn theo từng giai đoạn, gồm cả ngưỡng đủ tốt để có thể bàn giao hoặc nghỉ ngơi.
  - Nhìn sự hữu ích như mục tiêu chính, còn sự hoàn hảo chỉ là một hướng tham khảo cần kiểm soát.

## Libra

- Rule ID: `WESTERN-SATURN-LIBRA-V1`
- Title: Sao Thổ Thiên Bình
- Summary: Saturn Thiên Bình thường học về trách nhiệm qua quan hệ, công bằng, thỏa thuận và khả năng cân bằng nhiều phía. Bạn có xu hướng trưởng thành khi biết xây dựng liên kết có cấu trúc, nơi sự hài hòa không chỉ là tránh xung đột mà còn là tôn trọng ranh giới, cam kết và sự thật của từng người.
- Strengths:
  - Có khả năng tạo quan hệ bền bằng sự công tâm, biết lắng nghe và tôn trọng trách nhiệm đôi bên.
  - Thường phát triển năng lực thương lượng khi biết đặt tiêu chuẩn rõ cho sự hợp tác.
- Challenges:
  - Có thể trì hoãn quyết định vì sợ làm mất cân bằng hoặc khiến ai đó thất vọng.
  - Dễ gánh phần trách nhiệm giữ hòa khí nhiều hơn mức cần thiết.
- DevelopmentAdvice:
  - Làm rõ điều không thể thương lượng trước khi tìm điểm chung.
  - Tập xem bất đồng có giới hạn là một phần lành mạnh của quan hệ trưởng thành.

## Scorpio

- Rule ID: `WESTERN-SATURN-SCORPIO-V1`
- Title: Sao Thổ Bọ Cạp
- Summary: Saturn Bọ Cạp thường học về trách nhiệm qua chiều sâu cảm xúc, niềm tin, quyền riêng tư và những vùng trải nghiệm khó nói. Bạn có xu hướng trưởng thành khi biết đối diện sự thật phức tạp một cách có cấu trúc, không né tránh cường độ nhưng cũng không để nhu cầu kiểm soát dẫn dắt mọi lựa chọn.
- Strengths:
  - Có khả năng chịu đựng và làm việc sâu với các vấn đề cần sự kín đáo, tập trung và kiên trì.
  - Thường phát triển sức mạnh nội tâm khi học cách đặt ranh giới cho sự thân mật, thông tin và quyền lực.
- Challenges:
  - Có thể giữ phòng thủ quá lâu, khiến việc tin tưởng hoặc chia sẻ trở nên khó khăn.
  - Dễ xem việc buông kiểm soát như mất an toàn, dù đôi khi đó là điều kiện để quan hệ hoặc nhận thức trưởng thành.
- DevelopmentAdvice:
  - Tập phân biệt trực giác cảnh báo với thói quen nghi ngờ phát sinh từ trải nghiệm cũ.
  - Xây dựng niềm tin theo từng mức độ rõ ràng, có quan sát và có quyền điều chỉnh.

## Sagittarius

- Rule ID: `WESTERN-SATURN-SAGITTARIUS-V1`
- Title: Sao Thổ Nhân Mã
- Summary: Saturn Nhân Mã thường học về trách nhiệm qua niềm tin, tri thức, đạo lý và tầm nhìn sống. Bạn có xu hướng trưởng thành khi lý tưởng được kiểm chứng bằng trải nghiệm, dữ kiện và cam kết học đến nơi, để tự do không tách khỏi trách nhiệm với điều mình tin và truyền đạt.
- Strengths:
  - Có khả năng biến thế giới quan rộng thành nguyên tắc sống, chương trình học hoặc định hướng có nền tảng.
  - Thường đáng tin khi biết kết hợp sự thẳng thắn với tinh thần kiểm chứng và tôn trọng khác biệt.
- Challenges:
  - Có thể nghi ngờ niềm tin của mình quá mức, hoặc bám vào một hệ quan điểm để tránh sự bất định.
  - Dễ thấy chi tiết thực tế như điều làm nhỏ tầm nhìn, trong khi chúng có thể giúp lý tưởng đứng vững.
- DevelopmentAdvice:
  - Kiểm tra niềm tin bằng hành động cụ thể, phản hồi và khả năng sống nhất quán với điều đã nói.
  - Giữ tinh thần học hỏi ngay cả khi đã có hệ quan điểm rõ ràng.

## Capricorn

- Rule ID: `WESTERN-SATURN-CAPRICORN-V1`
- Title: Sao Thổ Ma Kết
- Summary: Saturn Ma Kết thường biểu hiện mạnh qua trách nhiệm, cấu trúc, mục tiêu dài hạn và năng lực xây dựng thành quả theo thời gian. Bạn có xu hướng trưởng thành khi biết dùng kỷ luật để tạo nền tảng bền, đồng thời không để tiêu chuẩn, vai trò hoặc áp lực thành tựu thay thế toàn bộ đời sống nội tâm.
- Strengths:
  - Có khả năng tổ chức, chịu trách nhiệm và đi đường dài trong những mục tiêu cần sự kiên định.
  - Thường phát triển uy tín qua hành động nhất quán, tiêu chuẩn rõ và khả năng giữ cam kết.
- Challenges:
  - Có thể đồng nhất giá trị bản thân với hiệu suất, vị trí hoặc việc luôn phải kiểm soát tình hình.
  - Dễ xem nghỉ ngơi, thử nghiệm hoặc nhờ hỗ trợ là dấu hiệu thiếu năng lực.
- DevelopmentAdvice:
  - Xây kế hoạch dài hạn có cả nhịp phục hồi, học hỏi và điều chỉnh khi điều kiện thay đổi.
  - Định nghĩa thành tựu theo giá trị thật sự muốn xây, không chỉ theo áp lực phải chứng minh.

## Aquarius

- Rule ID: `WESTERN-SATURN-AQUARIUS-V1`
- Title: Sao Thổ Bảo Bình
- Summary: Saturn Bảo Bình thường học về trách nhiệm qua cộng đồng, hệ thống, tư duy cải tiến và quyền được khác biệt. Bạn có xu hướng trưởng thành khi lý tưởng tiến bộ được đặt vào cấu trúc có thể vận hành, giúp tự do cá nhân đi cùng trách nhiệm với nhóm, mạng lưới hoặc nguyên tắc chung.
- Strengths:
  - Có khả năng xây dựng mô hình, quy tắc hoặc cộng đồng dựa trên tư duy khách quan và tầm nhìn dài hạn.
  - Thường phát triển sự độc lập trí tuệ khi biết bảo vệ quan điểm mà vẫn kiểm chứng bằng thực tế.
- Challenges:
  - Có thể cảm thấy xa cách khi không tìm được nhóm cùng tiêu chuẩn hoặc cùng cách nhìn.
  - Dễ đặt lý tưởng hệ thống lên trước nhu cầu cụ thể của từng con người.
- DevelopmentAdvice:
  - Biến ý tưởng cải tiến thành thử nghiệm có cấu trúc, có phản hồi và có trách nhiệm triển khai.
  - Giữ sự khác biệt như một năng lực đóng góp, không phải lý do để tự tách mình khỏi kết nối.

## Pisces

- Rule ID: `WESTERN-SATURN-PISCES-V1`
- Title: Sao Thổ Song Ngư
- Summary: Saturn Song Ngư thường học về trách nhiệm qua lòng trắc ẩn, trực giác, ranh giới tinh tế và khả năng đặt hình dạng cho điều khó nắm bắt. Bạn có xu hướng trưởng thành khi cảm xúc, tưởng tượng hoặc niềm tin mềm được nâng đỡ bằng thói quen, giới hạn và cách chăm sóc năng lượng rõ ràng.
- Strengths:
  - Có khả năng biến trực giác, nghệ thuật hoặc tinh thần hỗ trợ thành thực hành có ích và có trách nhiệm.
  - Thường phát triển sự bao dung chín chắn khi biết cảm thông mà không đánh mất ranh giới cá nhân.
- Challenges:
  - Có thể thấy khó đặt giới hạn vì sợ làm người khác tổn thương hoặc sợ mất sự kết nối.
  - Dễ trì hoãn việc gọi tên thực tế khi cảm xúc, lý tưởng hoặc sự mơ hồ đang chiếm nhiều không gian.
- DevelopmentAdvice:
  - Tạo cấu trúc nhẹ cho đời sống cảm xúc: thời gian nghỉ, ranh giới hỗ trợ và cách kiểm chứng điều mình cảm nhận.
  - Chuyển lòng trắc ẩn thành hành động nhỏ, rõ và có giới hạn để tránh ôm quá nhiều trách nhiệm.

## Điều kiện READY cho tích hợp

Ruleset này đủ điều kiện chuyển `WA-P1-002` sang `READY` để tích hợp production với các ràng buộc:

- Bổ sung Saturn vào data module nhóm "social planets" theo cùng schema đang dùng cho Jupiter.
- Adapter đọc `WesternAstrologyResult`, tìm Saturn theo `name`, không phụ thuộc thứ tự mảng và không tự tính lại vị trí.
- Thêm tests cho 12 rules, unique ruleId, evidence, deterministic, non-mutating và lỗi khi thiếu Saturn.
- UI nhóm "Hành tinh xã hội" có thể render Jupiter và Saturn, nhưng không hiển thị placeholder cho Uranus/Neptune/Pluto khi chưa có ruleset.
- Chạy `npm test`, `npm run lint`, `npm run build` và browser smoke desktop/mobile trong task tích hợp production, không phải trong task khóa ruleset nội dung này.
