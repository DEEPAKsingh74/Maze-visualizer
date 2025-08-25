import { toast } from "react-toastify";
import type { GridType, Tile } from "../../../utils/types";
import { directions } from "../../constant";

export const BFS = async (
    grid: GridType,
    startTile: Tile,
    endTile: Tile,
    speedInMs: number,
    setGrid: (grid: GridType) => void
): Promise<void> => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

    const queue: Tile[] = [];

    startTile.distance = 0;
    startTile.isTraversed = true;
    queue.push(startTile);


    let found = false;

    // Process the queue
    while (queue.length > 0 && !found) {
        const currentTile = queue.shift()!;

        if (currentTile.isStart) {
            // Continue to neighbors
        }

        // Check if we reached the end
        if (currentTile.row === endTile.row && currentTile.column === endTile.column) {
            found = true;
            break;
        }

        // Explore neighbors
        for (const dir of directions) {
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

                // Mark as visited and add to queue
                neighbor.isTraversed = true;
                neighbor.distance = currentTile.distance + 1;
                neighbor.parent = currentTile;
                queue.push(neighbor);

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

        toast.success("Found the shortest path");

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


}