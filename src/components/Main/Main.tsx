import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';

const Main = () => (
  <div className='main'>
    <Promo />
    <NavTab />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Footer />
  </div>
);

export default Main;
