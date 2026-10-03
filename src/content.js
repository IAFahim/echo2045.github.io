/* ─────────────────────────────────────────────────────────────
   THE ROUTE — edit this file, the world rebuilds itself.

   To add a stop: copy a block, give it a unique `id`, pick an `x`
   position along the line (0–4800; ~160 world-units per screen on
   a laptop), and write the label, title, lines, skills, and the
   one-line `learned`. Links render as buttons at the panel bottom.

   To remove a stop: delete its block. The nav, route dots, and
   "NEXT ▸" display update automatically.
   ───────────────────────────────────────────────────────────── */

export const LINKS = {
  github: "https://github.com/echo2045",
  linkedin: "https://www.linkedin.com/in/nafis-forkan-b24922184",
  email: "", // ← drop your email here; the LAST STOP gains a mail button
};

export const STOPS = [
  {
    id: "depot", x: 590, label: "Depot", tag: "day job", title: "Ghost Interactive",
    lines: ["Game programmer — Unity, Unreal Engine, game systems.", "Live titles, shipped and maintained at scale."],
    skills: ["Unity", "Unreal Engine", "Game Systems"],
    learned: "Shipping beats polishing — a live title is a promise you keep.",
  },
  {
    id: "scale", x: 940, label: "10M+ Scale", tag: "main quest", title: "Live at Scale",
    lines: ["Bus Simulator Bangladesh — updating & maintaining a title with 10M+ downloads.", "Optimization, bug fixing, Addressables, Cloud Content Delivery."],
    skills: ["Addressables", "Cloud Content Delivery", "Optimization"],
    learned: "Performance is a feature. At 10M installs, every frame has a budget.",
    links: [["Play Store", "https://play.google.com/store/apps/details?id=com.GhostInteractive.BusSimulatorBangladesh"]],
  },
  {
    id: "dhaka", x: 1420, label: "Endless Dhaka", tag: "main quest", title: "Endless Dhaka",
    lines: ["Complete remake and release of the mobile racing game.", "Contributed to ~1M new downloads."],
    skills: ["Full Remake", "Release Pipeline", "Live Ops"],
    learned: "A remake is trust rebuilt in public — same name, new spine.",
    links: [["Play Store", "https://play.google.com/store/apps/details?id=com.GhostInteractive.EndlessDhaka"]],
  },
  {
    id: "stadium", x: 2080, label: "Esports Arena", tag: "the other career", title: "Esports Ops",
    lines: ["10+ online tournaments · 5+ LAN · 2 national qualifiers hosted.", "500+ players supported · 24+ competitive teams managed.", "National team taken to international events."],
    skills: ["Tournament Ops", "Community", "Team Management"],
    learned: "Ops is systems design where the runtime is people.",
  },
  {
    id: "lab", x: 2760, label: "Research Lab", tag: "research quest", title: "Stinger — IEEE",
    lines: ["3D asymmetric multiplayer serious game teaching dengue prevention in rural Bangladesh.", "Published at SNPD 2025 — IEEE, Busan."],
    skills: ["Serious Games", "Asymmetric Multiplayer", "Research → Publication"],
    learned: "Games can teach what lectures can't.",
    links: [["Read paper", "https://ieeexplore.ieee.org/document/11313522"]],
  },
  {
    id: "truck", x: 3300, label: "Truck Depot", tag: "main quest", title: "Truck Simulator BD",
    lines: ["Custom traffic system designed and programmed for realistic simulation.", "Game systems built for player experience."],
    skills: ["Traffic AI", "Simulation Systems", "Player Experience"],
    learned: "Believable traffic is choreography, not chaos.",
  },
  {
    id: "crane", x: 3780, label: "Under Construction", tag: "soon", title: "In the Pipeline",
    lines: ["2 upcoming games in development.", "Watch this skyline."],
    skills: ["Prototyping", "R&D", "Systems Design"],
    learned: "The next game is already loading.",
  },
  {
    id: "arcade", x: 4180, label: "Jam Arcade", tag: "side quests", title: "Side Quests",
    lines: ["Speak-and-Play — voice-controlled gaming for differently-abled players.", "Retsnom.Inc — befriend monsters · Polar Bear Run — BCGameJam 2020 · Multiplayer Race — Photon PUN."],
    skills: ["HCI / Accessibility", "Photon PUN", "Game Jams"],
    learned: "Weekend builds keep the instinct sharp.",
    links: [["Browse repos", "https://github.com/echo2045?tab=repositories"]],
  },
  {
    id: "terminus", x: 4620, label: "Last Stop", tag: "terminus", title: "Say Hello",
    lines: ["Party slot open — studios, teams, collaborators.", "All lines terminate here."],
    skills: ["Available", "Collaborative", "Dhaka → anywhere"],
    learned: "Every route ends somewhere. This one ends with you.",
    links: [["GitHub", "https://github.com/echo2045"], ["LinkedIn", "https://www.linkedin.com/in/nafis-forkan-b24922184"]],
  },
];
