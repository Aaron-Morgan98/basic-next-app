import "../styles/footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Footer(){
    return(
        <div className="footerContainer">
            <div className="footer">
                <p>{new Date().getFullYear()}  Aaron Morgan</p>
            </div>
            <div className="icons">
                <LinkedInIcon />
                <GitHubIcon />
            </div>
        </div>
    )
}