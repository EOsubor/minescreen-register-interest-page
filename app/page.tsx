import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { ValueProps } from "./components/value-props";
import { HowItWorks } from "./components/how-it-works";
import { RegistrationForm } from "./components/registration-form";
import { Footer } from "./components/footer";
import { ScrollReveal } from "./components/scroll-reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <HowItWorks />
        <RegistrationForm />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
