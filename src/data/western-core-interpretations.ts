import {
  zodiacSignLabels,
  zodiacSigns,
  type ZodiacSign,
} from "../lib/western-astrology";

export const coreInterpretationFactors = ["Sun", "Moon", "ASC"] as const;

export type CoreInterpretationFactor =
  (typeof coreInterpretationFactors)[number];

export type ZodiacElement = "Lửa" | "Đất" | "Khí" | "Nước";
export type ZodiacModality = "Tiên phong" | "Kiên định" | "Linh hoạt";

export type CoreInterpretationRule = Readonly<{
  ruleId: string;
  title: string;
  summary: string;
  strengths: ReadonlyArray<string>;
  challenges: ReadonlyArray<string>;
  developmentAdvice: ReadonlyArray<string>;
  evidence: Readonly<{
    body: CoreInterpretationFactor;
    sign: ZodiacSign;
  }>;
  version: "1.0.0";
}>;

type RuleContent = Omit<
  CoreInterpretationRule,
  "ruleId" | "title" | "evidence" | "version"
>;

export const zodiacSignQualities: Record<
  ZodiacSign,
  Readonly<{ element: ZodiacElement; modality: ZodiacModality }>
> = {
  Aries: { element: "Lửa", modality: "Tiên phong" },
  Taurus: { element: "Đất", modality: "Kiên định" },
  Gemini: { element: "Khí", modality: "Linh hoạt" },
  Cancer: { element: "Nước", modality: "Tiên phong" },
  Leo: { element: "Lửa", modality: "Kiên định" },
  Virgo: { element: "Đất", modality: "Linh hoạt" },
  Libra: { element: "Khí", modality: "Tiên phong" },
  Scorpio: { element: "Nước", modality: "Kiên định" },
  Sagittarius: { element: "Lửa", modality: "Linh hoạt" },
  Capricorn: { element: "Đất", modality: "Tiên phong" },
  Aquarius: { element: "Khí", modality: "Kiên định" },
  Pisces: { element: "Nước", modality: "Linh hoạt" },
};

const factorTitles: Record<CoreInterpretationFactor, string> = {
  Sun: "Mặt Trời",
  Moon: "Mặt Trăng",
  ASC: "Cung Mọc",
};

const sunContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary:
      "Bản sắc có xu hướng được tiếp sức bởi sự chủ động, tinh thần bắt đầu và mong muốn tự mình thử sức. Bạn thường thấy rõ động lực khi có một mục tiêu trực tiếp để tiến tới.",
    strengths: ["Dám khởi xướng và phản ứng nhanh", "Thẳng thắn với điều mình mong muốn"],
    challenges: ["Có thể nóng vội khi tiến độ chậm", "Dễ mất hứng sau giai đoạn mở đầu"],
    developmentAdvice: ["Chia mục tiêu thành chặng ngắn có điểm hoàn tất", "Dành một nhịp kiểm tra tác động trước khi hành động"],
  },
  Taurus: {
    summary:
      "Bản sắc thường gắn với sự ổn định, tính thực tế và khả năng bền bỉ xây dựng điều có giá trị. Bạn có thể phát huy tốt nhất khi được đi theo nhịp chắc chắn của riêng mình.",
    strengths: ["Kiên trì và đáng tin cậy", "Nhạy với giá trị thực tế và chất lượng"],
    challenges: ["Có thể chậm thích nghi với thay đổi", "Dễ giữ một lựa chọn lâu hơn mức cần thiết"],
    developmentAdvice: ["Thử thay đổi bằng những bước nhỏ có thể kiểm soát", "Phân biệt sự kiên định với việc ngại rời vùng quen thuộc"],
  },
  Gemini: {
    summary:
      "Bản sắc có xu hướng phát triển qua học hỏi, trao đổi và kết nối nhiều góc nhìn. Sự tò mò thường là nguồn động lực giúp bạn làm mới chính mình.",
    strengths: ["Tiếp nhận thông tin nhanh và linh hoạt", "Diễn đạt ý tưởng theo nhiều cách"],
    challenges: ["Có thể phân tán giữa quá nhiều mối quan tâm", "Dễ dừng ở bề rộng trước khi đi vào chiều sâu"],
    developmentAdvice: ["Chọn một vài chủ đề để theo đuổi đến sản phẩm cụ thể", "Dành khoảng yên tĩnh để tổng hợp điều đã học"],
  },
  Cancer: {
    summary:
      "Bản sắc thường được nuôi dưỡng bởi cảm giác thuộc về, sự chăm sóc và mối liên hệ với người thân hoặc ký ức. Bạn có thể thể hiện sức mạnh qua khả năng tạo nơi chốn an toàn cho mình và người khác.",
    strengths: ["Tinh tế với nhu cầu của tập thể", "Có khả năng nuôi dưỡng và duy trì gắn kết"],
    challenges: ["Có thể thu mình khi cảm thấy không được đón nhận", "Dễ mang trách nhiệm cảm xúc thay cho người khác"],
    developmentAdvice: ["Xác định rõ ranh giới giữa quan tâm và gánh thay", "Tạo nguồn an toàn nội tại bên cạnh sự công nhận từ bên ngoài"],
  },
  Leo: {
    summary:
      "Bản sắc có xu hướng tỏa sáng qua sáng tạo, lòng tự trọng và mong muốn đóng góp bằng dấu ấn riêng. Bạn thường có thêm sinh lực khi được biểu đạt chân thành và được nhìn nhận đúng mức.",
    strengths: ["Ấm áp, hào phóng và có sức truyền cảm hứng", "Can đảm đứng ra thể hiện điều mình tin"],
    challenges: ["Có thể nhạy cảm khi nỗ lực không được ghi nhận", "Dễ gắn giá trị bản thân với vai trò nổi bật"],
    developmentAdvice: ["Nuôi dưỡng niềm vui sáng tạo kể cả khi không có khán giả", "Chia sẻ không gian thể hiện với người khác"],
  },
  Virgo: {
    summary:
      "Bản sắc thường tìm thấy ý nghĩa trong việc cải thiện, phục vụ và làm cho hệ thống vận hành tốt hơn. Bạn có thể tự tin hơn khi kỹ năng của mình tạo ra kết quả hữu ích, cụ thể.",
    strengths: ["Quan sát chi tiết và giải quyết vấn đề thực tế", "Có tinh thần trách nhiệm với chất lượng"],
    challenges: ["Có thể tự phê bình quá mức", "Dễ trì hoãn vì muốn mọi thứ đủ hoàn chỉnh"],
    developmentAdvice: ["Đặt tiêu chuẩn phù hợp với mục đích của từng việc", "Ghi nhận tiến bộ thay vì chỉ nhìn phần chưa đạt"],
  },
  Libra: {
    summary:
      "Bản sắc có xu hướng được định hình qua đối thoại, sự công bằng và khả năng tạo hòa hợp. Bạn thường phát huy tốt khi vừa kết nối với người khác vừa giữ được quan điểm riêng.",
    strengths: ["Nhìn được nhiều phía của một vấn đề", "Có duyên kết nối và tạo không khí hợp tác"],
    challenges: ["Có thể do dự để tránh làm ai đó thất vọng", "Dễ điều chỉnh mình quá nhiều theo phản hồi bên ngoài"],
    developmentAdvice: ["Xác định tiêu chí cá nhân trước khi tham khảo ý kiến", "Tập nói rõ bất đồng bằng ngôn ngữ tôn trọng"],
  },
  Scorpio: {
    summary:
      "Bản sắc thường hướng tới chiều sâu, sự chân thật và khả năng chuyển hóa sau những trải nghiệm mạnh. Bạn có thể có động lực lớn khi được dồn tâm sức cho điều thực sự có ý nghĩa.",
    strengths: ["Tập trung sâu và kiên cường trước áp lực", "Nhạy với động lực ẩn dưới bề mặt"],
    challenges: ["Có thể giữ kín quá lâu hoặc khó trao niềm tin", "Dễ rơi vào cách nhìn tất cả hoặc không gì cả"],
    developmentAdvice: ["Xây dựng niềm tin theo từng bước có kiểm chứng", "Cho phép những thay đổi nhỏ thay vì chờ một cuộc lột xác lớn"],
  },
  Sagittarius: {
    summary:
      "Bản sắc có xu hướng lớn lên qua khám phá, niềm tin và việc mở rộng tầm nhìn. Bạn thường được tiếp sức khi thấy cuộc sống còn không gian để học, đi và tìm ý nghĩa.",
    strengths: ["Lạc quan và nhìn được bức tranh rộng", "Sẵn sàng thử trải nghiệm mới"],
    challenges: ["Có thể hứa nhiều hơn khả năng theo đến cùng", "Dễ bỏ qua chi tiết hoặc cảm xúc tinh tế"],
    developmentAdvice: ["Gắn tầm nhìn lớn với cam kết cụ thể", "Kiểm tra sự thật và tác động trước khi nói thẳng"],
  },
  Capricorn: {
    summary:
      "Bản sắc thường được xây dựng qua trách nhiệm, năng lực và những thành quả có cấu trúc. Bạn có thể cảm thấy vững vàng khi biết mình đang tiến từng bước về một mục tiêu dài hạn.",
    strengths: ["Kỷ luật và có khả năng tổ chức", "Bền bỉ trước mục tiêu dài hạn"],
    challenges: ["Có thể tự tạo áp lực thành tích", "Dễ xem nghỉ ngơi là điều phải kiếm được"],
    developmentAdvice: ["Đưa thời gian hồi phục vào kế hoạch như một nguồn lực", "Định nghĩa thành công bằng cả chất lượng sống"],
  },
  Aquarius: {
    summary:
      "Bản sắc có xu hướng tìm sự tự do trong tư duy, tính nguyên bản và đóng góp cho một cộng đồng rộng hơn. Bạn thường có động lực khi được nhìn vấn đề theo cách khác thông lệ.",
    strengths: ["Độc lập trong suy nghĩ và giàu ý tưởng", "Quan tâm đến lợi ích chung và hệ thống"],
    challenges: ["Có thể giữ khoảng cách khi cảm xúc trở nên phức tạp", "Dễ phản đối khuôn mẫu chỉ vì chúng là khuôn mẫu"],
    developmentAdvice: ["Kết nối ý tưởng cải tiến với nhu cầu cụ thể của con người", "Cho phép mình tham gia cảm xúc thay vì chỉ quan sát"],
  },
  Pisces: {
    summary:
      "Bản sắc thường được nuôi dưỡng bởi trí tưởng tượng, lòng trắc ẩn và cảm nhận về sự liên kết. Bạn có thể phát huy tốt khi trực giác được nâng đỡ bởi một hình thức biểu đạt rõ ràng.",
    strengths: ["Đồng cảm và giàu khả năng sáng tạo", "Cảm nhận tinh tế những điều khó gọi tên"],
    challenges: ["Có thể khó phân biệt nhu cầu của mình với môi trường", "Dễ trì hoãn khi mục tiêu thiếu cấu trúc"],
    developmentAdvice: ["Tạo ranh giới và lịch trình nhẹ nhưng nhất quán", "Đưa cảm hứng thành một hành động nhỏ có thể hoàn tất"],
  },
};

const moonContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary: "Cảm xúc có xu hướng đến nhanh và cần được chuyển thành hành động trực tiếp. Cảm giác an toàn thường tăng lên khi bạn có quyền chủ động và không phải giữ bức xúc quá lâu.",
    strengths: ["Thành thật với phản ứng tức thời", "Phục hồi nhanh khi được tự do hành động"],
    challenges: ["Có thể phản ứng trước khi hiểu hết cảm xúc", "Dễ sốt ruột với nhu cầu chậm rãi của người khác"],
    developmentAdvice: ["Tạo một khoảng dừng ngắn trước quyết định quan trọng", "Dùng vận động hoặc việc cụ thể để điều hòa năng lượng"],
  },
  Taurus: {
    summary: "Nhu cầu an toàn thường gắn với nhịp sống ổn định, cảm giác dễ chịu và những điều quen thuộc có thể tin cậy. Bạn có xu hướng xử lý cảm xúc từ từ nhưng khá bền.",
    strengths: ["Giữ bình tĩnh và tạo cảm giác vững chãi", "Trung thành với những gắn kết đã được xây dựng"],
    challenges: ["Có thể nén khó chịu để tránh xáo trộn", "Dễ bám vào thói quen khi hoàn cảnh đã thay đổi"],
    developmentAdvice: ["Nói ra nhu cầu trước khi sự khó chịu tích tụ", "Chuẩn bị trước các bước chuyển đổi để cơ thể có thời gian thích nghi"],
  },
  Gemini: {
    summary: "Cảm xúc thường được xử lý qua ngôn ngữ, trao đổi và việc gọi tên điều đang diễn ra. Sự đa dạng trong giao tiếp có thể giúp bạn thấy nhẹ và linh hoạt hơn.",
    strengths: ["Diễn đạt cảm xúc bằng nhiều góc nhìn", "Nhanh tìm thấy thông tin hoặc kết nối hỗ trợ"],
    challenges: ["Có thể phân tích thay cho việc cảm nhận", "Dễ đổi chủ đề khi cảm xúc trở nên nặng"],
    developmentAdvice: ["Dành thời gian nhận biết cảm giác cơ thể trước khi lý giải", "Chọn một người hoặc một kênh để trao đổi đến nơi đến chốn"],
  },
  Cancer: {
    summary: "Đời sống cảm xúc có xu hướng sâu, giàu ký ức và cần cảm giác thân thuộc. Bạn thường thấy an toàn khi được chăm sóc lẫn nhau trong một không gian có sự tin cậy.",
    strengths: ["Nhạy cảm với bầu không khí và nhu cầu gần gũi", "Có khả năng chăm sóc bằng sự hiện diện"],
    challenges: ["Có thể thu mình hoặc vòng vo khi bị tổn thương", "Dễ mang tâm trạng của người thân vào mình"],
    developmentAdvice: ["Nói rõ nhu cầu thay vì chờ người khác tự hiểu", "Duy trì một nghi thức riêng giúp trở về trạng thái cân bằng"],
  },
  Leo: {
    summary: "Cảm xúc có xu hướng cần sự ấm áp, lòng trung thành và cảm giác được trân trọng. Bạn thường hồi phục tốt khi có thể biểu đạt chân thành mà không bị xem nhẹ.",
    strengths: ["Hào phóng và biết nâng tinh thần người khác", "Giữ lòng trung thành với người mình quý"],
    challenges: ["Có thể che tổn thương bằng tự ái", "Dễ phụ thuộc vào sự ghi nhận để thấy mình được yêu quý"],
    developmentAdvice: ["Chia sẻ phần dễ tổn thương bằng lời nói trực tiếp", "Tự ghi nhận cảm xúc trước khi tìm phản hồi bên ngoài"],
  },
  Virgo: {
    summary: "Cảm xúc thường được làm dịu khi cuộc sống có trật tự, việc cần làm rõ ràng và bạn cảm thấy mình hữu ích. Chăm sóc thực tế có thể là ngôn ngữ tình cảm tự nhiên của bạn.",
    strengths: ["Nhận ra chi tiết có thể cải thiện sự an toàn", "Thể hiện quan tâm qua hành động cụ thể"],
    challenges: ["Có thể lo lắng khi không kiểm soát được chi tiết", "Dễ biến cảm xúc thành danh sách vấn đề cần sửa"],
    developmentAdvice: ["Phân biệt điều cần giải quyết với điều chỉ cần được lắng nghe", "Tạo thói quen nghỉ ngắn trước khi tiếp tục chăm lo"],
  },
  Libra: {
    summary: "Nhu cầu cảm xúc thường gắn với sự hòa thuận, trao đổi công bằng và cảm giác có người đồng hành. Bạn có thể bình tâm hơn khi mối quan hệ cho phép cả hai bên cùng có tiếng nói.",
    strengths: ["Biết cân nhắc cảm xúc của nhiều phía", "Có khả năng làm dịu căng thẳng qua đối thoại"],
    challenges: ["Có thể né xung đột và để nhu cầu riêng bị mờ", "Dễ bất an khi người khác không phản hồi như mong đợi"],
    developmentAdvice: ["Gọi tên nhu cầu của mình trước khi thương lượng", "Xem bất đồng là thông tin thay vì dấu hiệu mất kết nối"],
  },
  Scorpio: {
    summary: "Cảm xúc có xu hướng mãnh liệt, kín đáo và cần độ tin cậy cao. Bạn thường cảm thấy an toàn hơn trong những mối liên hệ có sự trung thực và khả năng đi qua điều khó nói.",
    strengths: ["Có sức chịu đựng cảm xúc và sự trung thành sâu", "Nhận biết tinh tế điều chưa được nói ra"],
    challenges: ["Có thể kiểm tra lòng tin hoặc giữ phòng vệ lâu", "Dễ khó buông một tổn thương chưa được xử lý"],
    developmentAdvice: ["Trao đổi ranh giới và kỳ vọng trước khi căng thẳng tăng", "Mở lòng theo từng mức độ phù hợp thay vì giữ kín hoàn toàn"],
  },
  Sagittarius: {
    summary: "Cảm xúc thường cần không gian, hy vọng và một ý nghĩa rộng hơn để được cân bằng. Bạn có thể hồi phục qua học hỏi, thay đổi môi trường hoặc nhìn lại câu chuyện từ góc độ mới.",
    strengths: ["Giữ được niềm tin và khả năng nhìn xa", "Mang lại tinh thần cởi mở cho người xung quanh"],
    challenges: ["Có thể dùng sự lạc quan để đi vòng qua nỗi buồn", "Dễ thấy bị bó buộc khi người khác cần sự hiện diện lâu dài"],
    developmentAdvice: ["Ở lại với cảm xúc đủ lâu trước khi tìm ý nghĩa", "Thống nhất rõ nhu cầu tự do và cam kết trong quan hệ"],
  },
  Capricorn: {
    summary: "Nhu cầu an toàn thường gắn với năng lực tự chủ, trách nhiệm rõ ràng và cảm giác mọi việc đang trong tầm quản lý. Bạn có xu hướng thể hiện tình cảm bằng sự có mặt đáng tin cậy.",
    strengths: ["Bình tĩnh khi cần xử lý việc khó", "Bền bỉ chăm lo cho cam kết dài hạn"],
    challenges: ["Có thể giấu nhu cầu vì sợ trở thành gánh nặng", "Dễ nghiêm khắc với chính cảm xúc của mình"],
    developmentAdvice: ["Cho phép mình yêu cầu hỗ trợ cụ thể", "Đặt thời gian nghỉ và kết nối vào lịch như một trách nhiệm lành mạnh"],
  },
  Aquarius: {
    summary: "Cảm xúc thường cần khoảng thở, sự tôn trọng khác biệt và kết nối dựa trên tư tưởng chung. Bạn có thể cảm thấy an toàn khi được là chính mình mà không bị ép phản ứng theo khuôn mẫu.",
    strengths: ["Giữ được góc nhìn khách quan khi căng thẳng", "Tôn trọng tính độc lập trong quan hệ"],
    challenges: ["Có thể tách khỏi cảm xúc để tránh bị quá tải", "Dễ khiến người khác khó nhận biết nhu cầu gần gũi của bạn"],
    developmentAdvice: ["Diễn đạt cảm xúc bằng câu ngắn, cụ thể thay vì im lặng", "Cân bằng thời gian riêng với những điểm hẹn kết nối đều đặn"],
  },
  Pisces: {
    summary: "Đời sống cảm xúc có xu hướng thấm sâu và nhạy với bầu không khí xung quanh. Bạn thường cần sự dịu dàng, thời gian riêng và một kênh sáng tạo để trở lại cân bằng.",
    strengths: ["Đồng cảm và đón nhận sắc thái tinh tế", "Có khả năng tự cân bằng qua tưởng tượng và nghệ thuật"],
    challenges: ["Có thể hấp thụ tâm trạng của môi trường", "Dễ tránh né khi thực tế cảm xúc quá lộn xộn"],
    developmentAdvice: ["Kiểm tra xem cảm xúc nào thực sự thuộc về mình", "Dùng ranh giới thời gian và không gian để bảo vệ sự nhạy cảm"],
  },
};

const ascendantContent: Record<ZodiacSign, RuleContent> = {
  Aries: {
    summary: "Bạn thường tiếp cận cuộc sống theo cách trực tiếp, nhanh và sẵn sàng mở đường. Người khác có thể nhận thấy sự chủ động trước khi thấy những lớp tính cách sâu hơn.",
    strengths: ["Tạo ấn tượng năng động và quyết đoán", "Dễ bắt đầu tương tác hoặc thử nghiệm mới"],
    challenges: ["Có thể bị nhìn là vội hoặc quá thẳng", "Dễ bước vào tình huống trước khi quan sát đủ"],
    developmentAdvice: ["Giữ sự chủ động nhưng thêm một câu hỏi trước khi kết luận", "Điều chỉnh tốc độ theo bối cảnh và người đối diện"],
  },
  Taurus: {
    summary: "Bạn thường thể hiện ra ngoài bằng nhịp điềm tĩnh, thực tế và có phần chắc chắn. Cách tiếp cận cuộc sống có xu hướng ưu tiên sự ổn định và trải nghiệm có thể cảm nhận được.",
    strengths: ["Tạo cảm giác đáng tin và vững vàng", "Kiên nhẫn quan sát trước khi cam kết"],
    challenges: ["Có thể tạo ấn tượng khó thay đổi", "Dễ chậm phản ứng khi hoàn cảnh cần quyết định nhanh"],
    developmentAdvice: ["Báo trước khi bạn cần thêm thời gian cân nhắc", "Thử nghiệm phương án mới trong phạm vi nhỏ"],
  },
  Gemini: {
    summary: "Bạn thường bước vào môi trường mới bằng sự tò mò, giao tiếp và khả năng thích nghi. Người khác có thể thấy bạn nhanh nhạy, nhiều câu hỏi và dễ kết nối thông tin.",
    strengths: ["Tạo cuộc trò chuyện linh hoạt", "Nhanh bắt nhịp với người và hoàn cảnh mới"],
    challenges: ["Có thể tạo cảm giác thiếu nhất quán", "Dễ nói nhiều hơn mức mình muốn cam kết"],
    developmentAdvice: ["Tóm tắt điều quan trọng trước khi chuyển chủ đề", "Nói rõ đâu là ý tưởng đang thử và đâu là quyết định"],
  },
  Cancer: {
    summary: "Bạn thường tiếp cận đời sống với sự thận trọng, cảm nhận bầu không khí và mong muốn tạo an toàn. Vẻ ngoài có thể mềm mại hoặc kín đáo cho đến khi có đủ tin cậy.",
    strengths: ["Tinh tế với bối cảnh và cảm xúc nhóm", "Biết tạo cảm giác được quan tâm"],
    challenges: ["Có thể bị hiểu là dè dặt hoặc thất thường", "Dễ phản ứng phòng vệ khi môi trường xa lạ"],
    developmentAdvice: ["Nói rõ khi bạn cần thời gian làm quen", "Tạo một điểm tựa quen thuộc khi bước vào môi trường mới"],
  },
  Leo: {
    summary: "Bạn thường thể hiện ra ngoài bằng sự ấm áp, tự tin và nét hiện diện dễ nhận biết. Cách tiếp cận cuộc sống có xu hướng mang tính sáng tạo và muốn tạo ảnh hưởng tích cực.",
    strengths: ["Tạo năng lượng cởi mở và truyền cảm hứng", "Dám đứng ra đại diện hoặc dẫn dắt"],
    challenges: ["Có thể vô tình chiếm nhiều không gian", "Dễ thấy khó xử khi hình ảnh của mình bị thách thức"],
    developmentAdvice: ["Mời người khác cùng tỏa sáng trong cuộc trò chuyện", "Giữ sự tự tin nhưng cho phép mình chưa biết"],
  },
  Virgo: {
    summary: "Bạn thường tiếp cận hoàn cảnh mới bằng quan sát, phân tích và mong muốn làm đúng việc cần thiết. Người khác có thể nhận thấy sự kín đáo, hữu ích và chú ý chi tiết.",
    strengths: ["Nhanh nhận ra điều cần tổ chức hoặc cải thiện", "Tạo ấn tượng chu đáo và có năng lực"],
    challenges: ["Có thể trông căng thẳng hoặc quá dè dặt", "Dễ tập trung vào lỗi trước khi thấy tổng thể"],
    developmentAdvice: ["Bắt đầu bằng điều đang hoạt động tốt", "Cho phép lần thử đầu tiên chỉ cần đủ dùng"],
  },
  Libra: {
    summary: "Bạn thường thể hiện ra ngoài bằng sự lịch thiệp, cân nhắc và hướng tới kết nối. Cách tiếp cận cuộc sống có xu hướng tìm điểm chung và một phương án có thể chấp nhận cho nhiều bên.",
    strengths: ["Tạo thiện cảm và không gian đối thoại", "Nhạy với phép cân bằng trong quan hệ"],
    challenges: ["Có thể khó bộc lộ lập trường ngay", "Dễ bị hiểu là chiều theo hoàn cảnh"],
    developmentAdvice: ["Nêu một ưu tiên cá nhân trước khi tìm thỏa hiệp", "Giữ sự mềm mại nhưng đặt giới hạn rõ"],
  },
  Scorpio: {
    summary: "Bạn thường tiếp cận cuộc sống với sự tập trung, quan sát sâu và mức độ riêng tư rõ rệt. Người khác có thể cảm nhận sức hút hoặc sự dè chừng trước khi hiểu động lực thật của bạn.",
    strengths: ["Hiện diện tập trung và đọc bối cảnh tốt", "Giữ được bình tĩnh trong tình huống căng"],
    challenges: ["Có thể tạo ấn tượng khó tiếp cận", "Dễ kiểm soát thông tin quá chặt khi chưa tin tưởng"],
    developmentAdvice: ["Chia sẻ một lượng thông tin vừa đủ để xây cầu nối", "Kiểm tra giả định trước khi kết luận động cơ của người khác"],
  },
  Sagittarius: {
    summary: "Bạn thường bước vào cuộc sống bằng tinh thần rộng mở, thẳng thắn và sẵn sàng khám phá. Người khác có thể thấy sự lạc quan và mong muốn nhìn xa hơn giới hạn hiện tại.",
    strengths: ["Khơi gợi tinh thần thử nghiệm và học hỏi", "Dễ kết nối qua tầm nhìn hoặc trải nghiệm"],
    challenges: ["Có thể bị nhìn là thiếu tinh tế hoặc khó đứng yên", "Dễ bỏ qua quy ước quan trọng của bối cảnh"],
    developmentAdvice: ["Đặt câu hỏi về bối cảnh trước khi chia sẻ quan điểm", "Chuyển sự hứng khởi thành một bước cam kết cụ thể"],
  },
  Capricorn: {
    summary: "Bạn thường thể hiện ra ngoài bằng sự chín chắn, có mục tiêu và ý thức trách nhiệm. Cách tiếp cận cuộc sống có xu hướng đánh giá cấu trúc, nguồn lực và con đường khả thi.",
    strengths: ["Tạo ấn tượng đáng tin và có định hướng", "Biết giữ ranh giới và ưu tiên"],
    challenges: ["Có thể trông nghiêm hoặc xa cách", "Dễ tự giới hạn vì quá chú ý rủi ro"],
    developmentAdvice: ["Cho người khác thấy cả sự ấm áp phía sau năng lực", "Dành chỗ cho thử nghiệm không cần mang lại thành tích ngay"],
  },
  Aquarius: {
    summary: "Bạn thường tiếp cận đời sống bằng góc nhìn độc lập, thân thiện nhưng có khoảng cách riêng. Người khác có thể nhận thấy sự khác biệt, tư duy hệ thống và mối quan tâm đến cộng đồng.",
    strengths: ["Mang lại góc nhìn mới và không định kiến", "Kết nối tốt qua ý tưởng hoặc mục tiêu chung"],
    challenges: ["Có thể bị nhìn là khó đoán về cảm xúc", "Dễ ưu tiên nguyên tắc chung hơn nhu cầu trước mắt"],
    developmentAdvice: ["Bổ sung tín hiệu cảm xúc rõ ràng khi giao tiếp", "Kiểm tra ý tưởng bằng trải nghiệm thực tế của người liên quan"],
  },
  Pisces: {
    summary: "Bạn thường tiếp cận cuộc sống với sự mềm mại, trực giác và khả năng hòa vào bối cảnh. Người khác có thể cảm nhận sự đồng cảm hoặc nét mơ màng trước khi thấy ranh giới cá nhân của bạn.",
    strengths: ["Dễ tạo cảm giác được thấu hiểu", "Linh hoạt và giàu tưởng tượng trong hoàn cảnh mới"],
    challenges: ["Có thể gửi tín hiệu không rõ về ý định", "Dễ bị ảnh hưởng bởi kỳ vọng của môi trường"],
    developmentAdvice: ["Nói rõ lựa chọn và giới hạn bằng câu đơn giản", "Dành thời gian tách khỏi môi trường để kiểm tra mong muốn thật"],
  },
};

const contentByFactor: Record<
  CoreInterpretationFactor,
  Record<ZodiacSign, RuleContent>
> = {
  Sun: sunContent,
  Moon: moonContent,
  ASC: ascendantContent,
};

function createRule(
  body: CoreInterpretationFactor,
  sign: ZodiacSign,
): CoreInterpretationRule {
  return {
    ruleId: `WESTERN-${body.toUpperCase()}-${sign.toUpperCase()}-V1`,
    title: `${factorTitles[body]} ${zodiacSignLabels[sign]}`,
    ...contentByFactor[body][sign],
    evidence: { body, sign },
    version: "1.0.0",
  };
}

export const westernCoreInterpretationRules: ReadonlyArray<CoreInterpretationRule> =
  coreInterpretationFactors.flatMap((body) =>
    zodiacSigns.map((sign) => createRule(body, sign)),
  );
