
export interface Participant {
  id: string;
  name: string;
  group: string;
  score: number;
  lastUpdated: number;
}

export interface ActivityLog {
  id: string;
  participantId: string;
  participantName: string;
  points: number;
  reason: string;
  timestamp: number;
}

export enum TabView {
  LEADERBOARD = 'LEADERBOARD',
  ADMIN_POINTS = 'ADMIN_POINTS',
  ADMIN_IMPORT = 'ADMIN_IMPORT',
  GUIDE = 'GUIDE'
}
