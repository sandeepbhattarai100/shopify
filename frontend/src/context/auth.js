import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            })
        }
    }, []);
    return (
        <AuthContext.Provider value={[auth, setAuth]} >
            {children}
        </AuthContext.Provider>

    )

};

//making custom hook so it will be easir toimport the context

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };