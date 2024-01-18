import React, {ChangeEvent, Component, useState} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {SignIn} from "./SignIn";





export class SignUp extends Component {

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
            this.setState({
                loading:true
            })



                const res = await fetch('http://localhost:4000/server/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state),
                });
                console.log("catct na");
                const data = await res.json();
                if (data.success === false) {
                    this.setState({
                        error:data.message,
                        loading:false

                    });
                    return;
                }

            this.setState({
                    loading:false,
                    error:null
                });




        };

        return (

            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
                <form   className='flex flex-col gap-4'>

                    <input
                        type='text'
                        placeholder='username'
                        className='border p-3 rounded-lg'
                        id='username'
                        onChange={handleChange}
                    />
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
                        type={"button"}

                        onClick={handleSubmit}
                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >

                        Sign Up
                    </button>

                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Have an account?</p>
                    <Link to={'/sign-in'}>
                        <span className='text-blue-700'>Sign in</span>
                    </Link>
                </div>

            </div>
        );
    }
}