import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { getAuthed, getRole } from '../../utils/redux-auth'
import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

const NewUser = (props) => {
    const role = useSelector(getRole)
    const authed = useSelector(getAuthed)

    const [userRole, setRole] = useState('Admin')

    const handleChange = (event) => {
        setRole(event.target.value)
    }

    const createUser = async (e) => {
        e.preventDefault()

        if (role !== 'Admin' || !authed) { // Only admins should be able to create new users
            return
        }

        const username = document.getElementsByName('username')[0].value // Should have used hooks but here too.
        const password = document.getElementsByName('password')
        const userRole = document.getElementsByName('role-select')[0].value

        if (password[0].value !== password[1].value) {
            return alert('Password does not match!')
        }

        const raw = await fetch('https://localhost:5001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password[0].value,
                role: userRole
            })
        })

        const response = await raw.json()

        if (response.status !== 'Error') {
            alert('User created!')
            return props.close(!props.open)
        }

        alert(`Error: ${response.message}`)
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={props.open}
            onClose={() => props.close(!props.open)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={props.open}>
                <Box sx={style}>
                    <form onSubmit={createUser}>
                        <Stack spacing={2}>
                            <Typography variant='h6' component='h2'>
                                Create a new user
                            </Typography>
                            <TextField label='Username' variant='outlined' name='username' required/>
                            <TextField label='Password' variant='outlined' name='password' required type='password' />
                            <TextField label='Verify password' variant='outlined' name='password' required type='password' />
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select value={userRole} onChange={handleChange} label='Role' name='role-select' >
                                    <MenuItem value='Admin'>Admin</MenuItem>
                                    <MenuItem value='Editor'>Editor</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant='outlined' type='submit'>Create user</Button>
                        </Stack>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default NewUser