import React, { createContext, useContext } from "react";
import { ObjectId } from "mongodb";

export interface IChatUser {
    email: string,
    username: string,
    _v: number,
    _id: ObjectId | string
}

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = React.useState<IChatUser | null>(() => JSON.parse(localStorage.getItem("chat-user")) || null);
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
    );
}