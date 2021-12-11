import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, savePosts } from '../../utils/redux-auth'

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

const DeletePost = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const postData = useSelector(getPosts)
    const postIndex = postData.findIndex(p => p.postId === Number(props.id)) // Find and return the index of the post in our cached posts array

    const deletePost = async (e) => {       
        await fetch('https://localhost:5001/api/delete-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: props.id
            })
        })

        const newPosts = [...postData] // Create new array with the cached posts so we can modify it
        newPosts.splice(postIndex, 1) // Remove the post from our cache
        
        dispatch(savePosts(newPosts)) // Store the new posts array to the cache
        props.close(!props.open)
        navigate('/', { replace: true })
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
                    <Stack spacing={2}>
                        <Typography variant='h6' component='h2'>
                            Are you sure?
                        </Typography>
                        <Button variant='outlined' color='error' onClick={() => deletePost()} endIcon={<DeleteIcon />}>Yes, delete it</Button>
                        <Button variant='outlined' onClick={() => props.close(!props.open)}>No, never mind</Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    )
}

export default DeletePost