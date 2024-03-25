import {childrenProps} from "@/types/ChildrenProps"
export default function PostLayout({children}:childrenProps)
{
    return (
        <main className="p-4 flex justify-center bg-slate-100 min-h-screen">
            <div className=" p-4 max-w-md bg-white rounded-xl">
                  {children}
            </div>
          
        </main>
    )
}