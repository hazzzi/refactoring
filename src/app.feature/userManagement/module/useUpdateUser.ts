import { BASE_URL } from "@/app.module/api/environment";
import axios from "axios";
import { User } from "./useFetchUser";

const useUpdateUser = () => {
  const onUpdateUser = async (user: User) => {
    if (!user) return;

    try {
      await axios.put(`${BASE_URL}/users/${user.id}`, user);
    } catch (err) {
      console.error(err)
    }
  }

  return {  onUpdateUser }
}

export default useUpdateUser;