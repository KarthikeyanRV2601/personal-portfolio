export class ChatError extends Error {
  constructor(public status: number, message: string, public retryAfter?: number) {
    super(message);
    this.name = "ChatError";
  }
}

/** Best-effort process-local limits. Provider quotas remain the deployment-wide backstop. */
export class ChatBudget {
  private minuteStarted = 0;
  private requests = 0;
  private day = "";
  private calls = 0;
  private active = 0;

  constructor(private limits = { requestsPerMinute: 8, callsPerDay: 60, concurrent: 2 }) {}

  startRequest(now = Date.now()) {
    if (now - this.minuteStarted >= 60_000) {
      this.minuteStarted = now;
      this.requests = 0;
    }
    if (this.requests >= this.limits.requestsPerMinute || this.active >= this.limits.concurrent) {
      throw new ChatError(429, "Chat is busy. Please try again in a minute.", 60);
    }
    this.requests++;
    this.active++;
    let released = false;
    return () => {
      if (!released) this.active--;
      released = true;
    };
  }

  spendModelCall(now = Date.now()) {
    const day = new Date(now).toISOString().slice(0, 10);
    if (day !== this.day) {
      this.day = day;
      this.calls = 0;
    }
    if (this.calls >= this.limits.callsPerDay) {
      throw new ChatError(429, "AI chat has reached its daily limit. Please try again tomorrow.", 3600);
    }
    this.calls++;
  }
}
