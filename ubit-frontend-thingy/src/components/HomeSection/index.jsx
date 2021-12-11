import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, savePosts } from '../../utils/redux-auth'
import CircularProgress from '@mui/material/CircularProgress'

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Card for our post data
const PostCard = (props) => {
    const navigate = useNavigate()
    return (
        <Card>
            <CardActionArea onClick={() => navigate(`/post/${props.post.postId}`, { replace: true })}>
                <CardMedia
                    component='img'
                    height='140'
                    image={props.post.imageURL}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {props.post.postTitle}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {props.post.postBody.substring(0, 250)}...
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const HomeSection = () => {
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const postData = useSelector(getPosts)

    useEffect(() => {
        if (postData.length !== 0) { // Posts are cached so just return
            return
        }

        const posts = async () => {
            setLoading(true)
            const raw = await fetch('https://localhost:5001/api/posts')
            const response = await raw.json()
            await sleep(1000) // Small sleep just to show the spinner

            if (response.length !== 0) {
                dispatch(savePosts(response)) // Cache all posts
                setLoading(false)
            } else {
                alert('There are no posts! :(')
            }
        }
        posts()
    })

    // Display spinner
    if (isLoading) {
        return (
            <Container maxWidth='md'>
                <Grid container padding={2} spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <CircularProgress style={{ marginLeft: '45%' }}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    return (
        <Container maxWidth='md'>
            <Grid container padding={2} spacing={2}>
                {postData.map((data, index) => {
                    return (
                        <Grid item xs={12} sm={6} key={index}>
                            <PostCard post={data} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default HomeSection