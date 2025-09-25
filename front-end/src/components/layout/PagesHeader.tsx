'use client'
import React from "react";
import {
    Breadcrumbs,
    Link as MUILink,
    Stack,
    Typography,
    Tooltip,
    Switch,
    FormControlLabel,
    IconButton,
    CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function NavTitle({
    autorefresh = true,
    intervalMs = 60_000,
    onRefresh,
    persistKey = "navTitle:autoRefresh",
    disableWhenHidden = true,
    homeHref = "/dashboard",
    homeLabel = "Início",
}: {
    autorefresh?: boolean;
    intervalMs?: number;
    onRefresh?: () => Promise<void> | void;
    persistKey?: string;
    disableWhenHidden?: boolean;
    homeHref?: string;
    homeLabel?: string;
}) {
    const [autoRefresh, setAutoRefresh] = React.useState<boolean>(autorefresh);

React.useEffect(() => {
    try {
        const saved = window.localStorage.getItem(persistKey);
        if (saved !== null) setAutoRefresh(saved === "true");
    } catch {}
}, [persistKey]);

    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const intervalRef = React.useRef<number | null>(null);

    const doRefresh = React.useCallback(async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        try {
            if (onRefresh) {
                await onRefresh();
            } else {
                window.location.reload();
            }
        } finally {
            setIsRefreshing(false);
        }
    }, [onRefresh, isRefreshing]);

    React.useEffect(() => {
        try {
            window.localStorage.setItem(persistKey, String(autoRefresh));
        } catch { }
    }, [autoRefresh, persistKey]);

    const start = React.useCallback(() => {
        if (intervalRef.current != null) return;
        intervalRef.current = window.setInterval(() => {
            doRefresh();
        }, intervalMs);
    }, [doRefresh, intervalMs]);

    const stop = React.useCallback(() => {
        if (intervalRef.current != null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    React.useEffect(() => {
        if (!autoRefresh) {
            stop();
            return;
        }
        if (
            disableWhenHidden &&
            typeof document !== "undefined" &&
            document.visibilityState === "hidden"
        ) {
            stop();
            return;
        }
        start();
        return stop;
    }, [autoRefresh, start, stop, disableWhenHidden]);

    React.useEffect(() => {
        if (!disableWhenHidden) return;
        const onVis = () => {
            if (document.visibilityState === "hidden") stop();
            else if (autoRefresh) start();
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [autoRefresh, start, stop, disableWhenHidden]);

    // montar breadcrumbs dinamicamente a partir da URL atual
    const [segments, setSegments] = React.useState<string[]>([]);
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
        setSegments(path ? path.split("/") : []);
    }, []);

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2, mb: 1 }}
        >
            <Breadcrumbs aria-label="breadcrumb">
                <MUILink underline="hover" color="inherit" href={homeHref}>
                    {homeLabel}
                </MUILink>
                {segments.map((seg, idx) => {
                    const href = "/" + segments.slice(0, idx + 1).join("/");
                    const isLast = idx === segments.length - 1;
                    return isLast ? (
                        <Typography
                            color="text.primary"
                            key={idx}
                            sx={{ textTransform: "capitalize" }}
                        >
                            {seg}
                        </Typography>
                    ) : (
                        <MUILink
                            underline="hover"
                            color="inherit"
                            href={href}
                            key={idx}
                            sx={{ textTransform: "capitalize" }}
                        >
                            {seg}
                        </MUILink>
                    );
                })}
            </Breadcrumbs>

            <Stack direction="row" spacing={2} alignItems="center">
                <FormControlLabel
                    control={
                        <Switch
                            checked={autoRefresh}
                            onChange={() => setAutoRefresh((v) => !v)}
                            color="success"
                        />
                    }
                    label="Auto-refresh"
                />

                <Tooltip
                    title={isRefreshing ? "Atualizando…" : "Atualizar agora (R)"}
                    arrow
                >
                    <span>
                        <IconButton
                            aria-label="Atualizar"
                            onClick={doRefresh}
                            disabled={isRefreshing}
                            size="small"
                        >
                            {isRefreshing ? (
                                <CircularProgress size={20} />
                            ) : (
                                <RefreshIcon />
                            )}
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>
        </Stack>
    );
}