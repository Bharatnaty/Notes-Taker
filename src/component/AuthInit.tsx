'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'

export function AuthInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const { email, password } = JSON.parse(userData)
      dispatch(login({ email, password }))
    }
  }, [dispatch])

  return null
}
