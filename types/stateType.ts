export type UserState = {
  username: string | null;
  uid: string;
  avatarUrl?: string;
  isActive: boolean;
  isGPS: boolean;
  taskId: string | null;
};

export type AdminState = {
  userState: UserState;
  team: Team;
  taskIds: string[];
};

export type Team = {
  uid: string;
  name: String;
};
