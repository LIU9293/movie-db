import { useState, useEffect } from 'react'
import { fetchMovieDetail } from '../utils/api'

const useMovieDetail = id => {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await fetchMovieDetail(id)
        setMovie(result)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMovie()
  }, [id])

  return movie
}

export default useMovieDetail
