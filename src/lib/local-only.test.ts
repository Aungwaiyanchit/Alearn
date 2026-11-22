import { describe, expect, test } from "bun:test";
import {
  extractHostname,
  isLocalAdminAllowed,
  isLocalHostHeader,
} from "@/lib/local-only";

describe("local-only admin guard", () => {
  test("extracts hostnames for IPv4, localhost, and IPv6 hosts", () => {
    expect(extractHostname("localhost:3000")).toBe("localhost");
    expect(extractHostname("127.0.0.1:3000")).toBe("127.0.0.1");
    expect(extractHostname("[::1]:3000")).toBe("[::1]");
    expect(extractHostname("alearn.vercel.app")).toBe("alearn.vercel.app");
  });

  test("recognizes only loopback hostnames as local", () => {
    expect(isLocalHostHeader("localhost:3000")).toBe(true);
    expect(isLocalHostHeader("127.0.0.1:4000")).toBe(true);
    expect(isLocalHostHeader("[::1]:3000")).toBe(true);
    expect(isLocalHostHeader("alearn.vercel.app")).toBe(false);
    expect(isLocalHostHeader("localhost.evil.com")).toBe(false);
  });

  test("allows admin in local development on localhost", () => {
    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        env: { NODE_ENV: "development" },
      }),
    ).toBe(true);
  });

  test("blocks admin on Vercel even when host looks local", () => {
    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        env: { NODE_ENV: "development", VERCEL: "1" },
      }),
    ).toBe(false);

    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        env: {
          NODE_ENV: "development",
          VERCEL_ENV: "preview",
          ENABLE_LOCAL_ADMIN: "true",
        },
      }),
    ).toBe(false);
  });

  test("blocks admin in production by default unless explicitly enabled locally", () => {
    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        env: { NODE_ENV: "production" },
      }),
    ).toBe(false);

    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        env: { NODE_ENV: "production", ENABLE_LOCAL_ADMIN: "true" },
      }),
    ).toBe(true);
  });

  test("blocks admin when x-forwarded-host is remote", () => {
    expect(
      isLocalAdminAllowed({
        host: "localhost:3000",
        forwardedHost: "alearn.vercel.app",
        env: { NODE_ENV: "development" },
      }),
    ).toBe(false);
  });
});
