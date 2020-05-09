import { endpoint } from '../../src/endpoint'

const api = {
  book: endpoint<{ book: Book; author?: Author } | null>()(
    'GET',
    ({ bookId }: { bookId: string }) => `/books/${bookId}`
  ),

  books: endpoint<Book[]>()('GET', () => `/books`),
}
export default api

export type Cookies = {
  sessionId?: string
  acceptedCookies?: boolean
}

export type Author = {
  name: string
}

export type Book = {
  authorName: string
  title: string
  pages?: number
}
