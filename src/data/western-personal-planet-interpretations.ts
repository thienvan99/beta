import {
  zodiacSignLabels,
  zodiacSigns,
  type ZodiacSign,
} from "../lib/western-astrology";

export const personalPlanetInterpretationFactors = ["Mercury"] as const;

export type PersonalPlanetInterpretationFactor =
  (typeof personalPlanetInterpretationFactors)[number];

export type PersonalPlanetInterpretationRule = Readonly<{
  ruleId: string;
  version: "1.0.0";
  title: string;
  summary: string;
  strengths: ReadonlyArray<string>;
  challenges: ReadonlyArray<string>;
  developmentAdvice: ReadonlyArray<string>;
  evidence: Readonly<{
    body: PersonalPlanetInterpretationFactor;
    sign: ZodiacSign;
  }>;
}>;

type RuleContent = Omit<
  PersonalPlanetInterpretationRule,
  "ruleId" | "version" | "title" | "evidence"
>;

const factorTitles: Record<PersonalPlanetInterpretationFactor, string> = {
  Mercury: "Sao Thủy",
};

const mercuryContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Tư duy có xu hướng nhanh, trực diện và dễ bật thành hành động. Bạn thường nắm vấn đề tốt khi được thử ngay, nói thẳng ý chính và có không gian để tự đưa ra quyết định.",
    strengths: [
      "Diễn đạt ý tưởng rõ và có lực khởi động",
      "Nhanh nhận ra bước đầu tiên cần làm",
    ],
    challenges: [
      "Có thể phản hồi quá nhanh trước khi nghe đủ dữ kiện",
      "Dễ thiếu kiên nhẫn với cuộc trao đổi vòng vo",
    ],
    developmentAdvice: [
      "Dành một nhịp tóm tắt lại điều đã nghe trước khi kết luận",
      "Ghi nhanh các giả định để kiểm chứng thay vì hành động chỉ theo xung lực đầu tiên",
    ],
  },
  Taurus: {
    summary:
      "Tư duy thường đi theo nhịp chắc chắn, thực tế và cần cảm giác có căn cứ. Bạn có thể học tốt khi thông tin được gắn với ví dụ cụ thể, giá trị sử dụng và thời gian tiêu hóa đủ lâu.",
    strengths: [
      "Ghi nhớ bền khi đã hiểu bản chất thực tế",
      "Diễn đạt bình tĩnh, đáng tin và có trọng lượng",
    ],
    challenges: [
      "Có thể chậm đổi quan điểm khi dữ kiện mới xuất hiện",
      "Dễ ngại các cuộc trao đổi quá nhanh hoặc thiếu nền tảng",
    ],
    developmentAdvice: [
      "Tách việc cần ổn định khỏi việc có thể thử nghiệm nhỏ",
      "Đặt lịch xem lại quan điểm sau khi có thêm dữ liệu",
    ],
  },
  Gemini: {
    summary:
      "Tư duy có xu hướng linh hoạt, tò mò và thích kết nối nhiều mẩu thông tin. Bạn thường sáng lên khi được hỏi, trao đổi, đọc, viết hoặc chuyển đổi giữa các góc nhìn khác nhau.",
    strengths: [
      "Tiếp nhận thông tin nhanh và dễ thấy mối liên hệ",
      "Giao tiếp linh hoạt theo người nghe và bối cảnh",
    ],
    challenges: [
      "Có thể phân tán khi quá nhiều chủ đề cùng hấp dẫn",
      "Dễ dừng ở mức ý tưởng trước khi đi vào cam kết cụ thể",
    ],
    developmentAdvice: [
      "Chọn một số câu hỏi trọng tâm trước khi mở rộng tìm hiểu",
      "Kết thúc mỗi cuộc trao đổi bằng bước tiếp theo rõ ràng",
    ],
  },
  Cancer: {
    summary:
      "Tư duy thường gắn với trí nhớ cảm xúc, bối cảnh thân quen và khả năng lắng nghe bầu không khí. Bạn có thể truyền đạt tốt khi lời nói giữ được sự quan tâm và cảm giác an toàn.",
    strengths: [
      "Nhạy với sắc thái cảm xúc trong giao tiếp",
      "Ghi nhớ tốt các câu chuyện, liên hệ và chi tiết có ý nghĩa riêng",
    ],
    challenges: [
      "Có thể giữ im lặng khi cảm thấy không được đón nhận",
      "Dễ để tâm trạng ảnh hưởng đến cách diễn giải thông tin",
    ],
    developmentAdvice: [
      "Phân biệt dữ kiện với cảm xúc mà dữ kiện đó gợi lên",
      "Nói rõ nhu cầu giao tiếp trước khi tự rút vào phòng vệ",
    ],
  },
  Leo: {
    summary:
      "Tư duy có xu hướng biểu đạt ấm áp, tự tin và thích tạo dấu ấn riêng. Bạn thường thuyết phục tốt khi được kể chuyện, trình bày ý tưởng sáng tạo hoặc nói từ điều mình thật sự tin.",
    strengths: [
      "Có sức truyền cảm hứng khi trình bày",
      "Biết làm cho thông tin trở nên sống động và dễ nhớ",
    ],
    challenges: [
      "Có thể nhạy cảm khi ý tưởng bị phê bình",
      "Dễ tập trung vào cách thể hiện hơn phần phản hồi cần lắng nghe",
    ],
    developmentAdvice: [
      "Tách giá trị bản thân khỏi bản nháp của một ý tưởng",
      "Mời phản hồi cụ thể để làm nội dung sắc hơn",
    ],
  },
  Virgo: {
    summary:
      "Tư duy thường phân tích, quan sát chi tiết và muốn làm rõ điều hữu ích. Bạn có thể mạnh ở việc chỉnh sửa, sắp xếp, kiểm tra lỗi và biến ý tưởng rộng thành quy trình thực tế.",
    strengths: [
      "Nhìn ra điểm cần cải thiện trong hệ thống",
      "Diễn đạt chính xác, có trật tự và hướng tới giải pháp",
    ],
    challenges: [
      "Có thể tự kiểm duyệt quá lâu trước khi chia sẻ",
      "Dễ tập trung vào lỗi nhỏ mà quên mục tiêu lớn",
    ],
    developmentAdvice: [
      "Xác định mức đủ tốt cho từng ngữ cảnh giao tiếp",
      "Bắt đầu bằng bức tranh chung rồi mới đi vào chi tiết",
    ],
  },
  Libra: {
    summary:
      "Tư duy có xu hướng cân nhắc nhiều phía, tìm ngôn ngữ hòa nhã và ưu tiên đối thoại công bằng. Bạn thường phát huy khi có người cùng trao đổi để mài sắc quan điểm.",
    strengths: [
      "Nhìn được lập luận của nhiều bên",
      "Biết dùng lời nói để tạo không gian hợp tác",
    ],
    challenges: [
      "Có thể do dự vì muốn mọi ý kiến đều được hài lòng",
      "Dễ làm mềm lập trường riêng quá mức trong đối thoại",
    ],
    developmentAdvice: [
      "Viết ra tiêu chí cá nhân trước khi thương lượng",
      "Nói rõ điểm đồng ý và điểm chưa đồng ý trong cùng một cuộc trao đổi",
    ],
  },
  Scorpio: {
    summary:
      "Tư duy thường đào sâu, quan sát động cơ ẩn và cần sự thật có chiều sâu. Bạn có thể rất sắc bén khi nghiên cứu, đặt câu hỏi khó hoặc xử lý thông tin nhạy cảm với sự kín đáo.",
    strengths: [
      "Tập trung tốt vào vấn đề phức tạp",
      "Nhạy với điều chưa được nói ra trong giao tiếp",
    ],
    challenges: [
      "Có thể nghi ngờ hoặc giữ thông tin quá chặt khi chưa tin",
      "Dễ diễn giải một trao đổi theo hướng quá căng thẳng",
    ],
    developmentAdvice: [
      "Kiểm tra giả định bằng câu hỏi trực tiếp nhưng vừa đủ mềm",
      "Chia sẻ mức thông tin phù hợp thay vì giữ im lặng hoàn toàn",
    ],
  },
  Sagittarius: {
    summary:
      "Tư duy có xu hướng tìm ý nghĩa rộng, học qua trải nghiệm và nói thẳng điều mình nhìn thấy. Bạn thường truyền đạt tốt khi được kết nối kiến thức với niềm tin, hành trình hoặc bức tranh lớn.",
    strengths: [
      "Nhìn nhanh ra hướng đi và ý nghĩa tổng thể",
      "Giao tiếp cởi mở, khích lệ và giàu tinh thần học hỏi",
    ],
    challenges: [
      "Có thể bỏ qua chi tiết làm thay đổi kết luận",
      "Dễ nói quá rộng hoặc quá thẳng so với bối cảnh",
    ],
    developmentAdvice: [
      "Kiểm tra dữ kiện nhỏ trước khi mở rộng thành kết luận lớn",
      "Điều chỉnh mức thẳng thắn theo nhu cầu của người nghe",
    ],
  },
  Capricorn: {
    summary:
      "Tư duy thường thực tế, có cấu trúc và hướng đến kết quả có thể kiểm chứng. Bạn có thể giao tiếp tốt khi mục tiêu rõ, trách nhiệm phân minh và thông tin được xếp theo thứ tự ưu tiên.",
    strengths: [
      "Lập luận có tổ chức và đáng tin",
      "Giỏi biến ý tưởng thành kế hoạch có bước thực hiện",
    ],
    challenges: [
      "Có thể tự giới hạn ý tưởng vì quá chú ý rủi ro",
      "Dễ nghe nghiêm hoặc khô khi đang tập trung vào hiệu quả",
    ],
    developmentAdvice: [
      "Chừa chỗ cho giả thuyết thử nghiệm trước khi đánh giá tính khả thi",
      "Bổ sung bối cảnh cảm xúc khi trao đổi các quyết định quan trọng",
    ],
  },
  Aquarius: {
    summary:
      "Tư duy có xu hướng độc lập, hệ thống và thích nhìn vấn đề theo cách khác thông lệ. Bạn thường mạnh khi kết nối ý tưởng với cộng đồng, công nghệ hoặc một mô hình cải tiến rộng hơn.",
    strengths: [
      "Suy nghĩ nguyên bản và dễ thấy cấu trúc hệ thống",
      "Trao đổi khách quan khi cần giữ khoảng cách với cảm xúc",
    ],
    challenges: [
      "Có thể trở nên xa cách khi người khác cần phản hồi cảm xúc",
      "Dễ ưu tiên lý thuyết hay nguyên tắc hơn trải nghiệm cụ thể",
    ],
    developmentAdvice: [
      "Gắn ý tưởng cải tiến với nhu cầu thật của người liên quan",
      "Thêm tín hiệu cảm xúc rõ ràng trong các cuộc trao đổi thân gần",
    ],
  },
  Pisces: {
    summary:
      "Tư duy thường trực giác, liên tưởng và nhạy với tầng nghĩa tinh tế. Bạn có thể diễn đạt tốt qua hình ảnh, âm nhạc, câu chuyện hoặc ngôn ngữ mềm giúp người khác cảm nhận thay vì chỉ hiểu bằng lý trí.",
    strengths: [
      "Giàu tưởng tượng và cảm nhận sắc thái khó gọi tên",
      "Giao tiếp đồng cảm, mềm mại và dễ xoa dịu",
    ],
    challenges: [
      "Có thể khó giữ ranh giới giữa dữ kiện và cảm nhận",
      "Dễ mơ hồ khi cần quyết định hoặc truyền đạt yêu cầu cụ thể",
    ],
    developmentAdvice: [
      "Chuyển trực giác thành câu ngắn và ví dụ cụ thể",
      "Ghi lại quyết định, thời hạn và trách nhiệm sau các cuộc trao đổi",
    ],
  },
};

const contentByFactor: Record<
  PersonalPlanetInterpretationFactor,
  Record<ZodiacSign, RuleContent>
> = {
  Mercury: mercuryContent,
};

function createRule(
  body: PersonalPlanetInterpretationFactor,
  sign: ZodiacSign,
): PersonalPlanetInterpretationRule {
  return {
    ruleId: `WESTERN-${body.toUpperCase()}-${sign.toUpperCase()}-V1`,
    version: "1.0.0",
    title: `${factorTitles[body]} ${zodiacSignLabels[sign]}`,
    ...contentByFactor[body][sign],
    evidence: { body, sign },
  };
}

export const westernPersonalPlanetInterpretationRules: ReadonlyArray<PersonalPlanetInterpretationRule> =
  personalPlanetInterpretationFactors.flatMap((body) =>
    zodiacSigns.map((sign) => createRule(body, sign)),
  );
