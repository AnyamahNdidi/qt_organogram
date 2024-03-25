import { childrenProps } from "@/types/ChildrenProps"
import Header from "@/components/Header"


export default function GeneralLayout({ children }:childrenProps)
{
    return (
        <main  >  
             <Header/>
            {children}
        </main>
    )
}