"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", icon: "/Home.svg", href: "/" },
  { label: "Posts", icon: "/Grid.svg", href: "https://afaaafa.substack.com/" },
  { label: "Contact", icon: "/Direct.svg", href: "/contact" },
];

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSidebar, setHoveredSidebar] = useState(false);

  return (
    <aside className={`fixed left-0 top-0 h-screen border-white/10 flex flex-col items-center justify-center gap-4 z-40 px-4 py-4 ${hoveredSidebar ? "w-48" : "w-20"} transition-width duration-300`}       onMouseEnter={() => setHoveredSidebar(true)} 
    onMouseLeave={() => setHoveredSidebar(false)}>

      <div 
        className="absolute -left-10 top-0 h-full w-10 bg-black pointer-events-none z-0"
        style={{
          boxShadow: "0 0 80px 15px rgba(0, 0, 0, 0.9)",
        }} 
      />

      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target="_blank"
          className="w-full"
        >
          <div
            className={`relative flex justify-left px-4 py-4 rounded-lg ${hoveredItem === item.label ? "bg-[#282a2c]" : ""}` }
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="shrink-0">
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>

            {hoveredSidebar && (
              <span className="mx-4 text-white">{item.label}</span>
            )}
          </div>
        </Link>
      ))}
    </aside>
  );
}
