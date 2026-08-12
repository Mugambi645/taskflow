interface TaskSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function TaskSearchInput({ value, onChange}: TaskSearchInputProps) {
    return (
        <input
        className="mb-4 w-full rounded border p-2"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)} />
    );
}