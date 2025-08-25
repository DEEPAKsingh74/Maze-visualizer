import type React from "react";
import type { Tile } from "../../utils/types";
import { MdLocationOn } from "react-icons/md";

interface TileProp {
    tile: Tile;
    handleMouseDown: (row: number, col: number) => void;
    handleMouseEnter: (row: number, col: number) => void;
    handleMouseUp: (row: number, col: number) => void;
    handleDragDown: (tile: Tile) => void;
    handleDragUp: (row: number, col: number) => void;
}

const Cell: React.FC<TileProp> = ({
    tile,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleDragDown,
    handleDragUp
}) => {

    const getTileStyle = () => {
        if (tile.isWall) return "bg-gray-800";
        if (tile.isPath) return "bg-yellow-400";
        if (tile.isTraversed) return "bg-blue-300";
        return "bg-white";
    };

    return (
        <div
            className={`lg:w-8 md:w-5 w-2 aspect-square border border-slate-300 flex justify-center items-center ${getTileStyle()}`}

            onMouseDown={() => handleMouseDown(tile.row, tile.column)}
            onMouseEnter={() => handleMouseEnter(tile.row, tile.column)}
            onMouseUp={() => {
                handleMouseUp(tile.row, tile.column);
                handleDragUp(tile.row, tile.column);
            }}
        >
            {(tile.isStart || tile.isEnd) && (
                <MdLocationOn
                    className={`${tile.isStart ? "text-green-600" : "text-red-600"
                        } text-lg md:text-xl lg:text-2xl cursor-grab`}

                    onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDragDown(tile);
                    }}
                    
                />
            )}
        </div>
    );
};

export default Cell;
