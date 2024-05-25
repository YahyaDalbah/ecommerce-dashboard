import { useUserData } from "../provider/UserProvider.jsx";
import NotAuthedPage from "./NotAuthedPage.jsx";

const AdminPrivateRoute = ({ Component }) => {  //could change it a single privateRoute with a `isAdmin` boolean prop
  const { user } = useUserData();
  return user && user.role === "admin" ? (
    <Component />
  ) : (
    <NotAuthedPage linkText={"logged in as an admin"} />
  );
};
export default AdminPrivateRoute;
