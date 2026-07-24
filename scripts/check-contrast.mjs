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
import { Chrome, Themes } from '../src/palettes.ts';

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

/** Pairs that are genuinely composited on screen, for one scheme's palette. */
function pairsFor(c) {
  return [
    { fg: c.text, bg: c.background, label: 'text on background', level: 'AA' },
    { fg: c.text, bg: c.backgroundElement, label: 'text on backgroundElement', level: 'AA' },
    { fg: c.text, bg: c.backgroundSelected, label: 'text on backgroundSelected', level: 'AA' },
    { fg: c.text, bg: c.panel, label: 'text on panel', level: 'AA' },
    { fg: c.textSecondary, bg: c.background, label: 'textSecondary on background', level: 'AA' },
    { fg: c.textSecondary, bg: c.backgroundElement, label: 'textSecondary on backgroundElement', level: 'AA' },
    { fg: c.accentText, bg: c.accent, label: 'accentText on accent', level: 'AA' },
    { fg: c.link, bg: c.background, label: 'link on background', level: 'AA' },
    { fg: c.link, bg: c.backgroundElement, label: 'link on backgroundElement', level: 'AA' },
    { fg: c.text, bg: c.accentSoft, label: 'text on accentSoft', level: 'AA' },
    { fg: c.textSecondary, bg: c.accentSoft, label: 'textSecondary on accentSoft', level: 'AA' },
    { fg: c.link, bg: c.accentSoft, label: 'link on accentSoft', level: 'AA' },
    { fg: c.link, bg: c.panel, label: 'link on panel', level: 'AA' },
    { fg: c.success, bg: c.background, label: 'success on background', level: 'AA' },
    { fg: c.danger, bg: c.background, label: 'danger on background', level: 'AA' },
    { fg: c.warning, bg: c.background, label: 'warning on background', level: 'AA' },
    {
      fg: c.accent,
      bg: c.background,
      label: 'accent on background',
      level: 'AA-large',
      note: 'fills, borders and icons — accent-colored text uses `link`',
    },
    {
      fg: c.hairlineStrong,
      bg: c.background,
      label: 'hairlineStrong on background',
      level: 'info',
      note: 'decorative divider; control affordance comes from the surface fill',
    },
  ];
}

/** The fixed dark chrome (camera, toast, prompt) — one set, scheme-independent. */
function chromePairs() {
  return [
    { fg: Chrome.text, bg: Chrome.toast, label: 'Chrome.text on toast', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.base, label: 'Chrome.text on base', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.deep, label: 'Chrome.text on deep', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.deepest, label: 'Chrome.text on deepest', level: 'AA' },
    { fg: Chrome.textSecondary, bg: Chrome.toast, label: 'Chrome.textSecondary on toast', level: 'AA' },
    { fg: Chrome.text, bg: Chrome.accent, label: 'Chrome.text on accent (filled btn)', level: 'AA' },
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

const showAll = process.argv.includes('--all');
let failures = 0;
let checked = 0;

function report(scope, pairs) {
  const rows = pairs.map((p) => {
    const ratio = contrast(p.fg, p.bg);
    const min = THRESHOLD[p.level];
    return { ...p, ratio, min, ok: p.level === 'info' || ratio >= min };
  });
  checked += rows.length;
  const bad = rows.filter((r) => !r.ok);
  failures += bad.length;

  const shown = showAll ? rows : bad;
  if (!shown.length) {
    console.log(`  ${scope}: all ${rows.length} pairs pass`);
    return;
  }
  console.log(`  ${scope}:`);
  for (const r of shown) {
    const mark = r.level === 'info' ? 'info' : r.ok ? 'ok  ' : 'FAIL';
    console.log(
      `    ${mark} ${r.ratio.toFixed(2)}:1 ${r.level === 'info' ? '(informational)' : `(needs ${r.min})`} ${r.label}  ${r.fg} on ${r.bg}` +
        (r.ok || !r.note ? '' : `\n         note: ${r.note}`),
    );
  }
}

console.log('WCAG contrast audit — all variants, both schemes\n');

for (const [variant, schemes] of Object.entries(Themes)) {
  console.log(`${variant}:`);
  for (const scheme of ['light', 'dark']) {
    report(scheme, pairsFor(schemes[scheme]));
  }
  console.log('');
}

console.log('chrome (fixed, scheme-independent):');
report('chrome', chromePairs());

console.log(`\n${checked - failures}/${checked} pairs pass.`);
if (failures) {
  console.log(`${failures} FAILING — fix the token, or justify it in the design notes.`);
  process.exit(1);
}
