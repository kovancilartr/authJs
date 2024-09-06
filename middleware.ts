// import { auth } from "@/auth";
// Next.js uygulamanızda oturum doğrulaması yapabilmek için auth fonksiyonunu içe aktarır.

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
// NextRequest ve NextResponse sınıflarını içe aktarır. NextRequest, gelen isteği temsil ederken, NextResponse, yanıtı temsil eder.

const protectedRoutes = ["/middleware", "/server"];
// Korunması gereken rotaların bir listesini tanımlar. Bu rotalara erişmeden önce oturum doğrulaması yapılması gereklidir.

export default async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Sadece korunmuş bir rota için istek yapılmışsa oturum kontrolü yapılır
  if (isProtected) {
    const session = await auth();

    if (!session) {
      const absoluteURL = new URL("/sequrity", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Eğer rota korunması gereken rotalar arasında değilse ya da oturum geçerli ise isteğe devam edilir
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// Middleware'in uygulanacağı yolları belirler. Bu örnekte, "/api", "/_next/static", "/_next/image" ve "favicon.ico" dışındaki tüm rotalar için middleware çalışacaktır.
