import type { TaskStatus } from "../types";

interface TaskFilterProps {
    value: TaskStatus | "all";
    onChange: (value: TaskStatus | "all") => void;

}

export function TaskFilter({ value, onChange }: TaskFilterProps) {
    return (
        <select
        className="mb-4 rounded border p-2"
        value={value}
        onChange={(e) => onChange(e.target.value as TaskStatus | "all")}>
            <option value="all">All</option>
<option value="todo">To do</option>
<option value="in_progress">In progress</option>
<option value="done">Done</option>
        </select>
    );
}