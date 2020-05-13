import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity'
  },
  {
    title: 'Vote Count',
    dataIndex: 'vote_count',
    key: 'vote_count'
  },
  {
    title: 'Image',
    dataIndex: 'backdrop_path',
    key: 'backdrop_path',
    render: img => <img alt={img} className='movie-table-image' src={`https://image.tmdb.org/t/p/w200${img}`} />
  }
]

function MovieTable ({ dataSource, loading, currentPage, totalItems, onPageChange, ...props }) {
  const data = dataSource.map((i, index) => ({
    ...i,
    rank: (currentPage - 1) * 20 + index + 1
  }))
  return (
    <Table
      dataSource={data}
      loading={loading}
      columns={columns}
      pagination={{
        position: ['bottomRight', 'topRight'],
        current: currentPage,
        pageSize: 20,
        total: totalItems,
        onChange: onPageChange,
        defaultCurrent: currentPage
      }}
      {...props}
    />
  )
}

export default MovieTable
