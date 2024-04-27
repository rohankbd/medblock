import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "../assets/css/Form.css";
import yoga from "../assets/images/yoga.png";
import "../assets/css/loader.css";

const RegisterForm = (props) => {
    const [name, setName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        body: ""
    });
    const history = useHistory();

    const registerHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // Update profile. Here we're adding the user's name. You can extend this with custom claims if needed.
                return updateProfile(user, {
                    displayName: name
                    // You can add more user details here if required
                });
            })
            .then(() => {
                setLoading(false);
                // Redirect user or show success message
                history.replace("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle errors here, such as email already in use, weak password, etc.
                console.log(errorCode, errorMessage);
                setLoading(false);
                setError({
                    status: true,
                    body: errorMessage
                });
            });
    };

    return (
        <div className="register">
            <div className="form-wrapper">
                <form>
                    <h1>Register</h1>
                    <label>Name</label>
                    <input type="text" required onChange={(event) => setName(event.target.value)} value={name}/>
                    {/* Conditional fields based on whether the user is a patient or not */}
                    <label>Email</label>
                    <input type="email" required onChange={(event) => setEmail(event.target.value)} value={email}/>
                    <label>Password</label>
                    <input type="password" required onChange={(event) => setPass(event.target.value)} value={pass}/>
                    {error.status ? <span className="reqmsg">{error.body}</span> : null}
                    <button type="submit" className="registerBtn" onClick={registerHandler}>Register</button>
                    {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
                </form>
            </div>
            <img className="form-img" src={yoga} alt="Yoga"/>
        </div>
    );
};

export default RegisterForm;