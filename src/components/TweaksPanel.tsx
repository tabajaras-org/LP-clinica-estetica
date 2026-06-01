import { Check, Palette, X } from 'lucide-react';
import { useState } from 'react';

export type TweakOption<T extends string> = {
  id: T;
  label: string;
};

export type PaletteTweakOption<T extends string> = TweakOption<T> & {
  swatches: string[];
};

type TweaksPanelVariant = 'maison' | 'dent' | 'solar' | 'medical' | 'education';

type TweaksPanelProps<PaletteId extends string, HeadingFontId extends string, BodyFontId extends string> = {
  bodyFont: BodyFontId;
  bodyFontOptions: TweakOption<BodyFontId>[];
  headingFont: HeadingFontId;
  headingFontOptions: TweakOption<HeadingFontId>[];
  onBodyFontChange: (font: BodyFontId) => void;
  onHeadingFontChange: (font: HeadingFontId) => void;
  onPaletteChange: (palette: PaletteId) => void;
  palette: PaletteId;
  paletteOptions: PaletteTweakOption<PaletteId>[];
  variant?: TweaksPanelVariant;
};

const variantClasses = {
  maison: {
    closedButton:
      'border border-slate-300/70 bg-white/80 px-4 font-body text-xs font-semibold text-slate-800 shadow-glass backdrop-blur',
    closedIcon: 'text-slate-800',
    panel: 'tweaks-panel w-[244px] text-slate-900',
    title: 'font-body text-xs font-bold',
    closeButton: 'text-slate-500 hover:bg-slate-900/10 hover:text-slate-900',
    sectionLabel: 'font-caption text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500',
    fieldLabel: 'font-body text-[11px] font-medium text-slate-700',
    swatchButton:
      'border border-slate-900/10 shadow-sm ring-offset-2 ring-offset-transparent focus:ring-2 focus:ring-slate-700',
    activeSwatch: 'bg-slate-900 text-white',
    select:
      'border border-white/60 bg-white/70 px-2 font-body text-[11px] text-slate-800 outline-none focus:border-slate-500',
  },
  dent: {
    closedButton:
      'border border-[color:var(--dent-green)]/40 bg-[var(--dent-panel)]/90 px-4 dent-body text-xs font-semibold text-[var(--dent-text)] shadow-[0_18px_50px_-20px_var(--dent-glow)] backdrop-blur',
    closedIcon: 'text-[var(--dent-green)]',
    panel: 'dent-tweaks-panel w-[248px] text-[var(--dent-text)]',
    title: 'dent-body text-xs font-bold',
    closeButton: 'text-[var(--dent-muted)] hover:bg-white/10 hover:text-[var(--dent-text)]',
    sectionLabel: 'dent-caption text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--dent-cyan)]',
    fieldLabel: 'dent-body text-[11px] font-medium text-[var(--dent-muted)]',
    swatchButton:
      'border border-white/15 shadow-sm ring-offset-2 ring-offset-[var(--dent-panel)] focus:ring-2 focus:ring-[var(--dent-green)]',
    activeSwatch: 'bg-[var(--dent-green)] text-[var(--dent-space)]',
    select:
      'border border-white/15 bg-[var(--dent-panel-2)] px-2 dent-body text-[11px] text-[var(--dent-text)] outline-none focus:border-[var(--dent-green)]',
  },
  solar: {
    closedButton:
      'border border-[color:var(--solar-green)]/40 bg-[var(--solar-panel)]/90 px-4 solar-body text-xs font-semibold text-[var(--solar-text)] shadow-[0_18px_50px_-20px_var(--solar-glow)] backdrop-blur',
    closedIcon: 'text-[var(--solar-green)]',
    panel: 'solar-tweaks-panel w-[248px] text-[var(--solar-text)]',
    title: 'solar-body text-xs font-bold',
    closeButton: 'text-[var(--solar-muted)] hover:bg-white/10 hover:text-[var(--solar-text)]',
    sectionLabel: 'solar-caption text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--solar-blue)]',
    fieldLabel: 'solar-body text-[11px] font-medium text-[var(--solar-muted)]',
    swatchButton:
      'border border-white/15 shadow-sm ring-offset-2 ring-offset-[var(--solar-panel)] focus:ring-2 focus:ring-[var(--solar-green)]',
    activeSwatch: 'bg-[var(--solar-green)] text-[var(--solar-space)]',
    select:
      'border border-white/15 bg-[var(--solar-panel-2)] px-2 solar-body text-[11px] text-[var(--solar-text)] outline-none focus:border-[var(--solar-green)]',
  },
  medical: {
    closedButton:
      'border border-[color:var(--med-blue)]/35 bg-[var(--med-panel)]/90 px-4 med-body text-xs font-semibold text-[var(--med-text)] shadow-[0_18px_50px_-20px_var(--med-glow)] backdrop-blur',
    closedIcon: 'text-[var(--med-green)]',
    panel: 'medical-tweaks-panel w-[248px] text-[var(--med-text)]',
    title: 'med-body text-xs font-bold',
    closeButton: 'text-[var(--med-muted)] hover:bg-white/10 hover:text-[var(--med-text)]',
    sectionLabel: 'med-caption text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--med-green)]',
    fieldLabel: 'med-body text-[11px] font-medium text-[var(--med-muted)]',
    swatchButton:
      'border border-white/15 shadow-sm ring-offset-2 ring-offset-[var(--med-panel)] focus:ring-2 focus:ring-[var(--med-green)]',
    activeSwatch: 'bg-[var(--med-green)] text-[var(--med-ink)]',
    select:
      'border border-white/15 bg-[var(--med-panel-2)] px-2 med-body text-[11px] text-[var(--med-text)] outline-none focus:border-[var(--med-green)]',
  },
  education: {
    closedButton:
      'border border-[color:var(--edu-gold)]/45 bg-[var(--edu-panel)]/90 px-4 edu-body text-xs font-semibold text-[var(--edu-text)] shadow-[0_18px_50px_-20px_var(--edu-glow)] backdrop-blur',
    closedIcon: 'text-[var(--edu-gold)]',
    panel: 'education-tweaks-panel w-[248px] text-[var(--edu-text)]',
    title: 'edu-body text-xs font-bold',
    closeButton: 'text-[var(--edu-muted)] hover:bg-white/10 hover:text-[var(--edu-text)]',
    sectionLabel: 'edu-caption text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--edu-gold)]',
    fieldLabel: 'edu-body text-[11px] font-medium text-[var(--edu-muted)]',
    swatchButton:
      'border border-white/15 shadow-sm ring-offset-2 ring-offset-[var(--edu-panel)] focus:ring-2 focus:ring-[var(--edu-gold)]',
    activeSwatch: 'bg-[var(--edu-gold)] text-[var(--edu-ink)]',
    select:
      'border border-white/15 bg-[var(--edu-panel-2)] px-2 edu-body text-[11px] text-[var(--edu-text)] outline-none focus:border-[var(--edu-gold)]',
  },
};

export function TweaksPanel<PaletteId extends string, HeadingFontId extends string, BodyFontId extends string>({
  bodyFont,
  bodyFontOptions,
  headingFont,
  headingFontOptions,
  onBodyFontChange,
  onHeadingFontChange,
  onPaletteChange,
  palette,
  paletteOptions,
  variant = 'maison',
}: TweaksPanelProps<PaletteId, HeadingFontId, BodyFontId>) {
  const [open, setOpen] = useState(true);
  const classes = variantClasses[variant];
  const headingSelectId = `${variant}-heading-font`;
  const bodySelectId = `${variant}-body-font`;

  if (!open) {
    return (
      <button
        aria-label="Abrir ajustes visuais"
        className={`fixed left-4 top-4 z-[60] inline-flex h-11 items-center gap-2 rounded-full transition hover:-translate-y-0.5 ${classes.closedButton}`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Palette className={`h-4 w-4 ${classes.closedIcon}`} />
        Tweaks
      </button>
    );
  }

  return (
    <aside className={`fixed left-4 top-4 z-[60] rounded-xl p-3 ${classes.panel}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className={classes.title}>Tweaks</h2>
        <button
          aria-label="Fechar ajustes"
          className={`grid h-6 w-6 place-items-center rounded-full transition ${classes.closeButton}`}
          onClick={() => setOpen(false)}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className={`mb-2 ${classes.sectionLabel}`}>Identidade visual</p>
          <p className={`mb-1.5 ${classes.fieldLabel}`}>Paleta</p>
          <div className="grid grid-cols-4 gap-2">
            {paletteOptions.map((option) => (
              <button
                aria-label={`Usar paleta ${option.label}`}
                className={`relative flex h-10 overflow-hidden rounded-md transition hover:scale-[1.03] focus:outline-none ${classes.swatchButton}`}
                key={option.id}
                onClick={() => onPaletteChange(option.id)}
                title={option.label}
                type="button"
              >
                {option.swatches.slice(0, 3).map((swatch) => (
                  <span className="h-full flex-1" key={swatch} style={{ backgroundColor: swatch }} />
                ))}
                {palette === option.id && (
                  <span className={`absolute grid h-6 w-6 place-items-center rounded-br-md ${classes.activeSwatch}`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 ${classes.sectionLabel}`}>Tipografia</p>
          <label className={`mb-1.5 block ${classes.fieldLabel}`} htmlFor={headingSelectId}>
            Fonte dos titulos
          </label>
          <select
            className={`h-8 w-full rounded-md ${classes.select}`}
            id={headingSelectId}
            onChange={(event) => onHeadingFontChange(event.target.value as HeadingFontId)}
            value={headingFont}
          >
            {headingFontOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <label className={`mb-1.5 mt-3 block ${classes.fieldLabel}`} htmlFor={bodySelectId}>
            Fonte do corpo
          </label>
          <select
            className={`h-8 w-full rounded-md ${classes.select}`}
            id={bodySelectId}
            onChange={(event) => onBodyFontChange(event.target.value as BodyFontId)}
            value={bodyFont}
          >
            {bodyFontOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
