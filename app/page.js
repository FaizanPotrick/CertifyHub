"use client";
import HeroComponent from "@/components/hero";
import CertificateRegisterComponent from "@/components/certificateRegister";
import AlertComponent from "@/components/alerts";
import ModalComponent from "@/components/modal";

export default function Home() {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center py-24 px-4">
      <HeroComponent />
      <CertificateRegisterComponent />
      <AlertComponent />
      <ModalComponent />
    </section>
  );
}
