import UserType from "./UserType.tsx";

interface GroupType {
  _id: string;
  name: string;
  description: string;
  members: UserType[];
}

export default GroupType;
