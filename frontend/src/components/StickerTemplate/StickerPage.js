import '../../css/stickertemplate.css'
import { useState, useEffect } from 'react'
import Sticker from './Sticker'
import DesignSticker from './DesignSticker'



const StickerPage = () => {

    const [addText, setAddText] = useState("Store #2828 \n4550 Pheasant Ridge Dr NE \n(763)-717-0316")
    const [prodText, setProdText] = useState("Here is some information for the product")

    return (
        <div className = "sticker-container">
            <div className = "sticker-design">
                <DesignSticker prodText = {prodText} setProdText = {setProdText} addText = {addText} setAddText = {setAddText}></DesignSticker>
            </div>
            <div className = "sticker-sheet">
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
        </div>
    )
    
}

export default StickerPage