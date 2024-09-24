import Button from "@mui/material/Button";

interface Props{
    click: any,
    translation: string,
}

export default function DefaultButton (props:Props){
    return(
            <Button variant="outlined" onClick={props.click}>
                {props.translation}
            </Button>
    );
};