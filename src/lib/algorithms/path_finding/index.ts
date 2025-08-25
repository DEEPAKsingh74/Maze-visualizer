import type { GridType, Tile } from "../../../utils/types";
import { SOLVER_ALGORITHMS, SPEED, type AlgorithmType, type SpeedType } from "../../constant";
import { BFS } from "./BFS";
import { DFS } from "./DFS";
import { Dijkstra } from "./Dijasktra";

export const runAlgorithm = (
    algorithm: AlgorithmType,
    grid: GridType,
    startTile: Tile | null,
    endTile: Tile | null,
    speed: SpeedType,
    setGrid: (grid: GridType) => void
): Promise<void> => {

    if (!startTile || !endTile) return Promise.resolve();

    let speedInMs = SPEED.find(s => s.name === speed)?.value ?? 100;


    switch (algorithm) {
        case SOLVER_ALGORITHMS[0].name:  // BFS
            return BFS(grid, startTile, endTile, speedInMs, setGrid);

        case SOLVER_ALGORITHMS[1].name:  // DFS
            return DFS(grid, startTile, endTile, speedInMs, setGrid);

        case SOLVER_ALGORITHMS[2].name:  // Dijkstra
            return Dijkstra(grid, startTile, endTile, speedInMs, setGrid, 0);

        case SOLVER_ALGORITHMS[3].name:  // Smart Dijkstra
            const epsilon = 0.6;
            return Dijkstra(grid, startTile, endTile, speedInMs, setGrid, epsilon);

        default:
            break;
    }

    return Promise.resolve();

}