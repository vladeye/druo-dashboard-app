import {DiscountSet}  from "./discountset.model";
import {ConceptSet}   from "./conceptset.model";
import {EmailSet}     from "./emailset.model";


export class Invoicem  {
  public id:              number;
  public conceptset:      ConceptSet[] = [];
  public createDate:      string;
  public dueDate:         string;
  public customerName:    string;
  public discountset:     DiscountSet[] = [];
  public emailset:        EmailSet[] = [];
  public invoiceMessage:  string;
  public invoiceNumber:   string;
  public statusCode:      string;
  public paymentMethod:   string;



  constructor(invoice: any = null) {
    Object.assign(this, invoice);
    //this.conceptset = invoice['conceptset'].map(conceptset => new ConceptSet(conceptset));
    //this.discountset = invoice['discountset'].map(discountset => new DiscountSet(discountset));
    //this.emailset = invoice['emailset'].map(emailset => new DiscountSet(emailset));
  }

}
