import './Layout.css'
import { Link, Outlet } from 'react-router-dom'

const links = [
  { to: '/', text: 'See messages' },
  { to: '/add', text: 'Add message' },
]

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              <li>{link.text}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export const Layout = () => {
  return (
    <div className='layout'>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout
