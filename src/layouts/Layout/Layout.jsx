import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Container } from "../Container/Container";

export const Layout = ({ children, className }) => {
  return (
    <>
      <Header />
      <main>
        <Container className={className}>{children}</Container>
      </main>
      <Footer />
    </>
  );
};
