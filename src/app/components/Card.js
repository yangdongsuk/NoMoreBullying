import Link from "next/link";

const Card = ({ image, icon, title, description, link, buttonText }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transform hover:scale-105 transition-transform duration-300 hover:bg-green-100">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover mb-4 rounded-t-lg"
        />
        <div className="flex items-center mb-2">
          {icon && <img src={icon} alt="" className="h-6 w-6 mr-2 inline-block" />}
          <h2 className="text-blue-700 text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
      </div>
      <Link href={link}>
        <button className="mt-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default Card;
