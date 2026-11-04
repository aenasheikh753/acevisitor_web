"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { sendChatMessage } from "@/lib/api/forms";
import type { ChatContent } from "@/lib/types";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

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

  return (
    <>
      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed bottom-[92px] right-4 z-50 origin-bottom-right transition-[opacity,transform] duration-300 ease-out sm:right-6 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
        style={{
          width: "min(380px, calc(100vw - 32px))",
          height: "min(520px, calc(100dvh - 120px))",
        }}
      >
        <section
          aria-label={content.headerTitle}
          className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-ink/10 bg-mist text-slate-ink shadow-card"
        >
          <header className="flex shrink-0 items-center gap-3 bg-ink px-4 py-4 text-copy">
            <Image
              src="/images/acevisitor-logo.png"
              alt={`${content.logoLabel} logo`}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold">{content.headerTitle}</h2>
              <p className="mt-1 truncate text-xs text-muted">{content.headerSubtitle}</p>
            </div>
            <button
              type="button"
              aria-label={content.resetLabel}
              onClick={clearMessages}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-copy transition hover:bg-copy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={content.closeLabel}
              onClick={() => setIsOpen(false)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-copy transition hover:bg-copy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messagesContainerRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-sm leading-5 ${
                    message.role === "user"
                      ? "rounded-br-sm bg-lime text-lime-ink"
                      : "rounded-bl-sm bg-slate-ink/5 text-slate-ink"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {isTyping ? (
              <div className="flex justify-start">
                <div
                  role="status"
                  aria-label={content.typingLabel}
                  className="flex items-center gap-1 rounded-lg rounded-bl-sm bg-slate-ink/5 px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-button bg-cyan" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-button bg-cyan [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-button bg-cyan [animation-delay:300ms]" />
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex shrink-0 items-center gap-2 border-t border-slate-ink/10 bg-mist p-3"
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
              className="min-w-0 flex-1 rounded-button border border-slate-ink/10 bg-copy px-4 py-3 text-sm text-slate-ink placeholder:text-slate-ink/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label={content.sendLabel}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-lime-ink shadow-glow transition hover:brightness-105 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-mist"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </section>
      </div>

      <button
        type="button"
        aria-label={isOpen ? content.closeLabel : content.openLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-lime text-lime-ink shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
