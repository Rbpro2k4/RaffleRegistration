import React from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import backgroundImage from '../images/body.jpg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
  background-position: center;
`;

const Box = styled.div`
  width: 420px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;
  &::placeholder {
    color: #fff;
  }
`;

const Icon = styled.i`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;
`;

const Checkbox = styled.input`
  accent-color: #fff;
  margin-right: 3px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

const Register = styled.div`
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
`;

function Login() {
  return (
    <Container>
      <Box>
        <Title>Welcome</Title>
        
        <InputBox>
          <Input type="text" placeholder="Name" required />
          <Icon><FaUser /></Icon>
        </InputBox>

        <InputBox>
          <Input type="email" placeholder="Email" required />
          <Icon><FaEnvelope /></Icon>
        </InputBox>

        <InputBox>
          <Input type="tel" placeholder="Phone Number" required />
          <Icon><FaPhone /></Icon>
        </InputBox>

        <InputBox>
          <Input type="password" placeholder="Code" required />
          <Icon><FaLock /></Icon>
        </InputBox>

        <RememberForgot>
          <label>
            <Checkbox type="checkbox" /> I agree to receive updates and notifications
          </label>
          <Link href="#">Love by Ralph</Link>
        </RememberForgot>

        <SubmitButton type="submit">Good Luck!</SubmitButton>

        <Register>
          <p>Problem? <Link href="#">Contact us!</Link></p>
        </Register>
      </Box>
    </Container>
  );
}

export default Login;
