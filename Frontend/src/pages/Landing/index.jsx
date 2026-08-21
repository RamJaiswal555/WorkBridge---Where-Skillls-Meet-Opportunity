import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Hero from './Hero';
import PopularServices from './PopularServices';
import Statistics from './Statistics';
import FeaturedWorkers from './FeaturedWorkers';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import TrustSection from './TrustSection';
import AppPromotion from './AppPromotion';

export default function Landing() {
  useDocumentTitle('WorkBridge — Where Skills Meet Opportunity');
  return (
    <div>
      <Hero />
      <Statistics />
      <PopularServices />
      <FeaturedWorkers />
      <HowItWorks />
      <Testimonials />
      <TrustSection />
      <AppPromotion />
    </div>
  );
}
