import { ToastContainer } from "react-toastify"
import MazeSolver from "./components/modules/MazeSolver"
import { PathFindingProvider } from "./providers/PathFindingProvider"
import { SpeedProvider } from "./providers/SpeedProvider"

function App() {
  return (
    <PathFindingProvider>
      <SpeedProvider>
        <MazeSolver />
        <ToastContainer 
          position="top-left"
        />
      </SpeedProvider>
    </PathFindingProvider>
  )
}

export default App
