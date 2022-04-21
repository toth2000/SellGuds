import React from "react";
import { Container, Loader, Text, Wrapper } from "./style";

import { useSelector } from "react-redux";

const Progess = () => {
  const { isLoading } = useSelector((state) => state.progress);

  return (
    <>
      {isLoading ? (
        <Container>
          <Wrapper>
            <Loader></Loader>
            <Text>
              Note: The backend server may take some time to boot for the first
              time as it is hosted on a free plan.
            </Text>
          </Wrapper>
        </Container>
      ) : null}
    </>
  );
};

export default Progess;
