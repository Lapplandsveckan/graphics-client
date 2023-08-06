import './Welcome.css';
import {useLayoutEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';

export interface WelcomeProps {
    onFinished: () => void;
}

export const WelcomeAnimator: React.FC<WelcomeProps> = ({ onFinished }) => {
    const app = useRef<HTMLDivElement>(null);
    const [animating, setAnimating] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (!animating) return;

        const ctx = gsap.context(() => {
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
    }, [animating]);

    return (
        <div className="welcome-bg" ref={app}>
            <div className="welcome">
                <h1>Welcome to CG Control</h1>
                <p>Here you will be able to master the ability of controlling marvelous graphics in real time.</p>

                <a onClick={() => setAnimating(true)}>Click here to start your journey</a>
            </div>
        </div>
    );
};

export const Welcome: React.FC<WelcomeProps> = ({ onFinished }) => {
    const [animated, setAnimated] = useState<boolean>(false);
    if (animated) return null;

    return (
        <WelcomeAnimator onFinished={() => {
            setAnimated(true);
            onFinished();
        }} />
    );
};