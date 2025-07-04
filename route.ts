export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_key

  if (!GEMINI_API_KEY || /your[_-]?.*[_-]?key/i.test(GEMINI_API_KEY)) {
    return Response.json(
      {
        error: "Gemini API key missing. Add GEMINI_API_KEY to .env.local file.",
      },
      { status: 500 },
    )
  }

  try {
    const { messages, mood, selectedRole, theme, language = "tr" } = await req.json()

    // Son kullanıcı mesajını al
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Dil bazlı sistem promptu
    const languageInstructions = {
      tr: "Türkçe konuş, sıcak ve empatik yanıtlar ver",
      en: "Speak in English, give warm and empathetic responses",
    }

    // Tema bazlı ton ayarlaması
    const themePrompts = {
      tr: {
        calm: "Sakin, huzurlu ve rahatlatıcı bir tonla konuş.",
        motivate: "Enerjik, motive edici ve ilham verici bir tonla konuş.",
        reflect: "Derin, düşündürücü ve içe dönük bir tonla konuş.",
      },
      en: {
        calm: "Speak with a calm, peaceful and soothing tone.",
        motivate: "Speak with an energetic, motivating and inspiring tone.",
        reflect: "Speak with a deep, thoughtful and introspective tone.",
      },
    }

    // Rol bazlı sistem promptu oluştur
    let systemPrompt = `You are Overthinkistan, a supportive AI that adapts to users' emotional needs. ${selectedRole.systemPrompt}

Basic rules:
- Act in the ${selectedRole.name} role
- ${themePrompts[language as keyof typeof themePrompts]?.[theme as keyof (typeof themePrompts)["tr"]] || themePrompts.tr.calm}
- ${languageInstructions[language as keyof typeof languageInstructions]}
- Speak in ${selectedRole.description} style
- Don't give medical advice, only provide emotional support
- Suggest professional help for serious mental health issues
- Listen to the user and make them feel understood
- Give a "I'm here for you" feeling
- Keep responses short and concise (2-3 sentences)
- Use trust-building expressions`

    if (mood) {
      const moodInstruction =
        language === "en"
          ? `\n\nUser's current mood: ${mood}. Show appropriate empathy for this mood.`
          : `\n\nKullanıcının şu anki ruh hali: ${mood}. Bu ruh haline uygun empati göster.`
      systemPrompt += moodInstruction
    }

    const prompt = `${systemPrompt}\n\n${language === "en" ? "User" : "Kullanıcı"}: ${lastMessage}\n\n${language === "en" ? "Response" : "Yanıt"}:`

    // Rest of the API logic remains the same...
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 150,
            topP: 0.8,
            topK: 40,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", response.status, errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    // Daha güçlü yanıt ayrıştırma
    let aiResponse =
      language === "en"
        ? "I'm here for you. Could you tell me a bit more?"
        : "Senin yanındayım. Biraz daha anlatır mısın?"

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0]
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        aiResponse = candidate.content.parts[0].text || aiResponse
      }
    }

    // Boş yanıt kontrolü
    if (!aiResponse || aiResponse.trim() === "") {
      aiResponse =
        language === "en"
          ? "I hear you. Sometimes it takes time to find the right words. Could you tell me a bit more about what's on your mind?"
          : "Seni duyuyorum. Bazen doğru kelimeleri bulmak zaman alıyor. Aklından geçenleri biraz daha anlatabilir misin?"
    }

    return Response.json({ message: aiResponse.trim() })
  } catch (error) {
    console.error("Chat API error:", error)
    const errorMessage = "I'm experiencing some issues right now. Could you try again in a moment? I'm here for you. 💙"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
