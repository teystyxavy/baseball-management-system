import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Baseball Management System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Manage your teams, track players, schedule games, and organize tournaments all in one place. Built for
              modern baseball operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/players">
                <Button size="lg" className="w-full sm:w-auto">
                  View Players
                </Button>
              </Link>
              <Link href="/teams">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Explore Teams
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-card border-t border-border py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Player Management</h3>
                <p className="text-muted-foreground">
                  Easily manage player information, statistics, and performance metrics all in one system.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🎮</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Game Scheduling</h3>
                <p className="text-muted-foreground">
                  Create and manage game schedules with automatic reminders and live score updates.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Team Organization</h3>
                <p className="text-muted-foreground">
                  Organize teams, set lineups, and track team statistics throughout the season.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="bg-card rounded-lg border border-border p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Sign up today to start managing your baseball operations more efficiently.
            </p>
            <Link href="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/players" className="text-muted-foreground hover:text-foreground transition-colors">
                      Players
                    </Link>
                  </li>
                  <li>
                    <Link href="/games" className="text-muted-foreground hover:text-foreground transition-colors">
                      Games
                    </Link>
                  </li>
                  <li>
                    <Link href="/teams" className="text-muted-foreground hover:text-foreground transition-colors">
                      Teams
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-muted-foreground text-center">&copy; 2025 Baseball Manager. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
