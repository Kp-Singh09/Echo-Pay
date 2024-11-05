"use client";

export const TextInput = ({
    placeholder,
    onChange,
    label,
    value
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    value: string;
}) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-md font-medium text-gray-950">{label}</label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type="text"
                id="first_name"
                className="bg-slate-100 border border-gray-300 text-gray-950 text-sm rounded-lg  block w-full p-2.5"
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
};
