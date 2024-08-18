import image1 from "../components/images/22.jpg";
import image2 from "../components/images/23.jpg";
import image3 from "../components/images/26.jpg";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6 text-slate-800">
            About Senstate
          </h1>
          <p className="mb-6 text-lg text-slate-700 leading-relaxed">
            Senstate is a leading real estate agency that specializes in helping
            clients buy, sell, and rent properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the buying and selling
            process as smooth as possible.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={image1}
            alt="Sensate"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="flex justify-center">
          <img
            src={image2}
            alt="Our Mission"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Our Mission
          </h2>
          <p className="mb-6 text-lg text-slate-700 leading-relaxed">
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Our Team</h2>
          <p className="mb-6 text-lg text-slate-700 leading-relaxed">
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={image3}
            alt="Our Team"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
