"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

/**
 * Cliente Supabase para uso em Client Components (Zustand store, hooks,
 * componentes interativos da tela ao vivo).
 *
 * Cria uma nova instância a cada chamada por design do @supabase/ssr —
 * internamente ele reaproveita a mesma conexão/sessão via cookies do
 * navegador, então não é necessário nem desejável memoizar isso em um
 * singleton manual.
 */
export function createClient() {
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
