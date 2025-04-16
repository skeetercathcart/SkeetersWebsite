import '../css/index.css'


const LandingPage = () => {
    return (
        <div className = "full-container">
            <div className = "about-text-container">
                <div className = "name-text">
                    Skeeter Cathcart
                </div>
                <div className = "about-text">
                    <p>Passionate developer, life-long learner from the Twin Cities</p>
                    <p>Graduate from Minnesota State University, Mankato</p>
                </div>
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
                <img style ={{border: '2px white solid', borderRadius: '100%'}} alt = "profile picture" src = "https://media.licdn.com/dms/image/v2/D4D03AQHjCemyUXor9A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714409943345?e=1745452800&v=beta&t=mWbTj0ZQg2ex8YqpH43ywxxyGH5AmVwwZUYj61GMK7U"></img>
            </div>
            
        </div>
        
    )
}

export default LandingPage