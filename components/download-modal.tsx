"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Monitor, Apple } from "lucide-react"

interface DownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DownloadModal({ open, onOpenChange }: DownloadModalProps) {
  const handleWindowsDownload = () => {
    // Trigger the download
    window.location.href = "https://cdn.wavify.cc/v3/WaveBootstrapper.exe"
    // Close modal after download starts
    setTimeout(() => onOpenChange(false), 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Download for...</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Choose your platform to download Wave Executor
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Windows Card */}
          <Card
            onClick={handleWindowsDownload}
            className="p-8 bg-background border-border hover:border-primary transition-all cursor-pointer card-3d group"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Monitor className="w-10 h-10 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">Windows</h3>
            </div>
          </Card>

          {/* iOS Card - Disabled */}
          <Card className="p-8 bg-background border-border opacity-50 cursor-not-allowed card-3d">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                <Apple className="w-10 h-10 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">iOS</h3>
              <p className="text-sm text-muted-foreground italic">Coming soon...</p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
