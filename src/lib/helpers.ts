import { LogTypeColor, Logger } from "./types";

export function uid(len = 6) {
  return Math.random().toString(20).substr(2, len);
}

export function wait(ms: number = 1000): Promise<void> {
  return new Promise((release) => {
    setTimeout(release, ms);
  });
}

export function replaceTag(
  str: string,
  tagName: string,
  after: string
): string {
  const pattern = `<((${tagName})+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)`;
  const re = new RegExp(pattern, "gm");
  return str.replace(re, after);
}

export function getNode(el: string | Element = "body"): Element {
  let elem;

  if (typeof el !== "string") {
    elem = el;
  } else if (el.startsWith("#")) {
    elem = document.getElementById(el.slice(1))!;
  } else {
    elem = document.querySelector(el)!;
  }

  if (!elem) {
    elem = document.createElement("div");
    document.body.appendChild(elem);
  }

  return elem;
}

export function createErrorNode(label: string, error: any) {
  return `<div style="background: #ff7f502e; width: max-content;
  padding: 1rem; border: 1px solid coral;">
  <p><b>${`${label}</b>: ${error}`}</p></div>`;
}

export function createLogger(name: string): Logger {
  let label = name;

  const logger: Logger = (message, type = "INFO") => {
    const title = `[${label || "Q"} @ ${new Date().toLocaleTimeString()}]`;
    const args = [
      `%c ${title} %c ${type} %c ${message}`,
      "font-weight: 500; font-style: italic;",
      `font-weight: bold; color: white; background: ${LogTypeColor[type]};`,
      "color: inherit;"
    ];

    if (type === "ERROR") console.error(...args);
    if (type === "WARN") console.warn(...args);
    if (type === "INFO") console.log(...args);
  }

  if (!window.onerror) {
    // console.log(`
    // .d88888b.
    // d88P" "Y88b
    // 888     888
    // 888     888
    // 888     888
    // 888 Y8b 888
    // Y88b.Y8b88P
    // "Y888888"
    //       Y8b`);

    label = "Q";
    window.onerror = (e) => {
      const error = ((e as unknown) as { error: any }).error || e.toString();
      logger(error, "ERROR");
      return true;
    };

    label = name;
  }

  return logger;
}
