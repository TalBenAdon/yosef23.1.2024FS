import React, { useState } from 'react'
import { CgAdd } from "react-icons/cg";
import { useRef } from 'react';
import axios from 'axios';

export default function InputFiles({ setClicked, clicked }) {
    // const [newformData, setNewFormData] = useState(new FormData())
    const [filesToUpload, setFilesToUpload] = useState([])


    const fileInputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        // console.log([...formData]);
        try {
            const res = await axios.post('http://localhost:4000/uploads', formData)
            setFilesToUpload([])
            e.target.reset()

            if (clicked === 0) {
                setClicked(1)
            } else {
                setClicked(0)
            }

        } catch (error) {
            console.log(error);
        }
    }



    const addFilesForUpload = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files
        const fileNames = [...selectedFiles].map(file => file.name)
        setFilesToUpload(fileNames)
        console.log('File Name', fileNames);
    }


    return (
        <div className='inputFilesContainer'>
            <form onSubmit={handleSubmit} >
                <input type="file" name="file" multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
                <div>

                    <button type='button' className='uploadButton' onClick={addFilesForUpload} style={{ cursor: 'pointer' }}>
                        <CgAdd size={40} />
                    </button>
                    {filesToUpload.map(fileName => <div>{fileName}</div>)}
                    <button type='submit'>Upload</button>
                </div>
            </form >
        </div >
    )
}
