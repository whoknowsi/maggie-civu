import React, { useState } from 'react'

const ConversorRowGrams = () => {
  const [mg, setMg] = useState(0)
  const [g, setG] = useState(0)
  const [kg, setKG] = useState(0)

  const handleChange = (e) => {
    const whatChange = e.target.name
    const value = e.target.value
    const numberOfPress = value?.toString()?.split('.')[1]?.length || 0

    if (value === 0) {
      setMg(0)
      setG(0)
      setKG(0)
      return
    }

    if (whatChange === 'mg') {
      setMg(Number(value).toFixed(numberOfPress))
      setG((value/1000).toFixed(3+numberOfPress))
      setKG(((value/1000)/1000).toFixed(3+3+numberOfPress))
    } else if(whatChange === 'g') {
      setMg((value*1000).toFixed(numberOfPress))
      setG(Number(value).toFixed(numberOfPress))
      setKG((value/1000).toFixed(3+numberOfPress))
    } else if(whatChange === 'kg') {
      setMg((value*1000*1000).toFixed(numberOfPress))
      setG((value*1000).toFixed(numberOfPress))
      setKG(Number(value).toFixed(numberOfPress))
    }
  }

  return (
    <ul className='grid grid-cols-3 text-center items-center	'>
      <input type='number' name="mg" value={mg} onChange={handleChange}></input>
      <input type='number' name="g" value={g} onChange={handleChange}></input>
      <input type='number' name="kg" value={kg} onChange={handleChange}></input>
    </ul>
  )
}

export default ConversorRowGrams