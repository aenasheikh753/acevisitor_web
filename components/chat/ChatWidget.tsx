"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
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

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            <span
              role="img"
              aria-label={content.logoLabel}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-lime text-lime-ink"
            >
              <IconBox icon="door" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold">{content.headerTitle}</h2>
              <p className="mt-1 truncate text-xs text-muted">{content.headerSubtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              aria-label={content.resetLabel}
              onClick={clearMessages}
              className="flex h-9 min-h-9 w-9 shrink-0 items-center justify-center p-0 text-copy hover:bg-copy/10 hover:translate-y-0"
              icon={<RotateCcw aria-hidden="true" className="block h-4 w-4 shrink-0" />}
            >
              <span className="sr-only">{content.resetTitle}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label={content.closeLabel}
              onClick={() => setIsOpen(false)}
              className="flex h-9 min-h-9 w-9 shrink-0 items-center justify-center p-0 text-copy hover:bg-copy/10 hover:translate-y-0"
              icon={<X aria-hidden="true" className="block h-5 w-5 shrink-0" />}
            >
              <span className="sr-only">{content.closeLabel}</span>
            </Button>
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
            onSubmit={sendMessage}
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
            <Button
              type="submit"
              variant="accent"
              shape="circle"
              size="sm"
              disabled={!input.trim() || isTyping}
              aria-label={content.sendLabel}
              className="flex h-11 min-h-11 w-11 shrink-0 items-center justify-center p-0 focus-visible:ring-offset-mist hover:translate-y-0"
              icon={<Send aria-hidden="true" className="block h-4 w-4 shrink-0" />}
            >
              <span className="sr-only">{content.sendLabel}</span>
            </Button>
          </form>
        </section>
      </div>

      <Button
        variant="accent"
        size="lg"
        shape="circle"
        aria-label={isOpen ? content.closeLabel : content.openLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 min-h-14 w-14 shrink-0 items-center justify-center rounded-full p-0 leading-none text-[var(--color-accent-foreground)] shadow-card hover:translate-y-0"
        icon={
          isOpen ? (
            <X aria-hidden="true" className="block h-6 w-6 shrink-0" />
          ) : (
            <MessageCircle aria-hidden="true" className="block h-6 w-6 shrink-0" />
          )
        }
      >
        <span className="sr-only">
          {isOpen ? content.closeLabel : content.openLabel}
        </span>
      </Button>
    </>
  );
}
