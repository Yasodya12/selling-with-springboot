import React, {Component} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"



export class SignIn extends Component {



    constructor(props: {} | Readonly<{}>) {
        super(props);


        this.state = {

            error:null,
            loading:false
        }

    }

    render() {



        // @ts-ignore
        const handleChange = (e) => {

            this.setState({
                ...this.state,
                [e.target.id]: e.target.value,

            });
            console.log(this.state)
        };



        //@ts-ignore
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {





                const res = await fetch('http://localhost:4000/server/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state),
                });

                const data = await res.json();
                if (data.success === false) {
                    this.setState({
                        error: data.message,
                        loading: false

                    });
                    console.log("Waraadi na");

                    return;
                }

                console.log("Hari");


            }catch (error){
                // @ts-ignore

                this.setState({ loading: false, error: error.message });
                console.log("Natch una ballo");
            }



        };
        return (

            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        placeholder='email'
                        className='border p-3 rounded-lg'
                        id='email'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        className='border p-3 rounded-lg'
                        id='password'
                        onChange={handleChange}
                    />

                    <button

                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        Sign In
                    </button>

                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Dont have an account?</p>
                    <Link to={'/sign-up'}>
                        <span className='text-blue-700'>Sign up</span>
                    </Link>
                </div>

            </div>
        );

    }
}



