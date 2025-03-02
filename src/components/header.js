"use client"

import { useState } from "react"
import { Bell, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {showSearch ? (
        <div className="flex-1 flex items-center">
          <Input type="search" placeholder="Search..." className="w-full md:w-[300px] h-9" />
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="icon" className="ml-auto" onClick={() => setShowSearch(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}

      <Button variant="outline" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    </header>
  )
}

