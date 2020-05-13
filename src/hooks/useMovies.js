import { useReducer } from 'react'
import { fetchPopularMovies, fetchSearchMovies } from '../utils/api'

const GET_MOVIES = 'GET_MOVIES'
const SET_MOVIES = 'SET_MOVIES'
const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR'
const SET_QUERY = 'SET_QUERY'

const INITIAL_STATE = {
  totalPages: 1,
  movies: [],
  loading: false,
  query: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        loading: true
      }
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        totalPages: action.totalPages,
        loading: false
      }
    case GET_MOVIES_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_QUERY:
      return {
        ...state,
        query: action.query
      }
    default:
      return state
  }
}

const useMovies = () => {
  const initialState = INITIAL_STATE
  const [state, dispatch] = useReducer(reducer, initialState)

  const getMovies = async (page, query) => {
    dispatch({ type: GET_MOVIES })
    try {
      const result = (query && query.length > 0)
        ? await fetchSearchMovies(query, page)
        : await fetchPopularMovies(page)

      dispatch({ type: SET_MOVIES, movies: result.results, totalPages: result.total_pages })
    } catch (error) {
      dispatch({ type: GET_MOVIES_ERROR, error: error.message })
    }
  }

  const setQuery = query => {
    dispatch({ type: SET_QUERY, query })
  }

  return { state, dispatch, getMovies, setQuery }
}

export default useMovies
