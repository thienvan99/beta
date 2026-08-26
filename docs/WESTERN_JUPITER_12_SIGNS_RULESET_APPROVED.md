# APPROVED

# Western Jupiter 12 Signs Ruleset Approved

Mã nhiệm vụ: `WA-P1-001`<br>
Ngày duyệt ruleset: 2026-08-03<br>
Trạng thái: `APPROVED - READY FOR IMPLEMENTATION`<br>
Ruleset ID: `western-jupiter-sign-v1`<br>
Version: `1.0.0`<br>
Rule ID convention: `WESTERN-JUPITER-<SIGN>-V1`

Tài liệu này là bản ruleset Sao Mộc trong 12 cung đã đủ điều kiện triển khai vào interpretation engine. Nội dung chỉ được dùng cho **Jupiter trong cung Hoàng đạo Tropical** và phải lấy vị trí Jupiter từ `WesternAstrologyResult.bodies`; không tự tính lại, không suy diễn nhà, góc chiếu hoặc tổng hợp toàn lá số.

## Kết quả rà soát

- Draft có đủ 12 cung, mỗi cung có title, summary, strengths, challenges, developmentAdvice và ghi chú phạm vi.
- Tone phù hợp nguyên tắc diễn giải của Thiên Vận: không dọa sợ, không phán tuyệt đối, không hứa hẹn may mắn/chức vụ/tài sản/thành công chắc chắn.
- Nội dung tập trung đúng biểu tượng Jupiter: mở rộng nhận thức, niềm tin, hệ giá trị, ý nghĩa, cơ hội, học hỏi và nguy cơ phóng đại.
- Không phát hiện mâu thuẫn trực tiếp với calculation architecture: ruleset chỉ cần `body = Jupiter` và `sign` đã có sẵn trong typed result.
- Điểm cần sửa trước triển khai đã được khóa tại bản approved: rule ID đổi từ `WA-JUPITER-SIGN-<SIGN>-V1` sang `WESTERN-JUPITER-<SIGN>-V1` để đồng nhất với Sun/Moon/ASC/Mercury/Venus/Mars hiện có.

## Giới hạn bắt buộc khi triển khai

- Không dùng rule này để kết luận toàn bộ tính cách.
- Không dùng rule này để dự đoán tài chính, hôn nhân, địa vị, du học, di cư, bệnh lý hoặc biến cố chắc chắn.
- Không trộn Jupiter với Mercury trong giao tiếp, Venus trong tình cảm, Mars trong hành động, Uranus trong cải cách, Neptune trong tâm linh mơ hồ hoặc Pluto trong biến cố/quyền lực.
- Không mở rộng sang Jupiter trong nhà hoặc góc chiếu nếu chưa có ruleset riêng.
- Evidence tối thiểu của mỗi rule: `body: "Jupiter"` và `sign`.
- Evidence hiển thị trong UI khi tích hợp cần gom thêm longitude, degree, minute, rule ID và version từ kết quả calculation.

## Schema triển khai đề xuất

```ts
{
  ruleId: "WESTERN-JUPITER-ARIES-V1";
  version: "1.0.0";
  title: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  developmentAdvice: string[];
  evidence: {
    body: "Jupiter";
    sign: ZodiacSign;
  };
}
```

## Aries

- Rule ID: `WESTERN-JUPITER-ARIES-V1`
- Title: Sao Mộc Bạch Dương
- Summary: Jupiter Bạch Dương có xu hướng mở rộng cuộc sống qua sự chủ động, thử nghiệm trực tiếp và niềm tin rằng cơ hội cần được khởi động bằng hành động. Bạn thường học tốt khi được bắt đầu trước, rút kinh nghiệm nhanh và tự kiểm chứng khả năng của mình.
- Strengths:
  - Dễ nhận ra cơ hội trong những tình huống mới hoặc chưa có lối đi rõ.
  - Có tinh thần khích lệ người khác dám thử, dám bắt đầu và dám chịu trách nhiệm với lựa chọn.
- Challenges:
  - Có thể phóng đại sự tự tin ban đầu và đánh giá thấp thời gian cần để duy trì kết quả.
  - Dễ xem sự chậm lại như dấu hiệu mất cơ hội, dù đôi khi đó là bước cần thiết để nhìn toàn cảnh.
- DevelopmentAdvice:
  - Gắn mỗi ý tưởng lớn với một tiêu chí kiểm chứng cụ thể trước khi mở rộng.
  - Tập phân biệt lòng can đảm với phản ứng vội khi cảm thấy bị thách thức.

## Taurus

- Rule ID: `WESTERN-JUPITER-TAURUS-V1`
- Title: Sao Mộc Kim Ngưu
- Summary: Jupiter Kim Ngưu thường mở rộng qua sự bền bỉ, giá trị thực tế và khả năng nuôi lớn điều có nền tảng. Niềm tin có xu hướng trở nên mạnh hơn khi bạn thấy một lựa chọn đem lại chất lượng sống, sự ổn định và kết quả có thể cảm nhận được.
- Strengths:
  - Có khả năng phát triển cơ hội bằng nhịp đều, nguồn lực rõ và gu đánh giá giá trị khá chắc.
  - Thường biết biến tri thức hoặc niềm tin thành thói quen, kỹ năng và kết quả thực tế.
- Challenges:
  - Có thể bám quá lâu vào một hệ giá trị quen thuộc, kể cả khi hoàn cảnh đã cần đổi mới.
  - Dễ phóng đại nhu cầu an toàn và bỏ lỡ trải nghiệm có ích vì chưa thấy ngay lợi ích cụ thể.
- DevelopmentAdvice:
  - Cho phép thử nghiệm nhỏ trước khi quyết định rằng một hướng đi thiếu an toàn.
  - Đặt câu hỏi định kỳ về điều gì thật sự còn giá trị, điều gì chỉ còn là thói quen.

## Gemini

- Rule ID: `WESTERN-JUPITER-GEMINI-V1`
- Title: Sao Mộc Song Tử
- Summary: Jupiter Song Tử có xu hướng mở rộng qua học hỏi, trao đổi và việc kết nối nhiều luồng thông tin. Bạn thường tìm thấy ý nghĩa khi được đặt câu hỏi, so sánh góc nhìn và biến sự tò mò thành hiểu biết linh hoạt.
- Strengths:
  - Dễ nhìn thấy cơ hội trong mạng lưới ý tưởng, con người, ngôn ngữ và thông tin.
  - Có khả năng truyền cảm hứng bằng sự dí dỏm, khả năng giải thích và tinh thần học suốt đời.
- Challenges:
  - Có thể phóng đại số lượng lựa chọn, khiến hướng đi trở nên phân tán.
  - Dễ nhầm cảm giác biết nhiều với việc đã hiểu đủ sâu để cam kết.
- DevelopmentAdvice:
  - Chọn một vài câu hỏi chủ đạo để dẫn dắt việc học thay vì gom mọi chủ đề cùng lúc.
  - Sau mỗi giai đoạn khám phá, tạo một bản tổng hợp hoặc hành động cụ thể để kết tinh hiểu biết.

## Cancer

- Rule ID: `WESTERN-JUPITER-CANCER-V1`
- Title: Sao Mộc Cự Giải
- Summary: Jupiter Cự Giải thường mở rộng qua cảm giác thuộc về, ký ức, sự chăm sóc và khả năng tạo không gian an toàn. Niềm tin có thể được nuôi lớn khi bạn thấy mình đang bảo vệ, nâng đỡ hoặc làm sâu sắc một mối liên hệ có ý nghĩa.
- Strengths:
  - Dễ phát triển cơ hội qua sự quan tâm tinh tế, lòng trung thành và khả năng xây dựng niềm tin.
  - Có thể truyền cảm hứng bằng sự ấm áp, khả năng lắng nghe và cảm giác gia đình hoặc cộng đồng.
- Challenges:
  - Có thể phóng đại nhu cầu được bảo vệ và ngần ngại rời khỏi vùng quen thuộc.
  - Dễ để ký ức hoặc cảm xúc cũ định nghĩa quá nhiều về cơ hội hiện tại.
- DevelopmentAdvice:
  - Mở rộng từng bước bằng cách mang cảm giác an toàn theo mình, thay vì chỉ tìm nó ở môi trường quen thuộc.
  - Kiểm tra xem lòng trung thành đang nuôi dưỡng sự phát triển hay đang giữ bạn lại trong mô thức cũ.

## Leo

- Rule ID: `WESTERN-JUPITER-LEO-V1`
- Title: Sao Mộc Sư Tử
- Summary: Jupiter Sư Tử có xu hướng mở rộng qua sáng tạo, lòng tự tin và niềm tin vào giá trị của sự biểu đạt chân thành. Bạn thường phát triển tốt khi một cơ hội cho phép mình đóng góp bằng dấu ấn riêng và khơi dậy tinh thần nơi người khác.
- Strengths:
  - Dễ truyền cảm hứng bằng sự hào phóng, tinh thần sáng tạo và khả năng tạo không khí tin tưởng.
  - Có khả năng nhìn cơ hội trong việc dẫn dắt, biểu diễn, dạy dỗ hoặc khích lệ người khác tỏa sáng.
- Challenges:
  - Có thể phóng đại nhu cầu được ghi nhận và nhầm sự chú ý với ý nghĩa thật.
  - Dễ đặt quá nhiều niềm tin vào một màn thể hiện lớn mà thiếu bước duy trì sau đó.
- DevelopmentAdvice:
  - Nuôi dưỡng sáng tạo như một quá trình đều đặn, không chỉ là khoảnh khắc được tán thưởng.
  - Chia sẻ sân khấu để cơ hội phát triển thành sự cộng hưởng thay vì chỉ xoay quanh hình ảnh cá nhân.

## Virgo

- Rule ID: `WESTERN-JUPITER-VIRGO-V1`
- Title: Sao Mộc Xử Nữ
- Summary: Jupiter Xử Nữ thường mở rộng qua kỹ năng, sự cải thiện và khả năng làm cho điều lớn trở nên hữu ích trong thực tế. Niềm tin có xu hướng tăng lên khi bạn thấy một phương pháp rõ ràng, có thể kiểm tra và phục vụ được nhu cầu cụ thể.
- Strengths:
  - Có khả năng phát triển cơ hội qua chi tiết, quy trình và tinh thần học bằng thực hành.
  - Dễ truyền cảm hứng bằng năng lực hỗ trợ, sự khiêm tốn và khả năng biến kiến thức thành việc làm được.
- Challenges:
  - Có thể phóng đại phần chưa hoàn chỉnh và làm nhỏ lại tầm nhìn vốn cần được thử.
  - Dễ mắc kẹt trong sửa lỗi, khiến cơ hội phát triển chậm hơn mức cần thiết.
- DevelopmentAdvice:
  - Đặt chuẩn đủ tốt cho từng giai đoạn thay vì chờ mọi thứ hoàn hảo.
  - Nhìn việc cải thiện như cách mở rộng, nhưng vẫn dành chỗ cho trực giác và thử nghiệm.

## Libra

- Rule ID: `WESTERN-JUPITER-LIBRA-V1`
- Title: Sao Mộc Thiên Bình
- Summary: Jupiter Thiên Bình có xu hướng mở rộng qua đối thoại, công bằng, thẩm mỹ và khả năng tìm ý nghĩa trong quan hệ. Cơ hội thường được nhìn thấy khi bạn kết nối nhiều phía, tạo sự hài hòa và học cách cân bằng giữa niềm tin cá nhân với nhu cầu hợp tác.
- Strengths:
  - Dễ phát triển cơ hội qua liên minh, cố vấn, cộng tác và môi trường có trao đổi văn minh.
  - Có khả năng truyền cảm hứng bằng tinh thần công bằng, gu thẩm mỹ và cách nhìn nhiều chiều.
- Challenges:
  - Có thể phóng đại nhu cầu đồng thuận và trì hoãn lựa chọn khi các phía chưa cùng hài lòng.
  - Dễ nhầm hòa khí bên ngoài với sự cân bằng thật sự của giá trị bên trong.
- DevelopmentAdvice:
  - Xác định rõ niềm tin cốt lõi trước khi thương lượng hoặc tìm điểm chung.
  - Cho phép bất đồng có cấu trúc trở thành một phần của quá trình mở rộng quan hệ.

## Scorpio

- Rule ID: `WESTERN-JUPITER-SCORPIO-V1`
- Title: Sao Mộc Bọ Cạp
- Summary: Jupiter Bọ Cạp thường mở rộng qua chiều sâu, sự thật khó nói và khả năng chuyển hóa sau trải nghiệm mạnh. Bạn có xu hướng tìm ý nghĩa bằng cách đi tới gốc rễ của vấn đề, hiểu động cơ ẩn và dùng khủng hoảng như chất liệu để trưởng thành.
- Strengths:
  - Có khả năng phát triển cơ hội trong nghiên cứu sâu, chữa lành biểu tượng hoặc các quá trình cần sự kiên cường.
  - Dễ truyền cảm hứng bằng sự chân thật, tập trung và lòng can đảm khi đối diện điều phức tạp.
- Challenges:
  - Có thể phóng đại cường độ cảm xúc hoặc nhu cầu kiểm soát để cảm thấy an toàn.
  - Dễ xem mọi chuyện như bài kiểm tra niềm tin, khiến trải nghiệm bình thường trở nên quá nặng.
- DevelopmentAdvice:
  - Dùng câu hỏi sâu để mở rộng nhận thức, nhưng giữ đủ khoảng cách để không bị cuốn vào nghi ngờ.
  - Tập chia sẻ quyền lực, thông tin và niềm tin theo từng mức độ có kiểm chứng.

## Sagittarius

- Rule ID: `WESTERN-JUPITER-SAGITTARIUS-V1`
- Title: Sao Mộc Nhân Mã
- Summary: Jupiter Nhân Mã thường biểu hiện mạnh qua nhu cầu khám phá, học hỏi, niềm tin và tầm nhìn rộng. Bạn có xu hướng mở rộng khi được đi xa hơn giới hạn quen thuộc, tiếp xúc với tri thức mới và kết nối trải nghiệm với một ý nghĩa lớn hơn.
- Strengths:
  - Dễ nhìn thấy cơ hội trong hành trình học tập, giảng dạy, du hành hoặc mở rộng thế giới quan.
  - Có khả năng truyền cảm hứng bằng sự lạc quan, thẳng thắn và niềm tin vào khả năng phát triển.
- Challenges:
  - Có thể phóng đại tầm nhìn lớn mà bỏ qua chi tiết thực tế cần kiểm chứng.
  - Dễ nhầm cảm giác tự do với việc không cần cam kết hoặc theo đến cùng.
- DevelopmentAdvice:
  - Gắn mỗi lý tưởng lớn với một hành động cụ thể và một trách nhiệm rõ.
  - Kiểm tra lại niềm tin bằng trải nghiệm thực tế, dữ kiện và phản hồi từ người khác.

## Capricorn

- Rule ID: `WESTERN-JUPITER-CAPRICORN-V1`
- Title: Sao Mộc Ma Kết
- Summary: Jupiter Ma Kết thường mở rộng qua cấu trúc, trách nhiệm và niềm tin vào thành quả được xây dựng theo thời gian. Bạn có xu hướng phát triển cơ hội khi mục tiêu lớn được đặt vào kế hoạch rõ ràng, có tiêu chuẩn và có khả năng chịu trách nhiệm.
- Strengths:
  - Có khả năng biến tầm nhìn thành hệ thống, chiến lược và các bước tiến bền.
  - Dễ truyền cảm hứng bằng sự đáng tin, năng lực tổ chức và tinh thần tôn trọng cam kết.
- Challenges:
  - Có thể phóng đại nghĩa vụ, khiến niềm tin vào khả năng mở rộng bị bó bởi áp lực thành tích.
  - Dễ xem cơ hội chỉ có giá trị khi nó chứng minh được hiệu quả ngay hoặc tạo vị thế rõ ràng.
- DevelopmentAdvice:
  - Để tầm nhìn dài hạn có cả khoảng thử nghiệm, học hỏi và nghỉ phục hồi.
  - Kiểm tra xem tiêu chuẩn đang giúp cơ hội trưởng thành hay đang làm nó khó thở.

## Aquarius

- Rule ID: `WESTERN-JUPITER-AQUARIUS-V1`
- Title: Sao Mộc Bảo Bình
- Summary: Jupiter Bảo Bình có xu hướng mở rộng qua tư duy hệ thống, cộng đồng, lý tưởng cải tiến và quyền được khác biệt. Bạn thường tìm thấy cơ hội khi một ý tưởng không chỉ phục vụ cá nhân mà còn mở ra cách vận hành mới cho nhóm hoặc mạng lưới rộng hơn.
- Strengths:
  - Dễ nhìn thấy hướng phát triển trong công nghệ, cộng đồng, mô hình mới hoặc các giá trị tiến bộ.
  - Có khả năng truyền cảm hứng bằng sự khách quan, tinh thần tự do và tầm nhìn vượt khỏi khuôn mẫu.
- Challenges:
  - Có thể phóng đại lý tưởng tập thể và bỏ quên nhu cầu cụ thể của từng con người.
  - Dễ bám vào một ý tưởng khác biệt chỉ vì nó mới, dù thực tế cần thêm kiểm chứng.
- DevelopmentAdvice:
  - Gắn cải tiến với trải nghiệm thật của người liên quan, không chỉ với mô hình trên lý thuyết.
  - Duy trì tự do tư tưởng cùng trách nhiệm giải thích, lắng nghe và điều chỉnh.

## Pisces

- Rule ID: `WESTERN-JUPITER-PISCES-V1`
- Title: Sao Mộc Song Ngư
- Summary: Jupiter Song Ngư thường mở rộng qua lòng trắc ẩn, trực giác, tưởng tượng và cảm nhận về sự liên kết. Bạn có xu hướng tìm ý nghĩa khi điều mình học hoặc trải nghiệm giúp làm mềm ranh giới, khơi dậy lòng bao dung và mở ra chiều sâu tinh thần hoặc sáng tạo.
- Strengths:
  - Dễ phát triển cơ hội trong nghệ thuật, hỗ trợ, chữa lành biểu tượng hoặc những môi trường cần sự cảm thông.
  - Có khả năng truyền cảm hứng bằng sự dịu dàng, niềm tin vào điều tốt đẹp và khả năng cảm nhận sắc thái tinh tế.
- Challenges:
  - Có thể phóng đại lòng tin hoặc lý tưởng, khiến ranh giới thực tế trở nên mờ.
  - Dễ nhầm sự đồng cảm với trách nhiệm phải cứu vớt hoặc ôm hết cảm xúc xung quanh.
- DevelopmentAdvice:
  - Chuyển cảm hứng thành một hành động nhỏ, rõ ràng và có giới hạn.
  - Giữ lòng mở nhưng kiểm tra dữ kiện, ranh giới và năng lượng cá nhân trước khi dấn sâu.

## Điều kiện READY cho tích hợp

Ruleset này đủ điều kiện chuyển `WA-P1-001` sang `READY` để tích hợp production với các ràng buộc:

- Tạo data module riêng cho Jupiter hoặc module nhóm "social planets" nhưng chỉ render Jupiter trong task này.
- Tạo adapter đọc `WesternAstrologyResult`, tìm Jupiter theo `name`, không phụ thuộc thứ tự mảng.
- Thêm tests cho 12 rules, unique ruleId, evidence, deterministic, non-mutating và lỗi khi thiếu Jupiter.
- Thêm UI nhóm "Hành tinh xã hội" chỉ hiện Jupiter; không thêm placeholder Saturn.
- Chạy `npm test`, `npm run lint`, `npm run build` và browser smoke desktop/mobile trước khi đánh dấu `Hoàn thành`.
