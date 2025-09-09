import { Square, SquareCheck } from "lucide-react";
import React from "react";

export type MultiSelectProps = {
    options: string[];
    value: string[];
    onChange: (selected: string[]) => void;
    max?: number;
    placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, max = 2, placeholder }) => {
    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState<string[]>(value || []); // committed value
    const [pendingInternal, setPendingInternal] = React.useState<string[]>(value || []); // temp value while open
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        setInternal(value || []);
        if (!open) setPendingInternal(value || []);
    }, [value]);

    const handleOpen = () => {
        setPendingInternal(internal);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSelect = (option: string) => {
        let next: string[];
        if (pendingInternal.includes(option)) {
            next = pendingInternal.filter((v) => v !== option);
        } else if (pendingInternal.length < max) {
            next = [...pendingInternal, option];
        } else {
            next = pendingInternal;
        }
        setPendingInternal(next);
    };

    const handleConfirm = () => {
        setInternal(pendingInternal);
        onChange(pendingInternal);
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="w-full input-wrapper border-transparent"
                style={{ paddingLeft: '16px' }}
                onClick={handleOpen}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpen();
                    }
                }}
            >
                <span className={internal.length === 0 ? 'text-gray-400' : ''}>
                    {internal.length === 0 ? placeholder : internal.join(', ')}
                </span>
            </button>
            {open && (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={handleClose}
                        aria-label="Đóng"
                        tabIndex={0}
                        style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
                                e.preventDefault();
                                handleClose();
                            }
                        }}
                    />
                    <div
                        className="fixed left-0 right-0 bottom-0 z-50"
                        style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', transform: open ? 'translateY(0)' : 'translateY(100%)' }}
                    >
                        <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[55vh]">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Chọn ngành nghề (tối đa {max})</span>
                                <button onClick={handleClose} className="text-2xl leading-none">&times;</button>
                            </div>
                            <input
                                type="text"
                                className="w-full mb-3 px-3 py-2 border border-gray-30 rounded focus:outline-none focus:ring"
                                placeholder="Tìm kiếm..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <ul className="space-y-1 overflow-y-auto h-[calc(50vh-140px)]">
                                {options.filter(option => option.toLowerCase().includes(search.toLowerCase())).map((option) => {
                                    const isSelected = pendingInternal.includes(option);
                                    const isDisabled = !isSelected && pendingInternal.length >= max;
                                    return (
                                        <button
                                            type="button"
                                            key={option}
                                            className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected ? 'text-blue-600 font-semibold' : ''} ${isDisabled ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                                            onClick={() => !isDisabled && handleSelect(option)}
                                            onKeyDown={e => {
                                                if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                                                    e.preventDefault();
                                                    handleSelect(option);
                                                }
                                            }}
                                            disabled={isDisabled}
                                            tabIndex={isDisabled ? -1 : 0}
                                        >
                                            <span className="flex-1">{option}</span>
                                            {isSelected ? (
                                                <SquareCheck size={20} className="text-blue-600 ml-2" />
                                            ) : (
                                                <Square size={20} className="text-gray-400 ml-2" />
                                            )}
                                        </button>
                                    );
                                })}
                            </ul>
                            <div className="">
                                <button className="btn-blue w-full mt-4 py-2" onClick={handleConfirm}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MultiSelect;
