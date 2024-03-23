import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout.ts";


function LogoutButton() {
  const { logout } = useLogout();
  return (
    <div className="mt-auto">
      <BiLogOut onClick={logout} className="text-white cursor-pointer size-6" />
    </div>
  )
}

export default LogoutButton;