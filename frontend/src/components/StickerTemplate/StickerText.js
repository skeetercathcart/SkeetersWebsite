import '../../css/stickertemplate.css'


const StickerText = ({ addText, setAddText, prodText, setProdText}) => {

    return (
        <div className = "info-box">
            <textarea rows = {2} className = "add-box"  value = {addText} onChange = {e => {setAddText(e.target.value)}}></textarea>
            <input className = "prod-box"  value = {prodText} onChange = {e => {setProdText(e.target.value)}}></input>
        </div>
   
    )
    
}

export default StickerText