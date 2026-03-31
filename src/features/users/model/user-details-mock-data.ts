// TEMP MOCK DATA for /users/[userId] page.
// Remove this file after GraphQL integration for user details tabs is implemented.

export type PaymentRow = {
  id: string
  date: string
  amount: string
  subscription: string
  method: string
}

export type FollowRow = {
  id: string
  username: string
  profileLink: string
  since: string
}

export const USER_DETAILS_TABS = [
  { key: 'uploaded', label: 'Uploaded photos' },
  { key: 'payments', label: 'Payments' },
  { key: 'followers', label: 'Followers' },
  { key: 'following', label: 'Following' },
] as const

export const USER_DETAILS_PHOTO_URLS = [
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=700&q=80',
]

export const USER_DETAILS_PAYMENTS: PaymentRow[] = [
  { id: 'p1', date: '12.12.2022', amount: '$10.00', subscription: '1 day', method: 'Stripe' },
  { id: 'p2', date: '14.01.2023', amount: '$50.00', subscription: '7 days', method: 'PayPal' },
  { id: 'p3', date: '03.02.2023', amount: '$100.00', subscription: '30 days', method: 'Stripe' },
  { id: 'p4', date: '11.03.2023', amount: '$50.00', subscription: '7 days', method: 'PayPal' },
  { id: 'p5', date: '29.04.2023', amount: '$100.00', subscription: '30 days', method: 'Stripe' },
  { id: 'p6', date: '30.05.2023', amount: '$10.00', subscription: '1 day', method: 'Stripe' },
]

export const USER_DETAILS_FOLLOWERS: FollowRow[] = [
  { id: 'f1', username: 'kirill_admin', profileLink: '@kirill_admin', since: '15.02.2023' },
  { id: 'f2', username: 'olga.pro', profileLink: '@olga.pro', since: '01.03.2023' },
  { id: 'f3', username: 'smm_team', profileLink: '@smm_team', since: '18.03.2023' },
  { id: 'f4', username: 'dev_junior', profileLink: '@dev_junior', since: '20.03.2023' },
  { id: 'f5', username: 'travelblogger', profileLink: '@travelblogger', since: '08.04.2023' },
  { id: 'f6', username: 'anna_look', profileLink: '@anna_look', since: '22.04.2023' },
]

export const USER_DETAILS_FOLLOWING: FollowRow[] = [
  { id: 'fg1', username: 'inctagram_news', profileLink: '@inctagram_news', since: '09.01.2023' },
  { id: 'fg2', username: 'design_daily', profileLink: '@design_daily', since: '30.01.2023' },
  { id: 'fg3', username: 'photos_store', profileLink: '@photos_store', since: '11.02.2023' },
  { id: 'fg4', username: 'content_lab', profileLink: '@content_lab', since: '15.02.2023' },
  { id: 'fg5', username: 'motion_team', profileLink: '@motion_team', since: '02.03.2023' },
]
