import { endpoint } from '../../src/endpoint'

export type Author = {
  name: string
}

export type Book = {
  authorName: string
  title: string
  pages?: number
}

const api = {
  books: endpoint<Book[]>()('GET', () => '/books'),

  book: endpoint<{ book: Book; author?: Author } | null>()(
    'GET',
    ({ bookId }: { bookId: string }) => `/books/${bookId}`
  ),
}
export default api
