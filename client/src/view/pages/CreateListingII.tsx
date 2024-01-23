
import React, {ChangeEvent, useState} from "react";
import CaptureImage from './capture.png';
import testImg from "../../imges/Screenshot (12).png";

import {Simulate} from "react-dom/test-utils";
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
const storeImage = async (file: File): Promise<string> => {
    // Your implementation...
    return Promise.resolve(''); // Replace with your actual implementation
};


interface FormData {
    imgUrl: string[],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedroom: 1,
    bathroom: 1,
    regularPricel: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false
    userRef:''
}

export function CreateListingII() {
    // @ts-ignore
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = React.useState<File[]>([]);
    const [formData, setFormData] = React.useState<FormData>({ imgUrl: [], name: '',
        description: '',
        address: '',
        type: 'rent',
        bedroom: 1,
        bathroom: 1,
        regularPricel: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        userRef:''
    });
    const [imageUploadError, setImageUploadError] = useState<any>(null);
    const navigate = useNavigate();
    let [uploading, setUploading] = useState(false);
    const [error, setError] = useState<any>(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            // Convert FileList to an array
            const filesArray = Array.from(selectedFiles);

            // Use the functional form of setFiles with prevState
            setFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };



    const handleImageSubmit = async () => {

        if (files.length > 0 && files.length  + formData.imgUrl.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises: Promise<string>[] = [];

            for (let i = 0; i < files.length; i++) {
                storeImage(files[i])

            }



            // Promise.all(promises).then((urls) => {
            //     setFormData((prevFormData) => ({
            //         ...prevFormData,
            //         imgUrl: prevFormData.imgUrl.concat(urls),
            //     }));
            //
            //     setImageUploadError(false);
            //     setUploading(false)
            // })
            //     .catch((err) => {
            //         setImageUploadError("Image size in maximum 10mb");
            //         setUploading(false)
            //     });
        }else {

            setImageUploadError("You can upload only 6 images for listing")
            setFiles([]);
            setUploading(false)
        }

    };






    const storeImage = async (file: File) => {
        var img = new FormData();
        img.append('img',file);

        try {
            const res = await fetch('http://localhost:8080/bootapp/listing/imgSaave', {
                method: 'POST',
                body: img,
            });

            setImageUploadError(false);
            setUploading(false)
            await new Promise(resolve => setTimeout(resolve, 1000));

            setFormData({
                ...formData,
                imgUrl:formData.imgUrl.concat(file.name),
            });
        } catch (errot){
            setImageUploadError("Image size in maximum 10mb");
             setUploading(false)
        }



    };






    // @ts-ignore
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imgUrl: formData.imgUrl.filter((_, i) => i !== index),
        });

    };


    // @ts-ignore
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };


    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.userRef= currentUser._id
        try {
            if (formData.imgUrl.length < 1){

                return setError('You must upload at least one image');
            }


            if (+formData.regularPricel < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');
            setLoading(true);
            setError(false);
            const res = await fetch('http://localhost:8080/bootapp/listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    formData

                ),
            });

            const data = await res.json();
            setLoading(false);
            if (data.success === false) {

                setError(data.message);
            }

            navigate(`/listing/${data.data.id}`);
        } catch (error) {
            console.log("false eketa awa methana thmeadssaddsd ")
            setError(error);
            setLoading(false);
        }
    };




    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create a Listing
            </h1>



            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='border p-3 rounded-lg'
                        id='name'
                        maxLength={62}
                        minLength={10}
                        required={true}
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        typeof='text'
                        placeholder='Description'
                        className='border p-3 rounded-lg'
                        id='description'
                        required={true}
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type='text'
                        placeholder='Address'
                        className='border p-3 rounded-lg'
                        id='address'
                        required={true}
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                // @ts-ignore
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bedroom'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange}
                                value={formData.bedroom}
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathroom'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange}
                                value={formData.bathroom}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='regularPricel'
                                min='50'
                                max='10000000'
                                required
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange}
                                value={formData.regularPricel}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>

                                <span className='text-xs'>(LKR / month)</span>

                            </div>
                        </div>

                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='discountPrice'
                                    min='0'
                                    max='10000000'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted price</p>

                                    {formData.type === 'rent' && (
                                        <span className='text-xs'>($ / month)</span>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
                    </p>
                    <div className='flex gap-4'>
                        <input

                            onChange={handleFileChange}
                            className='p-3 border border-gray-300 rounded w-full'
                            type='file'
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            type='button'
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>

                    {formData.imgUrl.length > 0 &&
                        formData.imgUrl.map((url, index) => (


                            <div
                                key={url}

                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={ require(`../../imges/${url}`) }
                                    alt="listing image"
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    <button
                        onClick={handleSubmit}
                        disabled={loading || uploading}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {loading ? 'Creating...' : 'Create listing'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    );
}