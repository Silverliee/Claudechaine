import { Product } from "@/types/Products";
import { PurchaseType } from "@/types/PurchaseTypeEnum";

const productsData: Product[] = [
  {
    id: "114858e6-084a-42ce-9717-e97cddc52e55",
    name: "Laptop",
    price: 200,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "0b37fcdf-7717-4ac6-b326-1fd318d3ed31",
    name: "Smartphone",
    price: 100,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "d58122f3-0786-4c64-8709-e705823e3f5b",
    name: "t-shirt",
    price: 100,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
    purchaseType: PurchaseType.Clothes,
  },
  {
    id: "2f55cd3a-dceb-483f-8c9a-8f629de9d423",
    name: "pants",
    price: 100,
    image:
      "https://sf1.telestar.fr/wp-content/uploads/telestarv2/2023/01/Jean-Claude-Van-Damme-dans-un-remake-de-Kickboxer-un-film-avec-JCVD.jpg",
    purchaseType: PurchaseType.Clothes,
  },
];

function getProductByUUID(uuid: string): Product | null {
  return productsData.find((element) => element.id === uuid) || null;
}

export { productsData, getProductByUUID };
