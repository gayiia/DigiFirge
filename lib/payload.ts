import { getPayload } from "payload";
import config from "@payload-config";

// Cache the promise at module scope so dev-mode HMR and concurrent
// requests don't reopen a fresh Postgres pool on every call — Payload's
// own recommended pattern for the Local API.
let payloadPromise: ReturnType<typeof getPayload> | null = null;

export function getPayloadClient() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }
  return payloadPromise;
}

// The site is considered "connected" only once real DB credentials exist.
// Until then (or if the DB has a bad moment), fetchers fall back to local
// placeholder content rather than crashing the page.
export const isPayloadConfigured = Boolean(process.env.DATABASE_URI);
