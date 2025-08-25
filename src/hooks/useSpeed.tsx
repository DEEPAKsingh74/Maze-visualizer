import { useContext } from "react"
import { SpeedContext } from "../providers/SpeedProvider";

export const useSpeed = () => {
    const context = useContext(SpeedContext);

    if(!context) {
        throw new Error("speed context cannot be used outside");
    }

    return context;
}