import { useEffect, useState } from "react";

import type { Task, TaskStatus } from "../types";
export function useTasks(
    filter: TaskStatus | "all" = "all",
    intervalMs = 5000,
) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
        async function load() {
            const query = filter === "all" ? "" : `?status=${filter}`;
            const res = await fetch(`/api/tasks${query}`);
            const data: Task[] = await res.json();
            if (!cancelled) {
            setTasks(data);
            setIsLoading(false);
            }
          
        }
        load();
        const id = setInterval(load, intervalMs);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [filter, intervalMs]);
    return { tasks, isLoading };
}