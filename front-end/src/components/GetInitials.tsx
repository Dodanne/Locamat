type UserFisrtNameAndLastName= {
  first_name?: string;
  last_name?: string;
};

export default function getInitials(user?: UserFisrtNameAndLastName) {
     if (!user?.first_name || !user?.last_name) return "";
    return `${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`;
  };