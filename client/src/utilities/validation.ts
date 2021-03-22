export const validateEmail = (email: string) => {
  if (email.trim() === '') {
    return 'Email is required'
  }

  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return 'Email is invalid'
  }
}

export const validateTextField = (value: string) => {
  if (value.trim() === '') {
    return 'Username is required'
  }

  if (/[^A-Za-z0-9_-]/.test(value)) {
    return 'Username can only contain letters, numbers, dashes, and underscores'
  }
}
