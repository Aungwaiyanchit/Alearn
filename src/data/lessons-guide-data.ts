import type {
  TenseComparisonRow,
  TenseLesson,
  WritingTip,
} from "@/types/guide";

export const TENSE_LESSONS: TenseLesson[] = [
  {
    id: "present-simple",
    title: "Present Simple",
    burmeseTitle: "ပစ္စုပ္ပန်ရိုးရိုးကာလ",
    group: "present",
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
        note: "After 'does', return the main verb back to base form ('go', not 'goes').",
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
    group: "present",
    level: "beginner",
    summary:
      "Use for actions happening right now, temporary projects, or confirmed near-future plans.",
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
    group: "present",
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
        note: "Use 'for' + length of time; use 'since' + starting point (since 2021).",
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
    group: "past",
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
      "Past facts or habits that are no longer true",
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
        burmese: "ကျွန်တော့်ရဲ့ လေယာဉ်ခရီးစဉ်က ရာသီဥတုကြောင့် နောက်ကျသွားတယ်။",
        english: "My flight was delayed because of the weather.",
        highlight: "was delayed",
        note: "Past passive uses 'was / were + V3' when the subject receives the action.",
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
    group: "past",
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
    title: "Future (`will` vs `going to`)",
    burmeseTitle: "အနာဂတ်ကာလ",
    group: "future",
    level: "beginner",
    summary:
      "Use 'will' for promises, instant decisions, and deadlines; use 'be going to' for prior intentions.",
    burmeseSummary:
      "ကတိပေးခြင်း၊ ချက်ချင်းဆုံးဖြတ်ခြင်းအတွက် 'will' ကိုသုံးပြီး ကြိုတင်စီစဉ်ထားသော အရာများအတွက် 'be going to' ကို သုံးသည်။",
    timelineType: "future-point",
    timelineCaption: "Planned or promised action ahead in the future",
    formula: {
      positive: "Subject + will + V1   |   Subject + am/is/are going to + V1",
      negative: "Subject + will not (won't) + V1",
      question: "Will + Subject + V1 ...?",
    },
    whenToUse: [
      "Promises, offers, and work deadlines (I will send the report before 5 PM.)",
      "Instant decisions made while speaking (It's raining — I'll take a taxi.)",
      "Prior plans already decided (I am going to visit Bagan next month.)",
    ],
    signalWords: [
      "tomorrow",
      "next week",
      "soon",
      "before 5 PM",
      "in the future",
    ],
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
        burmese: "နောက်လမှာ ကျွန်တော် အင်္ဂလိပ်စာသင်တန်း တက်ဖို့ စီစဉ်ထားတယ်။",
        english: "I am going to join an English course next month.",
        highlight: "am going to join",
        note: "'Be going to' highlights an already-made personal plan.",
      },
    ],
    mistake: {
      wrong: "I will going to send the email tomorrow.",
      correct: "I will send the email tomorrow.",
      reason:
        "Never combine 'will' and 'going to' together — pick one and follow with a base verb (V1).",
    },
    practiceCategoryId: "cat-work",
  },
  {
    id: "conditionals",
    title: "Conditionals (1st & 2nd `If`)",
    burmeseTitle: "အခြေအနေပြဝါကျများ (If)",
    group: "patterns",
    level: "intermediate",
    summary:
      "Express real future possibilities (1st Conditional) and imaginary scenarios (2nd Conditional).",
    burmeseSummary:
      "ဖြစ်နိုင်ခြေရှိသော အနာဂတ်အခြေအနေ (1st) နှင့် စိတ်ကူးယဉ်/မဖြစ်နိုင်သေးသော အခြေအနေ (2nd) များကို 'If' ဖြင့် ဖော်ပြသည်။",
    timelineType: "conditional",
    timelineCaption: "Cause / condition (If-clause) leads to a result",
    formula: {
      positive: "1st: If + V1, will + V1   |   2nd: If + V2, would + V1",
      negative: "If + do/does/did not + V1, won't / wouldn't + V1",
      question: "What will / would + Subject + V1 if ...?",
    },
    whenToUse: [
      "1st Conditional: Realistic future cause & effect (If it rains, we will stay inside.)",
      "2nd Conditional: Imaginary or unlikely present/future (If I had more time, I would learn guitar.)",
    ],
    signalWords: ["if", "unless", "when", "in case"],
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
    title: "Polite Requests & Modals",
    burmeseTitle: "ယဉ်ကျေးသော တောင်းဆိုမှုများ",
    group: "patterns",
    level: "advanced",
    summary:
      "Use 'Could', 'Would', and 'May' to sound polite and professional in emails, travel, and dining.",
    burmeseSummary:
      "ရုံးတွင်းအီးမေးလ်များ၊ ခရီးသွားခြင်းနှင့် စားသောက်ဆိုင်များတွင် ယဉ်ကျေးသိမ်မွေ့စွာ တောင်းဆိုရန် 'Could / Would / May' ကို သုံးသည်။",
    timelineType: "modal",
    timelineCaption: "Softens direct commands into polite, natural English",
    formula: {
      positive: "Could / Would you (please) + V1 ...?",
      negative: "I wouldn't recommend ... / Could you not ...?",
      question: "Could I / May I + V1 ..., please?",
    },
    whenToUse: [
      "Asking coworkers for reviews or deadline extensions (Could you please review this file?)",
      "Ordering food or requesting the bill politely (Could we have the bill, please?)",
      "Giving softer advice with 'should' instead of harsh 'must'",
    ],
    signalWords: ["could you", "would you", "may I", "please", "would like"],
    examples: [
      {
        id: "mod-1",
        burmese: "ကျေးဇူးပြုပြီး ဒီဖိုင်ကို တစ်ချက် စစ်ဆေးပေးနိုင်မလား။",
        english: "Could you please review this file?",
        highlight: "Could you please review",
        note: "Always use the bare base verb (V1) after modal verbs (never 'Could you to review').",
      },
      {
        id: "mod-2",
        burmese: "နောက်အပတ် တနင်္လာနေ့အထိ နောက်ဆုံးရက်ကို ရွှေ့ပေးလို့ ရမလား။",
        english: "Could we extend the deadline until next Monday?",
        highlight: "Could we extend",
        note: "Using 'we' sounds collaborative and diplomatic in business writing.",
      },
    ],
    mistake: {
      wrong: "Could you to check this report?",
      correct: "Could you check this report?",
      reason:
        "Modal verbs (can, could, will, would, should, must) are followed directly by V1 without 'to'.",
    },
    practiceCategoryId: "cat-work",
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
    tenseId: "past-continuous",
    tenseName: "Past Continuous",
    burmeseLabel: "အတိတ်က လုပ်နေဆဲ",
    englishSentence: "I was writing when you called.",
    burmeseMeaning: "မင်းဖုန်းဆက်တုန်းက ကျွန်တော် စာရေးနေခဲ့တယ်။",
    focus: "Interrupted past action",
  },
  {
    tenseId: "future-simple",
    tenseName: "Future Simple",
    burmeseLabel: "အနာဂတ်",
    englishSentence: "I will write a better email tomorrow.",
    burmeseMeaning: "မနက်ဖြန် ပိုကောင်းတဲ့ အီးမေးလ်တစ်စောင် ရေးမယ်။",
    focus: "Future promise / plan",
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
      "Before typing, find the WHO (Subject) and ACTION (Verb) first — lock them in spots #1 and #2, then add details (what, where, when).",
    before: "I + every day + English + practice. (SOV trap)",
    after: "I + practice + English + every day. (Clean SVO)",
  },
  {
    id: "tip-prepositions",
    tag: "grammar",
    title: "The AT → ON → IN Time Triangle",
    burmeseTitle: "အချိန်ပြဝိဘတ်များ (at / on / in)",
    summary:
      "Move from smallest/most exact time to largest: AT (8 PM), ON (Monday, May 5), IN (July, 2026, the morning).",
    trick:
      "Skip the preposition completely before 'today', 'tomorrow', 'yesterday', 'this afternoon', and 'next Monday'.",
    before: "We have a meeting in this afternoon on 3 PM.",
    after: "We have a meeting this afternoon at 3 PM.",
  },
  {
    id: "tip-articles",
    tag: "grammar",
    title: "Quick Rule for `a`, `an`, and `the`",
    burmeseTitle: "Article အသုံးပြုနည်း",
    summary:
      "Because Burmese doesn't use articles, it is easy to drop them in English singular countable nouns.",
    trick:
      "Use 'a/an' when introducing any one item for the first time ('a report'). Switch to 'the' when both reader and writer know which specific one ('the report we discussed').",
    before: "I will send report before deadline.",
    after: "I will send the report before the deadline.",
  },
  {
    id: "tip-verb-be",
    tag: "grammar",
    title: "Don't Double `am/is/are` with Action Verbs",
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
    title: "`because` vs `because of`",
    burmeseTitle: "အကြောင်းပြချက် ချိတ်ဆက်စကားလုံးများ",
    summary:
      "Connecting ideas smoothly makes your writing sound immediately more fluent.",
    trick:
      "Follow 'because' with a full clause (subject + verb). Follow 'because of' or 'due to' with just a noun phrase.",
    before: "My flight was delayed because the bad weather.",
    after: "My flight was delayed because of the bad weather.",
  },
  {
    id: "tip-checklist",
    tag: "polish",
    title: "The 5-Second Writing Polish Check",
    burmeseTitle: "မတင်ခင် ၅ စက္ကန့် ပြန်စစ်နည်း",
    summary:
      "Catch 80% of writing slips before hitting Enter with three rapid checks.",
    trick:
      "1) Does the time word match the verb tense? 2) Does 'he/she/it' have '-s'? 3) Did you capitalize 'I' and finish with '.' or '?'?",
    before: "yesterday i go to station and buy ticket",
    after: "Yesterday, I went to the station and bought a ticket.",
  },
];
