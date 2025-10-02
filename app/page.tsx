"use client"

import Link from "next/link"
import { ArrowRight, Check, Download, Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
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
    <div className="min-h-screen">
      {/* Animated wave background */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-fade-in-scale">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border feature-pill">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">The Best PC Executor</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up">
              <span className="gradient-text">WAVE EXECUTOR</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
              The Best Executor PC
              <br />
              Undetected, 100% UNC
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up stagger-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow button-3d"
                onClick={() => setDownloadModalOpen(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>

              <a href="https://key.getwave.gg/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="default" className="button-3d bg-transparent">
                  <Play className="w-5 h-5 mr-2" />
                  Get Key
                </Button>
              </a>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8 animate-fade-in-up stagger-3">
              {["Multi Instance", "100% UNC", "Anti Crash", "Undetected", "No Virus", "Fast"].map((feature, i) => (
                <div
                  key={feature}
                  className={`px-4 py-2 rounded-full bg-muted border border-border text-sm feature-pill stagger-${i + 1}`}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold">
                What is <span className="gradient-text">Wave Executor</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Wave executor is the best PC exploit/executor. All scripts are 100% UNC and one more is undetected.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Multi Instance", desc: "Run multiple instances simultaneously" },
                { title: "100% UNC", desc: "Full UNC support for all scripts" },
                { title: "Anti Crash", desc: "Stable and reliable execution" },
                { title: "Undetected", desc: "Stay safe with our undetected system" },
                { title: "No Virus", desc: "Clean and safe to use" },
                { title: "Support All Scripts", desc: "Compatible with all popular scripts" },
                { title: "Fast", desc: "Lightning-fast execution speed" },
                { title: "Regular Updates", desc: "Constantly updated for best performance" },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className={`p-6 bg-background border-border hover:border-primary transition-colors card-3d animate-fade-in-scale stagger-${(i % 6) + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up">
              <span className="gradient-text">SHOWCASE!!</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up stagger-1">
              Click the play button on the banner wave to see the showcase
            </p>

            <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted showcase-banner animate-fade-in-scale stagger-2">
              <img
                src="https://img.youtube.com/vi/Qg9a4mktcU4/maxresdefault.jpg"
                alt="Wave Executor Showcase"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <a href="https://www.youtube.com/watch?v=Qg9a4mktcU4" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow button-3d">
                    <Play className="w-6 h-6 mr-2" />
                    Watch
                  </Button>
                </a>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section id="purchase" className="py-20 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold">
                Choose Your <span className="gradient-text">Plan</span>
              </h2>
              <p className="text-xl text-muted-foreground">Get started with Wave Executor today</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "7 Days Key", price: "200.000", duration: "7 days" },
                { name: "1 Month Key", price: "450.000", duration: "1 month", popular: true },
                { name: "1 Year Key", price: "850.000", duration: "1 year" },
              ].map((plan, i) => (
                <Card
                  key={i}
                  className={`p-8 bg-background border-border hover:border-primary transition-all pricing-card animate-fade-in-scale stagger-${i + 1} ${
                    plan.popular ? "ring-2 ring-primary glow" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold gradient-text">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">IDR / {plan.duration}</div>
                    </div>

                    <div className="space-y-2 py-6">
                      {[
                        "Multi Instance",
                        "100% UNC",
                        "Anti Crash",
                        "Undetected",
                        "No Virus",
                        "Support All Scripts",
                        "Fast",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a href="https://wa.me/6281913143472" target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 button-3d"
                        size="lg"
                      >
                        Buy Key
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in-up stagger-4">
              <p className="text-muted-foreground mb-4">Need help? Contact us on WhatsApp</p>
              <a href="https://wa.me/6281913143472" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="button-3d bg-transparent">
                  Contact Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border relative z-10">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold gradient-text">Wave Executor</div>
            <p className="text-muted-foreground">The best PC executor for your needs</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="#home" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#showcase" className="hover:text-primary transition-colors">
                Showcase
              </Link>
              <Link href="#purchase" className="hover:text-primary transition-colors">
                Purchase
              </Link>
            </div>
            <div className="text-sm text-muted-foreground pt-4">© 2025 Wave Executor. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={defaultTab}
        onLoginSuccess={handleLoginSuccess}
      />
      <DownloadModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
    </div>
  )
}
