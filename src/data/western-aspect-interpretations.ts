import type { MajorAspectCode } from "../config/aspect-orbs";

export type AspectInterpretationRule = Readonly<{
  ruleId: string;
  rulesetId: "western-aspect-interpretation-v1";
  version: "1.0.0";
  body1: string;
  body2: string;
  aspect: MajorAspectCode;
  title: string;
  coreMeaning: string;
  strengths: ReadonlyArray<string>;
  challenges: ReadonlyArray<string>;
  developmentAdvice: ReadonlyArray<string>;
  evidence: Readonly<{
    body1: string;
    body2: string;
    aspect: MajorAspectCode;
  }>;
}>;

export const westernAspectInterpretationRules = [
  {
    ruleId: "WESTERN-ASPECT-SUN-MOON-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Moon",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Mặt Trăng",
    coreMeaning:
      "Bản sắc, ý chí và nhu cầu cảm xúc có xu hướng hòa trộn mạnh, khiến điều bạn muốn thể hiện thường gắn sát với phản ứng bản năng. Sự thống nhất này có thể tạo sức tập trung, nhưng không phải lúc nào mong muốn có ý thức và cảm giác an toàn cũng được phân biệt rõ.",
    strengths: [
      "Có thể hành động với sự nhất quán cao khi cảm xúc và mục tiêu cùng hướng",
      "Thường thể hiện chân thực điều đang có ý nghĩa sâu đối với mình",
    ],
    challenges: [
      "Dễ xem phản ứng cảm xúc tức thời như toàn bộ ý chí hoặc bản sắc của mình",
      "Có thể khó lùi lại để nhìn một nhu cầu từ góc độ khác",
    ],
    developmentAdvice: [
      "Tạm dừng để gọi tên riêng điều mình muốn và điều mình cần trước quyết định quan trọng",
      "Giữ sự thống nhất bên trong nhưng tạo chỗ cho phản hồi và góc nhìn mới",
    ],
    evidence: { body1: "Sun", body2: "Moon", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MOON-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Moon",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Mặt Trăng",
    coreMeaning:
      "Hướng thể hiện bản thân và nhu cầu cảm xúc có xu hướng kéo về hai phía, đòi hỏi quá trình cân bằng thay vì chọn bỏ một bên. Sự đối chiếu này có thể giúp bạn nhận rõ cả ý chí lẫn đời sống nội tâm khi dành thời gian lắng nghe từng nhu cầu.",
    strengths: [
      "Có thể nhìn một vấn đề từ cả góc độ mục tiêu cá nhân và phản ứng cảm xúc",
      "Thường phát triển khả năng điều hòa các nhu cầu khác biệt qua trải nghiệm",
    ],
    challenges: [
      "Dễ dao động giữa làm theo mục tiêu và tìm cảm giác an toàn mà chưa kết nối hai phía",
      "Có thể đặt một phía của mâu thuẫn lên người khác thay vì nhận ra nó bên trong mình",
    ],
    developmentAdvice: [
      "Xác định điều mỗi phía đang bảo vệ rồi tìm nhịp đáp ứng cả mục tiêu lẫn nhu cầu cảm xúc",
      "Xem căng kéo là tín hiệu cần cân bằng, không phải bằng chứng rằng một phía chắc chắn sai",
    ],
    evidence: { body1: "Sun", body2: "Moon", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MOON-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Moon",
    aspect: "trine",
    title: "Mặt Trời tam hợp Mặt Trăng",
    coreMeaning:
      "Bản sắc và nhu cầu cảm xúc thường có dòng chảy tương đối tự nhiên, giúp cách thể hiện bản thân dễ nhận được sự hỗ trợ từ đời sống nội tâm. Sự thuận dòng này là một tiềm năng, không bảo đảm mọi lựa chọn đều đúng hoặc không cần rèn luyện.",
    strengths: [
      "Có thể kết nối khá tự nhiên giữa điều muốn làm và điều tạo cảm giác an toàn",
      "Thường phục hồi nhịp cảm xúc thuận lợi hơn khi được sống đúng giá trị cốt lõi",
    ],
    challenges: [
      "Dễ dựa vào điều vốn diễn ra thuận lợi mà chưa chủ động phát triển thêm khả năng tự quan sát",
      "Có thể ít nhận ra điểm mù khi cảm xúc và ý chí cùng củng cố một lựa chọn quen thuộc",
    ],
    developmentAdvice: [
      "Dùng sự đồng thuận bên trong làm nền để thử mục tiêu mới có độ khó phù hợp",
      "Chủ động tìm phản hồi để dòng chảy tự nhiên không trở thành sự bằng lòng với thói quen",
    ],
    evidence: { body1: "Sun", body2: "Moon", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MOON-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Moon",
    aspect: "square",
    title: "Mặt Trời vuông Mặt Trăng",
    coreMeaning:
      "Ý chí thể hiện bản thân và phản ứng cảm xúc có thể tạo ma sát, khiến việc tiến tới mục tiêu đồng thời chạm vào nhu cầu an toàn chưa được giải quyết. Ma sát này không phải dấu hiệu tai họa; nó có thể trở thành động lực phát triển khi được nhận diện và điều chỉnh có ý thức.",
    strengths: [
      "Có thể phát triển sức bật và khả năng hành động sau khi hiểu điều gì đang gây căng bên trong",
      "Thường có động lực mạnh để xây cách sống phù hợp hơn với cả mục tiêu và cảm xúc",
    ],
    challenges: [
      "Dễ phản ứng vội khi mục tiêu cá nhân và nhu cầu an toàn cùng đòi được ưu tiên",
      "Có thể lặp lại chu kỳ cố gắng quá mức rồi rút lui nếu chưa điều chỉnh nhịp năng lượng",
    ],
    developmentAdvice: [
      "Chia mục tiêu thành bước nhỏ và kiểm tra trạng thái cảm xúc trước mỗi cam kết lớn",
      "Dùng ma sát để xác định kỹ năng cần xây thay vì kết luận rằng hai phần bên trong không thể hòa hợp",
    ],
    evidence: { body1: "Sun", body2: "Moon", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MOON-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Moon",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Mặt Trăng",
    coreMeaning:
      "Bản sắc và nhu cầu cảm xúc có khả năng phối hợp hỗ trợ nhau khi bạn chủ động tạo cơ hội kết nối chúng. Tiềm năng này thường phát huy qua lựa chọn và thực hành, thay vì tự động bảo đảm sự hòa hợp trong mọi hoàn cảnh.",
    strengths: [
      "Có thể linh hoạt dùng hiểu biết cảm xúc để hỗ trợ cách thể hiện và theo đuổi mục tiêu",
      "Thường nhận ra cơ hội điều chỉnh môi trường để cả ý chí lẫn nhu cầu an toàn được đáp ứng",
    ],
    challenges: [
      "Dễ bỏ qua tiềm năng phối hợp nếu chờ hoàn cảnh tự sắp xếp mà không chủ động",
      "Có thể chỉ dùng khả năng này khi thuận tiện nên chưa tạo thành năng lực ổn định",
    ],
    developmentAdvice: [
      "Tạo thói quen đối chiếu mục tiêu với nhu cầu cảm xúc trước khi lập kế hoạch hành động",
      "Chủ động chọn môi trường và cách giao tiếp giúp hai chức năng hỗ trợ nhau rõ hơn",
    ],
    evidence: { body1: "Sun", body2: "Moon", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MERCURY-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mercury",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Thủy",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng gắn chặt với cách suy nghĩ, học hỏi và giao tiếp, nên lời nói thường mang dấu ấn cá nhân rõ. Sự kết hợp này có thể giúp diễn đạt điều mình tin tưởng với sức tập trung cao, đồng thời cần khoảng lùi để phân biệt một ý tưởng đang có với toàn bộ con người mình.",
    strengths: [
      "Có thể tập trung tư duy và giao tiếp rõ hơn khi chủ đề gắn với mục tiêu hoặc giá trị cá nhân",
      "Thường có khả năng đưa quan điểm, ý tưởng và quyết định thành một thông điệp nhất quán",
    ],
    challenges: [
      "Dễ cảm thấy ý kiến bị phản biện đồng nghĩa với bản thân bị phủ nhận",
      "Có thể nói từ góc nhìn của mình quá nhanh trước khi tiếp nhận đầy đủ thông tin hoặc quan điểm khác",
    ],
    developmentAdvice: [
      "Tách câu hỏi “ý tưởng này có phù hợp không?” khỏi câu hỏi “mình có giá trị không?” khi nhận phản hồi",
      "Dành thời gian lắng nghe và kiểm chứng thông tin trước khi dùng sự tự tin để truyền đạt kết luận",
    ],
    evidence: { body1: "Sun", body2: "Mercury", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-VENUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Venus",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Kim",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với các giá trị, cách kết nối, sức hấp dẫn và gu thẩm mỹ, nên điều bạn yêu thích thường trở thành một phần rõ nét trong cách thể hiện mình. Sự kết hợp này có thể tạo nét duyên và khả năng sống nhất quán với điều mình trân trọng, đồng thời cần khoảng lùi để không đồng nhất giá trị bản thân với sự yêu mến hoặc công nhận từ người khác.",
    strengths: [
      "Có thể thể hiện giá trị và gu cá nhân một cách tự nhiên, ấm áp và dễ nhận biết",
      "Thường có động lực xây dựng kết nối hoặc sản phẩm mang dấu ấn thẩm mỹ và điều mình thật sự trân trọng",
    ],
    challenges: [
      "Dễ để nhu cầu được yêu mến hoặc giữ hòa khí ảnh hưởng quá nhiều đến cách thể hiện ý chí",
      "Có thể gắn cảm giác có giá trị với sức hấp dẫn, thị hiếu hoặc phản hồi tích cực từ người khác",
    ],
    developmentAdvice: [
      "Phân biệt điều mình thực sự coi trọng với điều đang được người khác tán thưởng trước một lựa chọn quan trọng",
      "Giữ sự duyên dáng trong kết nối nhưng thực hành nói rõ mong muốn và ranh giới cá nhân",
    ],
    evidence: { body1: "Sun", body2: "Venus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MARS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mars",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Hỏa",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với động lực hành động, khiến cách thể hiện mình thường trực tiếp, chủ động và giàu sức đẩy. Năng lượng này có thể giúp nhanh chóng bắt tay vào điều mình muốn, đồng thời cần khoảng dừng để không xem việc phải hành động hoặc chiến thắng là toàn bộ giá trị của bản thân.",
    strengths: [
      "Có thể huy động năng lượng nhanh khi mục tiêu gắn rõ với điều mình muốn thể hiện",
      "Thường sẵn sàng chủ động, bảo vệ hướng đi và biến ý định thành hành động cụ thể",
    ],
    challenges: [
      "Dễ hành động nóng vội khi cái tôi hoặc mục tiêu cá nhân bị chạm tới",
      "Có thể khó tách nhu cầu khẳng định bản thân khỏi thôi thúc phải làm ngay hoặc thắng ngay",
    ],
    developmentAdvice: [
      "Tạo một khoảng dừng ngắn để kiểm tra mục tiêu và hệ quả trước hành động có cường độ cao",
      "Dùng sức quyết đoán để theo đuổi điều có ý nghĩa thay vì phản ứng với mọi thách thức như một cuộc đối đầu",
    ],
    evidence: { body1: "Sun", body2: "Mars", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MARS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mars",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Hỏa",
    coreMeaning:
      "Cách thể hiện bản thân và cách hành động hoặc khẳng định ý chí có thể tạo sức kéo giữa hai phía, đôi khi hiện rõ qua tương tác và đối đầu với người khác. Cấu hình này có thể rèn sự mạnh mẽ và khả năng đứng vững, nhưng cần học điều tiết phản ứng để bất đồng không tự động biến thành cuộc đấu quyền lực.",
    strengths: [
      "Có thể phát triển bản lĩnh hành động rõ ràng khi cần bảo vệ mục tiêu hoặc lập trường",
      "Thường nhận ra động lực và giới hạn của mình rõ hơn qua hợp tác, cạnh tranh hoặc phản hồi trực tiếp",
    ],
    challenges: [
      "Dễ phản ứng mạnh khi cảm thấy người khác cản trở cách thể hiện hoặc hướng đi của mình",
      "Có thể đặt phần quyết liệt lên người đối diện rồi chỉ nhìn thấy xung đột ở bên ngoài",
    ],
    developmentAdvice: [
      "Phân biệt bất đồng về hành động với sự phủ nhận con người trước khi đáp trả",
      "Chuyển năng lượng đối đầu thành thương lượng mục tiêu, vai trò và ranh giới cụ thể",
    ],
    evidence: { body1: "Sun", body2: "Mars", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MARS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mars",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Hỏa",
    coreMeaning:
      "Bản sắc, ý chí và năng lượng hành động thường phối hợp tương đối tự nhiên, giúp việc chuyển ý định thành bước đi cụ thể có thể diễn ra thuận dòng. Sự trôi chảy này là một nguồn lực để chủ động và kiên trì, nhưng không bảo đảm hướng đã chọn luôn đúng hoặc mọi hành động đều cần được đẩy nhanh.",
    strengths: [
      "Có thể hành động tự tin và duy trì động lực khi mục tiêu phản ánh đúng điều mình coi trọng",
      "Thường kết nối khá tự nhiên giữa quyết định cá nhân và khả năng triển khai thực tế",
    ],
    challenges: [
      "Dễ tin vào đà hành động quen thuộc mà chưa kiểm tra đầy đủ hướng đi hoặc tác động",
      "Có thể ít nhận ra khi sự tự tin và tốc độ khiến người khác khó tham gia hoặc phản hồi",
    ],
    developmentAdvice: [
      "Dùng năng lượng thuận dòng cho mục tiêu có tiêu chí rõ và điểm kiểm tra định kỳ",
      "Chủ động tiếp nhận phản hồi để khả năng hành động nhanh vẫn phục vụ đúng hướng",
    ],
    evidence: { body1: "Sun", body2: "Mars", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MARS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mars",
    aspect: "square",
    title: "Mặt Trời vuông Sao Hỏa",
    coreMeaning:
      "Ý muốn thể hiện bản thân và cách dùng năng lượng hành động có thể tạo ma sát mạnh, vừa thúc đẩy tiến lên vừa dễ dẫn tới căng thẳng, hấp tấp hoặc phản ứng quá mức. Ma sát này không mặc định là tiêu cực; khi được định hướng có chủ đích, nó có thể trở thành động lực xây sức bền, kỹ năng và khả năng tự điều chỉnh.",
    strengths: [
      "Có thể tạo sức bật lớn trước thử thách và kiên trì phát triển năng lực qua va chạm thực tế",
      "Thường có động lực rõ để biến sự không hài lòng thành hành động cải thiện cụ thể",
    ],
    challenges: [
      "Dễ đẩy nhanh hành động khi căng thẳng rồi phải xử lý hậu quả của quyết định vội",
      "Có thể tiêu hao năng lượng vào cạnh tranh hoặc phản ứng thay vì mục tiêu chính",
    ],
    developmentAdvice: [
      "Chia năng lượng mạnh thành bước hành động có nhịp nghỉ, tiêu chí và giới hạn rõ",
      "Xem ma sát là tín hiệu cần điều chỉnh chiến lược thay vì bằng chứng phải cố mạnh hơn ngay lập tức",
    ],
    evidence: { body1: "Sun", body2: "Mars", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-MARS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Mars",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Hỏa",
    coreMeaning:
      "Bản sắc và động lực hành động có cơ hội hỗ trợ nhau khi bạn chủ động kết nối điều muốn thể hiện với một bước làm cụ thể. Tiềm năng này có thể nuôi sự tự tin và khả năng bắt tay vào việc, nhưng cần được sử dụng thường xuyên thay vì chờ nó tự động tạo kết quả.",
    strengths: [
      "Có thể nhận ra thời điểm phù hợp để biến ý định cá nhân thành hành động khả thi",
      "Thường phát triển sự tự tin qua những lần chủ động thử, điều chỉnh và hoàn thành công việc",
    ],
    challenges: [
      "Dễ bỏ lỡ cơ hội nếu chỉ thấy tiềm năng mà không chọn bước khởi động rõ ràng",
      "Có thể dùng khả năng hành động theo từng lúc nên chưa tạo thành nhịp chủ động ổn định",
    ],
    developmentAdvice: [
      "Chuyển mỗi mục tiêu quan trọng thành một hành động nhỏ có thời điểm bắt đầu cụ thể",
      "Lặp lại những cách khởi động hiệu quả để tiềm năng phối hợp trở thành kỹ năng bền vững",
    ],
    evidence: { body1: "Sun", body2: "Mars", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-JUPITER-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Jupiter",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Mộc",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với nhu cầu mở rộng, tìm ý nghĩa và hướng tới một tầm nhìn lớn hơn. Sự kết hợp này có thể nuôi tinh thần lạc quan, ham phát triển và khả năng truyền cảm hứng, đồng thời cần được cân chỉnh để niềm tin không trở thành sự phóng đại về bản thân hoặc khả năng thực tế.",
    strengths: [
      "Có thể thể hiện niềm tin và tầm nhìn cá nhân với sự nhiệt thành, rộng mở",
      "Thường có động lực học hỏi, phát triển và giúp người khác nhìn thấy khả năng lớn hơn",
    ],
    challenges: [
      "Dễ tự tin quá mức hoặc đánh giá khả năng thực hiện cao hơn nguồn lực hiện có",
      "Có thể đồng nhất quan điểm hoặc niềm tin của mình với toàn bộ giá trị bản thân",
    ],
    developmentAdvice: [
      "Giữ tầm nhìn lớn nhưng kiểm tra dữ kiện, giới hạn và nguồn lực trước cam kết quan trọng",
      "Tách giá trị bản thân khỏi việc một niềm tin cụ thể được xác nhận hay cần điều chỉnh",
    ],
    evidence: { body1: "Sun", body2: "Jupiter", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-JUPITER-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Jupiter",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Mộc",
    coreMeaning:
      "Cách tự xác định bản thân và xu hướng tìm điều lớn hơn hoặc có ý nghĩa hơn có thể tạo sức kéo giữa hai phía. Sức kéo này đôi khi hiện ra qua việc cân bằng mong muốn cá nhân với niềm tin, kỳ vọng, cơ hội hoặc góc nhìn từ người khác; đây là lời mời đối thoại và điều chỉnh, không phải xung đột tất yếu.",
    strengths: [
      "Có thể mở rộng cách hiểu về bản thân khi nghiêm túc đối thoại với những tầm nhìn khác",
      "Thường phát triển khả năng cân nhắc cả mục tiêu cá nhân lẫn bối cảnh rộng hơn",
    ],
    challenges: [
      "Dễ dao động giữa việc bảo vệ hướng đi riêng và chạy theo một kỳ vọng lớn từ bên ngoài",
      "Có thể phóng đại cơ hội hoặc phản ứng phòng thủ khi quan điểm cá nhân bị đặt vào thế đối chiếu",
    ],
    developmentAdvice: [
      "Đối chiếu niềm tin và kỳ vọng với dữ kiện thực tế trước khi chọn hoặc bác bỏ một cơ hội",
      "Dùng đối thoại để điều chỉnh tầm nhìn mà không từ bỏ quyền tự xác định hướng đi của mình",
    ],
    evidence: { body1: "Sun", body2: "Jupiter", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-JUPITER-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Jupiter",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Mộc",
    coreMeaning:
      "Bản sắc và xu hướng mở rộng thường hỗ trợ nhau tương đối tự nhiên, giúp sự tự tin, ham học hỏi và khả năng nhìn ra cơ hội có thể phát triển thuận dòng. Nguồn lực này không đồng nghĩa với vận may chắc chắn; góc nhìn quen thuộc và quyết định thực tế vẫn cần được kiểm chứng.",
    strengths: [
      "Có thể tiếp cận việc học hỏi và phát triển với niềm tin tích cực vào khả năng tiến bộ",
      "Thường dễ kết nối mục tiêu cá nhân với một tầm nhìn hoặc ý nghĩa rộng hơn",
    ],
    challenges: [
      "Dễ dựa quá nhiều vào cảm giác mọi việc sẽ thuận lợi hoặc khả năng của mình sẽ tự đủ",
      "Có thể bỏ qua điểm mù khi sự tự tin và thế giới quan quen thuộc cùng củng cố một lựa chọn",
    ],
    developmentAdvice: [
      "Dùng sự tự tin để theo đuổi cơ hội nhưng đặt tiêu chí kiểm chứng rõ cho từng quyết định",
      "Duy trì kỷ luật thực hiện để tầm nhìn thuận dòng trở thành kết quả học hỏi có căn cứ",
    ],
    evidence: { body1: "Sun", body2: "Jupiter", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-JUPITER-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Jupiter",
    aspect: "square",
    title: "Mặt Trời vuông Sao Mộc",
    coreMeaning:
      "Ma sát giữa ý chí cá nhân và xu hướng mở rộng có thể tạo tham vọng lớn, đồng thời làm tăng nguy cơ hứa nhiều, đi quá tay hoặc đặt mục tiêu vượt nguồn lực hiện có. Ma sát này không mặc định là tiêu cực; nó có thể thúc đẩy sự trưởng thành về phán đoán, giới hạn và cách biến tầm nhìn thành kế hoạch khả thi.",
    strengths: [
      "Có thể tạo động lực mạnh để vượt khỏi giới hạn cũ và theo đuổi mục tiêu có quy mô lớn hơn",
      "Thường phát triển năng lực phán đoán thực tế qua việc thử, nhận phản hồi và điều chỉnh tham vọng",
    ],
    challenges: [
      "Dễ cam kết quá nhiều hoặc phân tán nguồn lực khi tầm nhìn đi nhanh hơn khả năng triển khai",
      "Có thể phản ứng mạnh khi kết quả thực tế không khớp với kỳ vọng hoặc niềm tin ban đầu",
    ],
    developmentAdvice: [
      "Chia tầm nhìn lớn thành các bước có tiêu chí kiểm chứng, nguồn lực và giới hạn rõ",
      "Điều chỉnh kỳ vọng theo phản hồi thực tế thay vì cố mở rộng chỉ để bảo vệ sự tự tin",
    ],
    evidence: { body1: "Sun", body2: "Jupiter", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-JUPITER-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Jupiter",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Mộc",
    coreMeaning:
      "Bản sắc và khả năng học hỏi, mở rộng góc nhìn có cơ hội phối hợp khi bạn chủ động khai thác chúng. Tiềm năng này có thể hỗ trợ sự tự tin và khả năng nhận ra hướng phát triển, nhưng lợi ích không tự động xuất hiện nếu thiếu trải nghiệm, lựa chọn và thực hành cụ thể.",
    strengths: [
      "Có thể nhận ra những cơ hội học hỏi phù hợp với hướng phát triển cá nhân",
      "Thường xây sự tự tin qua việc chủ động khám phá môi trường và góc nhìn mới",
    ],
    challenges: [
      "Dễ để cơ hội trôi qua nếu chỉ thấy tiềm năng mà không chọn bước tham gia cụ thể",
      "Có thể mở rộng theo nhiều hướng rời rạc nên hiểu biết chưa chuyển thành năng lực ổn định",
    ],
    developmentAdvice: [
      "Chủ động tìm trải nghiệm, người hướng dẫn hoặc chương trình học gắn với mục tiêu rõ ràng",
      "Biến mỗi cơ hội mở rộng thành một kỹ năng hoặc thói quen có thể thực hành và đánh giá",
    ],
    evidence: { body1: "Sun", body2: "Jupiter", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Thổ",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với trách nhiệm, tiêu chuẩn và nhu cầu tạo cấu trúc. Sự kết hợp này có thể nuôi thái độ nghiêm túc, bền bỉ và khả năng xây năng lực qua thời gian, đồng thời cần khoảng linh hoạt để giá trị bản thân không chỉ phụ thuộc vào thành tích hoặc việc luôn phải đủ tốt.",
    strengths: [
      "Có thể kiên trì theo đuổi hướng đi dài hạn và chịu trách nhiệm cho lựa chọn của mình",
      "Thường xây năng lực đáng tin cậy bằng quá trình rèn luyện có cấu trúc và tiêu chuẩn rõ",
    ],
    challenges: [
      "Dễ tự đặt yêu cầu quá cao hoặc khó cho phép bản thân thử, sai và học dần",
      "Có thể gắn cảm giác có giá trị với thành tích, năng lực hoặc khả năng luôn kiểm soát tốt",
    ],
    developmentAdvice: [
      "Giữ tiêu chuẩn nhưng phân biệt kỷ luật giúp tiến bộ với tiếng nói tự phê bình làm thu hẹp mình",
      "Xây mục tiêu theo tiến trình dài hạn, kèm khoảng nghỉ và thời điểm đánh giá lại khả năng thực tế",
    ],
    evidence: { body1: "Sun", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Saturn",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Thổ",
    coreMeaning:
      "Nhu cầu thể hiện bản thân và các giới hạn, trách nhiệm hoặc tiêu chuẩn có thể tạo sức kéo giữa hai phía. Sức kéo này đôi khi được nhận thấy qua kỳ vọng, quy tắc, người có thẩm quyền hoặc hoàn cảnh yêu cầu điều chỉnh hướng đi; nó có thể hỗ trợ quá trình trưởng thành khi quyền tự quyết và nghĩa vụ được nhìn nhận cùng nhau.",
    strengths: [
      "Có thể trưởng thành trong cách xác định hướng đi khi biết đối thoại với giới hạn và trách nhiệm",
      "Thường phát triển khả năng cân bằng quyền tự quyết với yêu cầu thực tế của mối quan hệ hoặc bối cảnh",
    ],
    challenges: [
      "Dễ cảm thấy phải chứng minh năng lực trước tiêu chuẩn hoặc kỳ vọng từ bên ngoài",
      "Có thể đặt toàn bộ vai trò giới hạn mình lên người khác mà chưa nhận ra nỗi sợ bị đánh giá bên trong",
    ],
    developmentAdvice: [
      "Phân biệt giới hạn thực tế cần xử lý với dự đoán rằng mình sẽ bị đánh giá hoặc từ chối",
      "Thương lượng rõ trách nhiệm, kỳ vọng và phạm vi tự quyết thay vì mặc định một phía phải nhường hoàn toàn",
    ],
    evidence: { body1: "Sun", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Saturn",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Thổ",
    coreMeaning:
      "Bản sắc và khả năng tạo cấu trúc, kỷ luật thường phối hợp tương đối tự nhiên, giúp định hướng cá nhân có thể được chuyển thành một tiến trình ổn định. Sự thuận dòng này hỗ trợ tính bền bỉ và tự quản nhưng không bảo đảm thành công; cấu trúc hiệu quả vẫn cần thích nghi khi mục tiêu hoặc hoàn cảnh thay đổi.",
    strengths: [
      "Có thể duy trì nỗ lực đều đặn và tổ chức nguồn lực quanh một mục tiêu dài hạn",
      "Thường kết nối khá tự nhiên giữa trách nhiệm cá nhân, tiêu chuẩn và cách triển khai thực tế",
    ],
    challenges: [
      "Dễ tin quá nhiều vào cách làm đã chứng minh hiệu quả và ít thử một phương án mới",
      "Có thể trở nên cứng với bản thân khi cấu trúc quen thuộc vẫn vận hành nhưng không còn phục vụ hướng đi hiện tại",
    ],
    developmentAdvice: [
      "Dùng nền tảng ổn định để thử thay đổi có kiểm soát và học thêm cách làm mới",
      "Định kỳ kiểm tra kỷ luật đang phục vụ mục tiêu hay chỉ duy trì một thói quen quen thuộc",
    ],
    evidence: { body1: "Sun", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Saturn",
    aspect: "square",
    title: "Mặt Trời vuông Sao Thổ",
    coreMeaning:
      "Ma sát giữa ý chí cá nhân và giới hạn, trách nhiệm hoặc tiêu chuẩn có thể tạo áp lực, tự nghi ngờ hay cảm giác tiến chậm hơn mong muốn. Ma sát này không phải dấu hiệu bị trừng phạt; khi được xử lý theo từng bước, nó có thể giúp xây sức bền, khả năng tự điều chỉnh và năng lực làm việc với giới hạn thực tế.",
    strengths: [
      "Có thể phát triển sức bền và năng lực vững hơn qua quá trình luyện tập, sửa sai và tích lũy",
      "Thường học cách biến áp lực thành tiêu chuẩn thực tế và kỹ năng có thể kiểm chứng",
    ],
    challenges: [
      "Dễ trì hoãn vì sợ chưa đủ tốt hoặc tự phê bình mạnh khi kết quả chưa đến ngay",
      "Có thể phản ứng với áp lực bằng cách ép bản thân quá mức thay vì điều chỉnh cấu trúc và nhịp tiến bộ",
    ],
    developmentAdvice: [
      "Chia tiêu chuẩn lớn thành bước đo được và ghi nhận tiến bộ tích lũy theo thời gian",
      "Phân biệt hạn chế thật cần được tôn trọng với kỳ vọng hoàn hảo có thể được điều chỉnh",
    ],
    evidence: { body1: "Sun", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Saturn",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Thổ",
    coreMeaning:
      "Bản sắc và khả năng xây cấu trúc có cơ hội hỗ trợ nhau khi bạn chủ động đưa kỷ luật vào hướng đi cá nhân. Tiềm năng này có thể giúp biến khả năng thành năng lực đáng tin cậy qua thực hành, nhưng không tự động trở thành sự nhất quán nếu chỉ dựa vào động lực nhất thời.",
    strengths: [
      "Có thể học cách dùng thói quen ổn định và hệ thống đơn giản để hỗ trợ mục tiêu cá nhân",
      "Thường phát triển tinh thần trách nhiệm qua những cam kết phù hợp được lặp lại đều đặn",
    ],
    challenges: [
      "Dễ nhận ra điều cần tổ chức nhưng chưa chuyển hiểu biết đó thành thói quen cụ thể",
      "Có thể chỉ dùng cấu trúc khi có hứng hoặc áp lực nên năng lực chưa ổn định",
    ],
    developmentAdvice: [
      "Chọn một vài nếp thực hành đơn giản, lặp lại được và gắn chúng với mục tiêu có ý nghĩa rõ",
      "Nhận trách nhiệm vừa sức để luyện tính nhất quán, đồng thời xem cấu trúc là công cụ chứ không phải mục đích tự thân",
    ],
    evidence: { body1: "Sun", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Thiên Vương",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với nhu cầu tự do, khác biệt và thử cách tiếp cận mới. Sự kết hợp này có thể giúp bạn chủ động định nghĩa con đường riêng và nhận ra khuôn mẫu không còn hữu ích, đồng thời cần phân biệt đổi mới có mục đích với phản ứng phải khác đi để bảo vệ cảm giác về bản thân.",
    strengths: [
      "Có thể thể hiện cá tính rõ và sẵn sàng thử giải pháp nằm ngoài cách làm quen thuộc",
      "Thường chủ động nhận ra và thay đổi những khuôn mẫu không còn phục vụ hướng đi cá nhân",
    ],
    challenges: [
      "Dễ đồng nhất việc là chính mình với nhu cầu luôn phải khác người hoặc không bị ràng buộc",
      "Có thể thay đổi quá nhanh hay chống lại giới hạn trước khi hiểu mục đích và hệ quả của chúng",
    ],
    developmentAdvice: [
      "Giữ tính độc lập nhưng xác định rõ vấn đề và hệ quả mong muốn trước một thay đổi quan trọng",
      "Chọn nơi thật sự cần đổi mới thay vì biến mọi khác biệt thành phép thử đối với bản sắc",
    ],
    evidence: { body1: "Sun", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Uranus",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Cách xác định bản thân và nhu cầu tự do hoặc đổi mới có thể tạo sức kéo giữa hai phía, thường được nhận thấy qua quan hệ, nhóm hay môi trường đưa ra cách tiếp cận rất khác. Đây là cơ hội học cách giữ cá tính riêng trong khi thích nghi và hợp tác với khác biệt, không có nghĩa người khác chắc chắn gây bất ổn.",
    strengths: [
      "Có thể mở rộng hiểu biết về bản thân khi nghiêm túc tiếp xúc với những góc nhìn khác thường",
      "Thường phát triển khả năng vừa bảo vệ quyền tự quyết vừa hợp tác với người có cách làm khác",
    ],
    challenges: [
      "Dễ cảm thấy tự do cá nhân bị đe dọa khi người khác thay đổi kỳ vọng hoặc cách phối hợp",
      "Có thể đặt toàn bộ phần khó đoán hoặc thích đổi mới lên người khác mà chưa nhận ra nhu cầu tương tự ở mình",
    ],
    developmentAdvice: [
      "Phân biệt khác biệt chạm vào giá trị cốt lõi với khác biệt chỉ yêu cầu mình điều chỉnh cách làm",
      "Thương lượng rõ không gian tự do, kỳ vọng và nguyên tắc hợp tác trước khi phản ứng hoặc rút lui",
    ],
    evidence: { body1: "Sun", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Uranus",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Thiên Vương",
    coreMeaning:
      "Bản sắc và khả năng đổi mới thường phối hợp tương đối tự nhiên, giúp bạn có thể thoải mái thử cách tiếp cận mới và thể hiện nét riêng. Sự thuận dòng này không bảo đảm ý tưởng khác biệt luôn hữu ích; đổi mới vẫn cần mục tiêu, kiểm chứng và cách truyền đạt để tạo giá trị thực tế.",
    strengths: [
      "Có thể thích nghi khá tự nhiên với ý tưởng mới mà vẫn giữ được hướng đi cá nhân",
      "Thường cởi mở với giải pháp không quen thuộc và thoải mái thể hiện góc nhìn riêng",
    ],
    challenges: [
      "Dễ cho rằng cách mới hoặc khác biệt đương nhiên tốt hơn cách đang được sử dụng",
      "Có thể bỏ qua việc giải thích và đưa người khác theo cùng vì bản thân thấy thay đổi diễn ra tự nhiên",
    ],
    developmentAdvice: [
      "Dùng sự cởi mở với đổi mới cho một vấn đề có mục tiêu và tiêu chí thành công rõ",
      "Kiểm chứng ý tưởng mới bằng kết quả và phản hồi thay vì chỉ dựa vào cảm giác mới mẻ",
    ],
    evidence: { body1: "Sun", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Uranus",
    aspect: "square",
    title: "Mặt Trời vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu thể hiện bản thân và nhu cầu tự do, phá khuôn mẫu hoặc thay đổi có thể tạo sự bồn chồn với giới hạn và phản ứng mạnh khi cảm thấy bị kiểm soát. Ma sát này không dự báo biến cố hay bất ổn; nó có thể giúp phát triển khả năng đổi mới thực tế khi thay đổi được thực hiện có chủ đích mà không đánh mất hướng đi.",
    strengths: [
      "Có thể tạo sức đẩy để nhận diện và thay đổi những cấu trúc thật sự không còn phù hợp",
      "Thường phát triển khả năng thích nghi và bảo vệ quyền tự quyết qua thử nghiệm thực tế",
    ],
    challenges: [
      "Dễ thay đổi chỉ để thoát cảm giác bị giới hạn hoặc phản ứng vội với quy tắc và kỳ vọng",
      "Có thể phá bỏ cách cũ trước khi xác định rõ phần nào cần thay và phần nào vẫn có giá trị",
    ],
    developmentAdvice: [
      "Xác định chính xác điều đang hạn chế rồi thử thay đổi trong phạm vi nhỏ có thể đánh giá",
      "Xây không gian tự do bên trong một cấu trúc đủ ổn định để đổi mới vẫn phục vụ hướng đi dài hạn",
    ],
    evidence: { body1: "Sun", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Uranus",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Thiên Vương",
    coreMeaning:
      "Bản sắc và khả năng thử cách mới có cơ hội hỗ trợ nhau khi bạn chủ động khai thác qua trải nghiệm. Tiềm năng này có thể mở rộng cách giải quyết vấn đề và giúp cá tính riêng phát triển từng bước, nhưng đổi mới chỉ trở thành năng lực khi ý tưởng được đưa vào thực hành và đánh giá.",
    strengths: [
      "Có thể học nhanh qua thử nghiệm và bổ sung cách tiếp cận mới cho mục tiêu cá nhân",
      "Thường có cơ hội tạo thay đổi từng bước mà không cần phá bỏ toàn bộ cấu trúc hiện có",
    ],
    challenges: [
      "Dễ thích ý tưởng mới nhưng chưa chọn một bước cụ thể để đưa nó vào thực hành",
      "Có thể thử nhiều hướng rời rạc hoặc bỏ qua cơ hội đổi mới vì tiếp tục chọn cách quen thuộc",
    ],
    developmentAdvice: [
      "Chọn một thử nghiệm cụ thể gắn với vấn đề thật và đặt thời điểm đánh giá kết quả",
      "Giữ lại phần hữu ích từ cách mới để khả năng thử nghiệm trở thành kỹ năng thích nghi có chủ đích",
    ],
    evidence: { body1: "Sun", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Hải Vương",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với lý tưởng, trí tưởng tượng và khả năng cảm nhận những sắc thái tinh tế. Sự kết hợp này có thể giúp bạn đưa ý nghĩa, biểu tượng hoặc sáng tạo vào cách thể hiện mình, đồng thời đòi hỏi sự phân biệt rõ giữa điều đang cảm nhận, điều mong muốn và điều đã được kiểm chứng.",
    strengths: [
      "Có thể hình dung phong phú và nhìn một vấn đề vượt khỏi lớp bề mặt trước mắt",
      "Thường dễ đưa sự đồng cảm, biểu tượng hoặc ý nghĩa cá nhân vào cách thể hiện và theo đuổi mục tiêu",
    ],
    challenges: [
      "Dễ đồng nhất giá trị bản thân với một lý tưởng hoặc hình ảnh mình muốn trở thành",
      "Ranh giới mục tiêu có thể thiếu rõ nếu cảm hứng hoặc mong muốn được xem như dữ kiện đã chắc chắn",
    ],
    developmentAdvice: [
      "Giữ sức tưởng tượng nhưng chuyển lý tưởng thành mục tiêu cụ thể có bước thực hiện và tiêu chí quan sát được",
      "Phân biệt cảm nhận cá nhân với bằng chứng bằng cách kiểm tra giả định qua dữ kiện, phản hồi và hành động thực tế",
    ],
    evidence: { body1: "Sun", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Neptune",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Cách tự xác định bản thân và những lý tưởng hoặc hình ảnh vượt khỏi thực tế trước mắt có thể tạo sức kéo giữa hai phía. Sự đối chiếu này thường được nhận thấy qua quan hệ, kỳ vọng hay điều người khác phản chiếu, giúp bạn học cách phân biệt mong muốn riêng với điều đang được lý tưởng hóa mà không phủ nhận ý nghĩa của cả hai.",
    strengths: [
      "Có thể hiểu bản thân qua nhiều lớp ý nghĩa khi sẵn sàng đối chiếu góc nhìn riêng với trải nghiệm trong quan hệ",
      "Có tiềm năng phát triển sự đồng cảm mà vẫn giữ quyền tự xác định, nhu cầu và ranh giới cá nhân",
    ],
    challenges: [
      "Dễ lý tưởng hóa một người hoặc một hướng đi rồi điều chỉnh bản thân quá nhiều theo hình ảnh đó",
      "Có thể khó nhận ra phần nào là mong muốn riêng và phần nào là kỳ vọng hoặc tưởng tượng được phản chiếu từ bên ngoài",
    ],
    developmentAdvice: [
      "Đối chiếu kỳ vọng với hành vi và dữ kiện quan sát được trước khi thay đổi mục tiêu hoặc cách nhìn về bản thân",
      "Nói rõ ranh giới, nhu cầu và mục tiêu, đồng thời chấp nhận rằng một người hay con đường có thể vừa có ý nghĩa vừa không hoàn hảo",
    ],
    evidence: { body1: "Sun", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Neptune",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Hải Vương",
    coreMeaning:
      "Bản sắc và khả năng tưởng tượng, cảm nhận biểu tượng thường phối hợp tương đối tự nhiên. Dòng chảy này có thể giúp bạn kết nối mục tiêu với ý nghĩa cá nhân và nhận ra những sắc thái cảm xúc hoặc bối cảnh tinh tế, nhưng cảm nhận quen thuộc vẫn là một góc nhìn cần được kiểm chứng chứ không phải kết luận luôn đúng.",
    strengths: [
      "Có thể đưa sáng tạo, hình dung và sự nhạy cảm với bối cảnh vào cách thể hiện mình khá tự nhiên",
      "Thường thuận lợi trong việc tìm lớp ý nghĩa cá nhân giúp mục tiêu trở nên có sức sống và dễ gắn bó hơn",
    ],
    challenges: [
      "Dễ tin vào cảm nhận quen thuộc mà chưa chủ động tìm dữ kiện hoặc góc nhìn khác để kiểm tra",
      "Có thể để một lý tưởng đẹp nhưng mơ hồ thay cho kế hoạch cụ thể vì cách hình dung diễn ra quá tự nhiên",
    ],
    developmentAdvice: [
      "Dùng tưởng tượng để tạo nhiều phương án rồi đánh giá từng phương án bằng tiêu chí và phản hồi thực tế",
      "Biến cảm hứng thành sản phẩm hoặc hành động có mốc hoàn thành để nhận ra cả năng lực lẫn điểm mù",
    ],
    evidence: { body1: "Sun", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Neptune",
    aspect: "square",
    title: "Mặt Trời vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa bản sắc, ý chí và thế giới lý tưởng hoặc tưởng tượng có thể khiến mục tiêu khó chuyển thành hướng đi rõ ràng. Khoảng cách giữa điều hình dung và điều đang diễn ra không định sẵn thất vọng; nó có thể trở thành động lực xây khả năng phân biệt, kiểm chứng và tạo sáng tạo có cấu trúc.",
    strengths: [
      "Có thể phát triển khả năng biến trí tưởng tượng thành lựa chọn có cân nhắc và điểm neo thực tế",
      "Ma sát có thể thúc đẩy việc xây quy trình sáng tạo rõ ràng thay vì chỉ chờ cảm hứng hoàn hảo",
    ],
    challenges: [
      "Dễ né quyết định khi hình ảnh lý tưởng chưa hoàn hảo hoặc tiếp tục đầu tư dù dữ kiện thực tế đã thay đổi",
      "Có thể khó đặt giới hạn và bước hành động khi mục tiêu, cảm xúc và giả định chưa được gọi tên riêng",
    ],
    developmentAdvice: [
      "Đưa mục tiêu về tiêu chí quan sát được và chia giả định thành ba phần: điều đã biết, điều đang suy đoán và điều đang mong muốn",
      "Đặt sáng tạo trong một cấu trúc có bước nhỏ, giới hạn và thời hạn thực tế để vừa giữ độ mở vừa tạo tiến triển",
    ],
    evidence: { body1: "Sun", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Neptune",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Hải Vương",
    coreMeaning:
      "Bản sắc và trí tưởng tượng hoặc khả năng cảm nhận sắc thái có cơ hội hỗ trợ nhau khi bạn chủ động khai thác. Tiềm năng này có thể mở thêm phương án và kết nối mục tiêu với ý nghĩa sâu hơn, nhưng chỉ trở thành năng lực ổn định qua lựa chọn, luyện tập và kiểm chứng trong hoàn cảnh thực tế.",
    strengths: [
      "Có thể dùng hình dung để mở phương án mới và làm phong phú cách thể hiện mục tiêu cá nhân",
      "Có cơ hội tăng khả năng quan sát sắc thái trong giao tiếp, cảm xúc và bối cảnh khi chủ động rèn luyện",
    ],
    challenges: [
      "Cảm hứng dễ dừng ở mức ý tưởng nếu chưa chọn một hoạt động cụ thể để thực hành đều đặn",
      "Có thể nhận ra nhiều sắc thái nhưng chưa chuyển chúng thành quyết định hoặc kỹ năng có thể áp dụng",
    ],
    developmentAdvice: [
      "Chọn một hoạt động cụ thể để biến tưởng tượng thành sản phẩm hoặc kỹ năng và theo dõi tiến bộ qua thực hành",
      "Ghi lại giả định, kiểm tra qua phản hồi và dùng sự nhạy cảm như dữ liệu tham khảo thay vì thay thế bằng chứng",
    ],
    evidence: { body1: "Sun", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Mặt Trời đồng cung Sao Diêm Vương",
    coreMeaning:
      "Bản sắc và ý chí có xu hướng hòa trộn mạnh với nhu cầu đi tới gốc vấn đề, giữ quyền chủ động và tạo thay đổi có ý nghĩa. Cường độ này có thể giúp bạn tập trung bền bỉ vào điều quan trọng, đồng thời cần được định hướng để sức mạnh cá nhân không bị đồng nhất với việc phải kiểm soát mọi diễn biến.",
    strengths: [
      "Có thể tập trung cao, kiên trì và sẵn sàng đối diện những vấn đề khó tránh né",
      "Thường có khả năng thay đổi cách thể hiện bản thân khi nhận ra một mô hình cũ không còn phù hợp",
    ],
    challenges: [
      "Dễ gắn giá trị bản thân với việc phải mạnh, phải giữ quyền chủ động hoặc phải kiểm soát được tình huống",
      "Có thể giữ quá chặt một mục tiêu, quan điểm hay cách thể hiện từng có tác dụng vì xem nó là phần cốt lõi của mình",
    ],
    developmentAdvice: [
      "Phân biệt sức mạnh với kiểm soát và xác định điều gì thực sự cần thay đổi, điều gì chỉ cần điều chỉnh",
      "Dùng cường độ cho mục tiêu có ranh giới, tiêu chí hoàn thành và điểm dừng rõ để biết lúc nào nên tiếp tục hoặc buông cách cũ",
    ],
    evidence: { body1: "Sun", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Pluto",
    aspect: "opposition",
    title: "Mặt Trời đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Cách tự xác định bản thân và các vấn đề về ảnh hưởng, quyền tự quyết hoặc thay đổi sâu có thể tạo sức kéo giữa hai phía, thường rõ hơn qua quan hệ và bối cảnh bên ngoài. Những tình huống có kỳ vọng mạnh hoặc cạnh tranh ảnh hưởng có thể giúp bạn hiểu cách mình sử dụng sức mạnh cá nhân và phản ứng trước sức mạnh của người khác, mà không có nghĩa bên nào mặc định kiểm soát bên nào.",
    strengths: [
      "Có thể hiểu rõ hơn cách mình sử dụng và phản ứng trước ảnh hưởng trong những quan hệ có cường độ cao",
      "Có tiềm năng giữ bản sắc riêng đồng thời học cách thương lượng ranh giới, trách nhiệm và quyền tự quyết",
    ],
    challenges: [
      "Dễ chỉ nhìn thấy nhu cầu kiểm soát hoặc cường độ ở phía người khác mà chưa nhận ra phần mình góp vào động lực hai chiều",
      "Có thể phản ứng quá mạnh khi cảm thấy quyền tự quyết bị đe dọa hoặc biến bất đồng thành câu chuyện thắng và thua",
    ],
    developmentAdvice: [
      "Tách bất đồng về mục tiêu khỏi cuộc đấu ảnh hưởng và gọi tên rõ quyền hạn, ranh giới cùng phần có thể thương lượng",
      "Kiểm tra phần trách nhiệm của mình trong động lực hai phía trước khi tăng cường độ hoặc kết luận rằng quan hệ không thể hợp tác",
    ],
    evidence: { body1: "Sun", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Pluto",
    aspect: "trine",
    title: "Mặt Trời tam hợp Sao Diêm Vương",
    coreMeaning:
      "Bản sắc và khả năng đi sâu, điều chỉnh những mô hình không còn hiệu quả thường phối hợp tương đối tự nhiên. Dòng chảy này có thể hỗ trợ sự tập trung và bền bỉ trong quá trình thay đổi mà vẫn giữ hướng đi cá nhân, nhưng không phải vấn đề nào cũng cần mức cường độ hoặc chiều sâu như nhau.",
    strengths: [
      "Có thể tập trung khá tự nhiên vào vấn đề cốt lõi và bền bỉ khi một thay đổi sâu thực sự cần thiết",
      "Thường có khả năng điều chỉnh cách làm cũ mà vẫn giữ được mục tiêu và cảm giác tự quyết",
    ],
    challenges: [
      "Dễ cho rằng cách tiếp cận sâu hoặc cường độ cao của mình luôn cần thiết dù vấn đề có thể đơn giản hơn",
      "Có thể duy trì mức kiểm soát lớn vì cách đó đang vận hành hiệu quả và khó nhận ra lúc đã đủ tốt",
    ],
    developmentAdvice: [
      "Dành chiều sâu cho vấn đề thực sự cần chiều sâu và kiểm tra liệu một giải pháp đơn giản hơn đã đáp ứng mục tiêu chưa",
      "Đặt tiêu chí hoàn thành cùng điểm dừng cho quá trình thay đổi để sự bền bỉ không trở thành đào sâu không giới hạn",
    ],
    evidence: { body1: "Sun", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Pluto",
    aspect: "square",
    title: "Mặt Trời vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa bản sắc, ý chí và nhu cầu giữ quyền chủ động hoặc thay đổi sâu có thể làm quá trình hành động mang cường độ cao. Khi thực tế đòi hỏi sửa một cách làm đã gắn với hình ảnh bản thân, áp lực này có thể thúc đẩy sức bền và khả năng tự điều chỉnh nếu được dùng để sửa cấu trúc thay vì biến mọi trở ngại thành cuộc thử sức.",
    strengths: [
      "Có thể phát triển sức bền và năng lực tự điều chỉnh trong những tình huống đòi hỏi thay đổi thực chất",
      "Ma sát có thể giúp nhận ra mô hình cũ cần sửa và rèn cách sử dụng sức mạnh cá nhân có trách nhiệm",
    ],
    challenges: [
      "Dễ cố kiểm soát khi điều cần làm là thích nghi hoặc phản ứng mạnh khi cảm thấy mất quyền chủ động",
      "Có thể tiêu hao nhiều năng lượng để bảo vệ vị thế, mục tiêu hay quan điểm đã trở thành một cuộc đấu bản sắc",
    ],
    developmentAdvice: [
      "Xác định phần có thể kiểm soát và phần cần chấp nhận, rồi chia thay đổi lớn thành các bước có thể đánh giá",
      "Đặt giới hạn cho thời gian và năng lượng đầu tư, dùng ma sát để sửa cách vận hành thay vì cố thắng tình huống",
    ],
    evidence: { body1: "Sun", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SUN-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Sun",
    body2: "Pluto",
    aspect: "sextile",
    title: "Mặt Trời lục hợp Sao Diêm Vương",
    coreMeaning:
      "Bản sắc và khả năng đi tới gốc vấn đề hoặc thay đổi cách làm có cơ hội hỗ trợ nhau khi bạn chủ động khai thác. Tiềm năng này có thể giúp xây sự bền bỉ và cách sử dụng ảnh hưởng cá nhân có ý thức, nhưng hiểu biết sâu chỉ trở thành năng lực khi được chuyển thành hành động có mục tiêu và mốc kiểm tra.",
    strengths: [
      "Có thể học cách nhìn phần cốt lõi của một vấn đề và nhận ra lúc một cách làm cũ cần được giữ, sửa hoặc bỏ",
      "Có cơ hội phát triển sự bền bỉ và cách dùng ảnh hưởng cá nhân để hỗ trợ mục tiêu rõ ràng",
    ],
    challenges: [
      "Có thể nhận ra vấn đề sâu nhưng vẫn giữ hiểu biết ở mức nhận thức mà chưa chuyển thành thay đổi quan sát được",
      "Tiềm năng tập trung khó thành kỹ năng ổn định nếu thiếu một vấn đề cụ thể và mục tiêu thực hành rõ",
    ],
    developmentAdvice: [
      "Chọn một vấn đề cụ thể, xác định hành vi hoặc mô hình cần giữ, sửa hay bỏ và đặt mốc kiểm tra kết quả",
      "Luyện cách dùng ảnh hưởng để hỗ trợ mục tiêu và ranh giới chung, đồng thời đánh giá tiến triển qua hành vi thực tế",
    ],
    evidence: { body1: "Sun", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MERCURY-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mercury",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Thủy",
    coreMeaning:
      "Cảm xúc, ký ức và nhu cầu an toàn có xu hướng hòa trộn mạnh với tư duy và ngôn ngữ, nên bạn có thể suy nghĩ bằng cảm nhận và cần gọi thành lời điều đang diễn ra bên trong. Sự kết hợp này giúp trải nghiệm cảm xúc đi thẳng vào cách tiếp nhận thông tin, đồng thời cần khoảng lùi để phân biệt điều mình đang cảm thấy với điều dữ kiện thực sự cho biết.",
    strengths: [
      "Có thể diễn đạt sắc thái cảm xúc sinh động và ghi nhớ tốt những thông tin gắn với trải nghiệm cá nhân",
      "Thường nhận ra nhanh mối liên hệ giữa điều mình nghĩ, điều mình nói và nhu cầu được thấu hiểu",
    ],
    challenges: [
      "Dễ xem cảm giác tức thời như một kết luận đã được kiểm chứng hoặc suy nghĩ mãi về điều làm mình bất an",
      "Có thể nói ngay từ phản ứng cảm xúc trước khi xác định rõ mình cần chia sẻ, hỏi thêm hay chỉ cần thời gian xử lý",
    ],
    developmentAdvice: [
      "Gọi tên cảm xúc trước, rồi tách riêng dữ kiện, cách diễn giải và nhu cầu của mình khi trao đổi",
      "Cho bản thân một khoảng dừng ngắn trước cuộc trò chuyện nhạy cảm để tư duy hỗ trợ cảm xúc thay vì chỉ lặp lại phản ứng ban đầu",
    ],
    evidence: { body1: "Moon", body2: "Mercury", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MERCURY-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mercury",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Thủy",
    coreMeaning:
      "Nhu cầu cảm xúc và cách lý giải hoặc truyền đạt có thể kéo về hai phía, thường lộ rõ qua đối thoại với người khác. Bạn có thể gặp tình huống một bên cần được cảm nhận và đón nhận, còn bên kia muốn phân tích hoặc giải thích; sự phản chiếu này giúp thấy cả hai phía nếu không mặc định cảm xúc và lý lẽ phải loại trừ nhau.",
    strengths: [
      "Có thể phát triển khả năng nhìn một vấn đề từ cả góc độ cảm xúc lẫn lập luận qua trao đổi hai chiều",
      "Thường nhạy với khoảng cách giữa điều một người nói và điều họ có thể đang cần được lắng nghe",
    ],
    challenges: [
      "Dễ đặt phần lý trí ở phía mình và phần cảm tính ở phía người khác, hoặc đảo ngược vai trò này",
      "Có thể dao động giữa giải thích quá nhiều và thu mình vì cảm thấy đối phương không hiểu trải nghiệm của mình",
    ],
    developmentAdvice: [
      "Trong bất đồng, thử nhắc lại cả dữ kiện lẫn nhu cầu cảm xúc của hai phía trước khi đưa ra kết luận",
      "Phân biệt lúc cần lắng nghe, lúc cần hỏi để làm rõ và lúc cần cùng nhau kiểm tra thông tin",
    ],
    evidence: { body1: "Moon", body2: "Mercury", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MERCURY-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mercury",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Thủy",
    coreMeaning:
      "Cảm xúc và tư duy thường phối hợp tương đối tự nhiên, giúp bạn chuyển trải nghiệm bên trong thành lời và dùng ngôn ngữ để hiểu mình. Dòng chảy này có thể hỗ trợ sự đồng cảm và tiếp thu theo ngữ cảnh, nhưng sự dễ dàng không tự bảo đảm rằng mọi cảm nhận hay cách diễn giải đều chính xác.",
    strengths: [
      "Có thể diễn đạt cảm xúc mạch lạc và tiếp nhận câu chuyện của người khác với độ nhạy về bối cảnh",
      "Thường học và ghi nhớ thuận lợi khi thông tin được nối với hình ảnh, trải nghiệm hoặc ý nghĩa cá nhân",
    ],
    challenges: [
      "Dễ tin vào cách hiểu quen thuộc vì cảm xúc và suy nghĩ đang đồng thuận với nhau",
      "Có thể dùng khả năng nói về cảm xúc khá tốt nhưng chưa đi sâu vào những nhu cầu khó gọi tên",
    ],
    developmentAdvice: [
      "Dùng khả năng diễn đạt tự nhiên để hỏi thêm và kiểm chứng thay vì chỉ củng cố ấn tượng ban đầu",
      "Ghi lại những tình huống cảm xúc phức tạp để nhận diện nhu cầu nằm dưới câu chuyện mình kể về chúng",
    ],
    evidence: { body1: "Moon", body2: "Mercury", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MERCURY-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mercury",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Thủy",
    coreMeaning:
      "Ma sát giữa phản ứng cảm xúc và cách xử lý thông tin có thể khiến đầu óc hoạt động mạnh đúng lúc bạn cần cảm giác an toàn hoặc nghỉ ngơi. Áp lực này dễ tạo phản ứng nói vội, nghĩ nhiều hoặc khó diễn đạt đúng nhu cầu, nhưng cũng có thể rèn khả năng điều tiết và giao tiếp cụ thể khi được xử lý từng bước.",
    strengths: [
      "Có thể phát triển kỹ năng phân tích cảm xúc rất thực tế nhờ thường xuyên phải tháo gỡ chỗ suy nghĩ và cảm nhận va nhau",
      "Ma sát có thể tạo động lực tìm từ ngữ, phương pháp ghi chép hoặc cách trao đổi phù hợp hơn với nhu cầu thật",
    ],
    challenges: [
      "Dễ mắc vào vòng lặp suy nghĩ khi cảm xúc chưa được nhận diện, hoặc phản ứng bằng lời trước khi hiểu điều làm mình căng",
      "Có thể khó tập trung vào thông tin mới khi một ký ức, giọng điệu hay tín hiệu an toàn đang chiếm nhiều chú ý",
    ],
    developmentAdvice: [
      "Khi căng thẳng, giảm tốc độ trao đổi và viết riêng ba mục: điều đã xảy ra, điều mình cảm thấy và điều mình cần",
      "Chọn một việc xử lý thông tin tại một thời điểm, đồng thời tạo nhịp nghỉ để trạng thái cảm xúc không phải cạnh tranh liên tục với suy nghĩ",
    ],
    evidence: { body1: "Moon", body2: "Mercury", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MERCURY-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mercury",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Thủy",
    coreMeaning:
      "Cảm xúc và tư duy có cơ hội hỗ trợ nhau khi bạn chủ động tạo kênh kết nối, chẳng hạn qua trò chuyện, viết lại trải nghiệm hoặc đặt câu hỏi cho chính mình. Tiềm năng này giúp nhu cầu bên trong trở nên dễ hiểu và dễ truyền đạt hơn, nhưng cần được thực hành để không dừng ở khả năng chỉ xuất hiện khi hoàn cảnh thuận lợi.",
    strengths: [
      "Có thể học cách dùng từ ngữ và phản hồi để làm rõ cảm xúc mà không cần phủ nhận tính chủ quan của trải nghiệm",
      "Có cơ hội biến sự tò mò về con người thành kỹ năng lắng nghe và trao đổi tạo cảm giác an toàn",
    ],
    challenges: [
      "Dễ nhận ra cơ hội nói rõ cảm xúc nhưng trì hoãn vì cho rằng người khác sẽ tự hiểu",
      "Khả năng kết nối cảm nhận với suy nghĩ có thể chưa ổn định nếu chỉ được dùng khi tâm trạng và môi trường đều thuận lợi",
    ],
    developmentAdvice: [
      "Duy trì một thực hành ngắn như ghi chú cảm xúc hoặc hỏi lại để xác nhận điều mình đã nghe",
      "Chủ động chọn thời điểm và cách diễn đạt phù hợp để biến sự thấu hiểu tiềm năng thành giao tiếp có thể quan sát được",
    ],
    evidence: { body1: "Moon", body2: "Mercury", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-VENUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Venus",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Kim",
    coreMeaning:
      "Cảm xúc, nhu cầu an toàn và cách cho và nhận sự quan tâm có xu hướng hòa trộn mạnh, nên điều đem lại cảm giác được gắn bó thường nằm rất gần những gì bạn yêu thích và coi trọng. Sự kết hợp này có thể tạo khả năng chăm sóc ấm áp và cảm quan hài hòa, đồng thời cần phân biệt cảm giác an toàn với việc luôn được yêu mến hoặc giữ mọi tương tác êm đẹp.",
    strengths: [
      "Có thể biểu đạt sự quan tâm bằng những lựa chọn tinh tế, phù hợp với nhu cầu cảm xúc của mình và người khác",
      "Thường dễ đưa ký ức, sở thích và cảm nhận về sự hài hòa vào cách tạo không gian gần gũi",
    ],
    challenges: [
      "Dễ đồng nhất việc được chiều lòng hoặc được yêu mến với cảm giác an toàn thực sự",
      "Có thể né một cảm xúc khó chịu để giữ hòa khí, rồi khó nhận ra nhu cầu hoặc giá trị nào đang bị bỏ qua",
    ],
    developmentAdvice: [
      "Trước khi làm vừa lòng người khác, gọi tên điều mình đang cảm thấy, cần gì và thật sự coi trọng điều gì",
      "Thực hành đón nhận bất đồng nhẹ mà không xem đó là dấu hiệu kết nối hay sự yêu mến đã mất đi",
    ],
    evidence: { body1: "Moon", body2: "Venus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-VENUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Venus",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Kim",
    coreMeaning:
      "Nhu cầu cảm xúc và cách tìm sự hòa hợp, trao nhận tình cảm hoặc giữ điều mình coi trọng có thể kéo về hai phía, thường được nhận ra rõ qua quan hệ. Bạn có thể thấy một phía cần được chăm sóc và an toàn còn phía kia muốn dễ chịu hoặc được đón nhận; người khác đôi khi phản chiếu phần bạn chưa thừa nhận, mở ra cơ hội cân bằng thay vì buộc phải chọn một bên.",
    strengths: [
      "Có thể phát triển khả năng nhìn nhu cầu kết nối từ cả góc độ cảm xúc lẫn giá trị của hai phía",
      "Quan hệ có thể giúp nhận ra rõ hơn cách mình muốn cho, nhận và đáp lại sự quan tâm",
    ],
    challenges: [
      "Dễ cho rằng mình là người cần an toàn còn người kia chỉ quan tâm hòa khí hoặc sở thích, hay đảo ngược hai vai này",
      "Có thể dao động giữa chiều theo để được đón nhận và rút về bảo vệ cảm xúc khi mong đợi không gặp nhau",
    ],
    developmentAdvice: [
      "Trong một tương tác quan trọng, nói rõ cả nhu cầu cảm xúc lẫn giá trị hoặc giới hạn của mỗi phía trước khi tìm thỏa hiệp",
      "Khi phản ứng mạnh với lựa chọn của người khác, tự hỏi họ đang phản chiếu mong muốn cho và nhận nào mình chưa gọi tên",
    ],
    evidence: { body1: "Moon", body2: "Venus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-VENUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Venus",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Kim",
    coreMeaning:
      "Nhu cầu cảm xúc và cách biểu đạt sự quan tâm, sở thích hoặc cảm nhận về sự hài hòa thường phối hợp tương đối tự nhiên. Bạn có thể dễ tạo cảm giác dễ chịu và kết nối qua sự chăm sóc có gu, nhưng dòng chảy thuận lợi cũng có thể che khuất nhu cầu khó nói hoặc khiến thói quen quen thuộc được xem là phù hợp mà chưa kiểm tra lại.",
    strengths: [
      "Có thể cảm nhận và biểu đạt sự quan tâm theo cách ấm áp, dễ tiếp nhận và có chú ý tới bầu không khí chung",
      "Thường kết nối khá tự nhiên giữa điều tạo cảm giác thân thuộc với sở thích, giá trị và cách chăm sóc",
    ],
    challenges: [
      "Dễ ưu tiên điều quen thuộc và dễ chịu nên ít nhận ra một nhu cầu hoặc giá trị đã thay đổi",
      "Có thể mặc định người khác hiểu cách mình cho và nhận tình cảm vì sự hòa hợp vốn thường diễn ra khá thuận",
    ],
    developmentAdvice: [
      "Chủ động hỏi lại điều người khác cần thay vì chỉ dựa vào sự tinh tế hoặc nhịp kết nối quen thuộc",
      "Dùng cảm giác hài hòa làm nền để nói cả những nhu cầu kém dễ chịu và thử một lựa chọn mới phù hợp hơn",
    ],
    evidence: { body1: "Moon", body2: "Venus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-VENUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Venus",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Kim",
    coreMeaning:
      "Ma sát giữa nhu cầu cảm xúc và cách tìm hòa hợp, được yêu mến hoặc giữ điều mình coi trọng có thể xuất hiện trong những lựa chọn rất thực tế. Bạn có thể muốn yên ổn nhưng lại dùng cách cho và nhận không đáp ứng nhu cầu thật, hoặc thấy sở thích và ranh giới va vào thói quen gắn bó; áp lực này có thể thúc đẩy kỹ năng giao tiếp nhu cầu và lựa chọn kết nối phù hợp hơn.",
    strengths: [
      "Có thể phát triển sự rõ ràng về ranh giới, giá trị và hình thức chăm sóc thực sự có ích qua việc xử lý va chạm",
      "Ma sát tạo động lực điều chỉnh thói quen cho và nhận để kết nối không chỉ dễ chịu mà còn đáp ứng nhu cầu thật",
    ],
    challenges: [
      "Dễ chiều theo để tránh khó chịu rồi tích tụ thất vọng vì nhu cầu cảm xúc chưa được nói rõ",
      "Có thể tìm cảm giác được yêu mến qua lựa chọn dễ chịu trước mắt dù lựa chọn đó không hợp giá trị hoặc giới hạn lâu dài",
    ],
    developmentAdvice: [
      "Khi có va chạm, nêu một nhu cầu, một giới hạn và một đề nghị cụ thể thay vì chờ người khác tự đoán",
      "Quan sát các lần mình nói đồng ý nhưng sau đó khó chịu để điều chỉnh cách chọn quan hệ, phân bổ thời gian hoặc trao sự quan tâm",
    ],
    evidence: { body1: "Moon", body2: "Venus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-VENUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Venus",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Kim",
    coreMeaning:
      "Nhu cầu cảm xúc và cách tạo kết nối, trao nhận sự quan tâm hoặc thể hiện gu có cơ hội hỗ trợ nhau khi bạn chủ động khai thác. Tiềm năng này phát triển qua những lựa chọn cụ thể như hỏi nhu cầu, tạo không gian dễ chịu hoặc thống nhất cách chăm sóc, chứ không tự động bảo đảm mọi quan hệ đều hài hòa.",
    strengths: [
      "Có cơ hội biến sự nhạy cảm với bầu không khí và sở thích thành những hành động chăm sóc phù hợp",
      "Có thể phát triển cách kết nối vừa tôn trọng cảm xúc vừa phản ánh giá trị và cảm quan riêng",
    ],
    challenges: [
      "Dễ nhận ra một cơ hội tạo gần gũi nhưng bỏ qua nếu chờ người khác chủ động hoặc hoàn cảnh tự thuận lợi",
      "Khả năng tạo hòa hợp có thể chỉ xuất hiện từng lúc nếu chưa được biến thành cách giao tiếp và lựa chọn ổn định",
    ],
    developmentAdvice: [
      "Định kỳ chọn một hành động quan sát được để chăm sóc kết nối, như hỏi nhu cầu, sắp xếp thời gian hoặc tạo không gian phù hợp",
      "Thử nói rõ một sở thích và lắng nghe một sở thích khác để luyện cách tạo hài hòa bằng lựa chọn chung",
    ],
    evidence: { body1: "Moon", body2: "Venus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MARS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mars",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Hỏa",
    coreMeaning:
      "Phản ứng cảm xúc, nhu cầu an toàn và động lực hành động có xu hướng hòa trộn mạnh, nên cảm giác cần bảo vệ mình hoặc điều quan trọng có thể nhanh chóng chuyển thành hành động. Sự kết hợp này đem lại sức chủ động và khả năng phản ứng kịp thời, đồng thời cần khoảng dừng để không mặc định cảm xúc tức thời luôn đòi hỏi phải làm gì đó ngay.",
    strengths: [
      "Có thể huy động năng lượng nhanh để chăm sóc, bảo vệ hoặc giải quyết điều đang ảnh hưởng tới cảm giác an toàn",
      "Thường có khả năng biến cảm xúc rõ ràng thành một hành động trực tiếp thay vì chỉ giữ ở bên trong",
    ],
    challenges: [
      "Dễ hành động từ phản ứng đầu tiên trước khi hiểu mình đang cần được bảo vệ, nghỉ ngơi hay khẳng định điều gì",
      "Có thể xem cảm giác bực bội hoặc bị cản trở là tín hiệu phải phản hồi ngay dù thời điểm chưa phù hợp",
    ],
    developmentAdvice: [
      "Trước một phản ứng mạnh, tạm dừng để gọi tên cảm xúc, nhu cầu và hành động nhỏ nhất thực sự hữu ích",
      "Dùng vận động hoặc một việc cụ thể để giải phóng sức đẩy, rồi mới quyết định cách nói hoặc hành động với người liên quan",
    ],
    evidence: { body1: "Moon", body2: "Mars", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MARS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mars",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Hỏa",
    coreMeaning:
      "Nhu cầu được an toàn và xu hướng hành động hoặc đối mặt với cản trở có thể kéo về hai phía, thường lộ rõ trong tương tác. Bạn có thể thấy một người giữ vai trò nhạy cảm còn người kia trở nên quyết liệt, nhưng hai phía này cũng có thể phản chiếu những phần bên trong cần được nhìn nhận và thương lượng thay vì quy hoàn toàn cho đối phương.",
    strengths: [
      "Có thể phát triển khả năng nhận ra cả nhu cầu được chăm sóc lẫn nhu cầu chủ động thay đổi tình huống qua quan hệ",
      "Sự đối chiếu giúp rèn cách thương lượng giữa bảo vệ cảm xúc và hành động rõ ràng trước vấn đề",
    ],
    challenges: [
      "Dễ đặt sự nhạy cảm ở một phía và sự quyết liệt ở phía kia, khiến mỗi người chỉ bảo vệ một nửa của vấn đề",
      "Có thể luân phiên giữa nhường để giữ an toàn và đối đầu để giành quyền chủ động khi hai nhu cầu chưa được nói rõ",
    ],
    developmentAdvice: [
      "Trong bất đồng, mỗi phía lần lượt nói điều mình cần được bảo vệ và hành động cụ thể mình đang đề nghị",
      "Khi thấy người khác quá nhạy cảm hoặc quá quyết liệt, kiểm tra xem phẩm chất đó đang phản chiếu phần nào mình chưa sử dụng cân bằng",
    ],
    evidence: { body1: "Moon", body2: "Mars", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MARS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mars",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Hỏa",
    coreMeaning:
      "Cảm xúc và động lực hành động thường phối hợp tương đối tự nhiên, giúp bạn dễ chuyển cảm nhận thành quyết định hoặc bảo vệ điều mình quan tâm. Dòng chảy này có thể tạo sự can đảm và phản ứng nhanh, nhưng cũng dễ khiến một cách hành động quen thuộc diễn ra quá trơn tru để bạn dừng lại kiểm tra cảm xúc hoặc tác động của nó.",
    strengths: [
      "Có thể hành động khá tự nhiên khi nhận ra điều gì cần được chăm sóc, bảo vệ hoặc thay đổi",
      "Thường phục hồi động lực thuận lợi khi được trực tiếp làm một việc phù hợp với cảm nhận bên trong",
    ],
    challenges: [
      "Dễ tin rằng phản xạ quen thuộc là phù hợp vì cảm xúc và sức hành động đang cùng hướng",
      "Có thể ít nhận ra tác động lên người khác khi quyết định và hành động diễn ra nhanh mà không gặp nhiều cản trở",
    ],
    developmentAdvice: [
      "Trước khi làm theo một phản xạ hành động quen thuộc, kiểm tra ngắn điều mình đang cảm thấy và kết quả thực tế muốn tạo ra",
      "Chủ động xin phản hồi về tác động của cách khẳng định nhu cầu để sự tự tin đi cùng khả năng điều chỉnh",
    ],
    evidence: { body1: "Moon", body2: "Mars", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MARS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mars",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Hỏa",
    coreMeaning:
      "Ma sát giữa nhu cầu cảm xúc và cách hành động hoặc khẳng định mình có thể khiến cảm giác bực bội tăng nhanh khi cảm giác an toàn bị chạm tới. Phản ứng có thể bị nén rồi bật ra, hoặc hành động đến quá sớm khi cảm xúc còn đang dâng cao; đây không phải dấu hiệu xung đột tất yếu mà là sức ép để rèn điều tiết, ranh giới và khả năng chọn đúng thời điểm.",
    strengths: [
      "Có thể phát triển khả năng nhận diện sức ép sớm và chuyển nó thành hành động bảo vệ ranh giới có mục tiêu",
      "Ma sát tạo động lực xây cách khẳng định nhu cầu rõ ràng mà không phải nén lại hoặc thúc ép quá nhanh",
    ],
    challenges: [
      "Dễ phản ứng nóng hoặc quyết định khi cảm xúc đang chiếm nhiều chú ý, rồi mới nhận ra nhu cầu thật phía dưới",
      "Có thể lặp chu kỳ im lặng chịu đựng rồi hành động bộc phát khi giới hạn đã bị vượt quá lâu",
    ],
    developmentAdvice: [
      "Nhận diện dấu hiệu căng trong cơ thể và nói nhu cầu hoặc giới hạn khi mức bực bội còn có thể trao đổi được",
      "Tách việc cần làm ngay khỏi việc có thể chờ, rồi chọn thời điểm và câu nói cụ thể để khẳng định mình",
    ],
    evidence: { body1: "Moon", body2: "Mars", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-MARS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Mars",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Hỏa",
    coreMeaning:
      "Cảm xúc và động lực hành động có cơ hội hỗ trợ nhau khi bạn chủ động biến tín hiệu bên trong thành một lựa chọn cụ thể. Tiềm năng này có thể giúp nói rõ nhu cầu, bảo vệ điều quan trọng và phản ứng phù hợp trước cản trở, nhưng chỉ trở thành kỹ năng ổn định qua thực hành chứ không tự vận hành trong mọi tình huống.",
    strengths: [
      "Có cơ hội dùng cảm xúc như thông tin để chọn hành động thiết thực thay vì chỉ phản ứng hoặc trì hoãn",
      "Có thể phát triển cách khẳng định nhu cầu vừa rõ ràng vừa lưu ý tới cảm giác an toàn của các bên",
    ],
    challenges: [
      "Dễ nhận ra mình nên hành động nhưng bỏ lỡ cơ hội nếu chờ động lực hoặc hoàn cảnh tự trở nên thuận lợi",
      "Khả năng phối hợp cảm xúc với hành động có thể thiếu ổn định nếu chỉ được dùng trong tình huống ít áp lực",
    ],
    developmentAdvice: [
      "Khi một cảm xúc lặp lại, chọn một hành động nhỏ có thể quan sát được như nêu đề nghị, đặt giới hạn hoặc xử lý một trở ngại",
      "Thực hành câu nói gồm điều đang xảy ra, nhu cầu của mình và bước tiếp theo mong muốn để biến tiềm năng thành kỹ năng",
    ],
    evidence: { body1: "Moon", body2: "Mars", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-JUPITER-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Jupiter",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Mộc",
    coreMeaning:
      "Cảm xúc, nhu cầu thuộc về và xu hướng tìm ý nghĩa có thể hòa trộn mạnh, nên một trải nghiệm bên trong dễ mở rộng thành niềm tin hoặc cách nhìn lớn hơn. Sự kết hợp này có thể giúp bạn động viên, nâng đỡ và tìm hướng đi trong lúc khó khăn, đồng thời cần phân biệt điều đang cảm thấy hoặc hy vọng với toàn bộ bức tranh thực tế.",
    strengths: [
      "Có thể chuyển trải nghiệm cảm xúc thành sự thấu hiểu rộng hơn và lời động viên có sức nâng đỡ",
      "Thường tìm được ý nghĩa trong ký ức hoặc trải nghiệm, từ đó khôi phục cảm giác an toàn và khả năng tiến về phía trước",
    ],
    challenges: [
      "Dễ để cảm xúc tức thời mở rộng thành một kết luận lớn hoặc niềm tin chưa được kiểm chứng",
      "Có thể kỳ vọng quá nhiều vào kết quả tích cực để giữ cảm giác an toàn khi tình huống vẫn cần được đánh giá thực tế",
    ],
    developmentAdvice: [
      "Khi một cảm xúc dẫn tới kết luận lớn, ghi riêng điều đã xảy ra, điều mình tin và dữ kiện còn cần kiểm tra",
      "Giữ niềm hy vọng nhưng xác định một bước thực tế cùng giới hạn nguồn lực trước khi mở rộng cam kết",
    ],
    evidence: { body1: "Moon", body2: "Jupiter", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-JUPITER-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Jupiter",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Mộc",
    coreMeaning:
      "Nhu cầu giữ điều quen thuộc và xu hướng mở rộng qua trải nghiệm hoặc tầm nhìn mới có thể kéo về hai phía, thường hiện rõ trong quan hệ. Một người có thể đại diện cho sự thận trọng còn người kia thúc đẩy niềm tin và khám phá; sự phản chiếu này mở ra đối thoại để vừa chăm sóc nhu cầu cảm xúc vừa không khép lại cơ hội phát triển.",
    strengths: [
      "Có thể phát triển khả năng nhìn một lựa chọn từ cả nhu cầu thuộc về lẫn triển vọng học hỏi và mở rộng",
      "Đối thoại với người khác có thể giúp nhận ra lúc nào cần giữ nền an toàn và lúc nào nên thử một góc nhìn mới",
    ],
    challenges: [
      "Dễ đặt sự dè dặt ở một phía và niềm tin vào hướng mở rộng ở phía kia, khiến mỗi bên chỉ bảo vệ một phần nhu cầu chung",
      "Có thể dao động giữa ở lại với điều quen thuộc và theo một tầm nhìn lớn mà chưa thương lượng giới hạn hoặc mức an toàn cần thiết",
    ],
    developmentAdvice: [
      "Trong quyết định chung, mỗi phía nêu điều cần được giữ ổn định, điều muốn khám phá và giới hạn có thể chấp nhận",
      "Khi thấy người khác quá thận trọng hoặc quá lạc quan, kiểm tra xem họ đang phản chiếu phần nào mình chưa cân bằng",
    ],
    evidence: { body1: "Moon", body2: "Jupiter", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-JUPITER-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Jupiter",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Mộc",
    coreMeaning:
      "Cảm xúc và khả năng nhìn bối cảnh rộng hơn thường phối hợp tương đối tự nhiên, giúp bạn dễ phục hồi tinh thần, học từ trải nghiệm và chia sẻ sự khích lệ. Dòng chảy thuận lợi này không bảo đảm mọi nhận định đều đúng; cảm giác tích cực hoặc góc nhìn quen thuộc vẫn có thể tự củng cố mà ít được kiểm tra bằng dữ kiện và giới hạn thực tế.",
    strengths: [
      "Có thể tìm bối cảnh và ý nghĩa rộng hơn mà không phải phủ nhận cảm xúc đang có",
      "Thường dễ dùng trải nghiệm cá nhân để học hỏi, chia sẻ và động viên người khác theo cách gần gũi",
    ],
    challenges: [
      "Dễ tin vào cảm giác tích cực hoặc triển vọng rộng mà bỏ qua chi tiết, giới hạn hay tín hiệu cần thận trọng",
      "Có thể tiếp tục một cách nhìn quen thuộc vì cảm xúc và niềm tin đang cùng củng cố nó",
    ],
    developmentAdvice: [
      "Dùng sự lạc quan làm điểm khởi đầu, rồi kiểm tra thêm dữ kiện, nguồn lực và một ý kiến khác trước quyết định lớn",
      "Chủ động hỏi điều gì có thể chưa được nhìn thấy khi câu chuyện hiện tại đem lại cảm giác quá dễ chịu hoặc chắc chắn",
    ],
    evidence: { body1: "Moon", body2: "Jupiter", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-JUPITER-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Jupiter",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Mộc",
    coreMeaning:
      "Ma sát giữa nhu cầu cảm xúc và mong muốn mở rộng hoặc kỳ vọng vào điều lớn hơn có thể khiến cảm nhận, kế hoạch hay cam kết vượt quá nguồn lực thực tế. Bạn cũng có thể tìm trải nghiệm mới hoặc một cách lý giải bao quát hơn để tránh nhu cầu chưa được xử lý; sức ép này có thể rèn khả năng kiểm chứng, đặt giới hạn và phát triển mà không bỏ quên nền an toàn bên trong.",
    strengths: [
      "Có thể phát triển phán đoán thực tế nhờ học cách điều chỉnh kỳ vọng theo cả nhu cầu cảm xúc lẫn nguồn lực hiện có",
      "Ma sát tạo động lực phân biệt sự phát triển có nền tảng với việc mở rộng chỉ để thoát khỏi cảm giác không thoải mái",
    ],
    challenges: [
      "Dễ phóng đại cảm xúc hoặc hứa nhiều hơn khả năng thực hiện khi đang cần một triển vọng tích cực",
      "Có thể chạy theo trải nghiệm, kế hoạch hoặc lời giải thích lớn trong khi nhu cầu nghỉ ngơi, chăm sóc hay thuộc về vẫn chưa được đáp ứng",
    ],
    developmentAdvice: [
      "Trước một cam kết mở rộng, đối chiếu mong muốn với thời gian, nguồn lực và nhu cầu cảm xúc đang cần được chăm sóc",
      "Chia kỳ vọng lớn thành bước có thể kiểm chứng, rồi điều chỉnh theo kết quả thực tế thay vì chỉ theo mức hứng khởi ban đầu",
    ],
    evidence: { body1: "Moon", body2: "Jupiter", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-JUPITER-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Jupiter",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Mộc",
    coreMeaning:
      "Nhu cầu cảm xúc và khả năng mở rộng góc nhìn có cơ hội hỗ trợ nhau khi bạn chủ động tạo trải nghiệm hoặc lựa chọn phù hợp. Tiềm năng này có thể giúp thoát khỏi một cách cảm nhận đang mắc kẹt, học từ điều đã trải qua và kết nối cảm giác an toàn với bước phát triển vừa sức, nhưng cần thực hành để trở thành năng lực ổn định.",
    strengths: [
      "Có cơ hội dùng trải nghiệm và góc nhìn mới để hiểu cảm xúc rõ hơn mà vẫn giữ được nền an toàn cần thiết",
      "Có thể phát triển cách chia sẻ và động viên dựa trên điều đã quan sát, học hỏi hoặc thực sự trải qua",
    ],
    challenges: [
      "Dễ nhận ra một hướng mở rộng hữu ích nhưng không thực hiện nếu chờ tâm trạng hoặc hoàn cảnh tự thay đổi",
      "Khả năng nhìn rộng hơn có thể dừng ở ý tưởng nếu chưa gắn với một trải nghiệm hoặc lựa chọn cụ thể",
    ],
    developmentAdvice: [
      "Khi cảm xúc mắc kẹt, chủ động tìm một nguồn thông tin, cuộc trò chuyện hoặc trải nghiệm nhỏ giúp kiểm tra góc nhìn khác",
      "Chọn một cơ hội phát triển vừa sức, nêu rõ điều muốn học và cách đáp ứng nhu cầu nghỉ ngơi hoặc hỗ trợ trong quá trình đó",
    ],
    evidence: { body1: "Moon", body2: "Jupiter", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Thổ",
    coreMeaning:
      "Cảm xúc, nhu cầu an toàn và ý thức về giới hạn hoặc trách nhiệm có xu hướng hòa trộn mạnh, nên bạn có thể tìm sự ổn định bằng cách tự kiểm soát và làm điều cần thiết. Sự kết hợp này hỗ trợ sức bền và khả năng chăm sóc đáng tin cậy, đồng thời cần phân biệt sự trưởng thành với việc luôn phải kìm cảm xúc hoặc tự gánh mọi việc.",
    strengths: [
      "Có thể giữ bình tĩnh và duy trì việc chăm sóc thiết thực khi hoàn cảnh đòi hỏi sự kiên trì",
      "Thường coi trọng sự ổn định, cam kết và những hành động tạo cảm giác an toàn lâu dài",
    ],
    challenges: [
      "Dễ xem nhu cầu cảm xúc là điều phải kiểm soát trước khi cho phép mình nghỉ ngơi hoặc nhận hỗ trợ",
      "Có thể đồng nhất cảm giác an toàn với việc luôn có trách nhiệm, khiến gánh nặng bên trong khó được chia sẻ",
    ],
    developmentAdvice: [
      "Khi tự nhắc mình phải mạnh mẽ, gọi tên cảm xúc và xác định phần trách nhiệm thực sự thuộc về mình",
      "Xây một hình thức hỗ trợ ổn định như nhờ giúp việc cụ thể, đặt lịch nghỉ hoặc nói rõ giới hạn trước khi quá tải",
    ],
    evidence: { body1: "Moon", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Saturn",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Thổ",
    coreMeaning:
      "Nhu cầu được chăm sóc và yêu cầu về trách nhiệm, giới hạn hoặc tự chủ có thể kéo về hai phía, thường được nhận ra qua quan hệ. Một người có thể giữ vai trò cần được nâng đỡ còn người kia đặt khuôn khổ hoặc giữ khoảng cách; sự phản chiếu này mời gọi hai bên cân bằng sự mềm mại với trách nhiệm thay vì cố định nhau trong một vai.",
    strengths: [
      "Có thể phát triển khả năng nhìn một mối quan hệ từ cả nhu cầu cảm xúc lẫn điều kiện cần để duy trì sự ổn định",
      "Đối thoại về vai trò và giới hạn có thể tạo cách chăm sóc rõ ràng, đáng tin cậy hơn cho cả hai phía",
    ],
    challenges: [
      "Dễ đặt sự nhạy cảm ở một phía và sự nghiêm khắc ở phía kia, khiến mỗi bên cảm thấy phần của mình không được hiểu",
      "Có thể dao động giữa tìm kiếm sự nâng đỡ và thu mình để chứng minh khả năng tự chịu trách nhiệm",
    ],
    developmentAdvice: [
      "Trong tương tác căng thẳng, nói rõ điều mình cần được hỗ trợ và giới hạn hoặc cam kết mình có thể đáp ứng",
      "Khi thấy người khác quá phụ thuộc hoặc quá lạnh lùng, kiểm tra xem họ đang phản chiếu nhu cầu nào mình chưa thừa nhận",
    ],
    evidence: { body1: "Moon", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Saturn",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Thổ",
    coreMeaning:
      "Cảm xúc và khả năng tạo cấu trúc, giữ cam kết hoặc chấp nhận giới hạn thường phối hợp tương đối tự nhiên. Bạn có thể biến nhu cầu an toàn thành thói quen bền vững và sự chăm sóc đáng tin cậy, nhưng dòng chảy thuận lợi cũng dễ làm cách tự kiểm soát quen thuộc được xem là phù hợp mà chưa hỏi liệu cảm xúc có đang cần một cách đáp ứng khác.",
    strengths: [
      "Có thể duy trì nhịp sống và trách nhiệm ổn định ngay cả khi tâm trạng thay đổi",
      "Thường thể hiện sự quan tâm qua tính nhất quán, chuẩn bị thực tế và khả năng ở lại với việc khó",
    ],
    challenges: [
      "Dễ dựa vào khả năng tự chủ vốn có nên ít nhận ra lúc mình cần được an ủi hoặc chia sẻ gánh nặng",
      "Có thể giữ một thói quen cảm xúc quá lâu vì cấu trúc quen thuộc vẫn hoạt động khá trơn tru",
    ],
    developmentAdvice: [
      "Dùng nền kỷ luật sẵn có để tạo chỗ cho nghỉ ngơi, kết nối và biểu đạt cảm xúc chứ không chỉ hoàn thành trách nhiệm",
      "Định kỳ hỏi liệu một thói quen đang thật sự tạo an toàn hay chỉ giúp mình tránh thay đổi",
    ],
    evidence: { body1: "Moon", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Saturn",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Thổ",
    coreMeaning:
      "Ma sát giữa nhu cầu cảm xúc và áp lực về giới hạn, trách nhiệm hoặc tiêu chuẩn có thể khiến việc tìm cảm giác an toàn trở nên nặng nề. Bạn có thể trì hoãn nhu cầu của mình để hoàn thành bổn phận, hoặc rút lại khi sợ bị từ chối; sức ép này không định sẵn sự cô lập mà có thể rèn ranh giới, khả năng tự chăm sóc và cách xây hỗ trợ thực tế.",
    strengths: [
      "Có thể phát triển sức bền cảm xúc và khả năng xây sự ổn định từ những bước thực tế, có giới hạn rõ",
      "Ma sát tạo động lực phân biệt trách nhiệm cần thiết với tiêu chuẩn quá cứng hoặc gánh nặng không thuộc về mình",
    ],
    challenges: [
      "Dễ gác nhu cầu cảm xúc sang một bên cho đến khi mệt mỏi, thu mình hoặc cảm thấy không ai có thể hỗ trợ",
      "Có thể tự phê bình khi cần nghỉ ngơi, chăm sóc hoặc trấn an, khiến việc tìm sự giúp đỡ trở nên khó hơn",
    ],
    developmentAdvice: [
      "Chia trách nhiệm thành phần bắt buộc, phần có thể thương lượng và phần có thể nhờ hỗ trợ trước khi nhận thêm việc",
      "Khi sợ bị từ chối, thử nêu một nhu cầu cụ thể với người phù hợp thay vì kết luận trước rằng mình phải tự xử lý",
    ],
    evidence: { body1: "Moon", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Saturn",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Thổ",
    coreMeaning:
      "Nhu cầu cảm xúc và khả năng tạo giới hạn hoặc cấu trúc có cơ hội hỗ trợ nhau khi bạn chủ động xây cách chăm sóc ổn định. Tiềm năng này có thể biến cảm giác bất an thành kế hoạch vừa sức và cam kết rõ ràng, nhưng cần được thực hành qua lựa chọn cụ thể thay vì tự động trở thành sức bền trong mọi hoàn cảnh.",
    strengths: [
      "Có cơ hội biến hiểu biết về nhu cầu bên trong thành lịch trình, ranh giới hoặc nguồn hỗ trợ có thể duy trì",
      "Có thể phát triển cách chăm sóc vừa ấm áp vừa thực tế bằng những cam kết rõ và có khả năng thực hiện",
    ],
    challenges: [
      "Dễ nhận ra cấu trúc nào sẽ giúp mình ổn định nhưng trì hoãn thiết lập vì chưa có áp lực tức thời",
      "Tiềm năng bền bỉ có thể dừng ở ý định nếu chưa chọn một thói quen hoặc giới hạn cụ thể để thực hành",
    ],
    developmentAdvice: [
      "Chọn một nhu cầu cảm xúc đang lặp lại và thiết kế một hỗ trợ nhỏ, rõ thời điểm và trong khả năng duy trì",
      "Thực hành nói một giới hạn cùng điều mình vẫn có thể cam kết để bảo vệ cả kết nối lẫn nguồn lực cá nhân",
    ],
    evidence: { body1: "Moon", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu cảm xúc và thôi thúc tự do hoặc phá vỡ khuôn mẫu có xu hướng hòa trực tiếp với nhau, nên cảm giác an toàn có thể gắn với quyền được phản ứng và sống theo nhịp riêng. Sự kết hợp này hỗ trợ khả năng thích nghi nhanh và tạo cách chăm sóc khác với thông lệ, đồng thời cần phân biệt nhu cầu đổi mới thật sự với phản ứng muốn thay đổi ngay khi cảm thấy bị bó buộc.",
    strengths: [
      "Có thể nhận ra nhanh lúc một thói quen cảm xúc hoặc cách chăm sóc cũ không còn phù hợp",
      "Thường có khả năng tạo không gian gần gũi vẫn tôn trọng sự khác biệt và quyền tự chủ của mỗi người",
    ],
    challenges: [
      "Dễ thay đổi phản ứng hoặc khoảng cách quá nhanh khi cảm thấy tự do cá nhân bị hạn chế",
      "Có thể đồng nhất cảm giác bất an tức thời với việc phải phá bỏ khuôn mẫu hoặc rời khỏi nhịp ổn định hiện có",
    ],
    developmentAdvice: [
      "Trước một thay đổi đột ngột, gọi tên điều đang gây bí bách và phần tự do cụ thể mình thực sự cần",
      "Tạo một lựa chọn linh hoạt nhưng có điểm neo, như thống nhất khoảng riêng và thời điểm quay lại trao đổi",
    ],
    evidence: { body1: "Moon", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Uranus",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu gần gũi và ổn định có thể kéo ngược chiều với mong muốn độc lập hoặc thay đổi, thường hiện rõ qua quan hệ và môi trường. Một phía có thể tìm sự quen thuộc còn phía kia đòi khoảng riêng hoặc phá nhịp cũ; sự phản chiếu này mời gọi hai bên thương lượng cách vừa duy trì kết nối vừa cho phép khác biệt và chuyển động.",
    strengths: [
      "Có thể phát triển khả năng nhìn một mối quan hệ từ cả nhu cầu thuộc về lẫn nhu cầu tự do của mỗi người",
      "Những tương tác khác biệt có thể giúp nhận ra hình thức kết nối linh hoạt hơn mà vẫn có sự tin cậy",
    ],
    challenges: [
      "Dễ đặt vai cần ổn định ở một phía và vai muốn thoát khỏi ràng buộc ở phía kia, rồi đổi vai khi căng thẳng tăng",
      "Có thể trải nghiệm sự gần gũi và độc lập như hai lựa chọn loại trừ nhau nếu kỳ vọng chưa được nói rõ",
    ],
    developmentAdvice: [
      "Trong quan hệ, thống nhất điều cần giữ ổn định, phạm vi mỗi người được tự quyết và cách báo trước khi kế hoạch thay đổi",
      "Khi phản ứng mạnh với sự thất thường hoặc bám giữ của người khác, kiểm tra nhu cầu đối lập nào trong mình đang được phản chiếu",
    ],
    evidence: { body1: "Moon", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Uranus",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Thiên Vương",
    coreMeaning:
      "Cảm xúc và khả năng thích nghi với thay đổi thường phối hợp tương đối tự nhiên, giúp bạn dễ làm mới thói quen mà vẫn giữ được cảm giác là chính mình. Dòng chảy này hỗ trợ cách nuôi dưỡng cởi mở và tôn trọng khác biệt, nhưng cũng có thể khiến phản xạ đổi nhịp hoặc tách khỏi điều quen thuộc diễn ra quá dễ để bạn kiểm tra tác động lâu dài.",
    strengths: [
      "Có thể điều chỉnh thói quen linh hoạt khi hoàn cảnh đổi mà không nhất thiết đánh mất cảm giác an toàn",
      "Thường dễ đón nhận cách sống hoặc nhu cầu cảm xúc khác biệt và tạo không gian cho mỗi người được là mình",
    ],
    challenges: [
      "Dễ tin rằng thay đổi theo trực giác luôn phù hợp vì khả năng thích nghi vốn diễn ra khá thuận",
      "Có thể rời một nhịp chăm sóc hoặc cam kết quen thuộc trước khi nhận ra điều gì vẫn cần được duy trì",
    ],
    developmentAdvice: [
      "Khi muốn đổi một thói quen, xác định cả lợi ích mới và phần ổn định vẫn cần được bảo toàn",
      "Chủ động hỏi người liên quan về tác động của thay đổi thay vì chỉ dựa vào cảm giác mình sẽ thích nghi được",
    ],
    evidence: { body1: "Moon", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Uranus",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu an toàn và thôi thúc tự do hoặc thay đổi có thể làm phản ứng cảm xúc tăng nhanh khi nhịp quen thuộc bị gián đoạn. Bạn có thể vừa muốn được ổn định vừa khó chịu với cảm giác bị ràng buộc, dẫn tới thay đổi đột ngột hoặc cố giữ quá chặt; sức ép này có thể rèn khả năng điều chỉnh nhịp, báo trước nhu cầu và đổi mới mà không phá bỏ mọi điểm tựa.",
    strengths: [
      "Có thể phát triển năng lực nhận diện sớm cấu trúc đã quá chật và thay đổi nó theo từng bước có chủ đích",
      "Ma sát tạo động lực xây hình thức an toàn linh hoạt hơn, trong đó khác biệt và khoảng riêng được nói rõ",
    ],
    challenges: [
      "Dễ phản ứng mạnh hoặc đổi kế hoạch đột ngột khi cảm thấy bị kiểm soát, dù nhu cầu thật chưa được diễn đạt",
      "Có thể lặp chu kỳ bám vào điều quen thuộc rồi phá nhịp để giành lại tự do khi căng thẳng đã tích tụ",
    ],
    developmentAdvice: [
      "Khi thấy bí bách, tách điều cần thay ngay khỏi điều có thể thử nghiệm từng bước và báo trước cho người liên quan",
      "Tạo phương án chuyển tiếp có điểm neo cụ thể, như thời gian ổn định, kênh liên lạc hoặc thói quen chăm sóc vẫn được giữ",
    ],
    evidence: { body1: "Moon", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Uranus",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu cảm xúc và khả năng đổi mới có cơ hội hỗ trợ nhau khi bạn chủ động thử cách phản ứng, chăm sóc hoặc tổ chức đời sống linh hoạt hơn. Tiềm năng này giúp mở khỏi thói quen đã hạn chế tự do mà vẫn giữ điểm tựa cần thiết, nhưng chỉ thành kỹ năng khi được khai thác qua những thử nghiệm cụ thể.",
    strengths: [
      "Có cơ hội dùng góc nhìn khác để tìm cách đáp ứng nhu cầu cảm xúc mà khuôn mẫu cũ chưa giải quyết được",
      "Có thể phát triển thói quen linh hoạt, tôn trọng sự độc lập mà vẫn duy trì kết nối và chăm sóc",
    ],
    challenges: [
      "Dễ thấy một cách làm mới có tiềm năng nhưng tiếp tục thói quen cũ nếu không chủ động tạo cơ hội thử nghiệm",
      "Khả năng thích nghi có thể dừng ở ý tưởng nếu chưa xác định điều gì sẽ đổi và điểm an toàn nào sẽ được giữ",
    ],
    developmentAdvice: [
      "Chọn một thói quen đang gây gò bó và thử một điều chỉnh nhỏ, có thời hạn cùng tiêu chí quan sát kết quả",
      "Nói rõ khoảng tự do mình cần và hình thức kết nối vẫn cam kết để biến đổi mới thành cách sống có thể duy trì",
    ],
    evidence: { body1: "Moon", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Hải Vương",
    coreMeaning:
      "Nhu cầu cảm xúc, trí tưởng tượng và độ nhạy với những tín hiệu tinh tế có xu hướng hòa trực tiếp vào nhau, nên điều bạn cảm nhận có thể nhanh chóng định hình cách tìm kiếm an toàn và gắn bó. Chính sự hòa trộn này nuôi dưỡng đồng cảm và đời sống nội tâm phong phú, đồng thời khiến ranh giới giữa cảm xúc của mình, ấn tượng từ môi trường và điều đang được lý tưởng hóa đôi lúc khó phân biệt.",
    strengths: [
      "Có thể tiếp nhận sắc thái cảm xúc tinh tế và đáp lại người khác bằng sự mềm mại, tưởng tượng hoặc chăm sóc giàu thấu cảm",
      "Thường có khả năng chuyển trải nghiệm bên trong thành hình ảnh, câu chuyện hoặc hoạt động sáng tạo có sức gợi",
    ],
    challenges: [
      "Dễ hấp thụ bầu không khí xung quanh hoặc lý tưởng hóa một gắn bó rồi xem ấn tượng đó như nhu cầu thật của mình",
      "Có thể tìm sự an toàn trong mơ mộng hoặc hòa theo cảm xúc của người khác khi chưa gọi tên được điều đang diễn ra bên trong",
    ],
    developmentAdvice: [
      "Khi cảm xúc trở nên mơ hồ, gọi tên điều mình biết, điều mình đang cảm và điều mình chỉ đang giả định",
      "Duy trì một điểm neo cụ thể như ghi chép, vận động, nhịp nghỉ đều hoặc ranh giới thời gian trước khi quyết định theo một ấn tượng mạnh",
    ],
    evidence: { body1: "Moon", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Neptune",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Nhu cầu an toàn và gắn bó có thể kéo về một phía, trong khi xu hướng lý tưởng hóa, hòa tan ranh giới hoặc né tránh điều khó chịu kéo về phía đối diện; sự phân cực này thường hiện rõ qua quan hệ và môi trường. Một phía có thể tìm sự chăm sóc chắc chắn còn phía kia mang kỳ vọng mơ hồ hoặc né tránh thực tế, mời gọi bạn nhận lại cả hai nhu cầu thay vì giao một vai cho người khác.",
    strengths: [
      "Có thể phát triển khả năng nhìn quan hệ từ cả nhu cầu được nâng đỡ lẫn những ước mong và sắc thái chưa dễ diễn đạt",
      "Sự phản chiếu qua người khác có thể giúp nhận ra nơi lòng cảm thông cần đi cùng ranh giới và thỏa thuận rõ",
    ],
    challenges: [
      "Dễ gán phần nhạy cảm, mơ hồ hoặc thiếu thực tế cho người khác trong khi xem mình là phía duy nhất đang giữ thực tế, rồi đổi vai khi căng thẳng tăng",
      "Có thể lý tưởng hóa một người hoặc sự gắn bó, sau đó hụt hẫng khi nhu cầu an toàn thực tế không được đáp ứng",
    ],
    developmentAdvice: [
      "Trong quan hệ, nói riêng điều mình cần, điều mình hy vọng và bằng chứng thực tế đang có thay vì chờ đối phương tự cảm nhận",
      "Khi bị cuốn vào kỳ vọng hoặc thất vọng, kiểm tra phần nào thuộc trải nghiệm của mình và phần nào đang được phản chiếu qua người khác",
    ],
    evidence: { body1: "Moon", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Neptune",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Hải Vương",
    coreMeaning:
      "Cảm xúc, trí tưởng tượng và khả năng tiếp nhận sắc thái tinh tế thường phối hợp tương đối tự nhiên, giúp sự đồng cảm và biểu đạt nội tâm diễn ra mềm mại. Dòng chảy thuận lợi này có thể hỗ trợ chăm sóc và sáng tạo, nhưng cũng dễ khiến một cảm nhận giàu sức gợi được tin theo mà chưa kiểm tra liệu nó có phản ánh đầy đủ thực tế hay ranh giới của các bên.",
    strengths: [
      "Có thể nhận ra những sắc thái cảm xúc khó nói thành lời và chuyển chúng thành sự lắng nghe, chăm sóc hoặc biểu đạt sáng tạo",
      "Thường dễ dùng tưởng tượng để hiểu nhiều lớp của một trải nghiệm mà không cần ép cảm xúc vào khuôn cứng",
    ],
    challenges: [
      "Dễ tin vào cảm nhận ban đầu vì nó đến tự nhiên và có vẻ nhất quán với bầu không khí xung quanh",
      "Có thể bỏ qua việc hỏi lại hoặc xác minh khi sự đồng cảm khiến mình tưởng đã hiểu đầy đủ nhu cầu của người khác",
    ],
    developmentAdvice: [
      "Giữ sự nhạy bén như một giả thuyết hữu ích, rồi hỏi lại người liên quan hoặc đối chiếu với dữ kiện trước khi kết luận",
      "Dành cho trí tưởng tượng một hình thức cụ thể như viết, vẽ, âm nhạc hoặc chăm sóc có giới hạn rõ để dòng cảm xúc có nơi đi",
    ],
    evidence: { body1: "Moon", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Neptune",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu cảm xúc hoặc an toàn với lý tưởng hóa, sự mơ hồ và ranh giới dễ hòa tan có thể làm cảm nhận khó tách khỏi điều đang thực sự xảy ra. Khi điều khó chịu xuất hiện, bạn có thể tìm nơi trú trong kỳ vọng, tưởng tượng hoặc né tránh tín hiệu không hợp ý; sức ép này đòi hỏi khả năng neo vào thực tế, kiểm chứng và chăm sóc bản thân bằng những giới hạn rõ ràng.",
    strengths: [
      "Có thể phát triển năng lực phân biệt sắc thái cảm xúc tinh tế với giả định, từ đó dùng độ nhạy theo cách thực tế hơn",
      "Ma sát tạo động lực biến tưởng tượng hoặc lòng cảm thông thành hành động chăm sóc có cấu trúc và ranh giới",
    ],
    challenges: [
      "Dễ nhầm một cảm nhận mạnh với sự thật đã được xác minh, nhất là khi đang cần được trấn an hoặc muốn tránh thất vọng",
      "Có thể trì hoãn cuộc trao đổi khó, bỏ qua dấu hiệu thực tế hoặc để ranh giới mờ đi nhằm giữ một cảm giác an toàn tạm thời",
    ],
    developmentAdvice: [
      "Khi thấy rối hoặc muốn né tránh, ghi riêng sự kiện quan sát được, cảm xúc, nhu cầu và giả định trước khi hành động",
      "Đặt một ranh giới cụ thể về thời gian, trách nhiệm hoặc mức hỗ trợ, rồi kiểm tra lại bằng trao đổi trực tiếp thay vì suy đoán",
    ],
    evidence: { body1: "Moon", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Neptune",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Hải Vương",
    coreMeaning:
      "Nhu cầu cảm xúc, trí tưởng tượng và sự đồng cảm có cơ hội hỗ trợ nhau khi bạn chủ động tạo một cách tiếp nhận và biểu đạt phù hợp. Tiềm năng này có thể làm phong phú việc chăm sóc, quan sát nội tâm hoặc sáng tạo, nhưng cần được khai thác bằng hoạt động có cấu trúc thay vì chờ cảm hứng hay sự thấu hiểu tự xuất hiện.",
    strengths: [
      "Có cơ hội dùng nghệ thuật, lắng nghe hoặc quan sát cảm xúc để hiểu điều tinh tế mà phản ứng quen thuộc dễ bỏ qua",
      "Có thể phát triển cách chăm sóc giàu tưởng tượng nhưng vẫn gắn với nhu cầu cụ thể và khả năng thực hiện",
    ],
    challenges: [
      "Dễ nhận ra một hướng biểu đạt hoặc kết nối hữu ích nhưng không biến nó thành thực hành đều đặn",
      "Tiềm năng đồng cảm có thể dừng ở thiện ý nếu chưa hỏi rõ người khác cần gì và mình có thể hỗ trợ đến đâu",
    ],
    developmentAdvice: [
      "Chọn một hoạt động cụ thể như viết nhật ký, làm nghệ thuật hoặc lắng nghe có thời lượng để chuyển cảm nhận thành trải nghiệm quan sát được",
      "Trước khi hỗ trợ, hỏi rõ nhu cầu, giới hạn và bước tiếp theo để lòng cảm thông trở thành hành động vừa sức",
    ],
    evidence: { body1: "Moon", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Mặt Trăng đồng cung Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu cảm xúc, cảm giác an toàn và xu hướng đi sâu hoặc nắm quyền chủ động có thể hòa trực tiếp vào nhau, nên phản ứng bản năng thường muốn hiểu tận gốc điều đang diễn ra. Sự hòa trộn này hỗ trợ sức chịu đựng và khả năng tái cấu trúc đời sống cảm xúc, đồng thời khiến việc tìm an toàn dễ gắn với kiểm soát, giữ chặt hoặc khó để lộ phần dễ tổn thương.",
    strengths: [
      "Có thể ở lại với những cảm xúc phức tạp đủ lâu để nhận ra nhu cầu sâu hơn và điều cần thay đổi",
      "Thường có sức bền để buông một thói quen phòng vệ cũ và xây lại cách chăm sóc phù hợp hơn",
    ],
    challenges: [
      "Dễ xem việc phải hiểu hoặc kiểm soát toàn bộ tình huống là điều kiện để mình cảm thấy an toàn",
      "Có thể giữ cảm xúc, nhu cầu hoặc sự gắn bó quá chặt khi việc thừa nhận phần dễ tổn thương tạo cảm giác mất quyền chủ động",
    ],
    developmentAdvice: [
      "Khi cường độ tăng, gọi tên điều mình đang cần để an toàn và phần nào mình đang cố kiểm soát trước khi phản ứng",
      "Thử chia sẻ một nhu cầu cụ thể, đặt ranh giới rõ và cho phép buông một chiến lược phòng vệ không còn hữu ích",
    ],
    evidence: { body1: "Moon", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Pluto",
    aspect: "opposition",
    title: "Mặt Trăng đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu an toàn và gắn bó có thể kéo về một phía, trong khi cường độ, quyền lực, kiểm soát hoặc đòi hỏi thay đổi sâu kéo về phía đối diện; sự phân cực này thường hiện rõ qua quan hệ. Một phía có thể tìm sự chăm sóc và ổn định còn phía kia thúc ép, giữ quyền chủ động hoặc đặt vấn đề sâu hơn, mời gọi bạn nhận lại cả hai nhu cầu thay vì cố định chúng thành vai của mỗi người.",
    strengths: [
      "Có thể phát triển khả năng nhìn một quan hệ từ cả nhu cầu được nâng đỡ lẫn nhu cầu thay đổi cấu trúc quyền lực hoặc ranh giới",
      "Những phản chiếu mạnh qua người khác có thể giúp nhận ra cách gắn bó nào cần được thương lượng lại rõ ràng hơn",
    ],
    challenges: [
      "Dễ gán phần kiểm soát, cường độ hoặc sức ép thay đổi cho người khác trong khi xem mình là phía chỉ đang tìm an toàn, rồi đổi vai khi căng thẳng tăng",
      "Có thể trải nghiệm sự gần gũi và quyền tự chủ như hai phía đối lập nếu nhu cầu cùng giới hạn chưa được nói trực tiếp",
    ],
    developmentAdvice: [
      "Trong tương tác căng thẳng, nói rõ nhu cầu an toàn, điều mình muốn thay đổi và giới hạn quyền quyết định của mỗi bên",
      "Khi cảm thấy người khác đang giữ quyền lực hoặc gây sức ép, kiểm tra phần kiểm soát hay nhu cầu chuyển đổi nào trong mình đang được phản chiếu",
    ],
    evidence: { body1: "Moon", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Pluto",
    aspect: "trine",
    title: "Mặt Trăng tam hợp Sao Diêm Vương",
    coreMeaning:
      "Cảm xúc và khả năng đi sâu, chịu cường độ hoặc tái cấu trúc thường phối hợp tương đối tự nhiên, giúp bạn nhận diện những lớp nhu cầu khó thấy và phục hồi sau thay đổi. Dòng chảy thuận lợi này tạo sức bền bên trong, nhưng cũng dễ khiến bạn quá tin vào khả năng đọc động cơ hoặc quen xử lý mọi trải nghiệm như thể nó luôn cần một ý nghĩa sâu hơn.",
    strengths: [
      "Có thể tiếp xúc với cảm xúc phức tạp mà vẫn tìm được điều cần buông, giữ hoặc thay đổi để phục hồi",
      "Thường có khả năng biến trải nghiệm khó thành hiểu biết thực tế về nhu cầu, ranh giới và cách chăm sóc",
    ],
    challenges: [
      "Dễ tin rằng mình đã nhìn thấy động cơ sâu của người khác dù chưa kiểm tra trực tiếp",
      "Có thể đào sâu một cảm xúc hoặc tình huống theo thói quen khi trải nghiệm đó chỉ cần được ghi nhận và để trôi qua",
    ],
    developmentAdvice: [
      "Giữ nhận định về động cơ như một giả thuyết và trao đổi trực tiếp trước khi hành động theo nó",
      "Trước khi phân tích sâu, hỏi liệu lúc này mình cần hiểu thêm, đặt ranh giới hay đơn giản cho cảm xúc thời gian lắng xuống",
    ],
    evidence: { body1: "Moon", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Pluto",
    aspect: "square",
    title: "Mặt Trăng vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu an toàn với cường độ, nhu cầu kiểm soát hoặc nỗi lo mất quyền chủ động có thể làm phản ứng cảm xúc tăng mạnh khi bạn cảm thấy bị đe dọa. Sức ép này có thể dẫn tới giữ chặt, phòng vệ hoặc cố buộc tình huống phải thay đổi ngay, đồng thời tạo cơ hội rèn khả năng điều tiết, đặt ranh giới và phân biệt nhu cầu hiện tại với phản ứng tự bảo vệ.",
    strengths: [
      "Có thể phát triển năng lực nhận ra sớm điều đang kích hoạt phản ứng phòng vệ và chuyển cường độ thành thay đổi có chủ đích",
      "Ma sát tạo động lực xây ranh giới rõ hơn và thay thế cách tìm an toàn dựa trên kiểm soát bằng lựa chọn trực tiếp hơn",
    ],
    challenges: [
      "Dễ phản ứng quá nhanh hoặc cố giành lại quyền chủ động khi một gắn bó, giới hạn hay nhu cầu cảm xúc có vẻ bị đe dọa",
      "Có thể nhầm phản ứng phòng vệ tích lũy với nhu cầu của tình huống hiện tại, khiến trao đổi trở nên căng hơn cần thiết",
    ],
    developmentAdvice: [
      "Khi cường độ tăng, trì hoãn phản ứng đủ lâu để gọi tên cảm xúc, nhu cầu hiện tại và điều mình đang giả định",
      "Nói rõ ranh giới hoặc thay đổi cụ thể mình cần thay vì kiểm tra, giữ chặt hay gây sức ép để tìm cảm giác an toàn",
    ],
    evidence: { body1: "Moon", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MOON-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Moon",
    body2: "Pluto",
    aspect: "sextile",
    title: "Mặt Trăng lục hợp Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu cảm xúc và khả năng đi sâu, đặt lại ranh giới hoặc chuyển hóa có cơ hội hỗ trợ nhau khi bạn chủ động quan sát và hành động. Tiềm năng này có thể giúp dùng trải nghiệm khó để hiểu nhu cầu rõ hơn và xây cách chăm sóc vững hơn, nhưng cần được khai thác bằng bước cụ thể thay vì chỉ dừng ở insight.",
    strengths: [
      "Có cơ hội quan sát những lớp cảm xúc khó thấy và chuyển hiểu biết đó thành ranh giới hoặc thói quen hỗ trợ thiết thực",
      "Có thể phát triển cách dùng trải nghiệm khó như dữ liệu để trưởng thành mà không để nó quyết định toàn bộ phản ứng hiện tại",
    ],
    challenges: [
      "Dễ nhận ra một chiến lược phòng vệ không còn hữu ích nhưng vẫn giữ nguyên nếu chưa chủ động thử cách đáp ứng khác",
      "Insight về cảm xúc có thể dừng ở phân tích nếu chưa được chuyển thành trao đổi, giới hạn hoặc hành động có thể quan sát",
    ],
    developmentAdvice: [
      "Chọn một phản ứng lặp lại, xác định nhu cầu an toàn bên dưới và thử một hành động thay thế cụ thể trong tình huống kế tiếp",
      "Biến điều đã nhận ra thành một cuộc trao đổi trực tiếp, một ranh giới rõ hoặc một thói quen chăm sóc có thời điểm thực hiện",
    ],
    evidence: { body1: "Moon", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-VENUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Venus",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Kim",
    coreMeaning:
      "Tư duy, lời nói và cách đánh giá điều mình thấy đáng quý hoặc hấp dẫn có xu hướng hòa trực tiếp vào nhau, nên ý tưởng thường được định hình cùng sắc thái, thẩm mỹ và tác động lên quan hệ. Sự kết hợp này hỗ trợ cách diễn đạt dễ tiếp nhận và có cân nhắc, đồng thời có thể khiến nhu cầu giữ hòa khí hoặc được đồng thuận ảnh hưởng đến điều bạn chọn nói và cách hình thành quan điểm.",
    strengths: [
      "Có thể lựa chọn từ ngữ tinh tế, nhận ra sắc thái trong trao đổi và trình bày ý tưởng theo cách người khác dễ tiếp nhận",
      "Thường có khả năng kết nối nội dung với thẩm mỹ, giá trị hoặc bối cảnh quan hệ mà không tách chúng thành những phần rời rạc",
    ],
    challenges: [
      "Dễ tránh nói điều khó nghe để giữ hòa khí, ngay cả khi sự rõ ràng sẽ hữu ích hơn cho mối quan hệ",
      "Có thể nghiêng về điều nghe dễ chịu hoặc được đồng thuận, khiến quan điểm thật và thông tin cần thiết chưa được diễn đạt đầy đủ",
    ],
    developmentAdvice: [
      "Trước một trao đổi quan trọng, phân biệt điều mình thật sự nghĩ với cách mình đang điều chỉnh lời nói để được đón nhận",
      "Giữ sự tinh tế trong cách trình bày nhưng kiểm tra riêng tính rõ ràng, chính xác và phần khó vẫn cần được nói ra",
    ],
    evidence: { body1: "Mercury", body2: "Venus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-VENUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Venus",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Kim",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội phối hợp thuận lợi với thẩm mỹ, hệ giá trị và khả năng tạo hòa khí khi bạn chủ động sử dụng chúng cùng nhau. Tiềm năng này có thể hỗ trợ viết, nói, thương lượng hoặc thiết kế thông điệp vừa rõ vừa dễ tiếp nhận, nhưng chỉ trở thành kỹ năng ổn định qua luyện tập và những lựa chọn có chủ đích.",
    strengths: [
      "Có cơ hội kết hợp lập luận với sắc thái và điều người nghe coi trọng để tạo trao đổi hợp tác hơn",
      "Có thể phát triển khả năng dùng bố cục, ngôn ngữ hoặc thẩm mỹ để làm ý tưởng rõ ràng và có sức gợi hơn",
    ],
    challenges: [
      "Dễ nhận ra mình trình bày khá dễ nghe nhưng không rèn thêm độ chính xác, cấu trúc hoặc khả năng xử lý bất đồng",
      "Tiềm năng sáng tạo và giao tiếp có thể dừng ở sở thích nếu chưa được đưa vào một thực hành hoặc sản phẩm cụ thể",
    ],
    developmentAdvice: [
      "Chọn một kỹ năng như viết, thuyết trình hoặc thương lượng để luyện có mục tiêu, phản hồi và nhịp thực hành rõ",
      "Dùng hình thức và sắc thái để làm thông điệp dễ hiểu hơn, rồi kiểm tra rằng nội dung chính xác không bị sự dễ nghe lấn át",
    ],
    evidence: { body1: "Mercury", body2: "Venus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-MARS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Mars",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Hỏa",
    coreMeaning:
      "Tư duy, lời nói và xung lực hành động có xu hướng hòa trực tiếp vào nhau, nên ý tưởng có thể nhanh chóng trở thành quyết định, phát biểu hoặc bước đi cụ thể. Sự hợp nhất này tạo đầu óc sắc bén và sức thúc đẩy mạnh để xử lý vấn đề, đồng thời khiến khoảng dừng giữa nhận thức, ngôn ngữ và phản ứng dễ bị rút ngắn.",
    strengths: [
      "Có thể nắm nhanh điểm cần giải quyết và truyền đạt quan điểm với sự trực tiếp, năng lượng và quyết đoán",
      "Thường có khả năng biến việc học, lập luận hoặc trao đổi thành hành động cụ thể thay vì để ý tưởng kéo dài không kết quả",
    ],
    challenges: [
      "Dễ nói hoặc hành động ngay khi một ý nghĩ vừa xuất hiện, trước khi kiểm tra đủ dữ kiện và tác động lên người nghe",
      "Có thể đồng nhất việc bảo vệ một lập luận với nhu cầu phải thắng hoặc phản ứng mạnh trước ý kiến trái chiều",
    ],
    developmentAdvice: [
      "Trước trao đổi có tính cạnh tranh, tạo một khoảng dừng để tách điều mình biết, điều đang suy luận và hành động thực sự cần thiết",
      "Dùng sự trực tiếp để nêu vấn đề và đề xuất bước tiếp theo, đồng thời hỏi lại để chắc rằng tốc độ không lấn át độ chính xác",
    ],
    evidence: { body1: "Mercury", body2: "Mars", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-MARS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Mars",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Hỏa",
    coreMeaning:
      "Cách suy nghĩ hoặc giao tiếp có thể kéo về một phía, trong khi phản ứng, hành động hoặc nhu cầu khẳng định kéo về phía đối diện; sự phân cực này thường hiện rõ qua tranh luận và tương tác. Một phía có thể giữ vai phân tích hoặc đặt câu hỏi còn phía kia thúc ép quyết định và hành động, mời gọi bạn nhận lại cả hai chức năng thay vì biến đối thoại thành cuộc đối đầu giữa người nói và người làm.",
    strengths: [
      "Có thể phát triển khả năng nhìn một vấn đề từ cả yêu cầu lập luận rõ lẫn nhu cầu hành động dứt khoát",
      "Sự phản biện qua người khác có thể giúp kiểm tra ý tưởng, nhận ra điểm yếu và tạo quyết định có sức thực thi hơn",
    ],
    challenges: [
      "Dễ gán sự nóng vội hoặc hiếu thắng cho người khác trong khi xem mình là phía duy nhất đang lý luận, rồi đổi vai khi căng thẳng tăng",
      "Có thể nghe bất đồng như một lời thách thức cần đáp trả, khiến mục tiêu trao đổi bị thay bằng nhu cầu giành phần đúng hoặc quyền chủ động",
    ],
    developmentAdvice: [
      "Trong bất đồng, thống nhất câu hỏi cần giải quyết, dữ kiện chung và ai chịu trách nhiệm cho bước hành động tiếp theo",
      "Khi thấy người khác quá chậm hoặc quá quyết liệt, kiểm tra phần suy xét hay xung lực nào của mình đang được phản chiếu trước khi đáp trả",
    ],
    evidence: { body1: "Mercury", body2: "Mars", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-MARS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Mars",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Hỏa",
    coreMeaning:
      "Tư duy nhanh, giao tiếp trực tiếp và khả năng hành động quyết đoán thường phối hợp tương đối tự nhiên, giúp ý tưởng chuyển thành thực hiện với ít độ trễ. Dòng chảy này hỗ trợ xử lý vấn đề và tranh luận có sinh lực, nhưng cũng dễ khiến tốc độ cùng sự tự tin được xem là bằng chứng rằng nhận định đã đủ chính xác hoặc phương án đầu tiên đã là tốt nhất.",
    strengths: [
      "Có thể diễn đạt lập luận rõ, phản ứng nhanh với vấn đề và duy trì động lực để đưa quyết định vào thực tế",
      "Thường học tốt qua thử nghiệm, phản hồi trực tiếp và những tình huống cần vừa suy nghĩ vừa hành động",
    ],
    challenges: [
      "Dễ chủ quan với kết luận đến nhanh vì việc suy nghĩ và hành động vốn phối hợp khá trơn tru",
      "Có thể bỏ qua góc nhìn chậm hơn hoặc dữ kiện chưa khớp khi phương án hiện tại đã tạo cảm giác tiến triển",
    ],
    developmentAdvice: [
      "Trước quyết định quan trọng, chủ động tìm một dữ kiện phản biện hoặc một người có nhịp suy xét khác để kiểm tra kết luận",
      "Giữ tốc độ thực thi nhưng đặt điểm kiểm tra sau bước đầu để điều chỉnh nếu phản hồi thực tế không khớp giả định",
    ],
    evidence: { body1: "Mercury", body2: "Mars", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-MARS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Mars",
    aspect: "square",
    title: "Sao Thủy vuông Sao Hỏa",
    coreMeaning:
      "Ma sát giữa suy nghĩ, lời nói và xung lực hành động có thể làm phản ứng tăng nhanh khi ý tưởng bị cản, chất vấn hoặc phải chờ đợi. Sức ép này tạo khả năng nhận ra điểm yếu và lập luận sắc bén, đồng thời dễ dẫn đến nóng vội, tranh cãi hoặc hành động trước khi thông tin đã được xử lý đầy đủ.",
    strengths: [
      "Có thể phát triển năng lực đặt câu hỏi sắc, phát hiện mâu thuẫn và thúc đẩy một vấn đề đang trì trệ tiến tới quyết định",
      "Ma sát tạo động lực rèn cách biến năng lượng tranh luận thành phân tích, thử nghiệm và hành động có mục tiêu",
    ],
    challenges: [
      "Dễ dùng tốc độ, âm lượng hoặc sự quyết liệt để đẩy trao đổi đi tiếp khi điều cần thiết thực ra là làm rõ thông tin",
      "Có thể phản ứng với câu hỏi như sự cản trở hoặc công kích, khiến lời nói gay gắt hơn mục tiêu ban đầu",
    ],
    developmentAdvice: [
      "Khi căng thẳng tăng, trì hoãn phản hồi đủ lâu để viết lại vấn đề, dữ kiện và kết quả mình muốn đạt",
      "Chuyển phản biện thành một câu hỏi kiểm chứng hoặc thử nghiệm nhỏ, và tách việc bất đồng ý tưởng khỏi việc đối đầu với con người",
    ],
    evidence: { body1: "Mercury", body2: "Mars", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-MARS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Mars",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Hỏa",
    coreMeaning:
      "Tư duy, giao tiếp và động lực hành động có cơ hội hỗ trợ nhau khi bạn chủ động nối ý tưởng với một quyết định hoặc bước thực hiện. Tiềm năng này có thể phát triển khả năng học qua hành động, tranh luận có mục tiêu và giải quyết vấn đề nhanh, nhưng cần được kích hoạt bằng lựa chọn và thực hành cụ thể.",
    strengths: [
      "Có cơ hội biến phân tích thành kế hoạch ngắn gọn, phân công rõ hoặc thử nghiệm giúp thu thập thêm thông tin",
      "Có thể phát triển cách giao tiếp quyết đoán mà vẫn dùng câu hỏi, dữ kiện và phản hồi để định hướng hành động",
    ],
    challenges: [
      "Dễ nhận ra một hướng hành động hợp lý nhưng tiếp tục phân tích hoặc chờ động lực thay vì chủ động bắt đầu",
      "Tiềm năng nói và làm dứt khoát có thể dừng ở ý định nếu chưa luyện cách xử lý bất đồng và kiểm tra kết quả",
    ],
    developmentAdvice: [
      "Sau khi xác định vấn đề, chọn một bước có thể thực hiện ngay cùng tiêu chí rõ để biết ý tưởng có hiệu quả hay không",
      "Luyện nêu quan điểm, lý do và đề xuất hành động trong cùng một trao đổi, rồi mời phản hồi trước khi chốt quyết định",
    ],
    evidence: { body1: "Mercury", body2: "Mars", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-JUPITER-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Jupiter",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Mộc",
    coreMeaning:
      "Tư duy, ngôn ngữ và nhu cầu mở rộng hiểu biết có xu hướng hòa trực tiếp vào nhau, nên thông tin thường được kết nối nhanh với ý nghĩa, niềm tin hoặc một bức tranh lớn hơn. Sự hợp nhất này hỗ trợ học theo chiều rộng, kể chuyện và tổng hợp ý tưởng, đồng thời dễ khuếch đại kết luận, bỏ qua chi tiết hoặc nói với độ chắc chắn lớn hơn bằng chứng hiện có.",
    strengths: [
      "Có thể liên kết nhiều lĩnh vực kiến thức và giải thích một chủ đề theo cách cho thấy bối cảnh cùng ý nghĩa rộng hơn",
      "Thường có động lực học hỏi, khám phá và truyền đạt ý tưởng với sự lạc quan, sinh động và khả năng nhìn xa",
    ],
    challenges: [
      "Dễ đi từ một số dữ kiện tới kết luận quá rộng hoặc thêm sức nặng cho câu chuyện trước khi kiểm tra các ngoại lệ",
      "Có thể ưu tiên ý tưởng lớn và cảm giác đã hiểu hơn việc sắp xếp lập luận, nguồn tin và chi tiết cần thiết",
    ],
    developmentAdvice: [
      "Với một kết luận lớn, ghi riêng dữ kiện hỗ trợ, giả định đang dùng và điều chưa biết trước khi truyền đạt",
      "Chia ý tưởng rộng thành luận điểm, ví dụ và bước kiểm chứng cụ thể để sự truyền cảm hứng đi cùng cấu trúc đáng tin cậy",
    ],
    evidence: { body1: "Mercury", body2: "Jupiter", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-JUPITER-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Jupiter",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Mộc",
    coreMeaning:
      "Dữ kiện, cách diễn đạt hoặc nhu cầu phân tích có thể kéo về một phía, trong khi niềm tin, ý nghĩa và bức tranh lớn kéo về phía đối diện; sự phân cực này thường hiện rõ qua trao đổi với người khác. Một phía có thể chú trọng chi tiết còn phía kia bảo vệ quan điểm rộng, mời gọi bạn tích hợp độ chính xác với định hướng thay vì xem chúng là hai lựa chọn loại trừ nhau.",
    strengths: [
      "Có thể phát triển khả năng kiểm tra một hệ tư tưởng bằng dữ kiện và đồng thời đặt thông tin riêng lẻ vào bối cảnh có ý nghĩa",
      "Trao đổi với góc nhìn đối lập có thể mở rộng cách học, giúp nhận ra cả ngoại lệ lẫn nguyên tắc đang kết nối chúng",
    ],
    challenges: [
      "Dễ gán sự vụn vặt cho người khác khi mình giữ bức tranh lớn, hoặc gán sự phóng đại cho họ khi mình giữ vai phân tích chi tiết",
      "Có thể dao động giữa kiểm tra quá nhiều thông tin và chốt một niềm tin quá rộng mà chưa tạo cầu nối lập luận giữa hai phía",
    ],
    developmentAdvice: [
      "Trong bất đồng, xác định riêng dữ kiện hai bên cùng chấp nhận, ý nghĩa mỗi bên rút ra và điểm nối còn cần chứng minh",
      "Khi nghiêng hẳn về chi tiết hoặc tổng thể, chủ động trình bày lại lập luận từ cực đối diện trước khi kết luận",
    ],
    evidence: { body1: "Mercury", body2: "Jupiter", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-JUPITER-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Jupiter",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Mộc",
    coreMeaning:
      "Xử lý thông tin và khả năng nhìn ý nghĩa hoặc bức tranh lớn thường phối hợp tương đối tự nhiên, giúp việc học, tổng hợp kiến thức và truyền đạt ý tưởng diễn ra trôi chảy. Dòng chảy này hỗ trợ kết nối nhiều chủ đề, nhưng cũng dễ khiến sự mạch lạc và tự tin được xem là bằng chứng rằng thông tin đã được kiểm chứng hoặc toàn cảnh đã thực sự đầy đủ.",
    strengths: [
      "Có thể nhanh chóng nhận ra mối liên hệ giữa dữ kiện, khái niệm và bối cảnh rộng để tạo cách giải thích dễ theo dõi",
      "Thường có khả năng chia sẻ kiến thức với tinh thần cởi mở, giúp người khác thấy hướng phát triển hoặc ý nghĩa của điều đang học",
    ],
    challenges: [
      "Dễ tin rằng mình đã hiểu toàn cảnh vì việc kết nối ý tưởng diễn ra tự nhiên và tạo cảm giác nhất quán",
      "Có thể bỏ qua nguồn phản biện, chi tiết kỹ thuật hoặc trường hợp ngoại lệ khi câu chuyện tổng thể đã đủ thuyết phục",
    ],
    developmentAdvice: [
      "Giữ khả năng tổng hợp nhưng thêm bước kiểm tra nguồn, ngoại lệ và giới hạn trước khi giảng giải hoặc đưa ra kết luận",
      "Định kỳ chọn một chủ đề quen thuộc để học sâu hơn thay vì chỉ tiếp tục mở rộng sang kiến thức mới",
    ],
    evidence: { body1: "Mercury", body2: "Jupiter", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-JUPITER-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Jupiter",
    aspect: "square",
    title: "Sao Thủy vuông Sao Mộc",
    coreMeaning:
      "Ma sát giữa xử lý thông tin hoặc chi tiết với xu hướng mở rộng, bảo vệ niềm tin hay đi tới kết luận lớn có thể tạo một trí óc giàu tham vọng nhưng khó giữ đúng tỷ lệ. Áp lực này thúc đẩy tranh luận và khám phá, đồng thời dễ dẫn tới khái quát hóa quá mức, hứa nhiều hơn khả năng thực hiện hoặc giữ quan điểm cứng khi dữ kiện chưa theo kịp.",
    strengths: [
      "Có thể phát triển khả năng đặt câu hỏi lớn, thử thách giới hạn của một lập luận và tìm hướng học hỏi vượt khỏi khuôn quen thuộc",
      "Ma sát tạo động lực rèn cách biến tầm nhìn rộng thành kế hoạch nghiên cứu, giải thích hoặc thực hiện có căn cứ",
    ],
    challenges: [
      "Dễ khuếch đại một ý tưởng, đánh giá thấp khối lượng chi tiết hoặc cam kết trước khi kiểm tra nguồn lực và bằng chứng",
      "Có thể bảo vệ quan điểm bằng thêm lập luận rộng thay vì quay lại xử lý mâu thuẫn cụ thể đang được chỉ ra",
    ],
    developmentAdvice: [
      "Trước một cam kết lớn, chia nhỏ phạm vi, thời hạn, dữ kiện cần xác minh và tiêu chí cho biết kế hoạch có khả thi",
      "Khi bị phản biện, trả lời đúng điểm chưa khớp trước khi mở rộng sang nguyên tắc hoặc bức tranh lớn hơn",
    ],
    evidence: { body1: "Mercury", body2: "Jupiter", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-JUPITER-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Jupiter",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Mộc",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội hỗ trợ việc mở rộng tri thức, khám phá ý nghĩa và nhìn bức tranh lớn khi bạn chủ động kết nối chúng. Tiềm năng này có thể phát triển qua học tập, nghiên cứu, viết hoặc giảng giải, nhưng chỉ trở thành năng lực ổn định khi ý tưởng rộng được luyện bằng dữ kiện và một hình thức thực hành cụ thể.",
    strengths: [
      "Có cơ hội dùng câu hỏi và trao đổi để mở rộng một chủ đề, đồng thời đưa kiến thức mới trở lại giải thích vấn đề thực tế",
      "Có thể phát triển kỹ năng kết nối dữ kiện với bối cảnh rộng qua viết, trình bày, nghiên cứu hoặc học cùng người khác",
    ],
    challenges: [
      "Dễ nhận ra một hướng học hoặc chia sẻ có tiềm năng nhưng không xây nhịp thực hành để phát triển nó",
      "Ý tưởng mở rộng có thể dừng ở danh sách chủ đề thú vị nếu chưa chọn câu hỏi, nguồn tin và sản phẩm đầu ra cụ thể",
    ],
    developmentAdvice: [
      "Chọn một câu hỏi lớn, xác định nguồn cần đọc và tạo đầu ra cụ thể như bản tóm tắt, bài viết hoặc buổi trình bày",
      "Sau mỗi lần học thêm, ghi rõ dữ kiện mới thay đổi bức tranh tổng thể thế nào và điều gì vẫn cần kiểm chứng",
    ],
    evidence: { body1: "Mercury", body2: "Jupiter", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Thổ",
    coreMeaning:
      "Tư duy, ngôn ngữ và nhu cầu về cấu trúc hoặc tính chính xác có xu hướng hòa trực tiếp vào nhau, nên thông tin thường được xử lý thận trọng, có trình tự và hướng tới điều thực tế. Sự hợp nhất này hỗ trợ tập trung sâu và học tập bền bỉ, đồng thời dễ khiến tiêu chuẩn cao biến thành tự kiểm duyệt, cứng nhắc hoặc sợ phát biểu khi chưa chắc mình hoàn toàn đúng.",
    strengths: [
      "Có thể tổ chức thông tin phức tạp thành lập luận có thứ tự, tiêu chí rõ và kết luận có căn cứ",
      "Thường có sức kiên trì để học sâu, chỉnh sửa nhiều vòng và duy trì chú ý với công việc trí óc đòi hỏi độ chính xác",
    ],
    challenges: [
      "Dễ trì hoãn việc nói, viết hoặc quyết định vì tiếp tục tìm lỗi và yêu cầu sản phẩm phải hoàn thiện trước khi được chia sẻ",
      "Có thể để giọng phê bình bên trong làm suy nghĩ trở nên nặng nề hoặc thu hẹp những cách diễn đạt chưa quen",
    ],
    developmentAdvice: [
      "Đặt tiêu chuẩn tối thiểu đủ để chia sẻ bản nháp, sau đó dùng phản hồi thực tế cho vòng chỉnh sửa tiếp theo",
      "Giữ bước kiểm tra chính xác nhưng giới hạn thời gian rà soát để sự thận trọng không làm tê liệt giao tiếp hoặc hành động",
    ],
    evidence: { body1: "Mercury", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Saturn",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Thổ",
    coreMeaning:
      "Cách suy nghĩ hoặc diễn đạt có thể kéo về một phía, trong khi quy tắc, giới hạn, trách nhiệm hoặc sự phê bình kéo về phía đối diện; sự phân cực này thường hiện rõ qua trao đổi. Bạn có thể gặp người giữ vai kiểm tra, bác bỏ hoặc yêu cầu chứng minh, mời gọi việc tích hợp lập luận với giới hạn thực tế thay vì xem phản biện như bằng chứng rằng một phía phải im lặng hoặc phòng thủ.",
    strengths: [
      "Có thể phát triển khả năng bảo vệ quan điểm bằng dữ kiện, đồng thời tiếp nhận tiêu chuẩn và giới hạn giúp lập luận đáng tin hơn",
      "Đối thoại với người có góc nhìn thận trọng có thể giúp phân biệt ý tưởng khả thi với phần còn cần chứng minh hoặc điều chỉnh",
    ],
    challenges: [
      "Dễ gán vai phê bình hoặc cản trở cho người khác trong khi xem mình là phía chỉ đang cố giải thích, rồi đổi vai khi căng thẳng tăng",
      "Có thể nghe yêu cầu làm rõ như sự bác bỏ cá nhân, khiến giao tiếp chuyển sang tự vệ hoặc cố chứng minh bằng mọi giá",
    ],
    developmentAdvice: [
      "Khi bị phản biện, tách tiêu chí hữu ích, giới hạn thực tế và nỗi sợ bị đánh giá trước khi quyết định điều gì cần sửa",
      "Thống nhất bằng chứng cần có và điều kiện để đi tiếp, rồi trình bày quan điểm trong phạm vi những gì dữ kiện thực sự hỗ trợ",
    ],
    evidence: { body1: "Mercury", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Saturn",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Thổ",
    coreMeaning:
      "Tư duy và khả năng tạo cấu trúc, kiểm tra hoặc duy trì kỷ luật thường phối hợp tương đối tự nhiên, hỗ trợ học sâu, hoạch định và truyền đạt đáng tin cậy. Dòng chảy này tạo sự vững vàng trong phân tích, nhưng cũng dễ khiến phương pháp quen thuộc và điều đã được chứng minh được ưu tiên đến mức ý tưởng mới hoặc cách tiếp cận linh hoạt bị đánh giá thấp quá sớm.",
    strengths: [
      "Có thể xây hệ thống ghi nhớ, nghiên cứu hoặc lập kế hoạch rõ ràng và theo đuổi chúng với nhịp ổn định",
      "Thường diễn đạt có trình tự, cân nhắc giới hạn thực tế và giữ được độ nhất quán qua những nhiệm vụ dài hạn",
    ],
    challenges: [
      "Dễ tin phương pháp đã quen là lựa chọn đáng tin duy nhất vì nó tiếp tục vận hành khá hiệu quả",
      "Có thể chậm thích nghi hoặc đòi ý tưởng mới phải chứng minh đầy đủ trước khi cho phép một thử nghiệm nhỏ",
    ],
    developmentAdvice: [
      "Giữ nền tảng có hệ thống nhưng dành một phạm vi nhỏ để thử cách mới với tiêu chí đánh giá rõ",
      "Định kỳ rà lại quy trình để phân biệt cấu trúc còn hữu ích với thói quen chỉ được giữ vì quen thuộc",
    ],
    evidence: { body1: "Mercury", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Saturn",
    aspect: "square",
    title: "Sao Thủy vuông Sao Thổ",
    coreMeaning:
      "Ma sát giữa tư duy hoặc giao tiếp với giới hạn, tiêu chuẩn và trách nhiệm có thể khiến việc xử lý thông tin mang cảm giác nặng hoặc luôn còn lỗi phải sửa. Áp lực này có thể rèn phân tích sắc, nghiêm túc và bền bỉ, đồng thời dễ dẫn tới tự chỉ trích, suy nghĩ lặp lại hoặc giao tiếp phòng thủ khi nguy cơ sai sót được cảm nhận lớn hơn thực tế.",
    strengths: [
      "Có thể phát triển năng lực phát hiện lỗ hổng, kiểm tra giả định và cải thiện chất lượng qua từng vòng làm việc",
      "Ma sát tạo động lực xây sự kiên trì cùng tiêu chuẩn rõ cho những nhiệm vụ học tập hoặc giao tiếp khó",
    ],
    challenges: [
      "Dễ lặp lại việc kiểm tra mà không chuyển sang bước quyết định vì mỗi điểm chưa chắc chắn đều có vẻ nghiêm trọng",
      "Có thể dùng phê bình để tự bảo vệ trước khả năng sai, khiến lời nói cứng hoặc bản thân khó tiếp nhận phản hồi",
    ],
    developmentAdvice: [
      "Chia vấn đề thành các giả định cần kiểm chứng, xử lý từng bước và đặt điều kiện rõ cho lúc đủ thông tin để đi tiếp",
      "Chuyển câu phê bình thành tiêu chí cải thiện cụ thể, có thể quan sát, thay vì dùng nó như kết luận chung về năng lực",
    ],
    evidence: { body1: "Mercury", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Saturn",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Thổ",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội được hỗ trợ bởi cấu trúc, kỷ luật và khả năng kiểm tra thực tế khi bạn chủ động xây phương pháp phù hợp. Tiềm năng này có thể phát triển kỹ năng lập kế hoạch, viết, nghiên cứu hoặc truyền đạt chuyên môn, nhưng chỉ thành năng lực ổn định qua thói quen và hệ thống được sử dụng đều đặn.",
    strengths: [
      "Có cơ hội biến thông tin thành checklist, lịch học, quy trình hoặc tài liệu giúp công việc dễ theo dõi và hoàn thiện hơn",
      "Có thể phát triển cách truyền đạt chuyên môn rõ ràng bằng việc sắp xếp luận điểm, ví dụ và tiêu chuẩn kiểm chứng",
    ],
    challenges: [
      "Dễ nhận ra một phương pháp hữu ích nhưng không duy trì đủ lâu để nó trở thành kỹ năng hoặc nguồn hỗ trợ đáng tin",
      "Tiềm năng tổ chức có thể dừng ở việc thiết kế hệ thống nếu lịch thực hành và đầu ra cụ thể chưa được cam kết",
    ],
    developmentAdvice: [
      "Chọn một mục tiêu học hoặc viết, tạo checklist ngắn cùng lịch thực hành và rà lại kết quả theo tuần",
      "Xây một mẫu làm việc có thể lặp lại, rồi điều chỉnh từ dữ liệu sử dụng thực tế thay vì chờ hệ thống hoàn hảo ngay từ đầu",
    ],
    evidence: { body1: "Mercury", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Thiên Vương",
    coreMeaning:
      "Tư duy, ngôn ngữ và nhu cầu đổi mới hòa trực tiếp vào nhau, tạo nhịp xử lý thông tin nhanh, khác thường cùng những ý tưởng có thể xuất hiện đột ngột. Sự hợp nhất này khuyến khích tự do trí tuệ và cách giải quyết không theo lối mòn, đồng thời dễ khiến dòng suy nghĩ nhảy bước, thiếu kiên nhẫn với chi tiết hoặc xem cái cũ là sai chỉ vì nó quen thuộc.",
    strengths: [
      "Có thể nhận ra những liên kết ít ai để ý và nhanh chóng hình thành cách nhìn mới cho vấn đề quen thuộc",
      "Thường mạnh ở việc đặt câu hỏi với giả định cũ, thử công cụ mới và đề xuất giải pháp không truyền thống",
    ],
    challenges: [
      "Ý tưởng đến nhanh có thể kéo sự chú ý sang hướng mới trước khi hướng đang làm được kiểm tra hoặc hoàn tất",
      "Dễ nói quá nhanh, bỏ qua bước giải thích trung gian hoặc mất kiên nhẫn khi người khác cần thêm thời gian xử lý",
    ],
    developmentAdvice: [
      "Ghi lại ý tưởng ngay khi xuất hiện, rồi tách riêng thời gian phát sinh ý tưởng với thời gian kiểm chứng dữ liệu và giả định",
      "Dùng một cấu trúc tối thiểu gồm mục tiêu, bước kế tiếp và tiêu chí hoàn tất để sự mới mẻ có thể trở thành kết quả cụ thể",
    ],
    evidence: { body1: "Mercury", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Uranus",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Cách suy nghĩ và diễn đạt cá nhân có thể kéo về một phía, trong khi nhu cầu đổi mới, khác biệt hoặc tự do trí tuệ kéo về phía đối diện, khiến sự phân cực thường hiện ra qua người khác và đối thoại. Những ý kiến bất ngờ có thể mở rộng nhận thức, nhưng cũng dễ khơi phản ứng chống đối, đổi lập trường để giữ khoảng cách hoặc gán phần khó đoán và nổi loạn cho phía bên kia.",
    strengths: [
      "Trao đổi với góc nhìn trái chiều có thể làm lộ những giả định ẩn và mở rộng mô hình tư duy vượt khỏi khung quen thuộc",
      "Có khả năng phát triển tư duy độc lập mà vẫn dùng khác biệt như nguồn dữ liệu cho một cách hiểu bao quát hơn",
    ],
    challenges: [
      "Dễ phản ứng mạnh với ý kiến bất ngờ, phản bác để bảo vệ tự do suy nghĩ hoặc thay đổi lập trường chủ yếu để không đứng cùng phía",
      "Có thể gán sự thất thường, cực đoan hoặc nổi loạn cho người khác trong khi chưa nhận ra nhu cầu phá khuôn của chính mình",
    ],
    developmentAdvice: [
      "Tách dữ kiện đang được nêu khỏi cảm giác bị thách thức, rồi xác định phần nào là đổi mới hữu ích và phần nào chỉ là phản ứng chống đối",
      "Trước khi bác bỏ, diễn đạt lại lập luận đối diện theo cách phía kia công nhận và dùng điểm khác biệt để kiểm tra hoặc mở rộng mô hình hiện có",
    ],
    evidence: { body1: "Mercury", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Uranus",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Thiên Vương",
    coreMeaning:
      "Tư duy linh hoạt, khả năng nhận ra mô thức và nhu cầu đổi mới thường phối hợp tương đối tự nhiên, hỗ trợ học nhanh, nối kiến thức giữa nhiều lĩnh vực và hình dung hệ thống mới. Dòng chảy thuận lợi này giúp ý tưởng khác biệt xuất hiện dễ dàng, nhưng cũng có thể khiến trực giác trí tuệ được tin quá sớm, bước xác nhận bị bỏ qua hoặc quá nhiều hướng thú vị cùng cạnh tranh sự chú ý.",
    strengths: [
      "Có thể nhanh chóng nhìn thấy cấu trúc, ngoại lệ và mối liên hệ xuyên lĩnh vực để tạo cách giải thích hoặc hệ thống mới",
      "Thường thích nghi tốt với công nghệ, khái niệm hoặc phương pháp học mới mà không cần từ bỏ tư duy độc lập",
    ],
    challenges: [
      "Dễ xem một nhận định sáng rõ là đã đủ đúng và chuyển tiếp trước khi kiểm tra nó với dữ liệu hoặc người dùng thực tế",
      "Có thể chán bước lặp lại cần thiết, mở quá nhiều hướng nghiên cứu hoặc bỏ dở phần triển khai vì ý tưởng mới hấp dẫn hơn",
    ],
    developmentAdvice: [
      "Chọn một nhận định nổi bật để kiểm tra bằng dữ liệu, phản hồi hoặc một nguyên mẫu nhỏ trước khi mở thêm hướng mới",
      "Gắn quá trình khám phá với một quy trình ổn định để ghi chép, rà soát và hoàn tất, nhờ đó trực giác có bằng chứng hỗ trợ",
    ],
    evidence: { body1: "Mercury", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Uranus",
    aspect: "square",
    title: "Sao Thủy vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa cách suy nghĩ, giao tiếp và nhu cầu thay đổi nhanh có thể tạo những bước ngoặt trí tuệ sắc bén, đồng thời làm nhiều ý tưởng mới cạnh tranh với việc hoàn tất điều đang làm. Áp lực phá vỡ khuôn mẫu hỗ trợ phát hiện lỗi hệ thống và nhìn vấn đề theo đường phi tuyến, nhưng dễ chuyển thành đổi hướng quá sớm, tranh luận để gây xáo trộn hoặc phản ứng trước khi chi tiết được kiểm tra.",
    strengths: [
      "Có thể nhận ra nhanh giả định lỗi thời, điểm nghẽn hoặc lỗ hổng trong hệ thống mà cách nhìn tuyến tính dễ bỏ sót",
      "Ma sát trí tuệ có thể thúc đẩy giải pháp táo bạo và năng lực suy nghĩ độc lập khi vấn đề không đáp ứng công thức quen thuộc",
    ],
    challenges: [
      "Dễ thay đổi phương án trước khi có đủ dữ liệu, bỏ qua chi tiết triển khai hoặc tạo tranh luận chủ yếu để phá nhịp cũ",
      "Khi bị kích thích bởi ý kiến hay thông tin bất ngờ, phản ứng nhanh có thể đi trước việc hiểu đầy đủ bối cảnh và hậu quả",
    ],
    developmentAdvice: [
      "Thử ý tưởng gây xáo trộn trong một phạm vi an toàn với thời hạn, checkpoint và tiêu chí đo rõ trước khi thay đổi hệ thống lớn",
      "Kiểm chứng từng thay đổi một và trì hoãn phản hồi khi căng thẳng tăng để phân biệt đột phá hữu ích với xung lực phản ứng",
    ],
    evidence: { body1: "Mercury", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Uranus",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Thiên Vương",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội được làm mới qua cách học, công cụ hoặc quy trình khác thường khi bạn chủ động thử nghiệm. Góc này hỗ trợ biến tò mò thành cải tiến thiết thực và mở rộng tự do trí tuệ, nhưng tiềm năng sẽ dừng ở danh sách khả năng thú vị nếu sự mới lạ không được đưa vào một thử nghiệm có mục tiêu và theo dõi kết quả.",
    strengths: [
      "Có cơ hội tiếp thu công cụ, phương pháp hoặc nguồn thông tin mới rồi kết nối chúng với nhu cầu thực tế",
      "Có thể phát triển cách giao tiếp và quy trình làm việc linh hoạt hơn thông qua những điều chỉnh nhỏ nhưng có chủ đích",
    ],
    challenges: [
      "Dễ thu thập nhiều khả năng mới mà chưa chọn một phương án đủ cụ thể để thử và đánh giá",
      "Có thể yêu thích cảm giác khám phá hơn việc lặp lại ứng dụng cần thiết để một ý tưởng thực sự cải thiện công việc",
    ],
    developmentAdvice: [
      "Chọn một công cụ hoặc phương pháp mới cho thử nghiệm nhỏ, xác định chỉ số cần quan sát và ghi lại kết quả sau một chu kỳ ngắn",
      "Chuyển mỗi insight hữu ích thành một thay đổi cụ thể trong workflow, rồi giữ hoặc loại nó dựa trên dữ liệu sử dụng thực tế",
    ],
    evidence: { body1: "Mercury", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Hải Vương",
    coreMeaning:
      "Tư duy, ngôn ngữ và trí tưởng tượng có xu hướng hòa trực tiếp vào nhau, nên bạn có thể xử lý trải nghiệm qua hình ảnh, cảm giác, liên tưởng hoặc biểu tượng trước khi diễn đạt bằng logic tuyến tính. Sự hợp nhất này hỗ trợ kể chuyện và truyền tải sắc thái tinh tế, đồng thời có thể làm ranh giới giữa dữ kiện, suy luận và điều được tưởng tượng hoặc cảm nhận trở nên mỏng nếu thiếu bước kiểm chứng.",
    strengths: [
      "Có thể tạo liên tưởng phong phú và diễn đạt cảm xúc, bầu không khí hoặc ý tưởng trừu tượng bằng hình ảnh và ngôn từ giàu sắc thái",
      "Thường nhạy với ngữ cảnh, ẩn ý và nhịp điệu của giao tiếp, hỗ trợ kể chuyện, viết hoặc các hình thức sáng tạo bằng ngôn ngữ",
    ],
    challenges: [
      "Dễ nhớ hoặc hiểu thông tin theo ấn tượng tổng thể, từ đó bỏ sót chi tiết hoặc xem một câu chuyện hợp cảm xúc là đã đáng tin",
      "Cách diễn đạt có thể trở nên mơ hồ, hoặc giả thuyết và điều lý tưởng hóa được trình bày gần giống dữ kiện đã xác nhận",
    ],
    developmentAdvice: [
      "Khi ghi chép hoặc trao đổi, phân loại rõ đâu là dữ kiện, suy luận, cảm nhận và giả thuyết; bổ sung nguồn cho kết luận quan trọng",
      "Cho phép giai đoạn sáng tạo diễn ra tự do, rồi dành một vòng riêng để kiểm tra chi tiết, tính nhất quán và bằng chứng trước khi công bố",
    ],
    evidence: { body1: "Mercury", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Dữ kiện, cách diễn đạt và lý luận có thể kéo về một phía, trong khi hình ảnh, lý tưởng, cảm nhận hoặc sự mơ hồ kéo về phía đối diện; sự phân cực này thường lộ rõ qua quan hệ và đối thoại. Bạn có thể yêu cầu người khác làm rõ trong lúc họ thiên về cảm nhận, hoặc mang phần cảm nhận còn người khác giữ vai kiểm chứng, tạo cơ hội học cách dịch trải nghiệm tinh tế thành ngôn ngữ có thể cùng nhau kiểm tra.",
    strengths: [
      "Có thể nhìn một vấn đề qua cả cấu trúc logic lẫn chiều sâu biểu tượng hoặc cảm xúc khi hai góc nhìn được đưa vào đối thoại",
      "Trao đổi với người có cách xử lý khác mình có thể làm lộ điểm mù và rèn khả năng chuyển cảm nhận thành câu hỏi, ví dụ hoặc dữ kiện cụ thể",
    ],
    challenges: [
      "Dễ hiểu sai ý, phản ứng với hình ảnh mình suy diễn về thông điệp hoặc gán sự mơ hồ và thiếu trung thực cho phía bên kia",
      "Có thể dao động giữa hoài nghi quá mức và tin tưởng quá mức, nhất là khi lời nói tạo cảm xúc mạnh nhưng bằng chứng chưa rõ",
    ],
    developmentAdvice: [
      "Diễn đạt lại điều đối phương nói và nhờ họ xác nhận trước khi phản hồi, sau đó yêu cầu ví dụ hoặc dữ kiện cụ thể cho điểm còn mơ hồ",
      "Tách nguyên văn điều đã được nói khỏi phần mình suy diễn, rồi thống nhất điều gì đã biết, điều gì chỉ là cách hiểu và điều gì cần kiểm tra thêm",
    ],
    evidence: { body1: "Mercury", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Hải Vương",
    coreMeaning:
      "Trí tưởng tượng, cảm nhận sắc thái và ngôn ngữ thường phối hợp tương đối tự nhiên, giúp bạn diễn đạt những trải nghiệm khó truyền tải bằng logic thuần túy. Dòng chảy này thuận lợi cho kể chuyện, sáng tạo, thấu cảm trong giao tiếp và hiểu biểu tượng, nhưng cũng dễ khiến cảm giác sáng rõ được xem là đúng trước khi dữ kiện và nguồn tin được kiểm tra.",
    strengths: [
      "Có thể kết nối ý tưởng bằng hình ảnh, ẩn dụ và câu chuyện, tạo cách diễn đạt vừa dễ hình dung vừa giàu cảm xúc",
      "Thường nhận ra sắc thái trong lời nói và có khả năng điều chỉnh ngôn ngữ để giao tiếp tinh tế hoặc đồng cảm hơn",
    ],
    challenges: [
      "Vì liên tưởng vận hành nhẹ nhàng, bạn có thể xem điều cảm thấy đúng là sự thật và ít kiểm chứng những kết luận hợp trực giác",
      "Dễ lướt qua chi tiết khô khan, nguồn gốc thông tin hoặc cấu trúc lập luận khi ý nghĩa tổng thể đã có vẻ thuyết phục",
    ],
    developmentAdvice: [
      "Giữ không gian tự do cho liên tưởng, rồi chuyển ý tưởng nổi bật thành dàn ý có luận điểm, ví dụ và mối liên hệ rõ ràng",
      "Với kết luận quan trọng, bổ sung dữ kiện và nguồn độc lập để kiểm tra trước khi xem cảm nhận ban đầu là đủ đáng tin",
    ],
    evidence: { body1: "Mercury", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Thủy vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa tư duy, giao tiếp hoặc dữ kiện với tưởng tượng, lý tưởng và sự mơ hồ có thể khiến đường ranh giữa điều biết và điều cảm thấy khó giữ ổn định. Áp lực từ hiểu lầm hoặc thông tin thiếu rõ ràng có thể thúc đẩy khả năng nhận ra sắc thái và đặt câu hỏi sâu hơn, nhưng cũng đòi hỏi một phương pháp chủ động để giả định không lẫn thành dữ kiện và trí tưởng tượng không dẫn kết luận đi quá xa.",
    strengths: [
      "Có thể nhận ra lớp nghĩa, cảm xúc hoặc giả định ẩn mà cách phân tích hoàn toàn tuyến tính dễ bỏ qua",
      "Ma sát giữa logic và hình ảnh có thể tạo giải pháp sáng tạo, đồng thời rèn khả năng chất vấn câu chuyện đang định hình cách hiểu vấn đề",
    ],
    challenges: [
      "Dễ suy diễn, nhầm giả định thành dữ kiện hoặc giao tiếp vòng vo khi bản thân chưa tách rõ điều chắc chắn với điều đang hình dung",
      "Có thể né thông tin không hợp lý tưởng hoặc quyết định khi dữ liệu còn mơ hồ, khiến việc sửa sai về sau tốn nhiều công sức hơn",
    ],
    developmentAdvice: [
      "Viết riêng ba nhóm: dữ kiện chắc chắn, điều chưa biết và giả định đang dùng; kiểm tra nguồn trước khi dựa vào chúng để quyết định",
      "Dùng checklist cho việc quan trọng và trì hoãn kết luận khi thông tin chưa rõ, thay vì lấp khoảng trống bằng câu chuyện có vẻ hợp lý",
    ],
    evidence: { body1: "Mercury", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Hải Vương",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội được hỗ trợ bởi trí tưởng tượng, cảm nhận tinh tế và cách nhìn bằng hình ảnh khi bạn chủ động khai thác chúng. Tiềm năng này phù hợp với học qua câu chuyện, ẩn dụ, visual thinking hoặc phương pháp sáng tạo, nhưng chỉ thành kỹ năng hữu ích khi cảm hứng được chuyển thành đầu ra có cấu trúc và đi qua một bước kiểm chứng riêng.",
    strengths: [
      "Có cơ hội phát triển viết sáng tạo, storytelling, brainstorming hoặc cách dùng ví dụ và hình ảnh để làm ý tưởng trừu tượng dễ hiểu hơn",
      "Có thể kết hợp phân tích với sự tinh tế trong ngôn ngữ để khám phá nhiều lớp nghĩa và chọn cách diễn đạt phù hợp ngữ cảnh",
    ],
    challenges: [
      "Dễ nhận ra khả năng sáng tạo nhưng không luyện đủ đều để biến nó thành kỹ năng hoặc sản phẩm có thể chia sẻ",
      "Có thể tiêu thụ nhiều cảm hứng hoặc tạo quá nhiều ý tưởng hình tượng mà chưa chọn cấu trúc và đầu ra cụ thể",
    ],
    developmentAdvice: [
      "Chọn một phương pháp sáng tạo để luyện đều, chuyển mỗi cảm nhận đáng chú ý thành bản nháp và đặt lịch hoàn thiện một đầu ra cụ thể",
      "Biên tập bản nháp bằng tiêu chí rõ về mục tiêu, cấu trúc và người đọc, rồi fact-check riêng trước khi xuất bản hoặc dùng để kết luận",
    ],
    evidence: { body1: "Mercury", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Thủy đồng cung Sao Diêm Vương",
    coreMeaning:
      "Tư duy, ngôn ngữ và nhu cầu đi tới gốc rễ có xu hướng hòa trực tiếp vào nhau, khiến bạn khó hài lòng với câu trả lời hời hợt và thường xử lý thông tin với cường độ cao. Sự hợp nhất này hỗ trợ tập trung, nghiên cứu và đặt câu hỏi sắc bén, đồng thời dễ kéo việc tìm hiểu vượt quá nhu cầu thực tế hoặc biến một giả thuyết chưa chắc chắn thành trọng tâm khó buông.",
    strengths: [
      "Có thể tập trung sâu vào chủ đề phức tạp, phát hiện mâu thuẫn và lần theo cấu trúc lập luận để tìm nguyên nhân cốt lõi",
      "Thường có sức bền cho nghiên cứu, điều tra dữ kiện hoặc tái cấu trúc thông tin khi câu trả lời ban đầu chưa giải thích đủ vấn đề",
    ],
    challenges: [
      "Dễ đào quá sâu khi quyết định chỉ cần một mức bằng chứng vừa đủ, hoặc tiếp tục bám câu hỏi chưa có lời giải dù lợi ích đã giảm",
      "Có thể nghi ngờ quá mức, bám một giả thuyết hoặc dùng tranh luận để giành quyền kiểm soát thay vì cùng làm rõ thông tin",
    ],
    developmentAdvice: [
      "Xác định trước mức bằng chứng đủ cho từng quyết định và đặt giới hạn thời gian, phạm vi cho việc nghiên cứu sâu",
      "Phân biệt sự tò mò với nhu cầu kiểm soát bằng cách chủ động tìm dữ kiện có thể bác bỏ giả thuyết mình đang ưu tiên",
    ],
    evidence: { body1: "Mercury", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Thủy đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Cách suy nghĩ và diễn đạt cá nhân có thể kéo về một phía, trong khi nhu cầu đào sâu, kiểm soát hoặc khám phá điều ẩn kéo về phía đối diện; sự phân cực này thường hiện rõ qua người khác và đối thoại. Bạn có thể cảm thấy bị thẩm vấn hoặc bị điều khiển cuộc nói chuyện, hoặc chính mình giữ phần kiểm soát nhưng nhận ra nó trước tiên ở đối phương, tạo cơ hội dùng trao đổi để làm rõ giả định và động lực phía sau vấn đề.",
    strengths: [
      "Có thể nhìn thấy lập luận đối nghịch, phát hiện giả định ẩn và dùng câu hỏi qua lại để đưa một vấn đề phức tạp về điểm cốt lõi",
      "Đối thoại với quan điểm mạnh có thể giúp phân biệt dữ kiện, cách diễn giải và mối quan tâm chưa được nói rõ của mỗi phía",
    ],
    challenges: [
      "Tranh luận dễ chuyển thành đấu quyền lực, nhất là khi bất đồng được diễn giải như nỗ lực kiểm soát hoặc che giấu của người khác",
      "Có thể phóng chiếu sự nghi ngờ sang đối phương, suy diễn quá mức hàm ý và khó giữ trao đổi ở mức dữ kiện khi cảm thấy bị thách thức",
    ],
    developmentAdvice: [
      "Tách nguyên văn điều được nói khỏi động cơ mình suy đoán, rồi xác nhận ý định bằng câu hỏi thay vì kết luận thay đối phương",
      "Đặt giới hạn thời gian cho tranh luận và đưa cuộc trao đổi trở lại những điểm mà cả hai phía có thể kiểm chứng bằng dữ kiện",
    ],
    evidence: { body1: "Mercury", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Thủy tam hợp Sao Diêm Vương",
    coreMeaning:
      "Khả năng tập trung, phân tích sâu và nhận ra cấu trúc phía sau thông tin thường phối hợp tương đối tự nhiên, hỗ trợ theo đuổi một chủ đề tới nguyên nhân cốt lõi. Dòng chảy này thuận lợi cho nghiên cứu, chiến lược, điều tra và phân tích hệ thống, nhưng cũng dễ khiến một cách nhìn có chiều sâu được xem là đương nhiên chính xác hoặc lời giải thích phức tạp được ưu tiên khi đáp án đơn giản đã đủ.",
    strengths: [
      "Có thể phát hiện mô thức, lần theo quan hệ nguyên nhân và tái cấu trúc lập luận để làm rõ thông tin phức tạp",
      "Thường duy trì tập trung tốt với vấn đề khó và có khả năng chuyển khối dữ liệu rời rạc thành insight có chiều sâu",
    ],
    challenges: [
      "Dễ tin kết luận sâu của mình đã đủ chính xác trước khi kiểm tra nó bằng bằng chứng độc lập hoặc góc nhìn khác",
      "Có thể đào quá sâu, quá chú trọng nguyên nhân ẩn và ít chấp nhận một lời giải thích đơn giản ngay cả khi nó phù hợp dữ kiện",
    ],
    developmentAdvice: [
      "Kiểm tra insight bằng nguồn độc lập và chủ động so sánh với lời giải thích đơn giản hơn trước khi chốt kết luận",
      "Đặt tiêu chí dừng cho phân tích, rồi chuyển điều đã hiểu thành một quyết định, bản viết hoặc thay đổi cụ thể có thể đánh giá",
    ],
    evidence: { body1: "Mercury", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Thủy vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa tư duy hoặc giao tiếp với cường độ, nhu cầu kiểm soát và thôi thúc phải tìm câu trả lời có thể khiến đầu óc khó bỏ qua điều chưa hiểu. Áp lực này có thể rèn năng lực phát hiện điểm yếu trong lập luận, theo đuổi vấn đề khó và cải tổ hệ thống tư duy, đồng thời dễ tạo suy nghĩ lặp, tranh luận căng hoặc nhu cầu ép thông tin phải đi tới một kết luận khi bằng chứng chưa đủ.",
    strengths: [
      "Có thể bền bỉ phá bỏ giả định, tìm lỗ hổng và xử lý thông tin phức tạp hoặc tình huống đòi hỏi phân tích nguyên nhân kỹ lưỡng",
      "Ma sát trí tuệ có thể thúc đẩy việc sửa mô hình cũ và xây cách lập luận chặt chẽ hơn sau khi các điểm yếu được nhìn thẳng",
    ],
    challenges: [
      "Dễ suy nghĩ lặp, bám giả thuyết hoặc tiếp tục đặt câu hỏi mang tính ép buộc khi một vấn đề đã cuốn toàn bộ sự chú ý",
      "Có thể kiểm soát cuộc trò chuyện, xem bất đồng như đấu quyền lực và khó dừng lại khi trao đổi không còn tạo thêm dữ kiện",
    ],
    developmentAdvice: [
      "Viết rõ giả thuyết, điều kiện có thể bác bỏ nó và giới hạn thời gian nghiên cứu; chia vấn đề thành từng phần có thể kiểm chứng",
      "Dừng cuộc tranh luận khi trọng tâm chuyển từ dữ kiện sang thắng thua, rồi quay lại sau với câu hỏi và tiêu chí quyết định cụ thể",
    ],
    evidence: { body1: "Mercury", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MERCURY-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mercury",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Thủy lục hợp Sao Diêm Vương",
    coreMeaning:
      "Tư duy và giao tiếp có cơ hội phát triển chiều sâu qua nghiên cứu, điều tra nguyên nhân và tái cấu trúc thông tin khi bạn chủ động khai thác chúng. Tiềm năng này có thể hỗ trợ học sâu, viết phân tích, phỏng vấn hoặc sửa hệ thống từ nguyên nhân cốt lõi, nhưng chỉ trở thành kỹ năng khi sự tò mò được đặt trong một câu hỏi, phạm vi và đầu ra cụ thể.",
    strengths: [
      "Có cơ hội phát triển kỹ năng nghiên cứu chuyên sâu, phân tích nguyên nhân gốc và điều tra dữ kiện thay vì chỉ tiếp nhận thông tin bề mặt",
      "Có thể học cách dùng phỏng vấn, ghi chép hoặc viết phân tích để tổng hợp thông tin phức tạp thành thay đổi có thể áp dụng",
    ],
    challenges: [
      "Dễ nhận ra mình có khả năng đào sâu nhưng chỉ dừng ở hứng thú, không duy trì một quy trình đủ lâu để tạo kết quả",
      "Có thể thu thập quá nhiều dữ liệu mà chưa tổng hợp, hoặc dùng phân tích sâu cho cả những vấn đề chỉ cần giải pháp đơn giản",
    ],
    developmentAdvice: [
      "Chọn một câu hỏi nghiên cứu cụ thể, đặt phạm vi và deadline, rồi ghi lại riêng giả thuyết cùng bằng chứng ủng hộ hoặc phản bác",
      "Kết thúc mỗi vòng tìm hiểu bằng một kết luận, tài liệu hoặc thay đổi cụ thể; chỉ mở rộng phân tích khi đầu ra cho thấy còn khoảng trống quan trọng",
    ],
    evidence: { body1: "Mercury", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-MARS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Mars",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Hỏa",
    coreMeaning:
      "Điều bạn yêu thích, coi trọng và cách bạn hành động để theo đuổi mong muốn có xu hướng hòa trực tiếp vào nhau. Sự kết hợp này có thể tạo nét chủ động, nhiệt tình trong quan hệ, sáng tạo, sở thích hoặc hoạt động xã hội, đồng thời dễ khiến ham muốn tức thời được hành động hóa trước khi bạn kiểm tra liệu nó có phù hợp với giá trị dài hạn hay không.",
    strengths: [
      "Có thể biến sở thích và cảm hứng thành hành động cụ thể, tạo sức sống cho dự án sáng tạo, hợp tác hoặc mục tiêu cá nhân",
      "Thường chủ động thể hiện thiện cảm, đề nghị điều mình muốn và tạo động lực kết nối mà không phải chờ hoàn cảnh thúc đẩy",
    ],
    challenges: [
      "Dễ muốn có ngay điều mình thích hoặc phản ứng nhanh khi lời đề nghị, ý tưởng hay sự chủ động không được đón nhận",
      "Có thể khó phân biệt sức hấp dẫn và xung lực hiện tại với điều thực sự đáng đầu tư hoặc duy trì lâu dài",
    ],
    developmentAdvice: [
      "Trước hành động quan trọng, làm rõ điều mình thật sự coi trọng và kiểm tra xem mong muốn hiện tại có phục vụ giá trị đó không",
      "Giữ sự chủ động nhưng dành chỗ cho phản hồi, sự đồng thuận và nhịp lựa chọn của người cùng tham gia",
    ],
    evidence: { body1: "Venus", body2: "Mars", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-MARS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Mars",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Hỏa",
    coreMeaning:
      "Nhu cầu hòa hợp, kết nối và giữ điều mình coi trọng có thể kéo về một phía, trong khi mong muốn hành động, cạnh tranh hoặc khẳng định bản thân kéo về phía đối diện; sự phân cực này thường hiện rõ qua quan hệ và đối tác. Bạn có thể cảm thấy phải chọn giữa chiều lòng và nói rõ điều mình muốn, hoặc gán phần chủ động hay phần nhượng bộ cho người khác thay vì nhận diện cả hai nhu cầu trong mình.",
    strengths: [
      "Có thể học cách nhận ra nhu cầu của cả hai phía và thương lượng giữa kết nối với quyền chủ động cá nhân",
      "Đối thoại giúp làm rõ khác biệt giữa sức hấp dẫn ban đầu, giá trị chung và mức độ tương thích trong cách hành động",
    ],
    challenges: [
      "Dễ tạo nhịp kéo–đẩy, cạnh tranh trong quan hệ hoặc chờ đối phương giữ vai chủ động trong khi mình chỉ thể hiện nhu cầu hòa hợp",
      "Có thể phóng chiếu sự quyết liệt hay nhu cầu chiều lòng sang người khác, rồi phản ứng với một cực mà mình chưa nhận là của mình",
    ],
    developmentAdvice: [
      "Nói rõ mong muốn, giới hạn và điểm có thể thương lượng của mình, đồng thời mời phía kia diễn đạt những điều tương tự",
      "Tách điều mình muốn làm khỏi cách mình mong người khác phản ứng, rồi tìm lựa chọn mà cả hai phía có thể chủ động xác nhận",
    ],
    evidence: { body1: "Venus", body2: "Mars", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-MARS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Mars",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Hỏa",
    coreMeaning:
      "Sở thích, giá trị và cách hành động để theo đuổi điều mình muốn thường phối hợp tương đối tự nhiên. Dòng chảy này hỗ trợ sáng tạo, giao tiếp xã hội, hợp tác và các mục tiêu tạo hứng thú, giúp sự mềm mại đi cùng quyết đoán; tuy vậy, cảm giác thuận lợi cũng có thể khiến bạn dựa vào sức hút hoặc điều dễ chịu mà ít kiểm tra giá trị lâu dài.",
    strengths: [
      "Có thể thể hiện thiện cảm một cách chủ động và đưa năng lượng sống động vào quan hệ, dự án sáng tạo hoặc hoạt động chung",
      "Thường kết hợp tương đối nhuần nhuyễn khả năng tạo hòa hợp với việc đề xuất, quyết định và tiến tới mục tiêu mình yêu thích",
    ],
    challenges: [
      "Dễ cho rằng sự phối hợp tự nhiên sẽ tự tạo kết quả, nên chưa dùng lợi thế này cho một cam kết hoặc sản phẩm cụ thể",
      "Có thể ưu tiên điều hấp dẫn và dễ chịu trước mắt mà không xem xét đủ độ bền, chi phí hoặc sự phù hợp với giá trị dài hạn",
    ],
    developmentAdvice: [
      "Chọn một mục tiêu, sản phẩm hoặc mối quan hệ cụ thể để chủ động đầu tư sự sáng tạo, thiện chí và khả năng hành động của mình",
      "Định kỳ kiểm tra điều đang theo đuổi có còn phù hợp giá trị dài hạn, thay vì chỉ dựa vào cảm giác trôi chảy ban đầu",
    ],
    evidence: { body1: "Venus", body2: "Mars", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-MARS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Mars",
    aspect: "square",
    title: "Sao Kim vuông Sao Hỏa",
    coreMeaning:
      "Ma sát giữa điều bạn yêu thích, coi trọng hoặc muốn giữ hòa hợp với cách bạn hành động, khẳng định và theo đuổi mong muốn có thể tạo động lực mạnh nhưng khó giữ nhịp ổn định. Sức căng này hỗ trợ sáng tạo và sự can đảm theo đuổi điều có giá trị, đồng thời dễ tạo phản ứng nóng–lạnh, bực bội khi mong muốn không được đáp ứng hoặc hành động làm xáo trộn sự kết nối.",
    strengths: [
      "Có thể phát triển động lực sáng tạo mạnh và sự dũng cảm hành động vì điều mình thực sự coi trọng",
      "Ma sát buộc bạn học cách thương lượng thực tế giữa mong muốn cá nhân, ranh giới và nhu cầu của người cùng tham gia",
    ],
    challenges: [
      "Dễ phản ứng bốc đồng khi bị từ chối, biến khác biệt sở thích thành xung đột cá nhân hoặc cạnh tranh để giành phần hơn",
      "Có thể vừa muốn được yêu thích vừa muốn thắng, khiến tín hiệu thay đổi nhanh và người khác khó biết ranh giới thật nằm ở đâu",
    ],
    developmentAdvice: [
      "Xác định ưu tiên và ranh giới trước khi thương lượng; thống nhất nhịp phản hồi để không phải quyết định ngay khi cảm xúc đang cao",
      "Trì hoãn phản ứng sau khi bị từ chối hoặc kích thích, rồi chọn hành động vừa bảo vệ điều quan trọng vừa tôn trọng quyền lựa chọn của phía kia",
    ],
    evidence: { body1: "Venus", body2: "Mars", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-MARS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Mars",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Hỏa",
    coreMeaning:
      "Sở thích, giá trị và động lực hành động có cơ hội hỗ trợ nhau khi bạn chủ động đưa chúng vào thực tế. Tiềm năng này có thể giúp bạn kết nối, thử nghiệm sáng tạo, biến điều yêu thích thành dự án hoặc đề nghị điều mình muốn theo cách tôn trọng người khác, nhưng sẽ chỉ dừng ở thiện cảm và hứng thú nếu thiếu một bước hành động rõ ràng.",
    strengths: [
      "Có cơ hội phát triển cách chủ động kết nối, hợp tác và thể hiện mong muốn mà vẫn chú ý đến phản hồi cùng ranh giới của người khác",
      "Có thể biến sở thích thành dự án nhỏ, thử nghiệm sáng tạo hoặc hoạt động chung thông qua những bước khởi động thiết thực",
    ],
    challenges: [
      "Dễ nhận ra một cơ hội hấp dẫn nhưng ngại đề nghị, chưa chọn bước đầu tiên hoặc chờ thêm động lực mới bắt đầu",
      "Thiện cảm và ý tưởng có thể kéo dài mà không thành kỹ năng, cam kết hay kết quả nếu không có thời hạn cụ thể",
    ],
    developmentAdvice: [
      "Chọn một mong muốn hoặc giá trị cụ thể và biến nó thành hành động nhỏ có thời hạn, người tham gia và dấu hiệu hoàn tất rõ",
      "Sau mỗi thử nghiệm, hỏi điều gì tạo hứng thú, điều gì tôn trọng ranh giới và bước nào đáng được duy trì thành thói quen",
    ],
    evidence: { body1: "Venus", body2: "Mars", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-JUPITER-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Jupiter",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Mộc",
    coreMeaning:
      "Giá trị, cách kết nối và khả năng tận hưởng có xu hướng hòa trực tiếp với nhu cầu mở rộng, tìm ý nghĩa và tin vào khả năng tốt đẹp. Sự kết hợp này có thể tạo lòng rộng rãi, sức hút xã hội và mong muốn làm cho quan hệ hoặc nguồn lực phát triển, đồng thời dễ khuếch đại sở thích, kỳ vọng hay mức chi tiêu vượt khỏi điều thực sự cần thiết.",
    strengths: [
      "Có thể lan tỏa sự ấm áp, khích lệ và tinh thần hào phóng, giúp quan hệ hoặc hợp tác nhìn thấy nhiều khả năng phát triển hơn",
      "Thường có động lực mở rộng trải nghiệm thẩm mỹ, văn hóa hoặc nguồn lực theo điều mình tin là có giá trị",
    ],
    challenges: [
      "Dễ đồng nhất cảm giác nhiều hơn, đẹp hơn hoặc hào phóng hơn với tốt hơn mà chưa kiểm tra giới hạn thực tế",
      "Có thể hứa, cho đi, hưởng thụ hoặc đầu tư quá tay khi niềm tin tích cực làm mờ chi phí và mức cam kết dài hạn",
    ],
    developmentAdvice: [
      "Trước một lựa chọn lớn trong quan hệ hay tiền bạc, ghi rõ giá trị muốn phục vụ, giới hạn có thể chịu và dấu hiệu cho thấy đã đủ",
      "Giữ lòng rộng rãi nhưng hỏi người nhận thực sự cần gì, thay vì mặc định rằng điều nhiều hơn luôn có ích hơn",
    ],
    evidence: { body1: "Venus", body2: "Jupiter", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-JUPITER-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Jupiter",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Mộc",
    coreMeaning:
      "Điều đem lại gần gũi, dễ chịu hoặc giá trị cá nhân có thể đứng đối diện với những lý tưởng, cơ hội hay chân trời lớn hơn mà bạn muốn theo đuổi. Sự phân cực thường bộc lộ qua quan hệ và lựa chọn nguồn lực: một phía muốn giữ điều đang quý, phía kia muốn mở rộng thêm, khiến kỳ vọng về sự hào phóng, cam kết hoặc ý nghĩa dễ được đặt vào người khác.",
    strengths: [
      "Có thể học cách nhìn một lựa chọn từ cả nhu cầu gắn kết cụ thể lẫn bức tranh phát triển rộng hơn",
      "Quan hệ và đối tác có thể giúp bạn nhận ra sự khác biệt giữa giá trị mình thật sự chọn với kỳ vọng hấp dẫn từ môi trường",
    ],
    challenges: [
      "Dễ dao động giữa thỏa mãn hiện tại và một lời hứa lớn hơn, hoặc chờ người khác đại diện cho cực phiêu lưu, hào phóng hay tiết chế",
      "Có thể phóng đại khác biệt về niềm tin, tiền bạc hoặc mức hưởng thụ thành câu hỏi ai đúng, ai cho nhiều hơn",
    ],
    developmentAdvice: [
      "Khi có bất đồng, tách rõ giá trị không thể nhượng bộ, mong muốn có thể thương lượng và kỳ vọng đang được đặt lên phía kia",
      "Đánh giá cơ hội bằng cả lợi ích mở rộng lẫn tác động lên quan hệ, nguồn lực và cam kết đã có trước khi chọn một phía",
    ],
    evidence: { body1: "Venus", body2: "Jupiter", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-JUPITER-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Jupiter",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Mộc",
    coreMeaning:
      "Giá trị, cách tạo thiện cảm và khả năng tận hưởng thường phối hợp tự nhiên với niềm tin, tầm nhìn và xu hướng phát triển. Dòng chảy này có thể hỗ trợ sự rộng lượng, gu thẩm mỹ cởi mở và những kết nối giúp đôi bên lớn lên; tuy vậy, vì cơ hội hoặc sự dễ chịu đến khá tự nhiên, bạn có thể xem nhẹ giới hạn hay không chủ động biến thuận lợi thành giá trị bền vững.",
    strengths: [
      "Thường dễ tạo bầu không khí tích cực, bao dung và nhìn thấy tiềm năng tốt trong con người, quan hệ hoặc dự án sáng tạo",
      "Có thể kết nối niềm vui với học hỏi, văn hóa và phát triển, qua đó mở rộng gu thưởng thức mà vẫn giữ cảm giác nhất quán về giá trị",
    ],
    challenges: [
      "Dễ tin rằng thiện chí và vận hội sẽ tự duy trì, nên bỏ qua việc đặt giới hạn, theo dõi chi phí hoặc làm rõ cam kết",
      "Có thể quen với sự thuận lợi đến mức chọn điều dễ chịu thay cho cơ hội đòi hỏi chiều sâu và trách nhiệm",
    ],
    developmentAdvice: [
      "Chọn một quan hệ, kỹ năng thẩm mỹ hoặc mục tiêu tài chính đáng giá để đầu tư đều đặn thay vì chỉ đón nhận điều thuận tiện",
      "Đặt một giới hạn cụ thể cho thời gian, tiền bạc hoặc lời hứa để lòng rộng rãi tạo tăng trưởng mà không thành quá tay",
    ],
    evidence: { body1: "Venus", body2: "Jupiter", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-JUPITER-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Jupiter",
    aspect: "square",
    title: "Sao Kim vuông Sao Mộc",
    coreMeaning:
      "Ma sát giữa điều đem lại dễ chịu, gắn kết hoặc giá trị trước mắt với thôi thúc mở rộng và kỳ vọng vào điều lớn hơn có thể tạo nhịp muốn nhiều nhưng khó xác định thế nào là đủ. Sức căng này thúc đẩy bạn thử nghiệm, giao lưu và nâng chuẩn sống, đồng thời dễ dẫn đến phóng đại sức hấp dẫn, chi tiêu, lời hứa hoặc triển vọng của một mối quan hệ hay cơ hội.",
    strengths: [
      "Có thể biến sự không thỏa mãn với giới hạn hiện tại thành động lực mở rộng trải nghiệm, mạng lưới và cách tạo giá trị",
      "Ma sát giúp bạn xây dựng tiêu chuẩn thực tế hơn cho sự hào phóng, hưởng thụ và tăng trưởng thay vì chỉ làm theo quán tính",
    ],
    challenges: [
      "Dễ nâng mức kỳ vọng hoặc cam kết khi đang hứng khởi, rồi gặp áp lực vì nguồn lực và thực tế không theo kịp",
      "Có thể dùng mua sắm, chiều lòng hoặc tìm trải nghiệm mới để duy trì cảm giác tích cực mà chưa xử lý nhu cầu cốt lõi",
    ],
    developmentAdvice: [
      "Tạo khoảng dừng trước quyết định lớn và so sánh kỳ vọng ban đầu với chi phí, giới hạn cùng lợi ích có thể kiểm chứng",
      "Theo dõi những lúc mình muốn thêm một trải nghiệm, món đồ hay lời bảo đảm; hỏi nhu cầu nào đang cần được đáp ứng trực tiếp hơn",
    ],
    evidence: { body1: "Venus", body2: "Jupiter", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-JUPITER-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Jupiter",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Mộc",
    coreMeaning:
      "Giá trị, quan hệ và sở thích có cơ hội mở rộng nhờ học hỏi, niềm tin hoặc những kết nối mới khi bạn chủ động tham gia. Tiềm năng này hỗ trợ việc chia sẻ nguồn lực, khám phá thẩm mỹ và tạo hợp tác đôi bên cùng phát triển, nhưng có thể chỉ dừng ở thiện chí hoặc một lời mời hấp dẫn nếu bạn không chọn bước cụ thể để nuôi dưỡng nó.",
    strengths: [
      "Có thể nhận ra và kết nối những người, trải nghiệm hoặc nguồn lực giúp mở rộng điều mình coi trọng theo hướng tích cực",
      "Thường có khả năng biến sự cởi mở và thiện cảm thành trao đổi, học hỏi hoặc hợp tác mang lợi ích cho nhiều phía",
    ],
    challenges: [
      "Dễ vui với khả năng đang mở ra nhưng trì hoãn việc chọn cơ hội phù hợp và dành nguồn lực thật cho nó",
      "Có thể phân tán sự quan tâm qua nhiều lời mời, sở thích hoặc mối quen biết mà chưa phát triển chiều sâu ở đâu",
    ],
    developmentAdvice: [
      "Chọn một cơ hội phù hợp giá trị hiện tại, xác định bước thử nhỏ cùng thời hạn thay vì chờ cảm hứng tự chuyển thành kết quả",
      "Sau mỗi trải nghiệm mới, ghi lại điều gì thật sự làm giàu quan hệ hoặc hiểu biết và điều gì chỉ tạo hứng thú ngắn hạn",
    ],
    evidence: { body1: "Venus", body2: "Jupiter", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Thổ",
    coreMeaning:
      "Giá trị, cách kết nối và khả năng tận hưởng có xu hướng hòa trực tiếp với nhu cầu về giới hạn, trách nhiệm và độ bền. Sự kết hợp này có thể tạo thái độ nghiêm túc trong quan hệ, thẩm mỹ có tiêu chuẩn và khả năng xây nguồn lực lâu dài; đồng thời, bạn có thể dè dặt khi bộc lộ tình cảm hoặc cảm thấy điều mình quý phải được chứng minh bằng thời gian và nỗ lực.",
    strengths: [
      "Có thể kiên trì chăm sóc quan hệ, kỹ năng thẩm mỹ hoặc nguồn lực đã được chọn thay vì chỉ dựa vào cảm hứng ban đầu",
      "Thường có khả năng đặt tiêu chuẩn rõ và biến cam kết thành những hành động ổn định, có trách nhiệm theo thời gian",
    ],
    challenges: [
      "Dễ kiểm soát biểu đạt tình cảm quá chặt hoặc chờ đủ chắc chắn mới cho phép mình đón nhận sự gần gũi và niềm vui",
      "Có thể gắn giá trị bản thân với việc đáp ứng nghĩa vụ, chịu đựng lâu hoặc luôn chứng minh mình đáng tin cậy",
    ],
    developmentAdvice: [
      "Phân biệt tiêu chuẩn bảo vệ điều quan trọng với quy tắc chỉ nhằm tránh bị từ chối, rồi thử một cách bộc lộ tình cảm nhỏ và rõ ràng",
      "Duy trì cam kết bằng nhịp đều đặn nhưng dành trước một phần thời gian hoặc nguồn lực cho niềm vui không cần phải tạo thành tích",
    ],
    evidence: { body1: "Venus", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Saturn",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Thổ",
    coreMeaning:
      "Nhu cầu gần gũi, hòa hợp và tận hưởng có thể đứng đối diện với yêu cầu về trách nhiệm, khoảng cách hoặc kiểm soát thực tế. Sự phân cực này thường hiện rõ qua quan hệ: một phía tìm sự đón nhận, phía kia giữ giới hạn hay đánh giá độ tin cậy, khiến bạn có thể giao một cực cho người khác thay vì cùng nhận diện nhu cầu kết nối và tự bảo vệ trong mình.",
    strengths: [
      "Có thể phát triển khả năng thương lượng ranh giới và cam kết để sự gần gũi không loại bỏ trách nhiệm cá nhân",
      "Quan hệ giúp bạn kiểm chứng tiêu chuẩn, nhận ra ai có khả năng cùng xây sự tin cậy thay vì chỉ tạo sức hút ban đầu",
    ],
    challenges: [
      "Dễ trải nghiệm nhịp tiến–lùi khi một phía muốn kết nối còn phía kia sợ phụ thuộc, bị từ chối hoặc phải gánh thêm nghĩa vụ",
      "Có thể phóng chiếu vai trò lạnh lùng, đòi hỏi hay thiếu trách nhiệm sang đối phương rồi bỏ qua phần nhu cầu tương ứng của mình",
    ],
    developmentAdvice: [
      "Nói riêng về nhu cầu tình cảm, giới hạn thực tế và mức cam kết có thể đáp ứng, thay vì dùng sự im lặng để thử lòng nhau",
      "Quan sát lúc mình đặt toàn bộ trách nhiệm hoặc quyền từ chối vào phía kia, rồi xác định một lựa chọn và một ranh giới thuộc về mình",
    ],
    evidence: { body1: "Venus", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Saturn",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Thổ",
    coreMeaning:
      "Giá trị, cách gắn kết và khả năng quản lý điều mình quý thường phối hợp tự nhiên với tính thực tế, kỷ luật và tầm nhìn dài hạn. Dòng chảy này hỗ trợ lòng trung thành, thẩm mỹ có cấu trúc và việc tích lũy nguồn lực bền vững; tuy vậy, sự ổn định quen thuộc có thể khiến bạn giữ một tiêu chuẩn hoặc cam kết lâu hơn cần thiết mà ít xem lại cảm xúc hiện tại.",
    strengths: [
      "Thường có khả năng thể hiện sự quan tâm qua tính nhất quán, giữ lời và đầu tư lâu dài vào người hoặc việc mình coi trọng",
      "Có thể kết hợp gu thẩm mỹ với kỹ thuật, kế hoạch và tiết chế để tạo sản phẩm hay nguồn lực có độ bền",
    ],
    challenges: [
      "Dễ mặc định rằng trách nhiệm và sự hiện diện ổn định đã đủ thay cho việc nói ra tình cảm hoặc cập nhật nhu cầu",
      "Có thể duy trì lựa chọn an toàn theo thói quen dù giá trị, quan hệ hoặc niềm vui đã thay đổi theo thời gian",
    ],
    developmentAdvice: [
      "Định kỳ hỏi điều đang duy trì còn phản ánh giá trị hiện tại hay chỉ tiếp tục vì quen thuộc và cảm giác phải có trách nhiệm",
      "Bổ sung lời ghi nhận và khoảng vui có chủ ý vào những cam kết vốn đã vững, thay vì chỉ chăm sóc chúng bằng nghĩa vụ",
    ],
    evidence: { body1: "Venus", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Saturn",
    aspect: "square",
    title: "Sao Kim vuông Sao Thổ",
    coreMeaning:
      "Ma sát giữa nhu cầu được kết nối, trân trọng hoặc tận hưởng với cảm nhận về giới hạn, nghĩa vụ và điều kiện thực tế có thể làm sự gần gũi trở nên thận trọng hoặc nặng tính kiểm chứng. Sức căng này có thể thúc đẩy bạn xây tiêu chuẩn và giá trị vững hơn, nhưng cũng dễ tạo cảm giác phải trì hoãn niềm vui, tự chứng minh giá trị hoặc phòng thủ trước khả năng bị từ chối.",
    strengths: [
      "Có thể biến trải nghiệm thiếu cân bằng hoặc thất vọng thành năng lực đặt ranh giới, chọn cam kết và quản trị nguồn lực thực tế hơn",
      "Ma sát tạo động lực xây lòng tin bằng hành động nhất quán thay vì dựa hoàn toàn vào cảm xúc hay lời hứa nhất thời",
    ],
    challenges: [
      "Dễ rút lại tình cảm, tự phê bình hoặc làm việc quá mức khi chưa nhận được sự công nhận mà mình mong đợi",
      "Có thể dao động giữa kìm hãm hưởng thụ và bù đắp sau thời gian thiếu thốn, khiến quan hệ hoặc nguồn lực khó giữ nhịp ổn định",
    ],
    developmentAdvice: [
      "Khi cảm thấy bị từ chối hoặc không đủ giá trị, tách dữ kiện hiện tại khỏi tiêu chuẩn tự đặt rồi diễn đạt một nhu cầu có thể được trả lời rõ",
      "Thiết kế giới hạn cho trách nhiệm và một mức hưởng thụ phù hợp nguồn lực, thay vì chỉ cho phép một phía tồn tại tại mỗi thời điểm",
    ],
    evidence: { body1: "Venus", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Saturn",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Thổ",
    coreMeaning:
      "Giá trị, quan hệ và nguồn lực có cơ hội được củng cố nhờ cấu trúc, kỷ luật và những cam kết vừa sức khi bạn chủ động sử dụng chúng. Tiềm năng này hỗ trợ việc biến thiện cảm hoặc sở thích thành điều đáng tin cậy và lâu bền, nhưng có thể vẫn ở dạng ý định nếu bạn chưa đặt lịch, giới hạn hay trách nhiệm cụ thể để duy trì.",
    strengths: [
      "Có thể xây lòng tin qua những thỏa thuận nhỏ, rõ ràng và được thực hiện đều đặn thay vì cần một cam kết lớn ngay từ đầu",
      "Có cơ hội phát triển kỹ năng thẩm mỹ hoặc quản trị nguồn lực bằng quy trình thực tế mà vẫn giữ được niềm vui và giá trị cá nhân",
    ],
    challenges: [
      "Dễ nhận ra cách làm ổn định nhưng trì hoãn bước thiết lập cấu trúc vì cơ hội chưa tạo áp lực phải hành động",
      "Có thể chọn trách nhiệm quen thuộc mà bỏ lỡ một kết nối hay sở thích đáng đầu tư nếu không chủ động dành chỗ cho nó",
    ],
    developmentAdvice: [
      "Chọn một quan hệ, kỹ năng hoặc mục tiêu nguồn lực và thiết lập một cam kết nhỏ có thời hạn, nhịp thực hiện cùng điểm rà soát",
      "Dùng giới hạn để bảo vệ thời gian cho điều mình quý, không chỉ để cắt giảm niềm vui hoặc tăng thêm nghĩa vụ",
    ],
    evidence: { body1: "Venus", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Thiên Vương",
    coreMeaning:
      "Giá trị, cách kết nối và khả năng tận hưởng có xu hướng hòa trực tiếp với nhu cầu tự do, khác biệt và đổi mới. Sự kết hợp này có thể tạo sức hút với con người, thẩm mỹ hoặc trải nghiệm không theo khuôn quen thuộc và giúp bạn nhanh chóng nhận ra điều cần được làm mới; đồng thời, hứng thú với cái mới có thể khiến nhịp gắn kết hay ưu tiên thay đổi trước khi nền tảng ổn định được xây đủ.",
    strengths: [
      "Có thể chủ động mở ra cách thể hiện tình cảm, gu thẩm mỹ hoặc cách sử dụng nguồn lực mang dấu ấn riêng thay vì lặp lại khuôn mẫu",
      "Thường nhạy với những giá trị đã lỗi thời và có khả năng tạo không gian để bản thân cùng người khác kết nối mà vẫn giữ tính tự chủ",
    ],
    challenges: [
      "Dễ đồng nhất cảm giác mới mẻ hoặc bất ngờ với độ phù hợp lâu dài, nhất là khi một lựa chọn tạo hứng thú mạnh ngay từ đầu",
      "Có thể thay đổi tín hiệu, sở thích hay mức gần gũi nhanh khi cảm thấy bị định nghĩa hoặc khi trải nghiệm không còn đủ kích thích",
    ],
    developmentAdvice: [
      "Trước thay đổi lớn trong quan hệ hoặc nguồn lực, xác định điều cần được giải phóng, điều vẫn đáng giữ và một bước thử có thể đảo ngược",
      "Nói sớm về nhu cầu khác biệt và khoảng riêng, đồng thời tạo một nhịp ổn định tối thiểu để người liên quan biết điều gì có thể dựa vào",
    ],
    evidence: { body1: "Venus", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Uranus",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu gần gũi, đồng thuận và giữ điều mình quý có thể đứng đối diện với nhu cầu tự do, khoảng cách hoặc thay đổi nhịp. Sự phân cực này thường bộc lộ qua quan hệ: một phía tìm tính liên tục còn phía kia đại diện cho sự khác biệt hay bất ngờ, khiến bạn có thể gán một cực cho người khác thay vì nhận diện cả nhu cầu gắn kết lẫn tự chủ trong mình.",
    strengths: [
      "Có thể học cách nhìn quan hệ từ cả nhu cầu thuộc về và quyền khác biệt, qua đó xây thỏa thuận linh hoạt hơn cho hai phía",
      "Những góc nhìn hoặc lựa chọn trái chiều giúp bạn kiểm tra giá trị nào thực sự thuộc về mình thay vì chỉ thuận theo kỳ vọng chung",
    ],
    challenges: [
      "Dễ tạo nhịp kéo–đẩy khi một bên tìm xác nhận còn bên kia cần khoảng riêng, nhất là nếu nhu cầu chỉ được thể hiện qua rút lui hoặc phản ứng bất ngờ",
      "Có thể phóng chiếu vai trò thiếu ổn định hay quá ràng buộc sang đối phương và bỏ qua cách mình đang góp phần duy trì sự phân cực",
    ],
    developmentAdvice: [
      "Gọi tên riêng mức gần gũi, khoảng riêng và khả năng thay đổi có thể chấp nhận, rồi cùng thống nhất cách báo trước khi cần điều chỉnh nhịp",
      "Khi bị cuốn vào việc chọn một phía, hỏi cả điều mình muốn duy trì lẫn điều cần được tự do hơn trước khi đưa ra quyết định",
    ],
    evidence: { body1: "Venus", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Uranus",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Thiên Vương",
    coreMeaning:
      "Giá trị, cách kết nối và nhu cầu tự chủ thường phối hợp khá tự nhiên, giúp bạn cởi mở với khác biệt mà không nhất thiết xem chúng là mối đe dọa cho quan hệ. Dòng chảy này hỗ trợ thẩm mỹ sáng tạo, mạng lưới đa dạng và những cách gắn kết linh hoạt; tuy vậy, vì việc thích nghi đến tương đối dễ, bạn có thể coi sự tự do là hiển nhiên và ít chủ động xây chiều sâu hoặc tính liên tục.",
    strengths: [
      "Thường có khả năng đón nhận nét riêng của người khác và điều chỉnh cách tương tác mà vẫn giữ được giá trị cùng bản sắc cá nhân",
      "Có thể kết hợp gu thẩm mỹ với thử nghiệm và công cụ mới để tạo ra lựa chọn độc đáo nhưng vẫn có sức hấp dẫn xã hội",
    ],
    challenges: [
      "Dễ dựa vào sự thoải mái và linh hoạt sẵn có mà không nói rõ điều gì cần cam kết để kết nối phát triển sâu hơn",
      "Có thể chuyển nhanh giữa nhiều hứng thú hoặc mạng lưới, khiến tiềm năng sáng tạo phân tán thay vì thành một giá trị có hình dạng rõ",
    ],
    developmentAdvice: [
      "Chọn một kết nối hoặc dự án vốn đang vận hành tự nhiên và đầu tư đều đặn để sự linh hoạt đi cùng chiều sâu có thể nhận thấy",
      "Thống nhất một vài điểm ổn định cần giữ, sau đó chủ động dành không gian cho thử nghiệm thay vì mặc định mọi người hiểu giống nhau về tự do",
    ],
    evidence: { body1: "Venus", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Uranus",
    aspect: "square",
    title: "Sao Kim vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu ổn định, gắn kết hoặc giữ giá trị quen thuộc với thôi thúc thay đổi và tự chủ có thể tạo nhịp nóng–lạnh hay phản ứng mạnh khi bạn cảm thấy bị giới hạn. Sức căng này thúc đẩy việc làm mới quan hệ, thẩm mỹ và cách quản lý nguồn lực, nhưng dễ khiến thay đổi được dùng như lối thoát tức thời nếu chưa xác định rõ khuôn nào thực sự không còn phù hợp.",
    strengths: [
      "Có thể biến sự không thoải mái với khuôn cũ thành động lực thiết kế ranh giới, cách hợp tác hoặc lựa chọn thẩm mỹ phù hợp hơn với hiện tại",
      "Ma sát giúp bạn nhận ra giá trị nào cần được bảo vệ và phần nào có thể thử nghiệm, thay vì giữ nguyên hoặc phá bỏ toàn bộ",
    ],
    challenges: [
      "Dễ đổi ưu tiên, mức gần gũi hoặc cách chi tiêu khi đang bức bối, rồi phải xử lý hệ quả sau khi nhu cầu tự do tạm thời đã giảm",
      "Có thể xem mọi yêu cầu về tính nhất quán là ràng buộc hoặc ngược lại cố giữ ổn định đến khi phản ứng thay đổi trở nên đột ngột",
    ],
    developmentAdvice: [
      "Khi muốn thay đổi ngay, tạm chia quyết định thành phần có thể thử trong thời hạn ngắn và phần cần thêm dữ kiện trước khi cam kết",
      "Thiết kế ranh giới gồm cả điểm ổn định và khoảng linh hoạt, rồi quan sát nhịp nào giúp kết nối bền hơn mà không làm mất tự chủ",
    ],
    evidence: { body1: "Venus", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Uranus",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Thiên Vương",
    coreMeaning:
      "Giá trị, quan hệ và sở thích có cơ hội được làm mới thông qua thử nghiệm, mạng lưới hoặc cách tiếp cận khác thường khi bạn chủ động tham gia. Tiềm năng này hỗ trợ những điều chỉnh vừa đủ để tăng tự chủ và sức sống cho kết nối hay hoạt động sáng tạo, nhưng có thể chỉ dừng ở tò mò nếu bạn không biến ý tưởng mới thành một thử nghiệm cụ thể.",
    strengths: [
      "Có thể nhận ra những công cụ, cộng đồng hoặc cách hợp tác mới giúp điều mình coi trọng được thể hiện linh hoạt hơn",
      "Có cơ hội thử một lựa chọn thẩm mỹ, cách kết nối hoặc phương án nguồn lực khác mà không cần phủ nhận toàn bộ nền tảng hiện có",
    ],
    challenges: [
      "Dễ thu thập nhiều ý tưởng thú vị nhưng chờ thêm cảm hứng, khiến cơ hội đổi mới không đi qua bước thử đầu tiên",
      "Có thể giữ các kết nối mới ở mức trao đổi nhẹ vì chưa chủ động chọn nơi đáng đầu tư thời gian và sự hiện diện",
    ],
    developmentAdvice: [
      "Chọn một ý tưởng phù hợp giá trị hiện tại và chạy thử ở quy mô nhỏ với thời hạn, giới hạn cùng tiêu chí quan sát rõ",
      "Chủ động liên hệ một người hoặc cộng đồng khác với vòng quen thuộc và xác định một hoạt động chung cụ thể thay vì chỉ trao đổi ý tưởng",
    ],
    evidence: { body1: "Venus", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Hải Vương",
    coreMeaning:
      "Giá trị, cách kết nối và cảm nhận cái đẹp có xu hướng hòa trực tiếp với tưởng tượng, sự nhạy cảm và nhu cầu tìm ý nghĩa vượt khỏi lợi ích thuần túy. Sự kết hợp này có thể tạo cảm hứng nghệ thuật, lòng cảm thông và khả năng nhận ra những sắc thái tinh tế trong quan hệ; đồng thời, cảm nhận đẹp hoặc hình ảnh mong muốn có thể dễ được xem như toàn bộ thực tế trước khi dữ kiện và ranh giới được làm rõ.",
    strengths: [
      "Có thể chuyển cảm xúc, biểu tượng và những điều khó gọi tên thành trải nghiệm thẩm mỹ hoặc cách thể hiện sự quan tâm giàu sắc thái",
      "Thường nhạy với nhu cầu của người khác và có khả năng coi trọng lòng trắc ẩn, ý nghĩa cùng sự kết nối hơn lợi ích tức thời",
    ],
    challenges: [
      "Dễ gắn sức hấp dẫn hay cảm giác đồng điệu ban đầu với một mức độ tương thích, cam kết hoặc giá trị chưa được kiểm chứng",
      "Có thể làm mờ nhu cầu và giới hạn của mình để giữ một hình ảnh đẹp về quan hệ, trải nghiệm hoặc điều mình đang đầu tư",
    ],
    developmentAdvice: [
      "Khi một cảm nhận rất cuốn hút, ghi riêng điều mình cảm thấy, điều đã quan sát được và điều còn cần hỏi trước khi cam kết",
      "Giữ không gian cho cảm hứng nhưng diễn đạt một nhu cầu và một giới hạn cụ thể để sự tinh tế có chỗ đứng trong đời sống thực",
    ],
    evidence: { body1: "Venus", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Điều bạn coi trọng và mong nhận được trong quan hệ có thể đứng đối diện với một hình ảnh lý tưởng, cảm nhận tinh tế hoặc ý nghĩa mà bạn tìm kiếm. Sự phân cực này thường hiện qua người khác như một tấm gương: một phía giữ mong muốn cụ thể, phía kia mang kỳ vọng hoặc sự mơ hồ, khiến bạn có thể đặt phẩm chất mình khao khát hay phần cần được làm rõ hoàn toàn vào đối phương.",
    strengths: [
      "Có thể học cách nhìn quan hệ từ cả nhu cầu hữu hình lẫn tầng cảm xúc, biểu tượng và lòng cảm thông mà mỗi phía mang theo",
      "Những phản chiếu từ đối tác giúp bạn nhận ra sự khác biệt giữa giá trị thực sự của mình với hình ảnh mình hy vọng tìm thấy",
    ],
    challenges: [
      "Dễ dao động giữa tin vào điều đẹp nhất và thất vọng khi thực tế không khớp kỳ vọng, nhất là khi thỏa thuận chưa được nói rõ",
      "Có thể phóng chiếu vai trò cứu giúp, thấu hiểu tuyệt đối hoặc thiếu rõ ràng sang phía kia rồi bỏ qua nhu cầu và lựa chọn của chính mình",
    ],
    developmentAdvice: [
      "Trong một bất đồng, tách điều mỗi phía đã nói hoặc làm khỏi ý nghĩa mình đang gán cho nó, rồi xác nhận lại bằng câu hỏi trực tiếp",
      "Nêu rõ mong muốn, giới hạn và phần chưa chắc chắn của mình trước khi quyết định một người hay lựa chọn có đáp ứng hình ảnh lý tưởng hay không",
    ],
    evidence: { body1: "Venus", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Hải Vương",
    coreMeaning:
      "Giá trị, thẩm mỹ và cách đồng cảm thường phối hợp khá tự nhiên với tưởng tượng và cảm nhận biểu tượng. Dòng chảy này hỗ trợ sáng tạo, sự dịu dàng và khả năng cảm nhận chiều sâu tinh tế trong kết nối; tuy vậy, vì trực giác và thiện chí đến tương đối dễ, bạn có thể tin vào bầu không khí chung mà ít chủ động kiểm tra chi tiết hoặc nói rõ điều thực tế cần duy trì.",
    strengths: [
      "Thường có khả năng tạo không gian giàu cảm xúc và thẩm mỹ, nơi người khác cảm thấy được lắng nghe mà không cần mọi điều phải giải thích ngay",
      "Có thể đưa tưởng tượng và lòng trắc ẩn vào nghệ thuật, quan hệ hoặc hoạt động sẻ chia theo cách mềm mại và có sức gợi",
    ],
    challenges: [
      "Dễ mặc định rằng sự đồng cảm tự nhiên đồng nghĩa hai phía hiểu cùng một điều, nên bỏ qua việc xác nhận nhu cầu hay cam kết",
      "Có thể chọn giữ bầu không khí dễ chịu thay vì làm rõ một chi tiết không hoàn hảo nhưng quan trọng với sự bền vững",
    ],
    developmentAdvice: [
      "Chọn một cảm hứng hoặc kết nối đang trôi chảy và thêm nhịp thực hành đều đặn để giá trị của nó có thể được nhìn thấy theo thời gian",
      "Giữ sự cảm thông nhưng định kỳ hỏi điều gì đã được thống nhất, điều gì chỉ được cảm nhận và chi tiết nào cần nói thành lời",
    ],
    evidence: { body1: "Venus", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Kim vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa giá trị, nhu cầu được kết nối và điều kiện thực tế với hình ảnh lý tưởng hoặc cảm nhận mong manh có thể khiến bạn khó chấp nhận khoảng cách giữa điều đẹp trong tưởng tượng và điều đang hiện hữu. Sức căng này có thể trở thành động lực sáng tạo và lòng cảm thông sâu hơn, nhưng cũng dễ làm việc đánh giá quan hệ, hưởng thụ hay nguồn lực thiếu nhất quán nếu sự không hoàn hảo bị né tránh.",
    strengths: [
      "Có thể biến sự không khớp giữa kỳ vọng và trải nghiệm thành chất liệu sáng tạo cùng khả năng xác định giá trị chân thực hơn",
      "Ma sát thúc đẩy bạn phát triển lòng trắc ẩn có ranh giới, vừa tôn trọng cảm xúc vừa nhìn được điều kiện và trách nhiệm cụ thể",
    ],
    challenges: [
      "Dễ giữ một kỳ vọng đẹp quá lâu hoặc phản ứng thất vọng mạnh khi dữ kiện buộc phải điều chỉnh hình ảnh mình đã đầu tư",
      "Có thể cho đi, chi tiêu hoặc nhượng bộ để duy trì cảm giác kết nối mà chưa kiểm tra nhu cầu, khả năng và sự đồng thuận thực tế",
    ],
    developmentAdvice: [
      "Khi kỳ vọng và trải nghiệm xung đột, chọn một dữ kiện có thể xác minh và một giới hạn có thể thực hiện trước khi diễn giải ý nghĩa rộng hơn",
      "Thực hành chịu đựng một điểm chưa hoàn hảo đủ lâu để đánh giá nó, thay vì lập tức tô đẹp, tự trách hoặc phủ nhận toàn bộ giá trị đang có",
    ],
    evidence: { body1: "Venus", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Hải Vương",
    coreMeaning:
      "Giá trị, quan hệ và cảm nhận thẩm mỹ có cơ hội được làm sâu hơn qua tưởng tượng, lòng cảm thông hoặc thực hành mang tính biểu tượng khi bạn chủ động tham gia. Tiềm năng này thuận lợi cho việc biến sự nhạy cảm thành sáng tạo hay một cách kết nối tinh tế, nhưng có thể chỉ dừng ở rung động và thiện ý nếu chưa có hành động cụ thể để đưa cảm hứng vào đời sống.",
    strengths: [
      "Có thể nhận ra những hoạt động nghệ thuật, sẻ chia hoặc chiêm nghiệm giúp mình biểu đạt điều coi trọng bằng ngôn ngữ giàu cảm xúc hơn",
      "Có cơ hội nuôi dưỡng kết nối qua sự lắng nghe và những cử chỉ nhỏ mang ý nghĩa, thay vì chỉ dựa vào lời giải thích lý trí",
    ],
    challenges: [
      "Dễ hài lòng với một ý tưởng đẹp hoặc cảm giác đồng cảm mà trì hoãn bước luyện tập, hoàn thiện hay xác nhận với người liên quan",
      "Có thể phân tán sự nhạy cảm qua nhiều cảm hứng và lời mời, khiến chưa có lựa chọn nào nhận đủ thời gian để tạo giá trị rõ",
    ],
    developmentAdvice: [
      "Chọn một cảm hứng phù hợp giá trị hiện tại và chuyển nó thành buổi thực hành, sản phẩm nhỏ hoặc hành động quan tâm có thời hạn rõ",
      "Sau mỗi thử nghiệm, ghi lại điều gì thực sự tạo kết nối và điều gì chỉ thuộc kỳ vọng của mình để chọn bước tiếp theo có cơ sở hơn",
    ],
    evidence: { body1: "Venus", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Kim đồng cung Sao Diêm Vương",
    coreMeaning:
      "Giá trị, cách kết nối và điều bạn bị thu hút có xu hướng hòa trực tiếp với nhu cầu chiều sâu, cường độ và đi tới tận gốc vấn đề. Sự kết hợp này có thể tạo khả năng gắn bó mạnh, nhìn ra động cơ sâu và tái cấu trúc điều mình thực sự coi trọng; đồng thời, cảm giác thân mật hay đầu tư sâu có thể dễ bị đồng nhất với quyền được biết, giữ hoặc ảnh hưởng đến lựa chọn của nhau.",
    strengths: [
      "Có thể tập trung đáng kể vào một quan hệ, kỹ năng thẩm mỹ hoặc nguồn lực đã chọn và theo đuổi giá trị cốt lõi thay vì chỉ dừng ở bề mặt",
      "Thường có khả năng nhận ra khi sở thích, cách yêu hoặc cách định giá không còn chân thực và sẵn sàng thay đổi chúng từ gốc",
    ],
    challenges: [
      "Dễ xem cường độ cảm xúc hoặc sức hút mạnh như bằng chứng rằng một kết nối phải được duy trì hay hiểu theo một cách duy nhất",
      "Có thể khó buông một kỳ vọng, vật sở hữu hoặc cách gắn bó khi nó đã trở thành nơi mình đầu tư nhiều giá trị và cảm giác an toàn",
    ],
    developmentAdvice: [
      "Khi muốn đi sâu hoặc giữ chặt, hỏi điều gì đang tạo thân mật và điều gì đang thu hẹp quyền lựa chọn của mình hay người liên quan",
      "Chọn một giá trị cốt lõi cần giữ và một thói quen sở hữu hay kiểm soát có thể thay đổi từng bước, thay vì tái cấu trúc mọi thứ cùng lúc",
    ],
    evidence: { body1: "Venus", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Kim đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu hòa hợp, được trân trọng và giữ điều mình quý có thể đứng đối diện với cường độ, quyền lực hoặc yêu cầu thay đổi sâu. Sự phân cực này thường hiện qua quan hệ: một phía tìm sự gần gũi dễ chịu còn phía kia mang sức ép phải đi sâu hay nắm thế chủ động, khiến bạn có thể đặt toàn bộ quyền ảnh hưởng hoặc nhu cầu giữ hòa khí vào người khác thay vì nhận phần mình trong thế giằng co.",
    strengths: [
      "Có thể học cách nhận ra cả nhu cầu kết nối lẫn động lực quyền lực đang hiện diện, từ đó thương lượng trung thực hơn thay vì chỉ giữ bề ngoài yên ổn",
      "Những phản chiếu mạnh từ đối tác giúp bạn làm rõ giá trị, ranh giới và phần trách nhiệm của mỗi phía trong một cam kết",
    ],
    challenges: [
      "Dễ tạo nhịp kéo–đẩy khi một phía muốn được xác nhận còn phía kia thử độ sâu, giữ khoảng kiểm soát hoặc yêu cầu thay đổi",
      "Có thể phóng chiếu vai trò áp đảo, khó buông hay chiều lòng sang đối phương và bỏ qua cách lựa chọn của mình duy trì sự phân cực",
    ],
    developmentAdvice: [
      "Trong thế giằng co, gọi tên điều mỗi phía muốn giữ, điều muốn thay đổi và quyền quyết định nào không thể thay người khác thực hiện",
      "Tách sức hút hoặc nỗi sợ mất kết nối khỏi thỏa thuận thực tế, rồi xác nhận lại giới hạn và sự đồng thuận trước bước cam kết tiếp theo",
    ],
    evidence: { body1: "Venus", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Kim tam hợp Sao Diêm Vương",
    coreMeaning:
      "Giá trị, sức hút và khả năng đi sâu thường phối hợp khá tự nhiên với năng lực tái tạo và nhận diện điều cốt lõi. Dòng chảy này hỗ trợ kết nối có chiều sâu, thẩm mỹ giàu sức nặng và việc phục hồi nguồn lực sau thay đổi; tuy vậy, vì cường độ hay ảnh hưởng cá nhân vận hành tương đối dễ, bạn có thể xem chúng là hiển nhiên và ít kiểm tra người khác đang trải nghiệm sức ảnh hưởng ấy ra sao.",
    strengths: [
      "Thường có khả năng ở lại với một cuộc đối thoại hoặc quá trình sáng tạo đủ lâu để vượt qua bề mặt và tìm ra giá trị thực chất",
      "Có thể tái cấu trúc quan hệ, sở thích hoặc nguồn lực một cách tập trung khi nhận ra điều cũ không còn phản ánh ưu tiên sâu bên trong",
    ],
    challenges: [
      "Dễ mặc định rằng sức hút, lòng trung thành hoặc khả năng đọc tình huống sâu đã đủ để hai phía hiểu cùng một mức cam kết",
      "Có thể quen với việc tạo ảnh hưởng mạnh mà chưa chủ động chừa không gian cho nhịp xử lý và lựa chọn khác biệt của người liên quan",
    ],
    developmentAdvice: [
      "Đưa năng lực đi sâu vào một cam kết hoặc dự án cụ thể, đồng thời đặt điểm rà soát để chiều sâu không biến thành quán tính giữ chặt",
      "Hỏi trực tiếp người liên quan về tác động của sự hiện diện hay kỳ vọng của mình thay vì chỉ dựa vào khả năng cảm nhận động lực ngầm",
    ],
    evidence: { body1: "Venus", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Kim vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu hòa hợp, được coi trọng hoặc giữ ổn định với thôi thúc kiểm soát, đi sâu hay thay đổi tận gốc có thể làm phản ứng mạnh lên khi sự an toàn bị chạm tới. Sức căng này có thể thúc đẩy việc nhìn thẳng vào động cơ và xây giá trị chân thực hơn, nhưng dễ kéo khác biệt về tình cảm hay nguồn lực thành cuộc đấu về ai quyết định nếu ranh giới và quyền lựa chọn chưa rõ.",
    strengths: [
      "Có thể biến trải nghiệm căng thẳng thành khả năng nhận diện động cơ sâu, bảo vệ giá trị cốt lõi và thay đổi cách gắn bó không còn phù hợp",
      "Ma sát tạo động lực xây ranh giới rõ hơn quanh tình cảm, sự trao đổi và nguồn lực thay vì giữ hòa khí bằng cách né vấn đề",
    ],
    challenges: [
      "Dễ phản ứng quyết liệt, thử độ trung thành hoặc giữ chặt điều mình quý khi cảm thấy mất ảnh hưởng hay không còn được ưu tiên",
      "Có thể dùng im lặng, nhượng bộ rồi tích tụ hoặc gây sức ép để giành lại cảm giác an toàn, khiến quyền lựa chọn của hai phía khó được nhìn rõ",
    ],
    developmentAdvice: [
      "Khi căng thẳng tăng, tạm dừng việc thuyết phục và xác định dữ kiện, nhu cầu, giới hạn cùng quyết định thuộc quyền của từng phía",
      "Chọn một điểm bất cân bằng có thể quan sát trong quan hệ hoặc nguồn lực và điều chỉnh bằng thỏa thuận nhỏ, thay vì đòi thay đổi toàn bộ ngay lập tức",
    ],
    evidence: { body1: "Venus", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-VENUS-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Venus",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Kim lục hợp Sao Diêm Vương",
    coreMeaning:
      "Giá trị, quan hệ và nguồn lực có cơ hội được làm sâu hoặc tái cấu trúc khi bạn chủ động đối thoại và xem xét động cơ bên dưới lựa chọn hiện tại. Tiềm năng này hỗ trợ việc xây lòng tin, phục hồi điều có giá trị và biến sức hút thành cam kết có chiều sâu, nhưng có thể chỉ dừng ở nhận thức nếu bạn không chọn một thực hành cụ thể để thay đổi cách kết nối hay định giá.",
    strengths: [
      "Có thể nhận ra thời điểm thích hợp để mở một cuộc trao đổi sâu, rà lại ưu tiên hoặc củng cố nguồn lực mà không cần tạo khủng hoảng",
      "Có cơ hội phát triển lòng tin qua sự trung thực từng bước và những lựa chọn cho thấy giá trị nào thực sự đáng đầu tư lâu dài",
    ],
    challenges: [
      "Dễ hiểu được động lực sâu nhưng trì hoãn việc nói ra hoặc thay đổi vì cơ hội này không tự tạo sức ép phải hành động",
      "Có thể hứng thú với việc phân tích nguyên nhân mà chưa chuyển nhận thức thành ranh giới, thỏa thuận hay cách phân bổ nguồn lực mới",
    ],
    developmentAdvice: [
      "Chọn một chủ đề đang cần chiều sâu và đặt một cuộc đối thoại có câu hỏi, giới hạn cùng bước tiếp theo rõ thay vì chỉ suy nghĩ thêm",
      "Thử tái phân bổ một phần nhỏ thời gian, sự chú ý hoặc nguồn lực theo giá trị cốt lõi rồi quan sát tác động trước khi mở rộng thay đổi",
    ],
    evidence: { body1: "Venus", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-JUPITER-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Jupiter",
    aspect: "conjunction",
    title: "Sao Hỏa đồng cung Sao Mộc",
    coreMeaning:
      "Động lực hành động, sự chủ động và quyết liệt của Sao Hỏa hòa thành một cụm năng lượng với niềm tin, tầm nhìn và xu hướng mở rộng của Sao Mộc. Sự kết hợp này có thể tạo tinh thần tiến lên, dám làm và nhiệt huyết rõ rệt; đồng thời, niềm tin mạnh dễ khuếch đại xung lực, khiến bạn hành động trước khi lượng sức hoặc tự tin vượt quá dữ kiện đang có.",
    strengths: [
      "Có thể nhanh chóng chuyển một niềm tin hoặc mục tiêu lớn thành hành động cụ thể và tạo đà cho người khác cùng tham gia",
      "Thường có sức bật, lòng can đảm và khả năng duy trì nhiệt huyết khi theo đuổi trải nghiệm giúp mình phát triển",
    ],
    challenges: [
      "Dễ xem cảm giác hứng khởi là dấu hiệu đã sẵn sàng, nên cam kết quá nhiều hoặc tăng tốc khi nguồn lực chưa được kiểm tra",
      "Có thể bảo vệ kế hoạch bằng sự quả quyết mạnh đến mức ít nghe cảnh báo, giới hạn hoặc góc nhìn khác",
    ],
    developmentAdvice: [
      "Trước một bước tiến lớn, kiểm tra mục tiêu, nguồn lực và mức rủi ro bằng dữ kiện cụ thể rồi chọn hành động đầu tiên có thể điều chỉnh",
      "Dùng nhiệt huyết để khởi động nhưng đặt điểm dừng rà soát, để lòng tin hỗ trợ hành động thay vì thay thế việc lượng sức",
    ],
    evidence: { body1: "Mars", body2: "Jupiter", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-JUPITER-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Jupiter",
    aspect: "opposition",
    title: "Sao Hỏa đối đỉnh Sao Mộc",
    coreMeaning:
      "Thôi thúc hành động và phản ứng theo bản năng có thể đứng đối diện với niềm tin, tầm nhìn hoặc mong muốn mở rộng. Sự phân cực này dễ tạo nhịp tiến rất mạnh rồi phải điều chỉnh, hoặc phản ứng quyết liệt khi mục tiêu và quan điểm bị thách thức; hướng tích hợp là để lòng dũng cảm đi cùng phán đoán, nhịp độ và khả năng nhìn hệ quả từ phía đối diện.",
    strengths: [
      "Có thể học cách cân bằng hành động trực tiếp với bức tranh lớn, biến khác biệt quan điểm thành động lực xác định điều đáng theo đuổi",
      "Những phản hồi đối lập giúp bạn nhận ra lúc nào cần tiến lên và lúc nào cần điều chỉnh chiến lược mà không từ bỏ mục tiêu",
    ],
    challenges: [
      "Dễ dao động giữa đẩy nhanh để chứng minh niềm tin và chững lại khi thực tế cho thấy mục tiêu hoặc nhịp độ cần thay đổi",
      "Có thể phản ứng mạnh với người chất vấn kế hoạch, rồi đặt sự thận trọng hoàn toàn ở phía họ và sự dũng cảm hoàn toàn ở phía mình",
    ],
    developmentAdvice: [
      "Khi mục tiêu bị thách thức, tách điều cần bảo vệ khỏi điều có thể điều chỉnh và hỏi phản hồi nào đang chỉ ra một giới hạn thực tế",
      "Thống nhất một nhịp thử nghiệm có điểm đánh giá rõ, để quyết tâm và phán đoán cùng tham gia thay vì luân phiên lấn át nhau",
    ],
    evidence: { body1: "Mars", body2: "Jupiter", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-JUPITER-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Jupiter",
    aspect: "trine",
    title: "Sao Hỏa tam hợp Sao Mộc",
    coreMeaning:
      "Động lực hành động và tinh thần phát triển thường phối hợp khá tự nhiên, giúp bạn chủ động nắm cơ hội với khí thế và lòng tin. Dòng chảy này hỗ trợ khả năng truyền động lực và tiến về mục tiêu rộng hơn; tuy vậy, sự thuận tay không bảo đảm thành công, và có thể khiến bạn đánh giá thấp giới hạn hoặc ít kiểm tra những giả định đang nâng đỡ sự tự tin.",
    strengths: [
      "Thường dễ kết nối mục tiêu dài hạn với bước hành động trước mắt và khuyến khích người khác bằng tinh thần tiến lên rõ ràng",
      "Có thể phục hồi động lực khá nhanh sau trở ngại và nhìn thử thách như cơ hội mở rộng kỹ năng hoặc trải nghiệm",
    ],
    challenges: [
      "Dễ dựa vào đà thuận lợi và lòng tin sẵn có, nên bỏ qua khâu chuẩn bị hoặc tín hiệu cho thấy giới hạn đang đến gần",
      "Có thể nhận quá nhiều cơ hội cùng lúc vì tin rằng năng lượng và thời gian sẽ tiếp tục đáp ứng như hiện tại",
    ],
    developmentAdvice: [
      "Đưa khí thế tự nhiên vào một ưu tiên rõ và xác định tiêu chí hoàn thành, thay vì mở rộng đồng thời mọi hướng hấp dẫn",
      "Chủ động mời một lượt phản biện về giả định, giới hạn và nguồn lực trước khi tăng quy mô của kế hoạch đang thuận lợi",
    ],
    evidence: { body1: "Mars", body2: "Jupiter", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-JUPITER-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Jupiter",
    aspect: "square",
    title: "Sao Hỏa vuông Sao Mộc",
    coreMeaning:
      "Ma sát mạnh giữa nhu cầu hành động ngay và xu hướng mở rộng kỳ vọng có thể tạo tham vọng, sức cạnh tranh cùng động lực vượt giới hạn. Sức căng này thúc đẩy những bước tiến lớn, nhưng cũng dễ dẫn tới hấp tấp, quá đà, tranh thắng hoặc chọn mục tiêu vượt xa mức chuẩn bị nếu niềm tin và xung lực liên tục khuếch đại lẫn nhau.",
    strengths: [
      "Có thể biến sự bất mãn với giới hạn hiện tại thành động lực luyện năng lực, thử cách mới và theo đuổi mục tiêu thách thức",
      "Áp lực phải hành động giúp bạn nhận ra niềm tin nào đủ thực chất để được chuyển thành cam kết và nỗ lực bền bỉ",
    ],
    challenges: [
      "Dễ tăng mục tiêu hoặc mức cược khi đang hứng khởi mà chưa kiểm tra giả định, thời gian chuẩn bị và hậu quả nếu sai",
      "Có thể biến khác biệt chiến lược thành cuộc tranh thắng, phản ứng vội hoặc tiếp tục đẩy khi cơ thể và hoàn cảnh đã báo cần giảm nhịp",
    ],
    developmentAdvice: [
      "Trước quyết định có mức cược cao, viết rõ giả định chính, bằng chứng ủng hộ, giới hạn chịu đựng và điều kiện phải dừng hoặc đổi hướng",
      "Chia mục tiêu lớn thành các chặng có nhịp nghỉ và điểm kiểm tra, để sức cạnh tranh phục vụ tiến bộ thay vì kéo hành động vượt khỏi khả năng quản trị rủi ro",
    ],
    evidence: { body1: "Mars", body2: "Jupiter", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-JUPITER-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Jupiter",
    aspect: "sextile",
    title: "Sao Hỏa lục hợp Sao Mộc",
    coreMeaning:
      "Động lực hành động và tầm nhìn phát triển tạo ra những cơ hội có thể khai thác khi bạn chủ động lựa chọn và tham gia. Một bước đúng lúc có thể biến tầm nhìn thành hành động, đồng thời biến trải nghiệm hành động thành cơ hội mở rộng; nhưng tiềm năng này không tự vận hành như một năng lực sẵn có và có thể trôi qua nếu chỉ dừng ở ý định hoặc chờ cảm hứng đủ mạnh.",
    strengths: [
      "Có thể nhận ra những lời mời, dự án hoặc trải nghiệm nơi một hành động có tính toán mở ra không gian học hỏi và phát triển tiếp theo",
      "Khi chủ động kết nối mục tiêu với bước thử phù hợp, bạn có cơ hội xây lòng tin từ trải nghiệm thay vì chỉ từ kỳ vọng",
    ],
    challenges: [
      "Dễ nhìn thấy nhiều khả năng tích cực nhưng trì hoãn việc chọn một hướng, khiến cơ hội chưa được chuyển thành kinh nghiệm thực tế",
      "Có thể chờ thời điểm hoàn hảo hoặc một động lực lớn, trong khi góc này cần quyết định nhỏ và sự tham gia đều để được kích hoạt",
    ],
    developmentAdvice: [
      "Chọn một cơ hội phù hợp với mục tiêu hiện tại và xác định hành động khởi động có thời hạn, quy mô cùng mức rủi ro vừa đủ",
      "Sau mỗi bước thử, ghi lại điều đã học và chủ động quyết định mở rộng, điều chỉnh hay dừng thay vì để đà phát triển phụ thuộc vào may rủi",
    ],
    evidence: { body1: "Mars", body2: "Jupiter", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Sao Hỏa đồng cung Sao Thổ",
    coreMeaning:
      "Động lực hành động và sự quyết đoán của Sao Hỏa nằm cùng một cụm với yêu cầu về cấu trúc, kiểm soát và trách nhiệm của Sao Thổ. Sự kết hợp này có thể tạo sức bền, kỷ luật và khả năng dồn năng lượng vào công việc có trình tự; đồng thời, cảm giác vừa muốn tiến vừa phải tự ghìm dễ làm nhịp hành động căng cứng, dồn nén hoặc gây thất vọng khi tiến độ bị giới hạn.",
    strengths: [
      "Có thể tập trung nỗ lực lâu dài vào mục tiêu khó, giữ cam kết ngay cả khi kết quả cần nhiều thời gian mới hiện rõ",
      "Thường có khả năng biến quyết tâm thành quy trình, tiêu chuẩn và những bước thực hiện chịu được áp lực thực tế",
    ],
    challenges: [
      "Dễ siết kiểm soát hoặc ép mình tiếp tục khi gặp chậm trễ, khiến sự kiên trì dần chuyển thành căng thẳng và hao mòn",
      "Có thể giữ bực bội bên trong vì cho rằng phải hoàn thành trách nhiệm trước khi được nghỉ, điều chỉnh hoặc bộc lộ khó khăn",
    ],
    developmentAdvice: [
      "Dùng cấu trúc để dẫn năng lượng bằng cách chia mục tiêu thành bước khả thi, có tiêu chí hoàn thành và khoảng hồi phục rõ",
      "Định kỳ phân biệt nỗ lực đang xây độ bền với việc ép bản thân quá mức, rồi điều chỉnh tải mà không xem đó là từ bỏ",
    ],
    evidence: { body1: "Mars", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Saturn",
    aspect: "opposition",
    title: "Sao Hỏa đối đỉnh Sao Thổ",
    coreMeaning:
      "Nhu cầu hành động, phản ứng hoặc thúc đẩy có thể đứng đối diện với giới hạn, trách nhiệm và sự thận trọng. Thế kéo căng này dễ tạo nhịp tiến–dừng hoặc cảm giác phải chiến đấu với lực cản từ hoàn cảnh hay người giữ quy tắc; trưởng thành đến từ việc nhận ra giới hạn nào cần tôn trọng, giới hạn nào cần thương lượng và thời điểm nào phù hợp để chuyển phản lực thành chiến lược.",
    strengths: [
      "Có thể phát triển khả năng đánh giá lực cản từ nhiều phía và chọn thời điểm hành động thay vì chỉ tiến theo xung lực ban đầu",
      "Những phản hồi đối lập giúp bạn rèn sự kiên định có chiến lược, vừa giữ mục tiêu vừa chịu trách nhiệm về cách mình theo đuổi nó",
    ],
    challenges: [
      "Dễ luân phiên giữa thúc quá mạnh và ghìm hoàn toàn, khiến tiến độ thiếu nhịp ổn định dù cả quyết tâm lẫn ý thức trách nhiệm đều cao",
      "Có thể quy mọi giới hạn thành đối thủ hoặc đặt toàn bộ vai trò cản trở vào người khác, rồi bỏ qua phần lựa chọn và timing của mình",
    ],
    developmentAdvice: [
      "Khi gặp phản lực, xác định đó là giới hạn thực, yêu cầu trách nhiệm hay khác biệt về thời điểm trước khi quyết định tiến, giữ hoặc đổi cách làm",
      "Thiết kế một bước thử có phạm vi và thời hạn rõ để kiểm chứng chiến lược, thay vì dùng thêm sức ép hoặc rút lui hoàn toàn",
    ],
    evidence: { body1: "Mars", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Saturn",
    aspect: "trine",
    title: "Sao Hỏa tam hợp Sao Thổ",
    coreMeaning:
      "Hành động và kỷ luật thường phối hợp khá tự nhiên, giúp quyết tâm được chuyển thành tiến độ có cấu trúc và duy trì qua thời gian. Dòng chảy này hỗ trợ sức bền, khả năng làm việc dài hạn và kiểm soát năng lượng thay vì chỉ bùng lên nhất thời; tuy vậy, nó không bảo đảm thành công và có thể khiến bạn quá quen với việc chịu tải hoặc giữ quy trình cũ mà ít nhận ra lúc cần đổi cách làm.",
    strengths: [
      "Thường có khả năng bắt tay vào việc với nhịp ổn định, giữ tiêu chuẩn và tiếp tục qua những giai đoạn đòi hỏi sự kiên nhẫn",
      "Có thể kết hợp quyết đoán với chuẩn bị thực tế, nhờ đó năng lượng được dùng nhất quán thay vì phân tán theo phản ứng tức thời",
    ],
    challenges: [
      "Dễ xem khả năng chịu đựng và tự kiểm soát là lý do để nhận thêm trách nhiệm mà chưa kiểm tra tải tích lũy",
      "Có thể cứng nhắc với quy trình từng hiệu quả, ít nhận ra khi điều kiện mới cần thử nghiệm, nghỉ ngơi hoặc phân bổ lại công việc",
    ],
    developmentAdvice: [
      "Duy trì thế mạnh về kỷ luật nhưng đặt điểm rà soát định kỳ cho tải, tiến độ và mức phù hợp của phương pháp đang dùng",
      "Cho phép thay đổi quy trình khi dữ kiện cho thấy cách mới bền vững hơn, thay vì đồng nhất sự kiên định với việc không được điều chỉnh",
    ],
    evidence: { body1: "Mars", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Saturn",
    aspect: "square",
    title: "Sao Hỏa vuông Sao Thổ",
    coreMeaning:
      "Ma sát mạnh giữa thôi thúc tiến lên với giới hạn, trì hoãn, quy tắc hoặc yêu cầu kiểm soát có thể tạo cảm giác stop–go và bực bội khi hành động bị cản. Sức căng này dễ dẫn đến cố quá mạnh rồi kiệt sức, tự ép mình hoặc trở nên cứng rắn khi chịu áp lực; đồng thời, nếu được xử lý có chiến lược, nó có thể rèn sức bền đáng kể, khả năng làm việc trong điều kiện khó và trách nhiệm với hệ quả của hành động.",
    strengths: [
      "Có thể phát triển năng lực chịu áp lực và giải quyết nhiệm vụ khó bằng sự bền bỉ được tôi luyện qua những lần phải điều chỉnh cách tiến",
      "Ma sát thúc đẩy bạn xây chiến lược thực tế hơn, hiểu giá trị của timing và tạo năng lực hành động trong giới hạn thay vì chờ điều kiện hoàn hảo",
    ],
    challenges: [
      "Dễ dùng thêm sức mạnh khi kế hoạch không chạy, khiến nhịp cố gắng–kiệt sức lặp lại mà giới hạn thực vẫn chưa được xử lý",
      "Sự thất vọng tích tụ có thể chuyển thành phản ứng đối đầu, tự phê bình khắt khe hoặc áp tiêu chuẩn cứng lên người cùng làm",
    ],
    developmentAdvice: [
      "Trước khi tăng lực, kiểm tra giới hạn nào là thực và xử lý sự thất vọng đủ để lựa chọn chiến lược thay vì phản ứng ngay",
      "Chia tải, đặt nhịp hành động và hồi phục cụ thể, đồng thời chịu trách nhiệm điều chỉnh kế hoạch khi sức bền không còn bù được cấu trúc thiếu phù hợp",
    ],
    evidence: { body1: "Mars", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Saturn",
    aspect: "sextile",
    title: "Sao Hỏa lục hợp Sao Thổ",
    coreMeaning:
      "Động lực hành động có cơ hội được đưa vào kế hoạch, quy trình hoặc cam kết thực tế khi bạn chủ động tạo cấu trúc cho nó. Những lựa chọn có chủ đích có thể củng cố độ bền và tính nhất quán, còn một kế hoạch phù hợp giúp hành động hiệu quả hơn; nhưng tiềm năng này cần được kích hoạt bằng thói quen và bước làm cụ thể, không tự vận hành như dòng phối hợp tự nhiên của tam hợp.",
    strengths: [
      "Có thể nhận ra những cách tổ chức vừa đủ để biến ý định thành tiến độ và xây năng lực qua từng cam kết có thể duy trì",
      "Khi chủ động kết nối hành động với lịch trình hoặc tiêu chuẩn rõ, bạn có cơ hội tăng độ tin cậy mà không cần kiểm soát mọi chi tiết",
    ],
    challenges: [
      "Dễ trì hoãn việc thiết lập cấu trúc nên năng lượng bị dùng rời rạc, dù cơ hội tạo một nhịp làm việc ổn định đang sẵn có",
      "Có thể chuẩn bị và chỉnh kế hoạch quá lâu mà chưa bắt đầu, hoặc khởi động nhiều lần nhưng không duy trì cam kết đủ để thấy kết quả",
    ],
    developmentAdvice: [
      "Chọn một mục tiêu và thiết lập thói quen hành động nhỏ có lịch, tiêu chí hoàn thành cùng điểm rà soát thay vì chờ kế hoạch hoàn hảo",
      "Dùng trải nghiệm thực tế để điều chỉnh cấu trúc sau mỗi chu kỳ, nhờ đó kỷ luật được xây từ lựa chọn chủ động chứ không từ ép buộc",
    ],
    evidence: { body1: "Mars", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Sao Hỏa đồng cung Sao Thiên Vương",
    coreMeaning:
      "Động lực hành động và sự quyết đoán của Sao Hỏa hòa thành một cụm với nhu cầu tự do, đổi mới và phá mô thức cũ của Sao Thiên Vương. Sự kết hợp này có thể tạo phản xạ nhanh trước hướng đi mới, tinh thần dám thử và sức bật để phá thế trì trệ; đồng thời, thôi thúc thoát khỏi kiểm soát dễ khiến bạn đổi hướng đột ngột hoặc hành động trước khi kiểm tra hệ quả.",
    strengths: [
      "Có thể nhanh chóng biến một ý tưởng khác biệt thành thử nghiệm thực tế và tạo chuyển động ở nơi cách làm cũ đã mất hiệu quả",
      "Thường có sự chủ động, độc lập và khả năng ứng biến khi tình huống đòi hỏi quyết định ngoài khuôn mẫu quen thuộc",
    ],
    challenges: [
      "Dễ phản ứng quá nhanh khi cảm thấy quyền tự chủ bị thu hẹp, nên quyết định có thể phục vụ việc thoát giới hạn hơn là mục tiêu dài hạn",
      "Có thể đổi hướng ngay khi năng lượng mới xuất hiện mà chưa đánh giá tác động lên cam kết, nguồn lực hoặc người liên quan",
    ],
    developmentAdvice: [
      "Tạo một khoảng dừng ngắn trước quyết định khó đảo ngược để xác định mình đang đổi mới có mục đích hay chỉ phản ứng với cảm giác bị kiểm soát",
      "Đưa sáng kiến vào thử nghiệm quy mô kiểm soát được, đặt giới hạn rủi ro và quan sát kết quả trước khi mở rộng thay đổi",
    ],
    evidence: { body1: "Mars", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Uranus",
    aspect: "opposition",
    title: "Sao Hỏa đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu hành động và khẳng định ý chí có thể đứng đối diện với nhu cầu tự do, đổi hướng hoặc thoát khỏi ràng buộc. Thế đối cực này dễ tạo nhịp thúc mạnh rồi bẻ hướng, phản ứng rõ trước sự can thiệp, hoặc khiến thay đổi từ môi trường và người khác làm lệch điều bạn định thực hiện; khả năng trưởng thành nằm ở việc giữ quyền tự chủ mà vẫn phân biệt phản ứng tức thời với quyết định chiến lược.",
    strengths: [
      "Có thể học cách nhìn cả mục tiêu hành động lẫn nhu cầu linh hoạt của các phía, từ đó tìm phương án thay đổi mà không xóa bỏ mọi ranh giới",
      "Những tình huống khó đoán có thể rèn khả năng điều chỉnh nhanh và bảo vệ điều cốt lõi mà không phải bám cứng vào cách làm ban đầu",
    ],
    challenges: [
      "Dễ đẩy mạnh để giành lại quyền quyết định rồi bất ngờ đổi hướng khi cảm thấy lựa chọn của mình tiếp tục bị thu hẹp",
      "Có thể đặt tính khó đoán hoàn toàn vào hoàn cảnh hoặc người khác, trong khi phản ứng của chính mình cũng góp phần duy trì nhịp căng kéo",
    ],
    developmentAdvice: [
      "Nhận diện tình huống kích hoạt cảm giác mất quyền tự chủ, rồi tách điều cần phản hồi ngay khỏi quyết định cần thêm dữ kiện và thời gian",
      "Tạo khoảng linh hoạt có giới hạn rõ cho mỗi phía, đồng thời xác định trách nhiệm và hệ quả trước khi đổi hướng cam kết",
    ],
    evidence: { body1: "Mars", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Uranus",
    aspect: "trine",
    title: "Sao Hỏa tam hợp Sao Thiên Vương",
    coreMeaning:
      "Hành động và đổi mới thường phối hợp khá tự nhiên, giúp bạn dễ thử cách làm mới, thích ứng nhanh và chủ động thay đổi trước khi bị hoàn cảnh buộc phải đổi. Động lực có thể được khơi mạnh bởi thử thách, khám phá và quyền tự chủ; tuy vậy, dòng chảy thuận lợi này không bảo đảm kết quả và có thể khiến bạn đổi quá sớm chỉ vì nhịp ổn định không còn tạo cảm giác mới mẻ.",
    strengths: [
      "Thường có khả năng ứng biến và đưa sáng kiến vào hành động mà không cần một cuộc khủng hoảng mới rời khỏi cách làm quen thuộc",
      "Có thể giữ sự chủ động trong hoàn cảnh thay đổi nhanh và truyền cho người khác tinh thần thử nghiệm thay vì mắc kẹt trong trì trệ",
    ],
    challenges: [
      "Dễ quen với tốc độ cao và kích thích liên tục, nên đánh giá thấp giá trị của giai đoạn lặp lại cần thiết để một thay đổi trưởng thành",
      "Có thể rời một phương án đang hiệu quả quá sớm vì hứng thú với hướng mới, dù mục tiêu ban đầu chưa được theo đến điểm kiểm chứng",
    ],
    developmentAdvice: [
      "Dùng khả năng thích ứng vào những vấn đề thực sự cần đổi mới và đặt tiêu chí cho biết khi nào thử nghiệm đã đủ dữ kiện để đánh giá",
      "Giữ một phần nhịp ổn định cho việc hoàn thiện, để nhu cầu khám phá bổ sung cho tiến độ thay vì liên tục thay thế nó",
    ],
    evidence: { body1: "Mars", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Uranus",
    aspect: "square",
    title: "Sao Hỏa vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát mạnh giữa thôi thúc hành động tức thời với nhu cầu phá giới hạn, đổi hướng hoặc giành tự do có thể làm phản ứng tăng tốc khi bạn cảm thấy bị ép. Sức căng này dễ tạo sự thiếu kiên nhẫn, những cú bẻ lái hoặc xu hướng tăng mức độ chỉ để buộc tình hình thay đổi; đồng thời, nó có thể trở thành sức mạnh phá thế trì trệ, đối diện cách làm lỗi thời và hành động khi hoàn cảnh cần chuyển đổi nhanh.",
    strengths: [
      "Có thể huy động nhiều năng lượng để thách thức một mô thức không còn hiệu quả và tạo bước chuyển nơi người khác còn ngần ngại",
      "Áp lực thay đổi có thể rèn khả năng quyết định nhanh, tìm lối đi khác và giữ sự chủ động trong tình huống nhiều biến động",
    ],
    challenges: [
      "Dễ coi mọi giới hạn là thứ phải phá hoặc tăng cường phản ứng khi gặp cản trở, dù một số ranh giới đang bảo vệ mục tiêu chung",
      "Có thể thực hiện bước khó đảo ngược trong lúc bực bội mà chưa đánh giá hậu quả, phương án dự phòng và mức rủi ro có thể chấp nhận",
    ],
    developmentAdvice: [
      "Xử lý bực bội trước khi tăng cường hành động, rồi kiểm tra giới hạn nào lỗi thời và giới hạn nào vẫn có chức năng thực tế",
      "Ưu tiên thử nghiệm nhỏ, đặt phương án dự phòng và nhịp đánh giá rõ trước khi chuyển một thôi thúc đổi mới thành thay đổi quy mô lớn",
    ],
    evidence: { body1: "Mars", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Uranus",
    aspect: "sextile",
    title: "Sao Hỏa lục hợp Sao Thiên Vương",
    coreMeaning:
      "Hành động và đổi mới tạo ra những cơ hội có thể khai thác khi bạn chủ động thử cách khác và thực sự đưa ý tưởng vào thực tế. Tiềm năng này hỗ trợ cải tiến, phản ứng linh hoạt và tìm phương án mới trong giới hạn phù hợp; nhưng nó không tự vận hành như dòng phối hợp của tam hợp, nên có thể chỉ dừng ở hứng thú nếu chưa có lựa chọn, thử nghiệm và hành động cụ thể.",
    strengths: [
      "Có thể nhận ra điểm nhỏ trong quy trình hoặc thói quen nơi một thay đổi chủ động sẽ mở thêm lựa chọn và tăng khả năng thích ứng",
      "Khi biến ý tưởng thành thử nghiệm có giới hạn, bạn có cơ hội xây cách hành động linh hoạt hơn mà không cần phá bỏ toàn bộ cấu trúc hiện tại",
    ],
    challenges: [
      "Dễ thấy ý tưởng mới nhưng chờ lúc đủ hứng mới triển khai, khiến cơ hội cải tiến không được kiểm chứng bằng trải nghiệm thực",
      "Có thể đổi nhiều chi tiết nhỏ mà thiếu mục tiêu chung, nên hoạt động thử nghiệm tăng lên nhưng thay đổi có giá trị vẫn chưa rõ",
    ],
    developmentAdvice: [
      "Chọn một thử nghiệm cụ thể, đặt mục tiêu, giới hạn rủi ro và thời điểm đo kết quả trước khi bắt đầu",
      "Sau thử nghiệm, chủ động giữ phần hiệu quả, bỏ phần không hiệu quả và chọn bước tiếp theo dựa trên dữ kiện thay vì cảm giác mới lạ",
    ],
    evidence: { body1: "Mars", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Hỏa đồng cung Sao Hải Vương",
    coreMeaning:
      "Động lực hành động và sự quyết đoán của Sao Hỏa hòa trực tiếp với tưởng tượng, lý tưởng và độ nhạy của Sao Hải Vương. Bạn có thể hành động rất mạnh khi một hình ảnh, ý nghĩa hoặc cảm hứng đủ sức lay động, đồng thời biến lòng trắc ẩn hay tầm nhìn sáng tạo thành trải nghiệm thực tế; tuy vậy, mục tiêu, ranh giới hoặc động cơ có thể khó phân biệt khi cảm hứng đi trước việc kiểm chứng.",
    strengths: [
      "Có thể đưa một hình dung giàu ý nghĩa vào hành động và tạo trải nghiệm cụ thể từ điều ban đầu chỉ tồn tại như cảm hứng",
      "Thường nhạy với bối cảnh cùng tác động của hành động lên người khác, nhờ đó có thể điều chỉnh cách tiến theo những tín hiệu tinh tế",
    ],
    challenges: [
      "Dễ phân tán năng lượng khi mục tiêu chưa rõ hoặc theo đuổi một hình ảnh lý tưởng mà chưa xác định điều gì có thể kiểm chứng",
      "Có thể khó nhận ra lúc nên tiến, nghỉ hay đổi hướng nếu cảm nhận thay đổi nhưng chưa có tiêu chí thực tế để đánh giá tiến độ",
    ],
    developmentAdvice: [
      "Chuyển cảm hứng thành mục tiêu cụ thể với tiêu chí hoàn thành, rồi kiểm tra dữ kiện trước những quyết định khó đảo ngược",
      "Giữ ranh giới về thời gian và năng lượng, đồng thời tạo nhịp hành động–hồi phục để độ nhạy hỗ trợ thay vì làm mờ hướng đi",
    ],
    evidence: { body1: "Mars", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Hỏa đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Nhu cầu hành động trực tiếp và khẳng định ý chí có thể đứng đối diện với sự nhạy cảm, lý tưởng hoặc những tín hiệu chưa rõ ràng. Thế đối cực này dễ tạo nhịp muốn tiến nhưng chưa chắc mình đang tiến vì điều gì, hành động mạnh rồi nghi ngờ hoặc rút lại, hay đặt sự mơ hồ hoàn toàn vào phía khác; hướng tích hợp là làm rõ phần lựa chọn của mình mà không phủ nhận trực giác và bối cảnh tinh tế.",
    strengths: [
      "Có thể học cách cân bằng quyết đoán với khả năng tiếp nhận nhiều lớp tín hiệu, từ đó chọn hành động vừa có mục tiêu vừa phù hợp bối cảnh",
      "Những phản chiếu từ phía đối diện giúp bạn nhận ra khác biệt giữa điều đã quan sát, điều đang cảm nhận và kỳ vọng mình đặt vào tình huống",
    ],
    challenges: [
      "Dễ dùng hành động mạnh để buộc một tình huống chưa đủ thông tin phải trở nên rõ, rồi hoài nghi quyết định khi kết quả không khớp hình dung",
      "Có thể quy động cơ khó hiểu cho người khác và bỏ qua giả định, kỳ vọng hoặc lựa chọn của mình đang góp phần duy trì sự phân cực",
    ],
    developmentAdvice: [
      "Trước cam kết lớn, dành thời gian kiểm chứng và tách dữ kiện, trực giác hữu ích cùng suy đoán chưa được xác nhận thành ba phần riêng",
      "Định nghĩa mục tiêu, ranh giới và trách nhiệm của từng phía để hành động dựa trên điều đã rõ thay vì cố lấp khoảng trống thông tin",
    ],
    evidence: { body1: "Mars", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Hỏa tam hợp Sao Hải Vương",
    coreMeaning:
      "Hành động và cảm hứng thường phối hợp khá tự nhiên, giúp bạn dễ biến một hình dung thành chuyển động, linh hoạt theo bối cảnh và kết nối điều muốn thực hiện với ý nghĩa sâu hơn phía sau. Dòng chảy này hỗ trợ những việc cần tưởng tượng, sự tinh tế hoặc cảm nhận thời điểm; tuy vậy, nó không bảo đảm trực giác luôn đúng và có thể khiến bạn ít kiểm tra giả định khi mọi thứ đang diễn ra thuận theo cảm nhận.",
    strengths: [
      "Thường có khả năng đưa sự đồng cảm hoặc tưởng tượng vào cách hành động, giúp phương án thực hiện mềm dẻo hơn trước nhu cầu của hoàn cảnh",
      "Có thể duy trì động lực khi công việc gắn với ý nghĩa mình coi trọng và chuyển cảm hứng thành trải nghiệm mà không cần nhiều sức ép bên ngoài",
    ],
    challenges: [
      "Dễ dựa vào cảm nhận nhiều hơn mức dữ kiện cho phép, nhất là khi hướng đi hiện tại tạo cảm giác liền mạch và có ý nghĩa",
      "Có thể bỏ qua cấu trúc, tiêu chí đo lường hoặc giới hạn nguồn lực vì tin rằng cảm hứng sẽ tiếp tục dẫn đường trong quá trình thực hiện",
    ],
    developmentAdvice: [
      "Giữ dòng cảm hứng nhưng bổ sung các checkpoint thực tế để xác định kết quả, tiến độ và giả định nào đã được kiểm chứng",
      "Trước khi mở rộng, rà lại năng lượng, nguồn lực và giới hạn để sự linh hoạt tiếp tục phục vụ mục tiêu thay vì thay thế cấu trúc cần thiết",
    ],
    evidence: { body1: "Mars", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Hỏa vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu hành động, quyết định hoặc thúc đẩy với sự mơ hồ, lý tưởng hóa và những tín hiệu khó định hình có thể khiến bạn dùng nhiều năng lượng khi hướng đi chưa đủ rõ. Sức căng này dễ dẫn đến theo nhiều hướng, thất vọng khi thực tế khác hình dung, đẩy mạnh để tìm sự rõ ràng hoặc trì hoãn vì chưa có phương án đủ chắc; đồng thời, nó có thể buộc bạn làm rõ động cơ và biến tưởng tượng thành kế hoạch có thể thử nghiệm.",
    strengths: [
      "Có thể phát triển năng lực nhận ra khoảng cách giữa ý định và thực tế, rồi dùng ma sát ấy để xác định điều mình thực sự muốn thực hiện",
      "Áp lực phải làm rõ giúp bạn học cách đưa hình dung giàu cảm hứng vào kế hoạch cụ thể thay vì để nó chỉ tồn tại như kỳ vọng",
    ],
    challenges: [
      "Dễ tăng cường hành động khi dữ kiện chưa khớp kỳ vọng, khiến thời gian và năng lượng tiếp tục được đầu tư mà mục tiêu vẫn chưa rõ hơn",
      "Có thể luân phiên giữa theo đuổi nhiều khả năng và trì hoãn hoàn toàn, vì mỗi hướng đều mang ý nghĩa nhưng chưa có tiêu chí để lựa chọn",
    ],
    developmentAdvice: [
      "Viết rõ mục tiêu trước khi tăng lực, chia việc thành thử nghiệm nhỏ và đặt mốc kiểm chứng cho những giả định quan trọng",
      "Khi dữ kiện không khớp hình dung, đánh giá lại kế hoạch và bảo vệ ranh giới về thời gian, năng lượng thay vì cố duy trì hình ảnh ban đầu",
    ],
    evidence: { body1: "Mars", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Hỏa lục hợp Sao Hải Vương",
    coreMeaning:
      "Cảm hứng, tưởng tượng và độ nhạy tạo ra những cơ hội có thể được chuyển thành hành động thực tế khi bạn chủ động lựa chọn và thử nghiệm. Tiềm năng này giúp tìm phương án tinh tế hơn thay vì chỉ phản ứng trực tiếp, nhưng không tự vận hành như dòng phối hợp của tam hợp; nó cần một bước làm cụ thể, phản hồi và ranh giới rõ để ý tưởng có ý nghĩa trở thành thay đổi quan sát được.",
    strengths: [
      "Có thể nhận ra một ý tưởng hoặc giá trị đáng theo đuổi và biến nó thành bước đi vừa thực tế vừa nhạy với bối cảnh",
      "Khi chủ động quan sát và thử cách tiếp cận khác, bạn có cơ hội dùng tưởng tượng để mở thêm phương án hành động linh hoạt",
    ],
    challenges: [
      "Dễ giữ nhiều khả năng ở dạng ý tưởng hoặc chờ cảm giác hoàn hảo, khiến cảm hứng chưa được kiểm chứng qua hành động",
      "Có thể thử nhiều hướng nhỏ nhưng thiếu mục tiêu và tiêu chí đánh giá, nên chưa biết điều gì thực sự tạo giá trị để tiếp tục",
    ],
    developmentAdvice: [
      "Chọn một cảm hứng đáng theo, chuyển nó thành bước nhỏ có thời hạn và đặt tiêu chí đo kết quả trước khi bắt đầu",
      "Dựa trên phản hồi thực tế để giữ phần hiệu quả, điều chỉnh phần chưa phù hợp và bảo vệ ranh giới khi quyết định bước tiếp theo",
    ],
    evidence: { body1: "Mars", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Hỏa đồng cung Sao Diêm Vương",
    coreMeaning:
      "Động lực hành động của Sao Hỏa kết hợp trực tiếp với cường độ, sức tập trung và nhu cầu đi đến tận gốc của Sao Diêm Vương. Khi một mục tiêu thật sự quan trọng, bạn có thể dồn nhiều năng lượng, bền bỉ đối diện việc khó và thay đổi cách làm đã mất hiệu quả; đồng thời, cường độ lớn có thể khiến bạn đẩy quá mạnh, khó dừng hoặc coi mục tiêu như việc phải thắng bằng mọi giá.",
    strengths: [
      "Có thể tập trung cao và duy trì sức bền khi theo đuổi một mục tiêu có ý nghĩa, kể cả lúc cần xử lý phần khó hoặc ít người muốn đối diện",
      "Thường có sức bật để nhìn thẳng vào mô thức hành động không còn hiệu quả và tái tổ chức năng lượng cho một hướng đi có chủ đích hơn",
    ],
    challenges: [
      "Dễ dồn quá nhiều năng lượng vào một hướng hoặc tiếp tục một cuộc đấu đã không còn tương xứng với chi phí phải bỏ ra",
      "Có thể nhầm việc tăng sức ép hay giữ chặt quyền quyết định với hiệu quả, nhất là khi cảm thấy quyền tự chủ đang bị đe dọa",
    ],
    developmentAdvice: [
      "Làm rõ mục tiêu thật sự phía sau hành động, đồng thời xác định trước ngưỡng dừng, giới hạn nguồn lực và chi phí có thể chấp nhận",
      "Phân biệt kiên định với cố chấp và dùng cường độ cho thay đổi có chủ đích thay vì cố ép bản thân, người khác hoặc tình huống theo một kết quả duy nhất",
    ],
    evidence: { body1: "Mars", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Hỏa đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu hành động trực tiếp và khẳng định ý chí có thể đứng đối diện với những vấn đề sâu hơn về quyền lực, sức ép, kiểm soát hoặc thay đổi. Thế đối cực này dễ tạo nhịp phải đẩy mạnh để giữ quyền chủ động, vừa tiến vừa muốn kiểm soát kết quả, hoặc nhận thấy ý chí mạnh từ phía đối diện; hướng trưởng thành là nhìn cả phản ứng của mình và lựa chọn chiến lược thay vì mặc định vấn đề quyền lực chỉ nằm ở người khác.",
    strengths: [
      "Có thể học cách đọc động lực của nhiều phía và nhận ra khi nào cần giữ lập trường, khi nào đổi chiến lược để mục tiêu thực tế không bị chìm trong thế giằng co",
      "Những tình huống có nhiều sức ép có thể rèn khả năng thương lượng ranh giới, phạm vi tự quyết và trách nhiệm rõ ràng hơn",
    ],
    challenges: [
      "Dễ tăng lực để giành lại cảm giác chủ động hoặc cố kiểm soát kết quả, khiến khác biệt về cách làm trở thành thế đối đầu không cần thiết",
      "Có thể đặt toàn bộ vấn đề quyền lực vào phía khác mà chưa nhận ra trigger, giả định hoặc phản ứng của mình đang góp phần duy trì nhịp căng kéo",
    ],
    developmentAdvice: [
      "Nhận diện trigger liên quan đến kiểm soát, rồi tách mục tiêu cần giải quyết khỏi nhu cầu phải thắng hoặc buộc phía khác thay đổi",
      "Làm rõ phần mình có quyền quyết định và dùng ranh giới, dữ kiện cùng hậu quả quan sát được thay cho việc leo thang phản ứng",
    ],
    evidence: { body1: "Mars", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Hỏa tam hợp Sao Diêm Vương",
    coreMeaning:
      "Hành động, sức tập trung và nhu cầu thay đổi sâu thường phối hợp khá tự nhiên, giúp bạn dễ dồn năng lượng vào việc khó, kiên trì qua giai đoạn tái cấu trúc và chuyển cường độ thành tiến độ thay vì chỉ phản ứng tức thời. Dòng phối hợp này cũng có thể hỗ trợ việc phục hồi động lực sau thay đổi; tuy vậy, nó không bảo đảm chiến thắng hay quyền lực đặc biệt và có thể khiến bạn đánh giá quá cao khả năng chịu tải của mình.",
    strengths: [
      "Thường có khả năng tập trung sâu và duy trì hành động quyết đoán khi một mục tiêu đòi hỏi sức bền, sự tái cấu trúc hoặc nhiều vòng điều chỉnh",
      "Có thể chuyển năng lượng mạnh thành tiến độ có hướng và lấy lại động lực sau khi nhận ra một phương pháp cũ cần được thay thế",
    ],
    challenges: [
      "Dễ quen xử lý mọi việc bằng cường độ cao hoặc tiếp tục ép một chiến lược vì cách đó từng tạo kết quả trong quá khứ",
      "Có thể ít nhận ra lúc cần giảm lực, chia tải hoặc chia sẻ quyền quyết định vì tin rằng mình vẫn có thể tự chịu thêm áp lực",
    ],
    developmentAdvice: [
      "Định kỳ kiểm tra chi phí của việc duy trì cường độ cao và dành sức bền cho những mục tiêu thật sự xứng đáng với nguồn lực",
      "Cho phép đổi phương pháp, giảm lực hoặc nhận hỗ trợ mà không xem đó là yếu đi, để khả năng hành động sâu vẫn bền vững theo thời gian",
    ],
    evidence: { body1: "Mars", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Hỏa vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát mạnh giữa nhu cầu hành động, thúc đẩy hoặc khẳng định ý chí với sức ép liên quan đến kiểm soát, quyền tự chủ, động cơ sâu hay nhu cầu thay đổi có thể khiến bạn tăng lực khi gặp kháng cự. Khác biệt chiến lược dễ bị cảm nhận như cuộc thi thắng–thua, nhất là khi đã đầu tư nhiều năng lượng; đồng thời, chính ma sát này có thể rèn sức bền, buộc bạn nhận diện động cơ thật và tạo động lực cho một quá trình tái cấu trúc có chiều sâu.",
    strengths: [
      "Có thể phát triển sức bền đáng kể và năng lực xử lý tình huống khó mà không né tránh những phần cần được xem xét hoặc thay đổi",
      "Áp lực phải điều chỉnh có thể giúp bạn nhìn rõ động cơ phía sau hành động và chuyển năng lượng mạnh thành một chiến lược tái cấu trúc cụ thể",
    ],
    challenges: [
      "Dễ tăng cường độ khi gặp kháng cự hoặc biến khác biệt về chiến lược thành vấn đề thắng–thua, dù tình huống thực tế cần một cách tiếp cận khác",
      "Có thể khó dừng sau khi đã đầu tư nhiều công sức, để bực bội thúc đẩy một bước mạnh hơn mức cần thiết hoặc cố kiểm soát kết quả khó kiểm soát",
    ],
    developmentAdvice: [
      "Kiểm tra xem mục tiêu hiện tại là giải quyết vấn đề hay thắng một cuộc đối đầu, rồi đặt ngưỡng dừng và đánh giá hậu quả trước bước khó đảo ngược",
      "Chia tải, tạo nhịp hành động–hồi phục và ưu tiên thay đổi chiến lược khi dữ kiện yêu cầu thay vì chỉ tiếp tục tăng cường độ",
    ],
    evidence: { body1: "Mars", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-MARS-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Mars",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Hỏa lục hợp Sao Diêm Vương",
    coreMeaning:
      "Năng lượng hành động và khả năng nhìn vào nguyên nhân sâu tạo ra cơ hội cho những thay đổi có mục tiêu khi bạn chủ động khai thác chúng. Tiềm năng này có thể giúp cải thiện một quy trình, thay đổi mô thức hành động hoặc biến quyết tâm thành bước đi có đòn bẩy; nhưng nó không tự vận hành như tam hợp và cần mục tiêu rõ, hành động cụ thể, phản hồi cùng sự sẵn sàng đổi cách làm.",
    strengths: [
      "Có thể nhận ra một điểm có ảnh hưởng lớn nơi sự tập trung và hành động chủ động sẽ tạo thay đổi sâu hơn việc chỉ xử lý triệu chứng",
      "Khi lựa chọn một mục tiêu rõ, bạn có cơ hội biến quyết tâm thành chuỗi bước cải thiện thực tế và quan sát được tác động của từng điều chỉnh",
    ],
    challenges: [
      "Dễ nhận ra điều cần thay đổi nhưng chưa chuyển hiểu biết ấy thành hành động, hoặc chỉ huy động cường độ khi tình huống đã trở nên cấp bách",
      "Có thể đào quá sâu vào nguyên nhân hoặc giữ một kế hoạch quá lâu vì đã đầu tư nhiều công sức mà chưa đo xem thay đổi có còn tạo giá trị",
    ],
    developmentAdvice: [
      "Chọn một điểm có đòn bẩy cao để cải thiện, thực hiện theo từng bước nhỏ và đặt tiêu chí đo tác động ngay từ đầu",
      "Dùng phản hồi để giữ phần hiệu quả, điều chỉnh cách làm và dừng hoặc đổi hướng khi chi phí đã lớn hơn giá trị có thể tạo ra",
    ],
    evidence: { body1: "Mars", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-SATURN-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Saturn",
    aspect: "conjunction",
    title: "Sao Mộc đồng cung Sao Thổ",
    coreMeaning:
      "Nhu cầu mở rộng, tìm ý nghĩa và nhìn bức tranh lớn của Sao Mộc kết hợp trực tiếp với yêu cầu cấu trúc, trách nhiệm và tính thực tế của Sao Thổ. Sự kết hợp này có thể giúp bạn biến tầm nhìn thành kế hoạch có khả năng duy trì, quan tâm cả việc đi xa đến đâu lẫn nền tảng cần xây để đi lâu; tuy vậy, bạn có thể tự giới hạn quá sớm hoặc đánh giá thấp thời gian và nguồn lực mà một kế hoạch lớn thật sự cần.",
    strengths: [
      "Có thể kết nối mục tiêu dài hạn với tiêu chuẩn, giai đoạn và trách nhiệm cụ thể để tăng trưởng không chỉ rộng hơn mà còn bền hơn",
      "Thường có khả năng nhìn cả tiềm năng lẫn yêu cầu thực tế, nhờ đó xây nền cho một hướng phát triển có ý nghĩa và có thể duy trì",
    ],
    challenges: [
      "Dễ đặt tiêu chuẩn quá cao trước khi cho phép mình thử, khiến sự thận trọng hữu ích chuyển thành tự thu hẹp cơ hội học hỏi",
      "Có thể tin vào một kế hoạch lớn nhưng chưa tính đủ thời gian, nguồn lực hoặc giới hạn, rồi phải siết lại mạnh khi thực tế xuất hiện",
    ],
    developmentAdvice: [
      "Chuyển tầm nhìn thành các giai đoạn có nguồn lực, giới hạn và tiêu chí hoàn thành rõ, đồng thời cho phép mở rộng từng bước",
      "Phân biệt thận trọng dựa trên dữ kiện với việc tự thu hẹp vì sợ sai, rồi dùng phản hồi thực tế để điều chỉnh quy mô kế hoạch",
    ],
    evidence: { body1: "Jupiter", body2: "Saturn", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-SATURN-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Saturn",
    aspect: "opposition",
    title: "Sao Mộc đối đỉnh Sao Thổ",
    coreMeaning:
      "Kỳ vọng, niềm tin và mong muốn mở rộng có thể đứng đối diện với giới hạn, trách nhiệm, tính thực tế hoặc nhu cầu kiểm soát rủi ro. Thế đối cực này dễ tạo nhịp lúc rất lạc quan, lúc lại thu hẹp mạnh, hoặc khiến vai trò người mở rộng và người hạn chế được đặt lên hai phía khác nhau; hướng tích hợp là nhìn đồng thời cơ hội, chi phí và điều cần được bảo vệ thay vì chọn hoàn toàn một cực.",
    strengths: [
      "Có thể học cách đánh giá một cơ hội từ cả tiềm năng phát triển lẫn chi phí, trách nhiệm và mức rủi ro có thể chấp nhận",
      "Những góc nhìn đối lập có thể rèn khả năng thương lượng biên độ tăng trưởng, phân chia trách nhiệm và bảo vệ nền tảng cần thiết",
    ],
    challenges: [
      "Dễ dao động giữa kỳ vọng quá rộng và phòng thủ quá mạnh, khiến quy mô kế hoạch thay đổi trước khi có đủ dữ kiện để đánh giá",
      "Có thể xem phía khác là người cản trở hoặc chính mình là người phải giữ mọi giới hạn, trong khi cả hai chức năng đều cần được tích hợp",
    ],
    developmentAdvice: [
      "Phân biệt giới hạn thật với giả định và dùng dữ kiện để điều chỉnh kỳ vọng thay vì phản ứng theo nhịp lạc quan–thu hẹp",
      "Thiết lập biên độ tăng trưởng rõ: điều gì có thể mở rộng, nguồn lực nào phải được bảo vệ và tín hiệu nào yêu cầu dừng để đánh giá lại",
    ],
    evidence: { body1: "Jupiter", body2: "Saturn", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-SATURN-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Saturn",
    aspect: "trine",
    title: "Sao Mộc tam hợp Sao Thổ",
    coreMeaning:
      "Tầm nhìn và cấu trúc thường phối hợp khá tự nhiên, giúp bạn dễ nhìn mục tiêu dài hạn rồi kiên trì xây từng bước, cân bằng mong muốn phát triển với tiêu chuẩn và tính bền vững. Dòng phối hợp này có thể hỗ trợ việc biến kinh nghiệm thành hệ thống đáng tin cậy và mở rộng trên nền đã được củng cố; tuy vậy, nó không bảo đảm thành công hay phán đoán luôn đúng và có thể khiến một phương pháp ổn định được giữ lâu hơn cần thiết.",
    strengths: [
      "Thường có khả năng nối bức tranh lớn với kế hoạch thực tế, duy trì kỷ luật mà vẫn giữ được ý nghĩa và hướng phát triển dài hạn",
      "Có thể mở rộng một nền tảng theo nhịp có kiểm soát, biến kinh nghiệm tích lũy thành quy trình hoặc tiêu chuẩn nhất quán hơn",
    ],
    challenges: [
      "Dễ quá tin vào phương pháp đã ổn định và đánh giá thấp nhu cầu thử nghiệm khi bối cảnh hoặc mục tiêu đã thay đổi",
      "Có thể duy trì cấu trúc cũ vì nó vẫn vận hành tương đối tốt, dù một cách tiếp cận mới sẽ phù hợp hơn với giai đoạn tiếp theo",
    ],
    developmentAdvice: [
      "Định kỳ kiểm tra hệ thống hiện tại còn phục vụ tầm nhìn hay chỉ đang bảo vệ sự quen thuộc, rồi thử thay đổi trong phạm vi có thể đánh giá",
      "Giữ kỷ luật và tiêu chuẩn nhưng dành không gian cho phản hồi, thử nghiệm và cập nhật phương pháp trước khi mở rộng quy mô",
    ],
    evidence: { body1: "Jupiter", body2: "Saturn", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-SATURN-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Saturn",
    aspect: "square",
    title: "Sao Mộc vuông Sao Thổ",
    coreMeaning:
      "Ma sát giữa mong muốn mở rộng, tiến xa hoặc tin vào khả năng với giới hạn thực tế, trách nhiệm và yêu cầu thận trọng có thể tạo nhịp lúc đẩy mạnh, lúc thu hẹp quá mức. Mục tiêu có thể lớn hơn nguồn lực hiện có, hoặc việc mở rộng bị trì hoãn vì bạn muốn mọi điều kiện phải hoàn hảo; mặt xây dựng của sức căng này là buộc tầm nhìn phải qua kiểm tra khả thi và giúp tăng trưởng có nền móng rõ hơn.",
    strengths: [
      "Có thể phát triển năng lực lập kế hoạch thực tế bằng cách liên tục đối chiếu mục tiêu lớn với cấu trúc, nguồn lực và trách nhiệm hiện có",
      "Ma sát giữa kỳ vọng và giới hạn có thể rèn khả năng điều chỉnh quy mô mà không cần từ bỏ hoàn toàn hướng phát triển có ý nghĩa",
    ],
    challenges: [
      "Dễ thất vọng khi tiến độ thực tế không theo kịp kỳ vọng, rồi dùng thêm kỳ vọng để thúc đẩy thay vì xử lý vấn đề cấu trúc",
      "Có thể luân phiên giữa đặt mục tiêu vượt nguồn lực và trì hoãn mở rộng vì chưa có điều kiện hoàn hảo, làm tiến trình thiếu nhịp ổn định",
    ],
    developmentAdvice: [
      "Chia mục tiêu lớn thành giai đoạn, xác định giới hạn thật và kiểm tra những giả định quan trọng trước khi tăng quy mô",
      "Đặt tiêu chí mở rộng dựa trên kết quả và độ bền của nền tảng, rồi điều chỉnh kỳ vọng khi dữ kiện chưa hỗ trợ bước tiếp theo",
    ],
    evidence: { body1: "Jupiter", body2: "Saturn", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-SATURN-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Saturn",
    aspect: "sextile",
    title: "Sao Mộc lục hợp Sao Thổ",
    coreMeaning:
      "Tầm nhìn phát triển và khả năng tạo cấu trúc mở ra cơ hội xây nền cho tăng trưởng dài hạn khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp biến một cơ hội thành kế hoạch và dùng giới hạn để chọn nơi mở rộng hiệu quả hơn; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn, cam kết, theo dõi kết quả và điều chỉnh dựa trên dữ kiện.",
    strengths: [
      "Có thể nhận ra cơ hội nơi một kế hoạch, giới hạn phù hợp và cam kết cụ thể sẽ biến tiềm năng phát triển thành tiến trình có thể duy trì",
      "Khi chủ động xây nền, bạn có cơ hội dùng cấu trúc để tập trung nguồn lực vào hướng mở rộng có giá trị thay vì phân tán qua nhiều phương án",
    ],
    challenges: [
      "Dễ nhìn thấy cơ hội nhưng chưa xây cấu trúc để tận dụng, hoặc lập kế hoạch tốt mà chưa thực hiện bước mở rộng cần thiết",
      "Có thể giữ nhiều phương án và chờ điều kiện hoàn hảo, khiến tiềm năng phối hợp chưa được kiểm chứng bằng cam kết và kết quả thực tế",
    ],
    developmentAdvice: [
      "Chọn một cơ hội có giá trị, xác định nguồn lực, giới hạn và bước triển khai đầu tiên rồi theo dõi kết quả theo mốc rõ ràng",
      "Chỉ mở rộng thêm khi nền tảng chứng minh đủ bền, đồng thời điều chỉnh kế hoạch nếu dữ kiện cho thấy chi phí hoặc điều kiện đã thay đổi",
    ],
    evidence: { body1: "Jupiter", body2: "Saturn", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Sao Mộc đồng cung Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu mở rộng tầm nhìn và tìm cơ hội của Sao Mộc kết hợp trực tiếp với tinh thần đổi mới, độc lập và phá khuôn của Sao Thiên Vương. Bạn có thể bị thu hút mạnh bởi ý tưởng mở ra cách nhìn hoặc hướng phát triển hoàn toàn mới, sẵn sàng thử điều khác biệt khi nó mang lại nhiều tự do và ý nghĩa; đồng thời, sức hút của khả năng mới có thể khiến quy mô thay đổi tăng quá nhanh trước khi hệ quả và nguồn lực được kiểm tra.",
    strengths: [
      "Có thể nhìn ra khả năng phát triển ở nơi cách nghĩ quen thuộc đã chạm giới hạn và nhanh chóng kết nối ý tưởng mới với một tầm nhìn rộng hơn",
      "Thường có độ cởi mở cao với học hỏi, thử nghiệm và những góc nhìn khác biệt, nhờ đó dễ tạo bước chuyển khi mô hình cũ không còn phù hợp",
    ],
    challenges: [
      "Dễ phóng đại giá trị của một ý tưởng mới vì cảm giác tự do hoặc đột phá mà nó mang lại, trong khi tính khả thi chưa được kiểm chứng",
      "Có thể thay đổi hướng lớn quá sớm hoặc phản ứng mạnh với giới hạn, khiến việc theo đuổi cơ hội thiếu thời gian để trưởng thành thành kết quả ổn định",
    ],
    developmentAdvice: [
      "Chuyển ý tưởng đột phá thành thử nghiệm có phạm vi, nguồn lực và tiêu chí đánh giá rõ trước khi mở rộng cam kết",
      "Giữ quyền thử cách mới nhưng kiểm tra tác động dài hạn, phương án dự phòng và phần nền tảng cần được duy trì qua thay đổi",
    ],
    evidence: { body1: "Jupiter", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Uranus",
    aspect: "opposition",
    title: "Sao Mộc đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Mong muốn phát triển theo một niềm tin hoặc tầm nhìn có thể đứng đối diện với nhu cầu đổi hướng, giữ tự do và phá khỏi khuôn mẫu. Thế đối cực này dễ tạo nhịp theo đuổi một khả năng lớn rồi bất ngờ muốn thoát khỏi chính hướng đi ấy, hoặc đặt vai trò người mở rộng và người gây thay đổi lên hai phía khác nhau; hướng tích hợp là phân biệt điều cốt lõi cần phát triển với hình thức có thể linh hoạt thay đổi.",
    strengths: [
      "Có thể học cách nhìn một cơ hội từ cả ý nghĩa dài hạn lẫn nhu cầu tự do, nhờ đó tìm phương án mở rộng không phụ thuộc hoàn toàn vào một khuôn mẫu",
      "Những góc nhìn đối lập có thể làm lộ ra giả định trong niềm tin hiện tại và mở đường cho một tầm nhìn rộng hơn, linh hoạt hơn",
    ],
    challenges: [
      "Dễ dao động giữa cam kết với một hướng phát triển và thôi thúc bẻ hướng để lấy lại cảm giác độc lập, làm kế hoạch thiếu tính liên tục",
      "Có thể quy sự bất ổn hoặc cản trở hoàn toàn cho phía khác mà chưa nhận ra kỳ vọng phóng đại hay phản ứng với giới hạn của chính mình",
    ],
    developmentAdvice: [
      "Làm rõ giá trị và mục tiêu không muốn đánh đổi, sau đó thương lượng phần phương pháp, thời điểm và phạm vi có thể thay đổi",
      "Tạo khoảng kiểm chứng trước quyết định lớn để đối chiếu cơ hội, rủi ro và nhu cầu tự do thay vì chuyển cực theo phản ứng tức thời",
    ],
    evidence: { body1: "Jupiter", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Uranus",
    aspect: "trine",
    title: "Sao Mộc tam hợp Sao Thiên Vương",
    coreMeaning:
      "Tầm nhìn phát triển và tinh thần đổi mới thường phối hợp khá tự nhiên, giúp bạn dễ tiếp nhận góc nhìn khác biệt, nhận ra cơ hội trong thay đổi và thử phương pháp mới mà không cần nhiều sức ép. Dòng phối hợp này có thể làm việc học hỏi và mở rộng trở nên linh hoạt, giàu khám phá; tuy vậy, nó không bảo đảm mọi ý tưởng mới đều tốt và có thể khiến bạn đánh giá thấp phần kiểm chứng hoặc hoàn thiện cần thiết.",
    strengths: [
      "Thường có khả năng kết nối nhanh một ý tưởng khác thường với bức tranh lớn, từ đó tìm ra hướng học hỏi hoặc phát triển vượt khỏi cách làm quen thuộc",
      "Có thể thích ứng tích cực với thay đổi và dùng quyền tự chủ để khám phá lựa chọn mới mà vẫn giữ được ý nghĩa chung của hành trình",
    ],
    challenges: [
      "Dễ quen với nhịp khám phá và khả năng mới, nên có thể rời một hướng đang hiệu quả trước khi hoàn thiện hoặc đo được giá trị thực",
      "Có thể tin rằng sự mới mẻ tự nó là dấu hiệu tiến bộ và ít kiểm tra những giả định phù hợp với tầm nhìn nhưng chưa có bằng chứng",
    ],
    developmentAdvice: [
      "Dùng sự cởi mở cho những vấn đề thật sự cần đổi mới và đặt checkpoint để phân biệt khám phá hữu ích với đổi hướng vì hứng thú",
      "Giữ một nhịp hoàn thiện và đánh giá kết quả để ý tưởng mới trở thành năng lực hoặc thay đổi có giá trị, không chỉ là khả năng hấp dẫn",
    ],
    evidence: { body1: "Jupiter", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Uranus",
    aspect: "square",
    title: "Sao Mộc vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa mong muốn mở rộng, tiến xa hoặc bảo vệ một niềm tin với nhu cầu đổi mới, tự do và phá giới hạn có thể làm kỳ vọng tăng nhanh khi một hướng mới xuất hiện. Bạn có thể muốn bẻ khuôn trước khi xác định điều gì thật sự cần thay đổi, hoặc tăng quy mô để thoát cảm giác bị giới hạn; mặt xây dựng của sức căng này là buộc tầm nhìn phải cập nhật và rèn khả năng biến đột phá thành thử nghiệm có trách nhiệm.",
    strengths: [
      "Có thể huy động nhiều năng lượng để chất vấn giả định cũ, tìm hướng phát triển khác và tạo chuyển động ở nơi tư duy hoặc hệ thống đã trì trệ",
      "Ma sát giữa tầm nhìn và nhu cầu tự do có thể giúp bạn xây khả năng đổi mới có mục tiêu thay vì chỉ thích nghi với những lựa chọn sẵn có",
    ],
    challenges: [
      "Dễ phóng đại lợi ích của thay đổi hoặc đặt cược quá nhiều vào một phương án chưa được thử, nhất là khi giới hạn hiện tại gây bức bối",
      "Có thể liên tục phá cấu trúc để tìm thêm khả năng nhưng thiếu tiêu chí chọn hướng, khiến hoạt động mở rộng tăng mà tiến bộ thực chưa rõ",
    ],
    developmentAdvice: [
      "Xác định chính xác giới hạn nào cần thay đổi, sau đó chia bước đột phá thành thử nghiệm nhỏ với tiêu chí, giới hạn rủi ro và thời điểm đánh giá",
      "Kiểm tra kỳ vọng bằng dữ kiện trước khi tăng quy mô và giữ phương án dự phòng cho những bước có hệ quả khó đảo ngược",
    ],
    evidence: { body1: "Jupiter", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Uranus",
    aspect: "sextile",
    title: "Sao Mộc lục hợp Sao Thiên Vương",
    coreMeaning:
      "Tầm nhìn rộng và tinh thần đổi mới mở ra cơ hội khám phá cách phát triển linh hoạt hơn khi bạn chủ động khai thác chúng. Tiềm năng này có thể giúp biến một góc nhìn khác biệt thành thử nghiệm, học hỏi hoặc cải tiến cụ thể; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn rõ, hành động thực tế, phản hồi và quyết định có chủ đích về điều nên mở rộng.",
    strengths: [
      "Có thể nhận ra một cơ hội nơi ý tưởng mới hoặc cách tiếp cận độc lập sẽ mở thêm lựa chọn và làm tầm nhìn hiện tại phong phú hơn",
      "Khi chủ động thử nghiệm, bạn có cơ hội kết nối khám phá với một mục tiêu phát triển cụ thể thay vì chỉ tích lũy nhiều khả năng",
    ],
    challenges: [
      "Dễ thấy nhiều hướng thú vị nhưng chưa chọn một cơ hội để thực hiện, khiến tiềm năng đổi mới vẫn ở dạng ý tưởng hoặc dự định",
      "Có thể bắt đầu nhiều thử nghiệm mà thiếu tiêu chí đánh giá, nên khó biết thay đổi nào đáng được giữ lại và mở rộng",
    ],
    developmentAdvice: [
      "Chọn một cơ hội có ý nghĩa, chuyển nó thành thử nghiệm nhỏ với mục tiêu, thời hạn và thước đo kết quả rõ ràng",
      "Dùng phản hồi để giữ phần hữu ích, điều chỉnh phần chưa phù hợp và chỉ mở rộng khi cách mới đã chứng minh giá trị trong thực tế",
    ],
    evidence: { body1: "Jupiter", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Mộc đồng cung Sao Hải Vương",
    coreMeaning:
      "Nhu cầu mở rộng niềm tin, ý nghĩa và tầm nhìn của Sao Mộc hòa trực tiếp với tưởng tượng, trực giác, lòng cảm thông và lý tưởng của Sao Hải Vương. Sự kết hợp này có thể làm một hình dung giàu ý nghĩa trở thành nguồn phát triển mạnh, giúp bạn nhìn vượt khỏi lợi ích trước mắt; đồng thời, cả hy vọng lẫn điều chưa rõ đều có thể được khuếch đại, khiến ranh giới giữa khả năng thực tế và điều mình mong muốn trở nên khó phân biệt.",
    strengths: [
      "Có thể xây một tầm nhìn rộng được nuôi bởi tưởng tượng, lòng cảm thông và khả năng nhận ra ý nghĩa biểu tượng trong trải nghiệm",
      "Thường cởi mở với những góc nhìn vượt khỏi khuôn khổ quen thuộc và có khả năng dùng niềm tin để kết nối nhiều khả năng thành một hướng có ý nghĩa",
    ],
    challenges: [
      "Dễ phóng đại một lý tưởng hoặc khả năng vì nó tạo cảm giác ý nghĩa, trong khi tiêu chí kiểm chứng và giới hạn thực tế chưa rõ",
      "Có thể để lòng tin, kỳ vọng hoặc mong muốn giúp đỡ làm mờ ranh giới về nguồn lực, trách nhiệm và điều mình thực sự có thể thực hiện",
    ],
    developmentAdvice: [
      "Chuyển tầm nhìn thành mục tiêu có phạm vi, dữ kiện và mốc kiểm tra rõ để giữ cảm hứng mà vẫn phân biệt được điều khả thi",
      "Xác định ranh giới về thời gian, nguồn lực và trách nhiệm trước cam kết lớn, đồng thời xem trực giác là tín hiệu cần kiểm chứng chứ không phải kết luận cuối",
    ],
    evidence: { body1: "Jupiter", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Mộc đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Niềm tin, kỳ vọng và mong muốn mở rộng có thể đứng đối diện với trực giác, lý tưởng hoặc những tín hiệu khó định hình. Thế đối cực này dễ tạo nhịp tin mạnh vào một hướng rồi nghi ngờ khi thực tế không khớp hình dung, hoặc đặt vai trò người tin tưởng và người mang sự mơ hồ lên hai phía khác nhau; hướng tích hợp là nhận diện cả ý nghĩa mình tìm kiếm lẫn phần thông tin còn thiếu.",
    strengths: [
      "Có thể học cách nhìn một tầm nhìn từ cả niềm tin có ý thức lẫn những cảm nhận tinh tế, nhờ đó phát hiện giả định chưa được gọi tên",
      "Những góc nhìn đối lập có thể giúp bạn phân biệt giá trị cốt lõi với hình ảnh lý tưởng đang được đặt lên người, cơ hội hoặc hoàn cảnh",
    ],
    challenges: [
      "Dễ dao động giữa tin tưởng rộng mở và hoài nghi mạnh, khiến kỳ vọng thay đổi trước khi dữ kiện và trải nghiệm được đánh giá đầy đủ",
      "Có thể quy sự mơ hồ hoàn toàn cho phía khác mà bỏ qua phần lý tưởng hóa, phóng đại hoặc mong muốn được xác nhận trong lựa chọn của mình",
    ],
    developmentAdvice: [
      "Tách điều đã quan sát, điều trực giác gợi ý và điều mình mong muốn thành các phần riêng trước khi mở rộng cam kết",
      "Làm rõ kỳ vọng, ranh giới và trách nhiệm của từng phía, rồi dùng phản hồi thực tế để điều chỉnh niềm tin mà không phủ nhận hoàn toàn ý nghĩa cảm nhận được",
    ],
    evidence: { body1: "Jupiter", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Mộc tam hợp Sao Hải Vương",
    coreMeaning:
      "Tầm nhìn, lòng tin, trực giác và sức tưởng tượng thường phối hợp khá tự nhiên, giúp bạn dễ nhận ra ý nghĩa rộng hơn, đồng cảm với nhiều góc nhìn và hình dung khả năng vượt khỏi điều đang có. Dòng chảy này có thể nuôi dưỡng học hỏi, sáng tạo hoặc những tìm kiếm mang tính biểu tượng; tuy vậy, sự thuận lợi không bảo đảm trực giác luôn đúng và có thể khiến giả định được chấp nhận quá dễ vì chúng phù hợp với điều bạn muốn tin.",
    strengths: [
      "Thường có khả năng kết nối bức tranh lớn với cảm nhận tinh tế và tưởng tượng, tạo ra một tầm nhìn vừa rộng vừa giàu ý nghĩa",
      "Có thể dùng lòng cảm thông và độ cởi mở để tiếp nhận trải nghiệm khác biệt, từ đó mở rộng cách hiểu thay vì chỉ bảo vệ niềm tin quen thuộc",
    ],
    challenges: [
      "Dễ tin vào một câu chuyện liền mạch hoặc giàu ý nghĩa hơn mức dữ kiện cho phép, nhất là khi nó phù hợp với lý tưởng hiện tại",
      "Có thể bỏ qua cấu trúc, giới hạn hoặc tiêu chí đo lường vì cảm hứng và trực giác đang tạo cảm giác hướng đi vốn đã đúng",
    ],
    developmentAdvice: [
      "Giữ độ mở của tầm nhìn nhưng thêm checkpoint thực tế để kiểm tra giả định, kết quả và nguồn lực trước khi mở rộng",
      "Dùng tưởng tượng để tạo nhiều phương án rồi đối chiếu từng phương án với dữ kiện, phản hồi và tác động quan sát được",
    ],
    evidence: { body1: "Jupiter", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Mộc vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa mong muốn mở rộng niềm tin, kỳ vọng hoặc tầm nhìn với lý tưởng, tưởng tượng và những tín hiệu chưa rõ có thể làm một khả năng trở nên lớn hơn thực tế hiện có. Bạn có thể đầu tư vào hình dung giàu ý nghĩa trước khi xác định điều gì kiểm chứng được, rồi thất vọng hoặc tiếp tục nâng kỳ vọng khi dữ kiện không khớp; mặt xây dựng của sức căng này là buộc niềm tin phải đi qua quá trình phân biệt và thử nghiệm.",
    strengths: [
      "Có thể phát triển năng lực chất vấn những niềm tin hấp dẫn nhưng chưa đủ căn cứ và chuyển lý tưởng thành câu hỏi thực tế có thể kiểm tra",
      "Ma sát giữa kỳ vọng và thực tế có thể giúp bạn xây một tầm nhìn trưởng thành hơn, vẫn giữ ý nghĩa nhưng nhận diện rõ giới hạn và hệ quả",
    ],
    challenges: [
      "Dễ phóng đại lợi ích hoặc phạm vi của một cơ hội vì hình ảnh ban đầu quá hấp dẫn, khiến nguồn lực được cam kết trước khi rủi ro rõ",
      "Có thể phản ứng với thất vọng bằng cách tin mạnh hơn, đổi sang một lý tưởng khác hoặc trì hoãn đánh giá điều gì thực sự không phù hợp",
    ],
    developmentAdvice: [
      "Viết rõ giả định, tiêu chí thành công và giới hạn nguồn lực trước khi mở rộng, rồi thử kế hoạch trong phạm vi nhỏ có thể quan sát",
      "Khi dữ kiện không khớp kỳ vọng, điều chỉnh câu chuyện và quy mô cam kết thay vì dùng thêm hy vọng để thay thế vấn đề cần giải quyết",
    ],
    evidence: { body1: "Jupiter", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Mộc lục hợp Sao Hải Vương",
    coreMeaning:
      "Tầm nhìn rộng và trực giác giàu tưởng tượng mở ra cơ hội phát triển một ý tưởng có ý nghĩa khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp lòng cảm thông, lý tưởng hoặc cảm nhận biểu tượng trở thành hướng học hỏi và hành động cụ thể; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn rõ, thử nghiệm, phản hồi và ranh giới thực tế.",
    strengths: [
      "Có thể nhận ra một cơ hội nơi tưởng tượng hoặc cảm nhận tinh tế sẽ mở rộng cách hiểu và tạo thêm lựa chọn phát triển có ý nghĩa",
      "Khi chủ động khai thác, bạn có cơ hội biến một lý tưởng rộng thành dự án hoặc bước thực hành vừa có cảm hứng vừa có thể đánh giá",
    ],
    challenges: [
      "Dễ thấy nhiều khả năng giàu ý nghĩa nhưng chưa chọn một hướng để thực hiện, khiến tiềm năng vẫn ở dạng mong muốn hoặc hình dung",
      "Có thể bắt đầu bằng cảm hứng nhưng thiếu ranh giới và tiêu chí phản hồi, nên khó biết phần nào có giá trị để tiếp tục mở rộng",
    ],
    developmentAdvice: [
      "Chọn một ý tưởng đáng theo, chuyển nó thành thử nghiệm nhỏ với mục tiêu, nguồn lực, thời hạn và thước đo kết quả rõ",
      "Dùng phản hồi để giữ phần hữu ích, điều chỉnh giả định và chỉ mở rộng khi nền tảng thực tế đã hỗ trợ tầm nhìn ban đầu",
    ],
    evidence: { body1: "Jupiter", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Mộc đồng cung Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu mở rộng niềm tin, tầm nhìn và phạm vi phát triển của Sao Mộc hòa trực tiếp với chiều sâu, cường độ và sức ép chuyển hóa của Sao Diêm Vương. Sự kết hợp này có thể làm một mục tiêu có ý nghĩa trở thành động lực tái cấu trúc mạnh, giúp bạn theo đuổi việc phát triển đến tận gốc; đồng thời, niềm tin hoặc tham vọng có thể được khuếch đại đến mức khó buông, khiến ảnh hưởng và quyền kiểm soát bị nhầm với giá trị thực của hướng đi.",
    strengths: [
      "Có thể tập trung tầm nhìn lớn vào một quá trình thay đổi sâu, nhận ra mô thức nền và huy động nguồn lực để xây lại điều không còn hiệu quả",
      "Thường có khả năng theo đuổi ý nghĩa vượt khỏi kết quả ngắn hạn và chuyển trải nghiệm cường độ cao thành hiểu biết hoặc chiến lược phát triển mới",
    ],
    challenges: [
      "Dễ dồn quá nhiều niềm tin và nguồn lực vào một mục tiêu, khiến việc điều chỉnh hoặc dừng lại bị cảm nhận như mất sức mạnh hay từ bỏ ý nghĩa",
      "Có thể bảo vệ thế giới quan quá mạnh hoặc dùng sức ảnh hưởng để thúc đẩy kết quả, trong khi phản hồi khác biệt đang chỉ ra phần cần xem xét lại",
    ],
    developmentAdvice: [
      "Làm rõ giá trị cốt lõi phía sau tham vọng và đặt trước giới hạn về nguồn lực, ảnh hưởng cùng chi phí có thể chấp nhận",
      "Dùng cường độ để tìm nguyên nhân và tái cấu trúc có chủ đích, đồng thời phân biệt niềm tin vững với nhu cầu phải chứng minh mình đúng",
    ],
    evidence: { body1: "Jupiter", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Mộc đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Niềm tin, kỳ vọng và mong muốn mở rộng có thể đứng đối diện với nhu cầu kiểm soát, chuyển hóa hoặc đi đến động cơ sâu bên dưới. Thế đối cực này dễ tạo nhịp đẩy một tầm nhìn lớn rồi gặp sức ép phải thay đổi cách tiếp cận, hoặc đặt vai trò người mở rộng và người nắm quyền quyết định lên hai phía khác nhau; hướng tích hợp là nhận ra cả mục tiêu phát triển lẫn động lực quyền lực đang ảnh hưởng lựa chọn.",
    strengths: [
      "Có thể học cách đọc nhiều tầng động lực trong một cơ hội, từ ý nghĩa công khai đến lợi ích, ảnh hưởng và điều mỗi phía đang cố bảo vệ",
      "Những thế đối lập mạnh có thể rèn khả năng thương lượng giữa tầm nhìn chung, quyền tự chủ và nhu cầu thay đổi cấu trúc không còn phù hợp",
    ],
    challenges: [
      "Dễ biến khác biệt về niềm tin hoặc quy mô mục tiêu thành thế giằng co quyền quyết định, khiến nội dung thực tế của vấn đề bị che khuất",
      "Có thể đặt toàn bộ nhu cầu kiểm soát lên phía khác mà chưa nhận ra kỳ vọng phóng đại hoặc mong muốn gây ảnh hưởng của chính mình",
    ],
    developmentAdvice: [
      "Tách mục tiêu cần phát triển khỏi nhu cầu phải thắng về quan điểm, rồi làm rõ quyền quyết định, trách nhiệm và giới hạn của từng phía",
      "Dùng dữ kiện và hệ quả quan sát được để đánh giá tầm nhìn, đồng thời xem phản ứng mạnh như tín hiệu cần nhận diện động cơ sâu trước khi leo thang",
    ],
    evidence: { body1: "Jupiter", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Mộc tam hợp Sao Diêm Vương",
    coreMeaning:
      "Tầm nhìn phát triển và năng lực chuyển hóa sâu thường phối hợp khá tự nhiên, giúp bạn dễ nhận ra nơi cần tái cấu trúc và duy trì niềm tin qua quá trình thay đổi dài. Dòng phối hợp này có thể biến hiểu biết về động lực nền thành chiến lược mở rộng có chiều sâu; tuy vậy, nó không bảo đảm quyền lực hay thành công và có thể khiến bạn quá tin vào sức ảnh hưởng hoặc khả năng chịu cường độ của mình.",
    strengths: [
      "Thường có khả năng nối bức tranh lớn với nguyên nhân sâu, từ đó tìm hướng phát triển không chỉ mở rộng bề mặt mà còn thay đổi nền tảng",
      "Có thể duy trì mục tiêu có ý nghĩa qua những giai đoạn tái cấu trúc và biến trải nghiệm khó thành nguồn hiểu biết, sức bền hoặc phương pháp mới",
    ],
    challenges: [
      "Dễ tin rằng mình nhìn thấy toàn bộ động lực của tình huống và đánh giá thấp phản hồi không phù hợp với tầm nhìn đang theo đuổi",
      "Có thể quen dùng cường độ và sức ảnh hưởng để tạo tiến triển, nên ít nhận ra lúc cần giảm quy mô, chia sẻ quyền quyết định hoặc đổi phương pháp",
    ],
    developmentAdvice: [
      "Định kỳ kiểm tra tầm nhìn bằng phản hồi độc lập và đo chi phí thực của việc duy trì cường độ trước khi mở rộng thêm",
      "Dùng năng lực tái cấu trúc có chọn lọc, cho phép phương pháp thay đổi mà không xem việc giảm lực hoặc chia sẻ ảnh hưởng là mất đi sức mạnh",
    ],
    evidence: { body1: "Jupiter", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Mộc vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa mong muốn mở rộng niềm tin, ảnh hưởng hoặc phạm vi phát triển với sức ép kiểm soát, tái cấu trúc và thay đổi sâu có thể khiến một mục tiêu trở thành cuộc thử sức về quyền lực. Bạn có thể tăng quy mô khi gặp kháng cự hoặc giữ chặt một tầm nhìn vì đã đầu tư nhiều ý nghĩa vào đó; mặt xây dựng của sức căng này là buộc tham vọng phải đối diện động cơ thật, giới hạn ảnh hưởng và phần nền cần được thay đổi.",
    strengths: [
      "Có thể phát triển sức bền và khả năng xử lý những vấn đề phức tạp, nơi tăng trưởng chỉ xảy ra sau khi cấu trúc hoặc giả định nền được xem xét lại",
      "Ma sát mạnh có thể giúp bạn nhận diện cách niềm tin, tham vọng và quyền quyết định tác động lẫn nhau, từ đó xây chiến lược trưởng thành hơn",
    ],
    challenges: [
      "Dễ phóng đại tầm quan trọng của mục tiêu hoặc tăng sức ép để vượt kháng cự, khiến bất đồng thực tế bị biến thành vấn đề thắng–thua",
      "Có thể khó điều chỉnh sau khi đã cam kết nhiều nguồn lực và uy tín, dù dữ kiện cho thấy cách mở rộng hiện tại cần được tái cấu trúc",
    ],
    developmentAdvice: [
      "Kiểm tra mục tiêu là tạo giá trị hay chứng minh sức ảnh hưởng, rồi đặt ngưỡng dừng, giới hạn nguồn lực và tiêu chí đánh giá lại rõ ràng",
      "Chia quá trình thay đổi thành giai đoạn, xử lý nguyên nhân cấu trúc trước khi tăng quy mô và dùng chiến lược thay cho việc chỉ tăng cường độ",
    ],
    evidence: { body1: "Jupiter", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-JUPITER-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Jupiter",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Mộc lục hợp Sao Diêm Vương",
    coreMeaning:
      "Tầm nhìn phát triển và khả năng tái cấu trúc sâu mở ra cơ hội tạo tiến bộ có ý nghĩa khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp nhận ra một điểm đòn bẩy, loại bỏ cách làm đã mất hiệu quả và xây hướng mở rộng mới; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn rõ, hành động cụ thể, phản hồi và giới hạn ảnh hưởng.",
    strengths: [
      "Có thể nhận ra cơ hội nơi thay đổi một giả định hoặc cấu trúc nền sẽ mở rộng nhiều lựa chọn hơn việc chỉ bổ sung nguồn lực ở bề mặt",
      "Khi chủ động khai thác, bạn có cơ hội biến hiểu biết sâu thành kế hoạch phát triển từng bước với tác động có thể quan sát",
    ],
    challenges: [
      "Dễ nhìn thấy tiềm năng chuyển hóa nhưng chưa chọn điểm bắt đầu, khiến hiểu biết về vấn đề chưa trở thành thay đổi thực tế",
      "Có thể đào sâu hoặc xây tầm nhìn lớn mà thiếu thước đo, nên khó biết phần tái cấu trúc nào thực sự tạo giá trị để tiếp tục mở rộng",
    ],
    developmentAdvice: [
      "Chọn một điểm có đòn bẩy cao, xác định mục tiêu, phạm vi ảnh hưởng và bước thử nghiệm nhỏ trước khi cam kết nguồn lực lớn",
      "Đo tác động, giữ phần hiệu quả và điều chỉnh hoặc dừng khi chi phí vượt giá trị, thay vì duy trì thay đổi chỉ vì nó mang cảm giác sâu sắc",
    ],
    evidence: { body1: "Jupiter", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-URANUS-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Uranus",
    aspect: "conjunction",
    title: "Sao Thổ đồng cung Sao Thiên Vương",
    coreMeaning:
      "Nhu cầu xây cấu trúc, duy trì trách nhiệm và kiểm soát rủi ro của Sao Thổ hòa trực tiếp với động lực đổi mới, tự chủ và phá vỡ khuôn cũ của Sao Thiên Vương. Sự kết hợp này có thể giúp bạn biến một thay đổi khác thường thành hệ thống có thể vận hành lâu dài; đồng thời, sức ép vừa phải giữ ổn định vừa phải đổi mới có thể tạo nhịp siết chặt rồi bứt phá nếu hai nhu cầu không được phối hợp có chủ đích.",
    strengths: [
      "Có thể nhìn thấy phần cấu trúc cần thay đổi và xây cách cải tiến vừa đủ mới để tạo tiến bộ, vừa đủ rõ để triển khai và duy trì",
      "Thường có tiềm năng kết hợp kỷ luật với tư duy độc lập, giúp ý tưởng khác thường được kiểm nghiệm qua giới hạn, quy trình và trách nhiệm thực tế",
    ],
    challenges: [
      "Dễ giữ chặt một khuôn khổ cho đến khi áp lực tích tụ rồi thay đổi quá đột ngột, thay vì điều chỉnh từng bước khi tín hiệu đầu tiên xuất hiện",
      "Có thể dùng đổi mới để né cam kết hoặc dùng quy tắc để chặn thử nghiệm, khiến tự do và ổn định bị xem như hai lựa chọn loại trừ nhau",
    ],
    developmentAdvice: [
      "Xác định phần nền phải được bảo vệ và phần quy trình có thể thử lại, rồi chia thay đổi thành các bước nhỏ với tiêu chí an toàn và thời điểm đánh giá rõ",
      "Tạo khoảng thử nghiệm có ranh giới để ý tưởng mới được kiểm chứng mà không phải phá bỏ toàn bộ hệ thống hoặc trì hoãn mọi cải tiến vì sợ rủi ro",
    ],
    evidence: { body1: "Saturn", body2: "Uranus", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-URANUS-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Uranus",
    aspect: "opposition",
    title: "Sao Thổ đối đỉnh Sao Thiên Vương",
    coreMeaning:
      "Trách nhiệm, giới hạn và nhu cầu ổn định có thể đứng đối diện với mong muốn tự chủ, đổi hướng hoặc thoát khỏi khuôn cũ. Thế đối cực này dễ đặt vai trò giữ trật tự và vai trò thúc đẩy thay đổi lên hai phía khác nhau, tạo nhịp chống lại ràng buộc rồi lại tìm nơi nương vào cấu trúc; hướng tích hợp là nhận ra cả tính liên tục lẫn khả năng thích nghi đều cần thiết.",
    strengths: [
      "Có thể phát triển khả năng nhìn một thay đổi từ cả góc độ tính mới lẫn hệ quả dài hạn, nhờ đó nhận ra điều gì cần giữ và điều gì đã đến lúc cập nhật",
      "Những thế đối lập giữa nguyên tắc và tự do có thể rèn năng lực thương lượng, thiết kế ranh giới linh hoạt và phân bổ trách nhiệm rõ hơn",
    ],
    challenges: [
      "Dễ quy nhu cầu kiểm soát cho phía khác trong khi chưa nhận ra phần mình đang chống thay đổi, hoặc quy sự bất ổn cho người khác khi chính mình muốn bứt khỏi cam kết",
      "Có thể dao động giữa tuân thủ cứng và phản ứng đột ngột, khiến các bên khó dự đoán mức cam kết và khó xây niềm tin cho quá trình chuyển đổi",
    ],
    developmentAdvice: [
      "Gọi tên rõ điều không thể thỏa hiệp, điều có thể thử nghiệm và quyền quyết định của từng phía trước khi tranh luận về việc giữ hay đổi toàn bộ",
      "Dùng mốc chuyển tiếp, phản hồi hai chiều và kế hoạch dự phòng để thay đổi có không gian diễn ra mà trách nhiệm thiết yếu vẫn được bảo đảm",
    ],
    evidence: { body1: "Saturn", body2: "Uranus", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-URANUS-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Uranus",
    aspect: "trine",
    title: "Sao Thổ tam hợp Sao Thiên Vương",
    coreMeaning:
      "Kỷ luật, ý thức cấu trúc và động lực đổi mới thường phối hợp khá tự nhiên, giúp bạn dễ cải tiến hệ thống mà vẫn giữ được tính liên tục và trách nhiệm. Dòng phối hợp này có thể hỗ trợ việc biến ý tưởng độc lập thành phương pháp bền vững; tuy vậy, sự thuận lợi không bảo đảm mọi đổi mới đều cần thiết và có thể khiến bạn đánh giá thấp những người cần thêm thời gian hoặc bằng chứng để thích nghi.",
    strengths: [
      "Thường có khả năng cập nhật quy trình theo cách có trật tự, kết hợp tầm nhìn khác thường với kế hoạch, giới hạn và năng lực thực thi dài hạn",
      "Có thể giữ sự độc lập trong tư duy mà không nhất thiết phá bỏ mọi khuôn khổ, từ đó xây những giải pháp mới nhưng vẫn có độ tin cậy",
    ],
    challenges: [
      "Dễ tin rằng phương án cải tiến của mình vừa hợp lý vừa tiến bộ nên chưa kiểm tra đầy đủ tác động ngoài dự kiến hoặc nhu cầu của người liên quan",
      "Có thể quen tự điều chỉnh giữa khuôn khổ và tự do đến mức bỏ qua việc giải thích quá trình, khiến người khác khó theo kịp dù hệ thống vẫn vận hành",
    ],
    developmentAdvice: [
      "Đặt tiêu chí thành công, tác động phụ và điểm xem xét lại cho mỗi cải tiến, kể cả khi cách triển khai ban đầu có vẻ trôi chảy",
      "Chia sẻ logic và lộ trình chuyển đổi, mời phản hồi từ người chịu ảnh hưởng và giữ phương án quay lui khi dữ kiện không ủng hộ thay đổi",
    ],
    evidence: { body1: "Saturn", body2: "Uranus", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-URANUS-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Uranus",
    aspect: "square",
    title: "Sao Thổ vuông Sao Thiên Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu ổn định, kiểm soát và làm đúng trách nhiệm với động lực tự do, đổi mới và phá khuôn có thể khiến mỗi bước tiến đều gặp lực kéo ngược. Bạn có thể trì hoãn thay đổi đến lúc nó trở nên cấp bách hoặc phản ứng mạnh với giới hạn trước khi hiểu chức năng của chúng; mặt xây dựng của sức căng này là buộc tự do phải có cấu trúc và cấu trúc phải chứng minh khả năng thích nghi.",
    strengths: [
      "Có thể phát triển năng lực cải tổ thực tế khi học cách dùng sức ép để nhận diện giới hạn lỗi thời, rủi ro thật và điểm thay đổi có đòn bẩy cao",
      "Ma sát lặp lại có thể rèn sức bền, tư duy hệ thống và khả năng thiết kế giải pháp vừa bảo vệ điều thiết yếu vừa mở thêm không gian tự chủ",
    ],
    challenges: [
      "Dễ mắc kẹt trong chu kỳ siết quy tắc rồi bứt phá, khiến thay đổi tốn kém hơn và làm suy giảm niềm tin vào cả cam kết lẫn sáng kiến",
      "Có thể xem mọi giới hạn là cản trở hoặc mọi khác biệt là mối đe dọa cho ổn định, nên khó phân biệt rủi ro cần quản trị với thói quen cần thay đổi",
    ],
    developmentAdvice: [
      "Xác định xung đột cụ thể giữa yêu cầu vận hành và nhu cầu tự chủ, rồi thử một thay đổi giới hạn phạm vi thay vì tăng kiểm soát hoặc phá bỏ toàn bộ",
      "Theo dõi tín hiệu căng thẳng sớm, đặt ngưỡng điều chỉnh và xây nhịp cải tiến định kỳ để áp lực không phải tích tụ đến mức tạo phản ứng đột ngột",
    ],
    evidence: { body1: "Saturn", body2: "Uranus", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-URANUS-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Uranus",
    aspect: "sextile",
    title: "Sao Thổ lục hợp Sao Thiên Vương",
    coreMeaning:
      "Khả năng tổ chức và động lực đổi mới mở ra cơ hội xây một cải tiến thực tế khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp một ý tưởng khác thường tìm được cấu trúc, nguồn lực và lộ trình triển khai phù hợp; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn rõ, thử nghiệm có giới hạn và trách nhiệm theo dõi kết quả.",
    strengths: [
      "Có thể nhận ra cơ hội nâng cấp một quy trình bằng thay đổi vừa đủ khác biệt để tạo giá trị nhưng vẫn đủ cụ thể để kiểm tra và duy trì",
      "Khi chủ động khai thác, bạn có cơ hội biến nhu cầu tự chủ thành thiết kế, công cụ hoặc phương pháp mới có ranh giới và tính ứng dụng",
    ],
    challenges: [
      "Dễ thấy tiềm năng cải tiến nhưng tiếp tục chuẩn bị hoặc quan sát quá lâu, khiến cơ hội chỉ dừng ở phương án hợp lý chưa được thử",
      "Có thể bắt đầu một thay đổi nhỏ mà chưa phân công trách nhiệm và tiêu chí đánh giá, nên kết quả khó được tích hợp thành cấu trúc bền vững",
    ],
    developmentAdvice: [
      "Chọn một điểm nghẽn cụ thể, thiết kế thử nghiệm nhỏ với người chịu trách nhiệm, giới hạn rủi ro, thời hạn và thước đo kết quả rõ",
      "Sau thử nghiệm, chuẩn hóa phần hữu ích và loại bỏ phần không hiệu quả; chỉ mở rộng khi dữ kiện cho thấy đổi mới hỗ trợ tốt hơn mục tiêu dài hạn",
    ],
    evidence: { body1: "Saturn", body2: "Uranus", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Thổ đồng cung Sao Hải Vương",
    coreMeaning:
      "Nhu cầu xây cấu trúc, chịu trách nhiệm và làm việc với giới hạn của Sao Thổ hòa trực tiếp với trực giác, tưởng tượng và xu hướng làm mềm ranh giới của Sao Hải Vương. Sự kết hợp này có thể giúp một lý tưởng hoặc cảm nhận tinh tế tìm được hình thức thực tế và sức bền; đồng thời, bạn có thể căng giữa việc muốn kiểm soát điều chưa rõ và muốn buông khỏi những yêu cầu quá cứng, nên cần định nghĩa rõ điều đang cam kết.",
    strengths: [
      "Có thể kiên trì chuyển một cảm hứng trừu tượng thành phương pháp, tác phẩm hoặc đóng góp có cấu trúc và giá trị sử dụng lâu dài",
      "Thường có tiềm năng kết hợp tính thận trọng với lòng cảm thông, giúp trách nhiệm không chỉ dựa trên quy tắc mà còn tính đến bối cảnh và ý nghĩa",
    ],
    challenges: [
      "Dễ cố tạo chắc chắn cho điều vốn còn mơ hồ, hoặc ngược lại để lý tưởng làm nhòe phạm vi, thời hạn và trách nhiệm cụ thể",
      "Có thể dao động giữa kỷ luật quá chặt và rút lui khỏi áp lực, khiến tiến độ khó ổn định dù mục tiêu ban đầu có nhiều ý nghĩa",
    ],
    developmentAdvice: [
      "Chuyển lý tưởng thành phạm vi, mốc thời gian và tiêu chí hoàn thành quan sát được, đồng thời dành chỗ để giả định được điều chỉnh khi có dữ kiện mới",
      "Giữ ranh giới về nguồn lực và trách nhiệm nhưng kiểm tra xem cấu trúc đang nâng đỡ mục đích hay chỉ được dùng để tránh sự không chắc chắn",
    ],
    evidence: { body1: "Saturn", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Thổ đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Thực tế, trách nhiệm và giới hạn có thể đứng đối diện với lý tưởng, trực giác hoặc mong muốn vượt khỏi ranh giới quen thuộc. Thế đối cực này dễ đặt vai trò giữ chuẩn mực và vai trò mang cảm hứng lên hai phía khác nhau, tạo nhịp thất vọng với điều thực tế rồi lại tìm đến cấu trúc để lấy điểm tựa; hướng tích hợp là nhìn nhận cả dữ kiện lẫn ý nghĩa mà không giao toàn bộ một phía cho người khác.",
    strengths: [
      "Có thể phát triển khả năng xem xét một tầm nhìn từ cả giá trị truyền cảm hứng lẫn điều kiện, chi phí và trách nhiệm cần để duy trì nó",
      "Những khác biệt giữa nguyên tắc và lòng cảm thông có thể rèn năng lực thương lượng ranh giới mà vẫn giữ được sự nhạy cảm với hoàn cảnh",
    ],
    challenges: [
      "Dễ xem phía khác là quá cứng nhắc hoặc quá mơ hồ mà chưa nhận ra chính mình cũng đang luân phiên giữa hai cách phản ứng đó",
      "Có thể lý tưởng hóa một lựa chọn thay thế khi áp lực tăng, hoặc bám vào nghĩa vụ đến mức không còn nghe được tín hiệu rằng mục tiêu cần được định nghĩa lại",
    ],
    developmentAdvice: [
      "Tách dữ kiện, giả định và mong muốn thành ba phần rõ ràng, rồi thống nhất trách nhiệm, giới hạn và tiêu chí đánh giá mà các phía đều có thể kiểm chứng",
      "Cho trực giác quyền đề xuất hướng đi nhưng để thử nghiệm nhỏ và hệ quả quan sát được quyết định phần nào nên trở thành cam kết dài hạn",
    ],
    evidence: { body1: "Saturn", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Thổ tam hợp Sao Hải Vương",
    coreMeaning:
      "Tính thực tế, kỷ luật và cảm nhận tinh tế thường phối hợp khá tự nhiên, giúp bạn dễ đưa tưởng tượng hoặc lý tưởng vào một cấu trúc có thể duy trì. Dòng phối hợp này có thể hỗ trợ công việc cần cả kiên trì lẫn trực giác; tuy vậy, sự trôi chảy không bảo đảm cảm nhận ban đầu là chính xác và có thể khiến những giả định giàu ý nghĩa ít được kiểm chứng hơn mức cần thiết.",
    strengths: [
      "Thường có khả năng tạo nhịp làm việc ổn định cho hoạt động sáng tạo, hỗ trợ hoặc chiêm nghiệm mà không làm mất hoàn toàn tính linh hoạt",
      "Có thể kết hợp lòng cảm thông với trách nhiệm thực tế, biến mong muốn đóng góp thành hành động đều đặn và có ranh giới rõ hơn",
    ],
    challenges: [
      "Dễ tin rằng trực giác và kế hoạch đang đồng thuận nên bỏ qua phản hồi cho thấy mục tiêu, nguồn lực hoặc tác động cần được xem lại",
      "Có thể duy trì một lý tưởng rất lâu nhờ kỷ luật, kể cả khi hình thức hiện tại không còn phục vụ tốt ý nghĩa ban đầu",
    ],
    developmentAdvice: [
      "Định kỳ kiểm tra cảm nhận bằng dữ kiện, phản hồi độc lập và kết quả quan sát được thay vì xem sự nhất quán nội tâm là bằng chứng đủ",
      "Giữ mục đích cốt lõi nhưng cho phép cấu trúc thay đổi, giảm quy mô hoặc kết thúc khi chi phí thực tế không còn tương xứng với giá trị tạo ra",
    ],
    evidence: { body1: "Saturn", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Thổ vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa giới hạn, nghĩa vụ và yêu cầu thực tế với lý tưởng, tưởng tượng hoặc nhu cầu làm mềm ranh giới có thể khiến một mục tiêu vừa nặng nề vừa khó định hình. Bạn có thể thất vọng khi thực tế không khớp hình dung hoặc né việc xác định rõ vì sợ làm mất cảm hứng; mặt xây dựng của sức căng này là buộc lý tưởng phải có nền tảng và buộc cấu trúc phải phục vụ một ý nghĩa thật sự.",
    strengths: [
      "Có thể phát triển năng lực biến sự mơ hồ thành câu hỏi cụ thể, từ đó xây tiêu chuẩn, ranh giới và cách làm thực tế hơn cho điều mình coi trọng",
      "Ma sát lặp lại có thể rèn sự kiên trì có chọn lọc: vừa chịu được giai đoạn chưa rõ, vừa không dùng hy vọng để thay thế hành động cần thiết",
    ],
    challenges: [
      "Dễ luân phiên giữa tự ép mình theo một chuẩn cứng và trì hoãn hoặc rút lui khi chuẩn đó không thể đáp ứng, làm giảm cảm giác tin cậy vào chính kế hoạch",
      "Có thể xem giới hạn là bằng chứng rằng lý tưởng không khả thi, hoặc xem lý tưởng là lý do để bỏ qua nguồn lực, thời hạn và hệ quả thực tế",
    ],
    developmentAdvice: [
      "Thu hẹp mục tiêu thành bước có thể kiểm chứng, ghi rõ điều kiện tối thiểu, nguồn lực và dấu hiệu cần điều chỉnh trước khi đầu tư thêm",
      "Dùng thất vọng như dữ liệu về khoảng cách giữa kỳ vọng và thực tế, rồi sửa giả định hoặc cấu trúc thay vì phủ nhận toàn bộ lý tưởng hay trách nhiệm",
    ],
    evidence: { body1: "Saturn", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Thổ lục hợp Sao Hải Vương",
    coreMeaning:
      "Kỷ luật và khả năng tạo cấu trúc mở ra cơ hội hiện thực hóa một trực giác, ý tưởng sáng tạo hoặc lý tưởng khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp cảm hứng tìm được lịch trình, kỹ năng và ranh giới phù hợp; nhưng nó không tự vận hành như tam hợp, nên cần một lựa chọn cụ thể, thử nghiệm thực tế và trách nhiệm theo dõi kết quả.",
    strengths: [
      "Có thể nhận ra cơ hội đưa một cảm nhận tinh tế vào hình thức hữu ích thông qua kế hoạch vừa sức, thực hành đều và giới hạn nguồn lực rõ",
      "Khi chủ động khai thác, bạn có cơ hội xây cấu trúc nâng đỡ sáng tạo hoặc lòng cảm thông mà không biến chúng thành nghĩa vụ không có điểm dừng",
    ],
    challenges: [
      "Dễ thấy một hướng đi có ý nghĩa nhưng tiếp tục chuẩn bị hoặc hình dung, khiến tiềm năng chưa trở thành hành động có thể đánh giá",
      "Có thể bắt đầu bằng thiện chí và kỷ luật nhưng chưa xác định ranh giới, nên khó biết lúc nào nên tiếp tục, điều chỉnh hoặc kết thúc cam kết",
    ],
    developmentAdvice: [
      "Chọn một ý tưởng cụ thể, đặt lịch thử nghiệm nhỏ với đầu ra, thời hạn, giới hạn nguồn lực và tiêu chí phản hồi rõ ràng",
      "Sau thử nghiệm, giữ phần vừa tạo giá trị vừa có thể duy trì; điều chỉnh hoặc dừng phần chỉ còn hấp dẫn về ý nghĩa nhưng thiếu tác động quan sát được",
    ],
    evidence: { body1: "Saturn", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Thổ đồng cung Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu xây cấu trúc, giữ trách nhiệm và kiểm soát giới hạn của Sao Thổ hòa trực tiếp với chiều sâu, cường độ và động lực tái cấu trúc của Sao Diêm Vương. Sự kết hợp này có thể tạo sức bền để xây lại một nền tảng từ gốc và chịu được quá trình thay đổi dài; đồng thời, việc đồng nhất an toàn với kiểm soát có thể khiến cấu trúc trở nên quá cứng hoặc khó buông phần đã mất chức năng.",
    strengths: [
      "Có thể tập trung lâu dài vào vấn đề nền, loại bỏ phần không còn hiệu quả và xây lại hệ thống với trách nhiệm cùng tiêu chuẩn rõ",
      "Thường có tiềm năng giữ vững cam kết trong giai đoạn chuyển đổi sâu, biến áp lực thành chiến lược, kỷ luật và năng lực phục hồi cấu trúc",
    ],
    challenges: [
      "Dễ siết quyền kiểm soát khi cảm thấy nền tảng bị đe dọa, khiến việc thích nghi hoặc chia sẻ trách nhiệm bị xem như mất sức mạnh",
      "Có thể duy trì một cấu trúc vì đã đầu tư nhiều công sức và quyền hạn vào đó, dù mục đích ban đầu cần được định nghĩa hoặc xây lại",
    ],
    developmentAdvice: [
      "Xác định điều thật sự cần bảo vệ, phần đã hết chức năng và tiêu chí cho cấu trúc mới trước khi tăng thêm quy tắc hoặc nguồn lực",
      "Chia quá trình tái cấu trúc thành giai đoạn có điểm kiểm tra, phân quyền rõ và cho phép phương pháp thay đổi mà không xem đó là thất bại",
    ],
    evidence: { body1: "Saturn", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Thổ đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Trách nhiệm, giới hạn và nhu cầu duy trì cấu trúc có thể đứng đối diện với sức ép thay đổi sâu, phân bổ lại quyền lực hoặc loại bỏ điều không còn phù hợp. Thế đối cực này dễ đặt vai trò giữ trật tự và vai trò thúc đẩy tái cấu trúc lên hai phía khác nhau, biến khác biệt thành giằng co quyền quyết định; hướng tích hợp là nhận ra cả tính liên tục lẫn thay đổi nền đều có chức năng.",
    strengths: [
      "Có thể phát triển khả năng nhìn một cuộc thay đổi từ cả góc độ trách nhiệm vận hành lẫn động lực, ảnh hưởng và cấu trúc quyền lực bên dưới",
      "Những thế đối lập mạnh có thể rèn năng lực thương lượng giới hạn, quyền quyết định và lộ trình chuyển đổi mà không bỏ qua hệ quả dài hạn",
    ],
    challenges: [
      "Dễ quy nhu cầu kiểm soát cho phía khác trong khi chưa nhận ra mình cũng đang bảo vệ vị trí, nguyên tắc hoặc cách phân quyền quen thuộc",
      "Có thể kéo dài thế giằng co giữa giữ và thay đổi, khiến nguồn lực bị dùng để phòng thủ thay vì xác định phần nền thực sự cần tái cấu trúc",
    ],
    developmentAdvice: [
      "Làm rõ quyền quyết định, trách nhiệm và điều mỗi phía đang cố bảo vệ, rồi tách xung đột lợi ích khỏi mục tiêu vận hành chung",
      "Dùng dữ kiện về tác động và chi phí để xây lộ trình chuyển tiếp, phân bổ lại quyền hạn theo giai đoạn thay vì buộc một phía thắng toàn bộ",
    ],
    evidence: { body1: "Saturn", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Thổ tam hợp Sao Diêm Vương",
    coreMeaning:
      "Kỷ luật, sức bền và năng lực chuyển hóa sâu thường phối hợp khá tự nhiên, giúp bạn dễ nhận ra phần cấu trúc cần xây lại và duy trì thay đổi qua thời gian. Dòng phối hợp này có thể hỗ trợ việc tái cấu trúc bền vững thay vì chỉ phản ứng bề mặt; tuy vậy, sự vững vàng không bảo đảm mọi cách kiểm soát đều cần thiết và có thể khiến bạn quá tin vào sức chịu đựng hoặc quyền đánh giá của mình.",
    strengths: [
      "Thường có khả năng xử lý vấn đề phức tạp theo từng lớp, kết hợp kiên trì với hiểu biết về nguyên nhân nền để tạo thay đổi có độ bền",
      "Có thể giữ trách nhiệm trong giai đoạn áp lực cao và chuyển kinh nghiệm khó thành quy trình, ranh giới hoặc cấu trúc trưởng thành hơn",
    ],
    challenges: [
      "Dễ mặc định rằng mình có thể chịu thêm áp lực hoặc kiểm soát quá trình, nên nhận ra muộn lúc cần chia sẻ quyền hạn hay giảm phạm vi",
      "Có thể duy trì phương pháp tái cấu trúc quen thuộc vì nó từng hiệu quả, dù phản hồi mới cho thấy cách tiếp cận cần linh hoạt hơn",
    ],
    developmentAdvice: [
      "Định kỳ kiểm tra quyền hạn, tải trách nhiệm và chi phí duy trì bằng phản hồi độc lập thay vì chỉ dựa vào khả năng chịu đựng của bản thân",
      "Giữ mục tiêu dài hạn nhưng cho phép chia nhỏ, phân quyền hoặc thay phương pháp khi dữ kiện cho thấy cấu trúc mới chưa tạo giá trị như dự kiến",
    ],
    evidence: { body1: "Saturn", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Thổ vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa giới hạn, trách nhiệm và cấu trúc hiện có với sức ép chuyển hóa, tái phân bổ quyền lực và thay đổi từ gốc có thể làm mỗi bước điều chỉnh trở nên nặng nề. Bạn có thể siết chặt khi gặp kháng lực hoặc tăng cường độ để phá thế bế tắc; mặt xây dựng của sức căng này là buộc cấu trúc lỗi thời phải được xem xét và buộc thay đổi sâu phải có trách nhiệm thực tế.",
    strengths: [
      "Có thể phát triển sức bền chiến lược và năng lực nhận diện điểm gãy nền, nơi sửa chữa bề mặt không còn đủ để hệ thống tiếp tục vận hành",
      "Ma sát mạnh có thể giúp bạn hiểu rõ quan hệ giữa giới hạn, quyền quyết định và động lực kiểm soát, từ đó xây nền mới có ý thức hơn",
    ],
    challenges: [
      "Dễ mắc kẹt trong chu kỳ tăng kiểm soát rồi gặp kháng lực lớn hơn, khiến vấn đề cấu trúc bị biến thành cuộc thử sức về ý chí hoặc quyền lực",
      "Có thể cố giữ phần quen thuộc quá lâu hoặc phá bỏ quá nhiều khi áp lực đạt đỉnh, thay vì chuyển đổi có thứ tự và tiêu chí rõ",
    ],
    developmentAdvice: [
      "Xác định điểm nghẽn cụ thể, quyền hạn liên quan và phần cấu trúc đã mất chức năng trước khi chọn giữ, sửa hay loại bỏ",
      "Thiết kế thay đổi theo giai đoạn với ngưỡng dừng, phân công trách nhiệm và thước đo tác động để cường độ phục vụ tái cấu trúc thay vì leo thang",
    ],
    evidence: { body1: "Saturn", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-SATURN-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Saturn",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Thổ lục hợp Sao Diêm Vương",
    coreMeaning:
      "Kỷ luật, tính thực tế và chiều sâu mở ra cơ hội tái cấu trúc một phần nền quan trọng khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp loại bỏ cách làm đã mất hiệu quả và xây phương án bền vững từng bước; nhưng nó không tự vận hành như tam hợp, nên cần chọn đúng điểm can thiệp, cam kết nguồn lực và theo dõi hệ quả.",
    strengths: [
      "Có thể nhận ra cơ hội cải thiện nơi thay đổi một quy tắc, ranh giới hoặc cách phân bổ trách nhiệm sẽ tạo tác động sâu hơn sửa chữa bề mặt",
      "Khi chủ động khai thác, bạn có cơ hội biến hiểu biết về động lực nền thành kế hoạch tái cấu trúc vừa sức và có khả năng duy trì",
    ],
    challenges: [
      "Dễ nhìn thấy nhiều điểm cần thay đổi nhưng chưa chọn một phạm vi đủ cụ thể, khiến hiểu biết sâu chưa trở thành tiến triển quan sát được",
      "Có thể bắt đầu cải tổ mà thiếu tiêu chí về quyền quyết định, chi phí và điểm kết thúc, nên thay đổi nhỏ dần mang tải trách nhiệm quá lớn",
    ],
    developmentAdvice: [
      "Chọn một điểm có đòn bẩy cao, xác định người chịu trách nhiệm, giới hạn nguồn lực, thời hạn và kết quả tối thiểu trước khi can thiệp",
      "Đo tác động sau từng giai đoạn, chuẩn hóa phần hiệu quả và dừng hoặc điều chỉnh khi chi phí kiểm soát vượt giá trị của cấu trúc mới",
    ],
    evidence: { body1: "Saturn", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-NEPTUNE-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Neptune",
    aspect: "conjunction",
    title: "Sao Thiên Vương đồng cung Sao Hải Vương",
    coreMeaning:
      "Động lực đổi mới, độc lập và phá khuôn của Sao Thiên Vương hòa trực tiếp với trực giác, tưởng tượng và xu hướng làm mềm ranh giới của Sao Hải Vương. Sự kết hợp này có thể tạo tầm nhìn khác thường về điều cần thay đổi và những khả năng chưa được định hình; đồng thời, cảm hứng đột phá có thể hòa lẫn với kỳ vọng mơ hồ, nên điều mới cần được phân biệt bằng thử nghiệm chứ không chỉ bằng sức hấp dẫn của ý tưởng.",
    strengths: [
      "Có thể kết nối tư duy khác biệt với cảm nhận biểu tượng hoặc sáng tạo, từ đó hình dung những cách tiếp cận vượt khỏi khuôn mẫu quen thuộc",
      "Thường có tiềm năng nhận ra nơi một lý tưởng cần hình thức mới và dùng thử nghiệm để mở thêm lựa chọn cho cộng đồng hoặc công việc sáng tạo",
    ],
    challenges: [
      "Dễ xem một ý tưởng gây hứng khởi hoặc mang tính khác thường là dấu hiệu đủ rằng nó đúng, dù mục tiêu và hệ quả vẫn chưa rõ",
      "Có thể thay đổi hướng theo làn sóng cảm hứng, khiến ranh giới, cam kết và tiêu chí đánh giá bị hòa tan trước khi thử nghiệm tạo kết quả",
    ],
    developmentAdvice: [
      "Chuyển tầm nhìn thành giả thuyết cụ thể, thử trong phạm vi nhỏ và ghi trước dấu hiệu nào sẽ xác nhận, điều chỉnh hoặc bác bỏ hướng đi",
      "Giữ không gian cho trực giác và khác biệt nhưng đặt ranh giới về nguồn lực, tác động và trách nhiệm để cảm hứng có thể trở thành giá trị sử dụng",
    ],
    evidence: { body1: "Uranus", body2: "Neptune", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-NEPTUNE-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Neptune",
    aspect: "opposition",
    title: "Sao Thiên Vương đối đỉnh Sao Hải Vương",
    coreMeaning:
      "Nhu cầu tự do, đổi hướng và phá khuôn có thể đứng đối diện với lý tưởng, cảm nhận tinh tế hoặc mong muốn hòa vào một ý nghĩa lớn hơn. Thế đối cực này dễ đặt vai trò thúc đẩy thay đổi và vai trò giữ cảm hứng lên hai phía khác nhau, tạo nhịp bứt khỏi điều mơ hồ rồi lại mất điểm neo; hướng tích hợp là vừa tôn trọng trực giác vừa làm rõ lựa chọn và hệ quả thực tế.",
    strengths: [
      "Có thể phát triển khả năng nhìn một ý tưởng mới từ cả góc độ tự chủ lẫn giá trị cảm xúc, biểu tượng và tác động tới những người liên quan",
      "Những khác biệt giữa đổi mới và lý tưởng có thể rèn năng lực thương lượng giữa quyền thử nghiệm, ranh giới chung và mục đích muốn phục vụ",
    ],
    challenges: [
      "Dễ quy sự mơ hồ cho phía khác trong khi chưa nhận ra nhu cầu đổi hướng của mình cũng làm mục tiêu và cam kết khó ổn định",
      "Có thể dao động giữa phủ nhận một lý tưởng vì thiếu bằng chứng và chạy theo nó để thoát khỏi khuôn cũ, thay vì kiểm tra từng phần",
    ],
    developmentAdvice: [
      "Tách điều đã biết, điều đang cảm nhận và điều muốn thay đổi, rồi thống nhất ranh giới cùng tiêu chí đánh giá trước khi chọn giữ hay phá khuôn",
      "Dùng thử nghiệm có thời hạn và phản hồi từ nhiều phía để tìm điểm giao giữa tự do sáng tạo, ý nghĩa và trách nhiệm thực tế",
    ],
    evidence: { body1: "Uranus", body2: "Neptune", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-NEPTUNE-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Neptune",
    aspect: "trine",
    title: "Sao Thiên Vương tam hợp Sao Hải Vương",
    coreMeaning:
      "Tư duy khác biệt, trực giác và tưởng tượng thường phối hợp khá tự nhiên, giúp bạn dễ nhận ra khả năng mới trong những tín hiệu chưa thành hình. Dòng phối hợp này có thể hỗ trợ sáng tạo và đổi mới giàu ý nghĩa; tuy vậy, sự trôi chảy không bảo đảm trực giác là chính xác hay điều mới là tiến bộ, và có thể khiến bước kiểm chứng thực tế bị xem nhẹ.",
    strengths: [
      "Thường có khả năng nối ý tưởng khác thường với hình ảnh, cảm nhận hoặc nhu cầu chung để tạo hướng sáng tạo có sức gợi mở",
      "Có thể thích nghi với thay đổi mà vẫn giữ liên hệ với một lý tưởng rộng, giúp thử nghiệm không chỉ nhắm đến tính mới bề mặt",
    ],
    challenges: [
      "Dễ tin rằng một tầm nhìn liền mạch hoặc giàu cảm hứng đã đủ đáng tin, nên chưa kiểm tra giả định và tác động ngoài dự kiến",
      "Có thể liên tục tạo khả năng mới nhưng ít chọn một hướng để hoàn thiện, khiến tiềm năng sáng tạo thiếu đầu ra hoặc giá trị quan sát được",
    ],
    developmentAdvice: [
      "Chọn một ý tưởng ưu tiên, đặt tiêu chí sử dụng và mời phản hồi độc lập để kiểm tra cả tính mới lẫn giá trị thực tế của nó",
      "Duy trì không gian tưởng tượng nhưng thêm mốc hoàn thành, giới hạn nguồn lực và quyền điều chỉnh khi dữ kiện không ủng hộ cảm nhận ban đầu",
    ],
    evidence: { body1: "Uranus", body2: "Neptune", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-NEPTUNE-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Neptune",
    aspect: "square",
    title: "Sao Thiên Vương vuông Sao Hải Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu đổi mới, tự do và phá khuôn với lý tưởng, trực giác hoặc xu hướng làm mờ ranh giới có thể khiến thay đổi diễn ra nhanh hơn khả năng định hướng. Bạn có thể bứt khỏi một khuôn cũ vì nó không còn truyền cảm hứng, rồi gặp khó khi xác định điều mới thực sự phục vụ mục tiêu nào; mặt xây dựng của sức căng này là buộc cảm hứng phải được kiểm chứng và đổi mới phải có điểm neo.",
    strengths: [
      "Có thể phát triển năng lực phát hiện nơi khẩu hiệu về tiến bộ hoặc lý tưởng đang che một giả định mơ hồ cần được làm rõ",
      "Ma sát lặp lại có thể thúc đẩy thử nghiệm trưởng thành hơn, nơi khác biệt được đánh giá bằng tác động thay vì chỉ bằng cảm giác tự do hay ý nghĩa",
    ],
    challenges: [
      "Dễ đổi hướng đột ngột khi thất vọng với thực tế hoặc theo đuổi một hình dung mới mà chưa xác định ranh giới và hệ quả",
      "Có thể nhầm cảm giác phá khuôn với tiến bộ, hoặc nhầm sức hấp dẫn biểu tượng với bằng chứng rằng một phương án sẽ vận hành",
    ],
    developmentAdvice: [
      "Dừng lại để viết rõ vấn đề cần giải quyết, giả định đang dùng và kết quả tối thiểu trước khi thay đổi công cụ, nhóm hoặc cam kết",
      "Thử từng bước có thể đảo ngược, theo dõi tác động và dùng phản hồi để phân biệt điều thật sự mới với điều chỉ hấp dẫn trong tưởng tượng",
    ],
    evidence: { body1: "Uranus", body2: "Neptune", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-NEPTUNE-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Neptune",
    aspect: "sextile",
    title: "Sao Thiên Vương lục hợp Sao Hải Vương",
    coreMeaning:
      "Tinh thần thử nghiệm và trực giác sáng tạo mở ra cơ hội phát triển một hướng mới có ý nghĩa khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp một cảm nhận hoặc lý tưởng tìm được phương pháp khác thường để biểu đạt và kiểm nghiệm; nhưng nó không tự vận hành như tam hợp, nên cần lựa chọn cụ thể, hành động nhỏ và tiêu chí phản hồi rõ.",
    strengths: [
      "Có thể nhận ra cơ hội dùng cách tiếp cận mới để làm rõ hoặc hiện thực hóa một ý tưởng sáng tạo, nhân văn hay giàu tính biểu tượng",
      "Khi chủ động khai thác, bạn có cơ hội kết hợp tự do khám phá với sự nhạy cảm về bối cảnh để tạo thử nghiệm vừa mới vừa có mục đích",
    ],
    challenges: [
      "Dễ thấy nhiều khả năng thú vị nhưng chưa chọn một hướng để thử, khiến trực giác và đổi mới vẫn ở dạng tiềm năng",
      "Có thể bắt đầu bằng cảm hứng mà thiếu phạm vi và thước đo, nên khó biết phần nào của ý tưởng thực sự tạo giá trị để tiếp tục",
    ],
    developmentAdvice: [
      "Chọn một giả thuyết, xây thử nghiệm nhỏ có thời hạn, đối tượng sử dụng và kết quả quan sát được thay vì mở nhiều hướng cùng lúc",
      "Giữ phần tạo giá trị sau phản hồi, điều chỉnh phần mơ hồ và chỉ mở rộng khi tính mới hỗ trợ mục đích tốt hơn phương án hiện có",
    ],
    evidence: { body1: "Uranus", body2: "Neptune", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Thiên Vương đồng cung Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu đổi mới, tự chủ và phá khuôn của Sao Thiên Vương hòa trực tiếp với chiều sâu, cường độ và sức ép tái cấu trúc của Sao Diêm Vương. Sự kết hợp này có thể giúp bạn nhận ra nơi thay đổi bề mặt không còn đủ và theo đuổi một cách tổ chức hoàn toàn mới; đồng thời, việc đồng nhất khác biệt với tiến bộ có thể làm đổi mới trở nên cực đoan hoặc gắn quá chặt với nhu cầu gây ảnh hưởng.",
    strengths: [
      "Có thể nhìn thấy mô thức quyền lực hoặc cấu trúc nền đang giữ một hệ thống ở trạng thái cũ và hình dung phương án thay đổi tận gốc",
      "Thường có tiềm năng duy trì thử nghiệm qua giai đoạn chuyển đổi cường độ cao, biến khủng hoảng phương pháp thành cách tiếp cận mới có chiều sâu",
    ],
    challenges: [
      "Dễ đẩy thay đổi quá xa để chứng minh sự độc lập hoặc sức ảnh hưởng, trong khi hệ quả và nhu cầu của người liên quan chưa được xem xét đủ",
      "Có thể ám vào việc loại bỏ khuôn cũ đến mức mọi giới hạn hoặc phản hồi bị hiểu như lực cản cần phải vượt qua",
    ],
    developmentAdvice: [
      "Làm rõ vấn đề nền, động cơ muốn thay đổi và tiêu chí giá trị trước khi chọn phá bỏ, xây lại hay phân bổ lại quyền quyết định",
      "Thử các bước có thể đảo ngược, theo dõi tác động và chia sẻ quyền phản hồi để cường độ phục vụ cải tổ thay vì trở thành mục tiêu tự thân",
    ],
    evidence: { body1: "Uranus", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Thiên Vương đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Nhu cầu tự do, khác biệt và cải cách có thể đứng đối diện với sức ép kiểm soát, chuyển hóa hoặc phân bổ lại quyền lực. Thế đối cực này dễ đặt vai trò phá khuôn và vai trò nắm ảnh hưởng lên hai phía khác nhau, biến yêu cầu thay đổi thành cuộc giằng co quyền quyết định; hướng tích hợp là nhận diện cả động lực tự chủ lẫn phần quyền lực đang được bảo vệ.",
    strengths: [
      "Có thể phát triển khả năng đọc một cuộc cải cách từ cả góc độ quyền tự do, động lực sâu và lợi ích của những phía chịu tác động",
      "Những thế đối lập mạnh có thể rèn năng lực thương lượng giữa đổi mới, quyền quyết định và nhu cầu tái cấu trúc phần nền đã mất chức năng",
    ],
    challenges: [
      "Dễ quy nhu cầu kiểm soát cho phía khác trong khi chưa nhận ra phản kháng của mình cũng có thể trở thành cách áp đặt hướng thay đổi",
      "Có thể leo thang xung đột để giành tự chủ hoặc bảo vệ ảnh hưởng, khiến mục tiêu cải tổ thực tế bị che khuất bởi vấn đề thắng–thua",
    ],
    developmentAdvice: [
      "Tách mục tiêu cần thay đổi khỏi nhu cầu phải thắng về quyền quyết định, rồi làm rõ ranh giới, trách nhiệm và điều mỗi phía đang bảo vệ",
      "Dùng dữ kiện về tác động để thiết kế chuyển đổi theo giai đoạn, nơi quyền thử nghiệm và cơ chế kiểm soát đều có giới hạn minh bạch",
    ],
    evidence: { body1: "Uranus", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Thiên Vương tam hợp Sao Diêm Vương",
    coreMeaning:
      "Tinh thần đổi mới và năng lực chuyển hóa sâu thường phối hợp khá tự nhiên, giúp bạn dễ nhận ra nơi cấu trúc cũ cần được xây lại thay vì chỉ sửa bề mặt. Dòng phối hợp này có thể hỗ trợ cải tổ dài hơi và thích nghi với thay đổi lớn; tuy vậy, sự trôi chảy không bảo đảm mọi phá khuôn đều tạo tiến bộ và có thể khiến động cơ quyền lực ít được kiểm tra hơn mức cần thiết.",
    strengths: [
      "Thường có khả năng kết nối ý tưởng khác biệt với nguyên nhân nền, từ đó tạo phương án cải tổ có chiều sâu thay vì chỉ thay hình thức",
      "Có thể duy trì sự độc lập trong giai đoạn tái cấu trúc và biến trải nghiệm cường độ cao thành hiểu biết, công cụ hoặc hệ thống linh hoạt hơn",
    ],
    challenges: [
      "Dễ tin rằng mình nhìn rõ điều cần thay đổi nên đánh giá thấp phản hồi về chi phí, tốc độ hoặc tác động ngoài dự kiến",
      "Có thể quen dùng sức ảnh hưởng và thay đổi mạnh để tạo tiến triển, nên ít nhận ra lúc cần chia sẻ quyền quyết định hoặc giảm phạm vi",
    ],
    developmentAdvice: [
      "Kiểm tra động cơ, tác động và mức đồng thuận bằng phản hồi độc lập trước khi mở rộng một cải tổ đang diễn ra thuận lợi",
      "Giữ mục tiêu chuyển hóa nhưng cho phép phương pháp đổi, giảm lực hoặc dừng khi dữ kiện cho thấy tính mới chưa tạo giá trị tương xứng",
    ],
    evidence: { body1: "Uranus", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Thiên Vương vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa nhu cầu tự do, phá khuôn và thay đổi nhanh với sức ép quyền lực, kiểm soát và chuyển hóa từ gốc có thể khiến cải cách trở thành cuộc thử sức cường độ cao. Bạn có thể phản kháng mạnh khi bị giới hạn hoặc tăng sức ép để buộc hệ thống đổi hướng; mặt xây dựng của sức căng này là làm lộ cấu trúc lỗi thời và buộc thay đổi phải đối diện động cơ cùng hệ quả thật.",
    strengths: [
      "Có thể phát triển năng lực nhận diện điểm gãy nơi quyền lực và cấu trúc cũ ngăn khả năng thích nghi, từ đó tìm cách cải tổ có trọng tâm",
      "Ma sát lặp lại có thể rèn sự can đảm thay đổi sâu cùng khả năng phân biệt tự do thực chất với phản ứng chỉ nhằm thoát khỏi áp lực",
    ],
    challenges: [
      "Dễ mắc kẹt trong chu kỳ kiểm soát và phản kháng, khiến mỗi phía tăng cường độ trong khi vấn đề nền chưa được xử lý",
      "Có thể phá bỏ quá nhiều khi áp lực đạt đỉnh hoặc giữ một lập trường cực đoan vì đã gắn nó với quyền tự chủ và sức mạnh cá nhân",
    ],
    developmentAdvice: [
      "Xác định cấu trúc cụ thể cần đổi, động lực quyền lực liên quan và phần có thể thử trước khi mở rộng xung đột hoặc phá bỏ toàn bộ",
      "Dùng bước thay đổi có giới hạn, ngưỡng dừng và cơ chế phản hồi để chuyển cường độ thành tái cấu trúc thay vì cuộc đấu kiểm soát",
    ],
    evidence: { body1: "Uranus", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-URANUS-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Uranus",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Thiên Vương lục hợp Sao Diêm Vương",
    coreMeaning:
      "Tinh thần thử nghiệm và khả năng tái cấu trúc sâu mở ra cơ hội tạo một thay đổi có ý nghĩa khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp nhận ra điểm đòn bẩy nơi cách làm mới sẽ thay đổi cả mô thức nền; nhưng nó không tự vận hành như tam hợp, nên cần chọn phạm vi cụ thể, hành động có thể kiểm chứng và giới hạn ảnh hưởng rõ.",
    strengths: [
      "Có thể nhận ra cơ hội dùng một thử nghiệm khác biệt để tháo điểm nghẽn quyền lực hoặc loại bỏ quy trình đã mất hiệu quả",
      "Khi chủ động khai thác, bạn có cơ hội biến hiểu biết sâu thành bước cải tổ vừa đủ mới để mở lựa chọn và đủ cụ thể để đánh giá",
    ],
    challenges: [
      "Dễ nhìn thấy tiềm năng thay đổi tận gốc nhưng chưa chọn một điểm bắt đầu, khiến hiểu biết và ý tưởng vẫn ở dạng khả năng",
      "Có thể bắt đầu cải tổ mà thiếu ranh giới quyền quyết định hoặc thước đo tác động, nên thay đổi nhỏ dần mang cường độ lớn hơn dự kiến",
    ],
    developmentAdvice: [
      "Chọn một điểm có đòn bẩy cao, xác định giả thuyết, phạm vi quyền hạn, thời hạn và kết quả quan sát được trước khi thử",
      "Giữ phần tạo giá trị sau phản hồi, điều chỉnh phần gây chi phí quyền lực không cần thiết và chỉ mở rộng khi tác động hỗ trợ mục tiêu rõ",
    ],
    evidence: { body1: "Uranus", body2: "Pluto", aspect: "sextile" },
  },
  {
    ruleId: "WESTERN-ASPECT-NEPTUNE-PLUTO-CONJUNCTION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Neptune",
    body2: "Pluto",
    aspect: "conjunction",
    title: "Sao Hải Vương đồng cung Sao Diêm Vương",
    coreMeaning:
      "Trực giác, tưởng tượng và xu hướng làm mềm ranh giới của Sao Hải Vương hòa trực tiếp với chiều sâu, cường độ và động lực chuyển hóa của Sao Diêm Vương. Sự kết hợp này có thể tạo cảm nhận mạnh về những tầng ý nghĩa hoặc mô thức nền cần được thay đổi; đồng thời, cảm hứng sâu có thể hòa lẫn với ám ảnh, lý tưởng hóa hoặc nhu cầu kiểm soát, nên trực giác cần được phân biệt khỏi điều mình rất muốn tin.",
    strengths: [
      "Có thể kết nối cảm nhận biểu tượng với khả năng nhìn sâu vào động lực nền, từ đó tạo tác phẩm, góc hiểu hoặc hướng thay đổi giàu chiều sâu",
      "Thường có tiềm năng ở lại với trải nghiệm khó định hình đủ lâu để nhận ra điều đã mất chức năng và tìm ý nghĩa mới cho quá trình chuyển hóa",
    ],
    challenges: [
      "Dễ xem một cảm nhận cường độ cao là bằng chứng chắc chắn, trong khi mong muốn, nỗi sợ hoặc nhu cầu gây ảnh hưởng cũng có thể đang định hình cách hiểu",
      "Có thể hòa tan ranh giới quanh một mục tiêu chuyển hóa, khiến trách nhiệm, quyền quyết định và điểm dừng trở nên khó xác định",
    ],
    developmentAdvice: [
      "Tách quan sát, diễn giải và mong muốn thành các phần rõ ràng, rồi kiểm tra cảm nhận bằng dữ kiện, thời gian và phản hồi độc lập",
      "Đặt ranh giới về quyền hạn, nguồn lực và thời điểm đánh giá lại để chiều sâu phục vụ thay đổi có ý nghĩa thay vì duy trì cường độ tự thân",
    ],
    evidence: { body1: "Neptune", body2: "Pluto", aspect: "conjunction" },
  },
  {
    ruleId: "WESTERN-ASPECT-NEPTUNE-PLUTO-OPPOSITION-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Neptune",
    body2: "Pluto",
    aspect: "opposition",
    title: "Sao Hải Vương đối đỉnh Sao Diêm Vương",
    coreMeaning:
      "Lý tưởng, lòng cảm thông và cảm nhận tinh tế có thể đứng đối diện với sức ép quyền lực, kiểm soát hoặc chuyển hóa từ gốc. Thế đối cực này dễ đặt vai trò mang ý nghĩa và vai trò nắm ảnh hưởng lên hai phía khác nhau, tạo nhịp lý tưởng hóa rồi thất vọng hoặc cứu giúp rồi chống kiểm soát; hướng tích hợp là nhận diện cả projection lẫn động lực quyền lực mà không phủ nhận giá trị của cảm nhận.",
    strengths: [
      "Có thể phát triển khả năng nhìn một tầm nhìn từ cả ý nghĩa công khai lẫn lợi ích, nỗi sợ và ảnh hưởng đang vận hành bên dưới",
      "Những thế đối lập mạnh có thể rèn năng lực giữ lòng cảm thông trong khi vẫn thương lượng ranh giới, quyền quyết định và trách nhiệm rõ",
    ],
    challenges: [
      "Dễ quy động lực kiểm soát cho phía khác trong khi chưa nhận ra lý tưởng hoặc vai trò cứu giúp của mình cũng có thể tạo sức ép",
      "Có thể dao động giữa hòa theo một ảnh hưởng mạnh và rút lui khi thất vọng, khiến nhu cầu thật và ranh giới tâm lý khó được nói rõ",
    ],
    developmentAdvice: [
      "Gọi tên điều đã xảy ra, điều đang được suy diễn và quyền lợi của từng phía trước khi quyết định tin, giúp đỡ, rút lui hay đối đầu",
      "Dùng thỏa thuận, giới hạn thời gian và cơ chế phản hồi để bảo vệ lòng cảm thông khỏi projection và bảo vệ chuyển hóa khỏi đấu quyền lực",
    ],
    evidence: { body1: "Neptune", body2: "Pluto", aspect: "opposition" },
  },
  {
    ruleId: "WESTERN-ASPECT-NEPTUNE-PLUTO-TRINE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Neptune",
    body2: "Pluto",
    aspect: "trine",
    title: "Sao Hải Vương tam hợp Sao Diêm Vương",
    coreMeaning:
      "Trực giác, tưởng tượng và khả năng chuyển hóa sâu thường phối hợp khá tự nhiên, giúp bạn dễ cảm nhận những tầng nghĩa hoặc động lực chưa được nói rõ. Dòng phối hợp này có thể hỗ trợ sáng tạo, lòng cảm thông và việc tái cấu trúc từ bên trong; tuy vậy, sự liền mạch của cảm nhận không bảo đảm cách diễn giải là đúng và có thể khiến ảnh hưởng hoặc giả định sâu ít được kiểm chứng.",
    strengths: [
      "Thường có khả năng nối trải nghiệm tinh tế với mô thức nền, từ đó tạo hiểu biết hoặc hình thức biểu đạt có chiều sâu và sức chuyển hóa",
      "Có thể giữ sự nhạy cảm trong quá trình loại bỏ điều không còn phù hợp, giúp thay đổi không chỉ dựa trên sức ép mà còn trên ý nghĩa",
    ],
    challenges: [
      "Dễ quá tin vào khả năng đọc động lực sâu của mình và đánh giá thấp những giải thích đơn giản hoặc phản hồi không khớp cảm nhận",
      "Có thể duy trì một tầm nhìn giàu ý nghĩa nhờ sức hút nội tâm, dù tác động thực tế hoặc quan hệ quyền lực cần được xem xét lại",
    ],
    developmentAdvice: [
      "Kiểm tra trực giác bằng dữ kiện, nhiều góc nhìn và kết quả quan sát được trước khi dùng nó làm nền cho quyết định có ảnh hưởng lớn",
      "Giữ chiều sâu sáng tạo nhưng định kỳ xem lại ranh giới và quyền quyết định để cảm thông không che khuất chi phí hay mất cân bằng quyền lực",
    ],
    evidence: { body1: "Neptune", body2: "Pluto", aspect: "trine" },
  },
  {
    ruleId: "WESTERN-ASPECT-NEPTUNE-PLUTO-SQUARE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Neptune",
    body2: "Pluto",
    aspect: "square",
    title: "Sao Hải Vương vuông Sao Diêm Vương",
    coreMeaning:
      "Ma sát giữa lý tưởng, sự mơ hồ hoặc xu hướng hòa tan ranh giới với sức ép quyền lực, kiểm soát và chuyển hóa sâu có thể làm động cơ thật khó nhìn rõ. Bạn có thể lý tưởng hóa một ảnh hưởng mạnh hoặc tăng cường độ để thoát khỏi cảm giác mất phương hướng; mặt xây dựng của sức căng này là buộc hình dung phải đối diện dữ kiện và buộc quyền lực phải được gọi tên trước khi tái cấu trúc.",
    strengths: [
      "Có thể phát triển năng lực nhận diện nơi một câu chuyện giàu ý nghĩa đang che giấu nỗi sợ, lợi ích hoặc mô thức kiểm soát cần được xem xét",
      "Ma sát lặp lại có thể rèn khả năng chịu đựng sự chưa rõ mà vẫn tìm bằng chứng, ranh giới và bước thay đổi thực tế",
    ],
    challenges: [
      "Dễ mắc kẹt giữa nghi ngờ và tin tuyệt đối, khiến phản ứng với người hoặc mục tiêu mang sức hút mạnh trở nên thiếu nhất quán",
      "Có thể dùng hy vọng để trì hoãn việc xử lý mất cân bằng quyền lực, hoặc dùng kiểm soát để ép sự mơ hồ thành một câu trả lời duy nhất",
    ],
    developmentAdvice: [
      "Viết rõ dữ kiện, giả định, quyền lợi và điều chưa biết trước khi tăng cam kết, trao quyền hoặc thực hiện thay đổi khó đảo ngược",
      "Thu hẹp vấn đề thành bước có thể kiểm chứng, đặt ranh giới và dùng phản hồi để sửa cả câu chuyện lý tưởng lẫn chiến lược kiểm soát",
    ],
    evidence: { body1: "Neptune", body2: "Pluto", aspect: "square" },
  },
  {
    ruleId: "WESTERN-ASPECT-NEPTUNE-PLUTO-SEXTILE-V1",
    rulesetId: "western-aspect-interpretation-v1",
    version: "1.0.0",
    body1: "Neptune",
    body2: "Pluto",
    aspect: "sextile",
    title: "Sao Hải Vương lục hợp Sao Diêm Vương",
    coreMeaning:
      "Trực giác, tưởng tượng và chiều sâu mở ra cơ hội tạo một thay đổi có ý nghĩa khi bạn chủ động kết nối chúng. Tiềm năng này có thể giúp một cảm nhận tinh tế dẫn tới việc nhận diện mô thức nền và tái cấu trúc có chọn lọc; nhưng nó không tự vận hành như tam hợp, nên cần câu hỏi cụ thể, hành động thực tế và tiêu chí phản hồi rõ.",
    strengths: [
      "Có thể nhận ra cơ hội dùng sáng tạo hoặc lòng cảm thông để tiếp cận một vấn đề sâu mà cách xử lý bề mặt chưa giải quyết được",
      "Khi chủ động khai thác, bạn có cơ hội biến hiểu biết biểu tượng thành bước thay đổi vừa sức, có ranh giới và tác động quan sát được",
    ],
    challenges: [
      "Dễ cảm thấy một vấn đề có chiều sâu nhưng chưa chọn điểm can thiệp, khiến trực giác vẫn ở dạng hình dung thay vì thay đổi cụ thể",
      "Có thể bắt đầu với ý nghĩa lớn mà thiếu phạm vi quyền hạn và thước đo, nên khó biết phần chuyển hóa nào thực sự tạo giá trị",
    ],
    developmentAdvice: [
      "Chọn một mô thức cụ thể, xác định dữ kiện cần kiểm tra, phạm vi ảnh hưởng, thời hạn và kết quả tối thiểu trước khi hành động",
      "Giữ phần hữu ích sau phản hồi, điều chỉnh phần dựa trên projection và chỉ mở rộng khi thay đổi vừa có ý nghĩa vừa tạo tác động thực tế",
    ],
    evidence: { body1: "Neptune", body2: "Pluto", aspect: "sextile" },
  },
] as const satisfies ReadonlyArray<AspectInterpretationRule>;
