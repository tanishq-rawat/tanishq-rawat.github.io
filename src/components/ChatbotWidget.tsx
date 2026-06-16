"use client";

import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Bot, Send } from "lucide-react";

const CHAT_STREAM_URL = "https://chatbot-739f48fb.fastapicloud.dev/chat?stream=true";

type Message = { role: "user" | "assistant"; content: string };

const INITIAL: Message = {
  role: "assistant",
  content: "Hey! I'm Tanishq's AI assistant. Ask me anything about his background, skills, or projects.",
};

// Parse a single SSE event block and return { event, data }
function parseSseBlock(block: string): { event: string; data: string } {
  let event = "";
  let data = "";
  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      const raw = line.slice(5); // everything after "data:"
      data = raw.startsWith(" ") ? raw.slice(1) : raw; // strip one optional leading space per SSE spec
    }
  }
  return { event, data };
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Show welcome popup 2.5 s after mount
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Auto-hide popup after 7.5 s of being visible
  useEffect(() => {
    if (!showPopup) return;
    const t = setTimeout(() => setShowPopup(false), 7500);
    return () => clearTimeout(t);
  }, [showPopup]);

  // Abort any in-flight stream on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  // Scroll to latest message whenever messages or streaming state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const question = input.trim();
      if (!question || streaming) return;

      setInput("");
      setError(null);

      // Collect history before appending the new turn (skip INITIAL greeting and empty placeholders)
      const history = messages
        .slice(1)
        .filter((m) => m.content !== "")
        .map(({ role, content }) => ({ role, content }));

      // Append user message + empty assistant placeholder
      setMessages((prev) => [
        ...prev,
        { role: "user", content: question },
        { role: "assistant", content: "" },
      ]);
      setStreaming(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(CHAT_STREAM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Normalize CRLF → LF so event separators are always "\n\n"
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n").replace(/\r/g, "\n");

          // SSE events are separated by double newlines
          const blocks = buffer.split("\n\n");
          buffer = blocks.pop() ?? ""; // last element may be an incomplete event

          for (const block of blocks) {
            if (!block.trim()) continue;
            const { event, data } = parseSseBlock(block);

            if (event === "token" && data) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + data,
                };
                return updated;
              });
            }
            // "done" event signals end — loop will break when reader closes
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          // Remove the empty assistant placeholder
          setMessages((prev) =>
            prev[prev.length - 1]?.content === ""
              ? prev.slice(0, -1)
              : prev
          );
        }
      } finally {
        setStreaming(false);
      }
    },
    [input, streaming, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] flex flex-col items-end gap-3">
      {/* Welcome popup bubble */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative max-w-[240px] rounded-2xl rounded-br-sm px-4 py-3 shadow-xl"
          >
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-text-faint transition-colors hover:text-text"
            >
              <X size={11} />
            </button>
            <p className="pr-4 text-sm leading-snug text-text">
              Hey! Save time by chatting with me to know more about Tanishq.
            </p>
            <button
              onClick={openChat}
              className="mt-2 text-xs font-semibold text-accent transition-opacity hover:opacity-80"
            >
              Chat now →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(560px, calc(100dvh - 5rem))",
            }}
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 ring-1 ring-accent/20">
                  <Bot size={15} className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">Tanishq&apos;s AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <p className="text-xs text-text-faint">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-lg text-text-muted transition-colors hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
              style={{ scrollbarWidth: "thin" }}
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg, i) => {
                const isStreamingThis =
                  streaming && i === messages.length - 1 && msg.role === "assistant";

                return (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <span className="mr-2 mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-accent/10">
                        <Bot size={12} className="text-accent" />
                      </span>
                    )}
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-accent text-ink"
                          : "rounded-bl-sm bg-surface-2 text-text"
                      }`}
                    >
                      {/* Show typing dots for empty placeholder, streaming text otherwise */}
                      {isStreamingThis && msg.content === "" ? (
                        <span className="flex items-center gap-1 py-0.5">
                          {[0, 1, 2].map((j) => (
                            <motion.span
                              key={j}
                              className="h-1.5 w-1.5 rounded-full bg-text-faint"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.2 }}
                            />
                          ))}
                        </span>
                      ) : (
                        <>
                          {msg.content}
                          {isStreamingThis && (
                            <motion.span
                              className="ml-0.5 inline-block h-3.5 w-px align-middle bg-current"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {error && (
                <p className="text-center text-xs text-red-400">{error}</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-shrink-0 items-end gap-2 border-t border-border px-3 py-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                rows={1}
                disabled={streaming}
                className="flex-1 resize-none rounded-xl bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-accent/50 disabled:opacity-50"
                style={{ maxHeight: "96px", overflowY: "auto" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send"
                className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-accent text-ink transition-opacity disabled:opacity-40 enabled:hover:opacity-90"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <motion.button
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-accent shadow-lg shadow-accent/25 transition-shadow hover:shadow-accent/40"
      >
        {showPopup && !isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-25" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="grid place-items-center"
            >
              <X size={22} className="text-ink" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="grid place-items-center"
            >
              <Bot size={24} className="text-ink" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
