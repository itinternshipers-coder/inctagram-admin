export function getTotalPages(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize))
}
