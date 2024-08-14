import { useState, useEffect, useRef } from "react";
import axios from "axios";

function useAuth(code) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const isRequestInProgress = useRef(false);

    useEffect(() => {
        if (!code || isRequestInProgress.current) return; // Prevent multiple calls

        const fetchAuthData = async () => {
            isRequestInProgress.current = true;
            try {
                const res = await axios.post("http://localhost:3001/login", { code }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn); 

                console.log("Authorization successful:", res.data);
                window.history.pushState({}, null, '/');
            } catch (error) {
                console.error("Authorization failed:", error.res?.data || error.message);
                window.location = '/';
            } finally {
                isRequestInProgress.current = false;
            }
        };
        
        fetchAuthData();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return; // Prevent multiple calls
        const interval = setInterval(() => {
            const fetchAuthData = async () => {
                isRequestInProgress.current = true;
                try {
                    const res = await axios.post("http://localhost:3001/refresh", { refreshToken }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
    
                    console.log("Authorization successful:", res.data);
                } catch (error) {
                    console.error("Authorization failed:", error.res?.data || error.message);
                    window.location = '/';
                } finally {
                    isRequestInProgress.current = false;
                }
            };
            fetchAuthData();
        }, (expiresIn - 60) * 1000);
        return () => clearInterval(interval); // Clean up the timeout when the component is unmounted
    }, [refreshToken, expiresIn]); 

    

    /* console.log("code in useAuth: ", code);
    console.log("accessToken in useAuth: ", accessToken);
    console.log("refreshToken in useAuth: ", refreshToken);
    console.log("expiresIn in useAuth: ", expiresIn);  */
    
   

    return { accessToken, refreshToken, expiresIn };
}

export default useAuth;
