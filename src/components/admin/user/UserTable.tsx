import { trpc } from '~/utils/trpc'
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Text,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react'
import LoadingScreen from '~/components/LoadingGif'
import ProfileInfoModal from '~/components/user/ProfileModal'
import { useState } from 'react'

const UserTable = () => {
  const { isLoading, data } = trpc.useQuery(['member.getAllUsers'])
  const [selected, setSelected] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) return <LoadingScreen />

  const render = () => {
    return data?.map((data) => {
      return (
        <Tr key={data.id}>
          <Td>
            <Button
              variant="link"
              colorScheme="blackAlpha"
              onClick={(e) => {
                e.preventDefault()
                setSelected(data.id)
                onOpen()
              }}
            >
              {data.id}
            </Button>
          </Td>
          <Td>{data.name}</Td>
          <Td>{data.discord}</Td>
          <Td>{data.telegram}</Td>
          <Td>{data.department}</Td>
        </Tr>
      )
    })
  }

  return (
    <div className="mt-5">
      {render() && render()?.length ? (
        <>
          <TableContainer>
            <Table
              align="center"
              variant="striped"
              colorScheme="teal"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>Student ID</Th>
                  <Th>Name</Th>
                  <Th>Discord</Th>
                  <Th>Telegram</Th>
                  <Th>Department</Th>
                </Tr>
              </Thead>
              <Tbody>{render()}</Tbody>
            </Table>
          </TableContainer>
          <ProfileInfoModal
            isOpen={isOpen}
            onClose={onClose}
            studentId={selected}
          />
        </>
      ) : (
        <Text fontSize="xl" fontWeight="bold">
          No users found
        </Text>
      )}
    </div>
  )
}

export default UserTable
