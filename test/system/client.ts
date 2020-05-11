import api from './api'
import { request, EndpointRequest } from '../../src/request'
import { Endpoint } from '../../src/endpoint'

const client = createClient(api)

client.books({ query: { filter: 'unread' } })

request(api.books)({ query: { filter: 'unread' } }).then(console.log)

request(api.books)().then(console.log)

request(api.book)({
  params: {
    bookId: 'harry-potter-and-the-sorcerer-s-stone',
  },
}).then(console.log)

// request(api.book)({}).then(console.log)

type ApiShape = {
  [key: string]: Endpoint<any, any, any, any>
}

type Client<Api extends ApiShape> = {
  [key in keyof Api]: Api[key] extends Endpoint<
    infer Response,
    infer Query,
    infer Body,
    infer Params
  >
    ? EndpointRequest<Response, Query, Body, Params>
    : never
}

function createClient<Api extends ApiShape>(api: Api): Client<Api> {}
