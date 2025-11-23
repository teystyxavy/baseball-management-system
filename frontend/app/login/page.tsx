"use client"

import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("token", data.token)
            localStorage.setItem("currentEmail", email)
            alert("Login successful, bringing you back to home")
            // redirect to home page (no need to reset loading state)
            window.location.href = "/"
        } else {
            setIsLoading(false)
            alert("Invalid username or password")
        }
    } catch (error) {            
        setIsLoading(false)
        console.error("Login error:", error)
        alert("An error occurred during login")
    }
    // Don't add finally block - it causes state updates during redirect
}
    return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚾</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Baseball Manager</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border border-border" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-sm text-accent hover:text-primary transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-accent hover:text-primary transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            {" • "}
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
