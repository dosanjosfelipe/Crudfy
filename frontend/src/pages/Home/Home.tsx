import "./Home.scss";
import Ilustration from "../../assets/ilustration-home.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <div className="right-side">
        <div className="content">
          <h1>
            <span>CRUDFY</span> é um projeto CRUD desenvolvido para portfólio.
          </h1>
          <p>
            CRUD (Create, Read, Update, Delete) representa as quatro operações
            básicas de manipulação de dados. Neste site, você pode criar,
            visualizar, editar e excluir itens livremente, mantendo uma lista
            personalizada do que quiser.
          </p>
          <p>
            Para tornar a experiência mais prática e direta, não há sistema de
            login. Assim, <b>TODAS</b> as listas e/ou itens adicionados ficam
            visíveis a <b>QUALQUER</b> visitante do site.
          </p>
          <Link to="/dashboard">Adicionar listas e itens</Link>
        </div>
      </div>
      <div className="left-side">
        <div className="content">
          <img src={Ilustration} alt="Ilustração Homem e Ideia" />
        </div>
      </div>
    </main>
  );
}

export default Home;
