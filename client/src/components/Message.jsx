const Message = ({ variant, children }) => {
  return <alert className={`alert alert-${variant} d-block`}>{children}</alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
