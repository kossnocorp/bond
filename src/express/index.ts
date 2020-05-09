import { Endpoint } from '../endpoint'
import { CookiesAccessor } from '../cookies'

export function server<Cookies>(app: import('express').Express) {
  function serve<Response, Params>(
    endpoint: Endpoint<Response, Params>,
    handler: (props: {
      params: Params
      cookies: CookiesAccessor<Cookies>
    }) => Promise<Response>
  ) {
    app[endpoint.method.toLowerCase() as 'get' | 'post'](
      pathToMatchString(endpoint.path),
      async (request, response) => {
        const result = await handler({
          params: (request.params as unknown) as Params,
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
