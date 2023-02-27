import React, { useRef, useState } from 'react'

const Cinematic = () => {
  const [vi, setVi] = useState('')
  const [vf, setVf] = useState('')
  const [d, setD] = useState('')
  const [a, setA] = useState('')
  const [ti, setTi] = useState('')
  const [tf, setTf] = useState('')

  const viEl = useRef(null)
  const vfEl = useRef(null)
  const dEl = useRef(null)
  const aEl = useRef(null)
  const tiEl = useRef(null)
  const tfEl = useRef(null)
  const checkbox = useRef(null)

  const [result, setResult] = useState('')

  const formattedNumber = (number) => {
    const int = number.toFixed(4).split('.')[0]
    const decimal = number.toFixed(4).split('.')[1]
    const fixedDecimal = decimal.split('').reverse().reduce((acc, curr) => {
      if(curr !== '0' || acc !== '') {
        acc += curr
      }
      return acc
    }, '').split('').reverse().join('')
    
    return int + (fixedDecimal ? '.' : '') + fixedDecimal
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const viFormatted = viEl.current.value === 'km/h' ? ((vi*1000)/3600) : Number(vi)
    const vfFormatted = vfEl.current.value === 'km/h' ? ((vf*1000)/3600) : Number(vf)
    const initTimeFormatted = ti ? tiEl.current.value === 'h' ? ti*3600 : tiEl.current.value === 'm' ? ti*60 : Number(ti) : 0
    const finalTimeFormatted = tfEl.current.value === 'h' ? tf*3600 : tfEl.current.value === 'm' ? tf*60 : Number(tf)
    const distanceFormatted = dEl.current.value === 'cm' ? d*0.01 : dEl.current.value === 'km' ? d*1000 : Number(d)
    const deltaT = finalTimeFormatted - initTimeFormatted
    const aFormatted = Number(a)

    console.log('vi formatted: ', viFormatted)
    console.log('vf formatted: ', vfFormatted)
    console.log('initial time formatted: ', initTimeFormatted)
    console.log('final time formatted: ', finalTimeFormatted)
    console.log('distance formatted: ', distanceFormatted)

    if(checkbox.current.checked) {
      if (!d && !tf && vi && a) {
        const maxH = formattedNumber(((-Math.pow(viFormatted, 2))/(-Math.abs(aFormatted)*2)))
        const timeOnMaxH = formattedNumber((-viFormatted/-Math.abs(aFormatted)))
        const vfArrivingToFloor = formattedNumber((-Math.sqrt(2*Math.abs(aFormatted)*maxH)))
        const fullTime = formattedNumber((timeOnMaxH*2))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Altura máxima: ${maxH} m`}</div>
            <div>{`Tiempo en altura máxima: ${timeOnMaxH} s`}</div>
            <div>{`Vf al llegar al suelo: ${vfArrivingToFloor} m/s`}</div>
            <div>{`Tiempo total: ${fullTime} s`}</div>
          </div>)
      } else if (!d && tf && vi && !a) {

        const g = formattedNumber((vfFormatted-viFormatted)/deltaT)
        const maxH = formattedNumber(((-Math.pow(viFormatted, 2))/(-Math.abs(g)*2)))
        const timeOnMaxH = formattedNumber((-viFormatted/-Math.abs(g)))
        const vfArrivingToFloor = formattedNumber((-Math.sqrt(2*Math.abs(g)*maxH)))
        const fullTime = formattedNumber((timeOnMaxH*2))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Gravedad: ${g} m/s²`}</div>
            <div>{`Altura máxima: ${maxH} m`}</div>
            <div>{`Tiempo en altura máxima: ${timeOnMaxH} s`}</div>
            <div>{`Vf al llegar al suelo: ${vfArrivingToFloor} m/s`}</div>
            <div>{`Tiempo total: ${fullTime} s`}</div>
          </div>)
      } else if (!d && tf && !vi && a) {
        const maxH = formattedNumber((Math.abs(aFormatted)*Math.pow(deltaT, 2))/2)
        const vfArrivingToFloor = formattedNumber((-Math.sqrt(2*Math.abs(aFormatted)*maxH)))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Altura máxima: ${maxH} m`}</div>
            <div>{`Vf al llegar al suelo: ${vfArrivingToFloor} m/s`}</div>
          </div>)
      } else if (d && !tf && (!vi || viFormatted === 0) && a && vfFormatted === 0) {
        const vi = formattedNumber(Math.sqrt(-2*-Math.abs(aFormatted)*d))
        const timeOnMaxH = formattedNumber(-vi/-Math.abs(aFormatted))
        const vfArrivingToFloor = formattedNumber((-Math.sqrt(2*Math.abs(aFormatted)*d)))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Velocidad inicial: ${vi} m/s`}</div>
            <div>{`Tiempo en altura máxima: ${timeOnMaxH} s`}</div>
            <div>{`Vf al llegar al suelo: ${vfArrivingToFloor} m/s`}</div>
          </div>)
      } else if (!d && tf && vi && a && !vf) {
        const vfOnTime = formattedNumber(viFormatted-Math.abs(aFormatted*deltaT))
        const distanceOnTime = formattedNumber((viFormatted*deltaT)+((-Math.abs(aFormatted*Math.pow(deltaT, 2)))/2))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Velocidad a los ${finalTimeFormatted}s: ${vfOnTime} m/s`}</div>
            <div>{`Distancia a los ${finalTimeFormatted}s: ${distanceOnTime} m`}</div>
          </div>)
      } else if (d && !tf && vi && a && !vf) {
        console.log("here")
        const timeOnDistance1 = formattedNumber((-viFormatted+Math.sqrt(2*-Math.abs(aFormatted)*distanceFormatted+Math.pow(viFormatted, 2)))/-Math.abs(aFormatted))
        const timeOnDistance2 = formattedNumber((-viFormatted-Math.sqrt(2*-Math.abs(aFormatted)*distanceFormatted+Math.pow(viFormatted, 2)))/-Math.abs(aFormatted))
        const timeOnMaxDistance = formattedNumber(-viFormatted/(-Math.abs(aFormatted)))
        const maxDistance = formattedNumber(viFormatted*timeOnMaxDistance+(-Math.abs(aFormatted*Math.pow(timeOnMaxDistance, 2)))/2)

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Tiempo a los ${distanceFormatted}m: ${timeOnDistance1}s y ${timeOnDistance2}s`}</div>
            <div>{`Altura máxima: ${maxDistance} m`}</div>
            <div>{`Tiempo en altura máxima: ${timeOnMaxDistance} s`}</div>
          </div>)
      } else if (d && !tf && vi && a && vfFormatted === 0) {
        const vfOnFloor = formattedNumber(-Math.sqrt(viFormatted + 2*Math.abs(aFormatted)*distanceFormatted))
        const timeOnFloor = formattedNumber((vfOnFloor - viFormatted)/(-Math.abs(aFormatted)))

        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`Velocidad al llegar al suelo: ${vfOnFloor} m/s`}</div>
            <div>{`Tiempo al llegar al suelo: ${timeOnFloor} s`}</div>
          </div>)
      }
    } else {
      if (!a && !vf && !d && vi && tf) setResult(`d: ${viFormatted*deltaT} m`) // Teniendo velocidad y tiempo (MRU)
      else if (!a && !vf && !vi && tf && d) setResult(`Vi: ${distanceFormatted/deltaT} m/s`) // Teniendo tiempo y distancia (MRU)
      else if (!a && !vf && !tf && vi && d) setResult(`t: ${distanceFormatted/viFormatted} s`) // Teniendo velocidad y distancia (MRU)
      else if (!a && !d && tf && vi && vf) setResult(<div className='flex flex-col gap-2'><div>{`a: ${(vfFormatted-viFormatted)/deltaT} m/s²`}</div><div>{`d: ${viFormatted*deltaT+(((vfFormatted-viFormatted)/deltaT)*Math.pow(deltaT, 2))/2} m`}</div></div>) // Teniendo deltaT y deltaV (MRUV)
      else if (!d && !vf && tf && vi && a) setResult(<div className='flex flex-col gap-2'><div>{`vf: ${viFormatted+aFormatted*deltaT} m/s`}</div><div>{`d: ${viFormatted*deltaT+(aFormatted*Math.pow(deltaT, 2))/2} m`}</div></div>) // Teniendo deltaT, vi y a (MRUV)
      else if (!d && vf && !tf && vi && a) setResult(
        <div className='flex flex-col gap-2'>
          <div>{`d: ${(Math.pow(vfFormatted, 2) - Math.pow(viFormatted, 2))/(2*aFormatted)} m`}</div>
          <div>{`tf: ${(vfFormatted - viFormatted)/aFormatted} s`}</div>
        </div>
      )
      else if (d && vi && !tf && a && !vf) {
        const vf = Math.sqrt(viFormatted + 2*Math.abs(aFormatted)*distanceFormatted)
        const tf = (vf - viFormatted)/aFormatted
        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`vf: ${vf} m/s`}</div>
            <div>{`tf: ${tf} s`}</div>
          </div>
        ) 
      } else if (d && vi && !tf && !a && vf) {
        const a = (Math.pow(vfFormatted, 2) - Math.pow(viFormatted, 2))/(2*distanceFormatted)
        const tf = (vfFormatted - viFormatted)/a
        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`a: ${a} m/s²`}</div>
            <div>{`tf: ${tf} s`}</div>
          </div>
        ) 
      } else if (d && !vi && !tf && a && vf) {
        const vi = Math.sqrt(Math.pow(vfFormatted, 2)-(2*aFormatted*distanceFormatted))
        const tf = (vfFormatted - vi)/aFormatted
        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`vi: ${vi} m/s²`}</div>
            <div>{`tf: ${tf} s`}</div>
          </div>
        ) 
      } else if (d && vi && tf && a && !vf) {
        const vf = viFormatted + aFormatted*deltaT
        setResult(
          <div className='flex flex-col gap-2'>
            <div>{`vf: ${vf} m/s²`}</div>
          </div>
        ) 
      }
    }
  }

  const handleReset = () => {
    console.log("here")
    setVi('')
    setVf('')
    setD('')
    setA('')
    setTi('')
    setTf('')
    setResult('')
    checkbox.current.checked = false
  }

  return (
    <section>
      <h2>Cinemática:</h2>
        <form onSubmit={handleSubmit} className="bg-slate-700 pl-12 pr-12 pt-4 pb-4 rounded-xl justify-center relative w-fit flex flex-col gap-4">
          <div className='absolute left-4 top-4 flex gap-2 items-center'><input ref={checkbox} type='checkbox'/><label>Tiro vertical/Caída libre</label></div>
          <div className='absolute right-4 top-4 cursor-pointer w-6 h-6 text-center rounded hover:bg-slate-300 hover:text-black' onClick={handleReset}>X</div>
          <ul className='w-60 flex flex-col mt-8'>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>Vi:</strong><input onChange={({ target }) => setVi(target.value)} value={vi}  className='w-20'/></label>
              <select ref={viEl} className='w-20 text-center'>
                <option selected>m/s</option>
                <option>km/h</option>
              </select>
            </li>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>Vf:</strong><input onChange={({ target }) => setVf(target.value)} value={vf}  className='w-20'/></label>
              <select ref={vfEl} className='w-20 text-center'>
                <option selected>m/s</option>
                <option>km/h</option>
              </select>
            </li>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>d:</strong><input onChange={({ target }) => setD(target.value)} value={d}  className='w-20'/></label>
              <select ref={dEl} className='w-20 text-center'>
                <option>cm</option>
                <option selected>m</option>
                <option>km</option>
              </select>
            </li>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>a:</strong><input onChange={({ target }) => setA(target.value)} value={a}  className='w-20'/></label>
              <select ref={aEl} className='w-20 text-center'>
                <option>m/s²</option>
              </select>
            </li>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>ti:</strong><input onChange={({ target }) => setTi(target.value)} value={ti}  className='w-20'/></label>
              <select ref={tiEl} className='w-20 text-center'>
                <option selected>s</option>
                <option>m</option>
                <option>h</option>
              </select>
            </li>
            <li className='flex justify-between'><label className='flex gap-2 items-center justify-between'><strong className='w-6'>tf:</strong><input onChange={({ target }) => setTf(target.value)} value={tf}  className='w-20'/></label>
              <select ref={tfEl} className='w-20 text-center'>
                <option selected>s</option>
                <option>m</option>
                <option>h</option>
              </select>
            </li>
          </ul>
          {result && <strong className='self-start'>{result}</strong>}
          <button>Aceptar</button>
        </form>
    </section>
  )
}

export default Cinematic