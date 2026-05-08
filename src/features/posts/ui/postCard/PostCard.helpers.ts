export function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase()
}

export function hasImageUrl(value?: string | null) {
  return Boolean(value?.trim())
}
