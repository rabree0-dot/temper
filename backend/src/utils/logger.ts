export function logger(level: "info" | "warn" | "error" | "debug", message: string, meta?: unknown) {
  const timestamp = new Date().toISOString();
  const log = { timestamp, level, message, meta };
  if (level === "error") {
    console.error(JSON.stringify(log));
  } else if (level === "warn") {
    console.warn(JSON.stringify(log));
  } else {
    console.log(JSON.stringify(log));
  }
}

export const log = {
  info: (msg: string, meta?: unknown) => logger("info", msg, meta),
  warn: (msg: string, meta?: unknown) => logger("warn", msg, meta),
  error: (msg: string, meta?: unknown) => logger("error", msg, meta),
  debug: (msg: string, meta?: unknown) => logger("debug", msg, meta),
};
