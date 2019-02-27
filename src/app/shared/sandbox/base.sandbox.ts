import { Store, select }    from '@ngrx/store';
import { localeDateString } from '../utility';
import { Observable }       from 'rxjs';
import * as store           from '../store';


export abstract class Sandbox {

  public culture$:    Observable<any> = this.appState$.pipe(select(store.getSelectedCulture));
  public culture:     string;

  constructor(protected appState$: Store<store.State>) {}

  /**
   * Formats date string based on selected culture
   *
   * @param value
   */
  public formatDate(value: string) {
    return localeDateString(value, this.culture);
  }
}
