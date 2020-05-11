import { Endpoint } from '../endpoint'

type EndpointPayload<Query, Body, Params> = (Query extends undefined
  ? { query?: undefined }
  : Partial<Query> extends Query
  ? { query?: Query | undefined }
  : { query: Query }) &
  (Body extends undefined
    ? { body?: undefined }
    : Partial<Body> extends Body
    ? { body?: Body | undefined }
    : { body: Body }) &
  (Params extends undefined
    ? { params?: undefined }
    : Partial<Params> extends Params
    ? { params?: Params | undefined }
    : { params: Params })

type EndpointRequest<Response, Query, Body, Params> = Partial<
  EndpointPayload<Query, Body, Params>
> extends EndpointPayload<Query, Body, Params>
  ? (payload?: EndpointPayload<Query, Body, Params>) => Promise<Params>
  : (payload: EndpointPayload<Query, Body, Params>) => Promise<Response>

export function request<Response, Query, Body, Params>(
  endpoint: Endpoint<Response, Query, Body, Params>
): EndpointRequest<Response, Query, Body, Params> {
  return (async (payload: EndpointPayload<Query, Body, Params> | undefined) => {
    const query = payload?.params || ({} as Params)
    const body = payload?.params || ({} as Params)
    const params = payload?.params || ({} as Params)

    const response = await fetch(endpoint.path(params), {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload?.body),
    })
    const json = await response.json()
    return json as Response
  }) as EndpointRequest<Response, Query, Body, Params>
}
