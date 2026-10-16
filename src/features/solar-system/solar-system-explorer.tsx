"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock3,
  Compass,
  Eye,
  EyeOff,
  Focus,
  Info,
  Pause,
  Play,
  RotateCcw,
  Tags,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { readActiveBirthSession } from "../../lib/active-birth-session";
import type { SolarSystemRenderer } from "./solar-system-renderer";
import { AstronomyEngineProvider } from "./astronomy-engine-provider";
import {
  resolveBirthObserverEntry,
  type BirthObserverEntryState,
} from "./birth-observer-entry";
import { evaluateObserverCapability } from "./observer-capability";
import {
  calculateObserverSkyProjection,
  type ObserverSkyProjection,
} from "./observer-sky-projection";
import { ObserverSkyView } from "./observer-sky-view";
import { PLANETS, PLANET_BY_ID, type PlanetId } from "./solar-system-data";
import {
  DEFAULT_SIMULATION_SPEED_INDEX,
  SIMULATION_SPEED_OPTIONS,
} from "./simulation-speed";
import {
  SimulationClock,
  formatSimulationDateTime,
  parseSimulationDateTime,
} from "./simulation-time";
import styles from "./solar-system.module.css";

const numberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 1,
});
const astronomyEngineProvider = new AstronomyEngineProvider();
type ObserverStage = "solar" | "birth-earth" | "birth-observer";

function formatSpeed(speed: number): string {
  return `${numberFormatter.format(speed)}×`;
}

function formatTimeRate(speed: number): string {
  return `${numberFormatter.format(speed)} ngày/giây`;
}

export function SolarSystemExplorer() {
  const sceneMountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<SolarSystemRenderer | null>(null);
  const simulationClockRef = useRef<SimulationClock | null>(null);
  const observerEntryButtonRef = useRef<HTMLButtonElement>(null);
  const restoreObserverEntryFocusRef = useRef(false);
  const planetButtonRefs = useRef(new Map<PlanetId, HTMLButtonElement>());
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId | null>(null);
  const [controlsExpanded, setControlsExpanded] = useState(true);
  const [birthInfoExpanded, setBirthInfoExpanded] = useState(true);
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [orbitsVisible, setOrbitsVisible] = useState(true);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [sceneStatus, setSceneStatus] = useState<"loading" | "ready" | "error">("loading");
  const [speedIndex, setSpeedIndex] = useState(DEFAULT_SIMULATION_SPEED_INDEX);
  const [simulationTimestamp, setSimulationTimestamp] = useState<number | null>(null);
  const [timeZone, setTimeZone] = useState("Asia/Ho_Chi_Minh");
  const [timeError, setTimeError] = useState<string | null>(null);
  const [observerEntry, setObserverEntry] = useState<BirthObserverEntryState>({ status: "loading" });
  const [observerStage, setObserverStage] = useState<ObserverStage>("solar");
  const [observerProjection, setObserverProjection] = useState<ObserverSkyProjection | null>(null);
  const [observerError, setObserverError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setObserverEntry(resolveBirthObserverEntry(readActiveBirthSession()?.birthData ?? null));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (observerStage !== "solar" || !restoreObserverEntryFocusRef.current) {
      return;
    }
    restoreObserverEntryFocusRef.current = false;
    observerEntryButtonRef.current?.focus();
  }, [observerStage]);

  useEffect(() => {
    const mount = sceneMountRef.current;
    if (!mount) {
      return;
    }

    let disposed = false;
    let renderer: SolarSystemRenderer | null = null;
    let earthHoverTimer: ReturnType<typeof setTimeout> | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsPaused(reducedMotion);
    const simulationClock = new SimulationClock(Date.now());
    simulationClock.setPaused(reducedMotion);
    simulationClockRef.current = simulationClock;
    setSimulationTimestamp(simulationClock.getTimestamp());
    void import("./solar-system-renderer")
      .then(({ SolarSystemRenderer: Renderer }) => {
        if (disposed) {
          return;
        }
        renderer = new Renderer(
          mount,
          {
            onSelect: (planetId) => {
              setSelectedPlanetId(planetId);
            },
            onHover: (planetId) => {
              if (earthHoverTimer) {
                clearTimeout(earthHoverTimer);
                earthHoverTimer = null;
              }
              if (planetId === "earth") {
                earthHoverTimer = setTimeout(() => {
                  setSelectedPlanetId("earth");
                }, 700);
              }
            },
            onError: () => setSceneStatus("error"),
            onSimulationTimeChange: setSimulationTimestamp,
            onBirthObserverHandoff: (context) => {
              const capability = evaluateObserverCapability(context);
              if (!capability.supported) {
                setObserverError("Mốc sinh nằm ngoài phạm vi Observer 1600–2200. Dữ liệu gốc không bị thay đổi.");
                setObserverStage("birth-observer");
                return;
              }
              const result = calculateObserverSkyProjection(context);
              if (!result.ok) {
                setObserverError("Không thể dựng bầu trời từ projection production cho hồ sơ này.");
                setObserverStage("birth-observer");
                return;
              }
              setObserverProjection(result.projection);
              setObserverStage("birth-observer");
            },
          },
          reducedMotion,
          astronomyEngineProvider,
          simulationClock,
        );
        rendererRef.current = renderer;
        setSceneStatus("ready");
      })
      .catch(() => {
        if (!disposed) {
          setSceneStatus("error");
        }
      });

    return () => {
      disposed = true;
      if (earthHoverTimer) {
        clearTimeout(earthHoverTimer);
      }
      renderer?.dispose();
      rendererRef.current = null;
      simulationClockRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (sceneStatus !== "ready" || observerStage !== "solar") {
      return;
    }
    if (selectedPlanetId) {
      rendererRef.current?.focusPlanet(selectedPlanetId);
    } else {
      rendererRef.current?.showOverview();
    }
  }, [observerStage, sceneStatus, selectedPlanetId]);

  useEffect(() => {
    if (!selectedPlanetId) {
      return;
    }
    planetButtonRefs.current.get(selectedPlanetId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedPlanetId]);

  const selectPlanet = (planetId: PlanetId) => {
    setSelectedPlanetId(planetId);
  };

  const showOverview = () => {
    setSelectedPlanetId(null);
  };

  const enterBirthObserver = () => {
    if (observerEntry.status !== "ready" || sceneStatus !== "ready" || !rendererRef.current) {
      return;
    }

    setObserverError(null);
    setObserverProjection(null);
    setObserverStage("birth-earth");
    setSelectedPlanetId(null);
    const result = rendererRef.current.enterBirthEarth(observerEntry.context);
    if (!result.ok) {
      setObserverStage("solar");
      setObserverError(
        result.reason === "outside-supported-range"
          ? "Mốc sinh nằm ngoài phạm vi Observer 1600–2200. Dữ liệu gốc không bị thay đổi."
          : "Không thể bắt đầu snapshot sinh chính xác cho hồ sơ này.",
      );
      return;
    }

    setIsPaused(true);
    setSimulationTimestamp(observerEntry.context.timestampUtcMs);
    setTimeError(null);
  };

  const exitBirthObserver = () => {
    restoreObserverEntryFocusRef.current = true;
    rendererRef.current?.showOverview();
    setObserverStage("solar");
    setObserverProjection(null);
    setObserverError(null);
    setSelectedPlanetId(null);
    setIsPaused(true);
  };

  const togglePaused = () => {
    const nextValue = !isPaused;
    setIsPaused(nextValue);
    rendererRef.current?.setPaused(nextValue);
  };

  const toggleOrbits = () => {
    const nextValue = !orbitsVisible;
    setOrbitsVisible(nextValue);
    rendererRef.current?.setOrbitsVisible(nextValue);
  };

  const toggleLabels = () => {
    const nextValue = !labelsVisible;
    setLabelsVisible(nextValue);
    rendererRef.current?.setLabelsVisible(nextValue);
  };

  const changeSpeed = (nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(SIMULATION_SPEED_OPTIONS.length - 1, nextIndex));
    setSpeedIndex(clampedIndex);
    rendererRef.current?.setSimulationSpeed(SIMULATION_SPEED_OPTIONS[clampedIndex]);
  };

  const pauseForTimeEditing = () => {
    if (!isPaused) {
      setIsPaused(true);
      rendererRef.current?.setPaused(true);
    }
  };

  const changeSimulationDateTime = (date: string, time: string) => {
    const timestamp = parseSimulationDateTime({ date, time }, timeZone);
    if (timestamp === null) {
      setTimeError("Ngày, giờ hoặc múi giờ nằm ngoài phạm vi 1600–2200.");
      return;
    }
    setTimeError(null);
    setSimulationTimestamp(timestamp);
    rendererRef.current?.setSimulationTime(timestamp);
  };

  const setToNow = () => {
    setTimeError(null);
    rendererRef.current?.setToNow();
  };

  const selectedPlanet = selectedPlanetId ? PLANET_BY_ID[selectedPlanetId] : null;
  const simulationSpeed = SIMULATION_SPEED_OPTIONS[speedIndex];
  const dateTimeInput = simulationTimestamp === null
    ? { date: "", time: "" }
    : formatSimulationDateTime(simulationTimestamp, timeZone);
  const timeZoneOptions = Array.from(new Set([
    timeZone,
    "UTC",
    "Asia/Ho_Chi_Minh",
    "Asia/Tokyo",
    "Europe/London",
    "America/New_York",
  ]));

  return (
    <main className={styles.explorer} aria-labelledby="solar-system-title">
      <div
        ref={sceneMountRef}
        className={styles.scene}
        aria-label="Mô hình ba chiều tương tác của Mặt Trời và tám hành tinh"
        aria-hidden={observerStage === "birth-observer"}
      />

      <header className={styles.header}>
        <div className={styles.headerActions}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" size={16} />
            Thiên Vận
          </Link>
          <button
            type="button"
            className={`${styles.panelToggle} ${styles.headerToggle}`}
            aria-expanded={headerExpanded}
            aria-controls="solar-header-content"
            aria-label={headerExpanded ? "Thu gọn tiêu đề Hệ Mặt Trời" : "Mở tiêu đề Hệ Mặt Trời"}
            title={headerExpanded ? "Thu gọn tiêu đề" : "Mở tiêu đề Hệ Mặt Trời"}
            onClick={() => setHeaderExpanded((expanded) => !expanded)}
          >
            {headerExpanded ? <ChevronUp aria-hidden="true" size={16} /> : <ChevronDown aria-hidden="true" size={16} />}
          </button>
        </div>
        <div id="solar-header-content" className={headerExpanded ? undefined : styles.srOnly}>
          <p className={styles.eyebrow}>Solar System Explorer</p>
          <h1 id="solar-system-title">Hệ Mặt Trời</h1>
          <p className={styles.subtitle}>Khám phá không gian quanh chúng ta</p>
        </div>
      </header>

      {observerStage === "solar" ? <div className={styles.controlsDock}>
        <button
          type="button"
          className={styles.panelToggle}
          aria-expanded={controlsExpanded}
          aria-controls="solar-controls-content"
          aria-label={controlsExpanded ? "Thu gọn điều khiển" : "Mở điều khiển"}
          onClick={() => setControlsExpanded((expanded) => !expanded)}
        >
          {controlsExpanded ? <ChevronUp aria-hidden="true" size={16} /> : <ChevronDown aria-hidden="true" size={16} />}
          Điều khiển
        </button>
        <div id="solar-controls-content" className={styles.controlsContent} hidden={!controlsExpanded}>
          <div className={styles.controls} aria-label="Điều khiển mô phỏng">
            <button
              type="button"
              className={styles.controlButton}
              onClick={togglePaused}
              aria-pressed={isPaused}
              aria-label={isPaused ? "Tiếp tục chuyển động" : "Tạm dừng chuyển động"}
              title={isPaused ? "Tiếp tục" : "Tạm dừng"}
            >
              {isPaused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={showOverview}
              aria-label="Trở về góc nhìn toàn Hệ Mặt Trời"
              title="Toàn hệ"
            >
              <RotateCcw aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={toggleOrbits}
              aria-pressed={orbitsVisible}
              aria-label={orbitsVisible ? "Ẩn đường quỹ đạo" : "Hiện đường quỹ đạo"}
              title={orbitsVisible ? "Ẩn quỹ đạo" : "Hiện quỹ đạo"}
            >
              {orbitsVisible ? <Eye aria-hidden="true" size={18} /> : <EyeOff aria-hidden="true" size={18} />}
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={toggleLabels}
              aria-pressed={labelsVisible}
              aria-label={labelsVisible ? "Ẩn nhãn hành tinh" : "Hiện nhãn hành tinh"}
              title={labelsVisible ? "Ẩn nhãn" : "Hiện nhãn"}
            >
              <Tags aria-hidden="true" size={18} />
            </button>
          </div>

          <div className={styles.speedControl}>
            <label htmlFor="simulation-speed" className={styles.speedLabel}>
              <span>Tốc độ thời gian</span>
              <output htmlFor="simulation-speed">{formatSpeed(simulationSpeed)}</output>
            </label>
            <input
              id="simulation-speed"
              className={styles.speedRange}
              type="range"
              min="0"
              max={SIMULATION_SPEED_OPTIONS.length - 1}
              step="1"
              value={speedIndex}
              onInput={(event) => changeSpeed(Number(event.currentTarget.value))}
              onChange={(event) => changeSpeed(Number(event.currentTarget.value))}
              aria-valuetext={`${formatSpeed(simulationSpeed)}, ${formatTimeRate(simulationSpeed)}`}
              disabled={sceneStatus !== "ready"}
            />
            <div className={styles.speedScale} aria-hidden="true">
              <span>0,1 ngày/s</span>
              <span>1 ngày/s</span>
              <span>10 ngày/s</span>
            </div>
          </div>

          <section className={styles.timeControl} aria-label="Ngày giờ mô phỏng thiên văn">
            <div className={styles.timeHeading}>
              <span>Ngày / giờ</span>
              <button type="button" onClick={setToNow} disabled={sceneStatus !== "ready"}>
                <Clock3 aria-hidden="true" size={14} />
                Bây giờ
              </button>
            </div>
            <div className={styles.timeFields}>
              <label>
                <span>Ngày</span>
                <input
                  type="date"
                  min="1600-01-01"
                  max="2200-12-31"
                  value={dateTimeInput.date}
                  onFocus={pauseForTimeEditing}
                  onChange={(event) => changeSimulationDateTime(event.currentTarget.value, dateTimeInput.time)}
                  disabled={sceneStatus !== "ready"}
                />
              </label>
              <label>
                <span>Giờ</span>
                <input
                  type="time"
                  step="60"
                  value={dateTimeInput.time}
                  onFocus={pauseForTimeEditing}
                  onChange={(event) => changeSimulationDateTime(dateTimeInput.date, event.currentTarget.value)}
                  disabled={sceneStatus !== "ready"}
                />
              </label>
            </div>
            <label className={styles.timeZoneField}>
              <span>Múi giờ</span>
              <select value={timeZone} onChange={(event) => setTimeZone(event.currentTarget.value)}>
                {timeZoneOptions.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
              </select>
            </label>
            <p className={styles.utcTime}>
              {simulationTimestamp === null ? "Đang đồng bộ UTC…" : new Date(simulationTimestamp).toISOString().replace(".000Z", "Z")}
            </p>
            <p className={styles.ephemerisSources}>
              <a href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noreferrer">
                Astronomy Engine 2.1.19
              </a>
              <span aria-hidden="true"> · </span>
              <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noreferrer">
                mốc đại diện: JPL Horizons
              </a>
            </p>
            {timeError ? <p className={styles.timeError} role="alert">{timeError}</p> : null}
          </section>
        </div>
      </div> : null}

      {sceneStatus === "loading" ? (
        <div className={styles.status} role="status">
          <span className={styles.loader} aria-hidden="true" />
          Đang dựng đài quan sát…
        </div>
      ) : null}

      {sceneStatus === "error" ? (
        <div className={styles.error} role="alert">
          <Info aria-hidden="true" size={20} />
          <div>
            <strong>Không thể khởi tạo không gian 3D.</strong>
            <p>Hãy bật WebGL hoặc thử trình duyệt mới hơn. Bạn vẫn có thể chọn hành tinh bên dưới để đọc dữ liệu.</p>
          </div>
        </div>
      ) : null}

      {observerStage === "solar" && selectedPlanet ? (
        <aside className={styles.infoPanel} aria-labelledby="planet-info-title">
          <div className={styles.infoHeading}>
            <div>
              <p className={styles.infoOrder}>Hành tinh thứ {selectedPlanet.order} từ Mặt Trời</p>
              <h2 id="planet-info-title">{selectedPlanet.nameVi}</h2>
              <p className={styles.englishName}>{selectedPlanet.nameEn}</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={showOverview}
              aria-label="Đóng thông tin và trở về toàn hệ"
            >
              <X aria-hidden="true" size={19} />
            </button>
          </div>
          <p className={styles.summary}>{selectedPlanet.summary}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Loại</dt>
              <dd>{selectedPlanet.typeVi}</dd>
            </div>
            <div>
              <dt>Bán kính</dt>
              <dd>{numberFormatter.format(selectedPlanet.radiusKm)} km</dd>
            </div>
            <div>
              <dt>Khoảng cách TB tới Mặt Trời</dt>
              <dd>{numberFormatter.format(selectedPlanet.distanceMillionKm)} triệu km</dd>
            </div>
            <div>
              <dt>Chu kỳ quỹ đạo</dt>
              <dd>{selectedPlanet.orbitalPeriod}</dd>
            </div>
            <div>
              <dt>Chu kỳ tự quay</dt>
              <dd>{selectedPlanet.rotationPeriod}</dd>
            </div>
            <div>
              <dt>Vệ tinh</dt>
              <dd>{selectedPlanet.moons}</dd>
            </div>
          </dl>
          <div className={styles.infoActions}>
            <button type="button" className={styles.overviewButton} onClick={showOverview}>
              <Focus aria-hidden="true" size={17} />
              Quay lại Hệ Mặt Trời
            </button>
            <a href={selectedPlanet.sourceUrl} target="_blank" rel="noreferrer" className={styles.sourceLink}>
              Thông số vật lý: NASA
            </a>
          </div>
        </aside>
      ) : null}

      {observerStage === "solar" ? <nav className={styles.planetRail} aria-label="Chọn hành tinh">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            ref={(element) => {
              if (element) {
                planetButtonRefs.current.set(planet.id, element);
              } else {
                planetButtonRefs.current.delete(planet.id);
              }
            }}
            type="button"
            className={styles.planetButton}
            data-active={planet.id === selectedPlanetId || undefined}
            onClick={() => selectPlanet(planet.id)}
            aria-pressed={planet.id === selectedPlanetId}
          >
            <span className={styles.planetDot} data-planet={planet.id} aria-hidden="true" />
            <span>{planet.nameVi}</span>
          </button>
        ))}
      </nav> : null}

      {observerStage === "solar" ? <div className={styles.guide}>
        <span>Giữ và kéo để xoay</span>
        <span>Cuộn hoặc chụm để thu phóng</span>
      </div> : null}

      {observerStage === "solar" && !selectedPlanet ? (
        <div className={styles.birthInfoDock}>
          <button
            type="button"
            className={styles.panelToggle}
            aria-expanded={birthInfoExpanded}
            aria-controls="solar-birth-info-content"
            aria-label={birthInfoExpanded ? "Thu gọn thông tin bầu trời lúc sinh" : "Mở thông tin bầu trời lúc sinh"}
            onClick={() => setBirthInfoExpanded((expanded) => !expanded)}
          >
            {birthInfoExpanded ? <ChevronDown aria-hidden="true" size={16} /> : <ChevronUp aria-hidden="true" size={16} />}
            Bầu trời lúc sinh
          </button>
          <div id="solar-birth-info-content" className={styles.birthInfoContent} hidden={!birthInfoExpanded}>
            <aside className={styles.birthObserverEntry} aria-labelledby="birth-observer-entry-title">
              <p className={styles.birthObserverEntryEyebrow}>Từ Hệ Mặt Trời đến nơi sinh</p>
              <h2 id="birth-observer-entry-title">Bầu trời lúc sinh</h2>
              {observerEntry.status === "loading" ? <p role="status">Đang kiểm tra hồ sơ sinh đang hoạt động…</p> : null}
              {observerEntry.status === "missing-session" ? (
                <p>Chưa có hồ sơ sinh trong phiên này. <Link href="/">Nhập hoặc mở hồ sơ</Link> để dùng Birth Observer.</p>
              ) : null}
              {observerEntry.status === "invalid-context" ? (
                <p role="alert">Không thể chuẩn hóa hồ sơ sinh hiện tại. Dữ liệu không được thay thế bằng một mốc giả.</p>
              ) : null}
              {observerEntry.status === "unsupported" ? (
                <p role="status">
                  Birth Observer chưa hỗ trợ mốc {observerEntry.context.instantUtc}; phạm vi hiện tại là 1600–2200. Thời điểm gốc được giữ nguyên, không clamp.
                </p>
              ) : null}
              {observerEntry.status === "ready" ? (
                <>
                  <p>Dùng đúng hồ sơ sinh đang hoạt động để đi tới Trái Đất, rồi chuyển sang vòm trời địa phương.</p>
                  <button
                    ref={observerEntryButtonRef}
                    type="button"
                    onClick={enterBirthObserver}
                    disabled={sceneStatus !== "ready"}
                  >
                    <Compass aria-hidden="true" size={18} />
                    Xem bầu trời lúc sinh
                  </button>
                </>
              ) : null}
              {observerError ? <p className={styles.birthObserverError} role="alert">{observerError}</p> : null}
            </aside>
            <p className={styles.simulationNote}>
              Vị trí thiên thể được tính theo ngày/giờ bằng Astronomy Engine. Phạm vi sử dụng hiện tại: 1600–2200; một số mốc đại diện được đối chiếu hồi quy với NASA/JPL Horizons. Kích thước và khoảng cách 3D đã được điều chỉnh để dễ quan sát.
            </p>
          </div>
        </div>
      ) : null}

      {observerStage === "birth-earth" ? (
        <section className={styles.birthTransition} aria-labelledby="birth-transition-title">
          <span className={styles.loader} aria-hidden="true" />
          <div>
            <h2 id="birth-transition-title">Đang tới Trái Đất tại thời điểm sinh…</h2>
            <p>Snapshot đã dừng ở đúng UTC instant; marker đang chỉ tọa độ nơi sinh.</p>
          </div>
          <button type="button" onClick={exitBirthObserver}>Hủy và trở lại Solar</button>
        </section>
      ) : null}

      {observerStage === "birth-observer" && observerProjection ? (
        <ObserverSkyView projection={observerProjection} onExit={exitBirthObserver} />
      ) : null}

      {observerStage === "birth-observer" && !observerProjection ? (
        <section className={styles.observerUnavailable} role="alert" aria-labelledby="observer-unavailable-title">
          <Info aria-hidden="true" size={22} />
          <div>
            <h2 id="observer-unavailable-title">Không thể mở Birth Observer</h2>
            <p>{observerError ?? "Projection production không trả dữ liệu hợp lệ."}</p>
            <button type="button" onClick={exitBirthObserver}>Trở lại Hệ Mặt Trời</button>
          </div>
        </section>
      ) : null}

      <p className={styles.srOnly} aria-live="polite">
        {observerStage === "birth-earth"
          ? "Đang chuyển tới Trái Đất tại thời điểm sinh."
          : observerStage === "birth-observer"
            ? "Đang quan sát bầu trời từ nơi sinh tại thời điểm sinh."
            : selectedPlanet
              ? `Đang quan sát ${selectedPlanet.nameVi}, ${selectedPlanet.nameEn}.`
              : "Đang quan sát toàn Hệ Mặt Trời."}
      </p>
    </main>
  );
}
