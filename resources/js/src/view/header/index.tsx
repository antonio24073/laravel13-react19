import type { HeaderProps } from "../../models/header.types";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function index(props: HeaderProps) {
    return (
        <>
            {(window.innerWidth < 992) ?
                <MobileHeader title={props.title}/>
                :
                <DesktopHeader />
            }
        </>
    )
}
