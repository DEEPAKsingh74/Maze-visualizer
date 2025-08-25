import type { GridType, Tile } from "./types";

export const isStartOrEndCell = (
    row: number,
    col: number,
    startTile: Tile,
    endTile: Tile
) => {


    if ((row === startTile.row && col === startTile.column)
        || (col === endTile.column && row === endTile.row))
        return true;

    return false;
}


export const createNewGrid = (
    grid: GridType,
    row: number,
    col: number
) => {

    const newGrid = grid.slice();
    const newTile: Tile = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall
    }

    newGrid[row][col] = newTile;

    return newGrid;
}