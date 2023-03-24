import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { CardSelect } from "@/components/home/cards";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Cudadndo dos avos</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <h1 className="text-5xl	mt-7">👴🏾👵🏻</h1>
        <h2 className="text-5xl mt-3">Cuidando dos avos</h2>

        <section className="flex mt-12 flex-wrap">
          <Link href="/expenses_general" className="w-1/2 p-2">
            <CardSelect title={"Despesas gerais"} emoji={"💸"}></CardSelect>
          </Link>
          <Link href="/expenses_health" className="w-1/2 p-2">
            <CardSelect title={"Despesas médicas"} emoji={"💊"}></CardSelect>
          </Link>
          <Link href="/expenses" className="w-1/2 p-2">
            <CardSelect title={"Teste"} emoji={"💸"}></CardSelect>
          </Link>
        </section>
      </main>
    </>
  );
}
