import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
function RootLaout() {
  const navigation = useNavigation();
  // navigation.state ==='loading'
  return (
    <>
      <MainNavigation />
      <main className="root">
        {navigation.state === "loading" && <p>loading....</p>}
        <Outlet />
      </main>
    </>
  );
}
export default RootLaout;
