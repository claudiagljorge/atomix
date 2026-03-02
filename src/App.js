import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   📦 DATA — Elements, Compounds, Rocks
   ═══════════════════════════════════════════ */

const ELEMENTS = {
  H:  { name: "Hydrogen",   number: 1,  category: "nonmetal",    color: "#FF6B6B", glow: "#ff4040", fact: "The lightest element! Makes up 75% of the universe." },
  He: { name: "Helium",     number: 2,  category: "noble-gas",   color: "#FFDDB7", glow: "#ffcc88", fact: "Makes balloons float and your voice squeaky!" },
  C:  { name: "Carbon",     number: 6,  category: "nonmetal",    color: "#8C8C8C", glow: "#666666", fact: "Found in diamonds, pencils, and every living thing!" },
  N:  { name: "Nitrogen",   number: 7,  category: "nonmetal",    color: "#5DADE2", glow: "#2E86C1", fact: "Makes up 78% of the air you breathe!" },
  O:  { name: "Oxygen",     number: 8,  category: "nonmetal",    color: "#4ECDC4", glow: "#2BA8A0", fact: "You breathe this! It makes up 21% of Earth's atmosphere." },
  Na: { name: "Sodium",     number: 11, category: "alkali",      color: "#FFE66D", glow: "#e6c800", fact: "A soft metal that explodes in water! Used in table salt." },
  Mg: { name: "Magnesium",  number: 12, category: "alkaline",    color: "#81C784", glow: "#4CAF50", fact: "Burns with a brilliant white light! Found in fireworks." },
  Al: { name: "Aluminum",   number: 13, category: "post-trans",  color: "#B0BEC5", glow: "#78909C", fact: "The most common metal in Earth's crust! Used in soda cans." },
  Si: { name: "Silicon",    number: 14, category: "metalloid",   color: "#B39DDB", glow: "#9575CD", fact: "Used in computer chips and found in sand!" },
  P:  { name: "Phosphorus", number: 15, category: "nonmetal",    color: "#F48FB1", glow: "#E91E63", fact: "Glows in the dark! Your DNA contains phosphorus." },
  S:  { name: "Sulfur",     number: 16, category: "nonmetal",    color: "#FDD835", glow: "#F9A825", fact: "Smells like rotten eggs! Found near volcanoes." },
  Cl: { name: "Chlorine",   number: 17, category: "halogen",     color: "#A5D6A7", glow: "#66BB6A", fact: "A greenish gas used to keep swimming pools clean." },
  K:  { name: "Potassium",  number: 19, category: "alkali",      color: "#FF8A65", glow: "#E64A19", fact: "Found in bananas! Your muscles need it to work." },
  Ca: { name: "Calcium",    number: 20, category: "alkaline",    color: "#F5F5DC", glow: "#D7CCC8", fact: "Builds strong bones and teeth! Found in milk." },
  Fe: { name: "Iron",       number: 26, category: "transition",  color: "#D4845A", glow: "#A0522D", fact: "Makes your blood red and is found in Earth's core!" },
  Cu: { name: "Copper",     number: 29, category: "transition",  color: "#E8A87C", glow: "#CC7A3E", fact: "The Statue of Liberty is covered in copper!" },
  Zn: { name: "Zinc",       number: 30, category: "transition",  color: "#AED6F1", glow: "#5DADE2", fact: "Protects steel from rusting and is in sunscreen!" },
  Ag: { name: "Silver",     number: 47, category: "transition",  color: "#D5D8DC", glow: "#ABB2B9", fact: "The best conductor of electricity of all metals!" },
  Au: { name: "Gold",       number: 79, category: "transition",  color: "#F7DC6F", glow: "#D4AC0D", fact: "All the gold ever mined would fit in 3.5 Olympic pools!" },
};

const CATEGORY_LABELS = {
  "nonmetal": { label: "Nonmetal", color: "#FF6B6B" },
  "noble-gas": { label: "Noble Gas", color: "#FFDDB7" },
  "alkali": { label: "Alkali Metal", color: "#FFE66D" },
  "alkaline": { label: "Alkaline Earth", color: "#81C784" },
  "metalloid": { label: "Metalloid", color: "#B39DDB" },
  "halogen": { label: "Halogen", color: "#A5D6A7" },
  "transition": { label: "Transition Metal", color: "#D4845A" },
  "post-trans": { label: "Post-Transition", color: "#B0BEC5" },
};

const COMPOUND_LEVELS = [
  { id: "water", name: "Water", formula: "H₂O", emoji: "💧", required: { H: 2, O: 1 }, difficulty: 1, category: "Everyday",
    fact: "A single drop of water has about 1.7 sextillion molecules!" },
  { id: "salt", name: "Table Salt", formula: "NaCl", emoji: "🧂", required: { Na: 1, Cl: 1 }, difficulty: 1, category: "Everyday",
    fact: "Roman soldiers were paid in salt — that's where 'salary' comes from!" },
  { id: "co2", name: "Carbon Dioxide", formula: "CO₂", emoji: "🌬️", required: { C: 1, O: 2 }, difficulty: 1, category: "Everyday",
    fact: "Plants eat CO₂ for breakfast through photosynthesis!" },
  { id: "mgo", name: "Magnesium Oxide", formula: "MgO", emoji: "🔥", required: { Mg: 1, O: 1 }, difficulty: 1, category: "Minerals",
    fact: "MgO survives temperatures over 2,800°C — it lines steel furnaces!" },
  { id: "kcl", name: "Potassium Chloride", formula: "KCl", emoji: "⚗️", required: { K: 1, Cl: 1 }, difficulty: 1, category: "Minerals",
    fact: "KCl is the mineral sylvite — mined from ancient dried-up seas!" },
  { id: "ammonia", name: "Ammonia", formula: "NH₃", emoji: "🧪", required: { N: 1, H: 3 }, difficulty: 2, category: "Everyday",
    fact: "Ammonia-based fertilizers help grow half the world's food supply!" },
  { id: "methane", name: "Methane", formula: "CH₄", emoji: "🐄", required: { C: 1, H: 4 }, difficulty: 2, category: "Everyday",
    fact: "Cows produce about 100 liters of methane per day — that's a lot of burps!" },
  { id: "rust", name: "Rust (Iron Oxide)", formula: "Fe₂O₃", emoji: "🔴", required: { Fe: 2, O: 3 }, difficulty: 2, category: "Minerals",
    fact: "Mars is the 'Red Planet' because its surface is covered in rust!" },
  { id: "quartz", name: "Quartz", formula: "SiO₂", emoji: "💎", required: { Si: 1, O: 2 }, difficulty: 2, category: "Minerals",
    fact: "Quartz vibrates 32,768 times per second — that's how quartz watches work!" },
  { id: "pyrite", name: "Fool's Gold (Pyrite)", formula: "FeS₂", emoji: "✨", required: { Fe: 1, S: 2 }, difficulty: 2, category: "Minerals",
    fact: "Gold Rush miners were tricked by pyrite's golden shine!" },
  { id: "calcium-carb", name: "Calcium Carbonate", formula: "CaCO₃", emoji: "🐚", required: { Ca: 1, C: 1, O: 3 }, difficulty: 3, category: "Minerals",
    fact: "Seashells, chalk, marble, and limestone are ALL calcium carbonate!" },
  { id: "al2o3", name: "Aluminum Oxide", formula: "Al₂O₃", emoji: "💠", required: { Al: 2, O: 3 }, difficulty: 3, category: "Minerals",
    fact: "Rubies and sapphires are aluminum oxide with tiny impurities for color!" },
  { id: "h2so4", name: "Sulfuric Acid", formula: "H₂SO₄", emoji: "☠️", required: { H: 2, S: 1, O: 4 }, difficulty: 3, category: "Advanced",
    fact: "More sulfuric acid is produced than any other chemical — 200M tonnes/year!" },
];

const ROCK_LEVELS = [
  {
    id: "limestone", name: "Limestone", emoji: "🏔️", type: "Sedimentary Rock",
    requiredCompounds: ["calcium-carb"],
    fact: "The Great Pyramid of Giza is made mostly of limestone blocks!",
    description: "A sedimentary rock made almost entirely of calcium carbonate (CaCO₃) from ancient seashells.",
  },
  {
    id: "sandstone", name: "Sandstone", emoji: "🏜️", type: "Sedimentary Rock",
    requiredCompounds: ["quartz"],
    fact: "The Grand Canyon's beautiful red layers are made of sandstone!",
    description: "Made of sand-sized quartz (SiO₂) grains cemented together over millions of years.",
  },
  {
    id: "granite", name: "Granite", emoji: "⛰️", type: "Igneous Rock",
    requiredCompounds: ["quartz", "al2o3"],
    fact: "Mount Rushmore is carved into granite! It's one of the toughest rocks on Earth.",
    description: "An igneous rock containing quartz (SiO₂) and feldspar (from aluminum oxide Al₂O₃).",
  },
  {
    id: "ironstone", name: "Ironstone", emoji: "🪨", type: "Sedimentary Rock",
    requiredCompounds: ["rust", "calcium-carb"],
    fact: "Ancient ironstone formations are 2+ billion years old — they formed when Earth first got oxygen!",
    description: "Contains iron oxide (Fe₂O₃) cemented with calcium carbonate (CaCO₃).",
  },
  {
    id: "marble", name: "Marble", emoji: "🏛️", type: "Metamorphic Rock",
    requiredCompounds: ["calcium-carb", "mgo"],
    fact: "The Taj Mahal and ancient Greek temples are made of marble!",
    description: "Limestone (CaCO₃) that was transformed by heat and pressure. Often contains MgO.",
  },
];

/* ═══════════════════════════════════════════
   🔧 HELPERS
   ═══════════════════════════════════════════ */
const ALL_SYMBOLS = Object.keys(ELEMENTS);
const ATOM_SIZE = 60;
const rand = (min, max) => min + Math.random() * (max - min);

function generateAtoms(level, w, h) {
  const atoms = [];
  let id = 0;
  const pad = ATOM_SIZE + 8;
  const aW = Math.max(w - pad * 2, 80);
  const aH = Math.max(h - pad * 2, 80);
  Object.entries(level.required).forEach(([el, count]) => {
    for (let i = 0; i < count; i++) {
      atoms.push({ id: id++, element: el, x: pad + Math.random() * aW, y: pad + Math.random() * aH, vx: rand(-1.4, 1.4), vy: rand(-1.4, 1.4) });
    }
  });
  const needed = Object.keys(level.required);
  const pool = ALL_SYMBOLS.filter(s => !needed.includes(s));
  const numD = 4 + level.difficulty * 4;
  for (let i = 0; i < numD; i++) {
    atoms.push({ id: id++, element: pool[Math.floor(Math.random() * pool.length)], x: pad + Math.random() * aW, y: pad + Math.random() * aH, vx: rand(-1.4, 1.4), vy: rand(-1.4, 1.4) });
  }
  for (let i = atoms.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [atoms[i], atoms[j]] = [atoms[j], atoms[i]]; }
  return atoms;
}

/* ═══════════════════════════════════════════
   🎨 SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function FloatingAtom({ atom, isDragging, onPointerDown, arenaRef, shakeId }) {
  const ref = useRef(null);
  const posRef = useRef({ x: atom.x, y: atom.y });
  const velRef = useRef({ x: atom.vx, y: atom.vy });
  const animRef = useRef(null);

  useEffect(() => {
    posRef.current = { x: atom.x, y: atom.y };
    velRef.current = { x: atom.vx, y: atom.vy };
  }, [atom.x, atom.y, atom.vx, atom.vy]);

  useEffect(() => {
    if (isDragging) { if (animRef.current) cancelAnimationFrame(animRef.current); return; }
    const go = () => {
      const arena = arenaRef.current;
      if (!arena || !ref.current) return;
      const b = arena.getBoundingClientRect();
      posRef.current.x += velRef.current.x;
      posRef.current.y += velRef.current.y;
      if (posRef.current.x <= 0 || posRef.current.x >= b.width - ATOM_SIZE) { velRef.current.x *= -1; posRef.current.x = Math.max(0, Math.min(b.width - ATOM_SIZE, posRef.current.x)); }
      if (posRef.current.y <= 0 || posRef.current.y >= b.height - ATOM_SIZE) { velRef.current.y *= -1; posRef.current.y = Math.max(0, Math.min(b.height - ATOM_SIZE, posRef.current.y)); }
      ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      animRef.current = requestAnimationFrame(go);
    };
    animRef.current = requestAnimationFrame(go);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isDragging, arenaRef]);

  const el = ELEMENTS[atom.element];
  const isShaking = shakeId === atom.id;

  return (
    <div ref={ref}
      onPointerDown={e => {
        e.preventDefault();
        const ar = arenaRef.current.getBoundingClientRect();
        onPointerDown(atom.id, { offsetX: e.clientX - (ar.left + posRef.current.x), offsetY: e.clientY - (ar.top + posRef.current.y), posRef, velRef, domRef: ref });
      }}
      style={{
        position: "absolute", width: ATOM_SIZE, height: ATOM_SIZE, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, ${el.color}ee, ${el.color}88, ${el.glow}55)`,
        border: `3px solid ${el.color}cc`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        cursor: isDragging ? "grabbing" : "grab", touchAction: "none", userSelect: "none",
        zIndex: isDragging ? 100 : 10,
        boxShadow: isDragging ? `0 0 35px ${el.color}88, 0 10px 40px rgba(0,0,0,0.35)` : `0 0 12px ${el.color}33, inset 0 -3px 6px ${el.glow}33`,
        transform: `translate(${atom.x}px, ${atom.y}px)`,
        animation: isShaking ? "shake-wrong 0.5s ease-out" : "none",
      }}>
      <div style={{ position: "absolute", top: 6, left: 10, width: 16, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.3)", transform: "rotate(-25deg)", pointerEvents: "none" }} />
      <span style={{ fontSize: 21, fontWeight: 800, color: "#1a1a2e", lineHeight: 1, fontFamily: "var(--font)" }}>{atom.element}</span>
      <span style={{ fontSize: 8, color: "#1a1a2eaa", fontWeight: 700, fontFamily: "var(--font)" }}>{el.number}</span>
    </div>
  );
}

function MoleculeSlot({ element, filled, pulse }) {
  const el = ELEMENTS[element];
  return (
    <div style={{
      width: 50, height: 50, borderRadius: "50%", margin: 3,
      border: `3px ${filled ? "solid" : "dashed"} ${filled ? el.color : "#ffffff33"}`,
      background: filled ? `radial-gradient(circle at 35% 30%, ${el.color}cc, ${el.color}77)` : "rgba(255,255,255,0.04)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: filled ? "scale(1.1)" : "scale(1)",
      boxShadow: filled ? `0 0 20px ${el.color}55` : "none",
      animation: pulse ? "slot-pulse 0.6s ease-out" : "none",
    }}>
      <span style={{ fontSize: 17, fontWeight: 800, color: filled ? "#1a1a2e" : "#ffffff33", fontFamily: "var(--font)" }}>{element}</span>
      {filled && <span style={{ fontSize: 7, color: "#1a1a2eaa", fontWeight: 700 }}>{el.number}</span>}
    </div>
  );
}

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100;
  const color = pct > 50 ? "#4ECDC4" : pct > 25 ? "#FFE66D" : "#FF6B6B";
  return (
    <div style={{ width: "100%", height: 5, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: color, transition: "width 1s linear, background 0.5s", boxShadow: `0 0 8px ${color}88` }} />
    </div>
  );
}

function Toast({ type, element, needed }) {
  const isCorrect = type === "correct";
  return (
    <div style={{
      position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
      padding: "8px 18px", borderRadius: 14, zIndex: 300,
      background: isCorrect ? "rgba(78,205,196,0.92)" : "rgba(255,82,82,0.92)",
      color: isCorrect ? "#1a1a2e" : "#fff", fontFamily: "var(--font)", fontWeight: 600, fontSize: 13,
      animation: "toast-pop 1.8s ease-out forwards",
      boxShadow: isCorrect ? "0 6px 20px rgba(78,205,196,0.4)" : "0 6px 20px rgba(255,82,82,0.4)",
      display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
    }}>
      <span>{isCorrect ? "✅" : "❌"}</span>
      {isCorrect
        ? <span><b>{ELEMENTS[element]?.name}</b> — correct!</span>
        : <span><b>{ELEMENTS[element]?.name}</b> not needed! Find: {needed}</span>
      }
    </div>
  );
}

function Confetti() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }}>
      {Array.from({ length: 36 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${40 + (Math.random() - 0.5) * 40}%`, top: `${40 + (Math.random() - 0.5) * 30}%`,
          width: 5 + Math.random() * 9, height: 5 + Math.random() * 9,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          background: ["#FF6B6B","#4ECDC4","#FFE66D","#B39DDB","#FF8A65","#81C784","#5DADE2"][i % 7],
          animation: `confetti-fly 1s ease-out ${Math.random() * 0.3}s forwards`, opacity: 0,
        }} />
      ))}
    </div>
  );
}

function BackBtn({ onClick, label = "← Back" }) {
  return (
    <button className="gbtn" onClick={onClick} style={{
      background: "rgba(255,255,255,0.08)", color: "#fff", padding: "7px 16px",
      borderRadius: 11, fontSize: 13, fontWeight: 600,
    }}>{label}</button>
  );
}

/* ═══════════════════════════════════════════
   🏠 PERIODIC TABLE MINI (Learn Screen)
   ═══════════════════════════════════════════ */
function PeriodicTableMini({ onSelect, selected }) {
  const rows = [
    ["H", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "He"],
    [null, null, null, null, null, null, null, null, null, null, null, null, "C", "N", "O", "P", "S", "Cl"],
    ["Na", "Mg", "Al", "Si", null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ["K", "Ca", null, null, null, null, "Fe", "Cu", "Zn", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, "Ag", null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, "Au", null, null, null, null, null, null, null, null, null, null],
  ];
  return (
    <div style={{ overflowX: "auto", paddingBottom: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 360 }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 3 }}>
            {row.map((el, ci) => {
              if (!el) return <div key={ci} style={{ width: 34, height: 34, flexShrink: 0 }} />;
              const d = ELEMENTS[el];
              const isSel = selected === el;
              return (
                <div key={ci} onClick={() => onSelect(el)} style={{
                  width: 34, height: 34, borderRadius: 7, flexShrink: 0, cursor: "pointer",
                  background: isSel ? d.color : `${d.color}30`,
                  border: `2px solid ${isSel ? d.color : d.color + "55"}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", transform: isSel ? "scale(1.18)" : "scale(1)",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isSel ? "#1a1a2e" : d.color, fontFamily: "var(--font)" }}>{el}</span>
                  <span style={{ fontSize: 6, color: isSel ? "#1a1a2e99" : d.color + "88" }}>{d.number}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   🎮 MAIN GAME COMPONENT
   ═══════════════════════════════════════════ */
export default function ChemistryGame() {
  // Navigation
  const [screen, setScreen] = useState("menu");
  // Learn
  const [selectedEl, setSelectedEl] = useState(null);
  // Compound game
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedCompounds, setCompletedCompounds] = useState(new Set());
  const [atoms, setAtoms] = useState([]);
  const [filledSlots, setFilledSlots] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [pulseSlot, setPulseSlot] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelResult, setLevelResult] = useState(null);
  // Rock builder
  const [currentRock, setCurrentRock] = useState(0);
  const [rockSlots, setRockSlots] = useState({});
  const [completedRocks, setCompletedRocks] = useState(new Set());
  const [rockResult, setRockResult] = useState(null);
  // Global
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const arenaRef = useRef(null);
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const toastTimer = useRef(null);

  const level = COMPOUND_LEVELS[currentLevel];
  const rock = ROCK_LEVELS[currentRock];

  /* ─── Timer ─── */
  useEffect(() => {
    if (screen !== "compound-play" || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); setLevelResult({ won: false }); setScreen("compound-result"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [screen, timeLeft]);

  /* ─── Init compound level ─── */
  const startCompound = useCallback((idx) => {
    setCurrentLevel(idx);
    setFilledSlots({}); setDraggingId(null); setToast(null); setShakeId(null); setPulseSlot(null); setMistakes(0); setShowConfetti(false); setLevelResult(null);
    const lvl = COMPOUND_LEVELS[idx];
    const time = lvl.difficulty === 1 ? 45 : lvl.difficulty === 2 ? 60 : 90;
    setMaxTime(time); setTimeLeft(time);
    setTimeout(() => {
      const a = arenaRef.current;
      setAtoms(generateAtoms(lvl, a ? a.offsetWidth : 350, a ? a.offsetHeight : 300));
    }, 60);
    setScreen("compound-play");
  }, []);

  /* ─── Drag system ─── */
  const handlePointerDown = (atomId, refs) => {
    setDraggingId(atomId);
    dragRef.current = refs;
    const el = document.documentElement;
    const onMove = (e) => {
      if (!dragRef.current || !arenaRef.current) return;
      const ar = arenaRef.current.getBoundingClientRect();
      const x = e.clientX - ar.left - dragRef.current.offsetX;
      const y = e.clientY - ar.top - dragRef.current.offsetY;
      dragRef.current.posRef.current = { x, y };
      if (dragRef.current.domRef.current) dragRef.current.domRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onUp = (e) => {
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerup", onUp);
      handleDrop(atomId, e.clientX, e.clientY);
      if (dragRef.current) dragRef.current.velRef.current = { x: rand(-1.4, 1.4), y: rand(-1.4, 1.4) };
      setDraggingId(null); dragRef.current = null;
    };
    el.addEventListener("pointermove", onMove); el.addEventListener("pointerup", onUp);
  };

  const handleDrop = (atomId, cx, cy) => {
    if (!dropRef.current) return;
    const r = dropRef.current.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return;
    const atom = atoms.find(a => a.id === atomId);
    if (!atom) return;
    const sym = atom.element;
    const needed = level.required[sym] || 0;
    const already = filledSlots[sym] || 0;
    if (toastTimer.current) clearTimeout(toastTimer.current);

    if (already < needed) {
      const nf = { ...filledSlots, [sym]: already + 1 };
      setFilledSlots(nf);
      setAtoms(prev => prev.filter(a => a.id !== atomId));
      setPulseSlot(sym); setTimeout(() => setPulseSlot(null), 700);
      setToast({ type: "correct", element: sym, key: Date.now() });
      toastTimer.current = setTimeout(() => setToast(null), 1500);
      const isComplete = Object.entries(level.required).every(([e, c]) => (nf[e] || 0) >= c);
      if (isComplete) {
        const bp = level.difficulty === 1 ? 150 : level.difficulty === 2 ? 250 : 400;
        const tb = Math.max(0, Math.floor(timeLeft * 2));
        const mp = mistakes * 25; const sb = streak * 30;
        const total = Math.max(0, bp + tb - mp + sb);
        setScore(s => s + total); setStreak(s => s + 1);
        setCompletedCompounds(prev => new Set([...prev, level.id]));
        setShowConfetti(true);
        setLevelResult({ won: true, bp, tb, mp, sb, total });
        setTimeout(() => { setShowConfetti(false); setScreen("compound-result"); }, 1400);
      }
    } else {
      setMistakes(m => m + 1); setShakeId(atomId); setTimeout(() => setShakeId(null), 600);
      const ns = Object.entries(level.required).map(([s, c]) => `${c}×${s}`).join(", ");
      setToast({ type: "wrong", element: sym, needed: ns, key: Date.now() });
      toastTimer.current = setTimeout(() => setToast(null), 2500);
    }
  };

  /* ─── Rock builder ─── */
  const startRock = (idx) => {
    setCurrentRock(idx); setRockSlots({}); setRockResult(null); setScreen("rock-play");
  };

  const toggleRockSlot = (compoundId) => {
    setRockSlots(prev => {
      const n = { ...prev };
      if (n[compoundId]) delete n[compoundId]; else n[compoundId] = true;
      return n;
    });
  };

  const submitRock = () => {
    const needed = new Set(rock.requiredCompounds);
    const selected = new Set(Object.keys(rockSlots));
    const correct = needed.size === selected.size && [...needed].every(c => selected.has(c));
    if (correct) {
      setScore(s => s + 300);
      setCompletedRocks(prev => new Set([...prev, rock.id]));
      setShowConfetti(true);
      setRockResult({ won: true });
      setTimeout(() => setShowConfetti(false), 1600);
    } else {
      setRockResult({ won: false, needed: rock.requiredCompounds.map(id => COMPOUND_LEVELS.find(c => c.id === id)?.name).join(" + ") });
    }
  };

  /* ─── Slot arrays ─── */
  const slotsArr = level ? Object.entries(level.required).flatMap(([el, c]) => Array.from({ length: c }, (_, i) => ({ element: el, filled: (filledSlots[el] || 0) > i }))) : [];
  const totalNeeded = level ? Object.values(level.required).reduce((a, b) => a + b, 0) : 0;
  const totalFilled = Object.values(filledSlots).reduce((a, b) => a + b, 0);

  /* ═══════════════════════════════════════════
     🖼️ RENDER
     ═══════════════════════════════════════════ */
  return (
    <div style={{
      "--font": "'Baloo 2', sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(145deg, #0a0a1a 0%, #111133 35%, #1a1a3e 65%, #0d0d2a 100%)",
      fontFamily: "var(--font)", color: "#fff", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        @keyframes slide-in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float-slow{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glow-ring{0%,100%{box-shadow:0 0 12px rgba(78,205,196,0.15)}50%{box-shadow:0 0 28px rgba(78,205,196,0.35)}}
        @keyframes shake-wrong{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
        @keyframes slot-pulse{0%{transform:scale(1.1)}50%{transform:scale(1.3)}100%{transform:scale(1.1)}}
        @keyframes toast-pop{0%{opacity:0;transform:translateX(-50%) translateY(-10px)}10%{opacity:1;transform:translateX(-50%) translateY(0)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-10px)}}
        @keyframes confetti-fly{0%{opacity:1;transform:translate(0,0) scale(0.3)}70%{opacity:1}100%{opacity:0;transform:translate(${Math.random()>0.5?'':'-'}${100+Math.random()*150}px,${-80-Math.random()*200}px) rotate(${400+Math.random()*600}deg) scale(1)}}
        @keyframes star-spin{from{transform:rotate(0) scale(0.5);opacity:0}to{transform:rotate(360deg) scale(1);opacity:1}}
        @keyframes bg-orb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,-15px) scale(1.08)}66%{transform:translate(-18px,12px) scale(0.92)}}
        .gbtn{border:none;cursor:pointer;font-family:var(--font);transition:all 0.2s}.gbtn:hover{transform:scale(1.05);filter:brightness(1.12)}.gbtn:active{transform:scale(0.97)}
        .card-hover{transition:all 0.2s}.card-hover:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.3)}
      `}</style>

      {/* BG orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[{ c:"#4ECDC4",x:"15%",y:"20%",s:200,d:"12s" },{ c:"#FF6B6B",x:"75%",y:"60%",s:150,d:"15s" },{ c:"#B39DDB",x:"50%",y:"80%",s:180,d:"18s" },{ c:"#FFE66D",x:"85%",y:"15%",s:120,d:"10s" }].map((o,i) => (
          <div key={i} style={{ position:"absolute",left:o.x,top:o.y,width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c}10 0%,transparent 70%)`,animation:`bg-orb ${o.d} ease-in-out infinite`,animationDelay:`${i*-3}s` }} />
        ))}
      </div>

      {showConfetti && <Confetti />}

      {/* ════════════ MENU ════════════ */}
      {screen === "menu" && (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:28,animation:"slide-in 0.5s ease-out",position:"relative",zIndex:1 }}>
          <div style={{ fontSize: 72, marginBottom: 4, animation: "float-slow 3s ease-in-out infinite" }}>⚛️</div>
          <h1 style={{ fontSize:"clamp(30px,7vw,50px)",fontWeight:800,lineHeight:1.1,marginBottom:6,background:"linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textAlign:"center" }}>
            Atomix
          </h1>
          <p style={{ color:"#ffffff66",fontSize:15,marginBottom:40,textAlign:"center",maxWidth:380,lineHeight:1.5 }}>
            Explore elements, build compounds from floating atoms, then combine them into real rocks & minerals!
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:300 }}>
            {[
              { label: "🔬 Learn Elements", screen: "learn", bg: "linear-gradient(135deg,#4ECDC4,#3DB8B0)", color: "#1a1a2e", shadow: "rgba(78,205,196,0.35)" },
              { label: "🧪 Build Compounds", screen: "compound-levels", bg: "linear-gradient(135deg,#FF6B6B,#ee5252)", color: "#fff", shadow: "rgba(255,107,107,0.35)" },
              { label: "🏔️ Build Rocks", screen: "rock-levels", bg: "linear-gradient(135deg,#B39DDB,#9575CD)", color: "#fff", shadow: "rgba(179,157,219,0.35)" },
            ].map(b => (
              <button key={b.screen} className="gbtn" onClick={() => setScreen(b.screen)} style={{
                padding:"16px 32px",borderRadius:18,background:b.bg,color:b.color,fontSize:18,fontWeight:700,boxShadow:`0 6px 22px ${b.shadow}`,
              }}>{b.label}</button>
            ))}
          </div>
          {score > 0 && (
            <div style={{ marginTop:32,padding:"12px 22px",borderRadius:14,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:18,alignItems:"center",fontSize:14 }}>
              <span style={{ color:"#FFE66D",fontWeight:700 }}>⭐ {score}</span>
              <span style={{ color:"#FF6B6B",fontWeight:700 }}>🔥 {streak}</span>
              <span style={{ color:"#4ECDC4",fontWeight:600 }}>✅ {completedCompounds.size + completedRocks.size}/{COMPOUND_LEVELS.length + ROCK_LEVELS.length}</span>
            </div>
          )}
        </div>
      )}

      {/* ════════════ LEARN ELEMENTS ════════════ */}
      {screen === "learn" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:650,margin:"0 auto",position:"relative",zIndex:1 }}>
          <BackBtn onClick={() => setScreen("menu")} />
          <h2 style={{ fontSize:24,fontWeight:800,margin:"12px 0 4px" }}>🔬 Periodic Table Explorer</h2>
          <p style={{ color:"#ffffff66",fontSize:13,marginBottom:14 }}>Tap any element to learn about it!</p>
          <PeriodicTableMini onSelect={setSelectedEl} selected={selectedEl} />
          {/* Category legend */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:12,marginBottom:12 }}>
            {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
              <span key={key} style={{ padding:"3px 10px",borderRadius:8,fontSize:10,fontWeight:600,background:`${val.color}22`,color:val.color,border:`1px solid ${val.color}33` }}>{val.label}</span>
            ))}
          </div>
          {selectedEl && (
            <div style={{ padding:18,borderRadius:16,background:`${ELEMENTS[selectedEl].color}11`,border:`2px solid ${ELEMENTS[selectedEl].color}33`,animation:"slide-in 0.3s ease-out" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:10 }}>
                <div style={{ width:60,height:60,borderRadius:"50%",background:`radial-gradient(circle at 35% 30%,${ELEMENTS[selectedEl].color}dd,${ELEMENTS[selectedEl].color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:800,color:"#1a1a2e" }}>{selectedEl}</div>
                <div>
                  <h3 style={{ fontSize:20,fontWeight:700 }}>{ELEMENTS[selectedEl].name}</h3>
                  <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
                    <span style={{ color:"#ffffff88",fontSize:13 }}>#{ELEMENTS[selectedEl].number}</span>
                    <span style={{ padding:"2px 10px",borderRadius:8,fontSize:11,fontWeight:600,background:`${CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.color}33`,color:CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.color }}>
                      {CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.label}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize:15,lineHeight:1.6,color:"#ffffffcc" }}>💡 {ELEMENTS[selectedEl].fact}</p>
            </div>
          )}
        </div>
      )}

      {/* ════════════ COMPOUND LEVEL SELECT ════════════ */}
      {screen === "compound-levels" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:560,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <BackBtn onClick={() => setScreen("menu")} />
            <span style={{ color:"#FFE66D",fontWeight:700,fontSize:14 }}>⭐ {score}</span>
          </div>
          <h2 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>🧪 Build Compounds</h2>
          <p style={{ color:"#ffffff55",fontSize:13,marginBottom:18 }}>Find the right atoms among the floating chaos!</p>
          {["Everyday","Minerals","Advanced"].map(cat => {
            const items = COMPOUND_LEVELS.map((l,i) => ({...l,idx:i})).filter(l => l.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} style={{ marginBottom:18 }}>
                <h3 style={{ fontSize:12,fontWeight:700,color:"#ffffff44",textTransform:"uppercase",letterSpacing:2,marginBottom:8,paddingLeft:4 }}>
                  {cat === "Everyday" ? "🧪 Everyday" : cat === "Minerals" ? "💎 Minerals" : "⚗️ Advanced"}
                </h3>
                <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                  {items.map(l => {
                    const done = completedCompounds.has(l.id);
                    return (
                      <button key={l.idx} className="gbtn card-hover" onClick={() => startCompound(l.idx)} style={{
                        display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 14px",borderRadius:14,textAlign:"left",
                        background: done ? "rgba(78,205,196,0.08)" : "rgba(255,255,255,0.03)",
                        border: done ? "2px solid #4ECDC422" : "2px solid rgba(255,255,255,0.05)",color:"#fff",
                      }}>
                        <span style={{ fontSize:26,flexShrink:0 }}>{l.emoji}</span>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ fontWeight:700,fontSize:15 }}>{l.name} <span style={{ color:"#ffffff44",fontWeight:500,marginLeft:6,fontSize:13 }}>{l.formula}</span></div>
                          <div style={{ color:"#ffffff55",fontSize:11,marginTop:1 }}>{Object.entries(l.required).map(([s,c]) => `${c}×${s}`).join(" + ")}</div>
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
                          {[1,2,3].map(d => <div key={d} style={{ width:7,height:7,borderRadius:"50%",background: d<=l.difficulty ? (l.difficulty===1?"#4ECDC4":l.difficulty===2?"#FFE66D":"#FF6B6B") : "rgba(255,255,255,0.1)" }} />)}
                          {done && <span style={{ fontSize:16,marginLeft:4 }}>✅</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ════════════ COMPOUND PLAY ════════════ */}
      {screen === "compound-play" && level && (
        <div style={{ display:"flex",flexDirection:"column",height:"100vh",padding:"8px 10px 10px",position:"relative",zIndex:1 }}>
          <div style={{ flexShrink:0,marginBottom:6 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5 }}>
              <button className="gbtn" onClick={() => setScreen("compound-levels")} style={{ background:"rgba(255,255,255,0.08)",color:"#fff",padding:"5px 12px",borderRadius:10,fontSize:12,fontWeight:600 }}>✕</button>
              <div style={{ textAlign:"center" }}>
                <span style={{ fontSize:13,fontWeight:700 }}>{level.emoji} {level.name}</span>
                <span style={{ marginLeft:8,fontSize:18,fontWeight:800,background:"linear-gradient(90deg,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{level.formula}</span>
              </div>
              <div style={{ display:"flex",gap:8,alignItems:"center",fontSize:12,fontWeight:600 }}>
                <span style={{ color:"#FF6B6B" }}>❌{mistakes}</span>
                <span style={{ color:"#4ECDC4" }}>{totalFilled}/{totalNeeded}</span>
              </div>
            </div>
            <TimerBar timeLeft={timeLeft} maxTime={maxTime} />
            <div style={{ display:"flex",justifyContent:"center",gap:5,marginTop:6,padding:"5px 10px",borderRadius:10,background:"rgba(255,255,255,0.03)",fontSize:12,color:"#ffffff77",fontWeight:500 }}>
              Find: {Object.entries(level.required).map(([el,c]) => (
                <span key={el} style={{ padding:"2px 7px",borderRadius:7,fontWeight:700,fontSize:11,background:`${ELEMENTS[el].color}22`,color:ELEMENTS[el].color,border:`1px solid ${ELEMENTS[el].color}33` }}>{c}×{el}</span>
              ))}
            </div>
          </div>
          <div ref={arenaRef} style={{ flex:1,position:"relative",borderRadius:20,background:"rgba(255,255,255,0.02)",border:"2px solid rgba(255,255,255,0.04)",overflow:"hidden",minHeight:160 }}>
            <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"22px 22px" }} />
            {toast && <Toast key={toast.key} type={toast.type} element={toast.element} needed={toast.needed} />}
            {atoms.map(a => <FloatingAtom key={a.id} atom={a} isDragging={draggingId===a.id} onPointerDown={handlePointerDown} arenaRef={arenaRef} shakeId={shakeId} />)}
          </div>
          <div ref={dropRef} style={{ marginTop:8,padding:"12px 10px 14px",borderRadius:18,flexShrink:0,background:"rgba(78,205,196,0.04)",border:"2px dashed rgba(78,205,196,0.18)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"glow-ring 3s ease-in-out infinite" }}>
            <span style={{ fontSize:10,color:"#4ECDC4aa",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase" }}>⬇ Drag atoms here ⬇</span>
            <div style={{ display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center" }}>
              {slotsArr.map((s,i) => <MoleculeSlot key={`${s.element}-${i}`} element={s.element} filled={s.filled} pulse={pulseSlot===s.element && s.filled} />)}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ COMPOUND RESULT ════════════ */}
      {screen === "compound-result" && level && levelResult && (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:28,animation:"slide-in 0.5s ease-out",textAlign:"center",position:"relative",zIndex:1 }}>
          {levelResult.won ? (<>
            <div style={{ fontSize:64,marginBottom:10,animation:"star-spin 0.8s ease-out" }}>🎉</div>
            <h2 style={{ fontSize:28,fontWeight:800,marginBottom:4 }}>You built {level.name}!</h2>
            <div style={{ fontSize:24,fontWeight:800,marginBottom:18,background:"linear-gradient(90deg,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{level.formula}</div>
            <div style={{ padding:"16px 20px",borderRadius:16,maxWidth:420,marginBottom:20,background:"rgba(78,205,196,0.08)",border:"1px solid rgba(78,205,196,0.12)" }}>
              <p style={{ fontSize:14,lineHeight:1.7,color:"#ffffffcc" }}>🧠 <b>Did you know?</b> {level.fact}</p>
            </div>
            <div style={{ padding:"14px 22px",borderRadius:14,marginBottom:24,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",minWidth:240,textAlign:"left" }}>
              {[
                { l: "Base", v: `+${levelResult.bp}`, c: "#ffffff99" },
                { l: `⏱ Time (${timeLeft}s)`, v: `+${levelResult.tb}`, c: "#4ECDC4" },
                levelResult.mp > 0 && { l: `❌ Mistakes (${mistakes})`, v: `-${levelResult.mp}`, c: "#FF6B6B" },
                levelResult.sb > 0 && { l: `🔥 Streak (${streak})`, v: `+${levelResult.sb}`, c: "#FFE66D" },
              ].filter(Boolean).map((r,i) => (
                <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:13,color:r.c }}><span>{r.l}</span><span style={{ fontWeight:700 }}>{r.v}</span></div>
              ))}
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:7,marginTop:7,display:"flex",justifyContent:"space-between",fontSize:17 }}>
                <span style={{ fontWeight:700 }}>Total</span><span style={{ fontWeight:800,color:"#FFE66D" }}>+{levelResult.total}</span>
              </div>
            </div>
          </>) : (<>
            <div style={{ fontSize:56,marginBottom:10 }}>⏰</div>
            <h2 style={{ fontSize:26,fontWeight:800,marginBottom:8 }}>Time's Up!</h2>
            <p style={{ color:"#ffffff77",fontSize:14,marginBottom:20 }}>You needed: {Object.entries(level.required).map(([s,c]) => `${c}×${ELEMENTS[s].name}`).join(", ")}</p>
            <p style={{ color:"#ffffff55",fontSize:13,marginBottom:24 }}>No worries — try again, you'll be faster!</p>
          </>)}
          <div style={{ display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
            {levelResult.won && currentLevel < COMPOUND_LEVELS.length - 1 && (
              <button className="gbtn" onClick={() => startCompound(currentLevel+1)} style={{ padding:"14px 28px",borderRadius:16,background:"linear-gradient(135deg,#4ECDC4,#3DB8B0)",color:"#1a1a2e",fontSize:16,fontWeight:700,boxShadow:"0 5px 18px rgba(78,205,196,0.3)" }}>Next Level →</button>
            )}
            <button className="gbtn" onClick={() => { if(!levelResult.won) setStreak(0); startCompound(currentLevel); }} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>{levelResult.won ? "Replay" : "Try Again"}</button>
            <button className="gbtn" onClick={() => { if(!levelResult.won) setStreak(0); setScreen("compound-levels"); }} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>All Levels</button>
          </div>
        </div>
      )}

      {/* ════════════ ROCK LEVEL SELECT ════════════ */}
      {screen === "rock-levels" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:560,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <BackBtn onClick={() => setScreen("menu")} />
            <span style={{ color:"#FFE66D",fontWeight:700,fontSize:14 }}>⭐ {score}</span>
          </div>
          <h2 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>🏔️ Build Rocks & Minerals</h2>
          <p style={{ color:"#ffffff55",fontSize:13,marginBottom:18 }}>Combine the compounds you've learned to form real rocks!</p>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {ROCK_LEVELS.map((r,i) => {
              const done = completedRocks.has(r.id);
              const allCompoundsReady = r.requiredCompounds.every(cid => completedCompounds.has(cid));
              return (
                <button key={i} className="gbtn card-hover" onClick={() => allCompoundsReady ? startRock(i) : null} style={{
                  display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",borderRadius:16,textAlign:"left",
                  background: done ? "rgba(179,157,219,0.1)" : allCompoundsReady ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                  border: done ? "2px solid #B39DDB33" : "2px solid rgba(255,255,255,0.05)",color:"#fff",
                  opacity: allCompoundsReady ? 1 : 0.5, cursor: allCompoundsReady ? "pointer" : "not-allowed",
                }}>
                  <span style={{ fontSize:28,flexShrink:0 }}>{r.emoji}</span>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:700,fontSize:15 }}>{r.name} <span style={{ color:"#ffffff44",fontSize:12,marginLeft:6 }}>{r.type}</span></div>
                    <div style={{ color:"#ffffff55",fontSize:11,marginTop:2 }}>
                      {r.requiredCompounds.map(cid => {
                        const c = COMPOUND_LEVELS.find(x => x.id === cid);
                        const have = completedCompounds.has(cid);
                        return <span key={cid} style={{ marginRight:6,color: have ? "#4ECDC4" : "#FF6B6Baa" }}>{have ? "✅" : "🔒"} {c?.name}</span>;
                      })}
                    </div>
                  </div>
                  {done && <span style={{ fontSize:18 }}>✅</span>}
                  {!allCompoundsReady && <span style={{ fontSize:11,color:"#FF6B6Baa",fontWeight:600 }}>Build compounds first!</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════ ROCK PLAY ════════════ */}
      {screen === "rock-play" && rock && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:520,margin:"0 auto",position:"relative",zIndex:1 }}>
          <BackBtn onClick={() => setScreen("rock-levels")} />
          <div style={{ textAlign:"center",marginTop:16,marginBottom:20 }}>
            <div style={{ fontSize:56,marginBottom:8 }}>{rock.emoji}</div>
            <h2 style={{ fontSize:26,fontWeight:800,marginBottom:4 }}>{rock.name}</h2>
            <span style={{ color:"#B39DDB",fontSize:13,fontWeight:600 }}>{rock.type}</span>
            <p style={{ color:"#ffffff88",fontSize:14,marginTop:10,lineHeight:1.6,maxWidth:400,margin:"10px auto 0" }}>{rock.description}</p>
          </div>
          <div style={{ marginBottom:16 }}>
            <h3 style={{ fontSize:13,fontWeight:700,color:"#ffffff55",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10 }}>Select the compounds that make this rock:</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {COMPOUND_LEVELS.filter(c => completedCompounds.has(c.id)).map(c => {
                const selected = !!rockSlots[c.id];
                return (
                  <button key={c.id} className="gbtn" onClick={() => toggleRockSlot(c.id)} style={{
                    display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 16px",borderRadius:14,textAlign:"left",
                    background: selected ? "rgba(179,157,219,0.15)" : "rgba(255,255,255,0.03)",
                    border: selected ? "2px solid #B39DDB55" : "2px solid rgba(255,255,255,0.06)",
                    color:"#fff",
                  }}>
                    <div style={{
                      width:28,height:28,borderRadius:8,border: selected ? "2px solid #B39DDB" : "2px solid rgba(255,255,255,0.15)",
                      background: selected ? "#B39DDB" : "transparent",
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#1a1a2e",fontWeight:800,flexShrink:0,
                      transition:"all 0.2s",
                    }}>{selected ? "✓" : ""}</div>
                    <span style={{ fontSize:20,flexShrink:0 }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontWeight:700,fontSize:14 }}>{c.name}</div>
                      <div style={{ color:"#ffffff55",fontSize:12 }}>{c.formula}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {rockResult && !rockResult.won && (
            <div style={{ padding:"10px 16px",borderRadius:12,background:"rgba(255,82,82,0.12)",border:"1px solid rgba(255,82,82,0.2)",marginBottom:12,fontSize:13,color:"#FF6B6B",textAlign:"center" }}>
              ❌ Not quite! You need: <b>{rockResult.needed}</b>
            </div>
          )}
          {rockResult && rockResult.won && (
            <div style={{ padding:"14px 18px",borderRadius:14,background:"rgba(78,205,196,0.1)",border:"1px solid rgba(78,205,196,0.15)",marginBottom:12,textAlign:"center" }}>
              <div style={{ fontSize:32,marginBottom:4 }}>🎉</div>
              <h3 style={{ fontSize:18,fontWeight:700,marginBottom:6 }}>You built {rock.name}!</h3>
              <p style={{ fontSize:13,lineHeight:1.6,color:"#ffffffcc" }}>🧠 {rock.fact}</p>
              <p style={{ color:"#FFE66D",fontWeight:700,marginTop:8 }}>+300 points!</p>
            </div>
          )}
          <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
            {!(rockResult && rockResult.won) && (
              <button className="gbtn" onClick={submitRock} style={{ padding:"14px 32px",borderRadius:16,background:"linear-gradient(135deg,#B39DDB,#9575CD)",color:"#fff",fontSize:16,fontWeight:700,boxShadow:"0 5px 18px rgba(179,157,219,0.3)" }}>Check Answer</button>
            )}
            {rockResult && rockResult.won && currentRock < ROCK_LEVELS.length - 1 && (
              <button className="gbtn" onClick={() => startRock(currentRock+1)} style={{ padding:"14px 28px",borderRadius:16,background:"linear-gradient(135deg,#B39DDB,#9575CD)",color:"#fff",fontSize:16,fontWeight:700 }}>Next Rock →</button>
            )}
            {rockResult && rockResult.won && (
              <button className="gbtn" onClick={() => setScreen("rock-levels")} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>All Rocks</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
