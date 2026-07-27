import { useEffect, useState } from "react";

interface DeploymentStatus {
    state: "pending" | "running" | "failed";
    updatedAt: string;
}

export function useDeploymentStatusPolling (
    deploymentId: string,

): DeploymentStatus | null {
    const [status, setStatus] = useState<DeploymentStatus | null>(null);
    
    useEffect(() => {
        async function poll() {
            const res = await fetch(`/api/deployments/${deploymentId}/status`);
            const data: DeploymentStatus = await res.json();
            setStatus(data);
        }
        poll();

    }, [deploymentId]);
    return status;
}