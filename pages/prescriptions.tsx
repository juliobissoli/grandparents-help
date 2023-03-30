import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

export default function Prescription() {
  return (
    <>
      <Head>
        <title>👴🏾👵🏻 (Receitas vovó)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-8">
          <header className="flex justify-between items-end">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">📋</span>
              <h1 className="text-2xl"> Receita</h1>
            </div>
          </header>

          <div className="flex my-8 w-full flex-col justify-center items-center">
            <h1 className="text-4xl">🤷‍♂️</h1>
            <span>Em breve...</span>
          </div>
        </section>
      </main>
    </>
  );
}
