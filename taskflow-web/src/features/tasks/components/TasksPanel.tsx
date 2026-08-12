import { useState } from "react";
import { Tabs } from "@/shared/components/Tabs";
import { useTasks } from "../api/useTasks";
import { TaskCard } from "./TaskCard";
import { TaskSearchInput } from "./TaskSearchInput";
import { NewTaskInput } from "./NewTaskInput";
import type { TaskStatus } from "../types";
export function TasksPanel() {
const [view, setView] = useState<"active" | "done">("active");
const [search, setSearch] = useState("");
const filter: TaskStatus | "all" = view === "done" ? "done" : "all";
const { tasks, isLoading } = useTasks(filter);
const visible = tasks
.filter((t) => (view === "active" ? t.status !== "done" : true))
.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
async function handleAdd(title: string) {
await fetch("/api/tasks", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
title,
status: "todo",
updatedAt: new Date().toISOString(),
}),
});
}
return (
<div className="mx-auto max-w-md p-8">
<NewTaskInput onAdd={handleAdd} />
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