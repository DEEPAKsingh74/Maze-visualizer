import { useContext } from "react"
import { PathFindingContext } from "../providers/PathFindingProvider"

export const usePathFinding = () => {
    const context = useContext(PathFindingContext);

    if(!context) {
        throw new Error("path finding context cannot be used outside");
    }

    return context;
}