import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

/* ─── Nafis: drop your email here and the LAST STOP board gains a mail exit ─── */
const LINKS = {
  github: "https://github.com/echo2045",
  linkedin: "https://www.linkedin.com/in/nafis-forkan-b24922184",
  email: "",
};

/* Stops along the night line. x = position along the 4800-unit world. */
const STOPS = [
  { id: "depot", x: 590, label: "Depot", title: "Ghost Interactive",
    lines: ["Game programmer — Unity, Unreal Engine, game systems.", "Live titles, shipped and maintained at scale."],
    tag: "day job" },
  { id: "scale", x: 780, label: "10M+ Scale", title: "Live at Scale",
    lines: ["Bus Simulator Bangladesh — updating & maintaining a title with 10M+ downloads.", "Optimization, bug fixing, Addressables, Cloud Content Delivery."],
    link: ["Play Store", "https://play.google.com/store/apps/details?id=com.GhostInteractive.BusSimulatorBangladesh"], tag: "main quest" },
  { id: "dhaka", x: 1420, label: "Endless Dhaka", title: "Endless Dhaka",
    lines: ["Complete remake and release of the mobile racing game.", "Contributed to ~1M new downloads."],
    link: ["Play Store", "https://play.google.com/store/apps/details?id=com.GhostInteractive.EndlessDhaka"], tag: "main quest" },
  { id: "stadium", x: 2080, label: "Esports Arena", title: "Esports Ops",
    lines: ["10+ online tournaments · 5+ LAN · 2 national qualifiers hosted.", "500+ players supported · 24+ competitive teams managed.", "National team taken to international events."],
    tag: "the other career" },
  { id: "lab", x: 2760, label: "Research Lab", title: "Stinger — IEEE",
    lines: ["3D asymmetric multiplayer serious game teaching dengue prevention in rural Bangladesh.", "Published at SNPD 2025 — IEEE, Busan."],
    link: ["Read paper", "https://ieeexplore.ieee.org/document/11313522"], tag: "research quest" },
  { id: "truck", x: 3300, label: "Truck Depot", title: "Truck Simulator BD",
    lines: ["Custom traffic system designed and programmed for realistic simulation.", "Game systems built for player experience."],
    tag: "main quest" },
  { id: "crane", x: 3780, label: "Under Construction", title: "In the Pipeline",
    lines: ["2 upcoming games in development.", "Watch this skyline."],
    tag: "soon" },
  { id: "arcade", x: 4180, label: "Jam Arcade", title: "Side Quests",
    lines: ["Speak-and-Play — voice-controlled gaming for differently-abled players.", "Retsnom.Inc — befriend monsters · Polar Bear Run — BCGameJam 2020 · Multiplayer Race — Photon PUN."],
    link: ["Browse repos", "https://github.com/echo2045?tab=repositories"], tag: "side quests" },
  { id: "terminus", x: 4650, label: "Last Stop", title: "Say Hello",
    lines: ["Party slot open — studios, teams, collaborators.", "All lines terminate here."],
    link: ["GitHub", "https://github.com/echo2045"], tag: "terminus" },
];

const SKY = ["M0 620V430h90v190zm90-40h60v230H90zm60-90h70v320h-70zm70 30h60v290h-60zm60-70h90v360h-90zm90 20h80v340h-80zm80-60h70v400h-70zm70 40h60v360h-60zm60-90h100v450H860zm100 30h70v420h-70zm70-40h80v460h-80zm80 60h90v400h-90zm90-30h70v430h-70zm70 50h60v380h-60zm60-80h90v460h-90zm90 40h80v420h-80zm80-60h70v480h-70zm70 70h90v410h-90zm90-50h80v460h-80zm80 60h70v400h-70zm70-80h90v480h-90zm90 50h60v430h-60zm60-60h80v490h-80zm80 30h90v460h-90zm90-40h70v500h-70zm70 60h80v440h-80zm80-70h90v510h-90zm90 40h80v470h-80zm80-60h70v530h-70zm70 70h90v460h-90zm90-40h80v500h-80zm80 60h70v440h-70zm70-60h90v500h-90zm90 30h80v470h-80zm80-50h70v520h-70zm70 60h90v460h-90zm90-40h80v500h-80zm80 50h70v450h-70zm70-60h90v510h-90zm90 40h80v470h-80zm80-70h70v540h-70zm70 60h90v480h-90zm90-30h80v510h-80zm80 40h70v470h-70zm70-50h90v520h-90zm90 30h80v490h-80zm80-60h70v550h-70zm70 70h90v480h-90zm90-40h80v520h-80zm80 50h70v470h-70zm70-60h90v530h-90zm90 30h80v500h-80z"];

function Skyline() {
  return <path className="skyline" d={SKY} />;
}

/* the scrolling world itself — svg scenery at exact 4800×720 scale */
function World() {
  return (
    <svg className="world-svg" viewBox="0 0 4800 720" preserveAspectRatio="none" aria-hidden="true">
      {/* mid skyline with lit windows */}
      <Skyline />
      {/* sparse ground-floor lights — kept below every roofline so none float */}
      <g className="citylights">{[...Array(140)].map((_, i) => {
        const x = 40 + ((i * 137) % 4640), y = 545 + ((i * 89) % 55);
        return i % 4 === 0 ? <rect key={i} x={x} y={y} width="7" height="10" className="lit" /> : null;
      })}</g>

      {/* named buildings */}
      <g className="b intro" transform="translate(60,0)">
        <rect x="0" y="340" width="330" height="280" className="blk" />
        <rect x="14" y="368" width="302" height="110" className="signboard" />
        <text x="165" y="415" className="neon cyan" textAnchor="middle" fontSize="30">NAFIS FORKAN</text>
        <text x="165" y="452" className="neon amber" textAnchor="middle" fontSize="14">GAMEPLAY PROGRAMMER</text>
        {[...Array(6)].map((_, i) => <rect key={i} x={30 + i * 48} y="510" width="20" height="30" className={i % 2 ? "w" : "w lit"} />)}
      </g>

      <g className="b depot" transform="translate(480,0)">
        <rect x="0" y="380" width="220" height="240" className="blk" />
        <rect x="16" y="410" width="188" height="60" className="signboard" />
        <text x="110" y="447" className="neon cyan" textAnchor="middle">GHOST INTERACTIVE</text>
        {[...Array(8)].map((_, i) => <rect key={i} x={20 + i * 22} y="490" width="12" height="16" className={i % 3 ? "w" : "w lit"} />)}
      </g>

      <g className="b stadium" transform="translate(1960,0)">
        <ellipse cx="170" cy="560" rx="180" ry="58" className="blk" />
        <rect x="-10" y="540" width="360" height="80" className="blk" />
        <path d="M30 540 60 430 M310 540 340 430" className="mast" />
        <path d="M60 432 30 620h120z" className="cone" />
        <path d="M340 432 250 620h120z" className="cone" />
        <circle cx="60" cy="428" r="7" className="flood" /><circle cx="340" cy="428" r="7" className="flood" />
        <text x="170" y="588" className="neon amber" textAnchor="middle">ESPORTS ARENA</text>
      </g>

      <g className="b lab" transform="translate(2660,0)">
        <rect x="0" y="330" width="200" height="290" className="blk" />
        <rect x="70" y="290" width="60" height="40" className="blk" />
        <path d="M100 290V220" className="mast" /><circle cx="100" cy="216" r="5" className="flood" />
        <rect x="20" y="360" width="160" height="46" className="signboard" />
        <text x="100" y="389" className="neon green" textAnchor="middle">RESEARCH LAB</text>
        {[...Array(12)].map((_, i) => <rect key={i} x={22 + (i % 4) * 40} y={425 + Math.floor(i / 4) * 55} width="16" height="22" className={i % 4 ? "w" : "w lit"} />)}
      </g>

      {/* construction site for the upcoming titles */}
      <g className="b site" transform="translate(3600,0)">
        <rect x="0" y="440" width="150" height="180" className="frame" />
        <path d="M0 485h150 M0 530h150 M0 575h150 M50 440v180 M100 440v180" className="frameln" />
        <rect x="5" y="465" width="140" height="40" className="signboard" />
        <text x="75" y="491" className="neon amber" textAnchor="middle" fontSize="12" letterSpacing="1">IN DEVELOPMENT</text>
        <path d="M-40 620V300 M-60 620h40 M-40 300h30" className="cranebody" />
        <path d="M-40 300 240 252 M-40 300 -80 380 M240 252 240 302" className="cable" />
        <circle cx="-40" cy="296" r="6" className="beacon" />
        <rect x="230" y="302" width="20" height="20" className="blk" />
      </g>

      <g className="b arcade" transform="translate(4080,0)">
        <rect x="0" y="420" width="200" height="200" className="blk" />
        <rect x="4" y="440" width="192" height="54" className="signboard" />
        <text x="100" y="473" className="neon pink" textAnchor="middle" fontSize="21">JAM ARCADE</text>
        <rect x="80" y="545" width="40" height="75" className="w lit" />
        <rect x="24" y="520" width="28" height="36" className="w" /><rect x="148" y="520" width="28" height="36" className="w lit" />
      </g>

      {/* terminus gate */}
      <g className="b terminus" transform="translate(4560,0)">
        <path d="M0 620V480a60 60 0 01120 0v140h-30V488a30 30 0 00-60 0v132H0z" className="blk" />
        <text x="60" y="560" className="neon cyan" textAnchor="middle">LAST STOP</text>
      </g>

      {/* street lights along the route */}
      {[420, 980, 1700, 2460, 3050, 3560, 3980, 4520].map((x) => (
        <g key={x} transform={`translate(${x},0)`} className="lamp">
          <path d="M0 620V470" className="pole" />
          <path d="M0 470h34" className="pole" />
          <path d="M28 476 12 620h50L38 476z" className="conel" />
          <circle cx="33" cy="478" r="4" className="bulb" />
        </g>
      ))}

      {/* the road */}
      <rect x="0" y="620" width="4800" height="100" className="road" />
      <rect x="0" y="612" width="4800" height="8" className="kerb" />
      {[...Array(60)].map((_, i) => <rect key={i} x={i * 85} y="666" width="44" height="5" className="dash" />)}
    </svg>
  );
}

function Bus() {
  return (
    <svg className="bus" viewBox="0 0 240 96" aria-hidden="true">
      <path d="M150 60 235 96h-95z" className="beamlight" />
      <rect x="6" y="10" width="200" height="62" rx="10" className="body" />
      <rect x="6" y="10" width="200" height="20" rx="10" className="band" />
      <rect x="12" y="16" width="26" height="8" rx="2" className="dest" />
      <text x="25" y="23" className="desttxt" textAnchor="middle">NAFIS</text>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={46 + i * 34} y="16" width="26" height="16" rx="3" className="winlit" />)}
      <rect x="176" y="16" width="24" height="16" rx="3" className="winlit cab" />
      <rect x="16" y="44" width="172" height="18" rx="4" className="panel" />
      <text x="102" y="57" className="sidetxt" textAnchor="middle">GHOST · NIGHT LINE</text>
      <circle cx="46" cy="74" r="14" className="wheel" /><circle cx="46" cy="74" r="6" className="hub" />
      <circle cx="170" cy="74" r="14" className="wheel" /><circle cx="170" cy="74" r="6" className="hub" />
      <rect x="202" y="40" width="8" height="12" rx="2" className="tail" />
      <text x="112" y="86" className="plate" textAnchor="middle">NF-2045</text>
    </svg>
  );
}

function Stop({ s }) {
  const edge = s.x < 500 ? "l" : s.x > 4300 ? "r" : undefined;
  return (
    <div className="poi" id={"stop-" + s.id} data-edge={edge} style={{ left: (s.x / 4800 * 100) + "%" }}>
      <button className="marker" aria-haspopup="true">
        <span className="board">{s.label}</span>
        <i className="pole" /><i className="glow" />
      </button>
      <div className="panel" role="dialog" aria-label={s.title}>
        <p className="ptag">{s.tag}</p>
        <h3>{s.title}</h3>
        {s.lines.map((l) => <p key={l}>{l}</p>)}
        {s.link && <a className="btn" href={s.link[1]} target="_blank" rel="noreferrer">{s.link[0]} ↗</a>}
      </div>
    </div>
  );
}

function App() {
  const world = useRef(null);
  const fill = useRef(null);
  const busEl = useRef(null);

  useEffect(() => {
    const el = world.current;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); }
    };
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (fill.current) fill.current.style.width = (el.scrollLeft / max * 100) + "%";
      if (busEl.current) busEl.current.style.setProperty("--spin", (el.scrollLeft / 9) + "deg");
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll);
    onScroll();
    const h = location.hash.slice(1);
    if (h) document.getElementById(h)?.scrollIntoView({ inline: "center", behavior: "instant" });
    else if (matchMedia("(min-width:900px)").matches)
      el.querySelector("#stop-depot .marker")?.focus();
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <header className="hud">
        <span className="plate-lg">NIGHT LINE · echo2045</span>
        <nav>
          {STOPS.slice(1, 8).map((s) => <a key={s.id} href={"#stop-" + s.id}>{s.label}</a>)}
        </nav>
      </header>

      <div className="sky">
        <div className="moon" />
        {[...Array(40)].map((_, i) => <i key={i} className="star" style={{ left: (i * 97 % 100) + "%", top: (i * 53 % 55) + "%", animationDelay: (i % 7) + "s" }} />)}
      </div>

      <div className="world" ref={world}>
        <div className="track">
          <World />
          {STOPS.map((s) => <Stop key={s.id} s={s} />)}
        </div>
      </div>

      <div className="buswrap"><div ref={busEl} className="buspin"><Bus /></div></div>

      <div className="routeline">
        <div className="fillbar"><i ref={fill} /></div>
        <div className="stops">{STOPS.map((s) => <a key={s.id} href={"#stop-" + s.id} style={{ left: (s.x / 4800 * 100) + "%" }} aria-label={s.label} />)}</div>
        <p className="drive">scroll or drag to drive →</p>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
