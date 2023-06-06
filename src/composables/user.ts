import router from "@/router";
import { reactive } from "vue";

const user = reactive({
  name: "",
  email: "",
  token: "",
});

export function useUser() {
  const isUserAuthenticated = () => {
    return user.name !== "";
  };

  const logoutUser = () => {
    user.name = "";
    router.push("/");
  };

  const updateUserName = (data: {
    name: string;
    email: string;
    token: string;
  }) => {
    user.name = data.name;
    user.email = data.email;
    user.token = data.token;
  };

  return { user, isUserAuthenticated, updateUserName, logoutUser };
}
