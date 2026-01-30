import '../styles/layout.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My React App</p>
    </footer>
  );
};

export default Footer;
