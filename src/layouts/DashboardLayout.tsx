import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";
import {
    Home,
    ScrollText,
    User,
    BookOpen,
    LogIn,
    LogOut,
    Sparkles
} from "lucide-react";

export const DashboardLayout = () => {
    const { user, signOut } = useAuth();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const links = [
        {
            label: "Sanctuary",
            href: "/",
            icon: (
                <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Oracles",
            href: "/archives",
            icon: (
                <ScrollText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Mindfulness",
            href: "/zazen",
            icon: (
                <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "How to Zazen",
            href: "/zazen/guide",
            icon: (
                <Sparkles className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Insights",
            href: "/columns",
            icon: (
                <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-shinto-white w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} className={location.pathname === link.href ? "bg-gray-100 dark:bg-neutral-800 rounded-sm" : ""} />
                            ))}
                        </div>
                    </div>
                    <div>
                        {user ? (
                            <div className="flex flex-col gap-2">
                                <SidebarLink
                                    link={{
                                        label: user.email?.split('@')[0] || "Spirit",
                                        href: "/archives",
                                        icon: (
                                            <div className="h-7 w-7 flex-shrink-0 rounded-full bg-jap-vermilion flex items-center justify-center text-white text-xs font-bold">
                                                {(user.email?.[0] || "S").toUpperCase()}
                                            </div>
                                        ),
                                    }}
                                />
                                <button onClick={() => signOut()} className="flex items-center justify-start gap-2 group/sidebar py-2 w-full">
                                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    <motion.span
                                        animate={{
                                            display: open ? "inline-block" : "none",
                                            opacity: open ? 1 : 0,
                                        }}
                                        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block"
                                    >
                                        Sign Out
                                    </motion.span>
                                </button>
                            </div>
                        ) : (
                            <SidebarLink
                                link={{
                                    label: "Sign In",
                                    href: "/login",
                                    icon: (
                                        <LogIn className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    ),
                                }}
                            />
                        )}
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* Main Content Area - Scrollable */}
            <div className="flex flex-1 flex-col overflow-y-auto h-full relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export const Logo = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Sparkles className="h-5 w-6 text-jap-vermilion flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre font-brush tracking-widest text-lg"
            >
                Street Spirit
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Sparkles className="h-5 w-6 text-jap-vermilion flex-shrink-0" />
        </Link>
    );
};
