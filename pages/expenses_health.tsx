import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { SpinnerAnimation } from "@/components/common/spinner";
import TextField from "@/components/common/text_field";
import ToggleButton from "@/components/common/toggle_button";
import ExcretaCreateModal from "@/components/excreta/create_modal";
import ExpensesCreateModal from "@/components/expense/create_modal";
import api from "@/serve/api";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Divide } from "phosphor-react";
import { useEffect, useState } from "react";

export default function HealthExpenses() {
  const subRouteUrl = "exec?table=health_expenses";

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
        <title>👴🏾👵🏻 (Despesas médicas)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        {modalIsVisible ? (
          <ExpensesCreateModal
          typesData={[
            "Despesa hospitalar",
            "Diárias hospitalares",
            "Consultas urgentes",
            "Medicamentos",
            "Insumos de procedimentos",
            "Alimentação",
            "Empregada do lar",
            "Enfermeira",
            "Nutricionista",
            "Fonoaudióloga",
            "Fisioterapeuta",
          ].map(el => ({label: el, value: el}))}
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
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-8">
          <header className="flex justify-between items-end">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">💊</span>
              <h1 className="text-2xl"> Despesas médicas</h1>
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
                Total: {" "}
                {list.length > 0
                  ? list
                      .map((el) =>
                        Number.parseFloat(isNaN(el.value) ? 0 : el.value)
                      )
                      .reduce((a, b) => a + b).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                  : 0}
              </header>
              <ul>
                {list.filter(item => item.value !== '-').map((el: any, i: number) => {
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
                      </div>
                      {el.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
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