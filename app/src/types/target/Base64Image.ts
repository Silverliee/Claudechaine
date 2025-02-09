class Base64Image {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid base64 image format");
    }
    this._value = value;
  }

  private isValid(value: string): boolean {
    return value.startsWith("data:image/") && value.includes(";base64,");
  }

  public toString(): string {
    return this._value;
  }

  public getBase64Data(): string {
    return this._value.split(";base64,")[1];
  }

  public getMimeType(): string {
    return this._value.split(";")[0].split(":")[1];
  }
}

export { Base64Image };
