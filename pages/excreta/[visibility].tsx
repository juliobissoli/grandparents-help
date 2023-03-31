import { SpinnerAnimation } from "@/components/common/spinner";
import ExcretaCreateModal from "@/components/excreta/create_modal";
import api from "@/serve/api";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, Divide } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Excreta() {

  const router = useRouter();


  const subRouteUrl = "exec?table=excreta";

  useEffect(() => {
    console.log(currentStatus);
    if (currentStatus !== "success") loadData();
  });

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

  const handleSave = async (amount: number, type: string) => {
    const data = {
      type: type,
      amount: amount,
      registered_by: "--",
      date: moment().format("YYYY-MM-DD HH:mm"),
    };

    toggleLoadingAction(true);
    api.post(subRouteUrl, data).then((res: any) => {
      console.log("Adiciono com sucesso => ", res);
      const newList: Array<any> = [res.data.data, ...list];
      setList(newList);
      toggleLoadingAction(false);
      toggleModal(false);
    });
  };

  return (
    <>
      <Head>
        <title>👴🏾 (Rejeitos)</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        {modalIsVisible ? (
          <ExcretaCreateModal
            isLoading={addActionsLoading}
            onClose={() => {
              toggleModal(false);
            }}
            onSave={handleSave}
          ></ExcretaCreateModal>
        ) : (
          ""
        )}

{
    router.query.visibility === 'all'
    ? (
        <Link href="/">
        <button className="flex gap-3 text-md">
          <ArrowLeft size={22} />
          Voltar
        </button>
      </Link>
    )
    : ''
}
      

        <section className="mt-12">
          <header className="flex justify-between items-end">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">🚽</span>
              <h1 className="text-2xl"> Rejeitos (vovô)</h1>
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
            <ul className="m-4">
              {list
                .filter((item) => item.amount !== "-")
                .map((el: any, i: number) => {
                  return (
                    <li
                      key={i}
                      className="flex justify-between border-b py-2 border-zinc-100 text-xs"
                    >
                      <div>
                        <span className="text-gray-300 mr-2">
                          {/* {el.registered_by} */}
                          {moment(el.date).format("MMM/DD")}
                        </span>
                        {el.type === "feces" ? "Fezes 💩" : "Urina 🪣"}{" "}
                      </div>
                      {el.amount} ml
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
