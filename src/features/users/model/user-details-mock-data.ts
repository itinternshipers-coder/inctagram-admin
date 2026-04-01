// TEMP MOCK DATA for /users/[userId] page.
// Remove this file after GraphQL integration for user details tabs is implemented.

export type PaymentRow = {
  id: string
  paymentDate: string
  endDate: string
  amount: string
  subscriptionType: string
  paymentType: string
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
  {
    id: 'p1',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$10',
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    id: 'p2',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$50',
    subscriptionType: '7 day',
    paymentType: 'Stripe',
  },
  {
    id: 'p3',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$10',
    subscriptionType: '7 day',
    paymentType: 'Stripe',
  },
  {
    id: 'p4',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$10',
    subscriptionType: '1 day',
    paymentType: 'PayPal',
  },
  {
    id: 'p5',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$50',
    subscriptionType: '7 day',
    paymentType: 'PayPal',
  },
  {
    id: 'p6',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$50',
    subscriptionType: '1 day',
    paymentType: 'PayPal',
  },
  {
    id: 'p7',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$50',
    subscriptionType: '7 day',
    paymentType: 'PayPal',
  },
  {
    id: 'p8',
    paymentDate: '12.12.2022',
    endDate: '12.12.2022',
    amount: '$50',
    subscriptionType: '7 day',
    paymentType: 'PayPal',
  },
]

export const USER_DETAILS_FOLLOWERS: FollowRow[] = [
  { id: 'f1', username: 'Ivan Yakymenko', profileLink: 'Ivan.sr.yakimenko', since: '12.12.2022' },
  { id: 'f2', username: 'Kirill Mikulich', profileLink: 'Kirill_Mikulich', since: '12.12.2022' },
  { id: 'f3', username: 'Anton Antonov', profileLink: 'Anton.Antonov', since: '12.12.2022' },
  { id: 'f4', username: 'Oleg Olegovich', profileLink: 'OlegOlegovich', since: '12.12.2022' },
  { id: 'f5', username: 'Anna Votakaya', profileLink: 'Anna_Votakaya', since: '12.12.2022' },
  { id: 'f6', username: 'Nikilay Kolya', profileLink: 'Nikilay89Kolya', since: '12.12.2022' },
  { id: 'f7', username: 'Artur Perojcov', profileLink: 'Artur_Perojcov', since: '12.12.2022' },
  { id: 'f8', username: 'Ekaterina Mastereo', profileLink: 'Ekaterina-Mastereo', since: '12.12.2022' },
]

export const USER_DETAILS_FOLLOWING: FollowRow[] = [
  { id: 'fg1', username: 'Roman Ivanov', profileLink: 'Roman_Ivanov', since: '13.12.2022' },
  { id: 'fg2', username: 'Svetlana Egorova', profileLink: 'Svetlana.Egorova', since: '13.12.2022' },
  { id: 'fg3', username: 'Denis Baranov', profileLink: 'Denis_Baranov', since: '13.12.2022' },
  { id: 'fg4', username: 'Andrey Sokolov', profileLink: 'Andrey_Sokolov', since: '13.12.2022' },
  { id: 'fg5', username: 'Irina Mikhailova', profileLink: 'Irina.Mikhailova', since: '13.12.2022' },
  { id: 'fg6', username: 'Elena Popova', profileLink: 'Elena.Popova', since: '13.12.2022' },
]
