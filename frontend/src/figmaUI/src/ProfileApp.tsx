import { Header } from "./components/Header";
import { UserProfilePage } from "./components/UserProfilePage";
import { Footer } from "./components/Footer";

export default function ProfileApp() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <UserProfilePage />
      </main>
      <Footer />
    </div>
  );
}