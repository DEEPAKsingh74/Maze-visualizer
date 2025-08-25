import { isStartOrEndCell } from "../../../utils/helpers";
import type { GridType, Tile } from "../../../utils/types";

export const buildPrimsMaze = async (
    grid: GridType,
    startTile: Tile | null,
    endTile: Tile | null,
    speedInMs: number,
    setGrid: (grid: GridType) => void
): Promise<void> => {
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize all cells as walls
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

    // Directions: up, right, down, left
    const directions = [
        { row: -2, col: 0 },  // Up (two steps)
        { row: 0, col: 2 },   // Right (two steps)
        { row: 2, col: 0 },   // Down (two steps)
        { row: 0, col: -2 }   // Left (two steps)
    ];

    // List of frontier cells (potential walls to carve through)
    const frontiers: { row: number; col: number }[] = [];
    
    // Start with a random cell (ensuring it's not start/end)
    let startRow = Math.floor(Math.random() * Math.floor(rows / 2)) * 2 + 1;
    let startCol = Math.floor(Math.random() * Math.floor(cols / 2)) * 2 + 1;
    
    // Make sure start position is valid
    startRow = Math.max(1, Math.min(startRow, rows - 2));
    startCol = Math.max(1, Math.min(startCol, cols - 2));
    
    // Mark initial cell as path
    grid[startRow][startCol].isWall = false;
    
    // Add neighboring walls to frontiers
    for (const dir of directions) {
        const newRow = startRow + dir.row;
        const newCol = startCol + dir.col;
        
        if (newRow > 0 && newRow < rows - 1 && newCol > 0 && newCol < cols - 1) {
            frontiers.push({ row: newRow, col: newCol });
        }
    }
    
    setGrid([...grid]);
    await sleep(speedInMs);

    while (frontiers.length > 0) {
        // Pick a random frontier cell
        const randomIndex = Math.floor(Math.random() * frontiers.length);
        const frontier = frontiers[randomIndex];
        frontiers.splice(randomIndex, 1); // Remove from frontiers
        
        const { row, col } = frontier;
        
        // Skip if this is start or end tile
        if (startTile && endTile && isStartOrEndCell(row, col, startTile, endTile)) {
            continue;
        }
        
        // Find all neighboring paths (cells that are already part of the maze)
        const neighboringPaths: { row: number; col: number; direction: number }[] = [];
        
        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i];
            const neighborRow = row + dir.row;
            const neighborCol = col + dir.col;
            
            if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
                if (!grid[neighborRow][neighborCol].isWall) {
                    neighboringPaths.push({ 
                        row: neighborRow, 
                        col: neighborCol, 
                        direction: i 
                    });
                }
            }
        }
        
        // If there are neighboring paths, connect this frontier to one of them
        if (neighboringPaths.length > 0) {
            const randomPath = neighboringPaths[Math.floor(Math.random() * neighboringPaths.length)];
            
            // Carve the path: make the frontier and the wall between them passages
            grid[row][col].isWall = false;
            
            // Carve the wall between frontier and the chosen path
            const wallRow = row + directions[randomPath.direction].row / 2;
            const wallCol = col + directions[randomPath.direction].col / 2;
            grid[wallRow][wallCol].isWall = false;
            
            // Add new frontiers from this cell
            for (const dir of directions) {
                const newRow = row + dir.row;
                const newCol = col + dir.col;
                
                if (newRow > 0 && newRow < rows - 1 && newCol > 0 && newCol < cols - 1 && 
                    grid[newRow][newCol].isWall && 
                    !frontiers.some(f => f.row === newRow && f.col === newCol)) {
                    frontiers.push({ row: newRow, col: newCol });
                }
            }
            
            setGrid([...grid]);
            await sleep(speedInMs);
        }
    }
    
    // Ensure start and end positions are clear
    if (startTile) {
        grid[startTile.row][startTile.column].isWall = false;
    }
    if (endTile) {
        grid[endTile.row][endTile.column].isWall = false;
    }
    
    setGrid([...grid]);
};