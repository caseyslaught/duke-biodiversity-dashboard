import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { FiLock, FiMail } from "react-icons/fi";

import { PublicAPI, ProtectedAPI } from "../../api";

import { isEmailValid } from "../../helpers/text";

export default function Login({ isOpen, setAuthenticated }) {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setDisabled(!isEmailValid(newEmail) || password.length < 5);
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setDisabled(!isEmailValid(email) || newPassword.length < 5);
    setPassword(newPassword);
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await PublicAPI.post("account/login/", {
        email,
        password,
      });

      if (res.status === 200) {
        const currentUser = {
          email,
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
        };

        localStorage.setItem("current_user", JSON.stringify(currentUser));

        const accountRes = await ProtectedAPI.get("account/get_account");

        if (accountRes.status === 200) {
          localStorage.setItem(
            "current_user",
            JSON.stringify({
              ...currentUser,
              uid: accountRes.data.uid,
              name: accountRes.data.name,
              isAdmin: accountRes.data.is_superuser,
            })
          );
          setEmail("");
          setPassword("");
          setAuthenticated(true);
        } else {
          setError("Failed to get user account.");
        }
      } else {
        setError("Your email and password combination is incorrect.");
      }
    } catch (error) {
      console.log(error);
      setError("Your email and password combination is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiMail color={theme.colors.gray[400]} />}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                disabled={loading}
                onChange={handleEmailChange}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiLock color={theme.colors.gray[400]} />}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                disabled={loading}
                onChange={handlePasswordChange}
              />
            </InputGroup>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack align="flex-end">
            <Collapse in={error && error.length > 0}>
              <Box color="red.700">{error}</Box>
            </Collapse>
            <Button
              disabled={disabled || loading}
              isLoading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
