import React, { useState } from 'react'

const ConversorRowTime = () => {
  const [s, setS] = useState(0)
  const [m, setM] = useState(0)
  const [h, setH] = useState(0)

  const handleChange = (e) => {
    const whatChange = e.target.name
    const value = e.target.value
    const numberOfPress = value?.toString()?.split('.')[1]?.length || 0

    if (value === 0) {
      setS(0)
      setM(0)
      setH(0)
      return
    }

    if (whatChange === 's') {
      setS(Number(value))
      setM((value/60))
      setH((value/3600))
    } else if(whatChange === 'm') {
      setS((value*60))
      setM(Number(value))
      setH((value/60))
    } else if(whatChange === 'h') {
      setS((value*3600))
      setM((value*60))
      setH(Number(value))
    }
  }

  return (
    <ul className='grid grid-cols-3 text-center items-center	'>
      <input type='number' name="s" value={s} onChange={handleChange}></input>
      <input type='number' name="m" value={m} onChange={handleChange}></input>
      <input type='number' name="h" value={h} onChange={handleChange}></input>
    </ul>
  )
}

export default ConversorRowTime