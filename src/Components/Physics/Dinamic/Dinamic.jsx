import React, { useState } from 'react'

const Dinamic = () => {
  const [result, setResult] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const forces = document.querySelectorAll('.force')
    console.log(forces)
    setResult(-Array.from(forces).reduce((acc, curr) => {
      console.log(acc)
      return acc + Number(curr.value)
    }, 0))
  } 

  const ForceInput = () => {
    const [force, setForce] = useState('')
    return <input type="text" value={force} className='force' onChange={({ target }) => setForce(target.value)}/>
  }

  const MapForces = () => {
    const [row, setRow] = useState([0])

    const handlePlus = () => setRow([...row, 0])
    const handleRemove = () => setRow(row.slice(0, row.length - 1))

    return (
      <div className="bg-slate-800 pl-12 pr-12 pt-4 pb-4 rounded-xl flex justify-center flex-col relative">
        {row.map((_, index) => <ForceInput key={'force' + "-" + index} />)}
        <div className='absolute right-4 bottom-6 flex flex-col items-center justify-center gap-2'>
          {row.length > 1 && <div className='cursor-pointer w-6 h-6 text-center rounded bg-slate-300 text-black hover:bg-slate-400 duration-75 transition-all' onClick={handleRemove}>-</div>}
          <div className='cursor-pointer w-6 h-6 text-center rounded bg-slate-300 text-black hover:bg-slate-400 duration-75 transition-all' onClick={handlePlus}>+</div>
        </div>
      </div>
    )
  }

  return (
    <section>
      <h2>Dinámica:</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 pl-12 pr-12 pt-4 pb-4 rounded-xl justify-center relative w-fit flex flex-col gap-4"
      >
        <div></div>
        <h3>Equilibrio mecánico</h3>
        <label>Fuerzas
          <MapForces />
        </label>
        {result && <strong className='self-start'>{result}</strong>}
        <button>Aceptar</button>
      </form>
    </section>
  )
}

export default Dinamic
