import { Endpoint } from '../endpoint'

export function serve<Response, Request>(
  app: import('express').Express,
  endpoint: Endpoint<Response, Request>
): Request extends undefined
  ? (handler: () => Promise<Response>) => void
  : (handler: (payload: Request) => Promise<Response>) => void {
  // @ts-ignore
  return (handler) => {
    app[endpoint.method.toLowerCase() as 'get' | 'post'](
      endpoint.path,
      async (request, response) => {
        const result = await handler(({
          params: request.params,
        } as unknown) as Request)
        response.json(result)
      }
    )
  }
}
