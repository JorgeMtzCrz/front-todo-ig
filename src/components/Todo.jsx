import React, { useState, useEffect } from 'react'
import { Flex, Heading, Text, Button, Badge, Box, Spinner } from '@chakra-ui/core'
import AUTH_SERVICE from '../services/index'
import ModalTask from './ModalTask'
import {allTask} from '../hooks/useTasks'
import TASK_SERVICE from '../services/taskServices'
import Swal from 'sweetalert2'

export default function Todo({history}) {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  const {data} = allTask()
  const tasks = data && data.tasks
  
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!loggedUser) return history.push('/')

  }, [loggedUser, history])

  const handleDelete = async (e,id) => {
    TASK_SERVICE.DELETE(id)
      .then(({data}) => {
        Swal.fire({
          title: 'Task Deleted',
          text: "Task deleted successfully",
          icon: 'error',
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
  const handleUpdate = async (e,id) => {
    let data ={
      finish: loggedUser.email
    }
    TASK_SERVICE.UPDATE(id,data)
      .then(({data}) => {
        Swal.fire({
          title: 'Task Updated',
          text: "Task updated successfully",
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

  const handleLogout = (props) =>{
    AUTH_SERVICE.LOGOUT()
      .then(({data}) => {
        localStorage.removeItem('loggedUser')
        history.push('/')
        }
      )
      .catch(err => {
          console.log(err)
      })
  }

  const openModal = () =>{
    setOpen(true)
  }
  const closeModal = () =>{
    setOpen(false)
  }
  if(!tasks) return (  
    <Box as="main" display="flex" pt={3}  alignItems="center" alignContent="center" justifyContent="center" justifyItems="center"  boxSizing="border-box" h="85vh" w="100%">
    <Spinner size="xl" />
    </Box>
  )
  return (
    <>
    <Box display="flex" justifyContent="flex-end" pt={5} pr={2}>
      <Button m={2} variantColor="none" color="black" onClick={handleLogout}>Logout</Button> 
    </Box>
    <Box as="main" display="flex" pt={3}  alignItems="center" alignContent="center" flexDirection="column"  boxSizing="border-box" h="85vh" w="100%">
          <Heading as="h2" size="lg" mb={5}>
               TODO LIST
          </Heading>
          <Box color="gray" mt={6} alignSelf="center" alignItems="flex-end">
            <Button variantColor="blue" onClick={openModal}>Create Task</Button>
          </Box>
          
            <Box display="flex"  mt={5} alignItems="center" alignContent="center" w="100%" justifyContent="center" flexDirection="row" flexWrap="wrap">
            {  tasks.map((e,i) =>(

            <Box key={i} display="flex" alignContent="center" alignItems="center" flexDirection="column" w="30%">
              <Flex align="baseline" mt={2}>
                <Badge variantColor={e.status==="Uncompleted" ? "pink" : "green"}>{e.status}</Badge>
              </Flex>
              <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                {e.name}
              </Text>
              <Text mt={2}>Finish by: </Text>
              <Flex mt={2} align="center">
              {e.finishBy ? e.finishBy : '---'}
              </Flex>
              <Button m={2} variantColor="green" onClick={()=>handleUpdate(e, e._id)}>Finish</Button> 
              <Button visibility={e.userId._id === loggedUser._id ? 'visible': "hidden"} m={2} variantColor="red" onClick={()=>handleDelete(e, e._id)}>Delete</Button>
            </Box> 
            ))}
            
          </Box>
          
    </Box>
    <ModalTask isOpen={open} onClose={closeModal} />
    </>
  )
}