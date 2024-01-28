import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function FilesTable({ clicked }) {
    const [tableFiles, setTableFiles] = useState([])
    const [handlerClicked, setHandlerClicked] = useState(false)
    const handleDeleteFile = async (fileName) => {
        await axios.delete(`http://localhost:4000/uploads/${fileName}`)
        if (!handlerClicked) {
            setHandlerClicked(true)
        } else {
            setHandlerClicked(false)
        }
    }
    useEffect(() => {
        try {

            axios.get('http://localhost:4000/uploads')
                .then(res => setTableFiles(res.data))
            // .then(console.log(tableFiles))
        } catch (error) {
            console.log(error);
        }
    }, [clicked, handlerClicked])

    return (
        <div className='filesTableContainer'>
            <table>
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {tableFiles.map((file) => {
                        return <tr>
                            <td>{file.name}</td>
                            <td>{file.fileSizeBytes}</td>
                            <td><button onClick={() => handleDeleteFile(file.name)}>🎪</button></td>
                        </tr>
                    })}

                </tbody>
            </table>

        </div>
    )
}
