import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

export default function Expenses() {
  return (
    <>
      <Head>
        <title>👴🏾👵🏻 (Despesas gerais)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />Voltar</button>
        </Link>

        <section className="mt-12">
            <header className="flex justify-between">
            <h1 className="text-3xl">💸 Despesas gerais</h1>
            <button className="btn-green">Adicionar</button>
            </header>

            <ul className="m-4">
                <li className="flex justify-between border-b py-2 border-zinc-100">
                    <div> <span className="text-gray-300 mr-2"> 21/Mar </span> Despsa1 </div>
                    R$ 123,00
                </li>
            </ul>
        </section>
      </main>
    </>
  );
}
