export interface CommunityTopic {
  id: string;
  title: string;
  titleFr: string;
  content: string;
  contentFr: string;
  author: string;
  authorInitials: string;
  category: string;
  categoryFr: string;
  replies: number;
  likes: number;
  createdAt: string;
  isPinned?: boolean;
}

export interface CommunityStats {
  memberCount: number;
  activeTopics: number;
  dailyMessages: number;
  countriesRepresented: number;
}
