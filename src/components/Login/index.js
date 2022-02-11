import React, { useState } from "react";
import {
  Button,
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

import { isEmailValid } from "../../helpers/text";

export default function Login({ isOpen }) {
  const [open, setOpen] = useState(isOpen);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <Modal isOpen={open} closeOnOverlayClick={false} isCentered>
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
          <Button
            disabled={disabled || loading}
            isLoading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
