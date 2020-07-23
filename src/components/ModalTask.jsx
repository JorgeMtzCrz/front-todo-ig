import React from 'react'
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input, 
  InputGroup,
  Box
} from '@chakra-ui/core'
import useForm from '../hooks/useForm'
import TASK_SERVICE from '../services/taskServices'
import Swal from 'sweetalert2'



export default function MyModal(props) {  
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  const { isOpen, onClose } = props
  const [form, handleInput] = useForm()
  const id = loggedUser._id

  let data = {
    userId: id,
    name: form.name
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    TASK_SERVICE.CREATE(data)
      .then(response => {
          Swal.fire({
          title: 'Task Created',
          text: "Task created successfully",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
          }).then((result) => {
            window.location.reload('/todo') 
          })
        }
      )
      .catch(err => {
          console.log(err.response)
      })
  }


  return (
    <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={5} textAlign="center" color="gray">
          Create Task
        </ModalHeader>

        <ModalBody textAlign="center" p={10}>
        <Box as="form" w="100%" alignItems="center" alignContent="center" display="flex" flexDirection="column">

          <InputGroup size="lg" mb={3} >
                <Input
                  color="gray"
                  type="text"
                  placeholder="Write the task you want to add"
                  name="name"
                  size="lg"
                  onChange={handleInput}
                />
          </InputGroup>
          <Button size="lg" 
          variantColor="blue"
          variant="solid"
          type="submit"
          alignSelf="center" 
          onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
        </ModalBody>

        <ModalFooter display="flex" alignItems="center" justifyContent="center">
          <Button size="lg" 
          variantColor="red"
          variant="solid"
          type="submit"
          alignSelf="center" 
          onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}