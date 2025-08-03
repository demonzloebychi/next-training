// import Layout from "@/components/layout/Layout";
// import CallBackForm from "@/components/CallBackForm/CallBackForm";
// import cities from "@/utils/cities";
// // import { CityProvider } from "../contexts/cityContext";
// import { CityContext } from "../contexts/cityContext";
// import { useContext } from "react";

// export const metadata: object = {
//   title: 'Главная страница',
//   description: 'Это наша главная страница!',
//   openGraph: {
//       title: 'Products',
//       description: 'call',
//   }
// }

// export default function Home() {


//   const cityContext = useContext(CityContext)

//   const currentCityKey = cityContext?.currentCity || 'moscow';

//   const city = cities[currentCityKey]



//   return (
//     <Layout>
//         <h1 className="title__main-page">Это главная страница сайта в ${city.dative}</h1>
//         <CallBackForm />
//     </Layout>
//   );
// }
// import { cookies } from 'next/headers';
import Layout from "@/components/layout/Layout";
import cities from '@/utils/cities';

type Params = { city: string };



export async function generateMetadata ({params} : { params: Promise<Params>}) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.city] || cities.moscow;
  return {
    title: `Главная страница - ${city.nominative}`,
    description: `Это главная страница сайта в ${city.dative}`
  }
}




export default async function Page({params} : {params : Promise<Params> }) {
  const resolvedParams = await params;
  const city = cities[resolvedParams.city] || cities.moscow;

  return (
    <Layout>
      <h1 className="title__main-page">Это главная страница сайта в {city.dative}</h1>
      {/* Можно сюда включить клиентский компонент с выбором города */}
    </Layout>
  );
}
