import 'whatwg-fetch'
import qs from 'qs'

const { REACT_APP_API_KEY } = process.env

const request = async (url, params = {}) => {
  try {
    const querystring = qs.stringify({
      ...params,
      api_key: REACT_APP_API_KEY
    })
    const response = await fetch(`https://api.themoviedb.org${url}?${querystring}`)
    const json = await response.json()

    return json
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchPopularMovies = async page => {
  const result = await request('/3/movie/popular', { page })
  return result
}

export const fetchSearchMovies = async (query, page) => {
  const result = await request('/3/search/movie', { query, page })
  return result
}

export const fetchMovieDetail = async id => {
  const result = await request(`/3/movie/${id}`)
  return result
}
