import ConversorRowGrams from './Conversors/ConversorRowGrams'
import ConversorRowTime from './Conversors/ConversorRowTime'
import ConversorRowTimeDistance from './Conversors/ConversorRowTimeDistance'
import ConvertTable from './ConvertTable'

const Basics = () => {
  return (
    <section>
      <h2>Conversores:</h2>
      <div className="bg-slate-700 pl-8 pr-8 pt-4 pb-4 rounded-xl flex justify-center flex-col relative gap-4">
        <ConvertTable name='Gramos' ToMap={ConversorRowGrams}>
          <ul id="conversor-table" className='grid grid-cols-3 text-center'>
            <li><strong>mg</strong></li>
            <li><strong>g</strong></li>
            <li><strong>kg</strong></li>
          </ul> 
        </ConvertTable>
        <ConvertTable name='Tiempo' ToMap={ConversorRowTime}>
          <ul id="conversor-table" className='grid grid-cols-3 text-center'>
            <li><strong>s</strong></li>
            <li><strong>m</strong></li>
            <li><strong>h</strong></li>
          </ul> 
        </ConvertTable>
        <ConvertTable name='Distancia sobre tiempo' ToMap={ConversorRowTimeDistance}>
          <ul id="conversor-table" className='grid grid-cols-3 text-center'>
            <li><strong>m/s</strong></li>
            <li><strong>km/h</strong></li>
            <li><strong>mph</strong></li>
          </ul> 
        </ConvertTable>
      </div>
    </section>
  )
}

export default Basics