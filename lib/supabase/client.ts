import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`));
          return cookie ? cookie.split("=")[1] : undefined;
        },
        set(name: string, value: string, options: any) {
          // Actually set the cookie so server can read it too
          let cookieString = `${name}=${value}`;
          if (options?.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
          if (options?.path) cookieString += `; Path=${options.path}`;
          if (options?.sameSite)
            cookieString += `; SameSite=${options.sameSite}`;
          if (options?.secure) cookieString += `; Secure`;
          document.cookie = cookieString;
        },
        remove(name: string, options: any) {
          document.cookie = `${name}=; Max-Age=0; Path=${options?.path || "/"}; SameSite=Lax`;
        },
      },
    },
  );
}
