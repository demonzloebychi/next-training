import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import styles from '@/app/products/Products.module.css';

const fetchServiceBySlug = async (slug: string) => {
    const response = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?slug=${slug}`, {
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        }
    });

    if (!response.ok) {
        return null; // Обработка ошибок
    }

    const data = await response.json();
    console.log(data[0])
    return data[0]; // Предполагаем, что API возвращает массив с одним элементом
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await fetchServiceBySlug(slug);

    if (!service) {
        notFound(); // Если услуга не найдена, показываем 404
    }

    return (
        <Layout>
            <h1 className='title'>{service.title.rendered}</h1>
            <a href="/uslugi">Назад</a>
            <div className={styles.content}>

            </div>
        </Layout>
    );
}
