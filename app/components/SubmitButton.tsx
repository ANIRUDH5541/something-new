"use client";

import React from 'react';
// import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
    logo?: string | undefined | null;
    text: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    type?: "submit" | "button";
    className?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ logo, text, variant, type, className }) => {
    // const { pending } = useFormStatus();
    return (
        <>
            {/* {pending ? (
                <Button disabled variant={variant || "outline"} className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
                </Button>
            ) : ( */}
                <Button className={cn("w-full",className)} type={type || "submit"} variant={variant || "outline"}>
                    {logo && <Image src={logo} alt={`logo`} className="size-4 mr-2" />}
                    {text}
                </Button>
            {/* )} */}
        </>
    );
};

export default SubmitButton;
