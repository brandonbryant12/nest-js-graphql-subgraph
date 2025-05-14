export interface Associate {
  name: string;
  role: string;
  description: string;
  email: string;
  imageUrl: string;
  link: string;
}

export interface ApplicationTeam {
  id: string;
  associates: Associate[];
}
