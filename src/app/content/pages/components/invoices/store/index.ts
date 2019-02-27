import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromInvoices from './reducers/invoices.reducer';
import * as fromRoot from '../../../../../shared/store';

export interface InvoicesState {
  invoices: fromInvoices.State;
}

export interface State extends fromRoot.State {
  allinvoices: InvoicesState;
}

export const reducers: ActionReducerMap<InvoicesState> = {
  invoices: fromInvoices.reducer
};

export const selectInvoicesState = createFeatureSelector<InvoicesState>("allinvoices");
export const selectInvoices = createSelector(selectInvoicesState, state => state.invoices);
export const getInvoicesLoaded  = createSelector(selectInvoices, fromInvoices.getLoaded);
export const getInvoicesLoading = createSelector(selectInvoices, fromInvoices.getLoading);
export const getInvoicesFailed  = createSelector(selectInvoices, fromInvoices.getFailed);
export const getAllInvoices = createSelector(selectInvoices, fromInvoices.getAllInvoices);
export const getCurrentInvoiceId = createSelector(selectInvoices, fromInvoices.getCurrentInvoiceId);

export const getAllInvoicesWithId = createSelector(getAllInvoices, allInvoices => {
  if (allInvoices && allInvoices.length > 0) {
    allInvoices.forEach(s => {
      const regex = new RegExp(/.*\/(\d+)\/$/g);
      const match = regex.exec(s.url);
      if (match.length > 1) {
        s.id = +match[1];
      }
    });
  }
  return allInvoices;
});

export const getCurrentInvoice = createSelector(
  getAllInvoices,
  fromRoot.getRouterInfo,
  (invoices, routerInfo) => {
    if (invoices && invoices.length > 0 && routerInfo) {
      const id = +routerInfo.params.invoiceId;
      if (id >= 0) {
        return invoices.find(s => s.id === id);
      }
    }

    return null;
  }
);

export const getMaxValueInvoice = createSelector(
  getAllInvoices,
  (invoices) => {
    if (invoices && invoices.length > 0) {
      let numInvoice:string = "";
      invoices.forEach(item => {
        if(numInvoice === ""){
          numInvoice = item.invoiceNumber;
        } else if(getNumberInvoice(numInvoice) <= getNumberInvoice(item.invoiceNumber)){
          numInvoice = (getNumberInvoice(item.invoiceNumber) + 1).toString();
        }
      })
      if (numInvoice.length >= 0) {
        return numInvoice;
      }
    }

    return null;
  }
);


function getNumberInvoice(numInvoice: string): number {
  let valueNum: string = "";
  numInvoice.split('').map((letter: any) => {
    if(!isNaN(letter)){
      valueNum += letter;
    }
  });
  return Number(valueNum);
}

