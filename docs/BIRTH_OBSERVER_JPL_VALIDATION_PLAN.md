# Birth Observer — JPL Horizons validation contract

Trạng thái: **DONE / PASS** ngày 2026-08-25 cho `BOWP-P3-001`: 45/45 valid
oracle samples và 45/45 production comparisons PASS, maximum angular direction
separation `0.006605052335861644°` dưới frozen tolerance `0.03°`. Contract bên dưới đã được
**FROZEN PRE-ORACLE** trước retrieval và giữ nguyên làm lịch sử canonical.

P3B đã gửi request đầu tiên theo contract và dừng fail-closed vì response signature
version khác documentation version. Offline compatibility audit sau đó xác nhận raw
payload `1.2` vượt qua toàn bộ frozen semantic/header/parser gates; exact `1.2` được
owner-approved làm accepted live acquisition signature, tách biệt với docs version
`1.3`. Raw `VN-Sun` được tái sử dụng làm acquisition evidence; P3B sau đó lấy đúng
44 response còn lại và hoàn tất numeric validation. Tolerance `0.03°` giữ nguyên.

## 1. Nguồn canonical và ranh giới mô hình

Nguồn được đối chiếu:

- [NASA/JPL Horizons System manual](https://ssd.jpl.nasa.gov/horizons/manual.html),
  version 4.98d ngày 2025-11-21;
- [NASA/JPL Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html),
  version 1.3 (2025-06);
- package/docs đã pin trong repository: `astronomy-engine@2.1.19`, đặc biệt
  `Observer`, `Equator` và `Horizon` trong `node_modules/astronomy-engine/astronomy.d.ts`;
- production boundary hiện hành:
  `src/features/solar-system/observer-sky-projection.ts`.

Không dùng blog hoặc community source làm nguồn canonical.

Oracle là Horizons **Observer table**, `EPHEM_TYPE=OBSERVER`,
`QUANTITIES=4`, có tên chính thức **Apparent AZ & EL**. Quantity 4 trả góc
topocentric theo degree, azimuth đo theo chiều kim đồng hồ từ Bắc
`North(0) -> East(90) -> South(180) -> West(270)`, elevation so với mặt
phẳng vuông góc local zenith. Contract dùng output `AIRLESS`, không atmospheric
refraction.

Theo manual, Horizons quantity 4 điều chỉnh light-time, gravitational deflection
of light, stellar aberration, precession và nutation. Production
`astronomy-engine@2.1.19` dùng `Equator(body, date, observer, true, true)` nên là
topocentric, có light-time, parallax, equator-of-date/precession-nutation và
aberration; `Horizon(..., undefined)` tắt refraction. Package docs không hứa cùng
gravitational-light-deflection/Earth-orientation model với Horizons. Vì vậy đây là
so sánh giữa hai model độc lập có semantics tương thích, không phải giả định hai
engine identical.

## 2. Frozen Horizons request contract

### 2.1 Logical parameter map

P3B phải gửi **một target, một observer, một instant cho mỗi request** tới endpoint
GET được tài liệu hóa là `https://ssd.jpl.nasa.gov/api/horizons.api`. P3A không gọi
endpoint này.

| Parameter | Frozen value | Ghi chú |
| --- | --- | --- |
| `format` | `json` | Parser kiểm `signature`, `error` và đọc text trong `result`. |
| `COMMAND` | exact numeric body-center ID | Xem bảng ID ở mục 3. |
| `OBJ_DATA` | `NO` | Không cần object summary block. |
| `MAKE_EPHEM` | `YES` | Bắt buộc tạo ephemeris. |
| `EPHEM_TYPE` | `OBSERVER` | Observer table. |
| `CENTER` | `coord@399` | User-defined topocentric site trên Earth. |
| `COORD_TYPE` | `GEODETIC` | Geodetic site triplet. |
| `SITE_COORD` | `<east-longitude>,<latitude>,0` | Degree, degree, km; longitude trước latitude. |
| `TIME_TYPE` | `UT` | Với corpus sau 1962, Horizons dùng UTC. |
| `TIME_ZONE` | `+00:00` | UTC explicit. |
| `TLIST` | exact UTC calendar time | Một calendar timestamp, xem mục 2.2. |
| `TLIST_TYPE` | `CAL` | Không cho Horizons tự suy diễn JD/MJD. |
| `TIME_DIGITS` | `SECONDS` | Input/output giữ precision đến giây. |
| `CAL_FORMAT` | `CAL` | Calendar output explicit. |
| `CAL_TYPE` | `GREGORIAN` | Proleptic Gregorian input/output policy explicit. |
| `QUANTITIES` | `4` | `Apparent AZ & EL`. |
| `APPARENT` | `AIRLESS` | Atmospheric refraction OFF. |
| `ANG_FORMAT` | `DEG` | Decimal-degree angular format explicit. |
| `EXTRA_PREC` | `YES` | Giữ số chữ số góc tối đa API cung cấp. |
| `REF_SYSTEM` | `ICRF` | Khóa default frame thay vì phụ thuộc default ngầm. |
| `ELEV_CUT` | `-90` | Tắt elevation filter. |
| `SKIP_DAYLT` | `NO` | Không bỏ sample ban ngày. |
| `AIRMASS` | `38.0` | Giá trị tài liệu hóa để tắt airmass filtering. |
| `SOLAR_ELONG` | `0,180` | Tắt solar-elongation filtering. |
| `LHA_CUTOFF` | `0.0` | Tắt local-hour-angle filtering. |
| `ANG_RATE_CUTOFF` | `0.0` | Tắt angular-rate filtering. |
| `R_T_S_ONLY` | `NO` | Không chuyển sang rise/transit/set-only output. |
| `CSV_FORMAT` | `YES` | Row giữa `$$SOE`/`$$EOE` có dạng ổn định để parse. |

Các spelling và allowable value trên đều có trong Horizons API 1.3. Không dùng
`START_TIME`, `STOP_TIME` hoặc `STEP_SIZE` cùng `TLIST`.

`REF_SYSTEM=ICRF` được giữ explicit vì API mô tả nó là frame cho geometric và
astrometric quantities. Quantity 4 được manual định nghĩa là local apparent
azimuth/elevation of-date và không mô tả `REF_SYSTEM` là một correction switch
cho các local axes này. Do đó contract không kỳ vọng `REF_SYSTEM` làm thay đổi vật
lý của quantity 4, nhưng vẫn khóa và lưu nó để loại bỏ default ambiguity. Đây là
phân tích semantics tài liệu, chưa phải kết luận thực nghiệm.

### 2.2 Calendar serialization và URL encoding

`ObservationContext.instantUtc` là source of truth. P3B phải chuyển đúng instant
đó sang dạng ASCII:

```text
YYYY-MMM-DD HH:mm:ss
```

với English month token, không đổi ngày theo local timezone. Ví dụ
`1990-01-15T01:30:00Z` được gửi dưới `TLIST` là
`1990-Jan-15 01:30:00`; `TIME_TYPE=UT` và `TIME_ZONE=+00:00` đã khóa UTC nên
không thêm offset khác vào timestamp.

Request builder phải dùng `URLSearchParams` hoặc encoder tương đương. `format=json`
không quote; các Horizons setting còn lại được single-quote theo API examples rồi
URL-encode. Đặc biệt space, comma, single quote và dấu `+` trong `+00:00` phải được
encode; không ghép query string thủ công. Fixture provenance lưu cả decoded logical
parameter map và exact serialized request URL.

### 2.3 Observer coordinate semantics

JPL site triplet là:

```text
CENTER=coord@399
COORD_TYPE=GEODETIC
SITE_COORD=<east-longitude>,<north-positive-geodetic-latitude>,0
```

- longitude east-positive; các longitude âm hiện hành của London/New York được gửi
  nguyên dạng east-longitude âm, không đổi sang west-positive convention;
- latitude geodetic north-positive;
- thứ tự bắt buộc là longitude, latitude, altitude; không swap lat/lon;
- altitude JPL là km trên ITRF93/WGS-84 reference ellipsoid; V1 gửi `0 km`;
- production tiếp tục dùng latitude/longitude hiện hành và elevation `0 m`.

Horizons có thể chuẩn hóa longitude âm thành giá trị east-longitude tương đương
trong `[0,360)` ở output header. Kiểm provenance phải so sánh modulo 360, không xem
`-74.006` và `285.994` là hai site khác nhau. Astronomy Engine mô tả height theo
mean sea level còn Horizons mô tả height theo reference ellipsoid; corpus V1 khóa
cả hai ở đúng numeric zero. Mọi validation elevation khác zero sau này cần study
datum riêng và không được suy rộng từ P3 này.

### 2.4 Response acceptance trước khi parse AZ/EL

P3B parser phải fail closed nếu một trong các điều sau không đạt:

1. JSON parse không thành công, có trường `error`, hoặc thiếu `signature`/`result`;
2. API signature/version không được ghi nhận hoặc khác contract parser đã review;
3. header không xác nhận đúng target ID, Earth `399`, user-defined geodetic site,
   submitted instant/time scale hoặc `Atmos refraction: NO (AIRLESS)`;
4. observer coordinates trong header không tương đương site đã gửi;
5. không có đúng một data row giữa `$$SOE` và `$$EOE`;
6. không nhận diện được cột airless azimuth/elevation của quantity 4 hoặc giá trị
   không finite/ngoài domain hợp lệ.

Không được chỉ parse hai số theo fixed whitespace position rồi bỏ qua header.

## 3. Frozen target body-center IDs

Horizons manual phân biệt planet-center IDs kết thúc bằng `99` với system
barycenter IDs `0..9`; contract bắt buộc body center.

| Target | Horizons `COMMAND` |
| --- | ---: |
| Sun | `10` |
| Moon | `301` |
| Mercury | `199` |
| Venus | `299` |
| Mars | `499` |
| Jupiter | `599` |
| Saturn | `699` |
| Uranus | `799` |
| Neptune | `899` |
| Pluto | `999` |

Không thay các ID trên bằng barycenter `1..9`, kể cả khi một barycenter có khoảng
thời gian hỗ trợ dài hơn.

## 4. Frozen validation corpus

### 4.1 Base corpus — 40 samples

Mỗi context dưới đây được ghép với toàn bộ 10 body-center IDs ở mục 3.

| Context ID | Canonical local input | IANA timezone | Latitude | East longitude | Resolved `instantUtc` | Samples |
| --- | --- | --- | ---: | ---: | --- | ---: |
| `VN` | `1990-01-15 08:30` | `Asia/Ho_Chi_Minh` | `10.8231` | `106.6297` | `1990-01-15T01:30:00Z` | 10 |
| `LON` | `2000-01-01 12:00` | `Europe/London` | `51.5074` | `-0.1278` | `2000-01-01T12:00:00Z` | 10 |
| `NYC` | `1985-07-23 18:45` | `America/New_York` | `40.7128` | `-74.0060` | `1985-07-23T22:45:00Z` | 10 |
| `SYD` | `1992-11-05 14:20` | `Australia/Sydney` | `-33.8688` | `151.2093` | `1992-11-05T03:20:00Z` | 10 |

Sample ID có dạng `<context>-<target>`, ví dụ `VN-Moon`. Base total là
`4 contexts x 10 bodies = 40 samples`.

### 4.2 Edge corpus — 5 samples

Các case sau được chọn và ghi lại **trước mọi Horizons ephemeris request**. Giá trị
selection AZ/alt bên dưới được tính cục bộ bằng đúng production-equivalent
`astronomy-engine@2.1.19` path (`Observer` -> `Equator(..., true, true)` ->
`Horizon(..., undefined)`). Chúng chỉ chứng minh tiêu chí chọn hình học, không phải
oracle fixture và không phải independent validation.

| Sample ID | Target | Canonical local input | IANA timezone | Latitude | East longitude | Resolved `instantUtc` | Frozen geometric criterion | Local selection diagnostic |
| --- | --- | --- | --- | ---: | ---: | --- | --- | --- |
| `EDGE-EQUATOR-MARS` | Mars `499` | `2000-03-20 12:00` | `Africa/Accra` | `0` | `0` | `2000-03-20T12:00:00Z` | exact geodetic equator; không gần zenith | AZ `67.862886°`, alt `60.335644°` |
| `EDGE-HIGH-LAT-SATURN` | Saturn `699` | `2000-01-01 13:00` | `Europe/Oslo` | `69.6492` | `18.9553` | `2000-01-01T12:00:00Z` | high-latitude Tromso observer | AZ `76.867076°`, alt `8.604002°` |
| `EDGE-MOON-HORIZON` | Moon `301` | `1990-01-15 21:31` | `Asia/Ho_Chi_Minh` | `10.8231` | `106.6297` | `1990-01-15T14:31:00Z` | `abs(local geometric altitude) < 0.1°` | AZ `88.290315°`, alt `-0.042038°` |
| `EDGE-SUN-HORIZON` | Sun `10` | `2000-01-01 08:13` | `Europe/London` | `51.5074` | `-0.1278` | `2000-01-01T08:13:00Z` | `abs(local geometric altitude) < 0.1°` | AZ `128.955188°`, alt `-0.012442°` |
| `EDGE-AZ-WRAP-MARS` | Mars `499` | `1985-07-23 00:57` | `America/New_York` | `40.7128` | `-74.0060` | `1985-07-23T04:57:00Z` | distance to North wrap `< 0.1°`; `abs(alt) < 80°` | AZ `0.033917°`, alt `-27.833588°` |

Selection scan chỉ dùng bước phút trong ngày; không refine đến giây, không dùng JPL
error để chọn hoặc chỉnh timestamp. Ngưỡng `0.1°` ở bảng chỉ là edge-selection
criterion, không phải validation tolerance. Không case nào là exact zenith/nadir.

Mỗi hàng đã được kiểm cục bộ bằng cách truyền đúng `birthDate`, `hour`, `minute`,
latitude, longitude và IANA timezone trong bảng vào `createObservationContext(...)`.
Builder trả đúng `instantUtc` đã ghi, second `00`, elevation `0 m` và timezone
provenance `birth-time-pipeline` cho cả 5/5 case. Không edge context nào được dựng
thủ công hoặc gắn provenance cho một instant không thể sinh từ current user input.

Frozen total corpus: **45 samples**.

## 5. Frozen comparison metric và tolerance

### 5.1 Primary metric

Với mỗi cặp `(az, alt)`, đổi degree sang radian và tạo unit direction trong local
right-handed semantic axes:

```text
North = +X
East  = +Y
Up    = +Z

x = cos(alt) * cos(az)
y = cos(alt) * sin(az)
z = sin(alt)
```

Primary comparison:

```text
dot = productionUnit.x * jplUnit.x
    + productionUnit.y * jplUnit.y
    + productionUnit.z * jplUnit.z

directionSeparationDegrees =
  radiansToDegrees(acos(clamp(dot, -1, +1)))
```

Raw azimuth subtraction không phải primary metric vì wrap `0°/360°` và azimuth
instability gần zenith/nadir. Có thể lưu diagnostics:

```text
azimuthShortestDifferenceDegrees =
  abs(normalizeToMinus180Plus180(productionAzimuth - jplAzimuth))

altitudeAbsoluteDifferenceDegrees =
  abs(productionAltitude - jplAltitude)
```

### 5.2 Frozen pass threshold

```text
maximum local-sky direction separation = 0.03°
```

xấp xỉ `1.8 arcmin`. Một sample chỉ đạt numeric gate khi
`directionSeparationDegrees <= 0.03`. P3 chỉ có thể PASS khi cả 45/45 sample đạt,
mọi response/header/provenance gate hợp lệ và validation test thực sự được chạy.
Threshold này được khóa trước oracle output. Nếu sample vượt threshold, trạng thái
là **P3 FAIL / investigation**; không nới tolerance trong retrieval task để fit kết
quả.

### 5.3 Horizon classification diagnostic

Production giữ nguyên:

```text
aboveHorizon = altitude >= 0
```

JPL numeric altitude là nguồn độc lập để so sánh. Không dùng equality của boolean
`aboveHorizon` làm hard gate khi:

```text
abs(JPL altitude) <= 0.03°
```

vì một khác biệt nhỏ hơn tolerance có thể đi qua `0°`. Ngoài boundary hẹp này,
sign mismatch là regression flag mạnh và buộc investigation trước khi P3 có thể
PASS. Primary numeric gate vẫn là unit-direction separation.

## 6. Time-model scope và claim boundary

Toàn bộ 45 sample là historical/past và sau 1962. Horizons manual định nghĩa
`TIME_TYPE=UT` là UT1 trước 1962 và UTC sau 1962; tương lai còn phụ thuộc leap-second
và EOP assumptions chưa biết. Vì vậy submitted calendar timestamp ở corpus này phải
trùng exact `ObservationContext.instantUtc`, và P3 chủ yếu đo observer-coordinate
implementation thay vì historical/future time reconstruction.

P3 chỉ xác nhận corpus đại diện nêu trên. Nó **không** xác nhận toàn dải Solar
`1600–2200`, không xác nhận epoch trước 1962, epoch tương lai, leap-second prediction,
UT1 reconstruction, EOP extrapolation hoặc non-zero elevation datum. Bất kỳ claim
nào như vậy cần time-model validation task riêng.

## 7. Frozen fixture provenance contract cho P3B

Mỗi request/sample group phải lưu đủ:

- stable sample ID và corpus version;
- Horizons API signature/source/version và Horizons system/version nếu response có;
- retrieval timestamp UTC;
- exact decoded request parameter map và exact serialized request URL;
- target name và exact numeric body-center ID;
- submitted observer latitude, east-longitude và elevation km;
- submitted UTC calendar timestamp và canonical `ObservationContext.instantUtc`;
- Horizons-reported time scale/time tag;
- Horizons-reported center, geodetic site coordinates, Earth frame/EOP details;
- solution/ephemeris identifier, source và model information nếu header có;
- explicit `AIRLESS`/refraction-OFF evidence;
- immutable raw JSON response hoặc stable raw response artifact;
- raw returned JPL AZ/EL;
- production AZ/EL được tính tại cùng instant/site;
- unit-direction separation;
- shortest azimuth và absolute altitude diagnostics;
- JPL/production horizon signs và boundary treatment;
- frozen tolerance `0.03°`;
- per-sample PASS/FAIL và aggregate 45/45 result.

Raw response phải được giữ trong repository ở dạng stable/reviewable hoặc được biểu
diễn đầy đủ tương đương với governance của Solar JPL fixtures hiện hành. Canonical
fixture không được chỉ giữ hai số đã copy mà mất header/model/site/time evidence.
Mọi fixture là test-only/static; production runtime không được gọi hoặc phụ thuộc
JPL.

## 8. Current gate status

```text
BOWP-P2-001 = DONE
BOWP-P3-001 = DONE / PASS — 45/45 valid oracle samples and comparisons
Observer validation = PASS within the frozen corpus and documented limitations
BOWP-P4-001 = READY
```

Không được thay accepted signature thành wildcard/range, hoặc thay corpus, query,
metric hay tolerance.

## 9. P3B execution record — fail closed trước canonicalization

Acquisition bắt đầu `2026-08-25T14:01:20.874Z`. Request `1/45`, sample
`VN-Sun`, được gửi bằng exact frozen query contract theo policy strictly sequential,
concurrency `1`, automatic retries `0`. Response HTTP `200` được nhận lúc
`2026-08-25T14:01:22.177Z` với signature:

```text
source  = NASA/JPL Horizons API
version = 1.2
```

Frozen parser/docs contract dự kiến API version `1.3`. Theo fail-closed gate, parser
dừng ngay với:

```text
Horizons API version drift: expected 1.3, received 1.2.
```

Không gửi 44 request còn lại. Không có sample nào được canonicalize thành oracle
fixture và không có production-vs-JPL comparison nào được dùng để kết luận numeric
PASS/FAIL. Vì vậy maximum direction/AZ/altitude diagnostics đều **N/A**, validation
vẫn **NOT PASS** và tolerance frozen vẫn đúng `0.03°`.

Raw failure provenance được giữ tại
`src/features/solar-system/fixtures/observer-jpl-horizons-acquisition-failure.json`,
gồm retrieval UTC, exact decoded parameters, serialized URL, HTTP status, raw JSON,
textual `result`, target/site/time query và observed signature. Response header có
target Sun `(10)`, center Earth `(399)`, user-defined geodetic site
`106.6297, 10.8231, ~0 km`, Gregorian calendar, EOP metadata và
`Atmos refraction: NO (AIRLESS)`; các trường này chỉ là investigation evidence,
không vượt qua version gate và không phải canonical oracle fixture.

Possible cause cần owner review: public documentation/parser contract đang ở API
`1.3` nhưng live payload tự nhận `1.2`, hoặc service signature chưa đồng bộ với docs.
Không có evidence để quy nguyên nhân cho production astronomy, time model, observer
coordinates hoặc tolerance vì comparison chưa được phép chạy.

Verification của fail-closed implementation: frozen-contract/version-drift targeted
tests `3/3` PASS; ObserverSkyProjection tests `12/12` PASS; full unit `648/648`
PASS; lint và `git diff --check` PASS. Production build compile và TypeScript PASS,
sau đó page-data collection bị chặn đúng bởi environment thiếu `SITE_URL`; không
invent domain hoặc sửa SEO config.

## 10. Offline API-version compatibility amendment

Investigation này không gọi thêm JPL/network và không chạy 44 request còn lại.
Nguồn official đã review ghi:

```text
Horizons API documentation version = 1.3 (2025 June)
1.3 change log = update documentation to mention TIME_TYPE
1.2 change log = update documentation to list CAL_TYPE
Observed live payload signature = NASA/JPL Horizons API 1.2
```

Hai change-log entry chỉ mô tả thay đổi tài liệu; chúng không tự chứng minh payload
`1.2` và `1.3` identical. Compatibility được quyết định bằng audit raw response thực
tế đã lưu, không bằng version-range inference.

| Frozen semantic gate | Audit result | Raw evidence |
| --- | --- | --- |
| JSON parse | PASS | Stored object load thành công. |
| `signature.source` | PASS | `NASA/JPL Horizons API`. |
| `signature.version` | PASS theo amendment | Exact observed `1.2`. |
| Không có `error` | PASS | Property không hiện diện. |
| Có textual `result` | PASS | String dài 6736 characters. |
| Target | PASS | `Sun (10)`, source `DE441`. |
| Center | PASS | `Earth (399)`, source `DE441`. |
| Topocentric site | PASS | `Center-site name: (user defined site below)`. |
| Geodetic coordinates | PASS | `106.6297, 10.8231, 1.4971E-12 km`; equivalent submitted `106.6297,10.8231,0`. |
| Submitted UT instant | PASS | Row `1990-Jan-15 01:30:00.000`; UT header; exact frozen `1990-01-15T01:30:00Z`. |
| AIRLESS | PASS | `Atmos refraction: NO (AIRLESS)`. |
| Data-row cardinality | PASS | Đúng 1 non-empty row giữa `$$SOE`/`$$EOE`. |
| Quantity 4 columns | PASS | Semantic headers `Azimuth_(a-app)`, `Elevation_(a-app)`; không fixed offsets. |
| Numeric/domain | PASS | AZ `121.654852045°` trong `[0,360)`; EL `28.744945291°` trong `[-90,90]`; cả hai finite. |

Parser audit cũng phát hiện output geodetic altitude dùng scientific notation.
Numeric token parser đã được sửa để đọc exponent đầy đủ; `1.4971E-12 km` được so
đúng như gần-zero thay vì bị cắt thành `1.4971 km`.

Owner-approved compatibility policy cho frozen acquisition run:

```text
documentationVersion = 1.3
acceptedLiveApiSignatureVersion = exactly 1.2
any other signature version = fail closed
```

Không chấp nhận wildcard, `>=1.2`, hoặc open-ended version list. Version check không
bị xóa. Stored raw `VN-Sun` được đánh dấu reusable acquisition evidence cho request
đầu tiên; tại checkpoint compatibility này chưa numeric-compare với production và
Observer validation vẫn **NOT PASS**.

Offline amendment verification: targeted parser/version compatibility tests `4/4`
PASS; targeted TypeScript check cho contract/test PASS; targeted ESLint PASS; `git
diff --check` PASS. Không test nào thực hiện HTTP request hoặc đọc fixture oracle.

## 11. P3B completed acquisition and numeric validation record

Preflight đã parse lại raw `VN-Sun`, xác nhận exact sample/request parameter map,
serialized URL, HTTP `200`, source/signature `NASA/JPL Horizons API 1.2`, toàn bộ
semantic/header gates và production comparison. Response này được reuse; không gửi
lại request `VN-Sun`.

Resume acquisition chạy strict sequential bằng `for` + `await`, concurrency `1`,
automatic retries `0`, inter-request delay `250 ms`. Đúng **44** JPL requests mới
được gửi cho samples `02/45` đến `45/45`. Toàn bộ 44 response mới trả HTTP `200`,
exact signature `1.2`, vượt parser/header/provenance gates; không có response fail,
missing hoặc mixed API version.

Static evidence:

- `src/features/solar-system/fixtures/observer-jpl-horizons-raw.json`: 45 raw
  responses đầy đủ, gồm 1 reused + 44 acquired, request/provenance/header/JPL AZ/EL
  và per-sample production comparison;
- `src/features/solar-system/fixtures/observer-jpl-horizons-results.json`: 45
  comparisons và aggregate frozen result;
- `src/features/solar-system/fixtures/observer-jpl-horizons-acquisition-failure.json`:
  historical first-response/version-investigation evidence, giữ nguyên để audit.

| Gate/diagnostic | Result |
| --- | --- |
| Valid oracle responses | `45/45` |
| Production comparisons | `45/45` |
| PASS / FAIL | `45 / 0` |
| Frozen primary tolerance | `0.03°` |
| Maximum direction separation | `0.006605052335861644°` at `NYC-Saturn` |
| Maximum shortest AZ difference | `0.006500621439045062°` at `NYC-Saturn` |
| Maximum absolute altitude difference | `0.003459597359011468°` at `NYC-Saturn` |
| Horizon regression flags | `0` |

Maximum sample diagnostic `NYC-Saturn`, observer `40.7128, -74.0060`, instant
`1985-07-23T22:45:00Z`:

```text
production AZ/EL = 156.799744881561° / 30.057524896359°
JPL AZ/EL        = 156.806245503°    / 30.054065299°
direction separation = 0.006605052335861644°
```

Primary gate dùng local unit-vector angular separation với dot clamp `[-1,+1]`;
raw AZ/EL differences chỉ là diagnostics. `BOWP-P3-001` vì vậy **DONE / PASS** và
`BOWP-P4-001` chuyển sang **READY**, chưa được triển khai trong task này.

Claim chỉ áp dụng frozen 45-sample post-1962 corpus, elevation `0`; không suy rộng
sang toàn range `1600–2200`, pre-1962 UT1, future EOP/leap-second behavior hoặc
non-zero elevation.

Verification sau canonicalization: targeted parser/signature/corpus/comparator/
wrap/static-fixture plus Observer projection tests `20/20` PASS; full unit
`653/653` PASS; full ESLint PASS; changed-file TypeScript PASS. Full-repo `tsc
--noEmit` vẫn không PASS do các lỗi đã tồn tại ngoài changed files trong
`observation-context.test.ts` và Western synthesis tests. Production build compile
và Next TypeScript PASS, sau đó page-data collection dừng vì environment thiếu
`SITE_URL`; không dùng domain giả và không ghi production build PASS. `git diff
--check` PASS.
