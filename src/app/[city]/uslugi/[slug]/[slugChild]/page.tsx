import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import styles from '@/components/layout/Layout.module.css';
import { use } from "react";

type Props = {
  params: {
    slug: string;       // slug родителя
    slugChild: string;  // slug дочерней услуги
  }
}

type tProps = Promise<{slug: string, slugChild: string}>
// Функция для получения услуги по slug с безопасной обработкой
const fetchServiceBySlug = async (slug: string) => {
  const res = await fetch(`https://clinical.vet/wp-json/wp/v2/uslugi?slug=${slug}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const data = await res.json();
  console.log(data)
  if (!data || !data.length) return null;
  return data[0];
};

export default async function ChildServicePage({ params }: {params: Promise<{slug: string, slugChild: string}>}) {
  const { slug, slugChild } = await params;

  // Получаем родительскую услугу
  const parentService = await fetchServiceBySlug(slug);
  if (!parentService) {
    console.error(`Родительская услуга с slug "${slug}" не найдена`);
    notFound();
  }

  // Получаем дочернюю услугу
  const childService = await fetchServiceBySlug(slugChild);
  if (!childService) {
    console.error(`Дочерняя услуга с slug "${slugChild}" не найдена`);
    notFound();
  }

  // Проверяем, что дочерняя услуга действительно принадлежит родителю
  if (Number(childService.parent) !== Number(parentService.id)) {
    console.error(`Несоответствие: childService.parent = ${childService.parent}, parentService.id = ${parentService.id}`);
    notFound();
  }

  // Получаем фото дочерней услуги (если есть)
  let photoUrl: string | null = null;
  if (childService.acf?.osnovnoe_foto_vrach) {
    const photoRes = await fetch(`https://clinical.vet/wp-json/wp/v2/media/${childService.acf.osnovnoe_foto_vrach}`);
    if (photoRes.ok) {
      const photoData = await photoRes.json();
      photoUrl = photoData.source_url;
    }
  }

  return (
    <Layout>
      <h1 className='title'>{childService.title.rendered}</h1>

             <div className="ss-banner">
      
                      <div className="ss-banner__left">
                          
      
                          <div className="ss-banner__img">
                                  {photoUrl && (
                                    <Image
                                      src={photoUrl}
                                      alt={childService.title.rendered}
                                      width={320}
                                      height={140}
                                    />
                                  )}
                                  
                          </div>
                      </div>
      
                      {
                          childService.acf.o_vrache && (
                              <div className="ss-banner__right">
                                  <div dangerouslySetInnerHTML={{ __html: childService.acf.o_vrache }} />
                              </div>
                          )
                              
                      }
      
                      
      
                   </div>


                            <div className="price">
                    <div className="price__list">
                        <div dangerouslySetInnerHTML={{ __html: childService.acf.table }} />
                    </div>

                </div>
      

                <div className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: childService.acf.tekst_uslugi }} />
                </div>


      {/* Добавьте сюда любой дополнительный вывод данных дочерней услуги */}
    </Layout>
  );
}
