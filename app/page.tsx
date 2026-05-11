import HeroCanvas from "../components/canvas/HeroCanvas";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.mainWrapper}>
      {/* 3D background layer */}
      <HeroCanvas />

      {/* Hero Section Content */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.nameBlock}>THILANKA</span>
            <span className={styles.nameBlock}>
              DIL<span className={styles.accentText}>SHA</span>N
            </span>
          </h1>
          <p className={styles.roleBlock}>
            SOFTWARE ENGINEER // FULL-STACK // CREATIVE DEV
          </p>
        </div>
      </section>

      {/* Spacer to allow for testing the scroll/sticky behavior */}
      <div style={{ height: "100vh" }} />
    </main>
  );
}
