import Layout from "@/components/layout/Layout";
import CallBackForm from "@/components/CallBackForm/CallBackForm";


export const metadata: object = {
  title: 'Главная страница',
  description: 'Это наша главная страница!',
  openGraph: {
      title: 'Products',
      description: 'call',
  }
}

export default function Home() {
  return (
    <Layout>
        <h1>Это главная страница сайта</h1>
        <CallBackForm />
    </Layout>
  );
}
