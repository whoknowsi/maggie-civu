import { useRef, useState } from 'react'
import Result from './Result'

export default function SortRacionalNumbers() {
  const [quantityOfElements, setQuantityOfElements] = useState('')
  const [elements, setElements] = useState([])
  const elementQuantity = useRef()

  function fractionToDecimal(value) {
    const mcd = (a, b) => !b ? a : mcd(b, a % b)
  
    return value.includes('/') 
      ? Number(value.split('/')[0])/Number(value.split('/')[1]) 
      : Number(value.replace(',','.'))
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!quantityOfElements) {
      setQuantityOfElements(Number(elementQuantity.current.value))
      return
    }

    const table = document.querySelector('#elements-table')
    const tbody = table.querySelector('tbody')
    
    const arrayOfResults = Array.from(tbody.childNodes).map((tr) => {
      return [tr.lastChild.innerText, tr.firstChild.innerText, tr.childNodes[1].childNodes[0].value]
    })

    setElements(arrayOfResults)
  }

  const handleChange = (e, id) => {
    const row = document.querySelector(`#tr${id}`)
    const lastChild = row.lastChild
    lastChild.innerText = fractionToDecimal(e.target.value)
  }

  const handleReset = () => {
    setQuantityOfElements('')
    setElements([])
  }
  return (
    <section>
      <h2>Ordenar números:</h2>
      <form onSubmit={handleSubmit} className="bg-slate-700 pl-12 pr-12 pt-4 pb-4 rounded-xl flex justify-center relative w-fit">
        {!quantityOfElements
          ? 
            <div className='flex items-center gap-2'>
                <label>Selecciona la cantidad de elementos:</label>
                <input
                  ref={elementQuantity}
                  className='w-12'
                  type="text"
                />
              <button>Aceptar</button>
            </div>
          : 
          <div className='flex justify-center flex-col'>
            <div className='absolute right-4 top-4 cursor-pointer w-6 h-6 text-center rounded hover:bg-slate-300 hover:text-black' onClick={handleReset}>X</div>
            <table id="elements-table" className='table-auto'>
              <thead>
                <tr>
                  <th className='font-bold'>Posición</th>
                  <th className="w-5 font-bold">Original</th>
                  <th className='font-bold'>Decimal</th>
                </tr>
              </thead>
              <tbody>
              {
                elements.length > 0 ? elements.map(([decimal, position, original]) => {
                  const id = Math.floor(Math. random(1000000000) * 1000000000)
                    return (
                      <tr key={id} id={'tr' + id}>
                        <td className="text-center">{position}</td>
                        <td><input className='w-28 text-center' defaultValue={original} onChange={(e) => handleChange(e, id)} /></td>
                        <td className='pl-2'>{decimal}</td>
                      </tr>)
                }) : new Array(quantityOfElements).fill(0).map((_, i) => {
                  const id = Math.floor(Math. random(1000000000) * 1000000000)
                  return (
                    <tr key={id} id={'tr' + id}>
                      <td className="text-center">{i + 1}</td>
                      <td><input onChange={(e) => handleChange(e, id)} className='w-28 text-center'/></td>
                      <td className='pl-2'></td>
                    </tr>)
                })
              }
              </tbody>
            </table>
            <Result elements={elements} />
            <button className='mt-2'>Ordenar</button>
          </div>
        }            
      </form>
    </section>
  )
}