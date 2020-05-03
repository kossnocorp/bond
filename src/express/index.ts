import { Endpoint } from '../endpoint'

export function serve<Response, Params>(
  app: import('express').Express,
  endpoint: Endpoint<Response, Params>
): Params extends undefined
  ? (handler: () => Promise<Response>) => void
  : (handler: (payload: Params) => Promise<Response>) => void {
  // @ts-ignore
  return (handler) => {
    console.log('path', pathToMatchString(endpoint.path))
    app[endpoint.method.toLowerCase() as 'get' | 'post'](
      pathToMatchString(endpoint.path),
      async (request, response) => {
        const result = await handler((request.params as unknown) as Params)
        response.json(result)
      }
    )
  }
}

const paramsProxy = new Proxy({}, { get: (_, prop) => `:${prop.toString()}` })

function pathToMatchString(path: (params: any) => string) {
  return path(paramsProxy)
}
