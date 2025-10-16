import { createContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchProfile, loginAdmin as loginUser, logoutUser } from "./Api"; // ✅ fixed

const UserContext = createContext({
  loginUserMutation: null,
  user: null,
  logoutMutation: null,
});

export const UserContextProvider = (props) => {
  const { data: userProfile, mutate: fetchUserProfile } = useMutation({
    mutationFn: fetchProfile,
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      fetchUserProfile();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      fetchUserProfile();
    },
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const context = {
    loginUserMutation,
    user: userProfile,
    logoutMutation,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
