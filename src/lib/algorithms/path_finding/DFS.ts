import { toast } from "react-toastify";
import type { GridType, Tile } from "../../../utils/types";
import { directions } from "../../constant";

export const DFS = async (
    grid: GridType,
    startTile: Tile,
    endTile: Tile,
    speedInMs: number,
    setGrid: (grid: GridType) => void
): Promise<void> => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Reset grid traversal state
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            grid[row][col].isTraversed = false;
            grid[row][col].isPath = false;
            grid[row][col].distance = Infinity;
            grid[row][col].parent = null;
        }
    }

    setGrid([...grid]);
    await sleep(speedInMs);

    const stack: Tile[] = [];

    let found = false;

    // Start from the start tile
    startTile.distance = 0;
    startTile.isTraversed = true;
    stack.push(startTile);

    // Process the stack (DFS uses LIFO)
    while (stack.length > 0 && !found) {
        const currentTile = stack.pop()!;

        // Check if we reached the end
        if (currentTile.row === endTile.row && currentTile.column === endTile.column) {
            found = true;
            break;
        }

        // Explore neighbors in reverse order for more intuitive visualization
        for (let i = directions.length - 1; i >= 0; i--) {
            const dir = directions[i];
            const newRow = currentTile.row + dir.row;
            const newCol = currentTile.column + dir.col;

            // Check if the neighbor is within grid bounds
            if (newRow >= 0 && newRow < grid.length &&
                newCol >= 0 && newCol < grid[0].length) {

                const neighbor = grid[newRow][newCol];

                // Skip if it's a wall or already visited
                if (neighbor.isWall || neighbor.isTraversed) {
                    continue;
                }

                // Mark as visited and add to stack
                neighbor.isTraversed = true;
                neighbor.distance = currentTile.distance + 1;
                neighbor.parent = currentTile;
                stack.push(neighbor);

                // Update UI
                setGrid([...grid]);
                await sleep(speedInMs);

                // Check if we found the end
                if (neighbor.row === endTile.row && neighbor.column === endTile.column) {
                    found = true;
                    break;
                }
            }
        }

        if (found) break;
    }

    // If path found, backtrack to mark the path
    if (found) {
        toast.success("Found a path using DFS");

        let current: Tile | null = grid[endTile.row][endTile.column];

        while (current && !current.isStart) {
            if (!current.isEnd) {
                current.isPath = true;
            }
            current = current.parent;

            // Update UI
            setGrid([...grid]);
            await sleep(speedInMs);
        }
    } else {
        toast.error("No valid path found");
    }
};