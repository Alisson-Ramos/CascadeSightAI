'use client'; // Necessário para usar hooks como useEffect e useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={styles.container}>
      {/* O mainContent agora só centraliza um bloco: o logoWrapper */}
      <div className={styles.mainContent}>

        {/* ALTERADO: Agora o wrapper da logo contém AMBOS os elementos */}
        <div className={styles.logoWrapper}>
          <Image
            src="/icons/logo.svg"
            alt="CascadeSightAI"
            width={600}
            height={600}
            priority
          />

          {/* MOVIDO PARA CÁ: O "Powered by" está dentro do bloco da logo */}
          <div className={styles.poweredByWrapper}>
            <span className={styles.poweredByText}>Powered by</span>
            <Image
              src="/icons/codeco.png"
              alt="Powered by Icon"
              height={25}
              width={100}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
