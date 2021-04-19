import { LogTypeColor, Logger, Persister } from "./types";

export function uid(len = 11) {
  return Math.random().toString(20).substr(2, len);
}

export function wait(ms: number = 1000): Promise<void> {
  return new Promise((release) => {
    setTimeout(release, ms);
  });
}

export function clone(data: any) {
  try {
    // some props may lost but this enough for debugging
    const clone = JSON.parse(JSON.stringify(data));
    return clone;
  } catch (e) {
    return data;
  }
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

export function createPersister<T>(
  name: string,
  logger?: Logger
): Persister<T> {
  return (data: T, initial?: boolean) => {
    try {
      if (initial) {
        let cache = localStorage.getItem(name);
        if (cache) cache = JSON.parse(cache);
        if (!cache) throw new Error("No data found in localStorage!");

        return Object.keys(data).reduce((a: any, k: any) => {
          a[k] = cache?.[k] || (data as any)[k];
          return a;
        }, {}) as T;
      }

      localStorage.setItem(name, JSON.stringify(data));

      return data;
    } catch (e) {
      logger?.(e.message, "warn");
      return data;
    }
  };
}

export function createLogger(name: string): Logger {
  let label = name;

  const logger: Logger = (message, type = "log") => {
    const title = `[${label || "Q"} @ ${new Date().toLocaleTimeString()}]`;

    if (Array.isArray(message) && type === "log") {
      console.groupCollapsed(
        `%c ${title}`,
        "font-weight: 500; font-style: italic;"
      );
      console.log("prev:", message[0]);
      console.log("next:", message[1]);
      console.groupEnd();
    } else {
      console[type](
        `%c ${title} %c ${type.toUpperCase()} %c ${message}`,
        "font-weight: 500; font-style: italic;",
        `font-weight: bold; color: white; background: ${LogTypeColor[type]};`,
        "color: inherit;"
      );
    }
  };

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
      logger(error, "error");
      return true;
    };

    label = name;
  }

  return logger;
}
