"use client"

import { cn } from "@/lib/utils"
import { Check, Copy, Share2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "next-share"


export function ShareModal({
    url,
    title,
    description = "Check out this achievement!",
    children,
    className,
}) {
    const [copied, setCopied] = useState(false)
    const [open, setOpen] = useState(false)

    // Use the current URL if none provided
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm" className={cn("gap-2", className)}>
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Expand Your Network</DialogTitle>
                    <DialogDescription>Share this with your friends, colleagues, and anyone who can benefit from it. Since we're building this for networking, make sure to connect with those who will make the most out of it and grow together!</DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2 mt-4">
                    <div className="grid flex-1 gap-2">
                        <Input value={shareUrl} readOnly className="w-full" />
                    </div>
                    <Button size="sm" className="px-3 flex-shrink-0" onClick={handleCopyToClipboard} variant="secondary">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Share on social media</h4>
                    <div className="flex flex-wrap gap-2">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} title={title}>
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareUrl} title={title}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>

                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>

                        <TelegramShareButton url={shareUrl} title={title}>
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>

                        <RedditShareButton url={shareUrl} title={title}>
                            <RedditIcon size={40} round />
                        </RedditShareButton>

                        <EmailShareButton url={shareUrl} subject={title} body={description}>
                            <EmailIcon size={40} round />
                        </EmailShareButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

