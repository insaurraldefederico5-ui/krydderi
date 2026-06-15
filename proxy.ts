import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // Run next-intl first. It sets X-NEXT-INTL-LOCALE on the request headers
  // via the x-middleware-request-* mechanism. We MUST return this response
  // directly (not create a new NextResponse.next()) so those request-header
  // modifications reach getRequestConfig and all server components.
  const intlResponse = intlMiddleware(request);

  // If next-intl wants to redirect (e.g. / → /da), honour it immediately.
  if (intlResponse.status !== 200) {
    return intlResponse;
  }

  // Supabase: refresh the session cookie on the EXISTING intlResponse so we
  // don't lose the locale headers that next-intl already set.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return intlResponse;
  }

  let response = intlResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Rebuild response preserving all existing headers from intlResponse
          const newResponse = NextResponse.next({
            request,
            headers: intlResponse.headers,
          });
          // Copy any intlResponse cookies too
          intlResponse.cookies.getAll().forEach(({ name, value }) => {
            newResponse.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            newResponse.cookies.set(name, value, options)
          );
          response = newResponse;
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ogg)$).*)",
  ],
};
