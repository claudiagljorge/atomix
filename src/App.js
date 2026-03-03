import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   📦 FULL PERIODIC TABLE — All 118 Elements
   ═══════════════════════════════════════════ */

const ELEMENTS = {
  H:  { name:"Hydrogen",     number:1,   category:"nonmetal",    color:"#FF6B6B", glow:"#ff4040", fact:"The lightest element! Makes up 75% of the universe." },
  He: { name:"Helium",       number:2,   category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"Makes balloons float and your voice squeaky!" },
  Li: { name:"Lithium",      number:3,   category:"alkali",      color:"#FFE66D", glow:"#e6c800", fact:"Used in rechargeable batteries for phones and laptops!" },
  Be: { name:"Beryllium",    number:4,   category:"alkaline",    color:"#81C784", glow:"#4CAF50", fact:"Lighter than aluminum but stiffer than steel!" },
  B:  { name:"Boron",        number:5,   category:"metalloid",   color:"#CE93D8", glow:"#AB47BC", fact:"Used to make heat-resistant glass like Pyrex!" },
  C:  { name:"Carbon",       number:6,   category:"nonmetal",    color:"#8C8C8C", glow:"#666666", fact:"Found in diamonds, pencils, and every living thing!" },
  N:  { name:"Nitrogen",     number:7,   category:"nonmetal",    color:"#5DADE2", glow:"#2E86C1", fact:"Makes up 78% of the air you breathe!" },
  O:  { name:"Oxygen",       number:8,   category:"nonmetal",    color:"#4ECDC4", glow:"#2BA8A0", fact:"You breathe this! It makes up 21% of Earth's atmosphere." },
  F:  { name:"Fluorine",     number:9,   category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"Added to toothpaste to protect your teeth from cavities!" },
  Ne: { name:"Neon",         number:10,  category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"Makes those bright red-orange glowing signs you see at night!" },
  Na: { name:"Sodium",       number:11,  category:"alkali",      color:"#FFE66D", glow:"#e6c800", fact:"A soft metal that explodes in water! Used in table salt." },
  Mg: { name:"Magnesium",    number:12,  category:"alkaline",    color:"#81C784", glow:"#4CAF50", fact:"Burns with a brilliant white light! Found in fireworks." },
  Al: { name:"Aluminum",     number:13,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"The most common metal in Earth's crust! Used in soda cans." },
  Si: { name:"Silicon",      number:14,  category:"metalloid",   color:"#B39DDB", glow:"#9575CD", fact:"Used in computer chips and found in sand!" },
  P:  { name:"Phosphorus",   number:15,  category:"nonmetal",    color:"#F48FB1", glow:"#E91E63", fact:"Glows in the dark! Your DNA contains phosphorus." },
  S:  { name:"Sulfur",       number:16,  category:"nonmetal",    color:"#FDD835", glow:"#F9A825", fact:"Smells like rotten eggs! Found near volcanoes." },
  Cl: { name:"Chlorine",     number:17,  category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"A greenish gas used to keep swimming pools clean." },
  Ar: { name:"Argon",        number:18,  category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"Used inside light bulbs to stop the filament from burning!" },
  K:  { name:"Potassium",    number:19,  category:"alkali",      color:"#FF8A65", glow:"#E64A19", fact:"Found in bananas! Your muscles need it to work." },
  Ca: { name:"Calcium",      number:20,  category:"alkaline",    color:"#F5F5DC", glow:"#D7CCC8", fact:"Builds strong bones and teeth! Found in milk." },
  Sc: { name:"Scandium",     number:21,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Used in aerospace to make super lightweight alloys!" },
  Ti: { name:"Titanium",     number:22,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"As strong as steel but 45% lighter! Used in jet engines." },
  V:  { name:"Vanadium",     number:23,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes steel super strong — used in tools and car parts!" },
  Cr: { name:"Chromium",     number:24,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes things shiny! Chrome plating on cars uses chromium." },
  Mn: { name:"Manganese",    number:25,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes steel tough enough for railroad tracks and safes!" },
  Fe: { name:"Iron",         number:26,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes your blood red and is found in Earth's core!" },
  Co: { name:"Cobalt",       number:27,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Gives glass and pottery a beautiful deep blue color!" },
  Ni: { name:"Nickel",       number:28,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Most 'silver' coins in your pocket contain nickel!" },
  Cu: { name:"Copper",       number:29,  category:"transition",  color:"#E8A87C", glow:"#CC7A3E", fact:"The Statue of Liberty is covered in copper!" },
  Zn: { name:"Zinc",         number:30,  category:"transition",  color:"#AED6F1", glow:"#5DADE2", fact:"Protects steel from rusting and is in sunscreen!" },
  Ga: { name:"Gallium",      number:31,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Melts in your hand! Its melting point is just 29.7°C." },
  Ge: { name:"Germanium",    number:32,  category:"metalloid",   color:"#CE93D8", glow:"#AB47BC", fact:"Used in fiber optic cables for super-fast internet!" },
  As: { name:"Arsenic",      number:33,  category:"metalloid",   color:"#CE93D8", glow:"#AB47BC", fact:"Used in LEDs and computer chip manufacturing!" },
  Se: { name:"Selenium",     number:34,  category:"nonmetal",    color:"#FF6B6B", glow:"#ff4040", fact:"Helps your body fight off sickness — found in Brazil nuts!" },
  Br: { name:"Bromine",      number:35,  category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"One of only two elements that's liquid at room temperature!" },
  Kr: { name:"Krypton",      number:36,  category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"Not just Superman's planet — it makes bright white light in flash photography!" },
  Rb: { name:"Rubidium",     number:37,  category:"alkali",      color:"#FFE66D", glow:"#e6c800", fact:"Used in the world's most accurate atomic clocks!" },
  Sr: { name:"Strontium",    number:38,  category:"alkaline",    color:"#81C784", glow:"#4CAF50", fact:"Makes fireworks glow brilliant red!" },
  Y:  { name:"Yttrium",      number:39,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Used in LED lights and can make white light from lasers!" },
  Zr: { name:"Zirconium",    number:40,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Cubic zirconia (fake diamonds) are made from this!" },
  Nb: { name:"Niobium",      number:41,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Used in jet engines and rocket nozzles!" },
  Mo: { name:"Molybdenum",   number:42,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes steel super strong at high temperatures!" },
  Tc: { name:"Technetium",   number:43,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"The first artificially created element! Used in medical scans." },
  Ru: { name:"Ruthenium",    number:44,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Added to jewelry alloys to make them harder and more durable!" },
  Rh: { name:"Rhodium",      number:45,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"The most expensive precious metal — used in car catalytic converters!" },
  Pd: { name:"Palladium",    number:46,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Helps clean car exhaust! Also used in dentistry." },
  Ag: { name:"Silver",       number:47,  category:"transition",  color:"#D5D8DC", glow:"#ABB2B9", fact:"The best conductor of electricity of all metals!" },
  Cd: { name:"Cadmium",      number:48,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Makes bright yellow and red pigments for paints!" },
  In: { name:"Indium",       number:49,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Makes touchscreens work! Used in transparent coatings." },
  Sn: { name:"Tin",          number:50,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Tin cans aren't pure tin — they're steel coated with tin!" },
  Sb: { name:"Antimony",     number:51,  category:"metalloid",   color:"#CE93D8", glow:"#AB47BC", fact:"Used in flame retardants to keep fabrics from catching fire!" },
  Te: { name:"Tellurium",    number:52,  category:"metalloid",   color:"#CE93D8", glow:"#AB47BC", fact:"One of the rarest elements on Earth's surface!" },
  I:  { name:"Iodine",       number:53,  category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"Your thyroid gland needs iodine to work properly!" },
  Xe: { name:"Xenon",        number:54,  category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"Used in the brightest headlights and movie projectors!" },
  Cs: { name:"Cesium",       number:55,  category:"alkali",      color:"#FFE66D", glow:"#e6c800", fact:"Explodes VIOLENTLY in water — even more than sodium!" },
  Ba: { name:"Barium",       number:56,  category:"alkaline",    color:"#81C784", glow:"#4CAF50", fact:"Makes fireworks glow green! Also used in medical X-rays." },
  La: { name:"Lanthanum",    number:57,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Used in camera lenses and night-vision goggles!" },
  Ce: { name:"Cerium",       number:58,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Makes the sparks in lighters and flint fire starters!" },
  Pr: { name:"Praseodymium", number:59,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Gives glass and enamel a beautiful yellow-green color!" },
  Nd: { name:"Neodymium",    number:60,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Makes the world's strongest permanent magnets!" },
  Pm: { name:"Promethium",   number:61,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"So rare that only about 600 grams exist on Earth at any time!" },
  Sm: { name:"Samarium",     number:62,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Used in cancer treatment and super-strong magnets!" },
  Eu: { name:"Europium",     number:63,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Makes the red color in TV screens and euro banknotes!" },
  Gd: { name:"Gadolinium",   number:64,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Helps doctors see inside your body during MRI scans!" },
  Tb: { name:"Terbium",      number:65,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Makes the green color in smartphones and TV displays!" },
  Dy: { name:"Dysprosium",   number:66,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Used in wind turbines and hybrid car motors!" },
  Ho: { name:"Holmium",      number:67,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Has the strongest magnetic field of any element!" },
  Er: { name:"Erbium",       number:68,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Boosts signals in fiber optic cables across the ocean!" },
  Tm: { name:"Thulium",      number:69,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"The rarest naturally occurring lanthanide element!" },
  Yb: { name:"Ytterbium",    number:70,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Used in the world's most precise atomic clocks!" },
  Lu: { name:"Lutetium",     number:71,  category:"lanthanide",  color:"#F8BBD0", glow:"#F06292", fact:"Used in PET scanners that detect cancer!" },
  Hf: { name:"Hafnium",      number:72,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Used in nuclear reactor control rods to manage reactions!" },
  Ta: { name:"Tantalum",     number:73,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Inside every smartphone — used in tiny capacitors!" },
  W:  { name:"Tungsten",     number:74,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Has the highest melting point of any element — 3,422°C!" },
  Re: { name:"Rhenium",      number:75,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Used in jet engines because it handles extreme heat!" },
  Os: { name:"Osmium",       number:76,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"The densest naturally occurring element — twice as heavy as lead!" },
  Ir: { name:"Iridium",      number:77,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"A meteor impact left iridium everywhere — it helped prove dinosaurs were wiped out!" },
  Pt: { name:"Platinum",     number:78,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Rarer than gold! Used in jewelry and car catalytic converters." },
  Au: { name:"Gold",         number:79,  category:"transition",  color:"#F7DC6F", glow:"#D4AC0D", fact:"All the gold ever mined would fit in 3.5 Olympic pools!" },
  Hg: { name:"Mercury",      number:80,  category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"The only metal that's liquid at room temperature!" },
  Tl: { name:"Thallium",     number:81,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Used in special glass for camera lenses!" },
  Pb: { name:"Lead",         number:82,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"The Romans used lead pipes for plumbing — 'plumbing' comes from 'plumbum' (Latin for lead)!" },
  Bi: { name:"Bismuth",      number:83,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Makes rainbow-colored crystals! Used in Pepto-Bismol." },
  Po: { name:"Polonium",     number:84,  category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Discovered by Marie Curie, named after her homeland Poland!" },
  At: { name:"Astatine",     number:85,  category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"The rarest naturally occurring element — less than 30g exists on Earth!" },
  Rn: { name:"Radon",        number:86,  category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"A radioactive gas that can seep into basements from the ground!" },
  Fr: { name:"Francium",     number:87,  category:"alkali",      color:"#FFE66D", glow:"#e6c800", fact:"The most unstable naturally occurring element — vanishes in minutes!" },
  Ra: { name:"Radium",       number:88,  category:"alkaline",    color:"#81C784", glow:"#4CAF50", fact:"Glows in the dark! Marie Curie discovered it and won a Nobel Prize." },
  Ac: { name:"Actinium",     number:89,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Glows blue in the dark due to its intense radioactivity!" },
  Th: { name:"Thorium",      number:90,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Could power nuclear reactors for thousands of years!" },
  Pa: { name:"Protactinium", number:91,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"One of the rarest and most expensive elements!" },
  U:  { name:"Uranium",      number:92,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Powers nuclear plants! A tiny pellet = energy of 1 ton of coal." },
  Np: { name:"Neptunium",    number:93,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after the planet Neptune, just like plutonium after Pluto!" },
  Pu: { name:"Plutonium",    number:94,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Powers spacecraft on deep space missions like Voyager!" },
  Am: { name:"Americium",    number:95,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Inside your smoke detector right now keeping you safe!" },
  Cm: { name:"Curium",       number:96,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after Marie and Pierre Curie!" },
  Bk: { name:"Berkelium",    number:97,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after Berkeley, California — where it was created!" },
  Cf: { name:"Californium",  number:98,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"One microgram costs $27 million!" },
  Es: { name:"Einsteinium",  number:99,  category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Discovered in the debris of the first hydrogen bomb test!" },
  Fm: { name:"Fermium",      number:100, category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after Enrico Fermi who built the first nuclear reactor!" },
  Md: { name:"Mendelevium",  number:101, category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after Mendeleev who created the periodic table!" },
  No: { name:"Nobelium",     number:102, category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"Named after Alfred Nobel, creator of the Nobel Prize!" },
  Lr: { name:"Lawrencium",   number:103, category:"actinide",    color:"#80DEEA", glow:"#26C6DA", fact:"The last of the actinide series!" },
  Rf: { name:"Rutherfordium", number:104, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Ernest Rutherford, the father of nuclear physics!" },
  Db: { name:"Dubnium",      number:105, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Dubna, Russia — home of a famous nuclear lab!" },
  Sg: { name:"Seaborgium",   number:106, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Glenn Seaborg who discovered 10 elements!" },
  Bh: { name:"Bohrium",      number:107, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Niels Bohr who figured out how atoms work!" },
  Hs: { name:"Hassium",      number:108, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Hesse, Germany where it was discovered!" },
  Mt: { name:"Meitnerium",   number:109, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Lise Meitner who helped discover nuclear fission!" },
  Ds: { name:"Darmstadtium", number:110, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Only a few atoms have ever been created!" },
  Rg: { name:"Roentgenium",  number:111, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Roentgen who discovered X-rays!" },
  Cn: { name:"Copernicium",  number:112, category:"transition",  color:"#D4845A", glow:"#A0522D", fact:"Named after Copernicus who proved Earth orbits the Sun!" },
  Nh: { name:"Nihonium",     number:113, category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"The first element discovered in Asia — 'Nihon' means Japan!" },
  Fl: { name:"Flerovium",    number:114, category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Exists for less than 2 seconds before decaying!" },
  Mc: { name:"Moscovium",    number:115, category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Named after Moscow — discovered at a Russian lab!" },
  Lv: { name:"Livermorium",  number:116, category:"post-trans",  color:"#B0BEC5", glow:"#78909C", fact:"Named after Lawrence Livermore National Laboratory!" },
  Ts: { name:"Tennessine",   number:117, category:"halogen",     color:"#A5D6A7", glow:"#66BB6A", fact:"The newest halogen — named after Tennessee!" },
  Og: { name:"Oganesson",    number:118, category:"noble-gas",   color:"#FFDDB7", glow:"#ffcc88", fact:"The heaviest known element! Named after physicist Yuri Oganessian." },
};

const CATEGORY_LABELS = {
  "nonmetal":   { label: "Nonmetal",         color: "#FF6B6B" },
  "noble-gas":  { label: "Noble Gas",        color: "#FFDDB7" },
  "alkali":     { label: "Alkali Metal",     color: "#FFE66D" },
  "alkaline":   { label: "Alkaline Earth",   color: "#81C784" },
  "metalloid":  { label: "Metalloid",        color: "#CE93D8" },
  "halogen":    { label: "Halogen",          color: "#A5D6A7" },
  "transition": { label: "Transition Metal", color: "#D4845A" },
  "post-trans": { label: "Post-Transition",  color: "#B0BEC5" },
  "lanthanide": { label: "Lanthanide",       color: "#F8BBD0" },
  "actinide":   { label: "Actinide",         color: "#80DEEA" },
};

/* ═══════════════════════════════════════════
   📦 COMPOUNDS & ROCKS
   ═══════════════════════════════════════════ */

const COMPOUND_LEVELS = [
  { id:"water", name:"Water", formula:"H₂O", emoji:"💧", required:{H:2,O:1}, difficulty:1, category:"Everyday",
    bondType:"covalent",
    geometry:[ {el:"H",x:-28,y:20}, {el:"O",x:0,y:0}, {el:"H",x:28,y:20} ],
    bonds:[ [0,1],[1,2] ], angle:"104.5°", shape:"Bent / V-Shape",
    fact:"A single drop of water has about 1.7 sextillion molecules!",
    whatIsIt:"A colorless, odorless liquid — the most important substance for life on Earth! It can be a solid (ice), liquid (water), or gas (steam).",
    whereFound:"Oceans, rivers, lakes, rain, inside every living cell in your body, clouds, underground aquifers, and even on Mars as ice!",
    danger:1, dangerNote:"Totally safe to drink and swim in!",
    mindBlower:"Hot water can freeze faster than cold water. Scientists call this the Mpemba Effect and still don't fully understand why!" },
  { id:"salt", name:"Table Salt", formula:"NaCl", emoji:"🧂", required:{Na:1,Cl:1}, difficulty:1, category:"Everyday",
    bondType:"ionic", ions:{Na:"+",Cl:"−"},
    geometry:[ {el:"Na",x:-22,y:0}, {el:"Cl",x:22,y:0} ],
    bonds:[ [0,1] ], shape:"Ionic Pair",
    fact:"Roman soldiers were paid in salt — that's where 'salary' comes from!",
    whatIsIt:"White cubic crystals that taste salty! It's made of one atom of sodium (a metal that explodes in water!) bonded to chlorine (a poisonous gas!) — but together they're perfectly safe to eat.",
    whereFound:"Your kitchen, the ocean, salt mines deep underground, the Dead Sea, rock deposits, and inside your body — you have about 250 grams!",
    danger:1, dangerNote:"Safe to eat! Your body actually needs it, but too much isn't healthy.",
    mindBlower:"Sodium by itself explodes in water, and chlorine is a poisonous gas. But combined as NaCl? You put it on your french fries! Chemistry is wild." },
  { id:"co2", name:"Carbon Dioxide", formula:"CO₂", emoji:"🌬️", required:{C:1,O:2}, difficulty:1, category:"Everyday",
    bondType:"covalent",
    geometry:[ {el:"O",x:-30,y:0}, {el:"C",x:0,y:0}, {el:"O",x:30,y:0} ],
    bonds:[ [0,1],[1,2] ], doubleBonds:[0,1], shape:"Linear (straight line)",
    fact:"Plants eat CO₂ for breakfast through photosynthesis!",
    whatIsIt:"A colorless, odorless gas that you breathe out every time you exhale! It's what makes soda fizzy and bread dough rise.",
    whereFound:"The air around you (0.04%), soda and sparkling water, fire extinguishers, dry ice (frozen CO₂), volcanoes, and your lungs right now!",
    danger:1, dangerNote:"Safe in small amounts — you breathe it out! Only dangerous in enclosed spaces with very high concentrations.",
    mindBlower:"Plants literally eat this gas and turn it into oxygen + sugar using sunlight. They're basically solar-powered CO₂ recycling machines!" },
  { id:"mgo", name:"Magnesium Oxide", formula:"MgO", emoji:"🔥", required:{Mg:1,O:1}, difficulty:1, category:"Minerals",
    bondType:"ionic", ions:{Mg:"²⁺",O:"²⁻"},
    geometry:[ {el:"Mg",x:-22,y:0}, {el:"O",x:22,y:0} ],
    bonds:[ [0,1] ], shape:"Ionic Pair",
    fact:"MgO survives temperatures over 2,800°C — it lines steel furnaces!",
    whatIsIt:"A white powder that can handle incredible heat! It's the mineral periclase when found in nature. It doesn't dissolve easily and feels chalky.",
    whereFound:"Inside steel furnaces as heat-resistant lining, antacid tablets (Milk of Magnesia), fireproof materials, and gymnasts use it as chalk on their hands!",
    danger:1, dangerNote:"Safe! You might have even eaten some in antacid tablets for an upset stomach.",
    mindBlower:"Gymnasts, rock climbers, and weightlifters all rub MgO on their hands to get a better grip. That white chalk dust? Magnesium oxide!" },
  { id:"kcl", name:"Potassium Chloride", formula:"KCl", emoji:"⚗️", required:{K:1,Cl:1}, difficulty:1, category:"Minerals",
    bondType:"ionic", ions:{K:"+",Cl:"−"},
    geometry:[ {el:"K",x:-22,y:0}, {el:"Cl",x:22,y:0} ],
    bonds:[ [0,1] ], shape:"Ionic Pair",
    fact:"KCl is the mineral sylvite — mined from ancient dried-up seas!",
    whatIsIt:"A white crystalline salt that looks just like table salt but tastes slightly bitter. It's the mineral sylvite in nature.",
    whereFound:"Salt substitute products (labeled 'lite salt'), fertilizers, underground mines from ancient evaporated seas, hospitals (in IV drips), and bananas contain its potassium!",
    danger:1, dangerNote:"Safe to eat in normal amounts! It's literally sold as a salt substitute in grocery stores.",
    mindBlower:"Millions of years ago, entire seas dried up and left behind huge underground deposits of KCl. We mine these ancient sea beds today!" },
  { id:"ammonia", name:"Ammonia", formula:"NH₃", emoji:"🧪", required:{N:1,H:3}, difficulty:2, category:"Everyday",
    bondType:"covalent",
    geometry:[ {el:"N",x:0,y:-10}, {el:"H",x:-28,y:18}, {el:"H",x:0,y:26}, {el:"H",x:28,y:18} ],
    bonds:[ [0,1],[0,2],[0,3] ], shape:"Trigonal Pyramid",
    fact:"Ammonia-based fertilizers help grow half the world's food supply!",
    whatIsIt:"A colorless gas with a VERY strong, sharp smell — like really intense cleaning products. It dissolves easily in water and is a base (opposite of acid).",
    whereFound:"Household cleaning products, fertilizers on farms, refrigeration systems, smelling salts, and your own body produces tiny amounts when breaking down proteins!",
    danger:3, dangerNote:"The gas is toxic to breathe and can burn skin. Household cleaners with ammonia should be used with ventilation. NEVER mix with bleach!",
    mindBlower:"Without the Haber process (turning N₂ + H₂ into NH₃), we could only grow enough food for about 4 billion people. There are 8 billion of us. This one chemical reaction literally keeps half the world alive!" },
  { id:"methane", name:"Methane", formula:"CH₄", emoji:"🐄", required:{C:1,H:4}, difficulty:2, category:"Everyday",
    bondType:"covalent",
    geometry:[ {el:"C",x:0,y:0}, {el:"H",x:-26,y:-20}, {el:"H",x:26,y:-20}, {el:"H",x:-26,y:20}, {el:"H",x:26,y:20} ],
    bonds:[ [0,1],[0,2],[0,3],[0,4] ], shape:"Tetrahedral",
    fact:"Cows produce about 100 liters of methane per day!",
    whatIsIt:"A colorless, odorless, extremely flammable gas! It's the simplest hydrocarbon and the main ingredient in natural gas that heats homes and powers stoves.",
    whereFound:"Natural gas pipelines, cow burps (seriously!), swamps and wetlands, landfills, deep underground, rice paddies, and even on Saturn's moon Titan where it rains methane!",
    danger:3, dangerNote:"Extremely flammable and explosive when mixed with air! The gas itself isn't toxic, but it can cause suffocation by replacing oxygen.",
    mindBlower:"On Saturn's moon Titan, it's so cold that methane exists as liquid — there are actual lakes and rivers of methane. Imagine a world where it rains natural gas!" },
  { id:"rust", name:"Rust (Iron Oxide)", formula:"Fe₂O₃", emoji:"🔴", required:{Fe:2,O:3}, difficulty:2, category:"Minerals",
    bondType:"ionic", ions:{Fe:"³⁺",O:"²⁻"},
    geometry:[ {el:"Fe",x:-28,y:-14}, {el:"O",x:0,y:-22}, {el:"O",x:28,y:0}, {el:"O",x:-28,y:14}, {el:"Fe",x:0,y:22} ],
    bonds:[ [0,1],[0,3],[1,2],[2,4],[3,4] ], shape:"Crystal Lattice",
    fact:"Mars is the 'Red Planet' because its surface is covered in rust!",
    whatIsIt:"A reddish-brown, flaky solid that forms when iron reacts with oxygen and water. It's the mineral hematite in nature — one of the most common minerals on Earth!",
    whereFound:"Old cars and nails, the entire surface of Mars, red-colored rocks and soil, cave paintings (ancient humans used it as paint), and red pigments in art!",
    danger:1, dangerNote:"Completely safe to touch! It's just crumbly and stains things orange-red.",
    mindBlower:"The red color in the Grand Canyon, Australian outback, and Mars all come from the same thing — iron oxide. The whole universe is rusting!" },
  { id:"quartz", name:"Quartz", formula:"SiO₂", emoji:"💎", required:{Si:1,O:2}, difficulty:2, category:"Minerals",
    bondType:"covalent",
    geometry:[ {el:"O",x:-28,y:16}, {el:"Si",x:0,y:0}, {el:"O",x:28,y:16} ],
    bonds:[ [0,1],[1,2] ], shape:"Bent (like water!)",
    fact:"Quartz vibrates 32,768 times per second — that's how quartz watches work!",
    whatIsIt:"A hard, glassy crystal that comes in many colors — clear (rock crystal), purple (amethyst), pink (rose quartz), yellow (citrine), and smoky gray! It's a 7 out of 10 on the hardness scale.",
    whereFound:"Sand on beaches, inside geodes, granite countertops, watches and clocks, computer chips, glass windows, and it's the second most common mineral on Earth's surface!",
    danger:1, dangerNote:"Totally safe to hold and collect! Just don't breathe in quartz dust (silicosis) — but the crystals are harmless.",
    mindBlower:"When you squeeze a quartz crystal, it produces electricity (piezoelectricity)! That's why quartz watches are so accurate — the crystal vibrates at exactly 32,768 Hz." },
  { id:"pyrite", name:"Fool's Gold (Pyrite)", formula:"FeS₂", emoji:"✨", required:{Fe:1,S:2}, difficulty:2, category:"Minerals",
    bondType:"ionic", ions:{Fe:"²⁺",S:"⁻"},
    geometry:[ {el:"S",x:-24,y:14}, {el:"Fe",x:0,y:-8}, {el:"S",x:24,y:14} ],
    bonds:[ [0,1],[1,2],[0,2] ], shape:"Triangular",
    fact:"Gold Rush miners were tricked by pyrite's golden shine!",
    whatIsIt:"A brassy, metallic mineral that looks like gold but is much harder and more brittle. It forms in perfect cube shapes! If you scratch it, it smells like rotten eggs (that's the sulfur).",
    whereFound:"Inside coal deposits, near volcanoes, in sedimentary rocks, alongside real gold deposits (confusing miners!), and in some types of slate and shale.",
    danger:1, dangerNote:"Safe to hold and collect! It can slowly produce sulfuric acid when exposed to water and air, but your crystal collection is fine.",
    mindBlower:"Pyrite can actually contain tiny amounts of REAL gold trapped inside its crystal structure. So 'Fool's Gold' might have real gold in it after all — just not enough to be worth mining!" },
  { id:"calcium-carb", name:"Calcium Carbonate", formula:"CaCO₃", emoji:"🐚", required:{Ca:1,C:1,O:3}, difficulty:3, category:"Minerals",
    bondType:"ionic", ions:{Ca:"²⁺",C:"",O:"²⁻"},
    geometry:[ {el:"Ca",x:-32,y:0}, {el:"O",x:6,y:-22}, {el:"C",x:16,y:0}, {el:"O",x:6,y:22}, {el:"O",x:38,y:0} ],
    bonds:[ [0,1],[1,2],[2,3],[2,4] ], shape:"Ionic + Trigonal Planar",
    fact:"Seashells, chalk, marble, and limestone are ALL calcium carbonate!",
    whatIsIt:"A white, chalky solid that fizzes when you put acid on it (like vinegar)! It's the mineral calcite in crystal form and makes up limestone, chalk, and marble.",
    whereFound:"Seashells, coral reefs, chalk cliffs, marble buildings, limestone caves (stalactites!), eggshells, antacid tablets (Tums), toothpaste, and pearls!",
    danger:1, dangerNote:"Completely safe! You've probably eaten some today — it's in Tums antacid tablets, toothpaste, and calcium supplement pills.",
    mindBlower:"The White Cliffs of Dover are made of trillions of tiny seashell fossils compressed over 70 million years. Each speck of chalk was once a living creature!" },
  { id:"al2o3", name:"Aluminum Oxide", formula:"Al₂O₃", emoji:"💠", required:{Al:2,O:3}, difficulty:3, category:"Minerals",
    bondType:"ionic", ions:{Al:"³⁺",O:"²⁻"},
    geometry:[ {el:"Al",x:-24,y:-16}, {el:"O",x:0,y:-24}, {el:"O",x:28,y:0}, {el:"Al",x:0,y:16}, {el:"O",x:-28,y:8} ],
    bonds:[ [0,1],[0,4],[1,2],[2,3],[3,4] ], shape:"Crystal Lattice",
    fact:"Rubies and sapphires are aluminum oxide with tiny impurities for color!",
    whatIsIt:"An extremely hard white solid — it's the mineral corundum, scoring 9 out of 10 on the hardness scale (only diamond is harder!). Add a pinch of chromium → ruby. Add titanium + iron → sapphire.",
    whereFound:"Rubies and sapphires (jewelry!), sandpaper (it's the gritty part), artificial hip joints in surgery, smartphone screens (sapphire glass), and LED lights!",
    danger:1, dangerNote:"Completely safe! You might be wearing some right now if you have ruby or sapphire jewelry.",
    mindBlower:"A ruby and a sapphire are the EXACT same chemical compound — Al₂O₃! The only difference is a trace amount of impurity: chromium makes it red (ruby), while titanium + iron make it blue (sapphire)." },
  { id:"h2so4", name:"Sulfuric Acid", formula:"H₂SO₄", emoji:"☠️", required:{H:2,S:1,O:4}, difficulty:3, category:"Advanced",
    bondType:"covalent",
    geometry:[ {el:"H",x:-40,y:-18}, {el:"O",x:-24,y:-8}, {el:"O",x:-8,y:-26}, {el:"S",x:0,y:0}, {el:"O",x:8,y:26}, {el:"O",x:24,y:8}, {el:"H",x:40,y:18} ],
    bonds:[ [0,1],[1,3],[2,3],[3,4],[3,5],[5,6] ], shape:"Tetrahedral (around S)",
    fact:"More sulfuric acid is produced than any other chemical — 200M tonnes/year!",
    whatIsIt:"A dense, oily, colorless liquid that is EXTREMELY corrosive — it can dissolve metals and burn through organic material. It's one of the strongest acids known!",
    whereFound:"Car batteries (battery acid), fertilizer production, metal processing, petroleum refining, in tiny amounts in acid rain, and even in the clouds of Venus!",
    danger:5, dangerNote:"EXTREMELY DANGEROUS! Burns skin on contact, can cause blindness, and reacts violently with water. Never handle without professional training.",
    mindBlower:"The clouds on Venus are made of sulfuric acid droplets! It rains sulfuric acid there, but it evaporates before hitting the ground because the surface is 465°C. Venus is basically a sulfuric acid pressure cooker!" },
  { id:"baking-soda", name:"Baking Soda", formula:"NaHCO₃", emoji:"🧁", required:{Na:1,H:1,C:1,O:3}, difficulty:3, category:"Kitchen",
    bondType:"ionic", ions:{Na:"+",H:"",C:"",O:""},
    geometry:[ {el:"Na",x:-36,y:0}, {el:"O",x:-4,y:-22}, {el:"C",x:8,y:0}, {el:"O",x:-4,y:22}, {el:"O",x:28,y:-8}, {el:"H",x:28,y:12} ],
    bonds:[ [0,1],[1,2],[2,3],[2,4],[4,5] ], shape:"Ionic + Planar",
    fact:"When baking soda meets vinegar — BOOM! Instant volcano!",
    whatIsIt:"A fine white powder that's slightly salty and alkaline (basic). It reacts with acids to produce CO₂ gas — that's what makes cakes rise and volcanoes erupt in science fairs!",
    whereFound:"Your kitchen pantry, toothpaste, antacid tablets, fire extinguishers, cleaning products, science fair volcanoes, and even in deodorant!",
    danger:1, dangerNote:"Completely safe! You eat it in cookies and cakes all the time.",
    mindBlower:"The Statue of Liberty was cleaned using baking soda! It took 100 tons of NaHCO₃ to gently scrub 99 years of grime off her copper surface." },
  { id:"sugar", name:"Table Sugar", formula:"C₁₂H₂₂O₁₁", emoji:"🍬", required:{C:2,H:3,O:2}, difficulty:2, category:"Kitchen",
    bondType:"covalent",
    geometry:[ {el:"C",x:-20,y:-12}, {el:"O",x:0,y:-20}, {el:"C",x:20,y:-12}, {el:"H",x:-24,y:14}, {el:"H",x:0,y:22}, {el:"H",x:24,y:14}, {el:"O",x:-34,y:0} ],
    bonds:[ [0,1],[1,2],[0,3],[2,5],[4,0],[0,6] ], shape:"Ring Structure (simplified)",
    fact:"The real formula has 45 atoms — we simplified it for the game!",
    whatIsIt:"Sweet white crystals made of carbon, hydrogen, and oxygen! The real molecule (C₁₂H₂₂O₁₁) is huge — we simplified it here. It's a carbohydrate that your body burns for quick energy.",
    whereFound:"Candy, cookies, soda, fruit, honey, maple syrup, sugar cane fields, and sugar beet farms. Your blood always has some glucose (a simpler sugar) in it!",
    danger:1, dangerNote:"Safe to eat! Though too much isn't great for your teeth or health.",
    mindBlower:"If you heat sugar to 186°C it turns into caramel. Heat it more and it turns black — you've burned off the hydrogen and oxygen, leaving pure carbon. Sugar is basically edible carbon!" },
  { id:"acetic-acid", name:"Vinegar (Acetic Acid)", formula:"CH₃COOH", emoji:"🫙", required:{C:2,H:2,O:2}, difficulty:2, category:"Kitchen",
    bondType:"covalent",
    geometry:[ {el:"C",x:-20,y:0}, {el:"C",x:14,y:0}, {el:"O",x:28,y:-18}, {el:"O",x:28,y:18}, {el:"H",x:-34,y:-14}, {el:"H",x:-34,y:14} ],
    bonds:[ [0,1],[1,2],[1,3],[0,4],[0,5] ], shape:"Planar",
    fact:"Vinegar is just water + 5% acetic acid — but what a difference that 5% makes!",
    whatIsIt:"A sour-smelling, clear liquid that's a weak acid. It's made when bacteria ferment alcohol (like wine turning sour — 'vinegar' literally means 'sour wine' in French!).",
    whereFound:"Salad dressing, pickles, ketchup, cleaning products, science fair volcanoes (with baking soda!), and it was used as medicine in ancient Greece.",
    danger:1, dangerNote:"Safe! You eat it on salads. Concentrated acetic acid (pure) can burn skin though.",
    mindBlower:"Cleopatra reportedly dissolved a pearl in vinegar and drank it to win a bet that she could consume a fortune in a single meal. Pearls are calcium carbonate — and acid dissolves them!" },
  { id:"citric-acid", name:"Citric Acid", formula:"C₆H₈O₇", emoji:"🍋", required:{C:2,H:2,O:2}, difficulty:2, category:"Kitchen",
    bondType:"covalent",
    geometry:[ {el:"C",x:-18,y:-14}, {el:"C",x:18,y:-14}, {el:"O",x:0,y:-26}, {el:"O",x:-30,y:8}, {el:"H",x:-14,y:18}, {el:"H",x:14,y:18} ],
    bonds:[ [0,1],[0,2],[1,2],[0,3],[0,4],[1,5] ], shape:"Ring (simplified)",
    fact:"The real formula has 21 atoms — we simplified it for the game!",
    whatIsIt:"A weak organic acid that gives citrus fruits their sour taste! The real molecule (C₆H₈O₇) is big — we simplified it here. It's a natural preservative found in all living cells.",
    whereFound:"Lemons, limes, oranges, grapefruit, sour candy, soft drinks, cleaning products, and your own body uses it in the Krebs cycle to produce energy!",
    danger:1, dangerNote:"Safe! You eat it every time you have citrus fruit or sour candy.",
    mindBlower:"Your body produces and destroys about 2kg of citric acid EVERY DAY as part of the Krebs cycle — the process that converts food into energy in every single cell!" },
];

const ROCK_LEVELS = [
  { id:"limestone", name:"Limestone", emoji:"🏔️", type:"Sedimentary Rock", requiredCompounds:["calcium-carb"],
    fact:"The Great Pyramid of Giza is made mostly of limestone blocks!",
    description:"A sedimentary rock made almost entirely of calcium carbonate (CaCO₃) from ancient seashells." },
  { id:"sandstone", name:"Sandstone", emoji:"🏜️", type:"Sedimentary Rock", requiredCompounds:["quartz"],
    fact:"The Grand Canyon's beautiful red layers are made of sandstone!",
    description:"Made of sand-sized quartz (SiO₂) grains cemented together over millions of years." },
  { id:"granite", name:"Granite", emoji:"⛰️", type:"Igneous Rock", requiredCompounds:["quartz","al2o3"],
    fact:"Mount Rushmore is carved into granite!",
    description:"An igneous rock containing quartz (SiO₂) and feldspar (from aluminum oxide Al₂O₃)." },
  { id:"ironstone", name:"Ironstone", emoji:"🪨", type:"Sedimentary Rock", requiredCompounds:["rust","calcium-carb"],
    fact:"Ancient ironstone formations are 2+ billion years old!",
    description:"Contains iron oxide (Fe₂O₃) cemented with calcium carbonate (CaCO₃)." },
  { id:"marble", name:"Marble", emoji:"🏛️", type:"Metamorphic Rock", requiredCompounds:["calcium-carb","mgo"],
    fact:"The Taj Mahal and ancient Greek temples are made of marble!",
    description:"Limestone (CaCO₃) transformed by heat and pressure. Often contains MgO." },
];

/* ═══════════════════════════════════════════
   🔧 HELPERS
   ═══════════════════════════════════════════ */
const ALL_GAME_SYMBOLS = ["H","He","C","N","O","F","Na","Mg","Al","Si","P","S","Cl","K","Ca","Fe","Cu","Zn","Ag","Au","Br","I","Ti","Cr","Mn","Co","Ni","Sn","Pb","Ba","Li","Be","B","Se","Sr"];

const SCIENTIST_RANKS = [
  { title:"Lab Assistant", minScore:0, emoji:"🧹" },
  { title:"Lab Technician", minScore:500, emoji:"🔬" },
  { title:"Junior Chemist", minScore:1200, emoji:"🧪" },
  { title:"Chemist", minScore:2500, emoji:"⚗️" },
  { title:"Senior Researcher", minScore:4000, emoji:"🔭" },
  { title:"Professor", minScore:6000, emoji:"🎓" },
  { title:"Nobel Laureate", minScore:9000, emoji:"🏆" },
];

function getRank(score) {
  let rank = SCIENTIST_RANKS[0];
  for (const r of SCIENTIST_RANKS) { if (score >= r.minScore) rank = r; }
  const idx = SCIENTIST_RANKS.indexOf(rank);
  const next = SCIENTIST_RANKS[idx + 1] || null;
  const progress = next ? (score - rank.minScore) / (next.minScore - rank.minScore) : 1;
  return { ...rank, next, progress: Math.min(1, progress) };
}

// // function getStars(levelResult) {
//   if (!levelResult || !levelResult.won) return 0;
//   const { total } = levelResult;
//   if (total >= 350) return 3;
//   if (total >= 200) return 2;
//   return 1;
// }

function StarDisplay({ count, size = 18 }) {
  return (
    <span style={{ display:"inline-flex", gap:2 }}>
      {[1,2,3].map(i => (
        <span key={i} style={{ fontSize:size, opacity: i<=count?1:0.2, filter: i<=count?"none":"grayscale(1)" }}>⭐</span>
      ))}
    </span>
  );
}
const ATOM_SIZE = 58;
const rand = (a, b) => a + Math.random() * (b - a);

function generateAtoms(level, w, h) {
  const atoms = [];
  let id = 0;
  const pad = ATOM_SIZE + 6;
  const aW = Math.max(w - pad * 2, 80);
  const aH = Math.max(h - pad * 2, 80);
  Object.entries(level.required).forEach(([el, count]) => {
    for (let i = 0; i < count; i++)
      atoms.push({ id: id++, element: el, x: pad + Math.random() * aW, y: pad + Math.random() * aH, vx: rand(-1.3, 1.3), vy: rand(-1.3, 1.3) });
  });
  const needed = Object.keys(level.required);
  const pool = ALL_GAME_SYMBOLS.filter(s => !needed.includes(s));
  const numD = 4 + level.difficulty * 4;
  for (let i = 0; i < numD; i++)
    atoms.push({ id: id++, element: pool[Math.floor(Math.random() * pool.length)], x: pad + Math.random() * aW, y: pad + Math.random() * aH, vx: rand(-1.3, 1.3), vy: rand(-1.3, 1.3) });
  for (let i = atoms.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [atoms[i], atoms[j]] = [atoms[j], atoms[i]]; }
  return atoms;
}

/* ═══════════════════════════════════════════
   🎨 SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function FloatingAtom({ atom, isDragging, onPointerDown, arenaRef, shakeId, ions }) {
  const ref = useRef(null);
  const posRef = useRef({ x: atom.x, y: atom.y });
  const velRef = useRef({ x: atom.vx, y: atom.vy });
  const animRef = useRef(null);
  useEffect(() => { posRef.current = { x: atom.x, y: atom.y }; velRef.current = { x: atom.vx, y: atom.vy }; }, [atom.x, atom.y, atom.vx, atom.vy]);
  useEffect(() => {
    if (isDragging) { if (animRef.current) cancelAnimationFrame(animRef.current); return; }
    const go = () => {
      const arena = arenaRef.current;
      if (!arena || !ref.current) return;
      const b = arena.getBoundingClientRect();
      posRef.current.x += velRef.current.x; posRef.current.y += velRef.current.y;
      if (posRef.current.x <= 0 || posRef.current.x >= b.width - ATOM_SIZE) { velRef.current.x *= -1; posRef.current.x = Math.max(0, Math.min(b.width - ATOM_SIZE, posRef.current.x)); }
      if (posRef.current.y <= 0 || posRef.current.y >= b.height - ATOM_SIZE) { velRef.current.y *= -1; posRef.current.y = Math.max(0, Math.min(b.height - ATOM_SIZE, posRef.current.y)); }
      ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      animRef.current = requestAnimationFrame(go);
    };
    animRef.current = requestAnimationFrame(go);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isDragging, arenaRef]);
  const el = ELEMENTS[atom.element];
  return (
    <div ref={ref} onPointerDown={e => { e.preventDefault(); const ar = arenaRef.current.getBoundingClientRect(); onPointerDown(atom.id, { offsetX: e.clientX - (ar.left + posRef.current.x), offsetY: e.clientY - (ar.top + posRef.current.y), posRef, velRef, domRef: ref }); }}
      style={{ position:"absolute", width:ATOM_SIZE, height:ATOM_SIZE, borderRadius:"50%",
        background:`radial-gradient(circle at 35% 30%, ${el.color}ee, ${el.color}88, ${el.glow}55)`,
        border:`3px solid ${el.color}cc`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        cursor: isDragging?"grabbing":"grab", touchAction:"none", userSelect:"none", zIndex: isDragging?100:10,
        boxShadow: isDragging ? `0 0 35px ${el.color}88, 0 10px 40px rgba(0,0,0,0.35)` : `0 0 12px ${el.color}33, inset 0 -3px 6px ${el.glow}33`,
        transform:`translate(${atom.x}px, ${atom.y}px)`, animation: shakeId===atom.id ? "shake-wrong 0.5s ease-out" : "none",
      }}>
      <div style={{ position:"absolute",top:5,left:9,width:15,height:8,borderRadius:"50%",background:"rgba(255,255,255,0.3)",transform:"rotate(-25deg)",pointerEvents:"none" }} />
      <span style={{ fontSize:20,fontWeight:800,color:"#1a1a2e",lineHeight:1,fontFamily:"var(--font)" }}>{atom.element}</span>
      <span style={{ fontSize:8,color:"#1a1a2eaa",fontWeight:700,fontFamily:"var(--font)" }}>{el.number}</span>
      {ions && ions[atom.element] && (
        <span style={{ position:"absolute",top:-6,right:-6,fontSize:11,fontWeight:800,
          color: ions[atom.element].includes("+") || ions[atom.element].includes("⁺") ? "#5DADE2" : "#FF6B6B",
          textShadow: `0 0 6px ${ions[atom.element].includes("+") || ions[atom.element].includes("⁺") ? "#5DADE2" : "#FF6B6B"}`,
        }}>{ions[atom.element]}</span>
      )}
    </div>
  );
}

/* ── SOUND SYSTEM (science lab sounds via Web Audio API) ── */
function useSounds() {
  const ctxRef = useRef(null);
  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  };
  const play = useCallback((type) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;
      if (type === "drop") {
        // Bubbly water drop sound
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(600, now);
        o.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        o.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        g.gain.setValueAtTime(0.25, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.2);
        // Second bubble
        const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
        o2.type = "sine"; o2.frequency.setValueAtTime(800, now + 0.05);
        o2.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
        g2.gain.setValueAtTime(0.15, now + 0.05); g2.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        o2.connect(g2); g2.connect(ctx.destination); o2.start(now + 0.05); o2.stop(now + 0.2);
      } else if (type === "wrong") {
        // Glass clink / error buzz
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sawtooth"; o.frequency.setValueAtTime(180, now);
        o.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.25);
      } else if (type === "complete") {
        // Rising beaker bubbles celebration
        [0, 0.08, 0.16, 0.24, 0.32].forEach((delay, i) => {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = "sine"; const freq = 500 + i * 150;
          o.frequency.setValueAtTime(freq, now + delay);
          o.frequency.exponentialRampToValueAtTime(freq * 1.5, now + delay + 0.12);
          g.gain.setValueAtTime(0.18, now + delay); g.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.2);
          o.connect(g); g.connect(ctx.destination); o.start(now + delay); o.stop(now + delay + 0.25);
        });
        // Final chime
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(1200, now + 0.45);
        g.gain.setValueAtTime(0.2, now + 0.45); g.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
        o.connect(g); g.connect(ctx.destination); o.start(now + 0.45); o.stop(now + 0.95);
      } else if (type === "rock") {
        // Deep resonant gong + bubbles
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(220, now);
        g.gain.setValueAtTime(0.25, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.85);
        [0.15, 0.25, 0.35].forEach((d, i) => {
          const b = ctx.createOscillator(); const bg = ctx.createGain();
          b.type = "sine"; b.frequency.setValueAtTime(700 + i * 200, now + d);
          b.frequency.exponentialRampToValueAtTime(1000 + i * 200, now + d + 0.1);
          bg.gain.setValueAtTime(0.12, now + d); bg.gain.exponentialRampToValueAtTime(0.01, now + d + 0.15);
          b.connect(bg); bg.connect(ctx.destination); b.start(now + d); b.stop(now + d + 0.18);
        });
      }
    } catch(e) {}
  }, []);
  return play;
}

/* ── BOUNCING MOLECULE with real geometry, bonds & ion charges ── */
function BouncingMolecule({ level, arenaRef }) {
  const ref = useRef(null);
  const posRef = useRef({ x: 80, y: 60 });
  const velRef = useRef({ x: rand(0.7,1.4)*(Math.random()>0.5?1:-1), y: rand(0.7,1.4)*(Math.random()>0.5?1:-1) });
  const animRef = useRef(null);
  const geo = level.geometry || [];
  const bonds = level.bonds || [];
  const ions = level.ions || {};
  const isIonic = level.bondType === "ionic";

  const padding = 60;
  const molW = geo.length > 0 ? (Math.max(...geo.map(g=>g.x)) - Math.min(...geo.map(g=>g.x))) + padding * 2 : 100;
  const molH = geo.length > 0 ? (Math.max(...geo.map(g=>g.y)) - Math.min(...geo.map(g=>g.y))) + padding * 2 : 80;
  const centerX = molW / 2;
  const centerY = molH / 2;

  useEffect(() => {
    const go = () => {
      const arena = arenaRef.current;
      if (!arena || !ref.current) return;
      const b = arena.getBoundingClientRect();
      posRef.current.x += velRef.current.x; posRef.current.y += velRef.current.y;
      if (posRef.current.x <= 0 || posRef.current.x >= b.width - molW) { velRef.current.x *= -1; posRef.current.x = Math.max(0, Math.min(b.width - molW, posRef.current.x)); }
      if (posRef.current.y <= 0 || posRef.current.y >= b.height - molH) { velRef.current.y *= -1; posRef.current.y = Math.max(0, Math.min(b.height - molH, posRef.current.y)); }
      ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      animRef.current = requestAnimationFrame(go);
    };
    animRef.current = requestAnimationFrame(go);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [arenaRef, molW, molH]);

  return (
    <div ref={ref} style={{
      position:"absolute", width:molW, height:molH,
      transform:`translate(${posRef.current.x}px, ${posRef.current.y}px)`,
      zIndex:50, pointerEvents:"none",
      filter:"drop-shadow(0 0 18px rgba(255,255,255,0.2))",
      animation:"molecule-appear 0.6s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      {/* SVG bonds */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }}>
        {bonds.map(([a,b],i) => {
          const ga = geo[a]; const gb = geo[b];
          if (!ga || !gb) return null;
          const isDouble = level.doubleBonds && level.doubleBonds.includes(i);
          return (
            <g key={i}>
              {isDouble ? (<>
                <line x1={centerX+ga.x} y1={centerY+ga.y-3} x2={centerX+gb.x} y2={centerY+gb.y-3}
                  stroke={isIonic?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.55)"} strokeWidth={isIonic?1.5:2.5} strokeDasharray={isIonic?"4,3":""} />
                <line x1={centerX+ga.x} y1={centerY+ga.y+3} x2={centerX+gb.x} y2={centerY+gb.y+3}
                  stroke={isIonic?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.55)"} strokeWidth={isIonic?1.5:2.5} strokeDasharray={isIonic?"4,3":""} />
              </>) : (
                <line x1={centerX+ga.x} y1={centerY+ga.y} x2={centerX+gb.x} y2={centerY+gb.y}
                  stroke={isIonic?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.55)"} strokeWidth={isIonic?1.5:3}
                  strokeDasharray={isIonic?"4,3":""} />
              )}
            </g>
          );
        })}
      </svg>
      {/* Atoms */}
      {geo.map((g,i) => {
        const d = ELEMENTS[g.el];
        const ion = ions[g.el];
        const ionColor = ion && (ion.includes("+") || ion.includes("⁺")) ? "#5DADE2" : ion ? "#FF6B6B" : null;
        return (
          <div key={i} style={{
            position:"absolute",
            left: centerX + g.x - 19, top: centerY + g.y - 19,
            width:38, height:38, borderRadius:"50%",
            background:`radial-gradient(circle at 35% 30%, ${d.color}ff, ${d.color}aa)`,
            border: ionColor ? `3px solid ${ionColor}` : `2px solid ${d.color}`,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 14px ${d.color}66${ionColor ? `, 0 0 8px ${ionColor}88` : ""}`,
          }}>
            <div style={{ position:"absolute",top:3,left:6,width:10,height:5,borderRadius:"50%",background:"rgba(255,255,255,0.35)",transform:"rotate(-25deg)" }} />
            <span style={{ fontSize:14,fontWeight:800,color:"#1a1a2e",fontFamily:"var(--font)",lineHeight:1 }}>{g.el}</span>
            {ion && (
              <span style={{
                position:"absolute", top:-8, right:-8,
                fontSize:11, fontWeight:800, color: ionColor,
                textShadow:`0 0 6px ${ionColor}`,
              }}>{ion}</span>
            )}
          </div>
        );
      })}
      {/* Shape label */}
      {level.shape && (
        <div style={{
          position:"absolute", bottom:-18, left:"50%", transform:"translateX(-50%)",
          fontSize:9, color:"#ffffff66", fontWeight:600, whiteSpace:"nowrap",
          fontFamily:"var(--font)",
        }}>{level.shape}{isIonic ? " • ionic bond" : " • covalent bond"}</div>
      )}
    </div>
  );
}

function MoleculeSlot({ element, filled, pulse }) {
  const el = ELEMENTS[element];
  return (
    <div style={{ width:48,height:48,borderRadius:"50%",margin:3,
      border:`3px ${filled?"solid":"dashed"} ${filled?el.color:"#ffffff33"}`,
      background: filled ? `radial-gradient(circle at 35% 30%, ${el.color}cc, ${el.color}77)` : "rgba(255,255,255,0.04)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)", transform: filled?"scale(1.1)":"scale(1)",
      boxShadow: filled?`0 0 20px ${el.color}55`:"none", animation: pulse?"slot-pulse 0.6s ease-out":"none",
    }}>
      <span style={{ fontSize:16,fontWeight:800,color: filled?"#1a1a2e":"#ffffff33",fontFamily:"var(--font)" }}>{element}</span>
      {filled && <span style={{ fontSize:7,color:"#1a1a2eaa",fontWeight:700 }}>{el.number}</span>}
    </div>
  );
}

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100;
  const c = pct > 50 ? "#4ECDC4" : pct > 25 ? "#FFE66D" : "#FF6B6B";
  return (
    <div style={{ width:"100%",height:5,borderRadius:3,background:"rgba(255,255,255,0.08)",overflow:"hidden" }}>
      <div style={{ height:"100%",borderRadius:3,width:`${pct}%`,background:c,transition:"width 1s linear, background 0.5s",boxShadow:`0 0 8px ${c}88` }} />
    </div>
  );
}

function Toast({ type, element, needed }) {
  const ok = type==="correct";
  return (
    <div style={{ position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",padding:"8px 16px",borderRadius:14,zIndex:300,
      background: ok?"rgba(78,205,196,0.92)":"rgba(255,82,82,0.92)",color: ok?"#1a1a2e":"#fff",fontFamily:"var(--font)",fontWeight:600,fontSize:13,
      animation:"toast-pop 1.8s ease-out forwards",boxShadow: ok?"0 6px 20px rgba(78,205,196,0.4)":"0 6px 20px rgba(255,82,82,0.4)",
      display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",maxWidth:"90%",
    }}>
      <span>{ok?"✅":"❌"}</span>
      {ok ? <span><b>{ELEMENTS[element]?.name}</b> — correct!</span> : <span><b>{ELEMENTS[element]?.name}</b> not needed!</span>}
    </div>
  );
}

function Confetti() {
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:999,overflow:"hidden" }}>
      {Array.from({length:36}).map((_,i) => (
        <div key={i} style={{ position:"absolute",left:`${40+(Math.random()-0.5)*40}%`,top:`${40+(Math.random()-0.5)*30}%`,
          width:5+Math.random()*9,height:5+Math.random()*9,borderRadius:Math.random()>0.5?"50%":"2px",
          background:["#FF6B6B","#4ECDC4","#FFE66D","#B39DDB","#FF8A65","#81C784","#5DADE2"][i%7],
          animation:`confetti-fly 1s ease-out ${Math.random()*0.3}s forwards`,opacity:0,
        }} />
      ))}
    </div>
  );
}

function BackBtn({ onClick }) {
  return <button className="gbtn" onClick={onClick} style={{ background:"rgba(255,255,255,0.08)",color:"#fff",padding:"7px 16px",borderRadius:11,fontSize:13,fontWeight:600 }}>← Back</button>;
}

/* ═══════════════════════════════════════════
   🏠 FULL PERIODIC TABLE (Learn Screen)
   ═══════════════════════════════════════════ */
function FullPeriodicTable({ onSelect, selected }) {
  // Standard periodic table layout: [row][col] = symbol or null
  // 18 columns, 9 rows (7 main + 2 for lanthanides/actinides)
  const grid = [
    ["H",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"He"],
    ["Li","Be",null,null,null,null,null,null,null,null,null,null,"B","C","N","O","F","Ne"],
    ["Na","Mg",null,null,null,null,null,null,null,null,null,null,"Al","Si","P","S","Cl","Ar"],
    ["K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr"],
    ["Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"],
    ["Cs","Ba","*","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"],
    ["Fr","Ra","**","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"],
    [null,null,null,"La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"],
    [null,null,null,"Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"],
  ];

  return (
    <div style={{ overflowX:"auto", paddingBottom:10 }}>
      <div style={{ display:"flex",flexDirection:"column",gap:2,minWidth:540 }}>
        {grid.map((row, ri) => (
          <div key={ri} style={{ display:"flex",gap:2, marginTop: ri===7?10:0 }}>
            {ri===7 && <div style={{ width:29,height:26,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#F8BBD088",flexShrink:0 }}>*</div>}
            {ri===8 && <div style={{ width:29,height:26,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#80DEEA88",flexShrink:0 }}>**</div>}
            {ri<7 && row.map((el, ci) => {
              if (!el) return <div key={ci} style={{ width:29,height:26,flexShrink:0 }} />;
              if (el==="*"||el==="**") return <div key={ci} style={{ width:29,height:26,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#ffffff44" }}>{el}</div>;
              const d = ELEMENTS[el];
              if (!d) return <div key={ci} style={{ width:29,height:26,flexShrink:0 }} />;
              const isSel = selected===el;
              return (
                <div key={ci} onClick={() => onSelect(el)} style={{
                  width:29,height:26,borderRadius:4,flexShrink:0,cursor:"pointer",
                  background: isSel?d.color:`${d.color}25`,border:`1.5px solid ${isSel?d.color:d.color+"44"}`,
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  transition:"all 0.15s",transform: isSel?"scale(1.2)":"scale(1)",zIndex:isSel?5:1,
                }}>
                  <span style={{ fontSize:9,fontWeight:700,color: isSel?"#1a1a2e":d.color,fontFamily:"var(--font)",lineHeight:1 }}>{el}</span>
                  <span style={{ fontSize:5,color: isSel?"#1a1a2eaa":d.color+"77",lineHeight:1 }}>{d.number}</span>
                </div>
              );
            })}
            {ri>=7 && row.slice(3).map((el, ci) => {
              if (!el) return <div key={ci} style={{ width:29,height:26,flexShrink:0 }} />;
              const d = ELEMENTS[el];
              if (!d) return <div key={ci} style={{ width:29,height:26,flexShrink:0 }} />;
              const isSel = selected===el;
              return (
                <div key={ci} onClick={() => onSelect(el)} style={{
                  width:29,height:26,borderRadius:4,flexShrink:0,cursor:"pointer",
                  background: isSel?d.color:`${d.color}25`,border:`1.5px solid ${isSel?d.color:d.color+"44"}`,
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  transition:"all 0.15s",transform: isSel?"scale(1.2)":"scale(1)",zIndex:isSel?5:1,
                }}>
                  <span style={{ fontSize:9,fontWeight:700,color: isSel?"#1a1a2e":d.color,fontFamily:"var(--font)",lineHeight:1 }}>{el}</span>
                  <span style={{ fontSize:5,color: isSel?"#1a1a2eaa":d.color+"77",lineHeight:1 }}>{d.number}</span>
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
   🎮 MAIN GAME
   ═══════════════════════════════════════════ */
export default function ChemistryGame() {
  const [screen, setScreen] = useState("menu");
  const [selectedEl, setSelectedEl] = useState(null);
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
  const [showMolecule, setShowMolecule] = useState(false);
  const [currentRock, setCurrentRock] = useState(0);
  const [rockSlots, setRockSlots] = useState({});
  const [completedRocks, setCompletedRocks] = useState(new Set());
  const [rockResult, setRockResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [levelStars, setLevelStars] = useState({});
  const [notebookSelected, setNotebookSelected] = useState(null);

  const arenaRef = useRef(null);
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const toastTimer = useRef(null);
  const playSound = useSounds();

  const level = COMPOUND_LEVELS[currentLevel];
  const rock = ROCK_LEVELS[currentRock];

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

  const startCompound = useCallback((idx) => {
    setCurrentLevel(idx); setFilledSlots({}); setDraggingId(null); setToast(null); setShakeId(null);
    setPulseSlot(null); setMistakes(0); setShowConfetti(false); setLevelResult(null); setShowMolecule(false);
    const lvl = COMPOUND_LEVELS[idx];
    const time = lvl.difficulty===1?45:lvl.difficulty===2?60:90;
    setMaxTime(time); setTimeLeft(time);
    setTimeout(() => {
      const a = arenaRef.current;
      setAtoms(generateAtoms(lvl, a?a.offsetWidth:350, a?a.offsetHeight:300));
    }, 60);
    setScreen("compound-play");
  }, []);

  const handlePointerDown = (atomId, refs) => {
    setDraggingId(atomId); dragRef.current = refs;
    const el = document.documentElement;
    const onMove = (e) => {
      if (!dragRef.current||!arenaRef.current) return;
      const ar = arenaRef.current.getBoundingClientRect();
      const x = e.clientX-ar.left-dragRef.current.offsetX, y = e.clientY-ar.top-dragRef.current.offsetY;
      dragRef.current.posRef.current = {x,y};
      if (dragRef.current.domRef.current) dragRef.current.domRef.current.style.transform = `translate(${x}px,${y}px)`;
    };
    const onUp = (e) => {
      el.removeEventListener("pointermove",onMove); el.removeEventListener("pointerup",onUp);
      handleDrop(atomId, e.clientX, e.clientY);
      if (dragRef.current) dragRef.current.velRef.current = {x:rand(-1.3,1.3),y:rand(-1.3,1.3)};
      setDraggingId(null); dragRef.current = null;
    };
    el.addEventListener("pointermove",onMove); el.addEventListener("pointerup",onUp);
  };

  const handleDrop = (atomId, cx, cy) => {
    if (!dropRef.current) return;
    const r = dropRef.current.getBoundingClientRect();
    if (cx<r.left||cx>r.right||cy<r.top||cy>r.bottom) return;
    const atom = atoms.find(a => a.id===atomId);
    if (!atom) return;
    const sym = atom.element;
    const needed = level.required[sym]||0;
    const already = filledSlots[sym]||0;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (already < needed) {
      const nf = {...filledSlots,[sym]:already+1};
      setFilledSlots(nf);
      setAtoms(prev => prev.filter(a => a.id!==atomId));
      setPulseSlot(sym); setTimeout(() => setPulseSlot(null), 700);
      setToast({type:"correct",element:sym,key:Date.now()});
      if (soundOn) playSound("drop");
      toastTimer.current = setTimeout(() => setToast(null), 1500);
      const isComplete = Object.entries(level.required).every(([e,c]) => (nf[e]||0)>=c);
      if (isComplete) {
        const bp = level.difficulty===1?150:level.difficulty===2?250:400;
        const tb = Math.max(0, Math.floor(timeLeft*2));
        const mp = mistakes*25; const sb = streak*30;
        const total = Math.max(0, bp+tb-mp+sb);
        setScore(s => s+total); setStreak(s => s+1);
        setCompletedCompounds(prev => new Set([...prev, level.id]));
        setShowConfetti(true); setShowMolecule(true);
        setLevelResult({won:true,bp,tb,mp,sb,total});
        if (soundOn) playSound("complete");
        const stars = total >= 350 ? 3 : total >= 200 ? 2 : 1;
        setLevelStars(prev => ({ ...prev, [level.id]: Math.max(prev[level.id]||0, stars) }));
        setTimeout(() => { setShowConfetti(false); setScreen("compound-result"); }, 2500);
      }
    } else {
      setMistakes(m => m+1); setShakeId(atomId); setTimeout(() => setShakeId(null), 600);
      setToast({type:"wrong",element:sym,key:Date.now()});
      if (soundOn) playSound("wrong");
      toastTimer.current = setTimeout(() => setToast(null), 2500);
    }
  };

  const startRock = (idx) => { setCurrentRock(idx); setRockSlots({}); setRockResult(null); setScreen("rock-play"); };
  const toggleRockSlot = (cid) => { setRockSlots(prev => { const n={...prev}; if(n[cid]) delete n[cid]; else n[cid]=true; return n; }); };
  const submitRock = () => {
    const needed = new Set(rock.requiredCompounds);
    const selected = new Set(Object.keys(rockSlots));
    const correct = needed.size===selected.size && [...needed].every(c => selected.has(c));
    if (correct) {
      setScore(s => s+300); setCompletedRocks(prev => new Set([...prev,rock.id]));
      setShowConfetti(true); setRockResult({won:true});
      if (soundOn) playSound("rock");
      setTimeout(() => setShowConfetti(false), 1600);
    } else {
      setRockResult({won:false,needed:rock.requiredCompounds.map(id => COMPOUND_LEVELS.find(c=>c.id===id)?.name).join(" + ")});
    }
  };

  const slotsArr = level ? Object.entries(level.required).flatMap(([el,c]) => Array.from({length:c},(_,i) => ({element:el,filled:(filledSlots[el]||0)>i}))) : [];
  const totalNeeded = level ? Object.values(level.required).reduce((a,b) => a+b, 0) : 0;
  const totalFilled = Object.values(filledSlots).reduce((a,b) => a+b, 0);

  return (
    <div style={{ "--font":"'Baloo 2', sans-serif", minHeight:"100vh",
      background:"linear-gradient(145deg,#0a0a1a 0%,#111133 35%,#1a1a3e 65%,#0d0d2a 100%)",
      fontFamily:"var(--font)", color:"#fff", overflow:"hidden",
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
        @keyframes molecule-appear{0%{transform:scale(0) rotate(-180deg);opacity:0}100%{transform:scale(1) rotate(0deg);opacity:1}}
        .gbtn{border:none;cursor:pointer;font-family:var(--font);transition:all 0.2s}.gbtn:hover{transform:scale(1.05);filter:brightness(1.12)}.gbtn:active{transform:scale(0.97)}
        .card-hover{transition:all 0.2s}.card-hover:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.3)}
      `}</style>

      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        {[{c:"#4ECDC4",x:"15%",y:"20%",s:200,d:"12s"},{c:"#FF6B6B",x:"75%",y:"60%",s:150,d:"15s"},{c:"#B39DDB",x:"50%",y:"80%",s:180,d:"18s"},{c:"#FFE66D",x:"85%",y:"15%",s:120,d:"10s"}].map((o,i) => (
          <div key={i} style={{ position:"absolute",left:o.x,top:o.y,width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c}10 0%,transparent 70%)`,animation:`bg-orb ${o.d} ease-in-out infinite`,animationDelay:`${i*-3}s` }} />
        ))}
      </div>

      {showConfetti && <Confetti />}

      {/* ═══ MENU ═══ */}
      {screen==="menu" && (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:28,animation:"slide-in 0.5s ease-out",position:"relative",zIndex:1 }}>
          <div style={{ fontSize:72,marginBottom:4,animation:"float-slow 3s ease-in-out infinite" }}>⚛️</div>
          <h1 style={{ fontSize:"clamp(32px,7vw,54px)",fontWeight:800,lineHeight:1.1,marginBottom:6,background:"linear-gradient(135deg,#FF6B6B 0%,#4ECDC4 50%,#FFE66D 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textAlign:"center" }}>Atomix</h1>
          <p style={{ color:"#ffffff66",fontSize:15,marginBottom:40,textAlign:"center",maxWidth:380,lineHeight:1.5 }}>Explore elements, build compounds from floating atoms, then combine them into real rocks!</p>
          <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:300 }}>
            {[
              {l:"🔬 Learn Elements",s:"learn",bg:"linear-gradient(135deg,#4ECDC4,#3DB8B0)",c:"#1a1a2e",sh:"rgba(78,205,196,0.35)"},
              {l:"🧪 Build Compounds",s:"compound-levels",bg:"linear-gradient(135deg,#FF6B6B,#ee5252)",c:"#fff",sh:"rgba(255,107,107,0.35)"},
              {l:"🏔️ Build Rocks",s:"rock-levels",bg:"linear-gradient(135deg,#B39DDB,#9575CD)",c:"#fff",sh:"rgba(179,157,219,0.35)"},
              {l:"📓 Lab Notebook",s:"notebook",bg:"linear-gradient(135deg,#FFE66D,#e6c800)",c:"#1a1a2e",sh:"rgba(255,230,77,0.35)"},
            ].map(b => (
              <button key={b.s} className="gbtn" onClick={() => setScreen(b.s)} style={{ padding:"16px 32px",borderRadius:18,background:b.bg,color:b.c,fontSize:18,fontWeight:700,boxShadow:`0 6px 22px ${b.sh}` }}>{b.l}</button>
            ))}
          </div>
          {/* Scientist Rank */}
          {(() => { const rank = getRank(score); return (
            <div style={{ marginTop:24, padding:"14px 22px", borderRadius:16, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", width:"100%", maxWidth:300 }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                <span style={{ fontSize:14,fontWeight:700 }}>{rank.emoji} {rank.title}</span>
                <span style={{ color:"#FFE66D",fontWeight:700,fontSize:13 }}>⭐ {score}</span>
              </div>
              {rank.next && (
                <>
                  <div style={{ width:"100%",height:6,borderRadius:3,background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:4 }}>
                    <div style={{ height:"100%",borderRadius:3,width:`${rank.progress*100}%`,background:"linear-gradient(90deg,#FFE66D,#FF8A65)",transition:"width 0.5s" }} />
                  </div>
                  <span style={{ fontSize:11,color:"#ffffff55" }}>Next: {rank.next.emoji} {rank.next.title} ({rank.next.minScore - score} pts to go)</span>
                </>
              )}
              <div style={{ display:"flex",gap:12,marginTop:6,fontSize:12 }}>
                <span style={{ color:"#FF6B6B" }}>🔥 {streak} streak</span>
                <span style={{ color:"#4ECDC4" }}>✅ {completedCompounds.size+completedRocks.size}/{COMPOUND_LEVELS.length+ROCK_LEVELS.length}</span>
              </div>
            </div>
          );})()}
          {/* Sound toggle */}
          <button className="gbtn" onClick={() => setSoundOn(!soundOn)} style={{
            marginTop:20, padding:"8px 20px", borderRadius:12,
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
            color:"#ffffff88", fontSize:13, fontWeight:600,
          }}>{soundOn ? "🔊 Sound On" : "🔇 Sound Off"}</button>
          {/* Game completion check */}
          {completedCompounds.size === COMPOUND_LEVELS.length && completedRocks.size === ROCK_LEVELS.length && (
            <div style={{ marginTop:20, padding:"16px 24px", borderRadius:16, background:"linear-gradient(135deg, rgba(255,230,77,0.12), rgba(78,205,196,0.12))", border:"1px solid rgba(255,230,77,0.2)", textAlign:"center", maxWidth:340 }}>
              <div style={{ fontSize:36, marginBottom:6 }}>🏆</div>
              <h3 style={{ fontSize:18, fontWeight:800, color:"#FFE66D", marginBottom:4 }}>You completed Atomix!</h3>
              <p style={{ fontSize:13, color:"#ffffffaa", marginBottom:10 }}>All compounds & rocks built! Final score: {score}</p>
              <button className="gbtn" onClick={() => {
                setScore(0); setStreak(0); setLevelStars({});
                setCompletedCompounds(new Set()); setCompletedRocks(new Set());
              }} style={{ padding:"10px 24px", borderRadius:12, background:"linear-gradient(135deg,#FFE66D,#e6c800)", color:"#1a1a2e", fontSize:14, fontWeight:700 }}>🔄 Play Again From Scratch</button>
            </div>
          )}
        </div>
      )}

      {/* ═══ LAB NOTEBOOK ═══ */}
      {screen==="notebook" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:560,margin:"0 auto",position:"relative",zIndex:1,minHeight:"100vh" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <BackBtn onClick={() => { setNotebookSelected(null); setScreen("menu"); }} />
            <span style={{ color:"#FFE66D",fontWeight:700,fontSize:14 }}>{completedCompounds.size} / {COMPOUND_LEVELS.length} collected</span>
          </div>
          <h2 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>📓 Lab Notebook</h2>
          <p style={{ color:"#ffffff55",fontSize:13,marginBottom:18 }}>Your collection of discovered compounds! Build more to fill your notebook.</p>

          {!notebookSelected ? (
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              {COMPOUND_LEVELS.map(c => {
                const unlocked = completedCompounds.has(c.id);
                return (
                  <button key={c.id} className="gbtn card-hover" onClick={() => unlocked ? setNotebookSelected(c.id) : null}
                    style={{
                      display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 14px",borderRadius:14,textAlign:"left",
                      background: unlocked ? "rgba(255,230,77,0.06)" : "rgba(255,255,255,0.02)",
                      border: unlocked ? "2px solid rgba(255,230,77,0.15)" : "2px solid rgba(255,255,255,0.04)",
                      color:"#fff", opacity: unlocked ? 1 : 0.4, cursor: unlocked ? "pointer" : "default",
                    }}>
                    <span style={{ fontSize:24,flexShrink:0 }}>{unlocked ? c.emoji : "🔒"}</span>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontWeight:700,fontSize:14 }}>{unlocked ? c.name : "???"}</div>
                      <div style={{ color:"#ffffff44",fontSize:12 }}>{unlocked ? c.formula : "Build this compound to unlock!"}</div>
                    </div>
                    {unlocked && <StarDisplay count={levelStars[c.id]||1} size={12} />}
                  </button>
                );
              })}
            </div>
          ) : (
            (() => {
              const c = COMPOUND_LEVELS.find(x => x.id === notebookSelected);
              if (!c) return null;
              return (
                <div style={{ animation:"slide-in 0.3s ease-out" }}>
                  <button className="gbtn" onClick={() => setNotebookSelected(null)} style={{ background:"rgba(255,255,255,0.08)",color:"#fff",padding:"6px 14px",borderRadius:10,fontSize:12,fontWeight:600,marginBottom:14 }}>← All Compounds</button>
                  <div style={{ textAlign:"center",marginBottom:14 }}>
                    <span style={{ fontSize:48 }}>{c.emoji}</span>
                    <h3 style={{ fontSize:22,fontWeight:800,marginTop:4 }}>{c.name}</h3>
                    <div style={{ fontSize:20,fontWeight:800,background:"linear-gradient(90deg,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{c.formula}</div>
                    <div style={{ marginTop:6 }}><StarDisplay count={levelStars[c.id]||1} size={20} /></div>
                    <div style={{ display:"inline-flex",gap:8,marginTop:8 }}>
                      <span style={{ padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:600,
                        background: c.bondType==="ionic"?"rgba(93,173,226,0.15)":"rgba(78,205,196,0.15)",
                        color: c.bondType==="ionic"?"#5DADE2":"#4ECDC4",
                      }}>{c.bondType==="ionic"?"⚡ Ionic Bond":"🔗 Covalent Bond"}</span>
                      {c.shape && <span style={{ padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:600,background:"rgba(255,255,255,0.06)",color:"#ffffff88" }}>{c.shape}</span>}
                    </div>
                  </div>
                  {/* Full compound card */}
                  <div style={{ borderRadius:18,overflow:"hidden",background:"linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",border:"1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><span style={{ fontSize:16 }}>🏷️</span><span style={{ fontSize:12,fontWeight:700,color:"#4ECDC4",textTransform:"uppercase",letterSpacing:1 }}>What is it?</span></div>
                      <p style={{ fontSize:13,lineHeight:1.6,color:"#ffffffcc",textAlign:"left" }}>{c.whatIsIt}</p>
                    </div>
                    <div style={{ padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><span style={{ fontSize:16 }}>🌍</span><span style={{ fontSize:12,fontWeight:700,color:"#FFE66D",textTransform:"uppercase",letterSpacing:1 }}>Where do you find it?</span></div>
                      <p style={{ fontSize:13,lineHeight:1.6,color:"#ffffffcc",textAlign:"left" }}>{c.whereFound}</p>
                    </div>
                    <div style={{ padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><span style={{ fontSize:16 }}>⚠️</span><span style={{ fontSize:12,fontWeight:700,color:c.danger>=4?"#FF6B6B":c.danger>=3?"#FF8A65":"#4ECDC4",textTransform:"uppercase",letterSpacing:1 }}>Danger Level</span></div>
                      <div style={{ display:"flex",alignItems:"center",gap:4,marginBottom:4 }}>
                        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize:16,opacity:i<=c.danger?1:0.2,filter:i<=c.danger?"none":"grayscale(1)" }}>☠️</span>)}
                        <span style={{ marginLeft:4,fontSize:11,fontWeight:700,color:c.danger>=4?"#FF6B6B":c.danger>=3?"#FF8A65":"#4ECDC4" }}>
                          {c.danger===1?"Safe!":c.danger===2?"Mild":c.danger===3?"Caution":c.danger===4?"Dangerous!":"EXTREME!"}
                        </span>
                      </div>
                      <p style={{ fontSize:12,lineHeight:1.5,color:"#ffffff88",textAlign:"left" }}>{c.dangerNote}</p>
                    </div>
                    <div style={{ padding:"14px 18px" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}><span style={{ fontSize:16 }}>🤯</span><span style={{ fontSize:12,fontWeight:700,color:"#B39DDB",textTransform:"uppercase",letterSpacing:1 }}>Mind Blower</span></div>
                      <p style={{ fontSize:13,lineHeight:1.6,color:"#ffffffcc",textAlign:"left" }}>{c.mindBlower}</p>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* ═══ LEARN ELEMENTS ═══ */}
      {screen==="learn" && (
        <div style={{ padding:16,animation:"slide-in 0.4s ease-out",maxWidth:700,margin:"0 auto",position:"relative",zIndex:1 }}>
          <BackBtn onClick={() => setScreen("menu")} />
          <h2 style={{ fontSize:22,fontWeight:800,margin:"10px 0 4px" }}>🔬 Periodic Table — All 118 Elements</h2>
          <p style={{ color:"#ffffff55",fontSize:12,marginBottom:10 }}>Tap any element to learn about it!</p>
          <FullPeriodicTable onSelect={setSelectedEl} selected={selectedEl} />
          <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginTop:8,marginBottom:8 }}>
            {Object.entries(CATEGORY_LABELS).map(([key,val]) => (
              <span key={key} style={{ padding:"2px 8px",borderRadius:6,fontSize:9,fontWeight:600,background:`${val.color}22`,color:val.color,border:`1px solid ${val.color}33` }}>{val.label}</span>
            ))}
          </div>
          {selectedEl && ELEMENTS[selectedEl] && (
            <div style={{ padding:16,borderRadius:16,background:`${ELEMENTS[selectedEl].color}11`,border:`2px solid ${ELEMENTS[selectedEl].color}33`,animation:"slide-in 0.3s ease-out" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:10 }}>
                <div style={{ width:56,height:56,borderRadius:"50%",background:`radial-gradient(circle at 35% 30%,${ELEMENTS[selectedEl].color}dd,${ELEMENTS[selectedEl].color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:800,color:"#1a1a2e",flexShrink:0 }}>{selectedEl}</div>
                <div>
                  <h3 style={{ fontSize:19,fontWeight:700 }}>{ELEMENTS[selectedEl].name}</h3>
                  <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
                    <span style={{ color:"#ffffff88",fontSize:13 }}>#{ELEMENTS[selectedEl].number}</span>
                    <span style={{ padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:600,background:`${CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.color}33`,color:CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.color }}>{CATEGORY_LABELS[ELEMENTS[selectedEl].category]?.label}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize:14,lineHeight:1.6,color:"#ffffffcc" }}>💡 {ELEMENTS[selectedEl].fact}</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ COMPOUND LEVELS ═══ */}
      {screen==="compound-levels" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:560,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <BackBtn onClick={() => setScreen("menu")} />
            <span style={{ color:"#FFE66D",fontWeight:700,fontSize:14 }}>⭐ {score}</span>
          </div>
          <h2 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>🧪 Build Compounds</h2>
          <p style={{ color:"#ffffff55",fontSize:13,marginBottom:18 }}>Find the right atoms among the floating chaos!</p>
          {["Everyday","Minerals","Advanced","Kitchen"].map(cat => {
            const items = COMPOUND_LEVELS.map((l,i) => ({...l,idx:i})).filter(l => l.category===cat);
            if (!items.length) return null;
            return (
              <div key={cat} style={{ marginBottom:18 }}>
                <h3 style={{ fontSize:12,fontWeight:700,color:"#ffffff44",textTransform:"uppercase",letterSpacing:2,marginBottom:8,paddingLeft:4 }}>
                  {cat==="Everyday"?"🧪 Everyday":cat==="Minerals"?"💎 Minerals":cat==="Kitchen"?"🍳 Kitchen Chemistry":"⚗️ Advanced"}
                </h3>
                <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                  {items.map(l => {
                    const done = completedCompounds.has(l.id);
                    return (
                      <button key={l.idx} className="gbtn card-hover" onClick={() => startCompound(l.idx)} style={{
                        display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 14px",borderRadius:14,textAlign:"left",
                        background: done?"rgba(78,205,196,0.08)":"rgba(255,255,255,0.03)",
                        border: done?"2px solid #4ECDC422":"2px solid rgba(255,255,255,0.05)",color:"#fff",
                      }}>
                        <span style={{ fontSize:26,flexShrink:0 }}>{l.emoji}</span>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ fontWeight:700,fontSize:15 }}>{l.name} <span style={{ color:"#ffffff44",fontWeight:500,marginLeft:6,fontSize:13 }}>{l.formula}</span></div>
                          <div style={{ color:"#ffffff55",fontSize:11,marginTop:1 }}>{Object.entries(l.required).map(([s,c]) => `${c}×${s}`).join(" + ")}</div>
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
                          {[1,2,3].map(d => <div key={d} style={{ width:7,height:7,borderRadius:"50%",background:d<=l.difficulty?(l.difficulty===1?"#4ECDC4":l.difficulty===2?"#FFE66D":"#FF6B6B"):"rgba(255,255,255,0.1)" }} />)}
                          {done && <StarDisplay count={levelStars[l.id]||1} size={12} />}
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

      {/* ═══ COMPOUND PLAY ═══ */}
      {screen==="compound-play" && level && (
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
                <span key={el} style={{ padding:"2px 7px",borderRadius:7,fontWeight:700,fontSize:11,background:`${ELEMENTS[el].color}22`,color:ELEMENTS[el].color,border:`1px solid ${ELEMENTS[el].color}33` }}>
                  {c}×{el}{level.ions && level.ions[el] ? <sup style={{ fontSize:9 }}>{level.ions[el]}</sup> : ""}
                </span>
              ))}
              <span style={{ padding:"2px 8px",borderRadius:7,fontSize:10,fontWeight:700,
                background: level.bondType==="ionic" ? "rgba(93,173,226,0.15)" : "rgba(78,205,196,0.15)",
                color: level.bondType==="ionic" ? "#5DADE2" : "#4ECDC4",
                border: `1px solid ${level.bondType==="ionic" ? "#5DADE233" : "#4ECDC433"}`,
              }}>{level.bondType==="ionic" ? "⚡ ionic" : "🔗 covalent"}</span>
            </div>
          </div>
          <div ref={arenaRef} style={{ flex:1,position:"relative",borderRadius:20,background:"rgba(255,255,255,0.02)",border:"2px solid rgba(255,255,255,0.04)",overflow:"hidden",minHeight:160 }}>
            <div style={{ position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"22px 22px" }} />
            {toast && <Toast key={toast.key} type={toast.type} element={toast.element} needed={toast.needed} />}
            {atoms.map(a => <FloatingAtom key={a.id} atom={a} isDragging={draggingId===a.id} onPointerDown={handlePointerDown} arenaRef={arenaRef} shakeId={shakeId} ions={level.ions} />)}
            {showMolecule && <BouncingMolecule level={level} arenaRef={arenaRef} />}
          </div>
          <div ref={dropRef} style={{ marginTop:8,padding:"12px 10px 14px",borderRadius:18,flexShrink:0,background:"rgba(78,205,196,0.04)",border:"2px dashed rgba(78,205,196,0.18)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"glow-ring 3s ease-in-out infinite" }}>
            <span style={{ fontSize:10,color:"#4ECDC4aa",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase" }}>⬇ Drag atoms here ⬇</span>
            <div style={{ display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center" }}>
              {slotsArr.map((s,i) => <MoleculeSlot key={`${s.element}-${i}`} element={s.element} filled={s.filled} pulse={pulseSlot===s.element && s.filled} />)}
            </div>
          </div>
        </div>
      )}

      {/* ═══ COMPOUND RESULT ═══ */}
      {screen==="compound-result" && level && levelResult && (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",padding:"20px 16px",animation:"slide-in 0.5s ease-out",textAlign:"center",position:"relative",zIndex:1,overflowY:"auto" }}>
          {levelResult.won ? (<>
            <div style={{ fontSize:52,marginBottom:6,animation:"star-spin 0.8s ease-out" }}>🎉</div>
            <h2 style={{ fontSize:26,fontWeight:800,marginBottom:2 }}>You built {level.name}!</h2>
            <div style={{ fontSize:22,fontWeight:800,marginBottom:4,background:"linear-gradient(90deg,#FF6B6B,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{level.formula}</div>
            <div style={{ marginBottom:14 }}><StarDisplay count={levelResult.total >= 350 ? 3 : levelResult.total >= 200 ? 2 : 1} size={28} /></div>

            {/* ── COMPOUND CARD ── */}
            <div style={{ width:"100%",maxWidth:440,borderRadius:20,overflow:"hidden",marginBottom:18,
              background:"linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
            }}>
              {/* What is it? */}
              <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                  <span style={{ fontSize:18 }}>🏷️</span>
                  <span style={{ fontSize:13,fontWeight:700,color:"#4ECDC4",textTransform:"uppercase",letterSpacing:1 }}>What is it?</span>
                </div>
                <p style={{ fontSize:13,lineHeight:1.65,color:"#ffffffcc",textAlign:"left" }}>{level.whatIsIt}</p>
              </div>

              {/* Where do you find it? */}
              <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                  <span style={{ fontSize:18 }}>🌍</span>
                  <span style={{ fontSize:13,fontWeight:700,color:"#FFE66D",textTransform:"uppercase",letterSpacing:1 }}>Where do you find it?</span>
                </div>
                <p style={{ fontSize:13,lineHeight:1.65,color:"#ffffffcc",textAlign:"left" }}>{level.whereFound}</p>
              </div>

              {/* Danger Level */}
              <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                  <span style={{ fontSize:18 }}>⚠️</span>
                  <span style={{ fontSize:13,fontWeight:700,color: level.danger>=4?"#FF6B6B":level.danger>=3?"#FF8A65":level.danger>=2?"#FFE66D":"#4ECDC4",textTransform:"uppercase",letterSpacing:1 }}>
                    Danger Level
                  </span>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ fontSize:20, opacity: i<=level.danger?1:0.2, filter: i<=level.danger?"none":"grayscale(1)" }}>☠️</span>
                  ))}
                  <span style={{ marginLeft:6,fontSize:12,fontWeight:700,
                    color: level.danger>=4?"#FF6B6B":level.danger>=3?"#FF8A65":level.danger>=2?"#FFE66D":"#4ECDC4",
                  }}>
                    {level.danger===1?"Safe!":level.danger===2?"Mild Caution":level.danger===3?"Handle With Care":level.danger===4?"Dangerous!":"EXTREMELY Dangerous!"}
                  </span>
                </div>
                <p style={{ fontSize:12,lineHeight:1.55,color:"#ffffff99",textAlign:"left" }}>{level.dangerNote}</p>
              </div>

              {/* Mind Blower */}
              <div style={{ padding:"14px 18px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                  <span style={{ fontSize:18 }}>🤯</span>
                  <span style={{ fontSize:13,fontWeight:700,color:"#B39DDB",textTransform:"uppercase",letterSpacing:1 }}>Mind Blower</span>
                </div>
                <p style={{ fontSize:13,lineHeight:1.65,color:"#ffffffcc",textAlign:"left" }}>{level.mindBlower}</p>
              </div>
            </div>

            {/* Score breakdown */}
            <div style={{ padding:"14px 22px",borderRadius:14,marginBottom:20,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",minWidth:240,maxWidth:440,width:"100%",textAlign:"left" }}>
              {[{l:"Base",v:`+${levelResult.bp}`,c:"#ffffff99"},{l:`⏱ Time (${timeLeft}s)`,v:`+${levelResult.tb}`,c:"#4ECDC4"},
                levelResult.mp>0&&{l:`❌ Mistakes (${mistakes})`,v:`-${levelResult.mp}`,c:"#FF6B6B"},
                levelResult.sb>0&&{l:`🔥 Streak (${streak})`,v:`+${levelResult.sb}`,c:"#FFE66D"},
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
            <p style={{ color:"#ffffff55",fontSize:13,marginBottom:24 }}>Don't worry — try again!</p>
          </>)}
          <div style={{ display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
            {levelResult.won && currentLevel<COMPOUND_LEVELS.length-1 && (
              <button className="gbtn" onClick={() => startCompound(currentLevel+1)} style={{ padding:"14px 28px",borderRadius:16,background:"linear-gradient(135deg,#4ECDC4,#3DB8B0)",color:"#1a1a2e",fontSize:16,fontWeight:700,boxShadow:"0 5px 18px rgba(78,205,196,0.3)" }}>Next Level →</button>
            )}
            <button className="gbtn" onClick={() => {if(!levelResult.won) setStreak(0); startCompound(currentLevel);}} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>{levelResult.won?"Replay":"Try Again"}</button>
            <button className="gbtn" onClick={() => {if(!levelResult.won) setStreak(0); setScreen("compound-levels");}} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>All Levels</button>
          </div>
        </div>
      )}

      {/* ═══ ROCK LEVELS ═══ */}
      {screen==="rock-levels" && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:560,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
            <BackBtn onClick={() => setScreen("menu")} />
            <span style={{ color:"#FFE66D",fontWeight:700,fontSize:14 }}>⭐ {score}</span>
          </div>
          <h2 style={{ fontSize:24,fontWeight:800,marginBottom:4 }}>🏔️ Build Rocks & Minerals</h2>
          <p style={{ color:"#ffffff55",fontSize:13,marginBottom:18 }}>Combine compounds to form real rocks!</p>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {ROCK_LEVELS.map((r,i) => {
              const done = completedRocks.has(r.id);
              const ready = r.requiredCompounds.every(cid => completedCompounds.has(cid));
              return (
                <button key={i} className="gbtn card-hover" onClick={() => ready?startRock(i):null} style={{
                  display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 16px",borderRadius:16,textAlign:"left",
                  background: done?"rgba(179,157,219,0.1)":ready?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.015)",
                  border: done?"2px solid #B39DDB33":"2px solid rgba(255,255,255,0.05)",color:"#fff",
                  opacity:ready?1:0.5, cursor:ready?"pointer":"not-allowed",
                }}>
                  <span style={{ fontSize:28,flexShrink:0 }}>{r.emoji}</span>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:700,fontSize:15 }}>{r.name} <span style={{ color:"#ffffff44",fontSize:12,marginLeft:6 }}>{r.type}</span></div>
                    <div style={{ color:"#ffffff55",fontSize:11,marginTop:2 }}>
                      {r.requiredCompounds.map(cid => {
                        const c = COMPOUND_LEVELS.find(x=>x.id===cid); const have = completedCompounds.has(cid);
                        return <span key={cid} style={{ marginRight:6,color:have?"#4ECDC4":"#FF6B6Baa" }}>{have?"✅":"🔒"} {c?.name}</span>;
                      })}
                    </div>
                  </div>
                  {done && <span style={{ fontSize:18 }}>✅</span>}
                  {!ready && <span style={{ fontSize:10,color:"#FF6B6Baa",fontWeight:600 }}>Build compounds first!</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ ROCK PLAY ═══ */}
      {screen==="rock-play" && rock && (
        <div style={{ padding:20,animation:"slide-in 0.4s ease-out",maxWidth:520,margin:"0 auto",position:"relative",zIndex:1 }}>
          <BackBtn onClick={() => setScreen("rock-levels")} />
          <div style={{ textAlign:"center",marginTop:16,marginBottom:20 }}>
            <div style={{ fontSize:56,marginBottom:8 }}>{rock.emoji}</div>
            <h2 style={{ fontSize:26,fontWeight:800,marginBottom:4 }}>{rock.name}</h2>
            <span style={{ color:"#B39DDB",fontSize:13,fontWeight:600 }}>{rock.type}</span>
            <p style={{ color:"#ffffff88",fontSize:14,marginTop:10,lineHeight:1.6,maxWidth:400,margin:"10px auto 0" }}>{rock.description}</p>
          </div>
          <h3 style={{ fontSize:13,fontWeight:700,color:"#ffffff55",textTransform:"uppercase",letterSpacing:1.5,marginBottom:10 }}>Select the compounds that make this rock:</h3>
          <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:16 }}>
            {COMPOUND_LEVELS.filter(c => completedCompounds.has(c.id)).map(c => {
              const sel = !!rockSlots[c.id];
              return (
                <button key={c.id} className="gbtn" onClick={() => toggleRockSlot(c.id)} style={{
                  display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 16px",borderRadius:14,textAlign:"left",
                  background:sel?"rgba(179,157,219,0.15)":"rgba(255,255,255,0.03)",border:sel?"2px solid #B39DDB55":"2px solid rgba(255,255,255,0.06)",color:"#fff",
                }}>
                  <div style={{ width:28,height:28,borderRadius:8,border:sel?"2px solid #B39DDB":"2px solid rgba(255,255,255,0.15)",background:sel?"#B39DDB":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#1a1a2e",fontWeight:800,flexShrink:0,transition:"all 0.2s" }}>{sel?"✓":""}</div>
                  <span style={{ fontSize:20,flexShrink:0 }}>{c.emoji}</span>
                  <div><div style={{ fontWeight:700,fontSize:14 }}>{c.name}</div><div style={{ color:"#ffffff55",fontSize:12 }}>{c.formula}</div></div>
                </button>
              );
            })}
          </div>
          {rockResult && !rockResult.won && (
            <div style={{ padding:"10px 16px",borderRadius:12,background:"rgba(255,82,82,0.12)",border:"1px solid rgba(255,82,82,0.2)",marginBottom:12,fontSize:13,color:"#FF6B6B",textAlign:"center" }}>❌ Not quite! You need: <b>{rockResult.needed}</b></div>
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
            {!(rockResult&&rockResult.won) && (
              <button className="gbtn" onClick={submitRock} style={{ padding:"14px 32px",borderRadius:16,background:"linear-gradient(135deg,#B39DDB,#9575CD)",color:"#fff",fontSize:16,fontWeight:700,boxShadow:"0 5px 18px rgba(179,157,219,0.3)" }}>Check Answer</button>
            )}
            {rockResult&&rockResult.won&&currentRock<ROCK_LEVELS.length-1 && (
              <button className="gbtn" onClick={() => startRock(currentRock+1)} style={{ padding:"14px 28px",borderRadius:16,background:"linear-gradient(135deg,#B39DDB,#9575CD)",color:"#fff",fontSize:16,fontWeight:700 }}>Next Rock →</button>
            )}
            {rockResult&&rockResult.won && (
              <button className="gbtn" onClick={() => setScreen("rock-levels")} style={{ padding:"14px 28px",borderRadius:16,border:"2px solid rgba(255,255,255,0.1)",background:"transparent",color:"#fff",fontSize:16,fontWeight:700 }}>All Rocks</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
