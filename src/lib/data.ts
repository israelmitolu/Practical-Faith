import { Confession, MoodOption } from "./types";

export const confessions: Confession[] = [
  // Faith Confessions
  {
    id: "faith-1",
    text: "I walk by faith, not by sight. I am fully convinced that God is able to do what He has promised.",
    scripture: "2 Corinthians 5:7, Romans 4:21",
    category: "faith",
    moods: ["anxious", "fearful", "discouraged"],
  },
  {
    id: "faith-2",
    text: "My faith is the victory that overcomes the world. I can do all things through Christ who strengthens me.",
    scripture: "1 John 5:4, Philippians 4:13",
    category: "faith",
    moods: ["discouraged", "overwhelmed"],
  },
  {
    id: "faith-3",
    text: "I live by faith in the Son of God, who loved me and gave Himself for me. I am filled with all joy and peace as I trust in Him.",
    scripture: "Galatians 2:20, Romans 15:13",
    category: "faith",
    moods: ["sad", "discouraged"],
  },

  // Peace Confessions
  {
    id: "peace-1",
    text: "The peace of God, which surpasses all understanding, guards my heart and mind in Christ Jesus.",
    scripture: "Philippians 4:7",
    category: "peace",
    moods: ["anxious", "overwhelmed"],
  },
  {
    id: "peace-2",
    text: "I will not let my heart be troubled or afraid, for I have the peace of Christ within me.",
    scripture: "John 14:27",
    category: "peace",
    moods: ["fearful", "anxious"],
  },
  {
    id: "peace-3",
    text: "I cast all my anxiety on Him because He cares for me. His perfect love casts out all fear from my life.",
    scripture: "1 Peter 5:7, 1 John 4:18",
    category: "peace",
    moods: ["anxious", "fearful"],
  },

  // Healing Confessions
  {
    id: "healing-1",
    text: "By the stripes of Jesus, I am healed. The Lord is my healer, and His healing power flows through me.",
    scripture: "Isaiah 53:5, Exodus 15:26",
    category: "healing",
    moods: ["discouraged", "sad"],
  },
  {
    id: "healing-2",
    text: "Christ has redeemed me from the curse, and I receive the blessing of divine health. Sickness and disease have no place in my body.",
    scripture: "Galatians 3:13, Psalm 103:3",
    category: "healing",
    moods: ["discouraged"],
  },
  {
    id: "healing-3",
    text: "I listen carefully to the Lord's voice and do what is right in His sight. He keeps me free from every disease because He is my healer.",
    scripture: "Exodus 15:26",
    category: "healing",
    moods: ["discouraged", "anxious"],
  },

  // Protection Confessions
  {
    id: "protection-1",
    text: "The Lord is my rock, my fortress, and my deliverer. In Him I take refuge; He is my shield and the horn of my salvation.",
    scripture: "Psalm 18:2",
    category: "protection",
    moods: ["fearful", "anxious"],
  },
  {
    id: "protection-2",
    text: "No weapon formed against me shall prosper. This is my heritage as a servant of the Lord.",
    scripture: "Isaiah 54:17",
    category: "protection",
    moods: ["fearful", "anxious"],
  },
  {
    id: "protection-3",
    text: "I dwell in the secret place of the Most High and abide under the shadow of the Almighty. He is my refuge and fortress.",
    scripture: "Psalm 91:1-2",
    category: "protection",
    moods: ["fearful", "anxious", "overwhelmed"],
  },

  // Prosperity Confessions
  {
    id: "prosperity-1",
    text: "The Lord blesses all the work of my hands. I am blessed in the city and blessed in the field.",
    scripture: "Deuteronomy 28:3-4",
    category: "prosperity",
    moods: ["discouraged", "hopeful"],
  },
  {
    id: "prosperity-2",
    text: "My God supplies all my needs according to His riches in glory in Christ Jesus. I am blessed to be a blessing.",
    scripture: "Philippians 4:19, Genesis 12:2",
    category: "prosperity",
    moods: ["anxious", "hopeful"],
  },
  {
    id: "prosperity-3",
    text: "As I delight myself in the Lord, He gives me the desires of my heart. I am like a tree planted by streams of water, prospering in all I do.",
    scripture: "Psalm 37:4, Psalm 1:3",
    category: "prosperity",
    moods: ["hopeful", "grateful"],
  },

  // Wisdom Confessions
  {
    id: "wisdom-1",
    text: "I have the mind of Christ. The wisdom that comes from heaven guides my decisions and actions.",
    scripture: "1 Corinthians 2:16, James 3:17",
    category: "wisdom",
    moods: ["overwhelmed", "anxious"],
  },
  {
    id: "wisdom-2",
    text: "The Lord gives me wisdom generously without finding fault. I ask in faith and receive divine insight for every situation.",
    scripture: "James 1:5-6",
    category: "wisdom",
    moods: ["overwhelmed", "anxious"],
  },
  {
    id: "wisdom-3",
    text: "God's Word is a lamp to my feet and a light to my path. I walk in wisdom and understanding.",
    scripture: "Psalm 119:105, Proverbs 4:7",
    category: "wisdom",
    moods: ["overwhelmed", "discouraged"],
  },

  // Strength Confessions
  {
    id: "strength-1",
    text: "The joy of the Lord is my strength. I am strong in the Lord and in the power of His might.",
    scripture: "Nehemiah 8:10, Ephesians 6:10",
    category: "strength",
    moods: ["discouraged", "overwhelmed", "sad"],
  },
  {
    id: "strength-2",
    text: "I can do all things through Christ who strengthens me. His power is made perfect in my weakness.",
    scripture: "Philippians 4:13, 2 Corinthians 12:9",
    category: "strength",
    moods: ["overwhelmed", "discouraged"],
  },
  {
    id: "strength-3",
    text: "Those who wait upon the Lord shall renew their strength. I mount up with wings like eagles; I run and am not weary; I walk and do not faint.",
    scripture: "Isaiah 40:31",
    category: "strength",
    moods: ["discouraged", "overwhelmed"],
  },

  // Identity Confessions
  {
    id: "identity-1",
    text: "I am a child of God, born of His Spirit. I am the righteousness of God in Christ Jesus.",
    scripture: "John 1:12, 2 Corinthians 5:21",
    category: "identity",
    moods: ["discouraged", "sad"],
  },
  {
    id: "identity-2",
    text: "I am God's masterpiece, created in Christ Jesus for good works which God prepared beforehand.",
    scripture: "Ephesians 2:10",
    category: "identity",
    moods: ["discouraged", "sad"],
  },
  {
    id: "identity-3",
    text: "I am more than a conqueror through Him who loves me. I am an ambassador for Christ, and God makes His appeal through me.",
    scripture: "Romans 8:37, 2 Corinthians 5:20",
    category: "identity",
    moods: ["discouraged", "fearful"],
  },

  // Daily Confessions
  {
    id: "daily-1",
    text: "This is the day the Lord has made; I will rejoice and be glad in it. His mercy and loving kindness are new every morning.",
    scripture: "Psalm 118:24, Lamentations 3:22-23",
    category: "daily",
    moods: ["joyful", "grateful", "peaceful"],
  },
  {
    id: "daily-2",
    text: "The Lord directs my steps today, and I delight in His way. He has plans to prosper me and not to harm me, plans to give me hope and a future.",
    scripture: "Psalm 37:23, Jeremiah 29:11",
    category: "daily",
    moods: ["hopeful", "peaceful"],
  },
  {
    id: "daily-3",
    text: "I set my mind on things above today, not on earthly things. I fix my thoughts on what is true, honorable, right, pure, lovely, and admirable.",
    scripture: "Colossians 3:2, Philippians 4:8",
    category: "daily",
    moods: ["anxious", "overwhelmed"],
  },
];

export const moodOptions: MoodOption[] = [
  { value: "joyful", label: "Joyful", emoji: "😊" },
  { value: "peaceful", label: "Peaceful", emoji: "😌" },
  { value: "anxious", label: "Anxious", emoji: "😰" },
  { value: "fearful", label: "Fearful", emoji: "😨" },
  { value: "sad", label: "Sad", emoji: "😔" },
  { value: "hopeful", label: "Hopeful", emoji: "🙏" },
  { value: "grateful", label: "Grateful", emoji: "🥰" },
  { value: "discouraged", label: "Discouraged", emoji: "😞" },
  { value: "overwhelmed", label: "Overwhelmed", emoji: "😩" },
];

export const categoryLabels: Record<string, string> = {
  faith: "Faith",
  peace: "Peace",
  healing: "Healing",
  protection: "Protection",
  prosperity: "Prosperity",
  wisdom: "Wisdom",
  strength: "Strength",
  identity: "Identity",
  daily: "Daily",
  "my-confessions": "My Confessions",
};

export const getDailyConfession = (): Confession => {
  const dailyConfessions = confessions.filter((c) => c.category === "daily");
  const date = new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const confession = dailyConfessions[dayOfYear % dailyConfessions.length];
  return { ...confession, isToday: true };
};

export const getConfessionsByMood = (mood: string): Confession[] => {
  return confessions.filter((c) => c.moods?.includes(mood as any));
};

export const getConfessionsByCategory = (category: string): Confession[] => {
  return confessions.filter((c) => c.category === category);
};
