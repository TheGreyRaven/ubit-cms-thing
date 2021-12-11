import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
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

const NewPost = (props) => {
    const dispatch = useDispatch()
    const postData = useSelector(getPosts)

    const createPost = async (e) => {
        e.preventDefault()
        
        const imageUrl = document.getElementsByName('image-url')[0].value // Should have used hooks but here too.
        const postTitle = document.getElementsByName('post-title')[0].value
        const postBody = document.getElementsByName('post-body')[0].value

        const raw = await fetch('https://localhost:5001/api/create-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageURL: imageUrl,
                postTitle: postTitle,
                postBody: postBody
            })
        })
        const response = await raw.json()

        const newPosts = [...postData] // Create new array with the cached posts so we can modify it
        newPosts.push(response) // Push our modified post to the new post cache array
        dispatch(savePosts(newPosts)) // Store the new posts array to the cache
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
                    <form onSubmit={createPost}>
                        <Stack spacing={2}>
                            <Typography variant='h6' component='h2'>
                                Create a new post
                            </Typography>
                            <TextField label='Direct Image URL' variant='outlined' name='image-url' />
                            <TextField label='Post Title' variant='outlined' name='post-title'/>
                            <TextField label='Post body' variant='outlined' name='post-body' multiline minRows={10}/>
                            <Button variant='outlined' type='submit'>Create post</Button>
                        </Stack>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default NewPost