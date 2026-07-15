"use client";

import React, { useRef, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@hummingbirdui/react/tooltip";

const COLORS = [
  "blue",
  "sky",
  "cyan",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "red",
  "rose",
  "orange",
  "amber",
  "yellow",
  "lime",
  "teal",
  "emerald",
  "green",
  "olive",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "mist",
  "mauve",
  "taupe",
  "brown",
  "maroon",
];

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// ---------------------------------------------------------------------------
// Color math: the build/browser may hand back the color as oklch(), lab(),
// rgb(), or #hex (Lightning CSS transpiles oklch for older browser targets).
// Everything is converted to OKLCH so the palette always displays the format
// the palettes are authored in.
// ---------------------------------------------------------------------------

function oklabFromLms(l: number, m: number, s: number): [number, number, number] {
  const l3 = Math.cbrt(l);
  const m3 = Math.cbrt(m);
  const s3 = Math.cbrt(s);
  return [
    0.2104542553 * l3 + 0.793617785 * m3 - 0.0040720468 * s3,
    1.9779984951 * l3 - 2.428592205 * m3 + 0.4505937099 * s3,
    0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3,
  ];
}

function oklabFromLinearSrgb(r: number, g: number, b: number) {
  return oklabFromLms(
    0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b,
    0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b,
    0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b,
  );
}

/** CSS `lab()` is CIELAB with a D50 white point → XYZ(D65) → OKLab */
function oklabFromCielab(L: number, a: number, b: number) {
  const k = 24389 / 27;
  const e = 216 / 24389;
  const fy = (L + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const xr = fx ** 3 > e ? fx ** 3 : (116 * fx - 16) / k;
  const yr = L > k * e ? fy ** 3 : L / k;
  const zr = fz ** 3 > e ? fz ** 3 : (116 * fz - 16) / k;
  const X = xr * 0.96422;
  const Y = yr;
  const Z = zr * 0.82521;
  // Bradford chromatic adaptation D50 → D65, then XYZ → LMS
  const X65 = 0.9554734527042182 * X - 0.023098536874261423 * Y + 0.0632593086610217 * Z;
  const Y65 = -0.028369706963208136 * X + 1.0099954580058226 * Y + 0.021041398966943008 * Z;
  const Z65 = 0.012314001688319899 * X - 0.020507696433477912 * Y + 1.3303659366080753 * Z;
  return oklabFromLms(
    0.8189330101 * X65 + 0.3618667424 * Y65 - 0.1288597137 * Z65,
    0.0329845436 * X65 + 0.9293118715 * Y65 + 0.0361456387 * Z65,
    0.0482003018 * X65 + 0.2643662691 * Y65 + 0.633851707 * Z65,
  );
}

function formatOklch([L, a, b]: [number, number, number]): string {
  const round = (v: number, digits: number) => {
    const p = 10 ** digits;
    return Math.round(v * p) / p;
  };
  const C = Math.hypot(a, b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  // Near-achromatic colors have no meaningful hue
  if (C < 0.0005) return `oklch(${round(L * 100, 1)}% 0 0)`;
  return `oklch(${round(L * 100, 1)}% ${round(C, 3)} ${round(H, 3)})`;
}

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

/** Convert any CSS color the browser reports into an `oklch(...)` string */
function toOklch(value: string): string {
  const oklch = value.match(/^oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\)$/);
  if (oklch) {
    const [, L, C, H] = oklch;
    return `oklch(${parseFloat(L)}% ${parseFloat(C)} ${parseFloat(H)})`;
  }

  const lab = value.match(/^lab\((-?[\d.]+)%?\s+(-?[\d.]+)\s+(-?[\d.]+)\)$/);
  if (lab) {
    return formatOklch(
      oklabFromCielab(parseFloat(lab[1]), parseFloat(lab[2]), parseFloat(lab[3])),
    );
  }

  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return formatOklch(
      oklabFromLinearSrgb(
        srgbToLinear(((n >> 16) & 255) / 255),
        srgbToLinear(((n >> 8) & 255) / 255),
        srgbToLinear((n & 255) / 255),
      ),
    );
  }

  const rgb = value.match(/^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (rgb) {
    return formatOklch(
      oklabFromLinearSrgb(
        srgbToLinear(parseInt(rgb[1]) / 255),
        srgbToLinear(parseInt(rgb[2]) / 255),
        srgbToLinear(parseInt(rgb[3]) / 255),
      ),
    );
  }

  return value;
}

function Swatch({ color, shade }: { color: string; shade: number }) {
  const varName = `--color-${color}-${shade}`;
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const readValue = () =>
    toOklch(
      getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim(),
    );

  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setLabel(readValue());
      }}
    >
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Copy ${varName} value`}
          className="aspect-square w-full rounded-sm outline -outline-offset-1 outline-black/10 sm:rounded-md dark:outline-white/10"
          style={{ backgroundColor: `var(${varName})` }}
          onClick={() => {
            const value = readValue();
            navigator.clipboard.writeText(value);
            setLabel("Copied!");
            setOpen(true);
            if (resetTimer.current) clearTimeout(resetTimer.current);
            resetTimer.current = setTimeout(() => setLabel(value), 1500);
          }}
        />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/**
 * Interactive palette grid: every color × shade of the active theme, with the
 * resolved OKLCH value in a tooltip and click-to-copy. Values are read from
 * the CSS variables at hover time, so the grid always reflects the current
 * theme and dark mode.
 */
export function ColorPalette() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 lg:gap-5 2xl:gap-7">
      <div className="sticky top-(--navbar-height) py-1 z-9 bg-default h-8 max-sm:mb-2" />
      <div className="max-lg:text-sm sticky top-(--navbar-height) py-1 z-9 col-start-2 grid grid-cols-11 justify-items-center gap-1.5 sm:gap-4 lg:gap-5 2xl:gap-7 bg-default font-medium text-default *:rotate-180 *:[writing-mode:vertical-lr] sm:*:rotate-0 sm:*:[writing-mode:horizontal-tb] max-sm:mb-2">
        {SHADES.map((shade) => (
          <div key={shade}>{shade}</div>
        ))}
      </div>
      {COLORS.map((color) => (
        <React.Fragment key={color}>
          <p className="max-lg:text-sm font-medium text-default capitalize sm:pr-12 mb-0">
            {color}
          </p>
          <div className="grid grid-cols-11 gap-1.5 sm:gap-4 lg:gap-5 2xl:gap-7">
            {SHADES.map((shade) => (
              <Swatch key={shade} color={color} shade={shade} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
