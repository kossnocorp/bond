import api from './api'
import { request } from '../../src/request'

request(api.books)().then(console.log)
// request(api.book)({
//   params: { bookId: 'harry-potter-and-the-sorcerer-s-stone' },
// }).then(console.log)
