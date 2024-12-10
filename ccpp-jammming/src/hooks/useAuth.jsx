import { useState, useEffect, useRef } from "react";
import axios from "axios";

function useAuth(code) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const isRequestInProgress = useRef(false);

    useEffect(() => {
        if (!code || isRequestInProgress.current) return;

        const fetchAuthData = async () => {
            isRequestInProgress.current = true;
            try {
                const res = await axios.post("/.netlify/functions/login", { code }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);

                //console.log("Authorization successful:", res.data);
                window.history.pushState({}, null, '/');
            } catch (error) {
                console.error("Authorization failed:", error.response?.data || error.message);
                window.location = '/';
            } finally {
                isRequestInProgress.current = false;
            }
        };

        fetchAuthData();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            const fetchAuthData = async () => {
                isRequestInProgress.current = true;
                try {
                    const res = await axios.post("/.netlify/functions/refresh", { refreshToken }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);

                    //console.log("Token refreshed:", res.data);
                } catch (error) {
                    console.error("Token refresh failed:", error.response?.data || error.message);
                    window.location = '/';
                } finally {
                    isRequestInProgress.current = false;
                }
            };

            fetchAuthData();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        window.location = '/';
    };

    return { accessToken, refreshToken, expiresIn, logout };
}

export default useAuth;