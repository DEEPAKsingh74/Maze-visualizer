import type React from "react";
import type { OptionSelectorProps, SelectInterface } from "../../utils/types";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const OptionSelector: React.FC<OptionSelectorProps> = ({ optionsList, title = "Choose item", handleChange, onSelect }) => {

    const [isOptionsMenuOpen, setIsOptionMenuOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleOptionMenuExpand = () => {
        setIsOptionMenuOpen(!isOptionsMenuOpen);
    };

    const handleSelect = (item: SelectInterface) => {
        setSelected(item.title);
        setIsOptionMenuOpen(false);

        if (handleChange) {
            handleChange(item.name);
        }

        if (onSelect) {
            onSelect();
        }
    };

    return (
        <div className="relative w-full max-w-xs">
            {/* Main selector */}
            <div
                className="min-w-[140px] rounded-xl text-sm bg-white px-3 py-1 text-slate-700 
                cursor-pointer font-medium flex justify-between items-center shadow-sm 
                hover:shadow-md transition-all"
                onClick={handleOptionMenuExpand}
            >
                <span className="truncate max-w-[85%] font-bold">{selected ?? title}</span>
                <RiArrowDropDownLine
                    size={22}
                    className={`transition-transform duration-300 ${isOptionsMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                />
            </div>

            {/* Dropdown menu */}
            {isOptionsMenuOpen && (
                <div
                    className="absolute mt-2 w-full rounded-lg bg-white shadow-lg border border-slate-200 
                    overflow-hidden z-10 animate-fade-in"
                >
                    {optionsList &&
                        optionsList.map((item, index) => (
                            <OptionItem
                                key={index}
                                item={item}
                                onClick={() => handleSelect(item)}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export const OptionItem = ({
    item,
    onClick,
}: {
    item: SelectInterface;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 
            cursor-pointer transition-colors truncate"
        >
            {item.title}
        </div>
    );
};

export default OptionSelector;
