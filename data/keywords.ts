// ============================================================
// SAIP — 500+ Keyword Intelligence Database
// Somali + English automotive search keywords
// ============================================================

export const CITIES = [
  "Hargeisa", "Berbera", "Burco", "Borama", "Gabiley",
  "Oodweyne", "Lughaye", "Zeila", "Sheikh", "Arabsiyo"
];

// Base keywords per category
const RAW_KEYWORDS = {
  vehicle_sales: {
    somali: [
      "gaadhi iib ah", "baabuur iib ah", "gaadhi cusub", "gaadhi isticmaal",
      "gaadhiyaasha iibka", "baaburrka iibka", "gaadhi rahan", "baabuur cusub",
      "gaadhi jaban", "gaadhi lacag yar", "baabuur mashquul ah",
      "gaadhi wanaagsan", "baabuur fiican", "gaadhi Toyota", "baabuur Honda",
      "gaadhi Nissan", "baabuur Hilux", "gaadhi Land Cruiser", "baabuur Vitz",
      "gaadhi Probox", "baabuur Harrier", "gaadhi Surf", "baabuur Prado",
      "gaadhi Noah", "baabuur Patrol", "gaadhi pickup", "baabuur SUV",
      "gaadhi 4x4", "baabuur diesel", "gaadhi Japan", "baabuur Dubai"
    ],
    english: [
      "car for sale", "used car", "vehicle for sale", "car sale Hargeisa",
      "second hand car", "imported car", "Japan car", "Dubai car",
      "Toyota for sale", "Honda for sale", "Nissan for sale", "Hilux for sale",
      "Land Cruiser for sale", "Probox for sale", "Prado for sale",
      "Vitz for sale", "Harrier for sale", "pickup truck", "SUV for sale",
      "4x4 for sale", "diesel car", "petrol car", "low mileage car",
      "good condition car", "clean car", "negotiable car price",
      "BE FORWARD import", "SBT Japan", "right hand drive", "dealership"
    ]
  },
  spare_parts: {
    somali: [
      "macdarka baabuurta", "qalabka baabuurta", "qaybaha baabuurta",
      "oil filter", "air filter", "spark plug", "brake pad baabuur",
      "brakka baabuurta", "feeraha baabuurta", "sheybaarka", "basbasada",
      "pump baabuur", "alternator", "battery baabuur", "istaaraha",
      "wiring baabuur", "sensor baabuur", "gearbox baabuur", "engine parts",
      "injection pump", "turbine baabuur", "radiator", "timing belt"
    ],
    english: [
      "car parts", "auto parts", "spare parts shop", "engine parts",
      "Toyota parts", "Honda parts", "Nissan parts", "Suzuki parts",
      "oil filter", "air filter", "brake pads", "brake discs",
      "shock absorbers", "clutch kit", "timing belt", "radiator",
      "alternator", "starter motor", "car battery", "car bulbs",
      "wiper blades", "power steering", "gearbox repair", "injection pump",
      "turbo parts", "exhaust parts", "suspension parts", "wheel bearings"
    ]
  },
  garage: {
    somali: [
      "geerash", "gajaan", "dayactir baabuur", "service baabuur",
      "saynisga baabuurta", "tiknishiyaan baabuur", "oilchange baabuur",
      "socodka baabuurka", "baabuur malaag", "check baabuur",
      "tyre fitting", "alignment baabuur", "balancing baabuur",
      "AC baabuur", "qabowjiyaha baabuurta", "electronics baabuur",
      "engine overhaul", "gearbox repair", "bodywork baabuur"
    ],
    english: [
      "auto repair", "car service", "mechanic shop", "auto workshop",
      "car garage", "oil change", "engine repair", "gearbox repair",
      "AC repair car", "car electrical", "diagnostic centre",
      "wheel alignment", "tyre fitting", "car inspection",
      "engine overhaul", "clutch replacement", "brake service",
      "MOT test", "annual service", "preventive maintenance"
    ]
  },
  car_wash: {
    somali: [
      "baabuur nadiifin", "car wash Hargeisa", "nadiifinta baabuurta",
      "baabuur dhaqid", "cleaning baabuur", "interior cleaning baabuur",
      "vacuum baabuur", "baabuur shine", "exterior wash", "full detail"
    ],
    english: [
      "car wash", "auto wash", "hand car wash", "full valet",
      "interior cleaning", "exterior wash", "car detailing station",
      "steam cleaning car", "pressure wash car", "mobile car wash"
    ]
  },
  detailing: {
    somali: [
      "nadiifinta baabuurta", "polish baabuur", "waxing baabuur",
      "ceramic coating", "paint protection", "interior restoration",
      "engine bay cleaning", "headlight restoration baabuur"
    ],
    english: [
      "auto detailing", "car detailing", "paint correction",
      "ceramic coating", "car polishing", "wax treatment",
      "interior detailing", "engine detailing", "headlight restoration",
      "paint protection film", "Hargeisa detailing", "mobile detailing"
    ]
  },
  body_repair: {
    somali: [
      "rinjiyeynta baabuurta", "dayactirka jirka baabuurta",
      "dab baabuur", "accident repair", "collision repair",
      "panel beating", "welding baabuur", "spray paint baabuur",
      "bumper repair", "dent removal", "baabuur paint"
    ],
    english: [
      "car body repair", "vehicle paint shop", "panel beating",
      "accident repair", "collision repair", "spray painting",
      "dent removal", "bumper repair", "car respray",
      "body shop Hargeisa", "auto body work", "rust repair car"
    ]
  },
  tires: {
    somali: [
      "taayir iib ah", "tayir cusub", "taayir isticmaal",
      "tayirka baabuurta", "flat tyre repair", "tyre shop",
      "tyre puncture", "summer tyres", "4x4 tyres", "truck tyres"
    ],
    english: [
      "tyre shop", "tire dealer", "new tyres", "used tyres",
      "tyre fitting", "wheel and tyre", "tyre rotation",
      "4WD tyres", "truck tyres", "run flat tyres",
      "Pirelli tyres", "Bridgestone tyres", "Michelin", "Continental"
    ]
  },
  fuel: {
    somali: [
      "benziin station", "gaas baabuur", "petrol Hargeisa",
      "diesel station", "fuel pump", "benziin cheap"
    ],
    english: [
      "fuel station", "petrol station", "diesel station",
      "gas station Hargeisa", "LPG gas", "CNG station"
    ]
  },
  dealer: {
    somali: [
      "gaadhi bixiye", "baabuur iibiye", "showroom baabuur",
      "car dealer Hargeisa", "gaadhi company", "baabuur agency"
    ],
    english: [
      "car dealer", "vehicle dealer", "car showroom",
      "authorized dealer", "car company Hargeisa",
      "vehicle importer", "car agency Somaliland"
    ]
  },
  broker: {
    somali: [
      "baabuur dalaad", "gaadhi dalaad", "commission car",
      "car agent Hargeisa", "vehicle broker", "middleman car"
    ],
    english: [
      "car broker", "vehicle broker", "car agent",
      "commission agent", "import agent Hargeisa",
      "Japan car agent", "Dubai car agent"
    ]
  }
};

// Generate all keyword combos
export function generateKeywords(): Array<{
  keyword: string;
  language: "somali" | "english";
  category: string;
  city?: string;
}> {
  const keywords: Array<{
    keyword: string;
    language: "somali" | "english";
    category: string;
    city?: string;
  }> = [];

  for (const [category, langs] of Object.entries(RAW_KEYWORDS)) {
    // Base keywords (no city)
    for (const kw of langs.somali) {
      keywords.push({ keyword: kw, language: "somali", category });
    }
    for (const kw of langs.english) {
      keywords.push({ keyword: kw, language: "english", category });
    }

    // City-specific combos
    for (const city of CITIES) {
      for (const kw of langs.english.slice(0, 5)) {
        keywords.push({ keyword: `${kw} ${city}`, language: "english", category, city });
        keywords.push({ keyword: `${kw} Somaliland`, language: "english", category, city });
      }
      for (const kw of langs.somali.slice(0, 3)) {
        keywords.push({ keyword: `${kw} ${city}`, language: "somali", category, city });
      }
    }
  }

  // Deduplicate
  const seen = new Set<string>();
  return keywords.filter(k => {
    if (seen.has(k.keyword)) return false;
    seen.add(k.keyword);
    return true;
  });
}

export const KEYWORDS = generateKeywords();

console.log(`✅ Generated ${KEYWORDS.length} keywords`);
