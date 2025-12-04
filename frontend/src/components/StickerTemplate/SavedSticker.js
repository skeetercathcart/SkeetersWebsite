import '../../css/stickertemplate.css'
import StickerText from './StickerText'


const SavedSticker = ({ addText, setAddText, prodText, setProdText }) => {

    const loadSticker = async () => {
        setAddText(addText);
        setProdText(prodText);
    }

    return (
        <div className = "saved-sticker" onClick = {loadSticker}>
            <img src = "https://corporate.homedepot.com/sites/default/files/image_gallery/THD_logo.jpg" className = "img-box"></img>
            <div className = "info-box">
                <textarea readOnly rows = {2} className = "saved-add-box"  value = {addText}></textarea>
                <textarea readOnly className = "saved-prod-box"  value = {prodText}></textarea>
            </div>
        </div>
    )
    
}

export default SavedSticker