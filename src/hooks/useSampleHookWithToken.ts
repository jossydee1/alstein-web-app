// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { ApiResponseProps, SampleProps } from "@/types";
// import { auth } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";

// // Sample React Query hook using API with Firebase token
// export const useSampleHookWithToken = (queryParam?: string) => {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async user => {
//       if (user) {
//         const idToken = await user.getIdToken();
//         setToken(idToken);
//       } else {
//         setToken(null);
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);

//   return useQuery({
//     queryKey: ["fetch-sample", queryParam, token], // Ensure query invalidates when token changes
//     queryFn: async (): Promise<SampleProps> => {
//       if (!token) {
//         throw new Error("User not authenticated");
//       }

//       const response = await axios.get<ApiResponseProps<SampleProps>>(
//         `/api/sample-endpoint?queryParam=${queryParam}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.code !== "success" || !response.data.data) {
//         throw new Error(response.data.message || "No data found");
//       }

//       return response.data.data; // Returns query object for data, isLoading, error, refetch, etc.
//     },
//     enabled: Boolean(queryParam?.trim()) && !!token, // Only run query if token is available
//   });
// };
