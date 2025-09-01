import { differenceInCalendarDays, format } from 'date-fns'
export function daysLeft(expiry){
  return differenceInCalendarDays(expiry, new Date())
}
export function pretty(d){
  return format(d, 'dd MMM yyyy')
}
export function trafficColor(expiry){
  const d = daysLeft(expiry)
  if(d < 0) return 'bg-red-100'
  if(d <= 2) return 'bg-orange-100'
  return 'bg-green-100'
}
