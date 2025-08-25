import { useEffect, useState, type RefObject } from "react";
import { MAZE_ALGORITHMS, SOLVER_ALGORITHMS, SPEED, type AlgorithmType, type MazeType, type SpeedType } from "../../lib/constant"
import Logo from "../global/Logo"
import OptionSelector from "../global/OptionSelector"
import { VscRunAll, VscMenu, VscClose } from "react-icons/vsc";
import { usePathFinding } from "../../hooks/usePathFinder";
import { resetGrid } from "../../utils/resetGrid";
import { buildMaze } from "../../lib/algorithms/maze";
import { useSpeed } from "../../hooks/useSpeed";
import { runAlgorithm } from "../../lib/algorithms/path_finding";
import { toast } from "react-toastify";

interface NavbarProps {
    isVisualizationRunningRef: RefObject<boolean>;
}

const Navbar: React.FC<NavbarProps> = ({ isVisualizationRunningRef }) => {
    const [isDisabled, setDisabled] = useState(isVisualizationRunningRef.current);
    const [noneMazeInfoCount, setNoneMazeInfoCount] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        setDisabled(isVisualizationRunningRef.current ?? false);
    }, [isVisualizationRunningRef.current]);

    const { setMaze, grid, startTile, endTile, setGrid, setAlgorithm, algorithm } = usePathFinding();
    const { speed, setSpeed } = useSpeed();

    const handleGenerateMaze = async (mazeAlgo: MazeType) => {
        if (isVisualizationRunningRef.current) return;

        isVisualizationRunningRef.current = true;
        setDisabled(true);

        if (mazeAlgo === MAZE_ALGORITHMS[0].name) {
            // reset maze
            setMaze(mazeAlgo);
            const newGrid = resetGrid(grid, startTile, endTile);
            setGrid(newGrid);

            if(noneMazeInfoCount <= 2) {
                toast.info("Click inside the grid and drag to draw walls in the grid.");
                setNoneMazeInfoCount(prev => prev+1);
            }

            isVisualizationRunningRef.current = false;
            setDisabled(false);
            return;
        }

        setMaze(mazeAlgo);
        await buildMaze(mazeAlgo, grid, startTile, endTile, speed, setGrid);

        isVisualizationRunningRef.current = false;
        setDisabled(false);
    }

    const handleSetPathFindingAlgorithm = (pathAlgo: AlgorithmType) => {
        setAlgorithm(pathAlgo);
    }

    const runPathFindAlgorithm = async () => {
        setDisabled(true);
        setIsDrawerOpen(false);
        await runAlgorithm(algorithm, grid, startTile, endTile, speed, setGrid);
        setDisabled(false);
    }

    const handleChangeSpeed = (newSpeed: SpeedType) => {
        setSpeed(newSpeed);
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            {/* Mobile Navbar */}
            <div className="w-full h-[3rem] mt-1 lg:hidden">
                <div className="w-[95%] m-auto h-full rounded-xl p-2 flex justify-between items-center shadow-md bg-blue-500 border border-gray-200 text-white">
                    {/* logo  */}
                    <Logo />
                    
                    {/* Hamburger menu */}
                    <button 
                        onClick={toggleDrawer}
                        className="p-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {isDrawerOpen ? <VscClose size={20} /> : <VscMenu size={20} />}
                    </button>
                </div>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden lg:block w-full h-[3rem] mt-1">
                <div className="w-[80%] m-auto h-full rounded-xl p-2 flex justify-between items-center shadow-md bg-blue-500 border border-gray-200 text-white">
                    {/* logo  */}
                    <Logo />

                    {/* settings  */}
                    <div className="flex gap-4">
                        <OptionSelector
                            optionsList={MAZE_ALGORITHMS}
                            title="Choose Maze algorithm"
                            handleChange={handleGenerateMaze}
                        />
                        <OptionSelector
                            optionsList={SOLVER_ALGORITHMS}
                            title="Choose Solve algorithm"
                            handleChange={handleSetPathFindingAlgorithm}
                        />
                        <OptionSelector
                            optionsList={SPEED}
                            title="Speed"
                            handleChange={handleChangeSpeed}
                        />

                        {/* run button  */}
                        <button
                            className={`flex gap-1 justify-center items-center rounded-lg px-2 py-1 font-bold cursor-pointer hover:shadow-md ${isDisabled
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-700 hover:bg-green-600"
                                }`}
                            disabled={isDisabled}
                            onClick={runPathFindAlgorithm}
                        >
                            <span><VscRunAll /></span>
                            <span>Run</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-blue-500 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                        <Logo />
                        <button 
                            onClick={toggleDrawer}
                            className="p-1 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <VscClose size={20} />
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-4 flex-1">
                        <OptionSelector
                            optionsList={MAZE_ALGORITHMS}
                            title="Choose Maze algorithm"
                            handleChange={handleGenerateMaze}
                            onSelect={() => setIsDrawerOpen(false)}
                        />
                        <OptionSelector
                            optionsList={SOLVER_ALGORITHMS}
                            title="Choose Solve algorithm"
                            handleChange={handleSetPathFindingAlgorithm}
                            onSelect={() => setIsDrawerOpen(false)}
                        />
                        <OptionSelector
                            optionsList={SPEED}
                            title="Speed"
                            handleChange={handleChangeSpeed}
                            onSelect={() => setIsDrawerOpen(false)}
                        />

                        {/* run button  */}
                        <button
                            className={`flex gap-1 justify-center items-center rounded-lg px-2 py-1 font-bold cursor-pointer hover:shadow-md mt-4 ${isDisabled
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-700 hover:bg-green-600"
                                }`}
                            disabled={isDisabled}
                            onClick={runPathFindAlgorithm}
                        >
                            <span><VscRunAll /></span>
                            <span>Run Algorithm</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isDrawerOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleDrawer}
                />
            )}
        </>
    )
}

export default Navbar