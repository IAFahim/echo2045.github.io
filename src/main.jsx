import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

/* ─── Nafis: drop your email here and the SEND INVITE button gains a mail option ─── */
const LINKS = {
  github: "https://github.com/echo2045",
  linkedin: "https://www.linkedin.com/in/nafis-forkan-b24922184",
  email: "", // e.g. "you@example.com"
};

const PLAYER = {
  handle: "echo2045",
  name: "Nafis Forkan",
  cls: "Gameplay Programmer",
  guild: "Ghost Interactive",
  base: "Dhaka, Bangladesh",
  status: "online — shipping games",
};

const ACHIEVEMENTS = {
  dev: {
    title: "Development",
    rows: [
      ["dlc", "Live at Scale", "updating & maintaining a title with", "10M+", "downloads"],
      ["bolt", "Growth Engine", "new downloads contributed — Endless Dhaka", "~1M", ""],
      ["doc", "Published", "IEEE paper on serious games — Stinger, SNPD 2025", "1", ""],
      ["cart", "Triple Threat", "games live right now", "3", ""],
      ["lock", "In the Pipeline", "upcoming games in development", "2", ""],
    ],
  },
  esp: {
    title: "Esports Ops",
    rows: [
      ["globe", "Tournament Arc", "online tournaments organised", "10+", ""],
      ["lan", "LAN Veteran", "LAN tournaments organised", "5+", ""],
      ["users", "Community Builder", "players supported", "500+", ""],
      ["flag", "Team Wrangler", "competitive teams managed", "24+", ""],
      ["medal", "National Stage", "national qualifiers hosted", "2", ""],
      ["star", "Represented", "national team at international events", "INTL", ""],
    ],
  },
};

const QUESTS = [
  {
    name: "Bus Simulator Bangladesh",
    kind: "Main quest · complete",
    spec: "Unity · Mobile · Live · Simulation",
    text: "Live mobile simulation game with 10M+ downloads. Optimization, bug fixing, Addressables, Cloud Content Delivery and traffic-system improvements.",
    reward: "10M+ downloads",
    url: "https://play.google.com/store/apps/details?id=com.GhostInteractive.BusSimulatorBangladesh",
  },
  {
    name: "Endless Dhaka",
    kind: "Main quest · complete",
    spec: "Unity · Mobile · Racing",
    text: "Complete remake and release of a mobile racing game through the streets of Dhaka.",
    reward: "~1M new downloads",
    url: "https://play.google.com/store/apps/details?id=com.GhostInteractive.EndlessDhaka",
  },
  {
    name: "Truck Simulator Bangladesh",
    kind: "Main quest · complete",
    spec: "Unity · Mobile · Game Systems",
    text: "Custom traffic system designed and programmed for realistic simulation and player experience.",
    reward: "traffic AI system",
  },
  {
    name: "Stinger",
    kind: "Research quest · published",
    spec: "Unreal Engine 5 · Multiplayer · Serious Game",
    text: "3D asymmetric multiplayer game teaching dengue prevention in rural Bangladesh. Published at SNPD 2025, IEEE.",
    reward: "IEEE publication",
    url: "https://ieeexplore.ieee.org/document/11313522",
  },
];

const SIDEQUESTS = [
  {
    name: "Speak-and-Play",
    text: "Voice-controlled gaming — helps differently-abled people play without hands.",
    url: "https://github.com/echo2045/Speak-and-Play",
  },
  {
    name: "Retsnom.Inc",
    text: "Befriend monsters in the quest for power.",
    url: "https://github.com/echo2045/Retsnom.Inc",
  },
  {
    name: "Polar Bear Run",
    text: "BCGameJam 2020 jam entry.",
    url: "https://github.com/echo2045/BCGameJam2020-Polar-Bear-Run",
  },
  {
    name: "Multiplayer Race",
    text: "Photon PUN multiplayer racing prototype.",
    url: "https://github.com/echo2045/Task1---Multiplayer-Race",
  },
];

/* authored icons — one stroke family, viewBox 24 */
const I = {
  dlc: "M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16",
  bolt: "M13 2L5 14h5l-1 8 8-12h-5l1-8z",
  doc: "M6 2h9l5 5v15H6V2zm9 0v5h5M9 12h8M9 16h8M9 8h3",
  cart: "M3 21l3-3m-3 3l3 3-3-3zm0 0h18M9 3l6 6-2 5-5-2-6-6 2-5 5 2z",
  lock: "M7 11V7a5 5 0 0110 0v4M5 11h14v10H5V11zm7 4v3",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zm-9 9h18M12 3c3 3 3 15 0 18-3-3-3-15 0-18z",
  lan: "M4 5h16v10H4V5zm4 14h8m-4-4v4",
  users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm7-1a3 3 0 100-6M3 20c0-4 2.5-6 6-6s6 2 6 6m2-8c2.5.5 4 2.5 4 4",
  flag: "M5 21V4m0 1h13l-3 4 3 4H5",
  medal: "M12 14a5 5 0 100-10 5 5 0 000 10zm-3.5-.5L6 21l6-3 6 3-2.5-7.5",
  star: "M12 2l3 7 7 .5-5.4 4.7L18.5 22 12 17.8 5.5 22l1.9-7.8L2 9.5 9 9l3-7z",
  pad: "M7 8h10a5 5 0 015 5v1a4 4 0 01-7 2.5L13.5 15h-3L9 16.5A4 4 0 012 14v-1a5 5 0 015-5zm1.5 2.5v3M7 12h3m6-1.5h.01M18 14h.01",
  out: "M14 4h6v6m0-6L10 14M9 5H5a1 1 0 00-1 1v13a1 1 0 001 1h13a1 1 0 001-1v-4",
};
const Icon = ({ n }) => (
  <svg viewBox="0 0 24 24" className="ic" aria-hidden="true">
    <path d={I[n]} />
  </svg>
);

function PlayerCard() {
  return (
    <section className="card player">
      <div className="emblem" aria-hidden="true">
        <svg viewBox="0 0 96 96">
          <path d="M48 5 86 26v44L48 91 10 70V26L48 5z" className="hex" />
          <path d="M48 5 86 26v44L48 91 10 70V26L48 5z" className="hex trace" pathLength="1" />
          <path d="M30 63V35l15 28V35" className="glyph" />
          <path d="M55 63V35h14M55 49h9" className="glyph thin" />
        </svg>
      </div>
      <div className="who">
        <p className="handle">// {PLAYER.handle}</p>
        <h1>{PLAYER.name}</h1>
        <p className="meta">
          <span>{PLAYER.cls}</span><i>◆</i>
          <span>{PLAYER.guild}</span><i>◆</i>
          <span>{PLAYER.base}</span>
        </p>
        <p className="sub">Building games, gameplay systems and player-focused experiences —
        and running the competitive scene around them.</p>
      </div>
      <div className="vstats">
        <div><b>10M+</b><span>downloads served</span></div>
        <div><b>15+</b><span>events run</span></div>
        <div><b>UE5</b><span>current engine</span></div>
      </div>
      <p className="online"><i />{PLAYER.status}</p>
    </section>
  );
}

function AchGroup({ id, g }) {
  return (
    <section className="card achgroup" aria-label={g.title + " achievements"}>
      <header><Icon n="medal" />{g.title}<em>{g.rows.length} unlocked</em></header>
      {g.rows.map(([ic, name, desc, val, unit]) => (
        <div className="ach" key={name}>
          <span className="aicon"><Icon n={ic} /></span>
          <span className="atext"><b>{name}</b><small>{desc}{unit ? ` ${unit}` : ""}</small></span>
          <b className="aval">{val}</b>
        </div>
      ))}
    </section>
  );
}

function Quest({ q, side }) {
  const inner = (
    <>
      <div className="qtop"><span className={"qkind" + (side ? " side" : "")}>{q.kind || "Side quest"}</span><span className="qspec">{q.spec}</span></div>
      <h3>{q.name}</h3>
      <p>{q.text}</p>
      <div className="qbot">
        {q.reward && <span className="reward"><Icon n="star" />{q.reward}</span>}
        {q.url && <span className="qgo">View intel <Icon n="out" /></span>}
      </div>
    </>
  );
  return q.url
    ? <a className="card quest link" href={q.url} target="_blank" rel="noreferrer">{inner}</a>
    : <article className="card quest">{inner}</article>;
}

function App() {
  return (
    <>
      <header className="topbar">
        <span className="brand"><i className="sq" />{PLAYER.handle}</span>
        <nav>
          <a href="#achievements">Milestones</a>
          <a href="#quests">Projects</a>
          <a href="#invite">Contact</a>
        </nav>
      </header>

      <main>
        <div className="hero">
          <PlayerCard />
          <p className="hint">scroll to continue <i className="caret">▼</i></p>
        </div>

        <p className="ticker"><i className="ok" />sys check — all systems nominal · 3 titles live · 2 in development</p>

        <section id="achievements" className="block">
          <h2>Milestones <span>// achievements unlocked</span></h2>
          <div className="grid2">
            <AchGroup id="dev" g={ACHIEVEMENTS.dev} />
            <AchGroup id="esp" g={ACHIEVEMENTS.esp} />
          </div>
        </section>

        <section id="quests" className="block">
          <h2>Shipped <span>// quest log</span></h2>
          <div className="grid2 quests">
            {QUESTS.map((q) => <Quest key={q.name} q={q} />)}
          </div>
        </section>

        <section className="block">
          <h2>Own work <span>// side quests — open source & jam builds</span></h2>
          <div className="grid4">
            {SIDEQUESTS.map((q) => <Quest key={q.name} q={q} side />)}
          </div>
        </section>

        <footer id="invite" className="card finale">
          <h2>Send invite</h2>
          <p>Party slot open — studios, teams, collaborators.</p>
          <div className="actions">
            <a className="btn solid" href={LINKS.github} target="_blank" rel="noreferrer">GitHub <Icon n="out" /></a>
            <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon n="out" /></a>
            {LINKS.email && <a className="btn" href={"mailto:" + LINKS.email}>Email</a>}
          </div>
          <p className="credits">© 2026 Nafis Forkan · echo2045 · no RNG involved in this build</p>
        </footer>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
