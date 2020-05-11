import { Endpoint } from '../endpoint'
import { CookiesAccessor } from '../cookies'

export function server<Cookies>(app: import('express').Express) {
  function serve<Response, Query, Body, Params>(
    endpoint: Endpoint<Response, Query, Body, Params>,
    handler: (props: {
      params: Params
      query: Query
      body: Body
      cookies: CookiesAccessor<Cookies>
    }) => Promise<Response>
  ) {
    app[endpoint.method.toLowerCase() as 'get' | 'post'](
      pathToMatchString(endpoint.path),
      async (request, response) => {
        const result = await handler({
          params: (request.params as unknown) as Params,
          query: (request.query as unknown) as Query,
          body: request.body,
          cookies: {
            get: (key) => request.cookies[key] || null,
            set: (key, value) => response.cookie(key as string, value),
          },
        })
        response.json(result)
      }
    )
  }

  return { serve }
}

const paramsProxy = new Proxy({}, { get: (_, prop) => `:${prop.toString()}` })

function pathToMatchString(path: (params: any) => string) {
  return path(paramsProxy)
}
