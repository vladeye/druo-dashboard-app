export class ConceptSet {
  public itemDescription: string;
  public itemQty:         number;
  public itemUnitPrice:   number;


  constructor(conceptset: any) {
    Object.assign(this, conceptset);
  }


}
