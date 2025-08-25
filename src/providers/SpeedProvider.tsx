import { createContext, useState, type ReactNode } from "react";
import { SPEED, type SpeedType } from "../lib/constant";

interface SpeedContextInterface {
    speed: SpeedType;
    setSpeed: (speed: SpeedType) => void;
}


export const SpeedContext = createContext<SpeedContextInterface | undefined>(undefined)


export const SpeedProvider = ({ children }: { children: ReactNode }) => {
    const [speed, setSpeed] = useState<SpeedType>(SPEED[1].name);

    return (
        <SpeedContext.Provider
            value={{
                speed,
                setSpeed
            }}
        >
            {children}
        </SpeedContext.Provider>
    )
}