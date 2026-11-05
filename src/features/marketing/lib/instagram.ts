export function normalizeExternalUrl(value = "") {
  return value.startsWith("//") ? `https:${value}` : value;
}

export function getInstagramHandle(profileUrl?: string) {
  try {
    const handle = new URL(normalizeExternalUrl(profileUrl)).pathname.split("/").filter(Boolean)[0];
    return handle ? `@${handle}` : "";
  } catch {
    return "";
  }
}
