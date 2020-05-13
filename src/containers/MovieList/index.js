import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Input } from 'antd'
import { debounce } from 'lodash'

import useMovies from '../../hooks/useMovies'
import MovieTable from '../../components/MovieTable'

function MovieList () {
  const { state, getMovies, setQuery } = useMovies() // eslint-disable-line
  let { page = '1' } = useParams()
  page = Number(page)
  const history = useHistory()

  useEffect(() => {
    getMovies(page, state.query)
  }, [page]) // eslint-disable-line

  function onPageChange (page) {
    history.push(`/${page}`)
  }

  function toDetail (id) {
    history.push(`/movies/${id}`)
  }

  function onSearch (text) {
    if (page !== 1) {
      history.push('/')
    }
    setQuery(text)
    getMovies(1, text)
  }

  const debouncedSearch = debounce(onSearch, 500)

  function onSearchInputChange (event) {
    debouncedSearch(event.target.value)
  }

  return (
    <div className='content'>
      <Input placeholder='Search Movies...' onChange={onSearchInputChange} />
      <h2 style={{ marginTop: 20 }}>
        {state.query.length > 0 ? `Searching Movie For: ${state.query}` : 'Popular Movies'}
      </h2>
      <MovieTable
        loading={state.loading}
        dataSource={state.movies}
        currentPage={page}
        totalItems={state.totalPages * 20}
        onPageChange={onPageChange}
        onRow={record => ({
          onClick: () => toDetail(record.id)
        })}
        rowKey='id'
        rowClassName={() => 'movie-row'}
      />
    </div>

  )
}

export default MovieList
