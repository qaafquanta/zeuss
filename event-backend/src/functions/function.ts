export function getThreeMonthsFromNow(): Date {
  const now = new Date()
  const future = new Date(now)
  future.setMonth(future.getMonth() + 3)
  return future
}