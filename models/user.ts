export interface UserProfile {
  userId: number;
  nickname: string;
  email: string;
  followersCount: number;
  followingCount: number;
}

export interface UserDetails {
  userId: number;
  nickname: string;
  email: string;
  isFollowedByCurrentUser: boolean;
  quizLikesCount: number;
  followersCount: number;
}
