import {childrenProps} from "@/types/ChildrenProps"
export default function RequestLayout({children}:childrenProps)
{
    return (
        <main className=" flex justify-center items-center bg-slate-100 min-h-screen">
            <div className=" p-4  pb-10 w-[300px] bg-white rounded-xl">
                  {children}
            </div>
          
        </main>
    )
}