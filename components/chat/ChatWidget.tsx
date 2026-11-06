"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/IconBox";
import { sendChatMessage } from "@/lib/api/forms";
import type { ChatContent } from "@/lib/types";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

/** Paper plane with a folded keel — drawn to match the in-house icon set. */
function SendGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4 11.6 19.5 4.5c.4-.2.8.2.6.6L13.4 20c-.2.4-.8.4-.9-.1l-1.7-6.2L4.3 12.6c-.5-.2-.6-.8-.3-1Z" />
      <path d="M10.8 13.7 15.5 9" />
    </svg>
  );
}

/** Curved return arrow for "clear messages". */
function ResetGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 9.5A7.5 7.5 0 1 1 4.6 14" />
      <path d="M4.5 4.8v4.9h4.9" />
    </svg>
  );
}

/**
 * Ace, the assistant — styled as a visitor pass. The launcher is a small doorway
 * whose leaf swings ajar on hover and stays open while the pass is out. On phones
 * the pass becomes a bottom sheet.
 */
export default function ChatWidget({ content }: { content: ChatContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "assistant", text: content.greeting },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(1);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isTyping, isOpen]);

  useEffect(
    () => () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    },
    [],
  );

  function clearMessages() {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = null;
    setMessages([]);
    setIsTyping(false);
  }

  async function resolveMessage(text: string) {
    try {
      const { reply } = await sendChatMessage(text);
      setMessages((current) => [
        ...current,
        { id: messageIdRef.current++, role: "assistant", text: reply },
      ]);
    } catch (error) {
      console.error("Chat message submission failed.", error);
      setMessages((current) => [
        ...current,
        { id: messageIdRef.current++, role: "assistant", text: content.errorMessage },
      ]);
    } finally {
      setIsTyping(false);
      replyTimerRef.current = null;
    }
  }

  function sendMessage() {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((current) => [
      ...current,
      { id: messageIdRef.current++, role: "user", text },
    ]);
    setInput("");
    setIsTyping(true);
    replyTimerRef.current = setTimeout(() => {
      void resolveMessage(text);
    }, 700);
  }

  const headerButton =
    "pressable grid h-10 w-10 shrink-0 place-items-center rounded-t-[0.9rem] rounded-b-[0.3rem] text-linen/80 hover:bg-linen/10 hover:text-linen";

  return (
    <>
      {/* ---------- The pass ---------- */}
      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`chat-pass fixed z-50 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <section
          aria-label={content.headerTitle}
          className="flex h-full flex-col overflow-hidden rounded-t-[2rem] border border-linen/10 bg-paper text-spruce shadow-[6px_6px_0_rgba(2,18,24,0.28)] sm:rounded-b-[0.75rem]"
        >
          {/* Header: dark, arch-topped, with the badge punch slot */}
          <header className="relative shrink-0 bg-spruce px-4 pb-5 pt-7 text-linen [--focus:var(--clay-light)] sm:px-5">
            <span aria-hidden="true" className="absolute left-1/2 top-3 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#021218] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="flex items-center gap-3">
              <span className="arch-soft grid h-12 w-11 shrink-0 place-items-center bg-linen/95 p-1.5">
                <Image
                  src="/images/acevisitor-logo.png"
                  alt={`${content.logoLabel} logo`}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-[1.1875rem] leading-tight">{content.headerTitle}</h2>
                <p className="mt-0.5 flex items-center gap-2 truncate font-display text-[0.8125rem] italic text-clay-light">
                  <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-ok-light motion-safe:animate-hero-pulse" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-ok-light" />
                  </span>
                  {content.headerSubtitle}
                </p>
              </div>
              <button type="button" aria-label={content.resetLabel} title={content.resetTitle} onClick={clearMessages} className={headerButton}>
                <ResetGlyph className="h-[1.15rem] w-[1.15rem]" />
              </button>
              <button type="button" aria-label={content.closeLabel} onClick={() => setIsOpen(false)} className={headerButton}>
                <Icon icon="x" className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Perforated tear line with ticket notches */}
          <div aria-hidden="true" className="relative h-0 shrink-0">
            <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-paper" />
            <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-paper" />
            <span className="absolute inset-x-6 -top-[3px] border-t-2 border-dashed border-linen/25" />
          </div>

          {/* Conversation */}
          <div
            ref={messagesContainerRef}
            aria-live="polite"
            className="chat-scroll flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 pb-5 pt-6 [--focus:var(--clay)]"
          >
            {messages.map((message) =>
              message.role === "assistant" ? (
                <div key={message.id} className="max-w-[92%] border-l-2 border-brass pl-3.5">
                  <p className="whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-spruce">{message.text}</p>
                  <p aria-hidden="true" className="mt-1.5 font-display text-[0.75rem] italic text-stone">— Ace</p>
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[82%] whitespace-pre-wrap rounded-t-[1.1rem] rounded-bl-[1.1rem] rounded-br-[0.3rem] bg-clay px-4 py-2.5 text-[0.9375rem] leading-relaxed text-linen shadow-[3px_3px_0_rgba(4,30,38,0.14)]">
                    {message.text}
                  </p>
                </div>
              ),
            )}
            {isTyping ? (
              <div role="status" aria-label={content.typingLabel} className="flex items-end gap-1.5 border-l-2 border-brass py-1 pl-3.5">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="chat-typing-door h-3 w-2 rounded-t-full bg-clay-light"
                    style={{ animationDelay: `${dot * 160}ms` }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* Composer */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex shrink-0 items-end gap-3 border-t border-spruce/10 bg-linen px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 [--focus:var(--clay)] sm:px-5"
          >
            <label htmlFor="acevisitor-chat-input" className="sr-only">
              {content.inputLabel}
            </label>
            <input
              ref={inputRef}
              id="acevisitor-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={content.inputPlaceholder}
              className="min-w-0 flex-1 border-0 border-b-2 border-spruce/20 bg-transparent px-0.5 py-2.5 text-[0.9375rem] text-spruce placeholder:text-stone/80 transition-colors focus:border-clay focus:outline-none focus-visible:outline-none"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label={content.sendLabel}
              className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-t-[1.4rem] rounded-b-[0.35rem] bg-clay text-linen hover:-translate-x-px hover:-translate-y-px hover:bg-clay-deep hover:shadow-[3px_3px_0_var(--spruce)] disabled:pointer-events-none disabled:bg-spruce/15 disabled:text-spruce/45"
            >
              <SendGlyph className="h-5 w-5" />
            </button>
          </form>
        </section>
      </div>

      {/* ---------- The doorway launcher ---------- */}
      <button
        type="button"
        aria-label={isOpen ? content.closeLabel : content.openLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        data-open={isOpen ? "true" : undefined}
        className={`chat-door group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 h-[4.25rem] w-14 rounded-t-full rounded-b-[0.4rem] bg-clay-light [--focus:var(--clay-light)] sm:bottom-6 sm:right-6 ${
          isOpen ? "max-sm:hidden" : ""
        }`}
      >
        {/* Door leaf: swings ajar on hover/focus, stays open while chatting */}
        <span aria-hidden="true" className="chat-door-leaf absolute inset-0 rounded-t-full rounded-b-[0.4rem] bg-clay" />
        <span aria-hidden="true" className="relative z-10 grid h-full w-full place-items-center pt-1.5 text-linen">
          <Icon icon={isOpen ? "x" : "message"} className="h-6 w-6" strokeWidth={1.8} />
        </span>
      </button>
    </>
  );
}
