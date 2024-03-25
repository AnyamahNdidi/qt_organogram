
import "@/style/globals.css"
import {childrenProps} from "@/types/ChildrenProps"
// import SearchBar from "./components/SearchBar"
import { Metadata } from "next"



export default function RootLayout({children}:childrenProps)
{
     
    return (
        <html>
        <body>
                {children}
            </body>
        </html>
    )
}