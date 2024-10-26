import Banner from '../Home/Banner/Banner';
import BrowseRange from '../Home/BrowseRange/BrowseRange';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = document.title.split(' ')[0] + ' | Home';
  }, []);

  return (
    <main>
      <Banner />
      <section>
        <BrowseRange />
      </section>
    </main>
  );
};

export default Home;
