"use client"

import type React from "react"

import { Crown, Copy, Check, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useRef } from "react"

interface UserProfileProps {
  username: string
  waveKey: string
  profileImage?: string
  onProfileUpdate?: (profileImage: string) => void
}

export function UserProfile({ username, waveKey, profileImage, onProfileUpdate }: UserProfileProps) {
  const [keyModalOpen, setKeyModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(waveKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setCurrentProfileImage(imageData)
        onProfileUpdate?.(imageData)

        // Update localStorage
        const storedUsers = localStorage.getItem("waveUsers")
        if (storedUsers) {
          const users = JSON.parse(storedUsers)
          const userIndex = users.findIndex((u: any) => u.username === username)
          if (userIndex !== -1) {
            users[userIndex].profileImage = imageData
            localStorage.setItem("waveUsers", JSON.stringify(users))
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <button
        onClick={() => setKeyModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity button-3d"
      >
        <Crown className="w-5 h-5 text-yellow-400" />
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold">Premium</span>
          <span className="text-xs opacity-90">{username}</span>
        </div>
      </button>

      <Dialog open={keyModalOpen} onOpenChange={setKeyModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              Premium Account
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">Your Wave Executor premium profile</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-primary flex items-center justify-center">
                  {currentProfileImage ? (
                    <img
                      src={currentProfileImage || "/placeholder.svg"}
                      alt={username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary hover:bg-primary/90 transition-colors"
                  title="Upload profile photo"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">Click the upload button to change your profile photo</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="px-4 py-3 rounded-lg bg-muted border border-border">
                <p className="font-mono">{username}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Wave Executor Key</label>
              <div className="px-4 py-3 rounded-lg bg-muted border border-border flex items-center justify-between gap-2">
                <p className="font-mono text-sm break-all">{waveKey}</p>
                <Button size="sm" variant="ghost" onClick={copyToClipboard} className="flex-shrink-0">
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this key in Wave Executor to activate your premium features
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span>Premium features unlocked</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span>100% UNC support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span>Multi-instance enabled</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
