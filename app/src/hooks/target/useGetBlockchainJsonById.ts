// "use client";

// import { BlockchainJson } from "@/types/target/BlockchainJson";
// import fetchBlockchainJsonById from "@/utils/target/fetchBlockchainJson";
// import { useEffect, useState } from "react";

// const useGetBlockchainJsonById = (id: number) => {
//   const [blockchainJson, setBlockchainJson] = useState<BlockchainJson | null>();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchBlockchainJsonById(id).then((data) => {
//         setBlockchainJson(data);
//         setLoading(false);
//     })
//     .catch((err) => {
//         setError(err.message)
//         setLoading(false);
//     });
//   }, []);
//   return (
//     <div>
//   )
// };

// export default useGetBlockchainJsonById;
