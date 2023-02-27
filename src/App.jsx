import Basics from './Components/Physics/Basics/Basics'
import CombinedOperation from "./Components/CombinedOperation/CombinedOperation"
import SortRacionalNumbers from "./Components/SortRacionalNumbers/SortRacionalNumbers"
import Cinematic from './Components/Physics/Cinematic/Cinematic'
import Dinamic from './Components/Physics/Dinamic/Dinamic'

function App() {
  return (
    <div className="App flex flex-col items-center">
      {/* <SortRacionalNumbers />
      <CombinedOperation /> */}
      <Basics />
      <Cinematic />
      <Dinamic />
    </div>
  )
}

export default App
