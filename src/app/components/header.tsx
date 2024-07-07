import "../styles/header.css";
import { useTranslations } from "next-intl";

export default function Header(){

    const t = useTranslations("Header");
    return(
        <div className="headerContainer">
            <div className="title">
                <h1> {t("TITLE")} </h1>
            </div>
        </div>
        
    )
}