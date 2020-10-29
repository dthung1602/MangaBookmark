import { useContext } from "react";
import { UserAPI } from "../api";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../components/GlobalContext";
import { notifyError } from "../utils/error-handler";

const useLogoutAPI = () => {
  const history = useHistory();
  const [globalContext, setGlobalContext] = useContext(GlobalContext);
  const { user } = globalContext;

  const logout = () => {
    UserAPI.logout()
      .result.then(() => {
        setGlobalContext({
          ...globalContext,
          user: null,
        });
        history.push("/");
      })
      .catch(notifyError);
  };

  return [logout, user];
};

export default useLogoutAPI;
