"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { useEffect, useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Players" },
  { href: "/games", label: "Games" },
  { href: "/teams", label: "Teams" },
  { href: "/profile", label: "Profile" },
]

const authItems = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    name:"",
    email:"",
    image:""
  })

  useEffect(() => {
    // All localStorage access happens here, client-side only
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn != null && JSON.parse(isLoggedIn)) {
      setIsAuthenticated(true)
      setUser({
        name: localStorage.getItem("email") || "",
        email: localStorage.getItem("email") || "",
        image: localStorage.getItem("image") || ""
      })
    }
  }, [])
  

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.clear()
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">⚾</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">Baseball Manager</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Authentication Links */}
          <div className="flex items-center gap-2">
            {isAuthenticated? (
              <ProfileDropdown user={user} onLogout={handleLogout}/>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="text-xs sm:text-sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}