import { Product } from "@/types/base/Products";
import { PurchaseType } from "@/types/base/PurchaseTypeEnum";

const productsData: Product[] = [
  {
    id: "114858e6-084a-42ce-9717-e97cddc52e55",
    name: "Laptop",
    description: "A laptop for your needs",
    price: 200,
    image:
      "https://media.ldlc.com/r1600/ld/products/00/06/08/97/LD0006089787_0006100943.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "0b37fcdf-7717-4ac6-b326-1fd318d3ed31",
    name: "Smartphone",
    description: "A smartphone for your needs",
    price: 100,
    image: "https://m.media-amazon.com/images/I/61aiFCe6PpL.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "d58122f3-0786-4c64-8709-e705823e3f5b",
    name: "t-shirt",
    description: "A t-shirt for your needs",
    price: 100,
    image:
      "https://www.celio.com/dw/image/v2/BGBR_PRD/on/demandware.static/-/Sites-celio-master/default/dwc9f30fc0/hi-res/174681-572-LLEHXH_GREEN-WEB3-1.jpg",
    purchaseType: PurchaseType.Clothes,
  },
  {
    id: "2f55cd3a-dceb-483f-8c9a-8f629de9d423",
    name: "pants",
    description: "A pants for your needs",
    price: 100,
    image:
      "https://www.molinel.com/14994/pantalon-chino-homme-authentique-beige.jpg",
    purchaseType: PurchaseType.Clothes,
  },
];

function getProductByUUID(uuid: string): Product | null {
  return productsData.find((element) => element.id === uuid) || null;
}

export { productsData, getProductByUUID };
