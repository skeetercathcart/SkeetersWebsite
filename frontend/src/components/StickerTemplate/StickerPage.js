import '../../css/stickertemplate.css'
import { useState, useEffect } from 'react'
import Sticker from './Sticker'



const StickerPage = () => {

    const [addText, setAddText] = useState("Store #2828 \n4550 Pheasant Ridge Dr NE \n(763)-717-0316")
    const [prodText, setProdText] = useState("Here is some information for the product")

    return (
        <div className = "sticker-container">
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
            <Sticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></Sticker>
        </div>
    )
    
}

export default StickerPage