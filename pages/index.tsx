import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { CardSelect } from "@/components/home/cards";
import Link from "next/link";
import moment from "moment";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Head>
        <title>👴🏾👵🏻  Cuidando dos avós</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <h1 className="text-5xl	mt-7">👴🏾👵🏻</h1>
        <h2 className="text-5xl mt-3">Cuidando dos avós</h2>

        <section className="flex mt-12 flex-wrap">
        <Link href="/excreta/all" className="w-1/2 p-2">
            <CardSelect title={"Rejeitos"} emoji={"🚽"}></CardSelect>
          </Link>
          <Link href="/expenses_general" className="w-1/2 p-2">
            <CardSelect title={"Despesas gerais"} emoji={"💸"}></CardSelect>
          </Link>
          <Link href="/expenses_health" className="w-1/2 p-2">
            <CardSelect title={"Despesas médicas"} emoji={"💊"}></CardSelect>
          </Link>
          <Link href="/timetable" className="w-1/2 p-2">
            <CardSelect title={"Escala"} emoji={"🗓"}></CardSelect>
          </Link>
          <Link href="/prescriptions" className="w-1/2 p-2">
            <CardSelect title={"Receita"} emoji={"📋"}></CardSelect>
          </Link>
        </section>
      </main>
    </>
  );
}
