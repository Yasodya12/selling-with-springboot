import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

export default function Profile(){
    const fileRef = useRef(null);

    // @ts-ignore
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    let [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (file) {
    //         handleFileUpload(file);
    //     }
    // }, [file]);

    // const handleFileUpload = (file) => {
    //     const storage = getStorage(app);
    //     const fileName = new Date().getTime() + file.name;
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //
    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setFilePerc(Math.round(progress));
    //         },
    //         (error) => {
    //             setFileUploadError(true);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //                 setFormData({ ...formData })
    //             );
    //         }
    //     );
    // };



    // @ts-ignore
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value,
        id:currentUser.data.id
        });
    };


    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser.data.id)

        try {
            console.log("update customer eke data",formData)
            dispatch(updateUserStart());
            const res = await fetch(`http://localhost:8080/bootapp/signUp`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log("awa false")
                dispatch(updateUserFailure(data.message));
                return;
            }


            dispatch(updateUserSuccess(data));

            setUpdateSuccess(true);

        } catch (error) {
            console.log("awasa")
            setUpdateSuccess(false);
            // @ts-ignore
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`http://localhost:8080/bootapp/signUp?id=${currentUser.data.id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            // @ts-ignore
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        navigate('/sign-in');
    };

    const handleShowListings = async () => {
        console.log("current user id ",currentUser);
        // try {
        //     setShowListingsError(false);
        //     const res = await fetch(`http://localhost:4000/server/user/listings/${currentUser._id}`);
        //     const data = await res.json();
        //     if (data.success === false) {
        //         setShowListingsError(true);
        //         return;
        //     }
        //
        //     setUserListings(data);
        //     console.log(userListings);
        // } catch (error) {
        //     setShowListingsError(true);
        // }
    };


    // @ts-ignore
    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`http://localhost:4000/server/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListings((prev) =>
                // @ts-ignore
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        // // @ts-ignore
                        // onChange={(e) => setFile(e.target.files[0])}
                        // // @ts-ignore
                        // type='file' ref={fileRef}
                        // hidden={true}
                        // accept='image/*'
                    />

                    <img
                        // // @ts-ignore
                        // onClick={() => fileRef.current.click()}
                        src={currentUser.avatar}
                        alt='profile'
                        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                    />
                    <p className='text-sm self-center'>

                            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>

                    </p>
                    <input
                        type='text'
                        placeholder='username'
                        defaultValue={currentUser.username}
                        id='username'
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='email'
                        id='email'
                        defaultValue={currentUser.email}
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='password'

                        id='password'
                        className='border p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <button
                        disabled={loading}
                        className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
                    >{loading ? 'Loading...' : 'Update'}
                    </button>

                    <Link
                        className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
                        to={'/create-listing'}
                    >
                        Create Listing
                    </Link>

                </form>
                <div className='flex justify-between mt-5'>
        <span
            onClick={handleDeleteUser}
            className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
                    <span  onClick={handleSignOut}  className='text-red-700 cursor-pointer'>

          Sign out
        </span>
                </div>

                <p id={"error"} className='text-red-700 mt-5'>{error ? error : ''}</p>
                <p id={"successful"} className='text-green-700 mt-5'>
                    {updateSuccess ? 'User is updated successfully!' : ''}
                </p>
                <button onClick={handleShowListings} className='text-green-700 w-full'>
                    Show Listings
                </button>
                <p className='text-red-700 mt-5'>
                    {showListingsError ? 'Error showing listings' : ''}
                </p>



                {userListings && userListings.length > 0 && (
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-center mt-7 text-2xl font-semibold'>
                            Your Listings
                        </h1>
                        {userListings.map((listing) => (
                            <div
                                // @ts-ignore
                                key={listing._id}
                                className='border rounded-lg p-3 flex justify-between items-center gap-4'
                            >

                                <Link
                                    // @ts-ignore
                                    to={`/listing/${listing._id}`}>
                                    <img
                                        // @ts-ignore
                                        src={listing.imageUrls[0]}
                                        alt='listing cover'
                                        className='h-16 w-16 object-contain'
                                    />
                                </Link>
                                <Link
                                    className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                                    // @ts-ignore
                                    to={`/listing/${listing._id}`}
                                >

                                    <p>

                                        { // @ts-ignore
                                            listing.name}</p>
                                </Link>

                                <div className='flex flex-col item-center'>
                                    <button
                                        // @ts-ignore
                                        onClick={() => handleListingDelete(listing._id)}
                                        className='text-red-700 uppercase'
                                    >
                                        Delete
                                    </button>

                                    <Link
                                        // @ts-ignore
                                        to={`/update-listing/${listing._id}`}>
                                        <button className='text-green-700 uppercase'>Edit</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        );

}