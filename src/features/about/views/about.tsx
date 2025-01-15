import { AboutContent } from '../components/aboutContent';
import { ContentLayout } from '../../../layout/contentLayout';

const About = () => {
  return (
    <ContentLayout>
      <div className="p-8">
        <AboutContent />
      </div>
    </ContentLayout>
  );
};

export default About;