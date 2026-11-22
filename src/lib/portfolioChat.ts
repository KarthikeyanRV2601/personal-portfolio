export const portfolioSections = ["about", "experience", "skills", "projects", "resume", "contact"] as const;
export type PortfolioSection = (typeof portfolioSections)[number];
export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatAction =
  | { kind: "section"; target: PortfolioSection; label: string }
  | { kind: "project"; target: string; label: string }
  | { kind: "resume"; label: string };
export type ChatSource = { id: string; title: string; section: PortfolioSection };
export type ChatReply = {
  message: string;
  actions: ChatAction[];
  steps: string[];
  sources: ChatSource[];
};
export const projectElementId = (title: string) => `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export function isChatReply(value: unknown): value is ChatReply {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<ChatReply>;
  const actions = data.actions;
  const sources = data.sources;
  return typeof data.message === "string" && data.message.length <= 3500
    && Array.isArray(actions) && actions.length <= 3 && actions.every(action => action && typeof action.label === "string" && action.label.length <= 150 && (
      action.kind === "resume" || (action.kind === "section" && portfolioSections.includes(action.target)) || (action.kind === "project" && typeof action.target === "string" && /^project-[a-z0-9-]+$/.test(action.target))
    ))
    && Array.isArray(data.steps) && data.steps.length <= 7 && data.steps.every(step => typeof step === "string" && step.length <= 200)
    && Array.isArray(sources) && sources.length <= 30 && sources.every(source => source && typeof source.id === "string" && typeof source.title === "string" && portfolioSections.includes(source.section));
}
