AI Chat Platform – Full-Stack Next.js Application

A production-ready AI chat platform built with Next.js 14, Server Actions, NextAuth, Supabase, OpenAI, and Vercel Edge Functions.
This project provides real-time AI chat, session management, rate-limiting, authentication, favourites, history, and more.

✨ Features
🔐 Authentication

Secure login using NextAuth

Persistent sessions stored in Supabase or JWT

Protected server actions & API routes

💬 AI Chat System

Chat with OpenAI via server actions

Stores conversations into Supabase

Auto-session creation

Chat pagination & streaming

Favourite chat marking

🧠 OpenAI Integration

GPT-4 / GPT-4o / GPT-3.5 support

AI responses through secure server actions

No API keys exposed on the client

📦 Backend

REST API endpoints under /api/v1/chat

Rate limiting per user

Edge-optimized routes

Secure database calls

🗄️ Database (Supabase)

Chat Sessions

Chat Messages

Favourites

User Profiles

⚡ UX & Frontend

Modern UI with Tailwind CSS

Responsive & fast

Dark mode support

Clean component architecture

☁️ Deployment-Ready

Built for Vercel

Environment-variable driven

Zero-config deployment

🏗️ Tech Stack
Category	Technology
Framework	Next.js 14 (App Router)
UI	Tailwind CSS, ShadCN
Auth	NextAuth.js
Database	Supabase
AI	OpenAI API
Deployment	Vercel
Rate Limit	Custom middleware / KV Support
Server Runtime	Edge & Node
📁 Project Structure
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

🔧 Environment Variables

Create .env.local:

# ------------------------
# NEXTAUTH
# ------------------------
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# ------------------------
# OPENAI
# ------------------------
OPENAI_API_KEY=your-openai-key

# ------------------------
# SUPABASE
# ------------------------
SUPABASE_URL=https://xxxxxx.supabase.co
SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_KEY=service-role-key

# ------------------------
# RATE LIMIT
# ------------------------
RATE_LIMIT=5


⚠️ Never commit .env.local.
Use Vercel → Project → Settings → Environment Variables to add them for production.

🚀 Local Development
# Install dependencies
npm install

# Run locally
npm run dev

Verify APIs
GET /api/v1/chat
GET /api/v1/chat/rate-limit
POST /api/v1/chat

☁️ Deploying to Vercel
Step 1: Push to GitHub
git add .
git commit -m "deploy"
git push origin main

Step 2: Import Repo in Vercel
Step 3: Add Environment Variables

Copy everything from your .env.local.

Step 4: Update NEXTAUTH_URL after first deploy:
NEXTAUTH_URL=https://yourproject.vercel.app

Step 5: Redeploy

Your project is now fully live. 🎉

🗄️ Supabase Setup
Enable Email Auth

Dashboard → Authentication → Providers → Email + Password (Enable)

Configure URLs

Authentication → URL Configurations:

Site URL: https://yourproject.vercel.app
Redirect URLs:
- https://yourproject.vercel.app/api/auth/callback/*
- http://localhost:3000/api/auth/callback/*

Import Database Schema

Create:

chats table

messages table

favourites table

users table

(You can ask me for SQL schema — I’ll generate it.)

🔌 API Overview
POST /api/v1/chat

Send a message → AI generates response → Saves to DB.

GET /api/v1/chat

Fetch paginated sessions.

GET /api/v1/chat/rate-limit

Check if user can send a message.

GET /api/v1/chat/favourite

Get all favourites.

POST /api/v1/chat/favourite

Toggle favourite status.

🧪 Example Server Action
export async function createChatSession(input: ChatInput) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const data = await supabase
      .from("chat_sessions")
      .insert({ user_id: session.user.id, ...input })
      .select()
      .single();

    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

📸 Screenshots (Add your images)
/public/screenshots/home.png
/public/screenshots/chat.png
/public/screenshots/auth.png

![Home](./public/screenshots/home.png)
![Chat](./public/screenshots/chat.png)
![Login](./public/screenshots/auth.png)

🛠️ Troubleshooting
❌ 500: “Something went wrong”

Check missing environment variables on Vercel.

❌ Session undefined

Fix:

NEXTAUTH_URL=https://yourproject.vercel.app

❌ Login not working

Set Supabase redirect URLs correctly.

❌ OpenAI not working

Ensure:

OPENAI_API_KEY exists in Vercel environment

🧑‍💻 Author

Anurag Sharma
AI Developer • Full-Stack Engineer
GitHub: https://github.com/Axshul

⭐ Contribute

PRs are welcome!
Star ⭐ the repo if you like it.

If you want, I can also create:

✅ A stunning GitHub README banner
✅ A typing animation header
✅ Better badges and icons
✅ A live demo link section

Just tell me!
