import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import logo from '../assets/doge.png'
import { validateEmail, validateTextField } from '../utilities/validation'
import { TextField } from '../components/TextField'
import { login } from '../store/auth.slice'

export interface FormFields {
  email: string
  username: string
}

export interface FormErrors {
  email?: string
  username?: string
}

export const Login: React.FC = () => {
  const [user, setUser] = useState<FormFields>({ email: '', username: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const dispatch = useDispatch()

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'email':
        setErrors({ ...errors, [name]: validateEmail(value) })
        break
      case 'username':
        setErrors({ ...errors, [name]: validateTextField(value) })
        break
    }
  }

  const isLoginButtonDisabled = () => {
    // Both login fields need to be filled out and free of errors before user can submit
    if (!user.email || !user.username) {
      return true
    }
    if (!!errors.email || !!errors.username) {
      return true
    }

    return false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value,
    })

    if (errors[name as keyof FormErrors]) {
      validate(name, value)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    validate(name, value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(login(user))

    // Instead of logging in user via actual persistent session, save in localStorage
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container bg-white m-4 p-12 w-500 text-center rounded-md shadow-lg max-w-full mx-auto">
        <img src={logo} className="block mx-auto mb-3 text-center w-24" alt="Doge" />

        <h1 className="text-3xl mb-8 font-bold text-gray-700">Chat Sign In</h1>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            value={user.email}
            placeholder="doge@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <TextField
            label="Username"
            name="username"
            value={user.username}
            placeholder="floppydiskette"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
          <div className="mb-3">
            <button
              className="w-full px-3 py-4 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none"
              disabled={isLoginButtonDisabled()}
            >
              Sign in
            </button>
          </div>
          <p className="text-left text-gray-400 text-sm">Don't have an account yet? That's fine.</p>
        </form>
      </div>
    </div>
  )
}
