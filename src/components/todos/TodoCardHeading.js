import styled from "styled-components";

const TodoCardHeading = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #af2f2f;
  color: white;
  margin-bottom: 1em;

  a {
    color: white;
    text-decoration: none;
    transition: .5s;
    padding: 0.5em;
    margin: .3em;

    &:hover {
      background-color: #fff;
      color: #af2f2f;
      border-radius: 0.33em;
    }
  }
`;

export default TodoCardHeading;
