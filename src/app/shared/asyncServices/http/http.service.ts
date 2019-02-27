import { Injectable }           from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpParams,
  HttpResponse
}                               from "@angular/common/http";
import { Observable }           from "rxjs";
import { HttpResponseHandler }  from './httpResponseHandler.service';
import { HttpAdapter }          from './http.adapter';
//import { ConfigService }        from '../../../app-config.service';
import {
  methodBuilder,
  paramBuilder
}                               from './utils.service';
import {catchError, map} from "rxjs/internal/operators";
import { environment } from "../../../../environments/environment";

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA
}

@Injectable()
export class HttpService {

  public constructor(
    protected http: HttpClient,
    //protected configService: ConfigService,
    protected responseHandler: HttpResponseHandler) {
  }

  protected getBaseUrl(): string {
    //return this.configService.get('api').baseUrl;
    return environment.apiUrl;
  }

  protected getDefaultHeaders(): Object {
    return null;
  }

  /**
  * Request Interceptor
  *
  * @method requestInterceptor
  * @param {Request} req - request object
  */
  protected requestInterceptor(req: HttpRequest<any>) {}

  /**
  * Response Interceptor
  *
  * @method responseInterceptor
  * @param {Response} observableRes - response object
  * @returns {Response} res - transformed response object
  */
  protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
        .pipe(
          map(res => HttpAdapter.baseAdapter(res, adapterFn)),
            catchError( (err, source) => {
              return this.responseHandler.onCatch(err, source);
            })
        )
  }
}
