import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
      Protege todas as rotas dinâmicas do Next.js,
      incluindo as da pasta /app e /api, exceto arquivos estáticos.
    */
    "/((?!_next|.*\\..*).*)",
  ],
};
