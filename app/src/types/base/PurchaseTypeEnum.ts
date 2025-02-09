enum PurchaseType {
  Electronics = 1,
  Clothes = 2,
  Hospitality = 3,
}

function getAllPurchaseTypeKeys(): string[] {
  return Object.keys(PurchaseType).filter((key) => isNaN(Number(key)));
}

function getValuesFromKey(key: string): number | null {
  return PurchaseType[key as keyof typeof PurchaseType] as number | null;
}

function getKeyFromValue(value: number): string | null {
  const key = Object.keys(PurchaseType).find(
    (k) => PurchaseType[k as keyof typeof PurchaseType] === value
  );
  return key || null;
}

export {
  PurchaseType,
  getAllPurchaseTypeKeys,
  getKeyFromValue,
  getValuesFromKey,
};
