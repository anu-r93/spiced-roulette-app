import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { SWRConfig } from "swr";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}
