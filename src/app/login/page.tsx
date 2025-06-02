'use client'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/authSlice'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RootState } from '../../redux/store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const error = useSelector((state: RootState) => state.auth.error)

  const handleLogin = () => {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => router.push('/signup')}>Register Page</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
