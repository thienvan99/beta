export const westernPlanetHouseBodies = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
] as const;

export type WesternPlanetHouseBody =
  (typeof westernPlanetHouseBodies)[number];

export type PlanetHouseInterpretationRule = Readonly<{
  ruleId: string;
  rulesetId: "western-planet-house-v1";
  version: "1.0.0";
  title: string;
  coreMeaning: string;
  strengths: ReadonlyArray<string>;
  challenges: ReadonlyArray<string>;
  developmentDirection: ReadonlyArray<string>;
  evidence: Readonly<{
    body: WesternPlanetHouseBody;
    house: number;
  }>;
}>;

export const westernPlanetHouseInterpretationRules: ReadonlyArray<PlanetHouseInterpretationRule> =
  [
    {
      ruleId: "WESTERN-SUN-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 1",
      coreMeaning:
        "Mặt Trời ở Nhà 1 nhấn mạnh nhu cầu thể hiện bản sắc một cách trực tiếp và chủ động hiện diện trong cuộc sống. Vị trí này thường được đọc như một lời mời phát triển ý thức rõ ràng về mình là ai, thay vì chỉ định nghĩa bản thân qua kỳ vọng của người khác.",
      strengths: [
        "Có xu hướng chủ động khởi xướng và tạo dấu ấn cá nhân",
        "Dễ truyền cho người khác cảm giác rõ ràng về điều mình đại diện",
      ],
      challenges: [
        "Có thể quá tập trung vào cách mình xuất hiện hoặc được nhìn nhận",
        "Dễ phản ứng phòng vệ khi cảm giác bản sắc bị phủ nhận",
      ],
      developmentDirection: [
        "Xây dựng sự tự tin từ trải nghiệm và giá trị thực, không chỉ từ sự chú ý bên ngoài",
        "Giữ quyền chủ động đồng thời dành không gian để lắng nghe tác động của mình lên người khác",
      ],
      evidence: { body: "Sun", house: 1 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 2",
      coreMeaning:
        "Mặt Trời ở Nhà 2 thường đặt trọng tâm bản sắc vào việc xây dựng giá trị, năng lực và nguồn lực có thể dựa vào. Sự tự tin có xu hướng lớn dần khi bạn nhận ra điều mình thật sự coi trọng và tạo được nền tảng ổn định bằng khả năng của chính mình.",
      strengths: [
        "Có thể kiên trì phát triển kỹ năng và nguồn lực theo thời gian",
        "Thường có ý thức rõ về chất lượng và giá trị thực tế",
      ],
      challenges: [
        "Có thể gắn giá trị bản thân quá chặt với sở hữu hoặc thành quả vật chất",
        "Dễ giữ cách làm quen thuộc vì lo mất cảm giác an toàn",
      ],
      developmentDirection: [
        "Phân biệt giá trị nội tại với những gì đang sở hữu hoặc kiếm được",
        "Dùng nguồn lực nhất quán với ưu tiên dài hạn thay vì chỉ tích lũy để yên tâm",
      ],
      evidence: { body: "Sun", house: 2 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 3",
      coreMeaning:
        "Mặt Trời ở Nhà 3 thường biểu đạt bản sắc qua học hỏi, trao đổi và việc kết nối những điều diễn ra gần mình. Bạn có thể cảm thấy sống động hơn khi được đặt câu hỏi, diễn đạt quan điểm và biến thông tin thành điều người khác dễ hiểu.",
      strengths: [
        "Có xu hướng chủ động giao tiếp và chia sẻ điều đã học",
        "Có thể làm sáng rõ một chủ đề bằng cách gọi tên và kết nối ý tưởng",
      ],
      challenges: [
        "Dễ đồng nhất mình với quan điểm cá nhân và khó lắng nghe ý kiến trái chiều",
        "Có thể phân tán khi quá nhiều thông tin cùng đòi hỏi sự chú ý",
      ],
      developmentDirection: [
        "Rèn thói quen kiểm chứng và hoàn thiện một ý tưởng trước khi chuyển sang chủ đề mới",
        "Dùng giao tiếp hai chiều để vừa thể hiện tiếng nói vừa mở rộng góc nhìn",
      ],
      evidence: { body: "Sun", house: 3 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 4",
      coreMeaning:
        "Mặt Trời ở Nhà 4 thường hướng sự chú ý về gốc rễ, đời sống riêng tư và cảm giác có một nơi thật sự thuộc về. Bản sắc có thể phát triển mạnh khi bạn hiểu câu chuyện gia đình của mình và chủ động tạo nền tảng cảm xúc phù hợp cho hiện tại.",
      strengths: [
        "Có khả năng tạo sự ấm áp và tính liên tục trong không gian thân thuộc",
        "Thường quan tâm đến việc xây dựng một nền tảng riêng bền vững",
      ],
      challenges: [
        "Có thể để kỳ vọng gia đình chi phối quá nhiều cách nhìn về bản thân",
        "Dễ thu mình vào vùng quen thuộc khi đời sống bên ngoài gây áp lực",
      ],
      developmentDirection: [
        "Giữ điều có ý nghĩa từ nguồn cội nhưng cho phép mình định nghĩa lại cảm giác thuộc về",
        "Nuôi dưỡng đời sống riêng như nguồn hồi phục, không phải nơi tránh mọi thay đổi",
      ],
      evidence: { body: "Sun", house: 4 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 5",
      coreMeaning:
        "Mặt Trời ở Nhà 5 thường tìm thấy sức sống qua sáng tạo, niềm vui và những cách biểu đạt mang dấu ấn cá nhân. Vị trí này có thể khuyến khích bạn thử nghiệm, chơi và đưa điều mình yêu thích thành một hình thức có thể chia sẻ.",
      strengths: [
        "Có xu hướng biểu đạt ấm áp, giàu sức sống và khuyến khích người khác",
        "Có thể mạnh dạn đưa ý tưởng cá nhân thành sản phẩm hoặc trải nghiệm cụ thể",
      ],
      challenges: [
        "Dễ phụ thuộc vào sự tán thưởng để duy trì hứng thú sáng tạo",
        "Có thể chiếm nhiều không gian thể hiện hơn mức tình huống cần",
      ],
      developmentDirection: [
        "Duy trì một thực hành sáng tạo đem lại niềm vui ngay cả khi không có khán giả",
        "Chia sẻ sân khấu và giúp niềm vui cá nhân tạo thêm sinh khí cho tập thể",
      ],
      evidence: { body: "Sun", house: 5 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 6",
      coreMeaning:
        "Mặt Trời ở Nhà 6 thường phát triển bản sắc qua công việc hằng ngày, kỹ năng và khả năng đóng góp một cách hữu ích. Sự tự tin có thể đến từ việc cải thiện quy trình, chăm chút chất lượng và thấy nỗ lực nhỏ tạo ra kết quả thực tế.",
      strengths: [
        "Có xu hướng tận tâm với tay nghề, trách nhiệm và chất lượng công việc",
        "Có thể nhận ra điểm cần điều chỉnh để một hệ thống vận hành tốt hơn",
      ],
      challenges: [
        "Dễ đánh giá bản thân chủ yếu qua năng suất hoặc mức độ hữu ích",
        "Có thể theo đuổi sự hoàn hảo đến mức khó ghi nhận tiến bộ",
      ],
      developmentDirection: [
        "Xây dựng nhịp làm việc bền vững có cả giới hạn và thời gian hồi phục",
        "Xem kỹ năng là phương tiện biểu đạt giá trị, không phải thước đo duy nhất của bản thân",
      ],
      evidence: { body: "Sun", house: 6 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 7",
      coreMeaning:
        "Mặt Trời ở Nhà 7 thường làm nổi bật quá trình hiểu mình qua quan hệ một-một, hợp tác và đối thoại với người khác. Bạn có thể phát triển bản sắc khi học cách vừa cam kết với một mối quan hệ vừa hiện diện như một cá nhân có tiếng nói riêng.",
      strengths: [
        "Có xu hướng đầu tư nghiêm túc vào hợp tác và các thỏa thuận đôi bên",
        "Có thể nhìn thấy phẩm chất của mình rõ hơn qua phản hồi trực tiếp từ người khác",
      ],
      challenges: [
        "Dễ để sự công nhận của đối tác quyết định cảm nhận về bản thân",
        "Có thể nhường quyền định hướng quá nhiều để duy trì hòa khí",
      ],
      developmentDirection: [
        "Làm rõ nhu cầu và ranh giới cá nhân trước khi tìm điểm chung",
        "Chọn quan hệ khuyến khích cả hợp tác lẫn sự trưởng thành độc lập của mỗi bên",
      ],
      evidence: { body: "Sun", house: 7 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 8",
      coreMeaning:
        "Mặt Trời ở Nhà 8 thường hướng bản sắc về những trải nghiệm cần chiều sâu, lòng tin và sự chia sẻ nguồn lực hoặc trách nhiệm. Bạn có thể khám phá sức mạnh cá nhân khi dám nhìn vào điều phức tạp, thay đổi cách gắn bó và tái định nghĩa mình sau những giai đoạn chuyển tiếp.",
      strengths: [
        "Có xu hướng kiên định khi cần đi sâu vào vấn đề khó hoặc chưa rõ",
        "Có thể quản lý trách nhiệm chung với mức độ tập trung và cam kết cao",
      ],
      challenges: [
        "Dễ muốn kiểm soát khi sự phụ thuộc hoặc lòng tin tạo cảm giác dễ tổn thương",
        "Có thể giữ kín nhu cầu quá lâu rồi mới bộc lộ khi áp lực đã lớn",
      ],
      developmentDirection: [
        "Xây dựng lòng tin bằng thỏa thuận rõ ràng và những bước chia sẻ có giới hạn",
        "Cho phép thay đổi diễn ra theo từng giai đoạn thay vì xem mọi chuyển tiếp là mất mát bản sắc",
      ],
      evidence: { body: "Sun", house: 8 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 9",
      coreMeaning:
        "Mặt Trời ở Nhà 9 thường phát triển bản sắc qua việc mở rộng thế giới quan, học hỏi có chiều sâu và tiếp xúc với những hệ tư tưởng hoặc môi trường khác biệt. Bạn có thể cảm thấy có định hướng khi kinh nghiệm riêng kết nối được với một ý nghĩa rộng hơn.",
      strengths: [
        "Có xu hướng tìm bức tranh lớn và truyền đạt một tầm nhìn có ý nghĩa",
        "Có thể chủ động bước ra khỏi khuôn khổ quen thuộc để học từ trải nghiệm mới",
      ],
      challenges: [
        "Dễ bảo vệ niềm tin cá nhân như thể đó là câu trả lời duy nhất",
        "Có thể say mê tầm nhìn lớn nhưng bỏ qua chi tiết cần thiết để hiện thực hóa",
      ],
      developmentDirection: [
        "Giữ niềm tin đủ mạnh để định hướng nhưng đủ mở để được dữ liệu mới điều chỉnh",
        "Biến điều đã học thành lựa chọn và cam kết cụ thể trong đời sống thường ngày",
      ],
      evidence: { body: "Sun", house: 9 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 10",
      coreMeaning:
        "Mặt Trời ở Nhà 10 thường đặt trọng tâm bản sắc vào vai trò công chúng, trách nhiệm và hướng đóng góp lâu dài. Bạn có thể phát triển sự tự tin khi xây dựng uy tín bằng năng lực thực tế và theo đuổi một con đường phản ánh điều mình muốn đại diện.",
      strengths: [
        "Có xu hướng chủ động nhận trách nhiệm và hướng tới mục tiêu dài hạn",
        "Có thể tạo ảnh hưởng rõ ràng khi vai trò công việc phù hợp với giá trị cá nhân",
      ],
      challenges: [
        "Dễ gắn giá trị bản thân với chức danh, thành tích hoặc cách công chúng nhìn nhận",
        "Có thể mang áp lực phải luôn tỏ ra vững vàng và có năng lực",
      ],
      developmentDirection: [
        "Định nghĩa thành công bằng chất lượng đóng góp bên cạnh vị thế bên ngoài",
        "Xây dựng thẩm quyền qua trách nhiệm nhất quán mà vẫn giữ chỗ cho đời sống riêng",
      ],
      evidence: { body: "Sun", house: 10 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 11",
      coreMeaning:
        "Mặt Trời ở Nhà 11 thường biểu đạt bản sắc qua cộng đồng, tình bạn và những mục tiêu hướng tới tương lai. Bạn có thể tỏa sáng khi đóng góp nét riêng cho một mạng lưới hoặc lý tưởng chung mà không đánh mất tiếng nói cá nhân.",
      strengths: [
        "Có xu hướng kết nối con người quanh một tầm nhìn hoặc mục tiêu chung",
        "Có thể nhìn thấy tiềm năng dài hạn của nhóm và khuyến khích sự tham gia",
      ],
      challenges: [
        "Dễ đồng nhất bản thân với vai trò trong nhóm hoặc nhu cầu được cộng đồng công nhận",
        "Có thể ưu tiên lý tưởng tập thể đến mức bỏ qua nhu cầu gần gũi của từng cá nhân",
      ],
      developmentDirection: [
        "Chọn cộng đồng cho phép khác biệt cá nhân trở thành một phần của đóng góp chung",
        "Chuyển tầm nhìn tương lai thành hành động hợp tác có phạm vi và trách nhiệm rõ",
      ],
      evidence: { body: "Sun", house: 11 },
    },
    {
      ruleId: "WESTERN-SUN-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trời ở Nhà 12",
      coreMeaning:
        "Mặt Trời ở Nhà 12 thường hướng sự chú ý vào đời sống nội tâm, khoảng lặng và những đóng góp không nhất thiết diễn ra trước công chúng. Bản sắc có thể trở nên rõ hơn khi bạn có không gian suy ngẫm, kết nối với lòng trắc ẩn và nhận biết những động lực khó gọi tên.",
      strengths: [
        "Có xu hướng nhạy với bối cảnh tinh tế và những nhu cầu ít được nói ra",
        "Có thể đóng góp bền bỉ trong vai trò hậu trường hoặc công việc cần sự tĩnh lặng",
      ],
      challenges: [
        "Dễ thu nhỏ sự hiện diện của mình hoặc chờ quá lâu trước khi bộc lộ mong muốn",
        "Có thể thiếu ranh giới khi đồng cảm với hoàn cảnh và nhu cầu của người khác",
      ],
      developmentDirection: [
        "Duy trì khoảng riêng để lắng nghe bản thân nhưng vẫn chọn những cách hiện diện cụ thể",
        "Đặt ranh giới rõ cho việc giúp đỡ để lòng trắc ẩn đi cùng khả năng tự chăm sóc",
      ],
      evidence: { body: "Sun", house: 12 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 1",
      coreMeaning:
        "Mặt Trăng ở Nhà 1 thường khiến nhu cầu cảm xúc và phản ứng bản năng hiện khá rõ trong cách bạn bước vào tình huống mới. Cảm giác an toàn có thể gắn với việc được sống đúng nhịp cảm nhận của mình và có quyền điều chỉnh cách hiện diện khi tâm trạng thay đổi.",
      strengths: [
        "Có xu hướng nhận biết nhanh bầu không khí và phản ứng của người đối diện",
        "Có thể biểu đạt sự quan tâm bằng thái độ gần gũi và chân thật",
      ],
      challenges: [
        "Dễ để tâm trạng nhất thời ảnh hưởng mạnh đến cách mình xuất hiện",
        "Có thể nhạy cảm với phản hồi về diện mạo hoặc phong cách cá nhân",
      ],
      developmentDirection: [
        "Tạo một khoảng dừng để phân biệt phản ứng tức thời với nhu cầu lâu dài",
        "Xây dựng cách tự trấn an để vẫn hiện diện rõ ràng khi cảm xúc biến động",
      ],
      evidence: { body: "Moon", house: 1 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 2",
      coreMeaning:
        "Mặt Trăng ở Nhà 2 thường liên kết cảm giác an toàn với sự ổn định, nguồn lực quen thuộc và những giá trị có thể nương tựa. Thói quen chăm sóc bản thân có xu hướng trở nên hiệu quả khi đời sống vật chất có nhịp đều và bạn biết điều gì thực sự đem lại cảm giác đủ đầy.",
      strengths: [
        "Có thể nhạy với nhu cầu thực tế và biết duy trì nguồn lực thiết yếu",
        "Thường tạo cảm giác vững chãi qua những thói quen giản dị, đều đặn",
      ],
      challenges: [
        "Dễ tìm sự yên tâm chủ yếu qua mua sắm, tích trữ hoặc giữ chặt điều quen thuộc",
        "Có thể thấy bất an khi thu nhập hay nhịp sinh hoạt thay đổi",
      ],
      developmentDirection: [
        "Xây dựng nhiều nguồn an toàn, gồm kỹ năng, quan hệ và khả năng tự điều hòa",
        "Quan sát cảm xúc trước khi dùng vật chất hoặc tiện nghi để làm dịu tức thời",
      ],
      evidence: { body: "Moon", house: 2 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 3",
      coreMeaning:
        "Mặt Trăng ở Nhà 3 thường xử lý cảm xúc qua lời nói, học hỏi và những trao đổi hằng ngày. Cảm giác an toàn có thể tăng khi bạn gọi tên được điều đang diễn ra, có người lắng nghe và duy trì kết nối với môi trường gần gũi.",
      strengths: [
        "Có xu hướng ghi nhận sắc thái cảm xúc trong ngôn ngữ và câu chuyện",
        "Có thể giúp người khác dễ chia sẻ bằng cách trò chuyện gần gũi",
      ],
      challenges: [
        "Dễ suy nghĩ liên tục về cảm xúc thay vì cho mình thời gian trực tiếp cảm nhận",
        "Có thể thay đổi quan điểm theo tâm trạng hoặc thông tin vừa tiếp nhận",
      ],
      developmentDirection: [
        "Kết hợp viết hoặc trò chuyện với việc nhận biết cảm giác trong cơ thể",
        "Chọn một kênh trao đổi tin cậy thay vì phân tán câu chuyện qua quá nhiều nơi",
      ],
      evidence: { body: "Moon", house: 3 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 4",
      coreMeaning:
        "Mặt Trăng ở Nhà 4 thường nhấn mạnh nhu cầu có một nơi chốn thân thuộc, đời sống riêng đủ an toàn và mối liên hệ với ký ức hoặc gia đình. Cảm xúc có thể được phục hồi tốt nhất khi bạn được trở về một không gian không cần liên tục phòng bị hay thể hiện.",
      strengths: [
        "Có xu hướng nuôi dưỡng sự gắn bó và giữ gìn những điều tạo cảm giác thuộc về",
        "Có thể tạo không gian riêng ấm áp, nhạy với nhu cầu của người thân",
      ],
      challenges: [
        "Dễ mang theo những thói quen cảm xúc của gia đình mà chưa xem chúng còn phù hợp hay không",
        "Có thể thu mình quá lâu khi cảm thấy môi trường bên ngoài thiếu an toàn",
      ],
      developmentDirection: [
        "Chủ động xây dựng định nghĩa riêng về mái nhà và sự thuộc về trong hiện tại",
        "Giữ kết nối với nguồn cội đồng thời tạo ranh giới cho đời sống cảm xúc cá nhân",
      ],
      evidence: { body: "Moon", house: 4 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 5",
      coreMeaning:
        "Mặt Trăng ở Nhà 5 thường tìm cảm giác an toàn qua sáng tạo, vui chơi, tình cảm ấm áp và quyền biểu đạt điều mình đang cảm nhận. Đời sống nội tâm có thể được nuôi dưỡng khi bạn cho phép mình làm điều đem lại niềm vui mà không cần mọi kết quả đều hữu dụng.",
      strengths: [
        "Có thể đưa cảm xúc vào sáng tạo theo cách sống động và dễ chạm tới người khác",
        "Thường biết khích lệ niềm vui, sự hồn nhiên và khả năng tự biểu đạt",
      ],
      challenges: [
        "Dễ thấy hụt hẫng khi sự quan tâm hoặc biểu đạt tình cảm không được đáp lại như mong đợi",
        "Có thể để cảm hứng nhất thời quyết định mức độ gắn bó với một hoạt động",
      ],
      developmentDirection: [
        "Duy trì một hình thức sáng tạo đều đặn thay vì chỉ chờ đúng tâm trạng",
        "Học cách tự ghi nhận niềm vui của mình trước khi tìm sự hưởng ứng bên ngoài",
      ],
      evidence: { body: "Moon", house: 5 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 6",
      coreMeaning:
        "Mặt Trăng ở Nhà 6 thường gắn cảm giác an toàn với nhịp sinh hoạt có trật tự, công việc hữu ích và những cách chăm sóc cụ thể. Tâm trạng có thể nhạy với lịch trình hằng ngày, vì vậy các thói quen nhỏ và khả thi thường giúp đời sống nội tâm ổn định hơn.",
      strengths: [
        "Có xu hướng nhận ra nhu cầu thực tế và chăm sóc qua hành động cụ thể",
        "Có thể thích nghi quy trình hằng ngày theo tín hiệu của hoàn cảnh",
      ],
      challenges: [
        "Dễ lo lắng khi lịch trình xáo trộn hoặc công việc còn dang dở",
        "Có thể chăm lo cho nhiệm vụ và người khác trước khi nhận ra mình cần nghỉ",
      ],
      developmentDirection: [
        "Thiết kế thói quen đủ linh hoạt để hỗ trợ thay vì kiểm soát cảm xúc",
        "Đưa nghỉ ngơi và nhu cầu riêng vào lịch như một phần của trách nhiệm hằng ngày",
      ],
      evidence: { body: "Moon", house: 6 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 7",
      coreMeaning:
        "Mặt Trăng ở Nhà 7 thường tìm cảm giác an toàn qua quan hệ một-một, sự đồng hành và phản hồi cảm xúc từ người đối diện. Bạn có thể hiểu nhu cầu bên trong rõ hơn khi ở trong một mối quan hệ cho phép cả hai bên lắng nghe và điều chỉnh cùng nhau.",
      strengths: [
        "Có xu hướng nhạy với trạng thái của đối tác và nhu cầu cân bằng trong quan hệ",
        "Có thể tạo sự gần gũi bằng tinh thần hợp tác và quan tâm đến đôi bên",
      ],
      challenges: [
        "Dễ để tâm trạng hoặc sự hiện diện của người khác quyết định cảm giác yên ổn của mình",
        "Có thể nhường nhu cầu riêng để tránh căng thẳng rồi tích tụ khó chịu",
      ],
      developmentDirection: [
        "Gọi tên nhu cầu cá nhân trước khi thương lượng cách đáp ứng trong quan hệ",
        "Nuôi dưỡng khả năng tự trấn an để sự gắn bó đi cùng quyền tự chủ cảm xúc",
      ],
      evidence: { body: "Moon", house: 7 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 8",
      coreMeaning:
        "Mặt Trăng ở Nhà 8 thường cần chiều sâu, lòng tin và sự trung thực trong những gắn bó có chia sẻ nguồn lực hoặc trách nhiệm. Phản ứng bản năng có thể mạnh khi ranh giới thân mật chưa rõ, và cảm giác an toàn thường lớn dần qua những cam kết được kiểm chứng theo thời gian.",
      strengths: [
        "Có xu hướng cảm nhận tinh tế những điều chưa được nói trong mối quan hệ sâu",
        "Có thể ở lại với cảm xúc phức tạp và hỗ trợ quá trình chuyển đổi chung",
      ],
      challenges: [
        "Dễ giữ phòng vệ hoặc muốn kiểm soát khi lòng tin chưa chắc chắn",
        "Có thể hấp thụ gánh nặng cảm xúc chung mà không phân biệt phần trách nhiệm của mình",
      ],
      developmentDirection: [
        "Xây dựng lòng tin qua thỏa thuận rõ, ranh giới cụ thể và chia sẻ từng bước",
        "Phân biệt đồng cảm với việc phải mang thay cảm xúc hoặc trách nhiệm của người khác",
      ],
      evidence: { body: "Moon", house: 8 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 9",
      coreMeaning:
        "Mặt Trăng ở Nhà 9 thường tìm sự an toàn trong một thế giới quan có ý nghĩa, cơ hội học hỏi và cảm giác còn không gian để khám phá. Đời sống nội tâm có thể được làm mới khi bạn tiếp xúc với những góc nhìn khác, nhưng vẫn cần một niềm tin đủ linh hoạt để chứa trải nghiệm thực tế.",
      strengths: [
        "Có xu hướng hồi phục qua học hỏi, thay đổi bối cảnh và mở rộng góc nhìn",
        "Có thể truyền cảm giác hy vọng bằng cách kết nối trải nghiệm với ý nghĩa rộng hơn",
      ],
      challenges: [
        "Dễ dùng niềm tin hoặc sự lạc quan để đi vòng qua cảm xúc khó chịu",
        "Có thể thấy bồn chồn khi nhịp sống thiếu trải nghiệm mới hoặc mục tiêu lớn",
      ],
      developmentDirection: [
        "Cho phép cảm xúc được thừa nhận trước khi tìm bài học hoặc lời giải thích",
        "Tạo cảm giác mở rộng qua học tập đều đặn, không chỉ qua những thay đổi lớn",
      ],
      evidence: { body: "Moon", house: 9 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 10",
      coreMeaning:
        "Mặt Trăng ở Nhà 10 thường liên kết nhu cầu cảm xúc với vai trò công chúng, cảm giác được cần đến và khả năng tạo đóng góp có ý nghĩa. Tâm trạng có thể nhạy với phản hồi về công việc hoặc uy tín, nên sự an toàn bền hơn khi mục tiêu bên ngoài phù hợp với nhu cầu bên trong.",
      strengths: [
        "Có xu hướng nhận biết nhu cầu của tập thể và điều chỉnh vai trò một cách linh hoạt",
        "Có thể mang sự quan tâm, tính đáp ứng và cảm nhận con người vào công việc",
      ],
      challenges: [
        "Dễ để phản hồi công chúng hoặc biến động nghề nghiệp ảnh hưởng mạnh đến tâm trạng",
        "Có thể che nhu cầu riêng để duy trì hình ảnh đáng tin cậy",
      ],
      developmentDirection: [
        "Tách giá trị cảm xúc cá nhân khỏi từng chu kỳ công nhận hay thành tích bên ngoài",
        "Chọn trách nhiệm công chúng có nhịp độ cho phép duy trì đời sống riêng và sự hồi phục",
      ],
      evidence: { body: "Moon", house: 10 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 11",
      coreMeaning:
        "Mặt Trăng ở Nhà 11 thường tìm cảm giác thuộc về qua tình bạn, cộng đồng và những mục tiêu được chia sẻ. Nhu cầu cảm xúc có thể thay đổi theo bầu không khí nhóm, trong khi cảm giác an toàn sâu hơn đến từ mạng lưới tôn trọng cả sự gắn kết lẫn khác biệt cá nhân.",
      strengths: [
        "Có xu hướng cảm nhận nhịp cảm xúc của cộng đồng và tạo không khí đón nhận",
        "Có thể chăm sóc tình bạn bằng sự hiện diện đều đặn và tinh thần cùng hướng tới tương lai",
      ],
      challenges: [
        "Dễ cảm thấy bị bỏ rơi khi vị trí trong nhóm thay đổi hoặc phản hồi trở nên thưa thớt",
        "Có thể điều chỉnh cảm xúc quá nhiều để phù hợp với kỳ vọng cộng đồng",
      ],
      developmentDirection: [
        "Đầu tư vào một vài kết nối tin cậy bên cạnh việc tham gia mạng lưới rộng",
        "Giữ liên hệ với nhu cầu riêng trước khi nhận vai trò chăm sóc cảm xúc cho cả nhóm",
      ],
      evidence: { body: "Moon", house: 11 },
    },
    {
      ruleId: "WESTERN-MOON-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Mặt Trăng ở Nhà 12",
      coreMeaning:
        "Mặt Trăng ở Nhà 12 thường có đời sống nội tâm cần nhiều khoảng lặng để nhận ra cảm xúc đã hấp thụ từ môi trường. Cảm giác an toàn có thể được nuôi dưỡng qua nghỉ ngơi, suy ngẫm và những hoạt động riêng tư giúp bạn phân biệt điều mình đang cảm nhận với bầu không khí xung quanh.",
      strengths: [
        "Có xu hướng cảm nhận những sắc thái tinh tế và nhu cầu khó được diễn đạt",
        "Có thể tìm thấy sự nâng đỡ qua tưởng tượng, chiêm nghiệm và đóng góp thầm lặng",
      ],
      challenges: [
        "Dễ bỏ qua nhu cầu của mình cho đến khi cảm xúc trở nên quá đầy",
        "Có thể rút lui mà chưa nói rõ giới hạn hoặc lý do cần khoảng riêng",
      ],
      developmentDirection: [
        "Tạo nhịp nghỉ và cách gọi tên cảm xúc đều đặn trước khi chúng tích tụ",
        "Giữ lòng trắc ẩn đi cùng ranh giới để sự nhạy cảm không trở thành gánh nặng kéo dài",
      ],
      evidence: { body: "Moon", house: 12 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 1",
      coreMeaning:
        "Sao Thủy ở Nhà 1 thường khiến tư duy và giao tiếp trở thành phần dễ nhận thấy trong cách bạn hiện diện. Bạn có xu hướng tìm hiểu tình huống bằng cách đặt câu hỏi, nói ra suy nghĩ và nhanh chóng tạo một góc nhìn riêng về điều đang diễn ra.",
      strengths: [
        "Có thể phản ứng nhanh bằng ngôn ngữ và chủ động mở đầu trao đổi",
        "Thường thể hiện sự tò mò, linh hoạt và khả năng gọi tên quan sát cá nhân",
      ],
      challenges: [
        "Dễ nói trước khi có đủ thời gian sắp xếp hoặc kiểm chứng suy nghĩ",
        "Có thể đồng nhất quá chặt bản thân với ý kiến đang giữ",
      ],
      developmentDirection: [
        "Tạo một nhịp quan sát trước khi biến phản ứng đầu tiên thành kết luận",
        "Xem việc thay đổi quan điểm khi có dữ liệu mới là dấu hiệu học hỏi, không phải mất bản sắc",
      ],
      evidence: { body: "Mercury", house: 1 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 2",
      coreMeaning:
        "Sao Thủy ở Nhà 2 thường hướng tư duy vào giá trị, kỹ năng, tài nguyên và những quyết định có tính thực tế. Bạn có thể tiếp nhận thông tin tốt hơn khi thấy ứng dụng cụ thể và thường muốn hiểu rõ một lựa chọn sẽ tạo ra giá trị bền vững như thế nào.",
      strengths: [
        "Có xu hướng phân tích chi phí, lợi ích và cách sử dụng nguồn lực rõ ràng",
        "Có thể biến kiến thức thành kỹ năng hoặc phương án thực hành hữu ích",
      ],
      challenges: [
        "Dễ giữ một ý tưởng quen thuộc vì nó tạo cảm giác chắc chắn",
        "Có thể suy nghĩ quá nhiều về giá trị đo đếm được mà bỏ qua ưu tiên khó định lượng",
      ],
      developmentDirection: [
        "Đặt tiêu chí ra quyết định dựa trên cả hiệu quả thực tế và giá trị cá nhân",
        "Thử nghiệm ý tưởng mới ở quy mô nhỏ trước khi bác bỏ vì chưa thấy lợi ích ngay",
      ],
      evidence: { body: "Mercury", house: 2 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 3",
      coreMeaning:
        "Sao Thủy ở Nhà 3 thường nhấn mạnh việc học hỏi, trao đổi thông tin và kết nối các quan sát hằng ngày. Tư duy có xu hướng được kích hoạt qua trò chuyện, đọc, viết và di chuyển giữa nhiều nguồn kiến thức gần gũi.",
      strengths: [
        "Có thể tiếp nhận nhanh, đặt câu hỏi đúng lúc và diễn đạt theo nhiều cách",
        "Thường giỏi kết nối thông tin từ môi trường gần thành câu chuyện dễ hiểu",
      ],
      challenges: [
        "Dễ phân tán giữa quá nhiều chủ đề hoặc luồng trao đổi cùng lúc",
        "Có thể ưu tiên tốc độ truyền đạt hơn độ sâu và độ chính xác",
      ],
      developmentDirection: [
        "Chọn một số chủ đề để theo đến kết luận hoặc sản phẩm cụ thể",
        "Tạo thói quen kiểm tra nguồn và dành khoảng yên để tổng hợp điều đã tiếp nhận",
      ],
      evidence: { body: "Mercury", house: 3 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 4",
      coreMeaning:
        "Sao Thủy ở Nhà 4 thường đưa tư duy về ký ức, gia đình, nguồn cội và những câu chuyện diễn ra trong không gian riêng. Bạn có thể cần sự yên tĩnh hoặc cảm giác thân thuộc để sắp xếp suy nghĩ, đồng thời học nhiều qua việc nhìn lại cách quá khứ định hình góc nhìn hiện tại.",
      strengths: [
        "Có xu hướng ghi nhớ sắc thái của câu chuyện gia đình và trải nghiệm riêng",
        "Có thể tạo đối thoại sâu khi môi trường đủ tin cậy và kín đáo",
      ],
      challenges: [
        "Dễ lặp lại một cách giải thích quen thuộc được tiếp nhận từ gia đình",
        "Có thể giữ suy nghĩ trong lòng quá lâu trước khi chia sẻ với người liên quan",
      ],
      developmentDirection: [
        "Phân biệt ký ức, cách diễn giải và dữ kiện hiện tại khi nhìn lại một vấn đề",
        "Xây dựng không gian trao đổi an toàn nhưng vẫn nói rõ điều cần được thảo luận",
      ],
      evidence: { body: "Mercury", house: 4 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 5",
      coreMeaning:
        "Sao Thủy ở Nhà 5 thường biểu đạt trí tuệ qua sáng tạo, kể chuyện, hài hước và những thử nghiệm mang dấu ấn cá nhân. Việc học có thể trở nên hấp dẫn hơn khi có yếu tố chơi, trình bày hoặc cơ hội biến ý tưởng thành một hình thức sinh động.",
      strengths: [
        "Có thể diễn đạt ý tưởng duyên dáng, giàu hình ảnh và thu hút sự chú ý",
        "Thường tìm được cách học hoặc hướng dẫn thông qua trò chơi và sáng tạo",
      ],
      challenges: [
        "Dễ ưu tiên phản ứng của khán giả hơn việc hoàn thiện chiều sâu ý tưởng",
        "Có thể chán nhanh khi quá trình sáng tạo bước sang giai đoạn chỉnh sửa đều đặn",
      ],
      developmentDirection: [
        "Duy trì một dự án sáng tạo đủ lâu để kỹ năng theo kịp cảm hứng",
        "Dùng khả năng trình bày để làm rõ nội dung thay vì chỉ tạo ấn tượng",
      ],
      evidence: { body: "Mercury", house: 5 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 6",
      coreMeaning:
        "Sao Thủy ở Nhà 6 thường hướng tư duy vào công việc thường nhật, kỹ năng, tổ chức và cách cải thiện quy trình. Bạn có xu hướng học bằng thực hành, phân tích chi tiết và điều chỉnh từng bước để một nhiệm vụ trở nên rõ ràng, chính xác hơn.",
      strengths: [
        "Có thể sắp xếp thông tin, phát hiện lỗi và xây dựng quy trình hữu dụng",
        "Thường diễn đạt nhiệm vụ cụ thể theo cách giúp người khác dễ thực hiện",
      ],
      challenges: [
        "Dễ sa vào chi tiết hoặc tiếp tục tối ưu khi kết quả đã đủ tốt",
        "Có thể để danh sách việc cần làm chiếm hết không gian suy nghĩ",
      ],
      developmentDirection: [
        "Xác định mức độ chính xác phù hợp với mục đích trước khi bắt đầu phân tích",
        "Tạo khoảng nghỉ và hệ thống ưu tiên để trí óc không phải giữ mọi việc cùng lúc",
      ],
      evidence: { body: "Mercury", house: 6 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 7",
      coreMeaning:
        "Sao Thủy ở Nhà 7 thường phát triển tư duy qua đối thoại, phản biện và trao đổi một-một. Bạn có thể nhìn rõ vấn đề hơn khi nghe một góc nhìn khác, đồng thời có xu hướng xem giao tiếp minh bạch là nền tảng quan trọng của hợp tác.",
      strengths: [
        "Có thể cân nhắc nhiều phía và tìm ngôn ngữ phù hợp để thương lượng",
        "Thường học nhanh qua phản hồi trực tiếp từ đối tác hoặc người cộng tác",
      ],
      challenges: [
        "Dễ do dự khi cố tìm một lập luận làm hài lòng tất cả các bên",
        "Có thể tranh luận để giữ kết nối trí tuệ nhưng bỏ qua điều cần quyết định",
      ],
      developmentDirection: [
        "Xác định quan điểm và tiêu chí riêng trước khi bước vào thương lượng",
        "Dùng đối thoại để đi tới hiểu biết và thỏa thuận cụ thể, không chỉ kéo dài phân tích",
      ],
      evidence: { body: "Mercury", house: 7 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 8",
      coreMeaning:
        "Sao Thủy ở Nhà 8 thường hướng trí óc tới điều phức tạp, kín đáo và những vấn đề liên quan lòng tin, nguồn lực chung hoặc động lực ẩn. Bạn có thể tiếp nhận thông tin bằng cách đào sâu, đặt câu hỏi khó và tìm mối liên hệ phía sau bề mặt.",
      strengths: [
        "Có xu hướng nghiên cứu kỹ và kiên trì với vấn đề chưa có lời giải rõ",
        "Có thể thảo luận chủ đề nhạy cảm với sự tập trung và tinh thần tìm hiểu bản chất",
      ],
      challenges: [
        "Dễ nghi ngờ quá mức hoặc tìm hàm ý ẩn khi dữ kiện chưa đủ",
        "Có thể giữ thông tin như một cách tự bảo vệ thay vì làm rõ kỳ vọng",
      ],
      developmentDirection: [
        "Phân biệt trực giác, giả thuyết và bằng chứng trong quá trình điều tra một vấn đề",
        "Thống nhất ranh giới bảo mật và cách trao đổi minh bạch khi xử lý việc chung",
      ],
      evidence: { body: "Mercury", house: 8 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 9",
      coreMeaning:
        "Sao Thủy ở Nhà 9 thường mở rộng tư duy qua triết lý, học vấn cao, ngôn ngữ và những thế giới quan khác nhau. Bạn có xu hướng tìm nguyên lý lớn phía sau thông tin và muốn diễn đạt điều đã học trong một hệ thống có ý nghĩa.",
      strengths: [
        "Có thể kết nối nhiều lĩnh vực để hình thành bức tranh rộng và định hướng học tập",
        "Thường hứng thú với việc truyền đạt kiến thức vượt khỏi bối cảnh quen thuộc",
      ],
      challenges: [
        "Dễ khái quát quá nhanh hoặc bỏ qua ngoại lệ không khớp với hệ tư tưởng đang dùng",
        "Có thể bảo vệ một kết luận lớn trước khi kiểm tra đủ chi tiết nền",
      ],
      developmentDirection: [
        "Đối chiếu niềm tin với nguồn, trải nghiệm và các lập luận có chất lượng khác nhau",
        "Kết hợp tư duy khái quát với ví dụ cụ thể để ý tưởng vừa rộng vừa kiểm chứng được",
      ],
      evidence: { body: "Mercury", house: 9 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 10",
      coreMeaning:
        "Sao Thủy ở Nhà 10 thường đưa năng lực tư duy, học tập và giao tiếp vào định hướng nghề nghiệp hoặc vai trò công chúng. Bạn có thể xây dựng uy tín qua cách tổ chức thông tin, trình bày quyết định và biến kiến thức thành đóng góp rõ ràng.",
      strengths: [
        "Có xu hướng giao tiếp có mục tiêu và điều chỉnh thông điệp theo bối cảnh chuyên môn",
        "Có thể dùng phân tích, viết, nói hoặc kết nối thông tin như một năng lực nghề nghiệp",
      ],
      challenges: [
        "Dễ để phản hồi về năng lực trí tuệ ảnh hưởng quá nhiều đến sự tự tin nghề nghiệp",
        "Có thể chọn cách nói an toàn cho hình ảnh thay vì nêu rõ điều cần thảo luận",
      ],
      developmentDirection: [
        "Xây dựng tiếng nói chuyên môn dựa trên bằng chứng, trách nhiệm và khả năng giải thích dễ hiểu",
        "Để mục tiêu nghề nghiệp định hướng việc học nhưng vẫn giữ không gian cho tò mò ngoài thành tích",
      ],
      evidence: { body: "Mercury", house: 10 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 11",
      coreMeaning:
        "Sao Thủy ở Nhà 11 thường phát triển ý tưởng qua mạng lưới, cộng đồng và trao đổi về tương lai. Bạn có xu hướng tiếp nhận nhiều góc nhìn trong nhóm, nhận ra mối liên hệ giữa con người và cùng người khác hình thành giải pháp cho mục tiêu chung.",
      strengths: [
        "Có thể kết nối ý tưởng và con người trong một mạng lưới thông tin rộng",
        "Thường cởi mở với cách nghĩ mới và những cuộc thảo luận hướng tới cải tiến",
      ],
      challenges: [
        "Dễ chạy theo quá nhiều ý tưởng tập thể mà thiếu trọng tâm thực hiện",
        "Có thể điều chỉnh quan điểm theo nhóm đến mức tiếng nói riêng trở nên mờ",
      ],
      developmentDirection: [
        "Chọn một số ý tưởng chung để chuyển thành bước thử nghiệm có người chịu trách nhiệm",
        "Đóng góp vào đối thoại tập thể bằng quan điểm rõ ràng và sẵn sàng cập nhật khi cần",
      ],
      evidence: { body: "Mercury", house: 11 },
    },
    {
      ruleId: "WESTERN-MERCURY-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thủy ở Nhà 12",
      coreMeaning:
        "Sao Thủy ở Nhà 12 thường cần khoảng lặng để xử lý thông tin, liên kết những quan sát tinh tế và diễn đạt điều chưa dễ gọi tên. Tư duy có thể hoạt động tốt trong không gian riêng, qua viết, tưởng tượng hoặc công việc hậu trường cần sự chú ý kín đáo.",
      strengths: [
        "Có xu hướng nhận ra sắc thái, biểu tượng và mối liên hệ ít hiển hiện",
        "Có thể suy ngẫm sâu và diễn đạt tinh tế khi có đủ thời gian chuẩn bị",
      ],
      challenges: [
        "Dễ giữ suy nghĩ ở dạng mơ hồ quá lâu thay vì kiểm tra bằng lời nói hoặc dữ kiện",
        "Có thể ngại trình bày ý tưởng khi chưa cảm thấy chúng hoàn toàn rõ ràng",
      ],
      developmentDirection: [
        "Dùng ghi chép hoặc sơ đồ để đưa suy nghĩ riêng tư thành cấu trúc có thể xem lại",
        "Chọn người và thời điểm phù hợp để thử diễn đạt, thay vì chờ mọi ý tưởng hoàn thiện tuyệt đối",
      ],
      evidence: { body: "Mercury", house: 12 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 1",
      coreMeaning:
        "Sao Kim ở Nhà 1 thường đưa nhu cầu hòa hợp, thẩm mỹ và kết nối vào cách bạn hiện diện ban đầu. Bạn có xu hướng thể hiện sự thân thiện hoặc duyên dáng một cách tự nhiên và có thể quan tâm rõ đến việc phong cách cá nhân phản ánh điều mình trân trọng.",
      strengths: [
        "Có thể tạo cảm giác dễ gần và giúp tương tác ban đầu bớt căng thẳng",
        "Thường biết dùng phong cách, cách ứng xử hoặc thẩm mỹ để biểu đạt giá trị cá nhân",
      ],
      challenges: [
        "Dễ điều chỉnh hình ảnh của mình quá nhiều để được yêu thích",
        "Có thể né bất đồng vì sợ làm mất bầu không khí dễ chịu",
      ],
      developmentDirection: [
        "Xây dựng sức hấp dẫn từ sự chân thật bên cạnh khả năng làm hài lòng người khác",
        "Tập nói rõ sở thích và giới hạn dù điều đó tạo ra khác biệt nhỏ",
      ],
      evidence: { body: "Venus", house: 1 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 2",
      coreMeaning:
        "Sao Kim ở Nhà 2 thường liên kết niềm vui và cảm giác đủ đầy với giá trị cá nhân, tài sản và chất lượng của những gì bạn lựa chọn. Bạn có thể tìm sự dễ chịu qua môi trường ổn định, vật dụng đẹp hoặc khả năng dùng nguồn lực theo đúng điều mình trân trọng.",
      strengths: [
        "Có xu hướng nhận ra chất lượng và biết tạo sự thoải mái từ nguồn lực sẵn có",
        "Có thể kiên nhẫn vun đắp kỹ năng hoặc tài sản mang giá trị lâu dài",
      ],
      challenges: [
        "Dễ dùng mua sắm hoặc tiện nghi để bù cho cảm giác chưa được trân trọng",
        "Có thể gắn giá trị bản thân quá chặt với mức độ sở hữu hay ổn định vật chất",
      ],
      developmentDirection: [
        "Làm rõ điều đem lại sự đủ đầy bền vững trước khi dành tiền bạc hoặc thời gian",
        "Nuôi dưỡng cảm nhận giá trị cá nhân bằng năng lực và lựa chọn sống, không chỉ bằng tài sản",
      ],
      evidence: { body: "Venus", house: 2 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 3",
      coreMeaning:
        "Sao Kim ở Nhà 3 thường tìm niềm vui qua trò chuyện, học hỏi và những kết nối gần gũi trong đời sống hằng ngày. Cách diễn đạt có xu hướng chú ý đến sắc thái, sự lịch thiệp và khả năng tìm điểm chung giữa nhiều góc nhìn.",
      strengths: [
        "Có thể truyền đạt ý tưởng theo cách mềm mại, sinh động và dễ tiếp nhận",
        "Thường biết tạo sự hòa hợp trong trao đổi với người thân, bạn học hoặc cộng đồng gần",
      ],
      challenges: [
        "Dễ nói điều dễ nghe thay vì điều thật sự cần được làm rõ",
        "Có thể phân tán giữa nhiều cuộc trò chuyện và thú vui trí tuệ",
      ],
      developmentDirection: [
        "Giữ sự duyên dáng trong giao tiếp đồng thời diễn đạt quan điểm đủ cụ thể",
        "Chọn một vài mối quan tâm để nuôi dưỡng thành kỹ năng hoặc kết nối có chiều sâu",
      ],
      evidence: { body: "Venus", house: 3 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 4",
      coreMeaning:
        "Sao Kim ở Nhà 4 thường tìm sự dễ chịu qua mái nhà, quan hệ thân thuộc và một không gian riêng có vẻ đẹp hoặc nhịp sống hài hòa. Cách yêu có thể được thể hiện qua việc vun đắp cảm giác thuộc về, chăm sóc bầu không khí và giữ những kỷ niệm có ý nghĩa.",
      strengths: [
        "Có xu hướng tạo không gian ấm áp, đẹp mắt và dễ nghỉ ngơi",
        "Có thể kết nối tình cảm qua sự hiếu khách và quan tâm đến đời sống riêng của người thân",
      ],
      challenges: [
        "Dễ giữ im lặng để duy trì hòa khí gia đình dù nhu cầu riêng chưa được đáp ứng",
        "Có thể bám vào hình ảnh lý tưởng về mái nhà hoặc quá khứ",
      ],
      developmentDirection: [
        "Tạo sự hòa hợp bằng đối thoại và ranh giới rõ, không chỉ bằng việc tránh xung đột",
        "Chọn những giá trị gia đình muốn tiếp nối và chủ động xây nếp sống phù hợp hiện tại",
      ],
      evidence: { body: "Venus", house: 4 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 5",
      coreMeaning:
        "Sao Kim ở Nhà 5 thường nhấn mạnh niềm vui trong tình yêu, sáng tạo, vui chơi và biểu đạt cá nhân. Bạn có xu hướng kết nối qua sự ấm áp, nét duyên riêng và những trải nghiệm cho phép cả hai bên tận hưởng khoảnh khắc một cách tự nhiên.",
      strengths: [
        "Có thể biểu đạt tình cảm sinh động và khuyến khích người khác tự tin sáng tạo",
        "Thường có gu thẩm mỹ rõ trong nghệ thuật, giải trí hoặc cách tạo niềm vui",
      ],
      challenges: [
        "Dễ phụ thuộc vào cảm giác được theo đuổi, ngưỡng mộ hoặc liên tục có hứng thú mới",
        "Có thể tránh phần cam kết và chỉnh sửa khi trải nghiệm không còn nhẹ nhàng",
      ],
      developmentDirection: [
        "Nuôi dưỡng sáng tạo và tình cảm bằng sự hiện diện đều đặn bên cạnh cảm hứng",
        "Tận hưởng sự chú ý mà không dùng nó làm thước đo duy nhất cho giá trị cá nhân",
      ],
      evidence: { body: "Venus", house: 5 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 6",
      coreMeaning:
        "Sao Kim ở Nhà 6 thường thể hiện sự quan tâm qua những việc hữu ích, sự hợp tác hằng ngày và mong muốn tạo nhịp làm việc dễ chịu. Gu thẩm mỹ có thể đi vào cách tổ chức, kỹ năng hoặc việc chăm chút để một quy trình vừa hiệu quả vừa hài hòa.",
      strengths: [
        "Có xu hướng xây quan hệ tốt bằng sự hỗ trợ thực tế và thái độ hợp tác",
        "Có thể nhận ra những điều chỉnh nhỏ giúp môi trường làm việc dễ chịu hơn",
      ],
      challenges: [
        "Dễ làm thêm phần việc để được quý mến rồi cảm thấy thiếu cân bằng",
        "Có thể trì hoãn trao đổi khó vì muốn giữ không khí hòa thuận trong công việc",
      ],
      developmentDirection: [
        "Thỏa thuận rõ trách nhiệm thay vì dùng sự giúp đỡ như cách duy nhất để kết nối",
        "Đưa niềm vui và vẻ đẹp vào thói quen theo cách đơn giản, bền vững",
      ],
      evidence: { body: "Venus", house: 6 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 7",
      coreMeaning:
        "Sao Kim ở Nhà 7 thường đặt nhu cầu hòa hợp, công bằng và tiếp nhận tình cảm vào quan hệ một-một. Bạn có xu hướng trân trọng sự đồng hành biết lắng nghe, cư xử có thiện chí và cùng tạo nên một mối quan hệ dễ chịu cho cả hai phía.",
      strengths: [
        "Có thể nhìn thấy giá trị của hợp tác và chủ động tìm giải pháp đôi bên cùng chấp nhận",
        "Thường tạo kết nối bằng sự tinh tế, tôn trọng và khả năng đáp lại tình cảm",
      ],
      challenges: [
        "Dễ nhường sở thích hoặc giới hạn cá nhân để tránh làm người khác thất vọng",
        "Có thể lý tưởng hóa sự hòa hợp và xem bất đồng như dấu hiệu quan hệ có vấn đề",
      ],
      developmentDirection: [
        "Xem trao đổi thẳng thắn là một phần của hòa hợp lâu dài, không phải điều đối nghịch",
        "Giữ rõ giá trị và lựa chọn cá nhân khi xây dựng cam kết chung",
      ],
      evidence: { body: "Venus", house: 7 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 8",
      coreMeaning:
        "Sao Kim ở Nhà 8 thường tìm sự gắn kết qua lòng tin, thân mật và khả năng chia sẻ nguồn lực hoặc phần dễ tổn thương. Cảm nhận giá trị trong quan hệ có thể sâu hơn khi sự hấp dẫn đi cùng minh bạch, cam kết và tôn trọng ranh giới của nhau.",
      strengths: [
        "Có xu hướng đầu tư sâu vào quan hệ đã tạo được lòng tin",
        "Có thể nhận ra giá trị của sự hỗ trợ qua lại và chia sẻ trách nhiệm công bằng",
      ],
      challenges: [
        "Dễ gắn tình cảm với quyền kiểm soát, sự giữ kín hoặc kỳ vọng phải hòa làm một",
        "Có thể khó tách nhu cầu riêng khỏi nguồn lực và lựa chọn chung",
      ],
      developmentDirection: [
        "Thống nhất rõ điều gì được chia sẻ, điều gì vẫn thuộc quyền tự chủ của mỗi người",
        "Xây lòng tin bằng hành động nhất quán thay vì thử thách hoặc suy đoán tình cảm",
      ],
      evidence: { body: "Venus", house: 8 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 9",
      coreMeaning:
        "Sao Kim ở Nhà 9 thường tìm niềm vui qua khám phá văn hóa, học hỏi, thế giới quan và những trải nghiệm mở rộng giới hạn quen thuộc. Sự hấp dẫn có thể nảy sinh từ khác biệt, tư tưởng chung hoặc cảm giác hai người giúp nhau nhìn đời rộng hơn.",
      strengths: [
        "Có xu hướng trân trọng vẻ đẹp trong sự đa dạng về văn hóa và quan điểm",
        "Có thể kết nối con người bằng tinh thần cởi mở, học hỏi và chia sẻ trải nghiệm",
      ],
      challenges: [
        "Dễ lý tưởng hóa một người, nơi chốn hoặc lối sống vì cảm giác mới mẻ",
        "Có thể xem nhẹ khác biệt thực tế khi quá say mê một tầm nhìn chung",
      ],
      developmentDirection: [
        "Để trải nghiệm mới mở rộng giá trị nhưng vẫn kiểm tra mức độ phù hợp trong đời sống thật",
        "Biến cảm hứng văn hóa hoặc học thuật thành thực hành sáng tạo và kết nối đều đặn",
      ],
      evidence: { body: "Venus", house: 9 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 10",
      coreMeaning:
        "Sao Kim ở Nhà 10 thường đưa thẩm mỹ, khả năng ngoại giao và nhu cầu tạo quan hệ tốt vào hình ảnh xã hội hoặc định hướng nghề nghiệp. Bạn có thể được ghi nhận qua cách kết nối con người, trình bày giá trị và tạo một phong cách làm việc có sức thu hút.",
      strengths: [
        "Có xu hướng xây dựng quan hệ nghề nghiệp bằng sự tinh tế và tinh thần hợp tác",
        "Có thể đưa cảm quan thẩm mỹ hoặc khả năng cân bằng lợi ích vào vai trò công chúng",
      ],
      challenges: [
        "Dễ để nhu cầu được yêu mến ảnh hưởng đến quyết định chuyên môn",
        "Có thể đầu tư quá nhiều vào hình ảnh hài hòa mà chậm xử lý bất đồng thực tế",
      ],
      developmentDirection: [
        "Gắn phong cách và ngoại giao với tiêu chuẩn nghề nghiệp cùng trách nhiệm rõ ràng",
        "Xây uy tín từ giá trị đóng góp lâu dài thay vì chỉ từ thiện cảm ban đầu",
      ],
      evidence: { body: "Venus", house: 10 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 11",
      coreMeaning:
        "Sao Kim ở Nhà 11 thường tìm niềm vui và cảm giác được trân trọng qua tình bạn, cộng đồng và những kết nối xã hội có chung lý tưởng. Bạn có xu hướng coi trọng sự bình đẳng trong nhóm và có thể giúp nhiều cá tính khác nhau tìm được điểm hòa hợp.",
      strengths: [
        "Có thể tạo mạng lưới thân thiện và kết nối mọi người qua sở thích hoặc giá trị chung",
        "Thường đem sự duyên dáng, thẩm mỹ hoặc tinh thần hợp tác vào hoạt động cộng đồng",
      ],
      challenges: [
        "Dễ giữ quan hệ ở mức dễ chịu để tránh rủi ro của sự gần gũi sâu hơn",
        "Có thể điều chỉnh sở thích theo nhóm vì muốn duy trì cảm giác thuộc về",
      ],
      developmentDirection: [
        "Đầu tư vào một số tình bạn có khả năng trao đổi chân thật bên cạnh mạng lưới rộng",
        "Đóng góp cho cộng đồng bằng giá trị riêng thay vì chỉ thích nghi với bầu không khí chung",
      ],
      evidence: { body: "Venus", house: 11 },
    },
    {
      ruleId: "WESTERN-VENUS-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Kim ở Nhà 12",
      coreMeaning:
        "Sao Kim ở Nhà 12 thường tìm vẻ đẹp và sự kết nối trong đời sống riêng, lòng trắc ẩn hoặc những cảm nhận khó diễn đạt trực tiếp. Tình cảm có thể được nuôi dưỡng qua khoảng lặng và đóng góp thầm lặng, nhưng vẫn cần hình thức rõ để người khác hiểu điều bạn trân trọng.",
      strengths: [
        "Có xu hướng cảm nhận vẻ đẹp tinh tế và đồng cảm với điều ít được chú ý",
        "Có thể thể hiện tình cảm qua nghệ thuật, sự hiện diện kín đáo hoặc hỗ trợ không phô trương",
      ],
      challenges: [
        "Dễ lý tưởng hóa một kết nối chưa được trao đổi rõ ràng",
        "Có thể giấu nhu cầu tình cảm hoặc cho đi quá nhiều rồi cảm thấy không được thấu hiểu",
      ],
      developmentDirection: [
        "Đưa cảm nhận riêng tư thành lời nói, hành động và ranh giới có thể nhận biết",
        "Giữ lòng trắc ẩn đi cùng sự tương hỗ để kết nối không chỉ dựa trên hy sinh thầm lặng",
      ],
      evidence: { body: "Venus", house: 12 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 1",
      coreMeaning:
        "Sao Hỏa ở Nhà 1 thường đưa động lực và ý chí tiến lên ra ngay cách bạn hiện diện. Bạn có xu hướng chủ động thử sức, phản ứng trực tiếp trước trở ngại và muốn tự mình tạo chuyển động thay vì chờ hoàn cảnh quyết định.",
      strengths: [
        "Có thể bắt đầu nhanh, dám hành động và tạo đà cho người xung quanh",
        "Thường thể hiện rõ mong muốn và sẵn sàng bảo vệ quyền chủ động cá nhân",
      ],
      challenges: [
        "Dễ hành động trước khi đánh giá đủ tác động hoặc nguồn lực cần thiết",
        "Có thể trở nên quá trực diện khi gặp phản hồi chậm hoặc sự cản trở",
      ],
      developmentDirection: [
        "Giữ tinh thần tiên phong nhưng thêm một nhịp quan sát trước quyết định quan trọng",
        "Dùng vận động và mục tiêu cụ thể để dẫn năng lượng thay vì phản ứng tức thời",
      ],
      evidence: { body: "Mars", house: 1 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 2",
      coreMeaning:
        "Sao Hỏa ở Nhà 2 thường hướng động lực vào việc tạo dựng nguồn lực, bảo vệ giá trị cá nhân và đạt kết quả có thể đo lường. Bạn có xu hướng kiên trì hơn khi mục tiêu gắn với sự tự chủ, kỹ năng hoặc nền tảng vật chất rõ ràng.",
      strengths: [
        "Có thể bền bỉ biến công sức thành kỹ năng, thu nhập hoặc tài sản hữu dụng",
        "Thường sẵn sàng hành động để bảo vệ điều mình xem là có giá trị",
      ],
      challenges: [
        "Dễ cố giữ một mục tiêu vì đã đầu tư nhiều dù hoàn cảnh cần điều chỉnh",
        "Có thể phản ứng mạnh khi nguồn lực hoặc cảm nhận giá trị cá nhân bị đe dọa",
      ],
      developmentDirection: [
        "Đặt kế hoạch sử dụng năng lượng và nguồn lực theo ưu tiên dài hạn",
        "Phân biệt bảo vệ giá trị với việc phải chứng minh giá trị bằng sở hữu hoặc thành tích",
      ],
      evidence: { body: "Mars", house: 2 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 3",
      coreMeaning:
        "Sao Hỏa ở Nhà 3 thường đưa nhiều năng lượng vào giao tiếp, học tập, tranh luận và việc tìm kiếm thông tin. Bạn có xu hướng nói thẳng, đặt câu hỏi nhanh và theo đuổi một ý tưởng tích cực hơn khi được trao đổi hoặc thử sức trí tuệ.",
      strengths: [
        "Có thể bảo vệ lập luận rõ ràng và thúc đẩy cuộc trao đổi đi vào trọng tâm",
        "Thường học tốt qua thử nghiệm, phản biện và nhiệm vụ có nhịp độ nhanh",
      ],
      challenges: [
        "Dễ biến khác biệt quan điểm thành cuộc thi phải thắng",
        "Có thể nói quá nhanh hoặc quá sắc khi đang sốt ruột",
      ],
      developmentDirection: [
        "Dùng câu hỏi để hiểu lập luận đối diện trước khi phản bác",
        "Chuyển năng lượng tranh luận thành nghiên cứu, viết hoặc thực hành kỹ năng có cấu trúc",
      ],
      evidence: { body: "Mars", house: 3 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 4",
      coreMeaning:
        "Sao Hỏa ở Nhà 4 thường hướng ý chí vào việc bảo vệ không gian riêng, gia đình và nền tảng sống. Động lực có thể mạnh hơn khi bạn hành động vì cảm giác thuộc về hoặc cần thay đổi những khuôn mẫu trong đời sống gia đình.",
      strengths: [
        "Có thể chủ động xây dựng, sửa chữa hoặc bảo vệ môi trường sống",
        "Thường có sức bền khi mục tiêu liên quan đến người thân và nền tảng lâu dài",
      ],
      challenges: [
        "Dễ mang căng thẳng bên ngoài về không gian riêng rồi phản ứng với người gần gũi",
        "Có thể giữ bức xúc lâu trước khi nói rõ điều cần thay đổi trong gia đình",
      ],
      developmentDirection: [
        "Trao đổi nhu cầu và phân công cụ thể trước khi khó chịu tích tụ",
        "Dùng năng lượng vào việc tạo nền tảng sống chủ động thay vì chỉ phòng vệ điều quen thuộc",
      ],
      evidence: { body: "Mars", house: 4 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 5",
      coreMeaning:
        "Sao Hỏa ở Nhà 5 thường đưa động lực vào sáng tạo, vui chơi, tình cảm và những hoạt động cho phép thể hiện dấu ấn cá nhân. Bạn có xu hướng theo đuổi điều làm mình hào hứng với tinh thần thử sức, cạnh tranh hoặc muốn biến cảm hứng thành hành động ngay.",
      strengths: [
        "Có thể sáng tạo táo bạo và truyền năng lượng cho các hoạt động biểu đạt",
        "Thường dám chủ động theo đuổi niềm vui, sở thích và cơ hội thể hiện",
      ],
      challenges: [
        "Dễ mất hứng khi hoạt động không còn mới mẻ hoặc không đem lại phản hồi nhanh",
        "Có thể biến vui chơi hay tình cảm thành nơi cạnh tranh để được chú ý",
      ],
      developmentDirection: [
        "Rèn kỷ luật đủ nhẹ để đưa một ý tưởng sáng tạo đến giai đoạn hoàn thiện",
        "Giữ tinh thần chủ động trong tình cảm nhưng tôn trọng nhịp độ và lựa chọn của người khác",
      ],
      evidence: { body: "Mars", house: 5 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 6",
      coreMeaning:
        "Sao Hỏa ở Nhà 6 thường tập trung năng lượng vào công việc hằng ngày, kỹ năng, kỷ luật và việc giải quyết vấn đề cụ thể. Bạn có xu hướng làm tốt khi có nhiệm vụ rõ, nhịp vận động đều và cơ hội nhìn thấy tiến bộ qua từng bước thực hành.",
      strengths: [
        "Có thể làm việc quyết liệt, xử lý việc tồn đọng và cải thiện hiệu suất",
        "Thường bền bỉ rèn kỹ năng khi mục tiêu được chia thành bước cụ thể",
      ],
      challenges: [
        "Dễ sốt ruột với sai sót, quy trình chậm hoặc đồng đội có nhịp khác mình",
        "Có thể dùng năng lượng liên tục cho công việc mà bỏ qua tín hiệu cần nghỉ",
      ],
      developmentDirection: [
        "Đặt nhịp làm–nghỉ và tiêu chuẩn hoàn thành trước khi lao vào nhiệm vụ",
        "Dùng sự quyết đoán để cải thiện hệ thống, không biến mọi điểm chưa hoàn hảo thành cuộc đối đầu",
      ],
      evidence: { body: "Mars", house: 6 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 7",
      coreMeaning:
        "Sao Hỏa ở Nhà 7 thường làm nổi bật cách bạn hành động trong quan hệ một-một, thương lượng và xử lý xung đột. Quan hệ có thể tạo động lực lớn khi hai bên cùng chủ động, nhưng cũng đòi hỏi khả năng khẳng định nhu cầu mà không biến khác biệt thành thế đối đầu.",
      strengths: [
        "Có thể đưa năng lượng và sự thẳng thắn vào hợp tác khi mục tiêu chung rõ ràng",
        "Thường sẵn sàng nêu vấn đề thay vì để bất đồng kéo dài âm thầm",
      ],
      challenges: [
        "Dễ phản ứng với đối tác như một đối thủ khi nhu cầu hai bên khác nhau",
        "Có thể nhường quyền chủ động rồi bùng lên khi cảm thấy mình không được tính đến",
      ],
      developmentDirection: [
        "Thống nhất cách tranh luận và giới hạn trước khi xung đột trở nên căng",
        "Dùng sự quyết đoán để bảo vệ cả nhu cầu cá nhân lẫn chất lượng hợp tác",
      ],
      evidence: { body: "Mars", house: 7 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 8",
      coreMeaning:
        "Sao Hỏa ở Nhà 8 thường đưa cường độ hành động vào những vấn đề sâu, nguồn lực chung, lòng tin và các giai đoạn cần thay đổi. Bạn có xu hướng tập trung mạnh khi phải xử lý điều phức tạp hoặc bảo vệ một cam kết có nhiều lợi ích đan xen.",
      strengths: [
        "Có thể hành động dứt khoát trong hoàn cảnh đòi hỏi tập trung và sức chịu đựng",
        "Thường sẵn sàng đi sâu vào vấn đề chung thay vì chỉ xử lý bề mặt",
      ],
      challenges: [
        "Dễ muốn kiểm soát tiến trình khi nguồn lực hoặc lòng tin chưa minh bạch",
        "Có thể giữ căng thẳng quá lâu rồi mới nêu nhu cầu hoặc giới hạn",
      ],
      developmentDirection: [
        "Thiết lập quyền quyết định, trách nhiệm và cách chia sẻ nguồn lực thật rõ",
        "Chuyển cường độ thành nghiên cứu và hành động từng bước thay vì thử sức chịu đựng của nhau",
      ],
      evidence: { body: "Mars", house: 8 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 9",
      coreMeaning:
        "Sao Hỏa ở Nhà 9 thường hướng động lực vào khám phá, học vấn cao, thế giới quan và việc theo đuổi điều bạn tin là có ý nghĩa. Bạn có xu hướng học mạnh qua trải nghiệm trực tiếp và có thể hành động nhiệt tình để mở rộng giới hạn hiểu biết.",
      strengths: [
        "Có thể chủ động bước vào môi trường mới và biến niềm tin thành hành động",
        "Thường có năng lượng bảo vệ một tầm nhìn hoặc mục tiêu học tập dài hạn",
      ],
      challenges: [
        "Dễ tranh luận như thể khác biệt niềm tin là thử thách cá nhân",
        "Có thể lao theo tầm nhìn lớn trước khi chuẩn bị đủ chi tiết thực tế",
      ],
      developmentDirection: [
        "Dùng sự nhiệt thành để kiểm chứng niềm tin qua học hỏi và trải nghiệm đa chiều",
        "Chia mục tiêu mở rộng thành kế hoạch có bước chuẩn bị và điểm đánh giá rõ",
      ],
      evidence: { body: "Mars", house: 9 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 10",
      coreMeaning:
        "Sao Hỏa ở Nhà 10 thường tập trung ý chí vào sự nghiệp, trách nhiệm và mục tiêu tạo vị thế qua hành động. Bạn có xu hướng muốn nhìn thấy tiến triển rõ, chủ động nhận thử thách và dùng năng lực thực tế để tạo ảnh hưởng trong môi trường công chúng.",
      strengths: [
        "Có thể theo đuổi mục tiêu nghề nghiệp với tham vọng, sức bền và tinh thần chịu trách nhiệm",
        "Thường sẵn sàng dẫn dắt khi tình huống cần quyết định và hành động rõ",
      ],
      challenges: [
        "Dễ xem chậm trễ nghề nghiệp như sự cản trở phải vượt qua ngay",
        "Có thể cạnh tranh quá mức hoặc mang nhịp làm việc căng vào các lĩnh vực khác",
      ],
      developmentDirection: [
        "Định nghĩa thành công bằng chất lượng tác động bên cạnh tốc độ và vị thế",
        "Dùng tham vọng theo chiến lược dài hạn, có ưu tiên và thời gian phục hồi",
      ],
      evidence: { body: "Mars", house: 10 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 11",
      coreMeaning:
        "Sao Hỏa ở Nhà 11 thường đưa năng lượng vào nhóm, cộng đồng và những mục tiêu dài hạn hướng tới tương lai. Bạn có xu hướng thúc đẩy tập thể từ ý tưởng sang hành động và có thể kiên quyết bảo vệ một mục tiêu chung mà mình tin tưởng.",
      strengths: [
        "Có thể huy động mọi người, khởi động dự án nhóm và giữ động lực cho mục tiêu chung",
        "Thường dám nêu vấn đề cần thay đổi trong mạng lưới hoặc cộng đồng",
      ],
      challenges: [
        "Dễ sốt ruột khi nhóm cần nhiều thời gian đồng thuận hoặc có ưu tiên khác nhau",
        "Có thể biến bất đồng chiến lược thành cạnh tranh về vai trò trong tập thể",
      ],
      developmentDirection: [
        "Phân chia trách nhiệm và cơ chế quyết định để năng lượng nhóm có hướng rõ",
        "Kết hợp tinh thần thúc đẩy với khả năng lắng nghe nhịp tham gia của từng người",
      ],
      evidence: { body: "Mars", house: 11 },
    },
    {
      ruleId: "WESTERN-MARS-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Hỏa ở Nhà 12",
      coreMeaning:
        "Sao Hỏa ở Nhà 12 thường vận hành tốt khi hành động có khoảng chuẩn bị riêng, mục đích thầm lặng hoặc không đòi hỏi được nhìn thấy ngay. Năng lượng có thể khó gọi tên lúc đầu, nhưng thường trở nên hữu ích khi được dẫn vào suy ngẫm, sáng tạo hoặc công việc hậu trường.",
      strengths: [
        "Có thể bền bỉ hành động phía sau hậu trường và hỗ trợ mục tiêu không cần ghi công",
        "Thường nhận ra thời điểm cần lùi lại để chuẩn bị trước khi tiến lên",
      ],
      challenges: [
        "Dễ trì hoãn việc nói rõ mong muốn cho đến khi bức xúc đã tích tụ",
        "Có thể dùng năng lượng thất thường khi chưa xác định được mục tiêu cụ thể",
      ],
      developmentDirection: [
        "Dùng vận động, ghi chép hoặc kế hoạch kín đáo để nhận diện điều mình muốn hành động",
        "Đặt ranh giới và bước tiến nhỏ có thể quan sát thay vì chỉ cố chịu đựng trong im lặng",
      ],
      evidence: { body: "Mars", house: 12 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 1",
      coreMeaning:
        "Sao Mộc ở Nhà 1 thường đưa tinh thần mở rộng, niềm tin và mong muốn phát triển vào cách bạn tiếp cận cuộc sống. Bạn có xu hướng bước vào trải nghiệm mới với tầm nhìn rộng và có thể truyền cảm giác khích lệ khi chia sẻ điều mình đã học.",
      strengths: [
        "Có thể chủ động thử cơ hội mới và nhìn thấy khả năng phát triển trong hoàn cảnh",
        "Thường tạo động lực cho người khác bằng sự cởi mở và tinh thần học hỏi",
      ],
      challenges: [
        "Dễ đánh giá cao khả năng hiện tại hoặc nhận nhiều việc hơn mức có thể theo đến cùng",
        "Có thể dựa vào sự tự tin ban đầu mà bỏ qua bước chuẩn bị cần thiết",
      ],
      developmentDirection: [
        "Gắn tầm nhìn tích cực với mục tiêu đo được và nhịp kiểm tra thực tế",
        "Giữ sự rộng lượng trong cách hiện diện nhưng lắng nghe giới hạn của mình và người khác",
      ],
      evidence: { body: "Jupiter", house: 1 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 2",
      coreMeaning:
        "Sao Mộc ở Nhà 2 thường hướng sự phát triển vào nguồn lực, kỹ năng và cảm nhận về điều có giá trị. Bạn có thể mở rộng nền tảng của mình qua học hỏi và đầu tư có chủ đích, nhưng vị trí này không tự bảo đảm sự dư dả nếu thiếu kế hoạch thực tế.",
      strengths: [
        "Có xu hướng nhìn thấy nhiều cách phát triển kỹ năng và tạo thêm giá trị",
        "Có thể chia sẻ nguồn lực hào phóng khi hiểu rõ điều mình coi trọng",
      ],
      challenges: [
        "Dễ chi tiêu, cam kết hoặc mở rộng nguồn lực dựa trên kỳ vọng quá lạc quan",
        "Có thể nhầm cảm giác nhiều hơn với cảm giác đủ đầy bền vững",
      ],
      developmentDirection: [
        "Đặt giới hạn, tiêu chí và thời gian đánh giá cho mỗi quyết định mở rộng nguồn lực",
        "Phát triển cảm nhận giá trị qua năng lực và lựa chọn nhất quán, không chỉ qua sở hữu",
      ],
      evidence: { body: "Jupiter", house: 2 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 3",
      coreMeaning:
        "Sao Mộc ở Nhà 3 thường mở rộng trí tò mò qua học hỏi, giao tiếp và môi trường gần. Bạn có xu hướng kết nối nhiều ý tưởng, kể lại kiến thức theo bức tranh lớn và tìm cơ hội phát triển trong những cuộc trao đổi hằng ngày.",
      strengths: [
        "Có thể truyền đạt kiến thức với sự nhiệt tình và giúp người khác thấy ý nghĩa rộng hơn",
        "Thường cởi mở với nhiều chủ đề, người học và nguồn thông tin khác nhau",
      ],
      challenges: [
        "Dễ nói rộng hơn dữ kiện hoặc chuyển chủ đề trước khi hiểu đủ chiều sâu",
        "Có thể nhận quá nhiều khóa học, dự án viết hoặc cam kết giao tiếp cùng lúc",
      ],
      developmentDirection: [
        "Chọn một số câu hỏi để nghiên cứu đến nơi đến chốn và kiểm tra nguồn cẩn thận",
        "Biến kiến thức rộng thành ví dụ cụ thể, dễ áp dụng trong bối cảnh gần gũi",
      ],
      evidence: { body: "Jupiter", house: 3 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 4",
      coreMeaning:
        "Sao Mộc ở Nhà 4 thường tìm khả năng phát triển qua gia đình, nguồn cội và việc xây một nền tảng sống rộng mở hơn. Bạn có thể nuôi dưỡng niềm tin bằng cách hiểu câu chuyện mình đến từ đâu và tạo một mái nhà khuyến khích học hỏi, chia sẻ.",
      strengths: [
        "Có xu hướng tạo không gian thân thuộc rộng lượng và khuyến khích sự phát triển của người thân",
        "Có thể tìm ý nghĩa trong lịch sử gia đình mà vẫn mở ra cách sống mới",
      ],
      challenges: [
        "Dễ ôm quá nhiều trách nhiệm gia đình vì tin mình có thể lo được tất cả",
        "Có thể lý tưởng hóa nguồn cội hoặc mong không gian riêng luôn đáp ứng mọi nhu cầu",
      ],
      developmentDirection: [
        "Mở rộng nền tảng sống theo từng bước phù hợp với nguồn lực và trách nhiệm thực tế",
        "Giữ sự hào phóng trong gia đình đi cùng ranh giới và sự đóng góp từ nhiều phía",
      ],
      evidence: { body: "Jupiter", house: 4 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 5",
      coreMeaning:
        "Sao Mộc ở Nhà 5 thường mở rộng sức sáng tạo, niềm vui và mong muốn phát triển tài năng cá nhân. Bạn có xu hướng học qua thử nghiệm, biểu đạt rộng rãi và những trải nghiệm giúp mình khám phá thêm khả năng thay vì chỉ lặp lại điều đã thành thạo.",
      strengths: [
        "Có thể khuyến khích sáng tạo và giúp người khác tự tin thử sức",
        "Thường nhìn thấy nhiều hướng phát triển cho một sở thích hoặc tài năng",
      ],
      challenges: [
        "Dễ theo đuổi quá nhiều thú vui hoặc dự án mà thiếu thời gian hoàn thiện",
        "Có thể quá tự tin vào cảm hứng ban đầu và xem nhẹ kỷ luật luyện tập",
      ],
      developmentDirection: [
        "Chọn một vài tài năng để đầu tư đều đặn và đo tiến bộ qua sản phẩm cụ thể",
        "Giữ niềm vui khám phá nhưng đặt giới hạn cho thời gian, chi phí và mức cam kết",
      ],
      evidence: { body: "Jupiter", house: 5 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 6",
      coreMeaning:
        "Sao Mộc ở Nhà 6 thường tìm sự phát triển qua công việc thường nhật, kỹ năng và những đóng góp hữu ích. Bạn có xu hướng thấy cơ hội cải thiện quy trình, học thêm qua thực hành và tạo ý nghĩa từ các nhiệm vụ nhỏ khi chúng phục vụ một mục tiêu lớn hơn.",
      strengths: [
        "Có thể nâng tầm công việc hằng ngày bằng kiến thức, hướng dẫn và tinh thần cải tiến",
        "Thường hào phóng chia sẻ kỹ năng hoặc hỗ trợ đồng đội phát triển",
      ],
      challenges: [
        "Dễ nhận quá nhiều nhiệm vụ vì tin rằng mình sẽ sắp xếp được",
        "Có thể mở rộng quy trình khi một giải pháp đơn giản đã đủ đáp ứng",
      ],
      developmentDirection: [
        "Ưu tiên một số kỹ năng và cải tiến có tác động rõ thay vì tối ưu mọi thứ cùng lúc",
        "Đặt giới hạn công việc để sự nhiệt tình phục vụ được duy trì bền vững",
      ],
      evidence: { body: "Jupiter", house: 6 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 7",
      coreMeaning:
        "Sao Mộc ở Nhà 7 thường nhấn mạnh khả năng phát triển qua quan hệ một-một, hợp tác và việc tiếp xúc với thế giới quan của người khác. Một mối quan hệ có thể mở rộng góc nhìn khi hai bên vừa khuyến khích nhau vừa giữ trách nhiệm rõ ràng.",
      strengths: [
        "Có xu hướng nhìn thấy tiềm năng ở đối tác và tạo không gian cho đôi bên học hỏi",
        "Có thể tiếp cận hợp tác bằng sự rộng lượng, thiện chí và tầm nhìn chung",
      ],
      challenges: [
        "Dễ kỳ vọng quan hệ tự giải quyết mọi giới hạn hoặc đem lại sự phát triển liên tục",
        "Có thể hứa nhiều trong giai đoạn hào hứng hơn khả năng duy trì lâu dài",
      ],
      developmentDirection: [
        "Chuyển tầm nhìn chung thành thỏa thuận, vai trò và mốc đánh giá cụ thể",
        "Trân trọng điều quan hệ mở ra nhưng vẫn phát triển nguồn định hướng của riêng mình",
      ],
      evidence: { body: "Jupiter", house: 7 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 8",
      coreMeaning:
        "Sao Mộc ở Nhà 8 thường tìm khả năng phát triển trong những trải nghiệm sâu, lòng tin, nguồn lực chung và quá trình thay đổi. Bạn có thể mở rộng hiểu biết khi dám nghiên cứu điều phức tạp và học cách hợp tác minh bạch quanh trách nhiệm được chia sẻ.",
      strengths: [
        "Có thể nhìn thấy hướng tái cấu trúc và ý nghĩa trong giai đoạn chuyển tiếp",
        "Thường sẵn sàng chia sẻ kiến thức hoặc nguồn lực khi nền tảng lòng tin rõ ràng",
      ],
      challenges: [
        "Dễ đánh giá quá lạc quan khả năng của nguồn lực chung hoặc mức độ sẵn sàng của người khác",
        "Có thể mở rộng cam kết sâu trước khi thống nhất đủ ranh giới và trách nhiệm",
      ],
      developmentDirection: [
        "Kiểm tra dữ kiện, quyền quyết định và phương án giới hạn trước mỗi cam kết chung",
        "Dùng sự cởi mở để hiểu chiều sâu nhưng tôn trọng nhịp tin cậy của từng bên",
      ],
      evidence: { body: "Jupiter", house: 8 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 9",
      coreMeaning:
        "Sao Mộc ở Nhà 9 thường hướng sự mở rộng vào học vấn cao, triết lý, niềm tin và việc khám phá thế giới. Bạn có xu hướng tìm một hệ ý nghĩa lớn hơn qua trải nghiệm, nghiên cứu và tiếp xúc với những cách sống khác với điều quen thuộc.",
      strengths: [
        "Có thể kết nối kiến thức thành tầm nhìn rộng và truyền cảm hứng học hỏi",
        "Thường cởi mở với hành trình, văn hóa và hệ tư tưởng giúp mở rộng thế giới quan",
      ],
      challenges: [
        "Dễ xem niềm tin hiện tại là câu trả lời đủ rộng cho mọi hoàn cảnh",
        "Có thể theo đuổi quá nhiều hướng khám phá mà thiếu ứng dụng hoặc kiểm chứng",
      ],
      developmentDirection: [
        "Giữ niềm tin như một khung định hướng có thể cập nhật khi gặp bằng chứng mới",
        "Đưa điều đã học vào thực hành cụ thể và lắng nghe trải nghiệm khác biệt",
      ],
      evidence: { body: "Jupiter", house: 9 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 10",
      coreMeaning:
        "Sao Mộc ở Nhà 10 thường đưa tầm nhìn phát triển, học hỏi và ý nghĩa vào định hướng nghề nghiệp hoặc vai trò xã hội. Bạn có thể mở rộng năng lực qua trách nhiệm lớn dần, nhưng vị trí này không tự bảo đảm thành công nếu thiếu kỹ năng và sự kiểm chứng thực tế.",
      strengths: [
        "Có xu hướng nhìn thấy hướng phát triển dài hạn và kết nối công việc với mục đích rộng hơn",
        "Có thể dẫn dắt bằng tinh thần khuyến khích, chia sẻ kiến thức và tạo cơ hội học hỏi",
      ],
      challenges: [
        "Dễ đặt mục tiêu nghề nghiệp quá rộng hoặc tin rằng uy tín sẽ tự theo sau tầm nhìn",
        "Có thể nhận vai trò lớn trước khi chuẩn bị đủ hệ thống và nguồn lực hỗ trợ",
      ],
      developmentDirection: [
        "Chuyển tầm nhìn nghề nghiệp thành năng lực, mốc tiến độ và trách nhiệm đo được",
        "Mở rộng ảnh hưởng theo chất lượng đóng góp thay vì chỉ theo quy mô hay chức danh",
      ],
      evidence: { body: "Jupiter", house: 10 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 11",
      coreMeaning:
        "Sao Mộc ở Nhà 11 thường tìm khả năng phát triển qua mạng lưới, cộng đồng và những mục tiêu dài hạn. Bạn có xu hướng nhìn thấy tiềm năng khi nhiều người chia sẻ kiến thức và nguồn lực, đồng thời muốn kết nối hoạt động nhóm với một ý nghĩa tương lai lớn hơn.",
      strengths: [
        "Có thể mở rộng mạng lưới bằng sự cởi mở và tinh thần hỗ trợ đôi bên",
        "Thường giúp nhóm nhìn thấy tầm nhìn chung và cơ hội học hỏi từ khác biệt",
      ],
      challenges: [
        "Dễ tham gia quá nhiều nhóm hoặc mục tiêu vì mỗi nơi đều có vẻ đầy tiềm năng",
        "Có thể chủ quan rằng thiện chí chung đủ thay cho cơ chế phối hợp cụ thể",
      ],
      developmentDirection: [
        "Chọn cộng đồng phù hợp với giá trị và mức cam kết thực tế của mình",
        "Đưa mục tiêu dài hạn thành vai trò, nguồn lực và bước hành động rõ cho từng thành viên",
      ],
      evidence: { body: "Jupiter", house: 11 },
    },
    {
      ruleId: "WESTERN-JUPITER-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Mộc ở Nhà 12",
      coreMeaning:
        "Sao Mộc ở Nhà 12 thường phát triển niềm tin và ý nghĩa qua đời sống nội tâm, lòng trắc ẩn, suy ngẫm hoặc những đóng góp không cần được nhìn thấy. Khoảng lặng có thể mở rộng góc nhìn, nhưng sự phát triển vẫn cần được nối với lựa chọn thực tế trong đời sống.",
      strengths: [
        "Có thể tìm thấy ý nghĩa trong chiêm nghiệm và hỗ trợ những điều ít được chú ý",
        "Thường giữ được một góc nhìn rộng khi có đủ không gian lùi lại và suy ngẫm",
      ],
      challenges: [
        "Dễ tin rằng thiện chí hoặc niềm tin sẽ tự giải quyết vấn đề chưa được hành động",
        "Có thể cho đi quá rộng trong im lặng mà thiếu giới hạn và sự tương hỗ",
      ],
      developmentDirection: [
        "Biến điều đã chiêm nghiệm thành một hành động nhỏ, rõ và có thể duy trì",
        "Giữ lòng hào phóng đi cùng ranh giới để hỗ trợ không trở thành cam kết quá sức",
      ],
      evidence: { body: "Jupiter", house: 12 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 1",
      coreMeaning:
        "Sao Thổ ở Nhà 1 thường nhấn mạnh quá trình xây dựng bản lĩnh, tự kiểm soát và cách hiện diện có trách nhiệm. Bạn có thể tiếp cận điều mới khá thận trọng, nhưng sự tự tin thường vững hơn khi được hình thành qua trải nghiệm, kỷ luật và khả năng tự đứng trên quyết định của mình.",
      strengths: [
        "Có xu hướng nghiêm túc với cam kết cá nhân và giữ được sự điềm tĩnh khi cần",
        "Có thể xây hình ảnh đáng tin cậy qua hành động nhất quán theo thời gian",
      ],
      challenges: [
        "Dễ tự giám sát quá mức hoặc chờ mình đủ hoàn hảo mới dám hiện diện rõ",
        "Có thể mang cảm giác phải luôn kiểm soát nên khó thử nghiệm tự nhiên",
      ],
      developmentDirection: [
        "Đặt tiêu chuẩn tiến bộ thực tế thay vì dùng sự hoàn hảo làm điều kiện bắt đầu",
        "Xem sự tự tin là kỹ năng được luyện qua bước nhỏ, không phải phẩm chất phải có sẵn",
      ],
      evidence: { body: "Saturn", house: 1 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 2",
      coreMeaning:
        "Sao Thổ ở Nhà 2 thường đưa trách nhiệm và nhu cầu cấu trúc vào tài chính, nguồn lực và cách cảm nhận giá trị cá nhân. Sự ổn định có thể đến chậm nhưng bền hơn khi bạn xây kỹ năng, ngân sách và tiêu chí giá trị rõ thay vì chỉ phản ứng với cảm giác thiếu.",
      strengths: [
        "Có thể quản lý nguồn lực thận trọng và theo đuổi mục tiêu tích lũy dài hạn",
        "Thường kiên trì phát triển năng lực có giá trị thực tế",
      ],
      challenges: [
        "Dễ thu hẹp lựa chọn vì lo nguồn lực không đủ hoặc sợ phạm sai lầm",
        "Có thể gắn giá trị bản thân với khả năng tự lo mọi thứ mà không cần hỗ trợ",
      ],
      developmentDirection: [
        "Dùng kế hoạch và quỹ dự phòng để tạo an toàn thay vì duy trì tâm thế thiếu thốn",
        "Ghi nhận giá trị từ kỹ năng, phẩm chất và tiến bộ bên cạnh kết quả vật chất",
      ],
      evidence: { body: "Saturn", house: 2 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 3",
      coreMeaning:
        "Sao Thổ ở Nhà 3 thường khiến việc học, giao tiếp và tổ chức thông tin cần phương pháp cùng thời gian. Bạn có thể thận trọng khi phát biểu, nhưng khi đã nắm chắc chủ đề, lời nói thường có cấu trúc, trọng lượng và khả năng truyền đạt chuyên môn rõ.",
      strengths: [
        "Có xu hướng học có hệ thống và kiên trì với kỹ năng cần luyện tập lâu dài",
        "Có thể diễn đạt chính xác, chịu trách nhiệm với thông tin mình đưa ra",
      ],
      challenges: [
        "Dễ im lặng vì sợ nói chưa đủ đúng hoặc bị đánh giá về khả năng hiểu biết",
        "Có thể giữ cách học quá cứng khiến sự tò mò và thử nghiệm bị thu hẹp",
      ],
      developmentDirection: [
        "Chia kỹ năng giao tiếp thành lần thử nhỏ và cho phép bản nháp chưa hoàn chỉnh",
        "Giữ kỷ luật kiểm chứng nhưng dành chỗ cho câu hỏi mới và cách học linh hoạt",
      ],
      evidence: { body: "Saturn", house: 3 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 4",
      coreMeaning:
        "Sao Thổ ở Nhà 4 thường nhấn mạnh trách nhiệm trong gia đình, đời sống riêng và quá trình xây cảm giác an toàn từ bên trong. Nền tảng có thể cần nhiều thời gian để định hình, nhất là khi bạn phải phân biệt bổn phận thực tế với những gánh nặng đã quen mang.",
      strengths: [
        "Có thể bền bỉ xây dựng mái nhà, nếp sống và sự ổn định cho người thân",
        "Thường nghiêm túc với việc gìn giữ nền tảng và cam kết gia đình dài hạn",
      ],
      challenges: [
        "Dễ nhận quá nhiều trách nhiệm riêng tư hoặc khó cho phép mình cần được nâng đỡ",
        "Có thể giữ khuôn mẫu gia đình chỉ vì cảm giác nghĩa vụ",
      ],
      developmentDirection: [
        "Phân chia trách nhiệm rõ và xây nền tảng an toàn có sự đóng góp từ nhiều phía",
        "Giữ điều có giá trị từ nguồn cội nhưng cho phép cấu trúc gia đình được cập nhật",
      ],
      evidence: { body: "Saturn", house: 4 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 5",
      coreMeaning:
        "Sao Thổ ở Nhà 5 thường đưa tính nghiêm túc và quá trình rèn luyện vào sáng tạo, niềm vui và biểu đạt cá nhân. Bạn có thể cần thời gian để tự tin thể hiện, nhưng kỷ luật có xu hướng giúp năng khiếu trở thành tay nghề và sản phẩm có chiều sâu.",
      strengths: [
        "Có thể kiên trì luyện một hình thức sáng tạo đến mức thành thạo",
        "Thường có trách nhiệm với dự án cá nhân và điều mình tạo ra",
      ],
      challenges: [
        "Dễ đánh giá niềm vui theo hiệu quả hoặc ngại thể hiện vì sợ chưa đủ tốt",
        "Có thể kiểm soát quá trình sáng tạo đến mức thiếu chỗ cho chơi và thử nghiệm",
      ],
      developmentDirection: [
        "Dành thời gian vui chơi không cần thành tích bên cạnh lịch luyện tập đều đặn",
        "Chia sẻ sản phẩm theo từng giai đoạn để sự tự tin lớn lên cùng kỹ năng",
      ],
      evidence: { body: "Saturn", house: 5 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 6",
      coreMeaning:
        "Sao Thổ ở Nhà 6 thường tập trung kỷ luật vào công việc, thói quen, kỹ năng và trách nhiệm thường nhật. Bạn có thể chịu được quá trình rèn luyện dài, nhưng hiệu quả bền vững phụ thuộc vào việc cấu trúc công việc có giới hạn và không biến mọi nhiệm vụ thành nghĩa vụ vô tận.",
      strengths: [
        "Có xu hướng làm việc có phương pháp, đáng tin cậy và chú ý tiêu chuẩn",
        "Có thể xây chuyên môn qua lặp lại, chỉnh sửa và chịu trách nhiệm đến cùng",
      ],
      challenges: [
        "Dễ nhận phần khó về mình hoặc thấy có lỗi khi chưa hoàn thành mọi việc",
        "Có thể duy trì quy trình quá cứng dù điều kiện đã thay đổi",
      ],
      developmentDirection: [
        "Đặt tiêu chí hoàn thành, mức ưu tiên và thời gian nghỉ ngay trong hệ thống làm việc",
        "Đánh giá quy trình định kỳ để kỷ luật phục vụ kết quả thay vì trở thành gánh nặng",
      ],
      evidence: { body: "Saturn", house: 6 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 7",
      coreMeaning:
        "Sao Thổ ở Nhà 7 thường nhấn mạnh cam kết, ranh giới và trách nhiệm trong quan hệ một-một. Bạn có thể tiếp cận hợp tác thận trọng, nhưng mối quan hệ có xu hướng bền hơn khi kỳ vọng, vai trò và cách xử lý khó khăn được trao đổi rõ theo thời gian.",
      strengths: [
        "Có thể giữ cam kết và cùng đối tác làm việc qua những giai đoạn không dễ dàng",
        "Thường coi trọng sự đáng tin cậy, trưởng thành và trách nhiệm đôi bên",
      ],
      challenges: [
        "Dễ trì hoãn kết nối vì sợ chọn sai hoặc xem quan hệ như một danh sách nghĩa vụ",
        "Có thể dựng ranh giới quá cứng khi chưa tin rằng nhu cầu của mình sẽ được tôn trọng",
      ],
      developmentDirection: [
        "Xây lòng tin bằng cam kết vừa sức và những lần kiểm chứng nhất quán",
        "Phân biệt ranh giới lành mạnh với việc đóng cửa trước đối thoại và sự hỗ trợ",
      ],
      evidence: { body: "Saturn", house: 7 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 8",
      coreMeaning:
        "Sao Thổ ở Nhà 8 thường đưa nhu cầu cấu trúc vào nguồn lực chung, lòng tin và những quá trình thay đổi sâu. Bạn có thể khá thận trọng trước sự phụ thuộc, nhưng năng lực quản lý vấn đề phức tạp thường lớn dần khi trách nhiệm và quyền kiểm soát được xác định rõ.",
      strengths: [
        "Có thể quản lý cam kết chung cẩn trọng và giữ bình tĩnh trước vấn đề dài hạn",
        "Thường kiên trì xây lòng tin qua bằng chứng và trách nhiệm thực tế",
      ],
      challenges: [
        "Dễ giữ chặt quyền kiểm soát vì lo rủi ro của việc chia sẻ",
        "Có thể trì hoãn trao đổi về nghĩa vụ chung cho đến khi áp lực đã tăng",
      ],
      developmentDirection: [
        "Lập thỏa thuận minh bạch về nguồn lực, giới hạn và phương án khi hoàn cảnh đổi",
        "Mở lòng tin theo từng bước có thể kiểm chứng thay vì chọn giữa khép kín và trao toàn bộ",
      ],
      evidence: { body: "Saturn", house: 8 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 9",
      coreMeaning:
        "Sao Thổ ở Nhà 9 thường yêu cầu thế giới quan, niềm tin và học vấn cao được xây bằng nghiên cứu, trải nghiệm và khả năng chịu thử thách. Bạn có thể phát triển chuyên môn sâu khi theo một hướng đủ lâu, đồng thời học cách để cấu trúc tư tưởng được cập nhật bởi thực tế.",
      strengths: [
        "Có xu hướng học nghiêm túc và xây hệ thống kiến thức có nền tảng",
        "Có thể biến nguyên tắc rộng thành chuẩn mực và phương pháp thực hành rõ",
      ],
      challenges: [
        "Dễ giới hạn khám phá vì sợ thiếu chuẩn bị hoặc bám quá chặt một hệ quan điểm",
        "Có thể xem việc chưa biết là thiếu năng lực thay vì một phần của học tập",
      ],
      developmentDirection: [
        "Đặt lộ trình học dài hạn có cột mốc nhưng dành chỗ cho trải nghiệm mới điều chỉnh",
        "Kiểm tra niềm tin bằng nguồn đáng tin và đối thoại với góc nhìn khác",
      ],
      evidence: { body: "Saturn", house: 9 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 10",
      coreMeaning:
        "Sao Thổ ở Nhà 10 thường nhấn mạnh trách nhiệm nghề nghiệp, vị thế và mục tiêu dài hạn. Thành tựu có xu hướng được xây từng bước qua chuyên môn, uy tín và khả năng chịu trách nhiệm, thay vì xuất hiện chỉ nhờ mong muốn tiến nhanh.",
      strengths: [
        "Có thể bền bỉ theo đuổi mục tiêu dài hạn và quản lý trách nhiệm lớn",
        "Thường xây thẩm quyền qua kinh nghiệm, tiêu chuẩn và sự nhất quán",
      ],
      challenges: [
        "Dễ mang áp lực phải thành công hoặc xem chậm tiến là dấu hiệu thất bại",
        "Có thể đồng nhất bản thân với vai trò công việc và khó cho phép mình nghỉ",
      ],
      developmentDirection: [
        "Chia mục tiêu lớn thành giai đoạn năng lực, trách nhiệm và thời gian thực tế",
        "Định nghĩa thành tựu bằng chất lượng đóng góp cùng một đời sống có khả năng duy trì",
      ],
      evidence: { body: "Saturn", house: 10 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 11",
      coreMeaning:
        "Sao Thổ ở Nhà 11 thường đưa trách nhiệm và cấu trúc vào nhóm, cộng đồng và mục tiêu dài hạn. Bạn có thể chọn mạng lưới khá kỹ, nhưng khi đã cam kết thường có khả năng biến một tầm nhìn chung thành kế hoạch, vai trò và kết quả bền vững.",
      strengths: [
        "Có thể xây tổ chức, quy trình và trách nhiệm giúp nhóm hoạt động lâu dài",
        "Thường nghiêm túc với lời hứa dành cho cộng đồng và mục tiêu tương lai",
      ],
      challenges: [
        "Dễ cảm thấy mình phải gánh phần tổ chức hoặc đứng ngoài cho đến khi nhóm đủ đáng tin",
        "Có thể để quy tắc làm giảm sự thử nghiệm và đóng góp tự phát của thành viên",
      ],
      developmentDirection: [
        "Phân quyền và chia trách nhiệm để cấu trúc nhóm không phụ thuộc vào một người",
        "Giữ tiêu chuẩn dài hạn nhưng tạo cơ chế thử nghiệm nhỏ cho ý tưởng mới",
      ],
      evidence: { body: "Saturn", house: 11 },
    },
    {
      ruleId: "WESTERN-SATURN-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Sao Thổ ở Nhà 12",
      coreMeaning:
        "Sao Thổ ở Nhà 12 thường đưa bài học về giới hạn, trách nhiệm và sức bền vào đời sống nội tâm hoặc công việc thầm lặng. Bạn có thể cần thời gian riêng để nhận ra những nghĩa vụ vô hình mình đang mang và xây cấu trúc giúp sự tận tâm không trở thành kiệt sức kéo dài.",
      strengths: [
        "Có thể làm việc bền bỉ phía sau hậu trường và giữ cam kết ít được nhìn thấy",
        "Thường phát triển chiều sâu qua suy ngẫm, kiên nhẫn và khả năng ở lại với quá trình dài",
      ],
      challenges: [
        "Dễ nhận trách nhiệm âm thầm mà không nói rõ giới hạn hoặc nhu cầu hỗ trợ",
        "Có thể rút lui vì cảm thấy mình chưa sẵn sàng thay vì thử một bước nhỏ",
      ],
      developmentDirection: [
        "Gọi tên nghĩa vụ, giới hạn và nguồn hỗ trợ thay vì quản lý tất cả trong im lặng",
        "Tạo nhịp nghỉ cùng những bước thực hành nhỏ để sức bền được phục hồi đều đặn",
      ],
      evidence: { body: "Saturn", house: 12 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 1",
      coreMeaning:
        "Thiên Vương ở Nhà 1 thường nhấn mạnh nhu cầu thể hiện bản thân theo cách độc lập và khó bị đóng khung. Bạn có xu hướng thử những cách hiện diện mới, nhanh nhận ra khi một vai trò không còn phù hợp và muốn được tự quyết cách mình thay đổi.",
      strengths: [
        "Có thể đem góc nhìn mới và tinh thần thử nghiệm vào tình huống quen thuộc",
        "Thường dám thể hiện khác biệt khi điều đó phản ánh đúng cá tính riêng",
      ],
      challenges: [
        "Dễ thay đổi cách thể hiện quá nhanh khi cảm thấy bị giới hạn",
        "Có thể phản đối kỳ vọng chỉ vì chúng tạo cảm giác bị đóng khung",
      ],
      developmentDirection: [
        "Chọn những thay đổi phản ánh giá trị dài hạn thay vì chỉ giải tỏa sự bức bối trước mắt",
        "Giữ quyền tự do cá nhân đồng thời giải thích rõ tác động của lựa chọn với người liên quan",
      ],
      evidence: { body: "Uranus", house: 1 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 2",
      coreMeaning:
        "Thiên Vương ở Nhà 2 thường đưa nhu cầu linh hoạt và đổi mới vào cách tiếp cận giá trị, tài chính và nguồn lực. Bạn có thể tìm những cách tạo giá trị khác thông lệ, nhưng sự tự do bền hơn khi thử nghiệm đi cùng nền tảng dự phòng và tiêu chí rõ.",
      strengths: [
        "Có xu hướng nhìn thấy giá trị ở kỹ năng, công cụ hoặc mô hình mới",
        "Có thể thích nghi nhanh khi cách sử dụng nguồn lực cần thay đổi",
      ],
      challenges: [
        "Dễ chán cấu trúc ổn định hoặc thay đổi quyết định nguồn lực quá nhanh",
        "Có thể đánh đồng tự do với việc không cần kế hoạch hoặc cam kết dài hạn",
      ],
      developmentDirection: [
        "Dành một phần nguồn lực an toàn cho thử nghiệm thay vì đặt toàn bộ nền tảng vào thay đổi",
        "Xác định giá trị cốt lõi đủ ổn định để dẫn hướng cho các lựa chọn linh hoạt",
      ],
      evidence: { body: "Uranus", house: 2 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 3",
      coreMeaning:
        "Thiên Vương ở Nhà 3 thường nhấn mạnh tư duy độc đáo, giao tiếp mới mẻ và cách học không nhất thiết theo lộ trình số đông. Bạn có xu hướng kết nối thông tin nhanh, nhận ra mẫu hình bất ngờ và muốn tự chọn phương pháp tiếp nhận kiến thức.",
      strengths: [
        "Có thể đặt câu hỏi khác biệt và tìm giải pháp vượt khỏi cách nghĩ quen thuộc",
        "Thường thích nghi tốt với công cụ giao tiếp, công nghệ hoặc phương pháp học mới",
      ],
      challenges: [
        "Dễ chuyển ý quá nhanh khiến người khác khó theo kịp mạch suy nghĩ",
        "Có thể bỏ quy trình nền tảng vì thấy chúng chậm hoặc thiếu kích thích",
      ],
      developmentDirection: [
        "Đưa ý tưởng mới vào cấu trúc, ví dụ và bước thử để người khác có thể kiểm chứng",
        "Giữ tự do học tập nhưng hoàn thành đủ nền tảng trước khi chuyển sang hướng mới",
      ],
      evidence: { body: "Uranus", house: 3 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 4",
      coreMeaning:
        "Thiên Vương ở Nhà 4 thường nhấn mạnh nhu cầu tự do trong đời sống riêng, gia đình hoặc cách tổ chức nơi ở. Bạn có thể muốn định nghĩa cảm giác thuộc về theo cách riêng và điều chỉnh những khuôn mẫu gia đình không còn phù hợp với hiện tại.",
      strengths: [
        "Có thể tạo không gian sống linh hoạt và cởi mở với nhiều cách tổ chức gia đình",
        "Thường dám cập nhật truyền thống để nền tảng riêng phản ánh đúng nhu cầu thực",
      ],
      challenges: [
        "Dễ thấy bức bối khi đời sống riêng có quá nhiều kỳ vọng cố định",
        "Có thể thay đổi không gian hoặc nếp sống trước khi trao đổi đủ với người cùng chia sẻ",
      ],
      developmentDirection: [
        "Thỏa thuận vùng tự do và trách nhiệm chung để đổi mới không làm mất cảm giác an toàn",
        "Thử thay đổi đời sống riêng theo giai đoạn thay vì phải phá bỏ toàn bộ cấu trúc cũ",
      ],
      evidence: { body: "Uranus", house: 4 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 5",
      coreMeaning:
        "Thiên Vương ở Nhà 5 thường đưa tinh thần thử nghiệm vào sáng tạo, niềm vui và biểu đạt cá nhân. Bạn có xu hướng bị thu hút bởi hình thức mới, trải nghiệm bất ngờ và những cách thể hiện không lặp lại công thức quen thuộc.",
      strengths: [
        "Có thể sáng tạo táo bạo và mở ra góc nhìn chưa được thử trong một lĩnh vực",
        "Thường khuyến khích người khác tự do chơi, khám phá và thể hiện nét riêng",
      ],
      challenges: [
        "Dễ mất hứng khi dự án chuyển từ khám phá sang lặp lại và hoàn thiện",
        "Có thể tìm sự mới mẻ liên tục khiến niềm vui hoặc kết nối thiếu độ bền",
      ],
      developmentDirection: [
        "Tạo cấu trúc đủ linh hoạt để một ý tưởng khác biệt được phát triển thành sản phẩm",
        "Phân biệt nhu cầu đổi mới thật sự với phản ứng muốn rời đi vì giai đoạn hiện tại kém kích thích",
      ],
      evidence: { body: "Uranus", house: 5 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 6",
      coreMeaning:
        "Thiên Vương ở Nhà 6 thường hướng đổi mới vào công việc thường nhật, kỹ năng và cách tổ chức thói quen. Bạn có xu hướng làm tốt khi được tự chủ phương pháp, thử công cụ mới và cải tiến quy trình thay vì chỉ lặp lại một cấu trúc cố định.",
      strengths: [
        "Có thể nhận ra điểm nghẽn và đề xuất cách làm linh hoạt, hiệu quả hơn",
        "Thường thích nghi nhanh với công nghệ hoặc yêu cầu công việc thay đổi",
      ],
      challenges: [
        "Dễ khó chịu với lịch trình lặp lại dù một số nhịp đều vẫn cần thiết",
        "Có thể thay đổi hệ thống quá thường xuyên trước khi đo được hiệu quả",
      ],
      developmentDirection: [
        "Giữ một vài thói quen nền và dành vùng riêng cho thử nghiệm có thời hạn",
        "Đánh giá cải tiến bằng kết quả thực tế thay vì chỉ bằng cảm giác mới mẻ",
      ],
      evidence: { body: "Uranus", house: 6 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 7",
      coreMeaning:
        "Thiên Vương ở Nhà 7 thường nhấn mạnh nhu cầu tự do, bình đẳng và không gian phát triển trong quan hệ một-một. Bạn có xu hướng trân trọng những kết nối cho phép hai bên khác biệt, cập nhật thỏa thuận và không bị giới hạn bởi vai trò cứng nhắc.",
      strengths: [
        "Có thể xây quan hệ dựa trên sự tôn trọng cá tính và tư duy hợp tác mới",
        "Thường sẵn sàng điều chỉnh mô hình quan hệ khi nhu cầu thực tế thay đổi",
      ],
      challenges: [
        "Dễ phản ứng mạnh khi cam kết tạo cảm giác mất quyền tự chủ",
        "Có thể tạo khoảng cách đột ngột thay vì nói sớm về nhu cầu thay đổi",
      ],
      developmentDirection: [
        "Thỏa thuận rõ vùng độc lập, điểm kết nối và cách báo trước khi nhu cầu đổi",
        "Xem cam kết linh hoạt là quá trình đối thoại đều đặn, không phải sự đối lập với tự do",
      ],
      evidence: { body: "Uranus", house: 7 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 8",
      coreMeaning:
        "Thiên Vương ở Nhà 8 thường đưa nhu cầu đổi mới vào nguồn lực chung, lòng tin và những quá trình thay đổi sâu. Bạn có thể tìm cách hợp tác khác thông lệ hoặc nhìn vấn đề kín đáo bằng góc mới, nhưng không có nghĩa biến động chắc chắn sẽ xảy ra.",
      strengths: [
        "Có thể nhìn thấy phương án tái cấu trúc khi một cam kết chung không còn hiệu quả",
        "Thường cởi mở với cách nghiên cứu và chia sẻ trách nhiệm mới nếu ranh giới rõ",
      ],
      challenges: [
        "Dễ thấy bị ràng buộc khi nguồn lực chung làm giảm quyền quyết định cá nhân",
        "Có thể thay đổi thỏa thuận nhanh trước khi các bên chuẩn bị đủ phương án chuyển tiếp",
      ],
      developmentDirection: [
        "Thiết kế cam kết chung có cơ chế cập nhật, rút lui và bảo vệ quyền lợi minh bạch",
        "Thử cải tiến ở phạm vi kiểm soát được trước khi thay toàn bộ cấu trúc chia sẻ",
      ],
      evidence: { body: "Uranus", house: 8 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 9",
      coreMeaning:
        "Thiên Vương ở Nhà 9 thường thúc đẩy việc khám phá thế giới quan, triết lý và phương pháp học vượt khỏi khuôn mẫu quen thuộc. Bạn có xu hướng đặt câu hỏi với niềm tin sẵn có và tìm những trải nghiệm giúp tư duy được tự do cập nhật.",
      strengths: [
        "Có thể kết nối ý tưởng tiến bộ từ nhiều lĩnh vực, văn hóa hoặc hệ tư tưởng",
        "Thường dám xem lại giả định nền và đề xuất cách học hoặc khám phá mới",
      ],
      challenges: [
        "Dễ bác bỏ truyền thống chỉ vì nó có cấu trúc hoặc chưa đáp ứng ngay nhu cầu đổi mới",
        "Có thể chuyển thế giới quan nhanh hơn mức trải nghiệm thực tế kịp kiểm chứng",
      ],
      developmentDirection: [
        "Đối chiếu ý tưởng đột phá với nguồn, lịch sử và tác động trong nhiều bối cảnh",
        "Giữ quyền chất vấn nhưng xây một phương pháp đủ ổn định để phát triển hiểu biết sâu",
      ],
      evidence: { body: "Uranus", house: 9 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 10",
      coreMeaning:
        "Thiên Vương ở Nhà 10 thường đưa nhu cầu khác biệt và đổi mới vào hướng nghề nghiệp hoặc vai trò xã hội. Bạn có thể bị thu hút bởi lộ trình ít truyền thống, công nghệ hay môi trường cho phép tự chủ, nhưng điều này không đồng nghĩa chắc chắn có thay đổi nghề nghiệp đột ngột.",
      strengths: [
        "Có thể mang cách làm mới và tư duy cải cách vào lĩnh vực chuyên môn",
        "Thường sẵn sàng tự thiết kế lộ trình nghề nghiệp phù hợp với năng lực riêng",
      ],
      challenges: [
        "Dễ rời cấu trúc hiện tại vì cảm giác bị giới hạn trước khi chuẩn bị bước chuyển",
        "Có thể khó chịu với thứ bậc ngay cả khi một số trách nhiệm vẫn cần được phối hợp",
      ],
      developmentDirection: [
        "Xây kỹ năng, mạng lưới và phương án chuyển tiếp trước khi đổi hướng lớn",
        "Dùng tinh thần độc lập để cải tiến vai trò, đồng thời giữ trách nhiệm với kết quả chung",
      ],
      evidence: { body: "Uranus", house: 10 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 11",
      coreMeaning:
        "Thiên Vương ở Nhà 11 thường tập trung tinh thần đổi mới vào cộng đồng, mạng lưới và ý tưởng hướng tương lai. Bạn có xu hướng tìm những nhóm tôn trọng khác biệt và muốn dùng kết nối tập thể để thử các cách tổ chức hoặc giải quyết vấn đề mới.",
      strengths: [
        "Có thể kết nối những người khác biệt quanh một mục tiêu cải cách chung",
        "Thường nhìn thấy xu hướng mới và tiềm năng của mô hình cộng đồng linh hoạt",
      ],
      challenges: [
        "Dễ rời nhóm khi cấu trúc chậm thay đổi hoặc đồng thuận cần nhiều thời gian",
        "Có thể ưu tiên ý tưởng tương lai hơn nhu cầu vận hành hiện tại của thành viên",
      ],
      developmentDirection: [
        "Chuyển tầm nhìn cải cách thành thử nghiệm nhỏ có vai trò và tiêu chí đánh giá",
        "Giữ tiếng nói độc lập nhưng đầu tư đủ thời gian để xây niềm tin và phối hợp nhóm",
      ],
      evidence: { body: "Uranus", house: 11 },
    },
    {
      ruleId: "WESTERN-URANUS-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Thiên Vương ở Nhà 12",
      coreMeaning:
        "Thiên Vương ở Nhà 12 thường đưa nhu cầu tự do và đổi mới vào đời sống nội tâm, khoảng riêng hoặc những đóng góp thầm lặng. Ý tưởng khác biệt có thể xuất hiện khi bạn có không gian tách khỏi tiếng ồn, rồi cần một hình thức cụ thể để được hiểu và áp dụng.",
      strengths: [
        "Có thể nhận ra giải pháp bất ngờ trong quá trình suy ngẫm hoặc làm việc hậu trường",
        "Thường nhạy với những khuôn mẫu vô hình cần được cập nhật theo cách nhân văn hơn",
      ],
      challenges: [
        "Dễ giữ nhu cầu thay đổi trong im lặng cho đến khi cảm giác bức bối tăng cao",
        "Có thể dao động giữa rút lui hoàn toàn và muốn thay đổi mọi thứ thật nhanh",
      ],
      developmentDirection: [
        "Ghi lại ý tưởng và thử chúng ở phạm vi nhỏ trước khi quyết định thay đổi lớn",
        "Tạo nhịp riêng đều đặn để nhu cầu tự do được nhận biết và diễn đạt sớm",
      ],
      evidence: { body: "Uranus", house: 12 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 1",
      coreMeaning:
        "Hải Vương ở Nhà 1 thường làm hình ảnh cá nhân trở nên nhạy cảm, giàu sắc thái và khó bị đóng khung bằng một nhãn cố định. Bạn có thể dễ cảm nhận bầu không khí xung quanh, vì vậy việc phân biệt cảm xúc của mình với ảnh hưởng từ môi trường giúp bản sắc được rõ hơn.",
      strengths: [
        "Có xu hướng thể hiện sự tinh tế, cảm thông và trí tưởng tượng qua cách hiện diện với người khác",
        "Có thể thích nghi mềm mại với nhiều hoàn cảnh và nhận ra những tín hiệu khó diễn đạt bằng lý trí",
      ],
      challenges: [
        "Dễ điều chỉnh hình ảnh theo môi trường đến mức khó nhận ra nhu cầu thật của bản thân",
        "Có thể lý tưởng hóa một phiên bản về mình rồi hụt hẫng khi trải nghiệm thực tế khác đi",
      ],
      developmentDirection: [
        "Gọi tên giá trị, nhu cầu và giới hạn cá nhân trước khi thích nghi với kỳ vọng bên ngoài",
        "Đưa trực giác về bản thân vào những lựa chọn nhỏ có thể quan sát và kiểm chứng trong đời sống",
      ],
      evidence: { body: "Neptune", house: 1 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 2",
      coreMeaning:
        "Hải Vương ở Nhà 2 thường kết nối giá trị cá nhân, nguồn lực và cảm giác đủ đầy với lý tưởng hoặc cảm nhận tinh tế hơn là tiêu chí thuần vật chất. Bạn có thể hào phóng và giàu tưởng tượng trong cách tạo giá trị, nhưng những quyết định tài chính thường vững hơn khi có con số và ranh giới rõ.",
      strengths: [
        "Có thể nhận ra giá trị của nghệ thuật, cảm hứng hoặc sự đóng góp chưa dễ quy đổi thành con số",
        "Thường có lòng chia sẻ và khả năng dùng nguồn lực theo hướng mang lại ý nghĩa",
      ],
      challenges: [
        "Dễ để cảm xúc hoặc kỳ vọng đẹp làm mờ chi phí, điều kiện và giới hạn nguồn lực",
        "Có thể khó định giá công sức của mình khi giá trị cá nhân phụ thuộc quá nhiều vào sự công nhận",
      ],
      developmentDirection: [
        "Kết hợp cảm nhận về điều đáng quý với ngân sách, tiêu chí và thỏa thuận có thể kiểm tra",
        "Xây cảm giác đủ đầy từ giá trị cốt lõi đồng thời duy trì nền tảng nguồn lực thực tế",
      ],
      evidence: { body: "Neptune", house: 2 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 3",
      coreMeaning:
        "Hải Vương ở Nhà 3 thường đưa trí tưởng tượng, trực giác và khả năng liên tưởng vào tư duy, ngôn ngữ và học tập. Bạn có thể tiếp nhận tốt qua hình ảnh, câu chuyện hoặc sắc thái, trong khi thông tin thực tế cần được sắp xếp lại để tránh hiểu theo điều mình mong muốn.",
      strengths: [
        "Có xu hướng diễn đạt giàu hình ảnh và cảm nhận được những tầng nghĩa tinh tế trong giao tiếp",
        "Có thể học tốt qua sáng tạo, âm thanh, biểu tượng hoặc việc kết nối nhiều ý tưởng tưởng như rời rạc",
      ],
      challenges: [
        "Dễ bỏ sót chi tiết cụ thể khi bị cuốn theo ý chính, cảm hứng hoặc liên tưởng",
        "Có thể nghe thông điệp theo kỳ vọng của mình nếu câu chữ và bối cảnh chưa rõ",
      ],
      developmentDirection: [
        "Ghi lại ý tưởng trực giác rồi kiểm tra bằng ví dụ, nguồn và câu hỏi làm rõ",
        "Dùng cấu trúc ngắn, mốc cụ thể và bước xác nhận để trí tưởng tượng được truyền đạt chính xác hơn",
      ],
      evidence: { body: "Neptune", house: 3 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 4",
      coreMeaning:
        "Hải Vương ở Nhà 4 thường làm đời sống nội tâm, gia đình và cảm giác thuộc về mang nhiều nhạy cảm, ký ức và lý tưởng. Bạn có thể mong một không gian riêng giàu đồng cảm và cảm hứng, đồng thời cần nhìn rõ điều đang có thay vì chỉ gìn giữ hình ảnh về một mái nhà hoàn hảo.",
      strengths: [
        "Có thể tạo bầu không khí riêng tư dịu dàng, giàu tưởng tượng và quan tâm đến cảm xúc",
        "Thường cảm nhận sâu những nhu cầu không được nói ra trong gia đình hoặc môi trường sống",
      ],
      challenges: [
        "Dễ hấp thụ tâm trạng trong nhà hoặc nhận phần trách nhiệm cảm xúc không thuộc về mình",
        "Có thể lý tưởng hóa quá khứ, gia đình hay nơi chốn khiến nhu cầu hiện tại khó được gọi tên",
      ],
      developmentDirection: [
        "Tạo ranh giới và nhịp riêng trong không gian sống để sự nhạy cảm có chỗ được hồi phục",
        "Phân biệt ký ức, mong ước và dữ kiện hiện tại khi xây cảm giác an toàn và thuộc về",
      ],
      evidence: { body: "Neptune", house: 4 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 5",
      coreMeaning:
        "Hải Vương ở Nhà 5 thường nuôi dưỡng trí tưởng tượng trong sáng tạo, niềm vui, tình cảm và cách biểu đạt cá nhân. Bạn có thể tìm thấy cảm hứng mạnh qua nghệ thuật hoặc trải nghiệm lãng mạn, nhưng niềm vui bền hơn khi con người và dự án được nhìn như chúng thực sự là.",
      strengths: [
        "Có xu hướng sáng tạo bằng hình ảnh, cảm xúc và khả năng mở ra một thế giới giàu chất thơ",
        "Có thể mang sự dịu dàng, đồng cảm và cảm hứng vào hoạt động vui chơi hoặc biểu đạt cá nhân",
      ],
      challenges: [
        "Dễ say mê tiềm năng hoặc hình ảnh lý tưởng hơn quá trình thực tế của một kết nối hay tác phẩm",
        "Có thể chờ cảm hứng hoàn hảo khiến ý tưởng đẹp chưa được hoàn thiện thành hình",
      ],
      developmentDirection: [
        "Dành lịch thực hành đều đặn để cảm hứng được chuyển thành tác phẩm hoặc trải nghiệm cụ thể",
        "Giữ sự lãng mạn đồng thời quan sát hành động, thỏa thuận và mức độ đáp lại trong thực tế",
      ],
      evidence: { body: "Neptune", house: 5 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 6",
      coreMeaning:
        "Hải Vương ở Nhà 6 thường đưa lý tưởng phục vụ, lòng cảm thông và sự nhạy cảm vào công việc thường nhật, kỹ năng và thói quen. Bạn có thể làm tốt khi công việc có ý nghĩa, nhưng vai trò, ưu tiên và giới hạn rõ giúp sự tận tâm không tan vào những yêu cầu không có điểm dừng.",
      strengths: [
        "Có thể nhận ra nhu cầu tinh tế của người khác và mang cảm hứng vào những việc nhỏ hằng ngày",
        "Thường phát triển kỹ năng tốt khi được kết nối công việc với một mục đích nhân văn hoặc sáng tạo",
      ],
      challenges: [
        "Dễ nhận thêm việc vì cảm thông hoặc vì trách nhiệm chưa được phân định rõ",
        "Có thể để lịch trình mơ hồ làm gián đoạn việc rèn kỹ năng và hoàn tất nhiệm vụ",
      ],
      developmentDirection: [
        "Chuyển mong muốn đóng góp thành phạm vi công việc, thời hạn và tiêu chí hoàn thành cụ thể",
        "Duy trì vài thói quen nền đơn giản để bảo vệ năng lượng cho cả phục vụ và hồi phục",
      ],
      evidence: { body: "Neptune", house: 6 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 7",
      coreMeaning:
        "Hải Vương ở Nhà 7 thường làm quan hệ một-một trở thành nơi thể hiện lòng cảm thông, lý tưởng hòa hợp và sự nhạy cảm với đối phương. Bạn có thể nhìn thấy điều tốt đẹp trong người khác, còn sự gắn kết lành mạnh cần cả tình cảm lẫn khả năng nhìn rõ hành động, nhu cầu và ranh giới của hai bên.",
      strengths: [
        "Có xu hướng lắng nghe bằng sự đồng cảm và trân trọng những sắc thái khó nói trong quan hệ",
        "Có thể cùng đối phương xây một tầm nhìn giàu cảm hứng khi mục tiêu được chia sẻ thật sự",
      ],
      challenges: [
        "Dễ yêu hình ảnh tiềm năng của một người hơn những gì họ đang thể hiện nhất quán",
        "Có thể né cuộc trao đổi rõ ràng vì mong giữ hòa khí hoặc sợ làm mất cảm giác kết nối",
      ],
      developmentDirection: [
        "Đối chiếu cảm nhận với hành động lặp lại và hỏi trực tiếp khi kỳ vọng chưa được thống nhất",
        "Xem ranh giới rõ là nền tảng của lòng cảm thông, không phải dấu hiệu thiếu yêu thương",
      ],
      evidence: { body: "Neptune", house: 7 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 8",
      coreMeaning:
        "Hải Vương ở Nhà 8 thường tăng sự nhạy cảm trước lòng tin, sự thân mật, nguồn lực chung và những lớp ý nghĩa sâu dưới bề mặt. Bạn có thể cảm nhận tinh tế điều chưa được nói ra, nhưng trực giác không thay thế thỏa thuận minh bạch khi chia sẻ trách nhiệm hoặc nguồn lực.",
      strengths: [
        "Có thể tiếp cận những chủ đề sâu bằng lòng trắc ẩn và sự tôn trọng tính dễ tổn thương của người khác",
        "Thường có trí tưởng tượng giúp nhìn một giai đoạn chuyển đổi từ nhiều tầng ý nghĩa",
      ],
      challenges: [
        "Dễ để ranh giới giữa hỗ trợ, hy sinh và nghĩa vụ chung trở nên khó xác định",
        "Có thể lý tưởng hóa mức độ tin cậy hoặc né chi tiết cụ thể vì chủ đề tạo cảm giác nặng nề",
      ],
      developmentDirection: [
        "Ghi rõ quyền, nghĩa vụ và điều kiện trước khi chia sẻ nguồn lực hoặc nhận một cam kết sâu",
        "Kết hợp cảm nhận tinh tế với thời gian quan sát, dữ kiện và sự đồng thuận có thể xác nhận",
      ],
      evidence: { body: "Neptune", house: 8 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 9",
      coreMeaning:
        "Hải Vương ở Nhà 9 thường mở trí tưởng tượng và trực giác về niềm tin, triết lý, tâm linh, học vấn cao hoặc những chân trời rộng hơn. Bạn có thể tìm ý nghĩa qua biểu tượng và trải nghiệm vượt khỏi điều thuần lý tính, nhưng không có nghĩa một hệ niềm tin hay cảm nhận nào chắc chắn là chân lý.",
      strengths: [
        "Có xu hướng tiếp cận khác biệt văn hóa và thế giới quan bằng lòng cởi mở, cảm thông",
        "Có thể kết nối kiến thức với hình ảnh lớn và truyền cảm hứng về ý nghĩa của việc học hỏi",
      ],
      challenges: [
        "Dễ lý tưởng hóa một người hướng dẫn, hệ tư tưởng hoặc hành trình vì lời hứa về ý nghĩa lớn",
        "Có thể bỏ qua mâu thuẫn và bằng chứng không thuận với niềm tin đang tạo cảm hứng",
      ],
      developmentDirection: [
        "Cho phép niềm tin truyền cảm hứng đồng thời kiểm tra nguồn, bối cảnh và tác động thực tế",
        "Học từ nhiều góc nhìn và giữ khả năng cập nhật thế giới quan khi trải nghiệm mới xuất hiện",
      ],
      evidence: { body: "Neptune", house: 9 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 10",
      coreMeaning:
        "Hải Vương ở Nhà 10 thường đưa lý tưởng, cảm hứng và mong muốn tạo ý nghĩa vào nghề nghiệp hoặc hình ảnh công chúng. Bạn có thể bị thu hút bởi vai trò sáng tạo, hỗ trợ hay phụng sự, trong khi định hướng trở nên khả thi hơn khi sứ mệnh được chuyển thành trách nhiệm và kết quả rõ.",
      strengths: [
        "Có thể truyền cảm hứng qua công việc và cảm nhận những nhu cầu xã hội chưa dễ được gọi tên",
        "Thường mang trí tưởng tượng, sự tinh tế hoặc lòng trắc ẩn vào hình ảnh nghề nghiệp",
      ],
      challenges: [
        "Dễ mơ hồ về vai trò vì theo đuổi một hình ảnh nghề nghiệp đẹp nhưng chưa có tiêu chí thực tế",
        "Có thể hấp thụ kỳ vọng công chúng hoặc tổ chức đến mức mục tiêu riêng bị nhòe đi",
      ],
      developmentDirection: [
        "Diễn đạt lý tưởng nghề nghiệp thành phạm vi, kỹ năng, mốc tiến triển và trách nhiệm cụ thể",
        "Kiểm tra định kỳ xem hình ảnh công chúng có còn phản ánh đúng giá trị và công việc thực tế",
      ],
      evidence: { body: "Neptune", house: 10 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 11",
      coreMeaning:
        "Hải Vương ở Nhà 11 thường đặt lý tưởng, lòng trắc ẩn và trí tưởng tượng vào tình bạn, cộng đồng và tầm nhìn tương lai. Bạn có thể được truyền cảm hứng bởi một mục tiêu chung, nhưng đóng góp bền vững cần vai trò rõ và khả năng nhìn nhóm như thực tế thay vì như biểu tượng của hy vọng.",
      strengths: [
        "Có xu hướng hình dung những khả năng nhân văn và kết nối người khác quanh một ước vọng chung",
        "Có thể cảm nhận bầu không khí nhóm và quan tâm đến những thành viên dễ bị bỏ sót",
      ],
      challenges: [
        "Dễ lý tưởng hóa cộng đồng hoặc thất vọng khi tập thể không sống đúng toàn bộ giá trị mong đợi",
        "Có thể đóng góp quá giới hạn vì vai trò, quyền quyết định và trách nhiệm chưa được nói rõ",
      ],
      developmentDirection: [
        "Chuyển tầm nhìn chung thành mục tiêu nhỏ, vai trò minh bạch và cách đánh giá có thể thống nhất",
        "Giữ lòng tin vào cộng đồng đồng thời quan sát cách nhóm thực sự phân bổ tiếng nói và trách nhiệm",
      ],
      evidence: { body: "Neptune", house: 11 },
    },
    {
      ruleId: "WESTERN-NEPTUNE-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Hải Vương ở Nhà 12",
      coreMeaning:
        "Hải Vương ở Nhà 12 thường nhấn mạnh đời sống nội tâm, trực giác, trí tưởng tượng và sự nhạy cảm với những điều khó gọi tên. Bạn có thể cần khoảng lặng để lắng nghe mình, nhưng vị trí này không tự động chứng minh năng lực siêu nhiên hay một căn tính tâm linh; ranh giới lành mạnh vẫn rất quan trọng.",
      strengths: [
        "Có thể nuôi dưỡng lòng trắc ẩn và cảm hứng sâu qua suy ngẫm, nghệ thuật hoặc đóng góp thầm lặng",
        "Thường nhận ra sắc thái nội tâm tinh tế khi có đủ không gian yên tĩnh để quan sát",
      ],
      challenges: [
        "Dễ hấp thụ bầu không khí xung quanh hoặc rút lui khi cảm xúc và trách nhiệm chưa được phân biệt",
        "Có thể dùng thế giới tưởng tượng để trì hoãn việc gọi tên một nhu cầu thực tế",
      ],
      developmentDirection: [
        "Tạo nhịp nghỉ, ghi chép hoặc thực hành sáng tạo có giới hạn thời gian để quan sát nội tâm",
        "Đưa cảm nhận mơ hồ về các bước chăm sóc đời sống, giao tiếp và ranh giới cụ thể",
      ],
      evidence: { body: "Neptune", house: 12 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-1-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 1",
      coreMeaning:
        "Diêm Vương ở Nhà 1 thường đưa chiều sâu và nhu cầu tự tái định nghĩa vào bản sắc, cách hiện diện và cách khẳng định mình. Bạn có thể trải nghiệm những giai đoạn muốn thay đổi tận gốc cách sống, nhưng sự chuyển hóa bền vững thường đến từ lựa chọn có ý thức chứ không phải một định mệnh bắt buộc.",
      strengths: [
        "Có xu hướng nhìn thẳng vào động cơ cá nhân và kiên trì thay đổi điều không còn phản ánh con người hiện tại",
        "Có thể phục hồi bản lĩnh sau những lần phải xem lại hình ảnh hoặc cách khẳng định bản thân",
      ],
      challenges: [
        "Dễ tạo ấn tượng quá mạnh hoặc cố kiểm soát cách người khác nhìn nhận mình",
        "Có thể giữ chặt một phiên bản bản thân vì sợ việc thay đổi làm mất cảm giác chủ động",
      ],
      developmentDirection: [
        "Phân biệt quyền lực cá nhân với nhu cầu kiểm soát phản ứng và lựa chọn của người khác",
        "Cho phép bản sắc cập nhật theo từng bước, giữ lại điều cốt lõi và buông vai trò đã hết phù hợp",
      ],
      evidence: { body: "Pluto", house: 1 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-2-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 2",
      coreMeaning:
        "Diêm Vương ở Nhà 2 thường làm các chủ đề giá trị, nguồn lực, an toàn và quyền kiểm soát được trải nghiệm với chiều sâu đáng kể. Bạn có thể muốn xây nền tảng rất vững hoặc tái cấu trúc cách tạo giá trị, đồng thời cần tránh để cảm giác an toàn phụ thuộc hoàn toàn vào việc nắm giữ.",
      strengths: [
        "Có thể đi tới gốc rễ của thói quen nguồn lực và xây lại ưu tiên khi cách cũ không còn hiệu quả",
        "Thường bền bỉ phát triển năng lực có giá trị lâu dài sau khi xác định điều thực sự quan trọng",
      ],
      challenges: [
        "Dễ giữ quá chặt tiền bạc, tài sản hoặc quan điểm giá trị khi cảm thấy nền tảng bị đe dọa",
        "Có thể đánh đồng giá trị bản thân với mức độ sở hữu hay khả năng kiểm soát nguồn lực",
      ],
      developmentDirection: [
        "Xây an toàn bằng nhiều lớp gồm kỹ năng, kế hoạch, quan hệ hỗ trợ và nguồn lực dự phòng",
        "Xem lại định kỳ điều nào đáng giữ, điều nào có thể chia sẻ và điều nào đã đến lúc buông",
      ],
      evidence: { body: "Pluto", house: 2 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-3-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 3",
      coreMeaning:
        "Diêm Vương ở Nhà 3 thường tạo nhu cầu tư duy sâu, truy tìm bản chất và giao tiếp có sức nặng. Bạn có thể không thỏa mãn với câu trả lời bề mặt, nhưng việc đặt câu hỏi hiệu quả hơn khi sự sắc bén đi cùng khả năng lắng nghe và cập nhật kết luận.",
      strengths: [
        "Có xu hướng nghiên cứu kiên trì và phát hiện giả định hoặc động cơ ẩn sau một vấn đề",
        "Có thể diễn đạt tập trung, thuyết phục và giúp cuộc trao đổi đi vào điều cốt lõi",
      ],
      challenges: [
        "Dễ biến trao đổi thành cuộc đấu ý chí hoặc đọc quá nhiều hàm ý vào lời nói chưa rõ",
        "Có thể bám chặt một kết luận vì đã đầu tư nhiều công sức vào việc chứng minh nó",
      ],
      developmentDirection: [
        "Dùng câu hỏi mở và bằng chứng để kiểm tra nhận định thay vì cố buộc cuộc trò chuyện tới một đáp án",
        "Chọn mức độ sâu phù hợp với bối cảnh và dành không gian cho người khác xử lý thông tin",
      ],
      evidence: { body: "Pluto", house: 3 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-4-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 4",
      coreMeaning:
        "Diêm Vương ở Nhà 4 thường đặt quá trình biến đổi sâu vào nền tảng gia đình, đời sống riêng và cảm giác thuộc về. Bạn có thể muốn hiểu tận gốc những khuôn mẫu được kế thừa và xây một nền tảng khác, nhưng vị trí này không khẳng định biến cố hay mất mát chắc chắn xảy ra.",
      strengths: [
        "Có thể nhận ra khuôn mẫu gia đình lâu đời và kiên trì thay đổi cách chúng tiếp tục ảnh hưởng hiện tại",
        "Thường có sức phục hồi để xây lại cảm giác an toàn từ bên trong khi nền tảng cần cập nhật",
      ],
      challenges: [
        "Dễ cố kiểm soát không gian riêng hoặc động lực gia đình để tránh cảm giác dễ tổn thương",
        "Có thể giữ kín nhu cầu quá lâu khiến những bất đồng nền tảng trở nên căng thẳng hơn",
      ],
      developmentDirection: [
        "Gọi tên ranh giới, vai trò và điều cần thay đổi bằng cuộc trao đổi cụ thể thay vì im lặng chịu đựng",
        "Giữ những giá trị nuôi dưỡng cảm giác thuộc về và chủ động kết thúc khuôn mẫu không còn hữu ích",
      ],
      evidence: { body: "Pluto", house: 4 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-5-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 5",
      coreMeaning:
        "Diêm Vương ở Nhà 5 thường đem cường độ vào sáng tạo, biểu đạt cá nhân, tình cảm và niềm vui. Bạn có thể dồn nhiều năng lượng vào điều mình yêu và tạo ra tác phẩm có chiều sâu, trong khi niềm vui cần khoảng thở để không trở thành nơi phải chứng minh hoặc kiểm soát.",
      strengths: [
        "Có xu hướng theo đuổi sáng tạo đến tận lõi và biến trải nghiệm mạnh thành hình thức biểu đạt có sức nặng",
        "Có thể tái tạo động lực sau giai đoạn cạn cảm hứng bằng cách tìm lại điều thực sự muốn nói",
      ],
      challenges: [
        "Dễ trở nên cực đoan giữa dồn toàn lực và mất hứng khi kết quả không đạt kỳ vọng",
        "Có thể muốn kiểm soát sự đáp lại trong tình cảm hoặc phản ứng của khán giả với biểu đạt cá nhân",
      ],
      developmentDirection: [
        "Duy trì nhịp sáng tạo đều đặn để cường độ phục vụ quá trình thay vì chỉ xuất hiện ở cao trào",
        "Cho tình cảm và niềm vui quyền phát triển tự nhiên, không biến sự gắn bó thành phép thử quyền lực",
      ],
      evidence: { body: "Pluto", house: 5 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-6-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 6",
      coreMeaning:
        "Diêm Vương ở Nhà 6 thường tập trung sức biến đổi vào công việc thường nhật, kỹ năng, thói quen và cách sử dụng năng lực. Bạn có thể muốn sửa quy trình tận gốc và làm việc rất tập trung, nhưng hiệu quả bền hơn khi cải tiến không trở thành nhu cầu kiểm soát mọi chi tiết.",
      strengths: [
        "Có thể phát hiện điểm yếu nền tảng trong một hệ thống và kiên trì xây lại cách vận hành",
        "Thường phát triển chuyên môn sâu nhờ khả năng tập trung và không ngại xử lý phần việc phức tạp",
      ],
      challenges: [
        "Dễ dồn quá nhiều năng lượng vào chi tiết hoặc tiêu chuẩn khiến công việc thiếu khoảng linh hoạt",
        "Có thể khó giao việc vì lo người khác không thực hiện đúng phương pháp hoặc mức độ mình mong muốn",
      ],
      developmentDirection: [
        "Ưu tiên vài thay đổi có tác động lớn và đo kết quả trước khi tái cấu trúc toàn bộ quy trình",
        "Phân định điều cần kiểm soát, điều có thể ủy quyền và mức hoàn thiện thực sự cần cho nhiệm vụ",
      ],
      evidence: { body: "Pluto", house: 6 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-7-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 7",
      coreMeaning:
        "Diêm Vương ở Nhà 7 thường làm quan hệ một-một trở thành nơi các chủ đề cường độ, quyền lực, lòng tin và thay đổi được nhìn rõ. Bạn có thể tìm kiếm kết nối sâu và có khả năng trưởng thành qua quan hệ, nhưng điều này không có nghĩa thao túng hay đổ vỡ chắc chắn xảy ra.",
      strengths: [
        "Có xu hướng nghiêm túc với cam kết và sẵn sàng đi tới gốc rễ của vấn đề quan hệ",
        "Có thể cùng đối phương tái cấu trúc thỏa thuận khi cả hai minh bạch và cùng chịu trách nhiệm",
      ],
      challenges: [
        "Dễ biến nhu cầu an toàn thành việc kiểm soát, thử lòng hoặc giữ thế mạnh trong quan hệ",
        "Có thể khó buông một xung đột cũ vì muốn hiểu hết động cơ hoặc đạt cảm giác thắng thua rõ ràng",
      ],
      developmentDirection: [
        "Nói thẳng về nhu cầu, quyền quyết định và ranh giới thay vì dùng im lặng hay áp lực để kiểm tra nhau",
        "Đánh giá sức khỏe quan hệ bằng sự đồng thuận và khả năng sửa chữa, không bằng mức độ cường độ",
      ],
      evidence: { body: "Pluto", house: 7 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-8-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 8",
      coreMeaning:
        "Diêm Vương ở Nhà 8 thường nhấn mạnh chiều sâu trong chia sẻ nguồn lực, sự thân mật, mất–được và những quá trình buông bỏ để tái cấu trúc. Bạn có thể đối diện tốt với vấn đề phức tạp, nhưng vị trí này không dự báo chắc chắn tai họa hay mất mát lớn.",
      strengths: [
        "Có thể giữ sự tập trung khi cần nghiên cứu hoặc xử lý những vấn đề chung nhiều lớp và nhạy cảm",
        "Thường có khả năng phục hồi bằng cách nhìn thẳng điều đã kết thúc và xây một cấu trúc mới phù hợp hơn",
      ],
      challenges: [
        "Dễ giữ chặt quyền kiểm soát nguồn lực chung hoặc thông tin riêng khi lòng tin chưa vững",
        "Có thể xem việc buông một cam kết cũ như mất quyền lực dù nó không còn phục vụ các bên",
      ],
      developmentDirection: [
        "Thiết lập minh bạch về quyền, nghĩa vụ, dữ liệu và lối ra trước khi tham gia cam kết sâu",
        "Thực hành buông theo từng bước có chuẩn bị, giữ bài học nhưng không duy trì cấu trúc đã hết tác dụng",
      ],
      evidence: { body: "Pluto", house: 8 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-9-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 9",
      coreMeaning:
        "Diêm Vương ở Nhà 9 thường đưa quá trình biến đổi sâu vào thế giới quan, niềm tin, học vấn cao và cách tìm ý nghĩa. Bạn có thể đào sâu một hệ tư tưởng đến tận nền tảng rồi thay đổi quan điểm mạnh mẽ, nhưng hiểu biết trưởng thành vẫn cần đối thoại và khả năng tự chất vấn.",
      strengths: [
        "Có xu hướng nghiên cứu nguồn gốc của niềm tin và nhận ra tác động quyền lực trong cách tri thức được hình thành",
        "Có thể tái xây thế giới quan vững hơn sau khi bằng chứng hoặc trải nghiệm làm thay đổi giả định cũ",
      ],
      challenges: [
        "Dễ bảo vệ niềm tin như một cuộc đấu quyền lực hoặc muốn thuyết phục người khác bằng mọi giá",
        "Có thể chuyển từ một kết luận tuyệt đối sang kết luận tuyệt đối khác khi thất vọng với hệ cũ",
      ],
      developmentDirection: [
        "Đối chiếu niềm tin với nhiều nguồn, hoàn cảnh và hệ quả thay vì chỉ tìm bằng chứng củng cố",
        "Giữ chiều sâu nghiên cứu đồng thời chừa chỗ cho sự không chắc chắn và khả năng cập nhật",
      ],
      evidence: { body: "Pluto", house: 9 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-10-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 10",
      coreMeaning:
        "Diêm Vương ở Nhà 10 thường làm các chủ đề quyền lực, trách nhiệm, tham vọng và tái cấu trúc nghề nghiệp được trải nghiệm sâu. Bạn có thể muốn tạo ảnh hưởng có ý nghĩa hoặc cải tổ hệ thống, nhưng vị trí này không bảo đảm quyền lực, thành công hay biến cố nghề nghiệp.",
      strengths: [
        "Có thể gánh trách nhiệm lớn và dẫn dắt thay đổi khi hiểu rõ mục tiêu cùng tác động của quyết định",
        "Thường có sức bền để xây lại hướng nghề nghiệp hoặc vị thế sau khi mô hình cũ không còn phù hợp",
      ],
      challenges: [
        "Dễ đồng nhất giá trị bản thân với quyền kiểm soát, chức danh hoặc khả năng tác động kết quả",
        "Có thể theo đuổi mục tiêu quá cực đoan hoặc khó rời một vai trò đã không còn lành mạnh",
      ],
      developmentDirection: [
        "Dùng ảnh hưởng để làm rõ trách nhiệm và nâng năng lực chung thay vì tập trung quyền quyết định",
        "Đặt tiêu chí thành công bao gồm tính bền vững, đạo đức và khả năng chuyển giao, không chỉ vị thế",
      ],
      evidence: { body: "Pluto", house: 10 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-11-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 11",
      coreMeaning:
        "Diêm Vương ở Nhà 11 thường đưa chiều sâu và sức biến đổi vào nhóm, cộng đồng, mạng lưới và mục tiêu dài hạn. Bạn có thể nhìn rõ động lực quyền lực trong tập thể và muốn thay đổi tận gốc cách nhóm vận hành, trong khi cải cách bền cần sự tham gia thực chất của các thành viên.",
      strengths: [
        "Có xu hướng cam kết sâu với mục tiêu chung và kiên trì xử lý nguyên nhân nền của vấn đề tập thể",
        "Có thể giúp một mạng lưới tái cấu trúc vai trò, nguồn lực hoặc tầm nhìn khi cách cũ đã bế tắc",
      ],
      challenges: [
        "Dễ bị cuốn vào cạnh tranh ảnh hưởng hoặc xem bất đồng trong nhóm như sự đe dọa lòng trung thành",
        "Có thể cố ép thay đổi nhanh hơn mức cộng đồng đủ tin tưởng và sẵn sàng cùng thực hiện",
      ],
      developmentDirection: [
        "Làm minh bạch quyền quyết định, lợi ích và cơ chế phản hồi trước khi thúc đẩy cải tổ sâu",
        "Đầu tư vào đồng thuận và năng lực tập thể để mục tiêu dài hạn không phụ thuộc vào một cá nhân",
      ],
      evidence: { body: "Pluto", house: 11 },
    },
    {
      ruleId: "WESTERN-PLUTO-HOUSE-12-V1",
      rulesetId: "western-planet-house-v1",
      version: "1.0.0",
      title: "Diêm Vương ở Nhà 12",
      coreMeaning:
        "Diêm Vương ở Nhà 12 thường hướng quá trình biến đổi vào đời sống nội tâm, những điều khó gọi tên và các khuôn mẫu diễn ra phía sau nhận thức thường ngày. Bạn có thể có sức phục hồi âm thầm khi dám quan sát gốc rễ, nhưng điều này không hàm ý nghiệp báo, định mệnh hay một vấn đề tâm lý bắt buộc.",
      strengths: [
        "Có thể kiên trì nhận diện động lực sâu và tái cấu trúc cách phản ứng từ bên trong",
        "Thường có khả năng làm việc hậu trường với vấn đề phức tạp mà không cần sự công nhận tức thời",
      ],
      challenges: [
        "Dễ cố kiểm soát cảm xúc khó gọi tên bằng cách che giấu hoặc tự xử lý mọi thứ trong im lặng",
        "Có thể bám vào một câu chuyện nội tâm cũ vì nó tạo cảm giác quen thuộc dù không còn hữu ích",
      ],
      developmentDirection: [
        "Gọi tên từng khuôn mẫu qua ghi chép, đối thoại tin cậy hoặc thực hành tự quan sát có cấu trúc",
        "Chuyển thay đổi nội tâm thành lựa chọn nhỏ trong đời sống và đánh giá tác động theo thời gian",
      ],
      evidence: { body: "Pluto", house: 12 },
    },
  ];
