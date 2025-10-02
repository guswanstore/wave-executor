"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab: "login" | "signup"
  onLoginSuccess?: (userData: { username: string; waveKey: string; profileImage?: string }) => void
}

const VALID_PREMIUM_KEYS = [
  "GUS-WAN-WAVE-2025",
  "AMR-GUSWAN-EXECUTOR-BEST.",
  "2W-EXECUTOR-PC-BEST",
  "ALL-FOR-ONE-EXPLOIT",
  "PREMIUM-FAMAUS-BEST",
  "INDONESIA-EXPLOIT",
]

const WAVE_EXECUTOR_KEYS = ["AMV-ASSAN-SKASHA-ASJSAJ", "ABSB-SJANSAH-AKJAJS", "WAVE-DKSJA-LUA", "EXC-AJSA-ASHHAJ-JSJA"]

export function AuthModal({ open, onOpenChange, defaultTab, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupKey, setSignupKey] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [error, setError] = useState("")

  // Update active tab when defaultTab changes
  useState(() => {
    setActiveTab(defaultTab)
  })

  const handleLogin = () => {
    const storedUsers = localStorage.getItem("waveUsers")
    if (storedUsers) {
      const users = JSON.parse(storedUsers)
      const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword)

      if (user) {
        onLoginSuccess?.(user)
        onOpenChange(false)
        setError("")
        return
      }
    }

    setError("Invalid email or password")
  }

  const handleSignup = () => {
    if (!VALID_PREMIUM_KEYS.includes(signupKey)) {
      setError("Invalid premium key. Please check your key and try again.")
      return
    }

    if (!signupUsername || !signupEmail || !signupPassword) {
      setError("Please fill in all fields")
      return
    }

    const randomWaveKey = WAVE_EXECUTOR_KEYS[Math.floor(Math.random() * WAVE_EXECUTOR_KEYS.length)]

    const userData = {
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
      waveKey: randomWaveKey,
      profileImage: undefined,
    }

    const storedUsers = localStorage.getItem("waveUsers")
    const users = storedUsers ? JSON.parse(storedUsers) : []
    users.push(userData)
    localStorage.setItem("waveUsers", JSON.stringify(users))

    onLoginSuccess?.(userData)
    onOpenChange(false)
    setError("")

    // Reset form
    setSignupUsername("")
    setSignupEmail("")
    setSignupPassword("")
    setSignupKey("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">Welcome to Wave Executor</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in to your account or create a new one to get started
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                className="bg-muted border-border"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className="bg-muted border-border"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {error && activeTab === "login" && (
              <div className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</div>
            )}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 button-3d"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                type="text"
                placeholder="username"
                className="bg-muted border-border"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                className="bg-muted border-border"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                className="bg-muted border-border"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-key">Premium Key</Label>
              <Input
                id="signup-key"
                type="text"
                placeholder="Enter your premium key"
                className="bg-muted border-border font-mono"
                value={signupKey}
                onChange={(e) => setSignupKey(e.target.value.toUpperCase())}
              />
              <p className="text-xs text-muted-foreground">
                Enter the premium key you received after purchase.{" "}
                <a
                  href="https://wa.me/6281913143472"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Don't have a key? Buy now
                </a>
              </p>
            </div>
            {error && activeTab === "signup" && (
              <div className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</div>
            )}
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded border-border" />
              <span className="text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 button-3d"
              size="lg"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
