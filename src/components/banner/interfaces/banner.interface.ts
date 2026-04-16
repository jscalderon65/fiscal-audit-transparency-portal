export interface IBannerInfo {
  title: string;
  subtitle: string;
  badge: string;
  badgeIcon: React.ElementType;
}

export interface IBannerProfile {
  initials: string;
  name: string;
  role: string;
  description: string;
}

export interface IBannerProps {
  info: IBannerInfo;
  profile: IBannerProfile;
}
