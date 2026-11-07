/**
 * MeowQuest - TOEIC, TOEFL & Executive Business Vocabulary Decks
 * Specially designed for Thai working professionals (คนทำงาน / ทาสแมวสายออฟฟิศ)
 * Real meeting contexts, email templates, and corporate documentation.
 */

const VOCAB_DECKS = {
  toeic: {
    id: "toeic",
    title: "TOEIC Workplace Essentials",
    titleTh: "คำศัพท์ TOEIC สำหรับงานออฟฟิศและสัญญา",
    cefrLevel: "B1 - B2",
    cefrBand: "CEFR B1-B2 (TOEIC 550 - 785)",
    icon: "🎯",
    badgeColor: "#ff7b54",
    description: "ศัพท์ที่พบบ่อยที่สุดในข้อสอบ TOEIC และอีเมล สัญญา การประชุมทางธุรกิจ",
    words: [
      {
        id: "w_collab",
        cefrLevel: "B1",
        word: "Collaborate",
        phonetic: "/kəˈlæb.ə.reɪt/",
        pos: "Verb",
        meaningTh: "ร่วมมือ ทำงานร่วมกัน (ระหว่างทีมหรือบริษัท)",
        contextTag: "Team Meeting",
        exampleEn: "We need to collaborate closely with the marketing team to finalize the product launch by Friday.",
        exampleTh: "พวกเราจำเป็นต้องร่วมมืออย่างใกล้ชิดกับทีมการตลาดเพื่อสรุปแผนเปิดตัวสินค้าให้ทันภายในวันศุกร์นี้",
        collocations: "collaborate with, collaborate on a project"
      },
      {
        id: "w_feasibility",
        cefrLevel: "B2",
        word: "Feasibility",
        phonetic: "/ˌfiː.zəˈbɪl.ə.ti/",
        pos: "Noun",
        meaningTh: "ความเป็นไปได้ (ในทางปฏิบัติ งบประมาณ หรือเทคนิค)",
        contextTag: "Project Planning",
        exampleEn: "The committee is currently conducting a feasibility study before approving the multi-million dollar expansion.",
        exampleTh: "คณะกรรมการกำลังดำเนินการศึกษาความเป็นไปได้ ก่อนจะอนุมัติโครงการขยายสาขามูลค่าหลายล้านดอลลาร์",
        collocations: "feasibility study, economic feasibility"
      },
      {
        id: "w_discrepancy",
        cefrLevel: "B2",
        word: "Discrepancy",
        phonetic: "/dɪˈskrep.ən.si/",
        pos: "Noun",
        meaningTh: "ความคลาดเคลื่อน ความไม่ตรงกันของตัวเลขหรือข้อมูล",
        contextTag: "Audit & Finance",
        exampleEn: "Our accounting team found a significant discrepancy between the monthly invoice and our bank statement.",
        exampleTh: "ทีมบัญชีของเราพบความคลาดเคลื่อนอย่างมีนัยสำคัญระหว่างใบแจ้งหนี้ประจำเดือนกับรายการเดินบัญชีธนาคาร",
        collocations: "discrepancy between, unexplained discrepancy"
      },
      {
        id: "w_implement",
        cefrLevel: "B1",
        word: "Implement",
        phonetic: "/ˈɪm.plɪ.ment/",
        pos: "Verb",
        meaningTh: "นำไปปฏิบัติจริง ดำเนินการตามแผนหรือนโยบาย",
        contextTag: "Company Policy",
        exampleEn: "Management plans to implement the new remote work guidelines starting from next quarter.",
        exampleTh: "ฝ่ายบริหารมีแผนที่จะเริ่มนำแนวทางการทำงานแบบรีโมทชุดใหม่ไปปฏิบัติจริงตั้งแต่ไตรมาสหน้า",
        collocations: "implement a policy, implement changes"
      },
      {
        id: "w_comprehensive",
        word: "Comprehensive",
        phonetic: "/ˌkɒm.prɪˈhen.sɪv/",
        pos: "Adjective",
        meaningTh: "ครอบคลุม ละเอียดถี่ถ้วน รอบด้าน",
        contextTag: "Documentation",
        exampleEn: "Please review the comprehensive audit report attached to this email before tomorrow's board review.",
        exampleTh: "กรุณาตรวจสอบรายงานการตรวจสอบฉบับครอบคลุมรอบด้านที่แนบมากับอีเมลนี้ ก่อนการประชุมบอร์ดในวันพรุ่งนี้",
        collocations: "comprehensive report, comprehensive training"
      },
      {
        id: "w_contingency",
        cefrLevel: "B2",
        word: "Contingency",
        phonetic: "/kənˈtɪn.dʒən.si/",
        pos: "Noun",
        meaningTh: "แผนสำรอง แผนรับมือเหตุการณ์ไม่คาดฝัน",
        contextTag: "Risk Management",
        exampleEn: "We must prepare a contingency plan in case the overseas shipment gets delayed due to bad weather.",
        exampleTh: "เราต้องเตรียมแผนสำรองฉุกเฉินไว้ เผื่อในกรณีที่การขนส่งทางเรือจากต่างประเทศล่าช้าเนื่องจากสภาพอากาศเลวร้าย",
        collocations: "contingency plan, contingency fund"
      }
    ]
  },
  toefl: {
    id: "toefl",
    title: "TOEFL Academic & Strategy",
    titleTh: "คำศัพท์ TOEFL สายวิชาการ & กลยุทธ์ระดับสูง",
    icon: "🎓",
    badgeColor: "#9b5de5",
    description: "ศัพท์ทางการระดับสูงสำหรับการอ่านรายงานวิเคราะห์ การเขียนงานวิจัย และการสื่อสารเชิงกลยุทธ์",
    words: [
      {
        id: "w_benchmark",
        word: "Benchmark",
        phonetic: "/ˈbentʃ.mɑːk/",
        pos: "Noun / Verb",
        meaningTh: "เกณฑ์มาตรฐาน การเทียบเคียงผลการดำเนินงาน",
        contextTag: "Strategy Analysis",
        exampleEn: "This quarter's customer satisfaction scores will serve as a benchmark for future service improvements.",
        exampleTh: "คะแนนความพึงพอใจของลูกค้าในไตรมาสนี้จะถูกใช้เป็นเกณฑ์มาตรฐานเทียบเคียงสำหรับการปรับปรุงงานบริการในอนาคต",
        collocations: "set a benchmark, benchmark against competitors"
      },
      {
        id: "w_consensus",
        word: "Consensus",
        phonetic: "/kənˈsen.səs/",
        pos: "Noun",
        meaningTh: "ฉันทามติ ความเห็นพ้องต้องกันของที่ประชุม",
        contextTag: "Board Meeting",
        exampleEn: "After hours of deliberation, the board members finally reached a consensus on the annual budget allocation.",
        exampleTh: "หลังจากการหารือกันนานหลายชั่วโมง สมาชิกบอร์ดบริหารก็ได้ฉันทามติเห็นพ้องต้องกันเกี่ยวกับการจัดสรรงบประมาณประจำปี",
        collocations: "reach a consensus, general consensus"
      },
      {
        id: "w_prerequisite",
        word: "Prerequisite",
        phonetic: "/ˌpriːˈrek.wɪ.zɪt/",
        pos: "Noun / Adjective",
        meaningTh: "ข้อกำหนดเบื้องต้น สิ่งจำเป็นที่ต้องมีก่อน",
        contextTag: "HR & Recruitment",
        exampleEn: "Fluency in spoken English and at least five years of leadership experience are prerequisites for this senior role.",
        exampleTh: "ความคล่องแคล่วในการพูดภาษาอังกฤษและประสบการณ์การเป็นผู้นำอย่างน้อย 5 ปี เป็นข้อกำหนดเบื้องต้นสำหรับตำแหน่งผู้บริหารนี้",
        collocations: "prerequisite for, essential prerequisite"
      },
      {
        id: "w_substantial",
        word: "Substantial",
        phonetic: "/səbˈstæn.ʃəl/",
        pos: "Adjective",
        meaningTh: "มากมาย มีสาระสำคัญ อย่างเห็นได้ชัด",
        contextTag: "Financial Summary",
        exampleEn: "The digital transformation initiative generated substantial cost savings across all regional branches.",
        exampleTh: "โครงการปรับเปลี่ยนสู่ระบบดิจิทัลช่วยประหยัดต้นทุนได้อย่างมากมายมหาศาลในทุกสาขาทั่วภูมิภาค",
        collocations: "substantial amount, substantial increase"
      },
      {
        id: "w_disseminate",
        word: "Disseminate",
        phonetic: "/dɪˈsem.ɪ.neɪt/",
        pos: "Verb",
        meaningTh: "เผยแพร่ กระจายข้อมูลข่าวสารไปยังวงกว้าง",
        contextTag: "Corporate Comms",
        exampleEn: "The human resources department will disseminate the updated safety guidelines via the internal portal today.",
        exampleTh: "ฝ่ายทรัพยากรบุคคลจะทำการเผยแพร่กระจายคู่มือความปลอดภัยฉบับปรับปรุงใหม่ผ่านพอร์ทัลภายในองค์กรในวันนี้",
        collocations: "disseminate information, disseminate findings"
      },
      {
        id: "w_facet",
        cefrLevel: "B2",
        word: "Facet",
        phonetic: "/ˈfæs.ɪt/",
        pos: "Noun",
        meaningTh: "แง่มุม ด้านใดด้านหนึ่งของปัญหาหรือสถานการณ์",
        contextTag: "Problem Solving",
        exampleEn: "We must analyze every facet of the supply chain disruption before presenting solutions to key clients.",
        exampleTh: "เราต้องวิเคราะห์ทุกแง่มุมของปัญหาการหยุดชะงักในห่วงโซ่อุปทาน ก่อนจะนำเสนอแนวทางแก้ไขให้แก่ลูกค้ารายสำคัญ",
        collocations: "every facet of, multiple facets"
      }
    ]
  },
  business: {
    id: "business",
    title: "Executive Business English",
    titleTh: "ภาษาอังกฤษเจรจาธุรกิจระดับผู้บริหาร",
    cefrLevel: "B2 - C1",
    cefrBand: "CEFR B2-C1 (TOEIC 785 - 990 / Executive)",
    icon: "💼",
    badgeColor: "#67c29c",
    description: "ศัพท์และประโยคระดับ C-Level สำหรับการต่อรองราคา การโน้มน้าวใจในที่ประชุม และการนำเสนอดีล",
    words: [
      {
        id: "w_leverage",
        cefrLevel: "B2",
        word: "Leverage",
        phonetic: "/ˈliː.vər.ɪdʒ/",
        pos: "Verb / Noun",
        meaningTh: "ใช้ประโยชน์จากสิ่งที่มีให้เกิดผลลัพธ์สูงสุด (ต่อยอดความได้เปรียบ)",
        contextTag: "Negotiation",
        exampleEn: "We should leverage our strong brand reputation to negotiate more favorable contract terms with suppliers.",
        exampleTh: "เราควรใช้ประโยชน์จากชื่อเสียงแบรนด์อันแข็งแกร่งของเราเพื่อต่อรองเงื่อนไขสัญญาที่เอื้อประโยชน์ต่อเรามากขึ้นกับซัพพลายเออร์",
        collocations: "leverage assets, leverage technology"
      },
      {
        id: "w_facilitate",
        cefrLevel: "B2",
        word: "Facilitate",
        phonetic: "/fəˈsɪl.ɪ.teɪt/",
        pos: "Verb",
        meaningTh: "อำนวยความสะดวก ขับเคลื่อนให้กระบวนการราบรื่น",
        contextTag: "Cross-team Sync",
        exampleEn: "Our team will facilitate the weekly sync meetings to ensure seamless communication between engineering and sales.",
        exampleTh: "ทีมของเราจะคอยอำนวยความสะดวกในการประชุมประสานงานประจำสัปดาห์ เพื่อให้การสื่อสารระหว่างทีมวิศวกรกับฝ่ายขายราบรื่นไร้รอยต่อ",
        collocations: "facilitate a discussion, facilitate growth"
      },
      {
        id: "w_remuneration",
        cefrLevel: "C1",
        word: "Remuneration",
        phonetic: "/rɪˌmjuː.nərˈeɪ.ʃən/",
        pos: "Noun",
        meaningTh: "ค่าตอบแทน สิทธิประโยชน์และเงินเดือน",
        contextTag: "Compensation & HR",
        exampleEn: "The executive package includes competitive base salary and performance-based remuneration.",
        exampleTh: "แพ็กเกจสำหรับผู้บริหารประกอบด้วยเงินเดือนพื้นฐานที่น่าดึงดูด และค่าตอบแทนเพิ่มเติมตามผลการดำเนินงานจริง",
        collocations: "remuneration package, fair remuneration"
      },
      {
        id: "w_expedite",
        cefrLevel: "B2",
        word: "Expedite",
        phonetic: "/ˈek.spə.daɪt/",
        pos: "Verb",
        meaningTh: "เร่งรัด ดำเนินการให้เสร็จรวดเร็วขึ้นเป็นกรณีพิเศษ",
        contextTag: "Client Request",
        exampleEn: "Could you please expedite the legal review of this agreement so we can sign the contract before the deadline?",
        exampleTh: "รบกวนช่วยเร่งรัดการตรวจสอบทางกฎหมายของสัญญาฉบับนี้เป็นพิเศษได้ไหมครับ เพื่อให้เราสามารถลงนามได้ทันก่อนกำหนดเส้นตาย",
        collocations: "expedite the process, expedite delivery"
      },
      {
        id: "w_allocate",
        cefrLevel: "B2",
        word: "Allocate",
        phonetic: "/ˈæl.ə.keɪt/",
        pos: "Verb",
        meaningTh: "จัดสรร แบ่งสรรปันส่วน (งบประมาณ บุคลากร หรือเวลา)",
        contextTag: "Budget Planning",
        exampleEn: "The leadership team decided to allocate 20% of next year's budget to artificial intelligence training.",
        exampleTh: "ทีมผู้นำระดับสูงตัดสินใจจัดสรร 20% ของงบประมาณปีหน้าสำหรับการฝึกอบรมด้านปัญญาประดิษฐ์ให้แก่พนักงาน",
        collocations: "allocate resources, allocate budget"
      },
      {
        id: "w_alignment",
        cefrLevel: "B2",
        word: "Alignment",
        phonetic: "/əˈlaɪn.mənt/",
        pos: "Noun",
        meaningTh: "ความสอดคล้องไปในทิศทางเดียวกัน การเห็นพ้องต้องกันของเป้าหมาย",
        contextTag: "Executive Strategy",
        exampleEn: "We need full strategic alignment across all department heads before presenting our 5-year vision to investors.",
        exampleTh: "พวกเราต้องการความสอดคล้องทางกลยุทธ์ร่วมกันจากหัวหน้าทุกแผนก ก่อนจะนำเสนอวิสัยทัศน์ 5 ปีให้แก่นักลงทุน",
        collocations: "strategic alignment, in alignment with"
      }
    ]
  }
};
