export interface UserProfile {
  userId: number;
  nickname: string;
  email: string;
  followersCount: number;
  followingCount: number;
}

export interface User {
  idUser: number;
  nickname: string;
  email: string;
  userRole: string;
}

export interface UserDetails {
  userId: number;
  nickname: string;
  email: string;
  isFollowedByCurrentUser: boolean;
  quizLikesCount: number;
  followersCount: number;
}
