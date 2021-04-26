const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function asyncConfirm(msg = "warning") {
  return new Promise(function (go) {
    let confirmed = window.confirm(msg);

    return confirmed ? go(true) : go(false);
  });
}

export function formatDatesDiff(from: string, to?: string) {
  if (!from) return;

  const a = new Date(from);
  const b = to ? new Date(to) : new Date();

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  const diff = Math.floor((utc1 - utc2) / MS_PER_DAY);

  if (!diff) return "today";
  if (diff < 0) return `${diff}d ago`;
  return `after ${diff}d`;
}
