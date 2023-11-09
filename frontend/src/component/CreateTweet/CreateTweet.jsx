import React, {  useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import { BASE_URL } from '../../Config';
// import CONFIG_OBJ from '../../Config';

const CreateTweet = () => {

    const [show, setShow] = useState(false);

    const [img, setImg] = useState({ preview: '', data: '' });
    const [tweetdis, setTweetdis] = useState("");;

    const handleClose = () => {
        setShow(false);
        setImg("");

    }
    const handleShow = () => setShow(true);

    const handleImageIconClick = (event) => {
        event.preventDefault();
        
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImg(img)
    }


const handletweet=()=>{

}


    return (
        <div>
            <>
                <Button variant="primary" onClick={handleShow}>
                    Tweet
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="border-bottom pb-3">
                            <div>
                                <textarea
                                    onChange={(e) => setTweetdis(e.target.value)}
                                    type="text"
                                    placeholder="What's happening"
                                    className="bg-light rounded w-100 p-2">
                                </textarea>
                            </div>
                            <div style={{ boxSizing: 'border-box' }}>
                                <label htmlFor="imageupload" style={{ cursor: 'pointer' }} > <ImageIcon /></label>
                                <input type="file" className='d-none' id="imageupload" accept="image/*" onChange={handleImageIconClick} />
                                {img.preview && (
                                    <img src={img.preview} alt="Preview" className="p-2 w-100" style={{ height: "300px" }} />
                                )}

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        {img.preview && (
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        )}
                        <Button variant="primary" onClick={handletweet}>
                            Tweet
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div>
    )
}

export default CreateTweet;
