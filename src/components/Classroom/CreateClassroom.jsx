import React, { useState, useEffect, useRef } from 'react'
import autosize from 'autosize';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import ClassIcon from '@material-ui/icons/Class';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VideocamIcon from '@material-ui/icons/Videocam';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, ModalBody} from "reactstrap";
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
import CircularProgress from '@material-ui/core/CircularProgress';



const CreateClassroom = (props) => {
    let TextArea = useRef(null);
    const classes = useStyles();
    const [values, setValues] = useState({
        description: "",
        className: "",
        fieldName: "",
        classLevel: "",
        meetLink: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const storeData = useSelector(selectUserData);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("https://ocms-backend.vercel.app/classes/createClassroom", {
            adminName: storeData.userName,
            adminEmail: storeData.userEmail,
            desc: values.description,
            className: values.className,
            meetLink: values.meetLink,
            fieldName: values.fieldName,
            classLevel: values.classLevel
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        )
        .then((res)=>{
            console.log(res);
            console.log("Created");
            props.setShow(false);
            window.location.reload(false);
            setLoading(false);
        })
        .catch(err => {
            setError(err.response.data.message);
            setLoading(false);
        });
    }
    useEffect(() => {
        autosize(TextArea);
    }, [])

    return (
        <>
        <Modal
        className="assignment_modal"
            isOpen={props.isModalOpen}
            toggle={props.toggleModal}
            >
            <ModalBody>

        <div style={{ backgroundColor: "white" }}>
            <div className="container">
                <div className="row justify-content-sm-center"> 
                    <div className="col-12 pb-0">
                        <h1 style={{color:"rgb(90,90,90)"}} className="text-center mb-4 fs-2">Create Classroom</h1>
                        <form onSubmit={handleSubmit}  >
                           

                            {
                                loading ? (
                                    <div className="d-flex justify-content-center mb-4">
                                        <CircularProgress />
                                    </div>
                                ) : null
                            }

                            <button type="submit" style={{display:"flex",justifyContent:"center"}} className="m-auto mt-2 form-btn">Create</button> 
                        </form>
                    </div>
                </div>
            </div>
        </div >
            </ModalBody>
            </Modal>
        </>
    )
}

export default CreateClassroom
