import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import image1 from "../components/images/22.jpg";
import image2 from "../components/images/23.jpg";
import image3 from "../components/images/24.jpg";
import image4 from "../components/images/25.jpg";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center text-center py-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <h1 className="relative z-10 text-white font-extrabold text-6xl lg:text-7xl leading-tight mb-4">
          Find Your <br />
          <span className="text-blue-500 animate-pulse">Dream Home</span> Today
        </h1>
        <p className="relative z-10 text-white text-xl lg:text-2xl max-w-xl mx-auto mb-8">
          Discover the perfect property with{" "}
          <span className="font-bold">Senstate</span>. Whether you’re looking to
          rent or buy, we have a wide selection of properties to choose from.
        </p>
        <button className="relative z-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to={"/search"}>Get Started</Link>
        </button>
      </div>

      {/* Swiper Carousel */}
      {/* <div className="my-10">
        <Swiper navigation loop className="w-full h-[80vh]">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <h2 className="text-white text-4xl font-bold bg-black/50 p-4 rounded-lg">
                    {listing.name}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div> */}

      {/* Listings Display */}
      <div className="max-w-6xl mx-auto p-4 flex flex-col gap-12 my-12">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className="text-lg text-blue-500 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-700">
                Recent Rentals
              </h2>
              <Link
                className="text-lg text-blue-500 hover:underline"
                to={"/search?type=rent"}
              >
                Show more rentals
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-700">
                Recent Sales
              </h2>
              <Link
                className="text-lg text-blue-500 hover:underline"
                to={"/search?type=sale"}
              >
                Show more sales
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
