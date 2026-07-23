import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Rota de diagnóstico da Fase 1: confirma que a aplicação consegue
 * alcançar o projeto Supabase configurado nas variáveis de ambiente.
 *
 * Importante: nesta fase ainda não existe nenhuma tabela no banco
 * (isso é escopo da Fase 3). Por isso o teste não consulta nenhuma
 * tabela de domínio — ele usa `auth.getUser()`, que sempre faz uma
 * requisição real à API do Supabase, mesmo sem nenhuma sessão ativa.
 *
 * - Se as variáveis de ambiente estiverem erradas/ausentes ou a URL do
 *   projeto for inválida, a chamada falha com um erro de rede (fetch).
 * - Se a conexão for bem-sucedida, o Supabase responde normalmente,
 *   mesmo que o resultado seja "nenhum usuário autenticado" — o que é
 *   esperado, já que ninguém fez login ainda.
 *
 * Isso é suficiente para validar o critério de conclusão da Fase 1
 * ("conexão de teste com Supabase retorna sucesso") sem depender de
 * nenhuma tabela ou dado de domínio.
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getUser();

    // "Auth session missing" é o retorno esperado quando ninguém está
    // logado — isso NÃO é uma falha de conectividade, é a confirmação
    // de que o Supabase respondeu corretamente à requisição.
    const isExpectedNoSessionError =
      !error || error.message.toLowerCase().includes("session missing");

    if (!isExpectedNoSessionError) {
      return NextResponse.json(
        {
          status: "error",
          supabaseReachable: false,
          message: error?.message ?? "Erro desconhecido ao consultar o Supabase.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        supabaseReachable: true,
        message: "Conexão com o Supabase estabelecida com sucesso.",
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido.";

    return NextResponse.json(
      {
        status: "error",
        supabaseReachable: false,
        message,
      },
      { status: 500 },
    );
  }
}
