"use client";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import {
  ArrowLeft,
  Copy,
  Download,
  Facebook,
  Share2,
  Smartphone,
  X,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useResultCard } from "./result-card-provider";

export default function Navigation({ result, isNeedBack = false }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const { resultCardRef } = useResultCard();
  const [pageUrl, setPageUrl] = useState();
  const { roll } = useParams();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (window.location) {
      setPageUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `BTEB Result - ${result?.roll}`,
          text: `Check out my BTEB result from ${result?.institute}`,
          url: pageUrl,
        });
        toast.success("Shared successfully!", {
          description: "Your result has been shared.",
        });
      } catch (error) {}
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast.error("Sharing not supported", {
        description: "Please use the share buttons below.",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.success("Link copied!", {
      description: "Result link copied to clipboard.",
    });
  };
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out my BTEB result from ${result?.institute}`
      )}&url=${encodeURIComponent(pageUrl)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `Check out my BTEB result from ${result?.institute}: ${pageUrl}`
      )}`,
      "_blank"
    );
  };

  const handleDownloadScreenshot = async () => {
    if (!resultCardRef.current) return;

    try {
      setIsCapturing(true);
      toast.success("Creating screenshot...", {
        description: "Please wait while we generate your result image.",
      });

      // Clone the result card to a temporary div to prepare it for screenshot
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "-9999px";
      tempDiv.style.width = resultCardRef.current.offsetWidth + "px";

      // Set the background color based on the current theme
      const isDarkMode = document.documentElement.classList.contains("dark");
      tempDiv.style.backgroundColor = isDarkMode ? "#0f172a" : "#f8fafc";
      tempDiv.style.padding = "20px";
      tempDiv.style.borderRadius = "8px";

      // Clone the content
      tempDiv.innerHTML = resultCardRef.current.innerHTML;
      document.body.appendChild(tempDiv);

      // Add a watermark/footer to the screenshot
      const watermark = document.createElement("div");
      watermark.style.marginTop = "20px";
      watermark.style.padding = "10px";
      watermark.style.textAlign = "center";
      watermark.style.fontSize = "14px";
      watermark.style.color = isDarkMode ? "#94a3b8" : "#64748b";
      watermark.style.borderTop = isDarkMode
        ? "1px solid #1e293b"
        : "1px solid #e2e8f0";
      watermark.innerHTML = `BTEB Result Checker | Generated on ${new Date().toLocaleDateString()}`;
      tempDiv.appendChild(watermark);

      // Take the screenshot with improved settings
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          Array.from(clonedDoc.querySelectorAll("*")).forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.boxShadow = "none"; // Remove shadows for cleaner screenshot
            }
          });
        },
      });

      // Clean up the temporary div
      document.body.removeChild(tempDiv);

      // Convert to image and download
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `BTEB-Result-${result?.roll}.png`;
      link.click();

      setIsCapturing(false);
      toast.success("Screenshot downloaded!", {
        description: "Your result has been saved as an image.",
      });
    } catch (error) {
      setIsCapturing(false);
      toast.error("Screenshot failed", {
        description: "Could not create a screenshot. Please try again.",
      });
    }
  };
  const router = useRouter();

  return (
    <>
      {isNeedBack && (
        <Button
          onClick={() => {
            // `/bteb-results/check-result?${searchParams?.toString()}&roll=${roll}`
            router.push(`/bteb-results/check-result`);
          }}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Search
        </Button>
      )}
      <div className="flex gap-2 justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Smartphone className="mr-2 h-4 w-4" />
              <span>Share (Native)</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={shareOnFacebook}
              className="cursor-pointer"
            >
              <Facebook className="mr-2 h-4 w-4" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={shareOnTwitter}
              className="cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              <span>X</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={shareOnWhatsApp}
              className="cursor-pointer"
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.64 13.5L4 22l4.59-.39a8.9 8.9 0 0 0 3.46.68 8.93 8.93 0 0 0 8.94-8.94 8.91 8.91 0 0 0-3.39-7.03zm-5.55 13.72a7.4 7.4 0 0 1-3.79-.97l-.27-.16-2.82.74.75-2.75-.17-.27a7.44 7.44 0 0 1-1.14-3.98 7.43 7.43 0 0 1 7.44-7.44c1.97 0 3.83.77 5.23 2.17a7.4 7.4 0 0 1 2.17 5.25 7.44 7.44 0 0 1-7.4 7.41zm4.1-5.56c-.22-.11-1.32-.65-1.53-.73-.2-.08-.36-.11-.5.11-.14.22-.56.73-.69.88-.13.15-.25.17-.47.06-.22-.11-.94-.35-1.8-1.1-.66-.6-1.11-1.33-1.24-1.55-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.06-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38h-.43c-.15 0-.4.06-.6.28-.21.23-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.12.15 1.66 2.53 4.01 3.55.56.24 1 .39 1.34.5.56.18 1.07.15 1.48.09.45-.07 1.38-.56 1.58-1.1.2-.55.2-1.01.14-1.11-.06-.1-.22-.16-.44-.28z" />
              </svg>
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleCopyLink}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadScreenshot}
          disabled={isCapturing}
        >
          {isCapturing ? (
            <>
              <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              Capturing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Screenshot
            </>
          )}
        </Button>
      </div>
    </>
  );
}
