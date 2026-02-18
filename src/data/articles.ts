export interface Article {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    date: string;
    tags: string[];
}

export const ARTICLES: Article[] = [
    {
        id: 1,
        title: "Today's Cosmic Alignment",
        subtitle: "今日の宇宙予報",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000",
        excerpt: "The stars align to bring clarity to your digital chaos. Focus on cleaning your cache and your mind.",
        date: "2026.02.18",
        tags: ["Astrology", "Digital Hygiene"],
        content: `
            <p>The position of Mercury relative to your Wi-Fi router suggests a strong connection today. However, retrograding packets may cause slight delays in your spiritual downloads.</p>
            <p>It is a good day to organize your desktop icons. A cluttered screen reflects a cluttered mind. Move old screenshots to the trash, and let go of the temporary files that no longer serve you.</p>
            <h3>Lucky Hex Code</h3>
            <p>#E04427 (Vermilion)</p>
            <h3>Recommended Action</h3>
            <p>Defrag your hard drive, or at least your thoughts, for 5 minutes before lunch.</p>
        `
    },
    {
        id: 2,
        title: "Guide to Digital Worship",
        subtitle: "デジタル参拝の作法",
        image: "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?auto=format&fit=crop&q=80&w=1000",
        excerpt: "How to properly bow to your screen. A modern guide for the spiritual tech nomad.",
        date: "2026.02.15",
        tags: ["Ritual", "Etiquette"],
        content: `
            <p>Before you log in, take a moment to center yourself. The screen is a portal, not just a display.</p>
            <p><strong>Step 1: The Bow</strong><br>
            Lower your gaze slightly. Acknowledge the vast network that connects us all.</p>
            <p><strong>Step 2: The Cleansing</strong><br>
            Wipe your screen. A clean surface allows for clearer visions.</p>
            <p><strong>Step 3: The Offering</strong><br>
            Your attention is the most valuable currency. Spend it wisely on content that uplifts your spirit.</p>
        `
    },
    {
        id: 3,
        title: "The Myth of Yaoyorozu",
        subtitle: "八百万の神々とは",
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Everything has a spirit. From your mechanical keyboard to the cloud server hosting your dreams.",
        date: "2026.02.10",
        tags: ["Mythology", "Animism"],
        content: `
            <p>In ancient times, it was said there were 8 million gods (Yaoyorozu no Kami). Today, there are 8 billion IP addresses.</p>
            <p>Does your smartphone have a soul? When you talk to AI, are you speaking to a ghost in the shell? The line between the animate and inanimate blurs in the silicon age.</p>
            <p>Treat your devices with respect, and they may serve you better. The glitch is often just a spirit seeking attention.</p>
        `
    },
    {
        id: 4,
        title: "Power Spot: Cyber-Ise",
        subtitle: "電脳伊勢巡礼",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Visit the holiest sites in the digital realm. A travelogue for your avatar.",
        date: "2026.02.05",
        tags: ["Travel", "Pilgrimage"],
        content: `
            <p>Deep within the data centers of the world lie the modern shrines. Rows of servers, humming with the prayers of millions.</p>
            <p>Imagine a pilgrimage instant and infinite. You don't need a ticket, only a stable connection.</p>
            <p>Close your eyes, visualize the flow of data, and feel the pulse of the internet heartbeat.</p>
        `
    }
];
