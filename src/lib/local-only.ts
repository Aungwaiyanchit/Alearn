import { headers } from "next/headers";
import { NextResponse } from "next/server";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

export function extractHostname(hostHeader: string | null | undefined): string {
  if (!hostHeader) {
    return "";
  }

  const trimmed = hostHeader.trim().toLowerCase();
  if (trimmed.startsWith("[")) {
    const closingBracket = trimmed.indexOf("]");
    return closingBracket > 0 ? trimmed.slice(0, closingBracket + 1) : trimmed;
  }

  const colonIndex = trimmed.indexOf(":");
  return colonIndex >= 0 ? trimmed.slice(0, colonIndex) : trimmed;
}

export function isLocalHostHeader(
  hostHeader: string | null | undefined,
): boolean {
  const hostname = extractHostname(hostHeader);
  return LOCAL_HOSTNAMES.has(hostname);
}

export function isLocalAdminEnvironment(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  // Always block on Vercel deployments (production, preview, or development)
  if (env.VERCEL === "1" || env.VERCEL_ENV) {
    return false;
  }

  if (env.NODE_ENV === "development") {
    return true;
  }

  return env.ENABLE_LOCAL_ADMIN === "true";
}

export function isLocalAdminAllowed(params: {
  host?: string | null;
  forwardedHost?: string | null;
  env?: NodeJS.ProcessEnv;
}): boolean {
  if (!isLocalAdminEnvironment(params.env)) {
    return false;
  }

  if (params.forwardedHost && !isLocalHostHeader(params.forwardedHost)) {
    return false;
  }

  if (!params.host) {
    return false;
  }

  return isLocalHostHeader(params.host);
}

export async function isLocalAdminServerPageAllowed(): Promise<boolean> {
  if (!isLocalAdminEnvironment()) {
    return false;
  }

  const requestHeaders = await headers();
  return isLocalAdminAllowed({
    host: requestHeaders.get("host"),
    forwardedHost: requestHeaders.get("x-forwarded-host"),
  });
}

export function guardLocalAdminApiRequest(
  request: Request,
): NextResponse | null {
  const allowed = isLocalAdminAllowed({
    host: request.headers.get("host"),
    forwardedHost: request.headers.get("x-forwarded-host"),
  });

  if (!allowed) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return null;
}
