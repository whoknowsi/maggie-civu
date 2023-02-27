import React from 'react'

const Result = ({ elements }) => {
  return elements ? (
    <div>
      <div className='flex gap-2 items-center'>
        <p>Menor a mayor: </p>
        <strong>{[...elements].sort((a, b) => a[0] - b[0]).map(([x, y]) => y).join(' - ')}</strong>
      </div>
      <div className='flex gap-2 items-center'>
        <p>Mayor a menor: </p>
        <strong>{[...elements].sort((a, b) => a[0] - b[0]).reverse().map(([x, y]) => y).join(' - ')}</strong>
      </div>
    </div>
  ) : null
}

export default Result