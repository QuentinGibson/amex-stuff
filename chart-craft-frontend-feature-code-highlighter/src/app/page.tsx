import AiGenerator from "@/components/AiGenerator2";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="grid min-h-dvh w-full grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="w-full bg-blue-400">
        <AiGenerator />
      </main>
      <Footer />
    </div>
  );
}
