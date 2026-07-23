import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

/**
 * Cliente Supabase para uso em Server Components, Route Handlers e
 * Server Actions (ex: tela de Setup, Dashboard, tela de Resumo).
 *
 * Precisa ser recriado a cada requisição (por isso é uma função async,
 * não um singleton exportado): cada request tem seu próprio conjunto de
 * cookies de sessão.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Chamado a partir de um Server Component durante a renderização.
          // Pode ser ignorado com segurança se houver um middleware
          // responsável por atualizar a sessão do usuário (fora do
          // escopo desta fase — tratado na Fase 4, Autenticação).
        }
      },
    },
  });
}
