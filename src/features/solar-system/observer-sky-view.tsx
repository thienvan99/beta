"use client";

import { ArrowLeft, Compass, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import type {
  ObserverSkyBodyName,
  ObserverSkyProjection,
} from "./observer-sky-projection";
import { createObserverSkyVisualBodies } from "./observer-sky-visual";
import styles from "./solar-system.module.css";

const BODY_LABELS: Readonly<Record<ObserverSkyBodyName, string>> = {
  Sun: "Mặt Trời",
  Moon: "Mặt Trăng",
  Mercury: "Sao Thủy",
  Venus: "Sao Kim",
  Mars: "Sao Hỏa",
  Jupiter: "Sao Mộc",
  Saturn: "Sao Thổ",
  Uranus: "Sao Thiên Vương",
  Neptune: "Sao Hải Vương",
  Pluto: "Sao Diêm Vương",
};

const BODY_SYMBOLS: Readonly<Record<ObserverSkyBodyName, string>> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
};

const angleFormatter = new Intl.NumberFormat("vi-VN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});

function formatAngle(value: number): string {
  return `${angleFormatter.format(value)}°`;
}

export function ObserverSkyView({
  projection,
  onExit,
}: {
  projection: ObserverSkyProjection;
  onExit: () => void;
}) {
  const viewRef = useRef<HTMLElement>(null);
  const visualBodies = createObserverSkyVisualBodies(projection);
  const above = visualBodies.filter(({ source }) => source.aboveHorizon);
  const below = visualBodies.filter(({ source }) => !source.aboveHorizon);

  useEffect(() => {
    viewRef.current?.focus();
  }, []);

  return (
    <section
      ref={viewRef}
      className={styles.observerView}
      aria-labelledby="birth-observer-title"
      tabIndex={-1}
    >
      <div className={styles.observerShell}>
        <header className={styles.observerHeader}>
          <div>
            <p className={styles.observerEyebrow}>Birth Observer · Thiên văn quan sát</p>
            <h2 id="birth-observer-title">Bầu trời từ nơi sinh</h2>
            <p>
              Đây là hướng của 10 thiên thể nhìn từ tọa độ nơi sinh tại đúng thời điểm sinh đã chuẩn hóa.
            </p>
          </div>
          <button type="button" className={styles.observerExit} onClick={onExit}>
            <ArrowLeft aria-hidden="true" size={18} />
            Trở lại Hệ Mặt Trời
          </button>
        </header>

        <div className={styles.observerGrid}>
          <figure className={styles.skyDome}>
            <svg
              viewBox="0 0 100 100"
              role="img"
              aria-labelledby="sky-dome-title sky-dome-description"
            >
              <title id="sky-dome-title">Vòm trời địa phương phía trên chân trời</title>
              <desc id="sky-dome-description">
                Bắc ở trên, Đông bên phải, Nam ở dưới, Tây bên trái; thiên đỉnh ở tâm và đường tròn ngoài là chân trời hình học.
              </desc>
              <circle className={styles.skyDomeFill} cx="50" cy="50" r="43" />
              <circle className={styles.skyHorizon} cx="50" cy="50" r="43" />
              <circle className={styles.skyAltitudeRing} cx="50" cy="50" r="21.5" />
              <path className={styles.skyAxis} d="M 50 7 V 93 M 7 50 H 93" />
              <circle className={styles.skyZenith} cx="50" cy="50" r="1.2" />
              <text className={styles.skyDirection} x="50" y="4" textAnchor="middle">Bắc</text>
              <text className={styles.skyDirection} x="96" y="51.5" textAnchor="middle">Đông</text>
              <text className={styles.skyDirection} x="50" y="99" textAnchor="middle">Nam</text>
              <text className={styles.skyDirection} x="4" y="51.5" textAnchor="middle">Tây</text>
              <text className={styles.skyZenithLabel} x="50" y="47" textAnchor="middle">Thiên đỉnh</text>
              {above.map(({ source, domePoint }) => domePoint && (
                <g
                  key={source.body}
                  className={styles.skyBody}
                  transform={`translate(${domePoint.xPercent} ${domePoint.yPercent})`}
                  data-body={source.body}
                  data-above-horizon="true"
                >
                  <circle r="3.2" />
                  <text textAnchor="middle" dominantBaseline="central">{BODY_SYMBOLS[source.body]}</text>
                  <title>{`${BODY_LABELS[source.body]}: azimuth ${formatAngle(source.azimuthDegrees)}, altitude ${formatAngle(source.altitudeDegrees)}`}</title>
                </g>
              ))}
            </svg>
            <figcaption>
              <Compass aria-hidden="true" size={16} />
              Tâm là thiên đỉnh; vòng ngoài là chân trời hình học. Chỉ các thiên thể đang ở phía trên chân trời được đặt trên vòm.
            </figcaption>
          </figure>

          <div className={styles.observerSummary}>
            <section aria-labelledby="horizon-summary-title">
              <h3 id="horizon-summary-title">Trên hay dưới chân trời?</h3>
              <p className={styles.horizonCount} aria-live="polite">
                <strong>{above.length}</strong> thiên thể phía trên · <strong>{below.length}</strong> thiên thể phía dưới
              </p>
              <ul className={styles.horizonList}>
                {visualBodies.map(({ source }) => (
                  <li key={source.body} data-above-horizon={source.aboveHorizon}>
                    <span aria-hidden="true">{BODY_SYMBOLS[source.body]}</span>
                    <span>{BODY_LABELS[source.body]}</span>
                    <strong>{source.aboveHorizon ? "Trên chân trời" : "Dưới chân trời"}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <details className={styles.observerDetails}>
              <summary>Chi tiết thiên văn và phương pháp</summary>
              <dl className={styles.observerMetadata}>
                <div><dt>Thời điểm UTC</dt><dd>{projection.instantUtc}</dd></div>
                <div><dt>Vĩ độ / kinh độ</dt><dd>{projection.observer.latitude}, {projection.observer.longitude}</dd></div>
                <div><dt>Hiệu chỉnh</dt><dd>Topocentric; light-time và parallax đã áp dụng; aberration bật; refraction tắt</dd></div>
              </dl>
              <div className={styles.observerTableScroll} tabIndex={0} role="region" aria-label="Bảng tọa độ chân trời của 10 thiên thể">
                <table className={styles.observerTable}>
                  <caption>Tọa độ local horizon từ projection production</caption>
                  <thead><tr><th scope="col">Thiên thể</th><th scope="col">Azimuth</th><th scope="col">Altitude</th><th scope="col">Trạng thái</th></tr></thead>
                  <tbody>
                    {visualBodies.map(({ source }) => (
                      <tr key={source.body}>
                        <th scope="row">{BODY_LABELS[source.body]}</th>
                        <td>{formatAngle(source.azimuthDegrees)}</td>
                        <td>{formatAngle(source.altitudeDegrees)}</td>
                        <td>{source.aboveHorizon ? "Trên chân trời" : "Dưới chân trời"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <p className={styles.observerNotice}>
              <Info aria-hidden="true" size={16} />
              Biểu đồ thể hiện hình học phương hướng, không mô hình hóa độ sáng hay khả năng nhìn thấy bằng mắt thường.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
