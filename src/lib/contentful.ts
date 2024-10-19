// src/lib/contentful.js

import { createClient } from 'contentful'

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
})

export default client
