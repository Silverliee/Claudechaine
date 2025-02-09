import { BlockchainJson } from "@/types/target/BlockchainJson";

async function fetchBlockchainJsonById(id: number): Promise<BlockchainJson> {
  const url = `https://raw.githubusercontent.com/BadPioche/BlockchainJsonProvider/main/${id}.json`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: BlockchainJson = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default fetchBlockchainJsonById;
