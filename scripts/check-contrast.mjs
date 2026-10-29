/**
 * WCAG contrast audit for every palette in the package.
 *
 *   node scripts/check-contrast.mjs          # summary, exits 1 on any failure
 *   node scripts/check-contrast.mjs --all    # every pair, including passes
 *
 * Four brand variants × two schemes is eight palettes — too many to eyeball whenever a color
 * moves. This reads the real token data from `src/palettes.ts` (import-free precisely so a plain
 * Node run can load it) and measures the pairs that actually get composited on screen. Living in
 * the theme package means it gates BOTH apps at the source. Node v22+ strips the TS types natively.
 *
 * Thresholds are WCAG 2.1: 4.5 for normal body text, 3.0 for large/bold text and for non-text UI
 * that still has to be distinguishable (borders, graphic marks).
 */
import { Chrome, ChromeBibo, Themes } from '../src/palettes.ts';

const THRESHOLD = { AA: 4.5, 'AA-large': 3, info: 0 };

/** sRGB hex (with or without an alpha suffix) → linear-light channel values. */
function channels(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  return [r, g, b].map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
}

function luminance(hex) {
  const [r, g, b] = channels(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Pairs genuinely composited on screen. tcgscan text sits on FOUR surfaces (background,
 * backgroundElement, backgroundSelected, panel — see the app's browseTheme adapter), so every
 * readable text role is checked against all of them, not just background. `text` and
 * `textSecondary` also carry a COMFORT target beyond the 4.5 AA floor — "passes AA" and "reads
 * easily" differ, and a 4.6:1 secondary label on a busy dark surface is legal but tiring. Comfort
 * misses are reported, not failed, so weak-but-legal pairs stay visible.
 */
function pairsFor(c) {
  const surfaces = [
    ['background', c.background],
    ['backgroundElement', c.backgroundElement],
    ['backgroundSelected', c.backgroundSelected],
    ['panel', c.panel],
  ];
  const pairs = [];
  for (const [name, bg] of surfaces) {
    pairs.push({ fg: c.text, bg, label: `text on ${name}`, level: 'AA', comfort: 7 });
  }
  for (const [name, bg] of surfaces) {
    pairs.push({ fg: c.textSecondary, bg, label: `textSecondary on ${name}`, level: 'AA', comfort: 5 });
  }
  // michi's secondary/tertiary text ramp (muted2/muted3 render as meta text; muted4 is decorative
  // only). These are INFORMATIONAL: michi's ramp deliberately trades contrast for tonal tiers on
  // its dim steps, and the physics of a light-mode ramp can't make three distinct dim tiers all
  // clear 4.5 on white — that's a michi design call, not a gate. Reported so the values are visible.
  for (const [name, bg] of [['background', c.background], ['backgroundElement', c.backgroundElement]]) {
    pairs.push({ fg: c.muted2, bg, label: `muted2 on ${name}`, level: 'info' });
    pairs.push({ fg: c.muted3, bg, label: `muted3 on ${name}`, level: 'info' });
  }
  for (const [name, bg] of surfaces) {
    pairs.push({ fg: c.link, bg, label: `link on ${name}`, level: 'AA', comfort: 5 });
  }
  for (const [name, bg] of [['background', c.background], ['panel', c.panel], ['backgroundElement', c.backgroundElement]]) {
    pairs.push({ fg: c.success, bg, label: `success on ${name}`, level: 'AA' });
    pairs.push({ fg: c.danger, bg, label: `danger on ${name}`, level: 'AA' });
  }
  pairs.push({ fg: c.warning, bg: c.background, label: 'warning on background', level: 'AA' });
  // Primary-button label on accent — bold, so WCAG large-text threshold (3:1).
  pairs.push({ fg: c.accentText, bg: c.accent, label: 'accentText on accent (button)', level: 'AA-large' });
  // accentSoft is a text-bearing chip/cell tint (labels sit on it).
  pairs.push({ fg: c.text, bg: c.accentSoft, label: 'text on accentSoft', level: 'AA' });
  pairs.push({ fg: c.textSecondary, bg: c.accentSoft, label: 'textSecondary on accentSoft', level: 'AA' });
  pairs.push({ fg: c.link, bg: c.accentSoft, label: 'link on accentSoft', level: 'AA' });
  // Accent as a fill/icon/border (accent-colored TEXT uses `link`).
  pairs.push({
    fg: c.accent, bg: c.background, label: 'accent on background', level: 'AA-large',
    note: 'fills, borders and icons — accent-colored text uses `link`',
  });
  pairs.push({
    fg: c.hairlineStrong, bg: c.background, label: 'hairlineStrong on background', level: 'info',
    note: 'decorative divider; control affordance comes from the surface fill',
  });
  return pairs;
}

/** The fixed dark chrome (camera, toast, prompt) — scheme-independent, one set per brand. */
function chromePairs(Chrome) {
  return [
    { fg: Chrome.text, bg: Chrome.toast, label: 'Chrome.text on toast', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.base, label: 'Chrome.text on base', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.deep, label: 'Chrome.text on deep', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.deepest, label: 'Chrome.text on deepest', level: 'AA' },
    { fg: Chrome.textSecondary, bg: Chrome.toast, label: 'Chrome.textSecondary on toast', level: 'AA' },
    { fg: Chrome.accentText, bg: Chrome.accent, label: 'Chrome.accentText on accent (filled btn)', level: 'AA' },
    { fg: Chrome.textSecondary, bg: Chrome.base, label: 'Chrome.textSecondary on base', level: 'AA' },
    { fg: Chrome.link, bg: Chrome.base, label: 'Chrome.link on base', level: 'AA' },
    { fg: Chrome.link, bg: Chrome.toast, label: 'Chrome.link on toast', level: 'AA' },
    {
      fg: Chrome.success,
      bg: Chrome.toast,
      label: 'Chrome.success on toast',
      level: 'AA-large',
      note: 'a graphic check mark, not text',
    },
  ];
}

/**
 * Pairs a variant fails ON PURPOSE, each with its reason. Reported as informational, never hidden:
 * a justified pair still prints under --all. Keyed `variant:scheme:label`.
 */
const JUSTIFIED = {
  'bibo:light:accent on background':
    'BiBo yellow is a FILL only (Bo, the primary button), always carrying a navy-800 label that ' +
    'identifies the control (WCAG 1.4.11 asks for the label, not the fill). Selection marks, ' +
    'borders and icons on paper use `link` (cyan-ink), never `accent`.',
};

const showAll = process.argv.includes('--all');
const showLow = process.argv.includes('--low'); // also print comfort misses (pass AA, below target)
let failures = 0;
let checked = 0;
let lows = 0;

function report(scope, pairs) {
  const rows = pairs.map((p) => {
    const ratio = contrast(p.fg, p.bg);
    const min = THRESHOLD[p.level];
    const ok = p.level === 'info' || ratio >= min;
    const low = ok && p.comfort && ratio < p.comfort; // passes AA but below the comfort target
    return { ...p, ratio, min, ok, low };
  });
  checked += rows.length;
  const bad = rows.filter((r) => !r.ok);
  failures += bad.length;
  lows += rows.filter((r) => r.low).length;

  const shown = showAll ? rows : rows.filter((r) => !r.ok || (showLow && r.low));
  if (!shown.length) {
    console.log(`  ${scope}: all ${rows.length} pairs pass`);
    return;
  }
  console.log(`  ${scope}:`);
  for (const r of shown) {
    const mark = r.level === 'info' ? 'info' : !r.ok ? 'FAIL' : r.low ? 'low ' : 'ok  ';
    const bar = r.level === 'info' ? '(informational)' : !r.ok ? `(needs ${r.min})` : r.low ? `(AA ok, comfort ${r.comfort})` : '';
    console.log(
      `    ${mark} ${r.ratio.toFixed(2)}:1 ${bar} ${r.label}  ${r.fg} on ${r.bg}` +
        (r.ok || !r.note ? '' : `\n         note: ${r.note}`),
    );
  }
}

console.log('WCAG contrast audit — all variants, both schemes\n');

for (const [variant, schemes] of Object.entries(Themes)) {
  console.log(`${variant}:`);
  for (const scheme of ['light', 'dark']) {
    const pairs = pairsFor(schemes[scheme]).map((p) => {
      const why = JUSTIFIED[`${variant}:${scheme}:${p.label}`];
      return why ? { ...p, level: 'info', note: why } : p;
    });
    report(scheme, pairs);
  }
  console.log('');
}

console.log('chrome (fixed, scheme-independent):');
report('chrome', chromePairs(Chrome));
report('chrome (bibo)', chromePairs(ChromeBibo));

console.log(`\n${checked - failures}/${checked} pairs pass AA. ${lows} pass AA but miss the comfort target (run --low to list).`);
if (failures) {
  console.log(`${failures} FAILING — fix the token, or justify it in the design notes.`);
  process.exit(1);
}
