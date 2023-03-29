import ExpensesCreateModal from "@/components/expense/create_modal";
import api from "@/serve/api";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Expenses() {
  const subRouteUrl = "exec?table=general_expenses";


  const listInit: Array<any> = [];

  const [list, setList] = useState(listInit);

  const [currentStatus, setStatus] = useState("empty");

  const [modalIsVisible, toggleModal] = useState(false);


  const [addActionsLoading, toggleLoadingAction] = useState(false);



  const loadData = async () => {
    setStatus("loading");
    api.get(subRouteUrl).then((res: any) => {
      console.log("res => ", res.data);
      setList(res.data);
      setStatus("success");
    });
  };

  const handleSave = async (value: number, type: string) => {
    const data = {
      type: type,
      value: value,
      registered_by: "Julio",
      date: moment().format("YYYY-MM-DD HH:mm"),
    };
    console.log("vai ataualiza => ", data);

    toggleLoadingAction(true);
    api.post(subRouteUrl, data).then((res: any) => {
      console.log("Adiciono com sucesso => ", res);
      const newList: Array<any> = [res.data.data, ...list];
      setList(newList);
      toggleLoadingAction(false);
      toggleModal(false);
    });
  };

  useEffect(() => {
    console.log(currentStatus);
    if (currentStatus !== "success") loadData();
  });

  return (
    <>
      <Head>
        <title>👴🏾👵🏻 (Despesas gerais)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
       
      {modalIsVisible ? (
          <ExpensesCreateModal
            isLoading={addActionsLoading}
            onClose={() => {
              toggleModal(false);
            }}
            onSave={handleSave}
          ></ExpensesCreateModal>
        ) : (
          ""
        )}
        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />Voltar</button>
        </Link>

        <section className="mt-12">
            <header className="flex justify-between">
            <h1 className="text-3xl">💸 Despesas gerais</h1>
            <button className="btn-green"  onClick={() => toggleModal(true)}>Adicionar</button>
            </header>

            <ul className="m-4">
              {
                list.map((el:any, i: number) => {
                  return (
                <li 
                key={i}
                className="flex justify-between border-b py-2 border-zinc-100">
                    <div> <span className="text-gray-300 mr-2"> {moment(el.date).format('DD/MMM')} </span> {el.type} </div>
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
