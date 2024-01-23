
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import { Contact } from '../components/Contact';
import {useEffect, useState} from "react";

export function Listing() {
    SwiperCore.use([Navigation]);
    let [listing, setListing] = useState<any>(null);
    let [test,setTest]=useState(true)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    // @ts-ignore
    const { currentUser } = useSelector((state) => state.user);


    useEffect(() => {
        const fetchListing = async () => {

            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8080/bootapp/listing?id=${params.listingId}`);

                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                let data1 = data.data;

                await new Promise(resolve => setTimeout(resolve, 1000));

                setLoading(false);
                setError(false);

                setListing(data1);

                setTest(false)
                if (listing===null){

                    setListing(data1);
                }

            } catch (error) {
                console.log(error)
                setError(true);
                setLoading(false);

            }
        };
        fetchListing();
    },
        [params.listingId]);

    if (listing !=null){
      
    }


    return (





        <main>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && (
                <p className='text-center my-7 text-2xl'>Something went wrong!</p>
            )}
            {listing !=null && !loading && !error &&


                (
                <div>

                    <Swiper navigation>
                        {console.log("img urls ",listing.imgUrl)}
                        {/*@ts-ignore*/}
                        {listing.imgUrl.map((url:string) => (
                            <SwiperSlide key={url}>
                                <div
                                    className='h-[550px]'
                                    style={{
                                        background: `url(${require(`../../imges/${url}`)})  center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare
                            className='text-slate-500'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                            Link copied!
                        </p>
                    )}
                    <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                        <p className='text-2xl font-semibold'>
                            {/*@ts-ignore*/}
                            {listing.name} - LKR{' '}
                            {/*@ts-ignore*/}
                            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPricel.toLocaleString('en-US')}
                            {/*@ts-ignore*/}
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                            <FaMapMarkerAlt className='text-green-700' />
                            {/*@ts-ignore*/}
                            {listing.address}
                        </p>
                        <div className='flex gap-4'>
                            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    {/*@ts-ignore*/}
                                    LKR {+listing.regularPrice - +listing.discountPrice} OFF
                                </p>
                            )}
                        </div>
                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>Description - </span>
                            {listing.description}
                        </p>
                        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBed className='text-lg' />
                                {listing.bedroom > 1
                                    ? `${listing.bedroom} beds `
                                    : `${listing.bedroom} bed `}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBath className='text-lg' />
                                {listing.bathroom > 1
                                    ? `${listing.bathroom} baths `
                                    : `${listing.bathroom} bath `}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaParking className='text-lg' />
                                {listing.parking ? 'Parking spot' : 'No Parking'}
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaChair className='text-lg' />
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>


                        {!contact && (
                            <button
                                onClick={() => setContact(true)}
                                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                            >
                                Contact landlord
                            </button>
                        )}


                        {contact && <Contact listing={listing} />}

                    </div>
                </div>
            )}
        </main>
    );
}