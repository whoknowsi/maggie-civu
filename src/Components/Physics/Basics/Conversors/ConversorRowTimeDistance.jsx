import React, { useState } from 'react'

const ConversorRowTimeDistance = () => {
  const [ms, setMs] = useState(0)
  const [kh, setKh] = useState(0)
  const [mph, setMph] = useState(0)

  const handleChange = (e) => {
    const whatChange = e.target.name
    const value = e.target.value

    if (value === 0) {
      setMs(0)
      setKh(0)
      setMph(0)
      return
    }

    if (whatChange === 'ms') {
      setMs(Number(value))
      setKh((value/1000)*3600)
      setMph(value/0.447)
    } else if(whatChange === 'kh') {
      setMs((value*1000)/3600)
      setKh(Number(value))
      setMph(value/1.609)
    } else if(whatChange === 'mph') {
      setMs(value*0.447)
      setKh(value*1.609)
      setMph(Number(value))
    }
  }

  return (
    <ul className='grid grid-cols-3 text-center items-center'>
      <input type='number' name="ms" value={ms} onChange={handleChange}></input>
      <input type='number' name="kh" value={kh} onChange={handleChange}></input>
      <input type='number' name="mph" value={mph} onChange={handleChange}></input>
    </ul>
  )
}

export default ConversorRowTimeDistance