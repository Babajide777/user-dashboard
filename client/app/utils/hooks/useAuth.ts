import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IDecoded, RootState } from "@/app/types";

const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  let isSuperAdmin = false;
  let isAdmin = false;
  let isUser = false;

  if (token) {
    const decoded: IDecoded = jwtDecode(token);

    const { email, exp, iat, role, sub, fullname } = decoded;

    switch (role) {
      case "user":
        isUser = true;

        break;
      case "admin":
        isAdmin = true;

        break;

      default:
        break;
    }

    return { email, isAdmin, isUser, isSuperAdmin, fullname };
  }

  return { email: "", isAdmin, isUser, isSuperAdmin, fullname: "" };
};

export default useAuth;
