import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { LINKS, STOPS } from "./content.js";
import "./style.css";

/* who he is, by district — index into STOPS */
const MODES = ["STUDENT", "PROGRAMMER", "INTERN", "PROGRAMMER", "HOST", "RESEARCHER", "BUILDER", "MAKER", "GUEST"];
const ZONES = ["city", "city", "city", "city", "arena", "lab", "build", "arcade", "terminus"];

/* collectible stars along the route — scroll over them to collect */
const PKX = [330, 760, 1180, 1640, 2100, 2360, 2520, 2960, 3450, 3850, 4270, 4450];

/* mid skyline: one long silhouette path (x 0–4800) */
const SKY = "M0 620V430h90v190zm90-40h60v230H90zm60-90h70v320h-70zm70 30h60v290h-60zm60-70h90v360h-90zm90 20h80v340h-80zm80-60h70v400h-70zm70 40h60v360h-60zm60-90h100v450H860zm100 30h70v420h-70zm70-40h80v460h-80zm80 60h90v400h-90zm90-30h70v430h-70zm70 50h60v380h-60zm60-80h90v460h-90zm90 40h80v420h-80zm80-60h70v480h-70zm70 70h90v410h-90zm90-50h80v460h-80zm80 60h70v400h-70zm70-80h90v480h-90zm90 50h60v430h-60zm60-60h80v490h-80zm80 30h90v460h-90zm90-40h70v500h-70zm70 60h80v440h-80zm80-70h90v510h-90zm90 40h80v470h-80zm80-60h70v530h-70zm70 70h90v460h-90zm90-40h80v500h-80zm80 60h70v440h-70zm70-60h90v500h-90zm90 30h80v470h-80zm80-50h70v520h-70zm70 60h90v460h-90zm90-40h80v500h-80zm80 50h70v450h-70zm70-60h90v510h-90zm90 40h80v470h-80zm80-70h70v540h-70zm70 60h90v480h-90zm90-30h80v510h-80zm80 40h70v470h-70zm70-50h90v520h-90zm90 30h80v490h-80zm80-60h70v550h-70zm70 70h90v480h-90zm90-40h80v520h-80zm80 50h70v470h-70zm70-60h90v530h-90zm90 30h80v500h-80z";

/* far skyline (parallax lags): hazier band, drawn x -2000–4800 with antennas + water tanks */
const FAR = "M-2000 620V470h70v150zm70-50h80v200h-80zm80-30h60v230h-60zm60-60h90v290h-90zm90 30h70v260h-70zm70-50h80v310h-80zm80 40h60v270h-60zm60-70h100v340h-100zm100 30h80v310h-80zm80-40h70v350h-70zm70 60h90v290h-90zm90-60h80v350h-80zm80 50h70v300h-70zm70-30h90v330h-90zm90 60h60v270h-60zm60-80h80v350h-80zm80 30h90v320h-90zm90-50h70v370h-70zm70 40h80v330h-80zm80-60h90v390h-90zm90 50h60v340h-60zm60-40h80v380h-80zm80 60h70v320h-70zm70-70h90v390h-90zm90 40h80v350h-80zm80-30h70v380h-70zm70 60h90v320h-90zm90-50h80v370h-80zm80 30h60v340h-60zm60-70h90v410h-90zm90 40h80v370h-80zm80-60h70v430h-70zm70 50h90v380h-90zm90-40h80v420h-80zm80 60h70v360h-70zm70-60h90v420h-90zm90 30h80v390h-80zm80-50h70v440h-70zm70 60h90v380h-90zm90-30h80v410h-80zm80 50h70v360h-70zm70-60h90v420h-90zm90 40h80v380h-80zm80-70h70v450h-70zm70 50h90v400h-90zm90-40h80v440h-80zm80 30h70v410h-70zm70-60h90v470h-90zm90 40h80v430h-80zm80-50h70v480h-70zm70 60h90v420h-90zm90-30h80v450h-80zm80 40h60v410h-60zm60-60h80v470h-80zm80 50h90v420h-90zm90-40h70v460h-70zm70 60h80v400h-80zm80-70h90v470h-90zm90 30h80v440h-80zm80-50h70v490h-70zm70 60h90v430h-90zm90-40h80v470h-80zm80 50h70v420h-70zm70-60h90v480h-90zm90 30h80v450h-80zm80-60h70v510h-70z";

function FarSkyline() {
  return (
    <svg className="farline" viewBox="-2000 0 6800 720" preserveAspectRatio="none" aria-hidden="true">
      <path className="far" d={FAR} />
      {/* antennas + tanks on far roofs */}
      {[-1600, -900, -240, 420, 1150, 1900, 2560, 3150, 3720, 4300].map((x) => (
        <path key={x} d={`M${x} ${430 + (x % 3) * 30}v-38m0 0h14v10h-14z`} className="ant" />
      ))}
    </svg>
  );
}

/* foreground posts + sagging cables, drawn 0–5600 and translated faster than the world */
function Foreground() {
  const xs = [700, 1600, 2500, 3400, 4300, 5200];
  return (
    <svg className="fgline" viewBox="0 0 5600 720" preserveAspectRatio="none" aria-hidden="true">
      {xs.map((x) => <path key={x} d={`M${x} 720V340`} className="fgpost" />)}
      {xs.slice(0, -1).map((x, i) => (
        <path key={i} d={`M${x} 352 Q${x + 450} 430 ${xs[i + 1]} 352`} className="cable" />
      ))}
      <path d="M-30 360 Q350 440 700 352" className="cable" />
    </svg>
  );
}

/* parked auto-rickshaw — the Dhaka detail */
function Rickshaw({ x }) {
  return (
    <g transform={`translate(${x},0)`}>
      <path d="M0 620v-38q0-14 12-14h8q4-22 22-22h26q20 0 24 22h8q12 0 12 14v38h-14v-6H14v6H0z" className="rick" />
      <rect x="24" y="560" width="56" height="26" rx="4" className="rickwin" />
      <circle cx="24" cy="620" r="9" className="rwheel" /><circle cx="88" cy="620" r="9" className="rwheel" />
      <rect x="104" y="588" width="4" height="10" className="rlight" />
    </g>
  );
}

function World() {
  return (
    <svg className="world-svg" viewBox="0 0 4800 720" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9" /></filter>
        <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stopColor="#05070f" stopOpacity=".8" /><stop offset="1" stopColor="#05070f" stopOpacity="0" /></linearGradient>
        <linearGradient id="fadeR" x1="0" x2="1"><stop offset="0" stopColor="#05070f" stopOpacity="0" /><stop offset="1" stopColor="#05070f" stopOpacity=".8" /></linearGradient>
        <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#96a8d0" stopOpacity="0" /><stop offset=".6" stopColor="#96a8d0" stopOpacity=".05" /><stop offset="1" stopColor="#96a8d0" stopOpacity="0" /></linearGradient>
        <radialGradient id="dawn" cx=".5" cy="1"><stop offset="0" stopColor="#ff9c5b" stopOpacity=".55" /><stop offset=".5" stopColor="#c96a4a" stopOpacity=".22" /><stop offset="1" stopColor="#c96a4a" stopOpacity="0" /></radialGradient>
      </defs>

      {/* dawn rising behind the skyline at the end of the line */}
      <ellipse cx="4700" cy="660" rx="760" ry="420" fill="url(#dawn)" />
      <circle cx="4700" cy="645" r="85" className="sun" />

      <path className="skyline" d={SKY} />
      <g className="citylights">{[...Array(140)].map((_, i) => {
        const x = 40 + ((i * 137) % 4640), y = 545 + ((i * 89) % 55);
        return i % 4 === 0 ? <rect key={i} x={x} y={y} width="7" height="10" className="lit" /> : null;
      })}</g>

      {/* the intro billboard */}
      <g className="b" transform="translate(60,0)">
        <rect x="0" y="340" width="330" height="280" className="blk" />
        <rect x="14" y="368" width="302" height="110" className="signboard" />
        <text x="165" y="415" className="neon cyan" textAnchor="middle" fontSize="30">NAFIS FORKAN</text>
        <text x="165" y="452" className="neon amber" textAnchor="middle" fontSize="14">GAMEPLAY PROGRAMMER</text>
        {[...Array(6)].map((_, i) => <rect key={i} x={30 + i * 48} y="510" width="20" height="30" className={i % 2 ? "w" : "w lit"} />)}
      </g>

      {/* Ghost Interactive depot */}
      <g className="b" transform="translate(480,0)">
        <rect x="0" y="380" width="220" height="240" className="blk" />
        <rect x="16" y="410" width="188" height="60" className="signboard" />
        <text x="110" y="447" className="neon cyan" textAnchor="middle">GHOST INTERACTIVE</text>
        {[...Array(8)].map((_, i) => <rect key={i} x={20 + i * 22} y="490" width="12" height="16" className={i % 3 ? "w" : "w lit"} />)}
        <rect x="34" y="585" width="152" height="35" className="door" />
      </g>

      {/* esports arena — here he's the host */}
      <g className="b" transform="translate(1960,0)">
        <ellipse cx="170" cy="560" rx="180" ry="58" className="blk" />
        <rect x="-10" y="540" width="360" height="80" className="blk" />
        <path d="M30 540 60 430 M310 540 340 430" className="mast" />
        <path d="M60 432 30 620h120z" className="cone" />
        <path d="M340 432 250 620h120z" className="cone" />
        <circle cx="60" cy="428" r="7" className="flood" /><circle cx="340" cy="428" r="7" className="flood" />
        <path d="M60 430l26 10-26 10z" className="flag" style={{ transformOrigin: "60px 430px" }} /><path d="M340 430l-26 10 26 10z" className="flag" style={{ transformOrigin: "340px 430px", animationDelay: ".4s" }} />
        {/* the host's podium, caught in a center-mast spotlight — he walks on when you arrive */}
        <path d="M170 505V432" className="mast" /><circle cx="170" cy="430" r="6" className="flood" />
        <path d="M170 434 138 620h64z" className="cone hostspot" />
        <rect x="138" y="606" width="64" height="14" className="podium" />
        <clipPath id="tickerclip"><rect x="10" y="556" width="320" height="16" /></clipPath>
        <g clipPath="url(#tickerclip)">
          <text className="ticker" y="568" x="0">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="-660 0" dur="9s" repeatCount="indefinite" />
            LIVE · QUALIFIERS · 500+ PLAYERS · 24+ TEAMS ·&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;LIVE · QUALIFIERS · 500+ PLAYERS · 24+ TEAMS
          </text>
        </g>
        <text x="170" y="604" className="neon amber" textAnchor="middle" fontSize="20">ESPORTS ARENA</text>
      </g>

      {/* research lab */}
      <g className="b" transform="translate(2660,0)">
        <rect x="0" y="330" width="200" height="290" className="blk" />
        <rect x="70" y="290" width="60" height="40" className="blk" />
        <path d="M100 290V220" className="mast" /><circle cx="100" cy="216" r="5" className="beacon" />
        <rect x="20" y="360" width="160" height="46" className="signboard" />
        <text x="100" y="389" className="neon green" textAnchor="middle" fontSize="20">RESEARCH LAB</text>
        {[...Array(12)].map((_, i) => <rect key={i} x={22 + (i % 4) * 40} y={425 + Math.floor(i / 4) * 55} width="16" height="22" className={i % 4 ? "w" : "w lit"} />)}
      </g>

      {/* construction site for the upcoming titles */}
      <g className="b" transform="translate(3600,0)">
        <rect x="0" y="440" width="150" height="180" className="frame" />
        <path d="M0 485h150 M0 530h150 M0 575h150 M50 440v180 M100 440v180" className="frameln" />
        <rect x="5" y="465" width="140" height="40" className="signboard" />
        <text x="75" y="491" className="neon amber" textAnchor="middle" fontSize="12" letterSpacing="1">IN DEVELOPMENT</text>
        <path d="M-40 620V300 M-60 620h40 M-40 300h30" className="cranebody" />
        <path d="M-40 300 240 252 M-40 300 -80 380" className="cable" />
        <circle cx="-40" cy="296" r="6" className="beacon" />
        <g className="hook"><path d="M240 252v50" className="cable" /><rect x="230" y="302" width="20" height="20" className="blk" /></g>
        {/* hazard barrier */}
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-30 + i * 46} y="600" width="34" height="14" className={i % 2 ? "hazard alt" : "hazard"} />)}
      </g>

      {/* jam arcade */}
      <g className="b" transform="translate(4080,0)">
        <rect x="0" y="420" width="200" height="200" className="blk" />
        <rect x="4" y="440" width="192" height="54" className="signboard" />
        <text x="100" y="473" className="neon pink" textAnchor="middle" fontSize="21">JAM ARCADE</text>
        <rect x="80" y="545" width="40" height="75" className="w lit" />
        <rect x="24" y="520" width="28" height="36" className="w" /><rect x="148" y="520" width="28" height="36" className="w lit" />
      </g>

      {/* terminus gate + shelter */}
      <g className="b" transform="translate(4560,0)">
        <path d="M0 620V480a60 60 0 01120 0v140h-30V488a30 30 0 00-60 0v132H0z" className="blk" />
        <text x="60" y="560" className="neon cyan" textAnchor="middle" fontSize="17">LAST STOP</text>
        <path d="M150 620v-70h110v70 M150 550l-8-8h126l-8 8" className="shelter" />
        <rect x="172" y="585" width="66" height="8" className="bench" />
      </g>

      <Rickshaw x={1120} /><Rickshaw x={3100} /><Rickshaw x={4400} />

      {/* street lights — each with its own orbiting moths */}
      {[420, 980, 1700, 2460, 3050, 3560, 3980, 4520].map((x) => (
        <g key={x} transform={`translate(${x},0)`} className="lamp">
          <path d="M0 620V470" className="pole" />
          <path d="M0 470h34" className="pole" />
          <path d="M28 476 12 620h50L38 476z" className="conel" />
          <circle cx="33" cy="478" r="4" className="bulb" />
          <g className="moth" style={{ transformOrigin: "33px 478px", animationDuration: (2.6 + (x % 3) * 0.7) + "s" }}><circle cx="41" cy="470" r="1.7" /></g>
          <g className="moth" style={{ transformOrigin: "33px 478px", animationDuration: (3.9 + (x % 4) * 0.5) + "s", animationDirection: "reverse" }}><circle cx="25" cy="486" r="1.2" /></g>
        </g>
      ))}

      {/* a working traffic signal */}
      <g transform="translate(1860,0)">
        <path d="M0 620V470h-34" className="pole" />
        <rect x="-56" y="456" width="46" height="24" rx="4" className="tlbox" />
        <circle cx="-48" cy="468" r="5" className="tlr" /><circle cx="-33" cy="468" r="5" className="tla" /><circle cx="-18" cy="468" r="5" className="tlg" />
      </g>

      {/* steam rising from street vents */}
      {[1500, 3450].map((x) => (
        <g key={x} transform={`translate(${x},616)`} className="vent">
          <rect x="-15" y="0" width="30" height="5" rx="2" />
          <ellipse cx="0" cy="-4" rx="5" ry="3" className="wisp" /><ellipse cx="0" cy="-4" rx="5" ry="3" className="wisp w2" /><ellipse cx="0" cy="-4" rx="5" ry="3" className="wisp w3" />
        </g>
      ))}

      {/* ground fog + the road */}
      <rect x="0" y="500" width="4800" height="120" fill="url(#fog)" />
      <rect x="0" y="620" width="4800" height="100" className="road" />
      <rect x="0" y="612" width="4800" height="8" className="kerb" />
      <rect x="0" y="620" width="4800" height="26" className="sheen" />
      {[...Array(60)].map((_, i) => <rect key={i} x={i * 85} y="668" width="44" height="5" className="dash" />)}
      {[...Array(120)].map((_, i) => <rect key={i} x={i * 42 + 20} y="640" width="5" height="4" className="cat" />)}

      {/* rain rings ticking in the puddles */}
      {[1150, 2900, 4350].map((x, i) => (
        <g key={x} transform={`translate(${x},706) scale(1,.28)`}>
          <circle r="13" className="rip" style={{ animationDelay: (i * 0.9) + "s" }} />
        </g>
      ))}

      {/* neon reflections bleeding onto the wet asphalt */}
      <rect x="100" y="622" width="220" height="60" fill="#4fd8ff" opacity=".08" filter="url(#soft)" />
      <rect x="500" y="622" width="160" height="50" fill="#4fd8ff" opacity=".07" filter="url(#soft)" />
      <rect x="1990" y="622" width="300" height="55" fill="#ffb84d" opacity=".07" filter="url(#soft)" />
      <rect x="2680" y="622" width="160" height="50" fill="#39d98a" opacity=".07" filter="url(#soft)" />
      <rect x="4090" y="622" width="180" height="50" fill="#ff7ad9" opacity=".08" filter="url(#soft)" />

      {/* collectibles — grab every star on the way through */}
      {PKX.map((x, i) => (
        <g key={x} className="pk" transform={`translate(${x},556)`}>
          <g className="pkin" style={{ animationDelay: (i * 0.27) + "s" }}>
            <circle r="13" className="pkbg" />
            <path d="M0-9 2.6-2.7 9.2-2.8 4.1 1.7 5.7 8.6 0 4.4 -5.7 8.6 -4.1 1.7 -9.2-2.8 -2.6-2.7z" />
          </g>
          <circle r="10" className="pring" />
        </g>
      ))}

      {/* buffer stop — the physical end of the line */}
      <g transform="translate(4740,0)">
        <path d="M0 620v-26h44l-30-44 M0 594h44 M14 620v-24 M30 620v-24" className="bumper" />
        <rect x="-4" y="594" width="52" height="10" className="hazard" />
        <rect x="-4" y="594" width="10" height="10" className="hazard alt" /><rect x="16" y="594" width="10" height="10" className="hazard alt" />
      </g>

      {/* the world is capped — a dead-end wall, not a void */}
      <g transform="translate(4772,0)">
        <rect width="28" height="720" className="endwall" />
        <rect width="5" height="720" className="endedge" />
        <text x="18" y="650" className="endtxt" transform="rotate(-90 18 650)">END OF LINE</text>
        <circle cx="16" cy="120" r="6" className="beacon" />
      </g>

      {/* world start fades in from dark */}
      <rect x="0" y="0" width="140" height="720" fill="url(#fadeL)" />
    </svg>
  );
}

function Bus() {
  return (
    <svg className="bus" viewBox="0 0 240 96" aria-hidden="true">
      <ellipse cx="105" cy="92" rx="105" ry="7" className="shadow" />
      <path d="M150 60 235 96h-95z" className="beamlight" />
      <ellipse cx="228" cy="88" rx="30" ry="8" className="lightpool" />
      <circle cx="8" cy="66" r="4" className="puff p1" /><circle cx="6" cy="70" r="3" className="puff p2" />
      <rect x="6" y="10" width="200" height="62" rx="10" className="body" />
      <rect x="6" y="10" width="200" height="20" rx="10" className="band" />
      <rect x="12" y="16" width="26" height="8" rx="2" className="dest" />
      <text x="25" y="23" className="desttxt" textAnchor="middle">NAFIS</text>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={46 + i * 34} y="16" width="26" height="16" rx="3" className={"winlit" + (i === 2 ? " flick" : "")} />)}
      {[0, 2].map((i) => <path key={i} d={`M${58 + i * 34} 32a6 6 0 016-6 6 6 0 016 6`} className="passenger" />)}
      <rect x="176" y="16" width="24" height="16" rx="3" className="winlit cab" />
      <circle cx="188" cy="26" r="4" className="driver" />
      <path d="M206 26l10-6v10l-10 2z" className="mirror" />
      <rect x="16" y="44" width="172" height="18" rx="4" className="panel" />
      <text x="102" y="57" className="sidetxt" textAnchor="middle">GHOST · NIGHT LINE</text>
      <circle cx="46" cy="74" r="14" className="wheel" /><circle cx="46" cy="74" r="6" className="hub" />
      <circle cx="46" cy="74" r="10" className="spoke" />
      <circle cx="170" cy="74" r="14" className="wheel" /><circle cx="170" cy="74" r="6" className="hub" />
      <circle cx="170" cy="74" r="10" className="spoke" />
      <rect x="202" y="40" width="8" height="12" rx="2" className="tail" />
      <rect x="2" y="66" width="6" height="8" rx="2" className="exhaust" />
      <text x="112" y="86" className="plate" textAnchor="middle">NF-2045</text>
    </svg>
  );
}

/* Nafis himself — walks the districts where the bus doesn't go.
   The base figure is constant; each zone dresses him differently. */
function Hero() {
  return (
    <svg className="hero" viewBox="0 0 90 96" aria-hidden="true">
      <ellipse cx="45" cy="90" rx="24" ry="4" className="shadow" />
      <path className="leg l1" d="M41 60l-4 26" />
      <path className="leg l2" d="M49 60l4 26" />
      <path className="arm" d="M36 37l-5 17" />
      <rect className="torso" x="35" y="28" width="20" height="34" rx="9" />
      <rect className="pack" x="27" y="34" width="8" height="17" rx="3" />
      <circle className="head" cx="45" cy="18" r="11" />
      <rect className="visor" x="40" y="14" width="10" height="5" rx="2" />
      {/* zone gear */}
      <g className="p-mic"><path className="arm" d="M54 38l12-15" /><circle cx="68" cy="21" r="4" className="micdot" /></g>
      <g className="p-coat"><path d="M31 30h28l5 34h-38z" /><path d="M35 52h20" className="belt" /></g>
      <g className="p-flask"><path d="M62 48h10l-4 12h-2z" /><circle cx="67" cy="56" r="2.4" className="flaskglow" /></g>
      <g className="p-hat"><path d="M33 15a12 12 0 0124 0z" /><rect x="30" y="13" width="30" height="4" rx="2" /></g>
      <g className="p-phones"><path d="M32 16a13 13 0 0126 0" /><rect x="29" y="13" width="6" height="10" rx="2.5" /><rect x="55" y="13" width="6" height="10" rx="2.5" /></g>
      <g className="p-wave"><path className="arm" d="M54 38l14-18" /><circle cx="70" cy="17" r="4" className="hand" /></g>
    </svg>
  );
}

function Stop({ s, i, n }) {
  const edge = s.x < 700 ? "l" : s.x > 4300 ? "r" : undefined;
  const links = (s.links || []).concat(s.id === "terminus" && LINKS.email ? [["Email", "mailto:" + LINKS.email]] : []);
  return (
    <div className="poi" id={"stop-" + s.id} data-edge={edge} style={{ left: (s.x / 4800 * 100) + "%", "--swd": (i * 0.37) + "s" }}>
      <button className="marker" aria-haspopup="true">
        <span className="board">{s.label}</span>
        <i className="pole" /><i className="glow" />
      </button>
      <div className="panel" role="dialog" aria-label={s.title}>
        <p className="ptag">{s.tag} <span className="stopno">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span></p>
        <h3>{s.title}</h3>
        {s.lines.map((l) => <p key={l}>{l}</p>)}
        <div className="skills">{s.skills.map((sk, j) => <i key={sk} style={{ "--i": j }}>{sk}</i>)}</div>
        <p className="learn">▸ learned: {s.learned}</p>
        {links.map(([t, u]) => <a key={t} className="btn" href={u} target="_blank" rel="noreferrer">{t} ↗</a>)}
      </div>
    </div>
  );
}

function App() {
  const world = useRef(null);
  const fill = useRef(null);
  const busEl = useRef(null);
  const farEl = useRef(null);
  const fgEl = useRef(null);
  const [next, setNext] = useState(STOPS[0].label);
  const [mode, setMode] = useState(MODES[0]);
  const [got, setGot] = useState(0);

  useEffect(() => {
    const el = world.current;
    const pois = [...el.querySelectorAll(".poi")];
    const pks = [...el.querySelectorAll(".pk")];
    const dots = [...document.querySelectorAll(".stops a")];
    let lastBest = -1, gotCount = 0;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); }
    };
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const s = el.scrollLeft;
      fill.current.style.width = (s / max * 100) + "%";
      busEl.current.style.setProperty("--spin", (s / 9) + "deg");
      if (farEl.current) farEl.current.style.transform = `translateX(${s * 0.35}px)`;
      if (fgEl.current) fgEl.current.style.transform = `translateX(${-s * 1.15}px)`;
      const cx = el.clientWidth / 2;
      /* the hero holds screen-center for most of the ride, then walks
         ahead to the gate as the line terminates */
      const frac = 0.5 + 0.22 * Math.pow(max ? s / max : 0, 6);
      busEl.current.parentElement.style.left = (frac * 100).toFixed(2) + "%";
      const heroX = s + el.clientWidth * frac;
      let best = null, bd = 1e9;
      pois.forEach((p, i) => {
        const r = p.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - cx);
        p.style.setProperty("--near", Math.max(0, 1 - d / (cx * 1.1)).toFixed(2));
        const dh = Math.abs(STOPS[i].x * el.scrollWidth / 4800 - heroX);
        if (dh < bd) { bd = dh; best = i; }
      });
      let newGot = 0;
      pks.forEach((pk, i) => {
        if (!pk.classList.contains("got") && PKX[i] * el.scrollWidth / 4800 <= heroX + 24) {
          pk.classList.add("got"); newGot++;
        }
      });
      if (newGot) { gotCount += newGot; setGot(gotCount); }
      if (best !== lastBest) {
        document.body.dataset.zone = ZONES[best];
        setMode(MODES[best]);
      }
      lastBest = best;
      dots.forEach((d, i) => d.classList.toggle("here", i === best));
      const nxt = STOPS.find((st) => st.x / 4800 * el.scrollWidth > s + el.clientWidth * 0.62);
      setNext(s >= max - 4 ? "END OF LINE" : (nxt || STOPS[STOPS.length - 1]).label);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll);
    onScroll();
    const h = location.hash.slice(1);
    if (h) document.getElementById(h)?.scrollIntoView({ inline: "center", behavior: "instant" });
    else if (matchMedia("(min-width:900px)").matches)
      el.querySelector("#stop-depot .marker")?.focus();
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="sky">
        <i className="ztint" />
        <div className="moon" />
        {[...Array(46)].map((_, i) => <i key={i} className="star" style={{ left: (i * 97 % 100) + "%", top: (i * 53 % 55) + "%", animationDelay: (i % 7) + "s" }} />)}
        <i className="cloud c1" /><i className="cloud c2" /><i className="cloud c3" />
        <i className="birds" />
        <i className="shoot" /><i className="plane" />
      </div>

      <div className="world" ref={world}>
        <div className="track">
          <div className="farclip"><div className="farwrap" ref={farEl}><FarSkyline /></div></div>
          <World />
          {STOPS.map((s, i) => <Stop key={s.id} s={s} i={i} n={STOPS.length} />)}
        </div>
      </div>

      <div className="fgwrap" ref={fgEl}><Foreground /></div>

      <div className="buswrap"><div ref={busEl} className="buspin"><Bus /><Hero /></div></div>
      <div className="storm" aria-hidden="true">{[...Array(26)].map((_, i) => <i key={i} className="drop" style={{ left: (i * 41 % 100) + "%", "--d": (0.55 + (i % 5) * 0.11) + "s", "--delay": -(i * 0.37 % 2) + "s" }} />)}</div>

      <header className="hud">
        <span className="plate-lg">NIGHT LINE · echo2045</span>
        <span className="next">NEXT <i className="go">▸</i> {next}</span>
        <span className="mode">MODE ▸ {mode}</span>
        <span key={got} className="score" aria-label={got + " of " + PKX.length + " stars collected"}>★ {got}/{PKX.length}</span>
        <span className="flexfill" />
        <nav>
          {STOPS.slice(1, 8).map((s) => <a key={s.id} href={"#stop-" + s.id}>{s.label}</a>)}
        </nav>
      </header>

      <div className="routeline">
        <div className="fillbar"><i ref={fill} /></div>
        <div className="stops">{STOPS.map((s) => <a key={s.id} href={"#stop-" + s.id} style={{ left: (s.x / 4800 * 100) + "%" }} aria-label={s.label} />)}</div>
        <p className="drive">scroll or drag to drive →</p>
      </div>

      <div className="boot"><b>NIGHT LINE</b><span>loading route · echo2045</span></div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
