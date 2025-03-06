import { redirect } from "next/navigation";
import { auth } from "./auth"

export const requireUser = async () => {
    const session = await auth();
    if (!session?.user) {
        const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
        return redirect(`/?redirect=${currentUrl}`);
    }
    return session;
};

