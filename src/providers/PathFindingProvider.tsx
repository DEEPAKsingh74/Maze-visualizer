import { createContext, useEffect, useState, type ReactNode } from "react";
import { MAZE_ALGORITHMS, SOLVER_ALGORITHMS, type AlgorithmType, type MazeType } from "../lib/constant";
import type { GridType, Tile } from "../utils/types";
import { createGrid } from "../utils/createGrid";

interface PathFindingContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) => void;
    grid: GridType;
    isGraphVisualized: boolean;
    setIsGraphVisualized: (isGraphVisualized: boolean) => void;
    startTile: Tile | null;
    endTile: Tile | null;
    setStartTile: (tile: Tile) => void;
    setEndTile: (tile: Tile) => void;
    setGrid: (grid: GridType) => void;
}


export const PathFindingContext = createContext<PathFindingContextInterface | undefined>(undefined)


export const PathFindingProvider = ({ children }: { children: ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(SOLVER_ALGORITHMS[0].name);
    const [maze, setMaze] = useState<MazeType>(MAZE_ALGORITHMS[0].name);
    const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
    const [startTile, setStartTile] = useState<Tile | null>(null);
    const [endTile, setEndTile] = useState<Tile | null>(null);
    const [grid, setGrid] = useState<GridType>(createGrid(startTile, endTile));

    useEffect(() => {
        if (startTile && endTile) {
            setGrid(createGrid(startTile, endTile));
        }
    }, [startTile, endTile]);


    return (
        <PathFindingContext.Provider
            value={{
                algorithm,
                setAlgorithm,
                maze,
                setMaze,
                grid,
                isGraphVisualized,
                setIsGraphVisualized,
                startTile,
                endTile,
                setStartTile,
                setEndTile,
                setGrid,
            }}
        >
            {children}
        </PathFindingContext.Provider>
    )
}