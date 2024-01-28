import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import InputFiles from './components/InputFiles'
import FilesTable from './components/FilesTable'

export default function App() {
  const [clicked, setClicked] = useState(0)
  return (
    <>
      <Header />
      <div className='mainContainer'>

        <InputFiles setClicked={setClicked} clicked={clicked} />
        <FilesTable clicked={clicked} />
      </div>
      <Footer />
    </>
  )
}
