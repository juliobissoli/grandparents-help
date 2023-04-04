import { SpinnerAnimation } from "@/components/common/spinner";
import api from "@/serve/api";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Timetable() {
  const subRouteUrl = "exec?table=scale";

  const week_days = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];
  // moment.locale('pt-br');

  const [currentStatus, setStatus] = useState("empty");

  const listInit: Array<any> = [];

  const [list, setList] = useState(listInit);

  const loadData = async () => {
    setStatus("loading");
    api.get(subRouteUrl).then((res: any) => {
      console.log("res => ", res.data);
      setList(res.data.reverse());
      setStatus("success");
    });
  };

  useEffect(() => {
    console.log(currentStatus);
    if (currentStatus !== "success") loadData();
  });

  return (
    <>
      <Head>
        <title>👴🏾👵🏻 Escala</title>
      </Head>
      <main className="page-wrapper bg-white rounded-2xl p-3 m-1">
        <Link href="/">
          <button className="flex gap-3 text-md">
            <ArrowLeft size={22} />
            Voltar
          </button>
        </Link>

        <section className="mt-8">
          <header className="flex justify-between items-end ">
            <div className="flex flex-col justify-end">
              <span className="text-3xl">🗓</span>
              <h1 className="text-2xl"> Escala entre irmãos</h1>
            </div>
          </header>

          {currentStatus === "loading" ? (
            <div className="p-4 flex w-full items-center justify-center flex-col">
              <SpinnerAnimation></SpinnerAnimation>
              <small>carregando...</small>
            </div>
          ) : (
            <div>
              {list.map((el, i) => (
                <div
                  key={i}
                  className={
                    "flex my-3 p-3 border-2  rounded-xl w-full flex-col " +
                    (moment().weekday() === i
                      ? "border-purple-300"
                      : "border-zinc-100")
                  }
                >
                  <div className="text-2xl">
                    <small className="text-green-400">{el.week_days}</small>
                    <div className="flex w-full">
                      {/* Hoje ({week_days[moment().weekday()]}) */}
                      <div className="w-1/2 flex flex-col">
                        <small>👵🏻Vovó:</small>
                        {el.responsible_grandmother}
                      </div>
                      <div className="w-1/2 flex flex-col">
                        <small>👴🏾Vovô:</small>

                        {el.responsible_grandfather}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
