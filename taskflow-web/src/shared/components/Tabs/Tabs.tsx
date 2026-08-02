import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error("Tabs.* components must be rendered inside <Tabs>");
    }
    return ctx;
}

interface TabsProps {
    defaultTab: string;
    children: ReactNode;
}

export function Tabs({ defaultTab, children}: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="w-full">{children}</div>
        </TabsContext.Provider>
    )
}


function TabList({ children }: { children: ReactNode }) {
    return <div role="tablist" className="mb-4 flex gap-2 border-b">{children}</div>;
}

function Tab({id, children}: { id: string; children: ReactNode}) {
    const { activeTab, setActiveTab} = useTabsContext();
    const isActive = activeTab === id;
    return (
        <button
        role="tab"
       aria-selected={isActive}
onClick={() => setActiveTab(id)}
className={
isActive
? "border-b-2 border-blue-600 pb-2 font-medium"
: "pb-2 text-gray-500"
}>
{children}
</button>
);
    
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
    const { activeTab } = useTabsContext();
    if (activeTab !== id) return null;
    return <div role="tabpanel">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;