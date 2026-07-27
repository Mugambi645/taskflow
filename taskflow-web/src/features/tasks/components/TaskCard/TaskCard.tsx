import { Card, CardFooter } from "../../../../shared/components/Card";
import type { Task } from "../../types";

const STATUS_LABEL: Record<Task["status"], string> = {
    todo: "To do",
    in_progress: "In progress",
    done: "Done",
};

export function TaskCard({ task }: { task: Task}) {
    return (
<Card className="mb-3">
<p className="font-medium">{task.title}</p>
<CardFooter>{STATUS_LABEL[task.status]}</CardFooter>
</Card>
);
}