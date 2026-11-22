import type { NextApiRequest, NextApiResponse } from "next";
import { ChatBudget, ChatError } from "../../server/chatLimits";
import { DEFAULT_CHAT_MODEL, runPortfolioAgent, validateMessages } from "../../server/portfolioAgent";

const runtime = globalThis as typeof globalThis & { portfolioChatBudget?: ChatBudget };
const budget = runtime.portfolioChatBudget ??= new ChatBudget();

export const config = { api: { bodyParser: { sizeLimit: "32kb" }, responseLimit: "32kb" }, maxDuration: 30 };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const available = Boolean(apiKey) && process.env.PORTFOLIO_CHAT_ENABLED !== "false";
  if (req.method === "GET") return res.status(200).json({ available, provider: "Gemini" });
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  let release: (() => void) | undefined;
  try {
    const origin = req.headers.origin;
    if (req.headers["sec-fetch-site"] === "cross-site" || (origin && new URL(origin).host !== req.headers.host)) throw new ChatError(403, "Please use chat from the portfolio webpage.");
    if (!req.headers["content-type"]?.startsWith("application/json")) throw new ChatError(415, "Please send JSON.");
    const messages = validateMessages(req.body);
    if (!available || !apiKey) throw new ChatError(503, "AI chat is offline right now. Please use the portfolio links below.");
    release = budget.startRequest();
    const reply = await runPortfolioAgent(messages, {
      apiKey,
      model: process.env.GEMINI_MODEL || DEFAULT_CHAT_MODEL,
      beforeModelCall: () => budget.spendModelCall(),
    });
    return res.status(200).json(reply);
  } catch (error) {
    const problem = error instanceof ChatError ? error : new ChatError(500, "Chat could not complete that request.");
    if (problem.retryAfter) res.setHeader("Retry-After", String(problem.retryAfter));
    return res.status(problem.status).json({ error: problem.message });
  } finally {
    release?.();
  }
}
