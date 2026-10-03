import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

/* ─── Nafis: drop your email here and the mail link lights up ─── */
const LINKS = {
  github: "https://github.com/echo2045",
  linkedin: "https://www.linkedin.com/in/nafis-forkan-b24922184",
  email: "", // e.g. "you@example.com"
};

const BOARDS = {
  dev: {
    title: "Dev Line",
    status: "all services running",
    rows: [
      ["10M+", "downloads on a live title — updating & maintaining"],
      ["~1M", "new downloads contributed"],
      ["1", "IEEE paper on serious games — Stinger, SNPD 2025"],
      ["3", "games live"],
      ["2", "games upcoming"],
    ],
  },
  esp: {
    title: "Esports Line",
    status: "all services running",
    rows: [
      ["10+", "online tournaments organised"],
      ["5+", "LAN tournaments organised"],
      ["500+", "players supported"],
      ["24+", "competitive teams managed"],
      ["2", "national qualifiers hosted"],
      ["INTL", "national-team participation in international events"],
    ],
  },
};

const TERMINALS = [
  {
    title: "Bus Simulator Bangladesh",
    line: "dev",
    tags: "Unity · Mobile · Live · Simulation",
    text: "Live mobile simulation game with 10M+ downloads. Optimization, bug fixing, Addressables, Cloud Content Delivery and traffic-system improvements.",
    url: "https://play.google.com/store/apps/details?id=com.GhostInteractive.BusSimulatorBangladesh",
    exit: "Play Store",
  },
  {
    title: "Endless Dhaka",
    line: "dev",
    tags: "Unity · Mobile · Racing",
    text: "Complete remake and release of a mobile racing game. Contributed to roughly 1M new downloads.",
    url: "https://play.google.com/store/apps/details?id=com.GhostInteractive.EndlessDhaka",
    exit: "Play Store",
  },
  {
    title: "Truck Simulator Bangladesh",
    line: "dev",
    tags: "Unity · Mobile · Game Systems",
    text: "Custom traffic system designed and programmed for realistic simulation and player experience.",
  },
];

const Dot = ({ x, y }) => <circle cx={x} cy={y} r="4.5" className="tick" />;

/* The career map: every bend at 45° or 90°, porcelain ring where the lines cross. */
function Network() {
  return (
    <svg className="network" viewBox="0 0 760 460" role="img"
      aria-label="Transit map of Nafis Forkan's career: a scarlet Dev line and an amber Esports line crossing at Ghost Interactive interchange, with a green spur to his IEEE paper">
      {/* ghost geography — the rivers under the enamel */}
      <path className="ghost" d="M-20,150 C110,105 210,165 330,135 S570,55 780,95" />
      <path className="ghost" d="M-20,60 C90,90 180,40 300,70" />
      <path className="ghostline" d="M780,300 L640,300 L560,380 L560,470" />

      <g className="line dev">
        <path pathLength="1" d="M590,-20 L460,110 L380,190 L380,260 L300,340 L300,480" />
        <Dot x={525} y={45} /><Dot x={460} y={110} /><Dot x={380} y={225} />
        <text x={545} y={40} className="st">10M+ downloads</text>
        <text x={448} y={102} className="st end">live · maintained</text>
        <text x={392} y={216} className="st">live ops</text>
        <text x={288} y={336} className="st end">3 live</text>
        <circle cx="300" cy="452" r="9" className="ring small" />
        <text x={318} y={457} className="st">2 upcoming</text>
      </g>

      <g className="line esp">
        <path pathLength="1" d="M-20,300 L140,300 L220,220 L340,220 L380,260 L560,260 L680,140 L780,140" />
        <Dot x={60} y={300} /><Dot x={220} y={220} /><Dot x={470} y={260} /><Dot x={720} y={140} />
        <text x={105} y={284} className="st mid">2× national qualifiers</text>
        <text x={206} y={236} className="st end">10+ online</text>
        <text x={470} y={244} className="st mid">500+ players</text>
        <text x={700} y={124} className="st mid">5+ LAN</text>
      </g>

      <g className="line res">
        <path pathLength="1" d="M300,340 L220,420 L40,420" />
        <Dot x={140} y={420} />
        <text x={140} y={404} className="st mid">stinger — ieee · snpd ’25</text>
      </g>

      {/* the junction where the spur leaves the Dev line */}
      <circle cx="300" cy="340" r="7" className="ring small" />
      {/* the interchange everything passes through */}
      <circle cx="380" cy="260" r="15" className="ring" />
      <circle cx="380" cy="260" r="6" className="ringcore" />
      <text x={400} y={292} className="st bold">Ghost Interchange</text>
    </svg>
  );
}

function Board({ id, board }) {
  return (
    <section className={"board " + id} aria-label={board.title + " milestones"}>
      <header><i className="pip" />{board.title}<em>{board.status}</em></header>
      {board.rows.map(([n, l]) => (
        <div className="dep" key={l}><span>{l}</span><b>{n}</b></div>
      ))}
    </section>
  );
}

function Terminal({ p }) {
  return (
    <article className={"terminal " + p.line}>
      <div className="route" aria-hidden="true"><i className="rail" /><i className="stop" /><i className="rail" /></div>
      <h3>{p.title}</h3>
      <p className="tags">{p.tags}</p>
      <p>{p.text}</p>
      {p.url && <a className="btn" href={p.url} target="_blank" rel="noreferrer">Exit to {p.exit} <span aria-hidden="true">→</span></a>}
    </article>
  );
}

function App() {
  return (
    <>
      <header className="topbar">
        <span className="brand"><i className="roundel" />Nafis Forkan</span>
        <nav>
          <a href="#milestones">Milestones</a>
          <a href="#terminals">Projects</a>
          <a href="#laststop">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="nameboard">
            <h1>Nafis Forkan</h1>
            <p className="route-names">
              <span className="lg dev">Dev Line</span>
              <span className="lg esp">Esports Line</span>
              <span className="lg res">Research Spur</span>
            </p>
            <p className="intro">Gameplay programmer · Unity · Unreal Engine · game systems.<br />
            Esports operator. Dhaka, Bangladesh — every line on this map is real.</p>
            <div className="actions">
              <a className="btn solid" href={LINKS.github} target="_blank" rel="noreferrer">Plan journey <span aria-hidden="true">→</span></a>
              <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <Network />
        </section>

        <p className="status"><i className="ok" />Network status — all lines running · 3 live · 2 under construction</p>

        <section className="milestones" id="milestones">
          <h2>Milestones</h2>
          <div className="boards">
            <Board id="dev" board={BOARDS.dev} />
            <Board id="esp" board={BOARDS.esp} />
          </div>
        </section>

        <section className="terminals" id="terminals">
          <h2>Featured terminals</h2>
          <div className="terminalgrid">
            {TERMINALS.map((p) => <Terminal key={p.title} p={p} />)}
          </div>
        </section>

        <footer className="laststop" id="laststop">
          <h2>Last stop</h2>
          <p>All lines terminate here. Say hello.</p>
          <div className="actions">
            <a className="btn solid" href={LINKS.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">→</span></a>
            <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">→</span></a>
            {LINKS.email && <a className="btn" href={"mailto:" + LINKS.email}>Email <span aria-hidden="true">→</span></a>}
          </div>
          <p className="colophon">© 2026 Nafis Forkan · a career rendered as an enamel map</p>
        </footer>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
