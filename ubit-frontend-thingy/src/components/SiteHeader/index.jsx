import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import LoginModal from '../Modals/Login'
import UserModal from '../Modals/NewUser'
import PostModal from '../Modals/NewPost'
import { useSelector, useDispatch } from 'react-redux'
import { logout, getRole, getAuthed } from '../../utils/redux-auth'

const SiteHeader = () => {
    const authed = useSelector(getAuthed)
    const role = useSelector(getRole)
    const dispatch = useDispatch()

    const [loginModal, openLoginModal] = useState(false)
    const [userModal, openUserModal] = useState(false)
    const [postModal, openPostModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handlePost = (value) => {
        setAnchorEl(null)
        openPostModal(value)
    }

    const handleUser = (value) => {
        setAnchorEl(null)
        openUserModal(value)
    }

    const handleAccount = (value) => {
        if (authed) {
            return dispatch(logout())
        }

        setAnchorEl(null)
        openLoginModal(value)
    }

    return (
        <>
            <LoginModal open={loginModal} close={openLoginModal} />
            <PostModal open={postModal} close={openPostModal} />
            <UserModal open={userModal} close={openUserModal} />

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton size='large' edge='start' color='inherit' aria-label='menu' aria-haspopup={true} aria-expanded={open ? 'true' : undefined} sx={{ mr: 2 }} onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    width: '20ch'
                                },
                            }}
                        >
                            <MenuItem key='login' onClick={() => handleAccount(!loginModal)}>
                                {authed ? 'Sign out' : 'Sign in'}
                            </MenuItem>

                            {authed && role === 'Admin' && (
                                <MenuItem key='create-user' onClick={() => handleUser(!userModal)}>
                                    Create user
                                </MenuItem>
                            )}

                            {authed && (
                                <MenuItem key='create-post' onClick={() => handlePost(!postModal)}>
                                    Create post
                                </MenuItem>
                            )}
                        </Menu>

                        <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} >
                                uBit CMS Thingy
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default SiteHeader