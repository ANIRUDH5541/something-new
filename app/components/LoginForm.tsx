import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import GoogleLogo from '@/public/public/google.svg'
import GithubLogo from '@/public/public/github.svg'
import SubmitButton from './SubmitButton'
import { signIn } from '@/app/lib/auth'

const LoginForm = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Get Started</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[360px]'>
                <DialogHeader className='flex flex-row gap-2 justify-center items-center'>
                    {/* <Image src={Logo} alt='Logo' className='size-8' /> */}
                    <h4 className='text-2xl font-semibold'>
                        Somethin<span className='text-primary'>new</span>
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form action={async()=>{
                         "use server";
                        await signIn("google")
                    }}>
                    <SubmitButton logo={GoogleLogo} text="Sign in with Google" />
                    </form>
                    <form action={async()=>{
                        "use server";
                        await signIn("github")
                    }}>
                    <SubmitButton logo={GithubLogo} text="Sign in with Github" />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginForm;