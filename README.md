# Overthinkistan

---

## 📖 Project Overview | Proje Genel Bakış

**EN:**  
Overthinkistan is a supportive, empathetic, and non-judgmental conversational AI platform designed to help users explore and process their thoughts, feelings, and concerns with clarity and kindness. It offers multiple AI personalities, dynamic mood and theme adaptations, and a safe, welcoming space for emotional reflection.

**TR:**  
Overthinkistan, kullanıcıların düşüncelerini, duygularını ve endişelerini empatiyle, yargılamadan ve anlayışla keşfetmelerine yardımcı olmak için tasarlanmış destekleyici bir sohbet yapay zekasıdır. Birden çok AI kişiliği, dinamik ruh hali ve tema uyarlamaları ile güvenli ve sıcak bir ortam sağlar.

https://overthinkistan.vercel.app

---

## ✨ Key Features | Temel Özellikler

### 1. Emotional Feedback System | Duygusal Geri Bildirim Sistemi  
- ✅ Daily mood selection with 7 emojis and color codes  
- ✅ Automated, mood-based supportive AI responses  
- ✅ Weekly mood history visualization  

### 2. Timing and Routine Algorithm | Zamanlama ve Rutin Algoritması  
- ✅ Time-sensitive welcome messages (morning, noon, evening)  
- ✅ Tone adaptation depending on time of day  

### 3. Safe Space Feeling | Güvenli Alan Hissi  
- ✅ Reassuring “I’m here for you” messages  
- ✅ Visible privacy guarantees  
- ✅ Warm, empathetic language usage  

### 4. Theme System | Tema Sistemi  
- ✅ Three themes: Calm 🌸, Motivational ⚡, Thoughtful 🌙  
- ✅ Unique color palettes per theme  
- ✅ AI tone dynamically adjusted per theme  

### 5. Advanced UX & UI | Gelişmiş Kullanıcı Deneyimi & Arayüz  
- ✅ Fully Turkish interface with English localization  
- ✅ Emotional emoji system and visual mood tracking  
- ✅ Responsive design for mobile and desktop  
- ✅ Modern UI with soft gradients, glass-effect cards (`backdrop-blur`)  
- ✅ Smooth animations and loading indicators  
- ✅ Trust-inspiring privacy and security messages  

### 6. AI Personality Modes | AI Kişilik Modları  
- 7 selectable AI personas:  
  - 🧠 Therapist (Calm and thoughtful)  
  - 💖 Lover (Gentle and loving)  
  - 🫂 Best Friend (Relaxed and friendly)  
  - 👩 Mom (Warm and protective)  
  - 🧢 Coach (Motivating)  
  - 📓 Journal Partner (Curious and exploratory)  
  - 🐸 Sassy Twin (Fun and honest)  
- Adaptive system prompts maintain consistent tone and personality  
- Easy switching without losing chat history  

---

## 🎨 UI Overview | UI Özeti

- **Header:** Logo, title, theme selector, security message (“Senin yanındayım” + privacy guarantee)  
- **Left Sidebar:**  
  - Mood tracker with 7 emoji buttons and color codes + weekly history  
  - AI mode selector with descriptive tooltips (fully localized in Turkish and English)  
  - Relaxation exercises (5-4-3-2-1 grounding, breathing, mindfulness)  
- **Main Chat Area:**  
  - Top bar showing active mode and mood  
  - Auto-scrolling message window with timestamps  
  - Input box with placeholder: "Aklından geçenleri paylaş..." / "Share your thoughts..."  
  - Persistent supportive message: “Senin yanındayım. Her duygun değerli ve normal. 💙”  
- **Smart Greetings:** Vary depending on time of day (e.g. “Günaydın! Yeni bir güne başlarken...” / “Good morning! Starting a new day...”)

---

## 🛠️ Technology Stack | Teknoloji Yığını

- **Frontend:** React + Tailwind CSS  
  - Responsive, modern UI design  
  - Turkish and English localization  
  - Theme and mood dynamic UI updates  
- **Backend:** Flask or Node.js  
  - RESTful API managing dynamic prompts, user sessions, language preferences  
- **Large Language Model:** OpenAI GPT-4-turbo or Anthropic Claude  
  - Temperature set ~0.7 for empathetic, coherent, non-repetitive answers  
- **Authentication:**  
  - Anonymous sessions by default  
  - Optional user login for journaling and mood history persistence  
- **Database:** MongoDB (or equivalent) for emotion tracking and journaling data  
- **Additional Features:**  
  - Emotion tracking & mood history charts  
  - Guided grounding and breathing exercises integrated in UI  

---

## 🌐 Localization & Language Support | Yerelleştirme ve Dil Desteği

- Full Turkish interface with English localization available  
- All UI elements, tooltips, messages, and personality descriptions localized  
- Corrected English translations for:  
  - Role names & descriptions (Therapist, Lover, Best Friend, etc.)  
  - Welcome cards and loading messages (“Overthinkistan is Thinking...”, “Preparing the best experience for you 💙”)  
  - UI headings (“Choose Your Mode”, “Mood History”, “Calm Down Exercises”, etc.)  
  - Breathing exercise labels (“Breathe In”, “Hold”, “Breathe Out”, “Cycle”, “Close”)  

---

## ⚠️ Disclaimer | Uyarı

This AI chatbot is designed to assist emotional reflection and provide empathetic conversational support. It is **not** a substitute for professional medical, psychological, or psychiatric advice, diagnosis, or treatment. If you are experiencing severe mental health issues, please consult a qualified professional.

Bu sohbet AI'sı, duygusal farkındalığı desteklemek ve empatik iletişim sağlamak amacıyla geliştirilmiştir. **Profesyonel tıbbi, psikolojik veya psikiyatrik teşhis ve tedavinin yerine geçmez.** Ciddi ruhsal sorunlarınız varsa, lütfen uzman bir sağlık profesyoneline başvurunuz.

---

## 🚀 Installation & Running | Kurulum ve Çalıştırma

```bash
git clone https://github.com/zelihaguven/overthinkistan.git
cd overthinkistan
npm install
npm run dev
