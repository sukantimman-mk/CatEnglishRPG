/**
 * MeowQuest - Daily English RPG Scenarios Dataset
 * 10 Comprehensive Scenarios with 4-5 turns each
 * Designed for realistic, immersive ping-pong daily conversation.
 */

const SCENARIOS = [
  {
    id: "cafe_order",
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
  }
];

// Shop Items Catalog
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
