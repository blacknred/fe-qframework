import {
  Mapped,
  Logger,
  Persister,
  LogTypeColor,
  PersistAdapter,
  ListenCtx
} from "./types";

export function uid(len = 11) {
  return Math.random().toString(20).substr(2, len);
}

export function wait(ms: number = 1000): Promise<void> {
  return new Promise((release) => {
    setTimeout(release, ms);
  });
}

export function throttle(callback: Function, limit: number = 100) {
  // throttle: 1 2 _ 4 5 _ 7 8
  // 1. run
  // 2. timeout run
  let waiting = false;

  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;

      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

export function debounce(callback: Function, limit: number = 100) {
  // debounce: _ _ _ _ _ _ _ _ 9
  // 1. timeout run or reassign
  let timer = 0;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(function () {
      console.log("55");
      callback.apply(this, arguments);
    }, limit);
  };
}

export function clone(data: any) {
  try {
    // some props may be lost but this is enough for debugging
    const clone = JSON.parse(JSON.stringify(data));
    return clone;
  } catch (e) {
    return data;
  }
}

export const getRegex = {
  tag(tag: string) {
    return new RegExp(`<((${tag})+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)`, "i");
  }
};

// export const replace = {
//   all(here: string, pattern: string, after: string): string {
//     const re = new RegExp(pattern, "i");
//     return here.replace(re, after);
//   },
//   tag(target: string, tag: string, after: string) {
//     const pattern = `<((${tag})+)([^<]+)*(?:>(.*)</\\1>|\\s+\\/>)`;
//     return this.all(target, pattern, after);
//   },
//   method(target: string, methodName: string, after: string) {
//     const pattern = `${methodName}`;
//     return this.all(target, pattern, after);
//   }
// };

/**
 * JSON based object comparison
 *
 * limitations:
 * - key order matters
 * - some types are not representable(dates=>strings, ignores keys with undefined values)
 */
export function isDeepEqual(a: any, b: any, ctx?: ListenCtx<any>): boolean {
  if (!ctx || !Array.isArray(ctx) || !ctx.length) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return ctx.every((key) => {
    const left = typeof key === "function" ? key(a) : a[key];
    const right = typeof key === "function" ? key(b) : b[key];

    return JSON.stringify(left) === JSON.stringify(right);
  });
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

export function createPersister<T extends Mapped<any>>(
  adapter: PersistAdapter<T>,
  name: string,
  logger?: Logger
): Persister<T> {
  return (data: T, initial?: boolean) => {
    try {
      if (initial) {
        let cache: any;

        if (typeof adapter === "function") {
          cache = adapter(data);
        } else if (adapter === "indexeddb") {
          cache = data; // TODO
        } else if (adapter === "websql") {
          cache = data; // TODO
        } else {
          cache = localStorage.getItem(name);
          if (cache) cache = JSON.parse(cache);
        }

        if (typeof cache !== "object") {
          throw new Error("No store data found!");
        }

        return Object.keys(data).reduce((a: T, k: keyof T) => {
          a[k] = cache[k] || data[k];
          return a;
        }, {} as T);
      }

      if (typeof adapter === "function") {
        adapter(data);
      } else if (adapter === "indexeddb") {
        // TODO
      } else if (adapter === "websql") {
        // TODO
      } else {
        localStorage.setItem(name, JSON.stringify(data));
      }

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
    //  .d88888b.
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
