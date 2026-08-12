import { useState } from "react";
export function useControllableState<T>(
controlledValue: T | undefined,
defaultValue: T,
onChange?: (value: T) => void,
) {
const [uncontrolled, setUncontrolled] = useState(defaultValue);
const isControlled = controlledValue !== undefined;
const value = isControlled ? controlledValue : uncontrolled;
const setValue = (next: T) => {
if (!isControlled) setUncontrolled(next);
onChange?.(next);
};
return { value, setValue } as const;
}