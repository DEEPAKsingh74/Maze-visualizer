// In BinaryTree.ts
import { isStartOrEndCell } from "../../../utils/helpers";
import type { GridType, Tile } from "../../../utils/types";

export const buildBinaryTreeMaze = async (
    grid: GridType,
    startTile: Tile | null,
    endTile: Tile | null,
    speedInMs: number,
    setGrid: (grid: GridType) => void
): Promise<void> => {

    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (startTile && endTile && isStartOrEndCell(r, c, startTile, endTile)) {
                grid[r][c].isWall = false;
                grid[r][c].isPath = false;
                grid[r][c].isTraversed = false;
                grid[r][c].parent = null;
            } else {
                grid[r][c].isWall = true;
                grid[r][c].isPath = false;
                grid[r][c].isTraversed = false;
                grid[r][c].parent = null;
            }

        }
    }
    setGrid([...grid]);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (let r = 1; r < rows; r += 2) {
        for (let c = 1; c < cols; c += 2) {
            grid[r][c].isWall = false;

            if (startTile && endTile && isStartOrEndCell(r, c, startTile, endTile)) {
                grid[r][c].isWall = false;
                grid[r][c].isPath = false;
                grid[r][c].isTraversed = false;
                grid[r][c].parent = null;
                continue;
            }

            const canNorth = r - 2 >= 0;
            const canEast = c + 2 < cols;

            let carve: "N" | "E" | null = null;
            if (canNorth && canEast) {
                carve = Math.random() < 0.5 ? "N" : "E";
            } else if (canNorth) {
                carve = "N";
            } else if (canEast) {
                carve = "E";
            }

            if (carve === "N") {
                grid[r - 1][c].isWall = false;
                grid[r - 2][c].isWall = false;
            } else if (carve === "E") {
                grid[r][c + 1].isWall = false;
                grid[r][c + 2].isWall = false;
            }

            setGrid([...grid]);
            await sleep(speedInMs);
        }
    }
};