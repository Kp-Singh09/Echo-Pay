"use client"
export const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <select onChange={(e) => {
        onSelect(e.target.value)
    }} className="bg-slate-100 border border-gray-300 text-gray-950 text-sm rounded-lg  block w-full p-2.5">
        {options.map(option => <option value={option.key}>{option.value}</option>)}
  </select>
}