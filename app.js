/**
 * MeowQuest - Daily English RPG
 * Core Game Engine, Web Speech API, Audio Synthesizer, Dynamic Cat Avatar & State
 * Enhanced for Cat Lovers (ทาสแมว) with interactive petting, fur breeds, and rich animations.
 */

// ==========================================
// 1. STATE & STORAGE MANAGEMENT
// ==========================================
const STORAGE_KEY = "meowquest_save_data_v2";

// 20 Workplace Cat Titles for Thai Working Professionals
const WORKPLACE_TITLES = {
  1: "เด็กฝึกงานตาดำๆ 🍼 (Intern Kitten)",
  2: "น้องเหมียวทดลองงาน 📑 (Probation Kitty)",
  3: "พนักงานออฟฟิศมือใหม่ ☕ (Junior Office Cat)",
  4: "เจ้าหน้าที่ตอบอีเมลอินเตอร์ ✉️ (Email Specialist Cat)",
  5: "ผู้ช่วยจัดประชุมข้ามชาติ 📅 (Meeting Assistant Cat)",
  6: "นักแปลสรุปรายงานประจำสัปดาห์ 📊 (Weekly Report Analyst)",
  7: "ซีเนียร์เหมียวสายไฟแรง 🔥 (Senior Energetic Feline)",
  8: "มือโปรพรีเซนต์สไลด์อินเตอร์ 💻 (Global Slide Presenter)",
  9: "เจ้าแม่ต่อรองดีลการค้า 💼 (Deal Negotiator Cat)",
  10: "หัวหน้าทีมเจรจาข้ามวัฒนธรรม 🌐 (Cross-Cultural Team Lead)",
  11: "ผู้จัดการโปรเจกต์ระดับภูมิภาค 📋 (Regional Project Manager)",
  12: "หัวหน้านักสื่อสารองค์กร 🎙️ (Corporate Communications Lead)",
  13: "ผู้ช่วยผู้อำนวยการสาย Global 🏢 (Global Operations Director)",
  14: "นักวางกลยุทธ์ธุรกิจระดับสูง 📈 (Senior Business Strategist)",
  15: "รองประธานฝ่ายความร่วมมือสากล 🤝 (VP of Global Partnerships)",
  16: "ที่ปรึกษาบอร์ดบริหารข้ามชาติ 🧭 (Multinational Business Consultant)",
  17: "กรรมการผู้จัดการเหมียวอินเตอร์ 👔 (Managing Director Cat)",
  18: "ประธานเจ้าหน้าที่บริหารระดับโลก 🌟 (Global CEO Cat)",
  19: "ประธานบอร์ดบริหารสูงสุด 👑 (Executive Board Chairman)",
  20: "ท่านประธานเหมียวพันล้านแห่งกาแล็กซี 🪐✨ (Legendary Billionaire Chairman)"
};

const DEFAULT_STATE = {
  name: "Mimi",
  title: "เด็กฝึกงานตาดำๆ 🍼 (Intern Kitten)",
  furColor: "calico", // Default character is Japanese Calico (แมวสามสีนำโชค)
  petCount: 0,
  happiness: 100,
  hunger: 90,
  lastFedDate: "",
  level: 1,
  exp: 0,
  expToNext: 100,
  coins: 120,
  streak: 1,
  lastPlayedDate: getTodayDateString(),
  inventory: {
    breeds: ["calico"],
    hats: ["hat_straw"],
    outfits: ["outfit_hoodie"],
    weapons: ["wpn_fishbone"],
    vehicles: ["veh_box"],
    houses: ["house_box"]
  },
  equipped: {
    breed: "calico",
    hat: "hat_straw",
    outfit: "outfit_hoodie",
    weapon: "wpn_fishbone",
    vehicle: "veh_box",
    house: "house_box"
  },
  completedScenarios: {},
  dailyQuests: [],
  settings: {
    mode: "silent", // 'silent' (default) or 'voice'
    soundFx: true,
    ttsEnabled: true,
    speechRate: 0.95
  }
};

let gameState = loadGameState();
let isCatHappyTemp = false; // For temporary happy face during petting or correct answer

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("meowquest_save_data_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check daily streak
      const today = getTodayDateString();
      if (parsed.lastPlayedDate !== today) {
        const last = new Date(parsed.lastPlayedDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          parsed.streak = (parsed.streak || 1) + 1;
        } else if (diffDays > 1) {
          parsed.streak = 1;
        }
        parsed.lastPlayedDate = today;
        parsed.dailyQuests = generateDailyQuests();
      }
      if (parsed.title === "Novice Kitten" || !parsed.title || parsed.title.includes("Novice Kitten")) {
        parsed.title = WORKPLACE_TITLES[parsed.level || 1] || WORKPLACE_TITLES[1];
      }
      parsed.happiness = parsed.happiness ?? 100;
      parsed.hunger = parsed.hunger ?? 90;
      parsed.lastFedDate = parsed.lastFedDate || "";

      // Ensure breeds inventory exists and default to calico
      if (!parsed.inventory) parsed.inventory = {};
      if (!parsed.inventory.breeds) parsed.inventory.breeds = ["calico"];
      if (parsed.furColor === "orange" && !parsed.inventory.breeds.includes("orange_tabby") && !parsed.inventory.breeds.includes("orange")) {
        parsed.furColor = "calico";
      }
      if (!parsed.furColor) parsed.furColor = "calico";
      if (!parsed.equipped) parsed.equipped = {};
      parsed.equipped.breed = parsed.furColor;

      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load save state, using defaults:", e);
  }
  const fresh = { ...DEFAULT_STATE };
  fresh.dailyQuests = generateDailyQuests();
  return fresh;
}

function saveGameState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
  updateHUD();
}

function generateDailyQuests() {
  const shuffled = [...DAILY_QUEST_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).map((q) => ({
    ...q,
    completed: false,
    claimed: false
  }));
}

// ==========================================
// 2. SYNTHESIZED WEB AUDIO SOUND EFFECTS
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.15, volume = 0.15) {
    if (!gameState.settings.soundFx) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    this.playTone(850, "sine", 0.05, 0.08);
  }

  correct() {
    this.init();
    if (!gameState.settings.soundFx || !this.ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.2, 0.12), idx * 70);
    });
  }

  wrong() {
    this.init();
    if (!gameState.settings.soundFx || !this.ctx) return;
    [320, 240].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "sawtooth", 0.18, 0.09), idx * 120);
    });
  }

  coin() {
    this.init();
    if (!gameState.settings.soundFx || !this.ctx) return;
    this.playTone(987.77, "sine", 0.1, 0.12);
    setTimeout(() => this.playTone(1318.51, "sine", 0.25, 0.14), 80);
  }

  levelUp() {
    this.init();
    if (!gameState.settings.soundFx || !this.ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "square", 0.22, 0.1), idx * 110);
    });
  }

  // Synthesized Cat Meow sound for cat lovers!
  meow() {
    if (!gameState.settings.soundFx) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch glide: start ~460Hz -> climb to ~780Hz -> gently slide down to ~430Hz
      osc.type = "sine";
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(430, now + 0.38);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  // Synthesized Cat Purr (low rumbling vibration)
  purr() {
    if (!gameState.settings.soundFx) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(28, now);
      osc.frequency.linearRampToValueAtTime(32, now + 0.25);
      osc.frequency.linearRampToValueAtTime(26, now + 0.55);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    } catch (e) {}
  }
}
const sfx = new SoundFX();

// ==========================================
// 3. WEB SPEECH API (TTS & RECOGNITION)
// ==========================================
class SpeechController {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.isListening = false;
    this.bestVoice = null;
    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    const setVoice = () => {
      const voices = this.synth.getVoices();
      this.bestVoice =
        voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
        voices.find((v) => v.lang === "en-US") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        null;
    };
    setVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice;
    }
  }

  speak(text, onEnd) {
    if (!this.synth || !gameState.settings.ttsEnabled) {
      if (onEnd) onEnd();
      return;
    }
    this.synth.cancel(); // Stop any pending speech
    const utter = new SpeechSynthesisUtterance(text);
    if (this.bestVoice) utter.voice = this.bestVoice;
    utter.rate = gameState.settings.speechRate || 0.95;
    utter.pitch = 1.12; // Cheerful tone
    utter.onend = () => {
      if (onEnd) onEnd();
    };
    utter.onerror = () => {
      if (onEnd) onEnd();
    };
    this.synth.speak(utter);
  }

  initRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }
    this.recognition = new SpeechRec();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";
  }

  startListening(onResult, onError) {
    if (!this.recognition) {
      showToast("เบราว์เซอร์นี้ยังไม่รองรับระบบรับเสียงพูด แนะนำให้ใช้โหมดเงียบแทนครับ", "⚠️");
      if (onError) onError("Not supported");
      return;
    }
    if (this.isListening) return;

    this.isListening = true;
    sfx.click();

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      if (onError) onError(e.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}
const speech = new SpeechController();

// Fuzzy similarity matcher between spoken phrase and target phrases
function calculateMatchAccuracy(spoken, targets) {
  if (!spoken || !targets || targets.length === 0) return 0;
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  const cleanSpoken = clean(spoken);
  const spokenWords = new Set(cleanSpoken.split(/\s+/));

  let bestScore = 0;
  for (const target of targets) {
    const cleanTarget = clean(target);
    const targetWords = cleanTarget.split(/\s+/);
    if (targetWords.length === 0) continue;

    let matched = 0;
    for (const w of targetWords) {
      if (spokenWords.has(w)) matched++;
    }
    const tokenScore = (matched / targetWords.length) * 100;

    let finalScore = tokenScore;
    if (cleanSpoken === cleanTarget) {
      finalScore = 100;
    } else if (cleanTarget.includes(cleanSpoken) || cleanSpoken.includes(cleanTarget)) {
      finalScore = Math.max(finalScore, 85);
    }
    if (finalScore > bestScore) bestScore = finalScore;
  }
  return Math.round(bestScore);
}

// Mobile Haptic Touch Vibration Helper
function triggerHaptic(pattern = 20) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

// ==========================================
// 4. DYNAMIC SVG CAT AVATAR GENERATOR (ENHANCED FOR CAT LOVERS)
// ==========================================
function renderCatSvg(equipped = gameState.equipped, fur = gameState.furColor || "calico", isHappy = isCatHappyTemp) {
  // Fur palette definitions
  let bodyFill = "#ffffff";
  let bodyStroke = "#d7ccc8";
  let bellyFill = "#fffbf5";
  let innerEarFill = "#ffccd5";
  let eyeColor = "#d97706";
  let eyeSparkle = "#fbbf24";
  let pawFill = "#ffffff";
  let pawStroke = "#d7ccc8";
  let leftEarBaseFill = bodyFill;
  let rightEarBaseFill = bodyFill;
  let extraMarkings = "";

  if (fur === "calico") {
    // Japanese Calico Lucky Cat (Maneki-neko) - Default Character
    bodyFill = "#ffffff";
    bodyStroke = "#cfd8dc";
    bellyFill = "#fffbf5";
    innerEarFill = "#ffb6c1";
    eyeColor = "#d97706"; // Warm honey golden amber
    eyeSparkle = "#fcd34d";
    pawFill = "#ffffff";
    pawStroke = "#cfd8dc";
    leftEarBaseFill = "#37474f"; // Charcoal black left ear
    rightEarBaseFill = "#ff9800"; // Pastel orange right ear
    extraMarkings = `
      <!-- Calico Soft Face Patches -->
      <path d="M64,36 Q80,34 88,48 Q86,60 74,60 Q66,54 64,36 Z" fill="#ff9800" opacity="0.95"/>
      <path d="M32,46 Q40,32 50,38 Q48,50 36,54 Z" fill="#37474f" opacity="0.95"/>
      <!-- Chubby Pink Cheeks -->
      <ellipse cx="40" cy="62" rx="4.5" ry="3.2" fill="#ff80ab" opacity="0.65"/>
      <ellipse cx="80" cy="62" rx="4.5" ry="3.2" fill="#ff80ab" opacity="0.65"/>
      <!-- Body Calico Patches -->
      <path d="M68,80 Q84,78 82,94 Q72,96 68,88 Z" fill="#ff9800"/>
      <circle cx="44" cy="88" r="6.5" fill="#37474f"/>
    `;
  } else if (fur === "british_blue") {
    // British Shorthair (Classic Blue)
    bodyFill = "#78909c";
    bodyStroke = "#546e7a";
    bellyFill = "#90a4ae";
    innerEarFill = "#b0bec5";
    eyeColor = "#e67e22"; // Deep copper amber
    eyeSparkle = "#f39c12";
    pawFill = "#78909c";
    pawStroke = "#546e7a";
    leftEarBaseFill = "#78909c";
    rightEarBaseFill = "#78909c";
    extraMarkings = `
      <!-- British Shorthair Chubby Cheeks -->
      <ellipse cx="40" cy="62" rx="5" ry="3.5" fill="#ffb74d" opacity="0.3"/>
      <ellipse cx="80" cy="62" rx="5" ry="3.5" fill="#ffb74d" opacity="0.3"/>
    `;
  } else if (fur === "siamese") {
    // Royal Siamese (Wichienmaat)
    bodyFill = "#f5ebe1";
    bodyStroke = "#d7ccc8";
    bellyFill = "#ffffff";
    innerEarFill = "#4e342e";
    eyeColor = "#0288d1"; // Deep Sapphire Blue
    eyeSparkle = "#81d4fa";
    pawFill = "#4e342e";
    pawStroke = "#3e2723";
    leftEarBaseFill = "#4e342e";
    rightEarBaseFill = "#4e342e";
    extraMarkings = `
      <!-- Siamese Dark Face Mask -->
      <ellipse cx="60" cy="58" rx="19" ry="13" fill="#4e342e" opacity="0.95"/>
      <ellipse cx="41" cy="63" rx="4" ry="2.8" fill="#81d4fa" opacity="0.3"/>
      <ellipse cx="79" cy="63" rx="4" ry="2.8" fill="#81d4fa" opacity="0.3"/>
    `;
  } else if (fur === "scottish_fold") {
    // Scottish Fold (Cream Blonde Folded)
    bodyFill = "#ffe0b2";
    bodyStroke = "#ffb74d";
    bellyFill = "#fff8e1";
    innerEarFill = "#ffcc80";
    eyeColor = "#4e342e";
    eyeSparkle = "#ffa726";
    pawFill = "#fff8e1";
    pawStroke = "#ffb74d";
    leftEarBaseFill = "#ffa726";
    rightEarBaseFill = "#ffa726";
    extraMarkings = `
      <!-- Folded Ears caps -->
      <path d="M34,42 Q44,28 50,38" fill="#ffb74d" stroke="#e65100" stroke-width="1.8"/>
      <path d="M86,42 Q76,28 70,38" fill="#ffb74d" stroke="#e65100" stroke-width="1.8"/>
      <ellipse cx="40" cy="62" rx="4.5" ry="3" fill="#ff80ab" opacity="0.6"/>
      <ellipse cx="80" cy="62" rx="4.5" ry="3" fill="#ff80ab" opacity="0.6"/>
    `;
  } else if (fur === "khao_manee" || fur === "white") {
    // Khao Manee (Diamond Eye Thai White Cat)
    bodyFill = "#ffffff";
    bodyStroke = "#cfd8dc";
    bellyFill = "#ffffff";
    innerEarFill = "#ffcdd2";
    eyeColor = "#00b0ff"; // Odd eyes handled below
    eyeSparkle = "#80d8ff";
    pawFill = "#ffffff";
    pawStroke = "#b0bec5";
    leftEarBaseFill = "#ffffff";
    rightEarBaseFill = "#ffffff";
    extraMarkings = `
      <!-- Radiant Jewel Glisten -->
      <circle cx="60" cy="38" r="2" fill="#80d8ff" opacity="0.8"/>
      <ellipse cx="40" cy="62" rx="4" ry="2.8" fill="#ff80ab" opacity="0.5"/>
      <ellipse cx="80" cy="62" rx="4" ry="2.8" fill="#ff80ab" opacity="0.5"/>
    `;
  } else if (fur === "bengal") {
    // Bengal Leopard Cat
    bodyFill = "#ffa726";
    bodyStroke = "#e65100";
    bellyFill = "#fff3e0";
    innerEarFill = "#ff8f00";
    eyeColor = "#2e7d32"; // Emerald Jade
    eyeSparkle = "#66bb6a";
    pawFill = "#fff3e0";
    pawStroke = "#e65100";
    leftEarBaseFill = "#ffa726";
    rightEarBaseFill = "#ffa726";
    extraMarkings = `
      <!-- Leopard Spots & Rosettes -->
      <circle cx="70" cy="84" r="5" fill="#5d4037"/><circle cx="70" cy="84" r="2.5" fill="#ffb74d"/>
      <circle cx="48" cy="92" r="4.5" fill="#5d4037"/><circle cx="48" cy="92" r="2" fill="#ffb74d"/>
      <path d="M44,53 L38,62" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/>
      <path d="M76,53 L82,62" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/>
      <path d="M54,38 L60,44 L66,38" fill="none" stroke="#5d4037" stroke-width="2"/>
    `;
  } else if (fur === "persian" || fur === "pink") {
    // Persian Classic Fluff
    bodyFill = "#fff0e6";
    bodyStroke = "#ffccbc";
    bellyFill = "#ffffff";
    innerEarFill = "#ffab91";
    eyeColor = "#d84315";
    eyeSparkle = "#ff7043";
    pawFill = "#fff0e6";
    pawStroke = "#ffccbc";
    leftEarBaseFill = "#fff0e6";
    rightEarBaseFill = "#fff0e6";
    extraMarkings = `
      <!-- Persian Long Fluff Tufts -->
      <path d="M26,58 Q18,64 28,72 Q18,78 32,84" fill="#fff0e6" stroke="#ffccbc" stroke-width="1.8"/>
      <path d="M94,58 Q102,64 92,72 Q102,78 88,84" fill="#fff0e6" stroke="#ffccbc" stroke-width="1.8"/>
      <ellipse cx="40" cy="62" rx="5" ry="3.5" fill="#ff80ab" opacity="0.6"/>
      <ellipse cx="80" cy="62" rx="5" ry="3.5" fill="#ff80ab" opacity="0.6"/>
    `;
  } else if (fur === "orange_tabby" || fur === "orange") {
    // Orange Tabby
    bodyFill = "#ffa726";
    bodyStroke = "#f57c00";
    bellyFill = "#fff3e0";
    innerEarFill = "#ffab91";
    eyeColor = "#263238";
    eyeSparkle = "#00b0ff";
    pawFill = "#fff3e0";
    pawStroke = "#f57c00";
    leftEarBaseFill = "#ffa726";
    rightEarBaseFill = "#ffa726";
    extraMarkings = `
      <!-- Orange Tabby Stripes -->
      <line x1="60" y1="36" x2="60" y2="44" stroke="#e65100" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="53" y1="38" x2="55" y2="44" stroke="#e65100" stroke-width="2" stroke-linecap="round"/>
      <line x1="67" y1="38" x2="65" y2="44" stroke="#e65100" stroke-width="2" stroke-linecap="round"/>
      <path d="M36,52 Q42,50 40,54" stroke="#e65100" stroke-width="1.8" fill="none"/>
      <path d="M84,52 Q78,50 80,54" stroke="#e65100" stroke-width="1.8" fill="none"/>
    `;
  } else if (fur === "tuxedo") {
    // Tuxedo Cat
    bodyFill = "#212121";
    bodyStroke = "#101010";
    bellyFill = "#ffffff";
    innerEarFill = "#ffcdd2";
    pawFill = "#ffffff";
    pawStroke = "#cfd8dc";
    leftEarBaseFill = "#212121";
    rightEarBaseFill = "#212121";
    extraMarkings = `
      <!-- Tuxedo White Snout & Chest Bib -->
      <polygon points="60,54 53,64 67,64" fill="#ffffff"/>
      <ellipse cx="60" cy="94" rx="14" ry="16" fill="#ffffff"/>
    `;
  }

  // Hat graphics
  let hatSvg = "";
  if (equipped.hat === "hat_straw") {
    hatSvg = `
      <!-- Straw Hat -->
      <ellipse cx="60" cy="34" rx="36" ry="9" fill="#d7ccc8" stroke="#8d6e63" stroke-width="2"/>
      <ellipse cx="60" cy="27" rx="18" ry="12" fill="#ffe082" stroke="#8d6e63" stroke-width="2"/>
      <path d="M43,30 Q60,34 77,30" stroke="#f4511e" stroke-width="3" fill="none"/>
    `;
  } else if (equipped.hat === "hat_chef") {
    hatSvg = `
      <!-- Chef Hat -->
      <path d="M42,34 L78,34 L75,22 C80,18 78,8 60,8 C42,8 40,18 45,22 Z" fill="#ffffff" stroke="#90a4ae" stroke-width="2"/>
      <rect x="42" y="30" width="36" height="8" rx="2" fill="#eceff1" stroke="#90a4ae" stroke-width="1.5"/>
    `;
  } else if (equipped.hat === "hat_detective") {
    hatSvg = `
      <!-- Detective Cap -->
      <ellipse cx="60" cy="32" rx="26" ry="11" fill="#795548" stroke="#4e342e" stroke-width="2"/>
      <path d="M38,32 Q60,18 82,32" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
      <circle cx="60" cy="22" r="3" fill="#ffb74d"/>
    `;
  } else if (equipped.hat === "hat_wizard") {
    hatSvg = `
      <!-- Wizard Hat -->
      <polygon points="60,4 40,32 80,32" fill="#5e35b1" stroke="#311b92" stroke-width="2"/>
      <ellipse cx="60" cy="32" rx="30" ry="8" fill="#7e57c2" stroke="#311b92" stroke-width="2"/>
      <polygon points="60,14 62,18 66,18 63,21 64,25 60,23 56,25 57,21 54,18 58,18" fill="#ffd54f"/>
    `;
  } else if (equipped.hat === "hat_crown") {
    hatSvg = `
      <!-- Royal Crown -->
      <polygon points="42,32 40,16 50,24 60,12 70,24 80,16 78,32" fill="#ffd700" stroke="#b78103" stroke-width="2"/>
      <circle cx="40" cy="15" r="3" fill="#e91e63"/>
      <circle cx="60" cy="11" r="3.5" fill="#2196f3"/>
      <circle cx="80" cy="15" r="3" fill="#4caf50"/>
    `;
  }

  // Outfit graphics
  let outfitSvg = "";
  if (equipped.outfit === "outfit_hoodie") {
    outfitSvg = `
      <!-- Orange Hoodie -->
      <path d="M40,78 Q60,70 80,78 L84,106 Q60,112 36,106 Z" fill="#ff7043" stroke="#d84315" stroke-width="2"/>
      <path d="M52,77 L60,88 L68,77" fill="none" stroke="#ffffff" stroke-width="2.5"/>
    `;
  } else if (equipped.outfit === "outfit_apron") {
    outfitSvg = `
      <!-- Barista Apron -->
      <path d="M44,78 L76,78 L80,108 L40,108 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/>
      <line x1="44" y1="78" x2="36" y2="86" stroke="#ffffff" stroke-width="2"/>
      <line x1="76" y1="78" x2="84" y2="86" stroke="#ffffff" stroke-width="2"/>
      <rect x="52" y="90" width="16" height="12" rx="2" fill="#ffffff" opacity="0.3"/>
    `;
  } else if (equipped.outfit === "outfit_trench") {
    outfitSvg = `
      <!-- Trench Coat -->
      <path d="M38,76 L82,76 L86,110 L34,110 Z" fill="#a1887f" stroke="#5d4037" stroke-width="2"/>
      <line x1="60" y1="76" x2="60" y2="110" stroke="#5d4037" stroke-width="2"/>
      <circle cx="56" cy="88" r="2.5" fill="#4e342e"/>
      <circle cx="56" cy="98" r="2.5" fill="#4e342e"/>
    `;
  } else if (equipped.outfit === "outfit_cyber") {
    outfitSvg = `
      <!-- Cyber Neon Suit -->
      <path d="M38,76 L82,76 L84,108 L36,108 Z" fill="#212121" stroke="#00e5ff" stroke-width="2"/>
      <line x1="48" y1="80" x2="72" y2="80" stroke="#ff007f" stroke-width="2"/>
      <line x1="60" y1="84" x2="60" y2="104" stroke="#00e5ff" stroke-width="2.5"/>
    `;
  } else if (equipped.outfit === "outfit_tuxedo") {
    outfitSvg = `
      <!-- Tuxedo -->
      <path d="M38,76 L82,76 L84,108 L36,108 Z" fill="#263238" stroke="#102027" stroke-width="2"/>
      <polygon points="52,76 60,94 68,76" fill="#ffffff"/>
      <polygon points="56,80 64,80 60,85" fill="#d32f2f"/>
    `;
  }

  // Weapon / Held item graphics
  let weaponSvg = "";
  if (equipped.weapon === "wpn_fishbone") {
    weaponSvg = `
      <!-- Lucky Fishbone -->
      <g transform="translate(86, 75) rotate(-15)">
        <line x1="0" y1="15" x2="28" y2="15" stroke="#ffa000" stroke-width="3"/>
        <line x1="8" y1="8" x2="8" y2="22" stroke="#ffa000" stroke-width="2"/>
        <line x1="16" y1="10" x2="16" y2="20" stroke="#ffa000" stroke-width="2"/>
        <polygon points="26,15 34,9 34,21" fill="#ffa000"/>
        <circle cx="2" cy="15" r="4" fill="#ffa000"/>
      </g>
    `;
  } else if (equipped.weapon === "wpn_cup") {
    weaponSvg = `
      <!-- Coffee Cup -->
      <g transform="translate(86, 76)">
        <rect x="0" y="4" width="16" height="20" rx="3" fill="#ffffff" stroke="#795548" stroke-width="2"/>
        <path d="M16,9 Q22,14 16,19" fill="none" stroke="#795548" stroke-width="2"/>
        <path d="M4,1 Q6,-4 8,0 Q10,-4 12,0" fill="none" stroke="#b0bec5" stroke-width="1.5"/>
      </g>
    `;
  } else if (equipped.weapon === "wpn_quill") {
    weaponSvg = `
      <!-- Magic Quill -->
      <g transform="translate(86, 70) rotate(-25)">
        <path d="M0,30 Q10,15 5,0 Q20,10 10,30 Z" fill="#9c27b0" stroke="#4a148c" stroke-width="1.5"/>
        <polygon points="2,30 4,36 6,30" fill="#ffd700"/>
      </g>
    `;
  } else if (equipped.weapon === "wpn_mic") {
    weaponSvg = `
      <!-- Golden Mic -->
      <g transform="translate(86, 72) rotate(-10)">
        <rect x="2" y="0" width="10" height="16" rx="5" fill="#ffd700" stroke="#ff8f00" stroke-width="1.5"/>
        <rect x="5" y="16" width="4" height="18" fill="#424242"/>
        <circle cx="7" cy="35" r="4" fill="#ffd700"/>
      </g>
    `;
  } else if (equipped.weapon === "wpn_scepter") {
    weaponSvg = `
      <!-- Catnip Scepter -->
      <g transform="translate(86, 60) rotate(-10)">
        <line x1="6" y1="12" x2="6" y2="44" stroke="#ffd700" stroke-width="3"/>
        <circle cx="6" cy="8" r="8" fill="#4caf50" stroke="#ffd700" stroke-width="2"/>
        <circle cx="6" cy="8" r="3" fill="#ffffff"/>
      </g>
    `;
  }

  // Vehicle graphics
  let vehicleBackSvg = "";
  let vehicleFrontSvg = "";
  if (equipped.vehicle === "veh_box") {
    vehicleFrontSvg = `
      <!-- Box Kart -->
      <rect x="26" y="100" width="68" height="20" rx="3" fill="#d7ccc8" stroke="#8d6e63" stroke-width="2"/>
      <circle cx="38" cy="120" r="5" fill="#424242" stroke="#212121" stroke-width="1.5"/>
      <circle cx="82" cy="120" r="5" fill="#424242" stroke="#212121" stroke-width="1.5"/>
      <text x="34" y="114" font-size="7.5" font-weight="bold" fill="#5d4037">MEOW EXPRESS</text>
    `;
  } else if (equipped.vehicle === "veh_skate") {
    vehicleFrontSvg = `
      <!-- Skateboard -->
      <rect x="20" y="112" width="80" height="6" rx="3" fill="#ff5722" stroke="#bf360c" stroke-width="1.5"/>
      <circle cx="34" cy="120" r="4" fill="#ffd54f"/>
      <circle cx="86" cy="120" r="4" fill="#ffd54f"/>
    `;
  } else if (equipped.vehicle === "veh_roomba") {
    vehicleFrontSvg = `
      <!-- Roomba Vacuum -->
      <ellipse cx="60" cy="114" rx="44" ry="10" fill="#37474f" stroke="#263238" stroke-width="2"/>
      <circle cx="60" cy="112" r="4" fill="#00e676"/>
    `;
  } else if (equipped.vehicle === "veh_cloud") {
    vehicleBackSvg = `
      <!-- Magical Cloud -->
      <ellipse cx="60" cy="116" rx="46" ry="14" fill="#e1f5fe" stroke="#81d4fa" stroke-width="2"/>
      <circle cx="40" cy="112" r="14" fill="#e1f5fe"/>
      <circle cx="75" cy="110" r="16" fill="#e1f5fe"/>
    `;
  } else if (equipped.vehicle === "veh_ufo") {
    vehicleFrontSvg = `
      <!-- Alien UFO -->
      <ellipse cx="60" cy="112" rx="48" ry="12" fill="#7e57c2" stroke="#512da8" stroke-width="2"/>
      <ellipse cx="60" cy="106" rx="26" ry="8" fill="#b388ff" opacity="0.6"/>
      <circle cx="35" cy="113" r="2.5" fill="#00e5ff"/>
      <circle cx="60" cy="115" r="2.5" fill="#00e5ff"/>
      <circle cx="85" cy="113" r="2.5" fill="#00e5ff"/>
    `;
  }

  // Eyes and Mouth logic: Happy vs Regular Blinking
  let eyesAndMouthSvg = "";
  let leftEyeColor = eyeColor;
  let leftEyeSparkle = eyeSparkle;
  let rightEyeColor = eyeColor;
  let rightEyeSparkle = eyeSparkle;

  if (fur === "khao_manee" || fur === "white") {
    // Odd Eyes (Diamond Eye Khao Manee): Left = Ocean Sapphire Blue, Right = Emerald Green
    leftEyeColor = "#00b0ff";
    leftEyeSparkle = "#80d8ff";
    rightEyeColor = "#00e676";
    rightEyeSparkle = "#b9f6ca";
  }

  if (isHappy) {
    // Cute closed smiling eyes (^ ^) and happy open mouth
    eyesAndMouthSvg = `
      <!-- Happy Smiling Eyes -->
      <path d="M42,56 Q48,48 54,56" fill="none" stroke="#263238" stroke-width="3" stroke-linecap="round"/>
      <path d="M66,56 Q72,48 78,56" fill="none" stroke="#263238" stroke-width="3" stroke-linecap="round"/>
      <!-- Cheerful Open Mouth with tongue -->
      <polygon points="60,60 57,58 63,58" fill="#ff4081"/>
      <path d="M54,63 Q60,71 66,63 Z" fill="#e91e63" stroke="#5d4037" stroke-width="1.5"/>
      <circle cx="60" cy="67" r="2.5" fill="#ff80ab"/>
    `;
  } else {
    // Big sparkly anime eyes with blink animation (Supports Odd Eyes)
    eyesAndMouthSvg = `
      <!-- Big Sparkly Anime Eyes -->
      <g class="cat-animated-eyes">
        <ellipse cx="48" cy="54" rx="5.5" ry="7" fill="${leftEyeColor}"/>
        <circle cx="46.5" cy="52" r="2.2" fill="#ffffff"/>
        <circle cx="50" cy="56.5" r="1.1" fill="${leftEyeSparkle}"/>

        <ellipse cx="72" cy="54" rx="5.5" ry="7" fill="${rightEyeColor}"/>
        <circle cx="70.5" cy="52" r="2.2" fill="#ffffff"/>
        <circle cx="74" cy="56.5" r="1.1" fill="${rightEyeSparkle}"/>
      </g>
      <!-- Cute :3 Cat Mouth -->
      <polygon points="60,60 57,58 63,58" fill="#ff4081"/>
      <path d="M55,62 Q60,66 60,62 Q60,66 65,62" fill="none" stroke="#5d4037" stroke-width="1.8" stroke-linecap="round"/>
    `;
  }

  return `
    <svg viewBox="0 0 120 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="catBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff4081" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#ff4081" stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${vehicleBackSvg}

      <!-- Cat Animated Tail -->
      <g class="cat-animated-tail">
        <path d="M35,92 Q12,85 15,64 Q21,60 23,68 Q20,82 38,87" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="2.2"/>
      </g>

      <!-- Cat Body & Breathing -->
      <g class="cat-animated-body">
        <!-- Body base -->
        <ellipse cx="60" cy="88" rx="27" ry="22" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="2.5"/>
        
        <!-- Fluffy Belly Spot -->
        <ellipse cx="60" cy="92" rx="16" ry="14" fill="${bellyFill}"/>

        <!-- Outfit (Torso layer) -->
        ${outfitSvg}

        <!-- Fluffy Chest Collar -->
        <path d="M52,74 Q60,82 68,74 Q60,70 52,74 Z" fill="${bellyFill}" opacity="0.9"/>

        <!-- Cat Left Ear with Twitch Animation -->
        <g class="cat-animated-ear-l">
          <polygon points="34,44 42,18 54,38" fill="${leftEarBaseFill}" stroke="${bodyStroke}" stroke-width="2"/>
          <polygon points="38,41 43,24 50,37" fill="${innerEarFill}"/>
          <!-- Ear tuft fluff -->
          <line x1="39" y1="36" x2="43" y2="34" stroke="${bellyFill}" stroke-width="1.5"/>
          <line x1="40" y1="39" x2="45" y2="38" stroke="${bellyFill}" stroke-width="1.5"/>
        </g>

        <!-- Cat Right Ear with Twitch Animation -->
        <g class="cat-animated-ear-r">
          <polygon points="86,44 78,18 66,38" fill="${rightEarBaseFill}" stroke="${bodyStroke}" stroke-width="2"/>
          <polygon points="82,41 77,24 70,37" fill="${innerEarFill}"/>
          <!-- Ear tuft fluff -->
          <line x1="81" y1="36" x2="77" y2="34" stroke="${bellyFill}" stroke-width="1.5"/>
          <line x1="80" y1="39" x2="75" y2="38" stroke="${bellyFill}" stroke-width="1.5"/>
        </g>

        <!-- Cat Head (Cute Chubby Cheeks) -->
        <ellipse cx="60" cy="54" rx="29" ry="22" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="2.5"/>
        
        <!-- Fluffy Cheek Tufts -->
        <path d="M31,56 Q27,58 32,62 Q28,64 34,66" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1.8"/>
        <path d="M89,56 Q93,58 88,62 Q92,64 86,66" fill="${bodyFill}" stroke="${bodyStroke}" stroke-width="1.8"/>

        <!-- Extra Breed Markings -->
        ${extraMarkings}

        <!-- Eyes & Mouth -->
        ${eyesAndMouthSvg}

        <!-- Rosy Cheeks Blush -->
        <circle cx="41" cy="61" r="5.5" fill="url(#catBlush)"/>
        <circle cx="79" cy="61" r="5.5" fill="url(#catBlush)"/>

        <!-- Whiskers -->
        <line x1="37" y1="58" x2="19" y2="55" stroke="#795548" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="36" y1="63" x2="18" y2="64" stroke="#795548" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="83" y1="58" x2="101" y2="55" stroke="#795548" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="84" y1="63" x2="102" y2="64" stroke="#795548" stroke-width="1.4" stroke-linecap="round"/>

        <!-- Paws with Pink Jellybean Pads (อุ้งเท้าเจลลี่ชมพู!) -->
        <g class="cat-left-paw">
          <ellipse cx="44" cy="98" rx="8" ry="6" fill="${pawFill}" stroke="${pawStroke}" stroke-width="1.6"/>
          <!-- Pink center pad -->
          <ellipse cx="44" cy="98" rx="3.5" ry="2.6" fill="#ff80ab"/>
          <!-- Toe beans -->
          <circle cx="41" cy="94" r="1.3" fill="#ff80ab"/>
          <circle cx="44" cy="93" r="1.3" fill="#ff80ab"/>
          <circle cx="47" cy="94" r="1.3" fill="#ff80ab"/>
        </g>
        <g class="cat-right-paw">
          <ellipse cx="76" cy="98" rx="8" ry="6" fill="${pawFill}" stroke="${pawStroke}" stroke-width="1.6"/>
          <!-- Pink center pad -->
          <ellipse cx="76" cy="98" rx="3.5" ry="2.6" fill="#ff80ab"/>
          <!-- Toe beans -->
          <circle cx="73" cy="94" r="1.3" fill="#ff80ab"/>
          <circle cx="76" cy="93" r="1.3" fill="#ff80ab"/>
          <circle cx="79" cy="94" r="1.3" fill="#ff80ab"/>
        </g>

        <!-- Hat (Equipped layer) -->
        ${hatSvg}

        <!-- Weapon / Held Item -->
        ${weaponSvg}

        <!-- Vehicle Foreground -->
        ${vehicleFrontSvg}
      </g>
    </svg>
  `;
}

// Refresh all Cat SVG instances on page
function refreshCatAvatars() {
  const previewDiv = document.getElementById("cat-preview-render");
  if (previewDiv) previewDiv.innerHTML = renderCatSvg();

  const stageCharDiv = document.getElementById("stage-cat-avatar");
  if (stageCharDiv) stageCharDiv.innerHTML = renderCatSvg();

  const heroAvatar = document.getElementById("hero-cat-avatar-render");
  if (heroAvatar) heroAvatar.innerHTML = renderCatSvg();

  const hudMiniAvatar = document.getElementById("hud-cat-avatar-mini");
  if (hudMiniAvatar) hudMiniAvatar.innerHTML = renderCatSvg();

  const vocabMiniAvatar = document.getElementById("vocab-cat-avatar-mini");
  if (vocabMiniAvatar) vocabMiniAvatar.innerHTML = renderCatSvg();

  const miniAvatars = document.querySelectorAll(".cat-avatar-mini");
  miniAvatars.forEach((el) => {
    el.innerHTML = renderCatSvg();
  });
}

// Interactive Cat Petting / Tap Reaction
const CAT_PET_PHRASES = [
  "Purrrrr... (ฟี้ๆ มีความสุขจังมนุษย์) ❤️",
  "Nyaa~ พร้อมลุยด่านภาษาอังกฤษแล้วเมี๊ยว! ✨",
  "Meow! เกาคางตรงนั้นฟินที่สุดเลยงับ 🐾",
  "Purr... You're the best hooman ever! 🌟",
  "Let's practice speaking English together! 📚",
  "Meow! ภาษาอังกฤษไม่ยากถ้ามีเราอยู่ด้วย! 😺",
  "เพอร์... วันนี้ท่องศัพท์โทอิคกันรึยังน้านุด? 💼"
];

function triggerCatPet(e) {
  gameState.petCount = (gameState.petCount || 0) + 1;
  gameState.happiness = Math.min(100, (gameState.happiness || 85) + 5);
  triggerHaptic([30, 40, 30]);

  // Alternate between purr and sweet meow
  if (Math.random() > 0.4) {
    sfx.purr();
  } else {
    sfx.meow();
  }

  // Temporary happy face
  isCatHappyTemp = true;
  refreshCatAvatars();
  clearTimeout(triggerCatPet._happyTimeout);
  triggerCatPet._happyTimeout = setTimeout(() => {
    isCatHappyTemp = false;
    refreshCatAvatars();
  }, 1600);

  // Show cute thought bubble on both Wardrobe and Hero Card
  const randomPhrase = CAT_PET_PHRASES[Math.floor(Math.random() * CAT_PET_PHRASES.length)];
  const bubbleWardrobe = document.getElementById("cat-pet-speech-bubble");
  if (bubbleWardrobe) {
    bubbleWardrobe.textContent = randomPhrase;
    bubbleWardrobe.style.display = "block";
  }
  const bubbleHero = document.getElementById("hero-cat-speech-bubble");
  if (bubbleHero) {
    bubbleHero.dataset.petting = "true";
    bubbleHero.textContent = randomPhrase;
    bubbleHero.style.display = "block";
  }
  clearTimeout(triggerCatPet._bubbleTimeout);
  triggerCatPet._bubbleTimeout = setTimeout(() => {
    if (bubbleWardrobe) bubbleWardrobe.style.display = "none";
    if (bubbleHero) {
      delete bubbleHero.dataset.petting;
      bubbleHero.textContent = `"สวัสดีฮะน้านุด! วันนี้ ${gameState.name} มีฉายา '${gameState.title}' สู้ชีวิตไปด้วยกันนะเหมียว~ 🐾"`;
    }
  }, 3200);

  // Spawn floating heart particles
  spawnFloatingHearts(e);

  saveGameState();
}

function spawnFloatingHearts(e) {
  const targetArea = document.getElementById("hero-cat-living-space") || document.getElementById("cat-living-space-area") || document.body;
  const rect = targetArea.getBoundingClientRect();

  const x = e ? e.clientX - rect.left : rect.width / 2;
  const y = e ? e.clientY - rect.top : rect.height / 2;

  const particles = ["💖", "🐾", "✨", "❤️", "🐱"];
  for (let i = 0; i < 4; i++) {
    const heart = document.createElement("span");
    heart.className = "cat-floating-particle";
    heart.textContent = particles[Math.floor(Math.random() * particles.length)];
    heart.style.left = `${Math.max(20, Math.min(rect.width - 40, x + (Math.random() * 40 - 20)))}px`;
    heart.style.top = `${Math.max(20, Math.min(rect.height - 40, y + (Math.random() * 20 - 10)))}px`;
    heart.style.setProperty("--rand-x", `${(Math.random() - 0.5) * 80}px`);

    targetArea.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
}

// Interactive Feeding Mechanic (ป้อนขนมแมวเลีย / ปลาทู)
function feedCatTreat(e) {
  sfx.init();
  const today = getTodayDateString();
  const isFreeDailyTreat = gameState.lastFedDate !== today;

  if (!isFreeDailyTreat && gameState.coins < 5) {
    showToast("เหรียญ PawCoins ไม่พอซื้อขนมแมวเลีย (ต้องใช้ 5 🪙 หรือรอรับฟรีพรุ่งนี้)!", "⚠️");
    sfx.buzzer();
    return;
  }

  if (isFreeDailyTreat) {
    gameState.lastFedDate = today;
    showToast(`🐟 ป้อนขนมฟรีประจำวันให้ ${gameState.name} แล้ว! +15 EXP และอิ่มแปล้ 100%!`, "🎉");
  } else {
    gameState.coins -= 5;
    showToast(`🐟 ใช้ 5 🪙 ซื้อขนมแมวเลียให้ ${gameState.name}! +15 EXP และอิ่มแปล้ 100%!`, "✨");
  }

  gameState.hunger = 100;
  gameState.happiness = 100;
  gainExpAndCoins(15, 0);

  triggerHaptic([50, 60, 50]);
  sfx.coin();

  isCatHappyTemp = true;
  refreshCatAvatars();
  setTimeout(() => {
    isCatHappyTemp = false;
    refreshCatAvatars();
  }, 2200);

  // Thought bubble
  const treatPhrases = [
    `"งั่มๆๆ ปลาทูอร่อยที่สุดในสามโลกเลยงับทาส! 🐟✨"`,
    `"ฟินมากกก! ${gameState.name} มีพลังเต็มเปี่ยม พร้อมพิชิตด่านภาษาอังกฤษแล้ว! 🐾"`,
    `"งั่มๆ ขนมแมวเลียคือเดอะเบสต์! ขอบคุณนะน้านุด! 💖"`
  ];
  const phrase = treatPhrases[Math.floor(Math.random() * treatPhrases.length)];
  const bubbleHero = document.getElementById("hero-cat-speech-bubble");
  if (bubbleHero) {
    bubbleHero.textContent = phrase;
  }
  const bubbleWardrobe = document.getElementById("cat-pet-speech-bubble");
  if (bubbleWardrobe) {
    bubbleWardrobe.textContent = phrase;
    bubbleWardrobe.style.display = "block";
  }

  // Floating food/heart particles
  spawnFeedParticles(e);
  saveGameState();
}

function spawnFeedParticles(e) {
  const targetArea = document.getElementById("hero-cat-living-space") || document.getElementById("cat-living-space-area") || document.body;
  const rect = targetArea.getBoundingClientRect();
  const x = e ? e.clientX - rect.left : rect.width / 2;
  const y = e ? e.clientY - rect.top : rect.height / 2;

  const particles = ["🐟", "✨", "💖", "🍪", "🐾"];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("span");
    p.className = "cat-floating-particle";
    p.textContent = particles[Math.floor(Math.random() * particles.length)];
    p.style.left = `${Math.max(20, Math.min(rect.width - 40, x + (Math.random() * 50 - 25)))}px`;
    p.style.top = `${Math.max(20, Math.min(rect.height - 40, y + (Math.random() * 30 - 15)))}px`;
    p.style.setProperty("--rand-x", `${(Math.random() - 0.5) * 80}px`);

    targetArea.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

// ==========================================
// 5. HUD, LEVELING & PROGRESSION
// ==========================================
function updateHUD() {
  document.getElementById("hud-level-text").textContent = `Lv. ${gameState.level}`;
  document.getElementById("hud-exp-current").textContent = gameState.exp;
  document.getElementById("hud-exp-max").textContent = gameState.expToNext;

  const expPct = Math.min(100, Math.round((gameState.exp / gameState.expToNext) * 100));
  document.getElementById("hud-exp-fill").style.width = `${expPct}%`;

  document.getElementById("hud-coins-text").textContent = gameState.coins;
  document.getElementById("hud-streak-text").textContent = `${gameState.streak} วัน`;

  // Mini HUD Cat Pill in sticky header
  const hudCatName = document.getElementById("hud-cat-name");
  if (hudCatName) hudCatName.textContent = gameState.name;
  const hudCatTitle = document.getElementById("hud-cat-title");
  if (hudCatTitle) hudCatTitle.textContent = gameState.title;

  // Hero Sanctuary Card Updates (Home screen)
  const heroName = document.getElementById("hero-cat-name-display");
  if (heroName) heroName.textContent = gameState.name;
  const heroTitle = document.getElementById("hero-cat-title-badge");
  if (heroTitle) heroTitle.textContent = gameState.title;
  const heroLvl = document.getElementById("hero-cat-current-lvl");
  if (heroLvl) heroLvl.textContent = gameState.level;

  const nextTitle = WORKPLACE_TITLES[gameState.level + 1] || "ท่านประธานระดับสูงสุด 🪐✨";
  const heroNextTitle = document.getElementById("hero-cat-next-title");
  if (heroNextTitle) {
    heroNextTitle.textContent = gameState.level >= 20 ? "ตำแหน่งสูงสุดแล้ว 👑" : `${nextTitle} (Lv. ${gameState.level + 1})`;
  }

  const expNeeded = Math.max(0, gameState.expToNext - gameState.exp);
  const heroExpNeeded = document.getElementById("hero-career-exp-needed");
  if (heroExpNeeded) {
    heroExpNeeded.textContent = `${expNeeded} EXP`;
  }

  const heroCareerFill = document.getElementById("hero-career-progress-fill");
  if (heroCareerFill) {
    heroCareerFill.style.width = `${expPct}%`;
  }

  const heroStreak = document.getElementById("hero-cat-streak-badge");
  if (heroStreak) {
    heroStreak.textContent = `🔥 ไฟขยัน ${gameState.streak} วัน`;
  }

  const heroHappinessVal = document.getElementById("hero-cat-happiness-val");
  if (heroHappinessVal) heroHappinessVal.textContent = `${gameState.happiness || 100}%`;
  const heroHappinessFill = document.getElementById("hero-cat-happiness-fill");
  if (heroHappinessFill) heroHappinessFill.style.width = `${gameState.happiness || 100}%`;

  const heroHungerVal = document.getElementById("hero-cat-hunger-val");
  if (heroHungerVal) heroHungerVal.textContent = `${gameState.hunger || 90}%`;
  const heroHungerFill = document.getElementById("hero-cat-hunger-fill");
  if (heroHungerFill) heroHungerFill.style.width = `${gameState.hunger || 90}%`;

  const breedNames = {
    calico: "แมวสามสีนำโชค 🐾",
    british_blue: "บริติช ช็อตแฮร์ 🐱‍👤",
    siamese: "วิเชียรมาศ ☕",
    scottish_fold: "สก็อตติช โฟลด์ 😺",
    khao_manee: "ขาวมณีตาสองสี 🤍",
    bengal: "เบงกอลเสือดาว 🐆",
    persian: "เปอร์เซียขนฟู 👑",
    orange_tabby: "ส้มแท็บบี้ 🍊",
    orange: "ส้มแท็บบี้ 🍊",
    tuxedo: "ทักซิโด้ 🎩",
    white: "ขาวมณีตาสองสี 🤍",
    pink: "เปอร์เซียขนฟู 👑"
  };
  const heroBreed = document.getElementById("hero-cat-breed-badge");
  if (heroBreed) {
    heroBreed.textContent = breedNames[gameState.furColor] || "แมวสามสีนำโชค 🐾";
  }

  const heroSpeech = document.getElementById("hero-cat-speech-bubble");
  if (heroSpeech && !heroSpeech.dataset.petting) {
    heroSpeech.textContent = `"สวัสดีฮะน้านุด! วันนี้ ${gameState.name} มีฉายา '${gameState.title}' สู้ชีวิตไปด้วยกันนะเหมียว~ 🐾"`;
  }

  const stageBadge = document.getElementById("stage-cat-char-badge");
  if (stageBadge) {
    stageBadge.textContent = `🐱 ${gameState.name} • ${gameState.title}`;
  }

  const vocabCheerName = document.getElementById("vocab-cat-cheer-name");
  if (vocabCheerName) vocabCheerName.textContent = gameState.name;

  const nameEl = document.getElementById("cat-name-display");
  if (nameEl && document.activeElement !== nameEl) {
    nameEl.value = gameState.name;
  }
  const titleEl = document.getElementById("cat-title-display");
  if (titleEl) titleEl.textContent = gameState.title;

  const silentBtn = document.getElementById("btn-mode-silent");
  const voiceBtn = document.getElementById("btn-mode-voice");
  if (silentBtn && voiceBtn) {
    if (gameState.settings.mode === "voice") {
      voiceBtn.classList.add("active");
      silentBtn.classList.remove("active");
    } else {
      silentBtn.classList.add("active");
      voiceBtn.classList.remove("active");
    }
  }

  // Render Adopted Breeds List & Squad Living Lounge
  renderAdoptedBreeds();
  renderCatSquadLounge();

  const currentHouse = SHOP_CATALOG.houses.find((h) => h.id === gameState.equipped.house);
  const houseDecor = document.getElementById("house-decor-icon");
  if (houseDecor && currentHouse) {
    houseDecor.textContent = currentHouse.icon;
  }
  const heroHouseDecor = document.getElementById("hero-house-decor-icon");
  if (heroHouseDecor && currentHouse) {
    heroHouseDecor.textContent = currentHouse.icon;
  }

  updateEquippedGearSlots();
}

function gainExpAndCoins(exp, coins) {
  gameState.exp += exp;
  gameState.coins += coins;
  sfx.coin();

  let leveledUp = false;
  while (gameState.exp >= gameState.expToNext) {
    gameState.exp -= gameState.expToNext;
    gameState.level += 1;
    gameState.expToNext = Math.round(gameState.expToNext * 1.3);
    leveledUp = true;
    updateCatTitle();
  }

  if (leveledUp) {
    sfx.levelUp();
    showToast(`🎉 เลเวลอัป! ตอนนี้เลเวล ${gameState.level} แล้ว! ปลดล็อกไอเทมใหม่ในร้านค้า!`, "⭐");
  }

  saveGameState();
}

function updateCatTitle() {
  const lvl = Math.min(20, Math.max(1, gameState.level));
  gameState.title = WORKPLACE_TITLES[lvl] || "ท่านประธานเหมียวพันล้านแห่งกาแล็กซี 🪐✨";
}

function updateEquippedGearSlots() {
  const types = ["hat", "outfit", "weapon", "vehicle", "house"];
  types.forEach((t) => {
    const itemId = gameState.equipped[t];
    const catList = SHOP_CATALOG[t + "s"] || [];
    const item = catList.find((i) => i.id === itemId);
    const slotEl = document.getElementById(`gear-slot-${t}`);
    if (slotEl && item) {
      slotEl.querySelector(".gear-slot-icon").textContent = item.icon;
      slotEl.querySelector(".gear-slot-name").textContent = item.nameTh;
    }
  });
}

// ==========================================
// 6. SCENARIO / DIALOGUE ENGINE
// ==========================================
let currentScenario = null;
let currentDialogueIdx = 0;
let stageScore = 0;

function startScenario(scenarioId) {
  const sc = SCENARIOS.find((s) => s.id === scenarioId);
  if (!sc) return;

  currentScenario = sc;
  currentDialogueIdx = 0;
  stageScore = 0;

  switchView("view-stage-arena");

  const sceneEl = document.getElementById("stage-scene-area");
  sceneEl.className = "stage-scene " + (sc.bgTheme || "theme-cafe");

  document.getElementById("stage-scenario-title").textContent = sc.titleTh;
  document.getElementById("stage-npc-avatar").textContent = sc.npcAvatar;
  document.getElementById("stage-npc-name").textContent = sc.npcName;
  document.getElementById("npc-bubble-name").textContent = sc.npcName;

  const stageBadge = document.getElementById("stage-cat-char-badge");
  if (stageBadge) {
    stageBadge.textContent = `🐱 ${gameState.name} • ${gameState.title}`;
  }

  refreshCatAvatars();
  renderCurrentDialogueTurn();
}

function renderCurrentDialogueTurn() {
  if (!currentScenario) return;
  const turn = currentScenario.dialogues[currentDialogueIdx];
  if (!turn) {
    completeCurrentScenario();
    return;
  }

  document.getElementById("stage-turn-counter").textContent = `ประโยคที่ ${currentDialogueIdx + 1} / ${currentScenario.dialogues.length}`;
  
  // Update turn progress bar
  const progressFill = document.getElementById("stage-turn-progress-fill");
  if (progressFill && currentScenario) {
    const pct = Math.round(((currentDialogueIdx + 1) / currentScenario.dialogues.length) * 100);
    progressFill.style.width = `${pct}%`;
  }

  document.getElementById("npc-speech-text").textContent = turn.npcText;
  document.getElementById("npc-context-text").textContent = `บริบท: ${turn.contextTh}`;
  document.getElementById("dialogue-hint-text").innerHTML = `💡 <strong>คำแนะนำ:</strong> ${turn.hint}`;

  speech.speak(turn.npcVoiceText);

  const btnTts = document.getElementById("btn-listen-npc");
  btnTts.onclick = () => {
    sfx.click();
    speech.speak(turn.npcVoiceText);
  };

  const feedbackCard = document.getElementById("turn-feedback-card");
  feedbackCard.className = "turn-feedback-card";
  feedbackCard.style.display = "none";
  document.getElementById("btn-next-turn").classList.remove("show");

  const isVoiceMode = gameState.settings.mode === "voice";
  document.getElementById("quiet-mode-options").style.display = isVoiceMode ? "none" : "flex";
  document.getElementById("voice-mode-box").style.display = isVoiceMode ? "flex" : "none";

  if (!isVoiceMode) {
    renderQuietOptions(turn);
  } else {
    setupVoiceModeTurn(turn);
  }
}

function renderQuietOptions(turn) {
  const container = document.getElementById("quiet-mode-options");
  container.innerHTML = "";

  // Randomize options so the correct answer is not always first!
  const shuffledOptions = [...turn.options].sort(() => 0.5 - Math.random());

  const letters = ["A", "B", "C", "D"];
  shuffledOptions.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `
      <span class="option-letter">${letters[idx]}</span>
      <span class="option-text">${opt.text}</span>
    `;

    btn.onclick = () => {
      triggerHaptic(20);
      container.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));

      if (opt.isCorrect) {
        triggerHaptic([30, 50, 40]);
        btn.classList.add("selected-correct");
        sfx.correct();
        sfx.meow();
        isCatHappyTemp = true;
        refreshCatAvatars();
        setTimeout(() => {
          isCatHappyTemp = false;
          refreshCatAvatars();
        }, 1800);

        stageScore += 100;
        showTurnFeedback(true, "ตอบถูกต้อง! ยอดเยี่ยมมาก 🎉", opt.feedback, turn.vocab);
      } else {
        btn.classList.add("selected-wrong");
        sfx.wrong();
        stageScore = Math.max(0, stageScore - 20);
        showTurnFeedback(false, "ยังไม่ถูกต้องเท่าไหร่ ลองดูคำแนะนำด้านล่างนะ 🐾", opt.feedback, turn.vocab);
      }
      document.getElementById("btn-next-turn").classList.add("show");
    };

    container.appendChild(btn);
  });
}

function setupVoiceModeTurn(turn) {
  const micBtn = document.getElementById("btn-mic-record");
  const transcriptEl = document.getElementById("voice-transcript-text");
  const scoreEl = document.getElementById("voice-score-display");
  transcriptEl.textContent = "กดปุ่มไมโครโฟน แล้วพูดประโยคภาษาอังกฤษได้เลย...";
  scoreEl.textContent = "";

  micBtn.onclick = () => {
    if (speech.isListening) {
      speech.stopListening();
      micBtn.classList.remove("listening");
      return;
    }

    micBtn.classList.add("listening");
    transcriptEl.textContent = "กำลังฟังเสียงคุณอยู่... พูดได้เลย!";

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("listening");
        transcriptEl.textContent = `"${transcript}"`;
        const accuracy = calculateMatchAccuracy(transcript, turn.targetPhrases);
        scoreEl.textContent = `ความแม่นยำ: ${accuracy}%`;

        if (accuracy >= 60) {
          sfx.correct();
          sfx.meow();
          isCatHappyTemp = true;
          refreshCatAvatars();
          setTimeout(() => {
            isCatHappyTemp = false;
            refreshCatAvatars();
          }, 1800);

          stageScore += Math.round(accuracy * 1.2);
          showTurnFeedback(
            true,
            `ออกเสียงได้ยอดเยี่ยมมาก! (${accuracy}%) 🎉`,
            `ประโยคที่คุณพูดใกล้เคียงกับเจ้าของภาษา: "${turn.targetPhrases[0]}"`,
            turn.vocab
          );
          checkDailyQuestVoiceSuccess();
        } else {
          sfx.wrong();
          showTurnFeedback(
            false,
            `ลองใหม่อีกนิด! (${accuracy}%)`,
            `ลองฟังเสียงตัวอย่างและพูดตามประโยคนี้: "${turn.targetPhrases[0]}"`,
            turn.vocab
          );
        }
        document.getElementById("btn-next-turn").classList.add("show");
      },
      (error) => {
        micBtn.classList.remove("listening");
        transcriptEl.textContent = "ไม่สามารถจับเสียงได้ชัดเจน ลองกดพูดใหม่อีกครั้ง หรือสลับไปโหมดเงียบได้ตลอดเวลาครับ";
        scoreEl.textContent = "";
      }
    );
  };
}

function showTurnFeedback(isSuccess, title, desc, vocabList) {
  const feedbackCard = document.getElementById("turn-feedback-card");
  feedbackCard.style.display = "block";
  feedbackCard.className = "turn-feedback-card " + (isSuccess ? "show" : "show wrong");

  document.getElementById("feedback-title").textContent = title;
  document.getElementById("feedback-detail").textContent = desc;

  const vocabTray = document.getElementById("turn-vocab-tray");
  vocabTray.innerHTML = "";
  if (vocabList && vocabList.length > 0) {
    vocabList.forEach((v) => {
      const pill = document.createElement("div");
      pill.className = "vocab-pill";
      pill.innerHTML = `<strong>${v.word}</strong>: ${v.meaning}`;
      vocabTray.appendChild(pill);
    });
  }
}

function nextTurn() {
  sfx.click();
  currentDialogueIdx++;
  renderCurrentDialogueTurn();
}

function completeCurrentScenario() {
  sfx.levelUp();
  const sc = currentScenario;

  const starsCount = stageScore >= 200 ? 3 : stageScore >= 100 ? 2 : 1;
  const stars = "⭐".repeat(starsCount);

  checkDailyQuestScenarioCompletion(sc.id);

  if (!gameState.completedScenarios[sc.id]) {
    gameState.completedScenarios[sc.id] = { times: 0, bestStars: 1 };
  }
  gameState.completedScenarios[sc.id].times++;
  gameState.completedScenarios[sc.id].bestStars = Math.max(
    gameState.completedScenarios[sc.id].bestStars,
    starsCount
  );

  const modal = document.getElementById("victory-overlay");
  document.getElementById("victory-stage-name").textContent = sc.titleTh;
  document.getElementById("victory-stars-display").textContent = stars;
  document.getElementById("victory-exp-reward").textContent = `+${sc.rewardExp} EXP`;
  document.getElementById("victory-coin-reward").textContent = `+${sc.rewardCoins} 🪙`;

  modal.classList.add("show");

  document.getElementById("btn-claim-victory").onclick = () => {
    modal.classList.remove("show");
    gainExpAndCoins(sc.rewardExp, sc.rewardCoins);
    switchView("view-adventure");
    renderAdventureGrid();
  };
}

function exitCurrentStage() {
  if (confirm("ต้องการออกจากด่านนี้หรือไม่? ความคืบหน้าของด่านปัจจุบันจะไม่ถูกบันทึก")) {
    sfx.click();
    speech.stopListening();
    if (speech.synth) speech.synth.cancel();
    switchView("view-adventure");
  }
}

// ==========================================
// 7. WARDROBE & INVENTORY
// ==========================================
let currentInvCategory = "breeds";

function renderAdoptedBreeds() {
  const container = document.getElementById("adopted-breeds-list");
  if (!container) return;
  container.innerHTML = "";

  const ownedBreedIds = gameState.inventory.breeds || ["calico"];
  const allBreeds = SHOP_CATALOG.breeds || [];

  ownedBreedIds.forEach((bId) => {
    const breed = allBreeds.find((b) => b.id === bId) || {
      id: bId,
      nameTh: bId === "calico" ? "แมวสามสีนำโชค (Calico)" : bId,
      icon: "🐱"
    };

    const isActive = (gameState.furColor || "calico") === breed.id;
    const card = document.createElement("div");
    card.className = "adopted-breed-card " + (isActive ? "active" : "");
    card.title = `คลิกเพื่อเลือก ${breed.nameTh} เป็นตัวละครหลัก`;
    card.innerHTML = `
      <div class="adopted-breed-icon">${breed.icon}</div>
      <div class="adopted-breed-name">${breed.nameTh}</div>
      <span class="adopted-breed-badge">${isActive ? "ใช้งานอยู่ ✓" : "เลือกตัวนี้"}</span>
    `;

    card.onclick = () => {
      if (gameState.furColor !== breed.id) {
        sfx.meow();
        triggerHaptic(20);
        gameState.furColor = breed.id;
        gameState.equipped.breed = breed.id;
        saveGameState();
        refreshCatAvatars();
        renderAdoptedBreeds();
        renderCatSquadLounge();
        if (currentInvCategory === "breeds") renderWardrobeInventory("breeds");
        showToast(`สลับมาใช้น้องแมวพันธุ์ "${breed.nameTh}" แล้ว! 🐾`, "✨");
      }
    };

    container.appendChild(card);
  });
}

// ==============================================
// CAT SQUAD LIVING LOUNGE & REAL CAT BEHAVIORS
// ระบบห้องนั่งเล่นรวมแก๊งแมวเหมียว & พฤติกรรมแมวจริง
// ==============================================
const SQUAD_CAT_BEHAVIORS = {
  calico: {
    spot: { left: "22%", bottom: "65px" },
    actionClass: "action-knead",
    actionLabel: "นวดขนมปัง 🥐",
    dialogues: [
      "นวดขนมปังปุๆๆ... นวดแป้งวันละ 500 รอบ แป้งฟูพร้อมเสิร์ฟฮะ! 🥐🐾",
      "เกาคางตรงนี้ฟินที่สุดในสามโลกเลยงับนุด~ Purrrrr ❤️",
      "สามสีนำโชคมาพร้อมความขยัน วันนี้มาเก็บเลเวลกันต่อนะเหมียว! ✨"
    ]
  },
  british_blue: {
    spot: { left: "14%", bottom: "115px" },
    actionClass: "action-loaf",
    actionLabel: "ก้อนขนมปัง 🍞",
    dialogues: [
      "ผู้ดีอังกฤษอย่างเราไม่ได้อ้วนนะฮะ เค้าเรียกว่าขนกำมะหยี่หนาแน่นฟูนุ่มต่างหาก! 💂‍♂️🍪",
      "แปลงร่างเป็นก้อนขนมปังปิ้ง ห้ามรบกวนเวลาจิบชาตอนบ่ายนะฮะ 🍞☕",
      "Hello hooman! วันนี้สำเนียง British เราเป๊ะมากเลยนะ ลองฟังดูสิ 🇬🇧"
    ]
  },
  siamese: {
    spot: { left: "7%", top: "45px" },
    actionClass: "action-bird-watch",
    actionLabel: "ส่องนกสั่นคาง 🐦",
    dialogues: [
      "นกพิราบตัวนั้นกลิ่นน่าอร่อยจัง... แคะๆๆๆ! (Ek-ek-ek-ek) 🐦👀",
      "วิเชียรมาศแมวมงคลไทยโบราณ ตาสีไพลินคมกริบ พร้อมซ้อมบทสนทนาแล้วเหมียว! 💎",
      "ทำไมหน้าเรามีรอยไหม้ 9 จุดเหรอ? นี่เค้าเรียกว่าแต้มช็อกโกแลตสุดคลาสสิกต่างหาก! 🍫"
    ]
  },
  scottish_fold: {
    spot: { left: "46%", bottom: "75px" },
    actionClass: "action-butt-wiggle",
    actionLabel: "ยัดตัวลงกล่อง 📦",
    dialogues: [
      "ถ้าหัวมุดเข้าได้ ก้นอ้วนๆ ก็ต้องยัดลงได้! กล่องพัสดุคือที่นอนที่ดีที่สุดในโลก 📦🦉",
      "หูพับหน้ากลมเหมือนนกฮูก แต่น่ารักขนาดนี้ นุดจะไม่ยอมใจอ่อนป้อนปลาทูเหรอ? 🥺🐟",
      "หมอบต่ำ ส่ายก้นดุ๊กดิ๊ก... ล็อกเป้าหมายเท้ามนุษย์ 3 2 1 ตะครุบ! 🎯🐾"
    ]
  },
  khao_manee: {
    spot: { right: "10%", top: "65px" },
    actionClass: "action-violin-leg",
    actionLabel: "ยกขาเสาอากาศ 📡",
    dialogues: [
      "โยคะท่ายกขาหลังชี้ฟ้า รับสัญญาณดาวเทียมจากยานแม่ดาวแมว 📡🧘",
      "ตาสองสี (Odd Eyes) ฟ้าไพลิน & เขียวมรกต... มองเห็นว่านุดกำลังจะท่องศัพท์ TOEIC! 💎✨",
      "ขนขาวบริสุทธิ์เหมือนเพชรแท้ นุดต้องลูบเบาๆ ด้วยความอ่อนโยนนะฮะ 🤍"
    ]
  },
  bengal: {
    spot: { right: "24%", bottom: "85px" },
    actionClass: "action-swat",
    actionLabel: "เขี่ยแก้วกาแฟ ☕",
    dialogues: [
      "กำลังทดลองกฎแรงโน้มถ่วงของนิวตันฮะ... ค่อยๆ เขี่ยแก้วกาแฟ... เพล้ง! อุ๊ย ไม่ได้ตั้งใจน้าา ☕😈",
      "พลังงาน 50,000 แคลอรี่ในตัว! เพิ่งวิ่งไต่กำแพงบ้านรอบที่ 12 เสร็จ สนุกสุดๆ 🐆⚡",
      "ลายเสือดาวป่าแต่หัวใจมุ้งมิ้ง มาฝึกพูดอังกฤษสำเนียงดุดันไม่เกรงใจใครกัน! 🐾"
    ]
  },
  persian: {
    spot: { right: "6%", bottom: "75px" },
    actionClass: "action-loaf",
    actionLabel: "เจ้าหญิงขนฟู 👑",
    dialogues: [
      "ขนยาวสลวยนุ่มฟูดุจปุยเมฆ... เกาคางเจ้าหญิงเบาๆ อย่างมีระดับหน่อยสิคะนุด 👑✨",
      "หน้าตุ๊กตาหวานละมุน แต่วันนี้ช่วยตรวจเอกสารภาษาอังกฤษให้ผ่านฉลุยเลยนะ 🌸",
      "ขอเวลาแต่งขน 3 ชั่วโมงนะคะนุด ความสวยของเปอร์เซียต้องสมบูรณ์แบบเสมอ 💅"
    ]
  },
  orange_tabby: {
    spot: { left: "34%", bottom: "65px" },
    actionClass: "action-belly-trap",
    actionLabel: "หงายพุงล่อลวง 😼",
    dialogues: [
      "หงายพุงโชว์พุงกลมๆ นุ่มฟู... แต่นี่คือก้นกับดัก! แตะเกิน 2 วิ โดนงับมือนะบอกก่อน 🍊😼",
      "กินจุ วิ่งซน ชวนคุยได้ทั้งวัน ส้มจอมพลังพร้อมลุยเควสต์แล้วฮะ! ⚡🍔",
      "ส้มไม่เคยผิด! ไม่ว่าจะทำอะไร ส้มก็ยังน่ารักที่สุดเสมอ 🍊❤️"
    ]
  },
  tuxedo: {
    spot: { right: "18%", bottom: "115px" },
    actionClass: "action-keyboard",
    actionLabel: "นอนทับคีย์บอร์ด 💻",
    dialogues: [
      "เห็นนุดพิมพ์งานเหนื่อย เราช่วยพิมพ์ให้: 'asdfjkl;qwoeijr' เหมียว! 💻😴",
      "ใส่สูททักซิโด้ผูกโบว์ดำพร้อมเข้าห้องประชุมเจรจาธุรกิจระดับพันล้าน 🎩💼",
      "สุภาพบุรุษทักซิโด้มารายงานตัว พร้อมยกระดับคะแนนภาษาอังกฤษให้โปรเฟสชันนอล! ✨"
    ]
  }
};

function renderCatSquadLounge() {
  const container = document.getElementById("squad-cats-container");
  if (!container) return;
  container.innerHTML = "";

  const ownedBreedIds = gameState.inventory.breeds || ["calico"];
  const allBreeds = SHOP_CATALOG.breeds || [];
  const currentEquippedBreed = gameState.equipped.breed || gameState.furColor || "calico";

  // Update squad count badge
  const countBadge = document.getElementById("squad-cat-count-badge");
  if (countBadge) {
    countBadge.innerHTML = `🐱 สมาชิกแก๊ง: <strong>${ownedBreedIds.length} / ${allBreeds.length}</strong> ตัว`;
  }

  ownedBreedIds.forEach((breedId, idx) => {
    const breedInfo = allBreeds.find((b) => b.id === breedId) || { id: breedId, nameTh: breedId, icon: "🐱" };
    const behavior = SQUAD_CAT_BEHAVIORS[breedId] || SQUAD_CAT_BEHAVIORS.calico;
    const isMain = breedId === currentEquippedBreed;

    const catItem = document.createElement("div");
    catItem.className = `squad-cat-item ${behavior.actionClass} ${isMain ? "is-main" : ""}`;
    catItem.dataset.breed = breedId;

    // Apply positioning coordinates
    Object.assign(catItem.style, behavior.spot);
    catItem.style.zIndex = 10 + idx;

    // Render SVG for that breed (passing null for equipment so natural breed coats shine!)
    const catSvg = renderCatSvg(null, breedId, false);

    catItem.innerHTML = `
      <div class="squad-cat-svg-wrap">
        ${catSvg}
      </div>
      <div class="squad-cat-tag">
        <span>${isMain ? "⭐" : breedInfo.icon}</span>
        <span>${breedInfo.nameTh.split(" ")[0]}</span>
        <span style="opacity:0.8; font-size:0.6rem;">• ${behavior.actionLabel}</span>
      </div>
    `;

    // Tap/Click interaction
    catItem.onclick = (e) => {
      e.stopPropagation();
      triggerSquadCatClick(breedId, breedInfo, behavior, isMain, catItem);
    };

    container.appendChild(catItem);
  });
}

function triggerSquadCatClick(breedId, breedInfo, behavior, isMain, catItemEl) {
  triggerHaptic([25, 30, 25]);
  if (Math.random() > 0.4) {
    sfx.purr();
  } else {
    sfx.meow();
  }

  // Wiggle or bounce effect
  catItemEl.style.transform = "scale(1.22) translateY(-8px)";
  setTimeout(() => {
    catItemEl.style.transform = "";
  }, 400);

  // Pick random dialogue
  const randomMsg = behavior.dialogues[Math.floor(Math.random() * behavior.dialogues.length)];
  const bubbleText = document.getElementById("squad-bubble-text");
  const equipBtn = document.getElementById("btn-squad-bubble-equip");

  if (bubbleText) {
    bubbleText.textContent = `[${breedInfo.nameTh}] "${randomMsg}"`;
  }

  if (equipBtn) {
    if (!isMain) {
      equipBtn.style.display = "inline-block";
      equipBtn.textContent = `⭐ ตั้ง ${breedInfo.nameTh.split(" ")[0]} เป็นคู่หูหลัก`;
      equipBtn.onclick = () => {
        sfx.click();
        equipItem("breed", breedId);
        showToast(`เลือก "${breedInfo.nameTh}" เป็นคู่หูหลักเรียบร้อยแล้ว! 🐾`, "⭐");
        renderCatSquadLounge();
      };
    } else {
      equipBtn.style.display = "none";
    }
  }
}

// Toy Interactions
function triggerToyLaser() {
  const laserDot = document.getElementById("squad-laser-dot");
  if (!laserDot) return;

  sfx.click();
  triggerHaptic(30);

  laserDot.style.display = "block";
  const coords = [
    { left: "20%", top: "70%" },
    { left: "65%", top: "45%" },
    { left: "35%", top: "80%" },
    { left: "75%", top: "65%" }
  ];

  let step = 0;
  const moveLaser = () => {
    if (step < coords.length) {
      laserDot.style.left = coords[step].left;
      laserDot.style.top = coords[step].top;
      step++;
      setTimeout(moveLaser, 500);
    } else {
      // Pick a random cat to pounce
      const allCatItems = document.querySelectorAll(".squad-cat-item");
      if (allCatItems.length > 0) {
        const randomCat = allCatItems[Math.floor(Math.random() * allCatItems.length)];
        randomCat.classList.add("cat-chasing-laser");
        setTimeout(() => {
          randomCat.classList.remove("cat-chasing-laser");
          laserDot.style.display = "none";
          sfx.meow();
          showToast("เจ้าเหมียวพุ่งตะครุบจุดแดง! แต่จุดแดงดันหายไปไหนแล้วเนี่ย?! 🔴🙀", "🐾");
        }, 600);
      } else {
        laserDot.style.display = "none";
      }
    }
  };
  moveLaser();
}

function triggerToyCatnip() {
  const container = document.getElementById("squad-catnip-container");
  if (!container) return;

  sfx.purr();
  triggerHaptic([30, 40, 50]);

  // Spawn 14 falling catnip leaves
  for (let i = 0; i < 14; i++) {
    const leaf = document.createElement("span");
    leaf.className = "catnip-leaf";
    leaf.textContent = i % 2 === 0 ? "🌿" : "🍃";
    leaf.style.left = `${Math.random() * 90 + 5}%`;
    leaf.style.animationDelay = `${Math.random() * 0.8}s`;
    leaf.style.animationDuration = `${2 + Math.random() * 1.2}s`;
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 3500);
  }

  // All cats get blissful
  const allCatItems = document.querySelectorAll(".squad-cat-item");
  allCatItems.forEach((c) => c.classList.add("catnip-bliss"));
  setTimeout(() => {
    allCatItems.forEach((c) => c.classList.remove("catnip-bliss"));
  }, 3500);

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `"ฟี้ๆๆๆ... กลิ่นแคทนิปหอมฟินเกินต้านนนน นอนกลิ้งหงายพุงทั้งวันเลยดีกว่า! 🌿✨"`;
  }
  showToast("เทศกาลแคทนิปเริ่มแล้ว! น้องแมวทุกตัวกลิ้งหงายพุงเคลิ้มฟินสุดๆ~ 🌿❤️", "😻");
}

function triggerToyFeather() {
  sfx.meow();
  triggerHaptic([20, 30, 20]);

  const allCatItems = document.querySelectorAll(".squad-cat-item");
  allCatItems.forEach((c) => {
    c.style.transform = "scale(1.15) translateY(-14px)";
    setTimeout(() => {
      c.style.transform = "";
    }, 450);
  });

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `"ขนนกพริ้วๆ ขยับดุ๊กดิ๊ก! อุ้งเล็บกระตุก อยากกระโดดตะปบให้ได้เหมียว! 🪶😼"`;
  }
  showToast("สะบัดไม้ขนนกพริ้วๆ! น้องแมวทั้งแก๊งกระโดดตะปบอย่างร่าเริง 🪶🐾", "✨");
}

function triggerToyBox() {
  const boxContainer = document.getElementById("squad-box-container");
  if (!boxContainer) return;

  sfx.click();
  triggerHaptic(40);

  boxContainer.innerHTML = "📦";
  boxContainer.style.display = "block";
  boxContainer.style.animation = "none";
  void boxContainer.offsetWidth; // retrigger
  boxContainer.style.animation = "boxBounce 0.4s ease";

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `"กล่องพัสดุใบใหม่มาส่งแล้ว! ใครเร็วใครได้ ก้นอ้วนแค่ไหนก็ยัดลงได้แน่นอน 📦😹"`;
  }
  showToast("โยนกล่องพัสดุลงกลางห้อง! น้องๆ รีบวิ่งกรูเข้ามายัดตัวลงกล่องทันที 📦🐾", "😹");
}

function renderWardrobeInventory(category = currentInvCategory) {
  currentInvCategory = category;
  renderAdoptedBreeds();

  const container = document.getElementById("inventory-items-grid");
  if (!container) return;
  container.innerHTML = "";

  document.querySelectorAll(".inv-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });

  const allItems = SHOP_CATALOG[category] || [];
  const ownedItemIds = gameState.inventory[category] || [];
  const gearType = category === "breeds" ? "breed" : category.slice(0, -1);
  const currentlyEquippedId = gearType === "breed" ? (gameState.furColor || "calico") : gameState.equipped[gearType];

  if (ownedItemIds.length === 0) {
    const emptyMsg = category === "breeds" 
      ? `ยังไม่มีสายพันธุ์อื่น แวะไปรับเลี้ยงเพิ่มได้ที่ร้านค้าเหมียวช็อปนะ! 🐱`
      : `ยังไม่มีไอเทมในหมวดนี้ แวะไปซื้อได้ที่ร้านค้าเหมียวช็อปนะ! 🛍️`;
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 20px; color: var(--text-muted)">${emptyMsg}</div>`;
    return;
  }

  ownedItemIds.forEach((itemId) => {
    const item = allItems.find((i) => i.id === itemId);
    if (!item) return;

    const isEquipped = currentlyEquippedId === item.id;
    const card = document.createElement("div");
    card.className = "inv-item-card " + (isEquipped ? "equipped" : "");
    card.innerHTML = `
      <div class="inv-item-icon">${item.icon}</div>
      <div class="inv-item-name">${item.nameTh}</div>
      <button class="btn-equip-item">${isEquipped ? "กำลังใช้งาน ✓" : "เลือกใช้"}</button>
    `;

    card.querySelector(".btn-equip-item").onclick = () => {
      sfx.click();
      equipItem(gearType, item.id);
    };

    container.appendChild(card);
  });
}

function equipItem(gearType, itemId) {
  if (gearType === "breed") {
    gameState.furColor = itemId;
    gameState.equipped.breed = itemId;
    saveGameState();
    refreshCatAvatars();
    renderWardrobeInventory("breeds");
    renderAdoptedBreeds();
    renderCatSquadLounge();
    const allBreeds = SHOP_CATALOG.breeds || [];
    const br = allBreeds.find((b) => b.id === itemId);
    showToast(`สลับมาใช้น้องแมวพันธุ์ "${br ? br.nameTh : itemId}" แล้ว! 🐾`, "✨");
    return;
  }
  gameState.equipped[gearType] = itemId;
  saveGameState();
  refreshCatAvatars();
  renderWardrobeInventory();
  showToast("สวมใส่ไอเทมเรียบร้อยแล้ว!", "✨");
}

// ==========================================
// 8. SHOP SYSTEM
// ==========================================
let currentShopCategory = "breeds";

function renderShop(category = currentShopCategory) {
  currentShopCategory = category;
  const container = document.getElementById("shop-items-grid");
  if (!container) return;
  container.innerHTML = "";

  document.querySelectorAll(".shop-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });

  const catalog = SHOP_CATALOG[category] || [];
  const ownedList = gameState.inventory[category] || [];
  const isBreed = category === "breeds";

  catalog.forEach((item) => {
    const isOwned = ownedList.includes(item.id);
    const isLevelLocked = gameState.level < item.reqLevel;

    const card = document.createElement("div");
    card.className = "shop-card " + (isLevelLocked ? "locked" : "");

    let actionBtnHtml = "";
    if (isOwned) {
      actionBtnHtml = `<button class="btn-buy-item owned" disabled>${isBreed ? "รับเลี้ยงแล้ว ✓" : "มีแล้ว ✓"}</button>`;
    } else if (isLevelLocked) {
      actionBtnHtml = `<button class="btn-buy-item" disabled>ปลดล็อกที่ Lv. ${item.reqLevel}</button>`;
    } else {
      const actionText = isBreed ? `รับเลี้ยง (${item.price} 🪙)` : `ซื้อ (${item.price} 🪙)`;
      actionBtnHtml = `<button class="btn-buy-item" data-id="${item.id}">${actionText}</button>`;
    }

    const originBadge = item.origin ? `<span class="shop-origin-tag">📍 ถิ่นกำเนิด: ${item.origin}</span>` : "";

    card.innerHTML = `
      <div class="shop-item-top">
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-details">
          <h4>${item.nameTh}</h4>
          <span>${item.name}</span>
          ${originBadge}
        </div>
      </div>
      <div class="shop-item-desc">${item.desc}</div>
      <div class="shop-item-footer">
        <div class="shop-price-tag">${item.price > 0 ? item.price + " 🪙" : "เริ่มต้นฟรี"}</div>
        ${actionBtnHtml}
      </div>
    `;

    const buyBtn = card.querySelector(".btn-buy-item[data-id]");
    if (buyBtn) {
      buyBtn.onclick = () => {
        buyShopItem(category, item);
      };
    }

    container.appendChild(card);
  });
}

function buyShopItem(category, item) {
  if (gameState.coins < item.price) {
    sfx.wrong();
    showToast("เหรียญทอง PawCoins ไม่เพียงพอ! ฝึกด่านภาษาอังกฤษเพิ่มเพื่อสะสมเหรียญนะ 🐾", "🪙");
    return;
  }

  gameState.coins -= item.price;
  if (!gameState.inventory[category]) gameState.inventory[category] = [];
  gameState.inventory[category].push(item.id);

  if (category === "breeds") {
    gameState.furColor = item.id;
    gameState.equipped.breed = item.id;
    sfx.levelUp();
    sfx.meow();
    triggerHaptic([40, 60, 40]);
    showToast(`🎉 รับเลี้ยงน้องแมวสายพันธุ์ "${item.nameTh}" เข้าสู่ครอบครัวสำเร็จแล้ว!`, "🐾");
    saveGameState();
    refreshCatAvatars();
    renderShop("breeds");
    renderAdoptedBreeds();
    renderCatSquadLounge();
    return;
  }

  const gearType = category.slice(0, -1);
  gameState.equipped[gearType] = item.id;

  sfx.coin();
  sfx.meow();
  showToast(`ซื้อ ${item.nameTh} สำเร็จแล้วและสวมใส่ทันที! 🎉`, "🛍️");
  saveGameState();
  refreshCatAvatars();
  renderShop(category);
}

// ==========================================
// 9. DAILY QUESTS & ENDLESS LOOP
// ==========================================
function renderDailyQuests() {
  const container = document.getElementById("daily-quests-container");
  if (!container) return;
  container.innerHTML = "";

  document.getElementById("daily-streak-count").textContent = `${gameState.streak} วัน`;

  const streakBoxesContainer = document.getElementById("streak-boxes-wrap");
  if (streakBoxesContainer) {
    streakBoxesContainer.innerHTML = "";
    for (let day = 1; day <= 7; day++) {
      const b = document.createElement("div");
      b.className = "streak-box " + (day <= gameState.streak ? "done" : "");
      b.innerHTML = `วัน ${day}<br>${day <= gameState.streak ? "✓" : "🎁"}`;
      streakBoxesContainer.appendChild(b);
    }
  }

  gameState.dailyQuests.forEach((quest, idx) => {
    const card = document.createElement("div");
    card.className = "daily-quest-card";

    let btnHtml = "";
    if (quest.claimed) {
      btnHtml = `<button class="btn-claim-quest" disabled>รับแล้ว ✓</button>`;
    } else if (quest.completed) {
      btnHtml = `<button class="btn-claim-quest" data-idx="${idx}">รับรางวัล (+${quest.rewardCoins} 🪙)</button>`;
    } else {
      btnHtml = `<button class="btn-claim-quest" disabled>ยังไม่สำเร็จ</button>`;
    }

    card.innerHTML = `
      <div class="daily-quest-info">
        <h4>${quest.text}</h4>
        <p>รางวัล: +${quest.rewardCoins} เหรียญทอง, +${quest.rewardExp} EXP</p>
      </div>
      <div>${btnHtml}</div>
    `;

    const claimBtn = card.querySelector(".btn-claim-quest[data-idx]");
    if (claimBtn) {
      claimBtn.onclick = () => {
        claimDailyQuestReward(idx);
      };
    }

    container.appendChild(card);
  });
}

function checkDailyQuestScenarioCompletion(scenarioId) {
  let updated = false;
  gameState.dailyQuests.forEach((q) => {
    if (q.scenarioId === scenarioId && !q.completed) {
      q.completed = true;
      updated = true;
      showToast(`🎯 ภารกิจรายวันสำเร็จ: "${q.text}"! แวะมารับรางวัลได้เลย`, "🎁");
    }
  });
  if (updated) saveGameState();
}

function checkDailyQuestVoiceSuccess() {
  let updated = false;
  gameState.dailyQuests.forEach((q) => {
    if (q.requireVoice && !q.completed) {
      q.completed = true;
      updated = true;
      showToast(`🎯 ภารกิจรายวันสำเร็จ: ฝึกพูดด้วยไมค์เสียงผ่านแล้ว!`, "🎙️");
    }
  });
  if (updated) saveGameState();
}

function claimDailyQuestReward(idx) {
  const quest = gameState.dailyQuests[idx];
  if (!quest || !quest.completed || quest.claimed) return;

  quest.claimed = true;
  gainExpAndCoins(quest.rewardExp, quest.rewardCoins);
  showToast(`รับรางวัลสำเร็จ: +${quest.rewardCoins} เหรียญทอง, +${quest.rewardExp} EXP!`, "🎉");
  renderDailyQuests();
}

// ==========================================
// 10. ADVENTURE SCENARIOS GRID
// ==========================================
function renderAdventureGrid() {
  const container = document.getElementById("scenario-cards-grid");
  if (!container) return;
  container.innerHTML = "";

  SCENARIOS.forEach((sc) => {
    const card = document.createElement("div");
    card.className = "scenario-card";

    const progress = gameState.completedScenarios[sc.id];
    const bestStars = progress ? "⭐".repeat(progress.bestStars) : "ยังไม่เคยเล่น";

    card.innerHTML = `
      <div class="scenario-header">
        <div class="scenario-icon">${sc.icon}</div>
        <div class="scenario-title-area">
          <h3>${sc.titleTh}</h3>
          <span class="subtitle">${sc.title}</span>
        </div>
      </div>
      <div class="scenario-meta">
        <span class="badge ${sc.difficulty === "Beginner" ? "badge-diff-beginner" : "badge-diff-intermediate"}">${sc.difficulty}</span>
        <span class="badge badge-cat">${sc.category}</span>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">สถิติ: ${bestStars}</span>
      </div>
      <div class="scenario-desc">${sc.description}</div>
      <div class="scenario-footer">
        <div class="rewards-preview">
          <span class="reward-exp">+${sc.rewardExp} EXP</span>
          <span class="reward-coin">+${sc.rewardCoins} 🪙</span>
        </div>
        <button class="btn-play-scenario" data-id="${sc.id}">เริ่มฝึก ➔</button>
      </div>
    `;

    card.querySelector(".btn-play-scenario").onclick = () => {
      sfx.click();
      startScenario(sc.id);
    };

    container.appendChild(card);
  });
}

// ==========================================
// 10.5. VOCABULARY FLASHCARD ENGINE (TOEIC & TOEFL)
// ==========================================
let currentVocabDeck = "toeic";
let currentVocabCardIdx = 0;
let masteredVocabCards = new Set();

function initVocabDeck(deckKey = "toeic") {
  currentVocabDeck = deckKey;
  currentVocabCardIdx = 0;
  masteredVocabCards.clear();

  document.querySelectorAll(".vocab-deck-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.deck === deckKey);
  });

  const compBox = document.getElementById("vocab-complete-box");
  const cardWrap = document.querySelector(".flashcard-wrapper");
  const actBar = document.querySelector(".vocab-action-bar");
  if (compBox) compBox.style.display = "none";
  if (cardWrap) cardWrap.style.display = "block";
  if (actBar) actBar.style.display = "flex";

  renderCurrentVocabCard();
}

function renderCurrentVocabCard() {
  const deckData = typeof VOCAB_DECKS !== "undefined" ? VOCAB_DECKS[currentVocabDeck] : null;
  if (!deckData || !deckData.words) return;

  const words = deckData.words;
  if (currentVocabCardIdx >= words.length) {
    completeVocabDeck();
    return;
  }

  const card = words[currentVocabCardIdx];

  const innerCard = document.getElementById("vocab-flashcard-inner");
  if (innerCard) innerCard.classList.remove("flipped");

  const counterEl = document.getElementById("vocab-card-counter");
  if (counterEl) counterEl.textContent = `การ์ดที่ ${currentVocabCardIdx + 1} / ${words.length}`;

  const statusEl = document.getElementById("vocab-deck-status");
  if (statusEl) statusEl.textContent = `จำได้แล้ว: ${masteredVocabCards.size} / ${words.length}`;

  const progressFill = document.getElementById("vocab-progress-fill");
  if (progressFill) {
    const pct = Math.round(((currentVocabCardIdx + 1) / words.length) * 100);
    progressFill.style.width = `${pct}%`;
  }

  // Front elements
  const tagFront = document.getElementById("vocab-card-tag-front");
  if (tagFront) tagFront.textContent = card.contextTag;

  const wordEl = document.getElementById("vocab-card-word");
  if (wordEl) wordEl.textContent = card.word;

  const phonEl = document.getElementById("vocab-card-phonetic");
  if (phonEl) phonEl.textContent = card.phonetic;

  const posEl = document.getElementById("vocab-card-pos");
  if (posEl) posEl.textContent = card.pos;

  // Back elements
  const tagBack = document.getElementById("vocab-card-tag-back");
  if (tagBack) tagBack.textContent = card.contextTag;

  const meaningEl = document.getElementById("vocab-card-meaning");
  if (meaningEl) meaningEl.textContent = card.meaningTh;

  const exEn = document.getElementById("vocab-card-example-en");
  if (exEn) exEn.textContent = `"${card.exampleEn}"`;

  const exTh = document.getElementById("vocab-card-example-th");
  if (exTh) exTh.textContent = card.exampleTh;

  const collocEl = document.getElementById("vocab-card-collocations");
  if (collocEl) collocEl.innerHTML = `💡 <strong>คำที่มักใช้คู่กัน:</strong> ${card.collocations}`;
}

function flipFlashcard() {
  const innerCard = document.getElementById("vocab-flashcard-inner");
  if (innerCard) {
    triggerHaptic(15);
    sfx.click();
    innerCard.classList.toggle("flipped");
  }
}

function speakCurrentVocabWord() {
  const deckData = typeof VOCAB_DECKS !== "undefined" ? VOCAB_DECKS[currentVocabDeck] : null;
  if (!deckData) return;
  const card = deckData.words[currentVocabCardIdx];
  if (card) {
    sfx.click();
    speech.speak(card.word);
  }
}

function speakCurrentVocabExample() {
  const deckData = typeof VOCAB_DECKS !== "undefined" ? VOCAB_DECKS[currentVocabDeck] : null;
  if (!deckData) return;
  const card = deckData.words[currentVocabCardIdx];
  if (card) {
    sfx.click();
    speech.speak(card.exampleEn);
  }
}

function handleVocabReview() {
  triggerHaptic(25);
  sfx.wrong();
  currentVocabCardIdx++;
  renderCurrentVocabCard();
}

function handleVocabMastered() {
  triggerHaptic([30, 40, 30]);
  sfx.correct();
  sfx.coin();

  const deckData = typeof VOCAB_DECKS !== "undefined" ? VOCAB_DECKS[currentVocabDeck] : null;
  if (deckData) {
    const card = deckData.words[currentVocabCardIdx];
    if (card) masteredVocabCards.add(card.id);
  }

  currentVocabCardIdx++;
  renderCurrentVocabCard();
}

function completeVocabDeck() {
  sfx.levelUp();
  sfx.meow();

  const rewardExp = 50;
  const rewardCoins = 35;
  gainExpAndCoins(rewardExp, rewardCoins);

  const compBox = document.getElementById("vocab-complete-box");
  const cardWrap = document.querySelector(".flashcard-wrapper");
  const actBar = document.querySelector(".vocab-action-bar");
  if (compBox) compBox.style.display = "block";
  if (cardWrap) cardWrap.style.display = "none";
  if (actBar) actBar.style.display = "none";

  const progressFill = document.getElementById("vocab-progress-fill");
  if (progressFill) progressFill.style.width = "100%";

  showToast(`🎉 ท่องศัพท์สำเร็จทั้งชุด! ได้รับ +${rewardExp} EXP และ +${rewardCoins} เหรียญทอง!`, "⭐");
}

// ==========================================
// 11. NAVIGATION & GENERAL UI
// ==========================================
function switchView(targetViewId) {
  if (speech.synth) speech.synth.cancel();
  speech.stopListening();

  document.querySelectorAll(".view-section").forEach((sec) => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(targetViewId);
  if (target) target.classList.add("active");

  // Keep both desktop and mobile nav in sync
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === targetViewId);
  });
  document.querySelectorAll(".mob-nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === targetViewId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message, icon = "🔔") {
  const toast = document.getElementById("toast-notice");
  if (!toast) return;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Save & Data Management
function exportSaveData() {
  sfx.click();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `meowquest_save_${getTodayDateString()}.json`);
  dlAnchor.click();
  showToast("ส่งออกไฟล์เซฟเรียบร้อยแล้ว!", "💾");
}

function importSaveData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.level && imported.inventory) {
        gameState = { ...DEFAULT_STATE, ...imported };
        saveGameState();
        refreshCatAvatars();
        updateHUD();
        renderAdventureGrid();
        renderWardrobeInventory();
        renderShop();
        renderDailyQuests();
        showToast("นำเข้าไฟล์เซฟสำเร็จ! ข้อมูลถูกอัปเดตแล้ว 🎉", "✅");
      } else {
        alert("โครงสร้างไฟล์เซฟไม่ถูกต้อง");
      }
    } catch (err) {
      alert("ไม่สามารถอ่านไฟล์ JSON ได้: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetGameProgress() {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมด? เลเวล ไอเทม และความคืบหน้าจะหายไปทั้งหมด!")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("meowquest_save_data_v1");
    gameState = { ...DEFAULT_STATE };
    gameState.dailyQuests = generateDailyQuests();
    saveGameState();
    location.reload();
  }
}

// ==========================================
// 12. INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  // Navigation Tabs Setup (Desktop)
  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      triggerHaptic(15);
      const viewId = btn.dataset.view;
      switchView(viewId);
      if (viewId === "view-adventure") renderAdventureGrid();
      if (viewId === "view-vocab") initVocabDeck(currentVocabDeck);
      if (viewId === "view-wardrobe") renderWardrobeInventory();
      if (viewId === "view-shop") renderShop();
      if (viewId === "view-daily") renderDailyQuests();
    };
  });

  // Navigation Tabs Setup (Mobile Bottom Nav)
  document.querySelectorAll(".mob-nav-btn").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      triggerHaptic(20);
      const viewId = btn.dataset.view;
      switchView(viewId);
      if (viewId === "view-adventure") renderAdventureGrid();
      if (viewId === "view-vocab") initVocabDeck(currentVocabDeck);
      if (viewId === "view-wardrobe") renderWardrobeInventory();
      if (viewId === "view-shop") renderShop();
      if (viewId === "view-daily") renderDailyQuests();
    };
  });

  const brandBtn = document.getElementById("brand-logo-btn");
  if (brandBtn) {
    brandBtn.onclick = () => {
      sfx.meow();
      switchView("view-adventure");
      renderAdventureGrid();
    };
  }

  // Mode Toggle Buttons
  const btnSilent = document.getElementById("btn-mode-silent");
  const btnVoice = document.getElementById("btn-mode-voice");
  if (btnSilent) {
    btnSilent.onclick = () => {
      sfx.click();
      gameState.settings.mode = "silent";
      saveGameState();
      showToast("เปิดใช้งานโหมดเงียบ (เลือกคำตอบ/พิมพ์) สะดวกทุกที่", "🤫");
      if (currentScenario) renderCurrentDialogueTurn();
    };
  }
  if (btnVoice) {
    btnVoice.onclick = () => {
      sfx.click();
      gameState.settings.mode = "voice";
      saveGameState();
      showToast("เปิดใช้งานโหมดเสียง (พูดผ่านไมค์) พร้อมโบนัสคะแนนพิเศษ!", "🎙️");
      if (currentScenario) renderCurrentDialogueTurn();
    };
  }

  // Button: Go to Cat Adoption Shop
  const btnGotoAdopt = document.getElementById("btn-goto-adopt-shop");
  if (btnGotoAdopt) {
    btnGotoAdopt.onclick = () => {
      sfx.click();
      switchView("view-shop");
      renderShop("breeds");
    };
  }

  // Cat name editing
  const nameInput = document.getElementById("cat-name-display");
  if (nameInput) {
    const handleNameSave = () => {
      const val = nameInput.value.trim();
      if (val && val !== gameState.name) {
        gameState.name = val;
        saveGameState();
        showToast(`เปลี่ยนชื่อน้องแมวเป็น "${val}" เรียบร้อยแล้ว!`, "🐾");
      }
    };
    nameInput.addEventListener("change", handleNameSave);
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        nameInput.blur();
      }
    });
  }

  // Cat Petting interaction
  const livingSpace = document.getElementById("cat-living-space-area");
  if (livingSpace) {
    livingSpace.addEventListener("click", (e) => {
      triggerCatPet(e);
    });
  }

  const stageCat = document.getElementById("stage-cat-avatar");
  if (stageCat) {
    stageCat.addEventListener("click", (e) => {
      triggerCatPet(e);
    });
  }

  // Persistent HUD Cat Pill (Quick access to Cat Room & Title)
  const hudCatPill = document.getElementById("hud-cat-pill");
  if (hudCatPill) {
    hudCatPill.onclick = () => {
      sfx.meow();
      triggerHaptic(20);
      switchView("view-wardrobe");
      renderWardrobeInventory();
    };
  }

  // Hero Sanctuary Card Listeners (Home Screen Pet & Care)
  const heroCatLivingSpace = document.getElementById("hero-cat-living-space");
  if (heroCatLivingSpace) {
    heroCatLivingSpace.onclick = (e) => {
      triggerCatPet(e);
    };
  }

  const btnHeroPet = document.getElementById("btn-hero-pet-cat");
  if (btnHeroPet) {
    btnHeroPet.onclick = (e) => {
      triggerCatPet(e);
    };
  }

  const btnHeroFeed = document.getElementById("btn-hero-feed-cat");
  if (btnHeroFeed) {
    btnHeroFeed.onclick = (e) => {
      feedCatTreat(e);
    };
  }

  const btnHeroWardrobe = document.getElementById("btn-hero-goto-wardrobe");
  if (btnHeroWardrobe) {
    btnHeroWardrobe.onclick = () => {
      sfx.click();
      triggerHaptic(15);
      switchView("view-wardrobe");
      renderWardrobeInventory();
    };
  }

  const btnHeroVocab = document.getElementById("btn-hero-goto-vocab");
  if (btnHeroVocab) {
    btnHeroVocab.onclick = () => {
      sfx.click();
      triggerHaptic(15);
      switchView("view-vocab");
      initVocabDeck(currentVocabDeck);
    };
  }

  const btnHeroEditName = document.getElementById("btn-hero-edit-name");
  if (btnHeroEditName) {
    btnHeroEditName.onclick = () => {
      const newName = prompt("ตั้งชื่อใหม่ให้น้องแมวคู่หูของคุณ:", gameState.name);
      if (newName && newName.trim() && newName.trim() !== gameState.name) {
        gameState.name = newName.trim();
        saveGameState();
        refreshCatAvatars();
        showToast(`เปลี่ยนชื่อน้องแมวเป็น "${gameState.name}" เรียบร้อยแล้ว!`, "🐾");
      }
    };
  }

  // Inventory tab buttons
  document.querySelectorAll(".inv-tab-btn").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      renderWardrobeInventory(btn.dataset.cat);
    };
  });

  // Shop tab buttons
  document.querySelectorAll(".shop-tab-btn").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      renderShop(btn.dataset.cat);
    };
  });

  // Stage dialogue buttons
  const btnNext = document.getElementById("btn-next-turn");
  if (btnNext) btnNext.onclick = nextTurn;

  const btnExit = document.getElementById("btn-exit-stage");
  if (btnExit) btnExit.onclick = exitCurrentStage;

  // Settings & Save Actions
  const btnExport = document.getElementById("btn-export-save");
  if (btnExport) btnExport.onclick = exportSaveData;

  const fileInput = document.getElementById("file-import-save");
  if (fileInput) {
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        importSaveData(e.target.files[0]);
      }
    };
  }

  const btnReset = document.getElementById("btn-reset-game");
  if (btnReset) btnReset.onclick = resetGameProgress;

  // Sound FX toggle
  const chkSound = document.getElementById("chk-setting-sound");
  if (chkSound) {
    chkSound.checked = gameState.settings.soundFx;
    chkSound.onchange = (e) => {
      gameState.settings.soundFx = e.target.checked;
      saveGameState();
    };
  }

  // TTS toggle
  const chkTts = document.getElementById("chk-setting-tts");
  if (chkTts) {
    chkTts.checked = gameState.settings.ttsEnabled;
    chkTts.onchange = (e) => {
      gameState.settings.ttsEnabled = e.target.checked;
      saveGameState();
    };
  }

  // Vocabulary Flashcards Listeners
  document.querySelectorAll(".vocab-deck-btn").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      triggerHaptic(15);
      initVocabDeck(btn.dataset.deck);
    };
  });

  const flashcardInner = document.getElementById("vocab-flashcard-inner");
  if (flashcardInner) {
    flashcardInner.onclick = flipFlashcard;
  }

  const btnSpeakWord = document.getElementById("btn-vocab-speak-word");
  if (btnSpeakWord) {
    btnSpeakWord.onclick = (e) => {
      e.stopPropagation();
      speakCurrentVocabWord();
    };
  }

  const btnSpeakExample = document.getElementById("btn-vocab-speak-example");
  if (btnSpeakExample) {
    btnSpeakExample.onclick = (e) => {
      e.stopPropagation();
      speakCurrentVocabExample();
    };
  }

  const btnVocabReview = document.getElementById("btn-vocab-repeat");
  if (btnVocabReview) {
    btnVocabReview.onclick = handleVocabReview;
  }

  const btnVocabMaster = document.getElementById("btn-vocab-mastered");
  if (btnVocabMaster) {
    btnVocabMaster.onclick = handleVocabMastered;
  }

  const btnReplayDeck = document.getElementById("btn-vocab-replay-deck");
  if (btnReplayDeck) {
    btnReplayDeck.onclick = () => initVocabDeck(currentVocabDeck);
  }

  const btnNextDeck = document.getElementById("btn-vocab-next-deck");
  if (btnNextDeck) {
    btnNextDeck.onclick = () => {
      const order = ["toeic", "toefl", "business"];
      const nextIdx = (order.indexOf(currentVocabDeck) + 1) % order.length;
      initVocabDeck(order[nextIdx]);
    };
  }

  // Squad Lounge Toy Buttons, Navigation & Coffee Cup
  const btnToyLaser = document.getElementById("btn-toy-laser");
  if (btnToyLaser) btnToyLaser.onclick = triggerToyLaser;

  const btnToyCatnip = document.getElementById("btn-toy-catnip");
  if (btnToyCatnip) btnToyCatnip.onclick = triggerToyCatnip;

  const btnToyFeather = document.getElementById("btn-toy-feather");
  if (btnToyFeather) btnToyFeather.onclick = triggerToyFeather;

  const btnToyBox = document.getElementById("btn-toy-box");
  if (btnToyBox) btnToyBox.onclick = triggerToyBox;

  const btnSquadAdoptMore = document.getElementById("btn-squad-adopt-more");
  if (btnSquadAdoptMore) {
    btnSquadAdoptMore.onclick = () => {
      sfx.click();
      switchView("view-shop");
      renderShop("breeds");
    };
  }

  const btnWardrobeGotoSquad = document.getElementById("btn-wardrobe-goto-squad");
  if (btnWardrobeGotoSquad) {
    btnWardrobeGotoSquad.onclick = () => {
      sfx.click();
      switchView("view-adventure");
      const loungeEl = document.getElementById("cat-squad-lounge");
      if (loungeEl) {
        loungeEl.scrollIntoView({ behavior: "smooth" });
      }
    };
  }

  const coffeeCup = document.getElementById("squad-coffee-cup");
  if (coffeeCup) {
    coffeeCup.onclick = () => {
      coffeeCup.classList.add("tipped");
      sfx.click();
      triggerHaptic(40);
      const bubbleText = document.getElementById("squad-bubble-text");
      if (bubbleText) {
        bubbleText.textContent = `"อุ๊ย! แก้วกาแฟตกพื้นเฉยเลย... แมวไม่ได้ทำนะฮะ แรงโน้มถ่วงมันดึงดูดไปเอง ☕😈"`;
      }
      showToast("แก้วกาแฟตกโต๊ะดังเพล้ง! เจ้าเหมียวทำหน้าไม่รู้ไม่ชี้ ☕😹", "💥");
      setTimeout(() => coffeeCup.classList.remove("tipped"), 1800);
    };
  }

  // Initial renders
  updateHUD();
  refreshCatAvatars();
  renderAdventureGrid();
  renderWardrobeInventory();
  renderShop();
  renderDailyQuests();
  initVocabDeck("toeic");
});
