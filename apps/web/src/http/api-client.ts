import ky from 'ky'

// If bad request keeps happening, update node to 20.12 or later
// Another solution is using body instead of json then setting the content-type to application/json
// This happens because ky can't set properly headers on some node versions using json: {} directly.

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
})
