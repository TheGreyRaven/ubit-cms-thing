import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { signin } from '../../utils/redux-auth'
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

const LoginModal = (props) => {
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const doSignIn = async (e) => {
        e.preventDefault()
        setLoading(true)

        const username = document.getElementsByName('username')[0].value // Should have used hooks but here we grab the username and below the password.
        const password = document.getElementsByName('password')[0].value

        const raw = await fetch('https://localhost:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const response = await raw.json()

        setLoading(false)
        if (response.status) { // Something went wrong, notify the user.
            return alert('Please verify login!')
        }

        dispatch(signin({ role: response.role, jwt: response.token })) // Cache the role and JWT
        props.close(!props.open)
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={props.open}
            onClose={() => props.close(!props.open)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={style}>
                    <form onSubmit={doSignIn}>
                        <Stack spacing={2}>
                            <Typography variant='h6' component='h2'>
                                Please sign in
                            </Typography>
                            <TextField disabled={isLoading} label='Username' variant='outlined' name='username' required />
                            <TextField disabled={isLoading} label='Password' variant='outlined' name='password' required type='password' />
                            <Button disabled={isLoading} variant='outlined' type='submit'>Sign in</Button>
                        </Stack>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default LoginModal