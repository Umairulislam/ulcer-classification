export interface TrendPoint {
  date: string
  classifications: number
}

export const classificationTrendMock: TrendPoint[] = [
  { date: "Mon", classifications: 4 },
  { date: "Tue", classifications: 7 },
  { date: "Wed", classifications: 3 },
  { date: "Thu", classifications: 9 },
  { date: "Fri", classifications: 6 },
  { date: "Sat", classifications: 2 },
  { date: "Sun", classifications: 5 },
]

export interface WagnerGradeSlice {
  grade: string
  count: number
}

export const wagnerGradeMock: WagnerGradeSlice[] = [
  { grade: "Grade 0", count: 8 },
  { grade: "Grade 1", count: 14 },
  { grade: "Grade 2", count: 10 },
  { grade: "Grade 3", count: 6 },
  { grade: "Grade 4", count: 3 },
  { grade: "Grade 5", count: 1 },
]

export type ActivityType = "classification" | "doctor" | "patient"

export interface ActivityItem {
  id: string
  type: ActivityType
  actor: string
  message: string
  timestamp: string // ISO
}

const now = Date.now()
const minutesAgo = (mins: number) => new Date(now - mins * 60_000).toISOString()

export const recentActivityMock: ActivityItem[] = [
  {
    id: "1",
    type: "classification",
    actor: "Dr. Ayesha Khan",
    message: "classified a new ulcer image",
    timestamp: minutesAgo(12),
  },
  {
    id: "2",
    type: "patient",
    actor: "Admin",
    message: "added a new patient",
    timestamp: minutesAgo(45),
  },
  {
    id: "3",
    type: "doctor",
    actor: "Admin",
    message: "created a new doctor account",
    timestamp: minutesAgo(180),
  },
  {
    id: "4",
    type: "classification",
    actor: "Dr. Bilal Ahmed",
    message: "classified a new ulcer image",
    timestamp: minutesAgo(300),
  },
  {
    id: "5",
    type: "patient",
    actor: "Admin",
    message: "updated a patient's profile",
    timestamp: minutesAgo(1320),
  },
]
