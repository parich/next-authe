import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link'
import { Button } from 'antd';
import { Spin } from 'antd';

const Register = () => {

    const [username, setUsername] = useState('parich');
    const [email, setEmail] = useState('parich@gmail.com');
    const [password, setPassword] = useState('12345');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.table({ username, email, password })

        try {
            setLoading(true);
            const { data } = await axios.post(`/api/register`, {
                username,
                email,
                password,
            })
            //console.log("register response", data)
            toast.success('Registration successful.');
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data)
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square"> Register </h1>
            <div className='container col-md-4 offset-md-4 pb-5'>

                <form>
                    <label htmlFor="username">username</label>
                    <input
                        id='username'
                        type="text"
                        className='form-control md-4 mt-3 mb-3'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter name'
                        required
                    />

                    <label htmlFor="email">email</label>
                    <input
                        id='email'
                        type="email"
                        className='form-control md-4 mt-3 mb-3'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                        required
                    />

                    <label htmlFor="password">password</label>
                    <input
                        id='password'
                        type="password"
                        className='form-control md-4 mt-3 mb-3'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password'
                        required
                    />
                    <br />

                    <Button
                        type="primary"
                        block
                        disabled={!username || !email || !password || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <Spin tip="Loading..."></Spin> : "Submit"}
                    </Button>

                </form>

                <p className="text-center p-3"> Already register <Link href='/login'><a>Login</a></Link></p>


            </div>
        </>
    )
}

export default Register;