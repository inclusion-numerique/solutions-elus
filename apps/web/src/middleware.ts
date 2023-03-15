import { NextMiddleware, NextResponse } from 'next/server'

const middleware: NextMiddleware = (request) => {
  const response = NextResponse.next()
  response.headers.append('X-Frame-Options', 'DENY')
  response.headers.append('X-Content-Type-Options', 'nosniff')
  response.headers.append('X-XSS-Protection', '1; mode=block')
  response.headers.delete('X-Powered-By')


  return response
}

export default middleware
