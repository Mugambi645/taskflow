import { useState } from "react";
import { Tabs } from "@/shared/components/Tabs";
import { useTasks } from "../api/useTasks";
import { useAddTask } from "../hooks/useAddTask";
import { TaskCard } from "./TaskCard";
import { TaskSearchInput } from "./TaskSearchInput";
import { NewTaskInput } from "./NewTaskInput";
import type { TaskStatus } from "../types";
export function TasksPanel() {
const [view, setView] = useState<"active" | "done">("active");
const [search, setSearch] = useState("");
const filter: TaskStatus | "all" = view === "done" ? "done" : "all";
const { tasks, isLoading } = useTasks(filter);
const { state: addState, addTask } = useAddTask();
const visible = tasks
.filter((t) => (view === "active" ? t.status !== "done" : true))
.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
return (
<div className="mx-auto max-w-md p-8">
<NewTaskInput onAdd={addTask} disabled={addState.status === "submitting"} />
{addState.status === "error" && (
    <p role="alert" className="mb-4 text-sm text-red-600">
Could not add task: {addState.message}
</p>

)}
<TaskSearchInput value={search} onChange={setSearch} />
<Tabs defaultTab="active">
<Tabs.List>
<Tabs.Tab id="active">My Tasks</Tabs.Tab>
<Tabs.Tab id="done">Completed</Tabs.Tab>
</Tabs.List>
<Tabs.Panel id="active">
{isLoading
? <p>Loading...</p>
: visible.map((t) => <TaskCard key={t.id} task={t} />)}
</Tabs.Panel>
<Tabs.Panel id="done">
{isLoading
? <p>Loading...</p>
: visible.map((t) => <TaskCard key={t.id} task={t} />)}
</Tabs.Panel>
</Tabs>
</div>
);
}