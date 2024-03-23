import React from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = React.createContext();

interface IOnlineUsers {
    [key: string]: string,
}

export const socketContextProvider = ({ children }) => {
    const { authUser } = useAuthContext()

    const [socket, setSocket] = React.useState();
    const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUsers>({});

    React.useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:3001", {
                query: {
                    userId: authUser._id,
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, []);

    return (
        <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
    )
}