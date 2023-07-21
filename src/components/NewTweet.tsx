import React from 'react'
import { Button } from './ui/button'
import { RiQuillPenFill } from 'react-icons/ri'
import { useSession } from 'next-auth/react'
import { ProfileImage } from './ProfileImage'

export default function NewTweet() {

    const session = useSession()

    if (session.status !== 'authenticated') return;
    return (
        <>
            <form className='flex flex-col gap-2 px-4 py-2'>
                <div className='flex gap-4'>
                    <ProfileImage src={session.data.user.image} />
                    <textarea className='flex-grow resize-none overflow-hidden p-4 text-lg outline-none bg-au-dark-900 border-2 border-au-dark-700 rounded-md' placeholder='Me cago en figueres' />
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <Button size={'lg'} icon={<RiQuillPenFill />}>Autistear</Button>
            </div>
        </>
    )
}
