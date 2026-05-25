function normalizePassword(value: string | undefined): string {
  const raw = value?.trim() || "lmaofigureitout";
  return raw.replace(/^["']|["']$/g, "");
}

export const WIKI_PASSWORD = normalizePassword(
  process.env.NEXT_PUBLIC_WIKI_PASSWORD
);

export const WIKI_ENTRY_PATH = `/wiki/pass=${WIKI_PASSWORD}`;
