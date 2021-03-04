export const ascendingBy = (key: string) => (a: any, b: any) =>
  a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

export const descendingBy = (key: string) => (a: any, b: any) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
