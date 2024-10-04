import { useState } from "react";
import { User } from "./useFetchUser";

const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = (user: User) => {
    setSelectedUser(() => user);
  }

  return { selectedUser, onSelectUser };  
}

export default useSelectUser;