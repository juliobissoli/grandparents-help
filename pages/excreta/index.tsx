import { SpinnerAnimation } from "@/components/common/spinner";
import ExcretaCreateModal from "@/components/excreta/create_modal";
import { CardSelect } from "@/components/home/cards";
import api from "@/serve/api";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Divide } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Excreta() {
  return (
    <>
      <Head>
        <title>👴🏾 (Rejeitos)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-12">
          <header className="flex justify-between items-end">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">🥤</span>
              <h1 className="text-2xl"> Rejeitos (vovó)</h1>
            </div>
      
          </header>

          <section className="flex mt-12 flex-wrap">
            <Link href="/" className="w-1/2 p-2">
              <CardSelect title={"Voltar"} emoji={"🔙"}></CardSelect>
            </Link>{" "}
            <Link href="/excreta/only" className="w-1/2 p-2">
              <CardSelect title={"Despesas gerais"} emoji={"👀"}></CardSelect>
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}
