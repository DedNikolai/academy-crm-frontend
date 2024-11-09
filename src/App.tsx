import { useContext, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { AuthContext } from "./components/AuthProvider";
import { getMe } from "./api/user";
import Loader from "./components/Loader";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext?.setIsUserLoading(true);
    getMe().then(result => {
      if (result) authContext?.setUser(result)  
    }).finally(() => authContext?.setIsUserLoading(false));
  }, []);

  if (authContext?.isUserLoading) return <Loader />

  return (
    <AppRouter />
  );
}

export default App;
