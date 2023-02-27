import { useRef, useState } from 'react'
import { evaluate } from 'mathjs'

const CombinedOperation = () => {
  const [quantityOfVariables, setQuantityOfVariables] = useState('')
  const [variables, setVariables] = useState([])
  const [formula, setFormula] = useState('')
  const [result, setResult] = useState('')
  const variableQuantityRef = useRef(null)

  const configVariables = () => {
    const table = document.querySelector('#variables-table')
    const tbody = table.querySelector('tbody')

    const newVariables = Array.from(tbody.childNodes).map((tr) => {
      return {
        variable: tr.firstChild.children[0].value,
        value: Number(tr.lastChild.children[0].value),
        id: tr.id.split('tr')[1]
      }
    })

    setVariables(newVariables)
  }
  
  function formatExpression(expression, variables) {
    let formattedExpression = expression.replace(/(?<=\d|\w|\))(?=[a-z])/gi, '*')
    console.log(formattedExpression)

    for (const { variable, value } of variables) {
      formattedExpression = formattedExpression.replace(new RegExp(variable, 'g'), value)
    }
    
    return formattedExpression
  }

  const handleReset = () => {
    setQuantityOfVariables('')
    setVariables([])
    setFormula('')
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quantityOfVariables) {
      setQuantityOfVariables(Number(variableQuantityRef.current.value))
      return
    }

    configVariables()
    const result = evaluate(formatExpression(formula, variables))
    console.log(result)
    setResult(result)
  }

  const handleBlur = () => configVariables()

  return (
    <section>
      <h2>Operación combinada:</h2>
      <form onSubmit={handleSubmit} className="bg-slate-700 pl-12 pr-12 pt-4 pb-4 rounded-xl flex justify-center relative w-fit">
      {!quantityOfVariables
          ? 
            <div className='flex items-center gap-2'>
                <label>Selecciona la cantidad de variables:</label>
                <input
                  ref={variableQuantityRef}
                  className='w-12'
                  type="text"
                />
              <button>Aceptar</button>
            </div>
          : 
            <div className='flex justify-center flex-col items-center'>
              <div className='absolute right-4 top-4 cursor-pointer w-6 h-6 text-center rounded hover:bg-slate-300 hover:text-black' onClick={handleReset}>X</div>
              <table id="variables-table" className='table-auto w-fit'>
              <thead>
                <tr>
                  <th className='font-bold text-center'>Variable</th>
                  <th></th>
                  <th className="w-5 font-bold text-center">Valor</th>
                </tr>
              </thead>
              <tbody> 
              {
                variables.length > 0 ? variables.map(({ variable, value, id }) => {
                  return (
                    <tr key={id} id={'tr' + id}>
                      <td><input onBlur={handleBlur} className='w-16 m-0 text-center' defaultValue={variable}/></td>
                      <th><p className='text-center w-4'> = </p></th>
                      <td><input onBlur={handleBlur} className='w-24 m-0 text-center' defaultValue={value}/></td>
                    </tr>)
                }) : 
                new Array(quantityOfVariables).fill(0).map((_, i) => {
                  const id = Math.floor(Math. random(1000000000) * 1000000000)
                  return (
                    <tr key={id} id={'tr' + id}>
                      <td><input onBlur={handleBlur} className='w-16 m-0 text-center'/></td>
                      <th><p className='text-center w-4'> = </p></th>
                      <td><input onBlur={handleBlur} className='w-24 m-0 text-center'/></td>
                    </tr>)
                })
              }
              </tbody>
            </table>
            <div className='mt-2'>
              <label>Formula:</label>
              <input className='w-96' type='text' onChange={({ target }) => setFormula(target.value)} value={formula} ></input>
            </div>
            <div className='self-start'>
              <p>Resultado: <strong className='text-xl'>{result}</strong></p>
            </div>
            <button className='mt-4 self-end'>Aceptar</button>
            </div>
      }
      </form>
    </section>
  )
}

export default CombinedOperation