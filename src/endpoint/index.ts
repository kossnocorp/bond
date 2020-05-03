export type Method = 'GET' | 'POST'

export type Endpoint<Response, Request> = { method: Method; path: string }

export function endpoint<Response, Request = undefined>(
  method: Method,
  path: string
): Endpoint<Response, Request> {
  return { method, path }
}
