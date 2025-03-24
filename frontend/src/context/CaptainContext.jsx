import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CaptainDataContext = createContext();


// export const useCaptain = () => {
//     const context = useContext(CaptainDataContext);
//     if (!context) {
//         throw new Error("useCaptain must be used within a CaptainDataProvider");
//         }
//         return context;
//         };

        const CaptainContext = ({ children }) => {
            const [captain, setCaptain] = useState(null);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);

            const updateCaptain = async (captainData) => {
                setCaptain(captainData);
            };

            const value = {
                captain,
                setCaptain,
                isLoading,
                setIsLoading,
                error,
                setError,
                updateCaptain,
            };

            return (
                <CaptainDataContext.Provider value={value}>
                    {children}
                </CaptainDataContext.Provider>
            );

        }

// export const CaptainProvider = ({ children }) => {
//     const [captain, setCaptain] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Fetch captain profile
//     const fetchCaptainProfile = async () => {
//         try {
//             const response = await axios.get("/api/captain/profile");
//             setCaptain(response.data.captain);
//         } catch (error) {
//             console.error("Error fetching captain profile:", error);
//             setCaptain(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Logout captain
//     const logoutCaptain = async () => {
//         try {
//             await axios.get("/api/captain/logout");
//             setCaptain(null);
//         } catch (error) {
//             console.error("Error logging out captain:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCaptainProfile();
//     }, []);

//     return (
//         <CaptainDataContext.Provider value={{ captain, loading, fetchCaptainProfile, logoutCaptain }}>
//             {children}
//         </CaptainDataContext.Provider>
//     );
// };
