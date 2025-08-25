import { useEffect, useRef, useState, type RefObject } from "react";
import { usePathFinding } from "../../hooks/usePathFinder"
import Cell from "./Tile";
import { createNewGrid, isStartOrEndCell } from "../../utils/helpers";
import { MAZE_ALGORITHMS } from "../../lib/constant";
import type { GridType, Tile } from "../../utils/types";


interface GridProps {
    isVisualizationRunningRef: RefObject<boolean>;
}

const Grid: React.FC<GridProps> = ({ isVisualizationRunningRef }) => {

    const { grid, startTile, endTile, setGrid, maze, setStartTile, setEndTile } = usePathFinding();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    const [draggingTile, setDraggingTile] = useState<'start' | 'end' | null>(null);

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsMouseDown(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    const handleMouseDown = (row: number, col: number) => {

        if (startTile == null || endTile == null) return;
        if (isStartOrEndCell(row, col, startTile, endTile)) return;
        if (isVisualizationRunningRef.current) return;
        if (maze != MAZE_ALGORITHMS[0].name) return;

        setIsMouseDown(true);
        const newGrid = createNewGrid(grid, row, col);
        setGrid(newGrid);

    }

    const handleMouseUp = (row: number, col: number) => {
        if (startTile == null || endTile == null) return;
        if (isStartOrEndCell(row, col, startTile, endTile)) return;
        if (isVisualizationRunningRef.current) return;
        if (maze != MAZE_ALGORITHMS[0].name) return;

        setIsMouseDown(false);
        return;
    }


    const handleMouseEnter = (row: number, col: number) => {
        if (startTile == null || endTile == null) return;
        if (isStartOrEndCell(row, col, startTile, endTile)) return;
        if (isVisualizationRunningRef.current) return;
        if (maze != MAZE_ALGORITHMS[0].name) return;

        if (isMouseDown) {
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid);
        }
    }

    const handleDragDown = (tile: Tile) => {

        if (tile.isStart) {
            setDraggingTile('start');
        } else if (tile.isEnd) {
            setDraggingTile('end');
        } else {
            setDraggingTile(null);
        }
    }

    const handleDragUp = (row: number, col: number) => {        

        if (draggingTile) {
            const newGrid: GridType = grid.map(r => r.map(c => ({ ...c })));

            if (draggingTile === "start" && startTile) {
                newGrid[startTile.row][startTile.column].isStart = false;
                newGrid[row][col].isStart = true;

                setStartTile(newGrid[row][col]);
            }
            
            if (draggingTile === "end" && endTile) {
                newGrid[endTile.row][endTile.column].isEnd = false;
                newGrid[row][col].isEnd = true;

                setEndTile(newGrid[row][col]);
            }

            setGrid(newGrid);
            setDraggingTile(null);
        }
    };


    return (
        <div className="w-full flex justify-center items-center my-4"
            id="grid-main"
            ref={gridRef}>
            <div className="">
                {
                    grid && grid.map((rowTiles, index) => (
                        <div className="flex" key={index}>
                            {
                                rowTiles.map((tile, index) => (
                                    <Cell
                                        key={index}
                                        tile={tile}
                                        handleMouseDown={() => handleMouseDown(tile.row, tile.column)}
                                        handleMouseEnter={() => handleMouseEnter(tile.row, tile.column)}
                                        handleMouseUp={() => handleMouseUp(tile.row, tile.column)}
                                        handleDragDown={() => handleDragDown(tile)}
                                        handleDragUp={() => handleDragUp(tile.row, tile.column)}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Grid