import { Endpoint } from '../endpoint'

export function request<Response, Request>(
  endpoint: Endpoint<Response, Request>
): Request extends undefined
  ? () => Promise<Response>
  : (request: Request) => Promise<Response> {
  // @ts-ignore
  return async (request?: Request | undefined) => {
    const response = await fetch(endpoint.path, {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // @ts-ignore
      body: JSON.stringify(request?.body),
    })
    const json = await response.json()
    return json as Response
  }
}
