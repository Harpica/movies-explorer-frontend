import './SectionTitle.css';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <h2 className='section-title'>{title}</h2>
);

export default SectionTitle;
