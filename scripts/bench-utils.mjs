import { spawn } from "node:child_process";
import process from "node:process";

export const BASE_URL = "http://127.0.0.1:3000";

const DOWNLINK_KBPS = Number(process.env.BENCH_DOWNLINK_KBPS ?? 1600);
const UPLINK_KBPS = Number(process.env.BENCH_UPLINK_KBPS ?? 750);
const LATENCY_MS = Number(process.env.BENCH_LATENCY_MS ?? 120);
const CPU_THROTTLE = Number(process.env.BENCH_CPU_THROTTLE ?? 4);

export function startProdServer() {
  return spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: "production" },
  });
}

export async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for server: ${url}`);
}

export async function applyThrottle(client) {
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: LATENCY_MS,
    downloadThroughput: (DOWNLINK_KBPS * 1024) / 8,
    uploadThroughput: (UPLINK_KBPS * 1024) / 8,
    connectionType: "cellular3g",
  });
  await client.send("Emulation.setCPUThrottlingRate", { rate: CPU_THROTTLE });
  await client.send("Network.setCacheDisabled", { cacheDisabled: true });
}
