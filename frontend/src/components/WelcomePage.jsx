
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
`;

const Heading = styled.h1`
    font-size: 36px;
    font-weight: bold;
    text-align: center;
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

const AnimatedLetter = styled.span`
    display: inline-block;
    opacity: 0;
    animation: ${({ isVisible }) => isVisible ? fadeIn : fadeOut} 0.5s forwards;
    animation-delay: ${(props) => props.delay}s;
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

    /* Responsive styles */
    @media (max-width: 768px) {
        font-size: 24px; /* Adjust font size for smaller screens */
        animation-delay: ${(props) => props.delay * 0.5}s; /* Increase animation delay for smoother animation */
    }

    @media (max-width: 480px) {
        font-size: 18px; /* Further reduce font size for very small screens */
        animation-delay: ${(props) => props.delay * 1}s; /* Increase animation delay even more */
    }
`;


const WelcomePage = ({ onComplete, duration }) => {
    const text = "Welcome To Trip Planner";

    useEffect(() => {
        const timeout = setTimeout(() => {
            onComplete();
        }, duration); 
        return () => clearTimeout(timeout);
    }, [onComplete, duration]);

    return (
        <FullPageContainer>
            <Heading>
                {text.split("").map((char, index) => (
                    <AnimatedLetter key={index} delay={index * 0.1} isVisible={true}>
                        {char}
                    </AnimatedLetter>
                ))}
            </Heading>
        </FullPageContainer>
    );
};

export default WelcomePage;



















