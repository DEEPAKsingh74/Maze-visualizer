export interface SelectInterface {
    id: number,
    title: string;
    name: string;
}


export interface OptionSelectorProps {
    optionsList: SelectInterface[];
    title?: string;
    handleChange?: (value: string) => void;
    onSelect?: () => void;
}

export type Tile = {
    row: number;
    column: number;
    isStart: boolean;
    isEnd: boolean;
    isPath: boolean;
    isWall: boolean;
    isTraversed: boolean;
    distance: number;
    parent: Tile | null;
}

export type GridType = Tile[][];