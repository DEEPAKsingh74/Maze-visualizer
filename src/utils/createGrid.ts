import { MAX_COL, MAX_ROW } from "../lib/constant";
import type { GridType, Tile } from "./types"


export const createRow = (row: number, startTile: Tile | null, endTile: Tile | null) => {
    let newRow: Tile[] = [];
    for (let col = 0; col < MAX_COL; col++) {
        newRow.push({
            row,
            column: col,
            isStart: startTile !== null && col === startTile.column && row === startTile.row,
            isEnd: endTile !== null && col === endTile.column && row === endTile.row,
            isWall: false,
            isTraversed: false,
            isPath: false,
            distance: Infinity,
            parent: null
        })
    }


    return newRow;
}

export const createGrid = (startTile: Tile | null, endTile: Tile | null) => {

    let newGrid: GridType = [];

    for (let row = 0; row < MAX_ROW; row++) {
        newGrid.push(createRow(row, startTile, endTile));
    }

    return newGrid;

}