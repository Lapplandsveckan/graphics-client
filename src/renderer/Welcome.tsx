import './Welcome.css';
import {useLayoutEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';

export interface WelcomeProps {
    onFinished: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onFinished }) => {
    const app = useRef<HTMLDivElement>(null);
    const [animation, setAnimation] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (!animation) return;

        let ctx = gsap.context(() => {
            gsap.to(app.current, {
                duration: 1.6,
                opacity: 0,
                ease: 'power2.inOut',
                onComplete() {
                    onFinished();
                },
            });
        }, app);

        return () => ctx.revert();
    }, [animation]);

    return (
        <div className="welcome-bg" ref={app}>
            <div className="welcome">
                <h1>Welcome to CG Control</h1>
                <p>Here you will be able to master the ability of controlling marvelous graphics in real time.</p>

                <a onClick={() => setAnimation(true)}>Click here to start your journey</a>
            </div>
        </div>
    );
};
