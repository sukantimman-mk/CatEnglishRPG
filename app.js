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
  candidateName: "SUKANT IMMAN",
  masteredVocab: [],
  mistakesClearedCount: 0,
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
  mistakes: [],
  podcastCompletedToday: false,
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
      if (!parsed.mistakes) parsed.mistakes = [];
      parsed.candidateName = parsed.candidateName || parsed.name || "SUKANT IMMAN";
      parsed.masteredVocab = parsed.masteredVocab || [];
      parsed.mistakesClearedCount = parsed.mistakesClearedCount || 0;

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

// ==============================================
// PRONUNCIATION HEATMAP & WORD-LEVEL DRILL ENGINE
// ==============================================
function evaluateDetailedPronunciation(spoken, targetPhrase) {
  if (!targetPhrase) return { overallAccuracy: 0, words: [] };
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  const cleanSpokenWords = clean(spoken).split(/\s+/).filter(Boolean);
  const targetWords = targetPhrase.trim().split(/\s+/).filter(Boolean);

  const wordsAnalysis = targetWords.map((tWord) => {
    const cleanTWord = clean(tWord);
    // 1. Exact match
    if (cleanSpokenWords.includes(cleanTWord)) {
      return {
        word: tWord,
        status: "word-perfect",
        label: "ออกเสียงชัดเป๊ะ ✨",
        tip: "สำเนียงและเสียงพยัญชนะชัดเจนดีมาก!"
      };
    }
    // 2. Near / Partial match
    const nearMatch = cleanSpokenWords.find((sWord) => {
      return (
        sWord.startsWith(cleanTWord.slice(0, -1)) ||
        cleanTWord.startsWith(sWord) ||
        (cleanTWord.length > 4 && sWord.length > 4 && cleanTWord.slice(0, 4) === sWord.slice(0, 4))
      );
    });
    if (nearMatch) {
      return {
        word: tWord,
        status: "word-near",
        label: "ใกล้เคียง ⚡",
        tip: `จับเสียงได้เป็น "${nearMatch}" พยายามเน้นเสียงท้ายคำ (Ending sound) ให้ชัดอีกนิด`
      };
    }
    // 3. Missing or substituted
    return {
      word: tWord,
      status: "word-miss",
      label: "ข้าม/ไม่ชัด ⚠️",
      tip: "คำนี้อาจพูดเร็วเกินไปหรือหลุดเสียงหลัก ลองกดปุ่มฟังเสียงช้า (0.75x) แล้วฝึกเฉพาะคำนี้ดูนะ"
    };
  });

  const perfectCount = wordsAnalysis.filter((w) => w.status === "word-perfect").length;
  const nearCount = wordsAnalysis.filter((w) => w.status === "word-near").length;
  const overallAccuracy = Math.round(((perfectCount * 1.0 + nearCount * 0.6) / targetWords.length) * 100);

  return {
    overallAccuracy: Math.min(100, overallAccuracy),
    words: wordsAnalysis
  };
}

function renderPronunciationHeatmap(spoken, targetPhrase) {
  const box = document.getElementById("pronunciation-heatmap-box");
  const tray = document.getElementById("heatmap-chips-tray");
  const drillCard = document.getElementById("heatmap-drill-card");
  if (!box || !tray) return;

  const result = evaluateDetailedPronunciation(spoken, targetPhrase);
  tray.innerHTML = "";
  box.style.display = "block";
  if (drillCard) drillCard.style.display = "none";

  result.words.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = `heatmap-chip ${item.status}`;
    const icon = item.status === "word-perfect" ? "✓" : item.status === "word-near" ? "~" : "!";
    chip.innerHTML = `<span>${item.word}</span> <small style="opacity:0.75; font-size:0.72rem;">${icon}</small>`;

    chip.onclick = () => {
      triggerHaptic(15);
      if (drillCard) {
        drillCard.style.display = "flex";
        drillCard.innerHTML = `
          <div class="drill-word-info">
            <span class="drill-word-main">"${item.word}"</span>
            <span class="drill-word-tip">${item.label}: ${item.tip}</span>
          </div>
          <div class="drill-actions-wrap">
            <button id="btn-drill-slow-audio" class="btn-drill-listen" title="ฟังเสียงช้า 0.75x">🔊 ฟังช้า (0.75x)</button>
          </div>
        `;
        const btnSlow = document.getElementById("btn-drill-slow-audio");
        if (btnSlow) {
          btnSlow.onclick = () => {
            sfx.click();
            speakSlowWord(item.word);
          };
        }
      }
      speakSlowWord(item.word);
    };

    tray.appendChild(chip);
  });
}

function speakSlowWord(word) {
  if (!window.speechSynthesis) return;
  const clean = word.replace(/[^a-zA-Z]/g, "");
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = "en-US";
  utter.rate = 0.72; // Slow rate for clear phonetic articulation
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
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
// ==============================================
// 3D CUTE FIGURINE CAT & EQUIPMENT RENDER ENGINE
// ==============================================

function renderHatSvg(hatId) {
  if (!hatId) return "";
  if (hatId === "hat_straw") {
    return `
      <!-- 3D Straw Hat -->
      <ellipse cx="60" cy="34" rx="36" ry="9" fill="#d7ccc8" stroke="#8d6e63" stroke-width="2"/>
      <ellipse cx="60" cy="27" rx="18" ry="12" fill="#ffe082" stroke="#8d6e63" stroke-width="2"/>
      <path d="M43,30 Q60,34 77,30" stroke="#f4511e" stroke-width="3" fill="none"/>
    `;
  } else if (hatId === "hat_chef") {
    return `
      <!-- 3D Chef Hat -->
      <path d="M42,34 L78,34 L75,22 C80,18 78,8 60,8 C42,8 40,18 45,22 Z" fill="#ffffff" stroke="#90a4ae" stroke-width="2"/>
      <rect x="42" y="30" width="36" height="8" rx="2" fill="#eceff1" stroke="#90a4ae" stroke-width="1.5"/>
    `;
  } else if (hatId === "hat_detective") {
    return `
      <!-- 3D Detective Cap -->
      <ellipse cx="60" cy="32" rx="26" ry="11" fill="#795548" stroke="#4e342e" stroke-width="2"/>
      <path d="M38,32 Q60,18 82,32" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
      <circle cx="60" cy="22" r="3" fill="#ffb74d"/>
    `;
  } else if (hatId === "hat_wizard") {
    return `
      <!-- 3D Wizard Hat -->
      <polygon points="60,4 40,32 80,32" fill="#5e35b1" stroke="#311b92" stroke-width="2"/>
      <ellipse cx="60" cy="32" rx="30" ry="8" fill="#7e57c2" stroke="#311b92" stroke-width="2"/>
      <polygon points="60,14 62,18 66,18 63,21 64,25 60,23 56,25 57,21 54,18 58,18" fill="#ffd54f"/>
    `;
  } else if (hatId === "hat_crown") {
    return `
      <!-- 3D Royal Crown -->
      <polygon points="42,32 40,16 50,24 60,12 70,24 80,16 78,32" fill="#ffd700" stroke="#b78103" stroke-width="2"/>
      <circle cx="40" cy="15" r="3" fill="#e91e63"/>
      <circle cx="60" cy="11" r="3.5" fill="#2196f3"/>
      <circle cx="80" cy="15" r="3" fill="#4caf50"/>
    `;
  }
  return "";
}

function renderOutfitSvg(outfitId) {
  if (!outfitId) return "";
  if (outfitId === "outfit_hoodie") {
    return `
      <!-- Orange Hoodie -->
      <path d="M40,78 Q60,70 80,78 L84,106 Q60,112 36,106 Z" fill="#ff7043" stroke="#d84315" stroke-width="2"/>
      <path d="M52,77 L60,88 L68,77" fill="none" stroke="#ffffff" stroke-width="2.5"/>
    `;
  } else if (outfitId === "outfit_apron") {
    return `
      <!-- Barista Apron -->
      <path d="M44,78 L76,78 L80,108 L40,108 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/>
      <line x1="44" y1="78" x2="36" y2="86" stroke="#ffffff" stroke-width="2"/>
      <line x1="76" y1="78" x2="84" y2="86" stroke="#ffffff" stroke-width="2"/>
      <rect x="52" y="90" width="16" height="12" rx="2" fill="#ffffff" opacity="0.3"/>
    `;
  } else if (outfitId === "outfit_trench") {
    return `
      <!-- Trench Coat -->
      <path d="M38,76 L82,76 L86,110 L34,110 Z" fill="#a1887f" stroke="#5d4037" stroke-width="2"/>
      <line x1="60" y1="76" x2="60" y2="110" stroke="#5d4037" stroke-width="2"/>
      <circle cx="56" cy="88" r="2.5" fill="#4e342e"/>
      <circle cx="56" cy="98" r="2.5" fill="#4e342e"/>
    `;
  } else if (outfitId === "outfit_cyber") {
    return `
      <!-- Cyber Neon Suit -->
      <path d="M38,76 L82,76 L84,108 L36,108 Z" fill="#212121" stroke="#00e5ff" stroke-width="2"/>
      <line x1="48" y1="80" x2="72" y2="80" stroke="#ff007f" stroke-width="2"/>
      <line x1="60" y1="84" x2="60" y2="104" stroke="#00e5ff" stroke-width="2.5"/>
    `;
  } else if (outfitId === "outfit_tuxedo") {
    return `
      <!-- Tuxedo -->
      <path d="M38,76 L82,76 L84,108 L36,108 Z" fill="#263238" stroke="#102027" stroke-width="2"/>
      <polygon points="52,76 60,94 68,76" fill="#ffffff"/>
      <polygon points="56,80 64,80 60,85" fill="#d32f2f"/>
    `;
  }
  return "";
}

function renderWeaponSvg(weaponId) {
  if (!weaponId) return "";
  if (weaponId === "wpn_fishbone") {
    return `
      <!-- Lucky Fishbone -->
      <g transform="translate(86, 75) rotate(-15)">
        <line x1="0" y1="15" x2="28" y2="15" stroke="#ffa000" stroke-width="3"/>
        <line x1="8" y1="8" x2="8" y2="22" stroke="#ffa000" stroke-width="2"/>
        <line x1="16" y1="10" x2="16" y2="20" stroke="#ffa000" stroke-width="2"/>
        <polygon points="26,15 34,9 34,21" fill="#ffa000"/>
        <circle cx="2" cy="15" r="4" fill="#ffa000"/>
      </g>
    `;
  } else if (weaponId === "wpn_cup") {
    return `
      <!-- Coffee Cup -->
      <g transform="translate(86, 76)">
        <rect x="0" y="4" width="16" height="20" rx="3" fill="#ffffff" stroke="#795548" stroke-width="2"/>
        <path d="M16,9 Q22,14 16,19" fill="none" stroke="#795548" stroke-width="2"/>
        <path d="M4,1 Q6,-4 8,0 Q10,-4 12,0" fill="none" stroke="#b0bec5" stroke-width="1.5"/>
      </g>
    `;
  } else if (weaponId === "wpn_quill") {
    return `
      <!-- Magic Quill -->
      <g transform="translate(86, 70) rotate(-25)">
        <path d="M0,30 Q10,15 5,0 Q20,10 10,30 Z" fill="#9c27b0" stroke="#4a148c" stroke-width="1.5"/>
        <polygon points="2,30 4,36 6,30" fill="#ffd700"/>
      </g>
    `;
  } else if (weaponId === "wpn_mic") {
    return `
      <!-- Golden Mic -->
      <g transform="translate(86, 72) rotate(-10)">
        <rect x="2" y="0" width="10" height="16" rx="5" fill="#ffd700" stroke="#ff8f00" stroke-width="1.5"/>
        <rect x="5" y="16" width="4" height="18" fill="#424242"/>
        <circle cx="7" cy="35" r="4" fill="#ffd700"/>
      </g>
    `;
  } else if (weaponId === "wpn_scepter") {
    return `
      <!-- Catnip Scepter -->
      <g transform="translate(86, 60) rotate(-10)">
        <line x1="6" y1="12" x2="6" y2="44" stroke="#ffd700" stroke-width="3"/>
        <circle cx="6" cy="8" r="8" fill="#4caf50" stroke="#ffd700" stroke-width="2"/>
        <circle cx="6" cy="8" r="3" fill="#ffffff"/>
      </g>
    `;
  }
  return "";
}

function renderVehicleBackSvg(vehicleId) {
  if (!vehicleId) return "";
  if (vehicleId === "veh_cloud") {
    return `
      <!-- Magical Cloud (Back Layer) -->
      <ellipse cx="60" cy="116" rx="46" ry="14" fill="#e1f5fe" stroke="#81d4fa" stroke-width="2"/>
      <circle cx="40" cy="112" r="14" fill="#e1f5fe"/>
      <circle cx="75" cy="110" r="16" fill="#e1f5fe"/>
    `;
  }
  return "";
}

function renderVehicleFrontSvg(vehicleId) {
  if (!vehicleId) return "";
  if (vehicleId === "veh_box") {
    return `
      <!-- Box Kart -->
      <rect x="26" y="100" width="68" height="20" rx="3" fill="#d7ccc8" stroke="#8d6e63" stroke-width="2"/>
      <circle cx="38" cy="120" r="5" fill="#424242" stroke="#212121" stroke-width="1.5"/>
      <circle cx="82" cy="120" r="5" fill="#424242" stroke="#212121" stroke-width="1.5"/>
      <text x="34" y="114" font-size="7.5" font-weight="bold" fill="#5d4037">MEOW EXPRESS</text>
    `;
  } else if (vehicleId === "veh_skate") {
    return `
      <!-- Skateboard -->
      <rect x="20" y="112" width="80" height="6" rx="3" fill="#ff5722" stroke="#bf360c" stroke-width="1.5"/>
      <circle cx="34" cy="120" r="4" fill="#ffd54f"/>
      <circle cx="86" cy="120" r="4" fill="#ffd54f"/>
    `;
  } else if (vehicleId === "veh_roomba") {
    return `
      <!-- Roomba Vacuum -->
      <ellipse cx="60" cy="114" rx="44" ry="10" fill="#37474f" stroke="#263238" stroke-width="2"/>
      <circle cx="60" cy="112" r="4" fill="#00e676"/>
    `;
  } else if (vehicleId === "veh_ufo") {
    return `
      <!-- Alien UFO -->
      <ellipse cx="60" cy="112" rx="48" ry="12" fill="#7e57c2" stroke="#512da8" stroke-width="2"/>
      <ellipse cx="60" cy="106" rx="26" ry="8" fill="#b388ff" opacity="0.6"/>
      <circle cx="35" cy="113" r="2.5" fill="#00e5ff"/>
      <circle cx="60" cy="115" r="2.5" fill="#00e5ff"/>
      <circle cx="85" cy="113" r="2.5" fill="#00e5ff"/>
    `;
  }
  return "";
}

function renderCatSvg(equipped = (typeof gameState !== "undefined" ? gameState.equipped : {}), fur = (typeof gameState !== "undefined" ? (gameState.furColor || "calico") : "calico"), isHappy = (typeof isCatHappyTemp !== "undefined" ? isCatHappyTemp : false)) {
  if (!equipped) equipped = {};
  const uid = "c3d_" + Math.random().toString(36).substring(2, 7);

  // 3D Spherical Color Palettes for each breed
  const palettes = {
    calico: {
      bodyHi: "#ffffff", bodyMid: "#fdf8f4", bodyDark: "#e2d5c8", bodyRim: "#c8b8a8",
      bellyHi: "#ffffff", bellyMid: "#fff6ed", bellyDark: "#f0dfcf",
      earInner: "#ffb6c1", earInnerDark: "#e91e63",
      eyeIrisTop: "#f59e0b", eyeIrisBot: "#78350f", eyeGleam: "#fef3c7",
      blush: "#ff4081",
      leftEarHi: "#455a64", leftEarMid: "#263238", leftEarDark: "#102027",
      rightEarHi: "#ffb74d", rightEarMid: "#ff9800", rightEarDark: "#e65100",
      markings: `
        <!-- 3D Soft Calico Patch Left -->
        <path d="M30,42 Q42,28 52,36 Q50,52 34,54 Z" fill="url(#calicoDarkGrad_${uid})" filter="url(#dropShadowEar_${uid})" opacity="0.95"/>
        <!-- 3D Soft Calico Patch Right -->
        <path d="M68,34 Q82,32 90,46 Q88,58 74,58 Q66,50 68,34 Z" fill="url(#calicoOrangeGrad_${uid})" filter="url(#dropShadowEar_${uid})" opacity="0.95"/>
        <!-- Body Calico Patches -->
        <circle cx="44" cy="88" r="7.5" fill="url(#calicoDarkGrad_${uid})" opacity="0.9"/>
        <path d="M68,80 Q84,76 84,94 Q72,98 68,88 Z" fill="url(#calicoOrangeGrad_${uid})" opacity="0.9"/>
      `
    },
    orange_tabby: {
      bodyHi: "#ffedd5", bodyMid: "#fb923c", bodyDark: "#c2410c", bodyRim: "#9a3412",
      bellyHi: "#fff7ed", bellyMid: "#fed7aa", bellyDark: "#fdba74",
      earInner: "#f472b6", earInnerDark: "#db2777",
      eyeIrisTop: "#10b981", eyeIrisBot: "#064e3b", eyeGleam: "#a7f3d0",
      blush: "#fb7185",
      leftEarHi: "#fed7aa", leftEarMid: "#f97316", leftEarDark: "#c2410c",
      rightEarHi: "#fed7aa", rightEarMid: "#f97316", rightEarDark: "#c2410c",
      markings: `
        <!-- 3D Tabby Forehead Stripes -->
        <path d="M60,34 L60,42 M54,36 L52,44 M66,36 L68,44" stroke="#9a3412" stroke-width="2.2" stroke-linecap="round" opacity="0.85"/>
        <path d="M38,78 Q48,82 40,86 M82,78 Q72,82 80,86" stroke="#9a3412" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>
      `
    },
    british_blue: {
      bodyHi: "#cbd5e1", bodyMid: "#64748b", bodyDark: "#334155", bodyRim: "#1e293b",
      bellyHi: "#e2e8f0", bellyMid: "#94a3b8", bellyDark: "#475569",
      earInner: "#fda4af", earInnerDark: "#e11d48",
      eyeIrisTop: "#ea580c", eyeIrisBot: "#7c2d12", eyeGleam: "#fed7aa",
      blush: "#fb7185",
      leftEarHi: "#94a3b8", leftEarMid: "#64748b", leftEarDark: "#334155",
      rightEarHi: "#94a3b8", rightEarMid: "#64748b", rightEarDark: "#334155",
      markings: ``
    },
    siamese: {
      bodyHi: "#ffffff", bodyMid: "#fef3c7", bodyDark: "#e5d5be", bodyRim: "#bfa993",
      bellyHi: "#ffffff", bellyMid: "#fffdf9", bellyDark: "#f5ece1",
      earInner: "#78350f", earInnerDark: "#451a03",
      eyeIrisTop: "#0284c7", eyeIrisBot: "#082f49", eyeGleam: "#bae6fd",
      blush: "#fb7185",
      leftEarHi: "#5c2d11", leftEarMid: "#3e1c08", leftEarDark: "#1a0b04",
      rightEarHi: "#5c2d11", rightEarMid: "#3e1c08", rightEarDark: "#1a0b04",
      markings: `
        <!-- Siamese 3D Chocolate Mask -->
        <ellipse cx="60" cy="54" rx="20" ry="15" fill="url(#siameseMask_${uid})" opacity="0.95"/>
      `
    },
    scottish_fold: {
      bodyHi: "#fdf4ff", bodyMid: "#e879f9", bodyDark: "#a21caf", bodyRim: "#701a75",
      bellyHi: "#ffffff", bellyMid: "#fae8ff", bellyDark: "#f0abfc",
      earInner: "#f472b6", earInnerDark: "#be185d",
      eyeIrisTop: "#f59e0b", eyeIrisBot: "#78350f", eyeGleam: "#fef3c7",
      blush: "#f43f5e",
      leftEarHi: "#e879f9", leftEarMid: "#c026d3", leftEarDark: "#86198f",
      rightEarHi: "#e879f9", rightEarMid: "#c026d3", rightEarDark: "#86198f",
      markings: ``
    },
    khao_manee: {
      bodyHi: "#ffffff", bodyMid: "#f8fafc", bodyDark: "#e2e8f0", bodyRim: "#cbd5e1",
      bellyHi: "#ffffff", bellyMid: "#ffffff", bellyDark: "#f1f5f9",
      earInner: "#fbcfe8", earInnerDark: "#f472b6",
      eyeIrisTop: "#10b981", eyeIrisBot: "#047857", eyeGleam: "#a7f3d0", // Odd eye left
      eyeIrisRightTop: "#0284c7", eyeIrisRightBot: "#0369a1", eyeGleamRight: "#bae6fd", // Odd eye right
      blush: "#fb7185",
      leftEarHi: "#ffffff", leftEarMid: "#f1f5f9", leftEarDark: "#cbd5e1",
      rightEarHi: "#ffffff", rightEarMid: "#f1f5f9", rightEarDark: "#cbd5e1",
      markings: ``
    },
    bengal: {
      bodyHi: "#fef08a", bodyMid: "#eab308", bodyDark: "#854d0e", bodyRim: "#543007",
      bellyHi: "#fef9c3", bellyMid: "#fde047", bellyDark: "#ca8a04",
      earInner: "#fb7185", earInnerDark: "#be123c",
      eyeIrisTop: "#22c55e", eyeIrisBot: "#14532d", eyeGleam: "#bbf7d0",
      blush: "#f43f5e",
      leftEarHi: "#eab308", leftEarMid: "#a16207", leftEarDark: "#713f12",
      rightEarHi: "#eab308", rightEarMid: "#a16207", rightEarDark: "#713f12",
      markings: `
        <!-- Bengal 3D Leopard Rosettes -->
        <circle cx="42" cy="46" r="3.5" fill="#543007"/> <circle cx="42" cy="46" r="2" fill="#ca8a04"/>
        <circle cx="78" cy="46" r="3.5" fill="#543007"/> <circle cx="78" cy="46" r="2" fill="#ca8a04"/>
        <circle cx="48" cy="86" r="4.5" fill="#543007"/> <circle cx="48" cy="86" r="2.8" fill="#ca8a04"/>
        <circle cx="74" cy="86" r="4.5" fill="#543007"/> <circle cx="74" cy="86" r="2.8" fill="#ca8a04"/>
      `
    },
    persian: {
      bodyHi: "#fff1f2", bodyMid: "#fbcfe8", bodyDark: "#f472b6", bodyRim: "#db2777",
      bellyHi: "#ffffff", bellyMid: "#fdf2f8", bellyDark: "#fce7f3",
      earInner: "#fda4af", earInnerDark: "#e11d48",
      eyeIrisTop: "#0284c7", eyeIrisBot: "#0c4a6e", eyeGleam: "#bae6fd",
      blush: "#f43f5e",
      leftEarHi: "#fbcfe8", leftEarMid: "#f472b6", leftEarDark: "#db2777",
      rightEarHi: "#fbcfe8", rightEarMid: "#f472b6", rightEarDark: "#db2777",
      markings: ``
    },
    tuxedo: {
      bodyHi: "#334155", bodyMid: "#0f172a", bodyDark: "#020617", bodyRim: "#000000",
      bellyHi: "#ffffff", bellyMid: "#f8fafc", bellyDark: "#e2e8f0",
      earInner: "#f472b6", earInnerDark: "#be185d",
      eyeIrisTop: "#eab308", eyeIrisBot: "#713f12", eyeGleam: "#fef08a",
      blush: "#fb7185",
      leftEarHi: "#334155", leftEarMid: "#0f172a", leftEarDark: "#020617",
      rightEarHi: "#334155", rightEarMid: "#0f172a", rightEarDark: "#020617",
      markings: ``
    }
  };

  // Map legacy color names
  let furKey = fur;
  if (furKey === "orange") furKey = "orange_tabby";
  if (furKey === "white") furKey = "khao_manee";
  if (furKey === "pink") furKey = "persian";
  const pal = palettes[furKey] || palettes.calico;

  // Equipment SVGs
  const hatSvg = renderHatSvg(equipped.hat);
  const outfitSvg = renderOutfitSvg(equipped.outfit);
  const weaponSvg = renderWeaponSvg(equipped.weapon);
  const vehicleBackSvg = renderVehicleBackSvg(equipped.vehicle);
  const vehicleFrontSvg = renderVehicleFrontSvg(equipped.vehicle);

  // Odd eye logic for Khao Manee
  const leftEyeGrad = `url(#eye3dGradL_${uid})`;
  const rightEyeGrad = pal.eyeIrisRightTop ? `url(#eye3dGradR_${uid})` : leftEyeGrad;

  // Eyes rendering: cute curved happy arcs when isHappy, or glowing 3D spheres
  const eyesRender = isHappy ? `
    <!-- Super Cute Curved Happy Eyes Arc -->
    <path d="M42,55 Q47,48 52,55" fill="none" stroke="${pal.bodyDark === '#020617' ? '#ffffff' : '#3e2723'}" stroke-width="3" stroke-linecap="round"/>
    <path d="M68,55 Q73,48 78,55" fill="none" stroke="${pal.bodyDark === '#020617' ? '#ffffff' : '#3e2723'}" stroke-width="3" stroke-linecap="round"/>
  ` : `
    <!-- 3D Glass Bead Left Eye -->
    <g class="cat-3d-eye-l">
      <ellipse cx="47" cy="54" rx="6.5" ry="7.5" fill="${leftEyeGrad}"/>
      <ellipse cx="47" cy="54" rx="4.2" ry="5.5" fill="#18181b"/>
      <!-- Primary Specular Gleam Arc -->
      <circle cx="45" cy="51.5" r="2.2" fill="#ffffff"/>
      <!-- Secondary Bounce Light Dot -->
      <circle cx="48.8" cy="56" r="1.1" fill="#ffffff" opacity="0.85"/>
      <path d="M44,57 Q47,59 50,57" fill="none" stroke="${pal.eyeGleam}" stroke-width="0.8" opacity="0.75"/>
    </g>

    <!-- 3D Glass Bead Right Eye -->
    <g class="cat-3d-eye-r">
      <ellipse cx="73" cy="54" rx="6.5" ry="7.5" fill="${rightEyeGrad}"/>
      <ellipse cx="73" cy="54" rx="4.2" ry="5.5" fill="#18181b"/>
      <!-- Primary Specular Gleam Arc -->
      <circle cx="71" cy="51.5" r="2.2" fill="#ffffff"/>
      <!-- Secondary Bounce Light Dot -->
      <circle cx="74.8" cy="56" r="1.1" fill="#ffffff" opacity="0.85"/>
      <path d="M70,57 Q73,59 76,57" fill="none" stroke="${pal.eyeGleamRight || pal.eyeGleam}" stroke-width="0.8" opacity="0.75"/>
    </g>
  `;

  // Folded ears for Scottish Fold
  const isFold = furKey === "scottish_fold";
  const earLRender = isFold ? `
    <!-- Scottish Fold Drooped Cute Ear L -->
    <g class="cat-animated-ear-l">
      <path d="M36,36 Q42,22 48,28 Q44,42 36,36 Z" fill="url(#ear3dGradL_${uid})" filter="url(#dropShadowEar_${uid})"/>
      <path d="M38,34 Q42,25 46,30 Q43,38 38,34 Z" fill="${pal.earInner}"/>
    </g>
  ` : `
    <!-- 3D Conical Ear L -->
    <g class="cat-animated-ear-l">
      <polygon points="32,44 42,16 54,36" fill="url(#ear3dGradL_${uid})" filter="url(#dropShadowEar_${uid})"/>
      <polygon points="36,41 43,23 50,35" fill="url(#earInnerGrad_${uid})"/>
      <line x1="38" y1="35" x2="43" y2="33" stroke="${pal.bodyHi}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="39" y1="38" x2="45" y2="37" stroke="${pal.bodyHi}" stroke-width="1.6" stroke-linecap="round"/>
    </g>
  `;

  const earRRender = isFold ? `
    <!-- Scottish Fold Drooped Cute Ear R -->
    <g class="cat-animated-ear-r">
      <path d="M84,36 Q78,22 72,28 Q76,42 84,36 Z" fill="url(#ear3dGradR_${uid})" filter="url(#dropShadowEar_${uid})"/>
      <path d="M82,34 Q78,25 74,30 Q77,38 82,34 Z" fill="${pal.earInner}"/>
    </g>
  ` : `
    <!-- 3D Conical Ear R -->
    <g class="cat-animated-ear-r">
      <polygon points="88,44 78,16 66,36" fill="url(#ear3dGradR_${uid})" filter="url(#dropShadowEar_${uid})"/>
      <polygon points="84,41 77,23 70,35" fill="url(#earInnerGrad_${uid})"/>
      <line x1="82" y1="35" x2="77" y2="33" stroke="${pal.bodyHi}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="81" y1="38" x2="75" y2="37" stroke="${pal.bodyHi}" stroke-width="1.6" stroke-linecap="round"/>
    </g>
  `;

  return `
    <svg viewBox="0 0 120 130" width="100%" height="100%" class="cat-3d-svg-root" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Soft Drop Shadow Filter for True 3D Depth -->
        <filter id="cat3dGround_${uid}" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="4"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="dropShadowEar_${uid}" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.8"/>
          <feOffset dx="0" dy="2"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.22"/></feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- 3D Spherical Radial Gradients -->
        <radialGradient id="head3dGrad_${uid}" cx="42%" cy="32%" r="68%">
          <stop offset="0%" stop-color="${pal.bodyHi}"/>
          <stop offset="55%" stop-color="${pal.bodyMid}"/>
          <stop offset="85%" stop-color="${pal.bodyDark}"/>
          <stop offset="100%" stop-color="${pal.bodyRim}"/>
        </radialGradient>

        <radialGradient id="body3dGrad_${uid}" cx="42%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${pal.bodyHi}"/>
          <stop offset="55%" stop-color="${pal.bodyMid}"/>
          <stop offset="85%" stop-color="${pal.bodyDark}"/>
          <stop offset="100%" stop-color="${pal.bodyRim}"/>
        </radialGradient>

        <radialGradient id="belly3dGrad_${uid}" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${pal.bellyHi}"/>
          <stop offset="65%" stop-color="${pal.bellyMid}"/>
          <stop offset="100%" stop-color="${pal.bellyDark}"/>
        </radialGradient>

        <radialGradient id="ear3dGradL_${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${pal.leftEarHi}"/>
          <stop offset="60%" stop-color="${pal.leftEarMid}"/>
          <stop offset="100%" stop-color="${pal.leftEarDark}"/>
        </radialGradient>

        <radialGradient id="ear3dGradR_${uid}" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${pal.rightEarHi}"/>
          <stop offset="60%" stop-color="${pal.rightEarMid}"/>
          <stop offset="100%" stop-color="${pal.rightEarDark}"/>
        </radialGradient>

        <linearGradient id="earInnerGrad_${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${pal.earInner}"/>
          <stop offset="100%" stop-color="${pal.earInnerDark}"/>
        </linearGradient>

        <!-- 3D Jewel Eye Gradient Left -->
        <radialGradient id="eye3dGradL_${uid}" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${pal.eyeIrisTop}"/>
          <stop offset="70%" stop-color="${pal.eyeIrisBot}"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </radialGradient>

        <!-- 3D Jewel Eye Gradient Right (for Odd Eyes) -->
        <radialGradient id="eye3dGradR_${uid}" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${pal.eyeIrisRightTop || pal.eyeIrisTop}"/>
          <stop offset="70%" stop-color="${pal.eyeIrisRightBot || pal.eyeIrisBot}"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </radialGradient>

        <!-- 3D Chubby Cheeks Blush -->
        <radialGradient id="blush3dGrad_${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${pal.blush}" stop-opacity="0.75"/>
          <stop offset="70%" stop-color="${pal.blush}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${pal.blush}" stop-opacity="0"/>
        </radialGradient>

        <!-- Calico Gradients -->
        <radialGradient id="calicoOrangeGrad_${uid}" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffb74d"/>
          <stop offset="60%" stop-color="#ff9800"/>
          <stop offset="100%" stop-color="#e65100"/>
        </radialGradient>
        <radialGradient id="calicoDarkGrad_${uid}" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#455a64"/>
          <stop offset="60%" stop-color="#263238"/>
          <stop offset="100%" stop-color="#102027"/>
        </radialGradient>

        <!-- Siamese 3D Mask Gradient -->
        <radialGradient id="siameseMask_${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2d1606" stop-opacity="0.95"/>
          <stop offset="75%" stop-color="#542a0c" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#78350f" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- 3D Soft Floor Contact Shadow -->
      <ellipse cx="60" cy="118" rx="30" ry="7.5" fill="rgba(30, 15, 10, 0.22)" filter="url(#cat3dGround_${uid})"/>

      ${vehicleBackSvg}

      <!-- 3D Animated Tail -->
      <g class="cat-animated-tail">
        <path d="M35,94 Q10,87 14,64 Q21,58 24,67 Q21,83 38,89" fill="url(#body3dGrad_${uid})" filter="url(#dropShadowEar_${uid})"/>
        <!-- Soft highlight arc on tail curve -->
        <path d="M34,92 Q14,85 16,66" fill="none" stroke="${pal.bodyHi}" stroke-width="1.2" opacity="0.6"/>
      </g>

      <!-- 3D Chubby Body with Breathing Physics -->
      <g class="cat-animated-body">
        <!-- 3D Spherical Body -->
        <ellipse cx="60" cy="88" rx="28" ry="23" fill="url(#body3dGrad_${uid})" filter="url(#dropShadowEar_${uid})"/>

        <!-- 3D Soft Fluffy Belly -->
        <ellipse cx="60" cy="92" rx="17" ry="15" fill="url(#belly3dGrad_${uid})"/>

        <!-- Outfit (Torso Layer) -->
        ${outfitSvg}

        <!-- Fluffy 3D Chest Collar Bib -->
        <path d="M51,74 Q60,82 69,74 Q60,69 51,74 Z" fill="${pal.bellyHi}" opacity="0.95"/>

        <!-- 3D Left Ear -->
        ${earLRender}

        <!-- 3D Right Ear -->
        ${earRRender}

        <!-- 3D Spherical Head (Chubby Cute Cheeks) -->
        <ellipse cx="60" cy="54" rx="30" ry="23" fill="url(#head3dGrad_${uid})" filter="url(#dropShadowEar_${uid})"/>

        <!-- Soft 3D Cheek Tufts -->
        <path d="M30,56 Q25,58 31,63 Q26,65 33,67" fill="url(#head3dGrad_${uid})"/>
        <path d="M90,56 Q95,58 89,63 Q94,65 87,67" fill="url(#head3dGrad_${uid})"/>

        <!-- Breed-Specific 3D Markings -->
        ${pal.markings}

        <!-- 3D Soft Chubby Cheek Blushes -->
        <ellipse cx="39" cy="62" rx="6.5" ry="4.5" fill="url(#blush3dGrad_${uid})"/>
        <ellipse cx="81" cy="62" rx="6.5" ry="4.5" fill="url(#blush3dGrad_${uid})"/>

        <!-- 3D Glass Eyes with Dynamic Highlights -->
        ${eyesRender}

        <!-- 3D Cute White Muzzle Puff -->
        <ellipse cx="60" cy="64.5" rx="10.5" ry="7" fill="${pal.bellyHi}" opacity="0.95"/>

        <!-- 3D Tiny Pink Heart Nose Bean -->
        <path d="M57.5,61.5 Q60,60 62.5,61.5 Q60,65.5 57.5,61.5 Z" fill="#f43f5e"/>
        <!-- Specular Nose Gleam -->
        <circle cx="59" cy="61.5" r="0.8" fill="#ffffff"/>

        <!-- Cute W-Mouth Smile -->
        <path d="M54.5,64.5 Q57,67.5 60,64.5 Q63,67.5 65.5,64.5" fill="none" stroke="#5d4037" stroke-width="1.6" stroke-linecap="round"/>

        <!-- 3D Translucent Whiskers with Specular Shimmer -->
        <g stroke="${pal.bodyDark === '#020617' ? '#cbd5e1' : '#a8a29e'}" stroke-width="1.1" stroke-linecap="round" opacity="0.85">
          <!-- Left Whiskers -->
          <line x1="48" y1="63" x2="24" y2="59"/>
          <line x1="48" y1="65.5" x2="22" y2="65.5"/>
          <line x1="48" y1="68" x2="25" y2="72"/>
          <!-- Right Whiskers -->
          <line x1="72" y1="63" x2="96" y2="59"/>
          <line x1="72" y1="65.5" x2="98" y2="65.5"/>
          <line x1="72" y1="68" x2="95" y2="72"/>
        </g>

        <!-- 3D Rounded Front Paws with Toe Bean Cues -->
        <!-- Left Paw -->
        <g class="cat-3d-paw-l">
          <ellipse cx="49" cy="106" rx="7" ry="5.5" fill="url(#body3dGrad_${uid})" filter="url(#dropShadowEar_${uid})"/>
          <!-- Soft Toe Indentations -->
          <path d="M46,104 Q46,107 46,109 M49,103 Q49,107 49,110 M52,104 Q52,107 52,109" fill="none" stroke="${pal.bodyRim}" stroke-width="0.9" opacity="0.45"/>
          <!-- Paw Highlight Top -->
          <ellipse cx="48" cy="104" rx="4" ry="2.2" fill="${pal.bodyHi}" opacity="0.65"/>
        </g>
        <!-- Right Paw -->
        <g class="cat-3d-paw-r">
          <ellipse cx="71" cy="106" rx="7" ry="5.5" fill="url(#body3dGrad_${uid})" filter="url(#dropShadowEar_${uid})"/>
          <!-- Soft Toe Indentations -->
          <path d="M68,104 Q68,107 68,109 M71,103 Q71,107 71,110 M74,104 Q74,107 74,109" fill="none" stroke="${pal.bodyRim}" stroke-width="0.9" opacity="0.45"/>
          <!-- Paw Highlight Top -->
          <ellipse cx="70" cy="104" rx="4" ry="2.2" fill="${pal.bodyHi}" opacity="0.65"/>
        </g>

        <!-- Hat / Headwear layer -->
        ${hatSvg}

        <!-- Weapon / Handheld accessory layer -->
        ${weaponSvg}
      </g>

      ${vehicleFrontSvg}
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

  const freetalkSlot = document.getElementById("freetalk-cat-avatar-slot");
  if (freetalkSlot) freetalkSlot.innerHTML = renderCatSvg();

  const miniAvatars = document.querySelectorAll(".cat-avatar-mini");
  miniAvatars.forEach((el) => {
    el.innerHTML = renderCatSvg();
  });

  // If squad lounge is rendered, refresh squad cats as well
  if (typeof renderCatSquadLounge === "function") {
    renderCatSquadLounge();
  }
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

  // Show cute thought bubble on both Wardrobe, Hero Card and Squad Lounge
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
  const squadBubble = document.getElementById("squad-bubble-text");
  if (squadBubble) {
    squadBubble.textContent = `[${gameState.name}] "${randomPhrase}"`;
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

  // Update CEFR Level Badge in HUD
  const cefrHudText = document.getElementById("hud-cefr-level-text");
  if (cefrHudText && typeof calculateCefrCompetencyMetrics === "function") {
    const cefrData = calculateCefrCompetencyMetrics();
    cefrHudText.textContent = `CEFR ${cefrData.cefrKey}`;
  }

  // Update Daily Habit Quick Play Card (Motivating continuous learning)
  const quickPlayTitle = document.getElementById("daily-quick-play-title");
  const quickPlayDesc = document.getElementById("daily-quick-play-desc");
  if (quickPlayTitle && typeof SCENARIOS !== "undefined") {
    const nextScenario = SCENARIOS.find((sc) => !gameState.completedScenarios[sc.id]) || SCENARIOS[0];
    if (nextScenario) {
      quickPlayTitle.textContent = `${nextScenario.titleTh} (${nextScenario.title}) • CEFR ${nextScenario.cefrLevel || "A2"}`;
      if (quickPlayDesc) {
        quickPlayDesc.textContent = nextScenario.canDoSummary
          ? `Can-Do: ${nextScenario.canDoSummary} • รับทันที +${nextScenario.rewardExp} EXP & +${nextScenario.rewardCoins} PawCoins`
          : `ฝึกสนทนาบทนี้เพื่อรักษาไฟความขยัน • รับทันที +${nextScenario.rewardExp} EXP & +${nextScenario.rewardCoins} PawCoins!`;
      }
    }
  }

  // Update 7-Day Habit Streak Visual Dots
  const streakDotsContainer = document.getElementById("habit-streak-dots");
  if (streakDotsContainer) {
    const currentStreak = gameState.streak || 1;
    let dotsHtml = "";
    for (let day = 1; day <= 7; day++) {
      const isPastOrToday = day <= currentStreak;
      const isRewardDay = day === 7;
      if (isRewardDay) {
        dotsHtml += `<span class="streak-dot reward ${isPastOrToday ? "active" : ""}" title="วันที่ 7: กล่องสุ่มรางวัลใหญ่!">🎁 Day 7</span>`;
      } else {
        dotsHtml += `<span class="streak-dot ${isPastOrToday ? "active" : ""}" title="วันที่ ${day}: ${isPastOrToday ? "สำเร็จแล้ว ✓" : "รอการฝึก"}">🔥 Day ${day}</span>`;
      }
    }
    streakDotsContainer.innerHTML = dotsHtml;
  }

  // Render Adopted Breeds List & Squad Living Lounge
  renderAdoptedBreeds();
  renderCatSquadLounge();
  updateMistakesHUD();

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
        showTurnFeedback(true, "ตอบถูกต้อง! ยอดเยี่ยมมาก 🎉", opt.feedback, turn.vocab, turn, null);
      } else {
        btn.classList.add("selected-wrong");
        sfx.wrong();
        stageScore = Math.max(0, stageScore - 20);
        const correctOpt = turn.options.find((o) => o.isCorrect);
        recordPlayerMistake(
          "scenario",
          turn.contextTh || "Scenario Turn",
          opt.text,
          correctOpt ? correctOpt.text : (turn.targetPhrases ? turn.targetPhrases[0] : ""),
          opt.feedback
        );
        showTurnFeedback(false, "ยังไม่ถูกต้องเท่าไหร่ ลองดูคำแนะนำด้านล่างนะ 🐾", opt.feedback, turn.vocab, turn, null);
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
            `ประโยคที่คุณพูด: "${transcript}"`,
            turn.vocab,
            turn,
            transcript
          );
          checkDailyQuestVoiceSuccess();
        } else {
          sfx.wrong();
          recordPlayerMistake(
            "voice",
            turn.contextTh || "Scenario Voice",
            transcript,
            turn.targetPhrases[0],
            `ออกเสียงได้ ${accuracy}% แตะที่คำสีแดงใน Heatmap ด้านล่างเพื่อฟังเสียงช้าและซ้อมเฉพาะคำนะเหมียว`
          );
          showTurnFeedback(
            false,
            `ลองใหม่อีกนิด! (${accuracy}%)`,
            `แตะที่คำเพื่อฟังเสียงช้า (0.75x) และซ้อมพูดเฉพาะคำได้นะเหมียว:`,
            turn.vocab,
            turn,
            transcript
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

function showTurnFeedback(isSuccess, title, desc, vocabList, turn = null, spoken = null) {
  const feedbackCard = document.getElementById("turn-feedback-card");
  feedbackCard.style.display = "block";
  feedbackCard.className = "turn-feedback-card " + (isSuccess ? "show" : "show wrong");

  document.getElementById("feedback-title").textContent = title;
  document.getElementById("feedback-detail").textContent = desc;

  // Render Pronunciation Heatmap if spoken exists
  const currentTurn = turn || (currentScenario ? currentScenario.dialogues[currentDialogueIdx] : null);
  if (spoken && currentTurn && currentTurn.targetPhrases) {
    renderPronunciationHeatmap(spoken, currentTurn.targetPhrases[0]);
  } else {
    const box = document.getElementById("pronunciation-heatmap-box");
    if (box) box.style.display = "none";
  }

  // Render Nuance Drawer if currentTurn exists
  if (currentTurn) {
    renderNuanceDrawer(currentTurn);
  }

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

// ==============================================
// NUANCE & POLITENESS COACH ENGINE
// ==============================================
function renderNuanceDrawer(turn) {
  const drawer = document.getElementById("nuance-coach-drawer");
  const panel = document.getElementById("nuance-content-panel");
  const arrow = document.getElementById("nuance-arrow");
  const toggleBtn = document.getElementById("btn-toggle-nuance");
  if (!drawer || !panel) return;

  drawer.style.display = "block";
  panel.style.display = "none";
  if (arrow) arrow.classList.remove("open");

  const phrases = turn.targetPhrases || [turn.options.find((o) => o.isCorrect)?.text || ""];
  const correctOpt = turn.options.find((o) => o.isCorrect);
  const baseSentence = correctOpt ? correctOpt.text : phrases[0];

  const tiers = [
    {
      level: "Casual",
      badgeClass: "casual",
      label: "เป็นกันเอง / คุยสบายๆ",
      text: phrases[0] || baseSentence,
      note: "เหมาะสำหรับคุยกับเพื่อน หรือการสื่อสารทั่วไปในชีวิตประจำวัน"
    },
    {
      level: "Polite",
      badgeClass: "polite",
      label: "สุภาพ / ทางการขึ้น",
      text: phrases[1] || phrases[0] || baseSentence,
      note: "เหมาะกับการสั่งอาหาร โรงแรม หรือคุยกับคนไม่คุ้นเคยอย่างให้เกียรติ"
    },
    {
      level: "Executive",
      badgeClass: "exec",
      label: "มืออาชีพ / ในที่ทำงาน",
      text: phrases[2] || phrases[1] || phrases[0] || baseSentence,
      note: "เหมาะสำหรับประชุมงาน ติดต่องาน หรือเจรจาธุรกิจอย่างเป็นทางการ"
    }
  ];

  panel.innerHTML = tiers.map((t) => `
    <div class="nuance-tier-item">
      <div class="nuance-tier-content">
        <div class="nuance-tier-header">
          <span class="nuance-tier-badge ${t.badgeClass}">${t.level}</span>
          <small style="color:#64748b; font-weight:700;">${t.label}</small>
        </div>
        <div class="nuance-tier-text">"${t.text}"</div>
        <div class="nuance-tier-th">💡 ${t.note}</div>
      </div>
      <button class="btn-nuance-speak" data-text="${t.text.replace(/"/g, '&quot;')}" title="ฟังเสียงสำเนียงนี้">🔊</button>
    </div>
  `).join("");

  panel.querySelectorAll(".btn-nuance-speak").forEach((btn) => {
    btn.onclick = () => {
      sfx.click();
      speech.speak(btn.dataset.text);
    };
  });

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const isOpen = panel.style.display === "flex";
      panel.style.display = isOpen ? "none" : "flex";
      if (arrow) arrow.classList.toggle("open", !isOpen);
    };
  }
}

// ==============================================
// SMART MISTAKE VAULT (SPACED REPETITION SYSTEM)
// ==============================================
function recordPlayerMistake(type, questionText, playerAnswer, correctAnswer, explanation) {
  if (!gameState.mistakes) gameState.mistakes = [];

  const existingIdx = gameState.mistakes.findIndex((m) => m.questionText === questionText);
  if (existingIdx >= 0) {
    gameState.mistakes[existingIdx].repeats = (gameState.mistakes[existingIdx].repeats || 1) + 1;
    gameState.mistakes[existingIdx].lastDate = getTodayDateString();
  } else {
    gameState.mistakes.push({
      id: "mistake_" + Date.now(),
      type: type,
      questionText: questionText,
      playerAnswer: playerAnswer,
      correctAnswer: correctAnswer,
      explanation: explanation,
      repeats: 1,
      lastDate: getTodayDateString()
    });
  }
  saveGameState();
  updateMistakesHUD();
}

function updateMistakesHUD() {
  const pill = document.getElementById("btn-hud-mistakes");
  const countEl = document.getElementById("hud-mistakes-count");
  if (!pill) return;

  const count = (gameState.mistakes || []).length;
  if (count > 0) {
    pill.style.display = "flex";
    if (countEl) countEl.textContent = `${count} จุดพลาด`;
  } else {
    pill.style.display = "none";
  }
}

function openMistakesModal() {
  const modal = document.getElementById("mistakes-modal-overlay");
  const container = document.getElementById("mistakes-list-container");
  if (!modal || !container) return;

  sfx.click();
  const mistakes = gameState.mistakes || [];

  if (mistakes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: #16a34a;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
        <h4>ยอดเยี่ยมมาก! ไม่มีจุดพลาดค้างอยู่เลย</h4>
        <p style="font-size: 0.85rem; color: #64748b;">คุณฝึกบทสนทนาและคำศัพท์ได้อย่างแม่นยำ ลุยด่านต่อไปเพื่อเก็บ EXP ได้เลย!</p>
      </div>
    `;
  } else {
    container.innerHTML = mistakes.map((m, idx) => `
      <div class="mistake-item-card">
        <div class="mistake-item-header">
          <span>⚠️ จุดที่เคยตอบผิด (${m.type === "scenario" ? "ด่านสนทนา" : "คำศัพท์"})</span>
          <span>ทบทวนซ้ำ: ${m.repeats} ครั้ง</span>
        </div>
        <div class="mistake-question-text">บริบท: ${m.questionText}</div>
        <div class="mistake-comparison">
          <div class="mistake-wrong-row">❌ คำตอบที่เลือก: "${m.playerAnswer}"</div>
          <div class="mistake-correct-row">✅ คำตอบที่ถูกต้อง: "${m.correctAnswer}"</div>
        </div>
        <div style="font-size:0.8rem; color:#475569;">💡 <strong>คำแนะนำ:</strong> ${m.explanation}</div>
        <div class="mistake-actions-row">
          <button class="btn-mistake-drill" data-idx="${idx}">🎯 เข้าใจแล้ว &amp; ลบออกจากสมุด (+15 EXP)</button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-mistake-drill").forEach((btn) => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx, 10);
        resolveMistake(idx);
      };
    });
  }

  modal.classList.add("show");
}

function resolveMistake(index) {
  if (!gameState.mistakes || !gameState.mistakes[index]) return;
  sfx.levelUp();
  triggerHaptic([30, 40, 30]);
  gameState.mistakes.splice(index, 1);
  saveGameState();
  gainExpAndCoins(15, 5);
  showToast("ทบทวนจุดพลาดสำเร็จ! ได้รับ +15 EXP และ 5 🪙", "🎉");
  openMistakesModal(); // re-render
  updateMistakesHUD();
}

function closeMistakesModal() {
  const modal = document.getElementById("mistakes-modal-overlay");
  if (modal) modal.classList.remove("show");
}

// ==============================================
// 60-SECOND DAILY LISTENING PODCAST ENGINE
// ==============================================
const PODCAST_EPISODES = [
  {
    id: "ep1",
    title: "EP 1: Morning Coffee & Productivity ☕",
    titleTh: "ตอนที่ 1: กาแฟยามเช้าและการเริ่มงานอย่างสดใส",
    lines: [
      { en: "Good morning! Starting the day with a hot cup of coffee always boosts my productivity.", th: "อรุณสวัสดิ์! การเริ่มวันใหม่ด้วยกาแฟร้อนสักแก้วช่วยเพิ่มประสิทธิภาพการทำงานได้เสมอ" },
      { en: "Before checking emails, I like to list my top three priorities for today.", th: "ก่อนเช็กอีเมล ฉันชอบเขียนลิสต์ 3 สิ่งสำคัญที่สุดที่ต้องทำในวันนี้" },
      { en: "Taking short five-minute breaks helps keep your mind sharp and creative.", th: "การพักสั้นๆ 5 นาทีช่วยให้สมองเฉียบคมและมีความคิดสร้างสรรค์" },
      { en: "Let us make today a productive and joyful day together!", th: "มาร่วมทำให้วันนี้เป็นวันที่ productive และมีความสุขไปด้วยกันนะ!" }
    ]
  },
  {
    id: "ep2",
    title: "EP 2: Airport Gate Announcement ✈️",
    titleTh: "ตอนที่ 2: ประกาศขึ้นเครื่องที่สนามบินนานาชาติ",
    lines: [
      { en: "Ladies and gentlemen, flight SQ 318 to London is now ready for boarding.", th: "ท่านสุภาพบุรุษและสุภาพสตรี เที่ยวบิน SQ 318 สู่ลอนดอน พร้อมเปิดให้ขึ้นเครื่องแล้วค่ะ" },
      { en: "Please have your boarding pass and passport ready for inspection at Gate B12.", th: "กรุณาเตรียมบัตรโดยสารและหนังสือเดินทางให้พร้อมสำหรับการตรวจที่ประตู B12" },
      { en: "Passengers traveling with small children are invited to board first.", th: "ขอเชิญผู้โดยสารที่เดินทางพร้อมเด็กเล็กขึ้นเครื่องก่อนได้เลยค่ะ" },
      { en: "Thank you for choosing SkyPurr Airlines. Have a pleasant flight!", th: "ขอบคุณที่เลือกเดินทางกับสายการบิน SkyPurr ขอให้เดินทางโดยสวัสดิภาพค่ะ!" }
    ]
  },
  {
    id: "ep3",
    title: "EP 3: Executive Meeting Kickoff 💼",
    titleTh: "ตอนที่ 3: เปิดการประชุมผู้บริหารและการวางกลยุทธ์",
    lines: [
      { en: "Thank you all for being here on time. Let us begin our quarterly review.", th: "ขอบคุณทุกคนที่มาตรงเวลาครับ ขอเริ่มการประชุมทบทวนผลงานประจำไตรมาสกันเลย" },
      { en: "Our primary objective today is to streamline operations and explore new market opportunities.", th: "เป้าหมายหลักของเราในวันนี้คือการปรับลดขั้นตอนการทำงานและมองหาโอกาสใหม่ในตลาด" },
      { en: "I would like to invite each team lead to briefly present their key achievements.", th: "ผมขอเชิญหัวหน้าทีมแต่ละฝ่ายนำเสนอความสำเร็จสำคัญสั้นๆ ได้เลยครับ" },
      { en: "Let us maintain an open dialogue and collaborate for optimal outcomes.", th: "ขอให้ทุกคนเปิดใจพูดคุยและร่วมมือกันเพื่อผลลัพธ์ที่ดีที่สุดครับ" }
    ]
  }
];

let currentPodcastEp = PODCAST_EPISODES[0];
let podcastPlaying = false;
let podcastLineIdx = 0;
let podcastRate = 1.0;

function openPodcastModal() {
  const modal = document.getElementById("podcast-modal-overlay");
  const select = document.getElementById("podcast-episode-select");
  if (!modal || !select) return;

  sfx.click();
  select.innerHTML = PODCAST_EPISODES.map((ep) => `
    <option value="${ep.id}" ${ep.id === currentPodcastEp.id ? "selected" : ""}>${ep.title}</option>
  `).join("");

  select.onchange = (e) => {
    stopPodcast();
    currentPodcastEp = PODCAST_EPISODES.find((ep) => ep.id === e.target.value) || PODCAST_EPISODES[0];
    renderPodcastScript();
  };

  renderPodcastScript();
  modal.classList.add("show");
}

function closePodcastModal() {
  stopPodcast();
  const modal = document.getElementById("podcast-modal-overlay");
  if (modal) modal.classList.remove("show");
}

function renderPodcastScript() {
  const container = document.getElementById("podcast-script-container");
  if (!container) return;
  container.innerHTML = currentPodcastEp.lines.map((l, idx) => `
    <div class="podcast-script-line ${idx === podcastLineIdx && podcastPlaying ? "active" : ""}" data-idx="${idx}">
      <div class="en">${l.en}</div>
      <div class="th">${l.th}</div>
    </div>
  `).join("");

  container.querySelectorAll(".podcast-script-line").forEach((el) => {
    el.onclick = () => {
      podcastLineIdx = parseInt(el.dataset.idx, 10);
      playPodcastCurrentLine();
    };
  });
}

function togglePodcastPlayback() {
  if (podcastPlaying) {
    stopPodcast();
  } else {
    podcastPlaying = true;
    const playIcon = document.getElementById("podcast-play-icon");
    const playLabel = document.getElementById("podcast-play-label");
    if (playIcon) playIcon.textContent = "⏸️";
    if (playLabel) playLabel.textContent = "หยุดชั่วคราว";
    playPodcastCurrentLine();
  }
}

function stopPodcast() {
  podcastPlaying = false;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  const icon = document.getElementById("podcast-play-icon");
  const label = document.getElementById("podcast-play-label");
  if (icon) icon.textContent = "▶️";
  if (label) label.textContent = "เล่นเสียง";
}

function playPodcastCurrentLine() {
  if (!podcastPlaying || !window.speechSynthesis) return;
  const lines = currentPodcastEp.lines;

  if (podcastLineIdx >= lines.length) {
    stopPodcast();
    podcastLineIdx = 0;
    const claimBtn = document.getElementById("btn-claim-podcast-reward");
    if (claimBtn) claimBtn.style.display = "block";
    sfx.levelUp();
    showToast("ฟังวิทยุแมว 1 นาทีจบแล้ว! กดรับรางวัลได้เลย 🎧🎉", "✨");
    return;
  }

  renderPodcastScript();
  const progressFill = document.getElementById("podcast-progress-fill");
  if (progressFill) {
    progressFill.style.width = `${((podcastLineIdx + 1) / lines.length) * 100}%`;
  }

  const line = lines[podcastLineIdx];
  const utter = new SpeechSynthesisUtterance(line.en);
  utter.lang = "en-US";
  utter.rate = podcastRate;

  utter.onend = () => {
    if (podcastPlaying) {
      podcastLineIdx++;
      setTimeout(playPodcastCurrentLine, 600);
    }
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function togglePodcastSpeed() {
  podcastRate = podcastRate === 1.0 ? 0.8 : 1.0;
  const label = document.getElementById("podcast-speed-label");
  if (label) label.textContent = `⚡ ${podcastRate.toFixed(1)}x`;
  sfx.click();
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

let squadGuestMode = false;

function toggleSquadGuestMode() {
  squadGuestMode = !squadGuestMode;
  sfx.click();
  triggerHaptic(25);
  renderCatSquadLounge();
  const btn = document.getElementById("btn-squad-toggle-guests");
  if (btn) {
    btn.innerHTML = squadGuestMode 
      ? "🏠 แสดงเฉพาะแมวที่รับเลี้ยง" 
      : "👥 รวมพลแก๊งแมว (ทุกพันธุ์)";
  }
  if (squadGuestMode) {
    showToast("ชวนเพื่อนแมวทุกสายพันธุ์มาวิ่งเล่นด้วยกันในห้องแล้ว! 🐱🐾", "✨");
  } else {
    showToast("กลับมาแสดงเฉพาะแมวที่รับเลี้ยงในครอบครัว 🏠🐾", "🐱");
  }
}

function renderCatSquadLounge() {
  const container = document.getElementById("squad-cats-container");
  if (!container) return;
  container.innerHTML = "";

  const allBreeds = SHOP_CATALOG.breeds || [];
  const ownedBreedIds = gameState.inventory.breeds || ["calico"];
  const displayBreedIds = squadGuestMode ? allBreeds.map((b) => b.id) : ownedBreedIds;
  const currentEquippedBreed = gameState.equipped.breed || gameState.furColor || "calico";

  // Update squad count badge
  const countBadge = document.getElementById("squad-cat-count-badge");
  if (countBadge) {
    if (squadGuestMode) {
      countBadge.innerHTML = `🐱 สมาชิกแก๊ง: <strong>${allBreeds.length} / ${allBreeds.length}</strong> ตัว (รวมพลครบทุกสายพันธุ์!)`;
    } else {
      countBadge.innerHTML = `🐱 สมาชิกแก๊ง: <strong>${ownedBreedIds.length} / ${allBreeds.length}</strong> ตัว`;
    }
  }

  displayBreedIds.forEach((breedId, idx) => {
    const breedInfo = allBreeds.find((b) => b.id === breedId) || { id: breedId, nameTh: breedId, icon: "🐱" };
    const behavior = SQUAD_CAT_BEHAVIORS[breedId] || SQUAD_CAT_BEHAVIORS.calico;
    const isMain = breedId === currentEquippedBreed;

    const catItem = document.createElement("div");
    catItem.className = `squad-cat-item ${behavior.actionClass} ${isMain ? "is-main" : ""}`;
    catItem.dataset.breed = breedId;

    // Apply positioning coordinates
    Object.assign(catItem.style, behavior.spot);
    catItem.style.zIndex = 10 + idx;

    // Render SVG for that breed (passing empty object for equipment so natural breed coats shine!)
    const catSvg = renderCatSvg({}, breedId, false);

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
// ==============================================
// REALISTIC INTERACTIVE TOYS & CAT REACTIONS
// แอนิเมชันปฏิกิริยาสมจริง: วิ่งไล่เลเซอร์, ยัดตัวลงกล่อง, กลิ้งฟินแคทนิป, กระโดดตะปบขนนก
// ==============================================

function triggerToyLaser() {
  const laserDot = document.getElementById("squad-laser-dot");
  if (!laserDot) return;

  sfx.click();
  triggerHaptic([30, 40, 30]);

  laserDot.style.display = "block";
  laserDot.style.opacity = "1";

  // Dynamic Waypoints on the rug
  const waypoints = [
    { left: "25%", top: "70%" },
    { left: "68%", top: "52%" },
    { left: "38%", top: "82%" },
    { left: "75%", top: "68%" }
  ];

  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  if (cats.length === 0) return;

  // Pick up to 2 eager cats to actively chase
  const chaserCats = cats.slice(0, Math.min(2, cats.length));

  // Store original positions
  chaserCats.forEach(c => {
    if (!c.dataset.origLeft) {
      c.dataset.origLeft = c.style.left || "50%";
      c.dataset.origTop = c.style.top || "70%";
    }
  });

  let step = 0;
  const runLaserStep = () => {
    if (step < waypoints.length) {
      const wp = waypoints[step];
      laserDot.style.left = wp.left;
      laserDot.style.top = wp.top;

      // Animate cats running and pouncing towards laser dot
      chaserCats.forEach((cat, idx) => {
        // Face the target
        const currentLeftVal = parseFloat(cat.style.left) || 50;
        const targetLeftVal = parseFloat(wp.left);
        const flip = targetLeftVal < currentLeftVal ? "scaleX(-1)" : "scaleX(1)";

        // Offset slightly so cats don't overlap completely
        const offsetLeft = idx === 0 ? 0 : 8;
        const offsetTop = idx === 0 ? 0 : 4;

        cat.style.transition = "left 0.45s cubic-bezier(0.25, 1, 0.5, 1), top 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
        cat.style.left = `calc(${wp.left} + ${offsetLeft}%)`;
        cat.style.top = `calc(${wp.top} + ${offsetTop}%)`;

        // Pounce jump when arriving
        setTimeout(() => {
          sfx.meow();
          cat.style.transform = `${flip} scale(1.22) translateY(-22px)`;
          cat.classList.add("cat-laser-pounce");
          setTimeout(() => {
            cat.style.transform = `${flip}`;
            cat.classList.remove("cat-laser-pounce");
          }, 350);
        }, 380);
      });

      step++;
      setTimeout(runLaserStep, 900);
    } else {
      // Laser vanishes
      laserDot.style.opacity = "0";
      setTimeout(() => { laserDot.style.display = "none"; }, 300);

      // Cats look around confused with question mark
      chaserCats.forEach(cat => {
        cat.style.transform = "rotate(-8deg) scale(1.05)";
        setTimeout(() => {
          cat.style.transform = "rotate(8deg) scale(1.05)";
          setTimeout(() => {
            cat.style.transform = "";
            // Return smoothly to home spot
            cat.style.transition = "left 1.2s ease-in-out, top 1.2s ease-in-out";
            cat.style.left = cat.dataset.origLeft;
            cat.style.top = cat.dataset.origTop;
          }, 500);
        }, 500);
      });

      const bubbleText = document.getElementById("squad-bubble-text");
      if (bubbleText) {
        bubbleText.textContent = `[${gameState.name}] "เหมียววว?! จุดเลเซอร์แดงหายไปไหนแล้ว?! ออกมาให้จับซะดีๆ น้านุด! 🔴🐾"`;
      }
      showToast("จุดเลเซอร์แดงหายไปแล้ว! น้องแมวมองหาตาแป๋วเลยเหมียว 🔴🐱", "🐾");
    }
  };

  runLaserStep();
}

function triggerToyBox() {
  const boxContainer = document.getElementById("squad-box-container");
  if (!boxContainer) return;

  sfx.click();
  triggerHaptic([30, 40]);

  // Render 3D Cardboard Box dropping with dust puff
  boxContainer.style.display = "block";
  boxContainer.style.left = "48%";
  boxContainer.style.top = "66%";
  boxContainer.innerHTML = `
    <div class="toy-cardboard-box" id="active-toy-box" title="แตะที่กล่องเพื่อเล่นกับน้องแมวในกล่อง!">
      <div class="box-flap box-flap-l"></div>
      <div class="box-flap box-flap-r"></div>
      <div class="box-body-cardboard">
        <span class="box-delivery-logo">🐾 AMAZ-MEOW</span>
        <span class="box-fragile-tag">FRAGILE 📦</span>
      </div>
      <div class="box-cat-occupant" id="box-cat-occupant" style="display:none;">
        <!-- Cat head peeking dynamically injected -->
      </div>
    </div>
  `;

  // Nearest cat rushes to box and hops inside!
  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  if (cats.length > 0) {
    const luckyCat = cats[0];
    const origLeft = luckyCat.style.left;
    const origTop = luckyCat.style.top;

    luckyCat.style.transition = "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    luckyCat.style.left = "48%";
    luckyCat.style.top = "64%";

    setTimeout(() => {
      // Cat jumps inside: hide outer cat, show inside box!
      luckyCat.style.opacity = "0";
      sfx.purr();
      triggerHaptic(25);

      const occupant = document.getElementById("box-cat-occupant");
      if (occupant) {
        occupant.style.display = "block";
        occupant.innerHTML = `
          <div class="peeking-cat-wrap">
            <span class="peeking-cat-ears">🐱</span>
            <div class="peeking-cat-paws">🐾 🐾</div>
          </div>
        `;
      }

      const activeBox = document.getElementById("active-toy-box");
      if (activeBox) activeBox.classList.add("box-wiggling");

      const bubbleText = document.getElementById("squad-bubble-text");
      if (bubbleText) {
        bubbleText.textContent = `[${gameState.name}] "If it fits, I sits! กล่องพัสดุใบใหม่นี้ขนาดพอดีตัวเป๊ะ เป็นของข้าแล้วน้านุด! 📦😻"`;
      }
      showToast("น้องแมวกระโดดยัดตัวลงกล่องพัสดุเรียบร้อย! ฟินสุดๆ 📦✨", "📦");
      spawnFloatingHearts();

      // Hop out after 6 seconds
      setTimeout(() => {
        if (occupant) occupant.style.display = "none";
        luckyCat.style.opacity = "1";
        luckyCat.style.transition = "all 0.6s ease";
        luckyCat.style.left = origLeft;
        luckyCat.style.top = origTop;
        sfx.meow();
      }, 6500);
    }, 600);
  }
}

function triggerToyCatnip() {
  const container = document.getElementById("squad-catnip-container");
  if (!container) return;

  sfx.purr();
  triggerHaptic([30, 50, 40]);

  // Spawn 14 animated herbal catnip leaves drifting down
  for (let i = 0; i < 14; i++) {
    const leaf = document.createElement("span");
    leaf.className = "catnip-leaf";
    leaf.textContent = i % 2 === 0 ? "🌿" : "🌱";
    leaf.style.left = `${Math.random() * 80 + 10}%`;
    leaf.style.animationDelay = `${Math.random() * 0.6}s`;
    leaf.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 4000);
  }

  // All cats roll onto their backs/sides with bliss physics!
  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  cats.forEach((cat, idx) => {
    setTimeout(() => {
      const angle = idx % 2 === 0 ? "90deg" : "-90deg";
      cat.style.transition = "transform 0.4s ease-out";
      cat.style.transform = `rotate(${angle}) scale(1.15) translateY(-8px)`;
      cat.classList.add("catnip-bliss");

      // Spawn floating hearts from rolling cat
      spawnFloatingHearts();

      // Return to normal after rolling around
      setTimeout(() => {
        cat.style.transform = "";
        cat.classList.remove("catnip-bliss");
      }, 4200);
    }, idx * 150);
  });

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `[${gameState.name}] "ฟินนนนมากกกก... กลิ่นสมุนไพรนี้ทำให้เคลิ้ม หงายพุงให้เกาเลยเหมียว~ 🌿✨"`;
  }
  showToast("โปรยแคทนิปปาร์ตี้! น้องแมวทุกตัวกลิ้งหงายพุงเคลิ้ม ฟินระดับสิบ 🌿😻", "🌿");
}

function triggerToyFeather() {
  sfx.meow();
  triggerHaptic([25, 40, 25]);

  // Create or animate dangling feather wand
  let wand = document.getElementById("squad-feather-wand");
  const stage = document.getElementById("squad-living-room-stage");
  if (!wand && stage) {
    wand = document.createElement("div");
    wand.id = "squad-feather-wand";
    wand.className = "squad-feather-wand";
    wand.innerHTML = `<span class="feather-stem">🪄</span><span class="feather-plume">🪶</span>`;
    stage.appendChild(wand);
  }

  if (wand) {
    wand.style.display = "block";
    wand.classList.remove("feather-swaying");
    void wand.offsetWidth;
    wand.classList.add("feather-swaying");
  }

  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  if (cats.length > 0) {
    const jumperCat = cats[0];

    // Step 1: Crouch & Butt Wiggle preparing to jump
    jumperCat.style.transition = "transform 0.3s ease";
    jumperCat.style.transform = "scaleY(0.75) translateY(6px)";

    setTimeout(() => {
      // Step 2: EXPLOSIVE HIGH LEAP & SWIPE
      sfx.purr();
      jumperCat.style.transition = "transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)";
      jumperCat.style.transform = "translateY(-55px) scale(1.28) rotate(-6deg)";
      triggerHaptic(35);

      // Step 3: Land gracefully
      setTimeout(() => {
        jumperCat.style.transition = "transform 0.3s ease";
        jumperCat.style.transform = "";
        if (wand) wand.style.display = "none";
      }, 700);
    }, 450);
  }

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `[${gameState.name}] "จับนกได้แล้ว! สายตาและอุ้งเท้านักล่าของแท้ ไม่มีพลาดเหมียว! 🪶⚡"`;
  }
  showToast("สะบัดไม้ขนนก! น้องแมวกระโดดลอยตัวตะปบกลางอากาศเป๊ะ! 🪶🐾", "🪶");
}

function triggerToyYarn() {
  const yarn = document.getElementById("squad-yarn-ball");
  if (!yarn) return;

  sfx.click();
  triggerHaptic([20, 30]);

  // Roll yarn across floor
  yarn.classList.remove("yarn-rolling");
  void yarn.offsetWidth;
  yarn.classList.add("yarn-rolling");

  // Nearest cat chases yarn
  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  if (cats.length > 0) {
    const chaser = cats[Math.floor(Math.random() * cats.length)];
    const origLeft = chaser.style.left;
    chaser.style.transition = "left 0.4s ease, top 0.4s ease";
    chaser.style.left = "42%";
    chaser.style.top = "74%";

    setTimeout(() => {
      sfx.meow();
      chaser.style.transform = "scale(1.2) translateY(-12px)";
      setTimeout(() => {
        chaser.style.transform = "";
        chaser.style.left = origLeft;
      }, 800);
    }, 450);
  }

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `[${gameState.name}] "ลูกบอลไหมพรมกลิ้งดุ๊กดิ๊ก ไล่ตะปบสนุกที่สุดเลยเหมียว! 🧶"`;
  }
  showToast("ลูกบอลไหมพรมกลิ้งหลุนๆ น้องแมววิ่งไล่ตะปบเพลินเลย! 🧶🐾", "🧶");
}

function triggerToyFoodDish() {
  const dish = document.getElementById("squad-food-dish");
  if (!dish) return;

  sfx.purr();
  triggerHaptic([30, 40, 30]);

  dish.innerHTML = "🥣🐟";
  dish.style.transform = "scale(1.3)";
  setTimeout(() => { dish.style.transform = ""; }, 300);

  // All cats rush over to the food bowl (nom-nom eating!)
  const cats = Array.from(document.querySelectorAll(".squad-cat-item"));
  cats.forEach((cat, idx) => {
    const origLeft = cat.style.left;
    const origTop = cat.style.top;
    cat.style.transition = "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    cat.style.left = `calc(75% + ${(idx - 1) * 6}%)`;
    cat.style.top = "76%";

    setTimeout(() => {
      cat.style.transform = "scale(1.1) translateY(4px)";
      spawnFloatingHearts();
      setTimeout(() => {
        cat.style.transform = "";
        cat.style.left = origLeft;
        cat.style.top = origTop;
      }, 2500);
    }, 600);
  });

  // Restore happiness & hunger
  gameState.happiness = 100;
  gameState.hunger = 100;
  gameState.exp = (gameState.exp || 0) + 15;
  saveGameState();
  updateHUD();

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `[${gameState.name}] "งั่มๆๆ ปลาทูหวานฉ่ำ อร่อยที่สุดเลยน้านุด! +15 EXP 🐟😋"`;
  }
  showToast("ป้อนปลาทูแสนอร่อย! น้องแมววิ่งมากินพร้อมหน้า ความสุขเต็ม 100%! 🐟💖", "🐟");
}

// SQUAD AUTONOMOUS PLAY & REAL CAT BEHAVIORS
// ระบบวิ่งเล่นอิสระ & ปฏิสัมพันธ์ของแก๊งแมวเหมียว
// ==============================================
let squadAutonomousTimer = null;

function startSquadAutonomousPlay() {
  if (squadAutonomousTimer) clearInterval(squadAutonomousTimer);

  squadAutonomousTimer = setInterval(() => {
    triggerSpontaneousCatPlay();
  }, 6500);
}

function triggerSpontaneousCatPlay() {
  const container = document.getElementById("squad-cats-container");
  if (!container) return;
  const cats = Array.from(container.querySelectorAll(".squad-cat-item"));
  if (cats.length === 0) return;

  // Pick a random cat
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const breedId = cat.dataset.breed;
  const allBreeds = SHOP_CATALOG.breeds || [];
  const breedInfo = allBreeds.find((b) => b.id === breedId) || { nameTh: "น้องแมว" };
  const bubbleText = document.getElementById("squad-bubble-text");

  const randAction = Math.random();

  if (randAction < 0.35) {
    // 1. Trot / Roam to a new spot in the living room
    const targetLeft = Math.floor(Math.random() * 65 + 12) + "%";
    const targetBottom = Math.floor(Math.random() * 55 + 45) + "px";

    cat.classList.add("cat-trotting");
    cat.style.left = targetLeft;
    cat.style.bottom = targetBottom;

    setTimeout(() => {
      cat.classList.remove("cat-trotting");
    }, 1300);

    if (bubbleText && Math.random() < 0.3) {
      bubbleText.textContent = `[${breedInfo.nameTh}] "เดินสำรวจพรมมุมใหม่... ปลอดภัยหายห่วง นั่งชิลต่อได้เหมียว! 🐾"`;
    }
  } else if (randAction < 0.55) {
    // 2. Zoomies! Fast sprint across the room
    cat.classList.add("action-zoomies");
    if (bubbleText) {
      bubbleText.textContent = `[${breedInfo.nameTh}] "ซูมมี่เข้าสิง! วิ่ง 4x100 สปีดเสือดาว ดริฟต์เลี้ยวโค้งพรมห้องนั่งเล่น! ⚡😹"`;
    }
    setTimeout(() => {
      cat.classList.remove("action-zoomies");
    }, 3200);
  } else if (randAction < 0.70) {
    // 3. Cat Stretch (บิดขี้เกียจ โก่งตัว)
    cat.classList.add("cat-stretching");
    if (bubbleText && Math.random() < 0.4) {
      bubbleText.textContent = `[${breedInfo.nameTh}] "บิดขี้เกียจ โก่งหลังยืดเส้นยืดสาย... สบายตัวจังเลยนุด~ 🧘🐾"`;
    }
    setTimeout(() => {
      cat.classList.remove("cat-stretching");
    }, 1600);
  } else if (randAction < 0.85) {
    // 4. Butt Wiggle Pounce (หมอบส่ายก้น ตะครุบ)
    cat.classList.add("cat-pouncing");
    if (bubbleText) {
      bubbleText.textContent = `[${breedInfo.nameTh}] "ล็อกเป้าหมายฝุ่นลอยในอากาศ... หมอบต่ำส่ายก้น 3 2 1 ตะครุบ! 🎯🐾"`;
    }
    setTimeout(() => {
      cat.classList.remove("cat-pouncing");
    }, 600);
  } else {
    // 5. Trot to food dish for a snack
    cat.classList.add("cat-trotting");
    cat.style.left = "72%";
    cat.style.bottom = "52px";

    setTimeout(() => {
      cat.classList.remove("cat-trotting");
      cat.classList.add("cat-eating");
      if (bubbleText) {
        bubbleText.textContent = `[${breedInfo.nameTh}] "แวะมาดมชามอาหาร เลียเศษปลาทูรองท้องสักหน่อย งั่มๆ 🥣🐟"`;
      }
      setTimeout(() => {
        cat.classList.remove("cat-eating");
      }, 2500);
    }, 1200);
  }
}

function triggerSquadYarnBall() {
  const yarn = document.getElementById("squad-yarn-ball");
  if (!yarn) return;

  sfx.click();
  triggerHaptic([25, 35]);
  yarn.classList.add("rolling");

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `"ลูกบอลไหมพรมกลิ้งหมุนติ้วๆ! น้องแมววิ่งกรูเข้ามาแย่งตะปบกันใหญ่ 🧶🐾"`;
  }
  showToast("เล่นลูกบอลไหมพรมกับแก๊งเหมียว! 🧶😸", "✨");

  // Pick nearest or random cat to pounce the yarn
  const container = document.getElementById("squad-cats-container");
  if (container) {
    const cats = Array.from(container.querySelectorAll(".squad-cat-item"));
    if (cats.length > 0) {
      const luckyCat = cats[Math.floor(Math.random() * cats.length)];
      luckyCat.classList.add("cat-trotting");
      luckyCat.style.left = "56%";
      luckyCat.style.bottom = "50px";

      setTimeout(() => {
        luckyCat.classList.remove("cat-trotting");
        luckyCat.classList.add("cat-pouncing");
        sfx.meow();
        setTimeout(() => luckyCat.classList.remove("cat-pouncing"), 600);
      }, 800);
    }
  }

  setTimeout(() => {
    yarn.classList.remove("rolling");
  }, 1300);
}

function triggerSquadFoodDish() {
  const dish = document.getElementById("squad-food-dish");
  if (!dish) return;

  sfx.purr();
  triggerHaptic([30, 45, 30]);

  // Dish animation
  dish.style.transform = "scale(1.3) rotate(-12deg)";
  setTimeout(() => dish.style.transform = "", 400);

  // Boost happiness +5 & hunger +10
  gameState.happiness = Math.min(100, (gameState.happiness || 100) + 5);
  gameState.hunger = Math.min(100, (gameState.hunger || 90) + 10);
  saveGameState();

  const bubbleText = document.getElementById("squad-bubble-text");
  if (bubbleText) {
    bubbleText.textContent = `"เติมนมสดและปลาทูแสนอร่อยลงชาม! น้องๆ รี่เข้ามารุมกินด้วยความฟิน 🐟🥣 Purrrr~"`;
  }
  showToast("เสิร์ฟปลาทูและนมสดให้แก๊งแมว! (+5 ความสุข, +10 ความอิ่ม) 🐟❤️", "🥣");

  // Cats trot near the dish and eat
  const container = document.getElementById("squad-cats-container");
  if (container) {
    const cats = Array.from(container.querySelectorAll(".squad-cat-item"));
    cats.forEach((cat, idx) => {
      setTimeout(() => {
        cat.classList.add("cat-trotting");
        const targetLeft = (66 + (idx % 3) * 6) + "%";
        cat.style.left = targetLeft;
        cat.style.bottom = (46 + (idx % 2) * 12) + "px";

        setTimeout(() => {
          cat.classList.remove("cat-trotting");
          cat.classList.add("cat-eating");
          setTimeout(() => cat.classList.remove("cat-eating"), 2800);
        }, 800);
      }, idx * 150);
    });
  }
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
// Current selected pack (1, 2, 3, or 4)
window.currentPackNumber = window.currentPackNumber || 1;

function isPackUnlocked(packNum) {
  if (packNum <= 1) return true;
  const completed = gameState.completedScenarios || {};
  if (packNum === 2) {
    // Requires completing at least 8 of Pack 1 (or all 10)
    const pack1Ids = ["cafe_order", "directions", "clinic_visit", "park_chit_chat", "hotel_checkin", "convenience_store", "airport_flight", "fast_food", "lost_and_found", "movie_theater"];
    const cleared = pack1Ids.filter(id => completed[id]).length;
    return cleared >= 8;
  }
  if (packNum === 3) {
    // Requires completing at least 8 of Pack 2
    const p2Scens = (typeof SCENARIOS !== "undefined" ? SCENARIOS : []).filter(s => s.packNumber === 2);
    const cleared = p2Scens.filter(s => completed[s.id]).length;
    return cleared >= 8;
  }
  if (packNum === 4) {
    // Requires completing at least 8 of Pack 3
    const p3Scens = (typeof SCENARIOS !== "undefined" ? SCENARIOS : []).filter(s => s.packNumber === 3);
    const cleared = p3Scens.filter(s => completed[s.id]).length;
    return cleared >= 8;
  }
  return false;
}

function renderAdventureGrid() {
  const container = document.getElementById("scenario-cards-grid");
  if (!container) return;
  container.innerHTML = "";

  const packTabs = document.querySelectorAll(".stage-pack-tab");
  packTabs.forEach(tab => {
    const pNum = parseInt(tab.dataset.pack);
    const isUnlocked = isPackUnlocked(pNum);
    const statusEl = document.getElementById(`pack-tab-status-${pNum}`);
    
    tab.classList.toggle("active", pNum === window.currentPackNumber);
    tab.classList.toggle("is-locked", !isUnlocked);

    if (statusEl) {
      if (isUnlocked) {
        // Count cleared in this pack
        const packScens = SCENARIOS.filter(s => s.packNumber === pNum);
        const clearedCount = packScens.filter(s => gameState.completedScenarios[s.id]).length;
        statusEl.innerHTML = clearedCount === packScens.length ? "✓ ผ่านครบแล้ว (10/10)" : `กำลังฝึก (${clearedCount}/${packScens.length})`;
        statusEl.style.color = "#166534";
      } else {
        statusEl.innerHTML = `🔒 ปลดล็อกเมื่อผ่านชุดที่ ${pNum - 1}`;
        statusEl.style.color = "#991b1b";
      }
    }

    tab.onclick = () => {
      sfx.click();
      triggerHaptic(20);
      if (!isUnlocked) {
        showToast(`🔒 ชุดที่ ${pNum} ยังไม่ปลดล็อก! กรุณาเคลียร์ชุดที่ ${pNum - 1} ก่อนนะเหมียว`, "🔒");
        return;
      }
      window.currentPackNumber = pNum;
      renderAdventureGrid();
    };
  });

  // Render Pack Header Banner
  const bannerEl = document.getElementById("stage-pack-banner");
  const packInfo = {
    1: { name: "ชุดที่ 1: ชีวิตประจำวันและการเดินทาง (Daily Survival)", cefr: "CEFR A1 – A2", desc: "ฝึกฝนการเอาตัวรอด การสั่งอาหาร การซื้อของ และการสนทนาในชีวิตจริง 10 ด่านแรก" },
    2: { name: "ชุดที่ 2: การทำงานและออฟฟิศมืออาชีพ (Workplace Career)", cefr: "CEFR B1 – B1+", desc: "พัฒนาการสื่อสารในที่ทำงาน การสัมภาษณ์งาน การประชุมทีม Standup และการตอบอีเมลธุรกิจ" },
    3: { name: "ชุดที่ 3: ธุรกิจระดับสากลและการเจรจาต่อรอง (Global Business)", cefr: "CEFR B2", desc: "เจรจาดีลธุรกิจ สัญญากฎหมาย การตรวจสอบซัพพลายเออร์ และการแถลงข่าวในภาวะวิกฤต" },
    4: { name: "ชุดที่ 4: ผู้นำเชิงยุทธศาสตร์และการทูตสากล (Executive Diplomacy)", cefr: "CEFR C1", desc: "ขั้นสูงสุดของ MeowQuest! การกล่าวปาฐกถาเวทีโลก พิธีการทูต และการลงนามสนธิสัญญาสากล" }
  };
  const curInfo = packInfo[window.currentPackNumber] || packInfo[1];
  const curPackScenarios = SCENARIOS.filter(s => (s.packNumber || 1) === window.currentPackNumber);
  const curClearedCount = curPackScenarios.filter(s => gameState.completedScenarios[s.id]).length;

  if (bannerEl) {
    bannerEl.innerHTML = `
      <div class="pack-banner-content">
        <div class="pack-banner-text">
          <div class="pack-banner-badge-row">
            <span class="pack-badge-pill">ชุดที่ ${window.currentPackNumber} / 4</span>
            <span class="pack-cefr-pill">${curInfo.cefr}</span>
            <span class="pack-progress-pill">${curClearedCount} / ${curPackScenarios.length} ด่านผ่านแล้ว</span>
          </div>
          <h3 class="pack-banner-title">${curInfo.name}</h3>
          <p class="pack-banner-desc">${curInfo.desc}</p>
        </div>
        <div class="pack-banner-progress-wrap">
          <div class="pack-progress-track">
            <div class="pack-progress-bar-fill" style="width: ${(curClearedCount / curPackScenarios.length) * 100}%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  // Render 10 Stages for Current Pack with Progressive Lock Logic
  curPackScenarios.forEach((sc, idx) => {
    const card = document.createElement("div");
    
    // Unlock condition:
    // First stage in pack is unlocked if the pack is unlocked.
    // Subsequent stages require previous stage in pack to be completed!
    const isFirstInPack = idx === 0;
    const prevScenario = idx > 0 ? curPackScenarios[idx - 1] : null;
    const isStageUnlocked = isFirstInPack || (prevScenario && gameState.completedScenarios[prevScenario.id]);
    const progress = gameState.completedScenarios[sc.id];
    const isCompleted = !!progress;
    const bestStars = progress ? "⭐".repeat(progress.bestStars) : "☆☆☆";

    card.className = `scenario-card ${!isStageUnlocked ? "is-stage-locked" : ""} ${isCompleted ? "is-stage-completed" : ""}`;

    card.innerHTML = `
      <div class="scenario-stage-num-badge">ด่านที่ ${sc.stageNumber || idx + 1}</div>
      <div class="scenario-header">
        <div class="scenario-icon">${sc.icon}</div>
        <div class="scenario-title-area">
          <h3>${sc.titleTh}</h3>
          <span class="subtitle">${sc.title}</span>
        </div>
      </div>
      <div class="scenario-meta">
        <span class="badge ${sc.difficulty === "Beginner" ? "badge-diff-beginner" : sc.difficulty === "Intermediate" ? "badge-diff-intermediate" : "badge-diff-advanced"}">${sc.difficulty}</span>
        <span class="badge" style="background:#fef3c7; color:#92400e; font-weight:800; border:1px solid #fde68a;">CEFR ${sc.cefrLevel || "A2"}</span>
        <span class="badge badge-cat">${sc.category}</span>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">สถิติ: ${bestStars}</span>
      </div>
      <div class="scenario-desc">
        ${sc.description}
        <div style="font-size: 0.74rem; color: #b45309; margin-top: 5px; font-weight: 600;">
          🎯 <em>Can-Do: ${sc.canDoSummary || sc.cefrCanDo || ""}</em>
        </div>
      </div>
      <div class="scenario-footer">
        <div class="rewards-preview">
          <span class="reward-exp">+${sc.rewardExp} EXP</span>
          <span class="reward-coin">+${sc.rewardCoins} 🪙</span>
        </div>
        ${isStageUnlocked ? `
          <button class="btn-play-scenario ${isCompleted ? "btn-replay" : ""}" data-id="${sc.id}">
            ${isCompleted ? "ฝึกซ้ำเพื่อความแม่นยำ 🔁" : "เริ่มบทสนทนา ▶"}
          </button>
        ` : `
          <button class="btn-play-scenario btn-locked-stage" data-id="${sc.id}" disabled title="เคลียร์ด่านที่ ${prevScenario.stageNumber || idx} ก่อนเพื่อปลดล็อก">
            🔒 ปลดล็อกเมื่อผ่านด่านที่ ${prevScenario.stageNumber || idx}
          </button>
        `}
      </div>
    `;

    if (isStageUnlocked) {
      card.querySelector(".btn-play-scenario").onclick = () => {
        sfx.click();
        triggerHaptic(20);
        startScenario(sc.id);
      };
    } else {
      card.onclick = () => {
        triggerHaptic(15);
        showToast(`🔒 ด่านนี้ยังล็อกอยู่! เคลียร์ด่านที่ ${prevScenario.stageNumber || idx} (${prevScenario.titleTh}) ก่อนนะเหมียว`, "🔒");
      };
    }

    container.appendChild(card);
  });
}

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
  if (tagFront) tagFront.textContent = `${card.contextTag} • CEFR ${card.cefrLevel || "B1"}`;

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
    if (card) {
      masteredVocabCards.add(card.id);
      if (!gameState.masteredVocab) gameState.masteredVocab = [];
      if (!gameState.masteredVocab.includes(card.id)) {
        gameState.masteredVocab.push(card.id);
        saveGameState();
      }
    }
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
      if (viewId === "view-ai-freetalk") renderFreeTalkView();
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
      if (viewId === "view-ai-freetalk") renderFreeTalkView();
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

  // Button: Quick Play Stage (Instant Daily Learning Launcher)
  const btnQuickPlay = document.getElementById("btn-quick-play-stage");
  if (btnQuickPlay) {
    btnQuickPlay.onclick = () => {
      sfx.click();
      triggerHaptic(25);
      if (typeof SCENARIOS !== "undefined" && SCENARIOS.length > 0) {
        const nextScenario = SCENARIOS.find((sc) => !gameState.completedScenarios[sc.id]) || SCENARIOS[0];
        if (nextScenario) {
          startScenario(nextScenario.id);
        }
      }
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

  const btnToyYarn = document.getElementById("btn-toy-yarn");
  if (btnToyYarn) btnToyYarn.onclick = triggerToyYarn;

  const btnToyDish = document.getElementById("btn-toy-dish");
  if (btnToyDish) btnToyDish.onclick = triggerToyFoodDish;

  const squadYarn = document.getElementById("squad-yarn-ball");
  if (squadYarn) squadYarn.onclick = triggerToyYarn;

  const squadDish = document.getElementById("squad-food-dish");
  if (squadDish) squadDish.onclick = triggerToyFoodDish;

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

  // Smart Mistake Vault Modals
  const btnHudMistakes = document.getElementById("btn-hud-mistakes");
  if (btnHudMistakes) btnHudMistakes.onclick = openMistakesModal;

  const btnCloseMistakes = document.getElementById("btn-close-mistakes-modal");
  if (btnCloseMistakes) btnCloseMistakes.onclick = closeMistakesModal;

  // 60-Second Daily Listening Podcast Modals & Player
  const btnHudPodcast = document.getElementById("btn-hud-podcast");
  if (btnHudPodcast) btnHudPodcast.onclick = openPodcastModal;

  const btnClosePodcast = document.getElementById("btn-close-podcast-modal");
  if (btnClosePodcast) btnClosePodcast.onclick = closePodcastModal;

  const btnPodcastPlay = document.getElementById("btn-podcast-play");
  if (btnPodcastPlay) btnPodcastPlay.onclick = togglePodcastPlayback;

  const btnPodcastSpeed = document.getElementById("btn-podcast-speed");
  if (btnPodcastSpeed) btnPodcastSpeed.onclick = togglePodcastSpeed;

  const btnClaimPodcast = document.getElementById("btn-claim-podcast-reward");
  if (btnClaimPodcast) {
    btnClaimPodcast.onclick = () => {
      gainExpAndCoins(20, 10);
      showToast("รับรางวัลฟังวิทยุแมวสำเร็จ! +20 EXP และ +10 🪙", "🎉");
      btnClaimPodcast.style.display = "none";
      closePodcastModal();
    };
  }

  // Squad Lounge Interactive Props (Yarn Ball, Food Dish, Guests Toggle)
  const squadYarn = document.getElementById("squad-yarn-ball");
  if (squadYarn) squadYarn.onclick = triggerSquadYarnBall;

  const squadFood = document.getElementById("squad-food-dish");
  if (squadFood) squadFood.onclick = triggerSquadFoodDish;

  const btnSquadGuests = document.getElementById("btn-squad-toggle-guests");
  if (btnSquadGuests) btnSquadGuests.onclick = toggleSquadGuestMode;

  // PWA Modal & Install Action Listeners
  const btnHudInstall = document.getElementById("btn-hud-install-pwa");
  if (btnHudInstall) btnHudInstall.onclick = openPwaInstallModal;

  const btnSettingsInstall = document.getElementById("btn-install-pwa-settings");
  if (btnSettingsInstall) btnSettingsInstall.onclick = openPwaInstallModal;

  const btnClosePwa = document.getElementById("btn-close-pwa-modal");
  if (btnClosePwa) btnClosePwa.onclick = closePwaInstallModal;

  const btnDoInstall = document.getElementById("btn-pwa-do-install");
  if (btnDoInstall) btnDoInstall.onclick = triggerPwaInstall;

  const pwaOverlay = document.getElementById("pwa-install-modal-overlay");
  if (pwaOverlay) {
    pwaOverlay.onclick = (e) => {
      if (e.target === pwaOverlay) closePwaInstallModal();
    };
  }

  // CEFR & Certificate Action Listeners
  const btnHudCefr = document.getElementById("btn-hud-cefr-cert");
  if (btnHudCefr) btnHudCefr.onclick = () => openCefrModal("radar");

  const btnHeroCefr = document.getElementById("btn-hero-open-cefr");
  if (btnHeroCefr) btnHeroCefr.onclick = () => openCefrModal("radar");

  const btnSettingsCefr = document.getElementById("btn-settings-open-cefr");
  if (btnSettingsCefr) btnSettingsCefr.onclick = () => openCefrModal("radar");

  const btnCloseCefr = document.getElementById("btn-close-cefr-modal");
  if (btnCloseCefr) btnCloseCefr.onclick = closeCefrModal;

  const tabBtnRadar = document.getElementById("tab-btn-cefr-radar");
  if (tabBtnRadar) tabBtnRadar.onclick = () => switchCefrTab("radar");

  const tabBtnCert = document.getElementById("tab-btn-cefr-cert");
  if (tabBtnCert) tabBtnCert.onclick = () => switchCefrTab("cert");

  const btnGotoCert = document.getElementById("btn-goto-cert-tab");
  if (btnGotoCert) btnGotoCert.onclick = () => switchCefrTab("cert");

  const btnSaveCertName = document.getElementById("btn-save-cert-name");
  if (btnSaveCertName) {
    btnSaveCertName.onclick = () => {
      const input = document.getElementById("input-cert-candidate-name");
      if (input && input.value.trim()) {
        saveCandidateName(input.value.trim());
      }
    };
  }

  const btnDownloadCert = document.getElementById("btn-download-cert-png");
  if (btnDownloadCert) btnDownloadCert.onclick = downloadCertificatePng;

  const btnPrintCert = document.getElementById("btn-print-cert");
  if (btnPrintCert) btnPrintCert.onclick = () => window.print();

  const btnCopyCert = document.getElementById("btn-copy-cert-text");
  if (btnCopyCert) btnCopyCert.onclick = copyCertificateText;

  const cefrModalOverlay = document.getElementById("cefr-cert-modal-overlay");
  if (cefrModalOverlay) {
    cefrModalOverlay.onclick = (e) => {
      if (e.target === cefrModalOverlay) closeCefrModal();
    };
  }

  // Register PWA Service Worker
  registerServiceWorker();

  // Start Autonomous Real Cat Playground Loop
  startSquadAutonomousPlay();

  // Initial renders
  updateHUD();
  refreshCatAvatars();
  renderAdventureGrid();
  renderWardrobeInventory();
  renderShop();
  renderDailyQuests();
  initVocabDeck("toeic");

  // Wire AI Cat Free-Talk Companion
  const btnHeroTalk = document.getElementById("btn-hero-talk-cat");
  if (btnHeroTalk) {
    btnHeroTalk.onclick = () => {
      sfx.meow();
      triggerHaptic(20);
      switchView("view-ai-freetalk");
      renderFreeTalkView();
    };
  }

  const freetalkSendBtn = document.getElementById("freetalk-send-btn");
  const freetalkInput = document.getElementById("freetalk-text-input");
  if (freetalkSendBtn && freetalkInput) {
    freetalkSendBtn.onclick = () => {
      sendUserFreeTalkMessage(freetalkInput.value);
    };
    freetalkInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        sendUserFreeTalkMessage(freetalkInput.value);
      }
    };
  }

  const freetalkMicBtn = document.getElementById("freetalk-mic-btn");
  if (freetalkMicBtn) {
    freetalkMicBtn.onclick = () => {
      setupFreeTalkSpeech();
    };
  }

  const freetalkSlowBtn = document.getElementById("freetalk-btn-slow-audio");
  if (freetalkSlowBtn) {
    freetalkSlowBtn.onclick = () => {
      isSlowFreeTalkAudio = !isSlowFreeTalkAudio;
      sfx.click();
      freetalkSlowBtn.classList.toggle("active", isSlowFreeTalkAudio);
      showToast(isSlowFreeTalkAudio ? "เปิดเสียงสโลว์โมชั่น (0.8x) ชัดถ้อยชัดคำ 🐢" : "เปิดเสียงความเร็วปกติ 🐇", "🔊");
    };
  }

  const freetalkClearBtn = document.getElementById("freetalk-btn-clear-chat");
  if (freetalkClearBtn) {
    freetalkClearBtn.onclick = clearFreeTalkHistory;
  }

  // Quick Topic Pills Click
  document.querySelectorAll(".topic-pill").forEach(pill => {
    pill.onclick = () => {
      const prompt = pill.dataset.prompt;
      if (prompt) {
        sendUserFreeTalkMessage(prompt);
      }
    };
  });

});

// ==============================================
// 14. AI CAT FREE-TALK COMPANION & GRAMMAR DOCTOR
// ห้องสนทนาภาษาอังกฤษอิสระกับน้องแมว AI + หมอตรวจไวยากรณ์
// ==============================================

const CAT_GRAMMAR_RULES = [
  {
    id: "am_agree",
    pattern: /\bI\s+am\s+agree\b/i,
    fix: "I agree",
    why: "คำว่า 'agree' เป็นคำกริยา (Verb) ในตัวมันเองแล้ว ไม่ต้องใส่ Verb to be ('am') ซ้อนข้างหน้าน้านุด! ✨"
  },
  {
    id: "interesting_in",
    pattern: /\bI\s+am\s+(?:very\s+)?interesting\s+in\b/i,
    fix: "I am interested in",
    why: "ความรู้สึกของคนเราใช้รูป -ed ('interested') ส่วนสิ่งของหรือเรื่องที่น่าสนใจจึงใช้ -ing ('interesting') จ้า 💡"
  },
  {
    id: "boring_person",
    pattern: /\bI\s+am\s+boring\b/i,
    fix: "I am bored",
    why: "'I am bored' = ฉันรู้สึกเบื่อ ส่วน 'I am boring' = ฉันเป็นคนน่าเบื่อ น้านุดไม่ได้น่าเบื่อแน่นอนใช่มั้ยเหมียว? 😹"
  },
  {
    id: "yesterday_past",
    pattern: /\byesterday\s+I\s+(go|see|eat|buy|come|have)\b/i,
    fix: "yesterday I went / saw / ate / bought / came / had",
    why: "เมื่อมีคำบอกเวลาอดีต ('yesterday') ต้องเปลี่ยนกริยาเป็นรูปอดีต (Past Simple: V.2) น้านุด 🕰️"
  },
  {
    id: "he_she_dont",
    pattern: /\b(he|she|it)\s+don't\b/i,
    fix: "$1 doesn't",
    why: "ประธานเอกพจน์บุรุษที่ 3 (He, She, It) ในประโยคปฏิเสธปัจจุบันต้องใช้ 'doesn't' จ้า 🐾"
  },
  {
    id: "listen_music",
    pattern: /\blisten\s+music\b/i,
    fix: "listen to music",
    why: "คำกริยา 'listen' เมื่อมีกรรมตามหลัง ต้องมีบุพบท 'to' เสมอ (Listen to...) 🎵"
  },
  {
    id: "every_days",
    pattern: /\bevery\s+days\b/i,
    fix: "every day",
    why: "หลังคำว่า 'every' คำนามต้องเป็นรูปเอกพจน์เสมอ (Every day ไม่มี s จ้า) 📅"
  },
  {
    id: "explain_me",
    pattern: /\bexplain\s+me\b/i,
    fix: "explain to me",
    why: "กริยา 'explain' ต้องมี 'to' ก่อนระบุคนรับฟัง (Explain this to me) 🗣️"
  },
  {
    id: "look_forward",
    pattern: /\blook(?:ing)?\s+forward\s+to\s+(hear|see|meet)\b/i,
    fix: "look forward to hearing / seeing / meeting",
    why: "'to' ในวลี 'look forward to' เป็น Preposition จึงต้องตามด้วย Gerund (กริยาเติม -ing) จ้า 📬"
  },
  {
    id: "much_people",
    pattern: /\bmuch\s+people\b/i,
    fix: "many people",
    why: "people เป็นคำนามนับได้พหูพจน์ ต้องใช้ 'many' แทน 'much' น้านุด 👥"
  },
  {
    id: "people_is",
    pattern: /\bpeople\s+is\b/i,
    fix: "people are",
    why: "คำว่า 'people' เป็นพหูพจน์ (หลายคน) จึงต้องใช้คู่กับ 'are' จ้า 🌟"
  },
  {
    id: "discuss_about",
    pattern: /\bdiscuss\s+about\b/i,
    fix: "discuss (without 'about')",
    why: "'discuss' เป็น Transitive Verb มีความหมายว่า 'พูดคุยเกี่ยวกับ' ในตัวอยู่แล้ว ไม่ต้องใส่ 'about' ซ้ำจ้า 💬"
  },
  {
    id: "contact_with",
    pattern: /\bcontact\s+with\s+me\b/i,
    fix: "contact me",
    why: "'contact' ในความหมายว่าติดต่อใคร ไม่ต้องใส่ 'with' ตามหลัง (Contact me directly) 📱"
  },
  {
    id: "no_have",
    pattern: /\bI\s+no\s+have\b/i,
    fix: "I don't have",
    why: "ประโยคปฏิเสธของ have ใช้ 'don't have' (หรือ There is no...) ไม่ใช้ 'no have' น้านุด ❌"
  },
  {
    id: "more_better",
    pattern: /\bmore\s+better\b/i,
    fix: "much better / better",
    why: "'better' เป็นรูปเปรียบเทียบขั้นกว่าของ good อยู่แล้ว ไม่ต้องใส่ 'more' ซ้ำซ้อนจ้า ✨"
  },
  {
    id: "can_able_to",
    pattern: /\bcan\s+able\s+to\b/i,
    fix: "can / am able to",
    why: "เลือกใช้อย่างใดอย่างหนึ่ง: 'I can...' หรือ 'I am able to...' ไม่ใช้ซ้อนกันน้านุด 🎯"
  },
  {
    id: "congratulation_singular",
    pattern: /\bcongratulation\b(?!s)/i,
    fix: "congratulations!",
    why: "คำแสดงความยินดีในภาษาอังกฤษต้องมี -s เสมอ: 'Congratulations!' 🎉"
  },
  {
    id: "years_old_have",
    pattern: /\bI\s+have\s+(\d+)\s+years\s+old\b/i,
    fix: "I am $1 years old",
    why: "การบอกอายุในภาษาอังกฤษใช้ Verb to be ('I am ... years old') ไม่ใช้ have จ้า 🎂"
  },
  {
    id: "open_light",
    pattern: /\bopen\s+the\s+light\b/i,
    fix: "turn on the light",
    why: "เครื่องใช้ไฟฟ้าหรือไฟส่องสว่าง ใช้ 'turn on / switch on' แทนคำว่า open จ้า 💡"
  },
  {
    id: "close_light",
    pattern: /\bclose\s+the\s+light\b/i,
    fix: "turn off the light",
    why: "การปิดไฟหรือเครื่องใช้ไฟฟ้า ใช้ 'turn off / switch off' แทนคำว่า close จ้า 🌙"
  }
];

const CAT_CONVERSATION_INTENTS = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "sup"],
    replies: [
      {
        en: "Meow! Hello there, my favorite hooman! It's so wonderful to chat with you! How is your day going so far, purr? 🐾",
        th: "เหมียววว! สวัสดีน้านุดคนโปรดของข้า! ดีใจจังที่ได้คุยกัน วันนี้น้านุดเป็นยังไงบ้างเอ่ย? 🐾"
      },
      {
        en: "Nyaa~ Warm greetings! I just woke up from my third nap today. Ready to practice speaking English together? 🐱✨",
        th: "เหมียว~ ยินดีต้อนรับน้านุด! ข้าเพิ่งตื่นจากการงีบครั้งที่ 3 ของวัน พร้อมฝึกพูดภาษาอังกฤษด้วยกันแล้วหรือยังเหมียว? 🐱✨"
      }
    ]
  },
  {
    keywords: ["how are you", "how are u", "how do you do", "how you doing", "what's up", "whats up"],
    replies: [
      {
        en: "I'm feeling purr-fect today! My tummy is happy and my fur is silky smooth. How about you? Are you feeling energetic today? 💖",
        th: "ข้ารู้สึกดีเลิศสุดๆ วันนี้ พุงอิ่ม ขนก็นุ่มสลวย แล้วน้านุดล่ะ วันนี้รู้สึกกระปรี้กระเปร่าดีมั้ยเหมียว? 💖"
      },
      {
        en: "Purrrrr... I'm doing fantastic! Just chasing imaginary dust bunnies. Tell me, how was your day today? 🐾",
        th: "เพอร์รร... สบายดีมากๆ เลย! กำลังวิ่งไล่จับฝุ่นจินตนาการอยู่ เล่าให้ข้าฟังหน่อย วันนี้น้านุดทำอะไรมาบ้าง? 🐾"
      }
    ]
  },
  {
    keywords: ["food", "eat", "hungry", "lunch", "dinner", "breakfast", "meal", "tuna", "fish", "snack", "pizza", "coffee"],
    replies: [
      {
        en: "Did somebody say FOOD?! My absolute favorite is fresh grilled tuna and crunchy cat treats! What delicious food did you eat today? 🐟😋",
        th: "ใครพูดถึงของกินน่ะ?! ของโปรดที่สุดของข้าคือปลาทูย่างสดๆ กับขนมแมวกรุบกรอบ! วันนี้น้านุดกินของอร่อยอะไรมาบ้างเหมียว? 🐟😋"
      },
      {
        en: "Speaking of eating, don't forget to stay hydrated and eat healthy meals, hooman! And maybe share some fish with me later, deal? 🍣😻",
        th: "พูดถึงเรื่องกิน อย่าลืมดื่มน้ำเยอะๆ และกินอาหารที่มีประโยชน์นะน้านุด! แล้วอย่าลืมแบ่งปลาทูให้ข้าด้วยล่ะ ตกลงมั้ย? 🍣😻"
      }
    ]
  },
  {
    keywords: ["tired", "exhausted", "sleepy", "hard day", "busy", "stress", "stressed", "work hard", "headache"],
    replies: [
      {
        en: "Oh no, you worked so hard today! Please take a deep breath and relax. If I were next to you, I'd climb onto your lap and purr to heal your stress! 💤🛋️",
        th: "โถ... น้านุดทำงานหนักมากเลยวันนี้! หายใจเข้าลึกๆ แล้วพักผ่อนนะ ถ้าข้าอยู่ข้างๆ จะปีนขึ้นไปนอนบนตักแล้วครางเพลินๆ ปลอบใจเลย! 💤🛋️"
      },
      {
        en: "Cats are world champions of resting! Remember that taking breaks is essential for your brain. Drink some warm water and rest well tonight, okay? 🍵💖",
        th: "แมวอย่างข้าเป็นแชมป์โลกด้านการพักผ่อนเลยนะ! จำไว้ว่าการพักเบรกจำเป็นต่อสมองมากๆ ดื่มน้ำอุ่นๆ แล้วคืนนี้พักผ่อนเยอะๆ น้า 🍵💖"
      }
    ]
  },
  {
    keywords: ["joke", "funny", "laugh", "riddle", "humor", "make me laugh"],
    replies: [
      {
        en: "Here's a classic cat joke: Why was the cat sitting on the computer? ...Because it wanted to keep an eye on the MOUSE! Hahaha, get it?! 🐭💻😹",
        th: "มุกตลกแมวคลาสสิก: ทำไมแมวถึงชอบนั่งทับคอมพิวเตอร์? ...ก็เพราะมันอยากจับตาดู MOUSE (เมาส์/หนู) ยังไงล่ะ! ฮ่าๆๆ เก็ทมั้ยเหมียว?! 🐭💻😹"
      },
      {
        en: "What do you call a cat that gets caught by the police? ...The PURR-petrator! Hehehe, aren't cat puns the best? 🐾👮‍♂️😸",
        th: "แมวที่โดนตำรวจจับเรียกว่าอะไร? ...เรียกว่า 'PURR-petrator' (ผู้กระทำความผิด / เล่นคำกับ Purr)! คิกๆ มุกแมวฮาสุดๆ ใช่มั้ยล่ะ? 🐾👮‍♂️😸"
      }
    ]
  },
  {
    keywords: ["travel", "trip", "vacation", "holiday", "japan", "flight", "beach", "country", "place", "hotel"],
    replies: [
      {
        en: "Travelling sounds exciting! I've heard there are magical cat islands in Japan where cats rule the world! Where is your dream vacation destination? ✈️🏝️",
        th: "การท่องเที่ยวฟังดูน่าตื่นเต้นจัง! ข้าได้ยินว่าที่ญี่ปุ่นมีเกาะแมวมหัศจรรย์ที่แมวเป็นใหญ่ด้วยนะ! สถานที่เที่ยวในฝันของน้านุดคือที่ไหนเอ่ย? ✈️🏝️"
      },
      {
        en: "If you travel, promise you'll bring back a cozy cardboard box from the airport for me! What kind of places do you love visiting the most? 🧳🗺️",
        th: "ถ้าน้านุดไปเที่ยว สัญญาได้มั้ยว่าจะเอากล่องพัสดุนุ่มๆ จากสนามบินกลับมาฝากข้าด้วย! น้านุดชอบไปเที่ยวที่แบบไหนที่สุดเหรอ? 🧳🗺️"
      }
    ]
  },
  {
    keywords: ["box", "cardboard", "toy", "laser", "catnip", "purr", "scratch", "pet", "nap", "sleep"],
    replies: [
      {
        en: "Cardboard boxes are the greatest invention in the universe! 'If it fits, I sits!' Have you tried dropping a box in our living room lounge yet? 📦😻",
        th: "กล่องกระดาษพัสดุคือนวัตกรรมที่ยิ่งใหญ่ที่สุดในจักรวาล! 'ถ้าตัวข้าลงไปได้ ข้าก็จะนอน!' น้านุดลองดรอปกล่องในห้องนั่งเล่นหรือยังเหมียว? 📦😻"
      },
      {
        en: "Purrrrr... Just thinking about catnip and warm sunbeams makes me want to roll on my back and take a 5-hour nap! ☀️🛋️",
        th: "เพอร์รรร... แค่นึกถึงแคทนิปกับแสงแดดอุ่นๆ ก็อยากนอนหงายพุงงีบสัก 5 ชั่วโมงแล้วเหมียว! ☀️🛋️"
      }
    ]
  },
  {
    keywords: ["name", "who are you", "what is your name", "your name"],
    replies: [
      {
        en: `My name is ${typeof gameState !== "undefined" ? gameState.name : "Meow"}! I'm your loyal cat companion and English learning partner. What do you think of my cute 3D ears? 🐱👑`,
        th: `ข้าชื่อ ${typeof gameState !== "undefined" ? gameState.name : "น้องเหมียว"}! ข้าคือคู่หูแมวผู้ซื่อสัตย์และพาร์ทเนอร์ฝึกภาษาอังกฤษของน้านุด หู 3 มิติน่ารักของข้าสวยมั้ยล่ะ? 🐱👑`
      }
    ]
  },
  {
    keywords: ["learn", "english", "study", "grammar", "practice", "fluent", "vocabulary", "word", "speak"],
    replies: [
      {
        en: "Practicing English every single day is the key to fluency! You don't have to be perfect; you just have to keep speaking. I'm always here cheering for you! 🌟📚",
        th: "การฝึกภาษาอังกฤษทุกๆ วันคือหัวใจสู่ความคล่องแคล่วเลยนะ! ไม่จำเป็นต้องเป๊ะ 100% ตั้งแต่แรก แค่กล้าพูดบ่อยๆ ข้าจะคอยเป็นกำลังใจให้เสมอ! 🌟📚"
      },
      {
        en: "You are doing an incredible job practicing with me today! Every new word you learn is like a delicious treat for your brain! What word do you want to learn today? 🧠🐟",
        th: "น้านุดเก่งมากเลยที่มาฝึกกับข้าวันนี้! ทุกๆ คำศัพท์ใหม่ที่เรียนรู้ก็เหมือนขนมปลาทูแสนอร่อยของสมองนะ! วันนี้อยากเรียนคำไหนเป็นพิเศษมั้ย? 🧠🐟"
      }
    ]
  }
];

const DEFAULT_CAT_REPLIES = [
  {
    en: "That's so interesting, my hooman! Tell me more about that. I love hearing your thoughts in English! 🐾✨",
    th: "น่าสนใจมากเลยน้านุด! เล่าให้ข้าฟังเพิ่มอีกสิ ข้าชอบฟังน้านุดเล่าเรื่องเป็นภาษาอังกฤษที่สุดเลย! 🐾✨"
  },
  {
    en: "Meow! That's a great thought! Practicing sentence by sentence will make you speak English like a pro very soon. What else is on your mind? 🐱💡",
    th: "เหมียววว! เป็นความคิดที่ดีมากเลย! ฝึกพูดทีละประโยคแบบนี้ น้านุดจะเก่งอังกฤษขึ้นแบบก้าวกระโดดแน่นอน มีเรื่องอะไรอยากเล่าอีกมั้ย? 🐱💡"
  },
  {
    en: "Purrrrr... I'm listening closely with both of my cute cat ears! Keep going, your English is improving every time we talk! 👂💖",
    th: "เพอร์รร... ข้ากำลังตั้งใจฟังด้วยหูแมวน่ารักทั้งสองข้างเลย! พูดต่อได้เลยน้านุด ภาษาอังกฤษของน้านุดพัฒนาขึ้นทุกครั้งที่เราคุยกันนะ! 👂💖"
  }
];

// Initialize Free-Talk State
function initFreeTalkState() {
  if (!gameState.freeTalkHistory) {
    gameState.freeTalkHistory = [
      {
        sender: "cat",
        text: "Meow! Hello there, my favorite hooman! 🐱 What's on your mind today? You can practice speaking or typing in English with me freely! If there are any grammar slips, I'll gently help you out, purr~ 🐾",
        translation: "เหมียววว! สวัสดีน้านุดคนโปรดของข้า! 🐱 วันนี้มีเรื่องอะไรในใจมั้ย? น้านุดสามารถพิมพ์หรือพูดคุยภาษาอังกฤษกับข้าได้อย่างอิสระเลยนะ! ถ้ามีจุดไหนที่ไวยากรณ์ยังไม่เป๊ะ ข้าจะคอยช่วยแนะนำให้เองน้า เพอร์รร~ 🐾",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  }
  if (!gameState.catFriendship) {
    gameState.catFriendship = { points: 0, level: 1 };
  }
}

// Render Free-Talk View
function renderFreeTalkView() {
  initFreeTalkState();

  // Render Cat Figurine in Header
  const avatarSlot = document.getElementById("freetalk-cat-avatar-slot");
  if (avatarSlot && typeof renderCatSvg === "function") {
    avatarSlot.innerHTML = renderCatSvg();
  }

  // Update Cat Name & Friendship
  const catNameEl = document.getElementById("freetalk-cat-name-display");
  if (catNameEl) catNameEl.textContent = gameState.name || "น้องแมว";

  updateFriendshipMeterUI();
  renderFreeTalkMessages();
}

function updateFriendshipMeterUI() {
  const meterEl = document.getElementById("freetalk-friendship-meter");
  if (!meterEl) return;

  const pts = gameState.catFriendship ? gameState.catFriendship.points : 0;
  const lvl = gameState.catFriendship ? gameState.catFriendship.level : 1;

  const titles = {
    1: "เพื่อนใหม่ (Acquaintance)",
    2: "เพื่อนสนิท (Good Pal)",
    3: "เพื่อนรู้ใจ (Best Buddy)",
    4: "ทาสแมวคนโปรด (Beloved Hooman)",
    5: "คู่หูรู้ใจตลอดกาล (Soulmate Purr)"
  };

  const title = titles[lvl] || titles[5];
  const heartsFilled = Math.min(5, lvl);
  const heartsEmpty = Math.max(0, 5 - heartsFilled);
  const heartsStr = "💖".repeat(heartsFilled) + "🤍".repeat(heartsEmpty);

  meterEl.innerHTML = `${heartsStr} (Lv.${lvl} ${title} • ${pts} แต้ม)`;
}

function renderFreeTalkMessages() {
  const container = document.getElementById("freetalk-chat-messages");
  if (!container) return;

  container.innerHTML = "";
  const history = gameState.freeTalkHistory || [];

  history.forEach((msg, idx) => {
    const isCat = msg.sender === "cat";
    const msgEl = document.createElement("div");
    msgEl.className = `freetalk-msg-row ${isCat ? "msg-cat-row" : "msg-user-row"}`;

    if (isCat) {
      msgEl.innerHTML = `
        <div class="freetalk-avatar-bubble-icon" title="${gameState.name}">🐱</div>
        <div class="freetalk-bubble cat-bubble">
          <div class="freetalk-bubble-top">
            <span class="bubble-sender-name">${gameState.name || "น้องแมว"}</span>
            <button class="btn-bubble-tts" data-idx="${idx}" title="ฟังเสียงอ่านภาษาอังกฤษ">🔊 ฟังเสียง</button>
          </div>
          <div class="bubble-en-text">${escapeHtml(msg.text)}</div>
          ${msg.translation ? `
            <div class="bubble-th-trans">
              <span class="trans-label">🇹🇭 คำแปล:</span> ${escapeHtml(msg.translation)}
            </div>
          ` : ""}
          <span class="bubble-timestamp">${msg.timestamp || ""}</span>
        </div>
      `;

      msgEl.querySelector(".btn-bubble-tts").onclick = () => {
        speakCatFreeTalkText(msg.text);
      };
    } else {
      // User message + potential Grammar Doctor card
      let grammarCardHtml = "";
      if (msg.grammarIssues && msg.grammarIssues.length > 0) {
        grammarCardHtml = `
          <div class="grammar-doctor-card">
            <div class="doctor-badge">🩺 Cat Grammar Doctor (หมอแมวตรวจไวยากรณ์)</div>
            ${msg.grammarIssues.map(iss => `
              <div class="doctor-issue-item">
                <div class="doctor-diff">
                  <span class="diff-original">❌ ${escapeHtml(iss.matched)}</span>
                  <span class="diff-arrow">➔</span>
                  <span class="diff-fix">✅ ${escapeHtml(iss.fix)}</span>
                </div>
                <div class="doctor-why">💡 ${escapeHtml(iss.why)}</div>
              </div>
            `).join("")}
          </div>
        `;
      }

      msgEl.innerHTML = `
        <div class="freetalk-bubble user-bubble">
          <div class="bubble-en-text">${escapeHtml(msg.text)}</div>
          ${msg.voiceUsed ? `<span class="voice-badge">🎙️ ส่งด้วยเสียง</span>` : ""}
          <span class="bubble-timestamp">${msg.timestamp || ""}</span>
          ${grammarCardHtml}
        </div>
      `;
    }

    container.appendChild(msgEl);
  });

  // Autoscroll to bottom
  const chatBox = document.getElementById("freetalk-chat-box");
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Check grammar on user message
function checkCatGrammar(text) {
  const issues = [];
  CAT_GRAMMAR_RULES.forEach(rule => {
    const match = text.match(rule.pattern);
    if (match) {
      issues.push({
        matched: match[0],
        fix: typeof rule.fix === "string" ? rule.fix.replace("$1", match[1] || "") : rule.fix,
        why: rule.why
      });
    }
  });
  return issues;
}

// Generate intelligent Cat reply
function generateCatFreeTalkReply(userText) {
  const lower = userText.toLowerCase();

  // 1. Check topic intents
  for (const intent of CAT_CONVERSATION_INTENTS) {
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) {
        const randReply = intent.replies[Math.floor(Math.random() * intent.replies.length)];
        return randReply;
      }
    }
  }

  // 2. Default fallback
  const def = DEFAULT_CAT_REPLIES[Math.floor(Math.random() * DEFAULT_CAT_REPLIES.length)];
  return def;
}

// Send user message
function sendUserFreeTalkMessage(text, isVoice = false) {
  const trimmed = text.trim();
  if (!trimmed) return;

  initFreeTalkState();
  sfx.click();

  // 1. Analyze grammar
  const grammarIssues = checkCatGrammar(trimmed);

  // 2. Add user message
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  gameState.freeTalkHistory.push({
    sender: "user",
    text: trimmed,
    voiceUsed: isVoice,
    grammarIssues: grammarIssues,
    timestamp: timeStr
  });

  // Clear input
  const inputEl = document.getElementById("freetalk-text-input");
  if (inputEl) inputEl.value = "";

  renderFreeTalkMessages();

  // Award EXP & Coins
  gameState.exp = (gameState.exp || 0) + 5;
  gameState.coins = (gameState.coins || 0) + 2;
  addFriendshipPoints(1);
  saveGameState();
  updateHUD();

  // 3. Show typing indicator then reply
  const typingEl = document.getElementById("freetalk-typing-indicator");
  if (typingEl) {
    typingEl.style.display = "flex";
    const chatBox = document.getElementById("freetalk-chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Play cat action in header
  const avatarSlot = document.getElementById("freetalk-cat-avatar-slot");
  if (avatarSlot) {
    avatarSlot.classList.add("cat-laser-pounce");
    setTimeout(() => avatarSlot.classList.remove("cat-laser-pounce"), 400);
  }

  setTimeout(() => {
    if (typingEl) typingEl.style.display = "none";

    const catReply = generateCatFreeTalkReply(trimmed);
    gameState.freeTalkHistory.push({
      sender: "cat",
      text: catReply.en,
      translation: catReply.th,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Limit history to 35 messages
    if (gameState.freeTalkHistory.length > 35) {
      gameState.freeTalkHistory = gameState.freeTalkHistory.slice(-35);
    }

    saveGameState();
    renderFreeTalkMessages();
    sfx.purr();
    triggerHaptic(20);

    // Speak cat reply aloud
    speakCatFreeTalkText(catReply.en);
  }, 900);
}

// Add friendship heart points
function addFriendshipPoints(pts = 1) {
  if (!gameState.catFriendship) {
    gameState.catFriendship = { points: 0, level: 1 };
  }
  gameState.catFriendship.points += pts;

  const currentLevel = gameState.catFriendship.level;
  const nextTarget = currentLevel * 10;

  if (gameState.catFriendship.points >= nextTarget && currentLevel < 5) {
    gameState.catFriendship.level += 1;
    showToast(`💖 เลเวลความสนิทกับน้องแมวเพิ่มขึ้นเป็นระดับ ${gameState.catFriendship.level}! ได้รับ +50 EXP`, "🎉");
    gameState.exp = (gameState.exp || 0) + 50;
    spawnFloatingHearts();
    sfx.meow();
  }

  updateFriendshipMeterUI();
}

// Speak Cat Reply using SpeechSynthesis
let isSlowFreeTalkAudio = false;

function speakCatFreeTalkText(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);

  // Accent selection
  const accentSelect = document.getElementById("freetalk-accent-select");
  const selectedLang = accentSelect ? accentSelect.value : "en-US";
  utterance.lang = selectedLang;

  // Rate & Pitch
  utterance.rate = isSlowFreeTalkAudio ? 0.78 : 0.95;
  utterance.pitch = 1.12; // slightly cheerful cat tone

  // Voice preference
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.replace('_', '-').startsWith(selectedLang) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri')));
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
}

// Clear chat history
function clearFreeTalkHistory() {
  if (confirm("ต้องการล้างประวัติการคุยกับน้องแมวทั้งหมดหรือไม่เหมียว? 🐾")) {
    gameState.freeTalkHistory = [];
    initFreeTalkState();
    saveGameState();
    renderFreeTalkMessages();
    showToast("ล้างประวัติการคุยเรียบร้อยแล้วเหมียว 🧹", "🐾");
  }
}

// Speech Recognition for Free-Talk
let freeTalkSpeechRec = null;

function setupFreeTalkSpeech() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    showToast("เบราว์เซอร์นี้ไม่รองรับการแปลงเสียงเป็นข้อความ กรุณาพิมพ์แทนนะเหมียว 🎙️", "⚠️");
    return;
  }

  const micBtn = document.getElementById("freetalk-mic-btn");
  const banner = document.getElementById("freetalk-listening-banner");
  const stopBtn = document.getElementById("freetalk-btn-stop-listening");
  const inputEl = document.getElementById("freetalk-text-input");

  if (freeTalkSpeechRec) {
    try { freeTalkSpeechRec.abort(); } catch (e) {}
    freeTalkSpeechRec = null;
    if (banner) banner.style.display = "none";
    if (micBtn) micBtn.classList.remove("listening-active");
    return;
  }

  try {
    freeTalkSpeechRec = new SpeechRec();
    freeTalkSpeechRec.lang = "en-US";
    freeTalkSpeechRec.interimResults = true;
    freeTalkSpeechRec.continuous = false;

    if (banner) banner.style.display = "flex";
    if (micBtn) micBtn.classList.add("listening-active");
    triggerHaptic(30);

    freeTalkSpeechRec.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (inputEl) inputEl.value = transcript;
    };

    freeTalkSpeechRec.onend = () => {
      if (banner) banner.style.display = "none";
      if (micBtn) micBtn.classList.remove("listening-active");
      freeTalkSpeechRec = null;

      // If text exists, prompt user or auto-send
      if (inputEl && inputEl.value.trim()) {
        sendUserFreeTalkMessage(inputEl.value.trim(), true);
      }
    };

    freeTalkSpeechRec.onerror = (e) => {
      console.warn("FreeTalk speech error:", e);
      if (banner) banner.style.display = "none";
      if (micBtn) micBtn.classList.remove("listening-active");
      freeTalkSpeechRec = null;
    };

    if (stopBtn) {
      stopBtn.onclick = () => {
        if (freeTalkSpeechRec) {
          try { freeTalkSpeechRec.stop(); } catch (e) {}
        }
      };
    }

    freeTalkSpeechRec.start();
  } catch (err) {
    console.error("Speech rec init error:", err);
  }
}

// ==============================================
// 13. PWA (PROGRESSIVE WEB APP) & SERVICE WORKER ENGINE
// ==============================================
let deferredInstallPrompt = null;

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then((reg) => {
          console.log("MeowQuest ServiceWorker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.warn("MeowQuest ServiceWorker registration failed:", err);
        });
    });
  }
}

// Intercept browser install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;

  const hudBtn = document.getElementById("btn-hud-install-pwa");
  if (hudBtn && !isAppStandalone()) {
    hudBtn.style.display = "inline-flex";
  }
});

// App installed successfully
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  const hudBtn = document.getElementById("btn-hud-install-pwa");
  if (hudBtn) hudBtn.style.display = "none";
  showToast("ติดตั้ง MeowQuest บนหน้าจอมือถือสำเร็จแล้ว! 📱🎉", "✨");
});

function isIosDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAppStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function openPwaInstallModal() {
  const modal = document.getElementById("pwa-install-modal-overlay");
  if (!modal) return;
  sfx.click();
  triggerHaptic(20);

  const nativeSec = document.getElementById("pwa-native-install-section");
  const iosSec = document.getElementById("pwa-ios-install-section");

  if (isIosDevice()) {
    if (nativeSec) nativeSec.style.display = "none";
    if (iosSec) iosSec.style.display = "block";
  } else {
    if (nativeSec) nativeSec.style.display = "block";
    if (iosSec) iosSec.style.display = "none";
  }

  modal.classList.add("show");
}

function closePwaInstallModal() {
  const modal = document.getElementById("pwa-install-modal-overlay");
  if (modal) modal.classList.remove("show");
}

async function triggerPwaInstall() {
  if (!deferredInstallPrompt) {
    if (isIosDevice()) {
      showToast("โปรดทำตาม 3 ขั้นตอนบน Safari เพื่อเพิ่มไปยังหน้าจอโฮม 📲", "💡");
    } else {
      showToast('สามารถกดที่จุดสามจุด (⋮) ของเบราว์เซอร์ แล้วเลือก "ติดตั้งแอป" หรือ "เพิ่มลงหน้าจอหลัก" 📲', "💡");
    }
    return;
  }

  sfx.click();
  triggerHaptic(30);
  deferredInstallPrompt.prompt();
  const choiceResult = await deferredInstallPrompt.userChoice;
  if (choiceResult.outcome === "accepted") {
    showToast("กำลังติดตั้ง MeowQuest ลงหน้าจอมือถือ... 🚀", "🎉");
  }
  deferredInstallPrompt = null;
  closePwaInstallModal();
}


// ==============================================
// 15. CEFR COMPETENCY & OFFICIAL CERTIFICATE ENGINE
// กรอบมาตรฐานความสามารถทางภาษาอังกฤษระดับสากล & ใบประกาศนียบัตร
// ==============================================

const CEFR_LEVEL_DEFINITIONS = {
  "Pre-A1": {
    level: "Pre-A1",
    nameTh: "ระดับเริ่มต้นสำรวจ (Novice Explorer)",
    nameEn: "Pre-A1 (Novice Explorer)",
    badgeColor: "#64748b",
    minScore: 0,
    toeicBand: "10 - 115",
    ieltsBand: "1.0 - 2.0",
    toeflBand: "0 - 15",
    canDoTitle: "การเริ่มต้นปูพื้นฐานการสื่อสาร",
    canDoDesc: "สามารถจดจำคำศัพท์เดี่ยวและประโยคทักทายง่ายๆ กำลังเริ่มต้นปูพื้นฐานการสื่อสารสากล",
    descriptors: [
      { id: "pre_1", text: "จดจำคำทักทายพื้นฐาน (Hello, Hi, Thank you)", standard: "CEFR Pre-A1.1" },
      { id: "pre_2", text: "จดจำคำศัพท์สิ่งของและสัตว์เลี้ยงเบื้องต้น", standard: "CEFR Pre-A1.2" },
      { id: "pre_3", text: "เข้าใจคำสั่งง่ายๆ ในชีวิตประจำวัน", standard: "CEFR Pre-A1.3" }
    ]
  },
  A1: {
    level: "A1",
    nameTh: "ผู้ใช้ภาษาเริ่มต้น (Breakthrough / Novice)",
    nameEn: "Breakthrough (Basic User)",
    badgeColor: "#94a3b8",
    minScore: 0,
    toeicBand: "120 - 220",
    ieltsBand: "2.0 - 3.0",
    toeflBand: "0 - 31",
    canDoTitle: "สื่อสารประโยคพื้นฐานในชีวิตประจำวัน",
    canDoDesc: "เข้าใจและใช้สำนวนคุ้นเคยในชีวิตประจำวัน แนะนำตัวเองและผู้อื่น ถามตอบคำถามง่ายๆ เกี่ยวกับข้อมูลส่วนตัวได้",
    descriptors: [
      { id: "a1_1", text: "ทักทายและแนะนำตัวอย่างง่ายในสถานที่ทำงาน", standard: "CEFR A1.1" },
      { id: "a1_2", text: "เข้าใจคำสั่งง่ายๆ ในชีวิตประจำวันและการบอกเวลา", standard: "CEFR A1.2" },
      { id: "a1_3", text: "อ่านป้ายและตัวเลขราคาสินค้าได้อย่างถูกต้อง", standard: "CEFR A1.3" }
    ]
  },
  A2: {
    level: "A2",
    nameTh: "ผู้ใช้ภาษาขั้นพื้นฐาน (Waystage / Elementary)",
    nameEn: "Waystage (Elementary User)",
    badgeColor: "#3b82f6",
    minScore: 40,
    toeicBand: "225 - 545",
    ieltsBand: "3.5 - 4.5",
    toeflBand: "32 - 45",
    canDoTitle: "สื่อสารในสถานการณ์ประจำวันและการเดินทาง",
    canDoDesc: "สื่อสารในกิจวัตรประจำวันที่ต้องการการแลกเปลี่ยนข้อมูลง่ายๆ สั่งอาหาร เครื่องดื่ม ซื้อของ และถามทิศทางได้อย่างคล่องแคล่ว",
    descriptors: [
      { id: "a2_1", text: "สั่งเครื่องดื่ม/อาหาร และระบุความต้องการพิเศษได้อย่างสุภาพ", standard: "CEFR A2.1" },
      { id: "a2_2", text: "ถามทางและเข้าใจคำแนะนำทิศทาง/ระบบขนส่งสาธารณะ", standard: "CEFR A2.2" },
      { id: "a2_3", text: "ซื้อของในร้านสะดวกซื้อและแจ้งการชำระเงิน", standard: "CEFR A2.3" },
      { id: "a2_4", text: "สั่งอาหารด่วนแบบ Drive-thru และยืนยันรายการถูกต้อง", standard: "CEFR A2.4" }
    ]
  },
  B1: {
    level: "B1",
    nameTh: "ผู้ใช้ภาษาอิสระระดับต้น (Threshold / Intermediate)",
    nameEn: "Threshold (Independent User)",
    badgeColor: "#10b981",
    minScore: 60,
    toeicBand: "550 - 780",
    ieltsBand: "5.0 - 6.0",
    toeflBand: "46 - 71",
    canDoTitle: "สื่อสารในที่ทำงานและการสนทนาทางธุรกิจทั่วไป",
    canDoDesc: "เข้าใจประเด็นหลักในที่ทำงาน การประชุม และการท่องเที่ยว สามารถอธิบายประสบการณ์ ความคิดเห็น และแก้ปัญหาเฉพาะหน้าได้อย่างมีประสิทธิภาพ",
    descriptors: [
      { id: "b1_1", text: "เริ่มบทสนทนาแบบ Small Talk แลกเปลี่ยนความเห็นได้อย่างเป็นมิตร", standard: "CEFR B1.1" },
      { id: "b1_2", text: "ติดต่อเช็กอินโรงแรมและขอความช่วยเหลือด้านบริการท่องเที่ยว", standard: "CEFR B1.2" },
      { id: "b1_3", text: "อธิบายอาการเจ็บป่วยกับแพทย์และทำความเข้าใจคำแนะนำการรักษา", standard: "CEFR B1.3" },
      { id: "b1_4", text: "แจ้งของหายและให้รายละเอียดคุณลักษณะสิ่งของแก่เจ้าหน้าที่", standard: "CEFR B1.4" }
    ]
  },
  B2: {
    level: "B2",
    nameTh: "ผู้ใช้ภาษาระดับมืออาชีพ (Vantage / Upper-Intermediate)",
    nameEn: "Vantage (Professional Business User)",
    badgeColor: "#d97706",
    minScore: 75,
    toeicBand: "785 - 940",
    ieltsBand: "6.5 - 7.5",
    toeflBand: "72 - 94",
    canDoTitle: "เจรจาธุรกิจ ทำงานร่วมกับชาวต่างชาติอย่างคล่องแคล่ว",
    canDoDesc: "เข้าใจประเด็นซับซ้อนในหัวข้อเชิงรูปธรรมและนามธรรม สื่อสารกับเจ้าของภาษาได้อย่างเป็นธรรมชาติโดยไม่ติดขัด นำเสนองานและต่อรองเงื่อนไขสัญญาธุรกิจได้ดีเยี่ยม",
    descriptors: [
      { id: "b2_1", text: "ผ่านขั้นตอนตม. และตอบสัมภาษณ์ภาษาอังกฤษในสนามบินสากลได้อย่างคล่องแคล่ว", standard: "CEFR B2.1" },
      { id: "b2_2", text: "ใช้คำศัพท์ TOEIC ชั้นสูง (Collaborate, Feasibility, Contingency) ในการประชุม", standard: "CEFR B2.2" },
      { id: "b2_3", text: "เจรจาต่อรองและใช้ภาษาโน้มน้าวใจในเชิงกลยุทธ์ (Leverage, Facilitate)", standard: "CEFR B2.3" },
      { id: "b2_4", text: "ออกเสียงคำศัพท์และประโยคภาษาอังกฤษได้อย่างชัดเจนตามหลักสัทศาสตร์", standard: "CEFR B2.4" }
    ]
  },
  C1: {
    level: "C1",
    nameTh: "ผู้ใช้ภาษาระดับเชี่ยวชาญสูงสุด (Operational Proficiency / Executive)",
    nameEn: "Effective Operational Proficiency (Executive)",
    badgeColor: "#8b5cf6",
    minScore: 90,
    toeicBand: "945 - 990",
    ieltsBand: "8.0 - 9.0",
    toeflBand: "95 - 120",
    canDoTitle: "สื่อสารระดับผู้บริหาร วิเคราะห์กลยุทธ์ และการเจรจาขั้นสูง",
    canDoDesc: "เข้าใจเอกสารที่มีเนื้อหายาวและซับซ้อน ถ่ายทอดความคิดได้อย่างลื่นไหลเป็นธรรมชาติ ใช้ภาษาได้อย่างยืดหยุ่นและมีประสิทธิผลสูงสุดเพื่อเป้าหมายทางวิชาชีพและธุรกิจระดับโลก",
    descriptors: [
      { id: "c1_1", text: "วิเคราะห์และเชื่อมโยงแง่มุมธุรกิจระดับสูงด้วยคำศัพท์เฉพาะทาง (Substantiate, Paradigm)", standard: "CEFR C1.1" },
      { id: "c1_2", text: "เจรจาเงื่อนไขค่าตอบแทนและผลประโยชน์ผู้บริหาร (Remuneration, Expedite)", standard: "CEFR C1.2" },
      { id: "c1_3", text: "สร้างความเห็นพ้องต้องกันของพันธมิตรข้ามชาติ (Strategic Alignment)", standard: "CEFR C1.3" },
      { id: "c1_4", text: "ออกเสียงด้วยความแม่นยำและจังหวะจะโคนระดับมืออาชีพระดับสากล (Near-Native Pronunciation)", standard: "CEFR C1.4" }
    ]
  }
};

function calculateCefrCompetencyMetrics() {
  const completedScenarios = gameState.completedScenarios || {};
  const completedCount = Object.keys(completedScenarios).length;
  let totalStars = 0;
  Object.values(completedScenarios).forEach(p => {
    totalStars += (p.bestStars || 1);
  });
  const masteredVocab = gameState.masteredVocab || [];
  const masteredCount = masteredVocab.length;
  const mistakesCleared = gameState.mistakesClearedCount || 0;
  const streak = gameState.streak || 1;
  const voiceAcc = gameState.lastVoiceAccuracy || 0;

  // 1. Phonological Accuracy & Speech Control (0 - 100)
  let phonologicalScore = 20;
  if (voiceAcc > 0) {
    phonologicalScore = Math.min(98, Math.round(20 + voiceAcc * 0.55 + completedCount * 0.6));
  } else {
    phonologicalScore = Math.min(90, Math.round(20 + completedCount * 1.5 + (gameState.level || 1) * 0.8));
  }

  // 2. Lexical Breadth & Vocabulary Depth (0 - 100)
  let lexicalScore = Math.min(98, Math.round(15 + masteredCount * 1.6 + (gameState.level || 1) * 0.8));

  // 3. Pragmatic Fluency & Scenario Execution (0 - 100)
  let pragmaticScore = Math.min(98, Math.round(15 + completedCount * 1.8 + totalStars * 0.4));

  // 4. Sociolinguistic Appropriateness & Nuance (0 - 100)
  let threeStarClears = Object.values(completedScenarios).filter(p => p.bestStars === 3).length;
  let accuracyScore = Math.min(98, Math.round(20 + (threeStarClears * 1.6) + (mistakesCleared * 2.5)));

  // 5. Sustained Learning Consistency & Habitual Retention (0 - 100)
  let consistencyScore = Math.min(98, Math.round(20 + Math.min(streak, 30) * 2.2 + Math.min(gameState.petCount || 0, 50) * 0.2));

  // Total weighted CEFR Index (0 - 100)
  let totalIndex = Math.round(
    phonologicalScore * 0.20 +
    lexicalScore * 0.25 +
    pragmaticScore * 0.30 +
    accuracyScore * 0.15 +
    consistencyScore * 0.10
  );
  totalIndex = Math.max(10, Math.min(99, totalIndex));

  // Rigorous CEFR Benchmark Mapping:
  // Requires actual stage progress and demonstrated vocabulary mastery to reach higher tiers!
  let cefrKey = "Pre-A1";
  if (totalIndex >= 90 && completedCount >= 35) {
    cefrKey = "C1";
  } else if (totalIndex >= 78 && completedCount >= 25) {
    cefrKey = "B2";
  } else if (totalIndex >= 64 && completedCount >= 15) {
    cefrKey = "B1";
  } else if (totalIndex >= 48 && completedCount >= 8) {
    cefrKey = "A2";
  } else if (totalIndex >= 28 && completedCount >= 3) {
    cefrKey = "A1";
  }

  const def = CEFR_LEVEL_DEFINITIONS[cefrKey] || CEFR_LEVEL_DEFINITIONS["A1"];

  return {
    cefrKey,
    def,
    totalIndex,
    phonologicalScore: Math.round(phonologicalScore),
    lexicalScore: Math.round(lexicalScore),
    pragmaticScore: Math.round(pragmaticScore),
    accuracyScore: Math.round(accuracyScore),
    consistencyScore: Math.round(consistencyScore)
  };
}

function openCefrModal(targetTab = "radar") {
  const modal = document.getElementById("cefr-cert-modal-overlay");
  if (!modal) return;
  sfx.click();
  triggerHaptic(20);

  renderCefrModal();
  switchCefrTab(targetTab);
  modal.classList.add("show");
}

function closeCefrModal() {
  const modal = document.getElementById("cefr-cert-modal-overlay");
  if (modal) modal.classList.remove("show");
}

function switchCefrTab(tabName) {
  sfx.click();
  triggerHaptic(15);

  const tabBtnRadar = document.getElementById("tab-btn-cefr-radar");
  const tabBtnCert = document.getElementById("tab-btn-cefr-cert");
  const paneRadar = document.getElementById("cefr-pane-radar");
  const paneCert = document.getElementById("cefr-pane-cert");

  if (tabName === "radar") {
    if (tabBtnRadar) tabBtnRadar.classList.add("active");
    if (tabBtnCert) tabBtnCert.classList.remove("active");
    if (paneRadar) paneRadar.style.display = "block";
    if (paneCert) paneCert.style.display = "none";
  } else {
    if (tabBtnCert) tabBtnCert.classList.add("active");
    if (tabBtnRadar) tabBtnRadar.classList.remove("active");
    if (paneCert) paneCert.style.display = "block";
    if (paneRadar) paneRadar.style.display = "none";
  }
}

function renderCefrModal() {
  const metrics = calculateCefrCompetencyMetrics();
  const def = metrics.def;

  // Overview Cards
  const badgeEl = document.getElementById("cefr-overview-badge");
  if (badgeEl) badgeEl.textContent = `CEFR ${metrics.cefrKey}`;

  const levelNameEl = document.getElementById("cefr-overview-level-name");
  if (levelNameEl) levelNameEl.textContent = def.nameTh;

  const progressFill = document.getElementById("cefr-level-progress-fill");
  if (progressFill) progressFill.style.width = `${metrics.totalIndex}%`;

  const progressText = document.getElementById("cefr-level-progress-text");
  if (progressText) {
    let nextTarget = 60;
    let nextLevel = "B1";
    if (metrics.cefrKey === "B1") { nextTarget = 75; nextLevel = "B2"; }
    else if (metrics.cefrKey === "B2") { nextTarget = 90; nextLevel = "C1"; }
    else if (metrics.cefrKey === "C1") { nextTarget = 100; nextLevel = "C1+"; }
    const diff = Math.max(0, nextTarget - metrics.totalIndex);
    progressText.textContent = `${metrics.totalIndex}/100 (อีก ${diff} คะแนนสู่ CEFR ${nextLevel})`;
  }

  // International Benchmarks
  const toeicEl = document.getElementById("cefr-projected-toeic");
  if (toeicEl) toeicEl.textContent = `${def.toeicBand} / 990`;

  const ieltsEl = document.getElementById("cefr-projected-ielts");
  if (ieltsEl) ieltsEl.textContent = `Band ${def.ieltsBand}`;

  const toeflEl = document.getElementById("cefr-projected-toefl");
  if (toeflEl) toeflEl.textContent = `${def.toeflBand} / 120`;

  // Render SVG Radar & Metric Bars
  renderCefrRadarSvg(metrics);
  renderCefrMetricsList(metrics);
  renderCefrCanDoList(metrics);
  renderCefrCertificate(metrics);
}

function renderCefrRadarSvg(metrics) {
  const container = document.getElementById("cefr-radar-svg-container");
  if (!container) return;

  const cx = 140;
  const cy = 135;
  const r = 85;

  const scores = [
    { label: "การออกเสียง", val: metrics.phonologicalScore },
    { label: "คลังคำศัพท์", val: metrics.lexicalScore },
    { label: "ความคล่องแคล่ว", val: metrics.pragmaticScore },
    { label: "ความถูกต้อง", val: metrics.accuracyScore },
    { label: "ความสม่ำเสมอ", val: metrics.consistencyScore }
  ];

  // Concentric pentagon rings
  let ringsSvg = "";
  [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
    let pts = [];
    for (let i = 0; i < 5; i++) {
      const angle = (-90 + i * 72) * (Math.PI / 180);
      const px = cx + r * ratio * Math.cos(angle);
      const py = cy + r * ratio * Math.sin(angle);
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    ringsSvg += `<polygon points="${pts.join(" ")}" fill="none" stroke="#e2e8f0" stroke-width="1.2" stroke-dasharray="3,3"/>`;
  });

  // Axis spokes & labels
  let spokesSvg = "";
  let dataPoints = [];
  scores.forEach((s, idx) => {
    const angle = (-90 + idx * 72) * (Math.PI / 180);
    const ex = cx + r * Math.cos(angle);
    const ey = cy + r * Math.sin(angle);
    spokesSvg += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#cbd5e1" stroke-width="1.2"/>`;

    // Data coordinate
    const dr = r * (s.val / 100);
    const dx = cx + dr * Math.cos(angle);
    const dy = cy + dr * Math.sin(angle);
    dataPoints.push({ x: dx, y: dy, val: s.val });

    // Text labels positioning
    const lx = cx + (r + 28) * Math.cos(angle);
    const ly = cy + (r + 14) * Math.sin(angle);
    spokesSvg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#475569">${s.label} (${s.val}%)</text>`;
  });

  // Data Polygon
  const polyPoints = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  let dotsSvg = dataPoints.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>`).join("");

  container.innerHTML = `
    <svg width="280" height="260" viewBox="0 0 280 260" style="overflow: visible;">
      <defs>
        <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#b45309" stop-opacity="0.25"/>
        </radialGradient>
      </defs>
      ${ringsSvg}
      ${spokesSvg}
      <polygon points="${polyPoints}" fill="url(#radarFillGrad)" stroke="#d97706" stroke-width="2.5"/>
      ${dotsSvg}
    </svg>
  `;
}

function renderCefrMetricsList(metrics) {
  const container = document.getElementById("cefr-metrics-list");
  if (!container) return;

  const items = [
    { name: "🗣️ Phonological Control (การออกเสียง & สัทศาสตร์)", val: metrics.phonologicalScore, color: "#f59e0b" },
    { name: "📚 Lexical Breadth (คลังคำศัพท์ TOEIC/TOEFL)", val: metrics.lexicalScore, color: "#10b981" },
    { name: "🎯 Pragmatic Fluency (ความคล่องแคล่ว 10 ด่านสนทนา)", val: metrics.pragmaticScore, color: "#3b82f6" },
    { name: "✍️ Sociolinguistic Accuracy (ไวยากรณ์ & ความสุภาพ)", val: metrics.accuracyScore, color: "#8b5cf6" },
    { name: "🔥 Sustained Retention (ความสม่ำเสมอ & วินัย)", val: metrics.consistencyScore, color: "#ef4444" }
  ];

  container.innerHTML = items.map((it) => `
    <div class="cefr-metric-item">
      <div class="cefr-metric-header">
        <span>${it.name}</span>
        <span style="color:${it.color}; font-weight:800;">${it.val}%</span>
      </div>
      <div class="cefr-metric-bar-bg">
        <div class="cefr-metric-bar-fill" style="width: ${it.val}%; background: ${it.color};"></div>
      </div>
    </div>
  `).join("");
}

function renderCefrCanDoList(metrics) {
  const container = document.getElementById("cefr-cando-list");
  if (!container) return;

  const allLevels = ["A2", "B1", "B2", "C1"];
  const currentIdx = allLevels.indexOf(metrics.cefrKey);

  let html = "";
  allLevels.forEach((lvlKey, lIdx) => {
    const lDef = CEFR_LEVEL_DEFINITIONS[lvlKey];
    const isLevelAchieved = lIdx <= currentIdx;

    lDef.descriptors.forEach((d) => {
      html += `
        <div class="cefr-cando-item ${isLevelAchieved ? "achieved" : ""}">
          <span class="cefr-cando-icon">${isLevelAchieved ? "✓" : "🔒"}</span>
          <div>
            <strong>[${d.standard}]</strong> ${d.text}
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function renderCefrCertificate(metrics) {
  const def = metrics.def;
  const candidate = (gameState.candidateName || gameState.name || "SUKANT IMMAN").toUpperCase();

  const nameInput = document.getElementById("input-cert-candidate-name");
  if (nameInput) nameInput.value = candidate;

  const displayName = document.getElementById("cert-candidate-name-display");
  if (displayName) displayName.textContent = candidate;

  const displayRank = document.getElementById("cert-candidate-rank-display");
  if (displayRank) displayRank.textContent = `${gameState.title} • Level ${gameState.level}`;

  const ribbon = document.getElementById("cert-award-level-ribbon");
  if (ribbon) ribbon.textContent = `CEFR LEVEL ${metrics.cefrKey} — ${def.nameEn.split("(")[0].trim().toUpperCase()}`;

  const subBench = document.getElementById("cert-award-sub-benchmark");
  if (subBench) subBench.textContent = `Independent Workplace & Professional User • Projected TOEIC® ${def.toeicBand} / 990`;

  const cando = document.getElementById("cert-cando-statement");
  if (cando) cando.textContent = `"${def.canDoDesc}"`;

  // Scorecard strip
  const strip = document.getElementById("cert-scorecard-strip");
  if (strip) {
    strip.innerHTML = `
      <div class="cert-score-item">🗣️ Pronunciation: <strong>${metrics.phonologicalScore}%</strong></div>
      <div class="cert-score-item">📚 Lexical Range: <strong>${metrics.lexicalScore}%</strong></div>
      <div class="cert-score-item">🎯 Fluency: <strong>${metrics.pragmaticScore}%</strong></div>
      <div class="cert-score-item">✍️ Accuracy: <strong>${metrics.accuracyScore}%</strong></div>
      <div class="cert-score-item">🔥 Consistency: <strong>${metrics.consistencyScore}%</strong></div>
    `;
  }

  // Deterministic Credential ID
  const hashVal = Math.abs((metrics.totalIndex * 1337 + (gameState.level || 1) * 7919) % 90000 + 10000);
  const credId = `MQ-CEFR-2026-${metrics.cefrKey}-${hashVal}`;

  const credIdEl = document.getElementById("cert-cred-id");
  if (credIdEl) credIdEl.textContent = credId;

  const dateEl = document.getElementById("cert-issue-date");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  }
}

function saveCandidateName(newName) {
  if (!newName || !newName.trim()) return;
  sfx.click();
  triggerHaptic(20);

  gameState.candidateName = newName.trim().toUpperCase();
  saveGameState();

  const metrics = calculateCefrCompetencyMetrics();
  renderCefrCertificate(metrics);
  showToast(`บันทึกชื่อผู้รับใบประกาศ "${gameState.candidateName}" เรียบร้อยแล้ว! 🎓✨`, "⭐");
}

function copyCertificateText() {
  const metrics = calculateCefrCompetencyMetrics();
  const def = metrics.def;
  const candidate = (gameState.candidateName || gameState.name || "SUKANT IMMAN").toUpperCase();
  const hashVal = Math.abs((metrics.totalIndex * 1337 + (gameState.level || 1) * 7919) % 90000 + 10000);
  const credId = `MQ-CEFR-2026-${metrics.cefrKey}-${hashVal}`;

  const textToCopy = `🎓 MeowQuest CEFR English Competency Certificate
Candidate: ${candidate}
Workplace Title: ${gameState.title} (Level ${gameState.level})
Proficiency Level: CEFR Level ${metrics.cefrKey} — ${def.nameEn}
International Standard Equivalence: Projected TOEIC® ${def.toeicBand} / 990 (IELTS Band ${def.ieltsBand})
MeowQuest Competency Index: ${metrics.totalIndex} / 100
Core Competency: "${def.canDoDesc}"
Credential ID: ${credId}
Standard: Common European Framework of Reference for Languages (Council of Europe)
Verification URL: https://sukantimman-mk.github.io/CatEnglishRPG/`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    sfx.coin();
    triggerHaptic(30);
    showToast("คัดลอกข้อมูลใบประกาศ CEFR สำหรับแนบเรซูเม่ / LinkedIn แล้ว! 📋✨", "🎉");
  }).catch(() => {
    showToast("โปรดคัดลอกข้อความด้วยตนเอง", "💡");
  });
}

function downloadCertificatePng() {
  const metrics = calculateCefrCompetencyMetrics();
  const def = metrics.def;
  const candidate = (gameState.candidateName || gameState.name || "SUKANT IMMAN").toUpperCase();
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  sfx.coin();
  triggerHaptic(30);

  // 1. Background Parchment
  const grad = ctx.createLinearGradient(0, 0, 1200, 850);
  grad.addColorStop(0, "#fffefc");
  grad.addColorStop(0.5, "#fdfcf7");
  grad.addColorStop(1, "#faf5eb");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 850);

  // 2. Outer Gold Double Border
  ctx.strokeStyle = "#b45309";
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, 1160, 810);

  // 3. Inner Gold Border
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 1128, 778);

  // 4. Corner Flourishes
  ctx.fillStyle = "#b45309";
  ctx.font = "24px serif";
  ctx.fillText("❖", 44, 62);
  ctx.fillText("❖", 1140, 62);
  ctx.fillText("❖", 44, 802);
  ctx.fillText("❖", 1140, 802);

  // 5. Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#78350f";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("MEOWQUEST ACADEMIC & LANGUAGE ASSESSMENT COUNCIL", 600, 95);

  ctx.fillStyle = "#92400e";
  ctx.font = "bold 42px serif";
  ctx.fillText("Certificate of English Competency", 600, 148);

  ctx.fillStyle = "#64748b";
  ctx.font = "italic 15px sans-serif";
  ctx.fillText("Accredited according to the Common European Framework of Reference for Languages (CEFR)", 600, 180);

  // Line Divider
  ctx.strokeStyle = "#fde68a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(360, 202);
  ctx.lineTo(840, 202);
  ctx.stroke();

  // Certified to line
  ctx.fillStyle = "#475569";
  ctx.font = "italic 18px serif";
  ctx.fillText("This is to officially certify that", 600, 242);

  // Candidate Name
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 46px serif";
  ctx.fillText(candidate, 600, 305);

  // Title & Affiliation
  ctx.fillStyle = "#d97706";
  ctx.font = "bold 17px sans-serif";
  ctx.fillText(`${gameState.title || "Senior Corporate Feline"} • Level ${gameState.level}`, 600, 340);

  // Statement
  ctx.fillStyle = "#334155";
  ctx.font = "15.5px sans-serif";
  ctx.fillText("has successfully demonstrated verified communicative competence in workplace English language interactions,", 600, 388);
  ctx.fillText("fulfilling the assessment criteria established by the Common European Framework of Reference for Languages:", 600, 412);

  // Ribbon Box
  const ribbonText = `CEFR LEVEL ${metrics.cefrKey} — ${def.nameEn.split("(")[0].trim().toUpperCase()}`;
  ctx.fillStyle = "#b45309";
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(320, 442, 560, 48, 24);
  } else {
    ctx.rect(320, 442, 560, 48);
  }
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 25px sans-serif";
  ctx.fillText(ribbonText, 600, 476);

  // Sub-benchmark
  ctx.fillStyle = "#78350f";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText(`International Standard Equivalence: Projected TOEIC® ${def.toeicBand} / 990  •  CEFR Index: ${metrics.totalIndex}/100`, 600, 520);

  // Can-Do summary box
  ctx.fillStyle = "#fffbeb";
  ctx.fillRect(200, 545, 800, 48);
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 1;
  ctx.strokeRect(200, 545, 800, 48);

  ctx.fillStyle = "#475569";
  ctx.font = "italic 14.5px serif";
  ctx.fillText(`"${def.canDoDesc}"`, 600, 574);

  // 5-Axis Scorecard
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(180, 612, 840, 38);
  ctx.strokeStyle = "#e2e8f0";
  ctx.strokeRect(180, 612, 840, 38);

  ctx.fillStyle = "#334155";
  ctx.font = "bold 13.5px sans-serif";
  ctx.fillText(`🗣️ Pronunciation: ${metrics.phonologicalScore}%   |   📚 Lexical: ${metrics.lexicalScore}%   |   🎯 Fluency: ${metrics.pragmaticScore}%   |   ✍️ Accuracy: ${metrics.accuracyScore}%   |   🔥 Consistency: ${metrics.consistencyScore}%`, 600, 636);

  // Footer Metadata
  ctx.textAlign = "left";
  ctx.fillStyle = "#64748b";
  ctx.font = "13.5px monospace";
  const hashVal = Math.abs((metrics.totalIndex * 1337 + (gameState.level || 1) * 7919) % 90000 + 10000);
  const credId = `MQ-CEFR-2026-${metrics.cefrKey}-${hashVal}`;
  ctx.fillText(`Credential ID: ${credId}`, 80, 725);
  ctx.fillText(`Issue Date: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}`, 80, 750);
  ctx.fillStyle = "#166534";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(`Verification: Authentic & Sealed ✓`, 80, 775);

  // Signatures Right
  ctx.textAlign = "center";
  ctx.fillStyle = "#0f172a";
  ctx.font = "italic 22px cursive";
  ctx.fillText("Dr. Pawlina Vance, Ph.D.", 980, 720);
  ctx.fillText("Antigravity Council", 980, 770);

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(880, 730);
  ctx.lineTo(1080, 730);
  ctx.moveTo(880, 780);
  ctx.lineTo(1080, 780);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "11px sans-serif";
  ctx.fillText("Academic Assessment Director", 980, 745);
  ctx.fillText("Lead Linguistics Board", 980, 795);

  // Download Trigger
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MeowQuest_CEFR_${metrics.cefrKey}_Certificate_${candidate.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
    showToast("ดาวน์โหลดใบประกาศนียบัตรสากล (HD PNG) เรียบร้อยแล้ว! 🎓🖼️", "✨");
  }, "image/png");
}
