import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface Props{
    click: any,
}

export default function MyButton (props:Props){
    return(
            <Button variant="outlined" onClick={props.click}>
                {/* {props.t("VIEW_BUTTON")} */}
                "test"
            </Button>
    );
};