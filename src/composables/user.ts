import router from "@/router";
import { reactive } from "vue";

const user = reactive({
  name: "",
});

export function useUser() {
  const isUserAuthenticated = () => {
    return user.name !== "";
  };

  const logoutUser = () => {
    user.name = "";
    router.push("/");
  };

  const updateUserName = (newUserName: string) => {
    user.name = newUserName;
  };

  return { user, isUserAuthenticated, updateUserName, logoutUser };
}
