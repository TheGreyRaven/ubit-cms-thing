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

const EditPost = (props) => {
    const dispatch = useDispatch()
    const postData = useSelector(getPosts)
    const postIndex = postData.findIndex(p => p.postId === Number(props.id))

    const updatePost = async (e) => {
        e.preventDefault()
        
        const imageUrl = document.getElementsByName('image-url')[0].value
        const postTitle = document.getElementsByName('post-title')[0].value
        const postBody = document.getElementsByName('post-body')[0].value

        await fetch('https://localhost:5001/api/update-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: props.id,
                imageURL: imageUrl,
                postTitle: postTitle,
                postBody: postBody
            })
        })

        const newPosts = [...postData] // Create new array with the cached posts so we can modify it
        newPosts.splice(postIndex, 1) // Remove the post from our cache
        newPosts.push({ // Push our modified post to the new post cache array
            postId: Number(props.id),
            imageURL: imageUrl,
            postTitle: postTitle,
            postBody: postBody
        })

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
                    <form onSubmit={updatePost}>
                        <Stack spacing={2}>
                            <Typography variant='h6' component='h2'>
                                Edit post
                            </Typography>
                            <TextField label='Direct Image URL' variant='outlined' name='image-url' />
                            <TextField label='Post Title' variant='outlined' name='post-title' />
                            <TextField label='Post body' variant='outlined' multiline minRows={10} name='post-body' />
                            <Button variant='outlined' type='submit'>Update post</Button>
                        </Stack>
                    </form>
                </Box>
            </Fade>
        </Modal>
    )
}

export default EditPost