import { Footer } from "@/components/user/layouts/Footer";
import { Navbar } from "@/components/user/layouts/Navbar";
import { SecondNavbar } from "@/components/user/layouts/SecondNavbar";
import Home from "@/components/user/views/Home";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <SecondNavbar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;
