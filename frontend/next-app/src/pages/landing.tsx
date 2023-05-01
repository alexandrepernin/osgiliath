import { Footer } from 'components/Footer';
import { Navigation } from 'components/Navigation';
import { ProductInfo } from 'components/ProductInfo';
import { Testimonials } from 'components/Testimonials';

const Gusto = (): JSX.Element => {
  return (
    <>
      <Navigation />
      <ProductInfo />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Gusto;
