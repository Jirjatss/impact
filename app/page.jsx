import Layout from "../components/Layout/index";
import Leaderboard from "../components/Home/Leaderboard";
import Hero from "../components/Home/Hero";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Leaderboard />
    </Layout>
  );
};

export default Home;
