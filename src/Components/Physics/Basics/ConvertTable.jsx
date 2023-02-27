import React, { useState } from 'react'

const ConvertTable = ({ children, name, ToMap }) => {
  const [row, setRow] = useState([0])

  const handlePlus = () => setRow([...row, 0])
  const handleRemove = () => setRow(row.slice(0, row.length - 1))

  return (
    <article>
      <h3 className='mt-2 mb-1'>{name}:</h3>
      <div className="bg-slate-800 pl-12 pr-12 pt-4 pb-4 rounded-xl flex justify-center flex-col relative">
        {children}
        {row.map((_, index) => <ToMap key={name + "-" + index} />)}
        <div className='absolute right-4 bottom-6 flex flex-col items-center justify-center gap-2'>
          {row.length > 1 && <div className='cursor-pointer w-6 h-6 text-center rounded bg-slate-300 text-black hover:bg-slate-400 duration-75 transition-all' onClick={handleRemove}>-</div>}
          <div className='cursor-pointer w-6 h-6 text-center rounded bg-slate-300 text-black hover:bg-slate-400 duration-75 transition-all' onClick={handlePlus}>+</div>
        </div>
      </div>
    </article>
    
  )
}

export default ConvertTable