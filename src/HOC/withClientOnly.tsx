import React, {useEffect, useState} from "react";

export function withClientOnly<P extends React.JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
    return function ClientOnly(props: P) {
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
        }, []);

        if (!mounted) {
            return (<div style={{visibility: "hidden"}}>
                    Loading...
                </div>);
        }

        return <Component {...props} />;
    };
}
