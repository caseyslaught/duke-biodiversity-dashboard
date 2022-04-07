import { useState } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ResultsTable = ({ observations }) => {
  const [selectedPhoto, setSelectedPhoto] = useState();

  return (
    <>
      <TableContainer w="100%">
        <Table variant="striped">
          <TableCaption>Observations</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Collection method</Th>
              <Th>Category</Th>
              <Th>Forest layer</Th>
              <Th>Media</Th>
            </Tr>
          </Thead>
          <Tbody>
            {observations.map((obs) => {
              return (
                <Tr key={obs.uid}>
                  <Td>{new Date(obs.datetime_created).toDateString()}</Td>
                  <Td>{obs.method}</Td>
                  <Td>{obs.category}</Td>
                  <Td>{obs.level}</Td>
                  <Td>
                    {obs.photo_href && (
                      <Image
                        src={obs.photo_href}
                        maxHeight="60px"
                        alt="observation"
                        onClick={() => setSelectedPhoto(obs.photo_href)}
                        cursor="pointer"
                      />
                    )}
                  </Td>
                </Tr>
              );
            })}

            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Date</Th>
              <Th>Collection method</Th>
              <Th>Category</Th>
              <Th>Forest layer</Th>
              <Th>Media</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <Modal isOpen={selectedPhoto} onClose={() => setSelectedPhoto(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedPhoto} alt="observation" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResultsTable;
