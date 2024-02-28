import React from 'react'


function About() {

    return (
        <>
            <div className="container pt-5 ">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Cloud Notes</h1>
                    <p className="lead">Cloud Notes is your go-to platform for creating and managing notes effortlessly in the cloud. Designed with simplicity and productivity in mind, our platform offers a range of features to streamline your note-taking experience.</p>
                    <hr className="py-4" />
                    <h2>Key Features:</h2>
                    <ul>
                        <li>User-Friendly Interface:</li>
                        <ul>
                            <li>Intuitive text editor for creating and formatting notes.</li>
                        </ul>
                        <li>Anywhere, Anytime Access:</li>
                        <ul>
                            <li>Access your notes seamlessly from any device with internet connectivity.</li>
                        </ul>
                        <li>Organize Your Thoughts:</li>
                        <ul>
                            <li>Categorize notes into folders with options for tags and labels.</li>
                        </ul>
                        <li>Powerful Search:</li>
                        <ul>
                            <li>Quickly find notes using our robust search functionality.</li>
                        </ul>
                        <li>Collaborate with Ease:</li>
                        <ul>
                            <li>Share notes and collaborate in real-time with others.</li>
                        </ul>
                        <li>Offline Convenience:</li>
                        <ul>
                            <li>Edit notes offline, with changes syncing once online.</li>
                        </ul>
                        <li>Security and Privacy:</li>
                        <ul>
                            <li>Ensuring data security through encryption and privacy settings.</li>
                        </ul>
                        <li>Stay on Track:</li>
                        <ul>
                            <li>Set reminders and receive notifications for important notes.</li>
                        </ul>
                    </ul>
                    <h2>Why Choose Cloud Notes?</h2>
                    <ul>
                        <li>Cross-Platform Compatibility:</li>
                        <ul>
                            <li>Access via web browsers or dedicated apps for various platforms.</li>
                        </ul>
                        <li>Version History:</li>
                        <ul>
                            <li>Maintain a version history for easy reverting to previous states.</li>
                        </ul>
                        <li>Integration-Friendly:</li>
                        <ul>
                            <li>Seamlessly integrate with other tools like calendars and task managers.</li>
                        </ul>
                    </ul>
                    <p className="lead py-4">
                        <a className="btn btn-primary btn-lg" href="/" role="button">Join Us Today!</a>
                    </p>
                </div>
                <footer>
                    <p>&copy; 2024 Cloud Notes. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default About