export class DiscountSet {
  public discountDescription: string;
  public discountValue: number;

  constructor(discountset: any = null){
    Object.assign(this, discountset);
  }

}
