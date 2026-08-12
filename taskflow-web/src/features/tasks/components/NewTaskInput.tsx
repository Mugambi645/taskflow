import { useRef } from "react";

export function NewTaskInput({
    onAdd,
}: {
    onAdd: (title: string) => void;
}) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <form
        className="mb-4 flex gap-2"
        onSubmit={(e) => {
            e.preventDefault();
            const title = ref.current?.value.trim();
            if (title) {
                onAdd(title);
                if (ref.current) ref.current.value = "";
            }
        }}
        >
            <input
            ref={ref}
            defaultValue=""
            placeholder="New task title..."
            className="flex-1 rounded border p-2"
            />
            <button type="submit" className="rounded bg-blue-600 px-4 text-white">
                Add
            </button>
        </form>
    );
}