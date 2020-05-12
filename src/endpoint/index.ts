export type Method = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'PATCH'

export type Endpoint<_Response, _Query, _Body, Params> = {
  method: Method
  path: (params: Params) => string
}

export type EndpointQuery = { [key: string]: string | undefined }

export type EndpointShape<
  Response,
  Query extends EndpointQuery | undefined,
  Body
> = {
  response?: Response
  query?: Query
  body?: Body
}

// Allow to define:
// - Headers?

export function endpoint<Shape extends EndpointShape<any, any, any>>(): <
  Params = undefined
>(
  method: Method,
  path: (params: Params) => string
) => Params extends {}
  ? Endpoint<Shape['response'], Shape['query'], Shape['body'], Params>
  : Endpoint<Shape['response'], Shape['query'], Shape['body'], undefined> {
  // @ts-ignore
  return (method, path) => ({ method, path })
}
