import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 pb-12 pt-28 bg-blue-50">        
        <h1 className="text-xl">This is a homepage</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
