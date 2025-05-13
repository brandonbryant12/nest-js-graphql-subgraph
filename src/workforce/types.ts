export interface TeamMember {
  name: string;
  role: string;
}

export interface TeamStructure {
  id: string;
  teamMembers: TeamMember[];
}