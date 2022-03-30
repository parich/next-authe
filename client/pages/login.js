import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link'
import { Button } from 'antd';
import { Spin } from 'antd';

const Login = () => {

    const [email, setEmail] = useState('parich@gmail.com');
    const [password, setPassword] = useState('12345');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.table({ username, email, password })

        try {
            setLoading(true);
            const { data } = await axios.post(`/api/login`, {
                email,
                password,
            })
            console.log("login response", data)
            //setLoading(false);
        } catch (error) {
            toast.error(error.response.data)
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square"> Login </h1>
            <div className='container col-md-4 offset-md-4 pb-5'>

                <form>
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
                        disabled={!email || !password || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <Spin tip="Loading..."></Spin> : "Login"}
                    </Button>

                </form>

                <p className="text-center p-3"> Not yet register <Link href='/register'><a>Register</a></Link></p>


            </div>
        </>
    )
}

export default Login;