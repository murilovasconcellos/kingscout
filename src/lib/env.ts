/**
 * Validação centralizada das variáveis de ambiente exigidas pelo projeto.
 *
 * Falha rápido e com mensagem clara em vez de deixar o Supabase client
 * lançar um erro genérico de "fetch failed" quando uma env var não foi
 * configurada. Isso reduz o tempo de diagnóstico em ambiente local e em
 * produção.
 */

function readEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(
      `Variável de ambiente "${name}" não configurada. ` +
        `Copie ".env.example" para ".env.local" e preencha com os dados do seu projeto Supabase.`,
    );
  }

  return value;
}

export const env = {
  get supabaseUrl(): string {
    return readEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseAnonKey(): string {
    return readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
};
