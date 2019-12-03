import Link from 'next/link';

const About = () => {
    return (
        <div>
            <Link href="/">
                <a title="Home Page">Home</a>
            </Link>
            <p>This is the About Page</p>
        </div>
    );
};

export default About;
