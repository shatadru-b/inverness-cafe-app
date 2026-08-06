/**
 * Opening status from restaurant.hours (Europe/London).
 * hours[]: { opens, closes, dayOfWeek: ['Monday', ...] }
 */

const TZ = 'Europe/London';
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function londonParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    weekday: get('weekday'),
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

function toMinutes(hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + m;
}

function findSchedule(hours, weekday) {
  return hours.find((block) => block.dayOfWeek?.includes(weekday)) || null;
}

/** Next open slot after `from` (minutes today), looking up to 7 days ahead. */
function nextOpen(hours, weekday, minutesNow) {
  const startIdx = DAY_NAMES.indexOf(weekday);
  for (let offset = 0; offset < 7; offset++) {
    const day = DAY_NAMES[(startIdx + offset) % 7];
    const block = findSchedule(hours, day);
    if (!block) continue;
    const openMin = toMinutes(block.opens);
    if (offset === 0 && openMin <= minutesNow) continue; // already past today's open
    if (offset === 0) {
      return { day, opens: block.opens, closes: block.closes, isToday: true };
    }
    return { day, opens: block.opens, closes: block.closes, isToday: false };
  }
  return null;
}

/**
 * @returns {{ isOpen: boolean, label: string, opens?: string, closes?: string }}
 */
export function getOpeningStatus(hours, date = new Date()) {
  if (!hours?.length) {
    return { isOpen: false, label: 'Welcome to Inverness' };
  }

  const { weekday, hour, minute } = londonParts(date);
  const minutesNow = hour * 60 + minute;
  const today = findSchedule(hours, weekday);

  if (today) {
    const openMin = toMinutes(today.opens);
    const closeMin = toMinutes(today.closes);
    if (minutesNow >= openMin && minutesNow < closeMin) {
      return {
        isOpen: true,
        label: `Now Open — until ${today.closes}`,
        opens: today.opens,
        closes: today.closes,
      };
    }
  }

  const next = nextOpen(hours, weekday, minutesNow);
  if (!next) {
    return { isOpen: false, label: 'Currently Closed' };
  }

  if (next.isToday) {
    return {
      isOpen: false,
      label: `Closed — opens today at ${next.opens}`,
      opens: next.opens,
      closes: next.closes,
    };
  }

  const dayLabel = next.day.slice(0, 3); // Mon, Tue…
  return {
    isOpen: false,
    label: `Closed — opens ${dayLabel} ${next.opens}`,
    opens: next.opens,
    closes: next.closes,
  };
}
