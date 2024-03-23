import axios, { AxiosResponse } from "axios";
import { useAuthContext } from "../Context/AuthContext.tsx";
import { toast } from "react-toastify";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            const res: AxiosResponse = await axios.post("http://localhost:3001/auth/logout", null, { withCredentials: true });
            console.log(res.data)
            if (res.status === 500) {
                toast.error("Internal Serer Error");
                return false;
            }
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            console.log(error);
        }

    }
    return { logout };
}

export default useLogout;