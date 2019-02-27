import { HttpResponse } from "@angular/common/http";

export class HttpAdapter {

  static baseAdapter(res: HttpResponse<any>, adapterFn?: Function): any {
    if (res.status === 200) {
      try {
        let jsonRes = res;
        return adapterFn ? adapterFn.call(undefined, jsonRes) : jsonRes;
      } catch (e) {
        return res;
      }
    }
  }
}