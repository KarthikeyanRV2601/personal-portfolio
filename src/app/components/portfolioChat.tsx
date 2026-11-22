"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import projectData from "../data/project.json";
import { isChatReply, portfolioSections, projectElementId } from "../../lib/portfolioChat";
import type { ChatAction, ChatMessage, ChatReply } from "../../lib/portfolioChat";
import styles from "./portfolioChat.module.css";

type Turn = ChatMessage & { id: number; reply?: ChatReply };
type Status = "checking" | "ready" | "offline" | "error";
const projectTargets = new Set(projectData.data.map(project => projectElementId(project.title)));
const suggestions = ["Show me his AI projects", "What agentic workflows has he built?", "Where can I find his résumé?"];

function ReplyText({ text }: { text: string }) {
  const inline = (line: string) => line.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
  return <div className={styles.messageCopy}>{text.split(/\n\s*\n/).map((block, index) => {
    const lines = block.split("\n");
    return lines.every(line => /^[-*]\s/.test(line)) ? <ul key={index}>{lines.map((line, item) => <li key={item}>{inline(line.replace(/^[-*]\s+/, ""))}</li>)}</ul> : <p key={index}>{inline(block)}</p>;
  })}</div>;
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("checking");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [checkVersion, setCheckVersion] = useState(0);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const inputField = useRef<HTMLTextAreaElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const highlight = useRef<{ element: HTMLElement; timer: ReturnType<typeof setTimeout> } | null>(null);
  const nextId = useRef(0);
  const full = turns.filter(turn => turn.role === "user").length >= 5;

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    let active = true;
    setStatus("checking");
    const timeout = setTimeout(() => controller.abort(), 10_000);
    fetch("/api/chat", { signal: controller.signal, cache: "no-store" })
      .then(async response => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (active) setStatus(data.available === true ? "ready" : "offline");
      })
      .catch(() => { if (active) setStatus("error"); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; controller.abort(); clearTimeout(timeout); };
  }, [open, checkVersion]);

  useEffect(() => {
    if (open) (status === "ready" && !full ? inputField.current : closeButton.current)?.focus();
  }, [open, status, full]);

  useEffect(() => {
    const pane = transcript.current;
    if (!pane) return;
    const latest = pane.querySelector<HTMLElement>("[data-chat-turn]:last-child");
    const top = turns[turns.length - 1]?.role === "assistant" && latest
      ? latest.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop
      : pane.scrollHeight;
    pane.scrollTo({ top, behavior: "auto" });
  }, [turns, pending, error]);

  useEffect(() => () => {
    request.current?.abort();
    if (highlight.current) {
      clearTimeout(highlight.current.timer);
      highlight.current.element.classList.remove("portfolio-chat-target");
    }
  }, []);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  };

  const navigate = (action: ChatAction) => {
    if (action.kind === "resume") return;
    if (action.kind === "section" && !portfolioSections.includes(action.target)) return;
    if (action.kind === "project" && !projectTargets.has(action.target)) return;
    const element = document.getElementById(action.target);
    if (!element) return;
    if (highlight.current) {
      clearTimeout(highlight.current.timer);
      highlight.current.element.classList.remove("portfolio-chat-target");
    }
    setOpen(false);
    element.classList.add("portfolio-chat-target");
    element.tabIndex = -1;
    element.focus({ preventScroll: true });
    element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    highlight.current = { element, timer: setTimeout(() => element.classList.remove("portfolio-chat-target"), 4000) };
  };

  const send = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || prompt.length > 1200 || pending || status !== "ready" || full) return;
    const user: Turn = { id: ++nextId.current, role: "user", content: prompt };
    const history = [...turns, user];
    setTurns(history);
    setInput("");
    setPending(true);
    setError("");
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const message = data && typeof data === "object" && "error" in data && typeof data.error === "string" ? data.error.slice(0, 250) : "Chat is unavailable. Please try again.";
        throw new Error(message);
      }
      if (!isChatReply(data)) throw new Error("The response could not be read. Please try again.");
      setTurns([...history, { id: ++nextId.current, role: "assistant", content: data.message, reply: data }]);
    } catch (problem) {
      setTurns(turns);
      setInput(prompt);
      setError(controller.signal.aborted ? "The request timed out. Please try again." : problem instanceof Error ? problem.message : "Chat is unavailable. Please try again.");
    } finally {
      clearTimeout(timeout);
      request.current = null;
      setPending(false);
      inputField.current?.focus();
    }
  };

  const submit = (event: FormEvent) => { event.preventDefault(); void send(input); };

  return (
    <aside className={styles.widget} aria-label="Portfolio assistant">
      <button ref={launcher} type="button" className={styles.launcher} aria-expanded={open} aria-controls="portfolio-chat" onClick={() => setOpen(!open)} hidden={open}>
        <span aria-hidden="true">↳</span> Ask about my work
      </button>
      {open && (
        <section id="portfolio-chat" className={styles.panel} role="dialog" aria-labelledby="portfolio-chat-title" onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
          <header className={styles.header}>
            <div><h2 id="portfolio-chat-title">Portfolio assistant</h2><p>{status === "ready" ? "Gemini · portfolio tools" : status === "checking" ? "Checking connection…" : "Chat offline"}</p></div>
            <button ref={closeButton} type="button" onClick={close} className={styles.close} aria-label="Close portfolio chat">×</button>
          </header>
          <div ref={transcript} className={styles.transcript}>
            <p className={styles.intro}>Ask about my projects, skills, or experience. The assistant can find relevant work and help you explore the page.</p>
            {(status === "offline" || status === "error") && <div className={styles.offline} role="status"><p>AI chat is unavailable right now. You can still explore the portfolio.</p><div className={styles.actions}><button type="button" onClick={() => navigate({ kind: "section", target: "projects", label: "Projects" })}>View projects</button><button type="button" onClick={() => setCheckVersion(value => value + 1)}>Retry connection</button></div></div>}
            {status === "ready" && turns.length === 0 && <div className={styles.suggestions}>{suggestions.map(suggestion => <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={pending}>{suggestion} ↗</button>)}</div>}
            <div role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions text">
              {turns.map(turn => <article data-chat-turn key={turn.id} className={`${styles.turn} ${turn.role === "user" ? styles.userTurn : ""}`}><h3>{turn.role === "user" ? "You" : "Portfolio assistant"}</h3><ReplyText text={turn.content} />
                {turn.reply && <>
                  {!!turn.reply.steps.length && <details className={styles.steps}><summary>Workflow · {turn.reply.steps.length} {turn.reply.steps.length === 1 ? "step" : "steps"}</summary><ol>{turn.reply.steps.map((step, index) => <li key={`${index}-${step}`}>{step}</li>)}</ol></details>}
                  {!!turn.reply.sources.length && <div className={styles.sources}><span>Sources</span>{turn.reply.sources.map(source => <button key={source.id} type="button" onClick={() => navigate({ kind: "section", target: source.section, label: source.title })}>{source.title}</button>)}</div>}
                  <div className={styles.actions}>{turn.reply.actions.map((action, index) => action.kind === "resume" ? <a key={index} href="/KarthikeyanRV_Resume.pdf" target="_blank" rel="noreferrer">{action.label} ↗</a> : <button key={index} type="button" onClick={() => navigate(action)}>{action.label} ↗</button>)}</div>
                </>}
              </article>)}
            </div>
            {pending && <p className={styles.status} role="status">Looking through the portfolio…</p>}
            {error && <p className={styles.error} role="alert">{error}</p>}
          </div>
          <form onSubmit={submit} className={styles.composer}>
            {full && <p className={styles.status}>Start a new chat to ask more questions.</p>}
            <label htmlFor="portfolio-chat-input">Your question</label>
            <textarea ref={inputField} id="portfolio-chat-input" value={input} onChange={event => setInput(event.target.value)} maxLength={1200} rows={2} placeholder="Ask about AI projects…" disabled={status !== "ready" || pending || full} />
            <div className={styles.composerActions}><button type="button" className={styles.reset} disabled={pending || !turns.length} onClick={() => { setTurns([]); setInput(""); setError(""); }}>New chat</button><button type="submit" className={styles.send} disabled={status !== "ready" || pending || full || !input.trim()}>{pending ? "Working…" : "Send ↗"}</button></div>
            <p className={styles.privacy}>Questions are sent to Google Gemini. Avoid sharing private information. AI answers can be inaccurate.</p>
          </form>
        </section>
      )}
    </aside>
  );
}
