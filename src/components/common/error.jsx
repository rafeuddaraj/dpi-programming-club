"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle, AlertCircle, Ban, RefreshCcw } from "lucide-react";

const errorTypes = {
  404: {
    code: "404",
    title: "Page Not Found",
    description:
      "The page you are looking for doesn't exist or has been moved.",
    icon: <Ban className="w-16 h-16 text-muted-foreground" />,
  },
  500: {
    code: "500",
    title: "Server Error",
    description: "Our server encountered an error. Please try again later.",
    icon: <XCircle className="w-16 h-16 text-muted-foreground" />,
  },
  403: {
    code: "403",
    title: "Access Denied",
    description: "You don't have permission to access this page.",
    icon: <AlertCircle className="w-16 h-16 text-muted-foreground" />,
  },
  default: {
    code: "Oops!",
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    icon: <RefreshCcw className="w-16 h-16 text-muted-foreground" />,
  },
};

export default function ErrorPage({ errorType = "default", message }) {
  const error = errorTypes[errorType] || errorTypes.default;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative">
            {error.icon}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {error.icon}
            </motion.div>
          </div>
          <h1 className="text-7xl font-bold text-primary">{error.code}</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            {error.title}
          </h2>
          <p className="text-muted-foreground max-w-md">
            {message || error.description}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild variant="default" size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-sm text-muted-foreground"
        >
          If the problem persists, please contact support
        </motion.div>
      </motion.div>
    </div>
  );
}
