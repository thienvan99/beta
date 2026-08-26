import {
  zodiacSignLabels,
  zodiacSigns,
  type ZodiacSign,
} from "../lib/western-astrology";

export const socialPlanetInterpretationFactors = [
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
] as const;

export type SocialPlanetInterpretationFactor =
  (typeof socialPlanetInterpretationFactors)[number];

export type SocialPlanetInterpretationRule = Readonly<{
  ruleId: string;
  version: "1.0.0";
  title: string;
  summary: string;
  strengths: ReadonlyArray<string>;
  challenges: ReadonlyArray<string>;
  developmentAdvice: ReadonlyArray<string>;
  evidence: Readonly<{
    body: SocialPlanetInterpretationFactor;
    sign: ZodiacSign;
  }>;
}>;

type RuleContent = Omit<
  SocialPlanetInterpretationRule,
  "ruleId" | "version" | "title" | "evidence"
>;

const factorTitles: Record<SocialPlanetInterpretationFactor, string> = {
  Jupiter: "Sao Mộc",
  Saturn: "Sao Thổ",
  Uranus: "Sao Thiên Vương",
  Neptune: "Sao Hải Vương",
  Pluto: "Sao Diêm Vương",
};

const jupiterContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Jupiter Bạch Dương có xu hướng mở rộng cuộc sống qua sự chủ động, thử nghiệm trực tiếp và niềm tin rằng cơ hội cần được khởi động bằng hành động. Bạn thường học tốt khi được bắt đầu trước, rút kinh nghiệm nhanh và tự kiểm chứng khả năng của mình.",
    strengths: [
      "Dễ nhận ra cơ hội trong những tình huống mới hoặc chưa có lối đi rõ.",
      "Có tinh thần khích lệ người khác dám thử, dám bắt đầu và dám chịu trách nhiệm với lựa chọn.",
    ],
    challenges: [
      "Có thể phóng đại sự tự tin ban đầu và đánh giá thấp thời gian cần để duy trì kết quả.",
      "Dễ xem sự chậm lại như dấu hiệu mất cơ hội, dù đôi khi đó là bước cần thiết để nhìn toàn cảnh.",
    ],
    developmentAdvice: [
      "Gắn mỗi ý tưởng lớn với một tiêu chí kiểm chứng cụ thể trước khi mở rộng.",
      "Tập phân biệt lòng can đảm với phản ứng vội khi cảm thấy bị thách thức.",
    ],
  },
  Taurus: {
    summary:
      "Jupiter Kim Ngưu thường mở rộng qua sự bền bỉ, giá trị thực tế và khả năng nuôi lớn điều có nền tảng. Niềm tin có xu hướng trở nên mạnh hơn khi bạn thấy một lựa chọn đem lại chất lượng sống, sự ổn định và kết quả có thể cảm nhận được.",
    strengths: [
      "Có khả năng phát triển cơ hội bằng nhịp đều, nguồn lực rõ và gu đánh giá giá trị khá chắc.",
      "Thường biết biến tri thức hoặc niềm tin thành thói quen, kỹ năng và kết quả thực tế.",
    ],
    challenges: [
      "Có thể bám quá lâu vào một hệ giá trị quen thuộc, kể cả khi hoàn cảnh đã cần đổi mới.",
      "Dễ phóng đại nhu cầu an toàn và bỏ lỡ trải nghiệm có ích vì chưa thấy ngay lợi ích cụ thể.",
    ],
    developmentAdvice: [
      "Cho phép thử nghiệm nhỏ trước khi quyết định rằng một hướng đi thiếu an toàn.",
      "Đặt câu hỏi định kỳ về điều gì thật sự còn giá trị, điều gì chỉ còn là thói quen.",
    ],
  },
  Gemini: {
    summary:
      "Jupiter Song Tử có xu hướng mở rộng qua học hỏi, trao đổi và việc kết nối nhiều luồng thông tin. Bạn thường tìm thấy ý nghĩa khi được đặt câu hỏi, so sánh góc nhìn và biến sự tò mò thành hiểu biết linh hoạt.",
    strengths: [
      "Dễ nhìn thấy cơ hội trong mạng lưới ý tưởng, con người, ngôn ngữ và thông tin.",
      "Có khả năng truyền cảm hứng bằng sự dí dỏm, khả năng giải thích và tinh thần học suốt đời.",
    ],
    challenges: [
      "Có thể phóng đại số lượng lựa chọn, khiến hướng đi trở nên phân tán.",
      "Dễ nhầm cảm giác biết nhiều với việc đã hiểu đủ sâu để cam kết.",
    ],
    developmentAdvice: [
      "Chọn một vài câu hỏi chủ đạo để dẫn dắt việc học thay vì gom mọi chủ đề cùng lúc.",
      "Sau mỗi giai đoạn khám phá, tạo một bản tổng hợp hoặc hành động cụ thể để kết tinh hiểu biết.",
    ],
  },
  Cancer: {
    summary:
      "Jupiter Cự Giải thường mở rộng qua cảm giác thuộc về, ký ức, sự chăm sóc và khả năng tạo không gian an toàn. Niềm tin có thể được nuôi lớn khi bạn thấy mình đang bảo vệ, nâng đỡ hoặc làm sâu sắc một mối liên hệ có ý nghĩa.",
    strengths: [
      "Dễ phát triển cơ hội qua sự quan tâm tinh tế, lòng trung thành và khả năng xây dựng niềm tin.",
      "Có thể truyền cảm hứng bằng sự ấm áp, khả năng lắng nghe và cảm giác gia đình hoặc cộng đồng.",
    ],
    challenges: [
      "Có thể phóng đại nhu cầu được bảo vệ và ngần ngại rời khỏi vùng quen thuộc.",
      "Dễ để ký ức hoặc cảm xúc cũ định nghĩa quá nhiều về cơ hội hiện tại.",
    ],
    developmentAdvice: [
      "Mở rộng từng bước bằng cách mang cảm giác an toàn theo mình, thay vì chỉ tìm nó ở môi trường quen thuộc.",
      "Kiểm tra xem lòng trung thành đang nuôi dưỡng sự phát triển hay đang giữ bạn lại trong mô thức cũ.",
    ],
  },
  Leo: {
    summary:
      "Jupiter Sư Tử có xu hướng mở rộng qua sáng tạo, lòng tự tin và niềm tin vào giá trị của sự biểu đạt chân thành. Bạn thường phát triển tốt khi một cơ hội cho phép mình đóng góp bằng dấu ấn riêng và khơi dậy tinh thần nơi người khác.",
    strengths: [
      "Dễ truyền cảm hứng bằng sự hào phóng, tinh thần sáng tạo và khả năng tạo không khí tin tưởng.",
      "Có khả năng nhìn cơ hội trong việc dẫn dắt, biểu diễn, dạy dỗ hoặc khích lệ người khác tỏa sáng.",
    ],
    challenges: [
      "Có thể phóng đại nhu cầu được ghi nhận và nhầm sự chú ý với ý nghĩa thật.",
      "Dễ đặt quá nhiều niềm tin vào một màn thể hiện lớn mà thiếu bước duy trì sau đó.",
    ],
    developmentAdvice: [
      "Nuôi dưỡng sáng tạo như một quá trình đều đặn, không chỉ là khoảnh khắc được tán thưởng.",
      "Chia sẻ sân khấu để cơ hội phát triển thành sự cộng hưởng thay vì chỉ xoay quanh hình ảnh cá nhân.",
    ],
  },
  Virgo: {
    summary:
      "Jupiter Xử Nữ thường mở rộng qua kỹ năng, sự cải thiện và khả năng làm cho điều lớn trở nên hữu ích trong thực tế. Niềm tin có xu hướng tăng lên khi bạn thấy một phương pháp rõ ràng, có thể kiểm tra và phục vụ được nhu cầu cụ thể.",
    strengths: [
      "Có khả năng phát triển cơ hội qua chi tiết, quy trình và tinh thần học bằng thực hành.",
      "Dễ truyền cảm hứng bằng năng lực hỗ trợ, sự khiêm tốn và khả năng biến kiến thức thành việc làm được.",
    ],
    challenges: [
      "Có thể phóng đại phần chưa hoàn chỉnh và làm nhỏ lại tầm nhìn vốn cần được thử.",
      "Dễ mắc kẹt trong sửa lỗi, khiến cơ hội phát triển chậm hơn mức cần thiết.",
    ],
    developmentAdvice: [
      "Đặt chuẩn đủ tốt cho từng giai đoạn thay vì chờ mọi thứ hoàn hảo.",
      "Nhìn việc cải thiện như cách mở rộng, nhưng vẫn dành chỗ cho trực giác và thử nghiệm.",
    ],
  },
  Libra: {
    summary:
      "Jupiter Thiên Bình có xu hướng mở rộng qua đối thoại, công bằng, thẩm mỹ và khả năng tìm ý nghĩa trong quan hệ. Cơ hội thường được nhìn thấy khi bạn kết nối nhiều phía, tạo sự hài hòa và học cách cân bằng giữa niềm tin cá nhân với nhu cầu hợp tác.",
    strengths: [
      "Dễ phát triển cơ hội qua liên minh, cố vấn, cộng tác và môi trường có trao đổi văn minh.",
      "Có khả năng truyền cảm hứng bằng tinh thần công bằng, gu thẩm mỹ và cách nhìn nhiều chiều.",
    ],
    challenges: [
      "Có thể phóng đại nhu cầu đồng thuận và trì hoãn lựa chọn khi các phía chưa cùng hài lòng.",
      "Dễ nhầm hòa khí bên ngoài với sự cân bằng thật sự của giá trị bên trong.",
    ],
    developmentAdvice: [
      "Xác định rõ niềm tin cốt lõi trước khi thương lượng hoặc tìm điểm chung.",
      "Cho phép bất đồng có cấu trúc trở thành một phần của quá trình mở rộng quan hệ.",
    ],
  },
  Scorpio: {
    summary:
      "Jupiter Bọ Cạp thường mở rộng qua chiều sâu, sự thật khó nói và khả năng chuyển hóa sau trải nghiệm mạnh. Bạn có xu hướng tìm ý nghĩa bằng cách đi tới gốc rễ của vấn đề, hiểu động cơ ẩn và dùng khủng hoảng như chất liệu để trưởng thành.",
    strengths: [
      "Có khả năng phát triển cơ hội trong nghiên cứu sâu, chữa lành biểu tượng hoặc các quá trình cần sự kiên cường.",
      "Dễ truyền cảm hứng bằng sự chân thật, tập trung và lòng can đảm khi đối diện điều phức tạp.",
    ],
    challenges: [
      "Có thể phóng đại cường độ cảm xúc hoặc nhu cầu kiểm soát để cảm thấy an toàn.",
      "Dễ xem mọi chuyện như bài kiểm tra niềm tin, khiến trải nghiệm bình thường trở nên quá nặng.",
    ],
    developmentAdvice: [
      "Dùng câu hỏi sâu để mở rộng nhận thức, nhưng giữ đủ khoảng cách để không bị cuốn vào nghi ngờ.",
      "Tập chia sẻ quyền lực, thông tin và niềm tin theo từng mức độ có kiểm chứng.",
    ],
  },
  Sagittarius: {
    summary:
      "Jupiter Nhân Mã thường biểu hiện mạnh qua nhu cầu khám phá, học hỏi, niềm tin và tầm nhìn rộng. Bạn có xu hướng mở rộng khi được đi xa hơn giới hạn quen thuộc, tiếp xúc với tri thức mới và kết nối trải nghiệm với một ý nghĩa lớn hơn.",
    strengths: [
      "Dễ nhìn thấy cơ hội trong hành trình học tập, giảng dạy, du hành hoặc mở rộng thế giới quan.",
      "Có khả năng truyền cảm hứng bằng sự lạc quan, thẳng thắn và niềm tin vào khả năng phát triển.",
    ],
    challenges: [
      "Có thể phóng đại tầm nhìn lớn mà bỏ qua chi tiết thực tế cần kiểm chứng.",
      "Dễ nhầm cảm giác tự do với việc không cần cam kết hoặc theo đến cùng.",
    ],
    developmentAdvice: [
      "Gắn mỗi lý tưởng lớn với một hành động cụ thể và một trách nhiệm rõ.",
      "Kiểm tra lại niềm tin bằng trải nghiệm thực tế, dữ kiện và phản hồi từ người khác.",
    ],
  },
  Capricorn: {
    summary:
      "Jupiter Ma Kết thường mở rộng qua cấu trúc, trách nhiệm và niềm tin vào thành quả được xây dựng theo thời gian. Bạn có xu hướng phát triển cơ hội khi mục tiêu lớn được đặt vào kế hoạch rõ ràng, có tiêu chuẩn và có khả năng chịu trách nhiệm.",
    strengths: [
      "Có khả năng biến tầm nhìn thành hệ thống, chiến lược và các bước tiến bền.",
      "Dễ truyền cảm hứng bằng sự đáng tin, năng lực tổ chức và tinh thần tôn trọng cam kết.",
    ],
    challenges: [
      "Có thể phóng đại nghĩa vụ, khiến niềm tin vào khả năng mở rộng bị bó bởi áp lực thành tích.",
      "Dễ xem cơ hội chỉ có giá trị khi nó chứng minh được hiệu quả ngay hoặc tạo vị thế rõ ràng.",
    ],
    developmentAdvice: [
      "Để tầm nhìn dài hạn có cả khoảng thử nghiệm, học hỏi và nghỉ phục hồi.",
      "Kiểm tra xem tiêu chuẩn đang giúp cơ hội trưởng thành hay đang làm nó khó thở.",
    ],
  },
  Aquarius: {
    summary:
      "Jupiter Bảo Bình có xu hướng mở rộng qua tư duy hệ thống, cộng đồng, lý tưởng cải tiến và quyền được khác biệt. Bạn thường tìm thấy cơ hội khi một ý tưởng không chỉ phục vụ cá nhân mà còn mở ra cách vận hành mới cho nhóm hoặc mạng lưới rộng hơn.",
    strengths: [
      "Dễ nhìn thấy hướng phát triển trong công nghệ, cộng đồng, mô hình mới hoặc các giá trị tiến bộ.",
      "Có khả năng truyền cảm hứng bằng sự khách quan, tinh thần tự do và tầm nhìn vượt khỏi khuôn mẫu.",
    ],
    challenges: [
      "Có thể phóng đại lý tưởng tập thể và bỏ quên nhu cầu cụ thể của từng con người.",
      "Dễ bám vào một ý tưởng khác biệt chỉ vì nó mới, dù thực tế cần thêm kiểm chứng.",
    ],
    developmentAdvice: [
      "Gắn cải tiến với trải nghiệm thật của người liên quan, không chỉ với mô hình trên lý thuyết.",
      "Duy trì tự do tư tưởng cùng trách nhiệm giải thích, lắng nghe và điều chỉnh.",
    ],
  },
  Pisces: {
    summary:
      "Jupiter Song Ngư thường mở rộng qua lòng trắc ẩn, trực giác, tưởng tượng và cảm nhận về sự liên kết. Bạn có xu hướng tìm ý nghĩa khi điều mình học hoặc trải nghiệm giúp làm mềm ranh giới, khơi dậy lòng bao dung và mở ra chiều sâu tinh thần hoặc sáng tạo.",
    strengths: [
      "Dễ phát triển cơ hội trong nghệ thuật, hỗ trợ, chữa lành biểu tượng hoặc những môi trường cần sự cảm thông.",
      "Có khả năng truyền cảm hứng bằng sự dịu dàng, niềm tin vào điều tốt đẹp và khả năng cảm nhận sắc thái tinh tế.",
    ],
    challenges: [
      "Có thể phóng đại lòng tin hoặc lý tưởng, khiến ranh giới thực tế trở nên mờ.",
      "Dễ nhầm sự đồng cảm với trách nhiệm phải cứu vớt hoặc ôm hết cảm xúc xung quanh.",
    ],
    developmentAdvice: [
      "Chuyển cảm hứng thành một hành động nhỏ, rõ ràng và có giới hạn.",
      "Giữ lòng mở nhưng kiểm tra dữ kiện, ranh giới và năng lượng cá nhân trước khi dấn sâu.",
    ],
  },
};

const saturnContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Saturn Bạch Dương thường học về trách nhiệm qua cách khởi đầu, tự khẳng định và sử dụng ý chí cá nhân. Bạn có xu hướng trưởng thành khi hành động không chỉ đến từ phản xạ nhanh, mà được đặt trong kỷ luật, tiêu chuẩn rõ và khả năng chịu trách nhiệm với bước đi đầu tiên.",
    strengths: [
      "Có khả năng rèn sự can đảm thành năng lực hành động bền, nhất là khi mục tiêu đòi hỏi tự chủ.",
      "Thường phát triển bản lĩnh qua việc tự kiểm chứng giới hạn thay vì chỉ chờ sự cho phép từ bên ngoài.",
    ],
    challenges: [
      "Có thể do dự khi cần bắt đầu vì sợ sai, hoặc ngược lại cố tỏ ra mạnh để che cảm giác chưa chắc chắn.",
      "Dễ xem việc phải chậm lại như một thất bại cá nhân, dù đó có thể là cách Saturn giúp hành động chắc hơn.",
    ],
    developmentAdvice: [
      "Tập chia nhỏ quyết định thành bước thử có trách nhiệm, để sự chủ động được rèn bằng kinh nghiệm thật.",
      "Phân biệt sức mạnh cá nhân với nhu cầu phải thắng ngay trong mọi tình huống.",
    ],
  },
  Taurus: {
    summary:
      "Saturn Kim Ngưu thường học về trách nhiệm qua giá trị, nguồn lực, sự ổn định và khả năng xây dựng điều bền vững. Bạn có xu hướng trưởng thành khi biết dùng thời gian, kỹ năng và sự kiên trì để tạo nền tảng thật, thay vì chỉ tìm cảm giác an toàn từ điều quen thuộc.",
    strengths: [
      "Có khả năng duy trì cam kết dài hạn và biến tiêu chuẩn thực tế thành kết quả có thể tin cậy.",
      "Thường biết tôn trọng nhịp độ tự nhiên của sự phát triển, nhất là trong việc tích lũy kỹ năng hoặc nguồn lực.",
    ],
    challenges: [
      "Có thể bám quá chặt vào an toàn, khiến thay đổi cần thiết trở nên khó tiếp nhận.",
      "Dễ đánh giá bản thân qua mức độ ổn định vật chất hoặc năng suất hữu hình nhiều hơn mức cần thiết.",
    ],
    developmentAdvice: [
      "Xây dựng cảm giác an toàn từ năng lực thích nghi, không chỉ từ việc giữ nguyên hoàn cảnh.",
      "Kiểm tra định kỳ xem điều đang được bảo vệ là giá trị cốt lõi hay chỉ là nỗi sợ mất kiểm soát.",
    ],
  },
  Gemini: {
    summary:
      "Saturn Song Tử thường học về trách nhiệm qua tư duy, ngôn ngữ, học tập và cách xử lý thông tin. Bạn có xu hướng trưởng thành khi sự tò mò được đặt vào cấu trúc rõ, giúp lời nói, kiến thức và quan điểm trở nên chính xác, có trách nhiệm và có thể kiểm chứng.",
    strengths: [
      "Có khả năng xây dựng tư duy mạch lạc, nhất là khi cần phân tích, viết, dạy hoặc giải thích điều phức tạp.",
      "Thường phát triển sự đáng tin trong giao tiếp nhờ biết cân nhắc dữ kiện và hệ quả của lời nói.",
    ],
    challenges: [
      "Có thể tự kiểm duyệt quá mức vì sợ nói sai, hoặc giữ im lặng dù đang có điều cần đóng góp.",
      "Dễ biến việc học thành áp lực phải biết đủ mọi thứ trước khi được quyền lên tiếng.",
    ],
    developmentAdvice: [
      "Rèn thói quen diễn đạt từng bước: nói rõ điều đã biết, điều chưa chắc và điều cần kiểm chứng thêm.",
      "Cho phép mình học qua đối thoại, thay vì chỉ chờ đến khi cảm thấy hoàn toàn sẵn sàng.",
    ],
  },
  Cancer: {
    summary:
      "Saturn Cự Giải thường học về trách nhiệm qua cảm xúc, ký ức, sự chăm sóc và cảm giác thuộc về. Bạn có xu hướng trưởng thành khi biết tạo an toàn nội tâm, đặt ranh giới trong việc nâng đỡ người khác và không để quá khứ quyết định toàn bộ cách mình bảo vệ bản thân.",
    strengths: [
      "Có khả năng xây dựng sự tin cậy qua lòng trung thành, sự chu đáo và trách nhiệm với những mối liên hệ thân thiết.",
      "Thường phát triển chiều sâu cảm xúc khi học cách chăm sóc mà vẫn giữ được nền tảng riêng.",
    ],
    challenges: [
      "Có thể thu mình khi cảm thấy không an toàn, khiến nhu cầu thật khó được người khác hiểu.",
      "Dễ gánh trách nhiệm cảm xúc quá nhiều, nhất là với gia đình hoặc những người mình xem là thân thuộc.",
    ],
    developmentAdvice: [
      "Tập gọi tên nhu cầu cảm xúc một cách cụ thể, thay vì chỉ chịu đựng hoặc chờ người khác tự nhận ra.",
      "Xây ranh giới chăm sóc rõ ràng để sự gắn bó không trở thành nghĩa vụ âm thầm.",
    ],
  },
  Leo: {
    summary:
      "Saturn Sư Tử thường học về trách nhiệm qua sáng tạo, lòng tự tin và quyền được thể hiện dấu ấn riêng. Bạn có xu hướng trưởng thành khi sự tỏa sáng không chỉ là khoảnh khắc được công nhận, mà trở thành một năng lực được rèn bằng kỷ luật, trung thực và sự tôn trọng giá trị sáng tạo của mình.",
    strengths: [
      "Có khả năng biến tài năng hoặc cảm hứng cá nhân thành sản phẩm, vai trò hoặc đóng góp có cấu trúc.",
      "Thường phát triển phong thái lãnh đạo chín chắn khi biết nâng đỡ người khác cùng thể hiện năng lực.",
    ],
    challenges: [
      "Có thể ngại bộc lộ bản thân vì sợ bị đánh giá, hoặc đặt tiêu chuẩn quá cao cho mọi lần xuất hiện.",
      "Dễ nhầm sự công nhận bên ngoài với quyền được sáng tạo và vui sống từ bên trong.",
    ],
    developmentAdvice: [
      "Duy trì thực hành sáng tạo đều đặn, kể cả khi kết quả chưa được chú ý hoặc chưa hoàn hảo.",
      "Học cách nhận phản hồi như chất liệu rèn nghề, không phải bản án về giá trị cá nhân.",
    ],
  },
  Virgo: {
    summary:
      "Saturn Xử Nữ thường học về trách nhiệm qua kỹ năng, quy trình, sức làm việc và khả năng cải thiện từng chi tiết. Bạn có xu hướng trưởng thành khi tiêu chuẩn cao được dùng để phục vụ điều hữu ích, thay vì trở thành áp lực phải kiểm soát mọi sai sót trước khi bắt đầu.",
    strengths: [
      "Có khả năng xây dựng chuyên môn chắc bằng quan sát kỹ, thực hành đều và tinh thần sửa lỗi nghiêm túc.",
      "Thường đáng tin trong những việc cần quy trình, phân tích và khả năng làm cho hệ thống vận hành tốt hơn.",
    ],
    challenges: [
      "Có thể phóng đại lỗi nhỏ và làm nhẹ thành quả đã đạt được.",
      "Dễ mắc kẹt trong tối ưu hóa, khiến năng lượng bị hao vào việc chỉnh sửa hơn là hoàn tất.",
    ],
    developmentAdvice: [
      "Đặt tiêu chuẩn theo từng giai đoạn, gồm cả ngưỡng đủ tốt để có thể bàn giao hoặc nghỉ ngơi.",
      "Nhìn sự hữu ích như mục tiêu chính, còn sự hoàn hảo chỉ là một hướng tham khảo cần kiểm soát.",
    ],
  },
  Libra: {
    summary:
      "Saturn Thiên Bình thường học về trách nhiệm qua quan hệ, công bằng, thỏa thuận và khả năng cân bằng nhiều phía. Bạn có xu hướng trưởng thành khi biết xây dựng liên kết có cấu trúc, nơi sự hài hòa không chỉ là tránh xung đột mà còn là tôn trọng ranh giới, cam kết và sự thật của từng người.",
    strengths: [
      "Có khả năng tạo quan hệ bền bằng sự công tâm, biết lắng nghe và tôn trọng trách nhiệm đôi bên.",
      "Thường phát triển năng lực thương lượng khi biết đặt tiêu chuẩn rõ cho sự hợp tác.",
    ],
    challenges: [
      "Có thể trì hoãn quyết định vì sợ làm mất cân bằng hoặc khiến ai đó thất vọng.",
      "Dễ gánh phần trách nhiệm giữ hòa khí nhiều hơn mức cần thiết.",
    ],
    developmentAdvice: [
      "Làm rõ điều không thể thương lượng trước khi tìm điểm chung.",
      "Tập xem bất đồng có giới hạn là một phần lành mạnh của quan hệ trưởng thành.",
    ],
  },
  Scorpio: {
    summary:
      "Saturn Bọ Cạp thường học về trách nhiệm qua chiều sâu cảm xúc, niềm tin, quyền riêng tư và những vùng trải nghiệm khó nói. Bạn có xu hướng trưởng thành khi biết đối diện sự thật phức tạp một cách có cấu trúc, không né tránh cường độ nhưng cũng không để nhu cầu kiểm soát dẫn dắt mọi lựa chọn.",
    strengths: [
      "Có khả năng chịu đựng và làm việc sâu với các vấn đề cần sự kín đáo, tập trung và kiên trì.",
      "Thường phát triển sức mạnh nội tâm khi học cách đặt ranh giới cho sự thân mật, thông tin và quyền lực.",
    ],
    challenges: [
      "Có thể giữ phòng thủ quá lâu, khiến việc tin tưởng hoặc chia sẻ trở nên khó khăn.",
      "Dễ xem việc buông kiểm soát như mất an toàn, dù đôi khi đó là điều kiện để quan hệ hoặc nhận thức trưởng thành.",
    ],
    developmentAdvice: [
      "Tập phân biệt trực giác cảnh báo với thói quen nghi ngờ phát sinh từ trải nghiệm cũ.",
      "Xây dựng niềm tin theo từng mức độ rõ ràng, có quan sát và có quyền điều chỉnh.",
    ],
  },
  Sagittarius: {
    summary:
      "Saturn Nhân Mã thường học về trách nhiệm qua niềm tin, tri thức, đạo lý và tầm nhìn sống. Bạn có xu hướng trưởng thành khi lý tưởng được kiểm chứng bằng trải nghiệm, dữ kiện và cam kết học đến nơi, để tự do không tách khỏi trách nhiệm với điều mình tin và truyền đạt.",
    strengths: [
      "Có khả năng biến thế giới quan rộng thành nguyên tắc sống, chương trình học hoặc định hướng có nền tảng.",
      "Thường đáng tin khi biết kết hợp sự thẳng thắn với tinh thần kiểm chứng và tôn trọng khác biệt.",
    ],
    challenges: [
      "Có thể nghi ngờ niềm tin của mình quá mức, hoặc bám vào một hệ quan điểm để tránh sự bất định.",
      "Dễ thấy chi tiết thực tế như điều làm nhỏ tầm nhìn, trong khi chúng có thể giúp lý tưởng đứng vững.",
    ],
    developmentAdvice: [
      "Kiểm tra niềm tin bằng hành động cụ thể, phản hồi và khả năng sống nhất quán với điều đã nói.",
      "Giữ tinh thần học hỏi ngay cả khi đã có hệ quan điểm rõ ràng.",
    ],
  },
  Capricorn: {
    summary:
      "Saturn Ma Kết thường biểu hiện mạnh qua trách nhiệm, cấu trúc, mục tiêu dài hạn và năng lực xây dựng thành quả theo thời gian. Bạn có xu hướng trưởng thành khi biết dùng kỷ luật để tạo nền tảng bền, đồng thời không để tiêu chuẩn, vai trò hoặc áp lực thành tựu thay thế toàn bộ đời sống nội tâm.",
    strengths: [
      "Có khả năng tổ chức, chịu trách nhiệm và đi đường dài trong những mục tiêu cần sự kiên định.",
      "Thường phát triển uy tín qua hành động nhất quán, tiêu chuẩn rõ và khả năng giữ cam kết.",
    ],
    challenges: [
      "Có thể đồng nhất giá trị bản thân với hiệu suất, vị trí hoặc việc luôn phải kiểm soát tình hình.",
      "Dễ xem nghỉ ngơi, thử nghiệm hoặc nhờ hỗ trợ là dấu hiệu thiếu năng lực.",
    ],
    developmentAdvice: [
      "Xây kế hoạch dài hạn có cả nhịp phục hồi, học hỏi và điều chỉnh khi điều kiện thay đổi.",
      "Định nghĩa thành tựu theo giá trị thật sự muốn xây, không chỉ theo áp lực phải chứng minh.",
    ],
  },
  Aquarius: {
    summary:
      "Saturn Bảo Bình thường học về trách nhiệm qua cộng đồng, hệ thống, tư duy cải tiến và quyền được khác biệt. Bạn có xu hướng trưởng thành khi lý tưởng tiến bộ được đặt vào cấu trúc có thể vận hành, giúp tự do cá nhân đi cùng trách nhiệm với nhóm, mạng lưới hoặc nguyên tắc chung.",
    strengths: [
      "Có khả năng xây dựng mô hình, quy tắc hoặc cộng đồng dựa trên tư duy khách quan và tầm nhìn dài hạn.",
      "Thường phát triển sự độc lập trí tuệ khi biết bảo vệ quan điểm mà vẫn kiểm chứng bằng thực tế.",
    ],
    challenges: [
      "Có thể cảm thấy xa cách khi không tìm được nhóm cùng tiêu chuẩn hoặc cùng cách nhìn.",
      "Dễ đặt lý tưởng hệ thống lên trước nhu cầu cụ thể của từng con người.",
    ],
    developmentAdvice: [
      "Biến ý tưởng cải tiến thành thử nghiệm có cấu trúc, có phản hồi và có trách nhiệm triển khai.",
      "Giữ sự khác biệt như một năng lực đóng góp, không phải lý do để tự tách mình khỏi kết nối.",
    ],
  },
  Pisces: {
    summary:
      "Saturn Song Ngư thường học về trách nhiệm qua lòng trắc ẩn, trực giác, ranh giới tinh tế và khả năng đặt hình dạng cho điều khó nắm bắt. Bạn có xu hướng trưởng thành khi cảm xúc, tưởng tượng hoặc niềm tin mềm được nâng đỡ bằng thói quen, giới hạn và cách chăm sóc năng lượng rõ ràng.",
    strengths: [
      "Có khả năng biến trực giác, nghệ thuật hoặc tinh thần hỗ trợ thành thực hành có ích và có trách nhiệm.",
      "Thường phát triển sự bao dung chín chắn khi biết cảm thông mà không đánh mất ranh giới cá nhân.",
    ],
    challenges: [
      "Có thể thấy khó đặt giới hạn vì sợ làm người khác tổn thương hoặc sợ mất sự kết nối.",
      "Dễ trì hoãn việc gọi tên thực tế khi cảm xúc, lý tưởng hoặc sự mơ hồ đang chiếm nhiều không gian.",
    ],
    developmentAdvice: [
      "Tạo cấu trúc nhẹ cho đời sống cảm xúc: thời gian nghỉ, ranh giới hỗ trợ và cách kiểm chứng điều mình cảm nhận.",
      "Chuyển lòng trắc ẩn thành hành động nhỏ, rõ và có giới hạn để tránh ôm quá nhiều trách nhiệm.",
    ],
  },
};

const uranusContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Uranus Bạch Dương thường biểu hiện nguyên lý đổi mới qua hành động tiên phong, quyền được bắt đầu khác đi và phản ứng nhanh trước những cấu trúc làm mất tự chủ. Ở cấp cá nhân, vị trí này nên được đọc như một cách lá số tiếp xúc với nhu cầu khai mở và độc lập, không phải kết luận rằng bạn luôn bốc đồng hoặc nổi loạn.",
    strengths: [
      "Có khả năng nhận ra thời điểm cần hành động mới khi một mô thức đã trở nên trì trệ.",
      "Dễ khơi dậy tinh thần thử nghiệm, can đảm và tự chủ trong những hoàn cảnh chưa có tiền lệ rõ.",
    ],
    challenges: [
      "Có thể đồng nhất tự do với việc phải phản ứng ngay, khiến thay đổi thiếu bước kiểm chứng.",
      "Dễ xem mọi giới hạn như sự cản trở, dù một số giới hạn có thể giúp sáng kiến đứng vững hơn.",
    ],
    developmentAdvice: [
      "Biến xung lực đổi mới thành thử nghiệm nhỏ có tiêu chí rõ trước khi phá bỏ toàn bộ cấu trúc cũ.",
      "Tập phân biệt hành động độc lập với phản ứng chống lại áp lực bên ngoài.",
    ],
  },
  Taurus: {
    summary:
      "Uranus Kim Ngưu thường đưa nguyên lý đổi mới vào giá trị, nguồn lực, sự ổn định và cách con người liên hệ với vật chất hoặc đời sống cảm quan. Khi đọc trong lá số cá nhân, vị trí này gợi ý vùng cần tái định nghĩa an toàn và giá trị, nhưng không tự nó dự báo mất ổn định hay thay đổi tài chính.",
    strengths: [
      "Có khả năng cải tiến những hệ thống thực tế, nhất là khi một cách quản lý nguồn lực đã lỗi thời.",
      "Dễ nhìn thấy giá trị mới trong điều đơn giản, bền vững hoặc ít được đánh giá đúng.",
    ],
    challenges: [
      "Có thể dao động giữa bám chặt vào an toàn quen thuộc và phá vỡ đột ngột khi cảm thấy bị kìm giữ.",
      "Dễ biến nhu cầu kiểm soát nguồn lực thành căng thẳng với những thay đổi vốn cần thời gian thích nghi.",
    ],
    developmentAdvice: [
      "Thử đổi mới theo nhịp có thể hấp thụ được, để hệ thần kinh và đời sống thực tế có thời gian cập nhật.",
      "Kiểm tra định kỳ xem điều đang giữ lại là giá trị thật hay chỉ là cảm giác quen thuộc.",
    ],
  },
  Gemini: {
    summary:
      "Uranus Song Tử thường biểu hiện qua tư duy nhanh, ngôn ngữ mới, mạng lưới thông tin và cách phá vỡ lối hiểu cũ bằng câu hỏi sắc bén. Trong bối cảnh cá nhân, vị trí này nói về phong cách đổi mới trong học hỏi và kết nối ý tưởng, không phải bằng chứng rằng một người luôn bất ổn trong suy nghĩ.",
    strengths: [
      "Có khả năng nhận ra liên kết bất ngờ giữa các dữ kiện, nhóm người hoặc hệ tri thức khác nhau.",
      "Dễ thúc đẩy cách học, viết, nói hoặc truyền thông bớt khuôn mẫu và linh hoạt hơn.",
    ],
    challenges: [
      "Có thể theo đuổi quá nhiều luồng kích thích trí tuệ, khiến hướng đổi mới bị phân tán.",
      "Dễ dùng sự khác biệt trong quan điểm như cách gây sốc, thay vì làm rõ điều thật sự cần thay đổi.",
    ],
    developmentAdvice: [
      "Chọn một vài câu hỏi cốt lõi để dẫn luồng thử nghiệm trí tuệ thay vì mở quá nhiều nhánh cùng lúc.",
      "Gắn ý tưởng đột phá với dữ kiện, cấu trúc diễn đạt và khả năng người khác có thể hiểu được.",
    ],
  },
  Cancer: {
    summary:
      "Uranus Cự Giải thường đưa đổi mới vào cảm giác thuộc về, gia đình, ký ức và cách tạo an toàn cảm xúc. Khi đọc cá nhân, vị trí này gợi ý nơi một người hoặc thế hệ có thể cần định nghĩa lại sự chăm sóc và gắn bó, nhưng không nên kết luận đơn giản là thiếu ổn định tình cảm.",
    strengths: [
      "Có khả năng mở ra mô hình chăm sóc, gia đình hoặc cộng đồng linh hoạt hơn khuôn mẫu cũ.",
      "Dễ nhận ra khi một kiểu bảo vệ quen thuộc không còn thật sự nuôi dưỡng sự sống bên trong.",
    ],
    challenges: [
      "Có thể phản ứng bằng cách rút xa đột ngột khi cảm thấy nhu cầu tự do cảm xúc bị đe dọa.",
      "Dễ phá vỡ mô thức thân thuộc trước khi kịp tạo một nền an toàn mới.",
    ],
    developmentAdvice: [
      "Đổi mới trong quan hệ thân thiết bằng các thỏa thuận rõ, không chỉ bằng khoảng cách hoặc im lặng.",
      "Tập xây cảm giác an toàn từ khả năng thích nghi, đồng thời tôn trọng nhu cầu gắn bó lành mạnh.",
    ],
  },
  Leo: {
    summary:
      "Uranus Sư Tử thường biểu hiện qua cách làm mới sáng tạo, lãnh đạo, biểu đạt cá nhân và quyền được tỏa sáng khác khuôn mẫu. Ở cấp cá nhân, quy tắc này chỉ mô tả phong cách giải phóng năng lượng sáng tạo trong cung Sư Tử; mức độ nổi bật cần đọc cùng toàn lá số.",
    strengths: [
      "Có khả năng khơi dậy hình thức sáng tạo, trình diễn hoặc dẫn dắt có dấu ấn riêng.",
      "Dễ truyền cảm hứng cho người khác dám thể hiện điều độc đáo mà vẫn có sức sống thật.",
    ],
    challenges: [
      "Có thể nhầm khác biệt với việc luôn phải gây ấn tượng hoặc đứng ngoài quy tắc chung.",
      "Dễ phản ứng mạnh khi cảm thấy bản sắc sáng tạo bị kiểm soát, kể cả lúc phản hồi có ích.",
    ],
    developmentAdvice: [
      "Rèn tự do sáng tạo thành thực hành đều đặn, để sự độc đáo có hình dạng và chất lượng.",
      "Tập chia sẻ không gian tỏa sáng, vì đổi mới bền hơn khi nó mở đường cho nhiều người cùng sáng tạo.",
    ],
  },
  Virgo: {
    summary:
      "Uranus Xử Nữ thường đưa đổi mới vào phương pháp, kỹ năng, lao động, quy trình và cách cải thiện đời sống hằng ngày. Khi đọc cá nhân, vị trí này cho thấy khuynh hướng cải tiến hệ thống nhỏ và thực tế, không phải kết luận về sức khỏe, bệnh lý hoặc năng suất của một người.",
    strengths: [
      "Có khả năng phát hiện điểm lỗi trong hệ thống và nghĩ ra cách vận hành gọn, thông minh hơn.",
      "Dễ biến tư duy cải tiến thành công cụ, quy trình hoặc kỹ năng phục vụ nhu cầu cụ thể.",
    ],
    challenges: [
      "Có thể căng thẳng khi thực tế không thay đổi đủ nhanh so với hình dung về sự tối ưu.",
      "Dễ phá cấu trúc cũ vì thấy nó kém hiệu quả, nhưng chưa dành đủ thời gian cho người dùng thích nghi.",
    ],
    developmentAdvice: [
      "Kiểm chứng cải tiến bằng nhu cầu thật, không chỉ bằng cảm giác rằng một hệ thống nên hoàn hảo hơn.",
      "Giữ nhịp thử nghiệm có tài liệu, phản hồi và khả năng bảo trì sau khi đổi mới.",
    ],
  },
  Libra: {
    summary:
      "Uranus Thiên Bình thường biểu hiện qua việc làm mới quan hệ, thỏa thuận, công bằng, thẩm mỹ và cách nhiều phía cùng tồn tại. Trong lá số cá nhân, vị trí này cần được đọc như nhu cầu tự do trong mô hình liên kết, không phải kết luận rằng quan hệ chắc chắn bất ổn.",
    strengths: [
      "Có khả năng nhận ra mô hình hợp tác mới khi cách giữ hòa khí cũ không còn công bằng.",
      "Dễ đưa tư duy khách quan, cởi mở và cải tiến vào đối thoại hoặc thiết kế quan hệ.",
    ],
    challenges: [
      "Có thể rời khỏi thỏa thuận quá nhanh khi cảm thấy mất tự do, trước khi thử thương lượng rõ ràng.",
      "Dễ dùng lý tưởng bình đẳng như lý do để né phần cảm xúc phức tạp của quan hệ thật.",
    ],
    developmentAdvice: [
      "Đặt tự do và cam kết vào cùng một cuộc đối thoại, với điều khoản cụ thể thay vì kỳ vọng ngầm.",
      "Cho phép bất đồng được nói ra sớm để đổi mới quan hệ không phải diễn ra bằng đứt gãy.",
    ],
  },
  Scorpio: {
    summary:
      "Uranus Bọ Cạp thường đưa nguyên lý thức tỉnh vào chiều sâu cảm xúc, quyền riêng tư, kiểm soát, thân mật và những vùng kinh nghiệm khó nói. Khi đọc cá nhân, vị trí này mô tả cách năng lượng đổi mới chạm vào tầng sâu của niềm tin và ranh giới, không tự nó dự báo khủng hoảng hay biến cố.",
    strengths: [
      "Có khả năng nhìn xuyên qua mô thức kiểm soát cũ và mở ra cách tiếp cận trung thực hơn với điều phức tạp.",
      "Dễ thúc đẩy sự đổi mới trong nghiên cứu sâu, chữa lành biểu tượng hoặc các chủ đề cần can đảm đối diện.",
    ],
    challenges: [
      "Có thể bị hút vào cường độ, khiến thay đổi chỉ có vẻ thật khi nó đủ mạnh hoặc đủ cực đoan.",
      "Dễ phá vỡ niềm tin vì sợ bị ràng buộc, dù một số ranh giới thân mật cần được xây từ từ.",
    ],
    developmentAdvice: [
      "Dùng sự sắc bén để nhận diện mô thức, nhưng tạo lối ra có cấu trúc thay vì chỉ lật tung vấn đề.",
      "Tập chia sẻ quyền lực, thông tin và cảm xúc theo mức độ an toàn có thể kiểm chứng.",
    ],
  },
  Sagittarius: {
    summary:
      "Uranus Nhân Mã thường biểu hiện qua việc làm mới niềm tin, triết lý sống, giáo dục, du hành và cách con người mở rộng thế giới quan. Ở cấp cá nhân, vị trí này nói về nơi lá số tiếp xúc với tự do tư tưởng, không phải kết luận rằng một người luôn chống lại mọi niềm tin có sẵn.",
    strengths: [
      "Có khả năng đặt câu hỏi lớn với hệ quan điểm cũ và mở đường cho cách học rộng hơn.",
      "Dễ kết nối tinh thần khám phá với những ý tưởng tiến bộ, liên văn hóa hoặc vượt khỏi biên giới quen thuộc.",
    ],
    challenges: [
      "Có thể biến tự do tư tưởng thành phản ứng chống giáo điều nhưng lại bám vào một giáo điều mới.",
      "Dễ bỏ qua chi tiết thực tế vì muốn đi thẳng tới tầm nhìn lớn hoặc trải nghiệm mới.",
    ],
    developmentAdvice: [
      "Kiểm chứng niềm tin bằng trải nghiệm, dữ kiện và khả năng sống nhất quán với điều mình cổ vũ.",
      "Giữ sự mở rộng đi cùng trách nhiệm truyền đạt, để ý tưởng mới không trở thành khẩu hiệu thiếu nền.",
    ],
  },
  Capricorn: {
    summary:
      "Uranus Ma Kết thường đưa đổi mới vào cấu trúc, tổ chức, trách nhiệm, quyền lực chính thức và mô hình thành tựu. Khi đọc cá nhân, vị trí này gợi ý cách một người hoặc thế hệ đối diện nhu cầu cải cách hệ thống, nhưng không phải lời dự báo về địa vị, nghề nghiệp hay sự sụp đổ của cấu trúc.",
    strengths: [
      "Có khả năng nhìn ra điểm cần cải tổ trong hệ thống cứng nhắc mà vẫn hiểu tầm quan trọng của cấu trúc.",
      "Dễ biến ý tưởng mới thành mô hình vận hành, quy trình hoặc tiêu chuẩn có thể áp dụng.",
    ],
    challenges: [
      "Có thể dao động giữa chống lại quyền lực và muốn kiểm soát thay đổi theo cách rất chặt.",
      "Dễ phá một cấu trúc cũ trước khi thiết kế đủ phần chịu lực cho cấu trúc mới.",
    ],
    developmentAdvice: [
      "Cải cách từng lớp: xác định điều cần giữ, điều cần bỏ và điều cần thử trong điều kiện có trách nhiệm.",
      "Tập làm việc với hệ thống mà không đánh mất tư duy độc lập hoặc biến độc lập thành chống đối tự động.",
    ],
  },
  Aquarius: {
    summary:
      "Uranus Bảo Bình thường biểu hiện rất rõ qua cộng đồng, công nghệ, tư duy hệ thống, lý tưởng tiến bộ và quyền được khác biệt. Dù nhiều trường phái hiện đại liên hệ Uranus với Aquarius, quy tắc này vẫn không dùng vị trí này để kết luận mạnh-yếu tuyệt đối; ý nghĩa cá nhân cần đọc cùng toàn lá số.",
    strengths: [
      "Có khả năng nhìn thấy mô hình xã hội, nhóm hoặc mạng lưới có thể vận hành theo cách tự do và thông minh hơn.",
      "Dễ khơi dậy đổi mới bằng tư duy khách quan, tinh thần thử nghiệm và sự tôn trọng khác biệt.",
    ],
    challenges: [
      "Có thể đặt ý tưởng hệ thống lên trước nhu cầu cụ thể của từng con người.",
      "Dễ đồng nhất sự tiến bộ với việc luôn phải khác số đông, kể cả khi điều cần nhất là kết nối thực tế.",
    ],
    developmentAdvice: [
      "Gắn lý tưởng cải tiến với trải nghiệm người dùng, phản hồi cộng đồng và trách nhiệm triển khai.",
      "Giữ sự độc lập trí tuệ đi cùng khả năng lắng nghe, điều chỉnh và giải thích minh bạch.",
    ],
  },
  Pisces: {
    summary:
      "Uranus Song Ngư thường đưa đổi mới vào tưởng tượng, lòng trắc ẩn, biểu tượng, tinh thần tập thể và những vùng ranh giới khó nắm bắt. Khi đọc cá nhân, vị trí này cho thấy cách trực giác hoặc cảm hứng có thể phá khuôn cũ, nhưng không nên biến thành kết luận về tâm linh, mơ hồ hoặc khả năng đặc biệt.",
    strengths: [
      "Có khả năng mở ra hình thức sáng tạo, hỗ trợ hoặc cảm nhận tập thể vượt khỏi lối diễn đạt quen thuộc.",
      "Dễ nhận ra khi một lý tưởng mềm cần hình thức mới để bao dung hơn và ít đóng khung hơn.",
    ],
    challenges: [
      "Có thể để cảm hứng đổi mới trôi quá rộng, khiến ranh giới và bước thực hiện trở nên mờ.",
      "Dễ nhầm sự tự do nội tâm với việc không cần kiểm chứng thực tế hoặc cam kết rõ.",
    ],
    developmentAdvice: [
      "Chuyển trực giác đổi mới thành hành động nhỏ, có ranh giới, có thời điểm kiểm tra và có người phản hồi.",
      "Giữ lòng mở với điều khác thường, đồng thời tôn trọng dữ kiện, giới hạn năng lượng và thực tế chung.",
    ],
  },
};

const neptuneContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Neptune ở Bạch Dương mô tả lý tưởng thế hệ về quyền chủ động, bản sắc và tinh thần tiên phong. Cảm hứng hành động có thể mạnh, nhưng cần phân biệt động lực nhất thời với một hướng đi đã đủ rõ; mức độ cá nhân hóa phải xem thêm nhà và góc chiếu.",
    strengths: [
      "Dễ hình dung những cách mới để chủ động và mở đường.",
      "Lý tưởng có thể trở thành động lực khởi xướng thay đổi khi được neo vào thực tế.",
    ],
    challenges: [
      "Có thể lý tưởng hóa hình ảnh người tiên phong hoặc hành động nhanh.",
      "Dễ nhầm cảm giác thôi thúc mạnh với một mục tiêu đã đủ rõ.",
    ],
    developmentAdvice: [
      "Hãy tách “điều truyền cảm hứng” khỏi “điều đã được kiểm chứng”. Trước một bước đi lớn, xác định mục tiêu cụ thể, hệ quả có thể quan sát và một tiêu chí để biết khi nào nên tiếp tục hoặc điều chỉnh.",
    ],
  },
  Taurus: {
    summary:
      "Neptune ở Kim Ngưu mô tả lý tưởng thế hệ về sự ổn định, giá trị, vẻ đẹp và cảm giác đủ đầy. Vị trí này có thể làm các chuẩn về an toàn và vật chất trở nên giàu tính lý tưởng, nên cần phân biệt nhu cầu thực với hình ảnh về một cuộc sống “hoàn hảo”.",
    strengths: [
      "Có khả năng đưa cảm hứng vào hình thức hữu hình, bền vững hoặc giàu thẩm mỹ.",
      "Dễ tìm ý nghĩa trong sự đơn giản, ổn định và những giá trị có thể duy trì.",
    ],
    challenges: [
      "Có thể lý tưởng hóa sự an toàn, tiện nghi hoặc một chuẩn sống đẹp.",
      "Dễ bám vào hình ảnh ổn định ngay cả khi thực tế đã thay đổi.",
    ],
    developmentAdvice: [
      "Hãy chuyển các giá trị quan trọng thành lựa chọn có thể quan sát và lặp lại. Phân biệt điều thật sự cần với điều chỉ tạo cảm giác an toàn tạm thời; định kỳ rà soát xem lý tưởng hiện tại còn phù hợp thực tế hay không.",
    ],
  },
  Gemini: {
    summary:
      "Neptune ở Song Tử mô tả lý tưởng thế hệ đi qua ngôn ngữ, thông tin và mạng lưới ý tưởng. Trí tưởng tượng và liên tưởng có thể phong phú, nhưng ranh giới giữa dữ kiện, khả năng và câu chuyện cũng dễ bị làm mờ.",
    strengths: [
      "Dễ kết nối những ý tưởng tưởng như không liên quan.",
      "Có tiềm năng truyền tải hình ảnh, biểu tượng và sắc thái bằng ngôn ngữ linh hoạt.",
    ],
    challenges: [
      "Dễ quá tải bởi nhiều luồng thông tin hoặc cách giải thích cùng lúc.",
      "Có thể nhầm điều nghe hợp lý hoặc gợi cảm xúc với điều đã được kiểm chứng.",
    ],
    developmentAdvice: [
      "Phân biệt rõ ba lớp: dữ kiện, cách diễn giải và giả thuyết. Với thông tin quan trọng, kiểm tra nguồn và diễn đạt lại bằng câu cụ thể trước khi chia sẻ hoặc ra quyết định.",
    ],
  },
  Cancer: {
    summary:
      "Neptune ở Cự Giải mô tả lý tưởng thế hệ về cảm giác thuộc về, gia đình, ký ức và sự chăm sóc. Vị trí này tăng màu sắc cảm xúc và hoài niệm, nhưng cũng dễ lý tưởng hóa quá khứ hoặc hình ảnh về một “mái nhà hoàn hảo”.",
    strengths: [
      "Nhạy với nhu cầu nuôi dưỡng, an toàn cảm xúc và ký ức chung.",
      "Có thể phát triển lòng cảm thông mạnh khi giữ được ranh giới lành mạnh.",
    ],
    challenges: [
      "Có thể lý tưởng hóa gia đình, quê hương hoặc quá khứ.",
      "Dễ hấp thụ bầu không khí xung quanh rồi coi đó hoàn toàn là cảm xúc của mình.",
    ],
    developmentAdvice: [
      "Gọi tên nhu cầu cảm xúc bằng ngôn ngữ cụ thể và phân biệt ký ức với thực tế hiện tại. Khi chăm sóc người khác, giữ một ranh giới rõ về điều mình có thể hỗ trợ và điều người khác cần tự chịu trách nhiệm.",
    ],
  },
  Leo: {
    summary:
      "Neptune ở Sư Tử mô tả lý tưởng thế hệ về sáng tạo, tự biểu đạt và nhu cầu tạo dấu ấn. Sức tưởng tượng có thể mạnh, nhưng hình ảnh “tôi muốn trở thành” hoặc sự công nhận từ người khác cũng dễ được phủ hào quang.",
    strengths: [
      "Có tiềm năng sáng tạo giàu hình ảnh, biểu tượng và cảm hứng.",
      "Khi có kỷ luật, có thể biến hình ảnh nội tâm thành sản phẩm có sức gợi.",
    ],
    challenges: [
      "Có thể lý tưởng hóa hình ảnh cá nhân hoặc sự nổi bật.",
      "Dễ nhầm cảm giác được chú ý với cảm giác được thấu hiểu.",
    ],
    developmentAdvice: [
      "Duy trì một phần sáng tạo không phụ thuộc vào sự công nhận. Đánh giá tác phẩm và lựa chọn bằng tiêu chí nghề/craft cụ thể, đồng thời giữ khoảng cách lành mạnh giữa hình ảnh công khai và giá trị bản thân.",
    ],
  },
  Virgo: {
    summary:
      "Neptune ở Xử Nữ mô tả lý tưởng thế hệ về cải thiện, phục vụ, kỹ năng và tính hữu dụng. Nhu cầu biến lý tưởng thành việc cụ thể có thể mạnh, nhưng cũng dễ tạo một chuẩn “đúng” hoặc “hoàn hảo” khó xác định.",
    strengths: [
      "Có khả năng đưa lòng cảm thông và lý tưởng vào công việc cụ thể.",
      "Có thể kết hợp trực giác với kỹ năng khi tiêu chí thực tế rõ ràng.",
    ],
    challenges: [
      "Dễ theo đuổi một chuẩn hoàn hảo nhưng không biết thế nào là đủ.",
      "Có thể phục vụ quá mức khi giới hạn trách nhiệm không rõ.",
    ],
    developmentAdvice: [
      "Định nghĩa tiêu chuẩn “đủ tốt” bằng tiêu chí có thể quan sát. Chia lý tưởng lớn thành quy trình nhỏ, có điểm dừng, và giữ ranh giới rõ về phần việc mình thực sự chịu trách nhiệm.",
    ],
  },
  Libra: {
    summary:
      "Neptune ở Thiên Bình mô tả lý tưởng thế hệ về quan hệ, công bằng, hòa hợp và thẩm mỹ. Khát vọng kết nối đẹp có thể mạnh, nhưng hình ảnh về “mối quan hệ lý tưởng” cũng dễ che khuất khác biệt và nhu cầu thực tế.",
    strengths: [
      "Dễ hình dung những cách hợp tác mềm mại và giàu đồng cảm.",
      "Nhạy với sắc thái quan hệ, thẩm mỹ và nhiều mặt của một tình huống.",
    ],
    challenges: [
      "Có thể lý tưởng hóa đối tác hoặc sự hòa hợp.",
      "Dễ né xung đột và làm mờ nhu cầu riêng để giữ vẻ cân bằng.",
    ],
    developmentAdvice: [
      "Biến kỳ vọng trong quan hệ thành thỏa thuận cụ thể. Cho phép bất đồng tồn tại mà không coi đó là thất bại, và kiểm tra xem sự hòa hợp đang dựa trên hiểu biết thật hay chỉ trên việc tránh vấn đề.",
    ],
  },
  Scorpio: {
    summary:
      "Neptune ở Bọ Cạp mô tả lý tưởng thế hệ về tin cậy, thân mật, quyền lực và những tầng sâu khó nói thành lời. Độ nhạy với điều ẩn phía dưới có thể mạnh, nhưng trực giác, mong muốn và giả định cũng dễ bị hòa lẫn.",
    strengths: [
      "Có thể tiếp cận chủ đề sâu hoặc khó nói bằng sự cảm thông.",
      "Có khả năng nhìn thấy những tầng ý nghĩa vượt khỏi bề mặt.",
    ],
    challenges: [
      "Có thể lý tưởng hóa sự hòa nhập hoàn toàn hoặc cường độ cảm xúc.",
      "Dễ coi một cảm nhận mạnh là bằng chứng chắc chắn về động cơ người khác.",
    ],
    developmentAdvice: [
      "Đi chậm trong các quyết định đòi hỏi mức tin cậy cao. Phân biệt trực giác với bằng chứng, viết rõ thỏa thuận khi có trách nhiệm chung và tránh biến sự mơ hồ thành câu chuyện chắc chắn về động cơ người khác.",
    ],
  },
  Sagittarius: {
    summary:
      "Neptune ở Nhân Mã mô tả lý tưởng thế hệ về niềm tin, ý nghĩa, triết lý và tầm nhìn rộng. Những câu chuyện lớn có thể truyền cảm hứng mạnh, nhưng ranh giới giữa niềm tin hấp dẫn và điều có bằng chứng cũng dễ trở nên mờ.",
    strengths: [
      "Dễ hình dung những thế giới quan rộng và kết nối nhiều hệ ý nghĩa.",
      "Có khả năng truyền cảm hứng qua triết lý, câu chuyện và tầm nhìn.",
    ],
    challenges: [
      "Có thể lý tưởng hóa một hệ niềm tin, người thầy hoặc “chân lý duy nhất”.",
      "Dễ khái quát quá nhanh từ trải nghiệm thành kết luận rộng.",
    ],
    developmentAdvice: [
      "Ghi rõ đâu là niềm tin, đâu là giả thuyết và đâu là dữ kiện. Chủ động tìm góc nhìn phản biện, đồng thời đánh giá một lý tưởng qua cách nó được thể hiện trong hành vi thực tế chứ không chỉ qua sức hấp dẫn của câu chuyện.",
    ],
  },
  Capricorn: {
    summary:
      "Neptune ở Ma Kết mô tả lý tưởng thế hệ về cấu trúc, thành tựu, thẩm quyền và trách nhiệm. Khát vọng xây một trật tự có ý nghĩa có thể mạnh, nhưng hình ảnh về thành công, địa vị hoặc uy tín cũng dễ được lý tưởng hóa.",
    strengths: [
      "Có khả năng đưa lý tưởng vào cấu trúc và mục tiêu dài hạn.",
      "Khi trách nhiệm rõ, có thể biến tầm nhìn thành quy trình thực tế.",
    ],
    challenges: [
      "Có thể lý tưởng hóa thành công, tổ chức hoặc người có thẩm quyền.",
      "Dễ thất vọng mạnh khi thực tế không giống hình ảnh từng tin tưởng.",
    ],
    developmentAdvice: [
      "Chuyển tầm nhìn thành mục tiêu, trách nhiệm và tiêu chí đo được. Đánh giá tổ chức hoặc người có thẩm quyền qua hành vi và cơ chế chịu trách nhiệm, không chỉ qua hình ảnh, danh tiếng hay lời hứa.",
    ],
  },
  Aquarius: {
    summary:
      "Neptune ở Bảo Bình mô tả lý tưởng thế hệ về tương lai, cộng đồng, mạng lưới và cải cách. Tầm nhìn về một tập thể tốt đẹp hơn có thể rất mạnh, nhưng cũng dễ trở thành không tưởng hoặc làm cá nhân hòa vào lý tưởng nhóm.",
    strengths: [
      "Dễ tưởng tượng các mô hình cộng đồng hoặc hợp tác mới.",
      "Có khả năng kết nối lý tưởng nhân văn với tầm nhìn về tương lai.",
    ],
    challenges: [
      "Có thể lý tưởng hóa cộng đồng, mạng lưới hoặc một viễn cảnh tương lai.",
      "Dễ coi sự đồng thuận của nhóm là bằng chứng cho tính đúng đắn.",
    ],
    developmentAdvice: [
      "Thử nghiệm lý tưởng ở quy mô nhỏ trước khi khái quát. Giữ không gian cho bất đồng, đặt tiêu chí về tác động thực và luôn kiểm tra xem một hệ thống mới đang phục vụ con người cụ thể như thế nào.",
    ],
  },
  Pisces: {
    summary:
      "Neptune ở Song Ngư nhấn mạnh mạnh các chủ đề tưởng tượng, cảm thông, hòa nhập và ranh giới mềm vốn gắn với Neptune trong chiêm tinh hiện đại. Sự tương đồng biểu tượng này có thể làm các chủ đề Neptune nổi bật hơn, nhưng đây vẫn là ảnh hưởng thế hệ chứ không phải kết luận đầy đủ về cá nhân.",
    strengths: [
      "Có tiềm năng tưởng tượng phong phú và tiếp nhận tốt nghệ thuật, biểu tượng, cảm xúc.",
      "Dễ phát triển lòng cảm thông và khả năng chấp nhận những vùng chưa thể giải thích hoàn toàn.",
    ],
    challenges: [
      "Ranh giới giữa cảm nhận, mong muốn và thực tế có thể trở nên rất mềm.",
      "Dễ lý tưởng hóa sự hy sinh hoặc dùng tưởng tượng để tránh áp lực thực tế.",
    ],
    developmentAdvice: [
      "Duy trì các điểm neo thực tế: lịch sinh hoạt, giới hạn trách nhiệm, dữ kiện và phản hồi từ người đáng tin. Cho phép trí tưởng tượng tồn tại nhưng luôn có một kênh chuyển nó thành hành động, sản phẩm hoặc lựa chọn cụ thể.",
    ],
  },
};

const plutoContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Pluto ở Bạch Dương mô tả một lớp thế hệ tái định nghĩa quyền chủ động, ý chí và cách khởi xướng hành động. Áp lực thay đổi có thể thúc đẩy sự quyết đoán, nhưng cũng dễ đẩy tư duy sang cực “phải tự mình kiểm soát”.",
    strengths: [
      "Có khả năng cắt bỏ cách hành động đã mất hiệu quả và bắt đầu lại.",
      "Dễ tập trung sức mạnh vào việc mở đường khi mục tiêu rõ.",
    ],
    challenges: [
      "Có thể cực đoan hóa nhu cầu tự chủ hoặc thắng thế.",
      "Dễ biến bất đồng thành cuộc đấu quyền lực nếu thiếu khoảng lùi.",
    ],
    developmentAdvice: [
      "Phân biệt quyền chủ động với nhu cầu kiểm soát; dùng sức quyết đoán cho mục tiêu cụ thể thay vì phản ứng theo logic thắng–thua.",
    ],
  },
  Taurus: {
    summary:
      "Pluto ở Kim Ngưu mô tả một lớp thế hệ chịu áp lực tái cấu trúc giá trị, nguồn lực và khái niệm về sự ổn định. Vị trí này có thể tạo sức bền lớn, nhưng cũng làm việc buông một cấu trúc quen thuộc trở nên khó khăn.",
    strengths: [
      "Có khả năng xây lại nền tảng giá trị hoặc nguồn lực theo hướng bền hơn.",
      "Sức chịu đựng cao khi theo đuổi thay đổi dài hạn.",
    ],
    challenges: [
      "Có thể giữ chặt tài sản, thói quen hoặc hệ giá trị đã hết phù hợp.",
      "Dễ đồng nhất an toàn với quyền kiểm soát.",
    ],
    developmentAdvice: [
      "Định kỳ xem lại điều gì thực sự còn tạo giá trị; thay đổi từng phần có kiểm chứng thay vì giữ nguyên mọi thứ hoặc phá bỏ toàn bộ.",
    ],
  },
  Gemini: {
    summary:
      "Pluto ở Song Tử mô tả một lớp thế hệ tái cấu trúc cách tạo, phân phối và kiểm soát thông tin. Khả năng đào sâu ý tưởng có thể mạnh, nhưng thông tin cũng dễ trở thành công cụ tạo ảnh hưởng hoặc đấu quyền lực.",
    strengths: [
      "Có khả năng truy tới giả định gốc và đặt lại những câu hỏi nền tảng.",
      "Dễ nhận ra cách ngôn ngữ và thông tin định hình nhận thức tập thể.",
    ],
    challenges: [
      "Có thể nghi ngờ quá mức hoặc tìm “ý nghĩa ẩn” trong mọi thông tin.",
      "Dễ dùng tranh luận như cách giành quyền kiểm soát hơn là tìm hiểu.",
    ],
    developmentAdvice: [
      "Phân biệt bằng chứng, diễn giải và động cơ giả định; ưu tiên minh bạch nguồn và khả năng sửa quan điểm khi có dữ liệu mới.",
    ],
  },
  Cancer: {
    summary:
      "Pluto ở Cự Giải mô tả một lớp thế hệ tái cấu trúc các mô hình về gia đình, thuộc về, an toàn cảm xúc và cội nguồn. Những gì từng được xem là “nơi an toàn” có thể được nhìn lại sâu sắc và thay đổi theo thời gian.",
    strengths: [
      "Có khả năng nhận diện và thay đổi những mô hình chăm sóc đã không còn phù hợp.",
      "Sức bảo vệ và gắn kết có thể rất mạnh khi ranh giới rõ.",
    ],
    challenges: [
      "Có thể giữ chặt ký ức, vai trò gia đình hoặc cảm giác thuộc về.",
      "Dễ dùng bảo vệ như một hình thức kiểm soát nếu lo mất an toàn.",
    ],
    developmentAdvice: [
      "Tách nhu cầu an toàn hiện tại khỏi mô hình kế thừa từ quá khứ; xây cảm giác thuộc về dựa trên ranh giới và trách nhiệm hai chiều.",
    ],
  },
  Leo: {
    summary:
      "Pluto ở Sư Tử mô tả một lớp thế hệ tái định nghĩa quyền lực cá nhân, sáng tạo, sự công nhận và vai trò lãnh đạo. Nhu cầu tạo dấu ấn có thể rất mạnh, nhưng cũng dễ gắn giá trị bản thân với ảnh hưởng hoặc vị thế.",
    strengths: [
      "Có khả năng tái tạo mạnh cách biểu đạt và sử dụng ảnh hưởng cá nhân.",
      "Dễ tập trung nguồn lực lớn vào một công trình sáng tạo hoặc mục tiêu có ý nghĩa.",
    ],
    challenges: [
      "Có thể biến nhu cầu được ghi nhận thành đấu tranh vị thế.",
      "Dễ giữ quá chặt một hình ảnh cá nhân đã không còn phù hợp.",
    ],
    developmentAdvice: [
      "Dùng ảnh hưởng để tạo giá trị thay vì bảo vệ hình tượng; cho phép bản sắc và vai trò lãnh đạo thay đổi theo thực tế.",
    ],
  },
  Virgo: {
    summary:
      "Pluto ở Xử Nữ mô tả một lớp thế hệ tái cấu trúc cách làm việc, phục vụ, tối ưu và xác định điều “đúng”. Sức cải tiến có thể mạnh, nhưng tiêu chuẩn quá cứng dễ biến việc sửa chữa thành kiểm soát chi tiết.",
    strengths: [
      "Có khả năng phát hiện điểm yếu sâu trong quy trình và cải tổ chúng.",
      "Bền bỉ với những thay đổi kỹ thuật cần sự chính xác.",
    ],
    challenges: [
      "Có thể cực đoan hóa nhu cầu tối ưu hoặc loại bỏ sai sót.",
      "Dễ tập trung quá sâu vào chi tiết mà mất mục tiêu chính.",
    ],
    developmentAdvice: [
      "Chọn một số tiêu chí cốt lõi để cải thiện; đặt ngưỡng “đủ tốt” và đo tác động trước khi tiếp tục tối ưu.",
    ],
  },
  Libra: {
    summary:
      "Pluto ở Thiên Bình mô tả một lớp thế hệ tái cấu trúc quyền lực trong quan hệ, thỏa thuận, công bằng và hợp tác. Vị trí này làm nổi bật câu hỏi ai có tiếng nói, ai nhượng bộ và sự cân bằng được duy trì bằng cách nào.",
    strengths: [
      "Có khả năng nhìn sâu vào sự mất cân bằng trong quan hệ hoặc hệ thống hợp tác.",
      "Có thể tái xây thỏa thuận theo hướng minh bạch và công bằng hơn.",
    ],
    challenges: [
      "Có thể biến thương lượng thành đấu quyền lực ngầm.",
      "Dễ duy trì hòa khí bề ngoài trong khi bất cân bằng thật chưa được xử lý.",
    ],
    developmentAdvice: [
      "Làm rõ quyền, trách nhiệm và giới hạn của mỗi bên; đánh giá sự công bằng bằng hành vi và thỏa thuận cụ thể thay vì hình ảnh hòa hợp.",
    ],
  },
  Scorpio: {
    summary:
      "Pluto ở Bọ Cạp nhấn mạnh các chủ đề quyền lực, tin cậy, điều bị che giấu và tái cấu trúc sâu vốn đã gần với biểu tượng Pluto trong chiêm tinh hiện đại. Sự tương đồng này có thể làm các chủ đề Pluto rõ hơn ở tầng thế hệ, nhưng không dùng để chấm điểm “mạnh/yếu” hay kết luận cá nhân.",
    strengths: [
      "Có khả năng đi tới nguyên nhân gốc và xử lý vấn đề khó né tránh.",
      "Sức chịu đựng cao trước những quá trình thay đổi sâu và kéo dài.",
    ],
    challenges: [
      "Có thể cực đoan hóa nhu cầu kiểm soát, bí mật hoặc truy tìm nguyên nhân.",
      "Dễ coi cường độ cảm xúc là bằng chứng rằng một giả định chắc chắn đúng.",
    ],
    developmentAdvice: [
      "Giữ ranh giới rõ giữa trực giác và bằng chứng; chỉ đào sâu khi thông tin đó thực sự giúp giải quyết vấn đề hoặc cải thiện một hệ thống.",
    ],
  },
  Sagittarius: {
    summary:
      "Pluto ở Nhân Mã mô tả một lớp thế hệ tái cấu trúc niềm tin, chân lý, triết lý và các hệ thống ý nghĩa lớn. Sức thuyết phục của một thế giới quan có thể mạnh, nhưng cũng dễ biến niềm tin thành công cụ phân chia hoặc áp đặt.",
    strengths: [
      "Có khả năng chất vấn những hệ tư tưởng đã mất khả năng giải thích thực tế.",
      "Dễ theo đuổi việc tái xây một hệ ý nghĩa sâu và nhất quán hơn.",
    ],
    challenges: [
      "Có thể cực đoan hóa niềm tin hoặc đồng nhất bất đồng với đe dọa.",
      "Dễ dùng “chân lý lớn” để bỏ qua dữ kiện không thuận.",
    ],
    developmentAdvice: [
      "Giữ khả năng phản biện chính niềm tin của mình; đánh giá thế giới quan bằng bằng chứng, hệ quả thực tế và mức độ nó chịu được câu hỏi khó.",
    ],
  },
  Capricorn: {
    summary:
      "Pluto ở Ma Kết mô tả một lớp thế hệ tái cấu trúc quyền lực trong tổ chức, thể chế, thẩm quyền và mục tiêu dài hạn. Vị trí này làm nổi bật những cấu trúc đã mất hiệu quả và câu hỏi ai chịu trách nhiệm khi hệ thống thay đổi.",
    strengths: [
      "Có khả năng nhìn ra điểm yếu nền tảng trong cấu trúc và tổ chức.",
      "Bền bỉ trong việc xây lại hệ thống theo tiêu chuẩn rõ hơn.",
    ],
    challenges: [
      "Có thể đồng nhất quyền lực với kiểm soát hoặc địa vị.",
      "Dễ duy trì một cấu trúc chỉ vì nó từng hiệu quả hoặc có uy tín.",
    ],
    developmentAdvice: [
      "Đánh giá hệ thống qua chức năng và cơ chế chịu trách nhiệm; giữ cái còn hữu ích, loại bỏ phần lỗi thời và tránh thay đổi chỉ để chứng minh quyền lực.",
    ],
  },
  Aquarius: {
    summary:
      "Pluto ở Bảo Bình mô tả một lớp thế hệ tái cấu trúc quyền lực trong mạng lưới, cộng đồng, công nghệ và các mô hình xã hội mới. Câu hỏi trung tâm là quyền lực được phân phối hay tập trung thế nào trong những hệ thống tưởng như phi tập trung.",
    strengths: [
      "Có khả năng nhìn sâu vào cấu trúc quyền lực của mạng lưới và tập thể.",
      "Dễ thúc đẩy việc thay đổi những hệ thống xã hội đã trở nên cứng hoặc lỗi thời.",
    ],
    challenges: [
      "Có thể lý tưởng hóa sức mạnh của tập thể hoặc công nghệ rồi bỏ qua quyền lực ẩn.",
      "Dễ cực đoan hóa đối lập giữa “mới” và “cũ”.",
    ],
    developmentAdvice: [
      "Đánh giá hệ thống mới bằng cách quyền lực thực sự được phân phối, ai có quyền quyết định và cơ chế nào bảo vệ người ít tiếng nói hơn.",
    ],
  },
  Pisces: {
    summary:
      "Pluto ở Song Ngư mô tả một lớp thế hệ tái cấu trúc những ranh giới mơ hồ quanh niềm tin, cảm thông, hình ảnh tập thể và điều khó gọi tên. Vị trí này có thể làm lộ rõ nơi sự hòa nhập giúp kết nối và nơi thiếu ranh giới tạo ra quyền lực không minh bạch.",
    strengths: [
      "Có khả năng nhận ra những cấu trúc vô hình đang ảnh hưởng cảm xúc hoặc niềm tin tập thể.",
      "Có thể tái định nghĩa sự cảm thông theo hướng có ranh giới và trách nhiệm hơn.",
    ],
    challenges: [
      "Dễ gán ý nghĩa sâu cho điều chưa đủ bằng chứng.",
      "Có thể khó nhận diện ai chịu trách nhiệm khi quyền lực bị hòa tan trong một tập thể hoặc lý tưởng.",
    ],
    developmentAdvice: [
      "Đưa điều mơ hồ về tiêu chí cụ thể: ai quyết định, ai chịu trách nhiệm, dữ kiện nào xác nhận vấn đề và ranh giới nào cần được giữ.",
    ],
  },
};

const contentByFactor: Record<
  SocialPlanetInterpretationFactor,
  Record<ZodiacSign, RuleContent>
> = {
  Jupiter: jupiterContent,
  Saturn: saturnContent,
  Uranus: uranusContent,
  Neptune: neptuneContent,
  Pluto: plutoContent,
};

function createRule(
  body: SocialPlanetInterpretationFactor,
  sign: ZodiacSign,
): SocialPlanetInterpretationRule {
  return {
    ruleId: `WESTERN-${body.toUpperCase()}-${sign.toUpperCase()}-V1`,
    version: "1.0.0",
    title: `${factorTitles[body]} ${zodiacSignLabels[sign]}`,
    ...contentByFactor[body][sign],
    evidence: { body, sign },
  };
}

export const westernSocialPlanetInterpretationRules: ReadonlyArray<SocialPlanetInterpretationRule> =
  socialPlanetInterpretationFactors.flatMap((body) =>
    zodiacSigns.map((sign) => createRule(body, sign)),
  );
