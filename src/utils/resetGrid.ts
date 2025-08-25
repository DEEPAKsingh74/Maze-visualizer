import { MAX_COL, MAX_ROW } from "../lib/constant";
import { isStartOrEndCell } from "./helpers";
import type { GridType, Tile } from "./types";

export const resetGrid = (grid: GridType, startTile: Tile | null, endTile: Tile | null) => {

    const newGrid = grid.slice();

    for (let row = 0; row < MAX_ROW; row++) {
        for (let col = 0; col < MAX_COL; col++) {

            if (startTile && endTile && isStartOrEndCell(row, col, startTile, endTile)) continue;

            const tile = grid[row][col];
            tile.distance = Infinity;
            tile.isPath = false;
            tile.isTraversed = false;
            tile.isWall = false;
            tile.parent = null;

            grid[row][col] = tile;

        }
    }

    return newGrid;

}