/**
 * MeowQuest - Daily English RPG Scenarios Dataset
 * 10 Comprehensive Scenarios with 4-5 turns each
 * Designed for realistic, immersive ping-pong daily conversation.
 */

const SCENARIOS = [
  {
    id: "cafe_order",
    stageNumber: 1,
    packNumber: 1,
    packId: "pack_daily",
    title: "The Whisker Cafe",
    titleTh: "ร้านกาแฟวิสเกอร์ (การสั่งเครื่องดื่มและปรับแต่ง)",
    category: "Ordering Food",
    icon: "☕",
    difficulty: "Beginner",
    cefrLevel: "A2",
    cefrCanDo: "Can order food and drink, customize preferences politely, and complete transactional exchanges.",
    canDoSummary: "สั่งเครื่องดื่ม ปรับแต่งขนาด/ประเภทนม/ความหวาน และชำระเงินได้อย่างสุภาพตามมาตรฐานสากล",
    toeicBand: "TOEIC 225 - 400 (Elementary)",
    rewardExp: 60,
    rewardCoins: 40,
    npcName: "Barista Bella",
    npcAvatar: "🐱‍👓",
    bgTheme: "theme-cafe",
    description: "ฝึกสั่งกาแฟ ปรับระดับความหวาน เลือกประเภทนม สั่งขนมอบ และแจ้งชำระเงิน",
    dialogues: [
      {
        id: 1,
        npcText: "Welcome to Whisker Cafe! What can I get started for you today?",
        npcVoiceText: "Welcome to Whisker Cafe! What can I get started for you today?",
        contextTh: "พนักงานต้อนรับและถามว่าคุณต้องการรับเครื่องดื่มอะไรวันนี้",
        hint: "การสั่งเครื่องดื่มอย่างสุภาพ มักเริ่มต้นด้วย 'I'd like...' หรือ 'Can I get...'",
        targetPhrases: [
          "Can I get an iced latte, please?",
          "I would like an iced latte, please.",
          "Could I have an iced latte, please?",
          "Can I have a latte, please?"
        ],
        options: [
          {
            text: "Can I get an iced latte, please?",
            isCorrect: true,
            feedback: "เยี่ยมมาก! 'Can I get...' เป็นวลียอดนิยมที่สุภาพและเป็นธรรมชาติมากสำหรับการสั่งอาหาร/เครื่องดื่ม"
          },
          {
            text: "Give me iced latte right now.",
            isCorrect: false,
            feedback: "ประโยคนี้ห้วนและดูเหมือนคำสั่งเกินไป ควรใช้ 'Can I get...' หรือ 'I'd like...' เพื่อความสุภาพ"
          },
          {
            text: "I want drink milk coffee cold.",
            isCorrect: false,
            feedback: "ไวยากรณ์ยังไม่เป็นธรรมชาติ สำหรับกาแฟเย็นใส่นมในภาษาอังกฤษเรียกว่า 'Iced latte'"
          }
        ],
        vocab: [
          { word: "What can I get for you?", meaning: "รับอะไรดีครับ/ค่ะ" },
          { word: "I'd like...", meaning: "ฉันต้องการ... (สุภาพ)" },
          { word: "Iced latte", meaning: "ลาเต้เย็น" }
        ]
      },
      {
        id: 2,
        npcText: "Sure thing! What size would you like, and do you have any milk preference?",
        npcVoiceText: "Sure thing! What size would you like, and do you have any milk preference?",
        contextTh: "พนักงานถามขนาดแก้ว และประเภทนมที่คุณต้องการ (เช่น นมโอ๊ต นมถั่วเหลือง)",
        hint: "บอกขนาด (Small/Medium/Large) ตามด้วย 'with [ประเภทนม]' เช่น 'with oat milk'",
        targetPhrases: [
          "A medium with oat milk, please.",
          "Medium with oat milk, please.",
          "I'll take a medium with oat milk.",
          "Medium size with oat milk."
        ],
        options: [
          {
            text: "A medium with oat milk, please.",
            isCorrect: true,
            feedback: "ถูกต้อง! ระบุขนาดและประเภทนมได้อย่างชัดเจนและสุภาพด้วยคำว่า please"
          },
          {
            text: "Big size with grain liquid.",
            isCorrect: false,
            feedback: "คำว่า 'grain liquid' ไม่ได้ใช้เรียกนมพืช ควรใช้นมเฉพาะเจาะจง เช่น oat milk, almond milk, soy milk"
          },
          {
            text: "Medium, no water.",
            isCorrect: false,
            feedback: "ลาเต้ไม่ได้ผสมน้ำ แต่เป็นนมกับเอสเพรสโซ่ ควรระบุประเภทนมแทน"
          }
        ],
        vocab: [
          { word: "Preference", meaning: "ความชอบ/ความต้องการพิเศษ" },
          { word: "Oat milk", meaning: "นมข้าวโอ๊ต" },
          { word: "Medium", meaning: "ขนาดกลาง" }
        ]
      },
      {
        id: 3,
        npcText: "How about the sweetness and ice level? Normal or less?",
        npcVoiceText: "How about the sweetness and ice level? Normal or less?",
        contextTh: "พนักงานถามระดับความหวานและปริมาณน้ำแข็ง (ต้องการหวานน้อย น้ำแข็งน้อย)",
        hint: "ใช้คำว่า 'Less sweet' (หวานน้อย) และ 'Light ice' หรือ 'Less ice' (น้ำแข็งน้อย)",
        targetPhrases: [
          "Less sweet and light ice, please.",
          "Can I get less sweet with light ice?",
          "Less sweet and less ice, please.",
          "Half sweet with light ice."
        ],
        options: [
          {
            text: "Less sweet and light ice, please.",
            isCorrect: true,
            feedback: "เป๊ะมาก! 'Less sweet' (หวานน้อย) และ 'Light ice' (น้ำแข็งน้อย) เป็นสำนวนมาตรฐานที่บาริสต้าเข้าใจทันที"
          },
          {
            text: "No cold, no sugar baby.",
            isCorrect: false,
            feedback: "ประโยคนี้แปลกและไม่สุภาพ ควรใช้คำว่า less sweet / light ice"
          },
          {
            text: "Make it not taste good.",
            isCorrect: false,
            feedback: "ความหมายคือ 'ทำให้ไม่อร่อย' ไม่ใช่การระบุระดับความหวานนะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "Less sweet", meaning: "หวานน้อย" },
          { word: "Light ice / Less ice", meaning: "น้ำแข็งน้อย" },
          { word: "Sweetness level", meaning: "ระดับความหวาน" }
        ]
      },
      {
        id: 4,
        npcText: "Got that! Would you like any pastries or warm snacks to go with your coffee today?",
        npcVoiceText: "Got that! Would you like any pastries or warm snacks to go with your coffee today?",
        contextTh: "พนักงานถามว่าต้องการเบเกอรี่หรือขนมอบทานคู่กับกาแฟไหม (อยากได้ครัวซองต์ช็อกโกแลตอุ่นๆ)",
        hint: "ระบุขนม เช่น 'Just a chocolate croissant, please. Could you warm it up?'",
        targetPhrases: [
          "Just a chocolate croissant, please. Can you warm it up?",
          "I'll have a chocolate croissant, warmed up please.",
          "One chocolate croissant, please.",
          "Could I also get a warm chocolate croissant?"
        ],
        options: [
          {
            text: "Just a chocolate croissant, please. Could you warm it up?",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! สั่งขนมพร้อมขอให้อุ่นร้อน (warm it up) ได้อย่างสุภาพและเป็นธรรมชาติ"
          },
          {
            text: "No I hate food.",
            isCorrect: false,
            feedback: "หากไม่ต้องการ ควรตอบปฏิเสธอย่างสุภาพ เช่น 'No thanks, just the coffee.'"
          },
          {
            text: "Bake me bread quickly.",
            isCorrect: false,
            feedback: "เป็นประโยคคำสั่งที่ห้วนเกินไป ควรใช้ 'Could I have...' หรือ 'Just a...'"
          }
        ],
        vocab: [
          { word: "Pastries", meaning: "ขนมอบ / เบเกอรี่" },
          { word: "Warm it up", meaning: "อุ่นร้อนให้หน่อย" },
          { word: "Croissant", meaning: "ครัวซองต์" }
        ]
      },
      {
        id: 5,
        npcText: "All set! Will that be for here or to go, and how would you like to pay?",
        npcVoiceText: "All set! Will that be for here or to go, and how would you like to pay?",
        contextTh: "พนักงานถามว่าจะทานที่นี่หรือใส่แก้วกลับบ้าน และต้องการชำระเงินด้วยวิธีใด (สั่งกลับบ้าน และจ่ายด้วยบัตรเครดิต)",
        hint: "ตอบ 'To go, and I'll pay by card, please.'",
        targetPhrases: [
          "To go, and I'll pay with card, please.",
          "To go, paying by card please.",
          "Takeaway, and by credit card please.",
          "To go, can I pay by card?"
        ],
        options: [
          {
            text: "To go, and I'll pay by card, please.",
            isCorrect: true,
            feedback: "ครบถ้วนสมบูรณ์แบบ! 'To go' (สั่งกลับบ้าน) และ 'pay by card' (จ่ายบัตร) เป็นประโยคปิดการสั่งยอดนิยม"
          },
          {
            text: "I take coffee run away, money later.",
            isCorrect: false,
            feedback: "แบบนี้จะโดนตำรวจจับเอานะเจ้าเหมียว! ต้องชำระเงินให้เรียบร้อย"
          },
          {
            text: "Outside eating with paper coin.",
            isCorrect: false,
            feedback: "ภาษาอังกฤษใช้ 'To go' สำหรับสั่งกลับบ้าน และ 'cash' สำหรับเงินสด"
          }
        ],
        vocab: [
          { word: "To go / Takeaway", meaning: "สั่งกลับบ้าน / นำกลับไปทานข้างนอก" },
          { word: "For here / Dine in", meaning: "ทานที่ร้าน" },
          { word: "Pay by card", meaning: "ชำระเงินด้วยบัตร" }
        ]
      }
    ]
  },
  {
    id: "directions",
    stageNumber: 2,
    packNumber: 1,
    packId: "pack_daily",
    title: "Lost in Purr-is",
    titleTh: "หลงทางในเมืองเพอร์ริส (การถามทางและรถไฟใต้ดิน)",
    category: "Navigation",
    icon: "🗺️",
    difficulty: "Beginner",
    cefrLevel: "A2",
    cefrCanDo: "Can ask for and follow simple directions, navigate public transit, and locate urban landmarks.",
    canDoSummary: "ถามทาง บอกจุดหมายปลายทาง และใช้ระบบขนส่งสาธารณะได้อย่างถูกต้องและมั่นใจ",
    toeicBand: "TOEIC 225 - 450 (Elementary)",
    rewardExp: 65,
    rewardCoins: 40,
    npcName: "Officer Barker",
    npcAvatar: "🐕‍🦺",
    bgTheme: "theme-street",
    description: "ฝึกถามทางไปสถานีรถไฟ ถามระยะเวลาเดิน และสอบถามการซื้อตั๋วเดินทาง",
    dialogues: [
      {
        id: 1,
        npcText: "Hello there, little traveler! You look a bit lost. Need some help?",
        npcVoiceText: "Hello there, little traveler! You look a bit lost. Need some help?",
        contextTh: "คุณตำรวจทักทายและสังเกตว่าคุณกำลังหลงทาง ต้องการถามทางไปสถานีรถไฟใต้ดินที่ใกล้ที่สุด",
        hint: "เริ่มต้นด้วย 'Excuse me...' เสมอเวลาขอความช่วยเหลือจากคนแปลกหน้า",
        targetPhrases: [
          "Excuse me, could you tell me where the nearest subway station is?",
          "Excuse me, where is the nearest subway station?",
          "Could you help me find the subway station?",
          "How do I get to the subway station?"
        ],
        options: [
          {
            text: "Excuse me, where is the nearest subway station?",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! การเปิดด้วย 'Excuse me' และถาม 'nearest subway station' เป็นประโยคที่ตรงจุดและสุภาพ"
          },
          {
            text: "Where train? Show me.",
            isCorrect: false,
            feedback: "ห้วนเกินไป ควรมีคำสุภาพ เช่น Excuse me และใช้โครงสร้างประโยคที่สมบูรณ์"
          },
          {
            text: "I am lost, bring me to home.",
            isCorrect: false,
            feedback: "เป้าหมายของเราคือถามทางไปสถานีรถไฟใต้ดินเพื่อเดินทางต่อ"
          }
        ],
        vocab: [
          { word: "Nearest", meaning: "ที่ใกล้ที่สุด" },
          { word: "Subway station", meaning: "สถานีรถไฟใต้ดิน" },
          { word: "Could you tell me...", meaning: "รบกวนบอกฉันหน่อยได้ไหม..." }
        ]
      },
      {
        id: 2,
        npcText: "Sure! Walk straight for two blocks, then turn left at the bakery. It's right opposite the library. Did you get that?",
        npcVoiceText: "Sure! Walk straight for two blocks, then turn left at the bakery. It's right opposite the library. Did you get that?",
        contextTh: "ตำรวจบอกทาง: เดินตรงไปสองบล็อก เลี้ยวซ้ายตรงร้านเบเกอรี่ อยู่ตรงข้ามห้องสมุด แล้วถามว่าคุณเข้าใจไหม",
        hint: "ตอบรับว่าเข้าใจแล้ว และทวนทิศทางสั้นๆ (Echoing) เพื่อยืนยันความถูกต้อง",
        targetPhrases: [
          "Got it! Straight two blocks and turn left at the bakery. Thank you!",
          "Yes, I understand. Turn left at the bakery. Thanks!",
          "Thank you, that was very clear!",
          "Got it, thank you for your help!"
        ],
        options: [
          {
            text: "Got it! Straight two blocks and turn left at the bakery. Thank you!",
            isCorrect: true,
            feedback: "ฉลาดมาก! การทวนทิศทาง (Echoing) ช่วยยืนยันว่าเราเข้าใจถูกต้อง ไม่หลงทางแน่นอน"
          },
          {
            text: "Okay whatever bye.",
            isCorrect: false,
            feedback: "คำว่า 'whatever' ดูไม่ใส่ใจและเสียมารยาท ควรแสดงความขอบคุณ"
          },
          {
            text: "I cannot walk two blocks, carry me.",
            isCorrect: false,
            feedback: "นี่ไม่ใช่การตอบรับคำบอกทางที่เหมาะสมในชีวิตประจำวันนะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "Walk straight", meaning: "เดินตรงไป" },
          { word: "Opposite", meaning: "ตรงข้ามกับ" },
          { word: "Got it!", meaning: "เข้าใจแล้ว! / รับทราบ!" }
        ]
      },
      {
        id: 3,
        npcText: "By the way, it's about a 10-minute walk. Do you have a transit card or do you need to buy a ticket there?",
        npcVoiceText: "By the way, it's about a 10-minute walk. Do you have a transit card or do you need to buy a ticket there?",
        contextTh: "ตำรวจบอกว่าเดินประมาณ 10 นาที แล้วถามว่าคุณมีบัตรโดยสารหรือยัง (ยังไม่มีบัตร และต้องการถามว่าซื้อตั๋วที่ตู้ได้ไหม)",
        hint: "ตอบว่ายังไม่มีบัตร และถามว่า 'Can I buy a ticket at the station vending machine?'",
        targetPhrases: [
          "I don't have one yet. Can I buy a ticket at the station?",
          "No transit card yet, can I buy a ticket there?",
          "I need to buy a ticket at the ticket machine.",
          "I don't have a card, can I buy one at the station?"
        ],
        options: [
          {
            text: "I don't have one yet. Can I buy a ticket at the station machine?",
            isCorrect: true,
            feedback: "ประโยคดีมาก! ระบุสถานะว่ายังไม่มีบัตร และถามวิธีการซื้อตั๋วได้อย่างคล่องแคล่ว"
          },
          {
            text: "Cards are useless I walk free.",
            isCorrect: false,
            feedback: "การขึ้นรถไฟใต้ดินต้องมีบัตรโดยสารหรือตั๋วที่ถูกต้องเสมอ"
          },
          {
            text: "Give me your police pass.",
            isCorrect: false,
            feedback: "เราไม่สามารถขอยืมบัตรประจำตัวตำรวจเพื่อขึ้นรถไฟได้นะ!"
          }
        ],
        vocab: [
          { word: "Transit card", meaning: "บัตรโดยสารขนส่งสาธารณะ" },
          { word: "Ticket machine", meaning: "ตู้จำหน่ายตั๋วอัตโนมัติ" },
          { word: "10-minute walk", meaning: "เดินประมาณ 10 นาที" }
        ]
      },
      {
        id: 4,
        npcText: "Yes, there are ticket machines right at the entrance. They take both cash and credit cards. Have a safe trip!",
        npcVoiceText: "Yes, there are ticket machines right at the entrance. They take both cash and credit cards. Have a safe trip!",
        contextTh: "ตำรวจบอกว่ามีตู้ขายตั๋วตรงทางเข้า รับทั้งเงินสดและบัตร พร้อมอวยพรให้เดินทางปลอดภัย",
        hint: "กล่าวขอบคุณอย่างสุภาพสำหรับการช่วยเหลือทั้งหมด เช่น 'Thank you so much! Have a wonderful day!'",
        targetPhrases: [
          "Thank you so much for your help! Have a wonderful day!",
          "Thanks a lot, officer! Have a great day!",
          "Thank you for everything, have a good day!",
          "Much appreciated! Have a nice day!"
        ],
        options: [
          {
            text: "Thank you so much for your help! Have a wonderful day, officer!",
            isCorrect: true,
            feedback: "น่ารักและสุภาพมาก! การอวยพรกลับให้ผู้ที่ช่วยเหลือเราสร้างความประทับใจที่ดีเสมอ"
          },
          {
            text: "Yeah yeah go catch mice.",
            isCorrect: false,
            feedback: "ดูไม่สุภาพและไม่ให้เกียรติ ควรกล่าวขอบคุณด้วยความจริงใจ"
          },
          {
            text: "Finish talk now.",
            isCorrect: false,
            feedback: "การจบบทสนทนาภาษาอังกฤษควรมีคำขอบคุณ เช่น 'Thank you' หรือ 'Have a nice day'"
          }
        ],
        vocab: [
          { word: "Have a safe trip!", meaning: "เดินทางโดยสวัสดิภาพ / เดินทางปลอดภัยนะ" },
          { word: "Much appreciated", meaning: "ขอบคุณมากๆ / ซาบซึ้งในความช่วยเหลือ" },
          { word: "Entrance", meaning: "ทางเข้า" }
        ]
      }
    ]
  },
  {
    id: "clinic_visit",
    stageNumber: 3,
    packNumber: 1,
    packId: "pack_daily",
    title: "Paw-some Clinic",
    titleTh: "คลินิกสุขภาพหมอฮูก (การบอกอาการป่วยและถามเรื่องยา)",
    category: "Healthcare",
    icon: "🏥",
    difficulty: "Intermediate",
    cefrLevel: "B1",
    cefrCanDo: "Can describe physical symptoms of illness, comprehend medical advice, and clarify dosage instructions.",
    canDoSummary: "อธิบายอาการเจ็บป่วย เข้าใจคำแนะนำของแพทย์ และสอบถามวิธีใช้ยาได้อย่างถูกต้องปลอดภัย",
    toeicBand: "TOEIC 550 - 700 (Intermediate)",
    rewardExp: 75,
    rewardCoins: 45,
    npcName: "Dr. Hoot",
    npcAvatar: "🦉",
    bgTheme: "theme-clinic",
    description: "ฝึกอธิบายอาการป่วย ปวดหัว มีไข้ เจ็บคอ ระยะเวลาที่เป็น และวิธีทานยา",
    dialogues: [
      {
        id: 1,
        npcText: "Good morning! Come on in and have a seat. What seems to be the problem today?",
        npcVoiceText: "Good morning! Come on in and have a seat. What seems to be the problem today?",
        contextTh: "คุณหมอเชื้อเชิญให้นั่งและถามว่าวันนี้มีอาการหรือปัญหาอะไร (คุณมีอาการปวดหัว เจ็บคอ และรู้สึกมีไข้)",
        hint: "ใช้โครงสร้าง 'I have a [อาการ]' หรือ 'I feel feverish with a sore throat.'",
        targetPhrases: [
          "I have a terrible headache, a sore throat, and I feel feverish.",
          "I have a headache and a sore throat.",
          "I feel feverish and my throat hurts.",
          "I have a bad headache today."
        ],
        options: [
          {
            text: "I have a headache, a sore throat, and I feel a bit feverish.",
            isCorrect: true,
            feedback: "ถูกต้องและชัดเจนมาก! บอกทั้งอาการปวดหัว (headache), เจ็บคอ (sore throat), และรู้สึกมีไข้ (feverish)"
          },
          {
            text: "My head is broken and neck pain.",
            isCorrect: false,
            feedback: "ปวดหัวใช้ 'headache' ส่วนเจ็บคอด้านในใช้ 'sore throat' (neck มักหมายถึงคอด้านนอกหรือกล้ามเนื้อคอ)"
          },
          {
            text: "I am sick give medicine now.",
            isCorrect: false,
            feedback: "ควรบอกอาการเฉพาะเจาะจงเพื่อให้แพทย์วินิจฉัยก่อนสั่งยา"
          }
        ],
        vocab: [
          { word: "What seems to be the problem?", meaning: "วันนี้มีอาการอย่างไรมาครับ" },
          { word: "Headache", meaning: "อาการปวดหัว" },
          { word: "Feverish", meaning: "รู้สึกครั่นเนื้อครั่นตัวมีไข้" }
        ]
      },
      {
        id: 2,
        npcText: "I see. How long have you been feeling this way, and do you have any allergies to medication?",
        npcVoiceText: "I see. How long have you been feeling this way, and do you have any allergies to medication?",
        contextTh: "คุณหมอถามว่ามีอาการนี้มากี่วันแล้ว และมีประวัติแพ้ยาอะไรไหม (เป็นมา 2 วัน และไม่แพ้ยาอะไร)",
        hint: "บอกระยะเวลาด้วย 'For [จำนวนวัน]' เช่น 'For about two days. And I don't have any drug allergies.'",
        targetPhrases: [
          "For about two days, and I don't have any drug allergies.",
          "Since two days ago, no allergies.",
          "About two days, and no allergies that I know of.",
          "For two days, I am not allergic to any medicine."
        ],
        options: [
          {
            text: "For about two days, and I don't have any drug allergies.",
            isCorrect: true,
            feedback: "ครบถ้วนสมบูรณ์! ตอบทั้งระยะเวลาที่เป็น (for about two days) และประวัติแพ้ยา (no drug allergies)"
          },
          {
            text: "I don't know time, I like pills.",
            isCorrect: false,
            feedback: "ข้อมูลไม่ชัดเจน อาจทำให้แพทย์คำนวณปริมาณยาผิดพลาดได้"
          },
          {
            text: "Two years, allergy to water.",
            isCorrect: false,
            feedback: "ระยะเวลานานเกินไป และข้อมูลอาการแพ้ควรสมเหตุสมผลทางการแพทย์"
          }
        ],
        vocab: [
          { word: "Allergy", meaning: "การแพ้ (เช่น แพ้ยา/อาหาร)" },
          { word: "Medication", meaning: "ยารักษาโรค" },
          { word: "Drug allergies", meaning: "อาการแพ้ยา" }
        ]
      },
      {
        id: 3,
        npcText: "Okay, you have a mild throat infection. I'm prescribing antibiotics and painkillers. Do you know how to take them?",
        npcVoiceText: "Okay, you have a mild throat infection. I'm prescribing antibiotics and painkillers. Do you know how to take them?",
        contextTh: "หมอบอกว่าคออักเสบเล็กน้อย จึงสั่งยาปฏิชีวนะและยาแก้ปวดให้ พร้อมถามว่ารู้วิธีทานยาไหม (ต้องการถามว่าต้องทานวันละกี่ครั้งและก่อนหรือหลังอาหาร)",
        hint: "ถามวิธีทานยา: 'How many times a day should I take them, and should I take them before or after meals?'",
        targetPhrases: [
          "How often should I take them, and before or after meals?",
          "How many times a day should I take this medicine?",
          "Should I take them before or after meals?",
          "How do I take this medication, please?"
        ],
        options: [
          {
            text: "How often should I take them, and should I take them before or after meals?",
            isCorrect: true,
            feedback: "คำถามระดับมือโปร! 'How often' (บ่อยแค่ไหน) และ 'before or after meals' (ก่อนหรือหลังอาหาร) เป็นคำถามที่สำคัญมากเวลาพบแพทย์"
          },
          {
            text: "I eat all pills at one time okay?",
            isCorrect: false,
            feedback: "อันตรายมาก! การทานยาทั้งหมดในคราวเดียวอาจเกิดภาวะกินยาเกินขนาด (Overdose)"
          },
          {
            text: "Medicine tastes bad throw away.",
            isCorrect: false,
            feedback: "ควรรับฟังคำแนะนำการใช้ยาจากแพทย์เพื่อรักษาอาการให้หายดี"
          }
        ],
        vocab: [
          { word: "Prescribing", meaning: "การสั่งจ่ายยา" },
          { word: "Antibiotics", meaning: "ยาปฏิชีวนะ / ยาฆ่าเชื้อ" },
          { word: "Before / After meals", meaning: "ก่อน / หลังอาหาร" }
        ]
      },
      {
        id: 4,
        npcText: "Take one tablet every 8 hours after meals. Drink plenty of warm water and get some rest. Any other questions?",
        npcVoiceText: "Take one tablet every 8 hours after meals. Drink plenty of warm water and get some rest. Any other questions?",
        contextTh: "หมอแนะนำ: ทานครั้งละ 1 เม็ดทุก 8 ชั่วโมงหลังอาหาร ดื่มน้ำอุ่นเยอะๆ และพักผ่อน แล้วถามว่ามีคำถามอื่นไหม (เข้าใจแล้ว ขอบคุณคุณหมอมาก)",
        hint: "ตอบว่าเข้าใจวิธีทานแล้ว และขอบคุณคุณหมอ เช่น 'Everything is clear. Thank you so much, Dr. Hoot!'",
        targetPhrases: [
          "Everything is clear. Thank you so much, Dr. Hoot!",
          "Understood, thank you very much for your care!",
          "No more questions, thank you doctor!",
          "Got it, thanks for your help doctor!"
        ],
        options: [
          {
            text: "Everything is crystal clear. Thank you so much for your care, doctor!",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! 'Crystal clear' หมายถึงเข้าใจกระจ่างแจ้ง และกล่าวขอบคุณแพทย์อย่างสุภาพ"
          },
          {
            text: "I want to go play outside now bye.",
            isCorrect: false,
            feedback: "เมื่อป่วยควรปฏิบัติตามคำแนะนำของแพทย์เพื่อพักผ่อนให้เพียงพอ"
          },
          {
            text: "Give me injection for fun.",
            isCorrect: false,
            feedback: "การฉีดยาทำเฉพาะเมื่อมีความจำเป็นทางการแพทย์เท่านั้น"
          }
        ],
        vocab: [
          { word: "Crystal clear", meaning: "เข้าใจกระจ่างแจ้ง ชัดเจนมาก" },
          { word: "Plenty of warm water", meaning: "น้ำอุ่นปริมาณมาก" },
          { word: "Tablet", meaning: "ยาเม็ด" }
        ]
      }
    ]
  },
  {
    id: "park_chit_chat",
    stageNumber: 4,
    packNumber: 1,
    packId: "pack_daily",
    title: "Sunny Park Small Talk",
    titleTh: "ชวนคุยที่สวนสาธารณะ (Small Talk ทั่วไปและงานอดิเรก)",
    category: "Small Talk",
    icon: "🌳",
    difficulty: "Beginner",
    cefrLevel: "B1",
    cefrCanDo: "Can initiate casual small talk, express personal interests and opinions, and sustain natural social conversation.",
    canDoSummary: "ชวนคุยอย่างเป็นมิตร (Small Talk) แลกเปลี่ยนความคิดเห็น และสนทนาเรื่องทั่วไปได้อย่างเป็นธรรมชาติ",
    toeicBand: "TOEIC 550 - 750 (Intermediate)",
    rewardExp: 55,
    rewardCoins: 35,
    npcName: "Sunny Sammy",
    npcAvatar: "🐿️",
    bgTheme: "theme-park",
    description: "ฝึกคุยเรื่องสภาพอากาศ เล่าเรื่องสัตว์เลี้ยง งานอดิเรก และการตอบรับบทสนทนา",
    dialogues: [
      {
        id: 1,
        npcText: "Lovely day today, isn't it? The weather is just perfect for a walk!",
        npcVoiceText: "Lovely day today, isn't it? The weather is just perfect for a walk!",
        contextTh: "กระรอกแซมมี่ทักทายเรื่องสภาพอากาศที่แจ่มใสเหมาะกับการเดินเล่น",
        hint: "คนเจ้าของภาษานิยมเริ่มคุยด้วยเรื่องดินฟ้าอากาศ ตอบรับด้วย 'It really is!' หรือ 'I couldn't agree more!'",
        targetPhrases: [
          "It really is! The weather is so nice and warm today.",
          "Yes, it's absolutely gorgeous out here.",
          "I agree, it's a great day for a walk.",
          "It definitely is! Perfect weather."
        ],
        options: [
          {
            text: "It really is! The weather is so pleasant today.",
            isCorrect: true,
            feedback: "เป็นธรรมชาติมาก! 'It really is' เป็นการเห็นด้วยอย่างสุภาพและเปิดโอกาสคุยต่อ"
          },
          {
            text: "I hate sun, go away clouds.",
            isCorrect: false,
            feedback: "ดูตัดบทสนทนาและไม่เข้ากับสถานการณ์ที่อากาศแจ่มใส"
          },
          {
            text: "Today is Monday weather.",
            isCorrect: false,
            feedback: "ความหมายสับสน ไม่ได้อธิบายสภาพอากาศ"
          }
        ],
        vocab: [
          { word: "Lovely day", meaning: "วันที่อากาศดี/วันดีๆ" },
          { word: "Pleasant", meaning: "สบาย/น่ารื่นรมย์" },
          { word: "It really is!", meaning: "จริงด้วยครับ/ค่ะ!" }
        ]
      },
      {
        id: 2,
        npcText: "Are you from around here, or are you just visiting?",
        npcVoiceText: "Are you from around here, or are you just visiting?",
        contextTh: "คู่สนทนาถามว่าคุณเป็นคนที่นี่ หรือแค่มาเที่ยว",
        hint: "ตอบสถานะของคุณ เช่น 'I'm just visiting for a few days.' พร้อมถามกลับ 'How about you?'",
        targetPhrases: [
          "I'm just visiting for a few days. How about you?",
          "I just moved here recently, still exploring!",
          "I'm visiting on vacation, loving the city so far.",
          "I live nearby, what about you?"
        ],
        options: [
          {
            text: "I'm just visiting for a few days. How about you?",
            isCorrect: true,
            feedback: "ยอดเยี่ยม! การปิดท้ายด้วย 'How about you?' (แล้วคุณล่ะ?) ช่วยรักษาบทสนทนาให้ลื่นไหล (Ping-pong conversation)"
          },
          {
            text: "Secret. Don't ask me questions.",
            isCorrect: false,
            feedback: "ดูไม่เป็นมิตรสำหรับการคุยเล่นในสวนสาธารณะ"
          },
          {
            text: "I am tourist give me money.",
            isCorrect: false,
            feedback: "ไม่ตรงกับบริบทของการทำความรู้จักเพื่อนใหม่"
          }
        ],
        vocab: [
          { word: "Around here", meaning: "แถวๆ นี้" },
          { word: "Visiting", meaning: "มาเที่ยว / มาเยือน" },
          { word: "How about you?", meaning: "แล้วคุณล่ะ?" }
        ]
      },
      {
        id: 3,
        npcText: "I live right across the street! What do you usually like to do in your free time?",
        npcVoiceText: "I live right across the street! What do you usually like to do in your free time?",
        contextTh: "คู่สนทนาบอกว่าบ้านอยู่ฝั่งตรงข้าม และถามว่าเวลาว่างคุณชอบทำอะไร (ชอบอ่านหนังสือ และฟังเพลง)",
        hint: "ตอบงานอดิเรกด้วย 'In my free time, I enjoy [กิจกรรม-ing]' เช่น 'I enjoy reading books and listening to music.'",
        targetPhrases: [
          "In my free time, I enjoy reading and listening to music.",
          "I love reading books and listening to music.",
          "Usually I like reading and going for walks.",
          "I enjoy exploring cafes and reading."
        ],
        options: [
          {
            text: "In my free time, I really enjoy reading books and listening to music.",
            isCorrect: true,
            feedback: "โครงสร้างสวยงามมาก! 'In my free time, I enjoy...' เป็นสำนวนบอกงานอดิเรกที่เป็นธรรมชาติที่สุด"
          },
          {
            text: "I sleep 24 hours like dead cat.",
            isCorrect: false,
            feedback: "แม้แมวจะชอบนอน แต่ตอบงานอดิเรกเชิงบวกจะช่วยต่อยอดบทสนทนาได้ดีกว่า"
          },
          {
            text: "Free time is boring no hobby.",
            isCorrect: false,
            feedback: "ตอบแบบนี้จะทำให้บทสนทนาหยุดชะงักได้ง่าย"
          }
        ],
        vocab: [
          { word: "In my free time", meaning: "ในเวลาว่างของฉัน" },
          { word: "I enjoy...", meaning: "ฉันเพลิดเพลินกับการ..." },
          { word: "Across the street", meaning: "ฝั่งตรงข้ามถนน" }
        ]
      },
      {
        id: 4,
        npcText: "That sounds so relaxing! Well, my little friend is waiting for me, so I have to get going. It was great talking to you!",
        npcVoiceText: "That sounds so relaxing! Well, my little friend is waiting for me, so I have to get going. It was great talking to you!",
        contextTh: "คู่สนทนาขอตัวไปก่อนเพราะมีเพื่อนรออยู่ และบอกว่ายินดีมากที่ได้คุยกัน",
        hint: "ตอบรับการบอกลาอย่างสุภาพ: 'It was great talking to you too! Have a good one!'",
        targetPhrases: [
          "It was great talking to you too! Take care!",
          "Nice meeting you! Have a great day!",
          "Great talking to you as well, enjoy your walk!",
          "It was a pleasure, have a nice day!"
        ],
        options: [
          {
            text: "It was great talking to you too! Have a wonderful day!",
            isCorrect: true,
            feedback: "สมบูรณ์แบบ! 'It was great talking to you too' เป็นการปิดท้ายบทสนทนาที่เป็นมิตรและอบอุ่นมาก"
          },
          {
            text: "Run away then bye.",
            isCorrect: false,
            feedback: "ดูห้วนและประชดประชัน ควรกล่าวคำอำลาที่ดี"
          },
          {
            text: "Don't go talk more.",
            isCorrect: false,
            feedback: "ควรเคารพเวลาเมื่ออีกฝ่ายมีธุระต้องไปต่อ"
          }
        ],
        vocab: [
          { word: "Have to get going", meaning: "ต้องขอตัวไปก่อนแล้ว" },
          { word: "It was great talking to you!", meaning: "ยินดีมากที่ได้คุยกันนะครับ/ค่ะ" },
          { word: "Take care!", meaning: "ดูแลตัวเองด้วยนะ" }
        ]
      }
    ]
  },
  {
    id: "hotel_checkin",
    stageNumber: 5,
    packNumber: 1,
    packId: "pack_daily",
    title: "Grand Whisker Hotel",
    titleTh: "โรงแรมแกรนด์วิสเกอร์ (การเช็กอินและสอบถามบริการ)",
    category: "Travel",
    icon: "🏨",
    difficulty: "Intermediate",
    cefrLevel: "B1",
    cefrCanDo: "Can manage hotel reservations, request specific amenities, and resolve service queries politely.",
    canDoSummary: "เช็กอินโรงแรม ขอสิ่งอำนวยความสะดวกเพิ่มเติม และสอบถามบริการท่องเที่ยวได้อย่างมืออาชีพ",
    toeicBand: "TOEIC 600 - 780 (Intermediate)",
    rewardExp: 80,
    rewardCoins: 50,
    npcName: "Concierge Pierre",
    npcAvatar: "🐧",
    bgTheme: "theme-hotel",
    description: "ฝึกเช็กอินห้องพัก ขอรหัส Wi-Fi สอบถามเวลาอาหารเช้า และเวลาเช็กเอาต์",
    dialogues: [
      {
        id: 1,
        npcText: "Good afternoon, welcome to the Grand Whisker Hotel. How may I assist you today?",
        npcVoiceText: "Good afternoon, welcome to the Grand Whisker Hotel. How may I assist you today?",
        contextTh: "พนักงานต้อนรับกล่าวต้อนรับและถามว่ามีอะไรให้ช่วยเหลือ (คุณต้องการเช็กอินตามที่จองไว้ล่วงหน้า)",
        hint: "ใช้ประโยค 'Hi, I'd like to check in, please. I have a reservation under [ชื่อ]'",
        targetPhrases: [
          "Hi, I'd like to check in, please. I have a reservation.",
          "Good afternoon, checking in please under the name Whisker.",
          "I have a reservation to check in today.",
          "I would like to check in, please."
        ],
        options: [
          {
            text: "Hi, I'd like to check in, please. I have a reservation.",
            isCorrect: true,
            feedback: "สุภาพและครบถ้วน! พนักงานโรงแรมจะขอชื่อหรือพาสปอร์ตเพื่อค้นหาบุ๊กกิ้งทันที"
          },
          {
            text: "Give me bed to sleep now.",
            isCorrect: false,
            feedback: "ห้วนเกินไป ควรใช้ 'I'd like to check in, please.'"
          },
          {
            text: "Is this hospital?",
            isCorrect: false,
            feedback: "คุณอยู่ที่เคาน์เตอร์โรงแรม ควรแจ้งความประสงค์ในการเช็กอิน"
          }
        ],
        vocab: [
          { word: "Check in", meaning: "ลงทะเบียนเข้าพัก" },
          { word: "Reservation", meaning: "การจองล่วงหน้า" },
          { word: "How may I assist you?", meaning: "มีอะไรให้ผมช่วยเหลือไหมครับ" }
        ]
      },
      {
        id: 2,
        npcText: "Found your booking! Here is your keycard for room 402 on the 4th floor. Is there anything else you'd like to know?",
        npcVoiceText: "Found your booking! Here is your keycard for room 402 on the 4th floor. Is there anything else you'd like to know?",
        contextTh: "พนักงานมอบคีย์การ์ดห้อง 402 และถามว่ามีคำถามอื่นไหม (ต้องการถามเวลาอาหารเช้าและรหัส Wi-Fi)",
        hint: "ถามเวลาอาหารเช้า: 'What time is breakfast served, and could you give me the Wi-Fi password?'",
        targetPhrases: [
          "Could you tell me what time breakfast is served?",
          "What time is breakfast served, and what is the Wi-Fi password?",
          "Is breakfast included, and what time does it start?",
          "What time is breakfast, please?"
        ],
        options: [
          {
            text: "Could you tell me what time breakfast is served tomorrow morning?",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! 'What time is breakfast served?' เป็นคำถามมาตรฐานที่พบบ่อยในการเดินทาง"
          },
          {
            text: "Breakfast food where eat now.",
            isCorrect: false,
            feedback: "ประโยคไม่สมบูรณ์ ควรใช้ 'Where is breakfast served?' หรือ 'What time is breakfast?'"
          },
          {
            text: "No I know everything goodbye.",
            isCorrect: false,
            feedback: "การสอบถามข้อมูลสำคัญของโรงแรม เช่น เวลาอาหารเช้า จะช่วยให้ไม่พลาดมื้ออาหารเช้าฟรี"
          }
        ],
        vocab: [
          { word: "Keycard", meaning: "คีย์การ์ดเปิดห้อง" },
          { word: "Served", meaning: "เสิร์ฟ / ให้บริการ" },
          { word: "Amenities", meaning: "สิ่งอำนวยความสะดวก" }
        ]
      },
      {
        id: 3,
        npcText: "Breakfast is served from 6:30 to 10:30 AM on the 2nd floor, and the Wi-Fi password is on your keycard jacket. Do you need any assistance with your luggage?",
        npcVoiceText: "Breakfast is served from 6:30 to 10:30 AM on the 2nd floor, and the Wi-Fi password is on your keycard jacket. Do you need any assistance with your luggage?",
        contextTh: "พนักงานแจ้งเวลาอาหารเช้า 6:30 - 10:30 น. ชั้น 2 และรหัส Wi-Fi อยู่บนซองคีย์การ์ด พร้อมถามว่าต้องการให้ช่วยยกกระเป๋าไหม (คุณถือไหว ไม่เป็นไร ขอบคุณมาก)",
        hint: "ปฏิเสธความช่วยเหลืออย่างสุภาพ: 'No thank you, I can manage it myself.'",
        targetPhrases: [
          "No thank you, I can manage it myself.",
          "I'm good, thank you. I can carry it.",
          "No thanks, I'll take it myself.",
          "That's fine, I can manage. Thank you!"
        ],
        options: [
          {
            text: "No thank you, I can manage it myself. Thanks for asking!",
            isCorrect: true,
            feedback: "สุภาพมาก! 'I can manage it myself' (ฉันจัดการเองได้ครับ/ค่ะ) แสดงความเป็นอิสระและขอบคุณในน้ำใจ"
          },
          {
            text: "Don't touch my bag thief!",
            isCorrect: false,
            feedback: "พนักงานโรงแรมเสนอบริการยกกระเป๋า (Bellboy service) ตามหน้าที่ ไม่ใช่ขโมยนะ!"
          },
          {
            text: "Carry everything I am lazy.",
            isCorrect: false,
            feedback: "หากต้องการให้ช่วย ควรตอบว่า 'Yes please, that would be very helpful.'"
          }
        ],
        vocab: [
          { word: "Luggage / Baggage", meaning: "กระเป๋าเดินทาง / สัมภาระ" },
          { word: "I can manage", meaning: "ฉันจัดการเองได้ / ดูแลเองได้" },
          { word: "Assistance", meaning: "ความช่วยเหลือ" }
        ]
      },
      {
        id: 4,
        npcText: "Understood! And just a reminder, check-out time is at 11:00 AM tomorrow. Wishing you a pleasant stay with us!",
        npcVoiceText: "Understood! And just a reminder, check-out time is at 11:00 AM tomorrow. Wishing you a pleasant stay with us!",
        contextTh: "พนักงานย้ำเตือนว่าเวลาเช็กเอาต์คือ 11:00 น. พรุ่งนี้ และขอให้มีความสุขกับการพักผ่อน",
        hint: "ตอบรับและขอบคุณ: 'Thank you very much! Have a great day.'",
        targetPhrases: [
          "Thank you very much for your help! Have a great day.",
          "Noted, thank you so much! Have a wonderful day.",
          "Thank you, appreciate your help!",
          "Got it, thanks a lot!"
        ],
        options: [
          {
            text: "Thank you so much for all the information! Have a great day.",
            isCorrect: true,
            feedback: "ดีเยี่ยม! การขอบคุณสำหรับข้อมูลทั้งหมด (all the information) ช่วยจบบทสนทนาเช็กอินได้อย่างสง่างาม"
          },
          {
            text: "I will sleep until night tomorrow.",
            isCorrect: false,
            feedback: "หากเช็กเอาต์เกินเวลาที่กำหนด อาจมีค่าธรรมเนียม Late check-out ได้นะ"
          },
          {
            text: "Whatever see you.",
            isCorrect: false,
            feedback: "คำว่า 'Whatever' ฟังดูไม่สุภาพในการสื่อสารกับบริการโรงแรม"
          }
        ],
        vocab: [
          { word: "Check-out time", meaning: "เวลาคืนห้องพัก" },
          { word: "Pleasant stay", meaning: "การเข้าพักที่น่ารื่นรมย์มีความสุข" },
          { word: "Reminder", meaning: "การเตือนความจำ" }
        ]
      }
    ]
  },
  {
    id: "convenience_store",
    stageNumber: 6,
    packNumber: 1,
    packId: "pack_daily",
    title: "7-Meowven Store",
    titleTh: "ร้านสะดวกซื้อเซเว่นเหมียว (การซื้อของ & ชำระเงิน)",
    category: "Daily Shopping",
    icon: "🏪",
    difficulty: "Beginner",
    cefrLevel: "A2",
    cefrCanDo: "Can conduct everyday retail shopping, inquire about product availability, and choose payment methods.",
    canDoSummary: "ซื้อของในร้านสะดวกซื้อ สอบถามตำแหน่งสินค้า อุ่นอาหาร และเลือกวิธีชำระเงินได้คล่องแคล่ว",
    toeicBand: "TOEIC 250 - 450 (Elementary)",
    rewardExp: 60,
    rewardCoins: 40,
    npcName: "Cashier Cleo",
    npcAvatar: "🐱‍👤",
    bgTheme: "theme-convenience",
    description: "ฝึกถามหาสินค้า ขอให้อุ่นอาหาร แจ้งรับถุงพลาสติก และชำระเงินด้วย QR Code หรือเงินสด",
    dialogues: [
      {
        id: 1,
        npcText: "Hi there! Welcome to 7-Meowven. Are you looking for anything in particular?",
        npcVoiceText: "Hi there! Welcome to 7-Meowven. Are you looking for anything in particular?",
        contextTh: "พนักงานถามว่ากำลังมองหาสินค้าอะไรเป็นพิเศษไหม (คุณต้องการหาที่ชาร์จโทรศัพท์)",
        hint: "ใช้ประโยค 'Excuse me, where can I find phone chargers?' หรือ 'Do you have...?'",
        targetPhrases: [
          "Excuse me, where can I find phone chargers?",
          "Do you sell phone chargers here?",
          "Could you tell me where the chargers are?",
          "Where are the phone cables, please?"
        ],
        options: [
          {
            text: "Excuse me, where can I find phone chargers?",
            isCorrect: true,
            feedback: "ถูกต้องและตรงประเด็น! 'Where can I find [สิ่งของ]?' เป็นคำถามมาตรฐานในการหาสินค้าในร้านสะดวกซื้อ"
          },
          {
            text: "Battery dead help me screaming.",
            isCorrect: false,
            feedback: "ควรบอกชื่อสิ่งของที่ต้องการ เช่น phone charger หรือ charging cable"
          },
          {
            text: "Sell electric wire now.",
            isCorrect: false,
            feedback: "คำว่า 'electric wire' มักหมายถึงสายไฟก่อสร้าง ไม่ใช่สายชาร์จมือถือ"
          }
        ],
        vocab: [
          { word: "In particular", meaning: "โดยเฉพาะเจาะจง" },
          { word: "Phone charger", meaning: "ที่ชาร์จโทรศัพท์มือถือ" },
          { word: "Aisle", meaning: "ช่องทางเดินระหว่างชั้นวางของ" }
        ]
      },
      {
        id: 2,
        npcText: "They are in aisle 2 right next to the earphones. And you have a lunch box here, would you like me to heat it up for you?",
        npcVoiceText: "They are in aisle 2 right next to the earphones. And you have a lunch box here, would you like me to heat it up for you?",
        contextTh: "พนักงานบอกว่าที่ชาร์จอยู่ช่อง 2 ข้างหูฟัง และเห็นคุณหยิบข้าวกล่องมา จึงถามว่าจะให้อุ่นไมโครเวฟให้ไหม (ต้องการให้อุ่นให้)",
        hint: "ตอบรับอย่างสุภาพ: 'Yes please, that would be great!'",
        targetPhrases: [
          "Yes please, could you heat it up for me?",
          "Yes please, that would be great!",
          "Yes, warm it up please.",
          "Please heat it up, thank you."
        ],
        options: [
          {
            text: "Yes, please! Could you heat it up for me?",
            isCorrect: true,
            feedback: "เป๊ะมาก! 'Heat it up' หรือ 'Warm it up' เป็นคำที่พนักงานร้านสะดวกซื้อใช้เมื่ออุ่นอาหารสำเร็จรูป"
          },
          {
            text: "Fire cooking right here now.",
            isCorrect: false,
            feedback: "ในร้านสะดวกซื้อใช้ไมโครเวฟในการอุ่นอาหาร ควรใช้คำว่า heat up"
          },
          {
            text: "No I eat frozen ice rice.",
            isCorrect: false,
            feedback: "ข้าวกล่องแช่แข็งควรอุ่นร้อนก่อนรับประทานเพื่อสุขอนามัยที่ดี"
          }
        ],
        vocab: [
          { word: "Heat it up", meaning: "อุ่นร้อน (ด้วยไมโครเวฟ)" },
          { word: "Lunch box", meaning: "ข้าวกล่องสำเร็จรูป" },
          { word: "Next to", meaning: "ข้างๆ กับ" }
        ]
      },
      {
        id: 3,
        npcText: "All heated! Do you need a plastic bag, or do you have your own bag?",
        npcVoiceText: "All heated! Do you need a plastic bag, or do you have your own bag?",
        contextTh: "พนักงานอุ่นเสร็จแล้ว และถามว่าต้องการรับถุงพลาสติกไหม หรือมีถุงผ้ามาเอง (มีถุงผ้ามาเอง ไม่รับถุงพลาสติก)",
        hint: "ตอบว่า 'No bag needed, I have my own bag, thank you.'",
        targetPhrases: [
          "No bag needed, I brought my own bag. Thanks!",
          "I have my own bag, thank you.",
          "No plastic bag, thank you.",
          "I have a tote bag, no thanks."
        ],
        options: [
          {
            text: "No bag needed, I brought my own bag. Thank you!",
            isCorrect: true,
            feedback: "เป็นคำตอบที่ยอดเยี่ยมและช่วยรักษาสิ่งแวดล้อมด้วย! 'I brought my own bag' แปลว่านำถุงมาเอง"
          },
          {
            text: "Give me ten big bags for free.",
            isCorrect: false,
            feedback: "ปัจจุบันร้านสะดวกซื้อส่วนใหญ่คิดค่าถุงพลาสติกหรือไม่แจกถุงเพื่อลดขยะ"
          },
          {
            text: "I throw food in my pocket.",
            isCorrect: false,
            feedback: "ใส่กระเป๋าเสื้อผ้าอาจทำให้อาหารหกเลอะเทอะได้นะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "Plastic bag", meaning: "ถุงพลาสติก" },
          { word: "Own bag / Tote bag", meaning: "ถุงผ้าส่วนตัว" },
          { word: "No needed", meaning: "ไม่จำเป็นต้องใช้ / ไม่รับ" }
        ]
      },
      {
        id: 4,
        npcText: "That's 185 baht in total. Will you be paying by cash, card, or QR code scan?",
        npcVoiceText: "That's 185 baht in total. Will you be paying by cash, card, or QR code scan?",
        contextTh: "ยอดรวม 185 บาท พนักงานถามว่าจะจ่ายด้วยเงินสด บัตร หรือสแกน QR Code (ต้องการสแกนจ่าย QR Code)",
        hint: "ตอบว่า 'I'll pay by QR code scan, please.'",
        targetPhrases: [
          "I'd like to pay with QR code, please.",
          "By QR code scan, please.",
          "Can I scan the QR code to pay?",
          "I will scan QR code, please."
        ],
        options: [
          {
            text: "I'll pay by QR code scan, please. Where do I scan?",
            isCorrect: true,
            feedback: "ทันสมัยและคล่องแคล่วมาก! 'Pay by QR code scan' เป็นวิธีชำระเงินยอดนิยมในยุคดิจิทัล"
          },
          {
            text: "I pay with cat fish.",
            isCorrect: false,
            feedback: "ร้านสะดวกซื้อไม่รับปลาเป็นเงินชำระหนี้นะเจ้าเหมียว!"
          },
          {
            text: "No money check out free.",
            isCorrect: false,
            feedback: "ต้องชำระเงินตามราคาสินค้าเสมอ"
          }
        ],
        vocab: [
          { word: "In total", meaning: "รวมทั้งหมดเป็นเงิน" },
          { word: "Scan to pay", meaning: "สแกนเพื่อชำระเงิน" },
          { word: "Receipt", meaning: "ใบเสร็จรับเงิน" }
        ]
      }
    ]
  },
  {
    id: "airport_flight",
    stageNumber: 7,
    packNumber: 1,
    packId: "pack_daily",
    title: "SkyPurr Airport & Immigration",
    titleTh: "สนามบินและด่านตรวจคนเข้าเมือง (การเดินทางระหว่างประเทศ)",
    category: "Travel",
    icon: "✈️",
    difficulty: "Intermediate",
    cefrLevel: "B2",
    cefrCanDo: "Can navigate international airport procedures, answer immigration interviews fluently, and manage transit flight disruptions.",
    canDoSummary: "ผ่านด่านตรวจคนเข้าเมือง (ตม.) ตอบสัมภาษณ์ภาษาอังกฤษ และจัดการเที่ยวบินต่อเครื่องข้ามชาติได้อย่างคล่องแคล่ว",
    toeicBand: "TOEIC 785 - 900 (Upper-Intermediate)",
    rewardExp: 85,
    rewardCoins: 55,
    npcName: "Officer Eagle",
    npcAvatar: "🦅",
    bgTheme: "theme-airport",
    description: "ฝึกตอบคำถามเจ้าหน้าที่ ตม. (วัตถุประสงค์การเดินทาง, ระยะเวลาพำนัก) และถามหาเกตขึ้นเครื่อง",
    dialogues: [
      {
        id: 1,
        npcText: "Passport and arrival card, please. What is the purpose of your visit to our country?",
        npcVoiceText: "Passport and arrival card, please. What is the purpose of your visit to our country?",
        contextTh: "เจ้าหน้าที่ ตม. ขอดูพาสปอร์ตและถามวัตถุประสงค์ในการเดินทางมาประเทศนี้ (มาท่องเที่ยวพักผ่อน)",
        hint: "ตอบวัตถุประสงค์สั้นและชัดเจน: 'I am here for tourism / vacation.'",
        targetPhrases: [
          "I'm here for tourism and sightseeing.",
          "I am here for vacation.",
          "Just for holiday and tourism.",
          "I'm traveling on vacation."
        ],
        options: [
          {
            text: "I am here on vacation for sightseeing and tourism.",
            isCorrect: true,
            feedback: "ชัดเจน มั่นใจ และถูกต้องตามหลักการผ่านด่านตรวจคนเข้าเมือง (Immigration)"
          },
          {
            text: "I want to live here forever without visa.",
            isCorrect: false,
            feedback: "ห้ามตอบแบบนี้เด็ดขาด! อาจทำให้เจ้าหน้าที่ปฏิเสธการเข้าเมืองทันที"
          },
          {
            text: "I don't know why I fly here.",
            isCorrect: false,
            feedback: "ควรมีคำตอบที่ชัดเจน เช่น tourism (ท่องเที่ยว), business (ธุรกิจ), หรือ study (เรียนต่อ)"
          }
        ],
        vocab: [
          { word: "Purpose of visit", meaning: "วัตถุประสงค์ในการเดินทางมาเยือน" },
          { word: "Tourism / Vacation", meaning: "การท่องเที่ยว / พักผ่อน" },
          { word: "Sightseeing", meaning: "การเที่ยวชมสถานที่ต่างๆ" }
        ]
      },
      {
        id: 2,
        npcText: "How long do you intend to stay, and where will you be staying?",
        npcVoiceText: "How long do you intend to stay, and where will you be staying?",
        contextTh: "เจ้าหน้าที่ถามว่าจะพักอยู่กี่วัน และจะพักที่ไหน (พัก 7 วัน ที่โรงแรม Grand Whisker Hotel)",
        hint: "บอกระยะเวลาและสถานที่พัก: 'For 7 days at the Grand Whisker Hotel. Here is my hotel booking.'",
        targetPhrases: [
          "For about one week at the Grand Whisker Hotel.",
          "For 7 days, staying at Grand Whisker Hotel.",
          "One week, at the Grand Whisker Hotel.",
          "Seven days at the hotel."
        ],
        options: [
          {
            text: "I'll be staying for 7 days at the Grand Whisker Hotel. Here is my booking confirmation.",
            isCorrect: true,
            feedback: "สมบูรณ์แบบระดับ 5 ดาว! การยื่นใบจองโรงแรม (booking confirmation) ประกอบช่วยให้ผ่าน ตม. ได้ง่ายขึ้นมาก"
          },
          {
            text: "Maybe 10 years on the park bench.",
            isCorrect: false,
            feedback: "คำตอบต้องสอดคล้องกับวีซ่าท่องเที่ยวและมีที่พักเป็นหลักแหล่ง"
          },
          {
            text: "Secret hotel I cannot say.",
            isCorrect: false,
            feedback: "ต้องระบุชื่อที่พักที่แน่นอนตามกฎหมายตรวจคนเข้าเมือง"
          }
        ],
        vocab: [
          { word: "Intend to stay", meaning: "ตั้งใจจะพำนักอยู่เป็นเวลา..." },
          { word: "Booking confirmation", meaning: "เอกสารยืนยันการจองที่พัก" },
          { word: "Return ticket", meaning: "ตั๋วเครื่องบินขากลับ" }
        ]
      },
      {
        id: 3,
        npcText: "Everything is in order. Welcome to the country! [Stamp] Have a wonderful trip!",
        npcVoiceText: "Everything is in order. Welcome to the country! Have a wonderful trip!",
        contextTh: "เจ้าหน้าที่ตรวจสอบเอกสารครบถ้วน ประทับตราให้ผ่าน และอวยพรให้เดินทางสนุก",
        hint: "กล่าวขอบคุณอย่างสุภาพ: 'Thank you very much, officer! Have a nice day.'",
        targetPhrases: [
          "Thank you very much, officer! Have a great day.",
          "Thank you so much! Have a good day.",
          "Thank you officer, appreciate it!",
          "Thanks a lot!"
        ],
        options: [
          {
            text: "Thank you very much, officer! Have a great day.",
            isCorrect: true,
            feedback: "สุภาพ เรียบร้อย และเก็บพาสปอร์ตเดินทางต่อได้อย่างมั่นใจ"
          },
          {
            text: "Why did you take so long stamping?",
            isCorrect: false,
            feedback: "ไม่ควรบ่นหรือแสดงความหงุดหงิดกับเจ้าหน้าที่รักษาความปลอดภัย"
          },
          {
            text: "Give me stamp souvenir on my forehead.",
            isCorrect: false,
            feedback: "ตราประทับใช้เฉพาะในเล่มพาสปอร์ตเท่านั้นนะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "In order", meaning: "เรียบร้อย ถูกต้องตามกฎระเบียบ" },
          { word: "Passport stamp", meaning: "ตราประทับหนังสือเดินทาง" },
          { word: "Have a wonderful trip!", meaning: "ขอให้เที่ยวให้สนุกนะ" }
        ]
      },
      {
        id: 4,
        npcText: "Excuse me passenger! Can I help you find your connecting boarding gate?",
        npcVoiceText: "Excuse me passenger! Can I help you find your connecting boarding gate?",
        contextTh: "เจ้าหน้าที่ภาคพื้นดินเห็นคุณถือบอร์ดดิ้งพาส จึงถามว่าต้องการให้ช่วยหาเกตขึ้นเครื่องต่อไหม (ต้องการไปเกต B12)",
        hint: "ถามทางไปเกต: 'Yes please, could you tell me how to get to gate B12?'",
        targetPhrases: [
          "Yes please, where is boarding gate B12?",
          "Could you show me where gate B12 is?",
          "How do I get to gate B12, please?",
          "Yes please, looking for gate B12."
        ],
        options: [
          {
            text: "Yes, please! Could you tell me where boarding gate B12 is?",
            isCorrect: true,
            feedback: "ถามได้ตรงจุดและสุภาพมาก! พนักงานจะชี้ทิศทางและบอกระยะเวลาเดินไปยังเกตทันที"
          },
          {
            text: "Fly me to airplane now.",
            isCorrect: false,
            feedback: "ต้องเดินไปยังเกตและขึ้นเครื่องตามรอบเวลาของเที่ยวบิน"
          },
          {
            text: "I forgot my plane name.",
            isCorrect: false,
            feedback: "สามารถดูรหัสเที่ยวบิน (Flight Number) และเกตได้บนบัตรโดยสาร (Boarding Pass)"
          }
        ],
        vocab: [
          { word: "Boarding gate", meaning: "ประตูทางออกขึ้นเครื่องบิน" },
          { word: "Connecting flight", meaning: "เที่ยวบินต่อเครื่อง" },
          { word: "Boarding pass", meaning: "บัตรผ่านขึ้นเครื่องบิน" }
        ]
      }
    ]
  },
  {
    id: "fast_food",
    stageNumber: 8,
    packNumber: 1,
    packId: "pack_daily",
    title: "MeowDonald's Drive-Thru",
    titleTh: "ร้านฟาสต์ฟู้ดเหมียวดอนัลด์ (การสั่งเบอร์เกอร์และเซ็ตคอมโบ)",
    category: "Ordering Food",
    icon: "🍔",
    difficulty: "Beginner",
    cefrLevel: "A2",
    cefrCanDo: "Can place drive-thru food orders, customize combo meals, and confirm billing totals under time constraints.",
    canDoSummary: "สั่งอาหารฟาสต์ฟู้ด/ไดรฟ์ทรู เลือกชุดคอมโบและขนาดเครื่องดื่มได้อย่างรวดเร็วและถูกต้อง",
    toeicBand: "TOEIC 250 - 450 (Elementary)",
    rewardExp: 60,
    rewardCoins: 40,
    npcName: "Crew Charlie",
    npcAvatar: "🐶",
    bgTheme: "theme-fastfood",
    description: "ฝึกสั่งเซ็ตเบอร์เกอร์ เลือกเครื่องเคียง ซอสจิ้ม ปรับขนาดอัปไซซ์ และเลือกทานที่ร้านหรือกลับบ้าน",
    dialogues: [
      {
        id: 1,
        npcText: "Hi! Welcome to MeowDonald's. What meal combo can I get for you today?",
        npcVoiceText: "Hi! Welcome to MeowDonald's. What meal combo can I get for you today?",
        contextTh: "พนักงานถามว่าต้องการรับเซ็ตเบอร์เกอร์อะไรดีวันนี้ (ต้องการสั่งเซ็ตชีสเบอร์เกอร์)",
        hint: "สั่งเซ็ตอาหาร: 'I'd like a double cheeseburger combo meal, please.'",
        targetPhrases: [
          "I'd like a cheeseburger combo meal, please.",
          "Can I get the cheeseburger set, please?",
          "I'll have a cheeseburger meal, please.",
          "One cheeseburger combo please."
        ],
        options: [
          {
            text: "I'd like a double cheeseburger combo meal, please.",
            isCorrect: true,
            feedback: "เป๊ะมาก! คำว่า 'Combo meal' หรือ 'Value meal' หมายถึงเซ็ตที่มีทั้งเบอร์เกอร์ เฟรนช์ฟรายส์ และเครื่องดื่ม"
          },
          {
            text: "Give me twenty raw meat buns.",
            isCorrect: false,
            feedback: "ควรสั่งตามเมนูของทางร้าน เช่น cheeseburger, chicken burger, fish burger"
          },
          {
            text: "I want eat fast fast.",
            isCorrect: false,
            feedback: "ฟาสต์ฟู้ดหมายถึงอาหารที่ทำเสร็จรวดเร็ว แต่เวลาสั่งต้องระบุชื่อเมนูให้ชัดเจน"
          }
        ],
        vocab: [
          { word: "Combo meal / Value meal", meaning: "เซ็ตอาหารรวม (เบอร์เกอร์ + ของทอด + น้ำ)" },
          { word: "Cheeseburger", meaning: "ชีสเบอร์เกอร์" },
          { word: "Sides", meaning: "อาหารทานเล่น / เครื่องเคียง" }
        ]
      },
      {
        id: 2,
        npcText: "Great choice! For the side, would you like French fries or onion rings, and what drink would you prefer?",
        npcVoiceText: "Great choice! For the side, would you like French fries or onion rings, and what drink would you prefer?",
        contextTh: "พนักงานถามว่าจะรับเฟรนช์ฟรายส์หรือหัวหอมทอด และเครื่องดื่มรับอะไรดี (รับเฟรนช์ฟรายส์และโค้กซีโร่)",
        hint: "ตอบเครื่องเคียงและน้ำ: 'French fries and a Coke Zero, please.'",
        targetPhrases: [
          "French fries and a Coke Zero, please.",
          "I'll take French fries and Coke Zero.",
          "Fries and a diet coke please.",
          "French fries and iced cola, please."
        ],
        options: [
          {
            text: "French fries and a Coke Zero, please.",
            isCorrect: true,
            feedback: "ตอบได้กระชับ ชัดเจน และสุภาพ พนักงานสามารถคีย์เข้าระบบได้ทันที"
          },
          {
            text: "Fried potato grass and black bubble water.",
            isCorrect: false,
            feedback: "ภาษาอังกฤษใช้คำว่า 'French fries' และ 'Coke / Soda'"
          },
          {
            text: "No sides only drink 5 liters.",
            isCorrect: false,
            feedback: "ในเซ็ตคอมโบมีเครื่องเคียงรวมอยู่แล้ว สามารถเลือก fries หรือ salad ได้"
          }
        ],
        vocab: [
          { word: "French fries", meaning: "มันฝรั่งทอด (เฟรนช์ฟรายส์)" },
          { word: "Onion rings", meaning: "หอมทอด" },
          { word: "Coke Zero / Diet Coke", meaning: "โค้กไม่มีน้ำตาล" }
        ]
      },
      {
        id: 3,
        npcText: "Would you like to upsize that to a large meal for only 50 cents extra, and what dipping sauce for your fries?",
        npcVoiceText: "Would you like to upsize that to a large meal for only 50 cents extra, and what dipping sauce for your fries?",
        contextTh: "พนักงานถามว่าจะอัปไซซ์เป็นขนาดใหญ่ไหมเพิ่มเงินนิดหน่อย และรับซอสจิ้มอะไร (ไม่อัปไซซ์ ขนาดปกติ และขอซอสบาร์บีคิวกับซอสมะเขือเทศ)",
        hint: "ตอบว่า 'Regular size is fine, and can I get barbecue sauce and extra ketchup?'",
        targetPhrases: [
          "Regular size is fine, with BBQ sauce and ketchup please.",
          "No thanks, regular size and barbecue sauce please.",
          "Keep it regular, and barbecue sauce please.",
          "No upsize, just barbecue sauce please."
        ],
        options: [
          {
            text: "Regular size is fine, and barbecue sauce with extra ketchup, please.",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! ปฏิเสธอัปไซซ์อย่างสุภาพด้วย 'Regular size is fine' และระบุซอสที่ต้องการได้อย่างแม่นยำ"
          },
          {
            text: "Make it giant like elephant mountain.",
            isCorrect: false,
            feedback: "หากต้องการอัปไซซ์ ให้ตอบว่า 'Yes please, make it a large size.'"
          },
          {
            text: "I drink sauce directly.",
            isCorrect: false,
            feedback: "ซอสมีไว้สำหรับจิ้มกับเฟรนช์ฟรายส์หรือเบอร์เกอร์นะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "Upsize", meaning: "เพิ่มขนาด (อาหาร/เครื่องดื่ม)" },
          { word: "Regular size", meaning: "ขนาดปกติทั่วไป" },
          { word: "Ketchup / BBQ sauce", meaning: "ซอสมะเขือเทศ / ซอสบาร์บีคิว" }
        ]
      },
      {
        id: 4,
        npcText: "Got everything! Will that be for here or to go?",
        npcVoiceText: "Got everything! Will that be for here or to go?",
        contextTh: "พนักงานทวนออเดอร์เสร็จแล้ว ถามว่าจะทานที่นี่หรือนำกลับบ้าน (จะนำกลับบ้าน)",
        hint: "ตอบสั้นๆ และสุภาพ: 'To go, please.' หรือ 'Takeaway, please.'",
        targetPhrases: [
          "To go, please.",
          "Takeaway, please.",
          "I will take it to go, thank you.",
          "To go, thanks."
        ],
        options: [
          {
            text: "To go, please. Thank you!",
            isCorrect: true,
            feedback: "ถูกต้องและกระชับ! คำว่า 'To go' ในร้านอาหารฟาสต์ฟู้ดหมายถึงการสั่งใส่ถุงกลับบ้าน"
          },
          {
            text: "I run away with burger bag.",
            isCorrect: false,
            feedback: "ใช้คำว่า 'To go' จะเข้าใจตรงกันทั่วโลก"
          },
          {
            text: "Eat inside car right now.",
            isCorrect: false,
            feedback: "หากนำไปทานบนรถก็ถือเป็นการสั่งแบบ 'To go'"
          }
        ],
        vocab: [
          { word: "To go", meaning: "สั่งกลับบ้าน (ใช้ในอเมริกา)" },
          { word: "Takeaway", meaning: "สั่งกลับบ้าน (ใช้ในอังกฤษและออสเตรเลีย)" },
          { word: "For here / Eat in", meaning: "ทานในร้าน" }
        ]
      }
    ]
  },
  {
    id: "lost_and_found",
    stageNumber: 9,
    packNumber: 1,
    packId: "pack_daily",
    title: "Police Lost & Found",
    titleTh: "แจ้งของหายที่สถานีตำรวจ (การอธิบายลักษณะสิ่งของ)",
    category: "Emergency & Help",
    icon: "🎒",
    difficulty: "Intermediate",
    cefrLevel: "B1",
    cefrCanDo: "Can report lost property, provide precise physical descriptions, and complete formal inquiry documentation.",
    canDoSummary: "แจ้งของหายกับเจ้าหน้าที่ตำรวจ ให้รายละเอียดลักษณะสิ่งของ และกรอกข้อมูลติดตามของได้อย่างเป็นระบบ",
    toeicBand: "TOEIC 550 - 750 (Intermediate)",
    rewardExp: 80,
    rewardCoins: 50,
    npcName: "Officer Barker",
    npcAvatar: "🐕‍🦺",
    bgTheme: "theme-police",
    description: "ฝึกแจ้งความของหาย อธิบายสี ยี่ห้อ ขนาด สิ่งของที่อยู่ด้านใน และสถานที่ที่ทำตกหาย",
    dialogues: [
      {
        id: 1,
        npcText: "Hello there. Take a deep breath, how can I help you today?",
        npcVoiceText: "Hello there. Take a deep breath, how can I help you today?",
        contextTh: "คุณตำรวจบอกให้ใจเย็นๆ และถามว่ามีเรื่องอะไรให้ช่วย (คุณทำกระเป๋าเป้หาย และต้องการแจ้งความของหาย)",
        hint: "ใช้ประโยค 'I think I lost my backpack. I'd like to file a lost property report.'",
        targetPhrases: [
          "I lost my backpack, and I'd like to report it.",
          "I think I lost my backpack somewhere nearby.",
          "Could you help me? I lost my bag today.",
          "I want to report a lost backpack, please."
        ],
        options: [
          {
            text: "I lost my backpack, and I'd like to file a lost property report, please.",
            isCorrect: true,
            feedback: "มืออาชีพมาก! 'File a lost property report' หมายถึงการแจ้งความเรื่องทรัพย์สินสูญหายอย่างเป็นทางการ"
          },
          {
            text: "Bag vanished magic ghost took it.",
            isCorrect: false,
            feedback: "ควรแจ้งข้อมูลที่เป็นรูปธรรมเพื่อให้ตำรวจช่วยค้นหาได้ถูกจุด"
          },
          {
            text: "Buy me new bag now.",
            isCorrect: false,
            feedback: "ตำรวจมีหน้าที่ช่วยติดตามสิ่งของและลงบันทึกประจำวัน"
          }
        ],
        vocab: [
          { word: "Lost property report", meaning: "การแจ้งความทรัพย์สินสูญหาย" },
          { word: "Backpack", meaning: "กระเป๋าเป้สะพายหลัง" },
          { word: "File a report", meaning: "ลงบันทึกประจำวัน / แจ้งความ" }
        ]
      },
      {
        id: 2,
        npcText: "Can you describe what the backpack looks like, and what was inside it?",
        npcVoiceText: "Can you describe what the backpack looks like, and what was inside it?",
        contextTh: "ตำรวจถามลักษณะกระเป๋าและสิ่งของข้างใน (เป้สีดำ ยี่ห้อ Anello ข้างในมีสมุดโน้ต กระเป๋าสตางค์ และหูฟัง)",
        hint: "อธิบายสี ยี่ห้อ และสิ่งของ: 'It's a black backpack with a notebook, my wallet, and headphones inside.'",
        targetPhrases: [
          "It's a black backpack with my wallet and headphones inside.",
          "It is a black bag containing my wallet, notebook, and headphones.",
          "A medium black backpack with my wallet inside.",
          "It's black, with my wallet and notebook."
        ],
        options: [
          {
            text: "It's a medium black backpack with my wallet, a notebook, and headphones inside.",
            isCorrect: true,
            feedback: "ระบุข้อมูลได้ละเอียดมาก! ทั้งขนาด สี และสิ่งของสำคัญข้างใน ช่วยให้เจ้าหน้าที่ระบุตัวกระเป๋าได้ถูกต้อง"
          },
          {
            text: "It looks like normal bag with stuff.",
            isCorrect: false,
            feedback: "ข้อมูลกว้างเกินไป ควรระบุสี เช่น black, navy blue และของข้างใน"
          },
          {
            text: "Secret bag full of diamonds.",
            isCorrect: false,
            feedback: "ควรบอกความจริงเพื่อความปลอดภัยและการติดตามของที่ถูกต้อง"
          }
        ],
        vocab: [
          { word: "Describe", meaning: "บรรยายลักษณะ" },
          { word: "Wallet", meaning: "กระเป๋าสตางค์" },
          { word: "Headphones", meaning: "หูฟัง" }
        ]
      },
      {
        id: 3,
        npcText: "Where and approximately what time did you last see it?",
        npcVoiceText: "Where and approximately what time did you last see it?",
        contextTh: "ตำรวจถามว่าเห็นกระเป๋าครั้งสุดท้ายที่ไหนและประมาณกี่โมง (ลืมไว้ที่ม้านั่งในสวนสาธารณะ เมื่อประมาณ 1 ชั่วโมงที่แล้ว)",
        hint: "บอกสถานที่และเวลา: 'I last saw it on a park bench about an hour ago.'",
        targetPhrases: [
          "On a bench at Sunny Park about an hour ago.",
          "I left it on a park bench about an hour ago.",
          "At the park around an hour ago.",
          "About an hour ago at the sunny park."
        ],
        options: [
          {
            text: "I think I left it on a bench in Sunny Park about an hour ago.",
            isCorrect: true,
            feedback: "ชัดเจนมาก! ระบุทั้งสถานที่ (Sunny Park bench) และเวลา (about an hour ago) ทำให้ตำรวจส่งสายตรวจไปดูได้ทันท่วงที"
          },
          {
            text: "Somewhere on planet Earth yesterday or tomorrow.",
            isCorrect: false,
            feedback: "เวลาและสถานที่ไม่ชัดเจน เจ้าหน้าที่จะไม่สามารถค้นหาให้ได้"
          },
          {
            text: "I left it in my dream.",
            isCorrect: false,
            feedback: "ควรระบุสถานที่จริงในชีวิตประจำวันนะเจ้าเหมียว!"
          }
        ],
        vocab: [
          { word: "Approximately", meaning: "โดยประมาณ" },
          { word: "Park bench", meaning: "ม้านั่งในสวนสาธารณะ" },
          { word: "About an hour ago", meaning: "ประมาณหนึ่งชั่วโมงที่แล้ว" }
        ]
      },
      {
        id: 4,
        npcText: "Good news! A park cleaner just turned in a black backpack matching that description. Can you confirm your ID to claim it?",
        npcVoiceText: "Good news! A park cleaner just turned in a black backpack matching that description. Can you confirm your ID to claim it?",
        contextTh: "ตำรวจแจ้งข่าวดีว่ามีเจ้าหน้าที่ทำความสะอาดนำเป้สีดำมาส่ง ขอดูบัตรประชาชน/พาสปอร์ตเพื่อยืนยันตัวตนรับของคืน",
        hint: "แสดงความดีใจและยื่นบัตรยืนยัน: 'That's wonderful! Here is my ID card, thank you so much!'",
        targetPhrases: [
          "That's such a relief! Here is my ID card, thank you so much!",
          "Thank goodness! Here is my ID, thank you officer!",
          "That's great news! Here is my ID card.",
          "Thank you so much! Here is my passport."
        ],
        options: [
          {
            text: "That's such a relief! Here is my ID card to confirm. Thank you so much, officer!",
            isCorrect: true,
            feedback: "เยี่ยมยอด! 'What a relief' หรือ 'That's such a relief' แปลว่า 'โล่งอกจังเลย' เป็นการแสดงความรู้สึกที่เป็นธรรมชาติมาก"
          },
          {
            text: "Give me bag now no ID.",
            isCorrect: false,
            feedback: "เพื่อความปลอดภัย เจ้าหน้าที่ต้องตรวจยืนยันตัวตนก่อนส่งมอบทรัพย์สินคืนเสมอ"
          },
          {
            text: "I want money reward for losing bag.",
            isCorrect: false,
            feedback: "การทำของหายไม่มีเงินรางวัลให้นะเจ้าเหมียว ได้ของคืนถือว่าโชคดีมากแล้ว!"
          }
        ],
        vocab: [
          { word: "What a relief!", meaning: "โล่งอกไปที! / ค่อยยังชั่วหน่อย" },
          { word: "Turned in", meaning: "นำของที่เก็บได้มาส่งมอบ" },
          { word: "Claim", meaning: "ขอรับคืน / แสดงสิทธิ์รับสิ่งของ" }
        ]
      }
    ]
  },
  {
    id: "movie_theater",
    stageNumber: 10,
    packNumber: 1,
    packId: "pack_daily",
    title: "CineMeow Theater",
    titleTh: "โรงภาพยนตร์ซีนีเหมียว (การจองตั๋วหนัง & เลือกที่นั่ง)",
    category: "Entertainment",
    icon: "🍿",
    difficulty: "Beginner",
    cefrLevel: "A2",
    cefrCanDo: "Can purchase entertainment tickets, select seating preferences, and make inquiries about showtimes and snacks.",
    canDoSummary: "จองตั๋วภาพยนตร์ เลือกโซนที่นั่ง และสั่งป๊อปคอร์น/เครื่องดื่มได้อย่างคล่องแคล่ว",
    toeicBand: "TOEIC 250 - 450 (Elementary)",
    rewardExp: 65,
    rewardCoins: 45,
    npcName: "Ticket Master Mia",
    npcAvatar: "🐰",
    bgTheme: "theme-cinema",
    description: "ฝึกจองตั๋วภาพยนตร์ เลือกรอบฉาย เลือกตำแหน่งที่นั่ง และสั่งชุดป๊อปคอร์น",
    dialogues: [
      {
        id: 1,
        npcText: "Welcome to CineMeow! Which movie would you like to see today, and for how many people?",
        npcVoiceText: "Welcome to CineMeow! Which movie would you like to see today, and for how many people?",
        contextTh: "พนักงานต้อนรับและถามว่าต้องการชมภาพยนตร์เรื่องใดและกี่ที่นั่ง (ต้องการดูเรื่อง 'Cat Adventure' จำนวน 2 ที่นั่ง)",
        hint: "จองตั๋วหนัง: 'Two tickets for Cat Adventure, please.'",
        targetPhrases: [
          "Two tickets for Cat Adventure, please.",
          "I'd like two tickets for Cat Adventure, please.",
          "Could we get two tickets for Cat Adventure?",
          "Two tickets please for the cat movie."
        ],
        options: [
          {
            text: "Two tickets for 'Cat Adventure' at the next showing, please.",
            isCorrect: true,
            feedback: "เป๊ะมาก! 'Two tickets for [ชื่อหนัง]' พร้อมระบุรอบถัดไป (next showing) เป็นประโยคจองตั๋วที่ชัดเจนที่สุด"
          },
          {
            text: "Play funny video on giant wall.",
            isCorrect: false,
            feedback: "ควรระบุชื่อภาพยนตร์และจำนวนตั๋วที่ต้องการซื้อ"
          },
          {
            text: "One ticket for ten cats.",
            isCorrect: false,
            feedback: "ตั๋ว 1 ใบใช้สำหรับ 1 ที่นั่งนะเจ้าเหมียว"
          }
        ],
        vocab: [
          { word: "Tickets", meaning: "ตั๋วชมภาพยนตร์" },
          { word: "Showing / Showtime", meaning: "รอบฉายภาพยนตร์" },
          { word: "Screening", meaning: "การฉายหนัง" }
        ]
      },
      {
        id: 2,
        npcText: "The next showing is at 4:30 PM in Hall 3. Which seats do you prefer? Front, middle, or back row?",
        npcVoiceText: "The next showing is at 4:30 PM in Hall 3. Which seats do you prefer? Front, middle, or back row?",
        contextTh: "พนักงานแจ้งว่ารอบถัดไปคือ 16:30 น. โรง 3 และถามว่าอยากนั่งแถวหน้า กลาง หรือหลัง (ต้องการแถวกลาง ติดทางเดิน)",
        hint: "เลือกที่นั่ง: 'Middle row near the aisle, please.'",
        targetPhrases: [
          "Middle row, near the aisle please.",
          "In the middle row, aisle seats please.",
          "We'd prefer the middle row, please.",
          "Middle row aisle seats, please."
        ],
        options: [
          {
            text: "Middle row, near the aisle, please.",
            isCorrect: true,
            feedback: "ดีมาก! 'Middle row' (แถวกลาง) และ 'near the aisle' (ใกล้ทางเดิน) นั่งสบายและลุกเข้าออกสะดวกที่สุด"
          },
          {
            text: "I want seat on the ceiling.",
            isCorrect: false,
            feedback: "โรงหนังมีที่นั่งเฉพาะบนพื้นตามผังที่นั่งเท่านั้น"
          },
          {
            text: "Front row touch the screen.",
            isCorrect: false,
            feedback: "นั่งชิดจอเกินไปอาจทำให้ปวดคอและเมื่อยตาได้"
          }
        ],
        vocab: [
          { word: "Middle row", meaning: "แถวตอนกลาง" },
          { word: "Aisle seat", meaning: "ที่นั่งริมทางเดิน" },
          { word: "Back row", meaning: "แถวหลังสุด" }
        ]
      },
      {
        id: 3,
        npcText: "Got seats F12 and F13 for you! Would you like our popcorn and drink combo set today?",
        npcVoiceText: "Got seats F12 and F13 for you! Would you like our popcorn and drink combo set today?",
        contextTh: "พนักงานจองที่ F12 และ F13 ให้เรียบร้อย แล้วถามว่าจะรับเซ็ตป๊อปคอร์นกับเครื่องดื่มไหม (ต้องการป๊อปคอร์นรสคาราเมลเซ็ตใหญ่)",
        hint: "สั่งป๊อปคอร์น: 'Yes please, one large combo with caramel popcorn.'",
        targetPhrases: [
          "Yes please, a large popcorn combo with caramel flavor.",
          "One caramel popcorn combo set, please.",
          "Yes, large caramel popcorn and soda please.",
          "One large combo with caramel popcorn please."
        ],
        options: [
          {
            text: "Yes, please! One large combo set with caramel popcorn.",
            isCorrect: true,
            feedback: "ยอดเยี่ยมมาก! ระบุขนาด (large) และรสชาติ (caramel popcorn) ได้อย่างครบถ้วน"
          },
          {
            text: "Bring me roasted fish bones.",
            isCorrect: false,
            feedback: "ของทานเล่นมาตรฐานในโรงภาพยนตร์คือป๊อปคอร์นและน้ำอัดลม"
          },
          {
            text: "No I only eat movie tickets.",
            isCorrect: false,
            feedback: "อย่ากินตั๋วหนังนะเจ้าเหมียว! ตั๋วมีไว้สำหรับตรวจเข้าโรงภาพยนตร์"
          }
        ],
        vocab: [
          { word: "Popcorn combo", meaning: "ชุดป๊อปคอร์นคู่เครื่องดื่ม" },
          { word: "Caramel flavor", meaning: "รสคาราเมล" },
          { word: "Large set", meaning: "ชุดขนาดใหญ่" }
        ]
      },
      {
        id: 4,
        npcText: "Here are your tickets and snacks! Hall 3 is upstairs on the left. Enjoy the movie!",
        npcVoiceText: "Here are your tickets and snacks! Hall 3 is upstairs on the left. Enjoy the movie!",
        contextTh: "พนักงานมอบตั๋วและขนม พร้อมบอกว่าโรง 3 อยู่ชั้นบนทางซ้าย และอวยพรให้ดูหนังอย่างเพลิดเพลิน",
        hint: "กล่าวขอบคุณ: 'Thank you very much! Have a great day.'",
        targetPhrases: [
          "Thank you so much! Have a great day.",
          "Thanks a lot! Enjoy your day too.",
          "Thank you for your help!",
          "Thanks, have a good day!"
        ],
        options: [
          {
            text: "Thank you so much for your help! Have a great day.",
            isCorrect: true,
            feedback: "สุภาพและน่ารักมาก! พร้อมเดินเข้าโรงภาพยนตร์เพื่อสนุกกับหนังได้อย่างสบายใจ"
          },
          {
            text: "Don't tell me spoilers bye.",
            isCorrect: false,
            feedback: "พนักงานบอกทางเข้าโรงหนังอย่างสุภาพ ควรกล่าวขอบคุณแทน"
          },
          {
            text: "Cinema is too dark scare me.",
            isCorrect: false,
            feedback: "เมื่อหนังเริ่มฉายไฟจะหรี่ลงเพื่อให้ชมภาพยนตร์ได้ชัดเจน"
          }
        ],
        vocab: [
          { word: "Enjoy the movie!", meaning: "ขอให้สนุกกับการดูภาพยนตร์นะ" },
          { word: "Upstairs on the left", meaning: "ขึ้นบันไดไปทางซ้ายมือ" },
          { word: "Hall / Cinema room", meaning: "โรงฉายภาพยนตร์" }
        ]
      }
    ]
  },

  // ========================================================
  // PACK 2, 3, 4: EXPANDED PROGRESSIVE STAGES (11 - 40)
  // ========================================================
  {
    "id": "job_interview",
    "stageNumber": 11,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "The Dream Job Interview",
    "titleTh": "สัมภาษณ์งานภาษาอังกฤษ (Job Interview)",
    "category": "Career & Workplace",
    "icon": "💼",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can describe past work experience, strengths, and handle professional interview questions.",
    "canDoSummary": "แนะนำประวัติการทำงาน จุดแข็ง และตอบคำถามสัมภาษณ์งานภาษาอังกฤษอย่างมั่นใจ",
    "toeicBand": "TOEIC 550 - 650",
    "rewardExp": 100,
    "rewardCoins": 75,
    "npcName": "Victoria Vance (HR Director)",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เข้าสัมภาษณ์ตำแหน่งงานสำคัญกับผู้อำนวยการฝ่ายบุคคล ตอบคำถามประวัติและเป้าหมายการทำงาน",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Good morning. Could you please introduce yourself and summarize your background?",
        "npcVoiceText": "Good morning. Could you please introduce yourself and summarize your background?",
        "contextTh": "ผู้สัมภาษณ์ขอให้คุณแนะนำตัวเองและสรุปประวัติการทำงาน",
        "hint": "โครงสร้าง: ประสบการณ์หลัก + ความเชี่ยวชาญ + สิ่งที่มุ่งมั่นส่งมอบ",
        "targetPhrases": [
          "Certainly. I bring over three years of experience in project coordination, specializing in digital workflows."
        ],
        "options": [
          {
            "text": "Certainly. I bring over three years of experience in project coordination, specializing in digital workflows.",
            "isCorrect": true,
            "feedback": "เปิดตัวได้อย่างมั่นใจ กระชับ และตรงประเด็นอาชีพชัดเจน"
          },
          {
            "text": "I was born in a small village and I love cats.",
            "isCorrect": false,
            "feedback": "ควรเน้นทักษะวิชาชีพและประสบการณ์ ไม่ใช่ประวัติส่วนตัวทั่วไป"
          },
          {
            "text": "Everything is written on my resume already.",
            "isCorrect": false,
            "feedback": "การตอบตัดบทถือว่าไม่สุภาพอย่างยิ่งในการสัมภาษณ์งาน"
          }
        ],
        "vocab": [
          {
            "word": "Project coordination",
            "meaning": "การประสานงานโครงการ"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "What would you consider your greatest professional strength in a team setting?",
        "npcVoiceText": "What would you consider your greatest professional strength in a team setting?",
        "contextTh": "ถามถึงจุดแข็งที่โดดเด่นที่สุดในการทำงานร่วมกับผู้อื่น",
        "hint": "ระบุจุดแข็งด้านการสื่อสารหรือการแก้ปัญหา พร้อมผลลัพธ์ที่เป็นรูปธรรม",
        "targetPhrases": [
          "My key strength is clear cross-functional communication and resolving project bottlenecks promptly."
        ],
        "options": [
          {
            "text": "My key strength is clear cross-functional communication and resolving project bottlenecks promptly.",
            "isCorrect": true,
            "feedback": "ใช้คำศัพท์ระดับ B1/B2 (cross-functional communication, bottlenecks) ได้เฉียบคม"
          },
          {
            "text": "I am simply smarter than all my coworkers.",
            "isCorrect": false,
            "feedback": "ดูหยิ่งยโสและไม่สามารถทำงานร่วมกับทีมได้"
          },
          {
            "text": "I don't have strengths, I just do what I'm told.",
            "isCorrect": false,
            "feedback": "สะท้อนความไม่มั่นใจและขาดความคิดริเริ่ม"
          }
        ],
        "vocab": [
          {
            "word": "Cross-functional",
            "meaning": "การทำงานข้ามสายงาน/ข้ามแผนก"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "How do you handle high-pressure deadlines when priorities change suddenly?",
        "npcVoiceText": "How do you handle high-pressure deadlines when priorities change suddenly?",
        "contextTh": "ถามถึงการรับมือกับความกดดันเมื่อลำดับความสำคัญเปลี่ยนกะทันหัน",
        "hint": "เน้นการจัดลำดับความสำคัญใหม่ (re-prioritize) และการประสานงานกับผู้เกี่ยวข้อง",
        "targetPhrases": [
          "I immediately re-prioritize critical deliverables and communicate realistic timelines with stakeholders."
        ],
        "options": [
          {
            "text": "I immediately re-prioritize critical deliverables and communicate realistic timelines with stakeholders.",
            "isCorrect": true,
            "feedback": "แสดงถึงทักษะการบริหารความเสี่ยงและการสื่อสารเชิงรุก"
          },
          {
            "text": "I panic and complain loudly to everyone.",
            "isCorrect": false,
            "feedback": "ขาดความสามารถในการควบคุมอารมณ์และแก้ปัญหา"
          },
          {
            "text": "I ignore the new priorities and stick to my old plan.",
            "isCorrect": false,
            "feedback": "ไม่ยืดหยุ่นและไม่สอดคล้องกับทิศทางขององค์กร"
          }
        ],
        "vocab": [
          {
            "word": "Re-prioritize deliverables",
            "meaning": "จัดลำดับความสำคัญของสิ่งที่ต้องส่งมอบใหม่"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Do you have any questions for us regarding the position or our strategic goals?",
        "npcVoiceText": "Do you have any questions for us regarding the position or our strategic goals?",
        "contextTh": "เปิดโอกาสให้คุณถามคำถามเกี่ยวกับบทบาทงานหรือทิศทางบริษัท",
        "hint": "ควรถามถึงตัวชี้วัดความสำเร็จ (success metrics) หรือโครงการสำคัญในระยะ 6 เดือน",
        "targetPhrases": [
          "Could you share more about the primary success metrics for this role over the next six months?"
        ],
        "options": [
          {
            "text": "Could you share more about the primary success metrics for this role over the next six months?",
            "isCorrect": true,
            "feedback": "คำถามเชิงกลยุทธ์ที่สร้างความประทับใจให้ผู้บริหารอย่างยิ่ง"
          },
          {
            "text": "How much vacation can I take in my first month?",
            "isCorrect": false,
            "feedback": "ไม่ควรถามเรื่องการลาพักร้อนในรอบแรกของการสัมภาษณ์"
          },
          {
            "text": "No questions, can I go now?",
            "isCorrect": false,
            "feedback": "ดูไม่ใส่ใจและขาดความกระตือรือร้น"
          }
        ],
        "vocab": [
          {
            "word": "Success metrics",
            "meaning": "ตัวชี้วัดความสำเร็จ"
          }
        ]
      }
    ]
  },
  {
    "id": "office_onboarding",
    "stageNumber": 12,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "First Day Onboarding",
    "titleTh": "แนะนำตัววันแรกกับทีมงาน (Office Onboarding)",
    "category": "Career & Workplace",
    "icon": "👋",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can introduce oneself in an office environment, explain job role, and ask polite questions about workplace routines.",
    "canDoSummary": "แนะนำตัวกับเพื่อนร่วมงานใหม่ อธิบายขอบเขตงาน และสอบถามระเบียบการทำงานในออฟฟิศอย่างสุภาพ",
    "toeicBand": "TOEIC 550 - 650",
    "rewardExp": 100,
    "rewardCoins": 75,
    "npcName": "Senior Whiskers (Team Lead)",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "เริ่มต้นวันแรกในที่ทำงาน แนะนำตัวกับหัวหน้าทีมและเพื่อนร่วมงาน เรียนรู้เครื่องมือการทำงานและวัฒนธรรมทีม",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Welcome to the team! How are you settling in this morning?",
        "npcVoiceText": "Welcome to the team! How are you settling in this morning?",
        "contextTh": "หัวหน้าทีมกล่าวต้อนรับและถามว่าการเริ่มงานช่วงเช้าเป็นอย่างไรบ้าง",
        "hint": "กล่าวขอบคุณ แสดงความกระตือรือร้น และรายงานการตั้งค่าโต๊ะทำงาน",
        "targetPhrases": [
          "Thank you so much! Everyone has been very welcoming, and my workstation is ready."
        ],
        "options": [
          {
            "text": "Thank you so much! Everyone has been very welcoming, and my workstation is ready.",
            "isCorrect": true,
            "feedback": "สุภาพ เป็นมิตร และแสดงถึงความพร้อมในการทำงาน"
          },
          {
            "text": "The coffee is bad and the room is freezing cold.",
            "isCorrect": false,
            "feedback": "การบ่นตั้งแต่วันแรกสร้างภาพลักษณ์แง่ลบ"
          },
          {
            "text": "I want to go home already.",
            "isCorrect": false,
            "feedback": "ขาดความอดทนและความมุ่งมั่น"
          }
        ],
        "vocab": [
          {
            "word": "Workstation",
            "meaning": "โต๊ะและอุปกรณ์คอมพิวเตอร์ทำงาน"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "Great. We use Slack for daily communication. Could you say hello on the team channel?",
        "npcVoiceText": "Great. We use Slack for daily communication. Could you say hello on the team channel?",
        "contextTh": "หัวหน้าทีมให้ทักทายทีมงานในช่องแชต Slack",
        "hint": "ทักทายอย่างเป็นมิตร แนะนำตำแหน่ง และกล่าวถึงความตื่นเต้นที่จะได้ร่วมงาน",
        "targetPhrases": [
          "Hi everyone! Thrilled to join as the new specialist. Looking forward to collaborating with you all!"
        ],
        "options": [
          {
            "text": "Hi everyone! Thrilled to join as the new specialist. Looking forward to collaborating with you all!",
            "isCorrect": true,
            "feedback": "สมบูรณ์แบบ! แสดงมิตรภาพและความเป็นมืออาชีพ"
          },
          {
            "text": "I am here, don't ping me unless it is an emergency.",
            "isCorrect": false,
            "feedback": "สร้างกำแพงกั้นเพื่อนร่วมงาน"
          },
          {
            "text": "Hello, pay me my money soon.",
            "isCorrect": false,
            "feedback": "หยาบคายและไม่เหมาะสม"
          }
        ],
        "vocab": [
          {
            "word": "Collaborate",
            "meaning": "ร่วมมือทำงานร่วมกัน"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "Our daily standup is at 10 AM. Do you have access to our Jira board and Drive folders?",
        "npcVoiceText": "Our daily standup is at 10 AM. Do you have access to our Jira board and Drive folders?",
        "contextTh": "แจ้งเวลานัดประชุม 10 โมง และถามถึงสิทธิ์การเข้าถึง Jira และ Drive",
        "hint": "แจ้งสิ่งที่เข้าได้ และสิ่งที่ยังต้องการการอนุมัติสิทธิ์อย่างชัดเจน",
        "targetPhrases": [
          "I have Drive access, but I haven't received the Jira invite yet. Could you grant access when convenient?"
        ],
        "options": [
          {
            "text": "I have Drive access, but I haven't received the Jira invite yet. Could you grant access when convenient?",
            "isCorrect": true,
            "feedback": "แจ้งข้อมูลครบถ้วน และลงท้ายด้วย 'when convenient' อย่างสุภาพ"
          },
          {
            "text": "I have no idea what Jira is, don't ask me.",
            "isCorrect": false,
            "feedback": "ไม่กระตือรือร้นในการเรียนรู้ระบบของบริษัท"
          },
          {
            "text": "Everything is broken, as usual.",
            "isCorrect": false,
            "feedback": "มองโลกในแง่ร้ายเกินจริง"
          }
        ],
        "vocab": [
          {
            "word": "Grant access",
            "meaning": "อนุมัติสิทธิ์การเข้าถึง"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Done! The invite is sent. Let's grab lunch with the team at noon to celebrate your first day!",
        "npcVoiceText": "Done! The invite is sent. Let's grab lunch with the team at noon to celebrate your first day!",
        "contextTh": "หัวหน้าส่งคำเชิญให้แล้ว และชวนไปรับประทานอาหารกลางวันกับทีม",
        "hint": "ตอบรับคำชวนด้วยความยินดี ขอบคุณสำหรับมิตรภาพ",
        "targetPhrases": [
          "That sounds wonderful, thank you! I'd love to join everyone and learn more about the projects."
        ],
        "options": [
          {
            "text": "That sounds wonderful, thank you! I'd love to join everyone and learn more about the projects.",
            "isCorrect": true,
            "feedback": "สร้างสายสัมพันธ์เชิงบวก (Rapport) ได้อย่างยอดเยี่ยม"
          },
          {
            "text": "No, I brought my own food and I prefer to eat alone.",
            "isCorrect": false,
            "feedback": "ตัดโอกาสการสร้างความสัมพันธ์วันแรก"
          },
          {
            "text": "Is the lunch paid by the company?",
            "isCorrect": false,
            "feedback": "ถามเรื่องเงินทันทีอาจดูเสียมารยาท"
          }
        ],
        "vocab": [
          {
            "word": "Grab lunch",
            "meaning": "ไปทานอาหารกลางวันด้วยกัน"
          }
        ]
      }
    ]
  },
  {
    "id": "team_standup",
    "stageNumber": 13,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Daily Agile Standup Meeting",
    "titleTh": "ประชุมอัปเดตงานประจำวัน (Daily Standup)",
    "category": "Career & Workplace",
    "icon": "📊",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can report task progress, announce next steps, and flag bottlenecks concisely in a team sync.",
    "canDoSummary": "รายงานความคืบหน้าของงาน สิ่งที่กำลังจะทำ และแจ้งปัญหาติดขัด (Blockers) ได้อย่างกระชับตรงประเด็น",
    "toeicBand": "TOEIC 580 - 680",
    "rewardExp": 110,
    "rewardCoins": 80,
    "npcName": "Scrum Master Felix",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "เข้าร่วมประชุม Agile Standup ประจำเช้า สรุปงานที่เสร็จ แผนงานวันนี้ และแจ้งปัญหาติดขัด",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Morning team! Mimi, what did you accomplish yesterday?",
        "npcVoiceText": "Morning team! Mimi, what did you accomplish yesterday?",
        "contextTh": "Scrum Master ขอให้อัปเดตงานที่ทำเสร็จเมื่อวาน",
        "hint": "ใช้ Past Tense สรุปสิ่งที่เสร็จอย่างกระชับ เช่น 'Yesterday I finalized...'",
        "targetPhrases": [
          "Yesterday I finalized the client onboarding workflow and audited the user data schema."
        ],
        "options": [
          {
            "text": "Yesterday I finalized the client onboarding workflow and audited the user data schema.",
            "isCorrect": true,
            "feedback": "สั้น กระชับ ตรงหลักการ Agile Standup สากล"
          },
          {
            "text": "Yesterday I watched funny cat videos all afternoon.",
            "isCorrect": false,
            "feedback": "ไม่ควรพูดเล่นในที่ประชุมอย่างเป็นทางการ"
          },
          {
            "text": "I don't remember what I did.",
            "isCorrect": false,
            "feedback": "สะท้อนความไม่รับผิดชอบต่องาน"
          }
        ],
        "vocab": [
          {
            "word": "Finalized",
            "meaning": "สรุปผลเสร็จสมบูรณ์"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "Excellent. And what is your core focus for today?",
        "npcVoiceText": "Excellent. And what is your core focus for today?",
        "contextTh": "ถามถึงงานหลักที่จะโฟกัสทำในวันนี้",
        "hint": "ระบุเป้าหมายที่เป็นรูปธรรม เช่น 'Today I am conducting tests...'",
        "targetPhrases": [
          "Today I am running automated QA tests and drafting the deployment documentation."
        ],
        "options": [
          {
            "text": "Today I am running automated QA tests and drafting the deployment documentation.",
            "isCorrect": true,
            "feedback": "แผนงานชัดเจน มีผลลัพธ์วัดผลได้"
          },
          {
            "text": "I will just chill and answer a few emails.",
            "isCorrect": false,
            "feedback": "ขาดความมุ่งมั่นในการส่งมอบงาน"
          },
          {
            "text": "Nothing, I have no work assigned.",
            "isCorrect": false,
            "feedback": "หากว่างควรถามหางานช่วยเหลือทีม"
          }
        ],
        "vocab": [
          {
            "word": "Automated QA tests",
            "meaning": "การทดสอบระบบควบคุมคุณภาพแบบอัตโนมัติ"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "Do you have any blockers that might risk our milestone deadline?",
        "npcVoiceText": "Do you have any blockers that might risk our milestone deadline?",
        "contextTh": "ถามว่ามีปัญหาติดขัด (Blockers) ที่อาจเสี่ยงต่อกำหนดเวลาหรือไม่",
        "hint": "แจ้งอุปสรรคและผลกระทบอย่างตรงไปตรงมา",
        "targetPhrases": [
          "I am waiting on API credentials from the security team, which might delay the test run if not received by 2 PM."
        ],
        "options": [
          {
            "text": "I am waiting on API credentials from the security team, which might delay the test run if not received by 2 PM.",
            "isCorrect": true,
            "feedback": "ระบุปัญหาชัดเจนและระบุกรอบเวลาที่จำเป็น"
          },
          {
            "text": "Everything is on fire and the project is doomed.",
            "isCorrect": false,
            "feedback": "สร้างความตื่นตระหนกโดยไร้แผนแก้ไข"
          },
          {
            "text": "No blockers ever, I can do everything instantly.",
            "isCorrect": false,
            "feedback": "ปิดบังปัญหาจะทำให้ทีมช่วยไม่ทัน"
          }
        ],
        "vocab": [
          {
            "word": "Blocker",
            "meaning": "อุปสรรคที่ขัดขวางไม่ให้งานเดินหน้า"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Understood. I will escalate the credentials request right now. Thanks for flagging it!",
        "npcVoiceText": "Understood. I will escalate the credentials request right now. Thanks for flagging it!",
        "contextTh": "Scrum Master รับจะช่วยเร่งเรื่องขอรหัสผ่านให้",
        "hint": "ขอบคุณความช่วยเหลือและส่งต่อคิวให้คนถัดไป",
        "targetPhrases": [
          "Much appreciated Felix! Passing the mic over to Sarah for her updates."
        ],
        "options": [
          {
            "text": "Much appreciated Felix! Passing the mic over to Sarah for her updates.",
            "isCorrect": true,
            "feedback": "มีมารยาทในการประชุมและส่งต่อคิวอย่างมืออาชีพ"
          },
          {
            "text": "Make sure you do it fast, you are always slow.",
            "isCorrect": false,
            "feedback": "ต่อว่าเพื่อนร่วมงานอย่างไร้มารยาท"
          },
          {
            "text": "Whatever.",
            "isCorrect": false,
            "feedback": "แสดงความไม่ใส่ใจ"
          }
        ],
        "vocab": [
          {
            "word": "Escalate",
            "meaning": "ส่งเรื่องต่อให้ผู้มีอำนาจเพื่อเร่งรัด"
          }
        ]
      }
    ]
  },
  {
    "id": "email_request",
    "stageNumber": 14,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Professional Email Inquiries",
    "titleTh": "เขียนและตอบอีเมลติดต่องาน (Business Email)",
    "category": "Career & Workplace",
    "icon": "📨",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can compose polite business inquiries, request documentation, and confirm timelines via formal email.",
    "canDoSummary": "สอบถามข้อมูลงาน ร้องขอเอกสารสำคัญ และยืนยันกำหนดเวลาผ่านอีเมลธุรกิจได้อย่างสุภาพ",
    "toeicBand": "TOEIC 600 - 700",
    "rewardExp": 110,
    "rewardCoins": 80,
    "npcName": "Operations Officer Oliver",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "ติดต่อขอรับเอกสารสัญญาและรายงานงบประมาณจากฝ่ายปฏิบัติการ พร้อมกำหนดวันส่งมอบ",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Hi Mimi, how can our operations team assist your project today?",
        "npcVoiceText": "Hi Mimi, how can our operations team assist your project today?",
        "contextTh": "ฝ่ายปฏิบัติการถามว่าต้องการให้ช่วยเหลือเรื่องเอกสารอย่างไร",
        "hint": "ใช้ 'Could you kindly provide...' ระบุเอกสารและกำหนดเวลาที่ต้องการ",
        "targetPhrases": [
          "Could you kindly provide the updated vendor audit report for Q3 by this Thursday?"
        ],
        "options": [
          {
            "text": "Could you kindly provide the updated vendor audit report for Q3 by this Thursday?",
            "isCorrect": true,
            "feedback": "สุภาพ ชัดเจน และมีกำหนดเวลาส่งมอบที่แน่นอน"
          },
          {
            "text": "Send me all vendor files right now or else.",
            "isCorrect": false,
            "feedback": "ใช้น้ำเสียงข่มขู่ ไม่เหมาะสมกับการทำงาน"
          },
          {
            "text": "Give me something, I forgot the name.",
            "isCorrect": false,
            "feedback": "ขาดความชัดเจน"
          }
        ],
        "vocab": [
          {
            "word": "Could you kindly provide",
            "meaning": "รบกวนส่งมอบ... (สุภาพทางการ)"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "The vendor audit has sensitive pricing info. Do you have management sign-off?",
        "npcVoiceText": "The vendor audit has sensitive pricing info. Do you have management sign-off?",
        "contextTh": "ฝ่ายปฏิบัติการถามว่าได้รับการอนุมัติจากผู้บริหารสำหรับเอกสารลับแล้วหรือไม่",
        "hint": "ยืนยันว่ามีหนังสืออนุมัติและพร้อมส่งต่ออีเมลยืนยันให้ตรวจสอบ",
        "targetPhrases": [
          "Yes, I have written confirmation from Director Vance, which I will forward immediately."
        ],
        "options": [
          {
            "text": "Yes, I have written confirmation from Director Vance, which I will forward immediately.",
            "isCorrect": true,
            "feedback": "ปฏิบัติตามมาตรฐานความปลอดภัยของข้อมูลอย่างถูกต้อง"
          },
          {
            "text": "Why do you ask so many questions? Just send it.",
            "isCorrect": false,
            "feedback": "ละเมิดกฎเกณฑ์ความปลอดภัยขององค์กร"
          },
          {
            "text": "I don't have approval, but you should trust me.",
            "isCorrect": false,
            "feedback": "ไม่สามารถใช้ความรู้สึกส่วนตัวแทนระเบียบปฏิบัติได้"
          }
        ],
        "vocab": [
          {
            "word": "Written confirmation",
            "meaning": "หนังสือ/ข้อความยืนยันเป็นลายลักษณ์อักษร"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "Received the approval! Do you prefer the consolidated PDF or the raw spreadsheet?",
        "npcVoiceText": "Received the approval! Do you prefer the consolidated PDF or the raw spreadsheet?",
        "contextTh": "ฝ่ายปฏิบัติการได้รับเอกสารอนุมัติแล้ว และถามรูปแบบไฟล์ที่ต้องการ",
        "hint": "ขอทั้งสองรูปแบบหากจำเป็น พร้อมชี้แจงวัตถุประสงค์การใช้งาน",
        "targetPhrases": [
          "Both would be ideal—the consolidated PDF for the stakeholder briefing, and the spreadsheet for our data analysis."
        ],
        "options": [
          {
            "text": "Both would be ideal—the consolidated PDF for the stakeholder briefing, and the spreadsheet for our data analysis.",
            "isCorrect": true,
            "feedback": "ให้เหตุผลการใช้งานที่ชัดเจนสำหรับแต่ละรูปแบบไฟล์"
          },
          {
            "text": "I don't know the difference, pick one for me.",
            "isCorrect": false,
            "feedback": "ดูขาดความรู้ความเข้าใจในเนื้องาน"
          },
          {
            "text": "Don't send PDF, I hate PDF.",
            "isCorrect": false,
            "feedback": "ใส่อารมณ์ส่วนตัวในการทำงาน"
          }
        ],
        "vocab": [
          {
            "word": "Consolidated PDF",
            "meaning": "เอกสาร PDF ที่รวบรวมสรุปอย่างเป็นทางการ"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Understood. The zip archive has been sent to your inbox. Let me know if you need anything else!",
        "npcVoiceText": "Understood. The zip archive has been sent to your inbox. Let me know if you need anything else!",
        "contextTh": "ฝ่ายปฏิบัติการส่งไฟล์เข้าอีเมลเรียบร้อยแล้ว",
        "hint": "ขอบคุณสำหรับการตอบรับที่รวดเร็ว",
        "targetPhrases": [
          "Thank you so much for your prompt assistance, Oliver! Have a productive week."
        ],
        "options": [
          {
            "text": "Thank you so much for your prompt assistance, Oliver! Have a productive week.",
            "isCorrect": true,
            "feedback": "ประโยคปิดท้ายอีเมลที่สมบูรณ์แบบและสร้างความประทับใจ"
          },
          {
            "text": "About time! Don't be so slow next time.",
            "isCorrect": false,
            "feedback": "หยาบคายและทำลายความสัมพันธ์ในการทำงาน"
          },
          {
            "text": "Ok.",
            "isCorrect": false,
            "feedback": "สั้นและห้วนเกินไป"
          }
        ],
        "vocab": [
          {
            "word": "Prompt assistance",
            "meaning": "การช่วยเหลือที่รวดเร็วทันใจ"
          }
        ]
      }
    ]
  },
  {
    "id": "deadline_extension",
    "stageNumber": 15,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Project Deadline Negotiation",
    "titleTh": "เจรจาขอขยายเวลาส่งงาน (Deadline Negotiation)",
    "category": "Career & Workplace",
    "icon": "⏱️",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can explain valid reasons for project delay, propose realistic new milestones, and maintain professional accountability.",
    "canDoSummary": "ชี้แจงเหตุผลความล่าช้าของงานอย่างสมเหตุสมผล เสนอกำหนดส่งมอบใหม่ และรักษาความน่าเชื่อถือ",
    "toeicBand": "TOEIC 620 - 720",
    "rewardExp": 120,
    "rewardCoins": 85,
    "npcName": "Project Manager Pam",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "เจรจากับผู้จัดการโครงการเพื่อขอขยายกำหนดส่งมอบงาน ชี้แจงเหตุผลและเสนอแผนการแก้ไข",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Hi Mimi, our release is scheduled for Friday. How is the final testing proceeding?",
        "npcVoiceText": "Hi Mimi, our release is scheduled for Friday. How is the final testing proceeding?",
        "contextTh": "ผู้จัดการถามถึงความคืบหน้าการทดสอบระบบก่อนปล่อยงานวันศุกร์นี้",
        "hint": "รายงานความคืบหน้าตามจริงและแจ้งปัญหาสำคัญที่พบ",
        "targetPhrases": [
          "We have completed 85% of test scenarios, but we uncovered a critical payment gateway bug that requires remediation."
        ],
        "options": [
          {
            "text": "We have completed 85% of test scenarios, but we uncovered a critical payment gateway bug that requires remediation.",
            "isCorrect": true,
            "feedback": "รายงานตรงไปตรงมา พร้อมระบุปัญหาทางเทคนิคชัดเจน"
          },
          {
            "text": "Everything is 100% fine, totally finished.",
            "isCorrect": false,
            "feedback": "การปกปิดบั๊กจะทำให้ระบบพังเมื่อใช้งานจริง"
          },
          {
            "text": "The developers did a terrible job, blame them.",
            "isCorrect": false,
            "feedback": "การโยนความผิดให้คนอื่นสะท้อนวุฒิภาวะที่ต่ำ"
          }
        ],
        "vocab": [
          {
            "word": "Remediation",
            "meaning": "การแก้ไขข้อบกพร่อง"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "A payment bug? Will that jeopardize our Friday client release date?",
        "npcVoiceText": "A payment bug? Will that jeopardize our Friday client release date?",
        "contextTh": "ผู้จัดการกังวลว่าบั๊กการชำระเงินจะกระทบกำหนดปล่อยระบบวันศุกร์หรือไม่",
        "hint": "อธิบายความเสี่ยงและเสนอขอเลื่อนกำหนดการเพื่อความปลอดภัยของระบบ",
        "targetPhrases": [
          "To protect user transaction security, we strongly recommend a two-day postponement to conduct full regression testing."
        ],
        "options": [
          {
            "text": "To protect user transaction security, we strongly recommend a two-day postponement to conduct full regression testing.",
            "isCorrect": true,
            "feedback": "ยกเรื่องความปลอดภัยของลูกค้าและการทดสอบซ้ำเป็นเหตุผลหลัก"
          },
          {
            "text": "Just ship it anyway. If customers lose money, who cares?",
            "isCorrect": false,
            "feedback": "ขาดความรับผิดชอบอย่างร้ายแรงต่อลูกค้า"
          },
          {
            "text": "I don't know, it's not my problem.",
            "isCorrect": false,
            "feedback": "ละเลยหน้าที่ในการประเมินความเสี่ยง"
          }
        ],
        "vocab": [
          {
            "word": "Regression testing",
            "meaning": "การทดสอบระบบซ้ำเพื่อความเสถียร"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "Two days is acceptable if it guarantees stability. What is your concrete recovery plan?",
        "npcVoiceText": "Two days is acceptable if it guarantees stability. What is your concrete recovery plan?",
        "contextTh": "ผู้จัดการยอมรับการขยายเวลา 2 วัน และถามถึงแผนปฏิบัติการกู้คืนงาน",
        "hint": "แจกแจงขั้นตอนการแก้บั๊ก การทดสอบ และกำหนดส่งมอบใหม่ที่แน่นอน",
        "targetPhrases": [
          "The patch will be deployed by 4 PM today, followed by end-to-end testing tomorrow morning, finalizing launch on Tuesday."
        ],
        "options": [
          {
            "text": "The patch will be deployed by 4 PM today, followed by end-to-end testing tomorrow morning, finalizing launch on Tuesday.",
            "isCorrect": true,
            "feedback": "แผนงานชัดเจน มีกำหนดเวลาและขั้นตอนที่น่าเชื่อถือ"
          },
          {
            "text": "We will relax and sleep because we have extra days now.",
            "isCorrect": false,
            "feedback": "การขยายเวลามีไว้เพื่อแก้ปัญหา ไม่ใช่เพื่อพักผ่อน"
          },
          {
            "text": "We will just hope for the best without testing.",
            "isCorrect": false,
            "feedback": "ขาดมาตรฐานทางวิศวกรรม"
          }
        ],
        "vocab": [
          {
            "word": "End-to-end testing",
            "meaning": "การทดสอบระบบตั้งแต่ต้นจนจบกระบวนการ"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Thank you for the proactive escalation. I will communicate the revised schedule to stakeholders.",
        "npcVoiceText": "Thank you for the proactive escalation. I will communicate the revised schedule to stakeholders.",
        "contextTh": "ผู้จัดการขอบคุณที่แจ้งปัญหาล่วงหน้า และจะแจ้งผู้มีส่วนได้ส่วนเสียให้ทราบ",
        "hint": "ขอบคุณความยืดหยุ่นและสัญญาว่าจะอัปเดตความคืบหน้าอย่างต่อเนื่อง",
        "targetPhrases": [
          "Thank you so much for your flexibility and understanding, Pam. I will keep you posted throughout the day."
        ],
        "options": [
          {
            "text": "Thank you so much for your flexibility and understanding, Pam. I will keep you posted throughout the day.",
            "isCorrect": true,
            "feedback": "สร้างความไว้วางใจในการทำงานระดับมืออาชีพ"
          },
          {
            "text": "Good, finally you listened to me.",
            "isCorrect": false,
            "feedback": "พูดจาอวดดีและทำลายความสัมพันธ์"
          },
          {
            "text": "Whatever.",
            "isCorrect": false,
            "feedback": "ไร้มารยาท"
          }
        ],
        "vocab": [
          {
            "word": "Keep someone posted",
            "meaning": "คอยอัปเดตรายงานความคืบหน้าให้ทราบอย่างต่อเนื่อง"
          }
        ]
      }
    ]
  },
  {
    "id": "customer_complaint",
    "stageNumber": 16,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Handling Irate Customer",
    "titleTh": "รับมือข้อร้องเรียนลูกค้าอย่างมืออาชีพ (Customer Complaint)",
    "category": "Career & Workplace",
    "icon": "📱",
    "difficulty": "Intermediate",
    "cefrLevel": "B1",
    "cefrCanDo": "Can defuse customer frustration using empathetic phrasing, investigate service breakdowns, and propose fair remedies.",
    "canDoSummary": "ระงับอารมณ์ความไม่พอใจของลูกค้าด้วยคำพูดเห็นอกเห็นใจ ตรวจสอบปัญหา และเสนอแนวทางชดเชยที่ยุติธรรม",
    "toeicBand": "TOEIC 640 - 740",
    "rewardExp": 120,
    "rewardCoins": 85,
    "npcName": "Mr. Grumpy (VIP Client)",
    "npcAvatar": "😾",
    "bgTheme": "theme-office",
    "description": "รับสายลูกค้าระดับ VIP ที่ไม่พอใจเรื่องการจัดส่งล่าช้าและสินค้าเสียหาย เจรจาแก้ปัญหาและรักษาความสัมพันธ์ลูกค้า",
    "dialogues": [
      {
        "id": 1,
        "npcText": "This is unacceptable! My express order arrived two days late and the packaging was completely damaged! What are you going to do about this?!",
        "npcVoiceText": "This is unacceptable! My express order arrived two days late and the packaging was completely damaged! What are you going to do about this?!",
        "contextTh": "ลูกค้าโวยวายด้วยความโมโหที่พัสดุด่วนส่งช้าไปสองวันและกล่องพัสดุเสียหาย",
        "hint": "ใช้หลักการ Empathy: แสดงความเสียใจอย่างจริงใจ รับฟังโดยไม่แก้ตัว และขอข้อมูลตรวจสอบ",
        "targetPhrases": [
          "I sincerely apologize for the delay and damaged packaging, Mr. Grumpy. I completely understand your frustration and will resolve this immediately."
        ],
        "options": [
          {
            "text": "I sincerely apologize for the delay and damaged packaging, Mr. Grumpy. I completely understand your frustration and will resolve this immediately.",
            "isCorrect": true,
            "feedback": "ประโยคขอโทษที่ยอดเยี่ยม! แสดงความเข้าใจ (I understand your frustration) และให้คำมั่นว่าจะแก้ไข"
          },
          {
            "text": "Stop yelling at me! It's the delivery driver's fault, not mine!",
            "isCorrect": false,
            "feedback": "การเถียงและโยนความผิดให้ผู้อื่นจะทำให้ลูกค้าโกรธยิ่งขึ้น"
          },
          {
            "text": "Calm down, it's just a small package, don't be dramatic.",
            "isCorrect": false,
            "feedback": "ดูถูกความรู้สึกของลูกค้าอย่างรุนแรง"
          }
        ],
        "vocab": [
          {
            "word": "Sincerely apologize",
            "meaning": "ขออภัยอย่างจริงใจ"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "I needed these goods for a critical presentation this morning! Your apology doesn't fix my ruined event!",
        "npcVoiceText": "I needed these goods for a critical presentation this morning! Your apology doesn't fix my ruined event!",
        "contextTh": "ลูกค้าย้ำว่าสินค้าจำเป็นต้องใช้ในงานพรีเซนต์เช้านี้ และคำขอโทษไม่ช่วยแก้ปัญหา",
        "hint": "เสนอทางออกที่เป็นรูปธรรมทันที: การส่งของใหม่ทดแทนด่วนพิเศษ หรือการคืนเงินเต็มจำนวน",
        "targetPhrases": [
          "We deeply regret the disruption to your event. I can issue a full refund immediately and dispatch a complimentary replacement via courier."
        ],
        "options": [
          {
            "text": "We deeply regret the disruption to your event. I can issue a full refund immediately and dispatch a complimentary replacement via courier.",
            "isCorrect": true,
            "feedback": "ข้อเสนอชดเชยที่ยุติธรรมและเด็ดขาด (Full refund + complimentary replacement)"
          },
          {
            "text": "Well, you should have ordered earlier then.",
            "isCorrect": false,
            "feedback": "การซ้ำเติมลูกค้าเป็นสิ่งต้องห้ามในการบริการ"
          },
          {
            "text": "There's nothing I can do, company policy says no refunds.",
            "isCorrect": false,
            "feedback": "การอ้างนโยบายบริษัทอย่างไร้ความยืดหยุ่นทำลายแบรนด์"
          }
        ],
        "vocab": [
          {
            "word": "Full refund",
            "meaning": "การคืนเงินเต็มจำนวน"
          },
          {
            "word": "Complimentary replacement",
            "meaning": "สินค้าทดแทนฟรีโดยไม่คิดค่าใช้จ่าย"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "A full refund and replacement? How fast can the courier deliver the replacement goods to my office?",
        "npcVoiceText": "A full refund and replacement? How fast can the courier deliver the replacement goods to my office?",
        "contextTh": "ลูกค้าเริ่มใจเย็นลงและถามว่าแมสเซนเจอร์จะนำสินค้ามาส่งถึงออฟฟิศได้เร็วแค่ไหน",
        "hint": "ระบุเวลาที่แน่นอนและมีระบบติดตามพัสดุแบบเรียลไทม์",
        "targetPhrases": [
          "Our dedicated courier has already picked up the item and will arrive at your address within two hours. I will personally text you the live tracker."
        ],
        "options": [
          {
            "text": "Our dedicated courier has already picked up the item and will arrive at your address within two hours. I will personally text you the live tracker.",
            "isCorrect": true,
            "feedback": "ระบุเวลา 2 ชั่วโมงชัดเจน และสร้างความมั่นใจด้วยการส่งลิงก์ติดตามแบบส่วนตัว"
          },
          {
            "text": "Maybe sometime tomorrow, or next week if there is traffic.",
            "isCorrect": false,
            "feedback": "ไม่แน่นอนและทำให้ลูกค้ากังวลซ้ำสอง"
          },
          {
            "text": "Ask the courier yourself, here is their phone number.",
            "isCorrect": false,
            "feedback": "ผลักภาระให้ลูกค้า"
          }
        ],
        "vocab": [
          {
            "word": "Dedicated courier",
            "meaning": "พนักงานจัดส่งด่วนพิเศษเฉพาะกิจ"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Alright... I appreciate that you took ownership of this and acted quickly. Please ensure the tracker is sent.",
        "npcVoiceText": "Alright... I appreciate that you took ownership of this and acted quickly. Please ensure the tracker is sent.",
        "contextTh": "ลูกค้ายอมรับการแก้ปัญหา และชื่นชมที่คุณรับผิดชอบอย่างรวดเร็ว",
        "hint": "กล่าวขอบคุณความอดทนของลูกค้า และให้คำมั่นว่าจะปรับปรุงบริการ",
        "targetPhrases": [
          "Thank you very much for your patience and gracious understanding. The tracking link has just been sent to your mobile."
        ],
        "options": [
          {
            "text": "Thank you very much for your patience and gracious understanding. The tracking link has just been sent to your mobile.",
            "isCorrect": true,
            "feedback": "ปิดการสนทนาได้อย่างยอดเยี่ยม เปลี่ยนลูกค้าที่ไม่พอใจให้กลับมาประทับใจในบริการ"
          },
          {
            "text": "Finally, you stopped complaining. Bye.",
            "isCorrect": false,
            "feedback": "ทิ้งท้ายด้วยคำพูดแดกดัน"
          },
          {
            "text": "Don't call us again.",
            "isCorrect": false,
            "feedback": "ขับไล่ลูกค้าอย่างไม่น่าให้อภัย"
          }
        ],
        "vocab": [
          {
            "word": "Gracious understanding",
            "meaning": "ความเข้าใจอันเปี่ยมด้วยเมตตา"
          }
        ]
      }
    ]
  },
  {
    "id": "business_lunch",
    "stageNumber": 17,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Client Networking Lunch",
    "titleTh": "สนทนาธุรกิจบนโต๊ะอาหาร (Business Lunch)",
    "category": "Career & Workplace",
    "icon": "🍽️",
    "difficulty": "Upper-Intermediate",
    "cefrLevel": "B1+",
    "cefrCanDo": "Can maintain professional small talk over dining, transition smoothly into commercial topics, and display dining etiquette.",
    "canDoSummary": "สนทนาสร้างสัมพันธ์บนโต๊ะอาหารอย่างมีมารยาท สลับเข้าสู่หัวข้อธุรกิจอย่างแนบเนียน และรักษาภาพลักษณ์ที่ดี",
    "toeicBand": "TOEIC 660 - 750",
    "rewardExp": 130,
    "rewardCoins": 90,
    "npcName": "Partner Chloe (Alliance Group)",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-cafe",
    "description": "รับประทานอาหารกลางวันกับคู่ค้าคนสำคัญ พูดคุยสร้างความคุ้นเคย และหารือแนวทางความร่วมมือทางธุรกิจ",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Thank you for meeting me here, Mimi. The atmosphere at this bistro is lovely! Have you dined here before?",
        "npcVoiceText": "Thank you for meeting me here, Mimi. The atmosphere at this bistro is lovely! Have you dined here before?",
        "contextTh": "คู่ค้ากล่าวทักทายและชมบรรยากาศร้านอาหาร พร้อมถามว่าคุณเคยมาทานที่นี่มาก่อนหรือไม่",
        "hint": "ตอบรับอย่างอบอุ่น แสดงความคิดเห็นเชิงบวก และแนะนำเมนูเด่นของร้าน",
        "targetPhrases": [
          "It is a pleasure, Chloe! I come here occasionally—their smoked salmon risotto is exceptional if you enjoy seafood."
        ],
        "options": [
          {
            "text": "It is a pleasure, Chloe! I come here occasionally—their smoked salmon risotto is exceptional if you enjoy seafood.",
            "isCorrect": true,
            "feedback": "การทักทายอย่างมีรสนิยมและแนะนำเมนูอาหารแสดงความเป็นเจ้าภาพที่ดี"
          },
          {
            "text": "I only eat fast food, fancy places like this are boring.",
            "isCorrect": false,
            "feedback": "แสดงทัศนคติไม่ให้เกียรติสถานที่และคู่สนทนา"
          },
          {
            "text": "Let's skip lunch and sign the contract right now.",
            "isCorrect": false,
            "feedback": "ใจร้อนเกินไป มารยาทสากลควรสร้างสัมพันธ์ก่อนเข้าเรื่องงาน"
          }
        ],
        "vocab": [
          {
            "word": "Exceptional",
            "meaning": "ยอดเยี่ยมเป็นพิเศษ"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "That risotto sounds delicious, I will order that! How has business been on your side since the new quarter launched?",
        "npcVoiceText": "That risotto sounds delicious, I will order that! How has business been on your side since the new quarter launched?",
        "contextTh": "คู่ค้าสั่งอาหารตามที่คุณแนะนำ และเริ่มเปิดประเด็นถามถึงทิศทางธุรกิจในไตรมาสใหม่",
        "hint": "แบ่งปันความสำเร็จที่น่าสนใจของบริษัท และเชื่อมโยงไปสู่ความสนใจในธุรกิจของคู่ค้า",
        "targetPhrases": [
          "We have seen a 20% growth in digital engagement, and we are now exploring strategic synergies across enterprise clients."
        ],
        "options": [
          {
            "text": "We have seen a 20% growth in digital engagement, and we are now exploring strategic synergies across enterprise clients.",
            "isCorrect": true,
            "feedback": "แชร์ข้อมูลเชิงบวก (20% growth) และใช้คำว่า 'strategic synergies' ปูทางสู่การร่วมมือ"
          },
          {
            "text": "Our business is failing and our stock price crashed.",
            "isCorrect": false,
            "feedback": "เปิดเผยข้อมูลวิกฤตที่ทำลายความเชื่อมั่นของพันธมิตร"
          },
          {
            "text": "None of your business, eat your food.",
            "isCorrect": false,
            "feedback": "หยาบคายอย่างยิ่ง"
          }
        ],
        "vocab": [
          {
            "word": "Strategic synergies",
            "meaning": "การผนึกกำลังเชิงยุทธศาสตร์เพื่อผลประโยชน์ร่วม"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "That aligns well with our direction. We are actually searching for a reliable partner to handle automated analytics.",
        "npcVoiceText": "That aligns well with our direction. We are actually searching for a reliable partner to handle automated analytics.",
        "contextTh": "คู่ค้าเผยว่ากำลังมองหาพันธมิตรที่เชี่ยวชาญด้านการวิเคราะห์ข้อมูลอัตโนมัติ",
        "hint": "นำเสนอความเชี่ยวชาญของทีมคุณอย่างมั่นใจ และเสนอจัดนัดหมายพรีเซนต์เจาะลึก",
        "targetPhrases": [
          "That is precisely our core capability! We recently implemented a similar solution for a fintech leader with remarkable efficiency gains."
        ],
        "options": [
          {
            "text": "That is precisely our core capability! We recently implemented a similar solution for a fintech leader with remarkable efficiency gains.",
            "isCorrect": true,
            "feedback": "ดึงดูดความสนใจด้วยการยกตัวอย่างความสำเร็จจริง (case study) ที่น่าเชื่อถือ"
          },
          {
            "text": "We can do that, but only if you pay us double.",
            "isCorrect": false,
            "feedback": "ต่อรองเรื่องเงินผิดที่ผิดเวลา"
          },
          {
            "text": "Analytics is boring, let's talk about sports.",
            "isCorrect": false,
            "feedback": "พลาดโอกาสทองในการเจรจาธุรกิจ"
          }
        ],
        "vocab": [
          {
            "word": "Core capability",
            "meaning": "ขีดความสามารถหลักที่โดดเด่น"
          }
        ]
      },
      {
        "id": 4,
        "npcText": "Fascinating! Let's arrange a dedicated demonstration for our technical directors next Tuesday. I will cover the bill today!",
        "npcVoiceText": "Fascinating! Let's arrange a dedicated demonstration for our technical directors next Tuesday. I will cover the bill today!",
        "contextTh": "คู่ค้าตกลงนัดหมายพรีเซนต์งานในวันอังคารหน้า และเสนอเป็นผู้ดูแลค่าอาหารมื้อนี้",
        "hint": "ขอบคุณสำหรับมื้ออาหาร ยืนยันการนัดหมาย และกล่าวปิดท้ายอย่างประทับใจ",
        "targetPhrases": [
          "Thank you so much for your generous hospitality, Chloe! I will send over the meeting invite and briefing deck this afternoon."
        ],
        "options": [
          {
            "text": "Thank you so much for your generous hospitality, Chloe! I will send over the meeting invite and briefing deck this afternoon.",
            "isCorrect": true,
            "feedback": "มารยาทธุรกิจระดับผู้บริหาร ขอบคุณความมีน้ำใจ (hospitality) และยืนยันส่งเอกสารสรุป"
          },
          {
            "text": "Sure, pay the bill, you are richer than me anyway.",
            "isCorrect": false,
            "feedback": "พูดจาเหน็บแนมและขาดความสุภาพ"
          },
          {
            "text": "No, I don't want a meeting.",
            "isCorrect": false,
            "feedback": "ปฏิเสธโอกาสทางธุรกิจอย่างน่าเสียดาย"
          }
        ],
        "vocab": [
          {
            "word": "Generous hospitality",
            "meaning": "การต้อนรับและไมตรีจิตอันเอื้อเฟื้อ"
          }
        ]
      }
    ]
  },
  {
    "id": "remote_zoom_pitch",
    "stageNumber": 18,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Virtual Zoom Presentation",
    "titleTh": "พรีเซนต์งานผ่านวิดีโอคอล (Virtual Zoom Pitch)",
    "category": "Career & Workplace",
    "icon": "💻",
    "difficulty": "Upper-Intermediate",
    "cefrLevel": "B1+",
    "cefrCanDo": "Can lead a virtual presentation, handle technical audio/screen sharing protocols, and answer audience inquiries confidently.",
    "canDoSummary": "นำเสนอโครงการผ่านวิดีโอคอล จัดการระบบแชร์หน้าจอ และตอบคำถามผู้ฟังได้อย่างมั่นใจ",
    "toeicBand": "TOEIC 680 - 760",
    "rewardExp": 130,
    "rewardCoins": 90,
    "npcName": "Stakeholder Simon",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "นำเสนอแผนกลยุทธ์ผ่าน Zoom แก่คณะผู้ถือหุ้น ตรวจสอบภาพและเสียง บรรยายสไลด์ และตอบข้อซักถาม",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Good afternoon everyone. Mimi, whenever you are ready, please share your screen and begin your presentation.",
        "npcVoiceText": "Good afternoon everyone. Mimi, whenever you are ready, please share your screen and begin your presentation.",
        "contextTh": "ผู้ถือหุ้นให้สัญญาณเริ่มแชร์หน้าจอและเริ่มต้นการนำเสนอ",
        "hint": "ทักทายผู้เข้าร่วม ตรวจสอบว่าทุกคนเห็นหน้าจอและได้ยินเสียงชัดเจนหรือไม่",
        "targetPhrases": [
          "Good afternoon Simon and esteemed guests. Can everyone see my presentation slides and hear me clearly?"
        ],
        "options": [
          {
            "text": "Good afternoon Simon and esteemed guests. Can everyone see my presentation slides and hear me clearly?",
            "isCorrect": true,
            "feedback": "เปิดการนำเสนอตามธรรมเนียมสากล (Can everyone see my slides and hear clearly?)"
          },
          {
            "text": "Wait, I can't find the share button. Where is it?",
            "isCorrect": false,
            "feedback": "แสดงถึงความไม่พร้อมในการใช้เครื่องมือประชุม"
          },
          {
            "text": "I'm not ready, give me 20 more minutes.",
            "isCorrect": false,
            "feedback": "ทำให้ผู้เข้าร่วมประชุมเสียเวลา"
          }
        ],
        "vocab": [
          {
            "word": "Esteemed guests",
            "meaning": "แขกผู้มีเกียรติทุกท่าน"
          }
        ]
      },
      {
        "id": 2,
        "npcText": "Loud and clear! The slides are visible. Please walk us through your proposal.",
        "npcVoiceText": "Loud and clear! The slides are visible. Please walk us through your proposal.",
        "contextTh": "ผู้ฟังยืนยันว่าภาพและเสียงชัดเจน และขอให้เริ่มบรรยายข้อเสนอ",
        "hint": "เปิดด้วยวัตถุประสงค์หลัก สรุปปัญหา และแนวทางแก้ไขเชิงนวัตกรรม",
        "targetPhrases": [
          "Thank you. Today I will present our automated workflow solution, designed to reduce operational costs by 35% within six months."
        ],
        "options": [
          {
            "text": "Thank you. Today I will present our automated workflow solution, designed to reduce operational costs by 35% within six months.",
            "isCorrect": true,
            "feedback": "เปิดหัวสไลด์ด้วยตัวเลขผลประโยชน์ที่ชัดเจน (reduce costs by 35%) ดึงดูดความสนใจทันที"
          },
          {
            "text": "Here are 50 boring slides with lots of tiny text, read them yourself.",
            "isCorrect": false,
            "feedback": "ทัศนคติแย่มากและทำลายความสนใจของผู้ฟัง"
          },
          {
            "text": "I don't know what this project does, someone else made the slides.",
            "isCorrect": false,
            "feedback": "ยอมรับว่าไม่ได้เตรียมตัวมา"
          }
        ],
        "vocab": [
          {
            "word": "Operational costs",
            "meaning": "ต้นทุนการดำเนินงาน"
          }
        ]
      },
      {
        "id": 3,
        "npcText": "A 35% cost reduction is significant. However, what is the estimated timeline for implementation and training?",
        "npcVoiceText": "A 35% cost reduction is significant. However, what is the estimated timeline for implementation and training?",
        "contextTh": "ผู้ถือหุ้นสนใจตัวเลขลดต้นทุน 35% แต่ถามถึงกรอบเวลาในการติดตั้งระบบและฝึกอบรมทีม",
        "hint": "แจกแจงระยะเวลาเป็นระยะ (Phases) ที่สามารถส่งมอบงานได้จริง",
        "targetPhrases": [
          "We have structured a phased rollout: two weeks for system integration, followed by three weeks of comprehensive team training."
        ],
        "options": [
          {
            "text": "We have structured a phased rollout: two weeks for system integration, followed by three weeks of comprehensive team training.",
            "isCorrect": true,
            "feedback": "โครงสร้างชัดเจน (Phased rollout: 2 weeks integration, 3 weeks training)"
          },
          {
            "text": "It will take forever because our IT team is lazy.",
            "isCorrect": false,
            "feedback": "ต่อว่าทีมงานต่อหน้าผู้ถือหุ้น"
          },
          {
            "text": "Zero days, it works with magic.",
            "isCorrect": false,
            "feedback": "คำตอบที่ไม่สมจริงทำลายความน่าเชื่อถือ"
          }
        ],
        "vocab": [
          {
            "word": "Phased rollout",
            "meaning": "การทยอยเปิดใช้งานระบบเป็นระยะๆ"
          }
        ]
      }
    ]
  },
  {
    "id": "team_conflict",
    "stageNumber": 19,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Cross-Functional Conflict Resolution",
    "titleTh": "ไกล่เกลี่ยความเห็นต่างระหว่างแผนก (Conflict Resolution)",
    "category": "Career & Workplace",
    "icon": "🤝",
    "difficulty": "Upper-Intermediate",
    "cefrLevel": "B1+",
    "cefrCanDo": "Can mediate workplace disagreements diplomatically, find common ground, and agree on collaborative compromises.",
    "canDoSummary": "ไกล่เกลี่ยข้อขัดแย้งในการทำงานอย่างมีวาทศิลป์ ค้นหาจุดร่วม และตกลงแนวทางประนีประนอมที่เป็นประโยชน์ร่วมกัน",
    "toeicBand": "TOEIC 700 - 780",
    "rewardExp": 140,
    "rewardCoins": 95,
    "npcName": "Marketing Lead Maya",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "ประชุมไกล่เกลี่ยข้อขัดแย้งระหว่างทีมการตลาดและทีมพัฒนาซอฟต์แวร์เกี่ยวกับฟีเจอร์สินค้าและวันเปิดตัว",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mimi, marketing needs this feature launched by next week for our campaign! Engineering keeps pushing back and saying it is impossible!",
        "npcVoiceText": "Mimi, marketing needs this feature launched by next week for our campaign! Engineering keeps pushing back and saying it is impossible!",
        "contextTh": "หัวหน้าฝ่ายการตลาดบ่นว่าต้องการปล่อยฟีเจอร์สัปดาห์หน้าเพื่องานแคมเปญ แต่วิศวกรบอกว่าทำไม่ทัน",
        "hint": "รับฟังความกังวลของฝ่ายการตลาด แสดงความเข้าใจในความสำคัญของแคมเปญ และชวนดูข้อจำกัดด้านเทคนิค",
        "targetPhrases": [
          "I completely understand the urgency for the marketing campaign, Maya. Let's look at the engineering constraints together to find a viable middle ground."
        ],
        "options": [
          {
            "text": "I completely understand the urgency for the marketing campaign, Maya. Let's look at the engineering constraints together to find a viable middle ground.",
            "isCorrect": true,
            "feedback": "ประโยคไกล่เกลี่ยระดับ Master! รับฟังความสำคัญ (urgency) และชวนหาทางออกร่วมกัน (viable middle ground)"
          },
          {
            "text": "Engineering is right, you marketers never understand technical reality.",
            "isCorrect": false,
            "feedback": "เข้าข้างฝ่ายหนึ่งและดูถูกอีกฝ่าย จะทำให้ความขัดแย้งรุนแรงขึ้น"
          },
          {
            "text": "Not my problem, go fight somewhere else.",
            "isCorrect": false,
            "feedback": "ปัดความรับผิดชอบ"
          }
        ],
        "vocab": [
          {
            "word": "Viable middle ground",
            "meaning": "จุดกึ่งกลางที่สามารถทำได้จริงและทุกฝ่ายยอมรับ"
          }
        ]
      }
    ]
  },
  {
    "id": "performance_review",
    "stageNumber": 20,
    "packNumber": 2,
    "packId": "pack_workplace",
    "title": "Annual Performance Review",
    "titleTh": "ประเมินผลงานและขอปรับเลื่อนขั้น (Performance Review)",
    "category": "Career & Workplace",
    "icon": "📈",
    "difficulty": "Upper-Intermediate",
    "cefrLevel": "B1+",
    "cefrCanDo": "Can articulate career achievements with quantifiable impact, discuss growth areas, and advocate for advancement.",
    "canDoSummary": "สรุปผลงานความสำเร็จรายปีด้วยตัวเลขที่จับต้องได้ พูดคุยเรื่องจุดพัฒนา และเจรจาขอเลื่อนตำแหน่งอย่างมืออาชีพ",
    "toeicBand": "TOEIC 720 - 785",
    "rewardExp": 150,
    "rewardCoins": 100,
    "npcName": "VP Harrison",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เข้าพบรองประธานบริษัทเพื่อประเมินผลงานประจำปี สรุปผลงานที่เกินเป้าหมาย และขอรับการพิจารณาเลื่อนขั้น",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Welcome, Mimi. Let's review your past twelve months. What achievements are you most proud of?",
        "npcVoiceText": "Welcome, Mimi. Let's review your past twelve months. What achievements are you most proud of?",
        "contextTh": "รองประธานชวนทบทวนผลงาน 12 เดือนที่ผ่านมา และถามถึงความสำเร็จที่คุณภาคภูมิใจที่สุด",
        "hint": "สรุปผลงานที่มีผลลัพธ์วัดผลได้ (Quantifiable results) เช่น ยอดขาย ประสิทธิภาพ หรือการลดต้นทุน",
        "targetPhrases": [
          "Over the past year, I led the cross-functional automation initiative, which increased team output by 30% and saved 400 work hours."
        ],
        "options": [
          {
            "text": "Over the past year, I led the cross-functional automation initiative, which increased team output by 30% and saved 400 work hours.",
            "isCorrect": true,
            "feedback": "ตอบได้อย่างทรงพลัง! ใช้ตัวเลขวัดผลชัดเจน (increased output by 30%, saved 400 hours) แสดงมูลค่าที่สร้างให้บริษัท"
          },
          {
            "text": "I showed up to work almost every day and didn't break anything.",
            "isCorrect": false,
            "feedback": "แค่มาทำงานไม่ถือเป็นผลงานที่โดดเด่น"
          },
          {
            "text": "I deserve everything because I am the best.",
            "isCorrect": false,
            "feedback": "ขาดหลักฐานความสำเร็จเชิงประจักษ์"
          }
        ],
        "vocab": [
          {
            "word": "Quantifiable results",
            "meaning": "ผลลัพธ์ที่วัดผลเป็นตัวเลขได้"
          }
        ]
      }
    ]
  },
  {
    "id": "contract_bargaining",
    "stageNumber": 21,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Contract Term & SLA Bargaining",
    "titleTh": "เจรจาเงื่อนไขสัญญาธุรกิจและ SLA (Contract Bargaining)",
    "category": "Global Business",
    "icon": "📜",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can negotiate contractual clauses, Service Level Agreements (SLA), and dispute resolution terms with legal precision.",
    "canDoSummary": "เจรจาเงื่อนไขสัญญา ข้อตกลงระดับการบริการ (SLA) และระเบียบระงับข้อพิพาทด้วยความรัดกุมทางกฎหมายธุรกิจ",
    "toeicBand": "TOEIC 785 - 830",
    "rewardExp": 160,
    "rewardCoins": 110,
    "npcName": "Legal Counsel Arthur",
    "npcAvatar": "🐱‍⚖️",
    "bgTheme": "theme-office",
    "description": "เจรจาสัญญาส่งมอบบริการระดับนานาชาติ ถกเถียงเงื่อนไข SLA อัตราเบี้ยปรับ และข้อจำกัดความรับผิดชอบทางกฎหมาย",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Counselor, regarding clause 8.2 on Service Level Guarantees, your proposed 99.99% uptime with 20% penalty fee seems excessively punitive.",
        "npcVoiceText": "Counselor, regarding clause 8.2 on Service Level Guarantees, your proposed 99.99% uptime with 20% penalty fee seems excessively punitive.",
        "contextTh": "ที่ปรึกษากฎหมายแย้งว่าข้อตกลง SLA 99.99% พร้อมเบี้ยปรับ 20% เป็นเงื่อนไขที่ลงโทษรุนแรงเกินไป",
        "hint": "เสนอโครงสร้างประนีประนอม เช่น การปรับลดตามระดับความเสียหาย หรือการให้ Service Credits แทนค่าปรับเป็นเงินสด",
        "targetPhrases": [
          "We can structure tiered remedies—capping the penalty at 8% via service credits rather than cash liquidated damages."
        ],
        "options": [
          {
            "text": "We can structure tiered remedies—capping the penalty at 8% via service credits rather than cash liquidated damages.",
            "isCorrect": true,
            "feedback": "เจรจาระดับมืออาชีพ! การเสนอ 'tiered remedies' และ 'service credits' เป็นแนวทางสากลที่คุ้มครองทั้งสองฝ่าย"
          },
          {
            "text": "Take it or leave it, we will never change a single word in our contract.",
            "isCorrect": false,
            "feedback": "การปฏิเสธการเจรจาอย่างแข็งกร้าวจะทำให้ดีลธุรกิจล่ม"
          },
          {
            "text": "We don't care about uptime, servers crash all the time anyway.",
            "isCorrect": false,
            "feedback": "แสดงถึงความไม่ใส่ใจในมาตรฐานการบริการ"
          }
        ],
        "vocab": [
          {
            "word": "Tiered remedies",
            "meaning": "การเยียวยาชดเชยตามลำดับขั้นความเสียหาย"
          },
          {
            "word": "Service credits",
            "meaning": "เครดิตค่าบริการทดแทนเงินสด"
          }
        ]
      }
    ]
  },
  {
    "id": "supplier_audit",
    "stageNumber": 22,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Global Supplier Quality Audit",
    "titleTh": "ตรวจสอบคุณภาพโรงงานซัพพลายเออร์ (Supplier Quality Audit)",
    "category": "Global Business",
    "icon": "🏭",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can lead technical manufacturing audits, address non-compliance issues, and establish Corrective Action Plans (CAP).",
    "canDoSummary": "ตรวจสอบคุณภาพสายการผลิต ชี้แจงจุดบกพร่องที่ไม่เป็นไปตามมาตรฐานสากล และกำหนดแผนแก้ไข (CAP)",
    "toeicBand": "TOEIC 800 - 850",
    "rewardExp": 160,
    "rewardCoins": 110,
    "npcName": "Factory Director Chen",
    "npcAvatar": "🐱‍🏭",
    "bgTheme": "theme-office",
    "description": "ลงพื้นที่ตรวจสอบมาตรฐานโรงงานผลิตชิ้นส่วนเทคโนโลยี ตรวจสอบใบรับรอง ISO และควบคุมอัตราของเสีย",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Welcome to our semiconductor cleanroom facility, Mimi. Our batch yield rate has stabilized at 97.4% this month.",
        "npcVoiceText": "Welcome to our semiconductor cleanroom facility, Mimi. Our batch yield rate has stabilized at 97.4% this month.",
        "contextTh": "ผู้อำนวยการโรงงานต้อนรับและรายงานอัตราผลผลิตชิ้นส่วนที่ได้มาตรฐานอยู่ที่ 97.4%",
        "hint": "ชื่นชมผลการดำเนินงาน แต่สอบถามถึงอัตราของเสีย 2.6% และขั้นตอนการคัดแยกเพื่อไม่ให้หลุดไปยังลูกค้า",
        "targetPhrases": [
          "97.4% is a commendable yield. Could you walk me through your optical inspection protocol for the remaining 2.6% defect margin?"
        ],
        "options": [
          {
            "text": "97.4% is a commendable yield. Could you walk me through your optical inspection protocol for the remaining 2.6% defect margin?",
            "isCorrect": true,
            "feedback": "การถามเชิงเทคนิคระดับสูง ชื่นชมก่อน (commendable yield) แล้วเจาะลึกกระบวนการตรวจจับของเสีย (inspection protocol)"
          },
          {
            "text": "97% is terrible, you are wasting our money!",
            "isCorrect": false,
            "feedback": "ขาดความเข้าใจในสถิติอุตสาหกรรมการผลิตขั้นสูง"
          },
          {
            "text": "I don't understand these numbers, let's just go drink tea.",
            "isCorrect": false,
            "feedback": "ละเลยหน้าที่ของผู้ตรวจสอบคุณภาพ"
          }
        ],
        "vocab": [
          {
            "word": "Yield rate",
            "meaning": "อัตราผลผลิตที่ผ่านมาตรฐาน"
          },
          {
            "word": "Defect margin",
            "meaning": "อัตราส่วนของเสียที่ยอมรับได้"
          }
        ]
      }
    ]
  },
  {
    "id": "venture_pitch",
    "stageNumber": 23,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Pitching to Venture Capitalists",
    "titleTh": "เสนอแผนระดมทุนต่อนักลงทุน VC (Venture Capital Pitch)",
    "category": "Global Business",
    "icon": "💼",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can pitch high-growth startup value propositions, articulate unit economics (LTV/CAC), and defend valuation multiples.",
    "canDoSummary": "นำเสนอโมเดลธุรกิจต่อ Venture Capital ชี้แจงตัวเลขเศรษฐศาสตร์หน่วยย่อย (LTV/CAC) และปกป้องมูลค่ากิจการ",
    "toeicBand": "TOEIC 820 - 870",
    "rewardExp": 170,
    "rewardCoins": 120,
    "npcName": "Managing Partner Evelyn (Apex Capital)",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เข้าพบกองทุน Venture Capital ชั้นนำ นำเสนอการระดมทุนรอบ Series A อธิบายโมเดลรายได้ และตอบข้อซักถามของนักลงทุน",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mimi, your user growth curve looks promising, but your Customer Acquisition Cost (CAC) seems elevated. How do your unit economics hold up?",
        "npcVoiceText": "Mimi, your user growth curve looks promising, but your Customer Acquisition Cost (CAC) seems elevated. How do your unit economics hold up?",
        "contextTh": "นักลงทุนชื่นชมการเติบโตของผู้ใช้ แต่ตั้งข้อสังเกตว่าต้นทุนการหาลูกค้า (CAC) ค่อนข้างสูง และถามถึงความคุ้มค่า",
        "hint": "อธิบายด้วยอัตราส่วน LTV to CAC (มูลค่าตลอดช่วงชีวิตของลูกค้าเทียบกับต้นทุน) และระยะเวลาคืนทุน (Payback Period)",
        "targetPhrases": [
          "While initial CAC is $45, our organic referral loop and 94% retention yield a Lifetime Value (LTV) of $320, delivering a healthy 7:1 LTV-to-CAC ratio."
        ],
        "options": [
          {
            "text": "While initial CAC is $45, our organic referral loop and 94% retention yield a Lifetime Value (LTV) of $320, delivering a healthy 7:1 LTV-to-CAC ratio.",
            "isCorrect": true,
            "feedback": "ตอบได้อย่างเฉียบขาดด้วยตัวเลขจริง! LTV/CAC ratio 7:1 แสดงถึงการทำกำไรที่มหาศาลและยั่งยืน"
          },
          {
            "text": "We just burn money on social media ads and hope people like us.",
            "isCorrect": false,
            "feedback": "โมเดลธุรกิจที่พึ่งพาการเผาเงินโดยไร้ความคุ้มค่าจะถูกนักลงทุนปฏิเสธทันที"
          },
          {
            "text": "CAC doesn't matter as long as we have millions of followers.",
            "isCorrect": false,
            "feedback": "ยอดผู้ติดตามที่สร้างรายได้ไม่ได้ไม่สามารถดึงดูดเงินลงทุนสากล"
          }
        ],
        "vocab": [
          {
            "word": "Customer Acquisition Cost (CAC)",
            "meaning": "ต้นทุนการได้มาซึ่งลูกค้าใหม่หนึ่งราย"
          },
          {
            "word": "Lifetime Value (LTV)",
            "meaning": "มูลค่ารายได้ตลอดช่วงชีวิตของลูกค้า"
          }
        ]
      }
    ]
  },
  {
    "id": "crisis_press",
    "stageNumber": 24,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Crisis PR Press Statement",
    "titleTh": "แถลงข่าวชี้แจงวิกฤตองค์กร (Crisis PR Management)",
    "category": "Global Business",
    "icon": "🎙️",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can manage high-stakes public relations crises, address investigative journalists, and restore organizational credibility.",
    "canDoSummary": "รับมือวิกฤตการสื่อสารต่อหน้าสื่อมวลชน ตอบคำถามนักข่าวสายสืบสวนอย่างสุขุม และกอบกู้ความเชื่อมั่นองค์กร",
    "toeicBand": "TOEIC 830 - 880",
    "rewardExp": 170,
    "rewardCoins": 120,
    "npcName": "Senior Journalist Davis",
    "npcAvatar": "🐱‍📰",
    "bgTheme": "theme-office",
    "description": "ยืนแถลงข่าวต่อหน้าสื่อมวลชนกรณีระบบคลาวด์ขัดข้อง ชี้แจงข้อเท็จจริง มาตรการเยียวยา และแผนป้องกันในอนาคต",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Spokesperson Mimi, over two million users experienced transaction interruptions during yesterday's system downtime. Was this a security breach?",
        "npcVoiceText": "Spokesperson Mimi, over two million users experienced transaction interruptions during yesterday's system downtime. Was this a security breach?",
        "contextTh": "นักข่าวถามจี้ว่าระบบล่มกระทบผู้ใช้กว่าสองล้านคนเกิดจากการถูกเจาะระบบความปลอดภัย (Security Breach) หรือไม่",
        "hint": "ชี้แจงข้อเท็จจริงอย่างโปร่งใส ยืนยันความปลอดภัยของข้อมูล และระบุสาเหตุทางเทคนิคที่แท้จริงโดยไม่หลบเลี่ยง",
        "targetPhrases": [
          "I want to categorically state that no user data was compromised. The outage was triggered by a configuration error during routine network maintenance."
        ],
        "options": [
          {
            "text": "I want to categorically state that no user data was compromised. The outage was triggered by a configuration error during routine network maintenance.",
            "isCorrect": true,
            "feedback": "การสื่อสารในภาวะวิกฤตที่สมบูรณ์แบบ! ยืนยันชัดเจนว่าข้อมูลไม่รั่วไหล (no data compromised) และชี้แจงสาเหตุตรงไปตรงมา"
          },
          {
            "text": "No comment! Get those cameras out of my face right now!",
            "isCorrect": false,
            "feedback": "การพูดว่า 'No comment' หรือปัดกล้องจะทำให้ภาพลักษณ์องค์กรดูมีความผิดทันที"
          },
          {
            "text": "Yes, hackers stole everything and we have no backups.",
            "isCorrect": false,
            "feedback": "สร้างความตื่นตระหนกโดยไร้ข้อเท็จจริง"
          }
        ],
        "vocab": [
          {
            "word": "Categorically state",
            "meaning": "ยืนยันอย่างชัดเจน เด็ดขาด และหนักแน่น"
          },
          {
            "word": "Data compromised",
            "meaning": "ข้อมูลถูกละเมิดหรือรั่วไหล"
          }
        ]
      }
    ]
  },
  {
    "id": "crossborder_logistics",
    "stageNumber": 25,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Cross-Border Freight & Customs",
    "titleTh": "แก้ปัญหาโลจิสติกส์และศุลกากร (Cross-Border Logistics)",
    "category": "Global Business",
    "icon": "🚢",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can handle international shipping disputes, customs tariff classifications (HS Code), and freight demurrage negotiations.",
    "canDoSummary": "เจรจาแก้ปัญหาการขนส่งสินค้าระหว่างประเทศ พิกัดอัตราศุลกากร (HS Code) และค่าธรรมเนียมตู้สินค้าตกค้าง (Demurrage)",
    "toeicBand": "TOEIC 840 - 890",
    "rewardExp": 180,
    "rewardCoins": 130,
    "npcName": "Harbor Master Lars",
    "npcAvatar": "🐱‍⚓",
    "bgTheme": "theme-office",
    "description": "ติดต่อท่าเรือระหว่างประเทศเพื่อเคลียร์ตู้สินค้าคอนเทนเนอร์ที่ติดด่านศุลกากร ชี้แจงเอกสารและเจรจาลดค่าปรับตู้สินค้า",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Captain Mimi, customs flagged your twenty containers of electronic components due to an HS Code tariff discrepancy. They are incurring daily demurrage fees.",
        "npcVoiceText": "Captain Mimi, customs flagged your twenty containers of electronic components due to an HS Code tariff discrepancy. They are incurring daily demurrage fees.",
        "contextTh": "นายท่าแจ้งว่าตู้สินค้า 20 ตู้ถูกกักเพราะพิกัดศุลกากรไม่ตรง และกำลังถูกปรับค่าตู้สินค้าตกค้างรายวัน",
        "hint": "ยื่นเอกสารรับรองถิ่นกำเนิดสินค้า (Form E / Certificate of Origin) และขอให้ตรวจสอบพิกัดย่อยใหม่โดยด่วน",
        "targetPhrases": [
          "We have uploaded the revised Certificate of Origin and bilateral trade documentation under HS Code 8542.31 to expedite clearance."
        ],
        "options": [
          {
            "text": "We have uploaded the revised Certificate of Origin and bilateral trade documentation under HS Code 8542.31 to expedite clearance.",
            "isCorrect": true,
            "feedback": "แม่นยำในศัพท์การค้าระหว่างประเทศ! ระบุพิกัด HS Code ชัดเจนและส่งเอกสาร Certificate of Origin ทันที"
          },
          {
            "text": "Just throw the cargo into the ocean, we will buy new ones.",
            "isCorrect": false,
            "feedback": "สร้างความเสียหายมหาศาลต่อธุรกิจ"
          },
          {
            "text": "Customs officers are all corrupt, why do they want paperwork?",
            "isCorrect": false,
            "feedback": "การต่อว่าเจ้าหน้าที่ศุลกากรอาจทำให้ถูกดำเนินคดีทางกฎหมาย"
          }
        ],
        "vocab": [
          {
            "word": "HS Code tariff",
            "meaning": "พิกัดอัตราศุลกากรระบบฮาร์โมไนซ์สากล"
          },
          {
            "word": "Certificate of Origin",
            "meaning": "หนังสือรับรองถิ่นกำเนิดสินค้า"
          }
        ]
      }
    ]
  },
  {
    "id": "strategic_partnership",
    "stageNumber": 26,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Strategic M&A Joint Venture",
    "titleTh": "เจรจาข้อตกลงควบรวมและพันธมิตร (Strategic M&A)",
    "category": "Global Business",
    "icon": "🤝",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can structure strategic corporate mergers, negotiate equity distribution, and align governance frameworks.",
    "canDoSummary": "วางโครงสร้างการควบรวมกิจการเชิงยุทธศาสตร์ เจรจาสัดส่วนการถือหุ้น และจัดวางกรอบการบริหารร่วมกัน",
    "toeicBand": "TOEIC 850 - 900",
    "rewardExp": 180,
    "rewardCoins": 130,
    "npcName": "Corporate Strategist Julian",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เจรจาข้อตกลงจัดตั้งบริษัทร่วมทุน (Joint Venture) ระหว่างสองบริษัทยักษ์ใหญ่ ตกลงสัดส่วนผู้ถือหุ้นและอำนาจการบริหาร",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Julian here. Our board agrees on the joint venture concept, but we propose a 60-40 equity split in our favor with majority board seats.",
        "npcVoiceText": "Julian here. Our board agrees on the joint venture concept, but we propose a 60-40 equity split in our favor with majority board seats.",
        "contextTh": "คู่เจรจาเสนอการจัดตั้งบริษัทร่วมทุน แต่ขอสัดส่วนหุ้น 60-40 และที่นั่งกรรมการส่วนใหญ่ในบอร์ด",
        "hint": "เสนอโครงสร้าง 50-50 ที่สมดุล หรือการแบ่งสัดส่วนการบริหารตามสินทรัพย์ทางปัญญาและฐานลูกค้าที่นำมาร่วมกัน",
        "targetPhrases": [
          "Given our proprietary intellectual property contribution, we advocate for an equal 50-50 equity joint venture with rotating board leadership."
        ],
        "options": [
          {
            "text": "Given our proprietary intellectual property contribution, we advocate for an equal 50-50 equity joint venture with rotating board leadership.",
            "isCorrect": true,
            "feedback": "วาทศิลป์การเจรจาระดับสูง ยกคุณค่าทรัพย์สินทางปัญญา (IP contribution) มาถ่วงน้ำหนักเพื่อขอสัดส่วน 50-50 อย่างสมเหตุสมผล"
          },
          {
            "text": "Give us 100% or we walk away and destroy you.",
            "isCorrect": false,
            "feedback": "น้ำเสียงก้าวร้าวทำลายโอกาสการเป็นพันธมิตร"
          },
          {
            "text": "Fine, take everything, we will just obey whatever you say.",
            "isCorrect": false,
            "feedback": "ยอมเสียเปรียบในการเจรจาโดยไม่ปกป้องผลประโยชน์ขององค์กร"
          }
        ],
        "vocab": [
          {
            "word": "Proprietary IP",
            "meaning": "ทรัพย์สินทางปัญญาที่เป็นกรรมสิทธิ์เฉพาะ"
          },
          {
            "word": "Rotating leadership",
            "meaning": "การสลับหมุนเวียนตำแหน่งผู้นำบริหาร"
          }
        ]
      }
    ]
  },
  {
    "id": "ip_licensing",
    "stageNumber": 27,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Intellectual Property Licensing",
    "titleTh": "เจรจาสิทธิบัตรและลิขสิทธิ์ IP (IP Licensing)",
    "category": "Global Business",
    "icon": "⚖️",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can negotiate patent cross-licensing, royalty structures, and territorial exclusivity agreements.",
    "canDoSummary": "เจรจาสัญญาอนุญาตให้ใช้สิทธิบัตร (Licensing) อัตราค่ารอยัลตี และสิทธิ์การจัดจำหน่ายแต่เพียงผู้เดียวในภูมิภาค",
    "toeicBand": "TOEIC 860 - 900",
    "rewardExp": 190,
    "rewardCoins": 135,
    "npcName": "Patent Examiner Dr. Aris",
    "npcAvatar": "🐱‍🎓",
    "bgTheme": "theme-office",
    "description": "เจรจาข้อตกลงอนุญาตใช้สิทธิบัตรเทคโนโลยีปัญญาประดิษฐ์กับองค์กรพันธมิตร กำหนดอัตราส่วนแบ่งรายได้และขอบเขตภูมิศาสตร์",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Dr. Aris here. We are interested in licensing your AI optical algorithm for North America, but we require exclusive territorial rights.",
        "npcVoiceText": "Dr. Aris here. We are interested in licensing your AI optical algorithm for North America, but we require exclusive territorial rights.",
        "contextTh": "ผู้ตรวจสอบสิทธิบัตรต้องการขอลิขสิทธิ์อัลกอริทึมปัญญาประดิษฐ์ในอเมริกาเหนือ พร้อมขอสิทธิ์ผูกขาดแต่เพียงผู้เดียว",
        "hint": "เสนอสิทธิ์ผูกขาดแบบมีเงื่อนไข (Conditional Exclusivity) โดยต้องมียอดขายขั้นต่ำรายปีเพื่อรักษาความคุ้มค่า",
        "targetPhrases": [
          "We can grant territorial exclusivity in North America subject to an annual minimum performance threshold of three million dollars."
        ],
        "options": [
          {
            "text": "We can grant territorial exclusivity in North America subject to an annual minimum performance threshold of three million dollars.",
            "isCorrect": true,
            "feedback": "กลยุทธ์การออกใบอนุญาตระดับโลก การให้สิทธิ์ผูกขาดต้องผูกกับยอดขายขั้นต่ำ (minimum performance threshold) เสมอ"
          },
          {
            "text": "Sure, take it for free forever, we don't need money.",
            "isCorrect": false,
            "feedback": "ยกทรัพย์สินขององค์กรให้ผู้อื่นอย่างไร้มูลค่า"
          },
          {
            "text": "No exclusivity ever! We hate exclusive contracts!",
            "isCorrect": false,
            "feedback": "ปฏิเสธโดยไม่เสนอทางเลือกเพื่อการพาณิชย์"
          }
        ],
        "vocab": [
          {
            "word": "Territorial exclusivity",
            "meaning": "สิทธิ์ในการดำเนินธุรกิจแต่เพียงผู้เดียวในเขตพื้นที่"
          },
          {
            "word": "Performance threshold",
            "meaning": "เกณฑ์ขั้นต่ำของผลงาน/ยอดขายที่ต้องบรรลุ"
          }
        ]
      }
    ]
  },
  {
    "id": "budget_allocation",
    "stageNumber": 28,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Fiscal Year Budget Defense",
    "titleTh": "ชี้แจงและขออนุมัติงบประมาณประจำปี (Budget Defense)",
    "category": "Global Business",
    "icon": "💰",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can defend department capital expenditures (CapEx) and operational expenditures (OpEx) before executive finance committees.",
    "canDoSummary": "ชี้แจงและปกป้องงบลงทุน (CapEx) และงบดำเนินงาน (OpEx) ต่อคณะกรรมการการเงินระดับสูงด้วยผลตอบแทน ROI",
    "toeicBand": "TOEIC 870 - 900",
    "rewardExp": 190,
    "rewardCoins": 135,
    "npcName": "Chief Financial Officer Fiona",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เข้าชี้แจงคำของบประมาณฝ่ายนวัตกรรมประจำปีต่อประธานเจ้าหน้าที่ฝ่ายการเงิน (CFO) แสดงผลตอบแทนความคุ้มค่า (ROI)",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mimi, your division is requesting a 40% increase in capital expenditure for infrastructure. How do you justify this expenditure in a lean fiscal year?",
        "npcVoiceText": "Mimi, your division is requesting a 40% increase in capital expenditure for infrastructure. How do you justify this expenditure in a lean fiscal year?",
        "contextTh": "CFO ถามว่าทำไมของบลงทุน CapEx เพิ่มขึ้นถึง 40% ในปีที่บริษัทมีนโยบายรัดเข็มขัดงบประมาณ",
        "hint": "ชี้แจงด้วยผลตอบแทนจากการลงทุน (ROI) และการประหยัดต้นทุนในระยะยาวที่มากกว่าเม็ดเงินลงทุน",
        "targetPhrases": [
          "This investment will modernize our legacy architecture, reducing ongoing operational costs by 28% and generating complete ROI within fourteen months."
        ],
        "options": [
          {
            "text": "This investment will modernize our legacy architecture, reducing ongoing operational costs by 28% and generating complete ROI within fourteen months.",
            "isCorrect": true,
            "feedback": "คำตอบทางการเงินระดับยอดเยี่ยม! ชี้ให้เห็นการลดต้นทุนต่อเนื่อง (28% ongoing reduction) และระยะเวลาคืนทุน (14 months ROI)"
          },
          {
            "text": "We want fancy new computers because our old ones look boring.",
            "isCorrect": false,
            "feedback": "เหตุผลที่ไร้สาระจะถูกตัดงบทันที"
          },
          {
            "text": "Money doesn't matter, just give us whatever is in the bank.",
            "isCorrect": false,
            "feedback": "ขาดความตระหนักรู้ทางการเงินและวินัยงบประมาณ"
          }
        ],
        "vocab": [
          {
            "word": "Capital expenditure (CapEx)",
            "meaning": "รายจ่ายเพื่อการได้มาซึ่งสินทรัพย์ถาวร/การลงทุน"
          },
          {
            "word": "Generate complete ROI",
            "meaning": "สร้างผลตอบแทนคุ้มค่าการลงทุนครบถ้วน"
          }
        ]
      }
    ]
  },
  {
    "id": "tech_architecture",
    "stageNumber": 29,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Tech Stack & Cloud Architecture",
    "titleTh": "ถกเถียงการออกแบบสถาปัตยกรรมระบบ (Cloud Architecture)",
    "category": "Global Business",
    "icon": "☁️",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can lead technical debates on microservices vs monolith, distributed fault tolerance, and latency optimization.",
    "canDoSummary": "นำการอภิปรายเชิงเทคนิคเกี่ยวกับระบบสถาปัตยกรรมคลาวด์ การกระจายโหลด ความพร้อมใช้งานสูง และความหน่วงต่ำ",
    "toeicBand": "TOEIC 880 - 900",
    "rewardExp": 200,
    "rewardCoins": 140,
    "npcName": "Chief Technology Officer Trent",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "ร่วมประชุมระดับผู้นำเทคโนโลยีกับ CTO เพื่อสรุปโครงสร้างสถาปัตยกรรมคลาวด์สำหรับรองรับผู้ใช้งานพร้อมกัน 10 ล้านคน",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Trent here. Our core monolith database is hitting CPU bottlenecks under peak traffic. Should we migrate to event-driven microservices?",
        "npcVoiceText": "Trent here. Our core monolith database is hitting CPU bottlenecks under peak traffic. Should we migrate to event-driven microservices?",
        "contextTh": "CTO กังวลว่าฐานข้อมูลหลักแบบ Monolith ทำงานหนักจน CPU ตันในช่วงทราฟฟิกสูงสุด และถามว่าควรย้ายไประบบ Microservices หรือไม่",
        "hint": "วิเคราะห์ข้อดีข้อเสีย เสนอแนวทางไฮบริดหรือทยอยแยกโมดูลเพื่อลดความเสี่ยงระบบล่ม",
        "targetPhrases": [
          "A full rewrite carries high operational risk. We recommend decoupling high-throughput services first using an asynchronous Kafka message queue."
        ],
        "options": [
          {
            "text": "A full rewrite carries high operational risk. We recommend decoupling high-throughput services first using an asynchronous Kafka message queue.",
            "isCorrect": true,
            "feedback": "คำตอบระดับ Chief Architect! เตือนความเสี่ยงการรื้อทำใหม่ทั้งหมด (rewrite risk) และเสนอการแยกเซอร์วิสแบบอะซิงโครนัส"
          },
          {
            "text": "Delete the database and let users wait forever.",
            "isCorrect": false,
            "feedback": "คำตอบที่ทำลายระบบ"
          },
          {
            "text": "I know nothing about computers, why am I here?",
            "isCorrect": false,
            "feedback": "ไม่สมบทบาทผู้นำการออกแบบระบบ"
          }
        ],
        "vocab": [
          {
            "word": "Decoupling services",
            "meaning": "การแยกส่วนบริการให้ทำงานเป็นอิสระต่อกัน"
          },
          {
            "word": "Asynchronous message queue",
            "meaning": "คิวส่งผ่านข้อมูลแบบอะซิงโครนัสเพื่อลดความแออัด"
          }
        ]
      }
    ]
  },
  {
    "id": "board_meeting",
    "stageNumber": 30,
    "packNumber": 3,
    "packId": "pack_business",
    "title": "Board of Directors Defense",
    "titleTh": "รายงานทิศทางต่อคณะกรรมการบริษัท (Board of Directors Defense)",
    "category": "Global Business",
    "icon": "🏛️",
    "difficulty": "Advanced",
    "cefrLevel": "B2",
    "cefrCanDo": "Can present strategic governance roadmaps, manage inquisitive board scrutiny, and secure unanimous committee endorsement.",
    "canDoSummary": "นำเสนอแผนยุทธศาสตร์องค์กรต่อคณะกรรมการบริษัท ตอบข้อซักถามเชิงลึกของผู้ถือหุ้น และได้รับมติรับรองเป็นเอกฉันท์",
    "toeicBand": "TOEIC 890 - 900",
    "rewardExp": 220,
    "rewardCoins": 150,
    "npcName": "Chairman Sterling",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "ก้าวขึ้นสู่ห้องประชุมบอร์ดบริหารระดับสูงสุด นำเสนอแผนยุทธศาสตร์การขยายธุรกิจระดับสากลต่อหน้าประธานกรรมการและผู้ถือหุ้นใหญ่",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mimi, the board has reviewed your three-year global expansion proposal. What is your risk mitigation contingency if macroeconomic headwinds intensify?",
        "npcVoiceText": "Mimi, the board has reviewed your three-year global expansion proposal. What is your risk mitigation contingency if macroeconomic headwinds intensify?",
        "contextTh": "ประธานบอร์ดถามถึงแผนรับมือความเสี่ยง (Contingency Plan) หากภาวะเศรษฐกิจมหภาคทั่วโลกชะลอตัวรุนแรงขึ้น",
        "hint": "แสดงแผนกลยุทธ์รับมือความเสี่ยงที่มีความยืดหยุ่น การกระจายความเสี่ยงข้ามภูมิภาค และการรักษาสภาพคล่องทางการเงิน",
        "targetPhrases": [
          "We have embedded defensive triggers: maintaining twelve months of operating runway and structuring dynamic revenue diversification across three non-correlated markets."
        ],
        "options": [
          {
            "text": "We have embedded defensive triggers: maintaining twelve months of operating runway and structuring dynamic revenue diversification across three non-correlated markets.",
            "isCorrect": true,
            "feedback": "การปกป้องยุทธศาสตร์ระดับบอร์ดบริหาร! รักษาเงินทุนสำรอง 12 เดือน (12 months runway) และกระจายความเสี่ยงในตลาดที่ไม่เชื่อมโยงกัน"
          },
          {
            "text": "If the economy crashes, we will all just go bankrupt and give up.",
            "isCorrect": false,
            "feedback": "ทัศนคติสิ้นหวังที่ไม่คู่ควรกับตำแหน่งผู้นำองค์กร"
          },
          {
            "text": "The economy never crashes, we don't need contingency plans.",
            "isCorrect": false,
            "feedback": "ประมาทเลินเล่อและไร้วิสัยทัศน์"
          }
        ],
        "vocab": [
          {
            "word": "Risk mitigation contingency",
            "meaning": "แผนปฏิบัติการฉุกเฉินเพื่อบรรเทาความเสี่ยง"
          },
          {
            "word": "Non-correlated markets",
            "meaning": "ตลาดที่ไม่มีความเกี่ยวโยงของความผันผวนทางเศรษฐกิจ"
          }
        ]
      }
    ]
  },
  {
    "id": "diplomatic_protocol",
    "stageNumber": 31,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "High-Stakes Diplomatic Protocol",
    "titleTh": "พิธีการทูตและการเจรจาระดับรัฐ (Diplomatic Protocol)",
    "category": "Diplomacy & Leadership",
    "icon": "🕊️",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can converse with foreign dignitaries using exquisite diplomatic etiquette, formal register, and nuanced statecraft rhetoric.",
    "canDoSummary": "สนทนากับคณะทูตานุทูตต่างประเทศด้วยระดับภาษาที่เป็นทางการสูงสุด ถูกต้องตามธรรมเนียมพิธีการทูตสากล",
    "toeicBand": "TOEIC 905 - 930 (International Expert)",
    "rewardExp": 250,
    "rewardCoins": 160,
    "npcName": "Ambassador Philippe",
    "npcAvatar": "🐱‍🎓",
    "bgTheme": "theme-office",
    "description": "ต้อนรับคณะเอกอัครราชทูตและผู้แทนระดับสูงจากต่างประเทศ เจรจาแลกเปลี่ยนความร่วมมือทางวัฒนธรรมและเศรษฐกิจ",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Your Excellency, on behalf of our diplomatic mission, we convey the warmest greetings of our government. How do you assess the trajectory of our bilateral accord?",
        "npcVoiceText": "Your Excellency, on behalf of our diplomatic mission, we convey the warmest greetings of our government. How do you assess the trajectory of our bilateral accord?",
        "contextTh": "เอกอัครราชทูตกล่าวทักทายอย่างเป็นทางการสูงสุด และถามถึงทิศทางของสนธิสัญญาความร่วมมือทวิภาคี",
        "hint": "ใช้ภาษาการทูตระดับสูง เช่น 'profound gratitude', 'shared multilateral values', 'enduring partnership'",
        "targetPhrases": [
          "We express our profound gratitude to Your Excellency. We are confident that our shared commitment to mutual prosperity will reinforce our enduring bilateral partnership."
        ],
        "options": [
          {
            "text": "We express our profound gratitude to Your Excellency. We are confident that our shared commitment to mutual prosperity will reinforce our enduring bilateral partnership.",
            "isCorrect": true,
            "feedback": "ภาษาการทูตระดับ C1 ไร้ที่ติ! ถ้อยคำงดงาม สุภาพ เปี่ยมด้วยบารมีและศักดิ์ศรีของตัวแทนประเทศ"
          },
          {
            "text": "Hey Philippe, what's up? Hope your president didn't send you here empty handed.",
            "isCorrect": false,
            "feedback": "การทักทายแบบไม่ให้เกียรติเป็นความผิดพลาดร้ายแรงทางการทูต (Diplomatic blunder)"
          },
          {
            "text": "We don't care about your accord, we have more money than you.",
            "isCorrect": false,
            "feedback": "สร้างความบาดหมางระหว่างประเทศทันที"
          }
        ],
        "vocab": [
          {
            "word": "Profound gratitude",
            "meaning": "ความขอบพระคุณอย่างสุดซึ้ง"
          },
          {
            "word": "Bilateral accord",
            "meaning": "ข้อตกลงทวิภาคีระหว่างสองฝ่าย"
          }
        ]
      }
    ]
  },
  {
    "id": "hostage_mediation",
    "stageNumber": 32,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "High-Tension Corporate Mediation",
    "titleTh": "ไกล่เกลี่ยข้อพิพาทความขัดแย้งระดับสูง (Corporate Mediation)",
    "category": "Diplomacy & Leadership",
    "icon": "⚖️",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can arbitrate entrenched disputes between adversarial factions, de-escalate hostility, and forge binding consensus.",
    "canDoSummary": "ไกล่เกลี่ยข้อพิพาทรุนแรงระหว่างกลุ่มผลประโยชน์ที่ขัดแย้ง ลดความตึงเครียด และสร้างฉันทามติที่มีผลผูกพันทางกฎหมาย",
    "toeicBand": "TOEIC 910 - 940",
    "rewardExp": 250,
    "rewardCoins": 160,
    "npcName": "Neutral Arbiter Madame Genevieve",
    "npcAvatar": "🐱‍⚖️",
    "bgTheme": "theme-office",
    "description": "นั่งหัวโต๊ะการไกล่เกลี่ยข้อพิพาทสัญญามูลค่าพันล้านเหรียญ ระหว่างสองฝ่ายที่ไม่ยอมลงรอยกัน เพื่อหลีกเลี่ยงการฟ้องร้องในศาลโลก",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mediator Mimi, both corporations have reached an absolute impasse over patent indemnification. Neither party is willing to yield. How will you bridge this deadlock?",
        "npcVoiceText": "Mediator Mimi, both corporations have reached an absolute impasse over patent indemnification. Neither party is willing to yield. How will you bridge this deadlock?",
        "contextTh": "ผู้ไกล่เกลี่ยแจ้งว่าทั้งสองบริษัทยืนกรานไม่ยอมกันในเรื่องความรับผิดชอบชดใช้ค่าเสียหายสิทธิบัตร และถามว่าจะผ่าทางตันอย่างไร",
        "hint": "เสนอโครงสร้างการชดใช้ความเสียหายแบบจำกัดความรับผิดชอบร่วมกัน (Capped Mutual Indemnification) หรือการจัดตั้งกองทุนคุ้มครองร่วม",
        "targetPhrases": [
          "I propose a mutual indemnification covenant capped at ten million dollars, paired with an expedited binding arbitration tribunal for future claims."
        ],
        "options": [
          {
            "text": "I propose a mutual indemnification covenant capped at ten million dollars, paired with an expedited binding arbitration tribunal for future claims.",
            "isCorrect": true,
            "feedback": "ข้อเสนอไกล่เกลี่ยระดับ Master of Dispute Resolution! สร้างความยุติธรรมและขจัดความกังวลของทั้งสองฝ่ายพร้อมกัน"
          },
          {
            "text": "Let them sue each other into bankruptcy, who cares?",
            "isCorrect": false,
            "feedback": "ล้มเหลวในหน้าที่ของผู้ไกล่เกลี่ย"
          },
          {
            "text": "I will flip a coin to decide who wins.",
            "isCorrect": false,
            "feedback": "การตัดสินด้วยการเสี่ยงทายขาดความเป็นมืออาชีพทางกฎหมาย"
          }
        ],
        "vocab": [
          {
            "word": "Mutual indemnification covenant",
            "meaning": "ข้อตกลงคุ้มครองและชดใช้ค่าเสียหายร่วมกัน"
          },
          {
            "word": "Expedited binding arbitration",
            "meaning": "กระบวนการอนุญาโตตุลาการแบบเร่งรัดที่มีผลผูกพัน"
          }
        ]
      }
    ]
  },
  {
    "id": "global_keynote",
    "stageNumber": 33,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "World Tech Summit Keynote",
    "titleTh": "กล่าวปาฐกถาบนเวทีการประชุมระดับโลก (World Tech Keynote)",
    "category": "Diplomacy & Leadership",
    "icon": "🎤",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can deliver visionary keynote orations before global forums, compelling international delegates and articulating humanity-centric tech ethics.",
    "canDoSummary": "กล่าวปาฐกถาเชิงวิสัยทัศน์บนเวทีผู้นำระดับโลก สร้างแรงบันดาลใจ และประกาศหลักจริยธรรมเทคโนโลยีเพื่อมนุษยชาติ",
    "toeicBand": "TOEIC 920 - 950",
    "rewardExp": 260,
    "rewardCoins": 170,
    "npcName": "Summit Moderator Marcus",
    "npcAvatar": "🐱‍🎤",
    "bgTheme": "theme-office",
    "description": "ขึ้นสู่เวที World Technology Forum ต่อหน้าผู้แทนจาก 80 ประเทศและผู้ชมนับล้าน กล่าวสุนทรพจน์เรื่องอนาคตของ AI และมนุษยชาติ",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Ladies and gentlemen, please welcome Keynote Speaker Mimi! The stage is yours to address our global delegates on the future of ethical artificial intelligence.",
        "npcVoiceText": "Ladies and gentlemen, please welcome Keynote Speaker Mimi! The stage is yours to address our global delegates on the future of ethical artificial intelligence.",
        "contextTh": "พิธีกรเชิญขึ้นสู่เวทีเพื่อกล่าวปาฐกถาเรื่องจริยธรรมปัญญาประดิษฐ์ต่อคณะผู้แทนทั่วโลก",
        "hint": "ใช้ศิลปะการพูดระดับสุนทรพจน์ (Oratory Skill): เปิดด้วยวิสัยทัศน์ที่ยิ่งใหญ่ ผูกโยงเทคโนโลยีเข้ากับศักดิ์ศรีความเป็นมนุษย์",
        "targetPhrases": [
          "Distinguished delegates, the true benchmark of technological innovation is not the velocity of our algorithms, but the elevation of human dignity and opportunity."
        ],
        "options": [
          {
            "text": "Distinguished delegates, the true benchmark of technological innovation is not the velocity of our algorithms, but the elevation of human dignity and opportunity.",
            "isCorrect": true,
            "feedback": "สุนทรพจน์ระดับผู้นำโลกที่สะกดทุกสายตา! 'Elevation of human dignity' เป็นถ้อยคำระดับปรัชญาสากล"
          },
          {
            "text": "Hello everyone, buy our software because we want to make lots of money.",
            "isCorrect": false,
            "feedback": "สุนทรพจน์ระดับโลกไม่ควรพูดถึงแต่การขายของตัวเอง"
          },
          {
            "text": "AI is going to take over the world and destroy everyone, goodbye.",
            "isCorrect": false,
            "feedback": "สร้างความหวาดกลัวโดยไร้วิสัยทัศน์ในการแก้ไข"
          }
        ],
        "vocab": [
          {
            "word": "Benchmark of innovation",
            "meaning": "หมุดหมายบรรทัดฐานของนวัตกรรม"
          },
          {
            "word": "Elevation of human dignity",
            "meaning": "การยกระดับศักดิ์ศรีคุณค่าความเป็นมนุษย์"
          }
        ]
      }
    ]
  },
  {
    "id": "regulatory_antitrust",
    "stageNumber": 34,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Antitrust & SEC Regulatory Defense",
    "titleTh": "ชี้แจงกฎหมายต่อต้านการผูกขาด (Antitrust Regulatory Defense)",
    "category": "Diplomacy & Leadership",
    "icon": "🏛️",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can navigate hostile regulatory investigations, defend market competitiveness, and establish enforceable compliance covenants.",
    "canDoSummary": "ชี้แจงต่อคณะกรรมาธิการกำกับดูแลการแข่งขันทางการค้า ปกป้องเสรีภาพทางธุรกิจ และกำหนดกรอบธรรมาภิบาล",
    "toeicBand": "TOEIC 930 - 960",
    "rewardExp": 270,
    "rewardCoins": 180,
    "npcName": "Commissioner Vance (Regulatory Board)",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เข้าชี้แจงต่อคณะกรรมการกำกับดูแลการแข่งขันทางการค้าสากล (Antitrust Commission) เพื่อพิสูจน์ว่าการควบรวมกิจการไม่ผูกขาดตลาด",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Commissioner Vance presiding. Mimi, your conglomerate now controls 44% of regional cloud infrastructure. How do you refute allegations of monopolistic predatory pricing?",
        "npcVoiceText": "Commissioner Vance presiding. Mimi, your conglomerate now controls 44% of regional cloud infrastructure. How do you refute allegations of monopolistic predatory pricing?",
        "contextTh": "กรรมาธิการตั้งข้อซักถามว่าบริษัทครองส่วนแบ่งคลาวด์ 44% และถูกกล่าวหาว่าตั้งราคาตัดคู่แข่งเพื่อผูกขาดตลาด (Predatory Pricing)",
        "hint": "โต้แย้งด้วยหลักฐานเชิงประจักษ์: ชี้แจงโครงสร้างต้นทุนจริง การเปิดระบบให้คู่แข่งเชื่อมต่อ (Interoperability) และการสร้างระบบนิเวศแบบเปิด",
        "targetPhrases": [
          "We respectfully refute the allegation. Our pricing reflects economies of scale passed directly to consumers, and our APIs remain fully open and interoperable for all competing platforms."
        ],
        "options": [
          {
            "text": "We respectfully refute the allegation. Our pricing reflects economies of scale passed directly to consumers, and our APIs remain fully open and interoperable for all competing platforms.",
            "isCorrect": true,
            "feedback": "การชี้แจงทางกฎหมายเศรษฐศาสตร์ที่สมบูรณ์แบบ! อธิบายเรื่อง 'economies of scale' และยืนยันความเปิดกว้าง 'open and interoperable'"
          },
          {
            "text": "We are a monopoly and we are proud of it. Deal with it.",
            "isCorrect": false,
            "feedback": "ยอมรับข้อกล่าวหาทันที ซึ่งจะนำไปสู่การถูกสั่งยุบหรือปรับเงินมหาศาล"
          },
          {
            "text": "The government has no right to inspect our private business.",
            "isCorrect": false,
            "feedback": "การละเมิดอำนาจศาลและองค์กรกำกับดูแลจะทำให้ถูกเพิกถอนใบอนุญาต"
          }
        ],
        "vocab": [
          {
            "word": "Economies of scale",
            "meaning": "การประหยัดจากขนาดการผลิต/การดำเนินงานขนาดใหญ่"
          },
          {
            "word": "Open and interoperable",
            "meaning": "ระบบเปิดที่สามารถทำงานร่วมกับระบบอื่นได้เสรี"
          }
        ]
      }
    ]
  },
  {
    "id": "hostile_takeover",
    "stageNumber": 35,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Hostile Takeover Defense Strategy",
    "titleTh": "วางกลยุทธ์ป้องกันการเทกโอเวอร์ (Hostile Takeover Defense)",
    "category": "Diplomacy & Leadership",
    "icon": "🛡️",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can devise defensive corporate finance maneuvers (Poison Pill, White Knight), rally shareholder proxies, and safeguard institutional sovereignty.",
    "canDoSummary": "วางกลยุทธ์การเงินเพื่อป้องกันการเข้าซื้อกิจการแบบไม่เป็นมิตร รวบรวมเสียงโหวตผู้ถือหุ้น และรักษาเอกราชขององค์กร",
    "toeicBand": "TOEIC 940 - 970",
    "rewardExp": 280,
    "rewardCoins": 190,
    "npcName": "Defense Advisor Raymond",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "ประชุมวอร์รูมฉุกเฉินรับมือการกว้านซื้อหุ้นแบบไม่เป็นมิตรจากกลุ่มทุนคู่แข่ง กำหนดยุทธวิธีกลืนยาพิษ (Poison Pill) และหาอัศวินม้าขาว",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Mimi, an offshore raider fund has acquired 14% of our voting shares on the open market and launched a tender offer. What is our immediate counter-strategy?",
        "npcVoiceText": "Mimi, an offshore raider fund has acquired 14% of our voting shares on the open market and launched a tender offer. What is our immediate counter-strategy?",
        "contextTh": "ที่ปรึกษาแจ้งว่ากลุ่มทุนล่ากิจการกว้านซื้อหุ้นไปแล้ว 14% และเริ่มเปิดรับซื้อหุ้นต่อสาธารณะ (Tender Offer) ถามว่าจะตอบโต้อย่างไร",
        "hint": "ประกาศใช้กลยุทธ์ Shareholder Rights Plan (Poison Pill) เจรจาหาพันธมิตร White Knight และสื่อสารกับผู้ถือหุ้นสถาบัน",
        "targetPhrases": [
          "We should trigger our Shareholder Rights Plan to dilute unauthorized accumulations, while engaging our friendly sovereign wealth partner as a White Knight."
        ],
        "options": [
          {
            "text": "We should trigger our Shareholder Rights Plan to dilute unauthorized accumulations, while engaging our friendly sovereign wealth partner as a White Knight.",
            "isCorrect": true,
            "feedback": "กลยุทธ์ระดับเทพการเงินวอลล์สตรีต! ใช้ 'Shareholder Rights Plan' เจือจางหุ้น และดึง 'White Knight' เข้ามาพิทักษ์องค์กร"
          },
          {
            "text": "Let them buy the whole company, I want to retire early anyway.",
            "isCorrect": false,
            "feedback": "ยอมแพ้และทรยศต่อผู้ถือหุ้นและพนักงานทุกคน"
          },
          {
            "text": "Let's hack their computers and delete their bank accounts.",
            "isCorrect": false,
            "feedback": "การกระทำผิดกฎหมายอาชญากรรมไซเบอร์"
          }
        ],
        "vocab": [
          {
            "word": "Shareholder Rights Plan (Poison Pill)",
            "meaning": "แผนสิทธิผู้ถือหุ้นเพื่อเจือจางการกว้านซื้อแบบไม่เป็นมิตร"
          },
          {
            "word": "White Knight",
            "meaning": "พันธมิตรที่เป็นมิตรที่เข้ามาช่วยซื้อหุ้นเพื่อป้องกันการเทกโอเวอร์"
          }
        ]
      }
    ]
  },
  {
    "id": "esg_summit",
    "stageNumber": 36,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Global ESG & Sustainability Accord",
    "titleTh": "เจรจาข้อตกลงความยั่งยืนระดับนานาชาติ (Global ESG Accord)",
    "category": "Diplomacy & Leadership",
    "icon": "🌍",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can negotiate international environmental protocols, establish science-based Net-Zero targets, and lead corporate ESG stewardship.",
    "canDoSummary": "เจรจาข้อตกลงด้านสิ่งแวดล้อมสากล กำหนดเป้าหมายปล่อยคาร์บอนสุทธิเป็นศูนย์ (Net-Zero) และเป็นผู้นำด้านความยั่งยืน",
    "toeicBand": "TOEIC 950 - 980",
    "rewardExp": 290,
    "rewardCoins": 200,
    "npcName": "UN Climate Envoy Dr. Astrid",
    "npcAvatar": "🐱‍🌾",
    "bgTheme": "theme-office",
    "description": "เข้าร่วมการประชุมสหประชาชาติว่าด้วยสภาพภูมิอากาศ เจรจาเป้าหมาย Net-Zero และระดมทุนกองทุนการเปลี่ยนผ่านสู่พลังงานสะอาด",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Envoy Astrid here. Developing nations require technological subsidies to decarbonize their infrastructure. How will your industry coalition contribute to the global climate fund?",
        "npcVoiceText": "Envoy Astrid here. Developing nations require technological subsidies to decarbonize their infrastructure. How will your industry coalition contribute to the global climate fund?",
        "contextTh": "ทูตสิ่งแวดล้อมแห่งสหประชาชาติถามว่ากลุ่มพันธมิตรอุตสาหกรรมของคุณจะสมทบทุนช่วยเหลือประเทศกำลังพัฒนาในการลดคาร์บอนอย่างไร",
        "hint": "ประกาศความมุ่งมั่นที่เป็นรูปธรรม: การถ่ายทอดเทคโนโลยีสีเขียวโดยไม่คิดค่าลิขสิทธิ์ และการสมทบทุนจัดตั้งกองทุน Green Innovation Fund",
        "targetPhrases": [
          "Our coalition commits to an open-source patent waiver for solar-harvesting technologies and a dedicated fifty-million-dollar transition grant for emerging markets."
        ],
        "options": [
          {
            "text": "Our coalition commits to an open-source patent waiver for solar-harvesting technologies and a dedicated fifty-million-dollar transition grant for emerging markets.",
            "isCorrect": true,
            "feedback": "การแสดงภาวะผู้นำระดับโลกที่แท้จริง! มอบสิทธิบัตรแบบ Open-source และสนับสนุนเงินทุนช่วยเหลือประเทศกำลังพัฒนา"
          },
          {
            "text": "Climate change is a hoax, we will burn as much coal as we want.",
            "isCorrect": false,
            "feedback": "ปฏิเสธหลักการทางวิทยาศาสตร์และทำลายเกียรติภูมิในเวทีโลก"
          },
          {
            "text": "Developing countries should solve their own problems without our help.",
            "isCorrect": false,
            "feedback": "ขาดความรับผิดชอบต่อส่วนรวมในฐานะองค์กรสากล"
          }
        ],
        "vocab": [
          {
            "word": "Open-source patent waiver",
            "meaning": "การสละสิทธิ์การผูกขาดสิทธิบัตรเพื่อให้ใช้ประโยชน์ฟรี"
          },
          {
            "word": "Decarbonize infrastructure",
            "meaning": "การปรับเปลี่ยนโครงสร้างพื้นฐานเพื่อลดการปล่อยคาร์บอน"
          }
        ]
      }
    ]
  },
  {
    "id": "c_suite_retention",
    "stageNumber": 37,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Executive Succession & Retention",
    "titleTh": "สรรหาและรักษาผู้บริหารระดับ C-Suite (Executive Retention)",
    "category": "Diplomacy & Leadership",
    "icon": "👑",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can negotiate high-stakes executive compensation packages, performance-vesting equity, and leadership governance charters.",
    "canDoSummary": "เจรจาแพ็กเกจค่าตอบแทนผู้บริหารระดับสูง หุ้นแบบมีเงื่อนไขระยะยาว (Vesting Equity) และวางแผนสืบทอดตำแหน่งผู้นำ",
    "toeicBand": "TOEIC 950 - 980",
    "rewardExp": 290,
    "rewardCoins": 200,
    "npcName": "Managing Director Alistair",
    "npcAvatar": "🐱‍💼",
    "bgTheme": "theme-office",
    "description": "เจรจากับผู้บริหารระดับสูงที่เป็นหัวใจของบริษัท เพื่อเสนอแผนผลประโยชน์ระยะยาวและแผนการสืบทอดตำแหน่งประธานเจ้าหน้าที่บริหาร (CEO)",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Alistair speaking. A competing multinational has offered me their global presidency with significant equity. What reason do I have to remain here?",
        "npcVoiceText": "Alistair speaking. A competing multinational has offered me their global presidency with significant equity. What reason do I have to remain here?",
        "contextTh": "กรรมการผู้จัดการแจ้งว่าได้รับข้อเสนอตำแหน่งประธานระดับโลกจากคู่แข่ง และถามว่ามีเหตุผลอะไรที่เขาควรอยู่ต่อที่นี่",
        "hint": "นำเสนอวิสัยทัศน์การเติบโต แผนสืบทอดตำแหน่งสู่ CEO และแพ็กเกจหุ้นระยะยาวที่มีมูลค่าสูงกว่าในระยะ 5 ปี",
        "targetPhrases": [
          "Beyond our long-term equity vesting package, the Board has formally designated you as the primary successor for the Group CEO chair next year."
        ],
        "options": [
          {
            "text": "Beyond our long-term equity vesting package, the Board has formally designated you as the primary successor for the Group CEO chair next year.",
            "isCorrect": true,
            "feedback": "ข้อเสนอเจรจาที่ปฏิเสธไม่ได้! เสนอตำแหน่งประธานเจ้าหน้าที่บริหารสูงสุด (Group CEO) ควบคู่กับแพ็กเกจหุ้นระยะยาว"
          },
          {
            "text": "If you want to leave, just leave today, we can replace you tomorrow.",
            "isCorrect": false,
            "feedback": "การท้าทายผู้บริหารระดับสูงจะทำให้บริษัทสูญเสียบุคลากรและองค์ความรู้สำคัญ"
          },
          {
            "text": "I will beg you on my knees to stay.",
            "isCorrect": false,
            "feedback": "การอ้อนวอนสะท้อนความอ่อนแอและลดทอนอำนาจต่อรองขององค์กร"
          }
        ],
        "vocab": [
          {
            "word": "Equity vesting package",
            "meaning": "แพ็กเกจหุ้นที่ทยอยมอบให้ตามอายุงานและผลงาน"
          },
          {
            "word": "Designated successor",
            "meaning": "ผู้ที่ได้รับการแต่งตั้งให้เป็นผู้สืบทอดตำแหน่งอย่างเป็นทางการ"
          }
        ]
      }
    ]
  },
  {
    "id": "geopolitical_risk",
    "stageNumber": 38,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Geopolitical Supply Chain Rerouting",
    "titleTh": "วางแผนรับมือวิกฤตภูมิรัฐศาสตร์โลก (Geopolitical Crisis)",
    "category": "Diplomacy & Leadership",
    "icon": "🌐",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can lead strategic contingency planning amid international embargoes, trade sanctions, and critical supply chain disruptions.",
    "canDoSummary": "วางแผนยุทธศาสตร์ฉุกเฉินรับมือการคว่ำบาตรทางการค้า ข้อพิพาททางภูมิรัฐศาสตร์ และปรับเส้นทางห่วงโซ่อุปทานระดับโลก",
    "toeicBand": "TOEIC 960 - 990",
    "rewardExp": 300,
    "rewardCoins": 210,
    "npcName": "Geopolitical Analyst Dr. Kincaid",
    "npcAvatar": "🐱‍💻",
    "bgTheme": "theme-office",
    "description": "ประชุมรับมือสถานการณ์ฉุกเฉินระดับโลกเมื่อเกิดการปิดช่องแคบทางทะเลสำคัญ ต้องวางแผนเปลี่ยนเส้นทางเดินเรือและจัดหาวัตถุดิบทดแทน",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Dr. Kincaid reporting. Naval skirmishes in the primary maritime transit strait have halted 60% of our rare-earth raw material shipments. How do we secure continuity?",
        "npcVoiceText": "Dr. Kincaid reporting. Naval skirmishes in the primary maritime transit strait have halted 60% of our rare-earth raw material shipments. How do we secure continuity?",
        "contextTh": "นักวิเคราะห์ภูมิรัฐศาสตร์รายงานว่าความขัดแย้งทางทะเลทำให้การขนส่งแร่หายากหยุดชะงัก 60% และถามถึงแผนรักษาความต่อเนื่องของธุรกิจ",
        "hint": "เปิดใช้งานยุทธศาสตร์ห่วงโซ่อุปทานแบบ Dual-Sourcing ย้ายโควตาไปยังซัพพลายเออร์สำรองในทวีปอื่น และสำรองแร่ในคลังสินค้าด่วน",
        "targetPhrases": [
          "We must immediately activate our alternate supply corridor across allied inland rail networks and draw upon our ninety-day strategic rare-earth stockpiles."
        ],
        "options": [
          {
            "text": "We must immediately activate our alternate supply corridor across allied inland rail networks and draw upon our ninety-day strategic rare-earth stockpiles.",
            "isCorrect": true,
            "feedback": "การตัดสินใจระดับจอมทัพยุทธศาสตร์! สลับไปใช้เส้นทางรถไฟบนบก (inland rail networks) และเบิกใช้คลังสำรองฉุกเฉิน 90 วัน"
          },
          {
            "text": "There's nothing we can do, let the factories shut down forever.",
            "isCorrect": false,
            "feedback": "ยอมจำนนต่อวิกฤตจะทำให้บริษัทล้มละลาย"
          },
          {
            "text": "Let's hire private pirates to fight our way through the strait.",
            "isCorrect": false,
            "feedback": "การใช้กำลังทหารผิดกฎหมายระหว่างประเทศอย่างร้ายแรง"
          }
        ],
        "vocab": [
          {
            "word": "Alternate supply corridor",
            "meaning": "ระเบียงเส้นทางจัดหาวัตถุดิบทดแทน"
          },
          {
            "word": "Strategic stockpiles",
            "meaning": "คลังทรัพยากรสำรองเชิงยุทธศาสตร์ฉุกเฉิน"
          }
        ]
      }
    ]
  },
  {
    "id": "live_investigative_qa",
    "stageNumber": 39,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "Live Investigative Media Interview",
    "titleTh": "ตอบคำถามสดสื่อมวลชนสืบสวนเชิงลึก (Investigative Media Q&A)",
    "category": "Diplomacy & Leadership",
    "icon": "📺",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can withstand aggressive prime-time television grilling, pivot masterfully from accusatory inquiries, and maintain composure under fire.",
    "canDoSummary": "รับมือการสัมภาษณ์สดทางโทรทัศน์กับนักข่าวสายสืบสวนที่ซักไซ้อย่างดุเดือด พลิกประเด็นอย่างชาญฉลาด และคุมสติได้อย่างสง่างาม",
    "toeicBand": "TOEIC 960 - 990",
    "rewardExp": 320,
    "rewardCoins": 220,
    "npcName": "Chief Anchorwoman Brenda",
    "npcAvatar": "🐱‍🎤",
    "bgTheme": "theme-office",
    "description": "นั่งถ่ายทอดสดในรายการข่าวไพรม์ไทม์ระดับชาติ ตอบคำถามนักข่าวสายสืบสวนชื่อดังที่พยายามซักฟอกเรื่องภาษีและจริยธรรมองค์กร",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Brenda here, live on national television. Documents leaked this morning allege that your European subsidiaries utilized offshore jurisdictions to minimize corporate tax. Is this tax avoidance, Mimi?",
        "npcVoiceText": "Brenda here, live on national television. Documents leaked this morning allege that your European subsidiaries utilized offshore jurisdictions to minimize corporate tax. Is this tax avoidance, Mimi?",
        "contextTh": "ผู้ประกาศข่าวชื่อดังยิงคำถามสดกล่าวหาว่าบริษัทใช้บริษัทย่อยในต่างแดนเพื่อหลบเลี่ยงภาษี และถามตรงๆ ว่านี่คือการหนีภาษีหรือไม่",
        "hint": "ใช้เทคนิคการตอบแบบผู้นำ: ตอบอย่างสุขุม ยืนยันความโปร่งใส ปฏิบัติตามกฎหมายสากลอย่างเคร่งครัด และชี้แจงการลงทุนจริงในท้องถิ่น",
        "targetPhrases": [
          "Brenda, we operate with uncompromised integrity. All our international operations are fully compliant with OECD guidelines, and we contribute over two billion dollars annually in domestic infrastructure and wages."
        ],
        "options": [
          {
            "text": "Brenda, we operate with uncompromised integrity. All our international operations are fully compliant with OECD guidelines, and we contribute over two billion dollars annually in domestic infrastructure and wages.",
            "isCorrect": true,
            "feedback": "การตอบระดับปรมาจารย์แห่งการสัมภาษณ์สด! ยืนยันความโปร่งใสตามมาตรฐาน OECD และตอกย้ำเงินภาษีและค่าจ้างที่สร้างให้เศรษฐกิจกว่า 2 พันล้านเหรียญ"
          },
          {
            "text": "Your TV network is fake news! Turn off the camera right now!",
            "isCorrect": false,
            "feedback": "การกล่าวหาว่า Fake News หรือหนีกล้องจะทำให้สังคมตราหน้าว่ามีความผิดทันที"
          },
          {
            "text": "Yes we avoid tax, everybody does it so why can't we?",
            "isCorrect": false,
            "feedback": "การยอมรับการเลี่ยงภาษีกลางรายการสดจะทำให้ถูกดำเนินคดีอาญาทันที"
          }
        ],
        "vocab": [
          {
            "word": "Uncompromised integrity",
            "meaning": "ความซื่อสัตย์สุจริตที่ไม่มีการประนีประนอม"
          },
          {
            "word": "OECD guidelines",
            "meaning": "แนวปฏิบัติสากลขององค์การเพื่อความร่วมมือทางเศรษฐกิจและการพัฒนา"
          }
        ]
      }
    ]
  },
  {
    "id": "grand_consortium",
    "stageNumber": 40,
    "packNumber": 4,
    "packId": "pack_executive",
    "title": "The Global Multi-Nation Consortium",
    "titleTh": "ลงนามพันธมิตรเศรษฐกิจหลายชาติ (Grand Global Consortium)",
    "category": "Diplomacy & Leadership",
    "icon": "📜⭐",
    "difficulty": "Master",
    "cefrLevel": "C1",
    "cefrCanDo": "Can lead multi-national treaty ratifications, synthesize diverse cultural and legal doctrines, and finalize historic global accords.",
    "canDoSummary": "เป็นผู้นำการลงนามสนธิสัญญาความร่วมมือทางเศรษฐกิจระดับโลก หลอมรวมความหลากหลายทางวัฒนธรรม และปิดฉากความสำเร็จสูงสุด",
    "toeicBand": "TOEIC 980 - 990 (Perfect Native Mastery)",
    "rewardExp": 500,
    "rewardCoins": 350,
    "npcName": "Chancellor Thorne (Consortium Chairman)",
    "npcAvatar": "🐱‍👑",
    "bgTheme": "theme-office",
    "description": "ด่านสุดท้ายสูงสุดของ MeowQuest! ขึ้นสู่แท่นพิธีลงนามสนธิสัญญาพันธมิตรเศรษฐกิจและเทคโนโลยีข้ามชาติ 40 ชาติ ณ หอประชุมใหญ่",
    "dialogues": [
      {
        "id": 1,
        "npcText": "Chancellor Thorne presiding. Mimi, sixty nations and global industry leaders have convened in this grand chamber. As the designated architect of this historic charter, please present your concluding declaration.",
        "npcVoiceText": "Chancellor Thorne presiding. Mimi, sixty nations and global industry leaders have convened in this grand chamber. As the designated architect of this historic charter, please present your concluding declaration.",
        "contextTh": "ประธานใหญ่แห่งสภาความร่วมมือสากลขอให้คุณในฐานะสถาปนิกผู้ออกแบบสนธิสัญญากล่าวคำประกาศปิดการลงนามครั้งประวัติศาสตร์",
        "hint": "ใช้ภาษาที่เปี่ยมด้วยวิสัยทัศน์สูงสุด สรุปความร่วมมือ ความเท่าเทียม และการสร้างประวัติศาสตร์ร่วมกันเพื่อคนรุ่นต่อไป",
        "targetPhrases": [
          "Honorable Chancellor, delegates, and visionaries: Today, we transcend borders to sign a binding covenant for equitable innovation, sustainable stewardship, and enduring global peace."
        ],
        "options": [
          {
            "text": "Honorable Chancellor, delegates, and visionaries: Today, we transcend borders to sign a binding covenant for equitable innovation, sustainable stewardship, and enduring global peace.",
            "isCorrect": true,
            "feedback": "สุนทรพจน์ระดับมหากาพย์แห่งประวัติศาสตร์โลก! 'Transcending borders for equitable innovation and enduring peace' สะท้อนคุณสมบัติผู้เชี่ยวชาญภาษาอังกฤษระดับ C1 สูงสุด"
          },
          {
            "text": "Finally we are done! Hand over the money and let's go party!",
            "isCorrect": false,
            "feedback": "ทำลายความศักดิ์สิทธิ์ของพิธีการลงนามระดับโลก"
          },
          {
            "text": "I sign this because I was forced to, I don't believe in any of this.",
            "isCorrect": false,
            "feedback": "ทรยศต่อความร่วมมือระดับนานาชาติ"
          }
        ],
        "vocab": [
          {
            "word": "Equitable innovation",
            "meaning": "นวัตกรรมที่มีความเท่าเทียมและทั่วถึง"
          },
          {
            "word": "Enduring global peace",
            "meaning": "สันติภาพอันยั่งยืนของมนุษยชาติ"
          }
        ]
      }
    ]
  }
];

const SHOP_CATALOG = {
  breeds: [
    {
      id: "calico",
      name: "Japanese Calico (三毛猫)",
      nameTh: "แมวสามสีญี่ปุ่นนำโชค (Calico)",
      price: 0,
      reqLevel: 1,
      icon: "🐱",
      origin: "ญี่ปุ่น (Japan)",
      desc: "แมวสามสีนำโชค (ขาว-ส้ม-ดำ) ตัวละครหลักเริ่มต้น สัญลักษณ์แมวกวัก Maneki-neko นิสัยอ่อนโยน ขี้อ้อน และฉลาดแสนรู้"
    },
    {
      id: "british_blue",
      name: "British Shorthair (Classic Blue)",
      nameTh: "บริติช ช็อตแฮร์ (บลูคลาสสิก)",
      price: 180,
      reqLevel: 2,
      icon: "🐱‍👤",
      origin: "สหราชอาณาจักร (UK)",
      desc: "ขนกำมะหยี่สีเทาบลู แก้มกลมซาลาเปา ตาสีทองแดงอำพัน สุขุม เรียบร้อย สไตล์ผู้ดีอังกฤษแท้"
    },
    {
      id: "siamese",
      name: "Royal Siamese (Wichienmaat)",
      nameTh: "วิเชียรมาศ (แมวมงคลไทยแท้)",
      price: 220,
      reqLevel: 3,
      icon: "🐱",
      origin: "ไทย (Thailand)",
      desc: "แมวมงคลแต่โบราณ ลำตัวสีครีมนวล แต้มหน้ากากช็อกโกแลต 9 จุด ตาสีไพลินเข้ม ช่างพูด ช่างจดจำ"
    },
    {
      id: "scottish_fold",
      name: "Scottish Fold",
      nameTh: "สก็อตติช โฟลด์ (หูพับหน้ากลม)",
      price: 260,
      reqLevel: 4,
      icon: "😺",
      origin: "สก็อตแลนด์ (Scotland)",
      desc: "หูพับแนบชิดศีรษะ ตากลมโตเหมือนนกฮูก นิสัยขี้เล่น ใจดี เป็นมิตรกับทุกคนในออฟฟิศ"
    },
    {
      id: "khao_manee",
      name: "Khao Manee (Diamond Eye)",
      nameTh: "ขาวมณี (ตาสองสีประกายเพชร)",
      price: 320,
      reqLevel: 5,
      icon: "🤍",
      origin: "ไทย (Thailand)",
      desc: "แมวขาวบริสุทธิ์สายพันธุ์ไทยโบราณ ตาสองสี (Odd Eyes: ฟ้าไพลิน & เขียวมรกต) ฉลาด ปราดเปรียว นำโชคลาภ"
    },
    {
      id: "bengal",
      name: "Bengal Leopard Cat",
      nameTh: "เบงกอล (เสือดาวจิ๋วปราดเปรียว)",
      price: 380,
      reqLevel: 6,
      icon: "🐆",
      origin: "สหรัฐอเมริกา (USA)",
      desc: "ลายจุดกุหลาบ (Rosettes) สวยสง่าดั่งเสือดาวป่า พลังงานล้นเหลือ คล่องแคล่ว มั่นใจในการเจรจาธุรกิจ"
    },
    {
      id: "persian",
      name: "Persian Classic Fluff",
      nameTh: "เปอร์เซีย (ขนฟูเจ้าหญิงหรูหรา)",
      price: 420,
      reqLevel: 7,
      icon: "👑",
      origin: "เปอร์เซีย / อิหร่าน (Iran)",
      desc: "ขนยาวสลวยนุ่มฟู หน้าตุ๊กตาหวานละมุน สงบ เรียบร้อย ให้บรรยากาศผู้บริหารระดับสูง"
    },
    {
      id: "orange_tabby",
      name: "Orange Tabby (Ginger Cat)",
      nameTh: "ส้มแท็บบี้ (ส้มจอมพลัง)",
      price: 150,
      reqLevel: 2,
      icon: "🍊",
      origin: "ทั่วโลก (Domestic)",
      desc: "ลายทางส้มสดใส ขี้เล่น อารมณ์ดี กินเก่ง เข้าสังคมง่าย ชวนเพื่อนๆ ในที่ทำงานคุยได้ทั้งวัน"
    },
    {
      id: "tuxedo",
      name: "Tuxedo Gentleman",
      nameTh: "ทักซิโด้ (สุภาพบุรุษสูทดำ)",
      price: 200,
      reqLevel: 3,
      icon: "🎩",
      origin: "ทั่วโลก (Domestic)",
      desc: "เสื้อคลุมดำขลับพร้อมเชิ้ตขาวและถุงเท้าขาว บุคลิกสุภาพ มั่นใจ พร้อมเข้าห้องประชุมเสมอ"
    }
  ],
  hats: [
    { id: "hat_straw", name: "Straw Hat", nameTh: "หมวกสานชาวไร่", price: 50, reqLevel: 1, icon: "👒", desc: "กันแดดระยิบระยับ สวมแล้วรู้สึกพร้อมผจญภัย" },
    { id: "hat_chef", name: "Chef Toque", nameTh: "หมวกเชฟกระทะเหล็ก", price: 120, reqLevel: 2, icon: "👨‍🍳", desc: "เพิ่มความมั่นใจในการสั่งอาหารและพูดเรื่องรสชาติ" },
    { id: "hat_detective", name: "Sherlock Cap", nameTh: "หมวกนักสืบเชอร์ล็อก", price: 250, reqLevel: 4, icon: "🕵️", desc: "มองหาคำบอกทางได้แม่นยำ ไม่หลงทิศ" },
    { id: "hat_wizard", name: "Star Wizard Hat", nameTh: "หมวกพ่อมดแห่งดวงดาว", price: 500, reqLevel: 7, icon: "🧙", desc: "ร่ายมนตร์ไวยากรณ์ภาษาอังกฤษได้คล่องแคล่ว" },
    { id: "hat_crown", name: "Golden Royal Crown", nameTh: "มงกุฎทองคำราชันย์แมว", price: 1000, reqLevel: 10, icon: "👑", desc: "สำหรับแมวผู้เชี่ยวชาญภาษาอังกฤษระดับท็อป!" }
  ],
  outfits: [
    { id: "outfit_hoodie", name: "Orange Cozy Hoodie", nameTh: "ฮู้ดดี้สีส้มอบอุ่น", price: 80, reqLevel: 1, icon: "🧥", desc: "เสื้อคลุมใส่สบาย เหมาะกับการฝึกสนทนาทุกวัน" },
    { id: "outfit_apron", name: "Barista Green Apron", nameTh: "ผ้ากันเปื้อนบาริสต้า", price: 160, reqLevel: 3, icon: "🦺", desc: "ใส่แล้วจะชงกาแฟและสั่งเครื่องดื่มเก่งขึ้น 200%" },
    { id: "outfit_trench", name: "Detective Trench Coat", nameTh: "เสื้อโค้ตนักสืบผู้ดีอังกฤษ", price: 320, reqLevel: 5, icon: "🧥", desc: "สำเนียงลอนดอนจะเปล่งประกายเมื่อสวมตัวนี้" },
    { id: "outfit_cyber", name: "Cyberpunk Neon Suit", nameTh: "ชุดสูทนีออนไซเบอร์พังก์", price: 650, reqLevel: 8, icon: "🥼", desc: "เท่ล้ำยุค สื่อสารได้ทุกภาษาในกาแล็กซี" },
    { id: "outfit_tuxedo", name: "Royal Cat Tuxedo", nameTh: "ทักซิโด้ขุนนางเหมียว", price: 1200, reqLevel: 12, icon: "🤵", desc: "ความสุภาพระดับ 5 ดาวในการสนทนากับใครก็ได้" }
  ],
  weapons: [
    { id: "wpn_fishbone", name: "Lucky Fishbone", nameTh: "ก้างปลาทองคำนำโชค", price: 40, reqLevel: 1, icon: "🐟", desc: "คทาคู่ใจวัยเด็ก ช่วยให้ตอบคำถามได้มั่นใจ" },
    { id: "wpn_cup", name: "Bottomless Coffee Cup", nameTh: "แก้วกาแฟเติมได้ไม่อั้น", price: 140, reqLevel: 2, icon: "☕", desc: "กระปรี้กระเปร่า มีแรงฝึกพูดภาษาอังกฤษได้ทั้งวัน" },
    { id: "wpn_quill", name: "Scholar's Magic Quill", nameTh: "ปากกาขนนกนักปราชญ์", price: 300, reqLevel: 4, icon: "🪶", desc: "จดจำคำศัพท์ใหม่ได้ทันทีที่ได้ยิน" },
    { id: "wpn_mic", name: "Golden Podcast Mic", nameTh: "ไมโครโฟนทองคำพ็อดแคสต์", price: 600, reqLevel: 7, icon: "🎙️", desc: "เสียงพูดเพราะ สำเนียงชัดเจนระดับเจ้าของภาษา" },
    { id: "wpn_scepter", name: "Catnip Scepter", nameTh: "คทาแคทนิปแห่งปัญญา", price: 1500, reqLevel: 10, icon: "🪄", desc: "ดึงดูดพลังความรู้และการสนทนาอันไร้ขีดจำกัด" }
  ],
  vehicles: [
    { id: "veh_box", name: "Cardboard Box Kart", nameTh: "กล่องกระดาษติดล้อ", price: 100, reqLevel: 1, icon: "📦", desc: "ยานพาหนะสุดคลาสสิกของแมว ไถไปไหนก็มีความสุข" },
    { id: "veh_skate", name: "Street Skateboard", nameTh: "สเก็ตบอร์ดเด็กแนว", price: 250, reqLevel: 3, icon: "🛹", desc: "เดินทางไปร้านกาแฟและสถานีรถไฟได้อย่างว่องไว" },
    { id: "veh_roomba", name: "Autonomous Vacuum Rider", nameTh: "หุ่นยนต์ดูดฝุ่นไฮเทค", price: 550, reqLevel: 6, icon: "🛸", desc: "นั่งชิลบนโรบอตดูดฝุ่น ให้มันพาไปสำรวจโลก" },
    { id: "veh_cloud", name: "Magical Nimbus Cloud", nameTh: "เมฆสายรุ้งลอยฟ้า", price: 1200, reqLevel: 9, icon: "☁️", desc: "เหาะข้ามเมืองเพอร์ริสได้อย่างอิสระไร้กังวล" },
    { id: "veh_ufo", name: "Alien Flying Saucer", nameTh: "จานบินแมวเอเลี่ยน", price: 2500, reqLevel: 15, icon: "🛸", desc: "ยานอวกาศสำหรับแมวระดับตำนาน!" }
  ],
  houses: [
    { id: "house_box", name: "Cosy Box Tent", nameTh: "เต็นท์กล่องกระดาษแสนสุข", price: 0, reqLevel: 1, icon: "⛺", desc: "บ้านเริ่มต้นที่อบอุ่นและปลอดภัย" },
    { id: "house_tree", name: "Wooden Cat Tree Tower", nameTh: "คอนโดคอนไม้แมวหลายชั้น", price: 300, reqLevel: 3, icon: "🌳", desc: "มีที่ลับเล็บและเปลนอนชมวิวเมือง" },
    { id: "house_cottage", name: "English Country Cottage", nameTh: "คอทเทจสไตล์ชนบทอังกฤษ", price: 800, reqLevel: 6, icon: "🏡", desc: "บ้านอบอุ่นพร้อมสวนกุหลาบ นั่งจิบชาฝึกภาษาอังกฤษ" },
    { id: "house_villa", name: "Modern Luxury Villa", nameTh: "วิลล่าสุดหรูริมสระน้ำ", price: 1800, reqLevel: 10, icon: "🏘️", desc: "มีห้องซ้อมพูดภาษาอังกฤษพร้อมระบบอะคูสติกชั้นเลิศ" },
    { id: "house_castle", name: "Grand Cat Castle", nameTh: "ปราสาทราชวังแมวเหมียว", price: 4000, reqLevel: 15, icon: "🏰", desc: "ที่พำนักของปรมาจารย์แห่งภาษาอังกฤษ" }
  ]
};

// Daily Quest Templates for the Endless Loop
const DAILY_QUEST_POOL = [
  { id: "dq_order", text: "ฝึกสั่งกาแฟหรืออาหาร 1 ครั้ง (Whisker Cafe)", scenarioId: "cafe_order", rewardCoins: 30, rewardExp: 35 },
  { id: "dq_directions", text: "ฝึกถามทางกับคุณตำรวจ (Lost in Purr-is)", scenarioId: "directions", rewardCoins: 30, rewardExp: 35 },
  { id: "dq_clinic", text: "บอกอาการป่วยกับคุณหมอฮูก (Paw-some Clinic)", scenarioId: "clinic_visit", rewardCoins: 40, rewardExp: 45 },
  { id: "dq_smalltalk", text: "ชวนคุยเล่นในสวนสาธารณะ (Sunny Park)", scenarioId: "park_chit_chat", rewardCoins: 25, rewardExp: 30 },
  { id: "dq_hotel", text: "ฝึกเช็กอินโรงแรม (Grand Whisker Hotel)", scenarioId: "hotel_checkin", rewardCoins: 45, rewardExp: 50 },
  { id: "dq_convenience", text: "ซื้อของในร้านสะดวกซื้อ (7-Meowven)", scenarioId: "convenience_store", rewardCoins: 30, rewardExp: 35 },
  { id: "dq_airport", text: "ผ่านด่าน ตม. ที่สนามบิน (SkyPurr Airport)", scenarioId: "airport_flight", rewardCoins: 50, rewardExp: 60 },
  { id: "dq_fastfood", text: "สั่งเซ็ตเบอร์เกอร์ฟาสต์ฟู้ด (MeowDonald's)", scenarioId: "fast_food", rewardCoins: 30, rewardExp: 35 },
  { id: "dq_lostfound", text: "แจ้งความของหายที่สถานีตำรวจ (Lost & Found)", scenarioId: "lost_and_found", rewardCoins: 45, rewardExp: 50 },
  { id: "dq_movie", text: "จองตั๋วหนังและป๊อปคอร์น (CineMeow Theater)", scenarioId: "movie_theater", rewardCoins: 35, rewardExp: 40 },
  { id: "dq_voice_master", text: "ฝึกพูดด้วยไมค์เสียง (Voice Mode) ให้ได้คะแนนเกิน 60% 1 ครั้ง", requireVoice: true, rewardCoins: 50, rewardExp: 60 }
];
