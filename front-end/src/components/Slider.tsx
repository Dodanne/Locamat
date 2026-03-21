type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  value: number;
  onChange: (value: number) => void;
};

export default function Slider({ min = 0, max, step = 5, unit, value, onChange }: SliderProps) {
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
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-6"
        />
        <div className="mt-1 text-xs text-gray-600 text-center">
          {!unit
            ? value === max
              ? `${value}€ et plus`
              : `${value}€`
            : `Dans un rayon de ${value} ${unit}`}
        </div>
      </div>
    </div>
  );
}
