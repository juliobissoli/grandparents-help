import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import TextField from "@/components/common/text_field";
import ToggleButton from "@/components/common/toggle_button";
import ExcretaCreateModal from "@/components/excreta/create_modal";
import api from "@/serve/api";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Divide } from "phosphor-react";
import { useEffect, useState } from "react";

export default function ExpensesHealth() {

  useEffect(() => {
    console.log(currentStatus);
    if (currentStatus !== "success")  loadData();
  });

  const [list, setList] = useState([]);
  
  const [currentStatus, setStatus] = useState("empty");
  
  const [modalIsVisible, toggleModal] = useState(false);

  const loadData = async () => {
    setStatus("loading");
    api.get("exec?action=getTest").then((res: any) => {
      console.log("res => ", res.data);
      setList(res.data);
      setStatus("success");
    });
  };

  const handleSave = async (amount: number, type: string) => {
    const data = {
      name: type,
      value: amount,
      date: moment().format("YYYY-MM-DD HH:mm"),
    };
    console.log("vai ataualiza => ", data);

    api.post('exec?action=postTest', data).then(
      res => {
        console.log('deu bom')
        toggleModal(false)
      }
    )
  };

  return (
    <>
      <Head>
        <title>👴🏾👵🏻 (Despesas gerais)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        {modalIsVisible ? (
          <ExcretaCreateModal
            onClose={() => {
              toggleModal(false);
            }}
            onSave={handleSave}
          ></ExcretaCreateModal>
        ) : (
          ""
        )}

        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-12">
          <header className="flex justify-between">
            <h1 className="text-3xl">💊 Despesas médicas</h1>
            <button className="btn-green" onClick={() => toggleModal(true)}>
              Adicionar
            </button>
          </header>

          {currentStatus === "loading" ? (
            <div className="w-full text-center">
              <span>carregando...</span>
            </div>
          ) : (
            <ul className="m-4">
              {list.map((el: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="flex justify-between border-b py-2 border-zinc-100"
                  >
                    <div>
                      {" "}
                      <span className="text-gray-300 mr-2"> 21/Mar </span>{" "}
                      {el.name}{" "}
                    </div>
                    R$ {el.value}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
