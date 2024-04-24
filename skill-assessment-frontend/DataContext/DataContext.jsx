// import React, { createContext, useContext, useEffect, useState } from "react";
// import axiosInstance from "@/Utils/AxiosInstance";

// const DataContext = createContext();

// export const useData = () => useContext(DataContext);

// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const pageNumber = 1;
//       const pageSize = 7;
//       try {
//         // const response = await axios.get("/api/data");
//         const response = await axiosInstance.get(
//           `/notes?pageNumber=${pageNumber}&pageSize=${pageSize}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
// };
