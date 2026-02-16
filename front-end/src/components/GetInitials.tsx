import type { User } from "../types/User";

export default function getInitials(user: User) {
     if (!user?.first_name || !user?.last_name) return "";
    return `${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`;
  };