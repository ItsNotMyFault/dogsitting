export const AVATAR_PASTEL_PALETTE = [
  { bg: "bg-rose-100", text: "text-rose-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
  { bg: "bg-amber-100", text: "text-amber-600" },
  { bg: "bg-lime-100", text: "text-lime-600" },
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-teal-100", text: "text-teal-600" },
  { bg: "bg-cyan-100", text: "text-cyan-600" },
  { bg: "bg-sky-100", text: "text-sky-600" },
  { bg: "bg-indigo-100", text: "text-indigo-600" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-600" }
] as const;

export function useAvatarColor() {
  function colorsFromId(id?: string | number) {
    if (id == null) return { bg: "bg-slate-100", text: "text-slate-600" };

    const num = Number(id);
    const idx = isNaN(num) ? 0 : num % AVATAR_PASTEL_PALETTE.length;

    return AVATAR_PASTEL_PALETTE[idx];
  }

  function uiForFallback(id?: string | number) {
    const { bg, text } = colorsFromId(id);
    return {
      root: `${bg} ${text}`,
      fallback: `${text} font-medium text-sm`
    };
  }

  return { colorsFromId, uiForFallback };
}
