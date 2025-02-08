import PropTypes from 'prop-types';

const BlankLayout = ({ children }) => {
  return <div>{children}</div>;
};

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlankLayout;
