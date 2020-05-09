import api, { Author, Book, Cookies } from './api'
import { server } from '../../src/express'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

app.use(cookieParser())
app.use(express.static(__dirname))

const authors: Author[] = [
  { name: 'J.K. Rowling' },
  { name: 'Andrzej Sapkowski' },
]

const books: Book[] = [
  { authorName: 'Andrzej Sapkowski', title: 'Blood of Elves', pages: 411 },
  {
    authorName: 'Andrzej Sapkowski',
    title: 'The Time of Contempt',
    pages: 319,
  },
  {
    authorName: 'J.K. Rowling',
    title: "Harry Potter and the Sorcerer's Stone",
    pages: 309,
  },
]

const { serve } = server<Cookies>(app)

serve(api.books, async () => books)

serve(api.book, async ({ params: { bookId }, cookies }) => {
  if (!authorized(cookies.get('sessionId'))) throw new Error('Unauthorized!')
  const book = books.find(({ title }) => titleToId(title) === bookId)
  if (!book) return null
  const author = authors.find(({ name }) => book.authorName === name)
  return { book, author }
})

function authorized(sessionId: string) {
  return sessionId === 'good'
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)

function titleToId(title: string) {
  return title.toLowerCase().replace(/([^\w])+/g, '-')
}
