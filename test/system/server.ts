import api, { Author, Book } from './api'
import { serve } from '../../src/express'
import express from 'express'

const app = express()
const port = 3000

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

serve(app, api.books)(async () => books)

serve(
  app,
  api.book
)(async ({ bookId }) => {
  const book = books.find(({ title }) => titleToId(title) === bookId)
  if (!book) return null
  const author = authors.find(({ name }) => book.authorName === name)
  return { book, author }
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)

function titleToId(title: string) {
  return title.toLowerCase().replace(/([^\w])+/g, '-')
}
