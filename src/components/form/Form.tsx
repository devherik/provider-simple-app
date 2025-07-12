export default function Form({
  onChange,
  value,
  id,
  type,
  label,
}: {
  onChange: (value: string) => void;
  value: string;
  id: string;
  type: string;
  label: string;
}) {
  return (
    <>
      <label
        className="block text-sm font-medium mb-1 text-gray-600"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#020202] focus:border-transparent"
        placeholder={`Enter any ${label.toLowerCase()}`}
      />
    </>
  );
}
