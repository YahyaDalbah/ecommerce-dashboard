import { useUserData } from "../provider/UserProvider.jsx";
import NotAuthedPage from "./NotAuthedPage.jsx";

const UserPrivateRoute = ({ Component }) => {
  const { user } = useUserData();
  return user && user.role === "user" ? (
    <Component />
  ) : (
    <NotAuthedPage linkText={"logged in as a user"} />
  );
};
export default UserPrivateRoute;
