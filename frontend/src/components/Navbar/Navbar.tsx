import "./Navbar.scss";
import Logo from "../../assets/logo-crudfy.svg";

function Navbar() {
  return (
    <header>
      <img src={Logo} alt="Logo Crudfy" />

      <nav>
        <a href="" target="__blank">
          Meu Portfólio
        </a>
        <a href="https://github.com/dosanjosfelipe" target="__blank">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/dosanjos-felipe/" target="__blank">
          LinkedIn
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
