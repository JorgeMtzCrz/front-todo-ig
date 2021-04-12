import React, {  useEffect } from 'react'
import {  Heading, Input, InputGroup, Button, Box } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import AUTH_SERVICE from '../services/index'
import Swal from 'sweetalert2'

export default function Login({history}) {
  const [form, handleInput] = useForm()
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  
  useEffect(() => {
    if (loggedUser) return history.push('/todo')

  }, [loggedUser, history])

  const handleSubmit = async e => {
    e.preventDefault()
    AUTH_SERVICE.LOGIN(form)
      .then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
        history.push('/todo')
        }
      )
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'User or password incorrect',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
          }).then((result) => {
            window.location.reload('/todo') 
          })
      })
  }

  

  return (
    <Box as="main" display="flex" alignItems="center" alignContent="center" flexDirection="column" justifyContent="center" boxSizing="border-box" h="85vh" w="100%">
          <Heading as="h2"  size="lg" mb={5}>
              Welcome to Best Deal Denver CMS
          </Heading>
    
          <Heading as="h3" size="lg" mb={5}>
              Login
          </Heading>
      <Box as="form" w="100%" alignItems="center" alignContent="center" display="flex" flexDirection="column">
          
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                  name="email"
                />
          </InputGroup>
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="password"
                  onChange={handleInput}
                  placeholder="Password"
                  name="password"
                />
          </InputGroup>
          <Button
          mt={5}
          onClick={handleSubmit}
          width="30%"
          size="lg"
          variantColor="red"
          variant="solid"
          type="submit"
          alignSelf="center"
          >
            Login
          </Button>
          <Box color="gray" mt={6} alignSelf="center">
            <Link to="/signup">or Sign Up</Link>
          </Box>
      </Box>
      
    </Box>
  )
}