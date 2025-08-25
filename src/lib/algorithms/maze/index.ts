// In maze.ts
import type { GridType, Tile } from "../../../utils/types";
import { MAZE_ALGORITHMS, SPEED, type MazeType, type SpeedType } from "../../constant";
import { buildBinaryTreeMaze } from "./BinaryTree";
import { buildPrimsMaze } from "./Prims";

export const buildMaze = async (
    mazeAlgo: MazeType,
    grid: GridType,
    startTile: Tile | null,
    endTile: Tile | null,
    speed: SpeedType,
    setGrid: (grid: GridType) => void
): Promise<void> => {

    let speedInMs = SPEED.find(s => s.name === speed)?.value ?? 100;


    switch (mazeAlgo) {
        case MAZE_ALGORITHMS[1].name:  // Binary tree
            await buildBinaryTreeMaze(grid, startTile, endTile, speedInMs, setGrid);
            break;
        case MAZE_ALGORITHMS[2].name:  // prims
            await buildPrimsMaze(grid, startTile, endTile, speedInMs, setGrid);
            break;

        default:
            return;
    }
};