"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to main app
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-indigo-200 rounded-full opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Brain className="h-12 w-12 text-indigo-600" />
              <Heart className="h-6 w-6 text-pink-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Overthinkistan
            </h1>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to your safe space for thoughts and feelings.
            <br />
            <span className="text-indigo-600 font-medium">You belong here. ✨</span>
          </p>
        </div>

        {/* Login/Signup Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {isLogin ? "Welcome back!" : "Join our community"}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? "Ready to continue your journey of self-discovery?"
                : "Take the first step towards understanding yourself better"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    What should we call you?
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name or nickname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isLogin ? "Signing you in..." : "Creating your space..."}
                  </div>
                ) : (
                  <>
                    {isLogin ? "Enter your space" : "Create my space"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Toggle between login/signup */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">{isLogin ? "New to Overthinkistan?" : "Already have an account?"}</p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-700 font-medium p-0 h-auto"
              >
                {isLogin ? "Create your safe space" : "Welcome back, sign in"}
              </Button>
            </div>

            {/* Guest option */}
            <div className="text-center pt-2">
              <p className="text-gray-500 text-xs mb-2">Not ready to create an account?</p>
              <Link href="/">
                <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent">
                  Continue as guest
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Reassuring message */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Your privacy and emotional safety are our top priority</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            <strong>Gentle reminder:</strong> Overthinkistan is a supportive AI companion, not a replacement for
            professional therapy. If you're experiencing a mental health crisis, please reach out to a qualified
            healthcare provider or crisis helpline.
          </p>
        </div>
      </div>
    </div>
  )
}
