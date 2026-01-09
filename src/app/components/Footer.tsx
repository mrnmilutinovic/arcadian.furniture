"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { subscribeToUpdates, type SubscribeState } from "../actions/subscribe";

const initialState: SubscribeState = { success: false, message: "" };

export function Footer() {
  const [footerState, footerAction, footerPending] = useActionState(
    subscribeToUpdates,
    initialState,
  );

  return (
    <footer className="bg-[#202020] text-paper py-16 md:py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16">
        {/* Left Side: Brand & CTA */}
        <div className="flex flex-col justify-between items-start">
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <Image
                src="/focus-logo.svg"
                alt="Arcadian Logo"
                width={96}
                height={96}
                className="h-12 w-auto md:h-24"
              />
            </div>
            <p className="font-sans text-xl opacity-60 font-light max-w-lg mt-4">
              Designed for families who play. For game nights that run late. For
              campaigns that span months.
            </p>
          </div>

          <div className="w-full max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">
              Stay Updated
            </p>
            <form
              action={footerAction}
              className="flex border-b border-white/20 pb-4 w-full group focus-within:border-white/60 transition-colors"
            >
              <input type="hidden" name="source" value="footer" />
              <input
                type="email"
                name="email"
                placeholder="ENTER YOUR EMAIL"
                className="bg-transparent w-full font-mono text-sm focus:outline-none placeholder-white/30 text-white"
                disabled={footerPending}
              />
              <button
                type="submit"
                disabled={footerPending}
                className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors disabled:opacity-50"
              >
                {footerPending ? "..." : "Join"}
              </button>
            </form>
            {footerState.message && (
              <p
                className={`font-mono text-[10px] mt-2 ${footerState.success ? "text-green-400" : "text-red-400"}`}
              >
                {footerState.message}
              </p>
            )}
          </div>
        </div>

        {/* Middle: Blog Links */}
        <div className="flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-50">
            From the Blog
          </p>
          <nav className="grid grid-cols-1 gap-3">
            <Link
              href="/blog/kickstarter-board-game-table-guide"
              className="font-sans text-sm text-white/70 hover:text-accent transition-colors"
            >
              Kickstarter Board Game Tables Guide
            </Link>
            <Link
              href="/blog/board-game-table-size-guide"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              How to Choose the Right Table Size
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/board-game-table-features"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              5 Features Every Table Needs
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/board-game-table-vs-gaming-table"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              Board Game Table vs Gaming Table
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/board-game-table-wood-guide"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              Wood Types: Oak vs Walnut vs Maple
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/diy-vs-buying-board-game-table"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              DIY vs Buying: The Real Cost
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/perfect-game-night-guide"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              Hosting the Perfect Game Night
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/convertible-board-game-dining-table"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              Tables That Double as Dining Tables
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/board-game-table-care-guide"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              Care & Maintenance Guide
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
            <Link
              href="/blog/board-gaming-renaissance"
              className="font-sans text-sm text-white/40 hover:text-accent transition-colors"
            >
              The Board Gaming Renaissance
              <span className="ml-2 text-[10px] font-mono opacity-50">
                Soon
              </span>
            </Link>
          </nav>
          <Link
            href="/blog"
            className="mt-6 font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors"
          >
            View All Articles &rarr;
          </Link>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-col justify-between md:items-end">
          <nav className="flex flex-col gap-4 md:text-right">
            <a
              href="https://instagram.com/arcadian.furniture"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              Instagram
            </a>
            <div className="relative group inline-block md:text-right">
              <span className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic cursor-default">
                Kickstarter
              </span>
              <div className="absolute left-0 md:left-auto md:right-0 top-full mt-2 px-3 py-1.5 bg-ink text-paper text-xs font-mono uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Coming soon
              </div>
            </div>
            <Link
              href="/logs"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              Logs
            </Link>
            <Link
              href="/blog"
              className="font-serif text-3xl md:text-4xl hover:text-accent transition-colors hover:italic"
            >
              Blog
            </Link>
            <div className="h-8" />
            <Link
              href="/terms"
              className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-serif text-xl md:text-2xl opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>

          <div className="mt-16 font-mono text-[10px] uppercase tracking-widest opacity-30 md:text-right">
            © 2025 Arcadian. All rights reserved.
            <br />
            Designed & Crafted in Serbia.
          </div>
        </div>
      </div>
    </footer>
  );
}
