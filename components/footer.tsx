import { Text } from '@nextui-org/react';

const Footer = () => {
  return (
    <footer>
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a target="_blank" href="https://twitter.com/raveeshbhalla">
          {' '}
          Built by @raveeshbhalla
        </a>
        <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}> | </span>
        <a target="_blank" href="https://cytation.substack.com/">
          Subscribe for updates
        </a>
      </Text>
    </footer>
  );
};

export default Footer;