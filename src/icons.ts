/**
 * Inline icon set. Stroke-only paths on a 24×24 box, drawn with
 * `currentColor` so each icon takes the colour of whatever contains it.
 * Add a new entry here and it's available to <Icon name="…" />.
 */
export const icons = {
  database: `
    <ellipse cx="12" cy="5.6" rx="7" ry="2.8"/>
    <path d="M5 5.6v12c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V5.6"/>
    <path d="M19 11.6c0 1.55-3.13 2.8-7 2.8s-7-1.25-7-2.8"/>
  `,
  server: `
    <rect x="3.4" y="4" width="17.2" height="6.6" rx="2.1"/>
    <rect x="3.4" y="13.4" width="17.2" height="6.6" rx="2.1"/>
    <path d="M7 7.3h.01M7 16.7h.01"/>
    <path d="M10.8 7.3h5.8M10.8 16.7h5.8"/>
  `,
  cube: `
    <path d="M12 2.8 20.4 7v10L12 21.2 3.6 17V7z"/>
    <path d="M3.6 7 12 11.2 20.4 7"/>
    <path d="M12 11.2v10"/>
  `,
  mail: `
    <rect x="2.9" y="4.9" width="18.2" height="14.2" rx="2.4"/>
    <path d="m3.8 7.3 7.2 5a1.9 1.9 0 0 0 2 0l7.2-5"/>
  `,
  branch: `
    <circle cx="7" cy="5.6" r="2.3"/>
    <circle cx="7" cy="18.4" r="2.3"/>
    <circle cx="17.4" cy="9" r="2.3"/>
    <path d="M7 7.9v8.2"/>
    <path d="M17.4 11.3a6.2 6.2 0 0 1-6.2 6.2H9.3"/>
  `,
  sun: `
    <circle cx="12" cy="12" r="4.2"/>
    <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M6.5 6.5 4.9 4.9M19.1 19.1l-1.6-1.6M17.5 6.5l1.6-1.6M4.9 19.1l1.6-1.6"/>
  `,
  moon: `
    <path d="M20.2 14.2A8.6 8.6 0 0 1 9.8 3.8a8.6 8.6 0 1 0 10.4 10.4Z"/>
  `,
} as const;

export type IconName = keyof typeof icons;
