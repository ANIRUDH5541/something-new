import React from 'react'
import { signOut } from '../lib/auth';

const Logout = () => {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
            className="w-full"
        >
            <button
                type="submit"
                className="w-full text-left px-2 py-1"
            >
                Logout
            </button>
        </form>
    )
}

export default Logout