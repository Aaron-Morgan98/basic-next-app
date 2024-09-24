import "../styles/footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";


export default function Footer(){
    return(
        <div className="footerContainer">
            <div className="footer">
                <p>{new Date().getFullYear()}  Aaron Morgan</p>
            </div>

            <div className="icons">
                <Link 
                href="https://uk.linkedin.com/in/aaron-morgan742" 
                target="_blank" rel="noopener moreferrer"  
                style={{ color: 'inherit', textDecoration: 'none' }}>
                    <LinkedInIcon />
                </Link>

                <Link 
                href="https://github.com/Aaron-Morgan98" 
                target="_blank" 
                rel="noopener moreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}>
                    <GitHubIcon />
                </Link>
            </div>
        </div>
    )
}