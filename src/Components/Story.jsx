import React from "react"


export const Story = ({src, name}) => {
    return (
        <>
            <div className=" border-2 border-red-500 w-16 h-16 rounded-full mt-2 ml-4 cursor-pointer">
                <img src={src} alt="" className="rounded-full h-14 w-14 pl-1 pt-1" />
                <p className="truncate text-sm pt-1 pl-2">{name}</p>
            </div>
        </>
    )
}