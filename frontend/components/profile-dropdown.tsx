"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, CreditCard, LogOut } from "lucide-react"

interface ProfileDropdownProps {
    user: {
        name: string | null
        email: string | null
        image: string | null
    }
    onLogout?: () => void
}

export function ProfileDropdown({user, onLogout} : ProfileDropdownProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        setOpen(false)
        if (onLogout) {
            onLogout()
        } else {
            router.push("/login")
        }
    }

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
                    <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background">
                <DropdownMenuLabel className="block px-4 py-2 text-sm text-muted-foreground">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { router.push("/profile") }} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { router.push("/settings") }} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { router.push("/account") }} className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Manage Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}

