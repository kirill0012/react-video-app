import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useAuth } from '@/hooks/useAuth'

function Home() {
  const auth = useAuth()

  if (!auth.user) {
    return null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a> integrated with{' '}
          <a href="https://mui.com/">Material-UI!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  )
}

Home.requiresAuth = true

export default Home
