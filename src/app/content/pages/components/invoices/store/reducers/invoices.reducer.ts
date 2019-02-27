import * as actions from '../actions/invoices.actions';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Invoicem} from "../../../../../../shared/models/invoicem.model";

export interface State {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  allInvoices: any[];
  currentInvoiceId?: number;
}

export const initialState: State = {
  loading: false,
  loaded:  false,
  failed:  false,
  allInvoices: [],
  currentInvoiceId: undefined
};

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const invoiceAdapterE = createEntityAdapter<Invoicem>({
  selectId: (invoice: Invoicem) => invoice.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Invoice> {
//   ids: string[] | number[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface StateE extends EntityState<Invoicem> {
  currentInvoiceId?: number;
}

export const INIT_STATE: StateE = invoiceAdapterE.getInitialState({
  currentInvoiceId: undefined
});

export function reducer(state = initialState, action: actions.InvoicesActions): State {

  if (!action) return state;

  switch (action.type) {
    case actions.InvoicesActionTypes.LoadInvoices:
      return {...state,
        loading: true
      };


    case actions.InvoicesActionTypes.LoadInvoicesSuccess:
      return { ...state,
        loaded:   true,
        loading:  false,
        failed:   false,
        allInvoices:  action.payload
      };


    case actions.InvoicesActionTypes.LoadInvoicesFail:
      return { ...state,
        loaded:   false,
        loading:  false,
        failed:   true,
        allInvoices: []
      };

    case actions.InvoicesActionTypes.CreateInvoice:
      return {...state,
        loading: true
      };

    case actions.InvoicesActionTypes.CreateInvoiceSuccess:
      const allInvoices = [
        ...state.allInvoices,
        action.payload
      ];
      return {
        ...state,
        loaded:   true,
        loading:  false,
        failed:   false,
        allInvoices,
        currentInvoiceId: action.payload.id
      };

    case actions.InvoicesActionTypes.CreateInvoiceFail:
      return { ...state,
        loaded:   false,
        loading:  false,
        failed:   true
      };


    default: {
      return state;
    }
  }
};

export const getAllInvoices = (state: State) => state.allInvoices;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
export const getCurrentInvoiceId = (state: State) => state.currentInvoiceId;
