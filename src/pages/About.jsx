import styles from "../styles/About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <h2>Chi Sono</h2>
      <p><strong>Nome:</strong> Giacomo Bruni</p>
      <p><strong>Studente:</strong> I.T.I.S. E. Fermi</p>
      <p><strong>Sezione:</strong> 4 M</p>
      <p>Appassionato di informatica e programmazione ❤️</p>
    </div>
  );
}

export default About;