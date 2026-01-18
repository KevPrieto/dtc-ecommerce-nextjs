export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
