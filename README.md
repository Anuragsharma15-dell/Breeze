AI Chat Platform
A full-stack AI chat application built with Next.js, Supabase, OpenAI & NextAuth
<p align="center"> <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" /> <img src="https://img.shields.io/badge/OpenAI-API-green?logo=openai" /> <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase" /> <img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" /> <img src="https://img.shields.io/badge/License-MIT-blue" /> </p>
✨ Features

🔐 Authentication using NextAuth

💬 Real-time AI chat with OpenAI

🧠 Chat session auto-generation

🗄️ Supabase DB storage for chats/messages

⭐ Favourites & history

🚫 Rate limiting per user

⚡ Server Actions for backend logic

🎨 Modern UI with Tailwind + ShadCN

| Category   | Tech                        |
| ---------- | --------------------------- |
| Framework  | **Next.js 14 (App Router)** |
| AI         | **OpenAI (AI SDK)**         |
| DB         | **Supabase / PostgreSQL**   |
| Auth       | **NextAuth**                |
| Styling    | **Tailwind CSS**, ShadCN    |
| Deployment | **Vercel**                  |

app/
 ├── (auth)/
 ├── api/
 │    └── v1/
 │         └── chat/
 │              ├── route.ts
 │              ├── rate-limit/route.ts
 │              └── favourite/route.ts
 ├── actions/
 │    └── chatSession.ts
components/
lib/
supabase/
.env.local


# NEXTAUTH -------------------------
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OPENAI ---------------------------
OPENAI_API_KEY=your-openai-key

# SUPABASE -------------------------
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

# RATE LIMIT -----------------------
RATE_LIMIT=5

Local Development
npm install
npm run dev

DEPLOYMENT

git add .
git commit -m "Deploying to Vercel"
git push origin main

2. Import repo into Vercel
3. Add all environment variables

From .env.local

4. After deployment, update:
5. NEXTAUTH_URL=https://your-vercel-domain.vercel.app

API ENDPOINTS
POST   /api/v1/chat
GET    /api/v1/chat
GET    /api/v1/chat/rate-limit
GET    /api/v1/chat/favourite
POST   /api/v1/chat/favourite
EXAMPLE SERVER ACTIONS 
export async function createChatSession(formData: FormData) {
  const message = formData.get("message") as string;
  const userId = formData.get("userId") as string;

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: TITLE_SYSTEM_PROMPT,
    prompt: message,
  });

  const chat = await prisma.chat.create({
    data: { userId, title: text },
  });

  await prisma.message.create({
    data: {
      chatId: chat.id,
      userId,
      sender: "user",
      content: message,
      status: "PENDING",
      orderIndex: 1,
    },
  });

  return { success: true, data: { chatId: chat.id } };
}

🧑‍💻 Author

Anurag Sharma
Full-Stack Developer • AI Engineer


⭐ Contribute

PRs are welcome!
If you found this project useful — please ⭐ the repo!


