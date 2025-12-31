import { useState } from "react";
type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};


export default function Slider({ min = 0, max , step = 5, unit }:SliderProps) {
  const [value, setValue] = useState(max);
  
  return (
    <div className="w-full">
       <label className="text-sm font-medium mb-1 block"></label>
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-6"
        />
        <div className="mt-1 text-xs text-gray-600 text-center">
          {unit ? `Dans un rayon de ${value} ${unit}` : ` ${value}€`}
        </div>
      </div>
    </div>
  );
}
