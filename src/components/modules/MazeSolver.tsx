import { useEffect, useRef } from "react"
import { usePathFinding } from "../../hooks/usePathFinder"
import type { Tile } from "../../utils/types"
import Grid from "./Grid"
import Navbar from "./Navbar"
import { MAX_COL, MAX_ROW } from "../../lib/constant"

const startTile: Tile = {
    row: 2,
    column: 2,
    isStart: true,
    isEnd: false,
    isPath: false,
    isWall: false,
    isTraversed: false,
    distance: Infinity,
    parent: null
}

const endTile: Tile = {
    ...startTile,
    isEnd: true,
    isStart: false,
    row: MAX_ROW - 2,
    column: MAX_COL - 2
}

const MazeSolver = () => {
    const { setStartTile, setEndTile } = usePathFinding();
    const isVisualizationRunningRef = useRef<boolean>(false);

    useEffect(() => {
        setStartTile(startTile);
        setEndTile(endTile);
    }, [])

    return (
        <div className="w-full h-full overflow-hidden">
            {/* navbar  */}
            <Navbar isVisualizationRunningRef={isVisualizationRunningRef} />

            {/* maze solver  */}
            <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
        </div>
    )
}

export default MazeSolver