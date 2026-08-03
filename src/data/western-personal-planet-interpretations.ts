import {
  zodiacSignLabels,
  zodiacSigns,
  type ZodiacSign,
} from "../lib/western-astrology";

export const personalPlanetInterpretationFactors = ["Mercury", "Venus"] as const;

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
  Venus: "Sao Kim",
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
  Venus: {
    Aries: {
      summary:
        "Sao Kim Bạch Dương có xu hướng thể hiện tình cảm một cách thẳng, nhanh và nhiều sức sống. Bạn thường cảm thấy được trân trọng khi sự yêu thích được bộc lộ rõ ràng, có sự chủ động và có không gian cho cảm giác mới mẻ.",
      strengths: [
        "Dễ tạo cảm giác tươi mới, nhiệt thành và rõ ý trong kết nối",
        "Thường biết khởi động niềm vui chung bằng sự chân thành trực tiếp",
      ],
      challenges: [
        "Đôi khi muốn phản hồi ngay trước khi cảm xúc của cả hai kịp lắng xuống",
        "Có thể thấy khó chịu với nhịp quan hệ quá chậm hoặc quá nhiều vòng vo",
      ],
      developmentAdvice: [
        "Tập hỏi người kia cần nhịp gần gũi nhanh hay chậm trước khi tiến thêm",
        "Giữ sự chủ động nhưng dành thêm chỗ cho sự dịu dàng và lắng nghe",
      ],
    },
    Taurus: {
      summary:
        "Sao Kim Kim Ngưu thường tìm kiếm sự ổn định, cảm giác dễ chịu và những biểu hiện tình cảm có thể chạm thấy trong đời sống hằng ngày. Bạn có xu hướng coi trọng sự bền bỉ, gu thẩm mỹ tinh tế và nhịp kết nối đủ an toàn.",
      strengths: [
        "Biết chăm chút không gian, cơ thể và những điều nhỏ làm quan hệ ấm hơn",
        "Thường đem lại cảm giác đáng tin, kiên nhẫn và có mặt thật sự",
      ],
      challenges: [
        "Đôi khi bám vào vùng quen thuộc dù quan hệ cần đổi mới",
        "Có thể khó nói rõ nhu cầu khi sợ làm xáo trộn sự yên ổn",
      ],
      developmentAdvice: [
        "Cho phép những thay đổi nhỏ, đều đặn thay vì chờ đến khi mọi thứ thật chắc",
        "Nói rõ điều bạn coi trọng để người khác hiểu cách làm bạn thấy được trân trọng",
      ],
    },
    Gemini: {
      summary:
        "Sao Kim Song Tử có xu hướng tìm niềm vui qua trò chuyện, học hỏi và sự linh hoạt trong tương tác. Bạn thường cảm thấy gần gũi hơn khi có thể chia sẻ ý tưởng, đùa vui, đổi góc nhìn và giữ kết nối luôn có sự sống động.",
      strengths: [
        "Dễ làm quan hệ nhẹ nhàng bằng sự tò mò và khả năng trò chuyện",
        "Thường biết kết nối qua chữ nghĩa, câu chuyện và những mối quan tâm chung",
      ],
      challenges: [
        "Đôi khi phân tán khi có quá nhiều lựa chọn hoặc kích thích mới",
        "Có thể dùng sự hài hước để né một cảm xúc cần được gọi tên",
      ],
      developmentAdvice: [
        "Giữ một vài nghi thức kết nối ổn định bên cạnh nhu cầu đổi mới",
        "Khi nói chuyện vui đã đủ, hãy thêm một câu thật lòng về điều bạn đang cần",
      ],
    },
    Cancer: {
      summary:
        "Sao Kim Cự Giải thường coi trọng sự chăm sóc, ký ức chung và cảm giác được bảo bọc trong quan hệ. Bạn có xu hướng thể hiện tình cảm qua sự quan tâm tinh tế, sự nhớ nhung và khả năng tạo một nơi chốn thân thuộc.",
      strengths: [
        "Nhạy với những nhu cầu nhỏ giúp người khác thấy được nâng niu",
        "Thường tạo được bầu không khí ấm, riêng tư và giàu cảm giác thuộc về",
      ],
      challenges: [
        "Đôi khi rút vào im lặng khi cảm thấy chưa được đáp lại đủ dịu dàng",
        "Có thể giữ quá lâu một chuyện cũ nếu nó gắn với cảm giác bị bỏ quên",
      ],
      developmentAdvice: [
        "Nói nhu cầu chăm sóc bằng lời rõ ràng thay vì chỉ chờ người khác tự hiểu",
        "Phân biệt ký ức quý giá với thói quen phòng vệ không còn cần thiết",
      ],
    },
    Leo: {
      summary:
        "Sao Kim Sư Tử có xu hướng yêu thích sự ấm áp, lòng hào phóng và cảm giác được nhìn thấy. Bạn thường tạo hòa hợp bằng sự rạng rỡ, khen ngợi chân thành và mong muốn cùng nhau tận hưởng điều đẹp đẽ có màu sắc riêng.",
      strengths: [
        "Biết làm người khác cảm thấy đặc biệt bằng sự chú ý rộng rãi",
        "Thường đem đến niềm vui, sự sáng tạo và tinh thần ăn mừng trong kết nối",
      ],
      challenges: [
        "Đôi khi nhạy cảm khi thiện ý hoặc nỗ lực của mình không được ghi nhận",
        "Có thể cần học cách để người khác cũng được tỏa sáng theo cách của họ",
      ],
      developmentAdvice: [
        "Nói thẳng điều khiến bạn thấy được trân trọng thay vì thử lòng bằng im lặng",
        "Chia sẻ sân khấu cảm xúc bằng cách hỏi người kia muốn được yêu thương ra sao",
      ],
    },
    Virgo: {
      summary:
        "Sao Kim Xử Nữ thường thể hiện tình cảm qua sự chu đáo, cải thiện đời sống và những hành động nhỏ có ích. Bạn có xu hướng coi trọng sự tinh tế, tính đúng mực và cảm giác rằng yêu thương cũng nằm trong việc chăm sóc chi tiết.",
      strengths: [
        "Nhận ra điều nhỏ cần sửa để không gian chung dễ chịu hơn",
        "Thường yêu bằng sự tận tâm, thực tế và đáng tin trong ngày thường",
      ],
      challenges: [
        "Đôi khi soi lỗi quá kỹ khiến niềm vui tự nhiên bị thu hẹp",
        "Có thể ngại nhận lời khen hoặc sự chăm sóc khi chưa thấy mình đủ tốt",
      ],
      developmentAdvice: [
        "Cho phép sự không hoàn hảo có chỗ đứng trong những khoảnh khắc thân mật",
        "Cân bằng góp ý bằng lời ghi nhận cụ thể về điều đang hoạt động tốt",
      ],
    },
    Libra: {
      summary:
        "Sao Kim Thiên Bình thường tìm kiếm sự hài hòa, công bằng và vẻ đẹp trong cách hai bên gặp nhau. Bạn có xu hướng coi trọng sự tinh tế trong ứng xử, khả năng lắng nghe lẫn nhau và những lựa chọn giúp quan hệ cân bằng hơn.",
      strengths: [
        "Giỏi tạo không gian lịch thiệp, dễ chịu và có tính hợp tác",
        "Thường nhìn được nhu cầu của hai phía trong một tương tác",
      ],
      challenges: [
        "Đôi khi né bất đồng vì muốn giữ bầu khí yên đẹp",
        "Có thể đặt sự vừa lòng của người khác lên trước mong muốn thật của mình",
      ],
      developmentAdvice: [
        "Nêu rõ điều bạn thích trước khi tìm điểm cân bằng chung",
        "Xem xung đột nhỏ như cơ hội chỉnh nhịp chứ không phải dấu hiệu mất hòa hợp",
      ],
    },
    Scorpio: {
      summary:
        "Sao Kim Bọ Cạp có xu hướng tìm kiếm sự sâu sắc, trung thực cảm xúc và cảm giác kết nối có chiều sâu. Bạn thường coi trọng sự tin cậy, khả năng hiện diện qua những lớp khó nói và vẻ đẹp của điều chân thật, không hời hợt.",
      strengths: [
        "Có sức hiện diện mạnh khi một kết nối cần sự chân thành sâu",
        "Thường nhận ra sắc thái ẩn bên dưới lời nói và cử chỉ",
      ],
      challenges: [
        "Đôi khi kiểm soát thông tin hoặc cảm xúc khi chưa thấy đủ an toàn",
        "Có thể đọc một khoảng im lặng như dấu hiệu căng thẳng hơn mức thực tế",
      ],
      developmentAdvice: [
        "Tạo lòng tin bằng các bước chia sẻ vừa sức thay vì đòi mọi thứ rõ ngay",
        "Kiểm tra cảm nhận bằng câu hỏi mềm trước khi kết luận về động cơ của người khác",
      ],
    },
    Sagittarius: {
      summary:
        "Sao Kim Nhân Mã thường tìm niềm vui trong sự rộng mở, trải nghiệm và cảm giác cùng nhau lớn lên. Bạn có xu hướng coi trọng sự tự do, tinh thần học hỏi và những kết nối giúp cuộc sống có thêm ý nghĩa.",
      strengths: [
        "Dễ đem lại sự lạc quan, thẳng thắn và cảm giác phiêu lưu lành mạnh",
        "Thường yêu thích những quan hệ có không gian khám phá và phát triển",
      ],
      challenges: [
        "Đôi khi bỏ qua chi tiết thân gần vì đang nhìn về chân trời xa hơn",
        "Có thể vô tình nói quá thẳng khi người kia cần sự mềm mại trước",
      ],
      developmentAdvice: [
        "Kết nối tự do với cam kết cụ thể về cách bạn vẫn hiện diện",
        "Chậm lại để hỏi điều gì giúp người kia thấy an tâm trong hành trình chung",
      ],
    },
    Capricorn: {
      summary:
        "Sao Kim Ma Kết thường coi trọng sự chín chắn, trách nhiệm và những biểu hiện tình cảm có độ bền. Bạn có xu hướng tìm sự hòa hợp qua cam kết thực tế, cách cư xử đáng tin và vẻ đẹp của những điều được xây dựng có thời gian.",
      strengths: [
        "Thường thể hiện sự quan tâm bằng hành động có trách nhiệm và bền bỉ",
        "Có gu thẩm mỹ tiết chế, chất lượng và tôn trọng giá trị lâu dài",
      ],
      challenges: [
        "Đôi khi khó thả lỏng để nhận niềm vui đơn giản mà chưa có mục tiêu rõ",
        "Có thể nghe dè dặt khi thật ra đang cố bảo vệ điều mình coi trọng",
      ],
      developmentAdvice: [
        "Tập gọi tên sự quý mến bằng lời ấm hơn bên cạnh hành động đáng tin",
        "Cho phép quan hệ có những khoảnh khắc vui nhẹ không cần chứng minh hiệu quả",
      ],
    },
    Aquarius: {
      summary:
        "Sao Kim Bảo Bình có xu hướng coi trọng tình bạn, sự tự do và nét khác biệt trong kết nối. Bạn thường tìm thấy vẻ đẹp ở sự độc đáo, các giá trị tiến bộ và những quan hệ cho phép mỗi người vẫn là chính mình.",
      strengths: [
        "Dễ tôn trọng khác biệt và tạo không gian cho cá tính riêng",
        "Thường kết nối qua lý tưởng, cộng đồng hoặc góc nhìn mới mẻ",
      ],
      challenges: [
        "Đôi khi giữ khoảng cách trí óc khi người khác cần tín hiệu ấm áp hơn",
        "Có thể ưu tiên nguyên tắc tự do mà quên một nghi thức gần gũi cụ thể",
      ],
      developmentAdvice: [
        "Thêm những cử chỉ đều đặn để sự tự do vẫn có cảm giác được chăm sóc",
        "Nói rõ nhu cầu khoảng riêng cùng lúc xác nhận sự trân trọng dành cho người kia",
      ],
    },
    Pisces: {
      summary:
        "Sao Kim Song Ngư thường tìm kiếm sự dịu dàng, đồng cảm và vẻ đẹp giàu tưởng tượng trong quan hệ. Bạn có xu hướng thể hiện tình cảm qua lòng bao dung, nghệ thuật, sự lắng nghe mềm và khả năng cảm nhận điều khó nói thành lời.",
      strengths: [
        "Dễ tạo cảm giác được thấu hiểu bằng sự mềm mại và lòng trắc ẩn",
        "Thường có gu thẩm mỹ mộng, tinh tế và giàu cảm xúc",
      ],
      challenges: [
        "Đôi khi lý tưởng hóa một kết nối trước khi nhìn đủ dữ kiện thực tế",
        "Có thể khó nói ranh giới vì sợ làm mất đi sự dịu dàng",
      ],
      developmentAdvice: [
        "Giữ lòng mở nhưng đặt ranh giới cụ thể về thời gian, năng lượng và kỳ vọng",
        "Chuyển cảm nhận mơ hồ thành một đề nghị rõ để người khác có thể đáp lại",
      ],
    },
  },
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
