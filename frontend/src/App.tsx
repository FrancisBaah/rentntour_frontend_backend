import { Route, Routes, } from "react-router-dom";
import VideoStream from './DubaiPolice/VideoStream'
function App() {

  return (

    <Routes>
      <Route path="/" element={<VideoStream />} />
    </Routes>
  )
}

export default App
