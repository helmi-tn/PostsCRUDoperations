import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Form.scss'
import axios from 'axios'


export default function Form({ setImages, images }) {
    const [postData, setPostData] = useState({
        username: "",
        description: "",
        selectedFile: "",
        tags: ""
    })



    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', postData.username)
        formData.append('description', postData.description)
        formData.append('tags', postData.tags)
        formData.append('selectedFile', postData.selectedFile)

        axios.post("http://localhost:5000/posts", formData)
            .then((res) => {
                console.log(res)
                setImages([...images, res.data])

            }).catch((message) => {
                console.log(message.error)

            })
    }


    return (

        <Box sx={{ flexGrow: 1 }} component='form' encType="multiple/form-data">

            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <React.Fragment>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={(e) => {
                                    setPostData({ ...postData, username: e.target.value })
                                }}
                                value={postData.username}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                onChange={(e) => {
                                    setPostData({ ...postData, description: e.target.value })
                                }} value={postData.description}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="tags"
                                label="Tags"
                                name="tags"
                                autoComplete="tags"
                                onChange={(e) => {
                                    setPostData({ ...postData, tags: e.target.value })
                                }} value={postData.tags}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <input
                                type='file'
                                filename="selectedFile"
                                onChange={(e) => {
                                    setPostData({ ...postData, selectedFile: e.target.files[0] })

                                }}
                            />

                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            style={{
                                marginTop: 8,
                                marginBottom: 3,
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            Submit
                        </Button>
                    </React.Fragment>
                </Grid>

            </Grid>

        </Box>
    );
}
