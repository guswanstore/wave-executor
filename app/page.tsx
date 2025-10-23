"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"
import { ArrowRight, Check, Download, Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthModal } from "@/components/auth-modal"
import { DownloadModal } from "@/components/download-modal"
import { UserProfile } from "@/components/user-profile"

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [defaultTab, setDefaultTab] = useState<"login" | "signup">("login")
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [user, setUser] = useState<{ username: string; waveKey: string; profileImage?: string } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const openAuthModal = (tab: "login" | "signup") => {
    setDefaultTab(tab)
    setAuthModalOpen(true)
  }

  const handleLoginSuccess = (userData: { username: string; waveKey: string; profileImage?: string }) => {
    setUser(userData)
    localStorage.setItem("currentUser", JSON.stringify(userData))
  }

  const handleProfileUpdate = (profileImage: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  return (
    <>
      {/* ✅ Global AdSense */}
      <Script
        id="google-adsense"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1179123018937894"
        crossOrigin="anonymous"
      />

      <div className="min-h-screen">
        {/* Background */}
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Wave Executor
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#home" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#showcase" className="text-sm hover:text-primary transition-colors">
                Showcase
              </Link>
              <Link href="#purchase" className="text-sm font-bold hover:text-primary transition-colors">
                Purchase
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <UserProfile
                  username={user.username}
                  waveKey={user.waveKey}
                  profileImage={user.profileImage}
                  onProfileUpdate={handleProfileUpdate}
                />
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => openAuthModal("login")}>
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => openAuthModal("signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* ✅ AdSense #1 - Top Banner */}
        <div className="mt-20 mb-8 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1179123018937894"
            data-ad-slot="4345767289"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <Script id="adsense-top" strategy="afterInteractive">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>

        {/* Hero Section */}
        <section id="home" className="pt-10 pb-20 px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">The Best PC Executor</span>
              </div>
            </div>

            <h1 className="text-6xl font-bold gradient-text">WAVE EXECUTOR</h1>
            <p className="text-xl text-muted-foreground">The Best Executor PC — Undetected, 100% UNC</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => setDownloadModalOpen(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
              <a href="https://key.getwave.gg/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="default" className="bg-transparent border">
                  <Play className="w-5 h-5 mr-2" /> Get Key
                </Button>
              </a>
            </div>

            {/* ✅ AdSense #2 - Hero */}
            <div className="my-10">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1179123018937894"
                data-ad-slot="4345767289"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <Script id="adsense-hero" strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-muted/30 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl font-bold">What is <span className="gradient-text">Wave Executor</span>?</h2>
            <p className="text-xl text-muted-foreground">
              Wave executor is the best PC exploit/executor. All scripts are 100% UNC and undetected.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                { title: "Multi Instance", desc: "Run multiple instances simultaneously" },
                { title: "100% UNC", desc: "Full UNC support for all scripts" },
                { title: "Anti Crash", desc: "Stable and reliable execution" },
                { title: "Undetected", desc: "Stay safe with our undetected system" },
                { title: "No Virus", desc: "Clean and safe to use" },
                { title: "Support All Scripts", desc: "Compatible with all popular scripts" },
                { title: "Fast", desc: "Lightning-fast execution speed" },
                { title: "Regular Updates", desc: "Constantly updated for best performance" },
              ].map((f, i) => (
                <Card key={i} className="p-6 hover:border-primary transition">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary to-accent rounded-full">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* ✅ AdSense #3 */}
            <div className="my-16 text-center">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1179123018937894"
                data-ad-slot="4345767289"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <Script id="adsense-about" strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-20 px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 gradient-text">SHOWCASE!!</h2>
          <p className="text-muted-foreground mb-8">Click play to see Wave Executor in action</p>
          <div className="relative aspect-video max-w-3xl mx-auto border rounded-lg overflow-hidden">
            <img
              src="https://img.youtube.com/vi/Qg9a4mktcU4/maxresdefault.jpg"
              alt="Wave Executor Showcase"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <a href="https://www.youtube.com/watch?v=Qg9a4mktcU4" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Play className="w-6 h-6 mr-2" /> Watch
                </Button>
              </a>
            </div>
          </div>

          {/* ✅ AdSense #4 */}
          <div className="my-16 text-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1179123018937894"
              data-ad-slot="4345767289"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <Script id="adsense-showcase" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>
        </section>

        {/* ✅ Purchase Section */}
        <section id="purchase" className="py-20 px-4 bg-muted/30 text-center">
          <h2 className="text-5xl font-bold mb-8">Choose Your <span className="gradient-text">Plan</span></h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Basic", price: "$4.99", desc: "1 Week Access", features: ["UNC Scripts", "Anti-Crash", "Fast Injection"] },
              { name: "Pro", price: "$9.99", desc: "1 Month Access", features: ["All Basic Features", "Auto-Update", "Priority Key"] },
              { name: "Lifetime", price: "$19.99", desc: "Lifetime Access", features: ["All Pro Features", "Premium Support", "Lifetime Key"] },
            ].map((p, i) => (
              <Card key={i} className="p-8 border-border hover:border-primary transition">
                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                <p className="text-muted-foreground mb-4">{p.desc}</p>
                <div className="text-4xl font-bold mb-4">{p.price}</div>
                <ul className="space-y-2 text-left mb-6">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <ArrowRight className="w-4 h-4 mr-2" /> Purchase
                </Button>
              </Card>
            ))}
          </div>

          {/* ✅ AdSense #5 - After Purchase */}
          <div className="my-16 text-center">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1179123018937894"
              data-ad-slot="4345767289"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <Script id="adsense-purchase" strategy="afterInteractive">
              {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border text-center">
          <div className="text-2xl font-bold gradient-text mb-2">Wave Executor</div>
          <p className="text-muted-foreground">The best PC executor for your needs</p>
          <div className="text-sm text-muted-foreground mt-4">© 2025 Wave Executor. All rights reserved.</div>
        </footer>

        {/* Modals */}
        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          defaultTab={defaultTab}
          onLoginSuccess={handleLoginSuccess}
        />
        <DownloadModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
      </div>
    </>
  )
}
