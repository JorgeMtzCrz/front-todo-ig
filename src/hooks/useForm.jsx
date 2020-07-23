import { useState } from 'react'

export default () => {
  const [form, setForm] = useState({})

  const handleInput = e => {
    e.persist()
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return [form, handleInput]
}