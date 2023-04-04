import { SpinnerAnimation } from "@/components/common/spinner";
import ExpensesCreateModal from "@/components/expense/create_modal";
import api from "@/serve/api";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";

export default function GeneralExpenses() {
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

  const handleSave = async (value: number, type: string, date: string) => {
    const data = {
      type,
      value,
      date,
      registered_by: localStorage.getItem("name"),
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
            typesData={[
              "Alimentação",
              "Supermercado",
              "Energia",
              "Celular",
              "Água",
              "IPTU",
              "Gás",
              "Transporte",
              "Outros",
            ].map((el) => ({ label: el, value: el }))}
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
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-8">
          <header className="flex justify-between items-end">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">💸</span>
              <h1 className="text-2xl"> Despesas gerais</h1>
            </div>
            <div>
              <button className="btn-green" onClick={() => toggleModal(true)}>
                Adicionar
              </button>
            </div>
          </header>

          {currentStatus === "loading" ? (
            <div className="p-4 flex w-full items-center justify-center flex-col">
              <SpinnerAnimation></SpinnerAnimation>
              <small>carregando...</small>
            </div>
          ) : (
            <div className="m-4">
              <header className="w-full text-right">
                Total:{" "}
                {list.length > 0
                  ? list
                      .map((el) =>
                        Number.parseFloat(isNaN(el.value) ? 0 : el.value)
                      )
                      .reduce((a, b) => a + b)
                      .toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                  : 0}
              </header>
              <ul>
                {list
                  .filter((item) => item.value !== "-")
                  .sort((a, b) => moment(b.date).diff(moment(a.date), "days"))
                  .map((el: any, i: number) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between border-t py-2 border-zinc-100 text-xs"
                      >
                        <div>
                          {" "}
                          <span className="text-gray-300 mr-2">
                            {" "}
                            {moment(el.date).format("DD/MMM")}{" "}
                          </span>{" "}
                          {el.type}{" "}
                          <small className="text-zinc-300">({el.registered_by})</small>
                        </div>
                        {el.value.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
