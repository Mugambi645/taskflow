import { useState } from "react";
import { Tabs } from "@/shared/components/Tabs";
import { useTasks } from "../api/useTasks";
import { TaskCard } from "./TaskCard";
import { TaskFilter } from "./TaskFilter";
import type { TaskStatus } from "../types";


export function TasksPanel() {
    const [view, setView] = useState<"active" | "done">("active");
    const filter: TaskStatus | "all" = view === "done" ? "done": "all";
    const { tasks, isLoading} = useTasks(filter);
    const visible = view === "active" ? tasks.filter((t) => t.status !== "done") : tasks;

    return (
        <div className="mx-auto max-w-md p-8">
            <Tabs defaultTab="active">
                <Tabs.List>
                    <Tabs.Tab id="active">My Tasks</Tabs.Tab>
                    <Tabs.Tab id="done">Completed</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel id="active">
                    * {isLoading ? <p>Loading...</p> : visible.map((t) => <TaskCard key={t.id} task={t} />)}
                </Tabs.Panel>
                <Tabs.Panel id="done">
                    {isLoading ? <p>Loading...</p> : visible.map((t) => <TaskCard key={t.id} task={t} />)}
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}