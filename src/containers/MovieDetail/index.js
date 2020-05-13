import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Tag } from 'antd'
import useMovieDetail from '../../hooks/useMovieDetail'

function MovieDetail () {
  const history = useHistory()
  const { movieId } = useParams()
  console.log(movieId)
  const movie = useMovieDetail(movieId)

  function goBack () {
    history.goBack()
  }

  return (
    <div className='content'>
      <div className='goback' onClick={goBack}>{'<< Go Back'}</div>
      <img className='poster' alt='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <h1>{movie.title}</h1>
      {
        movie.genres && movie.genres.map(tag => (
          <Tag key={tag.id}>{tag.name}</Tag>
        ))
      }
      <h3>Overview</h3>
      <p>{movie.overview}</p>
    </div>
  )
}

export default MovieDetail
