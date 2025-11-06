import '../../css/stickertemplate.css'
import StickerText from './StickerText'


const DesignSticker = ({ addText, setAddText, prodText, setProdText }) => {

    return (
        <div className = "design-sticker">
            <img src = "https://corporate.homedepot.com/sites/default/files/image_gallery/THD_logo.jpg" className = "img-box"></img>
            <StickerText addText = {addText} setAddText = {setAddText} prodText = {prodText} setProdText = {setProdText}></StickerText>
        </div>
    )
    
}

export default DesignSticker