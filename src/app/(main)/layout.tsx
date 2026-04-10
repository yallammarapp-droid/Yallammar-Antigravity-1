import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
