import type { Difficulty } from "@/types/practice";

export interface SeedCategory {
  id: string;
  slug: string;
  name: string;
  burmeseName: string;
  description: string;
  icon: string;
  accentColor: string;
}

export interface SeedQuestion {
  id: string;
  categoryId: string;
  burmesePrompt: string;
  englishAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  grammarNote: string;
  difficulty: Difficulty;
}

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    id: "cat-daily",
    slug: "daily-conversations",
    name: "Daily Conversations",
    burmeseName: "နေ့စဉ်စကားပြော",
    description: "Everyday expressions, plans, and polite responses.",
    icon: "message-circle",
    accentColor: "amber",
  },
  {
    id: "cat-work",
    slug: "work-and-office",
    name: "Work & Office",
    burmeseName: "ရုံးတွင်းနှင့်အလုပ်ခွင်",
    description: "Emails, meetings, deadlines, and team collaboration.",
    icon: "briefcase",
    accentColor: "indigo",
  },
  {
    id: "cat-travel",
    slug: "travel-and-places",
    name: "Travel & Directions",
    burmeseName: "ခရီးသွားနှင့်လမ်းညွှန်",
    description: "Navigating cities, hotels, tickets, and asking for help.",
    icon: "compass",
    accentColor: "emerald",
  },
  {
    id: "cat-food",
    slug: "food-and-dining",
    name: "Food & Dining",
    burmeseName: "အစားအသောက်နှင့်စားသောက်ဆိုင်",
    description: "Ordering meals, tastes, and dining preferences.",
    icon: "utensils",
    accentColor: "rose",
  },
  {
    id: "cat-grammar",
    slug: "grammar-and-tenses",
    name: "Grammar & Tenses",
    burmeseName: "သဒ္ဒါနှင့်ကာလများ",
    description: "Practice past, future, conditionals, and perfect tenses.",
    icon: "book-open",
    accentColor: "sky",
  },
  {
    id: "cat-opinions",
    slug: "expressing-opinions",
    name: "Expressing Opinions",
    burmeseName: "ထင်မြင်ချက်ဖော်ပြခြင်း",
    description: "Share thoughts, agree politely, and explain reasons clearly.",
    icon: "sparkles",
    accentColor: "violet",
  },
];

export const SEED_QUESTIONS: SeedQuestion[] = [
  // Daily Conversations
  {
    id: "q-daily-1",
    categoryId: "cat-daily",
    burmesePrompt: "ဒီနေ့ ရာသီဥတု အရမ်းကောင်းတယ်။",
    englishAnswer: "The weather is very nice today.",
    acceptedAnswers: [
      "Today the weather is very nice.",
      "The weather is really nice today.",
      "The weather is very good today.",
      "It is very nice weather today.",
    ],
    hint: "Start with 'The weather is...' (ရာသီဥတု = weather)",
    grammarNote:
      "Use 'The weather is + adjective + today' to describe current conditions naturally.",
    difficulty: "beginner",
  },
  {
    id: "q-daily-2",
    categoryId: "cat-daily",
    burmesePrompt: "မနက်ဖြန် မနက် ၈ နာရီမှာ တွေ့ကြရအောင်။",
    englishAnswer: "Let's meet tomorrow morning at 8 o'clock.",
    acceptedAnswers: [
      "Let's meet at 8 o'clock tomorrow morning.",
      "Let's meet tomorrow morning at 8.",
      "Let's meet at 8 AM tomorrow morning.",
      "Let us meet at 8 o'clock tomorrow morning.",
    ],
    hint: "Use 'Let's meet...' (တွေ့ကြရအောင် = Let's meet)",
    grammarNote:
      "'Let's + base verb' makes a friendly suggestion. Use 'at' before a specific clock time.",
    difficulty: "beginner",
  },
  {
    id: "q-daily-3",
    categoryId: "cat-daily",
    burmesePrompt: "ကျွန်တော် အင်္ဂလိပ်စာ ရေးသားခြင်းကို နေ့တိုင်း လေ့ကျင့်နေပါတယ်။",
    englishAnswer: "I practice writing English every day.",
    acceptedAnswers: [
      "I am practicing English writing every day.",
      "I practice English writing every day.",
      "I am practicing writing English every day.",
    ],
    hint: "Use 'practice + verb-ing' (လေ့ကျင့်နေပါတယ် = practice / am practicing)",
    grammarNote:
      "The verb 'practice' is followed by a gerund (-ing form) or noun, such as 'practice writing'.",
    difficulty: "beginner",
  },
  {
    id: "q-daily-4",
    categoryId: "cat-daily",
    burmesePrompt: "ခဏစောင့်ပေးလို့ ရမလား။ ကျွန်တော် အခုပဲ လာနေပါပြီ။",
    englishAnswer: "Could you wait a moment? I am coming right now.",
    acceptedAnswers: [
      "Can you wait a moment? I am coming right now.",
      "Could you please wait a moment? I'm on my way.",
      "Can you wait a second? I am coming right now.",
      "Please wait a moment. I am coming right now.",
    ],
    hint: "Polite request: 'Could you wait a moment?'",
    grammarNote:
      "'Could you...?' is softer and more polite than 'Can you...?' for everyday requests.",
    difficulty: "intermediate",
  },
  {
    id: "q-daily-5",
    categoryId: "cat-daily",
    burmesePrompt: "မင်းရဲ့ အကူအညီအတွက် အများကြီး ကျေးဇူးတင်ပါတယ်။",
    englishAnswer: "Thank you very much for your help.",
    acceptedAnswers: [
      "Thank you so much for your help.",
      "Thanks a lot for your help.",
    ],
    hint: "Use 'Thank you ... for your help.'",
    grammarNote:
      "Always pair 'thank you' with the preposition 'for' before a noun or -ing verb.",
    difficulty: "beginner",
  },
  {
    id: "q-daily-6",
    categoryId: "cat-daily",
    burmesePrompt: "ဒီတစ်ပတ် စနေ၊ တနင်္ဂနွေမှာ ဘာလုပ်ဖို့ အစီအစဉ်ရှိလဲ။",
    englishAnswer: "What are your plans for this weekend?",
    acceptedAnswers: [
      "What do you plan to do this weekend?",
      "What are you planning to do this weekend?",
      "Do you have any plans for this weekend?",
    ],
    hint: "Ask with 'What are your plans for...?' or 'What do you plan to do...?'",
    grammarNote:
      "Both 'What are your plans for...' and 'What are you planning to do...' are natural ways to ask about weekend plans.",
    difficulty: "intermediate",
  },

  // Work & Office
  {
    id: "q-work-1",
    categoryId: "cat-work",
    burmesePrompt: "ဒီနေ့ နေ့လယ်မှာ အစည်းအဝေး ရှိပါတယ်။",
    englishAnswer: "We have a meeting this afternoon.",
    acceptedAnswers: [
      "There is a meeting this afternoon.",
      "I have a meeting this afternoon.",
    ],
    hint: "Use 'We have a meeting...' or 'There is a meeting...'",
    grammarNote:
      "No preposition ('in'/'on') is needed before 'this afternoon', 'this morning', or 'tomorrow'.",
    difficulty: "beginner",
  },
  {
    id: "q-work-2",
    categoryId: "cat-work",
    burmesePrompt: "အစီရင်ခံစာကို ဒီနေ့ ညနေ ၅ နာရီ မတိုင်ခင် ပို့ပေးပါမယ်။",
    englishAnswer: "I will send the report before 5 PM today.",
    acceptedAnswers: [
      "I'll send the report before 5 o'clock this evening.",
      "I will send you the report before 5 PM today.",
      "I will send the report by 5 PM today.",
    ],
    hint: "အစီရင်ခံစာ = report, မတိုင်ခင် = before / by",
    grammarNote:
      "Use 'before' or 'by' to set a clear deadline in professional communication.",
    difficulty: "intermediate",
  },
  {
    id: "q-work-3",
    categoryId: "cat-work",
    burmesePrompt: "ကျေးဇူးပြုပြီး ဒီဖိုင်ကို တစ်ချက် စစ်ဆေးပေးနိုင်မလား။",
    englishAnswer: "Could you please review this file?",
    acceptedAnswers: [
      "Could you please check this file?",
      "Can you please check this file?",
      "Please check this file for me.",
      "Could you take a look at this file?",
    ],
    hint: "စစ်ဆေးပေး = check / review",
    grammarNote:
      "'Review' sounds especially professional in workplace emails, while 'check' works well in chat.",
    difficulty: "intermediate",
  },
  {
    id: "q-work-4",
    categoryId: "cat-work",
    burmesePrompt: "ပရောဂျက်ကို အချိန်မီ ပြီးစီးဖို့ ကျွန်တော်တို့ အတူတူ ကြိုးစားရမယ်။",
    englishAnswer: "We need to work together to finish the project on time.",
    acceptedAnswers: [
      "We must work together to finish the project on time.",
      "We have to work together to complete the project on time.",
      "We should work together to finish the project on time.",
    ],
    hint: "အချိန်မီ = on time, အတူတူ = together",
    grammarNote:
      "'On time' means meeting a schedule or deadline; 'in time' means early enough before it is too late.",
    difficulty: "intermediate",
  },
  {
    id: "q-work-5",
    categoryId: "cat-work",
    burmesePrompt: "အီးမေးလ် ပြန်ကြားတာ နောက်ကျသွားတဲ့အတွက် တောင်းပန်ပါတယ်။",
    englishAnswer: "I apologize for the late reply.",
    acceptedAnswers: [
      "Sorry for the late reply.",
      "I am sorry for the delayed response.",
      "I apologize for replying late.",
    ],
    hint: "နောက်ကျတဲ့ပြန်ကြားမှု = late reply / delayed response",
    grammarNote:
      "'Apologize for + noun/gerund' is a polished formal alternative to 'Sorry for...'.",
    difficulty: "intermediate",
  },
  {
    id: "q-work-6",
    categoryId: "cat-work",
    burmesePrompt: "နောက်အပတ် တနင်္လာနေ့အထိ နောက်ဆုံးရက်ကို ရွှေ့ပေးလို့ ရမလား။",
    englishAnswer: "Could we extend the deadline until next Monday?",
    acceptedAnswers: [
      "Could you extend the deadline to next Monday?",
      "Can we move the deadline to next Monday?",
      "Could we push the deadline to next Monday?",
    ],
    hint: "နောက်ဆုံးရက် = deadline, ရွှေ့ = extend / move",
    grammarNote:
      "Use 'extend the deadline until/to + day' when politely negotiating a schedule change.",
    difficulty: "advanced",
  },

  // Travel & Directions
  {
    id: "q-travel-1",
    categoryId: "cat-travel",
    burmesePrompt: "အနီးဆုံး ဘူတာရုံကို ဘယ်လို သွားရမလဲ။",
    englishAnswer: "How can I get to the nearest train station?",
    acceptedAnswers: [
      "How do I get to the nearest train station?",
      "How can I get to the nearest station?",
      "How do I get to the closest train station?",
    ],
    hint: "အနီးဆုံး = nearest / closest, ဘူတာရုံ = train station",
    grammarNote:
      "'How do I get to...?' or 'How can I get to...?' is the standard way to ask for directions.",
    difficulty: "beginner",
  },
  {
    id: "q-travel-2",
    categoryId: "cat-travel",
    burmesePrompt: "တည့်တည့်သွားပြီး ညာဘက်ကို ကွေ့လိုက်ပါ။",
    englishAnswer: "Go straight ahead and turn right.",
    acceptedAnswers: [
      "Go straight and turn right.",
      "Walk straight ahead and turn right.",
    ],
    hint: "တည့်တည့် = straight ahead, ညာဘက်ကွေ့ = turn right",
    grammarNote:
      "Imperative verbs ('Go', 'Turn') give clear, concise directions without needing a subject.",
    difficulty: "beginner",
  },
  {
    id: "q-travel-3",
    categoryId: "cat-travel",
    burmesePrompt: "ကျွန်တော် နှစ်ညအိပ်အတွက် အခန်းတစ်ခန်း ကြိုတင်မှာထားပါတယ်။",
    englishAnswer: "I have a reservation for one room for two nights.",
    acceptedAnswers: [
      "I booked a room for two nights.",
      "I reserved a room for two nights.",
      "I have booked a room for two nights.",
    ],
    hint: "ကြိုတင်မှာထား = booked / have a reservation",
    grammarNote:
      "Use 'for + duration' (for two nights) to specify the length of a hotel stay.",
    difficulty: "intermediate",
  },
  {
    id: "q-travel-4",
    categoryId: "cat-travel",
    burmesePrompt: "လေဆိပ်ကို သွားဖို့ ဘယ်လောက်ကြာမလဲ။",
    englishAnswer: "How long does it take to get to the airport?",
    acceptedAnswers: [
      "How long will it take to go to the airport?",
      "How long does it take to go to the airport?",
      "How long will it take to get to the airport?",
    ],
    hint: "ဘယ်လောက်ကြာ = How long does it take...?",
    grammarNote:
      "The pattern 'How long does it take to + verb?' is essential for asking about travel duration.",
    difficulty: "intermediate",
  },
  {
    id: "q-travel-5",
    categoryId: "cat-travel",
    burmesePrompt: "ဒီဘတ်စ်ကားက မြို့လယ်ခေါင်ကို ရောက်သလား။",
    englishAnswer: "Does this bus go to downtown?",
    acceptedAnswers: [
      "Does this bus go to the city center?",
      "Does this bus go downtown?",
    ],
    hint: "မြို့လယ်ခေါင် = downtown / the city center",
    grammarNote:
      "Notice 'go downtown' needs no preposition, while 'go to the city center' uses 'to the'.",
    difficulty: "beginner",
  },
  {
    id: "q-travel-6",
    categoryId: "cat-travel",
    burmesePrompt: "ကျွန်တော့်ရဲ့ လေယာဉ်ခရီးစဉ်က ရာသီဥတုကြောင့် နှစ်နာရီ နောက်ကျသွားတယ်။",
    englishAnswer: "My flight was delayed by two hours because of the weather.",
    acceptedAnswers: [
      "My flight was delayed for two hours because of the weather.",
      "My flight is delayed by two hours due to the weather.",
      "My flight was delayed two hours due to the weather.",
    ],
    hint: "နောက်ကျသွားတယ် = was delayed, ကြောင့် = because of / due to",
    grammarNote:
      "Use passive voice 'was delayed' with 'because of' or 'due to' followed by a noun phrase.",
    difficulty: "advanced",
  },

  // Food & Dining
  {
    id: "q-food-1",
    categoryId: "cat-food",
    burmesePrompt: "ကျေးဇူးပြုပြီး ဟင်းလျာစာရင်း ကြည့်လို့ ရမလား။",
    englishAnswer: "Could I see the menu, please?",
    acceptedAnswers: [
      "Can I see the menu, please?",
      "May I see the menu, please?",
      "Could we see the menu, please?",
    ],
    hint: "ဟင်းလျာစာရင်း = menu",
    grammarNote:
      "'Could I...?' and 'May I...?' are polite ways to ask waitstaff for something.",
    difficulty: "beginner",
  },
  {
    id: "q-food-2",
    categoryId: "cat-food",
    burmesePrompt: "ကျွန်တော် အစပ် သိပ်မစားနိုင်ပါဘူး။",
    englishAnswer: "I cannot eat very spicy food.",
    acceptedAnswers: [
      "I can't eat very spicy food.",
      "I don't eat very spicy food.",
      "I cannot handle spicy food well.",
    ],
    hint: "အစပ် = spicy food",
    grammarNote:
      "'Cannot' (or 'can't') expresses inability or low tolerance when ordering food.",
    difficulty: "beginner",
  },
  {
    id: "q-food-3",
    categoryId: "cat-food",
    burmesePrompt: "ဒီဟင်းက အရမ်း အရသာရှိတယ်။",
    englishAnswer: "This dish is very delicious.",
    acceptedAnswers: [
      "This dish is really delicious.",
      "This food is very delicious.",
      "This dish tastes amazing.",
    ],
    hint: "ဟင်း = dish / food, အရသာရှိတယ် = delicious",
    grammarNote:
      "You can say 'This dish is delicious' or 'This tastes delicious' to compliment a meal.",
    difficulty: "beginner",
  },
  {
    id: "q-food-4",
    categoryId: "cat-food",
    burmesePrompt: "သကြားနည်းတဲ့ ကော်ဖီအေး တစ်ခွက် ပေးပါ။",
    englishAnswer: "Please give me an iced coffee with less sugar.",
    acceptedAnswers: [
      "I would like an iced coffee with less sugar, please.",
      "Can I have an iced coffee with less sugar?",
      "One iced coffee with less sugar, please.",
    ],
    hint: "ကော်ဖီအေး = iced coffee, သကြားနည်း = with less sugar",
    grammarNote:
      "Use 'with less + uncountable noun' (less sugar, less ice, less salt) when customizing drinks.",
    difficulty: "intermediate",
  },
  {
    id: "q-food-5",
    categoryId: "cat-food",
    burmesePrompt: "ကျေးဇူးပြုပြီး ငွေရှင်းပြေစာ ယူပေးလို့ ရမလား။",
    englishAnswer: "Could we have the bill, please?",
    acceptedAnswers: [
      "Could I have the bill, please?",
      "Can I get the check, please?",
      "Could we get the check, please?",
      "Check, please.",
    ],
    hint: "ငွေရှင်းပြေစာ = bill / check",
    grammarNote:
      "'Bill' is common in British/international English and 'check' is common in American English.",
    difficulty: "beginner",
  },
  {
    id: "q-food-6",
    categoryId: "cat-food",
    burmesePrompt: "ဒီဆိုင်မှာ အထူးအကြံပြုချင်တဲ့ ဟင်းလျာ ရှိပါသလား။",
    englishAnswer:
      "Do you have any dishes you would recommend at this restaurant?",
    acceptedAnswers: [
      "What dish would you recommend here?",
      "Do you have any recommendations?",
      "What do you recommend at this restaurant?",
    ],
    hint: "အကြံပြု = recommend",
    grammarNote:
      "Using 'would you recommend' adds politeness when asking a server for their favorite menu item.",
    difficulty: "intermediate",
  },

  // Grammar & Tenses
  {
    id: "q-grammar-1",
    categoryId: "cat-grammar",
    burmesePrompt: "မနေ့ညက ကျွန်တော် စာအုပ်တစ်အုပ် ဖတ်ပြီးသွားပြီ။",
    englishAnswer: "I finished reading a book last night.",
    acceptedAnswers: [
      "Last night I finished reading a book.",
      "I read a book last night.",
    ],
    hint: "မနေ့ညက = last night (Past Simple tense)",
    grammarNote:
      "Because 'last night' is a finished past time, use the past simple ('finished'), not present perfect.",
    difficulty: "beginner",
  },
  {
    id: "q-grammar-2",
    categoryId: "cat-grammar",
    burmesePrompt: "မိုးရွာရင် ကျွန်တော်တို့ အိမ်ထဲမှာပဲ နေကြမယ်။",
    englishAnswer: "If it rains, we will stay inside.",
    acceptedAnswers: [
      "If it rains, we will stay at home.",
      "We will stay inside if it rains.",
      "We will stay home if it rains.",
    ],
    hint: "First conditional: If + present simple, will + verb",
    grammarNote:
      "In a first conditional sentence, use present simple ('rains') after 'if' and 'will' in the main clause.",
    difficulty: "intermediate",
  },
  {
    id: "q-grammar-3",
    categoryId: "cat-grammar",
    burmesePrompt: "ကျွန်တော် ဒီမြို့မှာ နေထိုင်လာတာ ငါးနှစ် ရှိပါပြီ။",
    englishAnswer: "I have lived in this city for five years.",
    acceptedAnswers: ["I have been living in this city for five years."],
    hint: "Present Perfect: I have lived ... for five years",
    grammarNote:
      "Use Present Perfect ('have lived' / 'have been living') with 'for + duration' for actions that continue into the present.",
    difficulty: "intermediate",
  },
  {
    id: "q-grammar-4",
    categoryId: "cat-grammar",
    burmesePrompt: "သူ ရောက်လာတဲ့အချိန်မှာ ကျွန်တော် ညစာ ချက်နေခဲ့တယ်။",
    englishAnswer: "I was cooking dinner when he arrived.",
    acceptedAnswers: [
      "When he arrived, I was cooking dinner.",
      "I was making dinner when he arrived.",
    ],
    hint: "Past Continuous + when + Past Simple",
    grammarNote:
      "Use past continuous ('was cooking') for the longer background action and past simple ('arrived') for the interrupting event.",
    difficulty: "intermediate",
  },
  {
    id: "q-grammar-5",
    categoryId: "cat-grammar",
    burmesePrompt: "ငါ့မှာ အချိန်ပိုရှိရင် ဂစ်တာတီး သင်ဖြစ်မယ်။",
    englishAnswer: "If I had more time, I would learn to play the guitar.",
    acceptedAnswers: [
      "If I had more free time, I would learn to play the guitar.",
      "If I had more time, I would learn how to play the guitar.",
    ],
    hint: "Second conditional: If + past simple, would + verb",
    grammarNote:
      "Use the second conditional ('If I had..., I would...') to talk about imaginary or unlikely present/future situations.",
    difficulty: "advanced",
  },
  {
    id: "q-grammar-6",
    categoryId: "cat-grammar",
    burmesePrompt: "အရင်ကထက်စာရင် အခု ပိုပြီး ယုံကြည်မှု ရှိလာတယ်။",
    englishAnswer: "I feel more confident now than before.",
    acceptedAnswers: [
      "I am more confident now than I was before.",
      "Now I feel more confident than before.",
      "I have more confidence now than before.",
    ],
    hint: "Comparative: more confident ... than before",
    grammarNote:
      "For multi-syllable adjectives like 'confident', form the comparative with 'more + adjective + than'.",
    difficulty: "advanced",
  },

  // Expressing Opinions
  {
    id: "q-opinions-1",
    categoryId: "cat-opinions",
    burmesePrompt: "ကျွန်တော့်အမြင်အရတော့ နေ့တိုင်း စာဖတ်တာ အရမ်းအကျိုးရှိတယ်။",
    englishAnswer: "In my opinion, reading every day is very beneficial.",
    acceptedAnswers: [
      "In my opinion, reading every day is very useful.",
      "I think reading every day is very beneficial.",
      "In my view, reading every day is very helpful.",
    ],
    hint: "ကျွန်တော့်အမြင်အရ = In my opinion",
    grammarNote:
      "Using a gerund ('reading every day') as the subject creates clean, natural opinion statements.",
    difficulty: "intermediate",
  },
  {
    id: "q-opinions-2",
    categoryId: "cat-opinions",
    burmesePrompt: "မင်းရဲ့ အကြံဉာဏ်ကို ကျွန်တော် အပြည့်အဝ သဘောတူပါတယ်။",
    englishAnswer: "I completely agree with your idea.",
    acceptedAnswers: [
      "I totally agree with your idea.",
      "I fully agree with your idea.",
    ],
    hint: "အပြည့်အဝ သဘောတူ = completely agree / totally agree",
    grammarNote:
      "Remember that 'agree' is a verb itself—say 'I agree', never 'I am agree'.",
    difficulty: "beginner",
  },
  {
    id: "q-opinions-3",
    categoryId: "cat-opinions",
    burmesePrompt: "နည်းပညာက ကျွန်တော်တို့ရဲ့ ဘဝကို ပိုပြီး လွယ်ကူစေခဲ့တယ်။",
    englishAnswer: "Technology has made our lives much easier.",
    acceptedAnswers: [
      "Technology has made our lives easier.",
      "Technology makes our lives easier.",
    ],
    hint: "make + object + comparative adjective (made our lives easier)",
    grammarNote:
      "The structure 'make + noun + adjective' describes how something causes a change in state.",
    difficulty: "intermediate",
  },
  {
    id: "q-opinions-4",
    categoryId: "cat-opinions",
    burmesePrompt: "အမှားတွေကနေ သင်ယူတာဟာ အောင်မြင်မှုအတွက် အရေးကြီးတယ်။",
    englishAnswer: "Learning from mistakes is important for success.",
    acceptedAnswers: [
      "Learning from our mistakes is important for success.",
      "Learning from mistakes is essential for success.",
    ],
    hint: "အမှားတွေကနေ သင်ယူတာ = Learning from mistakes",
    grammarNote:
      "Pair 'learn' with 'from' when referring to the source of a lesson ('learn from mistakes').",
    difficulty: "intermediate",
  },
  {
    id: "q-opinions-5",
    categoryId: "cat-opinions",
    burmesePrompt: "ဒီအချက်ကို နားလည်ပေမယ့် ကျွန်တော်ကတော့ တစ်မျိုးမြင်မိတယ်။",
    englishAnswer: "I understand your point, but I see it differently.",
    acceptedAnswers: [
      "I understand this point, but I have a different perspective.",
      "I see your point, but I think differently.",
      "I understand your point, but I have a different view.",
    ],
    hint: "Polite disagreement: 'I understand your point, but...'",
    grammarNote:
      "Acknowledging the other person's point before using 'but' keeps disagreements respectful and constructive.",
    difficulty: "advanced",
  },
  {
    id: "q-opinions-6",
    categoryId: "cat-opinions",
    burmesePrompt: "ဘာသာစကားအသစ်တစ်ခု သင်ယူတာဟာ စိတ်ရှည်မှုနဲ့ ပုံမှန်လေ့ကျင့်မှု လိုအပ်တယ်။",
    englishAnswer:
      "Learning a new language requires patience and consistent practice.",
    acceptedAnswers: [
      "Learning a new language requires patience and regular practice.",
      "Learning a new language takes patience and consistent practice.",
      "Learning a new language needs patience and regular practice.",
    ],
    hint: "စိတ်ရှည်မှု = patience, ပုံမှန်လေ့ကျင့်မှု = consistent/regular practice",
    grammarNote:
      "'Requires' and 'takes' are strong academic and conversational verbs for describing necessary qualities.",
    difficulty: "advanced",
  },
];
