import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userName, setUserName] = useState(false);

    const login = useCallback((uname, token, expirationDate) => {
        setUserName(uname);
        setToken(token);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7); //exp in 1week
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('userData',
            JSON.stringify({
                userName: uname,
                userRole: urole,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            }));
    }, []);

    const logout = useCallback(() => {
        setUserName(null);
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId,
                storedData.userName,
                storedData.token,
                new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout, userName };
};