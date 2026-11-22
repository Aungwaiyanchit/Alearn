import type {
  TenseComparisonRow,
  TenseLesson,
  WritingTip,
} from "@/types/guide";

export const TENSE_LESSONS: TenseLesson[] = [
  // ── CORE TENSES (6) ────────────────────────────────────────────
  {
    id: "present-simple",
    title: "Present Simple",
    burmeseTitle: "ပစ္စုပ္ပန်ရိုးရိုးကာလ",
    track: "tenses",
    subgroup: "Present",
    level: "beginner",
    summary:
      "Use for daily routines, general facts, permanent situations, and habits.",
    burmeseSummary:
      "နေ့စဉ်လုပ်နေကျအလေ့အကျင့်များ၊ ယေဘုယျအမှန်တရားများနှင့် အမြဲတမ်းအခြေအနေများအတွက် သုံးသည်။",
    timelineType: "habit",
    timelineCaption: "Repeats regularly across past, present, and future",
    formula: {
      positive: "Subject + V1 (add -s / -es for he, she, it)",
      negative: "Subject + do / does + not + V1",
      question: "Do / Does + Subject + V1 ...?",
    },
    whenToUse: [
      "Daily habits and routines (every day, usually, always)",
      "Facts and permanent states (Water boils at 100°C. I live in Yangon.)",
      "Schedules and timetables (The train leaves at 8 AM.)",
    ],
    signalWords: [
      "every day",
      "always",
      "usually",
      "often",
      "sometimes",
      "never",
    ],
    examples: [
      {
        id: "ps-1",
        burmese: "ကျွန်တော် အင်္ဂလိပ်စာကို နေ့တိုင်း လေ့ကျင့်တယ်။",
        english: "I practice English every day.",
        highlight: "practice",
        note: "With 'I / you / we / they', keep the base verb (V1).",
      },
      {
        id: "ps-2",
        burmese: "သူမက မနက်တိုင်း ကော်ဖီသောက်တယ်။",
        english: "She drinks coffee every morning.",
        highlight: "drinks",
        note: "Add '-s' to the verb for third-person singular (he / she / it).",
      },
      {
        id: "ps-3",
        burmese: "ဒီဘတ်စ်ကားက မြို့လယ်ခေါင်ကို ရောက်သလား။",
        english: "Does this bus go downtown?",
        highlight: "Does ... go",
        note: "After 'does', return the main verb back to base form ('go').",
      },
    ],
    mistake: {
      wrong: "She work in an office every day.",
      correct: "She works in an office every day.",
      reason:
        "Don't forget the third-person '-s' after he, she, it, or singular nouns.",
    },
    practiceCategoryId: "cat-daily",
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    burmeseTitle: "ပစ္စုပ္ပန်ဆက်လက်ဖြစ်ပွားကာလ",
    track: "tenses",
    subgroup: "Present",
    level: "beginner",
    summary:
      "Use for actions happening right now, temporary projects, or arranged near-future plans.",
    burmeseSummary:
      "အခုလက်ရှိ ဖြစ်ပွားနေသော လုပ်ရပ်များ၊ ယာယီလုပ်နေသော အရာများနှင့် မကြာမီလုပ်မည့် အစီအစဉ်များအတွက် သုံးသည်။",
    timelineType: "now-ongoing",
    timelineCaption: "In progress at the exact moment of speaking",
    formula: {
      positive: "Subject + am / is / are + V-ing",
      negative: "Subject + am / is / are + not + V-ing",
      question: "Am / Is / Are + Subject + V-ing ...?",
    },
    whenToUse: [
      "Actions happening right this moment (right now, at the moment)",
      "Temporary situations happening around now (this week, these days)",
      "Fixed personal plans in the near future (I am meeting him tomorrow.)",
    ],
    signalWords: [
      "right now",
      "now",
      "at the moment",
      "currently",
      "these days",
      "this week",
    ],
    examples: [
      {
        id: "pc-1",
        burmese: "ကျွန်တော် အခုပဲ လာနေပါပြီ။",
        english: "I am coming right now.",
        highlight: "am coming",
        note: "Drop silent '-e' before adding '-ing' (come → coming, write → writing).",
      },
      {
        id: "pc-2",
        burmese: "သူတို့ ဒီအပတ်မှာ ပရောဂျက်အသစ်တစ်ခု လုပ်နေကြတယ်။",
        english: "They are working on a new project this week.",
        highlight: "are working",
        note: "Describes a temporary focus happening around the present period.",
      },
    ],
    mistake: {
      wrong: "I am knowing the answer.",
      correct: "I know the answer.",
      reason:
        "Stative verbs (know, believe, like, want, agree) normally use Present Simple, not -ing.",
    },
    practiceCategoryId: "cat-daily",
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    burmeseTitle: "ပစ္စုပ္ပန်ပြီးစီးကာလ",
    track: "tenses",
    subgroup: "Present",
    level: "intermediate",
    summary:
      "Connects the past to the present: life experiences, duration up to now, or recent results.",
    burmeseSummary:
      "အတိတ်မှာစတင်ပြီး ယခုထိဆက်စပ်နေသော အခြေအနေများ၊ အတွေ့အကြုံများနှင့် ယခုအပေါ်သက်ရောက်မှုရှိသော လုပ်ရပ်များအတွက် သုံးသည်။",
    timelineType: "past-to-now",
    timelineCaption: "Started in the past and connects directly to NOW",
    formula: {
      positive: "Subject + have / has + V3 (Past Participle)",
      negative: "Subject + have / has + not + V3",
      question: "Have / Has + Subject + V3 ...?",
    },
    whenToUse: [
      "Duration from past up to now with 'for' (5 years) or 'since' (2021)",
      "Life experiences without a specific past date (ever, never, before)",
      "Past actions with a visible result right now (Technology has made life easier.)",
    ],
    signalWords: [
      "for",
      "since",
      "already",
      "yet",
      "just",
      "ever",
      "never",
      "recently",
    ],
    examples: [
      {
        id: "pp-1",
        burmese: "ကျွန်တော် ဒီမြို့မှာ နေထိုင်လာတာ ငါးနှစ် ရှိပါပြီ။",
        english: "I have lived in this city for five years.",
        highlight: "have lived ... for five years",
        note: "Use 'for' + duration; use 'since' + starting point (since 2021).",
      },
      {
        id: "pp-2",
        burmese: "နည်းပညာက ကျွန်တော်တို့ရဲ့ ဘဝကို ပိုပြီး လွယ်ကူစေခဲ့တယ်။",
        english: "Technology has made our lives much easier.",
        highlight: "has made",
        note: "The change happened over time and we still feel the result today.",
      },
    ],
    mistake: {
      wrong: "I have finished the book last night.",
      correct: "I finished the book last night.",
      reason:
        "Never use Present Perfect with finished past time words like 'yesterday' or 'last night'.",
    },
    practiceCategoryId: "cat-grammar",
  },
  {
    id: "past-simple",
    title: "Past Simple",
    burmeseTitle: "အတိတ်ရိုးရိုးကာလ",
    track: "tenses",
    subgroup: "Past",
    level: "beginner",
    summary:
      "Use for completed actions at a specific finished time in the past.",
    burmeseSummary:
      "အတိတ်က သတ်မှတ်ထားသော အချိန်တစ်ခုတွင် ပြီးဆုံးသွားပြီဖြစ်သော လုပ်ရပ်များအတွက် သုံးသည်။",
    timelineType: "past-point",
    timelineCaption: "Happened and completely finished in the past",
    formula: {
      positive: "Subject + V2 (regular -ed or irregular verb)",
      negative: "Subject + did not (didn't) + V1",
      question: "Did + Subject + V1 ...?",
    },
    whenToUse: [
      "Completed events with a specific past time (yesterday, last night, in 2022)",
      "A sequence of events in a story (I woke up, had tea, and went to work.)",
      "Past facts or states that are finished",
    ],
    signalWords: [
      "yesterday",
      "last night",
      "last week",
      "two days ago",
      "in 2023",
    ],
    examples: [
      {
        id: "past-1",
        burmese: "မနေ့ညက ကျွန်တော် စာအုပ်တစ်အုပ် ဖတ်ပြီးသွားပြီ။",
        english: "I finished reading a book last night.",
        highlight: "finished",
        note: "'Last night' locks the sentence into Past Simple.",
      },
      {
        id: "past-2",
        burmese: "သူမက မနေ့က အစည်းအဝေးကို မတက်ခဲ့ဘူး။",
        english: "She did not attend the meeting yesterday.",
        highlight: "did not attend",
        note: "After 'did not', keep the base verb ('attend', not 'attended').",
      },
    ],
    mistake: {
      wrong: "Did you went to the meeting?",
      correct: "Did you go to the meeting?",
      reason:
        "Once 'did' carries the past tense, the main verb returns to base form (V1).",
    },
    practiceCategoryId: "cat-grammar",
  },
  {
    id: "past-continuous",
    title: "Past Continuous",
    burmeseTitle: "အတိတ်ဆက်လက်ဖြစ်ပွားကာလ",
    track: "tenses",
    subgroup: "Past",
    level: "intermediate",
    summary:
      "Shows an ongoing background action in the past, often interrupted by a shorter Past Simple event.",
    burmeseSummary:
      "အတိတ်က အချိန်တစ်ခုတွင် ဆက်လက်ဖြစ်ပွားနေသော လုပ်ရပ် (သို့) နောက်ထပ်အဖြစ်အပျက်တစ်ခု ဝင်လာချိန်တွင် လုပ်နေခဲ့သော အရာအတွက် သုံးသည်။",
    timelineType: "past-ongoing",
    timelineCaption: "Longer background action in progress in the past",
    formula: {
      positive: "Subject + was / were + V-ing",
      negative: "Subject + was / were + not + V-ing",
      question: "Was / Were + Subject + V-ing ...?",
    },
    whenToUse: [
      "Background action interrupted by another event (I was cooking when he arrived.)",
      "Two actions happening at the same time in the past (while)",
      "Describing what was happening at an exact clock time yesterday",
    ],
    signalWords: ["when", "while", "as", "at 8 PM yesterday"],
    examples: [
      {
        id: "pastc-1",
        burmese: "သူ ရောက်လာတဲ့အချိန်မှာ ကျွန်တော် ညစာ ချက်နေခဲ့တယ်။",
        english: "I was cooking dinner when he arrived.",
        highlight: "was cooking ... arrived",
        note: "Long action = was cooking (Past Continuous); sudden event = arrived (Past Simple).",
      },
      {
        id: "pastc-2",
        burmese: "မိုးရွာနေတုန်း ကျွန်တော်တို့ အိမ်ပြန်လမ်းလျှောက်နေခဲ့တယ်။",
        english: "We were walking home while it was raining.",
        highlight: "were walking ... was raining",
        note: "Use 'while' when both actions were ongoing simultaneously.",
      },
    ],
    mistake: {
      wrong: "I cooked dinner when he was arriving.",
      correct: "I was cooking dinner when he arrived.",
      reason:
        "Put '-ing' on the longer background activity and Past Simple on the shorter interrupting action.",
    },
    practiceCategoryId: "cat-grammar",
  },
  {
    id: "future-simple",
    title: "Future Simple (will)",
    burmeseTitle: "အနာဂတ်ရိုးရိုးကာလ (will)",
    track: "tenses",
    subgroup: "Future",
    level: "beginner",
    summary:
      "Use 'will' for promises, instant decisions made on the spot, offers, and general predictions.",
    burmeseSummary:
      "ကတိပေးခြင်း၊ ချက်ချင်းဆုံးဖြတ်ခြင်း၊ ကူညီမည်ဟုကမ်းလှမ်းခြင်းနှင့် ခန့်မှန်းချက်များအတွက် 'will' ကို သုံးသည်။",
    timelineType: "future-point",
    timelineCaption: "Decision, promise, or prediction ahead in time",
    formula: {
      positive: "Subject + will ('ll) + V1",
      negative: "Subject + will not (won't) + V1",
      question: "Will + Subject + V1 ...?",
    },
    whenToUse: [
      "Promises and work deadlines (I will send the report before 5 PM.)",
      "Spontaneous decisions made right now (I'm thirsty — I'll grab some water.)",
      "Offers to help (I'll carry that bag for you.)",
    ],
    signalWords: ["tomorrow", "soon", "before 5 PM", "probably", "I think"],
    examples: [
      {
        id: "fut-1",
        burmese: "အစီရင်ခံစာကို ဒီနေ့ ညနေ ၅ နာရီ မတိုင်ခင် ပို့ပေးပါမယ်။",
        english: "I will send the report before 5 PM today.",
        highlight: "will send",
        note: "'Will' is ideal for commitments and workplace promises.",
      },
      {
        id: "fut-2",
        burmese: "စိတ်မပူပါနဲ့၊ ကျွန်တော် မင်းကို ကူညီပေးမယ်။",
        english: "Don't worry, I will help you.",
        highlight: "will help",
        note: "Expresses reassurance and an immediate offer.",
      },
    ],
    mistake: {
      wrong: "I will to send the email tomorrow.",
      correct: "I will send the email tomorrow.",
      reason: "Never put 'to' after 'will' — follow directly with V1.",
    },
    practiceCategoryId: "cat-work",
  },

  // ── EVERYDAY GRAMMAR RULES (8) ─────────────────────────────────
  {
    id: "used-to",
    title: "used to (Past Habits)",
    burmeseTitle: "အရင်က လုပ်လေ့ရှိခဲ့တယ် (used to)",
    track: "grammar",
    subgroup: "Past Habits",
    level: "beginner",
    summary:
      "Talk about past habits, routines, or states that were true before — but are no longer true today.",
    burmeseSummary:
      "အရင်တုန်းက ပုံမှန်လုပ်လေ့ရှိခဲ့ (သို့) ဖြစ်ခဲ့ပေမယ့် အခုမလုပ်တော့/မဟုတ်တော့တဲ့ အရာတွေကို 'used to + V1' နဲ့ ပြောတယ်။",
    timelineType: "past-habit",
    timelineCaption: "Repeated in the past, stopped before NOW",
    formula: {
      positive: "Subject + used to + V1",
      negative: "Subject + did not (didn't) + use to + V1",
      question: "Did + Subject + use to + V1 ...?",
    },
    whenToUse: [
      "Past habits you stopped doing (I used to drink three cups of coffee a day.)",
      "Past living places or states (We used to live in Mandalay.)",
      "Note: 'be used to + V-ing/noun' means 'accustomed to' (I am used to spicy food).",
    ],
    signalWords: [
      "when I was young",
      "in the past",
      "before",
      "years ago",
      "not anymore",
    ],
    examples: [
      {
        id: "ut-1",
        burmese: "ကျွန်တော် အရင်က ကျောင်းကို စက်ဘီးစီးသွားလေ့ရှိတယ်။",
        english: "I used to ride a bicycle to school.",
        highlight: "used to ride",
        note: "Shows a regular habit in the past that no longer happens.",
      },
      {
        id: "ut-2",
        burmese: "သူမက အရင်က အစပ်မစားတတ်ဘူး။",
        english: "She didn't use to eat spicy food.",
        highlight: "didn't use to eat",
        note: "Drop the '-d' in 'use to' after 'didn't' and 'Did...?'!",
      },
      {
        id: "ut-3",
        burmese: "ကျွန်တော် မနက်အစောကြီးထရတာ အကျင့်ဖြစ်နေပြီ။",
        english: "I am used to waking up early.",
        highlight: "am used to waking",
        note: "Bonus contrast: 'be used to + V-ing' means something feels normal to you now.",
      },
    ],
    mistake: {
      wrong: "Did you used to live here?",
      correct: "Did you use to live here?",
      reason:
        "In negatives and questions with 'did / didn't', write 'use to' (without '-d').",
    },
    practiceCategoryId: "cat-grammar",
  },
  {
    id: "be-going-to",
    title: "be going to (Plans & Intentions)",
    burmeseTitle: "လုပ်ဖို့ စီစဉ်ထားတယ် (be going to)",
    track: "grammar",
    subgroup: "Future Plans",
    level: "beginner",
    summary:
      "Use 'am / is / are going to + V1' for plans you already decided before speaking, or predictions with clear evidence.",
    burmeseSummary:
      "ကြိုတင်ဆုံးဖြတ်စီစဉ်ထားပြီးသား အနာဂတ်အစီအစဉ်များနှင့် မျက်မြင်သက်သေရှိသော ခန့်မှန်းချက်များအတွက် 'be going to + V1' ကို သုံးသည်။",
    timelineType: "planned-future",
    timelineCaption: "Decided before speaking, planned for the future",
    formula: {
      positive: "Subject + am / is / are + going to + V1",
      negative: "Subject + am / is / are + not + going to + V1",
      question: "Am / Is / Are + Subject + going to + V1 ...?",
    },
    whenToUse: [
      "Personal intentions already decided (I am going to practice writing every evening.)",
      "Visible evidence predictions (Look at those dark clouds — it is going to rain!)",
      "Contrast with 'will': Use 'going to' for planned intentions, 'will' for on-the-spot decisions.",
    ],
    signalWords: [
      "this weekend",
      "next month",
      "tonight",
      "look at...",
      "plan to",
    ],
    examples: [
      {
        id: "bgt-1",
        burmese: "ဒီစနေ၊ တနင်္ဂနွေမှာ ကျွန်တော် စာအုပ်အသစ်တစ်အုပ် ဖတ်ဖို့ စီစဉ်ထားတယ်။",
        english: "I am going to read a new book this weekend.",
        highlight: "am going to read",
        note: "You already had this plan before telling the listener.",
      },
      {
        id: "bgt-2",
        burmese: "ကောင်းကင်မှာ တိမ်တွေမည်းနေပြီ၊ မိုးရွာတော့မယ်ထင်တယ်။",
        english: "The sky is dark — it is going to rain.",
        highlight: "is going to rain",
        note: "You can see clear visual evidence right now.",
      },
    ],
    mistake: {
      wrong: "I going to visit my parents tomorrow.",
      correct: "I am going to visit my parents tomorrow.",
      reason: "Always include the 'be' verb (am / is / are) before 'going to'.",
    },
    practiceCategoryId: "cat-daily",
  },
  {
    id: "have-to-must-should",
    title: "have to, must & should",
    burmeseTitle: "လုပ်ရမယ် / လုပ်သင့်တယ် (Obligation & Advice)",
    track: "grammar",
    subgroup: "Modals",
    level: "beginner",
    summary:
      "Choose the right strength: 'should' for friendly advice, 'have to' for rules/necessity, and 'must' for strong urgency.",
    burmeseSummary:
      "အကြံပေးရန် 'should'၊ စည်းကမ်း/လိုအပ်ချက်အတွက် 'have to' နှင့် အရေးကြီးသော တာဝန်အတွက် 'must' ကို ခွဲခြားသုံးသည်။",
    timelineType: "rule-pattern",
    timelineCaption: "Advice (soft) → Necessity (medium) → Strong rule",
    formula: {
      positive: "Subject + should / must / have to + V1",
      negative:
        "shouldn't (bad idea)  |  don't have to (optional)  |  mustn't (forbidden)",
      question: "Should + Subject + V1?  |  Do/Does + Subject + have to + V1?",
    },
    whenToUse: [
      "'should': Helpful advice (You should review your sentence before submitting.)",
      "'have to': Everyday external rules or deadlines (We have to finish on time.)",
      "Careful! 'don't have to' = not necessary, while 'must not' = strictly forbidden.",
    ],
    signalWords: [
      "should",
      "have to",
      "has to",
      "need to",
      "must",
      "don't have to",
    ],
    examples: [
      {
        id: "hms-1",
        burmese: "ပရောဂျက်ကို အချိန်မီ ပြီးစီးဖို့ ကျွန်တော်တို့ အတူတူ ကြိုးစားရမယ်။",
        english: "We have to work together to finish the project on time.",
        highlight: "have to work",
        note: "'Have to' and 'need to' sound natural and collaborative at work.",
      },
      {
        id: "hms-2",
        burmese: "မင်း အိပ်ရေးဝအောင် စောစောအိပ်သင့်တယ်။",
        english: "You should go to bed early to get enough sleep.",
        highlight: "should go",
        note: "Use 'should' for gentle, friendly advice.",
      },
      {
        id: "hms-3",
        burmese: "မနက်ဖြန် ရုံးပိတ်ရက်မို့ စောစောထစရာ မလိုဘူး။",
        english:
          "You don't have to wake up early tomorrow because it is a holiday.",
        highlight: "don't have to wake",
        note: "'Don't have to' means it is optional — NOT forbidden.",
      },
    ],
    mistake: {
      wrong: "You must not come if you are busy. (meaning: it's optional)",
      correct: "You don't have to come if you are busy.",
      reason:
        "'Must not' means 'it is forbidden'; use 'don't have to' to say something is not required.",
    },
    practiceCategoryId: "cat-work",
  },
  {
    id: "conditionals",
    title: "Conditionals (1st & 2nd If)",
    burmeseTitle: "အခြေအနေပြဝါကျများ (If)",
    track: "grammar",
    subgroup: "Clauses",
    level: "intermediate",
    summary:
      "Express real future possibilities (1st Conditional) and imaginary scenarios (2nd Conditional).",
    burmeseSummary:
      "ဖြစ်နိုင်ခြေရှိသော အနာဂတ်အခြေအနေ (1st) နှင့် စိတ်ကူးယဉ်/မဖြစ်နိုင်သေးသော အခြေအနေ (2nd) များကို 'If' ဖြင့် ဖော်ပြသည်။",
    timelineType: "rule-pattern",
    timelineCaption: "Condition (If-clause) connects directly to Result clause",
    formula: {
      positive: "1st: If + V1, will + V1   |   2nd: If + V2, would + V1",
      negative: "If + do/does/did not + V1, won't / wouldn't + V1",
      question: "What will / would + Subject + V1 if ...?",
    },
    whenToUse: [
      "1st Conditional: Realistic future cause & effect (If it rains, we will stay inside.)",
      "2nd Conditional: Imaginary or unlikely present/future (If I had more time, I would learn guitar.)",
    ],
    signalWords: ["if", "unless", "in case", "would"],
    examples: [
      {
        id: "cond-1",
        burmese: "မိုးရွာရင် ကျွန်တော်တို့ အိမ်ထဲမှာပဲ နေကြမယ်။",
        english: "If it rains, we will stay inside.",
        highlight: "If it rains, ... will stay",
        note: "1st Conditional uses Present Simple after 'if' — never 'If it will rain'.",
      },
      {
        id: "cond-2",
        burmese: "ငါ့မှာ အချိန်ပိုရှိရင် ဂစ်တာတီး သင်ဖြစ်မယ်။",
        english: "If I had more time, I would learn to play the guitar.",
        highlight: "If I had ... would learn",
        note: "2nd Conditional pairs Past Simple ('had') with 'would + base verb'.",
      },
    ],
    mistake: {
      wrong: "If it will rain tomorrow, we will stay home.",
      correct: "If it rains tomorrow, we will stay home.",
      reason:
        "Keep 'will' out of the 'if' clause — put 'will' only in the result clause.",
    },
    practiceCategoryId: "cat-grammar",
  },
  {
    id: "polite-modals",
    title: "Polite Requests (Could / Would / May)",
    burmeseTitle: "ယဉ်ကျေးသော တောင်းဆိုမှုများ",
    track: "grammar",
    subgroup: "Modals",
    level: "beginner",
    summary:
      "Soften direct commands into warm, professional English for emails, travel, and dining.",
    burmeseSummary:
      "ရုံးတွင်းအီးမေးလ်များ၊ ခရီးသွားခြင်းနှင့် စားသောက်ဆိုင်များတွင် ယဉ်ကျေးသိမ်မွေ့စွာ တောင်းဆိုရန် 'Could / Would / May' ကို သုံးသည်။",
    timelineType: "rule-pattern",
    timelineCaption: "Direct command → Polite modal request",
    formula: {
      positive: "Could / Would you (please) + V1 ...?",
      negative: "Could you please not + V1 ...?",
      question: "Could I / May I + V1 ..., please?",
    },
    whenToUse: [
      "Asking coworkers for reviews or deadline extensions (Could you please review this file?)",
      "Ordering food or asking for the bill politely (Could we have the bill, please?)",
      "Asking strangers for directions or help (Could you wait a moment?)",
    ],
    signalWords: ["could you", "would you", "may I", "would like", "please"],
    examples: [
      {
        id: "mod-1",
        burmese: "ကျေးဇူးပြုပြီး ဒီဖိုင်ကို တစ်ချက် စစ်ဆေးပေးနိုင်မလား။",
        english: "Could you please review this file?",
        highlight: "Could you please review",
        note: "Always use bare V1 after modals — never 'Could you to review'.",
      },
      {
        id: "mod-2",
        burmese: "ကျေးဇူးပြုပြီး ငွေရှင်းပြေစာ ယူပေးလို့ ရမလား။",
        english: "Could we have the bill, please?",
        highlight: "Could we have",
        note: "Polite, natural phrasing in any restaurant.",
      },
    ],
    mistake: {
      wrong: "Could you to check this report?",
      correct: "Could you check this report?",
      reason:
        "Modal verbs (can, could, will, would, should, must) connect directly to V1 without 'to'.",
    },
    practiceCategoryId: "cat-food",
  },
  {
    id: "passive-voice",
    title: "Passive Voice (be + V3)",
    burmeseTitle: "ခံရသူဦးစားပေးဝါကျ (Passive Voice)",
    track: "grammar",
    subgroup: "Sentence Focus",
    level: "intermediate",
    summary:
      "Focus on what happened or the receiver of the action when the doer is unknown, obvious, or less important.",
    burmeseSummary:
      "ပြုလုပ်သူထက် ဖြစ်ပျက်သွားသောအရာ (သို့) ခံရသူကို အဓိကထားဖော်ပြလိုသည့်အခါ 'be + V3' ကို သုံးသည်။",
    timelineType: "rule-pattern",
    timelineCaption: "Object moves to the front: Receiver + be + V3",
    formula: {
      positive: "Subject + am/is/are/was/were/will be + V3",
      negative: "Subject + be + not + V3",
      question: "Be + Subject + V3 ...?",
    },
    whenToUse: [
      "Travel & announcements (My flight was delayed by two hours.)",
      "Formal reports & processes (The report was submitted yesterday.)",
      "When who did the action doesn't matter (English is spoken worldwide.)",
    ],
    signalWords: ["was delayed", "is made", "will be sent", "by ..."],
    examples: [
      {
        id: "pas-1",
        burmese: "ကျွန်တော့်ရဲ့ လေယာဉ်ခရီးစဉ်က ရာသီဥတုကြောင့် နှစ်နာရီ နောက်ကျသွားတယ်။",
        english: "My flight was delayed by two hours because of the weather.",
        highlight: "was delayed",
        note: "'Flight' received the delay, so Past Passive ('was delayed') is natural.",
      },
      {
        id: "pas-2",
        burmese: "ဒီအစီရင်ခံစာကို မနက်ဖြန် ပို့ပေးပါလိမ့်မယ်။",
        english: "This report will be sent tomorrow.",
        highlight: "will be sent",
        note: "Future Passive uses 'will be + V3'.",
      },
    ],
    mistake: {
      wrong: "My flight delayed two hours yesterday.",
      correct: "My flight was delayed by two hours yesterday.",
      reason:
        "Include the 'be' verb ('was / were') before V3 so the flight isn't the doer of the delay.",
    },
    practiceCategoryId: "cat-travel",
  },
  {
    id: "gerunds-vs-infinitives",
    title: "Gerunds (V-ing) vs Infinitives (to + V1)",
    burmeseTitle: "V-ing နှင့် to + V1 တွဲသုံးနည်း",
    track: "grammar",
    subgroup: "Verb Patterns",
    level: "intermediate",
    summary:
      "Some verbs require V-ing (practice, enjoy, finish), while others take 'to + V1' (want, plan, decide, need).",
    burmeseSummary:
      "တချို့ကြိယာများနောက်တွင် V-ing လိုက်ရပြီး (practice writing)၊ တချို့ကြိယာများနောက်တွင် 'to + V1' လိုက်ရသည် (plan to go)။",
    timelineType: "rule-pattern",
    timelineCaption: "Main verb decides whether V-ing or to + V1 follows",
    formula: {
      positive:
        "enjoy / finish / practice + V-ing   |   want / plan / need + to + V1",
      negative: "avoid + V-ing   |   decide + not to + V1",
      question: "Do you enjoy + V-ing?   |   What do you plan + to + V1?",
    },
    whenToUse: [
      "Always use V-ing as a sentence subject (Learning from mistakes is important.)",
      "Always use V-ing after prepositions (Thank you for helping me. Sorry for replying late.)",
      "Use 'to + V1' to express purpose (We work together to finish on time.)",
    ],
    signalWords: [
      "practice + -ing",
      "finish + -ing",
      "for + -ing",
      "want to",
      "plan to",
      "need to",
    ],
    examples: [
      {
        id: "gi-1",
        burmese: "ကျွန်တော် အင်္ဂလိပ်စာ ရေးသားခြင်းကို နေ့တိုင်း လေ့ကျင့်နေပါတယ်။",
        english: "I practice writing English every day.",
        highlight: "practice writing",
        note: "'Practice', 'enjoy', and 'finish' are followed by V-ing.",
      },
      {
        id: "gi-2",
        burmese: "အမှားတွေကနေ သင်ယူတာဟာ အောင်မြင်မှုအတွက် အရေးကြီးတယ်။",
        english: "Learning from mistakes is important for success.",
        highlight: "Learning from mistakes",
        note: "Use a gerund (V-ing) to turn an action into the subject of a sentence.",
      },
    ],
    mistake: {
      wrong: "I enjoy to read English stories.",
      correct: "I enjoy reading English stories.",
      reason: "'Enjoy' always takes a gerund (-ing), never 'to + verb'.",
    },
    practiceCategoryId: "cat-opinions",
  },
  {
    id: "comparatives-superlatives",
    title: "Comparatives & Superlatives",
    burmeseTitle: "နှိုင်းယှဉ်ဖော်ပြခြင်း (-er / more / -est)",
    track: "grammar",
    subgroup: "Adjectives",
    level: "advanced",
    summary:
      "Compare two things with '-er / more ... than', and express the #1 extreme with 'the -est / the most ...'.",
    burmeseSummary:
      "အရာနှစ်ခုနှိုင်းယှဉ်ရန် '-er / more ... than' ကိုသုံးပြီး အများထဲမှ အသာလွန်ဆုံးကို 'the -est / the most ...' ဖြင့် ဖော်ပြသည်။",
    timelineType: "rule-pattern",
    timelineCaption: "Short word → -er / -est   |   Long word → more / most",
    formula: {
      positive: "Short: adj-er + than   |   Long: more + adj + than",
      negative: "not as + adj + as   (e.g., not as difficult as before)",
      question: "Which is + adj-er / more + adj?",
    },
    whenToUse: [
      "1-syllable adjectives: add '-er / -est' (fast → faster → the fastest; easy → easier)",
      "2+ syllable adjectives: use 'more / the most' (more confident, more beneficial)",
      "Irregular forms to memorize: good → better → best; bad → worse → worst",
    ],
    signalWords: [
      "than",
      "much easier",
      "more ... than",
      "the nearest",
      "the best",
    ],
    examples: [
      {
        id: "cs-1",
        burmese: "အရင်ကထက်စာရင် အခု ပိုပြီး ယုံကြည်မှု ရှိလာတယ်။",
        english: "I feel more confident now than before.",
        highlight: "more confident ... than",
        note: "'Confident' has 3 syllables, so use 'more confident' (never 'confidenter').",
      },
      {
        id: "cs-2",
        burmese: "အနီးဆုံး ဘူတာရုံကို ဘယ်လို သွားရမလဲ။",
        english: "How can I get to the nearest train station?",
        highlight: "the nearest",
        note: "Always put 'the' before a superlative ('the nearest', 'the best').",
      },
    ],
    mistake: {
      wrong: "Technology has made our lives more easier.",
      correct: "Technology has made our lives much easier.",
      reason:
        "Never use 'more' and '-er' together. Use 'much' to intensify ('much easier').",
    },
    practiceCategoryId: "cat-opinions",
  },
];

export const TENSE_COMPARISON_ROWS: TenseComparisonRow[] = [
  {
    tenseId: "present-simple",
    tenseName: "Present Simple",
    burmeseLabel: "နေ့စဉ်အလေ့အကျင့်",
    englishSentence: "I write English every day.",
    burmeseMeaning: "ကျွန်တော် နေ့တိုင်း အင်္ဂလိပ်စာ ရေးတယ်။",
    focus: "Routine / habit",
  },
  {
    tenseId: "present-continuous",
    tenseName: "Present Continuous",
    burmeseLabel: "အခုလုပ်နေဆဲ",
    englishSentence: "I am writing English right now.",
    burmeseMeaning: "ကျွန်တော် အခု အင်္ဂလိပ်စာ ရေးနေတယ်။",
    focus: "Happening right now",
  },
  {
    tenseId: "present-perfect",
    tenseName: "Present Perfect",
    burmeseLabel: "အတိတ်မှ ယခုထိ",
    englishSentence: "I have written English for two years.",
    burmeseMeaning: "ကျွန်တော် အင်္ဂလိပ်စာ ရေးလာတာ နှစ်နှစ် ရှိပြီ။",
    focus: "Duration / result now",
  },
  {
    tenseId: "past-simple",
    tenseName: "Past Simple",
    burmeseLabel: "ပြီးဆုံးခဲ့သောအတိတ်",
    englishSentence: "I wrote an English essay yesterday.",
    burmeseMeaning: "မနေ့က ကျွန်တော် အင်္ဂလိပ်စာစီစာကုံးတစ်ပုဒ် ရေးခဲ့တယ်။",
    focus: "Finished past event",
  },
  {
    tenseId: "used-to",
    tenseName: "used to",
    burmeseLabel: "အရင်က လုပ်လေ့ရှိခဲ့",
    englishSentence: "I used to write in a paper notebook.",
    burmeseMeaning: "ကျွန်တော် အရင်က စာအုပ်ထဲမှာ ရေးလေ့ရှိခဲ့တယ်။",
    focus: "Stopped past habit",
  },
  {
    tenseId: "be-going-to",
    tenseName: "be going to",
    burmeseLabel: "စီစဉ်ထားသောအနာဂတ်",
    englishSentence: "I am going to write five sentences tonight.",
    burmeseMeaning: "ဒီည ဝါကျငါးကြောင်း ရေးဖို့ စီစဉ်ထားတယ်။",
    focus: "Planned intention",
  },
];

export const WRITING_TIPS: WritingTip[] = [
  {
    id: "tip-svo",
    tag: "structure",
    title: "Flip Burmese SOV into English SVO",
    burmeseTitle: "ဝါကျတည်ဆောက်ပုံ ပြောင်းလဲခြင်း",
    summary:
      "Burmese places the verb at the end (Subject + Object + Verb), while English puts the verb immediately after the subject.",
    trick:
      "Before typing, find WHO (Subject) and ACTION (Verb) first — lock them in spots #1 and #2, then add details (what, where, when).",
    before: "I + every day + English + practice.",
    after: "I + practice + English + every day.",
  },
  {
    id: "tip-prepositions",
    tag: "grammar",
    title: "The AT → ON → IN Time Triangle",
    burmeseTitle: "အချိန်ပြဝိဘတ်များ (at / on / in)",
    summary:
      "Move from exact to broad: AT (8 PM), ON (Monday, May 5), IN (July, 2026, the morning).",
    trick:
      "Skip the preposition completely before 'today', 'tomorrow', 'yesterday', 'this afternoon', and 'next Monday'.",
    before: "We have a meeting in this afternoon on 3 PM.",
    after: "We have a meeting this afternoon at 3 PM.",
  },
  {
    id: "tip-articles",
    tag: "grammar",
    title: "Quick Rule for a, an, and the",
    burmeseTitle: "Article အသုံးပြုနည်း",
    summary:
      "Because Burmese doesn't use articles, it is easy to leave them out before singular countable nouns.",
    trick:
      "Use 'a/an' when introducing any one item for the first time ('a report'). Switch to 'the' when both reader and writer know which specific one ('the report').",
    before: "I will send report before deadline.",
    after: "I will send the report before the deadline.",
  },
  {
    id: "tip-verb-be",
    tag: "grammar",
    title: "Don't Double am/is/are with Action Verbs",
    burmeseTitle: "Verb to be နှင့် ကြိယာ တွဲသုံးမှုသတိထားရန်",
    summary:
      "Words like 'agree', 'understand', and 'need' are already verbs — they do not need 'am / is / are' in front.",
    trick:
      "Only pair 'am/is/are' with adjectives ('am confident'), nouns ('am a student'), or -ing/passive verbs ('am writing', 'was delayed').",
    before: "I am agree with your idea.",
    after: "I agree with your idea.",
  },
  {
    id: "tip-connectors",
    tag: "vocabulary",
    title: "because vs because of",
    burmeseTitle: "အကြောင်းပြချက် ချိတ်ဆက်စကားလုံးများ",
    summary:
      "Connecting ideas cleanly makes your English sound fluent and logical.",
    trick:
      "Follow 'because' with a full clause (subject + verb). Follow 'because of' or 'due to' with just a noun phrase.",
    before: "My flight was delayed because the bad weather.",
    after: "My flight was delayed because of the bad weather.",
  },
  {
    id: "tip-checklist",
    tag: "polish",
    title: "The 5-Second Writing Check",
    burmeseTitle: "မတင်ခင် ၅ စက္ကန့် ပြန်စစ်နည်း",
    summary:
      "Catch 80% of writing slips before hitting Enter with three rapid checks.",
    trick:
      "1) Does the time word match the verb tense? 2) Does 'he/she/it' have '-s'? 3) Did you capitalize 'I' and finish with '.' or '?'?",
    before: "yesterday i go to station and buy ticket",
    after: "Yesterday, I went to the station and bought a ticket.",
  },
];
