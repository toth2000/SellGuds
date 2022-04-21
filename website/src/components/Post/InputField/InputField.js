import React from "react";
import { Container, Input, TextArea, Title } from "./style";

const InputField = ({
  title,
  name,
  type,
  handleInputChange,
  disabled,
  value,
  large,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {large ? (
        <TextArea value={value} name={name} onChange={(e) => handleInputChange(e)} />
      ) : (
        <Input
          name={name}
          type={type}
          onChange={(e) => handleInputChange(e)}
          value={value}
          disabled={disabled}
        />
      )}
    </Container>
  );
};

export default InputField;
