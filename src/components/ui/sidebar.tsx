"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const { isOpen, setIsOpen } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          {children}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full w-80 z-40 transition-transform duration-300 ease-in-out",
        !isOpen && "-translate-x-full",
        className
      )}
    >
      {children}
    </div>
  )
}

function SidebarInset({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { isOpen } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        "transition-[margin-left] duration-300 ease-in-out",
        !isMobile && isOpen && "ml-80",
        className
      )}
    >
      {children}
      <SidebarToggleButton />
    </div>
  )
}

function SidebarToggleButton() {
  const { isOpen, setIsOpen } = useSidebar()
  const isMobile = useIsMobile()

  if (isMobile) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export { Sidebar, SidebarInset, SidebarToggleButton }
