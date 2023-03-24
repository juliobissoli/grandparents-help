import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-blue-50 h-[100vh] p-2">
      <Component {...pageProps} />
    </div>
  );
}
