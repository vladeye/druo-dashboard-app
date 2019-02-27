import {
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
}                     from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

export function methodBuilder(method: string) {
  return function(url: string) {
    return function(target: HttpService, propertyKey: string, descriptor: any) {

      var pPath   = target[`${propertyKey}_Path_parameters`],
          pQuery  = target[`${propertyKey}_Query_parameters`],
          pBody   = target[`${propertyKey}_Body_parameters`],
          pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function(...args: any[]) {
        var body:    string          = createBody(pBody, descriptor, args);
        var resUrl:  string          = createPath(url, pPath, args);
        var search:  HttpParams      = createQuery(pQuery, args);
        var headers: HttpHeaders     = createHeaders(pHeader, descriptor, this.getDefaultHeaders(), args);

        // Request options
        const options = {
          headers,
          body,
          search
        };

        //let req: HttpRequest<any> = new HttpRequest(options);


        // intercept the request
        //this.requestInterceptor(req);
        // make the request and store the observable for later transformation
        //let observable: Observable<HttpResponse<any>> = this.http.request(req);
        let observable = this.http.request(method,this.getBaseUrl() + resUrl, options);

        // intercept the response
        observable = this.responseInterceptor(observable, descriptor.adapter);

        return observable;
      };

      return descriptor;
    };
  };
}

export function paramBuilder(paramName: string) {
  return function(key: string) {
    return function(target: HttpService, propertyKey: string, parameterIndex: number) {
      var metadataKey = `${propertyKey}_${paramName}_parameters`;
      var paramObj: any = {
          key: key,
          parameterIndex: parameterIndex
      };

      if (Array.isArray(target[metadataKey])) target[metadataKey].push(paramObj);
      else target[metadataKey] = [paramObj];
    };
  };
}

function createBody(pBody: Array<any>, descriptor: any, args: Array<any>): string {
  if (descriptor.isFormData) return args[0];
  return pBody ? JSON.stringify(args[pBody[0].parameterIndex]) : null;
}

function createPath(url: string, pPath: Array<any>, args: Array<any>): string {
  var resUrl: string = url;

  if (pPath) {
    for (var k in pPath) {
      if (pPath.hasOwnProperty(k)) {
        resUrl = resUrl.replace("{" + pPath[k].key + "}", args[pPath[k].parameterIndex]);
      }
    }
  }

  return resUrl;
}

function createQuery(pQuery: any, args: Array<any>): HttpParams {
  let search = new HttpParams();

  if (pQuery) {
    pQuery
    .filter(p => args[p.parameterIndex]) // filter out optional parameters
    .forEach(p => {
      var key = p.key;
      var value = args[p.parameterIndex];
      // if the value is a instance of Object, we stringify it
      if (value instanceof Object) {
        value = JSON.stringify(value);
      }
      search.set(encodeURIComponent(key), encodeURIComponent(value));
    });
  }

  return search;
}

function createHeaders(pHeader: any, descriptor: any, defaultHeaders: any, args: Array<any>): HttpHeaders {
  var headers = new HttpHeaders(defaultHeaders);

  // set method specific headers
  for (var k in descriptor.headers) {
    if (descriptor.headers.hasOwnProperty(k)) {
      if (headers.has(k)) headers.delete(k);
      headers.append(k, descriptor.headers[k]);
    }
  }

  // set parameter specific headers
  if (pHeader) {
    for (var k in pHeader) {
      if (pHeader.hasOwnProperty(k)) {
        if (headers.has(k)) headers.delete(k);
        headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
      }
    }
  }

  return headers;
}
