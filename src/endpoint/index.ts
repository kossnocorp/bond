export type Method = 'GET' | 'POST'

export type Endpoint<_Response, Params> = {
  method: Method
  path: (params: Params) => string
}

export function endpoint<Response>(): <Params = undefined>(
  method: Method,
  path: (params: Params) => string
) => Params extends {}
  ? Endpoint<Response, Params>
  : Endpoint<Response, undefined> {
  // @ts-ignore
  return (method, path) => ({ method, path })
}
