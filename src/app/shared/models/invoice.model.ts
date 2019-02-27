export class Invoice {
  public invoiceNumber:       number;
  public businessId:         number;
  public orderId:            number;
  public recordLocator:      string;
  public dateCreated:         string;
  public dateModified:       string;
  public dateModifiedGmt:   string;
  public dueDate:             string;
  public businessName:       string;
  public merchantId:         string;
  public currency:            string;
  public unitPrice:          number;
  public quantity:            number;
  public subtotal:            number;
  public totalTaxes:         number;
  public totalDiscounts:     number;
  public totalAmount:         number;
  public customerName:        string;
  public customerEmail:      string;
  public customerNote:       string;
  public paymentStatus:      string;
  public paymentMethod:      string;
  public authorizationCode:  number;
  public statusCode:         string;
  public statusDescription:   string;
  public card_number:         string;
  public card_brand:          string;
  public issuer_bank:         string;
  public acf:                 {};


  constructor(invoice: any = null) {
    this.invoiceNumber      = invoice ? invoice.id : null;
    this.businessId        = invoice ? invoice.business_id : '';
    this.orderId           = invoice ? invoice.order_id : '';
    this.recordLocator     = invoice ? invoice.record_locator : '';
    this.dateCreated        = invoice ? invoice.date_created : '';
    this.dateModified      = invoice ? invoice.date_modified : '';
    this.dateModifiedGmt  = invoice ? invoice.date_modified_gmt : '';
    this.dueDate            = invoice ? invoice.due_date : '';
    this.businessName      = invoice ? invoice.business_name: '';
    this.merchantId        = invoice ? invoice.merchant_id: '';
    this.currency           = invoice ? invoice.currency: '';
    this.unitPrice         = invoice ? invoice.unit_price: '';
    this.quantity           = invoice ? invoice.quantity: '';
    this.subtotal           = invoice ? invoice.subtotal: '';
    this.totalTaxes        = invoice ? invoice.total_taxes: '';
    this.totalDiscounts    = invoice ? invoice.total_discounts: '';
    this.totalAmount        = invoice ? invoice.total_amount: '';
    this.customerName       = invoice ? invoice.acf.customer_name: '';
    this.customerEmail     = invoice ? invoice.customer_email: '';
    this.customerNote      = invoice ? invoice.customer_note: '';
    this.paymentStatus     = invoice ? invoice.payment_status: '';
    this.paymentMethod     = invoice ? invoice.payment_method: '';
    this.authorizationCode = invoice ? invoice.authorization_code: '';
    this.statusCode        = invoice ? invoice.status_code: '';
    this.statusDescription  = invoice ? invoice.status_description: '';
    this.card_number        = invoice ? invoice.card_number: '';
    this.card_brand         = invoice ? invoice.card_brand: '';
    this.issuer_bank        = invoice ? invoice.issuer_bank: '';
    this.acf                = invoice ? invoice.acf: null;
  }
}
