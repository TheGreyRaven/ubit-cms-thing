import { Card, CardActions, CardContent, CardMedia, Container, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { getAuthed, getRole, getPosts } from '../../utils/redux-auth'
import { useEffect, useState } from 'react'
import DeleteModal from '../Modals/DeletePost'
import EditModal from '../Modals/EditPost'
import CircularProgress from '@mui/material/CircularProgress'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const PostSection = () => {
    const { postId } = useParams()
    const authed = useSelector(getAuthed)
    const role = useSelector(getRole)
    const postData = useSelector(getPosts)
    const postIndex = postData.findIndex(p => p.postId === Number(postId)) // Find the index of our post in the cache

    const [editModal, openEditModal] = useState(false)
    const [deleteModal, openDeleteModal] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [singlePost, setSinglePost] = useState([])

    const handleDelete = (value) => {
        if (!authed || role === 'user') { // Only admins and editors should be able to delete posts.
            return
        }

        openDeleteModal(value)
    }

    const handleEdit = (value) => {
        if (!authed || role === 'user') { // Only admins and editors should be able to edit posts.
            return
        }

        openEditModal(value)
    }

    useEffect(() => {
        const posts = async () => {
            if (postData.length !== 0) { // Already have cached posts
                return setLoading(false)
            }

            setLoading(true)
            const raw = await fetch('https://localhost:5001/api/get-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: Number(postId)
                })
            })
            const response = await raw.json()
            await sleep(1000)

            setSinglePost(response)
            setLoading(false)
        }
        posts()
    }, [postId, postData])

    if (isLoading) {
        return (
            <Container maxWidth='md'>
                <Box padding={2}>
                    <Card>
                        <CardContent>
                            <CircularProgress style={{ marginLeft: '45%' }}/>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        )
    }

    return (
        <>
            <DeleteModal open={deleteModal} close={openDeleteModal} id={postId}/>
            <EditModal open={editModal} close={openEditModal} id={postId} />

            <Container maxWidth='md'>
                <Box padding={2}>
                    <Card>
                        <CardMedia
                            component='img'
                            height='140'
                            image={postData[postIndex]?.imageURL || singlePost.imageURL}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {postData[postIndex]?.postTitle || singlePost.postTitle}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' style={{ whiteSpace: 'pre-line' }}>
                                {postData[postIndex]?.postBody || singlePost.postBody}
                            </Typography>

                            {authed && role !== 'User' && (
                                <CardActions disableSpacing>
                                    <IconButton aria-label='edit post' onClick={() => handleEdit(!editModal)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton aria-label='remove post' onClick={() => handleDelete(!deleteModal)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export default PostSection