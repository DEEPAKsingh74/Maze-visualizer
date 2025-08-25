import { toast } from "react-toastify";
import type { GridType, Tile } from "../../../utils/types";
import { directions } from "../../constant";

export const Dijkstra = async (
    grid: GridType,
    startTile: Tile,
    endTile: Tile,
    speedInMs: number,
    setGrid: (grid: GridType) => void,
    epsilon: number
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

    // Initialize start tile
    startTile.distance = 0;

    // Create a min-heap (priority queue) using an array
    const priorityQueue: Tile[] = [startTile];

    // Track visited nodes separately
    const visited = new Set<string>();


    let found = false;

    // Process nodes until we find the end or no more nodes to process
    while (priorityQueue.length > 0 && !found) {
        // Sort the priority queue by manhatten distance
        priorityQueue.sort((a, b) => {
            if (a.distance === b.distance) {
                // Break ties by Manhattan distance to the end tile
                const distA = Math.abs(a.row - endTile.row) + Math.abs(a.column - endTile.column);
                const distB = Math.abs(b.row - endTile.row) + Math.abs(b.column - endTile.column);
                return distA - distB;
            }
            return a.distance - b.distance;
        });

        // Get the node with the smallest distance
        const currentNode = priorityQueue.shift()!;

        // Skip if already visited
        const nodeKey = `${currentNode.row},${currentNode.column}`;
        if (visited.has(nodeKey)) {
            continue;
        }

        // Mark as visited
        visited.add(nodeKey);
        currentNode.isTraversed = true;

        // Update UI
        setGrid([...grid]);
        await sleep(speedInMs);

        // Check if we reached the end
        if (currentNode.row === endTile.row && currentNode.column === endTile.column) {
            found = true;
            break;
        }

        // Skip if it's a wall
        if (currentNode.isWall) {
            continue;
        }

        // Explore neighbors
        for (const dir of directions) {
            const newRow = currentNode.row + dir.row;
            const newCol = currentNode.column + dir.col;

            // Check if the neighbor is within grid bounds
            if (newRow >= 0 && newRow < grid.length &&
                newCol >= 0 && newCol < grid[0].length) {

                const neighbor = grid[newRow][newCol];
                const neighborKey = `${neighbor.row},${neighbor.column}`;

                // Skip if it's a wall or already visited
                if (neighbor.isWall || visited.has(neighborKey)) {
                    continue;
                }

                // Calculate new distance (all edges have weight 1 in grid)
                const manhattanDist = Math.abs(neighbor.row - endTile.row) + Math.abs(neighbor.column - endTile.column);
                const newDistance = currentNode.distance + 1 + epsilon * manhattanDist;

                // If we found a shorter path to this neighbor
                if (newDistance < neighbor.distance) {
                    neighbor.distance = newDistance;
                    neighbor.parent = currentNode;

                    // Add to priority queue if not already there
                    if (!priorityQueue.includes(neighbor)) {
                        priorityQueue.push(neighbor);
                    }

                    // Update UI to show distance changes
                    setGrid([...grid]);
                    await sleep(speedInMs);
                }

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
        toast.success("Found the shortest path using Dijkstra");

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