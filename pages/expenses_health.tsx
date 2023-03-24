import { ArrowLeft } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function ExpensesHealth() {

  const [list, setList] = useState([])
  const teste = async () => {



    const res = await fetch('https://script.google.com/macros/s/AKfycbzO-V9Lp7r9hOyG1bRkS8_Fa8udF82WPtJ4aDgNQIk_W9ysetKRO1FtBs5M7wN4b2q6/exec?action=getTest')
    const data = await res.json()
    console.log('res => ',data)  

    setList(data)
    return res
  } 

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
            <h1 className="text-3xl">💊 Despesas médicas</h1>
            <button className="btn-green" onClick={teste}>Adicionar</button>
            </header>

            <ul className="m-4">
              {
                list.map((el: any, i: number) => {
                  return (

                    <li key={i} className="flex justify-between border-b py-2 border-zinc-100">
                        <div> <span className="text-gray-300 mr-2"> 21/Mar </span> {el.name} </div>
                        R$ {el.value}
                    </li>
                  )
                })
              }
            </ul>
        </section>
      </main>
    </>
  );
}
