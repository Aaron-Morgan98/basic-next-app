import Stack from "@mui/material/Stack";



export default function Button (props:any){
    return(
            <Button variant="outlined" onClick={props.handleMoreInfo}>
                {/* {props.t("VIEW_BUTTON")} */}
                "test"
            </Button>
    );
};