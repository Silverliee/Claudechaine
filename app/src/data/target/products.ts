import { Product } from "@/types/target/Products";
import { PurchaseType } from "@/types/base/PurchaseTypeEnum";

const productsData: Product[] = [
  {
    id: "3be24e16-0feb-4953-a45c-28c7872c83b0",
    name: "Smart watch",
    price: 450,
    image: "https://m.media-amazon.com/images/I/613vdOoh4oL._AC_SL1500_.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "de977572-ae3f-492c-bd15-7105de721b07",
    name: "Télévision 4k",
    price: 1200,
    image:
      "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/529b7e34-6ab6-11ea-9b62-c26870b9ad9f.jpg",
    purchaseType: PurchaseType.Electronics,
  },
  {
    id: "38121041-1404-42cd-a87e-b0e012acb5be",
    name: "Écharpe",
    price: 60,
    image:
      "https://www.districenter.fr/43617-large_default/echarpe-a-carreaux-noire-femme.jpg",
    purchaseType: PurchaseType.Clothes,
  },
  {
    id: "2f55cd3a-dceb-483f-8c9a-8f629de9d423",
    name: "Bonnet",
    price: 20,
    image:
      "https://www.celio.com/dw/image/v2/BGBR_PRD/on/demandware.static/-/Sites-celio-master/default/dw3fca46ae/hi-res/174868-956-LLIHXH1_BLACK-WEB3-1.jpg?sw=780&sh=1003",
    purchaseType: PurchaseType.Clothes,
  },
];

function getProductByUUID(uuid: string): Product | null {
  return productsData.find((element) => element.id === uuid) || null;
}

export { productsData, getProductByUUID };
