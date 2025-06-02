'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/authSlice'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    dispatch(register({ username, email, password }))
    router.push('/login')
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
      <button onClick={() => router.push('/login')}>Login</button>
    </div>
  )
}
