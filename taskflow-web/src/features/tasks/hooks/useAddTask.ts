
import { useReducer } from "react";
import type { Task } from "../types";

// Step 1: State shape, action union, and pure reducer.
export type AddTaskState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

export type AddTaskAction =
  | { type: "submit_started" }
  | { type: "submit_succeeded" }
  | { type: "submit_failed"; message: string };

export function addTaskReducer(
  state: AddTaskState,
  action: AddTaskAction,
): AddTaskState {
  switch (action.type) {
    case "submit_started":
      return { status: "submitting" };
    case "submit_succeeded":
      return { status: "idle" };
    case "submit_failed":
      return { status: "error", message: action.message };
    default:
      return state;
  }
}

// Step 2: Custom hook wiring the reducer to asynchronous API calls.
export function useAddTask() {
  const [state, dispatch] = useReducer(addTaskReducer, {
    status: "idle",
  });

  async function addTask(title: string) {
    dispatch({ type: "submit_started" });
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status: "todo",
          updateAt: new Date().toISOString(),
        } satisfies Omit<Task, "id">),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      dispatch({ type: "submit_succeeded" });
    } catch (err) {
      dispatch({
        type: "submit_failed",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  return { state, addTask };
}