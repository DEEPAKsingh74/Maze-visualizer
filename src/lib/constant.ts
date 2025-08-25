export const MAZE_ALGORITHMS = [
    { id: 1, title: "None", name: "NONE" },
    { id: 2, title: "Binary Tree", name: "BINARY TREE" },
    { id: 2, title: "Prims", name: "PRIMS" },
];

export type MazeType = typeof MAZE_ALGORITHMS[number]['name']

export const SOLVER_ALGORITHMS = [
    { id: 1, title: "BFS", name: "BFS" },
    { id: 2, title: "DFS", name: "DFS" },
    { id: 3, title: "Dijkstra", name: "DIJKSTRA" },
    { id: 4, title: "Smart Dijkstra", name: "SMART DIJKSTRA" },
]

export type AlgorithmType = typeof SOLVER_ALGORITHMS[number]['name']

export const SPEED = [
    { id: 1, title: "Slow (0.5)", name: "SLOW", value: 200 },
    { id: 2, title: "Medium (1)", name: "MEDIUM", value: 50 },
    { id: 3, title: "Fast (2)", name: "FAST", value: 10 },
]

export type SpeedType = typeof SPEED[number]['name']

export const MAX_ROW = 20;
export const MAX_COL = 35;


export const directions = [
    { row: -1, col: 0 }, // Up
    { row: 0, col: 1 },  // Right
    { row: 1, col: 0 },  // Down
    { row: 0, col: -1 },  // Left
    { row: -1, col: 1 },  // Top - Right
    { row: 1, col: 1 },  // Bottom - Right
    { row: -1, col: -1 },  // Top - Left
    { row: 1, col: -1 }  // Bottom - Left
];