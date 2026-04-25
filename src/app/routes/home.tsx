import type { Route } from "./+types/home";
import MainContent from "@/main/mainContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seguimiento Multimedia" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <MainContent />
    </>
  );
}
