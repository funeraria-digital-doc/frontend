import router from "@/router";
import { reactive } from "vue";

const user = reactive({
  name: "",
  email: "",
});

export function useUser() {
  const isUserAuthenticated = () => {
    return user.name !== "";
  };

  const logoutUser = () => {
    user.name = "";
    router.push("/");
  };

  const updateUserName = (data: { name: string; email: string }) => {
    user.name = data.name;
    user.email = data.email;
  };

  return { user, isUserAuthenticated, updateUserName, logoutUser };
}
