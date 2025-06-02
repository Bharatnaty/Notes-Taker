// components/Header.js
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { logout } from '../redux/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

   const dispatch = useDispatch()
    const router = useRouter()
  const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/"><Image src="/images1.png" height={"60"} width={"60"} alt='Notes taker' priority/></Link>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <div onClick={handleLogout}>Logout</div>
      </nav>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
