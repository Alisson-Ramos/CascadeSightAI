'use client'; // Necessário para usar hooks como useEffect e useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './home.module.css'; // Vamos usar este arquivo para a animação

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Define um temporizador para redirecionar após 4 segundos (4000 ms)
    // Damos um tempo extra para a animação ser apreciada
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 4000);

    // Função de limpeza: cancela o temporizador se o componente for desmontado
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={styles.container} style={{ width: '100%', height: '100%' }}>
      <div className={styles.logoWrapper}>
        <Image
          src="/icons/logo.svg" // IMPORTANTE: Coloque sua logo na pasta /public
          alt="CascadeSightAI"
          width={600}
          height={600}
          priority // Ajuda a carregar a imagem principal mais rápido
        />
      </div>
    </main>
  );
}
