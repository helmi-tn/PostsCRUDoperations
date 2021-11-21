import React, { useEffect, useState } from 'react';
import "./Cards.scss";
import axios from 'axios';
import Popup from './Popup';
import { TextField } from '@mui/material';
import Form from './Form/Form';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';




function Cards() {

    const [images, setImages] = useState([]);
    const [image, setImage] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    // const [isPut, setIsPut] = useState(false)
    const [updatedItem, setUpdatedItem] = useState({
        username: "",
        description: "",
        selectedFile: "",
        tags: ""

    })

    useEffect(async () => {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/posts');
        const data = await response.data;
        console.log(data)
        setImages(data);
        setLoading(false);
    }, [])

    function deletePost(id, image) {
        axios.delete(`http://localhost:5000/posts/delete/${id}`)
        setImages(images.filter((photo) => photo._id !== image._id))

        alert('Post deleted');
        console.log(`deleted item with id : ${id}`)
    }

    const [open, setOpen] = React.useState(false);

    function handleClickOpen(id) {
        setOpen(true);
        console.log(id)
        console.log(updatedItem)

        // setIsPut(true)
        setUpdatedItem((prevPost) => {
            return {
                ...prevPost,
                id: id
            }
        })
    };
    function updateItem(e, id) {

        e.preventDefault();

        const formData = new FormData();
        formData.append('username', updatedItem.username)
        formData.append('description', updatedItem.description)
        formData.append('tags', updatedItem.tags)
        formData.append('selectedFile', updatedItem.selectedFile)


        axios.put(`http://localhost:5000/posts/put/${id}`, formData)
            .then((res) => {
                console.log(res)
                setImages(images.map((photo) =>
                    photo._id === res.data._id ? res.data : photo

                ))

            }).catch((message) => {
                console.log(message.error)

            })

        console.log(`Post with id: ${id} updated`)
    }
    function handleClose() {
        setOpen(false);
    };
    function likePost(id, likes) {
        axios.put(`http://localhost:5000/posts/likePost/${id}`, likes)
            .then((res) => {
                console.log(res.data)
                setImages(images.map((photo) =>
                    photo._id === res.data._id ? res.data : photo
                ))
            })
            .catch((message) => {
                console.log(message.error)
            })
    }


    return (
        <>
            <Form updatedItem={updatedItem} setUpdatedItem={setUpdatedItem} setImages={setImages} images={images} />

            {images.length == 0 ?
                null
                :
                <TextField
                    margin="dense"
                    id="name"
                    label="Search by username"
                    type="text"
                    fullWidth
                    placeholder="Search by username"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent: 'center',
                        width: '1000px',
                    }}
                />

            }




            {loading ?
                <CircularProgress style={{

                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px',
                    color: "#EF94A6",
                }} /> :
                <>
                    {images.length == 0 ?

                        <Typography align='center' variant='h5' style={{
                            fontFamily: 'sans-serif',
                            marginTop: '10px'
                        }}>
                            No Posts
                        </Typography>

                        :

                        <><ul class="cards">
                            <Popup image={image} />

                            {images.filter((image) => {
                                if (search === '') {
                                    return image
                                }
                                else if (image.username.toLowerCase().includes(search.toLowerCase())) {
                                    return image

                                }


                            }).map((image) => {
                                return (
                                    <li key={image._id}>
                                        <a class="button" href="#popup" className="card" onClick={async () => await setImage(image)}>
                                            <img src={`/uploads/${image.selectedFile}`} className="card__image" alt="" />
                                            <div className="card__overlay">
                                                <div className="card__header">
                                                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                                    {/* <img className="card__thumb" src={image.user.profile_image.small} alt="" /> */}
                                                    <div className="card__header-text">
                                                        <h3 className="card__title">{image.username}</h3>
                                                    </div>
                                                </div>
                                                <p className="card__description">{image.description || 'No description'}</p>
                                            </div>
                                        </a>
                                        <span className="card__status">
                                            {image.likes} Likes
                                            <i class="far fa-heart" style={{ marginLeft: '5px', color: 'red', cursor: 'pointer' }} title='Like' onClick={() => {
                                                likePost(image._id, image.likes)
                                            }}></i>
                                        </span>
                                        <span style={{
                                            cursor: 'pointer'
                                        }} >
                                            <i class="fas fa-trash" onClick={() => {
                                                deletePost(image._id, image)
                                            }} title='Delete'></i>

                                        </span>
                                        <span style={{
                                            cursor: 'pointer'
                                        }} >
                                            <i class="fas fa-pencil-alt" onClick={() => {
                                                // openUpdate(image._id)
                                                handleClickOpen(image._id)
                                            }} title='Edit'></i>
                                        </span>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Update</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    To update the post, please fill all the fields.
                                                </DialogContentText>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    name="username"
                                                    autoComplete="username"
                                                    onChange={(e) => {
                                                        setUpdatedItem({ ...updatedItem, username: e.target.value })
                                                    }}
                                                    value={updatedItem.username}

                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="description"
                                                    label="Description"
                                                    name="description"
                                                    autoComplete="description"
                                                    onChange={(e) => {
                                                        setUpdatedItem({ ...updatedItem, description: e.target.value })
                                                    }}
                                                    value={updatedItem.description}

                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="tags"
                                                    label="Tags"
                                                    name="tags"
                                                    autoComplete="tags"
                                                    onChange={(e) => {
                                                        setUpdatedItem({ ...updatedItem, tags: e.target.value })
                                                    }}
                                                    value={updatedItem.tags}

                                                />
                                                <input
                                                    type='file'
                                                    filename="selectedFile"
                                                    onChange={(e) => {
                                                        setUpdatedItem({ ...updatedItem, selectedFile: e.target.files[0] })

                                                    }}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button onClick={(e) => {
                                                    updateItem(e, updatedItem.id);
                                                    handleClose()
                                                }}
                                                >Update</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </li>
                                )
                            })}

                        </ul></>
                    }
                </>
            }
        </>
    )
}

export default Cards