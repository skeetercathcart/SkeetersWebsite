import '../css/index.css'


const LandingPage = () => {
    return (
        <div className = "full-container">
            <div className = "about-text-container">
                <ul className = "intro-text">
                    <li className = "name-text"><strong>Skeeter Cathcart</strong></li>
                    <li>Passionate developer, life-long learner from the Twin Cities.</li>
                    <li>Computer Science graduate from Minnesota State University, Mankato.</li>
                    <br></br>
                    <li>Welcome to my website portfolio!</li>
                    <li>I created this using a MERN stack and hosted with Render.</li>
                    <br></br>
                    <li>Note: The backend spins up on-demand, so thing like Runescape Calc may take a moment to load.</li>
                </ul>
                <div className = "socials-container">
                    <a href = "https://github.com/skeetercathcart">
                        <img  className = "socials-link" style ={{border: '2px black solid', borderRadius: '100%'}} src = "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" height = "44px" width = "44px" alt = "Github Logo"></img>
                     </a>
                    <a href = "https://www.linkedin.com/in/skeeter-cathcart-97b1bb307"> 
                        <img  className = "socials-link" src = "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" height = "50px" width = "56px" alt = "LinkedIn Logo"></img>
                    </a>
                </div>
            </div>
        
            <div className = "photo-container">
                <img style ={{border: '2px white solid', borderRadius: '100%'}} alt = "profile picture" src = "https://avatars.githubusercontent.com/u/101567663?v=4"></img>
            </div>
            
        </div>
        
    )
}

export default LandingPage