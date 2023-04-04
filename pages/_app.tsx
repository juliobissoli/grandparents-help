import AuthModal from "@/components/alth_modal";
import "@/styles/globals.css";
import moment from "moment";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  moment.locale("pt-br");


  const [name, setName] = useState('--');

  useEffect(() => {
    const initName = localStorage.getItem('name')
    setName(initName || '')
  }, [])




  const handleSave = async (name: string) => {
    console.log(name)
    localStorage.setItem('name', name)
    setName(name)
  };
  return (
    <div className="bg-blue-50 h-[100vh] p-2 box-limited">
      {" "}
      {name !== '' ?  "" : <AuthModal onSave={handleSave}></AuthModal>}
      <Component {...pageProps} />
    </div>
  );
}
