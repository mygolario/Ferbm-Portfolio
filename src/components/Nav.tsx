"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#story", label: "Story" },
  { href: "#collection", label: "Collection" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Inquiry" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 mix-blend-difference transition-all duration-700 ${
        solid ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#story" className="display text-[1.15rem] tracking-[0.28em]">
          FERBM
        </a>
        <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.28em] text-ivory/80 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-ivory">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-[0.68rem] uppercase tracking-[0.28em] text-ivory/80 transition-colors hover:text-ivory md:hidden"
        >
          Inquiry
        </a>
      </div>
    </header>
  );
}
