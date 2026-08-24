const Footer = () => {
  return (
    <footer className="p-4 col-span-full">
      <p className="text-center text-gray-500">Hecho por Elias</p>
      <small className="block text-center text-gray-500">
        v{__APP_VERSION__}
      </small>
    </footer>
  );
};

export default Footer;
