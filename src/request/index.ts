import { Endpoint } from '../endpoint'

export function request<Response, Params>(
  endpoint: Endpoint<Response, Params>
): Params extends undefined
  ? () => Promise<Response>
  : (params: Params) => Promise<Response> {
  // @ts-ignore
  return async (params) => {
    const response = await fetch(endpoint.path(params), {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // @ts-ignore
      body: JSON.stringify(params?.body),
    })
    const json = await response.json()
    return json as Response
  }
}
