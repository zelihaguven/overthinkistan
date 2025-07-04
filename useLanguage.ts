"use client"

import { useState, useEffect } from "react"

export type Language = "tr" | "en"

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("tr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("overthinkistan-language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("overthinkistan-language", newLanguage)
  }

  return { language, changeLanguage }
}
