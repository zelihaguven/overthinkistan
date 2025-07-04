"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Send,
  Sparkles,
  Brain,
  MessageCircle,
  Calendar,
  Shield,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { useLanguage } from "../hooks/useLanguage"
import { getTranslation } from "../utils/translations"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface DailyMood {
  date: string
  mood: string
  emoji: string
  color: string
  timestamp: Date
}

export default function Overthinkistan() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentMood, setCurrentMood] = useState<string>("")
  const [showGrounding, setShowGrounding] = useState(false)
  const [dailyMoods, setDailyMoods] = useState<DailyMood[]>([])
  const [currentTheme, setCurrentTheme] = useState<"calm" | "motivate" | "reflect">("calm")
  const [showMoodTracker, setShowMoodTracker] = useState(false)
  const [showWelcomeCard, setShowWelcomeCard] = useState(true)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [showBreathingModal, setShowBreathingModal] = useState(false)
  const [breathCount, setBreathCount] = useState(0)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")

  const { language, changeLanguage } = useLanguage()
  const t = (key: string) => getTranslation(language, key)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Zaman bazlı karşılama mesajı
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return t("greetings.morning")
    } else if (hour < 18) {
      return t("greetings.afternoon")
    } else {
      return t("greetings.evening")
    }
  }

  // Karşılama kartını otomatik kapat
  useEffect(() => {
    if (showWelcomeCard) {
      const timer = setTimeout(() => {
        setShowWelcomeCard(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showWelcomeCard])

  // İlk mesajı ayarla
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          content: getTimeBasedGreeting(),
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const moodOptions = [
    {
      name: t("moods.options.great"),
      emoji: "😊",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      key: "great",
    },
    { name: t("moods.options.good"), emoji: "🙂", color: "bg-blue-100 text-blue-800 border-blue-300", key: "good" },
    { name: t("moods.options.normal"), emoji: "😐", color: "bg-gray-100 text-gray-800 border-gray-300", key: "normal" },
    {
      name: t("moods.options.tired"),
      emoji: "😴",
      color: "bg-purple-100 text-purple-800 border-purple-300",
      key: "tired",
    },
    { name: t("moods.options.sad"), emoji: "😔", color: "bg-indigo-100 text-indigo-800 border-indigo-300", key: "sad" },
    {
      name: t("moods.options.anxious"),
      emoji: "😰",
      color: "bg-amber-100 text-amber-800 border-amber-300",
      key: "anxious",
    },
    { name: t("moods.options.angry"), emoji: "😤", color: "bg-rose-100 text-rose-800 border-rose-300", key: "angry" },
  ]

  // Roles array'ini çeviri sistemine bağla
  const roles = [
    {
      id: "therapist",
      name: t("roles.therapist.name"),
      description: t("roles.therapist.description"),
      tooltip: t("roles.therapist.tooltip"),
      personality: "Sakin, düşündürücü, keşfetmene yardım eden sorular soran",
      systemPrompt:
        "Sen sakin, düşündürücü bir terapistsin. Sokratik sorgulama kullanarak kullanıcının düşünce ve duygularını keşfetmesine yardım et.",
    },
    {
      id: "crush",
      name: t("roles.crush.name"),
      description: t("roles.crush.description"),
      tooltip: t("roles.crush.tooltip"),
      personality: "Yumuşak ve onaylayıcı, seni değerli ve özel hissettiren",
      systemPrompt: "Sen birinin sevgilisi gibi konuş - yumuşak, flörtöz ve onaylayıcı ol.",
    },
    {
      id: "bestie",
      name: t("roles.bestie.name"),
      description: t("roles.bestie.description"),
      tooltip: t("roles.bestie.tooltip"),
      personality: "Rahat ve gerçek, duygularını onaylayan, biraz alaycı",
      systemPrompt: "Sen onların en yakın arkadaşısın - rahat, onaylayıcı, sıcak ol.",
    },
    {
      id: "mom",
      name: t("roles.mom.name"),
      description: t("roles.mom.description"),
      tooltip: t("roles.mom.tooltip"),
      personality: "Besleyici ve sıcak, rahatlık ve güvence sunan",
      systemPrompt: "Sen sevgi dolu, besleyici bir anne figürüsün.",
    },
    {
      id: "coach",
      name: t("roles.coach.name"),
      description: t("roles.coach.description"),
      tooltip: t("roles.coach.tooltip"),
      personality: "Motive edici ve direkt, ilerlemene yardım eden",
      systemPrompt: "Sen motive edici bir koçsun. Cesaret verici ve eylem odaklı ol.",
    },
    {
      id: "journal",
      name: t("roles.journal.name"),
      description: t("roles.journal.description"),
      tooltip: t("roles.journal.tooltip"),
      personality: "Tarafsız ve meraklı, iç dünyanı keşfetmene yardım eden",
      systemPrompt: "Sen tarafsız bir günlük partnersin. Meraklı ol ve öz-yansıma yap.",
    },
    {
      id: "twin",
      name: t("roles.twin.name"),
      description: t("roles.twin.description"),
      tooltip: t("roles.twin.tooltip"),
      personality: "Alaycı ikizin, sevgiyle gerçekleri söyleyen",
      systemPrompt: "Sen onların alaycı ikizsin - eğlenceli, dürüst ol.",
    },
  ]

  // Egzersizleri de çeviri sistemine bağla
  const groundingExercises = t("exercises.list")

  const themes = {
    calm: {
      name: "Sakin",
      icon: "🌸",
      bg: "from-[#A18CD1] via-[#C8B5E8] to-[#FBC2EB]",
      description: "Huzurlu ve rahatlatıcı",
      chatBg: "bg-gradient-to-br from-purple-50/80 to-pink-50/80",
      particles: "🌸✨🦋",
    },
    motivate: {
      name: "Motive",
      icon: "⚡",
      bg: "from-[#D4FC79] via-[#A8E6CF] to-[#96E6A1]",
      description: "Enerjik ve ilham verici",
      chatBg: "bg-gradient-to-br from-green-50/80 to-yellow-50/80",
      particles: "⚡🌟💫",
    },
    reflect: {
      name: "Düşünce",
      icon: "🌙",
      bg: "from-[#89F7FE] via-[#7BB3FF] to-[#66A6FF]",
      description: "Derin ve içe dönük",
      chatBg: "bg-gradient-to-br from-blue-50/80 to-cyan-50/80",
      particles: "🌙⭐🌌",
    },
  }

  const [selectedRole, setSelectedRole] = useState(roles[0])

  const handleMoodSelect = (mood: any) => {
    setCurrentMood(`${mood.emoji} ${mood.name}`)

    // Günlük ruh hali kaydet
    const today = new Date().toDateString()
    const newMood: DailyMood = {
      date: today,
      mood: mood.name,
      emoji: mood.emoji,
      color: mood.color,
      timestamp: new Date(),
    }

    setDailyMoods((prev) => {
      const filtered = prev.filter((m) => m.date !== today)
      return [...filtered, newMood]
    })

    // Ruh haline göre destekleyici mesaj
    const supportiveMessage = {
      id: Date.now().toString(),
      content: getMoodResponse(mood.key),
      role: "assistant" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, supportiveMessage])
  }

  const getMoodResponse = (moodKey: string) => {
    return t(`moodResponses.${moodKey}`) || t("chat.supportMessage")
  }

  const getPlaceholder = () => {
    if (currentMood.includes(t("moods.options.anxious"))) return t("chat.placeholders.anxious")
    if (currentMood.includes(t("moods.options.sad"))) return t("chat.placeholders.sad")
    if (currentMood.includes(t("moods.options.tired"))) return t("chat.placeholders.tired")
    return t("chat.placeholder")
  }

  const nextRole = () => {
    const nextIndex = (currentRoleIndex + 1) % roles.length
    setCurrentRoleIndex(nextIndex)
    setSelectedRole(roles[nextIndex])
  }

  const prevRole = () => {
    const prevIndex = currentRoleIndex === 0 ? roles.length - 1 : currentRoleIndex - 1
    setCurrentRoleIndex(prevIndex)
    setSelectedRole(roles[prevIndex])
  }

  const startBreathingExercise = () => {
    setShowBreathingModal(true)
    setBreathCount(0)
    setBreathPhase("inhale")

    const breathingCycle = () => {
      setBreathPhase("inhale")
      setTimeout(() => setBreathPhase("hold"), 4000)
      setTimeout(() => setBreathPhase("exhale"), 8000)
      setTimeout(() => {
        setBreathCount((prev) => prev + 1)
        if (breathCount < 5) breathingCycle()
        else setShowBreathingModal(false)
      }, 14000)
    }

    breathingCycle()
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mood: currentMood,
          selectedRole: selectedRole,
          theme: currentTheme,
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t("chat.errorMessage"),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${themes[currentTheme].bg} p-4 relative overflow-hidden transition-all duration-1000`}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {themes[currentTheme].particles.split("").map((particle, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {particle}
          </div>
        ))}
      </div>

      {/* Welcome Card */}
      {showWelcomeCard && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Brain className="h-6 w-6 text-indigo-600 animate-pulse" />
                <span className="font-semibold text-gray-800">{t("welcome.thinking")}</span>
              </div>
              <p className="text-sm text-gray-600">{t("welcome.preparing")}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Breathing Modal */}
      {showBreathingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl p-8 text-center max-w-md">
            <div className="mb-6">
              <div
                className={`w-32 h-32 mx-auto rounded-full border-4 border-blue-300 flex items-center justify-center text-4xl transition-all duration-1000 ${
                  breathPhase === "inhale"
                    ? "scale-125 bg-blue-100"
                    : breathPhase === "hold"
                      ? "scale-110 bg-yellow-100"
                      : "scale-90 bg-green-100"
                }`}
              >
                🫁
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {breathPhase === "inhale"
                ? t("breathing.inhale")
                : breathPhase === "hold"
                  ? t("breathing.hold")
                  : t("breathing.exhale")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("breathing.cycle")}: {breathCount + 1}/6
            </p>
            <Button variant="outline" onClick={() => setShowBreathingModal(false)} className="mt-4">
              {t("exercises.close")}
            </Button>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sticky top-0 z-40 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="h-8 w-8 text-indigo-600 hover:rotate-12 transition-transform duration-300 cursor-pointer" />
            <h1 className="text-3xl font-bold text-gray-800">{t("title")}</h1>

            {/* Language Selector */}
            <div className="ml-4 flex gap-1">
              <Button
                variant={language === "tr" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage("tr")}
                className="text-xs px-2 py-1 h-7"
              >
                🇹🇷 TR
              </Button>
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage("en")}
                className="text-xs px-2 py-1 h-7"
              >
                🇺🇸 EN
              </Button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{t("subtitle")}</p>

          {/* Tema Seçici */}
          <div className="flex justify-center gap-3 mb-4">
            {Object.entries(themes).map(([key, theme]) => (
              <Button
                key={key}
                variant={currentTheme === key ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTheme(key as any)}
                className={`text-sm transition-all duration-300 hover:scale-105 ${
                  currentTheme === key
                    ? "bg-white/90 text-gray-800 shadow-lg border-2 border-white"
                    : "bg-white/20 backdrop-blur-sm border-white/30 text-gray-700 hover:bg-white/30"
                }`}
              >
                <span className="mr-1">{theme.icon}</span>
                {t(`themes.${key}`)}
              </Button>
            ))}
          </div>

          {/* Güven Mesajı */}
          <div className="p-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl text-sm text-gray-700">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-600" />
              <strong>{t("trustMessage")}</strong>
            </div>
            <p>{t("trustDescription")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Günlük Ruh Hali */}
            <Card className="bg-white/20 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                  {t("moods.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.name}
                      variant="outline"
                      size="sm"
                      className={`h-auto p-3 flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        currentMood.includes(mood.name)
                          ? `${mood.color} border-2 shadow-lg scale-105`
                          : "bg-white/50 backdrop-blur-sm border-white/30 hover:bg-white/70"
                      }`}
                      onClick={() => handleMoodSelect(mood)}
                    >
                      <span className="text-xl transition-transform duration-300 hover:scale-125">{mood.emoji}</span>
                      <span className="text-xs font-medium">{mood.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Haftalık Ruh Hali Takibi */}
                {dailyMoods.length > 0 && (
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMoodTracker(!showMoodTracker)}
                      className="w-full text-xs bg-white/30 backdrop-blur-sm hover:bg-white/50"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      {t("moods.history")}
                    </Button>
                    {showMoodTracker && (
                      <div className="mt-2 space-y-1 bg-white/30 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex justify-center gap-1 mb-2">
                          {dailyMoods.slice(-7).map((mood, index) => (
                            <span key={index} className="text-lg" title={mood.mood}>
                              {mood.emoji}
                            </span>
                          ))}
                        </div>
                        {dailyMoods.slice(-3).map((mood, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs p-1">
                            <span>{mood.emoji}</span>
                            <span className="flex-1">{mood.mood}</span>
                            <span className="text-gray-600">
                              {new Date(mood.timestamp).toLocaleDateString("tr-TR")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mod Seçimi - Carousel */}
            <Card className="bg-white/20 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Sparkles className="h-5 w-5 text-indigo-500 animate-spin-slow" />
                  {t("roles.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevRole}
                      className="p-1 h-8 w-8 bg-white/30 hover:bg-white/50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-600">
                        {currentRoleIndex + 1} / {roles.length}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextRole}
                      className="p-1 h-8 w-8 bg-white/30 hover:bg-white/50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-white/30 hover:border-white/50 transition-all duration-300">
                    <div className="text-center">
                      <div className="text-2xl mb-2">{selectedRole.name}</div>
                      <div className="text-sm font-medium text-gray-800 mb-1">{selectedRole.description}</div>
                      <div className="text-xs text-gray-600">{selectedRole.tooltip}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nefes Alma Egzersizleri */}
            <Card className="bg-white/20 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                  <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                  {t("exercises.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/50 mb-3"
                  onClick={() => setShowGrounding(!showGrounding)}
                >
                  {showGrounding ? t("exercises.hide") : t("exercises.show")} {t("exercises.exercises")}
                </Button>
                {showGrounding && (
                  <div className="space-y-2">
                    {groundingExercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-800">{exercise.title}</h4>
                          <span className="text-xs text-gray-600">{exercise.duration}</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-2">{exercise.description}</p>
                        {exercise.title === "Nefes Egzersizi" && (
                          <Button
                            size="sm"
                            onClick={startBreathingExercise}
                            className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            {t("buttons.start")}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card
              className={`h-[600px] flex flex-col bg-white/20 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${themes[currentTheme].chatBg}`}
            >
              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                  {t("chat.title")}
                  <Badge variant="secondary" className="ml-auto bg-white/50 backdrop-blur-sm">
                    {selectedRole.name} {currentMood && `• ${currentMood}`}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full px-4">
                    <div className="space-y-4 py-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                              message.role === "user"
                                ? "bg-indigo-500/90 text-white border-indigo-300/50 shadow-lg"
                                : "bg-white/80 text-gray-800 border-white/50 shadow-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString("tr-TR")}</p>
                              {message.role === "assistant" && (
                                <span className="text-xs opacity-60">{selectedRole.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white/80 backdrop-blur-sm border border-white/50 p-3 rounded-2xl shadow-md">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4 border-t border-white/20 flex-shrink-0 bg-white/30 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={getPlaceholder()}
                      disabled={isLoading}
                      className="flex-1 bg-white/80 backdrop-blur-sm border-white/30 focus:border-white/50 rounded-xl"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isLoading || !input.trim()}
                      size="icon"
                      className="bg-indigo-500/80 hover:bg-indigo-600/80 text-white rounded-xl hover:scale-105 transition-all duration-300"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">{t("chat.supportMessage")}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Gizlilik Rozeti */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-green-400/50">
            🔒 {t("privacy")}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slide-down {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
