import { useState } from "react";
import { useTasks } from "../api/useTasks";
import { TaskCard } from "./TaskCard";
import { TaskFilter } from "./TaskFilter";
import type { TaskStatus } from "../types";

export function TasksPanel() {
    const [filter, setFilter] = useState<TaskStatus | "all">("all");
    const { tasks, isLoading } = useTasks(filter);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="mx-auto max-w-md p-8">
            <TaskFilter value={filter} onChange={setFilter}/>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
    );
    
}