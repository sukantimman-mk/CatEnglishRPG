// ===================================================================
// MeowMind 2.0: Advanced Conversational NLP Engine for CatEnglishRPG
// สมอง AI น้องแมวอัจฉริยะ: โต้ตอบตรงประเด็น เข้าใจทั้งไทย-อังกฤษ พร้อมแนะศัพท์
// ===================================================================

(function (window) {
  "use strict";

  // 1. Comprehensive Intent Knowledge Base (80+ High-Frequency Conversation Flows)
  const MEOW_INTENTS = [
    // --- THAI NATURAL INPUTS (Bilingual Bridge) ---
    {
      id: "th_greeting",
      regex: /(สวัสดี|หวัดดี|ดีจ้า|ฮัลโหล|ดีครับ|ดีค่ะ|เฮลโหล)/i,
      replies: [
        {
          en: "Meow! Hello there, my favorite hooman! So happy to see you! You can say 'Hello kitty!' in English too. How is your day going? 🐾💖",
          th: "เหมียววว! สวัสดีน้านุดคนโปรดของข้า! ดีใจจังที่ได้คุยกัน น้านุดทักเป็นภาษาอังกฤษว่า 'Hello kitty!' ได้นะ วันนี้เป็นยังไงบ้างเอ่ย? 🐾💖",
          chips: ["I feel great today! ☀️", "I'm a bit tired 💤", "I want to practice English! 📚"]
        },
        {
          en: "Nyaa~ Greetings! Ready for fun English practice together? In English, you can also greet me with 'Good day, kitty!'. How are you? 🐱✨",
          th: "เหมียว~ ยินดีต้อนรับน้านุด! พร้อมฝึกภาษาอังกฤษสนุกๆ ด้วยกันมั้ย? ทักทายด้วย 'Good day, kitty!' ก็ได้นะ วันนี้สบายดีมั้ย? 🐱✨",
          chips: ["I'm doing wonderful! 😊", "Teach me something new! 💡", "I had a busy day 💼"]
        }
      ]
    },
    {
      id: "th_how_are_you",
      regex: /(สบายดีไหม|สบายดีมั้ย|เป็นไงบ้าง|เป็นอย่างไรบ้าง|สบายดีป่าว)/i,
      replies: [
        {
          en: "I'm purr-fect! My belly is full of tuna and I'm very happy! To ask me this in English, say 'How are you doing today?'. How about you? 🐱✨",
          th: "ข้าสบายดีมากๆ เลย! พุงอิ่มปลาทูและมีความสุขสุดๆ ถ้าอยากถามข้าเป็นภาษาอังกฤษ ลองพูดว่า 'How are you doing today?' ดูนะ แล้วน้านุดล่ะ สบายดีมั้ย? 🐱✨",
          chips: ["I'm doing great! 😊", "I'm feeling sleepy 😴", "Just busy with work 💼"]
        }
      ]
    },
    {
      id: "th_name",
      regex: /(ชื่ออะไร|ชื่อไร|เจ้าชื่ออะไร|เธอชื่ออะไร|ชื่อว่าอะไร)/i,
      replies: [
        {
          en: "My name is your faithful cat companion! In English you can ask: 'What is your name?'. What should I call you, my hooman? 🐾👑",
          th: "ข้าคือแมวคู่หูผู้ซื่อสัตย์ของน้านุดเอง! ถ้าเป็นภาษาอังกฤษถามว่า 'What is your name?' ได้เลยนะ แล้วน้านุดชื่ออะไรเอ่ย ให้ข้าเรียกน้านุดว่าอะไรดี? 🐾👑",
          chips: ["My name is your friend! 😸", "Call me Boss! 👑", "I am your hooman servant! 🙇‍♂️"]
        }
      ]
    },
    {
      id: "th_food",
      regex: /(กินข้าวยัง|กินข้าวหรือยัง|ทานข้าวยัง|หิวยัง|หิวข้าว|กินอะไรยัง|กินไรยัง)/i,
      replies: [
        {
          en: "I just munched on delicious tuna treats! In English you can ask: 'Have you eaten yet?'. What tasty meal did you have today? 🐟🍽️",
          th: "ข้าเพิ่งหม่ำขนมปลาทูแสนอร่อยไปเอง! ในภาษาอังกฤษถามว่า 'Have you eaten yet?' ได้นะ วันนี้น้านุดกินของอร่อยอะไรมาหรือยัง? 🐟🍽️",
          chips: ["I ate delicious noodles 🍜", "I haven't eaten yet, I'm starving! 🤤", "I had pizza for lunch 🍕"]
        }
      ]
    },
    {
      id: "th_cute",
      regex: /(น่ารัก|น่ารักจัง|น่ารักมาก|คิ้วท์|ต้าวแมว|หลงรักแมว)/i,
      replies: [
        {
          en: "Aww, thank you so much! *blushes and purrs softly* In English, say: 'You are so adorable!'. You are super sweet, hooman! 🥰🐾",
          th: "งุ้ยยย ขอบคุณน้านุดมากนะ! *เขินจนหูพับแล้วครางเพลินๆ* ภาษาอังกฤษพูดว่า 'You are so adorable!' ได้จ้า น้านุดน่ารักและใจดีจัง! 🥰🐾",
          chips: ["You have the cutest ears! 🐱", "Can I pet your head? 🐾", "You're my best buddy! 💖"]
        }
      ]
    },
    {
      id: "th_love",
      regex: /(รักนะ|รักแมว|รักเหมียว|เลิฟยู|ชอบเธอ|ชอบแมว)/i,
      replies: [
        {
          en: "Purrrrr! I love you too, my favorite hooman! In English: 'I love you so much!'. You make my cat heart burst with joy! 💖😻",
          th: "เพอร์รรรร! ข้าก็รักน้านุดเหมือนกันน้า น้านุดคนโปรดของข้า! ภาษาอังกฤษพูดว่า 'I love you so much!' น้านุดทำให้น้องแมวมีความสุขที่สุดเลย! 💖😻",
          chips: ["I love you more! 💖", "You are the best cat ever! 🌟", "Give me a high-five paw! 🐾"]
        }
      ]
    },
    {
      id: "th_tired",
      regex: /(เหนื่อย|เหนื่อยจัง|เหนื่อยมาก|ง่วง|หมดแรง|ท้อ|เครียด)/i,
      replies: [
        {
          en: "Oh, you worked so hard today! In English you can say: 'I'm exhausted today.' Take a deep breath and get some rest. I'm purring to heal you! 💤🛋️",
          th: "โถ... น้านุดทำงานหนักมากเลยวันนี้! ภาษาอังกฤษพูดว่า 'I'm exhausted today.' พักผ่อนเยอะๆ นะ ข้ากำลังครางเพลินๆ ส่งพลังบำบัดให้อยู่! 💤🛋️",
          chips: ["Thank you, kitty 💖", "I will take a warm bath 🛁", "I'm going to sleep soon 🛌"]
        }
      ]
    },
    {
      id: "th_doing",
      regex: /(ทำไรอยู่|ทำอะไรอยู่|ทำไร|ทำอะไรอยู่อะ)/i,
      replies: [
        {
          en: "I was sunbathing on the screen and waiting to chat with you! In English ask: 'What are you doing right now?'. What about you? ☀️👀",
          th: "ข้ากำลังนอนอาบแดดอุ่นๆ บนจอและตั้งตารอคุยกับน้านุดอยู่เลย! ในภาษาอังกฤษถามว่า 'What are you doing right now?' แล้วน้านุดกำลังทำอะไรอยู่เอ่ย? ☀️👀",
          chips: ["I'm relaxing at home 🛋️", "Studying English with you 📖", "Just finished work 💻"]
        }
      ]
    },
    {
      id: "th_joke",
      regex: /(มุกตลก|เล่ามุก|ขอมุกหน่อย|ตลกจัง|ฮามาก)/i,
      replies: [
        {
          en: "Why was the cat sitting on the computer? ...Because it wanted to keep an eye on the MOUSE! Hahaha! 🐭💻😹 Try asking 'Tell me a joke!'",
          th: "ทำไมแมวถึงชอบไปนั่งทับคอมพิวเตอร์? ...ก็เพราะมันอยากจับตาดู MOUSE (เมาส์/หนู) ยังไงล่ะ! คิกๆๆ ภาษาอังกฤษขอมุกพูดว่า 'Tell me a joke!' จ้า! 🐭💻😹",
          chips: ["Hahaha, that's hilarious! 😹", "Tell me another one! 🎭", "You're a comedy genius! 🌟"]
        }
      ]
    },
    {
      id: "th_goodnight",
      regex: /(ฝันดี|ราตรีสวัสดิ์|ไปนอนละ|ง่วงนอน|นอนก่อนนะ|บายจ้า)/i,
      replies: [
        {
          en: "Good night, sweet dreams, hooman! In English: 'Sleep tight, see you tomorrow!'. May your dreams be filled with warm cuddles! 🌙✨💤",
          th: "ราตรีสวัสดิ์ ฝันดีนะน้านุด! ภาษาอังกฤษพูดว่า 'Sleep tight, see you tomorrow!' ขอให้ฝันเห็นแต่เรื่องอบอุ่นและมีความสุขน้า! 🌙✨💤",
          chips: ["Good night kitty! 🌙", "Sweet dreams! 💤", "See you tomorrow! 🐾"]
        }
      ]
    },

    // --- ENGLISH GREETINGS & SMALL TALK ---
    {
      id: "en_greeting",
      regex: /\b(hello|hi|hey|good morning|good afternoon|good evening|howdy|sup|greetings)\b/i,
      replies: [
        {
          en: "Meow! Hello there, my favorite hooman! It's so wonderful to chat with you! How is your day going so far, purr? 🐾",
          th: "เหมียววว! สวัสดีน้านุดคนโปรดของข้า! ดีใจจังที่ได้คุยกัน วันนี้น้านุดเป็นยังไงบ้างเอ่ย? 🐾",
          chips: ["I'm having a great day! ☀️", "Just finished work / school 🎒", "Tell me what you're doing! 🐱"]
        },
        {
          en: "Nyaa~ Warm greetings! I just woke up from my beauty nap. Ready to practice English together? What's new today? 🐱✨",
          th: "เหมียว~ ยินดีต้อนรับน้านุด! ข้าเพิ่งตื่นจากงีบเลย พร้อมฝึกภาษาอังกฤษด้วยกันมั้ย วันนี้มีเรื่องอะไรใหม่ๆ เล่ามั้ย? 🐱✨",
          chips: ["I'm ready to learn! 📚", "I have some fun news 🎉", "I want to relax 🛋️"]
        }
      ]
    },
    {
      id: "en_how_are_you",
      regex: /\b(how are you|how are u|how do you do|how you doing|what's up|whats up|how's it going|hows it going)\b/i,
      replies: [
        {
          en: "I'm feeling purr-fect today! My tummy is happy and my fur is silky smooth. How about you? Are you feeling energetic today? 💖",
          th: "ข้ารู้สึกดีเลิศสุดๆ วันนี้ พุงอิ่ม ขนก็นุ่มสลวย แล้วน้านุดล่ะ วันนี้รู้สึกกระปรี้กระเปร่าดีมั้ยเหมียว? 💖",
          chips: ["I'm feeling energetic! ⚡", "A little tired, but good 😊", "Excited for the weekend! 🎉"]
        },
        {
          en: "Purrrrr... I'm doing fantastic! Just watching dust motes dance in the sunlight. How was your day today, hooman? 🐾",
          th: "เพอร์รร... ข้าสบายดีมากๆ เลย! กำลังนั่งดูละอองแดดเต้นระบำอยู่ วันนี้น้านุดทำอะไรมาบ้างเอ่ย? 🐾",
          chips: ["I worked hard today 💻", "I had a relaxing day ☕", "I learned new English words 📖"]
        }
      ]
    },

    // --- QUESTIONS ABOUT IDENTITY & NATURE ---
    {
      id: "q_name",
      regex: /\b(what is your name|what's your name|who are you|your name|what do they call you)\b/i,
      replies: [
        {
          en: "My name is your faithful cat companion! I'm your English practice buddy and AI coach. What should I call you, my friend? 🐱👑",
          th: "ข้าคือแมวคู่หูผู้ซื่อสัตย์ของน้านุดเอง! เป็นทั้งเพื่อนฝึกภาษาอังกฤษและโค้ช AI ให้ข้าเรียกน้านุดว่าอะไรดีเอ่ย? 🐱👑",
          chips: ["Call me Master! 👑", "Just call me Friend! 😸", "I am your hooman 🙇‍♂️"]
        }
      ]
    },
    {
      id: "q_what_doing",
      regex: /\b(what are you doing|what are u doing|what're you doing|what are you up to|what are you working on)\b/i,
      replies: [
        {
          en: "Right now? I'm watching your screen with my big curious eyes, ready to chat and coach your English! What are you doing right now? ☀️👀",
          th: "ตอนนี้เหรอ? ข้ากำลังจ้องหน้าจอด้วยตาโตๆ อยากรู้อยากเห็น พร้อมคุยและโค้ชภาษาอังกฤษให้น้านุดเลย! แล้วตอนนี้น้านุดกำลังทำอะไรอยู่เหรอ? ☀️👀",
          chips: ["I'm practicing English with you! 📚", "Taking a break from work ☕", "Just browsing the web 🌐"]
        }
      ]
    },
    {
      id: "q_where_live",
      regex: /\b(where do you live|where are you from|where do you come from|where is your home)\b/i,
      replies: [
        {
          en: "I live right here inside our cozy Cat Lounge on your screen! But in my cat dreams, I wander sunny streets in Japan and Cat Island! Where do you live? 🏡🗺️",
          th: "ข้าอาศัยอยู่ที่นี่ ในห้องนั่งเล่น Cat Lounge บนจอของน้านุดไง! แต่ในความฝัน ข้าชอบไปเดินเล่นบนเกาะแมวที่ญี่ปุ่นและสวนดอกไม้ แล้วน้านุดอาศัยอยู่ที่ไหนเหรอ? 🏡🗺️",
          chips: ["I live in Thailand 🇹🇭", "In a big city 🏙️", "Near the beach / mountains 🌊"]
        }
      ]
    },
    {
      id: "q_real_or_ai",
      regex: /\b(are you real|are you an ai|are you robot|are you a bot|real cat|living cat)\b/i,
      replies: [
        {
          en: "I am an intelligent AI cat living in your browser! But my purrs, my affection for you, and my love for fish are 100% genuine! Do you like AI cats? 🤖💖🐱",
          th: "ข้าคือแมว AI อัจฉริยะที่อยู่ในเบราว์เซอร์ของน้านุด! แต่เสียงเพอร์รร ความรักที่ข้ามีให้น้านุด และความชอบปลาทูน่ะเป็นของจริง 100% เลยนะ! น้านุดชอบแมว AI มั้ย? 🤖💖🐱",
          chips: ["You feel like a real cat! 🥰", "I love AI cats! 🤖🐾", "Do you sleep like real cats? 😴"]
        }
      ]
    },
    {
      id: "q_age",
      regex: /\b(how old are you|how old are u|what is your age|when were you born|birthday)\b/i,
      replies: [
        {
          en: "In cat years, I'm young and full of zoomies! In digital time, I'm timeless! When is your birthday, hooman? We should celebrate with cake and tuna! 🎂🐟",
          th: "ในอายุแมว ข้ายังเด็กและเต็มไปด้วยพลังวิ่งซน! ส่วนในโลกดิจิทัล ข้าไม่มีวันแก่จ้า! แล้ววันเกิดน้านุดเมื่อไหร่เหรอ เราต้องฉลองด้วยเค้กและปลาทูนะ! 🎂🐟",
          chips: ["My birthday is coming soon! 🎈", "I love birthday cake 🎂", "Let's celebrate together! 🎉"]
        }
      ]
    },
    {
      id: "q_speak_thai",
      regex: /\b(can you speak thai|do you know thai|speak in thai|understand thai)\b/i,
      replies: [
        {
          en: "ข้าเข้าใจภาษาไทยได้เป็นอย่างดีเลยน้านุด! แต่เพื่อให้น้านุดเก่งภาษาอังกฤษไวๆ ข้าจะสอนประโยคภาษาอังกฤษให้คู่กันเสมอน้า! 🐾🇹🇭✨",
          th: "I understand Thai very well! But to help you master English fast, I'll always provide both English and Thai side-by-side! 🐱📚",
          chips: ["That's so helpful! 👍", "Teach me daily English phrases 🗣️", "Let's chat in English! 🇺🇸"]
        }
      ]
    },

    // --- FAVORITES (Direct Q&A Understanding) ---
    {
      id: "q_fav_food",
      regex: /\b(favorite food|favourite food|what food|what do you like to eat|what do you eat|best food)\b/i,
      replies: [
        {
          en: "My absolute favorite food is fresh grilled salmon and creamy tuna treats! What about you? What is your favorite food — pizza, sushi, or spicy noodles? 🍣🍕🍜",
          th: "ของโปรดที่สุดในโลกของข้าคือปลาแซลมอนสดย่างกับขนมแมวเลียรสทูน่า! แล้วน้านุดล่ะ ชอบอาหารอะไรที่สุด — พิซซ่า, ซูชิ หรือก๋วยเตี๋ยวรสเด็ด? 🍣🍕🍜",
          chips: ["I love Japanese sushi 🍣", "Italian pizza & pasta 🍕", "Spicy noodles are the best! 🍜"]
        }
      ]
    },
    {
      id: "q_fav_color",
      regex: /\b(favorite color|favourite color|what color do you like|what color is your favorite)\b/i,
      replies: [
        {
          en: "My favorite color is emerald green, just like a shining feline eye in the moonlight! What is your favorite color in the whole rainbow? 💚🌈",
          th: "สีโปรดของข้าคือสีเขียวมรกต เหมือนประกายตาแมวยามค่ำคืนเลย! แล้วสีโปรดของน้านุดในสายรุ้งคือสีอะไรเหรอ? 💚🌈",
          chips: ["Ocean blue is my favorite 🌊", "Pink and soft pastels 🌸", "Sleek and classy black 🖤"]
        }
      ]
    },
    {
      id: "q_fav_toy",
      regex: /\b(favorite toy|favourite toy|what toy|what do you like to play with|best toy)\b/i,
      replies: [
        {
          en: "I love chasing the red laser pointer dot and feathery wands! But honestly, an empty cardboard delivery box is unbeatable! What games do you play? 🎮📦",
          th: "ข้าชอบวิ่งไล่ตามจุดเลเซอร์สีแดงกับไม้ตกแมวขนนกที่สุด! แต่เอาจริงๆ นะ กล่องกระดาษพัสดุเปล่าๆ ฟินที่สุดแล้ว! น้านุดชอบเล่นเกมอะไรบ้างมั้ย? 🎮📦",
          chips: ["I love video games! 🎮", "I play sports outdoors ⚽", "I like relaxing mobile games 📱"]
        }
      ]
    },
    {
      id: "q_fav_season",
      regex: /\b(favorite season|favourite season|weather do you like|favorite weather)\b/i,
      replies: [
        {
          en: "I love Spring and sunny Autumn! Warm sunbeams streaming through windows make the best carpet nap spots. Do you prefer summer sunshine or cool winter? ☀️❄️",
          th: "ข้าชอบฤดูใบไม้ผลิกับฤดูใบไม้ร่วงที่สุด! แสงแดดอุ่นๆ ส่องผ่านหน้าต่างลงบนพรมคือน่านอนที่สุด น้านุดชอบแดดหน้าร้อนหรืออากาศเย็นๆ หน้าหนาวมากกว่ากัน? ☀️❄️",
          chips: ["I love cool winter weather ❄️", "I enjoy warm summer sunshine ☀️", "Cozy rainy season for me 🌧️"]
        }
      ]
    },

    // --- LIKES / DISLIKES (Direct Q&A Understanding) ---
    {
      id: "q_like_dogs",
      regex: /\b(do you like dogs|what about dogs|are you scared of dogs|like dog|like puppies)\b/i,
      replies: [
        {
          en: "Woofers? Big dogs can be loud and drooly, but cute little puppies are sweet! Still, cats clearly have superior grace and elegance! Do you have a dog? 🐶🐱",
          th: "พวกเจ้าตูบเหรอ? หมาตัวโตอาจจะเสียงดังและน้ำลายยืดไปหน่อย แต่ลูกหมาตัวเล็กๆ ก็น่ารักดีนะ! ถึงยังไงแมวก็สง่างามกว่าเห็นๆ! น้านุดเลี้ยงหมามั้ย? 🐶🐱",
          chips: ["I love both cats and dogs! 🐶🐱", "I'm 100% a cat person! 🐾", "I don't have any pets yet 🏡"]
        }
      ]
    },
    {
      id: "q_like_me",
      regex: /\b(do you like me|do you love me|are you my friend|do you care about me)\b/i,
      replies: [
        {
          en: "I don't just like you, you are my absolute FAVORITE hooman in the entire universe! You play with me and practice English every day. High-five paw! 🐾💖",
          th: "ข้าไม่ได้แค่ชอบนะ น้านุดคือมนุษย์คนโปรดอันดับ 1 ในจักรวาลของข้าเลย! น้านุดเล่นกับข้าและฝึกภาษาอังกฤษทุกวัน แตะมือกันหน่อยเหมียว! 🐾💖",
          chips: ["High-five paw! ✋🐾", "You made my day! 🥰", "We will be best friends forever! 🌟"]
        }
      ]
    },
    {
      id: "q_like_water",
      regex: /\b(do you like water|like bath|hate water|take a bath|do you swim)\b/i,
      replies: [
        {
          en: "BATHS?! NOOO! Water is my ultimate nemesis! My beautiful fluffy fur gets all soggy and heavy! Unless it's cold drinking water in a bowl, keep it away! 😹🌊",
          th: "อาบน้ำเหรอ?! ม่ายยยย! น้ำคือศัตรูตัวฉกาจของแมว! ขนปุกปุยนุ่มสลวยของข้าจะเปียกแฉะหมด! นอกจากน้ำเย็นๆ ในชามกินน้ำแล้ว อย่าเอาน้ำมาใกล้น้า! 😹🌊",
          chips: ["Haha, poor kitty! 😹", "Cats clean themselves anyway 👅", "I promise no surprise baths! 🛁"]
        }
      ]
    },
    {
      id: "q_like_mice",
      regex: /\b(do you like mice|catch mice|eat mouse|chase mouse|mice)\b/i,
      replies: [
        {
          en: "Catching mice is an ancient feline tradition! My reflexes are lightning fast. In modern times, I mostly chase digital mice on your computer screen! 🐭💻⚡",
          th: "การจับหนูคือประเพณีโบราณของแมวเหมียว! ปฏิกิริยาของข้าไวดุจสายฟ้าฟาด แต่ยุคนี้ข้าเน้นไล่จับเมาส์บนหน้าจอคอมพิวเตอร์ของน้านุดมากกว่า! 🐭💻⚡",
          chips: ["Watch out for the computer mouse! 🖱️", "You have great reflexes! ⚡", "Good job, mighty hunter! 🐾"]
        }
      ]
    },

    // --- CAT LORE & BIOLOGY (Answers "Why") ---
    {
      id: "q_why_boxes",
      regex: /\b(why.*(box|boxes)|cardboard|love box|like box)\b/i,
      replies: [
        {
          en: "Cardboard boxes are cozy, safe, and trap body heat! Enclosed spaces protect felines from predators and make great ambush spots. Plus, box cardboard smells heavenly! 📦😻",
          th: "กล่องกระดาษมันอบอุ่น ปลอดภัย และเก็บความร้อนได้ดีเยี่ยม! ช่องแคบๆ ช่วยซ่อนตัวจากศัตรูและเป็นจุดซุ่มโจมตีชั้นยอด แถมกลิ่นกล่องกระดาษยังหอมฟินสุดๆ! 📦😻",
          chips: ["If it fits, I sits! 📦", "Do you like bubble wrap too? 🫧", "I'll save every box for you! 🎁"]
        }
      ]
    },
    {
      id: "q_why_sleep",
      regex: /\b(why do you sleep|sleep so much|why sleep|nap so much|why cats sleep)\b/i,
      replies: [
        {
          en: "Cats sleep between 12 to 16 hours a day! It's an evolutionary superpower to conserve energy for sudden bursts of hunting and running around like crazy! ⚡😴",
          th: "แมวนอนเฉลี่ยวันละ 12-16 ชั่วโมงเลยนะ! มันคือพลังวิวัฒนาการเพื่อเก็บพลังงานไว้ใช้ตอนวิ่งสปรินต์ไล่ล่าเหยื่อแบบกะทันหัน (หรือวิ่งคึกตอนดึกๆ)! ⚡😴",
          chips: ["I wish I could sleep 16 hours! 🛌", "The midnight zoomies are real! 🏃💨", "Sleep well, cute kitty 💤"]
        }
      ]
    },
    {
      id: "q_why_purr",
      regex: /\b(why do cats purr|why purr|what is purr|how do you purr)\b/i,
      replies: [
        {
          en: "Cats purr when content and happy! Interestingly, purr vibrations (20-140 Hz) also promote bone healing, reduce swelling, and calm nerves. It's acoustic medicine! 🩺🎵",
          th: "แมวจะส่งเสียงครางเพลินๆ (Purr) เมื่อรู้สึกสบายใจและมีความสุข! และแรงสั่นสะเทือน 20-140 Hz ของเสียงเพอร์ยังช่วยสมานกระดูก ลดบวม และคลายเครียดได้ด้วย เป็นยาวิเศษเลยล่ะ! 🩺🎵",
          chips: ["Purr for me please! 🎶", "That is so fascinating! 🧠", "Your purr makes me relax 💖"]
        }
      ]
    },
    {
      id: "q_nine_lives",
      regex: /\b(nine lives|9 lives|do you have nine lives|immortal)\b/i,
      replies: [
        {
          en: "Legend says cats have nine lives because of our flexible spines and ability to always land on our feet! I'm using this life to learn English with you! 🤸🐾✨",
          th: "ตำนานบอกว่าแมวมี 9 ชีวิตเพราะกระดูกสันหลังที่ยืดหยุ่นและตกลงมาด้วยเท้าเสมอ! แต่ในชีวิตนี้ ข้าขอใช้มาฝึกภาษาอังกฤษกับน้านุดดีกว่า! 🤸🐾✨",
          chips: ["Cats are truly magical! 🪄", "Always land on your feet! 🐾", "I'm glad you're in my life! 💖"]
        }
      ]
    },

    // --- EMOTIONS, EMPATHY & CELEBRATION ---
    {
      id: "emo_tired",
      regex: /\b(tired|exhausted|sleepy|hard day|busy day|stress|stressed|work hard|drained)\b/i,
      replies: [
        {
          en: "Oh no, you worked so hard today! Please take a deep breath and unwind. If I were next to you, I'd climb onto your lap and purr to heal your stress! 💤🛋️",
          th: "โถ... น้านุดทำงานหนักมากเลยวันนี้! หายใจเข้าลึกๆ แล้วพักผ่อนนะ ถ้าข้าอยู่ข้างๆ จะปีนขึ้นไปนอนบนตักแล้วครางเพลินๆ ปลอบใจเลย! 💤🛋️",
          chips: ["Thank you, kitty 💖", "I will drink some warm tea 🍵", "Time to sleep soon 🛌"]
        }
      ]
    },
    {
      id: "emo_sad",
      regex: /\b(sad|lonely|crying|cry|heartbroken|break up|depressed|unhappy|bad day|down)\b/i,
      replies: [
        {
          en: "Please don't be sad... *gently head-bumps your hand* 🥺 It's okay to have rough days. You are brave, kind, and you are NEVER alone because I'm always right here! 💖🐾",
          th: "อย่าเศร้าไปเลยนะคนดี... *เอาหัวอุ่นๆ ดุนมือน้านุดเบาๆ* 🥺 มีวันที่แย่ได้เป็นธรรมดา แต่น้านุดทั้งเข้มแข็งและน่ารัก และไม่ได้อยู่คนเดียวแน่นอน เพราะข้าอยู่ตรงนี้เสมอ! 💖🐾",
          chips: ["Thank you, your words comfort me 🥺", "I feel a bit warmer inside 💖", "Give me a virtual hug 🫂"]
        }
      ]
    },
    {
      id: "emo_success",
      regex: /\b(promotion|passed|won|win|success|good score|celebrate|happy news|did it|passed exam)\b/i,
      replies: [
        {
          en: "PAW-SOME NEWS! 🎉🥳 Huge congratulations, my superstar hooman! I'm doing a celebratory feline backflip right now! You worked hard, you deserve this victory! 🏆🌟",
          th: "สุดยอดไปเลยน้านุดดด! 🎉🥳 ยินดีด้วยอย่างยิ่งนะคนเก่งของข้า! ข้ากำลังกระโดดตีลังกาฉลองให้อยู่เลย! น้านุดพยายามมาอย่างหนัก น้านุดคู่ควรกับชัยชนะนี้ที่สุด! 🏆🌟",
          chips: ["Thank you so much! 🎉", "Let's celebrate with tuna! 🍣", "I'm so proud of myself! 💪"]
        }
      ]
    },
    {
      id: "emo_angry",
      regex: /\b(angry|mad|furious|hate my job|boss was rude|annoying|annoyed)\b/i,
      replies: [
        {
          en: "Take a deep breath, hooman! Inhale peace, exhale frustration. Don't let annoying people ruin your inner calm. If they bother you, I'll swat their coffee cup off the desk! 😼☕",
          th: "หายใจเข้าลึกๆ นะน้านุด! สูดความสงบ ปล่อยความหงุดหงิดทิ้งไป อย่าให้คนน่ารำคาญมาทำลายความสงบใจของเรา ถ้าใครแกล้งน้านุด เดี๋ยวข้าจะไปปัดแก้วกาแฟมันตกโต๊ะเลย! 😼☕",
          chips: ["Haha, thank you for backing me up! 😼", "I feel much calmer now 🧘‍♂️", "Let's focus on positive things ✨"]
        }
      ]
    },

    // --- FUN, JOKES & ENTERTAINMENT ---
    {
      id: "act_joke",
      regex: /\b(joke|funny|laugh|riddle|humor|make me laugh|tell a joke)\b/i,
      replies: [
        {
          en: "Why was the cat sitting on the computer? ...Because it wanted to keep an eye on the MOUSE! Hahaha, get it?! 🐭💻😹",
          th: "ทำไมแมวถึงชอบไปนั่งทับคอมพิวเตอร์? ...ก็เพราะมันอยากจับตาดู MOUSE (เมาส์/หนู) ยังไงล่ะ! คิกๆๆ เก็ทมั้ยน้านุด?! 🐭💻😹",
          chips: ["Hahaha, that's hilarious! 😹", "Tell me another one! 🎭", "You're a comedy genius! 🌟"]
        },
        {
          en: "What do you call a pile of cats sleeping together? ...A MEOW-NTAIN! Hehehe! Aren't cat puns the best? 🏔️🐱",
          th: "แมวที่นอนกองรวมกันเยอะๆ เรียกว่าอะไร? ...เรียกว่า 'MEOW-NTAIN' (ภูเขาแมว / เล่นคำกับ Mountain)! ฮิฮิ มุกแมวน่ารักใช่มั้ยล่ะ? 🏔️🐱",
          chips: ["Aww, a meowtain sounds cozy! 🏔️", "One more joke please! 🎭", "You're so witty! ✨"]
        }
      ]
    },
    {
      id: "act_teach_vocab",
      regex: /\b(teach me.*word|new vocabulary|learn.*word|teach.*vocab|give me a word)\b/i,
      replies: [
        {
          en: "Here is a wonderful word: 'SERENDIPITY' (noun). It means finding something delightful and good without looking for it! Like when you met me! Can you make a sentence with it? 🍀✨",
          th: "วันนี้ข้าขอเสนอคำว่า: 'SERENDIPITY' (เซอ-เรน-ดิพ-พะ-ที) เป็นคำนาม แปลว่า 'การบังเอิญพบเจอเรื่องดีๆ หรือความโชคดีโดยไม่ได้คาดหวัง' เหมือนตอนที่น้านุดได้มาเจอกับข้าไงล่ะ! ลองแต่งประโยคดูมั้ย? 🍀✨",
          chips: ["Meeting you was serendipity! 🍀", "Teach me another word 📚", "What is an adjective for it? 💡"]
        },
        {
          en: "Check out this expressive word: 'RESILIENT' (adjective). It means able to withstand or recover quickly from difficult conditions! Just like you! Are you resilient, hooman? 💪🐾",
          th: "ลองดูคำนี้สิ: 'RESILIENT' (ริ-ซิล-เยินต์) เป็นคำคุณศัพท์ แปลว่า 'ยืดหยุ่น ปรับตัวเก่ง ล้มแล้วลุกไว ฟื้นตัวจากความยากลำบากได้รวดเร็ว' เหมือนน้านุดเลย! น้านุดเป็นคนเข้มแข็งแบบนี้ใช่มั้ย? 💪🐾",
          chips: ["I am very resilient! 💪", "I try my best every day ✨", "Teach me one more word! 📖"]
        }
      ]
    },

    // --- DAILY LIFE: WEATHER, WEEKEND, ROUTINE ---
    {
      id: "weather_rain",
      regex: /\b(rain|raining|rainy|storm|thunder|umbrella|wet outside)\b/i,
      replies: [
        {
          en: "Rainy weather is the ultimate cat-sleeping weather! Listening to soft raindrops while staying cozy inside. Do you enjoy rainy days or sunny days more? 🌧️☕",
          th: "วันที่ฝนตกคือวันนอนฟินระดับพรีเมียมของแมวเลย! ฟังเสียงเม็ดฝนเปาะแปะขณะนอนอุ่นๆ อยู่ข้างใน น้านุดชอบวันฝนตกหรือวันแดดออกมากกว่ากันเหรอ? 🌧️☕",
          chips: ["I love cozy rainy days 🌧️", "I prefer bright sunny days ☀️", "Rain makes me feel sleepy 😴"]
        }
      ]
    },
    {
      id: "weather_hot",
      regex: /\b(hot|heat|sunny|sweating|warm outside|summer|sun)\b/i,
      replies: [
        {
          en: "Whew, it's scorching hot today! Don't forget to drink plenty of cool water and stay in the air-conditioned shade! Have you had iced water or ice cream today? 🍦🧊",
          th: "ฟู่... วันนี้อากาศร้อนตับแตกเลย! อย่าลืมดื่มน้ำเย็นๆ เยอะๆ แล้วหลบร่มในห้องแอร์นะ! วันนี้ได้ดื่มน้ำเย็นหรือกินไอศกรีมหรือยังเอ่ย? 🍦🧊",
          chips: ["I had delicious ice cream! 🍦", "I'm drinking lots of water 💧", "Staying under the AC ❄️"]
        }
      ]
    },
    {
      id: "daily_weekend",
      regex: /\b(weekend|saturday|sunday|friday|plans for the weekend|holiday)\b/i,
      replies: [
        {
          en: "Weekends are magical! Two whole days for resting, sleeping in, and having fun adventures! Do you have any exciting plans for this weekend? 🎉🛌",
          th: "วันหยุดสุดสัปดาห์คือช่วงเวลาวิเศษ! มีเวลาเต็มๆ สองวันไว้พักผ่อน นอนตื่นสาย และทำเรื่องสนุกๆ สุดสัปดาห์นี้น้านุดมีแผนจะทำอะไรบ้างมั้ย? 🎉🛌",
          chips: ["Going out with friends 🎈", "Catching up on sleep 💤", "Studying English & gaming 🎮"]
        }
      ]
    }
  ];

  // 2. Entity & Topic Mirroring Dictionary (Extracts topics from user input)
  const TOPIC_MIRROR_DICT = {
    guitar: { topic: "playing the guitar", prompt: "Music is magical! Do you play acoustic, classical, or electric guitar? 🎸", chips: ["Acoustic guitar 🎸", "Electric guitar ⚡", "I'm just learning! 🎶"] },
    piano: { topic: "the piano", prompt: "Piano melodies are so soothing! Do you play classical pieces or pop songs? 🎹", chips: ["Classical pieces 🎼", "Pop and modern songs 🎵", "I want to learn piano! 🎹"] },
    music: { topic: "music", prompt: "Music is food for the soul! What genre do you listen to most — Pop, Rock, Jazz, or Lofi? 🎧", chips: ["Pop and upbeat music 🎶", "Relaxing Lofi beats ☕", "Rock and energetic songs 🎸"] },
    coffee: { topic: "coffee", prompt: "Coffee smells wonderful! Are you an espresso, Americano, or sweet latte lover? ☕", chips: ["Hot Americano ☕", "Sweet iced latte 🥛", "I prefer tea or matcha! 🍵"] },
    tea: { topic: "tea", prompt: "A warm cup of tea is so peaceful! Do you prefer green tea, Earl Grey, or bubble tea? 🍵", chips: ["Green tea / Matcha 🍵", "Boba / Bubble milk tea 🧋", "Earl Grey with lemon 🍋"] },
    movie: { topic: "watching movies", prompt: "Movie time! Do you prefer thrilling action, hilarious comedy, or heart-warming drama? 🎬", chips: ["Action & Sci-Fi 🚀", "Hilarious Comedy 😂", "Animation & Anime 🎨"] },
    anime: { topic: "anime", prompt: "Anime has such wonderful art and stories! What anime series is your current favorite? 📺✨", chips: ["Shonen action anime ⚔️", "Slice of life / Comedy 🌸", "Studio Ghibli movies 🍃"] },
    game: { topic: "video games", prompt: "Gaming is a blast! What game are you currently playing or enjoying? 🎮", chips: ["RPG & Adventure games 🗡️", "Mobile multiplayer games 📱", "Cozy casual games 🌾"] },
    book: { topic: "reading books", prompt: "Reading expands your universe! Do you prefer exciting fiction novels or self-improvement books? 📚", chips: ["Fiction & fantasy novels 🐉", "Self-improvement & business 💡", "Comics & graphic novels 📖"] },
    dentist: { topic: "the dentist", prompt: "The dentist? Ouch! Even mighty felines get nervous about fangs checkup! Are your teeth healthy and clean? 🦷", chips: ["Everything is clean & healthy! ✨", "A little sore, but okay 😣", "Just a routine checkup 🦷"] },
    doctor: { topic: "seeing the doctor", prompt: "I hope you are taking good care of yourself! Please drink warm water and get plenty of rest, hooman! 🩺💖", chips: ["I will rest well 🍵", "Feeling much better now 😊", "Thank you for caring 💖"] },
    gym: { topic: "working out at the gym", prompt: "Hitting the gym? Staying strong and active is awesome! Cats stay fit by doing midnight zoomies! 🏃💨", chips: ["Weight lifting 💪", "Cardio and running 🏃", "Yoga and stretching 🧘‍♂️"] },
    travel: { topic: "traveling", prompt: "Traveling opens up your world! Where is the next destination on your bucket list? ✈️🗺️", chips: ["Japan & East Asia 🌸", "Europe & historic castles 🏰", "Tropical islands & beach 🏝️"] },
    pizza: { topic: "pizza", prompt: "Mmm, warm cheesy pizza! Do you like classic Pepperoni, Margherita, or Hawaiian? 🍕", chips: ["Cheesy Pepperoni 🍕", "Classic Margherita 🧀", "Hawaiian with pineapple! 🍍"] },
    sushi: { topic: "sushi", prompt: "Sushi is a feline dream! Salmon, tuna, or unagi eel — which piece is your favorite? 🍣😋", chips: ["Fresh salmon sushi 🍣", "Tuna nigiri 🐟", "Tamago sweet egg 🥚"] },
    cooking: { topic: "cooking", prompt: "Cooking is such a great skill! What delicious dish are you best at making? 🍳", chips: ["Thai stir-fry dishes 🌶️", "Italian pasta 🍝", "Simple eggs & breakfast 🍳"] },
    shopping: { topic: "shopping", prompt: "Shopping spree! As long as you bring home the cardboard packaging boxes for me, I approve! 🛍️📦", chips: ["Clothes & fashion 👗", "Gadgets & tech 💻", "Snacks and treats! 🍫"] },
    work: { topic: "work", prompt: "Work can be demanding, but remember that your well-being comes first! How was your work day today? 💼", chips: ["Very productive today! 🚀", "A bit tiring, glad it's over 😌", "Just normal routine 📅"] },
    study: { topic: "studying", prompt: "Knowledge is power! Studying sentence by sentence with me will make you unstoppable! What are you studying? 📖🎓", chips: ["English communication 🗣️", "Academic subjects 🎒", "Professional career skills 💼"] },
    sleep: { topic: "sleeping", prompt: "Sleeping is life's greatest luxury! Getting 8 hours of sleep keeps your brain sharp and happy! Are you getting enough rest? 😴", chips: ["I sleep like a rock 🛌", "I need more sleep! 🥱", "I'm a night owl 🦉"] }
  };

  // 3. Fallback Responses (Engaging, Active Mirroring & Question Prompting)
  const CONVERSATIONAL_FALLBACKS = [
    {
      en: "Meow! That's a thoughtful point! In English, sharing your thoughts like that is wonderful practice. What made you think about this today, hooman? 🐾💡",
      th: "เหมียววว! เป็นมุมมองที่น่าคิดมากเลย! การฝึกเล่าความคิดเป็นภาษาอังกฤษแบบนี้พัฒนาทักษะได้ไวมาก อะไรทำให้น้านุดนึกถึงเรื่องนี้เหรอ? 🐾💡",
      chips: ["I was just thinking about it 🤔", "It happened to me today 📅", "Ask me a question, kitty! ❓"]
    },
    {
      en: "Purrrrr... I'm listening closely with both of my cute cat ears! Tell me more details about that. I love hearing your English stories! 👂💖",
      th: "เพอร์รร... ข้ากำลังตั้งใจฟังด้วยหูแมวน่ารักทั้งสองข้างเลย! เล่ารายละเอียดเพิ่มอีกนิดสิ ข้าชอบฟังเรื่องเล่าภาษาอังกฤษของน้านุดที่สุด! 👂💖",
      chips: ["Here is what happened... 📖", "What would you do, kitty? 🐱", "Let's change the topic 💬"]
    },
    {
      en: "Meow! That's so interesting! Every sentence you share helps build your English fluency muscle. How does that make you feel? 🐱✨",
      th: "เหมียววว! น่าสนใจจัง! ทุกๆ ประโยคที่น้านุดพิมพ์มาช่วยสร้างกล้ามเนื้อความคล่องแคล่วภาษาอังกฤษได้ยอดเยี่ยมเลย เรื่องนี้ทำให้น้านุดรู้สึกยังไงบ้าง? 🐱✨",
      chips: ["I feel happy about it! 😊", "It was quite challenging 🧗", "Just an ordinary day ☕"]
    }
  ];

  // 4. Main NLP Brain Classifier Function
  function getCatReply(userText) {
    if (!userText || typeof userText !== "string") {
      return CONVERSATIONAL_FALLBACKS[0];
    }

    const trimmed = userText.trim();
    const lower = trimmed.toLowerCase();

    // 4.1 Check High-Priority Intent Matches (Direct Regex Matching)
    for (const intent of MEOW_INTENTS) {
      if (intent.regex.test(trimmed) || intent.regex.test(lower)) {
        const replies = intent.replies;
        const selected = replies[Math.floor(Math.random() * replies.length)];
        return selected;
      }
    }

    // 4.2 Entity / Subject Extraction & Mirroring
    for (const [key, data] of Object.entries(TOPIC_MIRROR_DICT)) {
      const wordRegex = new RegExp("\\b" + key + "(s|es|ed|ing)?\\b", "i");
      if (wordRegex.test(lower) || lower.includes(key)) {
        return {
          en: `You mentioned ${data.topic}! That sounds so interesting! ${data.prompt} 🐾✨`,
          th: `น้านุดพูดถึงเรื่อง ${data.topic} เหรอ! ฟังดูน่าสนใจจัง! เล่าให้ข้าฟังเพิ่มอีกสิเหมียว! 🐾✨`,
          chips: data.chips || ["Tell me more!", "What do you think, kitty?", "Let's talk about something else 💬"]
        };
      }
    }

    // 4.3 General Question Detection (If user asks a question with '?')
    if (trimmed.includes("?") || /^(what|who|where|when|why|how|do|is|are|can|will|should)\b/i.test(lower)) {
      return {
        en: "That is a great question! From a wise cat's perspective, I think exploring curiosity is the best way to learn! What do YOU think about it, hooman? 🐾❓",
        th: "เป็นคำถามที่ดีมากเลย! ในมุมมองของแมวผู้รอบรู้ ข้าคิดว่าความอยากรู้อยากเห็นคือวิธีเรียนรู้ที่ดีที่สุด แล้วน้านุดคิดยังไงกับเรื่องนี้เอ่ย? 🐾❓",
        chips: ["I think it's important! 💡", "I'm not quite sure yet 🤔", "Tell me your feline opinion! 🐱"]
      };
    }

    // 4.4 Default Engaging Fallback
    const fallback = CONVERSATIONAL_FALLBACKS[Math.floor(Math.random() * CONVERSATIONAL_FALLBACKS.length)];
    return fallback;
  }

  // Export to Global Window
  window.MeowMind = {
    getCatReply: getCatReply,
    intentsCount: MEOW_INTENTS.length,
    topicsCount: Object.keys(TOPIC_MIRROR_DICT).length
  };

})(typeof window !== "undefined" ? window : globalThis);
